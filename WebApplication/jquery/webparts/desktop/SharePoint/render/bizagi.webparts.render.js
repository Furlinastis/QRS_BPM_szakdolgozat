/*
 *   Name: BizAgi Workportal Render Webpart
 *   Author: Fredy Vasquez
 *   Comments:
 *   -   This script will define a base class to all widgets
 */

bizagi.workportal.webparts.webpart.extend("bizagi.workportal.webparts.render", {
    ASYNC_CHECK_TIMER: 3000
}, {

    /*
     *   Constructor
     */
    init: function (workportalFacade, dataService, initialParams) {
        var self = this;
        self.hasIdWorkitem = typeof(initialParams.idWorkitem) !== 'undefined';
        // Call base
        this._super(workportalFacade, dataService, initialParams);

        // Set listeners
        this.subscribe("ui-bizagi-show-render", function (e, params) {
            self.renderForm(params);
        });

        // Se genera un evento desde NewCase para que se despliegue la info en el Render
        this.subscribe("ui-bizagi-show-render-new", function (e, params) {
            self.newCaseRenderForm(params);
        });

        // The process webpart fire this event to cases, and render display a old case, it's preferably show empty form
        this.subscribe("ui-bizagi-show-cases", function (e, params) {
            self.emptyRenderForm(params);
        });

        // Other webpart try hide render, but render prevent this action if autosave not finish
        this.subscribe("ui-bizagi-can-change-activityform", function () {
            return self.canHide();
        });

        self.VALID_APPLICATION_PARENT = [ 'WORKPORTAL', 'NEWWORKPORTAL', 'SITES' ];
        var applicationParent = (initialParams.applicationParent || "");
        if (self.VALID_APPLICATION_PARENT.indexOf(applicationParent.toUpperCase()) >= 0) {
            /*
        * If this flag is true when the next action is launched the current activity is processed but the next activity don't
        */
            self.applicationParent = applicationParent;
        }
        self.timeoutTriggerHandler = {};

        //waitContainer
        this.waitContainer = initialParams.waitContainer;
        this.previousLoadRender = false;
        this.adjustButtonsToContent = initialParams.adjustButtonsToContent;
    },

    /*
     *   Renders the content for the current controller
     */
    renderContent: function () {
        var self = this;

        var template = self.workportalFacade.getTemplate("render");
        var content = self.content = $.tmpl(template);

        return content;
    },

    /*
     *   Customize the web part in each device
     */
    postRender: function (params) {
        var self = this;
        params.context = "sharepoint";
        params.sharepointProxyPrefix = self.sharepointProxyPrefix;

        var getApplicationParam = location.search.match(/application=([^&]*)/);
        if (getApplicationParam) {
            if (self.VALID_APPLICATION_PARENT.indexOf(((getApplicationParam)[0].split("="))[1].toUpperCase()) >= 0) {
                params.context = "workflow";
            }
        }

        if (params.idWfClass != null) {
            self.newCaseRenderForm(params);
        } else if (params.idWorkitem) {
            self.renderingExecute(params);
        } else {
            self.params = params;
            self.performRouting();
        }

        self.addCommListeners();

        // Apply external theme styles
        self.applyExternalThemeStyles();

        self.endWaiting();


        document.getElementById("bz-webpart").style["overflow-y"] = "auto";
 
    },

    addCommListeners: function() {
        var self = this;
        var iframeCommunicationListeners = {
            "theme-initialize": {
                runBefore: function() {
                    bizagi.iframeCommunicator.trigger("awaiting-theme");
                },
                then: self.loadExternalThemeStyles
            },
            "go-down": {
                then: self.subscribeToGoDown
            },
            "load-form-case": {
                then: self.loadFormCase
            },
            "load-global-form": {
                then: self.loadGlobalForm
            },
            "check-pending-changes": {
                then: self.pendingChanges
            },
            "save-form": {
                then: self.saveForm
            },
            "create-case": {
                then: self.createCase
            }
        };

        $.each(iframeCommunicationListeners, function(key, value) {
            self.addIframeCommunicationListener(key, {
                runBefore: (value.runBefore ? value.runBefore : undefined),
                then: (value.then ? value.then : function(){})
            });
        });
    },

    /*
     *   Listener to ui-bizagi-show-render event
     */
    renderForm: function (params) {
        //Creates a new case based on the selected process        
        var self = this;
        self.helper.addWaitContainer(self.waitContainer);
        self.params = params;
        self.refresh(self.params);
    },

    /*
     *   Creates a new case based on the selected process
     */
    newCaseRenderForm: function (params) {
        var self = this;
        
        self.helper.addWaitContainer(self.waitContainer);

        if (params.guidAction) {
            // Perform the mapping  
            return $.when(self.dataService.getMapping({
                guidAction: params.guidAction,
                accumulatedContext: { context: params.accumulatedContext }
            })).pipe(function (mappings) {

                return self.startProcess(params, mappings);
            });
        } 

        return $.when(self.startProcess(params));
    },

    startProcessPostMessage: function (params, mappings) {
        var self = this;
        var idWfClass = params.idWfClass;

        $.when(self.dataService.startProcess({
            idProcess: idWfClass,
            entityMapping: JSON.stringify(mappings)
        })).pipe(function (data) {
            self.showTitle(data);
            bizagi.iframeCommunicator.trigger("form-rendered");

            if (data.hasStartForm) {
                // Creates a new case
                var data = {
                    h_action: "LOADSTARTFORM",
                    h_mappingstakeholders: true,
                    h_idProcess: idWfClass
                };
                if (mappings) {
                    for (var i = 0; i < mappings.length; i++) {
                        data[mappings[i].xpath] = mappings[i].surrogateKey[0];
                    }
                }
                
                if(bizagi.util.detectRealDevice() === "desktop") {
                    $.when(self.dataService.getStartForm(data)).then(function (data) {
                        self.renderingExecute({data: data, type: ""});
                    });
                } else {
                    self.renderingExecute({
                        idWfClass: idWfClass
                    });
                }

            } else {
                //Load NewCase data in render form
                params.idCase = data.caseInfo.idCase;
                params.idWorkitem = data.caseInfo.workItems && data.caseInfo.workItems.length > 0 ? data.caseInfo.workItems[0].idWorkItem : "";
                self.renderingExecute(params);
            }

            return data;
        }).fail(function (msg) {
            self.manageError(msg, defer);
        });
    },

    startProcess: function (params, mappings) {
        var self = this;
        var idWfClass = params.idWfClass;

        // Start a process
        return $.when(self.dataService.startProcess({
            idProcess: idWfClass,
            entityMapping: JSON.stringify(mappings)
        })).pipe(function (data) {
                    if (data.hasStartForm) {
                        // Creates a new case
                        var data = {
                            h_action: "LOADSTARTFORM",
                            h_mappingstakeholders: true,
                            h_idProcess: idWfClass
                        };
                        if (mappings) {
                            for (var i = 0; i < mappings.length; i++) {
                                data[mappings[i].xpath] = mappings[i].surrogateKey[0];
                            }
                        }
                        if(bizagi.util.detectRealDevice() === "desktop") {
                            $.when(self.dataService.getStartForm(data)).then(function (data) {
                                self.renderingExecute({data: data, type: ""});
                            });
                        } else {
                            self.renderingExecute({
                                idWfClass: idWfClass
                            })
                        }

                    } else {
                        //Load NewCase data in render form
                        params.idCase = data.caseInfo.idCase;
                        params.data = data.caseInfo;
                        params.idWfClass = null;
                        self.renderForm(params);
                    }
                    return data;
                }).fail(function (msg) {
                    self.manageError(msg, defer);
                });
    },

    emptyRenderForm: function () {
        // Clear content
        this.content.empty();
    },

    performRouting: function () {
        var self = this;
        var params = self.params;
        params.idCase = self.params.idCase;
        params.fromWorkItemId = self.params.idWorkitem;

        $.when(self.dataService.routing.getRoute(params)).done(function (route) {
            route = route || {};
            route.moduleParams = route.moduleParams || {};
            self.workItemsRestResponse = route.moduleParams.workItemsRestResponse || {};

            if (!self.applicationParent) {
                self.defaultRouting(route);
            } else {
                switch( self.applicationParent ) {
                    case "NEWWORKPORTAL":
                        self.customRouteWorkportal(route);
                        break;
                }
            }
        });
    },

    defaultRouting: function(route) {
        var self = this;
        var params = self.params;
        params.fromWorkItemId = self.params.idWorkitem;

        switch (route.module) {
            case "projectDashboard":
            case "activityform":
                if (route.moduleParams.idWorkitem) {
                    //The autosave verification always be before this step, not necesary autosave in this place
                    self.publish("ui-bizagi-show-render", {
                        idWorkitem: route.moduleParams.idWorkitem,
                        idCase: route.moduleParams.idCase
                    });
                }
                else {
                    if (route.moduleParams.messageForm) {
                        self.showFinishMessage(route.moduleParams.messageForm)
                    }
                    else {
                        if (route.moduleParams.withOutGlobalForm) {
                            //Render Finish Message 
                            self.showFinishMessage(self.resources.getResource("render-without-globalform"))
                        }
                        else {
                            //Render summary form
                            params.idWorkitem = null;
                            params.data = null;
                            params.idCase = route.moduleParams.idCase;
                            params.guid = route.moduleParams.guid;
                            self.renderingExecute(params);
                        }
                    }
                    self.publish("ui-bizagi-show-summary", route.moduleParams);
                    self.hideButtons();
                }
                break;
            case "oldrenderintegration":
                // TODO: Implement route for old render v1
                break;
            case "async":
                self.checkAsyncProcessingStatus();
                break;
            case "routing":
                self.publish("ui-bizagi-show-activitySelector", route.moduleParams)
                break;
        }
    },

    customRouteWorkportal: function(route) {
        var self = this;
        self.hideButtons();
        withoutNextActivity = !route.moduleParams.idWorkitem;
        var message = route.moduleParams.messageForm
            ? route.moduleParams.messageForm
            : ( withoutNextActivity ? self.resources.getResource("render-without-globalform"): "");
        var showGlobalForm = !route.moduleParams.idWorkitem && !route.moduleParams.messageForm && !route.moduleParams.withOutGlobalForm;

        window.clearTimeout(self.timeoutTriggerHandler);
        self.timeoutTriggerHandler = setTimeout(function() {
            self.sendDataToCustomRouting({
                idCase: route.moduleParams.idCase,
                message: message,
                showGlobalForm: showGlobalForm
            });
        }, 100);
    },

    sendDataToCustomRouting: function (params) {
        var self = this;
        self.sendDimensionsiFrame(true);
        var finishMessage = params.message || '';
        var showGlobalForm = params.showGlobalForm;
        $.when(self.dataService.getCaseSummary({
            idCase: params.idCase,
            onlyUserWorkItems: true
        }))
        .done(function (data) {
            // When the form is a start form, data is null
            data = data || {};
            data.finishMessage = finishMessage;
            data.hasPendingActivities = !finishMessage;
            data.showGlobalForm = showGlobalForm;
            var workItemsResponse = data.currentState || [];
            if (self.fromNextButton) {
                bizagi.iframeCommunicator.trigger("next-applied", {summaryResponse: data, workItemsResponse: workItemsResponse});
            } else {
                bizagi.iframeCommunicator.trigger("form-rendered", {summaryResponse: data, workItemsResponse: workItemsResponse});
            }
            self.fromNextButton = false;
        });
    },

    renderingExecute: function (params) {
        params = params || {};
        var self = this;
        self.previousLoadRender = true;
        self.showTitleReady = false;

        var content = self.getContent();
        var canvas = $("#ui-bizagi-webpart-render-container", content);
        var mobileTemplate = self.workportalFacade.getTemplate("render-mobile");
        var loading = self.workportalFacade.getTemplate("loading-render");

        if (typeof bizagi.theme !== "undefined" && bizagi.theme.type != "predefined" && bizagi.theme.value) {
            try {
                params.themeVars = JSON.stringify(bizagi.theme.value);
            } catch (e) {
                params.themeVars = null;
            }
        }
        
        if ( self.applicationParent ) {
            params.applicationParent = self.applicationParent;
        }

        $.tmpl(loading).appendTo(canvas);

        // Detect device and initialize their facade
        if (bizagi.detectRealDevice() != "desktop") {
            // initialize mashups
            var mashup;
            var device = bizagi.detectRealDevice();
            device = (device == "tablet") ? "tablet_android" : device;
            device = (device == "smartphone") ? "smartphone_android" : device;

            // Get oAuth Credentials
            var bizagiAuthentication = sessionStorage.getItem("bizagiAuthentication") || "{}";
            bizagiAuthentication = JSON.parse(bizagiAuthentication);
            var accessToken = bizagiAuthentication.accessToken || "";
            var refreshToken = bizagiAuthentication.refreshToken || "";
            var oAuthQueryStringParams = "&accessToken="+accessToken+"&refreshToken="+refreshToken;

            $(canvas).empty();
            var urlParameters = { device: device };

            $.each(params, function (key, value) {
                // Take only strings and number parameters
                if(typeof (value) === "string") {
                    urlParameters[key] = $.trim(value);
                } else if (typeof(value) == "number") {
                    urlParameters[key] = value;
                }
            });

            //Get external theme variables
            var themeVars =(self.externalStyle)?"&themeVars="+(JSON.stringify(self.externalStyle) || ""):"";
            urlParameters.remoteServer = window.location.toString().split("?")[0];
            var url = "../../../../mashup/index.webparts.html?" + $.param(urlParameters) + themeVars + oAuthQueryStringParams;
            var height = window.innerHeight - 2;
            var iframe = $.tmpl(mobileTemplate, {url: url, device: device, height: height});
            if(bizagi.detectRealDevice().search("ios") !== -1 && urlParameters.iframeidentifier == "iframePopUprenderComplete") {                
                iframe.css("height", "90vh");
            }

            $(canvas).append(iframe);
            bizagi.iframeCommunicator.subscribe("mashup-resize-content", function (params) {
                iframe.css("height", params.message.height + "px");
                bizagi.iframeCommunicator.send({
                    message: {
                        iframeHeight: params.message.height,
                        iframeName: BIZAGI_IFRAME_IDENTIFIER
                    }
                });
            });

        } else {
            // initialize desktop render
            var rendering = self.rendering = new bizagi.rendering.facade(params);
            rendering.execute($.extend(params, {
                canvas: canvas
            }));

            rendering.subscribe("rendering-formRendered", function () {
                //se detecto una situaci�n, hay ocasiones en donde por cada ejecuci�n del rendering.execute ingresa varias veces al done.
                //Se agrego un filtro para minimizar la cantidad de veces que entra al m�todo showTitle
                //if (!self.showTitleReady) {
                self.sendDimensionsiFrame(true);
                self.showTitle(params);
                $.when(self.dataService.getCaseSummary({
                    idCase: params.idCase,
                    onlyUserWorkItems: true
                }))
                .done(function (data) {
                    // When the form is a start form, data is null
                    data = data || {};
                    var workItemsResponse = data.currentState || [];
                    bizagi.iframeCommunicator.trigger("form-rendered", {
                        summaryResponse: data,
                        workItemsResponse: workItemsResponse,
                        processName: params.data.properties.breadCrumb[0], 
                        activityName: params.data.properties.breadCrumb[1], 
                        fromLoadFormCase: self.params.fromLoadFormCase});
                });
                //}
            });

            rendering.subscribe("rendering-formRenderedError", function(ev, message) {
                bizagi.iframeCommunicator.trigger("form-rendered-error", message);
            });

            $(window).resize(function () {
                self.rendering.resize({
                    forceResize: true
                });
            });
            // Attach handler to render container to subscribe for routing events
            if (canvas) {
                canvas.bind("routing", function (_, args) {
                    self.params.idCase = args.idCase;
                    self.routingDisabled = args.routingDisabled;
                    window.clearTimeout(self.timeoutTriggerHandler);
                    self.timeoutTriggerHandler = setTimeout(function() {
                        self.fromNextButton = true;
                        self.performRouting();
                    }, 100);
                });
            }
        }
    },

    checkAsyncProcessingStatus: function (params) {
        var self = this;
        var params = params || self.params;

        $.when(self.dataService.getAsynchExecutionState({idCase: params.idCase}))
            .done(function (response) {

                // Check what to do next
                if (response.state == "Processing") {
                    // Verify errors in response
                    if (response.state == "Error" && response.errorMessage != undefined) {
                        // Change default error
                        response.errorMessage = bizagi.localization.getResource("render-async-error");

                    } else {
                        // Re-draw async feedback until finished
                        setTimeout(function () {
                            self.hideAsyncFeedback();
                            self.performRouting();
                        }, self.Class.ASYNC_CHECK_TIMER);
                    }

                    // Show feedback
                    self.showAsyncFeedback(response);


                } else if (response.state == "Finished") {
                    // Re-execute routing to draw next activity
                    self.performRouting();
                }
            });
    },

    showAsyncFeedback: function (response) {
        var self = this;
        var template = self.getTemplate("render-async");
        var asyncMessage = $.tmpl(template, response);
        var canvas = self.canvas;
        canvas.append(asyncMessage);
    },

    hideAsyncFeedback: function () {
        var self = this;
        var canvas = self.canvas;
        var asyncMessage = $("#ui-bizagi-webpart-render-async-wrapper", canvas);
        asyncMessage.remove();
    },
    hideButtons: function () {
        var self = this;
        var buttonContainer = $(".ui-bizagi-button-container", self.getContent());
        if (buttonContainer.lenght > 0) {
            buttonContainer.remove();
        }
        else {
            //because performance
            var buttonContainerbody = $(".ui-bizagi-button-container");
            buttonContainerbody.remove();
        }
    },
    showFinishMessage: function (message) {
        var self = this;
        var content = self.getContent();
        var canvas = $("#ui-bizagi-webpart-render-container", content);
        //Add finish message when case is finish
        var errorTemplate = self.workportalFacade.getTemplate("info-render");
        var endMessageHtml = $.tmpl(errorTemplate, {
            message: message
        });
        // Load end Message   
        canvas.empty();
        endMessageHtml.appendTo(canvas);
    },

    showTitle: function (params) {
        var self = this;
        var content = self.getContent();
        if (!params.idCase) return;
        // Call case summary service for header case
        $.when(self.dataService.getCaseSummary({
                idCase: params.idCase,
                onlyUserWorkItems: true
            }))
            .done(function (data) {
                // When the form is a start form, data is null
                data = data || {};

                //Add Title
                var titleTemplate = self.workportalFacade.getTemplate("title-render");
                var caseNumber = data.caseNumber;
                var processPath = data.processPath + data.process;
                var workItemState;

                if (params.idWorkitem) {
                    $.each(data.currentState, function (index, dataValue) {
                        if (dataValue.idWorkItem == params.idWorkitem) {
                            workItemState = dataValue.state;
                        }
                    });
                }

                var titleMessageHtml = $.tmpl(titleTemplate, {
                    caseNumber: caseNumber,
                    workItemState: workItemState,
                    processPath: processPath
                });
                //$(".ui-bizagi-webpart-header-container", content).html(titleMessageHtml);
                $(".ui-bizagi-webpart-header-container", content).empty();
                titleMessageHtml.appendTo(".ui-bizagi-webpart-header-container", content);

                self.resizeInPopUp(titleMessageHtml, params);

                //Filtro de veces de ejecucion
                self.showTitleReady = true;

            });
    },

    hideTitle: function () {
        self = this;
        var content = self.getContent();
        var titleHeader = $(".ui-bizagi-webpart-header-container", content);
        if (titleHeader.length > 0) {
            titleHeader.empty();
        }
    },
    resizeInPopUp: function (titleMessageHtml, params) {
        var self = this;
        if (self.adjustButtonsToContent && (self.adjustButtonsToContent == "true" || self.adjustButtonsToContent == true)) {
            if (self.isWebpartInIFrame) {
                self.resizeInPopUpinIFrame(titleMessageHtml, params);

                $(window).resize(function () {
                    self.resizeInPopUpinIFrame(titleMessageHtml, params);
                });
            }
            else {
                self.resizeInPopUpHTML(titleMessageHtml, params);

                $(window).resize(function () {
                    self.resizeInPopUpHTML(titleMessageHtml, params);
                });
            }
        }
    },

    resizeInPopUpHTML: function (titleMessageHtml, params) {
        var self = this;
        var heightHeader = titleMessageHtml.outerHeight() || 0;
        if ($(".activitiFormContainer").length > 0) {
            $(".activitiFormContainer").css("height", "90%");
            var heightActivitiFormContainer = $(".activitiFormContainer").outerHeight() || 0;
            var renderForm = $("#ui-bizagi-webpart-render-container", self.getContent());
            if (params.idWorkitem) {
                //display buttons
                var buttonContainer = $(".ui-bizagi-button-container", self.getContent());
                var heightButtonContainer = buttonContainer.outerHeight() || 0;
                buttonContainer.appendTo(renderForm.parent());
                buttonContainer.addClass("ui-bizagi-button-container-popup");
                var fixedHeight = heightActivitiFormContainer - heightHeader - 38 - heightButtonContainer;
                if(bizagi.util.isSharepointContext()) {
                    renderForm.css("height","auto");
                    if(renderForm.outerHeight() > fixedHeight) {
                        renderForm.height(fixedHeight);
                    } else {
                        $(".activitiFormContainer").css("padding-bottom", "38px");
                        $(".activitiFormContainer").height("auto");
                        document.getElementById("bz-webpart").scrollIntoView();
                    }
                } else {
                    renderForm.height(fixedHeight);
                }
                
            }
            else {
                //NOT display buttons
                renderForm.height(heightActivitiFormContainer - heightHeader - 48);
            }

            renderForm.css('overflow-y', 'auto');
            renderForm.css('overflow-x', 'hidden');
        }
    },

    resizeInPopUpinIFrame: function (titleMessageHtml, params) {
        var self = this;
        var renderForm = $('body');
        if (params.idWorkitem) {
            var buttonContainer = $(".ui-bizagi-button-container", self.getContent());
            buttonContainer.appendTo(renderForm);
            buttonContainer.addClass("ui-bizagi-button-container-popup");

            buttonContainer.css({ 'position': 'fixed', 'bottom': '0px', 'width': '100%', 'margin':'0','background-color': '#F3F3F3','z-index':'auto'});

            var heightButtonContainer = buttonContainer.height() || 0;
            heightButtonContainer = heightButtonContainer * 2;
            renderForm.css({'padding-bottom': heightButtonContainer + 'px'});
            renderForm.css({'height': '100%'});
        }
    },

    destroy: function () {
        var self = this;

        self.unsubscribe("ui-bizagi-show-render");
        self.unsubscribe("ui-bizagi-show-render-new");
        self.unsubscribe("ui-bizagi-show-cases");

    },

    canHide: function () {
        var self = this;
        if (self.avoidVerifyCanHide) {
            self.avoidVerifyCanHide = undefined;
            //send a deferred whit always resolve promise
            var deferred = $.Deferred().resolve();
            return deferred.promise();
        }
        // Check if there asre some pending changes
        return bizagi.util.autoSave();
    },

    prepareForRefresh: function () {
        var self = this;
        var content = self.getContent();
        var canvas = $("#ui-bizagi-webpart-render-container", content);
        canvas.off();
        $(window).unbind("resize");

        // Dispose current rendering instance
        if (this.rendering) {
            this.rendering.dispose();
            delete this.rendering;
        }
    },

    loadExternalThemeStyles: function (e) {
        var self = this;
        self.externalStyle = e.message;
        self.readExternalTheme(e.message);
    },

    subscribeToGoDown: function () {
        window.scrollTo(0, document.body.scrollHeight);
    },

    loadGlobalForm: function(e) {
        var self = this;
        var params = {};
        params.idCase = e.message.idCase;
        params.idWorkitem = null;
        params.data = null;
        params.guid = null;
        self.renderingExecute(params);
    },

    loadFormCase: function (e) {
        var self = this;
        self.params.idCase = e.message.idCase;
        self.params.idWorkitem = e.message.idWorkItem;
        self.params.fromLoadFormCase = true;

        var params = {};
        params.idCase = e.message.idCase;
        params.idWorkitem = e.message.idWorkItem;
        params.data = null;
        params.guid = null;
        if (params.idWorkitem && params.idCase) {
            self.renderingExecute(params);
        } else if (!params.idWorkitem && params.idCase) {
            $.when(self.dataService.getCaseSummary({
                idCase: params.idCase,
                onlyUserWorkItems: true
            }))
            .done(function (summaryResponse) {
                var currentState =  summaryResponse.currentState[0];
                if ( currentState ) {
                    params.idWorkitem = currentState.idWorkItem;
                    self.renderingExecute(params);
                } else {
                    self.performRouting();
                }
            });
        }
    },

    createCase: function (e) {
        var self = this;
        self.hideTitle();
        self.params.fromLoadFormCase = false;
        var content = self.getContent();
        var canvas = $("#ui-bizagi-webpart-render-container", content);
        if (canvas.length > 0) {
            $(canvas).empty();
        }
        var params = {
            idWfClass : e.message.idWfClass,
            accumulatedContext: e.message.accumulatedContext,
            guidAction: e.message.guidAction
        };
        self.params.idWfClass = parseInt(params.idWfClass);
        self.params.accumulatedContext = params.accumulatedContext || [];
        if( self.params.idWorkitem ) delete self.params.idWorkitem;
        if( self.params.fromWorkItemId ) delete self.params.fromWorkItemId;
        self.params.guidAction = params.guidAction;
        if (params.guidAction) {
            // Perform the mapping  
            return $.when(self.dataService.getMapping({
                guidAction: params.guidAction,
                accumulatedContext: { context: JSON.parse(params.accumulatedContext) }
            })).pipe(function (mappings) {
                return self.startProcessPostMessage(params, mappings);
            });
        } 
        return $.when(self.startProcessPostMessage(params));
    },

    pendingChanges: function () {
        var self = this;
        var changes = [];
        if (self.rendering.form) {
            self.rendering.form.hasChanged(changes);
        }
        bizagi.iframeCommunicator.trigger( changes.length > 0 ?  "form-has-changes" : "form-without-changes");
    },

    saveForm: function () {
        var self = this;
        var data = {};
        self.rendering.form.collectRenderValues(data);
        $.when(self.rendering.form.saveForm(data)).done(function () {
            bizagi.iframeCommunicator.trigger("form-saved");
        });
    },

    readExternalTheme: function (theme) {
        var self = this;

        // Apply external styles to custom override theme
        var externalThemeCssUrl = "jquery/webparts/desktop/SharePoint/render/bizagi.webpart.render.externaltheme.less";
        $.ajax({ url: externalThemeCssUrl, dataType: "text" })
            .done(function (text) {
                var processedVars = ""
                for (name in theme) {
                    processedVars += ((name.slice(0, 1) === '@') ? '' : '@') + name + ': ' +
                        ((theme[name].slice(-1) === ';') ? theme[name] : theme[name] + ';');
                }
                less.render(text + processedVars, function(err, processedCss) {
                    if (!err) {
                        self.createDynamicStyleSheet(processedCss.css);
                    }
                });
            });
    },

    applyExternalThemeStyles: function () {
        var self = this;

        // Set up a global flag to avoid apply this every time this webpart is rendered
        if (bizagi.externalStylesApplied) return;
        self.createDynamicStyleSheet(self.externalStyle);
        bizagi.externalStylesApplied = true;
    },

    addIframeCommunicationListener: function (eventName, callbacks) {
        var self = this;
        if (callbacks.runBefore) {
            callbacks.runBefore();
        }
        if (!bizagi.iframeCommunicator.subscribers[eventName]) {
            bizagi.iframeCommunicator.subscribe(eventName, function (params) {
                if (params.sitesEl) {
                    $.ajaxSetup({
                        headers: {
                            'Authorization': location.search.match(/sitesEl=([^&]*)/) ? "Bearer " + ((location.search.match(/sitesEl=([^&]*)/))[0].split("="))[1] : ''
                        }
                    });
                }
                var thenCallback = callbacks.then.bind(self);
                thenCallback(params);
            });
        } 
    },

    jsonToStyle: function (json) {
        var result = "";
        for (var key in json) {
            result += '' + key + ': ' + json[key] + ';'
        }
        return result;
    },

    createDynamicStyleSheet: function (styles) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

});
