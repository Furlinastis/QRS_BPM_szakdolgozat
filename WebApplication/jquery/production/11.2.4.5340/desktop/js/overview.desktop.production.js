bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.dashboard.menu.activity",{},{init:function(e,t,a){var i=this;i.params=a||{},i._super(e,t,a),i.loadTemplates({"project-dashboard-menu":bizagi.getTemplate("bizagi.workportal.desktop.widgets.project.dashboard.menu.activity").concat("#project-dashboard-menu1")})},renderContent:function(){return this.content=$("<div></div>"),this.content},postRender:function(){var e=this;e.params.contextsLeftSidebarCaseDashboard.forEach(function(t){e.sub(t,$.proxy(e.updateView,e))})},updateView:function(e,t){var a=this;a.params=$.extend(a.params,t.args),a.params.plan.idActivitySelected=void 0,a.clean();var i=a.getContent().empty();void 0!==e.type&&(a.params.showContextByMenuDashboard=e.type);var r={showFormOverview:a.params.menuDashboard.showFormOverview,showFormActivity:a.params.menuDashboard.showFormActivity,showCommentsOptionMenu:a.params.menuDashboard.showCommentsOptionMenu,showFilesOptionMenu:a.params.menuDashboard.showFilesOptionMenu,showTimeLineOptionMenu:a.params.menuDashboard.showTimeLineOptionMenu&&(!a.params.isAdhocProcess||a.params.isAdhocProcess&&bizagi.util.isEnableFeature("enableTimelineOnLiveProcesses")),showPlanOptionMenu:a.params.menuDashboard.showPlanOptionMenu,contextPlanOptionMenu:a.params.menuDashboard.contextPlanOptionMenu,contextFormActivityOptionMenu:a.params.menuDashboard.contextFormActivityOptionMenu};a.getTemplate("project-dashboard-menu").render(r).appendTo(i),a.params.showContextByMenuDashboard&&$("li[data-context='"+a.params.showContextByMenuDashboard.toUpperCase()+"']",a.content).addClass("active").siblings().removeClass("active"),a.handlerEvents()},loadContentById:function(e){var t=this;e.preventDefault();var a=$(e.target).closest("li");if(!a.hasClass("active")){var i=a.data("context");if(i){var r=t.pub("notify",{type:"NAVIGATOR_GETLEVEL"}),o=parseInt(r[0],10),s="",n=o;"PLANACTIVITIES"==i&&(n=o+1,s=bizagi.localization.getResource("workportal-project-casedashboard-plan")),t.params.refreshLastItemBreadcrumb=!1,t.pub("notify",{type:i.toUpperCase(),args:$.extend(t.params,{showContextByMenuDashboard:i,histName:s,level:n})}),$("li[data-context='"+t.params.showContextByMenuDashboard.toUpperCase()+"']",t.content).addClass("active").siblings().removeClass("active")}}},subMenuHandler:function(){var e=this.getContent(),t=$("[data-context='COMMENTS']",e),a=$("[data-context='FILES']",e),i=$("[data-context='TIMELINE']",e);$(".ui-bizagi-wp-project-tab-submenu a",e).on("click",function(){t.toggle(),a.toggle(),i.toggle()})},handlerEvents:function(){var e=this,t=e.getContent();e.subMenuHandler(),$(".ui-bizagi-wp-project-tab-links a",t).on("click",$.proxy(e.loadContentById,e)),$(".ui-bizagi-wp-project-tab-links li .ui-bizagi-refresh-form",t).on("click",function(){var t={action:bizagi.workportal.actions.action.BIZAGI_WORKPORTAL_ACTION_ROUTING,idCase:e.params.idCase,idTask:e.params.idTask,idWorkflow:e.params.idWorkflow,idWorkItem:e.params.idWorkitem,referrer:e.params.referrer||"inboxGrid"};e.publish("executeAction",t)})},clean:function(){var e=this,t=e.getContent();e.params&&e.params.contextsLeftSidebarCaseDashboard&&e.params.contextsLeftSidebarCaseDashboard.forEach(function(t){e.unsub(t,$.proxy(e.updateView,e))}),$(".ui-bizagi-wp-project-tab-links a",t).off(),$(".ui-bizagi-wp-project-tab-links li .ui-bizagi-refresh-form",t).off()}}),bizagi.injector.register("bizagi.workportal.widgets.project.dashboard.menu.activity",["workportalFacade","dataService",bizagi.workportal.widgets.project.dashboard.menu.activity],!0),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.content.dashboard",{},{init:function(e,t,a){this._super(e,t,a),this.loadTemplates({"project-content-dashboard":bizagi.getTemplate("bizagi.workportal.desktop.widget.project.content.dashboard").concat("#project-plan-content-dashboard")})},renderContent:function(){var e=this,t=e.getTemplate("project-content-dashboard");return e.content=t.render({}),e.content},postRender:function(){setTimeout(function(){$(window).trigger("resize")},1e3)}}),bizagi.injector.register("bizagi.workportal.widgets.project.content.dashboard",["workportalFacade","dataService",bizagi.workportal.widgets.project.content.dashboard],!0),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.overview",{},{init:function(e,t,a){this._super(e,t,a),this.loadTemplates({"project-overview":bizagi.getTemplate("bizagi.workportal.desktop.widgets.project.overview").concat("#project-overview"),"project-overview-no-summary-form-found":bizagi.getTemplate("bizagi.workportal.desktop.widgets.project.overview").concat("#project-overview-no-summary-form-found")})},renderContent:function(){var e=this,t=e.getTemplate("project-overview");return e.content=t.render({}),e.content},postRender:function(){var e=this,t=e.getContent(),a=$("#ui-bizagi-wp-project-overview-wrapper",t);a.bind("oldrenderintegration",function(t){if(!t.isPropagationStopped()){t.stopPropagation();var i=e.workportalFacade.getTemplate("inbox-common-case-summary-oldrender"),r={};bizagi.oldrenderevent=!0;var o=window.addEventListener?"addEventListener":"attachEvent";(0,window[o])("attachEvent"==o?"onmessage":"message",function(t){t.stopPropagation(),e.publish("executeAction",{action:bizagi.workportal.actions.action.BIZAGI_WORKPORTAL_ACTION_ROUTING,idCase:t.data})},!1),$.when(e.dataService.getWorkitems({idCase:e.params.idCase,onlyUserWorkItems:!0})).done(function(t){if("object"==typeof t.workItems&&t.workItems.length>=1){var o=t.workItems[0].idWorkItem,s=t.workItems[0].idTask;r.url=e.dataService.serviceLocator.getUrl("old-render")+"?PostBack=1&idCase="+e.idCase+"&idWorkitem="+o+"&idTask="+s+"&isSummary=1"}else r.url=e.dataService.serviceLocator.getUrl("old-render")+"?PostBack=1&idCase="+e.idCase+"&isSummary=1";a.empty(),$.tmpl(i,r).appendTo(a),e.iframeOldRender($("iframe",a))})}});var i={idCase:e.params.idCase};$.when(e.dataService.getCaseFormsRenderVersion(i)).done(function(i){1==i.formsRenderVersion?a.trigger("oldrenderintegration"):e.renderSummaryForm(e.params.idCase,$("#ui-bizagi-wp-project-overview-wrapper",t))})},renderSummaryForm:function(e,t){var a=this,i=null!=typeof a.dataService.serviceLocator.proxyPrefix?a.dataService.serviceLocator.proxyPrefix:"",r=new bizagi.rendering.facade({proxyPrefix:i});r.execute({canvas:t,summaryForm:!0,idCase:e}),r.subscribe("no-data-found",function(){var e=a.getTemplate("project-overview-no-summary-form-found");t.append(e.render())}),a.renderingFacade=r,setTimeout(function(){a.resizeLayout()},1e3)},iframeOldRender:function(e){this.getContent();var t,a=bizagi.readQueryString();$.each(e,function(){$(this).is("iframe")&&(t=$(this))}),t.load(function(){var e=$(this).contents(),t=$.browser.mozilla||$.browser.webkit?"../../css/render_%theme%.css":"css/render_%theme%.css";t=t.replace("%theme%",a.theme||"bizagiDefault"),$("body",e).append("<link type='text/css' rel='stylesheet' href='"+t+"'>")})}}),bizagi.injector.register("bizagi.workportal.widgets.project.overview",["workportalFacade","dataService",bizagi.workportal.widgets.project.overview],!0),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.caseState",{},{init:function(e,t,a){this._super(e,t,a),this.contextsSidebarActivity=a.contextsSidebarActivity,this.datePickerRegional=bizagi.localization.getResource("datePickerRegional"),this.loadTemplates({"project-caseState":bizagi.getTemplate("bizagi.workportal.desktop.widget.project.caseState").concat("#project-caseState-wrapper"),"project-caseState-remaining":bizagi.getTemplate("bizagi.workportal.desktop.widget.project.caseState").concat("#project-caseState-remaining")})},renderContent:function(){return this.content=$("<div></div>"),this.content},postRender:function(){var e=this;(e.contextsSidebarActivity||[]).forEach(function(t){e.sub(t,$.proxy(e.updateView,e))})},updateView:function(e,t){var a=this;$.extend(a.params,t.args);var i=t.args;a.getContent().empty();var r={isFavoriteCase:"off"};if(i.isFavorite&&JSON.parse(i.isFavorite)?r.isFavoriteCase="bz-icon-star":r.isFavoriteCase="bz-icon-star-outline",a.showCaseNumber(i,r),i.creationDate){var o="MM/dd/yyyy H:mm",s=i.creationDate,n=bizagi.util.dateFormatter.getDateFromFormat(s,o);r.creationDateFormat=a.getFormattedDate(n);var c=bizagi.util.dateFormatter.getDateFromFormat(i.solutionDate,o);r.solutionDateFormat=a.getFormattedDate(c);var p=new Date;a.calculateDataForTemplate(r,n,p,c,i)}$(a.getContent()).on("click",".show-diagram-case",function(){!(!a.params.isAdhocProcess||void 0===a.params.isAdhocProcess)?a.showGraphicQuery({idCase:a.params.idCaseForGraphicQuery||a.params.idCase,idWorkflow:a.params.idWorkFlow,isAdhoc:!0,idProcess:a.params.idAdhocProcess}):a.showGraphicQuery({idCase:a.params.idCaseForGraphicQuery||a.params.idCase,idWorkflow:a.params.idWorkflow})}),$(a.getContent()).on("click",".show-process-help",function(){a.showHelpUrl(a.params.helpUrl)})},calculateDataForTemplate:function(e,t,a,i,r){var o=this.getContent(),s={};s.idUser=bizagi.currentUser.idUser,bizagi.util.parseBoolean(r.isOpen)?(s.fromDate=t.getTime(),s.toDate=a.getTime()):(s.fromDate=i.getTime(),s.toDate=a.getTime());var n=s.toDate-s.fromDate,c=bizagi.util.dateFormatter.getRelativeTime(new Date(Date.now()-n),null,!1);bizagi.util.parseBoolean(r.isOpen)?(e.relativeTimeState=bizagi.localization.getResource("workportal-project-case-state-opened").replace("%s",c),e.colorStateCase="Opened"):(e.relativeTimeState=bizagi.localization.getResource("workportal-project-case-state-closed").replace("%s",c),e.colorStateCase="Closed"),e.percentCompleteBar=100,e.isOpen=bizagi.util.parseBoolean(r.isOpen),this.getTemplate("project-caseState-remaining").render($.extend(r,e)).appendTo($("#ui-bizagi-remaining",o))},showCaseNumber:function(e,t){var a=this,i=a.getContent(),r=a.getTemplate("project-caseState"),o=!1;o=!(!this.params.isAdhocProcess||void 0===this.params.isAdhocProcess)&&this.params.isAdhocProcess,a.params.helpUrl=bizagi.util.validateUrlWellFormed(a.params.helpUrl),r.render($.extend(e,t,{security:bizagi.menuSecurity,isAdhocProcess:o,urlHelp:!bizagi.util.isEmpty(a.params.helpUrl)})).appendTo(i),$(".case-summary-favorite",i).on("click",$.proxy(a.onClickFavorite,a)),$(".case-summary-back",a.content).on("click",$.proxy(a.goToCase,a,"back")),$(".case-summary-next",a.content).on("click",$.proxy(a.goToCase,a,"next")),a.showBackNextNavigation()},getFormattedDate:function(e){var t=this.datePickerRegional.monthNames,a=e.getMonth(),i=BIZAGI_LANGUAGE;return null!=i&&null!=i&&i.length>0&&"fr"==i.substring(0,2)?$.datepicker.formatDate("dd",e)+" "+t[a]:t[a]+" "+$.datepicker.formatDate("dd",e)},onClickFavorite:function(e){e.preventDefault();var t=this,a={};$(e.target).hasClass("bz-icon-star-outline")?(a={idObject:t.params.idCase,favoriteType:"CASES"},$.when(t.dataService.addFavorite(a)).done(function(a){t.params.guidFavorite=a.idFavorites,$(e.target).removeClass("bz-icon-star-outline"),$(e.target).addClass("bz-icon-star")})):(a={idObject:t.params.guidFavorite,favoriteType:"CASES"},$.when(t.dataService.delFavorite(a)).done(function(){$(e.target).addClass("bz-icon-star-outline"),$(e.target).removeClass("bz-icon-star")}))},showHelpUrl:function(e){window.open(e)},callGetEffectiveDuration:function(e){var t=$.Deferred();return e.fromDate?$.when(this.dataService.getEffectiveDuration(e)).done(function(e){t.resolve(e)}):t.resolve(null),t.promise()},clean:function(){var e=this;$(".show-diagram-case",e.getContent()).off();var t=e.contextsSidebarActivity||[];this.params={},t.forEach(function(t){e.unsub(t,$.proxy(e.updateView,e))})},goToCase:function(e){var t="back"==e?this.getBackCase():this.getNextCase();t>0&&this.publish("executeAction",{action:bizagi.workportal.actions.action.BIZAGI_WORKPORTAL_ACTION_ROUTING,idCase:t})},getListKey:function(){if(bizagi.lstIdCases=bizagi.lstIdCases||{},bizagi.lstIdCases.length>1)for(var e=0;e<bizagi.lstIdCases.length;e++)if(this.params.idCase==bizagi.lstIdCases[e])return e;return-1},getNextCase:function(){var e=this.getListKey();return bizagi.lstIdCases.length==e+1||1==bizagi.lstIdCases.length?-1:bizagi.lstIdCases[e+1]},getBackCase:function(){var e=this.getListKey();return 0==e?-1:bizagi.lstIdCases[e-1]||-1},showBackNextNavigation:function(){var e=this,t=e.getNextCase(),a=e.getBackCase();t<=0?$(".case-summary-next",e.content).hide():$(".case-summary-next",e.content).show(),a<=0?$(".case-summary-back",e.content).hide():$(".case-summary-back",e.content).show(),t<=0&&a<=0?($(".content-right-sidebar").removeClass("bz-state-number--active-case"),$(".bz-case-navigation").hide()):($(".content-right-sidebar").addClass("bz-state-number--active-case"),$(".bz-case-navigation").show())}}),bizagi.injector.register("bizagi.workportal.widgets.project.caseState",["workportalFacade","dataService",bizagi.workportal.widgets.project.caseState]),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.activityState",{},{init:function(e,t,a){this._super(e,t,a),this.contextsSidebarActivity=a.contextsSidebarActivity,this.datePickerRegional=bizagi.localization.getResource("datePickerRegional"),this.loadTemplates({"project-activityState-wrapper":bizagi.getTemplate("bizagi.workportal.desktop.widget.project.activityState").concat("#project-activityState-wrapper")})},renderContent:function(){return this.content=$("<div></div>"),this.content},postRender:function(){var e=this;e.contextsSidebarActivity.forEach(function(t){e.sub(t,$.proxy(e.updateView,e))})},updateView:function(e,t){var a=this,i=t.args;a.params=i,a.getContent();var r={},o=i.currentState||[],s=o.filter(function(e){return e.idWorkItem==i.idWorkitem})[0];if(s){r.activityName=s.state,r.activityIsEvent=bizagi.util.parseBoolean(s.isEvent);var n="MM/dd/yyyy H:mm",c=bizagi.util.dateFormatter.getDateFromFormat(s.entryDateWorkItem,n);c.getTime&&(r.initDateFormat=a.getFormattedDate(c));var p=new Date,d=bizagi.util.dateFormatter.getDateFromFormat(s.estimatedSolutionDate,n);r.estimatedSolutionDateFormat="",c.getTime&&d.getTime&&s?a.calculateDataForTemplate(s,r,c,p,d,o):a.updateTemplateWidget(r,o)}},initilizeActionMenu:function(e){var t=this,a=!1;if(e&&e.length>0)for(j=0;j<e.length;++j)e[j]&&t.params&&e[j].idWorkItem==t.params.idWorkitem&&(a=bizagi.util.parseBoolean(e[j].allowsReassign)||!1);var i=$("#bt-case-action-reassing",t.content),r=$("#ui-bizagi-wp-project-activity-button:not(.ui-bizagi-wp-project-activity-shared)",t.content);a&&i.show(),i.on("click",function(){t.onClickMenuReasign()}),r.on("click",function(){t.onClickShareActivity()})},onClickMenuReasign:function(){var e=this,t=e.params.idCase,a=e.params.idWorkitem,i=function(){e.publish("closeCurrentDialog")};bizagi.loader.startAndThen("admin").then(function(){$.when(e.publish("showDialogWidget",{widgetName:bizagi.workportal.widgets.widget.BIZAGI_WORKPORTAL_WIDGET_REASSIGN_CASE,data:{idCase:t,idWorkItem:a,closeDialogWidget:i},closeVisible:!1,maximize:!0,modalParameters:{title:bizagi.localization.getResource("render-actions-reassign"),width:"910px",id:"CaseAdmin"}}))})},onClickShareActivity:function(){var e={idWorkItem:this.params.idWorkitem},t=$("#ui-bizagi-wp-project-activity-button",this.content);t.attr("disabled",!0),$.when(this.dataService.getShareActivity(e)).done(function(e){var a=window.parent.bizagi.injector.get("notifier");!0===e.value?(t.addClass("ui-bizagi-wp-project-activity-shared").unbind("click"),a.showSucessMessage(bizagi.localization.getResource("workportal-project-activity-success-message"),"")):a.showErrorMessage(bizagi.localization.getResource("workportal-project-activity-error-message"),"")}).always(function(){t.attr("disabled",!1)})},calculateDataForTemplate:function(e,t,a,i,r,o){new Date(Date.now()-a.getTime());var s=i.getTime()-r.getTime(),n=a.getTime()-r.getTime(),c=(bizagi.currentUser.idUser,a.getTime()),p=Date.now(),d=!1,u={idUser:bizagi.currentUser.idUser,fromDate:i.getTime(),toDate:r.getTime()},l={};s>0?(u.fromDate=r.getTime(),u.toDate=i.getTime(),d=!0):(l.idUser=bizagi.currentUser.idUser,l.fromDate=a.getTime(),l.toDate=r.getTime());var g=p-c,m=u.toDate-u.fromDate,b=s>0?0:l.toDate-l.fromDate,v=bizagi.util.dateFormatter.getRelativeTime(new Date(Date.now()-g),null,!1);if(t.colorState=e.colorState,t.relativeTimeState=bizagi.localization.getResource("workportal-project-activity-state-opened").replace("%s",v),t.percentCompleteBar=100,0===n)t.showEstimatedSolutionDate=!1;else if(t.showEstimatedSolutionDate=!0,!1===d){var h=this.getPercentBar(b/1e3/60,m/1e3/60);t.percentCompleteBar=h.percent}e&&(t.isEvent=bizagi.util.parseBoolean(e.isEvent),t.canShareActivity=e.canShareActivity,t.isShared=e.isShared),t.estimatedSolutionDateFormat=this.getFormattedDate(r),this.updateTemplateWidget(t,o)},getPercentBar:function(e,t){var a={};return a.percent=Math.round(100*(1-t/e)),a},updateTemplateWidget:function(e,t){var a=this.getContent().empty();!1===bizagi.override.enableShareActivity&&(e.canShareActivity=!1,e.isShared=!1),this.getTemplate("project-activityState-wrapper").render(e).appendTo(a),t.length>0&&this.initilizeActionMenu(t),this.shareActivityTooltip()},shareActivityTooltip:function(){var e=$("#ui-bizagi-wp-project-activity-button",this.content);e.on("mouseenter",function(){var t=e.hasClass("ui-bizagi-wp-project-activity-shared")?"workportal-project-activity-shared":"workportal-project-activity-share";e.attr("title",bizagi.localization.getResource(t))}),e.tooltip({tooltipClass:"custom-tooltip-styling-bottom-bar",position:{my:"right top",at:"left top",of:e,collision:"flip"}})},getFormattedDate:function(e){var t=this.datePickerRegional.monthNames,a=e.getMonth(),i=BIZAGI_LANGUAGE;return null!=i&&null!=i&&i.length>0&&"fr"==i.substring(0,2)?$.datepicker.formatDate("dd",e)+" "+t[a]:t[a]+" "+$.datepicker.formatDate("dd",e)},clean:function(){var e=this,t=e.contextsSidebarActivity||[];this.params={},t.forEach(function(t){e.unsub(t,$.proxy(e.updateView,e))})},callGetEffectiveDuration:function(e){var t=this,a=$.Deferred();return setTimeout(function(){e.fromDate?$.when(t.dataService.getEffectiveDuration(e)).done(function(e){a.resolve(e)}):a.resolve(null)},200),a.promise()}}),bizagi.injector.register("bizagi.workportal.widgets.project.activityState",["workportalFacade","dataService",bizagi.workportal.widgets.project.activityState]),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.processState",{},{init:function(e,t,a){this._super(e,t,a),this.contextsSidebarActivity=a.contextsSidebarActivity,this.loadTemplates({"project-process-state":bizagi.getTemplate("bizagi.workportal.desktop.widget.project.processState").concat("#project-process-state")})},renderContent:function(){var e=this.getTemplate("project-process-state");return this.content=e.render({}),this.content},postRender:function(){var e=this;e.contextsSidebarActivity.forEach(function(t){e.sub(t,$.proxy(e.updateView,e))})},updateView:function(e,t){var a=this,i=t.args,r=a.getContent().empty();a.params=i;var o={};o.showParentProcess=i.idParentCase>=1,o.parentProcess={displayName:i.parentDisplayName,idCase:i.idParentCase,idWorkItem:i.idWorkItem,idTask:"0"==i.idTask?"":i.idTask,idWorkflow:i.idWorkflowParentCase},a.getTemplate("project-process-state").render($.extend(i,o)).appendTo(r),$("#go-to-parent-case",r).on("click",$.proxy(a.onClickGoToParentCase,a))},onClickGoToParentCase:function(e){e.preventDefault();this.routingExecute($(e.target).closest("#go-to-parent-case"))},clean:function(){var e=this;e.params={},e.contextsSidebarActivity.forEach(function(t){e.unsub(t,$.proxy(e.updateView,e))})}}),bizagi.injector.register("bizagi.workportal.widgets.project.processState",["workportalFacade","dataService",bizagi.workportal.widgets.project.processState]),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.users",{},{init:function(e,t,a,i){var r=this;r.relatedusers=a,r._super(e,t,i),r.contextsSidebarActivity=i.contextsSidebarActivity,r.plugins={},r.users=[],r.loadedUsers=!1,r.loadTemplates({"project-users":bizagi.getTemplate("bizagi.workportal.desktop.widget.project.users").concat("#project-users-main")})},renderContent:function(){return this.content=$("<div></div>"),this.content},postRender:function(){var e=this;e.contextsSidebarActivity.forEach(function(t){e.sub(t,$.proxy(e.updateView,e))}),e.sub("ON_RENDER_FINISH",$.proxy(e.onRenderFinish,e))},updateView:function(e,t){var a=this;a.params=t,setTimeout(function(){!1===a.loadedUsers&&a.onRenderFinish()},500)},onRenderFinish:function(){var e=this,t=e.params.args,a=e.getContent().empty();e.loadedUsers=!0,e.getTemplate("project-users").render().appendTo(a),e.showCreatorInformation(a);var i=[{id:t.createdBy.userId,typeName:"owner"}];t.idCase>0&&e.relatedusers.render(e.content,".relatedusers-wrapper",t.idCase,i)},showCreatorInformation:function(e){var t=this,a={userIds:t.params.args.createdBy.userId,width:50,height:50};t.dataService.getUsersData(a).done(function(a){var i=usersAdapter.createJsonUserInfo(a[0].id,a[0].name,a[0].username,a[0].picture?"data:image/png;base64,"+a[0].picture:void 0,a[0].email,a[0].name.getInitials(),!1,!0,[],[]);e.find("#ui-bizagi-wp-project-users-wrapper .ui-bizagi-wp-project-users-creator-info").userinformation(t,{user:i})})},clean:function(){var e=this;e.loadedUsers=!1,e.contextsSidebarActivity.forEach(function(t){e.unsub(t,$.proxy(e.updateView,e))})}}),bizagi.injector.register("bizagi.workportal.widgets.project.users",["workportalFacade","dataService","relatedusers",bizagi.workportal.widgets.project.users]),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.subprocesses.data",{responseSubprocessState:{},responseSubprocess:function(e){return e&&(responseSubprocessState=e),responseSubprocessState},auxArrayListSubprocessesState:[],auxArrayListSubprocesses:function(e){return e?jQuery.isArray(e)&&0===e.length?void(this.auxArrayListSubprocessesState.length=0):this.auxArrayListSubprocessesState.push(e):this.auxArrayListSubprocessesState}},{init:function(e,t,a){this._super(e,t,a),this.Class.auxArrayListSubprocesses([]),this.loadTemplates({"project-subprocesses-tootip-custom-properties":bizagi.getTemplate("bizagi.workportal.desktop.widgets.project.subprocesses.data").concat("#project-subprocesses-tooltip-custom-properties-wrapper")})},initializeTooltip:function(e){var t=this,a=t.getContent();$(e,a).tooltip({position:{collision:"flipfit",my:"right center",at:"left-10 center"},show:null,content:function(){var e,a,i,r=$(this).closest("li").find("#idCase").val(),o=t.Class.auxArrayListSubprocesses().filter(function(e){return e.idCase==r});if(o.length>0)return e=o[0].indexSubprocess,a=o[0].idCustData,i=$(this).text(),t.getContentTooltip(e,a,i,t.getTemplate("project-subprocesses-tootip-custom-properties"))},open:function(e,t){if(void 0===e.originalEvent)return!1;var a=$(t.tooltip).attr("id");$("div.ui-tooltip").not("#"+a).remove()},close:function(e,t){t.tooltip.hover(function(){$(this).stop(!0).fadeTo(400,1)},function(){$(this).fadeOut("400",function(){$(this).remove()})})}})},getContentTooltip:function(e,t,a,i){"-1"==t&&(t="0");var r=function(e,t){return{nameProperty:e,valueProperty:t}},o=[],s="",n=this.getSubprocessData(e,t),c=n.custData,p=n.custDataTypes,d=n.custFields,u=n.displayName;if(o.push(new r(bizagi.localization.getResource("workportal-widget-inboxcommon-subprocess"),u)),c.length)for(var l=0;l<c.length;l+=1)s=c[l],p&&("Money"==p[l]?s=bizagi.util.formatMonetaryCell(s):"Boolean"==p[l]?s=bizagi.util.formatBoolean(s):"Float"==p[l]||"Real"==p[l]?s=bizagi.util.formatDecimalCell(s):"function"==typeof s&&(s="")),o.push(new r(d[l],s));var g={};g.arrayCustomsProperties=o,g.nameSubprocess=a;var m=i,b=$('<div class="bizagi-custom-tooltip-subprocesses"></div>');return m.render(g).appendTo(b),b.html()},getSubprocessData:function(e,t){var a={},i=this.Class.responseSubprocess().subProcesses,r=this.Class.responseSubprocess().subProcPersonalized;if(i&&i.length>0){a.custData=i[e].custData,a.custDataTypes=i[e].custDataTypes;var o=this.Class.responseSubprocess().CustFields[t];a.custFields=o[Object.keys(o)[0]],a.displayName=i[e].displayName}else r&&Object.keys(r).length>0&&(a.custData=r[0].subProcesses[e].custData,a.custDataTypes=r[0].subProcesses[e].custDataTypes,a.custFields=r[0].CustFields[0],a.displayName=r[0].subProcesses[e].displayName);return a},clean:function(){}}),bizagi.injector.register("bizagi.workportal.widgets.project.subprocesses.data",["workportalFacade","dataService",bizagi.workportal.widgets.project.subprocesses.data]),bizagi.workportal.widgets.project.subprocesses.data.extend("bizagi.workportal.widgets.project.events",{},{init:function(e,t,a){this._super(e,t,a),this.contextsSidebarActivity=a.contextsSidebarActivity,this.loadTemplates({"project-events":bizagi.getTemplate("bizagi.workportal.desktop.widget.project.events").concat("#project-events-wrapper")})},renderContent:function(){var e=this.getTemplate("project-events");return this.content=e.render({}),this.content},postRender:function(){var e=this;e.contextsSidebarActivity.forEach(function(t){e.sub(t,$.proxy(e.updateView,e))})},updateView:function(e,t){var a=this,i=t.args,r=a.getContent().empty();a.params=i,$.when(a.getArgsTemplate(i)).done(function(e){a.getTemplate("project-events").render($.extend(i,e)).appendTo(r),$(".list-events li.event a",r).on("click",$.proxy(a.onClickGoEvent,a)),a.initializeTooltip(".list-events li")})},getArgsTemplate:function(e){var t=$.Deferred(),a={};if(e.countEvents>=1)for(var i=0;i<e.currentState.length;i++)"true"==e.currentState[i].isEvent&&e.currentState[i].idWorkItem==e.idWorkitem&&(e.countEvents=e.countEvents-1);return a.showEvents=e.countEvents>=1,a.showEvents?$.when(this.callSummaryCaseEvents(e.idCase)).done(function(i){e.showEvents=i.events.length>=1,e.showEvents&&(a.events=[],i.events.forEach(function(e){a.events.push($.extend(e[Object.keys(e)[0]],{idWorkFlow:i.idWorkFlow}))})),t.resolve(a)}):t.resolve(a),t.promise()},onClickGoEvent:function(e){e.preventDefault();var t=this;$.when(bizagi.util.autoSave()).done(function(){t.routingExecute($(e.target).closest("li"))})},callSummaryCaseEvents:function(e){var t=$.Deferred();return $.when(this.dataService.summaryCaseEvents({idCase:e})).done(function(e){t.resolve(e)}),t.promise()},clean:function(){var e=this;this.params={},e.contextsSidebarActivity.forEach(function(t){e.unsub(t,$.proxy(e.updateView,e))})}}),bizagi.injector.register("bizagi.workportal.widgets.project.events",["workportalFacade","dataService",bizagi.workportal.widgets.project.events],!0),bizagi.workportal.widgets.project.subprocesses.data.extend("bizagi.workportal.widgets.project.subprocesses",{responseSubprocess:function(e){return this._super(e)},auxArrayListSubprocesses:function(e){return this._super(e)}},{init:function(e,t,a){this._super(e,t,a),this.contextsSidebarActivity=a.contextsSidebarActivity,this.loadTemplates({"project-subprocesses":bizagi.getTemplate("bizagi.workportal.desktop.widget.project.subprocesses").concat("#project-subprocesses-wrapper")})},renderContent:function(){return this.content=$("<div></div>"),this.content},postRender:function(){var e=this;e.contextsSidebarActivity.forEach(function(t){e.sub(t,$.proxy(e.updateView,e))})},updateView:function(e,t){var a=this,i=t.args;a.getContent().empty();a.params=i,a.params.idCase>0&&$.when(a.dataService.summarySubProcess({idCase:a.params.idCase})).done(function(e){a.Class.responseSubprocess(e),a.organizeDataForSubprocesses(a.params)})},organizeDataForSubprocesses:function(e){var t=this;if(t.Class.responseSubprocess().showSubProcess){$.each(t.Class.responseSubprocess().subProcesses,function(e){var a=t.Class.responseSubprocess().subProcesses[e].custData;if(a&&a.length)for(var i=0;i<a.length;i+=1)null===a[i]&&(a[i]="")});var a=t.Class.responseSubprocess().subProcesses||t.Class.responseSubprocess().subProcPersonalized;t.Class.auxArrayListSubprocesses([]);for(var i=0;i<Object.keys(a).length;i+=1){var r=a[i];t.Class.auxArrayListSubprocesses({isOpen:r.isOpen,radNumber:r.radNumber,displayName:r.displayName,idCase:r.idCase,indexSubprocess:i,idCustData:r.idCustData}),r.subProcesses&&Object.keys(r).forEach(function(e){t.Class.auxArrayListSubprocesses({isOpen:r[e].isOpen,radNumber:r[e].radNumber,displayName:r[e].displayName,idCase:r[e].idCase,indexSubprocess:i,idCustData:r[e].idCustData})})}t.renderWidget()}},renderWidget:function(){var e=this,t=e.getContent();e.getTemplate("project-subprocesses").render({auxArrayListSubprocesses:e.Class.auxArrayListSubprocesses()}).appendTo(t),$(".list-subprocesses a",t).on("click",$.proxy(e.onClickGoSubprocess,e)),e.initializeTooltip(".list-subprocesses li")},onClickGoSubprocess:function(e){e.preventDefault();this.routingExecute($(e.target).closest("li"))},clean:function(){var e=this;e.params={},e.pluginTooltip=null,e.contextsSidebarActivity.forEach(function(t){e.unsub(t,$.proxy(e.updateView,e))})}}),bizagi.injector.register("bizagi.workportal.widgets.project.subprocesses",["workportalFacade","dataService",bizagi.workportal.widgets.project.subprocesses]),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.activity.description",{},{init:function(e,t,a){this._super(e,t,a),a=a||{},this.loadTemplates({"project-activity-description":bizagi.getTemplate("bizagi.workportal.desktop.widget.project.activity.description").concat("#project-activity-description")})},renderContent:function(){var e=this,t=e.getTemplate("project-activity-description"),a=e.getWorkitemDescription();return e.content=a?t.render({description:a}):$("<div />"),e.content},postRender:function(){},getWorkitemDescription:function(){for(var e=this.params||{},t=e.idWorkitem||0,a=e.currentState||[],i="",r=0;r<a.length;r++)if(t==a[r].idWorkItem){i=a[r].tskDescription;break}return i},clean:function(){}}),bizagi.injector.register("bizagi.workportal.widgets.project.activity.description",["workportalFacade","dataService",bizagi.workportal.widgets.project.activity.description],!0);
//# sourceMappingURL=../../../../Maps/desktop/overview.desktop.production.js.map
