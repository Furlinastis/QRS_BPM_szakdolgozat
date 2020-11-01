/**
 * Name: Bizagi Workportal Task Options
* 
* @author Kvn Alvarado
 */

bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.task.options", {}, {
    /**
     * Constructor
     */
    init: function (workportalFacade, dataService, params) {
        var self = this;
        
        // Call base
        self._super(workportalFacade, dataService, params);
    },

    /**
     * return a jquery promise for widgets needs taskOptions call
     * if the idWorkitem is 0 request is not necessary
     * @param {Int} idWorkitem 
     */
    getTaskOptions: function (idWorkitem) {
        var self = this,
            defer;
        if (idWorkitem === 0) {
            defer = $.Deferred();
            defer.resolve(self.pipeResponse({}));
        } else {
            defer = self.request(idWorkitem);
        }
         return defer;
    },

    /**
     * make request for get taskOptions
     * @param {Int} idWorkitem 
     */
    request: function (idWorkitem) {
        var self = this,
            params = {
                idWorkitem: idWorkitem
            };
        return $.when(self.dataService.getTaskOptions(params)).pipe(function (data) {
            if (data.allowTakeOwnership === true && data.allowRelease === true){
                throw "can't get both allowTakeOwnership and allowTakeOwnership properties equal true";
            }
            return self.pipeResponse(data);
        });
    },

    /**
     * return the correct params or the default
     * @param {JSON} params taskOptions response
     */
    pipeResponse: function (params) {
        return {
            showTakeOwnership: params.allowTakeOwnership || false,
            showRelease: params.allowRelease || false
        };
    },

    clean: function () {
        var self = this;
    }
  
 });
 
 bizagi.injector.register('bizagi.workportal.widgets.task.options', ['workportalFacade', 'dataService', bizagi.workportal.widgets.task.options]);
 