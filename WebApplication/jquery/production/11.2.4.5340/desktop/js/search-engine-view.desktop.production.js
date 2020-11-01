bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.paginator",{},{init:function(e,t,i){this._super(e,t,i),this.loadTemplates({paginator:bizagi.getTemplate("bizagi.workportal.desktop.widget.paginator").concat("#paginator-wrapper"),content:bizagi.getTemplate("bizagi.workportal.desktop.widget.paginator").concat("#paginator-content")})},renderContent:function(){var e=this,t="ENTITY"===e.params.referenceType,i=e.getTemplate("paginator"+e.getSuffixWidget());return e.content=i.render({hide:t}),e.content},postRender:function(){var e=this;e.sub("PAGINATOR-UPDATE",$.proxy(e.updateView,e)),e.configureHandlers()},getSuffixWidget:function(){return""},updateView:function(e,t){var i=this,r=t.args,o="ENTITY"===r.referenceType,a=i.getContent();function n(){i.getTemplate("content"+i.getSuffixWidget()).render({totalRecords:i.totalRecords,totalPages:i.totalPages,displayName:i.displayName,currentPage:i.currentPage,hide:o}).appendTo(a)}i.setModel(r),a.empty(),r.fromActionLauncher?i.totalRecords>1?n():i.clean():n()},setModel:function(e){var t=this;t.totalRecords=void 0===e.totalRecords?t.totalRecords:e.totalRecords,t.totalPages=e.totalPages||t.totalPages,t.displayName=e.histName||t.displayName,t.currentPage=e.currentPage||t.currentPage,t.action=e.action,t.reference=e.reference||t.reference,t.surrogateKey=e.surrogateKey||t.surrogateKey,t.referenceType=e.referenceType,t.event=e.event,t.guidSearch=e.guidSearch},getModel:function(){var e=this;return{page:e.currentPage,totalRecords:e.totalRecords,action:e.action,reference:e.reference,surrogateKey:e.surrogateKey,referenceType:e.referenceType,stopNavigation:!0,guidSearch:e.guidSearch}},configureHandlers:function(){var e=this;e.getContent().on("click",$.proxy(e.onPageBreak,e))},onPageBreak:function(e){var t=this,i=$(e.target),r=t.getContent();if(i.hasClass("control-icon")&&!i.hasClass("ui-state-disabled")){var o=i.data("type");"forward"==o?t.currentPage+=1:"rewind"==o?t.currentPage-=1:t.currentPage="fastrewind"==o?1:t.totalPages,t.disabledPaginatorButtonsByLimits(),r.find(".paginator-controls__currentPage").text(t.currentPage),t.pub("notify",{type:"UPDATE-DATATEMPLATE-VIEW",args:t.getModel()})}},disabledPaginatorButtonsByLimits:function(){var e=this,t=$("[data-type='fastrewind']",e.content),i=$("[data-type='rewind']",e.content),r=$("[data-type='forward']",e.content),o=$("[data-type='fastforward']",e.content);1===e.totalPages?(t.addClass("ui-state-disabled"),i.addClass("ui-state-disabled"),r.addClass("ui-state-disabled"),o.addClass("ui-state-disabled")):1===e.currentPage?(t.addClass("ui-state-disabled"),i.addClass("ui-state-disabled"),r.removeClass("ui-state-disabled"),o.removeClass("ui-state-disabled")):e.currentPage===e.totalPages?(t.removeClass("ui-state-disabled"),i.removeClass("ui-state-disabled"),r.addClass("ui-state-disabled"),o.addClass("ui-state-disabled")):(t.removeClass("ui-state-disabled"),i.removeClass("ui-state-disabled"),r.removeClass("ui-state-disabled"),o.removeClass("ui-state-disabled"))},clean:function(){var e=this.getContent();e&&e.empty()}}),bizagi.injector.register("bizagi.workportal.widgets.paginator",["workportalFacade","dataService",bizagi.workportal.widgets.paginator]),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.sortbar",{},{init:function(e,t,i,r,o){var a=this;a._super(e,t,o),a.loadTemplates({sortbar:bizagi.getTemplate("bizagi.workportal.desktop.widget.sortbar").concat("#sortbar-wrapper"),content:bizagi.getTemplate("bizagi.workportal.desktop.widget.sortbar").concat("#sortbar-content"),"right-content":bizagi.getTemplate("bizagi.workportal.desktop.widget.sortbar").concat("#sortbar-right"),addButton:bizagi.getTemplate("bizagi.workportal.desktop.widget.sortbar").concat("#sortbar-content-add-button"),sortMenu:bizagi.getTemplate("bizagi.workportal.desktop.widget.sortbar").concat("#sortbar-sort-menu"),actions:bizagi.getTemplate("bizagi.workportal.desktop.widget.sortbar").concat("#sortbar-content-actions"),recordsPerPage:bizagi.getTemplate("bizagi.workportal.desktop.widget.sortbar").concat("#sortbar-records-per-page"),recordsMenu:bizagi.getTemplate("bizagi.workportal.desktop.widget.sortbar").concat("#sortbar-records-menu")}),a.processActionService=i,a.accumulatedcontext=r},renderContent:function(){var e=this,t=e.getTemplate("sortbar");return e.content=t.render({enableFilter:!0}),e.$checkAll=e.content.find(".sortbar-left-check-uncheck input"),e.content},postRender:function(){var e=this,t=e.getTemplate("right-content");e.configureHandlers(),$(".sortbar-right",e.content).append(t.render()),e.configureAfterPaintHandlers()},configureHandlers:function(){var e=this,t=e.getContent();e.sub("TEMPLATEENGINE-VIEW",$.proxy(e.initializeAndProcessFilterButton,e)),e.sub("SEARCH-ENGINE-VIEW",$.proxy(e.initializeAndProcessFilterButton,e)),e.sub("SET-FILTERS-DATA",$.proxy(e.setFiltersSortData,e)),e.sub("HIDE-FILTER-BUTTONANDBAR",$.proxy(e.hideFilterButtonAndBar,e)),e.sub("HIDE-SORT-BUTTONS",$.proxy(e.hideSortButtons,e)),e.sub("ENABLE-BATCHS-ACTIONS",function(t,i){return e.enableBatchActions(i)}),e.sub("UPDATE-COUNTER-FILTERS-APPLIED",function(t,i){return e.updateCounterByFilterApplied(i)}),e.sub("CASES-TEMPLATE-VIEW",function(t,i){e.showingFiltering=!1,e.setVisibleCheckAll(!1),e.behaviorVisibleSortbar()}),e.sub("SOME-ITEM-ALLOW-SELECT",function(t,i){e.setVisibleCheckAll(!0),e.behaviorVisibleSortbar()}),e.sub("HIDE-CHECK-ALL",function(t,i){e.setVisibleCheckAll(!1)}),e.sub("BATCH-ACTIONS",function(t,i){return e.validActions(i.args.actionsData)}),t.find(".wgd-sortbar-add-button").tooltip(),e.$checkAll.on("click",$.proxy(e.onCheckUncheck,e))},configureAfterPaintHandlers:function(){var e=this,t=e.getContent();t.find(".right-menu").on("click",function(t){e.showSortMenu(t,$(this))}),t.find(".records-menu").on("click",function(t){e.showRecordsMenu(t,$(this))}),t.find(".sortbar-az").on("click",function(){e.sortSelection.attribute&&(e.setIconSortType($(this),e._sortType),e.pub("notify",{type:"SET-ORDERBY",args:{properties:{xpath:e.sortSelection.attribute,orderType:e._sortType,typeSearch:"none"}}}))}),t.find(".filter-icon").on("click",function(){e.pub("notify",{type:"OPENCLOSE-MYSEARCHFILTER",args:{guidSearch:e.params.guidSearch,target:$(this)}})}),$(".remove-selected-items-collections",t).on("click",$.proxy(e.onRemoveSelectedItemsCollections,e))},behaviorVisibleSortbar:function(){var e=this;e.showingFiltering||e.showingSorting||e.showingCheckAll||e._haveAddButton?e.setVisibleSortbar(!0):e.setVisibleSortbar(!1)},setVisibleSortbar:function(e){var t=this.getContent();e?t.show():t.hide()},setVisibleCheckAll:function(e){e?(this.$checkAll.closest(".border-check-uncheck").show(),this.showingCheckAll=!0):(this.$checkAll.closest(".border-check-uncheck").hide(),this.showingCheckAll=!1)},showSelectedItems:function(e){var t=this;if(e&&e>0){t.content.addClass("there-are-actions");var i=t.getResource("workportal-general-word-selected-singular");e>1&&(i=t.getResource("workportal-general-word-selected-plural")),$(".actions-count-selected",t.content).text(e+" "+i+" ")}else t.content.removeClass("there-are-actions")},setIconSortType:function(e,t){"asc"===t?(this._sortType="desc",e.removeClass("bz-icon-order-ascendant-outline").addClass("bz-icon-order-descendant-outline")):(this._sortType="asc",e.removeClass("bz-icon-order-descendant-outline").addClass("bz-icon-order-ascendant-outline"))},onClickBatchAction:function(e){var t=this,i=$(e.target).closest("li"),r=i.data("guid"),o=t.getAction(r);t.requestsInProgressActionGuid[r]||(t.requestsInProgressActionGuid[r]=!0,t.addLoadingButtonAction(i),$.when(t.processActionService.executeBatchAction({action:o,commonActionsmodel:t.commonActionsmodel})).always(function(){i.find(".wdg-tple-button").removeClass("state-loading"),i.find(".ui-bizagi-loading-button").remove(),i.find("i").show(),t.requestsInProgressActionGuid[r]=void 0}))},addLoadingButtonAction:function(e){e.find(".wdg-tple-button").addClass("state-loading"),e.find(".wdg-tple-button").prepend('<div class="ui-bizagi-loading-icon ui-bizagi-loading-button"></div>').find("i").hide()},onRemoveSelectedItemsCollections:function(){var e=this.pub("notify",{type:"SET-VALUES",args:{value:!1}})[0];this.enableBatchActions({args:{commonActions:e}})},showSortMenu:function(e,t){var i=this,r=i.getContent(),o=i.getTemplate("sortMenu").render({filters:i._filters},{displayValue:function(e){return e}});$(".sortbar-box-menu",t).length&&$(".sortbar-box-menu",t).remove(),t.append(o),o.show("fast",function(){o.click(function(e){e.stopPropagation()}),$(document).one("click",function(){o.hide("fast"),o.remove()})}),r.find(".sortbar-option").on("click",function(e){var a=$(e.currentTarget).data(),n=i._filters[a.index];r.find(".sortbar-az").removeClass("disabled"),i.sortSelection!=n&&(i.sortSelection=n,$(".sortbar-selected",t).text(i.sortSelection.display.split(".").pop()),i.pub("notify",{type:"SET-ORDERBY",args:{properties:{xpath:n.attribute,orderType:i._sortType,typeSearch:"none"}}})),o.hide("fast")})},showRecordsMenu:function(e,t){var i=this,r=i.getContent(),o=i.getTemplate("recordsMenu").render({});$(".sortbar-records-box-menu",t).length&&$(".sortbar-records-box-menu",t).remove(),t.append(o),o.show("fast",function(){o.click(function(e){e.stopPropagation()}),$(document).one("click",function(){o.hide("fast"),o.remove()})}),r.find(".sortbar-records-option").on("click",function(e){var r=Number(bizagi.util.trim(this.textContent));$(".sortbar-records-selected",t).text(r),i.pub("notify",{type:"SET-RECORDS",args:{pageSize:r}}),o.hide("fast")})},initializeAndProcessFilterButton:function(e,t){var i=this;i.showingFiltering=!1,i.setVisibleCheckAll(!1),i.behaviorVisibleSortbar(),i.restoreOrderSelected(),i.setIconSortType($(".sortbar-az",i.content),"desc"),i.params=t.args,i.sortSelection={},i.processAddButton(e,t)},processAddButton:function(e,t){var i=this,r=i.getContent(),o=t.args,a=o.action,n=r.find(".sortbar-left .add-button");i._lastReferenceEntity=o.reference,n.children().remove(),$(".wrapper-sortbar-actions",r).remove(),i._haveAddButton=!1,o.reference&&"ENTITY"!==o.referenceType?(n.startLoading({delay:0,overlay:!0}),i.dataService.getProcessAddAction(t).done(function(e){i._lastReferenceEntity===e.referenceEntity&&void 0!==e&&Object.getOwnPropertyNames(e).length>1&&e.guidEntity&&e.id&&i.renderButton(n,e)}).always(function(){n.endLoading()})):a&&i.renderButton(n,a)},renderButton:function(e,t){var i=this,r=i.getTemplate("addButton").render({action:t});e.empty(),r.appendTo(e),i._haveAddButton=!0,i.behaviorVisibleSortbar(),r.on("click",function(){i.clickAddButton(t)})},clickAddButton:function(e){var t=this;$.when(t.dataService.getMapping({guidEntity:e.guidEntity,accumulatedContext:t.accumulatedcontext.getContext({}),xpathContext:"Process"===e.type?e.xpathContext:""})).done(function(i){"Process"===e.type?t.onExecuteProcess(e,i):t.onExecuteForm(e,i)})},onCheckUncheck:function(e){var t=$(e.target).is(":checked"),i=this.pub("notify",{type:"SET-VALUES",args:{value:t}})[0];this.enableBatchActions({args:{commonActions:i}})},enableBatchActions:function(e){var t=this,i=e.args,r=t.commonActionsmodel=i.commonActions,o=t.validActions(r.actions);(o.length>0||t._haveAddButton)&&$(t.getContent()).show(),t.showBatchActions(o,r,"batchAction"),void 0!==r.checkAll&&t.$checkAll.prop("checked",r.checkAll)},showBatchActions:function(e,t,i){var r=this,o=r.getContent(),a=r.getTemplate("actions");r.showSelectedItems(Object.keys(t.itemsSelected).length);var n=e.slice(3,9999),s=a.render({actions:e.slice(0,3),moreActions:n,typeActions:i});$(".wdg-tple-button.batchAction",r.content).off("click",$.proxy(r.onClickBatchAction,r)),$(".wrapper-sortbar-actions",o).remove(),$(".sortbar-left .sortbar-menu",o).append(s),$(".wdg-tple-button.batchAction",r.content).on("click",$.proxy(r.onClickBatchAction,r)),n.length>0&&(r.content.data("ui-tooltip")&&$(r.content).tooltip("destroy"),$(r.content).tooltip({tooltipClass:"sortbar-tooltip-more-actions",items:".bz-actions-showmore",content:$(".template-box-tooltip",r.content).html(),open:function(e,t){$(".wdg-tple-button.batchAction",t.tooltip).on("click",$.proxy(r.onClickBatchAction,r));var i=$("div.ui-tooltip");if(void 0===e.originalEvent)return i.remove(),!1;var o=$(t.tooltip).attr("id");for(var a in i.not("#"+o).remove(),r.requestsInProgressActionGuid)if(r.requestsInProgressActionGuid[a]){var n=$("li[data-guid='"+a+"']",t.tooltip);r.addLoadingButtonAction(n)}},close:function(e,t){t.tooltip.hover(function(){$(this).stop(!0).fadeTo(400,1)},function(){$(this).fadeOut("400",function(){$(".wdg-tple-button.batchAction",this).off("click",$.proxy(r.onClickBatchAction,r)),$(this).remove()})})}}))},setFiltersSortData:function(e,t){var i=this,r=t.args.filtersAppliedCounter,o=t.args.totalRecords;if(i._filters=t.args.calculateFilters?t.args.filters:i._filters,t.args.calculateFilters){for(var a,n=-1,s=0,l=0;a=i._filters[++n];)"Text"!=a.type&&"Link"!==a.type&&a.data&&(a.data.defaultValues&&a.data.defaultValues.length>0||a.data.min&&a.data.max)&&s++,""!==a.display&&l++;o>0?(s>0?i.showFilterButton():i.hideFilterButton(),l>0?i.showSortButtons():i.hideSortButtons()):0===r&&(i.hideFilterButton(),i.hideSortButtons())}i.updateCounter(r)},showFilterButton:function(){$(".filter-icon",this.getContent()).show()},hideFilterButton:function(){$(".filter-icon",this.getContent()).hide(),this.showingFiltering=!1,this.behaviorVisibleSortbar()},showSortButtons:function(){var e=this;$(".sortbar-text",e.getContent()).show(),$(".sortbar-icon",e.getContent()).show(),$(".sortbar-az",e.getContent()).show(),e.showingSorting=!0,e.showingFiltering=!0,e.behaviorVisibleSortbar()},hideSortButtons:function(){var e=$(".sortbar-az",this.getContent());$(".sortbar-text",this.getContent()).hide(),e.addClass("disabled"),e.removeClass("bz-icon-order-ascendant-outline"),e.removeClass("bz-icon-order-descendant-outline"),e.addClass("bz-icon-order-ascendant-outline"),e.hide(),this.showingSorting=!1,this.behaviorVisibleSortbar()},restoreOrderSelected:function(){$(".sortbar-selected",this.getContent()).text(this.getResource("workportal-my-search-order-by"))},updateCounterByFilterApplied:function(e){e.args.filtersApplied&&this.updateCounter(e.args.filtersApplied.length)},updateCounter:function(e){var t=this.getContent(),i=$(".counter-filters-applied",t);e>0?(i.html(e),i.show()):i.hide()},hideFilterButtonAndBar:function(){this.showingFilter=!1,$(".filter-icon",this.getContent()).hide(),this.pub("notify",{type:"CLOSE-MYSEARCHFILTER",args:{show:!1,$target:null}})},onExecuteProcess:function(e,t){var i=this;e.startForm&&(e.hasStartForm=e.startForm),$.when(i.processActionService.executeProcessAction({action:e,mappingData:t})).done(function(t){(t=t||{})&&!1!==t.refreshTemplateData&&i.loadTemplateData(e)})},loadTemplateData:function(e){this.pub("notify",{type:"TEMPLATEENGINE-VIEW",args:{action:e,isRefresh:!0}})},onExecuteForm:function(e,t){var i=this;$.when(i.processActionService.executeFormAction({action:e,mappingData:t})).done(function(t){t.refresh&&i.pub("notify",{type:"UPDATE-DATATEMPLATE-VIEW",args:{action:e,isRefresh:!0,calculateFilters:!0}})})},getAction:function(e){return this.commonActionsmodel.actions.filter(function(t){return t.id==e})[0]},validActions:function(e){return $.grep(e,function(e){return 2==e.multiplicity||"Collection"!=e.mode&&("Form"!=e.type&&(!e.isEvent&&("Process"!=e.type||!e.hasStartForm)))})},clean:function(){var e=this,t=e.getContent();e.requestsInProgressActionGuid={},t&&(e.unsub("TEMPLATEENGINE-VIEW"),e.unsub("ENABLE-BATCHS-ACTIONS"),e.unsub("SEARCH-ENGINE-VIEW"),e.unsub("SET-FILTERS-DATA"),e.unsub("HIDE-FILTER-BUTTONANDBAR"),e.unsub("HIDE-SORT-BUTTONS"),e.$checkAll.off("click"),t.find(".right-menu").off("click"),t.find(".sortbar-az").off("click"),t.find(".filter-icon").off("click"),t.find(".sortbar-action").off("click"),$(".wdg-tple-button.batchAction",t).off("click",$.proxy(e.onClickBatchAction,e)),$(".remove-selected-items-collections",t).off("click",$.proxy(e.onRemoveSelectedItemsCollections,e)))}}),bizagi.injector.register("bizagi.workportal.widgets.sortbar",["workportalFacade","dataService","processActionService","accumulatedcontext",bizagi.workportal.widgets.sortbar]),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.mysearchfilter",{init:function(e,t,i,r){var o=this;o.params={},o._super(e,t,r),o.loadTemplates({mysearchfilter:bizagi.getTemplate("bizagi.workportal.desktop.widget.mysearchfilter").concat("#mysearchfilter-wrapper"),"mysearchfilter-item":bizagi.getTemplate("bizagi.workportal.desktop.widget.mysearchfilter").concat("#mysearchfilter-item")}).done(function(){o.filterItem=o.getTemplate("mysearchfilter-item")}),o.processActionService=i,o.filtersApplied=[],o.filters=[]},renderContent:function(){return this.content=this.getTemplate("mysearchfilter").render({}),this.content.hide(),this.content},postRender:function(){this.configureHandlers()},initializeMySearchFilter:function(e,t){var i=this,r=i.getContent();i.criteriaSearchApplied=t.args.filters?bizagi.clone(t.args.filters):[],i.filtersApplied=[],i.filterControlArray=[],i.orderBy={},$(".mysearchfilter-list",r).empty()},configureHandlers:function(){var e=this;e.sub("TEMPLATEENGINE-VIEW",$.proxy(e.initializeMySearchFilter,e)),e.sub("SEARCH-ENGINE-VIEW",$.proxy(e.initializeMySearchFilter,e)),e.sub("OPENCLOSE-MYSEARCHFILTER",$.proxy(e.toggleWidget,e)),e.sub("CLOSE-MYSEARCHFILTER",$.proxy(e.openCloseWidget,e)),e.sub("SET-FILTERS-DATA",$.proxy(e.setFiltersData,e)),e.sub("SET-ORDERBY",$.proxy(e.setOrderBy,e)),e.sub("SET-RECORDS",$.proxy(e.setRecordsPerPage,e))},setFiltersData:function(e,t){var i=this;if(t.args.defaultFilterApplied){t.args.filtersApplied=t.args.filtersApplied||[];var r=t.args.filtersApplied.filter(function(e){return void 0!==e.properties});i.filtersApplied=r}if(t.args.calculateFilters){for(var o=i.getContent(),a=$(".mysearchfilter-list",o),n=t.args.filters,s=t.args.filtersAppliedCounter,l=-1,c=0;u=n[++l];)if("Text"!=u.type&&"Link"!==u.type&&u.data&&(u.data.defaultValues&&u.data.defaultValues.length>0||u.data.min&&u.data.max)){c++;break}if(0===t.args.totalRecords&&0===s?i.openCloseWidget({show:!1}):0===c?i.openCloseWidget({show:!1}):i.openCloseWidget({show:!0}),i.filterControlArray&&0===i.filterControlArray.length)for(l=-1;u=n[++l];){u.tmplid=u.attribute.replaceAll(".","-"),i.filtersApplied.filter(function(e){return e.properties.type===u.type.toLowerCase()&&e.properties.xpath===u.tmplid}).length>0?u.filterApplied="filter-applied":u.filterApplied="";var d=i.filterItem.render(u);"Text"!==u.type&&"Link"!==u.type&&u.data&&(u.data.defaultValues&&u.data.defaultValues.length>0||u.data.min&&u.data.max)&&(a.append(d),i.buildFilter(d,u),"filter-applied"===u.filterApplied&&$(".remove-filter",d).show())}else if(i.filterControlArray&&i.filterControlArray.length>0){var u;for(l=-1;u=i.filterControlArray[++l];){var p=n.find(function(e){return e.attribute===u.xpath});p&&i.setFilterData(u,p)}}}$(".filters-loading",i.content).hide()},toggleWidget:function(e,t){var i=this.getContent().is(":visible");this.openCloseWidget({show:!i,$target:t.args.target})},openCloseWidget:function(e){var t=this.getContent(),i=e.$target||$("<div>");e.show?(i.addClass("opened"),t.show()):(i.removeClass("opened"),t.hide(),$("button#ui-bizagi-cancel-filter").click())},buildFilter:function(e,t){var i=this;switch(t.type){case"Entity":i.buildFilterMultiple(e,t);break;case"Number":i.buildFilterNumber(e,t);break;case"Money":i.buildFilterMoney(e,t);break;case"Datetime":i.buildFilterDate(e,t);break;case"Boolean":i.buildFilterBoolean(e,t)}},setFilterData:function(e,t){switch(e.type){case"Entity":e.widget.bizagi_multipleFilter("setData",t.data);break;case"Number":e.widget.bizagi_numberFilter("setData",t.data);break;case"Money":e.widget.bizagi_moneyFilter("setData",t.data);break;case"Datetime":e.widget.bizagi_dateFilter("setData",t.data);break;case"Boolean":e.widget.bizagi_booleanFilter("setData",t.data)}},buildFilterMoney:function(e,t){var i=this,r=e.bizagi_moneyFilter({showButtonClearFilter:!0,numericFormat:i.getResource("numericFormat"),properties:t,data:t.data,onApply:function(e,t){i.addFilterSelection(e),i.triggerFilter({calculateFilters:!0})},onClear:function(e){i.removeFilterApplied(e),i.triggerFilter({calculateFilters:!0})},getResource:function(e){return bizagi.localization.getResource(e)}});i.filterControlArray.push({type:t.type,xpath:t.attribute,widget:r})},buildFilterNumber:function(e,t){var i=this,r=e.bizagi_numberFilter({showButtonClearFilter:!0,numericFormat:i.getResource("numericFormat"),properties:t,data:t.data,onApply:function(e,t){0!==e.length&&(i.addFilterSelection(e),i.triggerFilter({calculateFilters:!0}))},onClear:function(e){i.removeFilterApplied(e),i.triggerFilter({calculateFilters:!0})},getResource:function(e){return bizagi.localization.getResource(e)}});i.filterControlArray.push({type:t.type,xpath:t.attribute,widget:r})},buildFilterDate:function(e,t){var i=this,r=e.bizagi_dateFilter({showButtonClearFilter:!0,properties:t,onApply:function(e,t){i.addFilterSelection(e),i.triggerFilter({calculateFilters:!0})},onClear:function(e){i.removeFilterApplied(e),i.triggerFilter({calculateFilters:!0})},getResource:function(e){return i.getResource(e)}});i.filterControlArray.push({type:t.type,xpath:t.attribute,widget:r})},buildFilterMultiple:function(e,t){var i=this,r=e.bizagi_multipleFilter({showButtonClearFilter:!0,properties:t,data:t.data,onApply:function(e,t){i.addFilterSelection(e),i.triggerFilter({calculateFilters:!0})},onClear:function(e){i.removeFilterApplied(e),i.triggerFilter({calculateFilters:!0})},getResource:function(e){return bizagi.localization.getResource(e)}});i.filterControlArray.push({type:t.type,xpath:t.attribute,widget:r})},buildFilterBoolean:function(e,t){var i=this,r=e.bizagi_booleanFilter({showButtonClearFilter:!0,properties:t,data:t.data,onApply:function(e,t){i.addFilterSelection(e),i.triggerFilter({calculateFilters:!0})},onClear:function(e){i.removeFilterApplied(e),i.triggerFilter({calculateFilters:!0})},getResource:function(e){return bizagi.localization.getResource(e)}});i.filterControlArray.push({type:t.type,xpath:t.attribute,widget:r})},addFilterSelection:function(e){$(".filters-loading",this.content).show();for(var t=0,i=e.length;t<i;t++)this.removeFilterApplied([e[t].properties.xpath]),this.filtersApplied.push(e[t])},removeFilterApplied:function(e){$(".filters-loading",this.content).show();for(var t,i=-1;t=e[++i];){var r=this.filtersApplied.find(function(e){return e.properties.xpath===t});r&&this.filtersApplied.splice(this.filtersApplied.indexOf(r),1)}},setOrderBy:function(e,t){this.orderBy=t.args,this.triggerFilter({calculateFilters:!1})},setRecordsPerPage:function(e,t){this.triggerFilter({calculateFilters:!1,pageSize:t.args&&t.args.pageSize})},triggerFilter:function(e){for(var t,i=this,r=i.criteriaSearchApplied?bizagi.clone(i.criteriaSearchApplied):[],o=i.filtersApplied.slice(),a=[],n=-1;t=o[++n];)i.dataService.defineFilterObject(t,r),i.dataService.defineFilterObject(t,a);var s=a.length;i.orderBy.properties&&i.dataService.defineFilterObject(i.orderBy,r);var l={type:"UPDATE-DATATEMPLATE-VIEW",args:{filters:r,page:1,level:1,calculateFilters:e.calculateFilters||!1,defaultFilterApplied:!1,typeSearch:"filter",filtersAppliedCounter:s,pageSize:e.pageSize||10}};i.pub("notify",l)}}),bizagi.injector.register("bizagi.workportal.widgets.mysearchfilter",["workportalFacade","dataService","processActionService",bizagi.workportal.widgets.mysearchfilter],!1),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.mysearchcriteria",{init:function(e,t,i,r){this.params={},this._super(e,t,r),this.loadTemplates({mySearchCriteria:bizagi.getTemplate("bizagi.workportal.desktop.widget.mysearchcriteria").concat("#mysearchcriteria-wrapper"),mySearchCriteriaList:bizagi.getTemplate("bizagi.workportal.desktop.widget.mysearchcriteria").concat("#mysearchcriteria-list")})},renderContent:function(){return this.content=this.getTemplate("mySearchCriteria").render({}),this.content},postRender:function(){this.configureHandlers()},configureHandlers:function(){var e=this;e.sub("SEARCH-ENGINE-VIEW",$.proxy(e.processCriterias,e)),$(".wdg-mysearchcriteria-content",e.content).on("click","div.wdg-mysearchcriteria-card span",function(){e.callQueryForm()}),$(".wdg-mysearchcriteria-content",e.content).on("click","div.wdg-mysearchcriteria-card i",function(t){var i=$(this).data("xpath");e.performQuery(e.removeFilterApplied(i)),t.stopPropagation()})},processCriterias:function(e,t){var i=this;if(void 0===t.args.level){i.originParams=bizagi.clone(t);var r=i.originParams.args.metadataFilters||[];if(r.length>0&&i.areThereVisibleFilters(r)){var o=$(".wdg-mysearchcriteria-content",i.content),a=i.getTemplate("mySearchCriteriaList").render({criterias:r});o.html(a)}}},areThereVisibleFilters:function(e){for(var t=!1,i=0;i<e.length;i++)if(!e[i].isHidden){t=!0;break}return t},preProcessValues:function(e){for(var t,i=bizagi.clone(e)||[],r=-1;t=i[++r];)t.searchType&&"range"==t.searchType&&("from"==t.rangeQuery?t.value=t.value.min:t.value=t.value.max);return i},callQueryForm:function(){var e=this,t=e.originParams.args,i={widgetName:bizagi.workportal.widgets.widget.BIZAGI_WORKPORTAL_WIDGET_LOADFORM,summaryDecorator:!1,guidForm:t.guidForm,displayname:t.displayname,guidEntity:t.guidEntity,searchCriteriasApplied:e.preProcessValues(t.metadataFilters),closeVisible:!1,buttons:[{text:bizagi.localization.getResource("workportal-menu-search"),click:function(){var i=$(this).dialog("option","widget").form||{};if(0!==Object.keys(i).length&&i&&i.validateForm()){var r=[];$.forceCollectData=!0,i.collectRenderValues(r),$.forceCollectData=!1;var o=[],a=[];for(name in r)if("function"!=typeof r[name]&&""!==r[name]){var n=i.getRender(name);e.dataService.defineFilterObject({properties:n.properties,value:n.value},o,function(e){a.push($.extend(e,{id:n.properties.id,rangeQuery:n.properties.rangeQuery,displayValue:n.getDisplayValue(),displayName:n.properties.displayName}))})}e.performQuery($.extend(t,{filters:o,metadataFilters:a})),$(this).dialog("close")}}},{text:bizagi.localization.getResource("workportal-widget-dialog-box-close"),click:function(){$(this).dialog("close")}}],modalParameters:{title:t.displayname}};e.publish("showDialogWidget",i),e.publish("onWidgetIncludedInDOM")},removeFilterApplied:function(e){var t=this.originParams.args;return $.each(t.filters.filter(function(t){return t.xpath==e}),function(e,i){t.filters.splice(t.filters.indexOf(i),1)}),$.each(t.metadataFilters.filter(function(t){return t.xpath==e}),function(e,i){t.metadataFilters.splice(t.metadataFilters.indexOf(i),1)}),t},performQuery:function(e){var t={type:"SEARCH-ENGINE-VIEW",args:e};$.when(this.publish("changeWidget",{widgetName:bizagi.workportal.widgets.widget.BIZAGI_WORKPORTAL_WIDGET_HOMEPORTAL})).done(function(){var e=bizagi.injector.get("homeportal");$.when(e.isReady()).done(function(){e.pub("notify",t)})})}}),bizagi.injector.register("bizagi.workportal.widgets.mysearchcriteria",["workportalFacade","dataService","processActionService",bizagi.workportal.widgets.mysearchcriteria],!1);
//# sourceMappingURL=../../../../Maps/desktop/search-engine-view.desktop.production.js.map
