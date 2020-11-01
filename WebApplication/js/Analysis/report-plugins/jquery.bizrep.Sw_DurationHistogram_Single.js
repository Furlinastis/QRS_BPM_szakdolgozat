


/* Plugin BizRep_Sw_DurationHistogram_Single. 
 * Draws the Duration Trend report for the selcted stopwatch 

 * Use:
   ----
 * 1- Create an options object to customize behavior: ReportResult, ReportTemplatesDir, FlashChartsDir
 * 2- Apply plugin passing the options object      e.g: $(selector).BizRep_Sw_DurationHistogram_Single(myOptions);
 
 */


(function($){   
  
    /* File name to get report html template */        
    var PLUGIN_TEMPLATE_FILE = "RepTpt_SwDurationHistogram.aspx";

    /* Report name to be shown in error messages" */
    var PLUGIN_NAME = "Sw_DurationHistogram_Single";


    $.fn.extend({    
           
        
        BizRep_Sw_DurationHistogram_Single: function(options) {   
            
            
            //Set default values
            var defaults = { 
                    ReportResult : null,
                    ReportTemplatesDir : './ReportTemplates',
                    FlashChartDir : './Charts',
                    HoursDay : 8,
                    PluginTemplateFileName: PLUGIN_TEMPLATE_FILE,
                    PluginName: PLUGIN_NAME
                };   


            var options =  $.extend(defaults, options);   


            //Main plugin container DIV. It will be created inside each match in the selector.
            var oContainer;            
                        
                        
                        
            //Run report for each match in the selector
            return this.each(function(){

                //Create first parameter configuration, using plugin arguments and/or default values.
                InitStatusData();          
                
                
                //Create main plugin container DIV as the only control inside the given selector.
                var sTemplateUrl = options.ReportTemplatesDir + '/' + options.PluginTemplateFileName;

                //Main container will be a DIV tag
                oContainer = $("<div></div>")
                   ;

                $(this).html(oContainer);

                oContainer.load(sTemplateUrl, 
                    //Once loaded populate controls inside the page
                    function (){
                        InitControls(); 
                        RefreshReport();
                    } 
                );                                        
                
            });
            
            
            
            //---------------------------------------------- Create first parameter configuration, using plugin arguments and/or default values.
            function InitStatusData(){
                //Defaults
            }
            
            
            
            //---------------------------------------------- Populate container with necessary html and initialize controls
            function InitControls(){
                ApplyTooltipDescription($(".ReportHeader", oContainer));
            }
            
                        
            
            //---------------------------------------------- Repaint report.
            function RefreshReport(){

                if(options.ReportResult == null)
                    window.alert(options.PluginName + ": ReportResult was not set. No data to show.");
                else
                    DrawReport(options.ReportResult);
            }
            
                
            //---------------------------------------------- Fill template with report result data
            function DrawReport(oJsonResult){
           
                if(oJsonResult.ERROR != null){
                    window.alert(options.PluginName + ": Server error getting report:\n" + oJsonResult.ERROR);
                    return;
                }
                                
                try{
                
                    //Get result table
                    var oResultTable = oJsonResult.resultTable;
                    
                    //Get template element to be populated by report    
                    var oDivReportData = $(".ReportData", oContainer);

                    //Build chart options                    
                    var oChartOptions               = new Object();
                    oChartOptions.chartType         = "area";
                    oChartOptions.dataTable         = oResultTable;
                    oChartOptions.showValuesInside  = true;
                    oChartOptions.width             = 750;
                    oChartOptions.height            = 270;
                    oChartOptions.chartDir          = options.FlashChartDir;
                    oChartOptions.maxCategories     = 15;
                    oChartOptions.verticalLines     = [ {
                                                            linePosition:GetSLAPosition(oResultTable)
                                                            , lineColor: "FF0000"
                                                            , lineThickness: 3
                                                        } ];
                    
                    
                    $(oDivReportData).bizagireportchart(oChartOptions);
                    
                }
                catch(errorMsg){
                    window.alert(options.PluginName + ": Error displaying report:\n" + errorMsg);
                }
            } 
            
            
            function GetSLAPosition(oResultTable){
                
                var iPos_SLA     = 0;
                var iSLA         = oResultTable.extendedProperties.SLA ? parseInt(oResultTable.extendedProperties.SLA) : 0;
                var iSLA_In_Days = iSLA /(60 * options.HoursDay);
                
                for(var iRow in oResultTable.rows)
                {
                    if (parseInt(oResultTable.rows[iRow][0].value) > iSLA_In_Days)
                        break;

                    ++iPos_SLA;
                }
                
                return iPos_SLA;
            }
            
        }   
    });   
       
})(jQuery);  

