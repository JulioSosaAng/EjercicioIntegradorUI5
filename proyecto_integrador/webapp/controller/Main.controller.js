sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "proyectointegrador/util/Constants"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Constants) {
        "use strict";

        return Controller.extend("proyectointegrador.controller.Main", {
            onInit: function () {

                const url = sap.ui.require.toUrl("proyectointegrador") + Constants.service.northwind;
                this._model = new sap.ui.model.odata.v2.ODataModel(url, {
                    json : true,
                    headers: {
                        "DataServiceVersion": "2.0",
                        "Cache-Control": "no-cache, no-store",
                        "Pragma": "no-cache"
                    },
                    useBatch: false
                });

                this._model.read("/Products_by_Categories",{
                    async: true,
                    success: jQuery.proxy(this.success, this),
                    error: jQuery.proxy(this.error, this),
                })
            },
            success: function(oData){
                const oModel = new JSONModel(oData.results);
                this.getView().setModel(oModel, Constants.model.prdModel);               
            },
            error: function (){
                alert("error");
            },
            //Funcion para cargar la data en el Bootbox
            // onLoadDataToComboBox: function () {
            

            // }
        });
    });
