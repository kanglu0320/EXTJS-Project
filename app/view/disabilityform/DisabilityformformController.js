Ext.define('Admin.view.disabilityform.DisabilityformController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.disabilityform',
    init: function () {
        //var usersStore = Ext.getStore('adminusers');
        currentUser = Ext.getStore('authenticationloginuser');
        currentToken = Ext.getStore('authenticationlogintoken');
        disabilityformResults = this.getStore('disabilityformResults');
        selectedRecord = null;
        this.control({
            '#': {
                beforerender: function () {
                    //console.log('before loading');
                    //this.getView().getEl().mask('Loading form...please wait!');
                },
                render: function () {
                    //console.log('loading');
                    //this.getView().getEl().mask('Loading form...please wait!');
                },
                boxready: function () {
                    //console.log('ready');
                },
                resize: function () {
                    //console.log('resize');
                },
                afterrender: function () {
                    //var usersStore = this.getStore('usersResults');
                    //if (usersStore.getCount() == 0) {
                    //    usersStore.getProxy().setExtraParam("Roles", currentUser.first().data.Roles);
                    //    usersStore.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + currentToken.first().data.access_token });
                    //    usersStore.load({
                    //        scope: this,
                    //        callback: function (records, operation, success) {                           
                    //        }
                    //    });
                    //}
                    //if (usersRoles.getCount() == 0) {
                    //    usersRoles.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + currentToken.first().data.access_token });
                    //    usersRoles.load({
                    //        scope: this,
                    //        callback: function (records, operation, success) {
                    //        }
                    //    });
                    //}
                    //console.log('loading done');
                   // this.getView().getEl().unmask();
                },

                activate: function (t) {
                    //console.log(currentUser.first().data);
                    if (currentUser.data.length > 0) {
                        this.getView().getEl().mask('Loading form...please wait!');

                        var me = this;
                        refs = me.getReferences();
                        SecurityFormDetailPanel = refs.SecurityFormDetailPanel;
                        FormStatusLabel = refs.FormStatusLabel;
                        //FormSaveBtn = refs.FormSaveBtn;
                        FormSubmitBtn = refs.FormSubmitBtn;
                        userIDfield = refs.userIDfield;
                        userIDfield.setValue(currentUser.first().data.Id);
                        //if (securityformResults.getCount() == 0) {
                        disabilityformResults.getProxy().setExtraParam("ID", currentUser.first().data.Id);
                        disabilityformResults.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + currentToken.first().data.access_token });
                        disabilityformResults.load({
                            scope: this,
                            callback: function (records, operation, success) {
                                //console.log(records);
                                if (records.length > 0) {
                                    SecurityFormDetailPanel.loadRecord(records[0]);

                                    FormStatusLabel.setHidden(false);
                                    //FormSaveBtn.setHidden(true);
                                    FormSubmitBtn.setHidden(true);
                                    SecurityFormDetailPanel.getForm().getFields().each(function (field) {
                                        field.setReadOnly(true);
                                    });


                                }
                                if (records.length == 0) {
                                    SecurityFormDetailPanel.reset(true);
                                    userIDfield.setValue(currentUser.first().data.Id);
                                    FormStatusLabel.setHidden(true);
                                    //FormSaveBtn.setHidden(false);
                                    FormSubmitBtn.setHidden(false);
                                    SecurityFormDetailPanel.getForm().getFields().each(function (field) {
                                        field.setReadOnly(false);
                                    });

                                }

                                this.getView().getEl().unmask();
                            }
                        });
                        // }
                    }
                    else {
                        var me = this;
                        refs = me.getReferences();
                        userIDfield = refs.userIDfield;
                        userIDfield.setValue('0');
                        //console.log(userIDfield);
                    }
                }
            }
        });
    },


    backtouserlist: function () {


        },


    saveSignature: function () {

    },




    submitSecurityForm: function () {
        var me = this;
        refs = me.getReferences();
        SecurityFormDetailPanel = refs.SecurityFormDetailPanel;
        FormStatusLabel = refs.FormStatusLabel;
        //FormSaveBtn = refs.FormSaveBtn;
        FormSubmitBtn = refs.FormSubmitBtn;       
        if (SecurityFormDetailPanel.isValid()) {
            var atoken = null;
            if (currentToken.data.length > 0) {
                atoken = currentToken.first().data.access_token;
            }
            this.getView().getEl().mask('Submitting form...please wait!');
                SecurityFormDetailPanel.getForm().submit({
                    clientValidation: true,
                    scope: this,
                    url: 'http://localhost/CorpAppWebServices1/api/corp/AddNewDisabilityForm',
                    params: {
                        //digitalsignature: EmployeeSignaturePad.toDataURL("data:image/png;base64")
                    },
                    headers: { 'Authorization': 'Bearer ' + atoken },
                    success: function (form, action) {
                        //console.log(this);
                        Ext.Msg.alert('Success', 'Your Form has been successfully submitted!');
                        FormStatusLabel.setHidden(false);
                        //FormSaveBtn.setHidden(true);
                        FormSubmitBtn.setHidden(true);
                        SecurityFormDetailPanel.getForm().getFields().each(function (field) {
                            field.setReadOnly(true);
                        });
                        this.getView().getEl().unmask();
                    },
                    failure: function (form, action) {
                        this.getView().getEl().unmask();
                        switch (action.failureType) {
                            case Ext.form.action.Action.CLIENT_INVALID:
                                Ext.Msg.alert(
                                    'Warning',
                                    'Form fields may not be submitted with invalid values'
                                );
                                break;
                            case Ext.form.action.Action.CONNECT_FAILURE:
                                Ext.Msg.alert('Failure', 'Ajax communication failed');
                                break;
                            case Ext.form.action.Action.SERVER_INVALID:
                                Ext.Msg.alert('Failure', action.result.msg);
                        }
                    }
                }, this);          
        }
        else {
            Ext.Msg.alert(
                                'Warning',
                                'Form fields may not be submitted with invalid values'
                            );
        }
    }


});
