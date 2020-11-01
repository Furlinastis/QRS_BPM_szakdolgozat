bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.reports",{},{getWidgetName:function(){return bizagi.workportal.widgets.widget.BIZAGI_WORKPORTAL_WIDGET_REPORTS},init:function(e,t,r){this._super(e,t,r)},renderContent:function(){var e=this.getTemplate("reports");return this.content=$.tmpl(e)}}),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.reportsMenu",{},{init:function(e,t,r){var i=this;i._super(e,t,r),i.endPoint=["Reports","BAMProcess","BAMTask","AnalyticsProcess","AnalyticsTask","AnalyticsSensor","ResourceBAM"],i.reportsMenu=i.getRawReportsJSON()},getWidgetName:function(){return bizagi.workportal.widgets.widget.BIZAGI_WORKPORTAL_WIDGET_REPORTS_MENU},renderContent:function(){var e=this.getTemplate("reportsMenu-container");return this.content=$.tmpl(e)},getRawReportsJSON:function(){var e=this;return{Reports:[{displayName:e.resources.getResource("workportal-menu-submenu-BAMMenu"),icon:"bz-icon-folder-outline",show:function(){return!!(bizagi.menuSecurity.BAMProcess||bizagi.menuSecurity.BAMTask||bizagi.menuSecurity.BAMResourceMonitor)},endPoint:"",subItems:"BAM"},{displayName:e.resources.getResource("workportal-menu-submenu-AnalyticsMenu"),icon:"bz-icon-folder-outline",show:function(){return!(!bizagi.menuSecurity.AnalyticsProcess&&!bizagi.menuSecurity.AnalyticsTask)},endPoint:"",subItems:"Analytics"},{displayName:e.resources.getResource("workportal-menu-submenu-AnalyticsSensor"),show:bizagi.menuSecurity.AnalyticsSensor,icon:"AnalyticsSensor bz-icon-rules",endPoint:"AnalyticsSensor",subItems:[]}],BAM:[{displayName:e.resources.getResource("workportal-menu-submenu-AnalyticsProcess"),show:bizagi.menuSecurity.BAMProcess,icon:"BAMProcess bz-icon-cogs",endPoint:"BAMProcess",subItems:[]},{displayName:e.resources.getResource("workportal-menu-submenu-AnalyticsTask"),show:bizagi.menuSecurity.BAMTask,icon:"BAMTask bz-icon-sheet-pencil",endPoint:"BAMTask",subItems:[]},{displayName:e.resources.getResource("workportal-menu-submenu-BAMResourceMonitor"),show:bizagi.menuSecurity.BAMResourceMonitor,icon:"BAMResourceMonitor bz-icon-user-manage",endPoint:"ResourceBAM",subItems:[]}],Analytics:[{displayName:e.resources.getResource("workportal-menu-submenu-AnalyticsProcess"),show:bizagi.menuSecurity.AnalyticsProcess,icon:"AnalyticsProcess bz-icon-cogs",endPoint:"AnalyticsProcess",subItems:[]},{displayName:e.resources.getResource("workportal-menu-submenu-AnalyticsTask"),show:bizagi.menuSecurity.AnalyticsTask,icon:"AnalyticsTask bz-icon-sheet-pencil",endPoint:"AnalyticsTask",subItems:[]}],AnalysisQuery:[]}}}),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.reportsChart",{},{init:function(e,t,r){var i=this;i._super(e,t,r),i.endPoint=bizagi.reporting[r.endPoint],i.endPoint.defaultReport=r.defaultReport||i.endPoint.defaultReport,i.filters=r.filters||{},i.myTeam=[]},getWidgetName:function(){return bizagi.workportal.widgets.widget.BIZAGI_WORKPORTAL_WIDGET_REPORTS_CHART},renderContent:function(){var e=this,t=e.getTemplate("reportsChart"),r=e.content=$.tmpl(t,e.endPoint);return void 0!==e.endPoint.callBack&&e[e.endPoint.callBack](),r},loadReportingModule:function(){var e=this,t=bizagi.loader,r=new $.Deferred;return t.init(function(){t.start("reporting").then(function(){e.reportingModule=new bizagi.reporting.facade({proxyPrefix:void 0!==bizagi.proxyPrefix?bizagi.proxyPrefix:""}),r.resolve()})}),r},myTeamCallBack:function(){var e=this;return $.when(e.dataService.getDataForMyTeam()).done(function(t){var r=$("li[data-report='bamresourcemonitorworkinprogressteam']",e.content);t.items.length?e.myTeam=t:r.css("display","none")})}}),bizagi.workportal.widgets.reports.extend("bizagi.workportal.widgets.reports",{},{init:function(e,t,r){this._super(e,t,r),this.loadTemplates({reports:bizagi.getTemplate("bizagi.workportal.desktop.widget.reports").concat("#ui-bizagi-workportal-widget-reports"),"reports-elements":bizagi.getTemplate("bizagi.workportal.desktop.widget.reports").concat("#ui-bizagi-workportal-widget-reports-elements"),"reports-empty-elements":bizagi.getTemplate("bizagi.workportal.desktop.widget.reports").concat("#ui-bizagi-workportal-widget-reports-empty-elements"),"reports-query-tree":bizagi.getTemplate("bizagi.workportal.desktop.widget.reports").concat("#ui-bizagi-workportal-widget-reports-query-tree"),"reports-query-confirm":bizagi.getTemplate("bizagi.workportal.desktop.widget.reports").concat("#ui-bizagi-workportal-widget-reports-confirm"),"reports-query-edit":bizagi.getTemplate("bizagi.workportal.desktop.widget.reports").concat("#ui-bizagi-workportal-widget-reports-edit"),useNewEngine:!1})},postRender:function(){var e=this;e.configureTreeNavigation(),e.configureBackButton(),e.renderReports(),e.scrollVertical({autohide:!1})},getReports:function(e){var t=this,r=new $.Deferred,i=e.idElement||0;return $.when(t.getAnalisysQueries()).done(function(e){var s=[],o=[],n=[];bizagi.menuSecurity.BAMProcess&&o.push({idElement:2,displayName:t.resources.getResource("workportal-menu-submenu-BAMProcess"),icon:"BAMProcess",endPoint:"BAMProcess",childs:[]}),bizagi.menuSecurity.BAMTask&&o.push({idElement:3,displayName:t.resources.getResource("workportal-menu-submenu-BAMTask"),icon:"BAMTask",endPoint:"BAMTask",childs:[]}),bizagi.menuSecurity.BAMResourceMonitor&&o.push({idElement:4,displayName:t.resources.getResource("workportal-menu-submenu-BAMResourceMonitor"),icon:"BAMResourceMonitor",endPoint:"ResourceBAM",childs:[]}),o.length>0&&s.push({idElement:1,displayName:t.resources.getResource("workportal-menu-submenu-BAMMenu"),icon:"",endPoint:"",childs:o}),bizagi.menuSecurity.AnalyticsProcess&&n.push({idElement:11,displayName:t.resources.getResource("workportal-menu-submenu-AnalyticsProcess"),icon:"AnalyticsProcess",endPoint:"AnalyticsProcess",childs:[]}),bizagi.menuSecurity.AnalyticsTask&&n.push({idElement:12,displayName:t.resources.getResource("workportal-menu-submenu-AnalyticsTask"),icon:"AnalyticsTask",endPoint:"AnalyticsTask",childs:[]}),n.length>0&&s.push({idElement:10,displayName:t.resources.getResource("workportal-menu-submenu-AnalyticsMenu"),icon:"",endPoint:"",childs:n}),bizagi.menuSecurity.AnalyticsSensor&&s.push({idElement:13,displayName:t.resources.getResource("workportal-menu-submenu-AnalyticsSensor"),icon:"AnalyticsSensor",endPoint:"AnalyticsSensor",childs:[]}),bizagi.menuSecurity.AnalysisQueries&&e.length>0&&s.push({idElement:20,displayName:t.resources.getResource("workportal-menu-submenu-AnalysisQueries"),icon:"",endPoint:"",childs:e});var a=function(e,t){var r;return e?$.each(t,function(t,i){if(void 0===r){if(i.idElement!=e)return a(e,i.childs);r=i.childs}}):r=t,r||{}};r.resolve(a(i,s))}),r.promise()},getAnalisysQueries:function(){var e=[],t=100,r=new $.Deferred;return $.when(this.dataService.getAnalisysQueries()).done(function(i){$.each(i.queries,function(r,i){e.push({idElement:t++,displayName:i.name||"",icon:"",endPoint:i.reportSet,extraArgs:"?idUserQuery="+i.idQuery,activeEdit:!0,description:i.description,idQuery:i.idQuery,childs:[]})}),r.resolve(e)}),r.promise()},renderReports:function(e,t){var r,i,s=this,o=s.getContent(),n=s.getTemplate("reports-elements"),a=s.getTemplate("reports-empty-elements"),c=$("#reports",o);$.when(s.getReports({idElement:e})).done(function(o){c.empty(),(o=o||{}).length>=1?(i=null!=t?$.merge(t,o):o,r=$.tmpl(n,{nodes:i,idParentQuery:e},{checkChildNode:s.checkChildNode})):r=$.tmpl(a,{nodes:i,idParentQuery:e}),r.appendTo(c),s.configureNavTree(c)})},jsInjection:function(e,t){var r={title:t};return{callback:function(e){this.openModalWindow=function(t,r,i,s,o){var n=this.ownerDocument;e.controller.publish("showDialogWidget",{widgetName:e.genericIframe,widgetURL:"App/Cockpit/"+t,injectCss:[".ui-bizagi-old-render*","@font-face"],modalParameters:{title:"Bizagi"},afterLoad:function(e){this.openBACase=function(t,r){e.bizagi.workportal.desktop.popup.closePopupInstance(),e.controller.publish("closeCurrentDialog");var i=null;r.indexOf("idWorkitem=")>-1&&(i=(i=r.substring(r.indexOf("idWorkitem=")+11)).substring(0,i.indexOf("&"))),e.controller.publish("executeAction",{action:e.routingAction,idCase:t,idWorkItem:i}),e.controller.publish("closeCurrentDialog")},this.buttonCancel_onclick=function(){e.controller.publish("closeCurrentDialog")},this.CloseParentDialog=function(){e.controller.publish("closeCurrentDialog")}},afterLoadParams:{routingAction:e.bizagi.workportal.actions.action.BIZAGI_WORKPORTAL_ACTION_ROUTING,genericIframe:e.bizagi.workportal.widgets.widget.BIZAGI_WORKPORTAL_WIDGET_GENERICIFRAME,bizagi:e.bizagi,doc:n}})}},params:r=$.extend(r,{routingAction:bizagi.workportal.actions.action.BIZAGI_WORKPORTAL_ACTION_ROUTING,genericIframe:bizagi.workportal.widgets.widget.BIZAGI_WORKPORTAL_WIDGET_GENERICIFRAME,bizagi:bizagi})}},configureNavTree:function(e){var t=this,r=t.getTemplate("reports-query-confirm"),i=t.getTemplate("reports-query-tree");$(".reportsListDisplay",e).click(function(){var e=$(this).data("endpoint"),r=$(this).data("id-element"),s=$(this).data("displayname"),o=$(this).data("maximized")||!1,n=$(this).data("extra-args"),a=$("#categoryTree"),c=t.dataService.serviceLocator.getUrl(e)+n;if(""==e)t.renderReports(r),$.tmpl(i,{idElement:r,queryDisplayName:s}).appendTo(a),t.configureTreeNavigation();else{if("reports"==t.currentPopup)return void bizagi.workportal.desktop.popup.closePopupInstance();var p=t.jsInjection(t.dataService.serviceLocator.getUrl(e),s);if(t.currentPopup="reports",t.publish("showDialogWidget",{widgetName:bizagi.workportal.widgets.widget.BIZAGI_WORKPORTAL_WIDGET_GENERICIFRAME,widgetURL:c,maximized:o,modalParameters:{title:s,id:e},afterLoad:p.callback,afterLoadParams:p.params}),"reports"==t.params.widgetName)return void bizagi.workportal.desktop.popup.closePopupInstance()}}),$(".editButton").click(function(e){e.stopPropagation(),t.editFolder($(this).parents("ul")),bizagi.workportal.desktop.popup.closePopupInstance()}),$(".deleteButton").click(function(e){e.stopPropagation();var i=$(this).parents("ul").data("idquery"),s=$.tmpl(r);$(s).dialog({resizable:!0,modal:!0,title:t.getResource("workportal-widget-reports-confirm-title"),buttons:[{text:t.getResource("workportal-widget-reports-confirm-delete"),click:function(){t.dataService.deleteQueries(i),$(this).dialog("close"),bizagi.workportal.desktop.popup.closePopupInstance()}},{text:t.getResource("workportal-widget-reports-confirm-cancel"),click:function(){$(this).dialog("close")}}]})})},configureBackButton:function(){var e=this,t=e.getContent(),r=$("#bt-back",t),i=$("#categoryTree",t);r.click(function(){if($("li",i).length>1){$("li:last-child",i).remove();var t=$("li:last-child").children("#idParent").val();e.renderReports(t)}})},configureTreeNavigation:function(){var e=this,t=e.getContent(),r=$("#categoryTree",t);$("li:last-child",r).click(function(){$(this).nextAll().remove();var t=$(this).data("id-element");e.renderReports(t)})},scrollVertical:function(){var e=this.getContent();$("#reports",e).bizagiScrollbar({autohide:!1})},editFolder:function(e){var t=this,r=bizagi.util.trim($(e).find("h3").html()),i=bizagi.util.trim($(".newCaseDescription",e).html()),s=$(e).data("idquery"),o=t.getTemplate("reports-query-edit");$.tmpl(o,{name:r,description:i,idQuery:s}).dialog({resizable:!0,modal:!0,title:t.getResource("workportal-widget-reports-confirm-edit-title"),buttons:[{text:t.getResource("workportal-widget-reports-confirm-save"),click:function(){var e=$("#namequery",this).val(),r=$("#querydescripcion",this).val(),i=$(this).data("idquery");t.dataService.updateQueries({queryName:e,queryDescription:r,idQuery:i}),$(this).dialog("close"),bizagi.workportal.desktop.popup.closePopupInstance()}},{text:t.getResource("workportal-widget-reports-confirm-cancel"),click:function(){$(this).dialog("close")}}]})}}),bizagi.workportal.widgets.reportsMenu.extend("bizagi.workportal.widgets.reportsMenu",{},{init:function(e,t,r){this._super(e,t,r),this.loadTemplates({"reportsMenu-container":bizagi.getTemplate("bizagi.workportal.desktop.widget.reportsMenu").concat("#ui-bizagi-workportal-widget-reportsmenu-container"),"reportsMenu-items":bizagi.getTemplate("bizagi.workportal.desktop.widget.reportsMenu").concat("#ui-bizagi-workportal-widget-reportsmenu-items"),"reportsMenu-itemsdata":bizagi.getTemplate("bizagi.workportal.desktop.widget.reportsMenu").concat("#ui-bizagi-workportal-widget-reportsmenu-itemsdata"),"reportsMenu-tree":bizagi.getTemplate("bizagi.workportal.desktop.widget.reportsMenu").concat("#ui-bizagi-workportal-widget-reportsmenu-tree"),"reportsMenu-noitems":bizagi.getTemplate("bizagi.workportal.desktop.widget.reportsMenu").concat("#ui-bizagi-workportal-widget-reportsmenu-noitems"),"reportsMenu-edition":bizagi.getTemplate("bizagi.workportal.desktop.widget.reportsMenu").concat("#ui-bizagi-workportal-widget-reportsmenu-edition"),"reportsMenu-vldmessage":bizagi.getTemplate("bizagi.workportal.desktop.widget.reportsMenu").concat("#ui-bizagi-workportal-widget-reportsmenu-vldnmessage"),"reportsMenu-delete":bizagi.getTemplate("bizagi.workportal.desktop.widget.reportsMenu").concat("#ui-bizagi-workportal-widget-reportsmenu-delete"),useNewEngine:!1})},postRender:function(){var e=this;$.when(e.buildAnalysisJSON()).done(function(){e.renderReportsMenu("Reports")}),e.eventsHandler()},getAnalysisQueries:function(){var e=this,t=[],r=new $.Deferred;return $.when(e.dataService.getReporstAnalysisQuery()).done(function(i){$.each(i.queries,function(r,i){t.push({displayName:i.name||"",description:i.description||"",icon:"processIco",show:!0,filters:i.filterParameters,endPoint:e.endPoint[i.reportSet],reportSet:i.reportSet,activeEdit:!0,id:i.id,subItems:[]})}),r.resolve(t)}),r.promise()},renderReportsMenu:function(e){var t=this.getContent(),r=this.getTemplate("reportsMenu-items"),i=this.getTemplate("reportsMenu-noitems"),s=$("#bz-wp-widget-reportsmenu-list",t),o=this.reportsMenu[e];o.length?s.html($.tmpl(r,{elements:o})):s.html($.tmpl(i,{elements:o}))},buildAnalysisJSON:function(){var e=this,t=$.Deferred();return $.when(e.getAnalysisQueries()).pipe(function(r){bizagi.menuSecurity.AnalysisQueries&&r.length>0&&(e.reportsMenu.AnalysisQuery=r,e.reportsMenu.Reports.push({displayName:e.resources.getResource("workportal-menu-submenu-AnalysisQueries"),show:!0,icon:"",endPoint:"",subItems:"AnalysisQuery"})),t.resolve()}),t.promise()},eventsHandler:function(){var e=this,t=e.getContent(),r=$("#bz-wp-widget-reportsmenu-list",t);r.on("click","li.bz-wp-widget-reportsmenu-readmode",function(t){t.stopPropagation();var r=$(this),i=r.data("subitems"),s=r.data("displayname"),o=r.data("endpoint"),n=r.find(".bz-wp-widget-reportsmenu-itemactions").data("id");e.execSelectedItem(n,i,o),e.buildNavTree(s,i)}),r.on("click",".bz-wp-widget-reportsmenu-action",function(t){t.stopPropagation(),t.preventDefault();var r=$(this).closest("li.bz-wp-widget-reportsmenu-item"),i=$(this).closest(".bz-wp-widget-reportsmenu-itemactions").data("id");$(this).hasClass("bz-wp-widget-reportsmenu-edit")?e.showReportEdition(i,r):$(this).hasClass("bz-wp-widget-reportsmenu-delete")?e.showDeleteForm(i,r):$(this).hasClass("bz-wp-widget-reportsmenu-cancel")?e.cancelReportAction(i,r):$(this).hasClass("bz-wp-widget-reportsmenu-applyedition")?e.applyReportEdition(i,r):$(this).hasClass("bz-wp-widget-reportsmenu-applydelete")&&e.deleteReport(i,r)}),$("#bz-wp-widget-reportsmenu-navtree",t).on("click","li",function(t){$(this).nextAll().remove();var r=$(this).data("path");e.renderReportsMenu(r)})},execSelectedItem:function(e,t,r){if(""===r)this.renderReportsMenu(t);else{var i=e?this.getFiltersById(e):{};this.publish("changeWidget",{widgetName:bizagi.workportal.widgets.widget.BIZAGI_WORKPORTAL_WIDGET_REPORTS_CHART,endPoint:r,filters:i})}},showDeleteForm:function(e,t){var r=this.getTemplate("reportsMenu-delete"),i=$.tmpl(r,{id:e});t.slideUp("fast",function(){$(this).removeClass("bz-wp-widget-reportsmenu-readmode").addClass("bz-wp-widget-reportsmenu-edition").html(i)}),t.slideDown("fast")},deleteReport:function(e,t){var r=this,i=r.getContent(),s="id="+e;$.when(r.dataService.deleteReportData(s)).done(function(s){if(!0===s.status){var o=t.nextAll();o.size()>0?(o.slideUp("fast",function(){t.remove()}),o.slideDown("fast")):t.fadeOut("fast",function(){$(this).remove()}),r.reportsMenu.AnalysisQuery=jQuery.grep(r.reportsMenu.AnalysisQuery,function(t){return t.id!==e}),r.reportsMenu.AnalysisQuery.length||(r.reportsMenu.Reports.pop(),$("#bz-wp-widget-reportsmenu-navtree li:nth-of-type(1)",i).trigger("click"))}})},buildNavTree:function(e,t){var r=this.getContent(),i=this.getTemplate("reportsMenu-tree"),s=$.tmpl(i,{displayName:e,path:t});$("#bz-wp-widget-reportsmenu-navtree",r).append(s)},showReportEdition:function(e,t){var r=this.getTemplate("reportsMenu-edition"),i=this.getReportsData(e),s=$.tmpl(r,{displayName:i[0].displayName,description:i[0].description,id:e});t.slideUp("fast",function(){$(this).removeClass("bz-wp-widget-reportsmenu-readmode").addClass("bz-wp-widget-reportsmenu-edition").html(s)}),t.slideDown("fast")},applyReportEdition:function(e,t){var r=this,i=t.find("input, textarea");if(r.validateFormElements(i)){var s=r.getReportsData(e),o=i[0].value,n=i[1].value,a="parameters="+JSON.stringify({id:e,name:o,description:n,reportSet:s[0].reportSet,filterParameters:s[0].filters});$.when(r.dataService.updateReportData(a)).done(function(a){if(!0!==a.status){var c=$(i[0]).siblings(".bz-wp-widget-reportmenu-messagecnt"),p=a.message;r.showValidationMessage(p,c)}else s[0].displayName=o,s[0].description=n,r.cancelReportAction(e,t)})}},validateFormElements:function(e){for(var t=this,r=!0,i=0,s=e.length;i<s;i++){var o=$(e[i]).siblings(".bz-wp-widget-reportmenu-messagecnt");t.validateRequired($(e[i]))?t.validateSpecialCharacters($(e[i]))?t.removeValidationMessage(o):(r=!1,t.showValidationMessage(t.getResource("bz-rp-components-customreports-invalidvalue"),o)):(r=!1,t.showValidationMessage(t.getResource("bz-rp-components-customreports-required"),o))}return r},showValidationMessage:function(e,t){var r=this.getTemplate("reportsMenu-vldmessage");t.html($.tmpl(r,{message:e}))},removeValidationMessage:function(e){$(".bz-wp-widget-reportmenu-errormsg",e).remove()},validateRequired:function(e){var t=!0;return e.attr("required")&&""===e.val()&&(t=!1),t},validateSpecialCharacters:function(e){var t=!0;return new RegExp(/^[a-zA-Z0-9- ]*$/).test(e.val())||(t=!1),t},cancelReportAction:function(e,t){var r=this.getTemplate("reportsMenu-itemsdata"),i=this.getReportsData(e),s=$.tmpl(r,{element:i[0]});t.slideUp("fast",function(){$(this).addClass("bz-wp-widget-reportsmenu-readmode").removeClass("bz-wp-widget-reportsmenu-edition").html(s)}),t.slideDown("fast")},getReportsData:function(e){return this.reportsMenu.AnalysisQuery.filter(function(t){return t.id===e})},getFiltersById:function(e){return this.getReportsData(e)[0].filters}}),bizagi.workportal.widgets.reportsChart.extend("bizagi.workportal.widgets.reportsChart",{},{init:function(e,t,r){this._super(e,t,r),this.loadTemplates({reportsChart:bizagi.getTemplate("bizagi.workportal.desktop.widget.reportsChart").concat("#ui-bizagi-workportal-widget-reports-chart"),"admin.case.search.quicksearch":bizagi.getTemplate("bizagi.workportal.desktop.widgets.admin.caseSearch").concat("#ui-bizagi-workportal-widget-admin-case-search-quicksearch"),useNewEngine:!1})},postRender:function(){var e=this;e.caseSearch={},$.when(e.loadReportingModule()).done(function(){var t=e.endPoint.defaultReport;bizagi.referrerParams&&bizagi.referrerParams.reports&&bizagi.referrerParams.reports.fromBackButton&&(t=bizagi.referrerParams.reports.tab),e.loadReport(t,e.endPoint.info),e.eventsHandler()})},eventsHandler:function(){var e=this;$("#reports-menu, li",e.content).on("click",function(){var t=$(this),r=t.data("report");t.siblings().removeClass("ui-bizagi-wp-widget-reports-menu-active"),t.addClass("ui-bizagi-wp-widget-reports-menu-active"),e.loadReport(r,e.endPoint.info)})},loadReport:function(e,t){var r=this,i=r.endPoint.reports[e].components;$("#reports-canvas",r.content).empty(),bizagi.referrerParams&&bizagi.referrerParams.reports&&bizagi.referrerParams.reports.params&&bizagi.referrerParams.reports.fromBackButton&&(r.filters=bizagi.referrerParams.reports.model),$.when(r.reportingModule.render({canvas:$("#reports-canvas",r.content),report:e,components:i,info:t,filters:r.filters,myTeam:r.myTeam,widgetInstance:r})).done(function(e){r.attachReportEvents.apply(r,[e])})},attachReportEvents:function(e){var t=this;e.bindWindowResize(),e.subscribe("filterChange",function(e,r){t.filters=r}),e.subscribe("graphicquery",function(e,r){t.showGraphicQuery(r)}),e.subscribe("caseadministration",function(e,r){$.isEmptyObject(t.caseSearch)&&t.initCaseAdministration(r),t.showCaseAdministration(r)}),e.subscribe("opencase",function(e,r){t.publish("executeAction",{action:bizagi.workportal.actions.action.BIZAGI_WORKPORTAL_ACTION_ROUTING,idCase:r.caseData.idCase,idWorkItem:r.caseData.idWorkItem,idTask:r.caseData.idTask})})},initCaseAdministration:function(e){var t=this;t.getCaseSearchContent();t.caseSearch=new bizagi.workportal.widgets.admin.caseSearch(t.workportalFacade,t.dataService,$.extend(t.params,{container:e.canvas})),t.caseSearch.loadtemplates(),t.caseSearch.setupActivitiesLink=function(){}},showCaseAdministration:function(e){var t=this.getCaseSearchContent();this.caseSearch.content=t,e.canvas.html(t),this.caseSearch.findResults(e.canvas,{I_radNumber:e.radNumber})},getCaseSearchContent:function(){var e=this.getTemplate("admin.case.search.quicksearch");return $.tmpl(e)}}),bizagi.reporting||(bizagi.reporting={}),bizagi.reporting={BAMProcess:{defaultReport:"bamprocessloadanalysis",info:{reportSet:1},reports:{bamprocessloadanalysis:{components:["filters-processversion","filters-dimension"],resource:"bz-rp-loadanalysis-tab"},bamprocessworkinprogress:{components:["filters-processversion","filters-dimension"],resource:"bz-rp-workinprogress-tab"}}},BAMTask:{defaultReport:"bamtasksworkinprogress",info:{reportSet:2},reports:{bamtasksworkinprogress:{components:["filters-processversion","filters-dimension"],resource:"bz-rp-workinprogress-tab"},bamtaskloadanalysis:{components:["filters-processversion","filters-dimension"],resource:"bz-rp-loadanalysis-tab"}}},AnalyticsProcess:{defaultReport:"analyticsprocesscycletime",info:{reportSet:3},reports:{analyticsprocesscycletime:{components:["filters-processversion","filters-dimension","filters-time"],resource:"bz-rp-cycletime-tab"},analyticsprocessdurationhistogram:{components:["filters-processversion","filters-dimension","filters-time"],resource:"bz-rp-durationhistogram-tab"},analyticsprocessactivity:{components:["filters-processversion","filters-dimension","filters-time"],resource:"bz-rp-processactivity-tab"},analyticsprocessactivationranking:{components:["filters-dimension","filters-time"],resource:"bz-rp-activationranking-tab"},analyticsprocessfrequentspaths:{components:["filters-processversion","filters-dimension","filters-time"],resource:"bz-rp-frequentspaths-tab"}}},AnalyticsTask:{defaultReport:"analyticstaskcycletime",info:{reportSet:4},reports:{analyticstaskcycletime:{components:["filters-processversion","filters-dimension","filters-time"],resource:"bz-rp-cycletime-tab"}}},ResourceBAM:{callBack:"myTeamCallBack",defaultReport:"bamresourcemonitorworkinprogress",info:{reportSet:6},reports:{bamresourcemonitorworkinprogress:{components:["filters-processversion","filters-dimension","filters-time"],resource:"bz-rp-workinprogress-tab"},bamresourcemonitorworkinprogressuser:{components:["filters-processversion","filters-dimension","filters-time"],resource:"bz-rp-workinprogressuser-tab"},bamresourcemonitorworkinprogressteam:{components:["filters-processversion","filters-dimension","filters-time"],resource:"bz-rp-workinprogressteam-tab"}}},AnalyticsSensor:{defaultReport:"sensors",reports:{sensors:{components:["filters-dimension","filters-time"]}},info:{reportSet:5}}};
//# sourceMappingURL=../../../../Maps/desktop/reports.desktop.production.js.map