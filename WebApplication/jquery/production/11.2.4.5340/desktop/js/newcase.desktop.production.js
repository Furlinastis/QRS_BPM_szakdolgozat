bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.newCase",{},{getWidgetName:function(){return bizagi.workportal.widgets.widget.BIZAGI_WORKPORTAL_WIDGET_NEWCASE},renderContent:function(){var e=this.getTemplate("newCase");return this.content=$.tmpl(e)},createNewCase:function(e,t){var a=this,i=new $.Deferred;return bizagi.loader.start("rendering").then(function(){bizagi.loader.start("plans-view").then(function(){$.when(a.dataService.startProcess({idProcess:e,isAdhocProcess:t})).then(function(e){a.onStartProcessDone(e),i.resolve(e)}).fail(i.reject)})}),i.promise()},createNewCaseWithIdOrganization:function(e,t){var a=this,i=new $.Deferred;return bizagi.loader.start("rendering").then(function(){bizagi.loader.start("plans-view").then(function(){$.when(a.dataService.startProcess({idProcess:e,idOrganization:t})).then(function(e){a.onStartProcessDone(e),i.resolve(e)})})}),i.promise()},onStartProcessDone:function(e){this.publish("executeAction",{action:bizagi.workportal.actions.action.BIZAGI_WORKPORTAL_ACTION_ROUTING,idCase:e.caseInfo.idCase,radNumber:e.radNumber,formsRenderVersion:void 0!==e.caseInfo.isOfflineForm?e.caseInfo.formsRenderVersion:0,isOfflineForm:void 0!==e.caseInfo.isOfflineForm&&e.caseInfo.isOfflineForm,data:e})}}),bizagi.workportal.widgets.newCase.extend("bizagi.workportal.widgets.newCase",{},{init:function(e,t,a){var i=this;bizagi.referrerParams=bizagi.referrerParams||{},bizagi.referrerParams.referrer="inboxGrid",i._super(e,t,a),i.enumCurrentContext={RECENT:1,ALL:2},i.currentContext="",i.loadTemplates({"error-message":bizagi.getTemplate("common.bizagi.desktop.error-message"),newCase:bizagi.getTemplate("bizagi.workportal.desktop.widget.newCase").concat("#ui-bizagi-workportal-widget-newcase"),"newCase-categories":bizagi.getTemplate("bizagi.workportal.desktop.widget.newCase").concat("#ui-bizagi-workportal-widget-newcase-categories"),"newCase-categories-tree":bizagi.getTemplate("bizagi.workportal.desktop.widget.newCase").concat("#ui-bizagi-workportal-widget-newcase-categories-tree"),"newCase-categories-recent-process":bizagi.getTemplate("bizagi.workportal.desktop.widget.newCase").concat("#ui-bizagi-workportal-widget-recent-process"),"newCase-categories-organization-list":bizagi.getTemplate("bizagi.workportal.desktop.widget.newCase").concat("#ui-bizagi-workportal-widget-newcase-organization-list"),useNewEngine:!1})},postRender:function(){var e=this,t=e.getContent();e.configureBackButton(),bizagi.idCategory=void 0,e.scrollVertical({autohide:!1}),e.configureTreeNavigation(),$("#frecuentCases",t).click(function(){e.removeOrganizationList(),$(this).hasClass("frecuentCasesOn")||($(".searchNewCase",t).hide(),$("#modalTitle",t).html(e.getResource("workportal-menu-recent-processes")),e.renderRecentProcess(),$(this).addClass("frecuentCasesOn"),$("#casesList",t).removeClass("casesListOn"))}).tooltip(),$("#casesList",t).click(function(){e.removeOrganizationList(),$(this).hasClass("casesListOn")||($(".searchNewCase",t).show(),$("#categories",t).show(),$("#searchNewCase",t).focus(),$("#searchNewCase",t).val(""),$("#modalTitle",t).html(e.getResource("workportal-menu-all-processes")),e.renderCategories(),$(this).addClass("casesListOn"),$("#frecuentCases",t).removeClass("frecuentCasesOn"))}).tooltip(),$("#search",t).click(function(){$(this).hasClass("searchOn")?$(this).removeClass("searchOn"):$(this).addClass("searchOn")}),$("#frecuentCases",t).click()},renderCategories:function(e,t){var a=this;a.currentContext=a.enumCurrentContext.ALL;var i,r=a.getContent(),n=a.getTemplate("newCase-categories"),o=$("#categories",r),s=$("#categoryTree",r),c=!1,l={};bizagi.criticSection=1==bizagi.criticSection?1:0,$.when(a.dataService.getCategories({idCategory:e,idApp:t||""})).done(function(e){if(a.currentContext===a.enumCurrentContext.ALL){if(o.empty(),s.show(),e.totalApps>1){var t={category:[]};$.each(e.category,function(e,a){t.category.push({appId:a.appId,idCategory:"",categoryName:a.appName,isProcess:"false",isAdhocProcess:"false",description:" "})}),e=t}if(e.category.length>100){for(l.category={},d=0;d<=100;d++)l.category[d]=e.category[d];l.truncate=!0,(i=$.tmpl(n,l)).appendTo(o),a.loadAllElementEvent(e)}else l=e,(i=$.tmpl(n,l)).appendTo(o);a.scrollVertical({autohide:!1});var g={category:[]},d=0;$.each(e.category,function(t,a){e.category[t].label=a.categoryName,e.category[t].value=a.idCategory}),$("#searchNewCase",r).focus(),$(r).delegate("#searchNewCase","keyup",function(t){t.stopPropagation(),0===$("#searchNewCase",r).val().length&&c&&((i=$.tmpl(n,l)).appendTo(o),a.assignEvent(),a.loadAllElementEvent(e),c=!1)}),$("#searchNewCase",r).autocomplete({messages:{noResults:null,results:function(){}},minLength:3,source:e.category,autoFocus:!0,position:{my:"left top",at:"left top",of:"body",offset:"-10 -10",collision:"none",delay:800},open:function(){d=0,g.category=[]},select:function(){return 1==$("#categories ul").length&&$("#categories ul").trigger("click"),!1}}).data("ui-autocomplete")._renderItem=function(t,r){return d>=15?{data:function(){}}:(g.category[d++]=r,(i=$.tmpl(n,g)).appendTo(o),c=!0,a.assignEvent(i),a.loadAllElementEvent(e),i)},a.assignEvent()}})},loadAllElementEvent:function(e){var t=this,a=t.getContent(),i=t.getTemplate("newCase-categories"),r=$("#categories",a);$(".loadMoreElements",r).click(function(a){a.stopPropagation(),$(this).find("#loadMoreElementsIcon").removeClass("plus_load_icon").addClass("loading_icon"),r.empty(),$.tmpl(i,e).appendTo(r),t.assignEvent()})},assignEvent:function(e){var t=this,a=t.getContent(),i=$("#categories",a),r=$("#categoryTree",a),n=e||$("ul",i);$(n).click(function(e){e.stopPropagation();var n=$(this).children("#idCategory").val(),o=n,s=$(this).children("#isProcess").val(),c=$(this).children("#categoryName").val(),l=$(this).children("#isAdhocProcess").val(),g=$(this).data("appid");if((1==bizagi.criticSection||n==bizagi.idCategory)&&!bizagi.util.parseBoolean(s))return!0;if(bizagi.idCategory=n,$("#searchNewCase",a).val(""),bizagi.criticSection=1,!0===bizagi.util.parseBoolean(s)){bizagi.util.emptyNavigatorInfo();var d=$(this).find(".processIco");if($(d).addClass("wait"),$(this).prevAll("ul").fadeTo(650,0,"easeInOutCirc").slideUp({duration:300,easing:"easeInOutCirc"}),$(this).nextAll("ul").fadeTo(650,0,"easeInOutCirc").slideUp({duration:300,easing:"easeInOutCirc"}),bizagi.currentUser.isMultiOrganization&&"true"==bizagi.currentUser.isMultiOrganization)$.when(t.dataService.getOrganizationsByUserList()).done(function(e){t.createOrganizationList(o,e.response,$(i).parent().outerWidth(),$("#modalMenuBtList",t.getContent()).position().top)});else{var u=t.startLoader(a,c);$.when(t.createNewCase(n,l)).done(function(e){bizagi.referrerParams&&(bizagi.referrerParams.idWorkItem=""),e.caseInfo.workItems&&e.caseInfo.workItems.length>=1&&(bizagi.referrerParams.idWorkItem=e.caseInfo.workItems.length>=1?e.caseInfo.workItems[0].idWorkItem:""),u.end()})}}else{var p=t.getTemplate("newCase-categories-tree");$.tmpl(p,{idParentCategory:n,categoryName:c,appId:g}).appendTo(r),t.configureTreeNavigation(),t.renderCategories(n,g)}bizagi.criticSection=0,bizagi.idCategory=void 0})},renderRecentProcess:function(){var e=this;e.currentContext=e.enumCurrentContext.RECENT;var t=e.getContent(),a=$("#categories",t),i=$("#categoryTree",t),r=$("#bt-back",t),n=e.getTemplate("newCase-categories-recent-process");a.empty(),$("li:first",i).nextAll().remove(),i.hide(),r.hide(),$.when(e.dataService.getRecentProcesses({numberOfProcesses:7,onlyLastProcesses:!0})).done(function(i){e.currentContext===e.enumCurrentContext.RECENT&&($.tmpl(n,i).appendTo(a),0===i.processes.length&&$.browser.msie&&(a.blur(),a.hide()),$("ul",a).click(function(){$("ul",a).unbind("click");var i=$(this).children("#idWFClass").val(),r=$(this).children("#categoryName").val();bizagi.util.emptyNavigatorInfo();var n=$(this).find(".processIco");$(n).addClass("wait"),$(this).prevAll("ul").fadeTo(650,0,"easeInOutCirc").slideUp({duration:300,easing:"easeInOutCirc"}),$(this).nextAll("ul").fadeTo(650,0,"easeInOutCirc").slideUp({duration:300,easing:"easeInOutCirc"}),bizagi.currentUser.isMultiOrganization&&"true"==bizagi.currentUser.isMultiOrganization?$.when(e.dataService.getOrganizationsByUserList()).done(function(t){e.createOrganizationList(i,t.response,$(a).parent().outerWidth(),$("#modalMenuBtList",e.getContent()).position().top)}):$.when(bizagi.util.autoSave()).done(function(){$(document).data("auto-save","");var a=e.startLoader(t,r);$.when(e.createNewCase(i)).done(function(e){a.end(),e&&!e.hasStartForm&&bizagi.referrerParams&&(bizagi.referrerParams.idWorkItem=e.caseInfo.workItems.length>=1?e.caseInfo.workItems[0].idWorkItem:"")}).fail(function(){a.end()})}),setTimeout(function(){$("ul",a).bind("click")},1e3)}))})},startLoader:function(e,t){var a=$("#modalNewCaseMessage",e),i=$("#modalNewCaseOverlay",e);return _show=function(e){i[e?"removeClass":"addClass"]("modalNewCaseOverlay"),i[e?"addClass":"removeClass"]("modalNewCaseOverlayShow"),a[e?"addClass":"removeClass"]("show")},_center=function(){var e=$(document).width()/2-a.width()/2;_top=$(document).height()/2-a.height()/2,a.css("left",e).css("top",_top)},_setMessage=function(t){$("#case",e).text(t)},_show(!0),_center(),_setMessage(t),{end:function(){bizagi.workportal.desktop.popup.closePopupInstance(),_show(!1)}}},createOrganizationList:function(e,t){var a=this,i=a.getContent(),r=$("#modalMenuBtList",i),n=a.getTemplate("newCase-categories-organization-list");if(0===$("#organization-list",r).length){var o=$.tmpl(n,{organizationList:t}).appendTo(r);$("#new-case",o).click(function(t){t.preventDefault(),$.when(a.createNewCaseWithIdOrganization(e,$("#organization-list",o).val())).done(function(e){e&&!e.hasStartForm&&bizagi.referrerParams&&(bizagi.referrerParams.idWorkItem=e.caseInfo.workItems.length>=1?e.caseInfo.workItems[0].idWorkItem:""),bizagi.workportal.desktop.popup.closePopupInstance()})})}},removeOrganizationList:function(){var e=this.getContent();$(".new-case-organization-list-content",e).remove()},configureBackButton:function(){var e=this,t=e.getContent(),a=$("#bt-back",t),i=$("#categoryTree",t);a.click(function(){if(bizagi.idCategory=void 0,2==$("li",i).length&&a.hide(),$("li",i).length>1){$("li:last-child",i).remove();var t=$("li:last-child",i).children("#idParentCategory").val(),r=$("li:last-child",i).data("appid");e.renderCategories(t,r)}})},configureTreeNavigation:function(){var e=this,t=e.getContent(),a=$("#bt-back",t),i=$("#categoryTree",t);$("li",i).length<=1?a.hide():a.show(),$("li:last-child",i).click(function(){$(this).nextAll().remove();var t=$(this).children("#idParentCategory").val(),r=$(this).data("appid");1==$("li",i).length&&(bizagi.idCategory=void 0,a.hide()),r&&(bizagi.idCategory=void 0),e.renderCategories(t,r)})},scrollVertical:function(e){var t=this.getContent();e=e||{},$("#categories",t).bizagiScrollbar(e)}});
//# sourceMappingURL=../../../../Maps/desktop/newcase.desktop.production.js.map