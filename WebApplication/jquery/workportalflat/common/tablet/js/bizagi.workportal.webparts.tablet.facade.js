/*
*   Name: BizAgi Smartphone Workportal Facade
*   Author: Bizagi Mobile Team
*   Comments:
*   -   This script will define a workportal facade to access to all components
*/


$.Class.extend("bizagi.workportal.tablet.facade", {
    render_module: "renderingflat",

    setup: function () {                
        this.render_module = bizagi.override.enableMSF ? "rendering" : "renderingflat";
    },
    /*
    *   Returns the implementation class by widget
    */
    getWidgetImplementation: function(widget) {
        bizagi.log("getWidgetImplementation" + widget);
    }
}, {
    /*
    *   Constructor
    */
    init: function(dataService, device) {
        var self = this;
        self.templates = {};
        self.dataService = dataService;
        self.setMobileMetaTags();
        self.setMobileIcons();
        self.modules = {};
        self.device = device;
        self.homePortalFramework = new bizagi.workportal.homeportalFramework(this);

        if (bizagi.override.enableMSF) {
            if (bizagi.hasOwnProperty("kendo")) {
                self.templateService = new bizagi.kendo.templates.services.service(bizagi.localization);
            } else {
                self.templateService = new bizagi.templates.services.service(bizagi.localization);
            }
        } else {
            self.templateService = new bizagi.kendo.templates.services.service(bizagi.localization);
        }
    },

    /* SETS iPhone META TAGS
    =====================================================*/
    setMobileMetaTags: function () {
        $('<meta>', {
            name: "apple-mobile-web-app-capable",
            content: "yes"
        }).appendTo('head');

        $('<meta>', {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1, user-scalable=no"
        }).appendTo('head');

        $('<link>', {
            rel: 'apple-touch-icon-precomposed',
            href: 'jquery/common/base/css/tablet/images/BizAgi_logo.png'
        }).appendTo('head');

        $('<link>', {
            rel: 'apple-touch-startup-image',
            href: 'jquery/common/base/css/tablet/images/splash.png'
        }).appendTo('head');
    },

    setMobileIcons: function () {
        var generatedIcons = '<svg xmlns="http://www.w3.org/2000/svg" display="none" width="0" height="0" id="genome-mobile-icons"><defs> <path d="M14,11 C14.5522847,11 15,11.4477153 15,12 C15,12.5522847 14.5522847,13 14,13 C13.4477153,13 13,12.5522847 13,12 C13,11.4477153 13.4477153,11 14,11 Z M10.62,11.22 C10.8071865,11.4087188 10.9115368,11.664197 10.91,11.93 C10.9115368,12.195803 10.8071865,12.4512812 10.62,12.64 L8.53,14.71 C8.34373936,14.8947442 8.09233988,14.9988954 7.83,15 C7.5627541,14.9988906 7.30707144,14.8908556 7.12,14.7 C6.73227641,14.3099625 6.73227641,13.6800375 7.12,13.29 L7.42,13 L4.55,13 C3.61113249,13.0026559 2.7096639,12.6322374 2.04390894,11.9702332 C1.37815398,11.308229 1.00264842,10.4088675 1,9.47 L1,7 C1,6.44771525 1.44771525,6 2,6 C2.55228475,6 3,6.44771525 3,7 L3,9.47 C3.01094569,10.3182207 3.70170869,11.0000706 4.55,11 L7.55,11 L7.12,10.58 C6.93068735,10.3922334 6.82420168,10.1366375 6.82420168,9.87 C6.82420168,9.60336246 6.93068735,9.3477666 7.12,9.16 C7.51003745,8.77227641 8.13996255,8.77227641 8.53,9.16 L10.62,11.22 Z M2,3 C2.55228475,3 3,3.44771525 3,4 C3,4.55228475 2.55228475,5 2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 Z M11.45,3 C12.3888675,2.99734409 13.2903361,3.36776255 13.9560911,4.02976678 C14.621846,4.691771 14.9973516,5.59113247 15,6.53 L15,9 C15,9.55228475 14.5522847,10 14,10 C13.4477153,10 13,9.55228475 13,9 L13,6.53 C12.9890543,5.6817793 12.2982913,4.99992938 11.45,5 L8.45,5 L8.88,5.42 C9.06931265,5.6077666 9.17579832,5.86336246 9.17579832,6.13 C9.17579832,6.39663754 9.06931265,6.6522334 8.88,6.84 C8.69128117,7.02718651 8.43580298,7.13153676 8.17,7.13 C7.90766012,7.12889538 7.65626064,7.02474416 7.47,6.84 L5.38,4.78 C5.19281349,4.59128117 5.08846324,4.33580298 5.09,4.07 C5.08846324,3.80419702 5.19281349,3.54871883 5.38,3.36 L7.47,1.29 C7.86212218,0.900639269 8.49563924,0.902877853 8.88499998,1.29500002 C9.27436072,1.68712218 9.27212216,2.32063925 8.88,2.71 L8.58,3 L11.45,3 Z" id="icon-sync-path-1"/> </defs><symbol viewBox="0 0 16 16" id="icon-sync"><desc>Created with sketchtool.</desc> <!-- Generator: sketchtool 54.1 (76490) - https://sketchapp.com -->    <g id="icon-sync-Mobile-Prototype" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon-sync-Inbox-Offline-Edited" transform="translate(-311.000000, -157.000000)"> <g id="icon-sync-cases" transform="translate(0.000000, 141.000000)"> <g id="icon-sync-case"> <g id="icon-sync-edited" transform="translate(311.000000, 16.000000)"> <g id="icon-sync-2.0/16x/cloud"> <mask id="icon-sync-mask-2" fill="white"> <use xlink:href="#icon-sync-path-1"/> </mask> <use id="icon-sync-Mask" fill="#9E9E9E" xlink:href="#icon-sync-path-1"/> </g> </g> </g> </g> </g> </g> </symbol><symbol viewBox="0 0 32 32" id="icon-trash"><desc>Created with sketchtool.</desc> <!-- Generator: sketchtool 54.1 (76490) - https://sketchapp.com -->   <g id="icon-trash-Mobile-Prototype" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon-trash-Drafts-Offline" transform="translate(-335.000000, -149.000000)"> <g id="icon-trash-cases" transform="translate(0.000000, 141.000000)"> <g id="icon-trash-case"> <g id="icon-trash-icon" transform="translate(335.000000, 8.000000)"> <rect id="icon-trash-box" x="0" y="0" width="32" height="32"/> <path d="M21,13 C21.553,13 22,13.447 22,14 L22,21 C22,22.654 20.654,24 19,24 L13,24 C11.346,24 10,22.654 10,21 L10,14 C10,13.447 10.447,13 11,13 C11.553,13 12,13.447 12,14 L12,21 C12,21.552 12.448,22 13,22 L19,22 C19.552,22 20,21.552 20,21 L20,14 C20,13.447 20.447,13 21,13 Z M14,19.5 C14,19.776 13.776,20 13.5,20 C13.224,20 13,19.776 13,19.5 L13,14.5 C13,14.224 13.224,14 13.5,14 C13.776,14 14,14.224 14,14.5 L14,19.5 Z M16.5,19.5 C16.5,19.776 16.276,20 16,20 C15.724,20 15.5,19.776 15.5,19.5 L15.5,14.5 C15.5,14.224 15.724,14 16,14 C16.276,14 16.5,14.224 16.5,14.5 L16.5,19.5 Z M19,19.5 C19,19.776 18.776,20 18.5,20 C18.224,20 18,19.776 18,19.5 L18,14.5 C18,14.224 18.224,14 18.5,14 C18.776,14 19,14.224 19,14.5 L19,19.5 Z M23,10 C23.553,10 24,10.447 24,11 C24,11.553 23.553,12 23,12 L9,12 C8.447,12 8,11.553 8,11 C8,10.447 8.447,10 9,10 L13,10 L13,9 C13,8.447 13.447,8 14,8 L18,8 C18.553,8 19,8.447 19,9 L19,10 L23,10 Z" id="icon-trash-trash" fill="#9E9E9E"/> </g> </g> </g> </g> </g> </symbol><symbol viewBox="0 0 24 24" id="icon-check-mark"><g id="icon-check-mark-check-mark-24x"><path d="M8.11,19.36a1,1,0,0,1-.71-.29l-4.95-5a1,1,0,0,1,0-1.41,1,1,0,0,1,1.42,0L8.11,17l12-12a1,1,0,0,1,1.42,0,1,1,0,0,1,0,1.41L8.82,19.07A1,1,0,0,1,8.11,19.36Z"/></g></symbol><symbol viewBox="0 0 16 16" id="icon-close"><g id="icon-close-close-16x"><path d="M9.41,8l5.3-5.29a1,1,0,1,0-1.42-1.42L8,6.59,2.71,1.29A1,1,0,0,0,1.29,2.71L6.59,8l-5.3,5.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L8,9.41l5.29,5.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-download"><g id="icon-download-download-24x"><path d="M22,23H2a1,1,0,0,1-1-1V17a1,1,0,0,1,2,0v4H21V17a1,1,0,0,1,2,0v5A1,1,0,0,1,22,23Z"/><path d="M19,10a1,1,0,0,0-.29-.71,1,1,0,0,0-1.42,0L13,13.58V2a1,1,0,0,0-2,0V13.58L6.71,9.29a1,1,0,0,0-1.42,1.42l6,6a.91.91,0,0,0,.33.22.69.69,0,0,0,.24,0A.7.7,0,0,0,12,17a.7.7,0,0,0,.14,0,.69.69,0,0,0,.24,0,.91.91,0,0,0,.33-.22l6-6A1,1,0,0,0,19,10Z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-offline"><desc>Created with sketchtool.</desc> <!-- Generator: sketchtool 54.1 (76490) - https://sketchapp.com -->   <g id="icon-offline-Mobile-Prototype" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon-offline-Inbox-Offline" transform="translate(-32.000000, -97.000000)" fill="#9E9E9E"> <g id="icon-offline-controls/alert" transform="translate(16.000000, 84.000000)"> <g id="icon-offline-icon" transform="translate(16.000000, 13.000000)"> <path d="M7.86075713,14.278983 L8.17741033,13.9623298 C8.61266861,13.5270715 9.31870454,13.5270715 9.75396283,13.9623298 L12.0238702,16.2322372 L14.2937776,13.9623298 C14.7290359,13.5270715 15.4350718,13.5270715 15.8703301,13.9623298 L16.1869833,14.278983 C16.6222416,14.7146143 16.6222416,15.4202772 16.1869833,15.8555355 L13.9170759,18.1250699 L16.0777025,20.2856965 C16.5129608,20.7209548 16.5129608,21.4273637 16.0777025,21.862622 L15.7610493,22.1789022 C15.325791,22.6141605 14.6197551,22.6141605 14.1844968,22.1789022 L12.0238702,20.0182756 L9.86287064,22.1789022 C9.42761236,22.6141605 8.72157643,22.6141605 8.28631815,22.1789022 L7.96966495,21.862622 C7.53440666,21.4273637 7.53440666,20.7209548 7.96966495,20.2856965 L10.1302915,18.1250699 L7.86075713,15.8555355 C7.42549885,15.4202772 7.42549885,14.7142413 7.86075713,14.278983 M4.49878784,10.0558215 C6.56169578,8.40765836 9.17138062,7.41517996 12.0171567,7.41517996 C14.846522,7.41517996 17.4431529,8.39572325 19.5008392,10.0267297 C19.8999192,10.2557344 20.1714428,10.6812955 20.1714428,11.1743644 C20.1714428,11.9080002 19.5769255,12.5025176 18.8436626,12.5025176 C18.4408529,12.5025176 18.0842917,12.3193883 17.840741,12.0359296 L17.8317896,12.044881 C16.2276372,10.7887114 14.2128427,10.0334432 12.0175297,10.0334432 C9.81028159,10.0334432 7.78504382,10.7965438 6.17678871,12.0646485 L6.16746441,12.0553242 C5.92391372,12.3440045 5.56399577,12.5316094 5.15671039,12.5316094 C4.42307453,12.5316094 3.82855722,11.9370921 3.82855722,11.2034562 C3.82818425,10.7103873 4.09970784,10.2851992 4.49878784,10.0558215 M24,7.33573693 C24,8.06899981 23.4054827,8.6638901 22.6714739,8.6638901 C22.2716479,8.6638901 21.9173245,8.48337167 21.6737739,8.20326972 L21.632001,8.24504258 C19.0402188,6.00497296 15.6648225,4.64660906 11.9701622,4.64660906 C8.288183,4.64660906 4.92322994,5.99564866 2.3348045,8.22191832 C2.09125381,8.50798782 1.73282775,8.69298191 1.32815317,8.69298191 C0.594517312,8.69298191 0,8.0984646 0,7.36482874 C0,6.90495431 0.234226394,6.49990676 0.589668677,6.26157767 C3.65475228,3.60937403 7.64629825,2 12.0175297,2 C16.3730963,2 20.3515882,3.59818487 23.4118232,6.2332318 C23.7665195,6.47156089 24,6.87623547 24,7.33573693" id="icon-offline-icon-offline"/> </g> </g> </g> </g> </symbol><symbol viewBox="0 0 16 16" id="icon-refresh"><g id="icon-refresh-refresh-16x"><path d="M13.84,7.16a1,1,0,0,0-1,1,4.85,4.85,0,1,1-2.05-4h-1a1,1,0,0,0,0,2H13a1,1,0,0,0,1-1V2a1,1,0,0,0-2,0v.57a6.84,6.84,0,1,0,2.89,5.59A1,1,0,0,0,13.84,7.16Z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-retrieve-offline"><g id="icon-retrieve-offline-retrieving-24x"><path d="M5.24,13.45a2.86,2.86,0,0,1-.1-4.64l.78-.59-.26-.94a1.09,1.09,0,0,1,0-.26A1.34,1.34,0,0,1,7,5.71a1.65,1.65,0,0,1,.38,0l1.13.33.55-1a3.91,3.91,0,0,1,3.48-2,4,4,0,0,1,2.37.8l1.43-1.43A6,6,0,0,0,7.49,3.75,3.35,3.35,0,0,0,3.63,7a3,3,0,0,0,0,.42,4.83,4.83,0,0,0,.16,7.42Z"/><path d="M18.33,5.71a5.13,5.13,0,0,0-.26-.87l2.14-2.13a1,1,0,1,0-1.42-1.42l-15,15a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L6.92,16H11v3.59l-1.29-1.3a1,1,0,0,0-1.42,1.42l3,3a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l3-3a1,1,0,0,0-1.42-1.42L13,19.59V16h3.64A5.27,5.27,0,0,0,18.33,5.71ZM16.64,14H8.91l7.51-7.51.11.81.95.24A3.27,3.27,0,0,1,16.64,14Z"/></g></symbol><symbol viewBox="0 0 24 24" id="icon-warning"><g id="icon-warning-warning-24x"><path d="M21.33,23H2.62A2,2,0,0,1,.83,20.11L10.18,2.33A2,2,0,0,1,12,1.24h0a2,2,0,0,1,1.79,1.11l9.36,17.74A2,2,0,0,1,21.33,23ZM12,3.26,2.6,21l18.74,0Z"/><path d="M12,16a1,1,0,0,1-1-1V8a1,1,0,0,1,2,0v7A1,1,0,0,1,12,16Z"/><circle cx="12" cy="18" r="1"/></g></symbol></svg>'
        $("head").append(generatedIcons);
    },

    /*
    *   This function will load asynchronous stuff needed in the module
    */
    initAsyncStuff: function() {
        var self = this;
        // Load default templates            
        return $.when(self.loadTemplate("base", bizagi.getTemplate("base.workportal.tablet")))
            .then(function(template) {
                var def = new $.Deferred();
                $("body").append(template);
                bizagi.util.tablet.startkendo({
                    started: function() {
                        def.resolve();
                    }
                });
                return def.promise();
            });
    },

    /*
    *   Load one template and save it internally
    */
    loadTemplate: function(template, templateDestination) {
        var self = this;
        // Go fetch the template
        return self.templateService.getTemplate(templateDestination, template)
            .done(function(resolvedTemplate) {
                if (typeof resolvedTemplate === "string") {
                    self.templates[template] = $.trim(resolvedTemplate.replace(/\n/g, ""));
                }
            });
    },

    /*
    *   Load one template and save it internally
    */
    loadTemplateWebpart: function(template, templateDestination) {
        var self = this;

        // Go fetch the template
        return self.templateService.getTemplateWebpart(templateDestination, template)
            .done(function(resolvedRemplate) {
                self.templates[template] = $.trim(resolvedRemplate.replace(/\n/g, ""));
            });
    },

    /*
    *   Method to fetch templates from a private dictionary
    */
    getTemplate: function(template) {
        var self = this;
        return self.templates[template];
    },
    /*
    *   Initializes a webpart
    */
    loadWebpart: function(params) {
        var self = this;
        var defer = new $.Deferred();
        var webpartName = params.webpart;
        var webpart = bizagi.getWebpart(webpartName, params);

        if (!webpart) {
            bizagi.log("webpart not found");
        }

        if (bizagi.loader.environment === "release") {
            defer.resolve(webpart);
        } else {
            // Ensure the webpart is initialized
            $.when(bizagi.util.initWebpart(webpart, self.device))
                .done(function() {
                    // Load all templates asyncronously
                    $.when.apply(this, $.map(webpart.tmpl, function(tmpl) {
                        return self.loadTemplateWebpart(tmpl.originalAlias, bizagi.getTemplate(tmpl.alias, true));
                    })).done(function() {
                        defer.resolve(webpart);
                    });

                });
        }

        return defer.promise();
    },

    /*
    *   Returns a webpart
    */
    getWebpart: function(webpartImplementation, params) {
        try {

            // Create a dynamic function to avoid problem with eval calls when minifying the code
            if (webpartImplementation.indexOf("bizagi") === -1) {
                webpartImplementation = "bizagi.workportal.webparts." + webpartImplementation;
            }

            var dynamicFunction;
            var stringBuilder = ["var baDynamicFn = function(facade, dataService, params){ \r\n"];

            stringBuilder.push("return new " + webpartImplementation + "(facade, dataService, params);\r\n");
            stringBuilder.push("}\r\n");
            stringBuilder.push("baDynamicFn");

            dynamicFunction = eval(stringBuilder.join("\n"));

            // Call the dynamic function
            return dynamicFunction(this, this.dataService, params);

        } catch (e) {
            bizagi.log(e);
        }
    },

    /*
    * call the render method for webparts and insert into canvas
    */
    executeWebpart: function(params) {
        var self = this;
        var defer = new $.Deferred();

        $.when(self.loadWebpart(params)).done(function(webpart) {
            var webpartImplementation = webpart["class"];
            var dynamic = self.getWebpart(webpartImplementation, params);

            $.when(dynamic.render($.extend(params, { creating: false }))).done(function() {

                params.canvas.triggerHandler("ondomincluded");
                defer.resolve(dynamic);

            });
        });
        return defer.promise();
    },

    executeWebparts: function() {
        var self = this;

        // load rendering first
        self.loadModule(self.Class.render_module);

        return $.when(self.dataService.getCurrentUser()).fail(function(err) {
            $.when(self.dataService.logoutMobile())
                .always(function(response) {
                    self.defaultLogout();
                });
        }).pipe(
            function(currentUser) {
                // Sacar de este lugar cuando se adicione el security al currentUser
                currentUser.userProperties = {};
                var userProperty;
                var i = -1;

                while ((userProperty = currentUser.sUserProperties[++i])) {
                    currentUser.userProperties[userProperty.key] = userProperty.value;
                }

                bizagi.currentUser = currentUser;
                var startpage = currentUser.userProperties.userstartpage = currentUser.userProperties.userstartpage || "";
                self.sortMenuItemsByStartPage(startpage, currentUser);


                return $.when(self.loadReleaseTemplates()).then(function() {
                    return $.when(
                        self.executeWebpart({
                            webpart: "homePortal",
                            canvas: $("body")
                        }),
                        self.executeWebpart({
                            webpart: "menu",
                            canvas: $("body")
                        }),
                        self.executeWebpart({
                            webpart: "newcase",
                            canvas: $("body")
                        }),
                        self.executeWebpart({
                            webpart: "render",
                            canvas: $("body")
                        })).then(function() {
                        bizagi.debug("Finalizo ejecución de webparts workportal");
                    });
                });
            }
        );
    },

    loadReleaseTemplates: function() {

        if (bizagi.loader.environment !== "release") {
            return true;
        }

        var self = this;
        var defer = new $.Deferred();
        var prefix = bizagi.loader.useAbsolutePath ? bizagi.loader.basePath + bizagi.loader.getLocationPrefix() : "" + bizagi.loader.getLocationPrefix();
        var url = prefix + "jquery/workportalflat/production/" + this.device.replace(/[^a-z0-9]+/gi, "") + "/webpart." + this.device.replace(/[^a-z0-9]+/gi, "") + ".production.tmpl.html?build=" + bizagi.loader.build;

        steal.then({
            src: url,
            id: url,
            type: "text",
            waits: false,
            onError: function(options) {
                bizagi.log("Could not load file " + options.src, options, "error");
                defer.reject(options);
            }
        }).then(function() {
            var waitingTime = 1000;
            setTimeout( function() {
                var data = steal.resources[url].options.text;
                self.templates = eval("(" + data + ")");

                Object.keys(self.templates).map(function(key) {
                    self.templates[key] = self.templateService.localization.translate(self.templates[key]);
                });

                defer.resolve();
            }, waitingTime);            
        });

        return defer.promise();
    },

    sortMenuItemsByStartPage: function(startpage, currentUser) {
        var self = this;

        /*
        Values userstartpage property
        1. "" -> El usuario no ha configurado esta opción(usuario viejo).
        2. "1" -> Automatic
        3. "2" -> Me
        4. "3" -> Inbox
        */

        if (startpage === "1" || startpage === "2") {
            if (typeof currentUser.associatedStakeholders !== "undefined" && currentUser.associatedStakeholders.length > 0) {
                // Merge layouts - Load dashboard
                self.homePortalFramework.homePortalLayout = $.extend(self.homePortalFramework.homePortalLayoutDashboard,
                    self.homePortalFramework.homePortalLayoutTaskFeed,
                    self.homePortalFramework.homePortalLayoutComplement);
            } else {
                // Merge layouts - Load task feed
                self.homePortalFramework.homePortalLayout = $.extend(self.homePortalFramework.homePortalLayoutTaskFeed,
                    self.homePortalFramework.homePortalLayoutDashboard,
                    self.homePortalFramework.homePortalLayoutComplement);
            }
        } else {
            // Merge layouts - Load task feed
            self.homePortalFramework.homePortalLayout = $.extend(self.homePortalFramework.homePortalLayoutTaskFeed,
                self.homePortalFramework.homePortalLayoutDashboard,
                self.homePortalFramework.homePortalLayoutComplement);
        }
    },

    loadModule: function(bizagiModule) {
        var self = this;
        if (typeof bizagiModule !== "string") {
            return;
        }

        if (typeof self.modules[bizagiModule] !== "undefined") {
            return self.modules[bizagiModule];
        }

        self.modules[bizagiModule] = new $.Deferred();

        bizagi.loader.start(bizagiModule).then(function() {
            self.modules[bizagiModule].resolve();
        });

        return self.modules[bizagiModule].promise();
    },

    defaultLogout: function() {
        /* istanbul ignore next: untestable */
        if (bizagi.util.isCordovaSupported()) {
            window.location = bizagi.services.ajax.logoutPage;
        } else {
            window.location.replace("");
        }
    }
});