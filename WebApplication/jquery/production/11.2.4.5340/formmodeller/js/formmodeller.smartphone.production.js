bizagi.rendering.element.original=$.extend(!0,{},bizagi.rendering.element.prototype),$.extend(bizagi.rendering.element.prototype,{isContainedInNestedForm:function(){var e=this;return!!e.parent&&("nestedForm"===e.parent.properties.type||("collectionnavigator"===e.parent.properties.type||e.parent.isContainedInNestedForm()))},isContainedInCollectionNavigator:function(){return this.getFormContainer().properties.isNavigationForm||!1},isContainedInGrid:function(){return null!=this.column},isReadOnlyForm:function(){return!!((this.getFormContainer()||{}).properties||{}).isReadOnly},findElement:function(e){return e&&this.properties.guid===e?this:null},selectElement:function(){},unselectElement:function(){}}),bizagi.rendering.smartphone.container.original=$.extend(!0,{},bizagi.rendering.smartphone.container.prototype),$.extend(bizagi.rendering.smartphone.container.prototype,{postRenderContainer:function(e){var i=this;return bizagi.rendering.smartphone.container.original.postRenderContainer.apply(this,arguments),i.isReadOnlyForm()?e:"template"==i.getFormType()?("template"==i.properties.type&&e.click(function(e){i.onClickCanvas(e)}),e):(e.hasClass("ui-sortable")&&e.sortable("destroy"),e.addClass("ui-bizagi-itemfordrag"),i.addDraggableClassToContainer(),i.isContainerSortable()&&(e.data({guid:i.properties.guid,display:i.properties.displayName,type:i.properties.type}),bizagi.form.modeler.params.reviewMode||setTimeout(function(){i.configureSortablePlugin(e)},100)),i.isClickEventAllowed()&&(void 0!==i.properties.type&&"searchForm"!==i.properties.type&&"form"!==i.properties.type&&"queryForm"!==i.properties.type?(e.mousedown(function(e){i.onMouseDown(e)}),e.click(function(e){i.onClick(e)})):e.click(function(e){i.onClickCanvas(e)})),i.properties.messageValidation&&i.showValidationMessage(i.properties.messageValidation),e)},hasChildren:function(){return this.children.length>0},selectElementByGuid:function(e){for(var i=0,t=e.length;i<t;i++){var n=e[i],r=this.findElement(n);r&&r.selectElement({IsOnClickEvent:!1})}},findElement:function(e){var i=this;if(!e)return null;if(i.properties.guid===e)return this;for(var t=0;t<i.children.length;t++){var n=i.children[t].findElement(e);if(n)return n}return null},disableSortablePlugin:function(){var e=this;e.container&&e.container.hasClass("ui-sortable")&&e.container.data()["ui-sortable"]&&e.container.sortable("destroy");for(var i=0,t=e.children.length;i<t;i+=1)e.children[i].container&&e.children[i].disableSortablePlugin()},selectElement:function(e){var i=this,t=i.container;t.addClass("ui-bizagi-container-selected");var n=t.offset();$.extend(n,{width:t.outerWidth(),height:t.outerHeight()}),i.triggerGlobalHandler("selectelement",$.extend(e,{position:n,guid:i.properties.guid,element:t,type:i.properties.type}))},unselectElement:function(e){var i=this;i.container.removeClass("ui-bizagi-container-selected"),e&&$.extend(e,{guid:i.properties.guid}),i.triggerGlobalHandler("unselectelement",e)},configureSortablePlugin:function(e){var i=this,t=i.triggerGlobalHandler("getMainPanel",{}),n='form-modeler[id="'+i.triggerGlobalHandler("getViewID")+'"]';e.addClass("ui-bizagi-container-connectedSortable"),e.bind("sortstart",function(e,t){i.onSortStart(t)}),e.bind("sortstop",function(e,t){i.onSortFinish(t)}),e.bind("sort",function(e){i.onScrollingForm(t,e)}),e.bind("sortactivate",function(e,t){i.currentDragSource=i.getDragSource(t.item)});e.sortable({items:"> .ui-bizagi-draggable-item",revert:!1,connectWith:n+" .ui-bizagi-container-connectedSortable:not(.ui-sortable-helper)",distance:10,cursorAt:{top:0,left:0},placeholder:"ui-bizagi-placeholder",delay:10,cancel:"layout"===i.getMode()?".bz-form-item, .ui-bizagi-input-editable":".ui-bizagi-input-editable, .ui-bizagi-grid-cell",containment:t,helper:function(e,t){var n=i.sortableHelper(t),r=$(this);return setTimeout(function(){r.sortable("refreshPositions")},10),n},start:function(){t&&t.addClass("ui-start-drag")},stop:function(){t&&t.removeClass("ui-start-drag")},beforeStop:function(){window.x3=$("#mtool-container-helper")}}).disableSelection(),i.loadHelperTemplate()},setConnectWith:function(e,i){var t;void 0!==e&&(t=(t=".ui-bizagi-container-connectedSortable")+"[id!= "+i+"]",e.container&&e.container.hasClass("ui-sortable")&&e.container.data()["ui-sortable"]&&e.container.sortable("option","connectWith",t),this.setConnectWith(e.parent,i))},addDraggableClassToContainer:function(){var e=this;if(e.isContainerDraggable()){if(e.container.addClass("ui-bizagi-draggable-item"),e.container.addClass("ui-dashed-layout"),"horizontal"===e.properties.type){var i=$("> .bz-layout-col",e.container);$.each(i,function(){var e=$(this);0===e.children().length&&e.append('<div class="children"></div>')})}e.container.hasClass("ui-dashed-layout")&&(e.container.data("display","Layout"),e.container.data("type","layout")),$("> .ui-bizagi-container-panel",e.container).mouseenter(function(){$(this).addClass("ui-col-hover")}).mouseleave(function(){$(this).removeClass("ui-col-hover")})}},isContainerDraggable:function(){if(this.isContainedInNestedForm()||this.isContainedInCollectionNavigator())return!1;var e=this.properties.type||"form";return"group"==(e=this.normalizeType(e))||"nestedForm"==e||"tab"==e||"horizontal"==e||"contentPanel"==e||"collectionnavigator"==e},isContainerSortable:function(){if(this.isContainedInNestedForm()||this.isContainedInCollectionNavigator())return!1;var e=this.properties.type||"form";return"form"==(e=this.normalizeType(e))||"group"==e||"panel"==e||"tabItem"==e||"queryForm"==e||"searchForm"==e||"contentPanel"==e||"offlineForm"==e||"adhocForm"==e},isElementSortAllowed:function(e){var i=this.getMode();if("design"===i){if(e.hasClass("ui-bizagi-container-horizontal"))return!1}else if("layout"===i&&e.hasClass("bz-form-item"))return!1;return!0},isClickEventAllowed:function(){var e=this,i=e.getMode();if(e.isContainedInNestedForm()||e.isContainedInCollectionNavigator())return!1;var t=e.properties.type||"form";if(t=e.normalizeType(t),"design"==i){if("panel"==t)return!1}else if("layout"===i&&["form","group","panel","tab","tabItem","contentPanel"].includes(t))return!1;return!0},sortableHelper:function(e){if(!this.helperTemplate)return null;e.addClass("ui-dragging");var i=e.data(),t=i.type?i.type.toLowerCase():"render",n=i.guid,r=i.display,a=this.triggerGlobalHandler("getControlIcon",{type:t,id:n}),o=this.triggerGlobalHandler("getMainContainer",{});r&&""!==r||(r=t);var l=$.tmpl(this.helperTemplate,{id:t,caption:r,icon:a}),s=$(".wrapper-main-scroll",o),d=l.appendTo(s).css({zIndex:900}),c=parseFloat($("label",d).width())+parseFloat($(".biz-ico",d).eq(0).width())+40+"px";return d.css("width",c),d},loadHelperTemplate:function(){var e=this;return $.when(bizagi.templateService.getTemplate(bizagi.getTemplate("bizagi.editor.component.renderingview").concat("#bizagi-render-drag-helper"))).pipe(function(i){return e.helperTemplate=i,e.helperTemplate})},getDragSource:function(e){var i={container:!1,toolbar:!1,xpathNavigator:!1,layout:!1,data:null};return $(e).hasClass("bz-form-item")||$(e).hasClass("bz-container")?(i.container=!0,i.data={guid:$(e).parents("bz-container").first().data("guid")}):$(e).hasClass("mtool-item")?(i.toolbar=!0,i.data=$(e).data("render")):$(e).hasClass("bizagi_editor_xpathnavigator_data")?(i.xpathNavigator=!0,i.data=$(e).data()):$(e).hasClass("bz-fm-layout-navigator-item")&&(i.layout=!0,i.data=$(e).data("id")),i},changeVisibility:function(e){var i=this.properties;i.visible=bizagi.util.parseBoolean(e),i.visible?$(this.container).removeClass("ui-state-disabled"):$(this.container).addClass("ui-state-disabled")},onSortStart:function(e){var i=$(e.item).parent().children(".ui-bizagi-itemfordrag").index(e.item);e.item.data("start-position",i);var t=$(e.item).parents(".bz-container").first().data("guid")||this.triggerGlobalHandler("getparentid",{guid:$(e.item).data("guid")});e.item.data("sourceContainer",t),i>=0&&this.triggerGlobalHandler("sortstart")},onScrollingForm:function(e,i){},onSortFinish:function(e){var i=this;if(null==bizagi.sortContainerTimeout){bizagi.sortContainerTimeout=setTimeout(function(){bizagi.sortContainerTimeout=null},100);var t=$(e.item).parent().children(".ui-bizagi-itemfordrag").not(".ui-sortable-placeholder").index(e.item),n=$(e.item).parents(".bz-container").first().data("guid")||i.triggerGlobalHandler("getparentid",{guid:$(e.item).data("guid")}),r=e.item.data("start-position"),a=e.item.data("sourceContainer");return 0==i.isElementSortAllowed($(e.item))?(i.container.sortable("cancel"),!1):(t>=0&&i.triggerGlobalHandler("sortfinish",{source:i.currentDragSource,initialPosition:r,finalPosition:t,sourceContainer:a,targetContainer:n}),!0)}},onClickCanvas:function(e){e.stopImmediatePropagation(),$(".bz-form-item").removeClass("ui-state-active"),$(".ui-bizagi-grid-cell").removeClass("ui-state-active"),$(".bz-container").removeClass("ui-bizagi-container-selected"),this.unselectElement(),0!=e.button&&1!=e.button||this.triggerGlobalHandler("selectcontainerform",{})},onClick:function(e){var i=this,t=i.container;e.stopImmediatePropagation(),i.triggerGlobalHandler("checkCtrlKey",{})?t.hasClass("ui-bizagi-container-selected")?i.unselectElement({ctrlIsPressed:!0}):i.selectElement({IsOnClickEvent:!0,ctrlIsPressed:!0}):0!=e.button&&1!=e.button||($(".bz-form-item").removeClass("ui-state-active"),$(".bz-container").not(t).removeClass("ui-bizagi-container-selected"),t.hasClass("ui-bizagi-container-selected")?i.unselectElement():i.selectElement({IsOnClickEvent:!0}))},onMouseDown:function(e){var i=this;if(0==e.button||1==e.button)i.setConnectWith(i.parent,i.container.data("guid"));else if(2==e.button)return i.triggerGlobalHandler("elementrightclick",{guid:i.properties.guid,position:{x:e.clientX,y:e.clientY}}),e.preventDefault(),e.stopPropagation(),!1},normalizeType:function(e){return e.replace(/smartphone/,"").replace(/tablet/,"").replace(/offline/,"")},showValidationMessage:function(e){var i=e.split("</br>")[0];i&&this.setValidationMessage(i)},getContainerMessage:function(){return this.containerMessage||(this.containerMessage=$(".bz-container-message__text",this.container.next("[data-parent="+this.properties.uniqueId+"]"))),this.containerMessage},setValidationMessage:function(e){if(void 0!==this.container){var i=this.getContainerMessage();e&&e.length>0?(e=e.replace(/<\w+>([^<]*)<\/\w+>/g,"$1"),i.attr("data-error",e),i.text(e),this.container.addClass("bz-container--error")):(i.text(""),this.container.removeClass("bz-container--error"))}}}),bizagi.rendering.smartphone.form.original=$.extend(!0,{},bizagi.rendering.smartphone.form.prototype),$.extend(bizagi.rendering.smartphone.form.prototype,{postRenderContainer:function(e){var i=this,t=e;if(0===i.children.length?t.attr("drophere",bizagi.localization.getResource("formmodeler-component-editor-layout-drophere-containers")):t.removeAttr("drophere"),bizagi.rendering.smartphone.form.original.postRenderContainer.apply(this,arguments),void 0!==typeof i.params.allowButtons&&i.params.allowButtons||$(".ui-bizagi-button-container",e).remove(),i.properties.messageValidation&&i.properties.messageValidation.length>0){var n=i.createMessageValidationElement(i.properties.messageValidation);e.prepend(n)}return e},createMessageValidationElement:function(e){var i=this,t=bizagi.localization.getResource("formmodeler-validations-form"),n=$('<div class="ui-message-validation"/>');return $("<span>"+t+'<i class="biz-ico bz-studio bz-warning-red_16x16_standard" title="'+e+'"></i></span>').appendTo(n),$(n,"div").click(function(){i.triggerGlobalHandler("showPropertiesForm")}),n},onScrollingForm:function(e,i){var t=e[0],n=t.getBoundingClientRect(),r=n.top,a=n.bottom;function o(){return Math.abs(i.clientY-r)<=20}(o()||Math.abs(a-i.clientY)<=30)&&setTimeout(function(){var i=o()?-1:1,n=e.scrollTop();if(!(1===i&&n>t.scrollHeight-t.offsetHeight)){var r=n+40*i;e.scrollTop(r)}},100)}}),bizagi.rendering.smartphone.render.original=$.extend(!0,{},bizagi.rendering.smartphone.render.prototype),$.extend(bizagi.rendering.smartphone.render.prototype,{postRenderElement:function(e){var i=this;i.properties;if(bizagi.rendering.smartphone.render.original.postRenderElement.apply(this,arguments),i.isReadOnlyForm())return e;if(e.attr("guid",i.properties.guid),"template"==i.getFormType())return i.configureLayoutElement(e);if(!i.isContainedInNestedForm()&&!i.isContainedInCollectionNavigator()){i.setMouseDownEvent(e),i.isContainedInGrid()||(e.addClass("ui-bizagi-draggable-item"),e.addClass("ui-bizagi-itemfordrag"));var t=$(".ui-bizagi-render-search",e);if(t.length>0&&t.parent().addClass("ui-bizagi-display-as-search"),i.isClickEventAllowed()){var n,r=i.properties.type||"";r=r.replace("smartphone",""),n="design"==i.getMode()&&"grid"==r?i.getLabelGrid():i.getLabel(),e.click(function(t){i.onRenderClick(t,e)}),bizagi.form.modeler.params.reviewMode||n&&n.dblclick(function(){i.onLabelDoubleClick(n)})}}return i.properties.messageValidation&&i.showValidationMessage(i.properties.messageValidation),e.data({guid:i.properties.guid,display:i.properties.displayName,type:i.properties.type}),i.resetStyle(e)},configureLayoutElement:function(e){var i=this;return i.configureDroppablePlugin(e),i.configureDraggablePlugin(e),e.click(function(t){i.onRenderClick(t,e)}),e.dblclick(function(){i.onLabelDoubleClick(e)}),e.find(".biz-template-editor-render-hide-control").click(function(t){i.onRemoveElement(t,e)}),i.setDeleteLayoutItem(e),e},setDeleteLayoutItem:function(e){var i=this,t=(i.properties.type,$("<span class='biz-icon biz-tmpl-delete pull-right bz-studio bz-delete_16x16_standard'></span>")),n=$("<span class='biz-icon biz-tmpl-delete pull-right bz-studio bz-undo_16x16_black'></span>"),r=e.closest("[id]");setTimeout(function(){if(0==r.length&&i.triggerGlobalHandler("isDeleteOptionAllowed",{guid:i.properties.guid}))e.addClass("hover-applied"),e.hover(function(){$(this).append(n)},function(){$(this).find("span.biz-tmpl-delete").detach()}),n.click(function(){i.triggerGlobalHandler("restoreItem",{guid:i.properties.guid})});else{if(null==r.attr("id"))return;if(r.hasClass("hover-applied"))return;r.addClass("hover-applied"),r.hover(function(){$(this).append(t)},function(){$(this).find("span.biz-tmpl-delete").detach()}),a=r,t.click(function(){i.triggerGlobalHandler("deleteRepeaterItem",{guid:a.attr("id")})})}var a},10)},configureDraggablePlugin:function(e){e.draggable({helper:"clone",zIndex:9999,opacity:.75,cursorAt:{left:5},containment:"document",cancel:".biz-template-editor-render-placeholder",start:function(e,i){$(i.helper).data("isLayoutElement",!0)}})},configureDroppablePlugin:function(e){var i=this;e.droppable({hoverClass:"ui-state-highlight",tolerance:"pointer",activeClass:"ui-editor-highlight",greedy:!0,drop:function(e,i){$(this).addClass("ui-state-highlight")},activate:function(){i.getFormContainer().container.find("[noShow='true']").show()},deactivate:function(){i.getFormContainer().container.find("[noShow='true']").hide()}}),e.on("drop",function(e,t){i.onDrop(t)})},getLabelGrid:function(){return $(".bz-mobile-grid__header-title",this.element)},resetStyle:function(e){var i=e,t=i.css("color"),n=i.css("background-color");return"black"==t&&i.css("color",""),"white"==n&&i.css("background-color",""),i},selectElement:function(e){var i,t=this,n=t.properties;if(t.element){t.element.addClass("ui-state-active");var r=t.element.offset();$.extend(r,{width:t.element.outerWidth(),height:t.element.outerHeight()}),i=$.extend(e,{position:r,guid:t.properties.guid,element:t.element,type:t.properties.type,isInternal:n.isInternal}),t.triggerGlobalHandler("selectelement",i)}},unselectElement:function(e){this.element.removeClass("ui-state-active"),e&&$.extend(e,{guid:this.properties.guid}),this.triggerGlobalHandler("unselectelement",e)},isClickEventAllowed:function(){return"design"===this.getMode()&&!this.column&&!this.isColumn},setMouseDownEvent:function(e){var i=this;i.isClickEventAllowed()&&e.bind("mousedown.contextmenu",function(e){return 2!=e.button||(i.triggerGlobalHandler("elementrightclick",{guid:i.properties.guid,position:{x:e.clientX,y:e.clientY}}),e.preventDefault(),e.stopPropagation(),!1)})},changeVisibility:function(e){var i=this.properties;1==bizagi.util.parseBoolean(e)?$(this.element).removeClass("ui-state-disabled"):$(this.element).addClass("ui-state-disabled"),i.visible=e},showValidationMessage:function(e){var i=e.split("</br>")[0];i&&this.setValidationMessage(i)},onRenderClick:function(e,i){var t=this;e.stopPropagation(),e.preventDefault(),t.triggerGlobalHandler("checkCtrlKey",{})?i&&i.hasClass("ui-state-active")?t.unselectElement({ctrlIsPressed:!0}):($(document.activeElement).is("input")&&$(document.activeElement).closest(".bizagi_editor_component_properties").length>0&&($(document.activeElement).trigger("blur"),$(".bizagi_editor_component_properties").hide()),t.selectElement({IsOnClickEvent:!0,ctrlIsPressed:!0})):(0!=e.button&&1!=e.button||($(".bz-form-item").not(i).removeClass("ui-state-active"),$(".ui-bizagi-grid-cell").not(i).removeClass("ui-state-active"),$(".ui-bizagi-button").not(i).removeClass("bz-state-active"),$(".bz-container").removeClass("ui-bizagi-container-selected"),$(".ui-bizagi-render-layout").not(i).removeClass("ui-state-active")),i&&i.hasClass("ui-state-active")?t.unselectElement():($(document.activeElement).is("input")&&$(document.activeElement).closest(".bizagi_editor_component_properties").length>0&&($(document.activeElement).trigger("blur"),$(".bizagi_editor_component_properties").hide()),t.selectElement({IsOnClickEvent:!0})))},onLabelDoubleClick:function(e){var i=this;if(i.triggerGlobalHandler("canChangeLabel",{guid:i.properties.guid})){i.triggerGlobalHandler("startlabeledition");var t=new bizagi.editor.component.editableLabel.presenter({label:e,value:i.properties.displayName});t.subscribe("change",function(e,t){i.triggerGlobalHandler("changelabel",{guid:i.properties.guid,value:t.value})}),t.subscribe("finish",function(){i.triggerGlobalHandler("finishlabeledition")}),t.render()}},onRemoveElement:function(e,i){this.triggerGlobalHandler("hideElement",{guid:this.properties.guid})},showElementLabelEditor:function(){this.element.find(".ui-bizagi-container-input-editable > input.ui-bizagi-input-editable").length>0||$("label",this.element).trigger("dblclick")},onDrop:function(e){var i=$(e.draggable),t=$(e.helper),n=i.data(),r=t.data(),a=bizagi.editor.utilities.buildComplexXpath(n.xpath,n.contextScope,n.isScopeAttribute,n.guidRelatedEntity);this.triggerGlobalHandler("dropfinish",{guid:this.properties.guid,property:"xpath",value:a,renderType:n.nodeSubtype,sourceGuid:!(!r||!r.isLayoutElement)&&t.attr("guid")})}}),bizagi.rendering.smartphone.columns.column.original=$.extend(!0,{},bizagi.rendering.smartphone.columns.column.prototype),$.extend(bizagi.rendering.smartphone.columns.column.prototype,{postRender:function(e){bizagi.rendering.smartphone.columns.column.original.postRender.apply(this,arguments)}}),bizagi.rendering.smartphone.group.original=$.extend(!0,{},bizagi.rendering.smartphone.group.prototype),$.extend(bizagi.rendering.smartphone.group.prototype,{postRenderContainer:function(e){var i=this;(bizagi.rendering.smartphone.group.original.postRenderContainer.apply(this,arguments),i.hasChildren()||i.isContainedInNestedForm()||i.isContainedInCollectionNavigator())||$(".bz-collapsible__content",e).append('<div class="children"></div>');if(!i.isReadOnlyForm()){var t=e.find(".bz-collapsible__header");i.isInNestedform()||t.dblclick(function(){i.triggerGlobalHandler("startlabeledition");var e=new bizagi.editor.component.editableLabel.presenter({label:t,value:i.properties.displayName});e.subscribe("change",function(e,t){i.triggerGlobalHandler("changelabel",{guid:i.properties.guid,value:t.value})}),e.subscribe("finish",function(){i.triggerGlobalHandler("finishlabeledition")}),e.render()});var n=i.properties.guid;setTimeout(function(){var e=i.triggerGlobalHandler("getLastInsertedElement");n==e&&(i.showElementLabelEditor(),i.triggerGlobalHandler("setLastInsertedElement",null))},0)}},disableSortablePlugin:function(){var e=this.container.find("> .bz-collapsible__content");e&&e.hasClass("ui-sortable")&&e.data()["ui-sortable"]&&e.sortable("destroy");for(var i=0,t=this.children.length;i<t;i+=1)this.children[i].container&&this.children[i].disableSortablePlugin()},configureSortablePlugin:function(e){return e=e.find("> .bz-collapsible__content"),bizagi.rendering.smartphone.group.original.configureSortablePlugin.apply(this,arguments)},isInNestedform:function(){var e=this.parent,i=this.properties,t=!1;do{if("nestedForm"===i.type||"collectionnavigator"===i.type){t=!0;break}i=e.properties,e=e.parent}while(void 0!==e);return t},showElementLabelEditor:function(){this.container.find(".bz-collapsible__header").trigger("dblclick")}}),bizagi.rendering.smartphone.contentPanel.original=$.extend(!0,{},bizagi.rendering.smartphone.contentPanel.prototype),$.extend(bizagi.rendering.smartphone.contentPanel.prototype,{postRenderContainer:function(e){var i=this;bizagi.rendering.smartphone.contentPanel.original.postRenderContainer.apply(this,arguments),i.hasChildren()||i.isContainedInNestedForm()||i.isContainedInCollectionNavigator()||e.append('<div class="children"></div>'),e.addClass("ui-bizagi-container-contentpanel-formmodeler"),e.prepend('<div class="ui-bizagi-container-contentpanel-header-container"><span class="ui-bizagi-container-contentpanel-header">'+i.properties.displayName+"</span></div>");var t=e.find(".ui-bizagi-container-contentpanel-header");t.dblclick(function(){t.hide(),i.triggerGlobalHandler("startlabeledition");var e=new bizagi.editor.component.editableLabel.presenter({label:t,value:i.properties.displayName});e.subscribe("change",function(e,t){i.triggerGlobalHandler("changelabel",{guid:i.properties.guid,value:t.value})}),e.subscribe("finish",function(){i.triggerGlobalHandler("finishlabeledition")}),$.when(e.render()).done(function(){0==i.getElement().find(".ui-bizagi-container-input-editable").length?setTimeout(function(){t.hide(),i.adjustEditLabel()},100):i.adjustEditLabel()})})},disableSortablePlugin:function(){var e=this.container.find(".ui-bizagi-container-contentpanel-wrapper");e&&e.hasClass("ui-sortable")&&e.data()["ui-sortable"]&&e.sortable("destroy");for(var i=0,t=this.children.length;i<t;i++)this.children[i].container&&this.children[i].disableSortablePlugin()},adjustEditLabel:function(){this.getElement().find(".ui-bizagi-container-input-editable").css({width:"95%","background-color":"orange",top:"-18px","border-radius":"10px"}),this.getElement().find(".ui-bizagi-container-input-editable input").css({"margin-left":"5px",width:"90%"}),this.getElement().find(".ui-bizagi-render-confirmation").css({right:"10px",top:"5px"})},showElementLabelEditor:function(){this.container.find(".ui-bizagi-container-input-editable > input.ui-bizagi-input-editable").length>0||this.container.find("span:first").trigger("dblclick")}}),bizagi.rendering.smartphone.tab.original=$.extend(!0,{},bizagi.rendering.smartphone.tab.prototype),$.extend(bizagi.rendering.smartphone.tab.prototype,{postRenderContainer:function(e){var i=this,t=i.properties;if(bizagi.rendering.smartphone.tab.original.postRenderContainer.apply(this,arguments),!i.isReadOnlyForm()){var n=$('<div class="bz-tab--add"><svg class="ico_16x16"><use xlink:href="#icon-plus"></use></svg></div>'),r=$('<div style="display: none;"><svg class="ico_16x16 offset__left-indicator"><use xlink:href="#icon-arrow-left"></svg></div>'),a=$('<div style="display: none;"><svg class="ico_16x16 offset__right-indicator"><use xlink:href="#icon-arrow-rigth"></svg></div>');if($(".bz-tabs",e).first().wrap('<div class="bz__tabs--container"></div>').before(r).after(n).after(a).on("updatePositions",function(e,t){setTimeout(function(){var t=$(e.currentTarget);i.updatePositions(r,a),i.updateErrorPositions(t)},100)}),r.click(function(e){e.stopPropagation();var t=$(".bz-tabs",i.container);t.scrollLeft(t.scrollLeft()-15),i.updatePositions(r,a)}),a.click(function(e){e.stopPropagation();var t=$(".bz-tabs",i.container);t.scrollLeft(t.scrollLeft()+15),i.updatePositions(r,a)}),!i.isContainedInNestedForm()&&!i.isContainedInCollectionNavigator())n.click(function(e){return e.stopImmediatePropagation(),i.triggerGlobalHandler("addtab",{guid:t.guid}),!1}),$.each(i.children,function(i,t){var n=$("li[data-reference= #ui-bizagi-tab-"+t.properties.guid+"]",e);t.setTabHeader(n)}),$(".bz-tabs",e).sortable({items:"li[data-reference]",revert:!0,distance:10,axis:"x",cursorAt:{top:-3,left:0},placeholder:"bz-tab-placeholder",delay:150,start:function(e,t){i.sortStart(e,t)},tolerance:"pointer",stop:function(e,t){i.sortFinish(e,t)}});e.data({guid:i.properties.guid,display:i.properties.displayName,type:i.properties.type}),e.on("tabsload",function(e,t){i.triggerGlobalHandler("controlRefreshCanvas",{})}).on("tabsactivate",function(e,t){i.triggerGlobalHandler("controlRefreshCanvas",{})}),setTimeout(function(){i.updatePositions(r,a)},100);var o=(i.children||[]).find(function(e){if(e.properties&&e.properties.messageValidation)return e});o&&o.properties&&o.properties.messageValidation&&i.showValidationMessage(o.properties.messageValidation)}},updatePositions:function(e,i){var t=$(".bz-tabs",this.container).get(0);e.css({display:"none"}),i.css({display:"none"}),t.scrollLeft>0&&e.css({display:"flex"}),t.scrollWidth>t.clientWidth+t.scrollLeft+30&&i.css({display:"flex"})},sortStart:function(e,i){var t=$(i.item).parent().children("li[data-reference]").not(".bz-tab-placeholder").index(i.item);return i.item.data("start-position",t),this.initialPosition=t,!0},sortFinish:function(e,i){var t=$(i.item).parent().children("li[data-reference]").not(".bz-tab-placeholder").index(i.item);return this.triggerGlobalHandler("sortfinish",{source:{},initialPosition:i.item.data("start-position")||this.initialPosition,finalPosition:t,sourceContainer:this.properties.guid,targetContainer:this.properties.guid}),!0},updateErrorPositions:function(e){var i=e.find("li.active");$(".bz-indicator-bar",e).removeClass("bz-indicator-bar--error"),i&&i.hasClass("bz-tab--error")&&$(".bz-indicator-bar",e).addClass("bz-indicator-bar--error")}}),bizagi.rendering.smartphone.tabItem.original=$.extend(!0,{},bizagi.rendering.smartphone.tabItem.prototype),$.extend(bizagi.rendering.smartphone.tabItem.prototype,{postRenderContainer:function(e){bizagi.rendering.smartphone.tabItem.original.postRenderContainer.apply(this,arguments),this.hasChildren()||e.append('<div class="children"></div>'),e.addClass("bz-tab-item")},setTabHeader:function(e){var i=this,t=i.properties;i.isContainedInNestedForm()||i.isContainedInCollectionNavigator()||($(".tab--delete",e).click(function(){return i.triggerGlobalHandler("deletetab",{guid:t.guid}),!1}),e.dblclick(function(){i.isEditableLabelActive()||i.editDisplayName(e)}).click(function(e){i.isEditableLabelActive()||i.triggerGlobalHandler("showProperties",{guid:i.properties.guid,redraw:!0})}).mousedown(function(e){2===e.button&&(e.stopImmediatePropagation(),i.isEditableLabelActive()||i.triggerGlobalHandler("elementrightclick",{guid:i.properties.guid,position:{x:e.clientX,y:e.clientY}}))}))},activate:function(){bizagi.rendering.smartphone.tabItem.original.activate.apply(this,arguments),this.triggerGlobalHandler("activatetab",{guid:this.properties.guid})},editDisplayName:function(e){var i=this,t=$("a",e);i.triggerGlobalHandler("startlabeledition");var n=i.editableLabelPresenter=new bizagi.editor.component.editableLabel.presenter({label:t,value:i.properties.displayName});n.subscribe("change",function(e,t){i.triggerGlobalHandler("changelabel",{guid:i.properties.guid,value:t.value})}),n.subscribe("finish",function(){i.triggerGlobalHandler("finishlabeledition")}),n.subscribe("keyup",function(i,t){e.find(".ui-bizagi-container-input-editable").width(bizagi.measureString(t.value)+100)}),n.render()},isEditableLabelActive:function(){return!(!this.editableLabelPresenter||!this.editableLabelPresenter.editableLabel)},dropRender:function(e,i){if("mouseup"===e.originalEvent.type){var t=this.children.length,n=this.properties.guid,r=i.draggable?i.draggable.data("start-position"):null,a=i.draggable?i.draggable.data("sourceContainer"):null,o=this.currentDragSource;if(bizagi.editor.utilities.isObject(o)){if(null!=bizagi.sortContainerTimeout)return;bizagi.sortContainerTimeout=setTimeout(function(){bizagi.sortContainerTimeout=null},100),this.triggerGlobalHandler("sortfinish",{source:o,initialPosition:r,finalPosition:t,sourceContainer:a,targetContainer:n})}}},showValidationMessage:function(e){}}),bizagi.rendering.smartphone.search.original=$.extend(!0,{},bizagi.rendering.smartphone.search.prototype),$.extend(bizagi.rendering.smartphone.search.prototype,{postRender:function(){var e=this;bizagi.rendering.smartphone.search.original.postRender.apply(this,arguments),e.isReadOnlyForm()||e.advancedSearch&&!e.isContainedInNestedForm()&&e.advancedSearch.click(function(i){i.stopPropagation(),e.triggerGlobalHandler("showsearchform",{guid:e.properties.guid})})}}),bizagi.rendering.smartphone.image.original=$.extend(!0,{},bizagi.rendering.smartphone.image.prototype),$.extend(bizagi.rendering.smartphone.image.prototype,{postRender:function(){var e=this,i=e.getControl(),t=e.properties.width,n=e.parent.properties.type;bizagi.rendering.smartphone.image.original.postRender.apply(this,arguments),setTimeout(function(){if(-1===t){var r=$(".resizable_img",i),a=i.width(),o=i.height(),l=0,s=0;if("grid"==n)l=$(".resizable_img",i).closest("td").height();else if(e.parent.properties.id==e.getFormContainer().properties.id)l=50;else{var d=e.parent.getChildreCount(),c=e.parent.getChildrenSumHeight("image");l=(l=$(".resizable_img",i).closest(".ui-bizagi-container").height()-17)<50?50:l,s=e.parent.countByRenderTypeWithParams("image",-1),d>1&&(l-=c)}r.width(a),s>1?null!=l&&l>0?$(".resizable_img",e.parent.container).height(l/s+"px"):$(".resizable_img",i).height(o+"px"):null!=l&&l>0?r.height(l+"px"):r.height(o+"px")}e.triggerGlobalHandler("controlRefreshCanvas")},160)},changeImageSize:function(e,i){var t=this.getControl();this.executeTriggerHandler(t,e,i,"string")},executeTriggerHandler:function(e,i,t,n){var r="",a="";"string"==n?(r=i.slice(0,-2),a=t.slice(0,-2)):(r=i,a=t),this.triggerGlobalHandler("resizeImage",{guid:this.properties.guid,properties:[{property:"thumbnail.width",value:r},{property:"thumbnail.height",value:a}]})}}),bizagi.rendering.smartphone.collectionnavigator.original=$.extend(!0,{},bizagi.rendering.smartphone.collectionnavigator.prototype),$.extend(bizagi.rendering.smartphone.collectionnavigator.prototype,{postRender:function(){var e=this;bizagi.rendering.smartphone.collectionnavigator.original.postRender.apply(this,arguments),$.when(e.isRendered()).done(function(){var i=e.properties,t=e.getControl().find(".bz-collectionnavigator-navigationform");i.navigationform&&setTimeout(function(){e.triggerGlobalHandler("refreshControl",{guid:i.guid,canvas:t})},0)})}}),bizagi.rendering.smartphone.nestedForm.original=$.extend(!0,{},bizagi.rendering.smartphone.nestedForm.prototype),$.extend(bizagi.rendering.smartphone.nestedForm.prototype,{configureDesignView:function(){var e=this.properties,i=this.container;i.removeClass("ui-bizagi-container-panel"),i.addClass("ui-bizagi-container-nestedform");var t=$("<span class= 'ui-bizagi-container-nestedform-title'/>");t.text("Nested Form: "+e.formDisplayName),i.prepend(t)}}),bizagi.rendering.smartphone.date.original=$.extend(!0,{},bizagi.rendering.smartphone.date.prototype),$.extend(bizagi.rendering.smartphone.date.prototype,{setDisplayValue:function(e){bizagi.rendering.smartphone.date.original.setDisplayValue.apply(this,arguments);var i=this.properties,t=this.getDateControl().parent(),n=$(".ui-bizagi-render-date",t);if(i.valueFormat.color&&i.valueFormat.color.length>0){var r="bz-"+i.valueFormat.color.replace("#","")+"-placeholder",a="."+r+"::-webkit-input-placeholder{color:"+i.valueFormat.color+"}";bizagi.util.loadStyle(a,r),n.addClass(r)}i.valueFormat.strikethru&&i.valueFormat.underline?n.addClass("biz-modify-placeholder-through-underline"):(n.removeClass("biz-modify-placeholder-through-underline"),i.valueFormat.strikethru?n.addClass("biz-modify-placeholder-through"):n.removeClass("biz-modify-placeholder-through"),i.valueFormat.underline?n.addClass("biz-modify-placeholder-underline"):n.removeClass("biz-modify-placeholder-underline"))}}),bizagi.rendering.smartphone.basicUserField.extend("bizagi.rendering.smartphone.designUserField",{},{getEditableControl:function(){var e=this.getControl(),i='<div class="bz-input-icon bz-widget--fake"><input class="bz-input-icon__input bz-space--inline-s" placeholder="'+(this.properties.control+" Custom control")+'"/><svg class="bz-icn bz-space--inline-s" width="32px" height="32px"><use xlink:href="#gear" /></svg></div>';e.addClass("bz-widget__control--fake"),this.input=$(i).appendTo(e)},collectData:function(e){},getDisplayValue:function(){return"Userfield in design mode: "+this.properties.control},getReadonlyControl:function(){var e=this.getControl(),i='<div class="bz-input-icon bz-widget--fake"><input class="bz-input-icon__input bz-space--inline-s" placeholder="'+(this.properties.control+" Custom control")+'/><svg class="bz-icn bz-space--inline-s" width="32px" height="32px"><use xlink:href="#gear" /></svg></div>';return e.addClass("bz-widget__control--fake"),$(i).appendTo(e)}});
//# sourceMappingURL=../../../../Maps/smartphone_ios/formmodeller.smartphone.production.js.map
