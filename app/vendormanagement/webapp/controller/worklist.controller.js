sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "vendormanagement/model/formatter"
],
function (Controller, MessageBox,formatter) {
    "use strict";

    return Controller.extend("vendormanagement.controller.worklist",{
        
        formatter: formatter,

        onInit: function () {

            const serviceUrl = this.getOwnerComponent().getModel().getServiceUrl();
            const oModel = new sap.ui.model.json.JSONModel({
                payload:{

                    companyname    : "",
                    phone          : "",
                    email          : "",
                    grade          : {
                        "mid":null
                    },
                    stage          : {
                        "mid":null
                    },
                    industry       : {
                        "mid":null
                    },
                    subindustry    : {
                        "mid":null
                    },
                    code           : "",

                    // Vendor Address Details

                    issbasame      : false, // Is Shiping and billing addresses same ?

                    billingAddress : "",
                    bilingcity     : "",
                    billingstate   : "",
                    billingzip     : "",
                    billingcountry : "",
                    shippingAddress : "",
                    shippingcity    : "",
                    shippingstate   : "",
                    shippingzip     : "",
                    shippingcountry : ""
                                
                },
                headerExpanded:true,
                stageKeys:[],
                SubIndustries:[],
                Stages:[]
            });

            this.getView().setModel(oModel,'oModel');

            // Fetching State Master Data for formatter

            let Stages = oModel.getProperty('/Stages');

            $.ajax({
                type: "GET",
                url: serviceUrl + "Stages",
                success: function (response, statusText, xhrToken) {

                    for(var i=0;i<response.value.length;i++){

                        Stages[response.value[i].mid] = response.value[i].text;

                    }

                    oModel.setProperty('/Stages',Stages);

                },
                contentType: "application/json"
            });

        },
        resetModel : function(){

            const oModel = this.getView().getModel('oModel');
            oModel.setProperty('/payload',{

                companyname    : "",
                phone          : "",
                email          : "",
                grade          : {
                    "mid":null
                },
                stage          : {
                    "mid":null
                },
                industry       : {
                    "mid":null
                },
                subindustry    : {
                    "mid":null
                },
                code           : "",

                // Vendor Address Details

                issbasame      : false, // Is Shiping and billing addresses same ?

                billingAddress : "",
                bilingcity     : "",
                billingstate   : "",
                billingzip     : "",
                billingcountry : "",
                shippingAddress : "",
                shippingcity    : "",
                shippingstate   : "",
                shippingzip     : "",
                shippingcountry : ""
                            
            });

            this.getView().byId('table').getBinding('items').refresh();

        },
        onClickValueHelp : function(){

            if (!this.valueHelp) {
                this.valueHelp = sap.ui.xmlfragment("vendormanagement.fragments.valueHelp", this);
            }
            this.getView().addDependent(this.valueHelp);
            this.valueHelp.open();

        },
        onPressAddVendor : function(){

            if (!this.vendor) {
                this.vendor = sap.ui.xmlfragment("vendormanagement.fragments.vendorFrag", this);
            }
            this.getView().addDependent(this.vendor);
            this.vendor.open();

        },
        closeFragment : function(){

            if (!this.vendor) {
                this.vendor = sap.ui.xmlfragment("vendormanagement.fragments.vendorFrag", this);
            }
            this.getView().addDependent(this.vendor);
            this.vendor.close();

        },
        onFragCancel : function(){

            const that = this;

            MessageBox.warning("Unsaved data will be lost, are you sure?", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function (sAction) {
					if(sAction === 'OK'){
                        that.closeFragment();
                    }
				},
				dependentOn: this.getView()
			});

        },
        onIndustryChange : function(){

            const serviceUrl = this.getOwnerComponent().getModel().getServiceUrl();

            let oModel = this.getView().getModel('oModel');
            const industry = oModel.getProperty('/payload/industry/mid');
            oModel.setProperty('/payload/subindustry/mid',"");

            // Fetching relevent subindustry data

            $.ajax({
                type: "GET",
                url: serviceUrl + "Industries?$filter=mid eq "+industry+"&$expand=subindustry",
                success: function (response, statusText, xhrToken) {

                    oModel.setProperty('/SubIndustries',response.value[0].subindustry);

                },
                contentType: "application/json"
            });

        },
        onPressSave : function(){

            const that = this;

            MessageBox.information("Do you want to save?", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function (sAction) {
					if(sAction === 'OK'){
                        that.postVendorData();
                        that.closeFragment();
                        that.resetModel();
                    }
				},
				dependentOn: this.getView()
			});

        },
        onPressSaveNew : function(){

            const that = this;

            MessageBox.information("Do you want to save?", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function (sAction) {
					if(sAction === 'OK'){
                        that.postVendorData();
                        // that.closeFragment();
                        that.resetModel();
                    }
				},
				dependentOn: this.getView()
			});

        },
        postVendorData : function(){

            const that = this;
            const serviceUrl = this.getOwnerComponent().getModel().getServiceUrl();
            const oModel = this.getView().getModel('oModel');
            let payload  = oModel.getProperty('/payload');
            payload.stage.mid = parseInt(payload.stage.mid);
            payload.grade.mid = parseInt(payload.grade.mid);
            payload.industry.mid = parseInt(payload.industry.mid);
            payload.subindustry.mid = parseInt(payload.subindustry.mid);

            // Posting Data

            $.ajax({
                type: "POST",
                url: serviceUrl + "Vendors",
                data:JSON.stringify(payload),
                success: function (response, statusText, xhrToken) {

                    MessageBox.success("Saved Successfully.");
                    // sap.ui.getCore().byId("table").getBinding("items").refresh();
                    //that.getView().getElementBinding().refresh(true);

                },error: function(e){
                    MessageBox.error("ooppss..");
                    console.log(e);
                },
                contentType: "application/json"
            });

        },
        onPressVendor : function(oEvent){

        const ID = oEvent.getSource().getBindingContext().getObject().ID;
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this.getOwnerComponent()
          .getRouter(this)
          .navTo("Targetobject", { ID: ID });

        }
    });
});
