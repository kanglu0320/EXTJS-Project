Ext.define('Admin.view.employeesecurityform.EmployeesecurityformController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employeesecurityform',
    init: function () {
        //var usersStore = Ext.getStore('adminusers');
        currentUser = Ext.getStore('authenticationloginuser');
        currentToken = Ext.getStore('authenticationlogintoken');
        securityformResults = this.getStore('securityformResults');
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
                    this.getView().getEl().mask('Loading form...please wait!');

                    var me = this;
                    refs = me.getReferences();
                    //expand the form detail part
                    SecurityFormDetailFieldset = refs.SecurityFormDetailFieldset;
                    SecurityFormStatementFieldset = refs.SecurityFormStatementFieldset;

                    SecurityFormDetailPanel = refs.SecurityFormDetailPanel;
                    EmployeeSignaturePanel = refs.EmployeeSignaturePanel;
                    EmployeeSignaturePad = refs.EmployeeSignaturePad;
                    
                    ClearSignatureBtn = refs.ClearSignatureBtn;

                    useremailfield = refs.useremailfield;
                    userIDfield = refs.userIDfield;
                    userNamefield = refs.userNamefield;
                    Namefield = refs.Namefield;

                    FormStatusLabel = refs.FormStatusLabel;
                    //FormSaveBtn = refs.FormSaveBtn;
                    FormSubmitBtn = refs.FormSubmitBtn;

                    userIDfield.setValue(currentUser.first().data.Id);
                    useremailfield.setValue(currentUser.first().data.Email);
                    userNamefield.setValue(currentUser.first().data.Email);
                    Namefield.setValue(currentUser.first().data.FirstName + " " + currentUser.first().data.LastName);

                    //if (securityformResults.getCount() == 0) {
                        securityformResults.getProxy().setExtraParam("ID", currentUser.first().data.Id);
                        securityformResults.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + currentToken.first().data.access_token });
                        securityformResults.load({
                            scope: this,
                            callback: function (records, operation, success) {
                                //console.log(records);
                                if (records.length > 0) {
                                    SecurityFormDetailPanel.loadRecord(records[0]);
                                    EmployeeSignaturePad.clear();
                                    EmployeeSignaturePad.fromDataURL(records[0].data.digitalsignature);
                                    FormStatusLabel.setHidden(false);
                                    //FormSaveBtn.setHidden(true);
                                    FormSubmitBtn.setHidden(true);
                                    SecurityFormDetailPanel.getForm().getFields().each(function (field) {
                                        field.setReadOnly(true);
                                    });
                                    EmployeeSignaturePanel.setDisabled(true);
                                    ClearSignatureBtn.setHidden(true);

                                }
                                if (records.length == 0) {
                                    SecurityFormDetailPanel.reset(true);
                                    userIDfield.setValue(currentUser.first().data.Id);
                                    useremailfield.setValue(currentUser.first().data.Email);
                                    userNamefield.setValue(currentUser.first().data.Email);
                                    Namefield.setValue(currentUser.first().data.FirstName + " " + currentUser.first().data.LastName);
                                    FormStatusLabel.setHidden(true);
                                    //FormSaveBtn.setHidden(false);
                                    FormSubmitBtn.setHidden(false);
                                    SecurityFormDetailPanel.getForm().getFields().each(function (field) {
                                        field.setReadOnly(false);
                                    });
                                    EmployeeSignaturePanel.setDisabled(false);
                                    ClearSignatureBtn.setHidden(false);
                                    EmployeeSignaturePad.clear();
                                }
                                SecurityFormDetailFieldset.expand();
                                SecurityFormStatementFieldset.expand();
                                this.getView().getEl().unmask();
                            }
                        });
                   // }

                }
            }
        });
    },


    edit: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        selectedRecord = rec;
        refs = me.getReferences();
        AdminUserGrid = refs.AdminUserGrid;
        AdminUserGrid.getSelectionModel().select(rec, true, false);
        var l = this.getView().getLayout();
        l.setActiveItem(1);
    },

    activeUser: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        selectedRecord = rec;

        if (rec.dirty) {
            if (!Ext.isEmpty(rec.modified.Status) || !Ext.isEmpty(rec.modified.EmailConfirmed)) {
                var msgstr = 'Are you sure you want to update this user account?';
                if (!Ext.isEmpty(rec.modified.Status)) {
                    if (rec.data.Status == 'Active') { msgstr = 'Are you sure you want to activate this user account?'; }
                    else { msgstr = 'Are you sure you want to deactivate this user account?'; }
                }
                Ext.window.MessageBox.prototype.closeToolText = 'Close Dialog';
                Ext.Msg.confirm('Warning', msgstr, function (id, value) {
                    if (id === 'yes') {
                        Ext.Ajax.request({
                            url: Config.getServices() + '/api/account/UpdateStatus',
                            method: 'GET',
                            params: {
                                'userid': rec.data.Id,
                                'Status': rec.data.Status,
                                'EmailConfirmed': rec.data.EmailConfirmed
                            },
                            success: function (response, opts) {
                                //var obj = Ext.decode(response.responseText);
                                usersStore.reload();
                                Ext.Msg.alert('Success', 'The status/email confirmed of selected user has been updated!');
                            },

                            failure: function (response, opts) {
                                console.log('server-side failure with status code ' + response.status);
                            },
                            scope: this,
                            headers: {
                                'Authorization': 'Bearer ' + currentToken.first().data.access_token
                            }
                        });
                    }
                }, this);
            }
            else {
                Ext.window.MessageBox.prototype.closeToolText = 'Close Dialog';
                Ext.Msg.alert('Warning', 'The status/email confirmed of selected user has not been changed!!');
            }
        }

        else {
            Ext.window.MessageBox.prototype.closeToolText = 'Close Dialog';
            Ext.Msg.alert('Warning', 'The status/email confirmed of selected user has not been changed!!');
        }
    },

    backtouserlist: function () {
        //var me = this;
        //if (selectedRecord != null && selectedRecord.dirty) {
        //    usersStore.reload();
            
        //}
        //var l = this.getView().getLayout();
        //l.setActiveItem(0);
        //selectedRecord = null;

        },

    userdetailsave: function () {
        var me = this;
        refs = me.getReferences();
        AdminUserDetailPanel = refs.AdminUserDetailPanel;
        Ext.window.MessageBox.prototype.closeToolText = 'Close Window';
        Ext.Msg.confirm('Warning', 'Are you sure you want to update this user account?', function (id, value) {
            if (id === 'yes') {
                AdminUserDetailPanel.getForm().submit({
                    clientValidation: true,
                    url: Config.getServices() + '/api/Account/UpdateUserInfo',
                    scope: this,
                    headers: {
                        'Authorization': 'Bearer ' + currentToken.first().data.access_token
                    },
                    success: function (form, action) {
                        //usersStore.reload();
                        Ext.Msg.alert('Success', 'User information and roles have been updated!');
                    },
                    failure: function (form, action) {
                        switch (action.failureType) {
                            case Ext.form.action.Action.CLIENT_INVALID:
                                Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                                break;
                            case Ext.form.action.Action.CONNECT_FAILURE:
                                Ext.Msg.alert('Failure', 'Ajax communication failed');
                                break;
                            case Ext.form.action.Action.SERVER_INVALID:
                                Ext.Msg.alert('Failure', action.result.msg);
                        }
                    }
                });
            }
        }, this);
    },

    saveSignature: function () {
        var me = this;
        refs = me.getReferences();
        EmployeeSignaturePad = refs.EmployeeSignaturePad;
        //console.log(EmployeeSignaturePad);
        var vv = EmployeeSignaturePad.toDataURL("data:image/png;base64");
        //console.log(vv);
        //console.log(EmployeeSignaturePad.isEmpty());
    },

    clearSignature: function () {
        var me = this;
        refs = me.getReferences();
        EmployeeSignaturePad = refs.EmployeeSignaturePad;
        //console.log(EmployeeSignaturePad);
        //var vv = EmployeeSignaturePad.toDataURL("data:image/png;base64");
        //console.log(vv);
        EmployeeSignaturePad.clear();
    },


    submitSecurityForm: function () {
        var me = this;
        refs = me.getReferences();
        SecurityFormDetailPanel = refs.SecurityFormDetailPanel;
        EmployeeSignaturePad = refs.EmployeeSignaturePad;

        EmployeeSignaturePanel = refs.EmployeeSignaturePanel;
        ClearSignatureBtn = refs.ClearSignatureBtn;
        FormStatusLabel = refs.FormStatusLabel;
        //FormSaveBtn = refs.FormSaveBtn;
        FormSubmitBtn = refs.FormSubmitBtn;

        
        if (SecurityFormDetailPanel.isValid()) {
            if (EmployeeSignaturePad.isEmpty()) {
                Ext.Msg.alert(
                                'Warning',
                                'The Form must be digital signed before submit.'
                            );
            } else {
                this.getView().getEl().mask('Submitting form...please wait!');
                SecurityFormDetailPanel.getForm().submit({
                    clientValidation: true,
                    scope: this,
                    url: 'http://localhost/CorpAppWebServices1/api/corp/AddNewSecurityForm',
                    params: {
                        digitalsignature: EmployeeSignaturePad.toDataURL("data:image/png;base64")
                    },
                    headers: { 'Authorization': 'Bearer ' + currentToken.first().data.access_token },
                    success: function (form, action) {
                        //console.log(this);
                        Ext.Msg.alert('Success', 'Your Form has been successfully submitted!');

                        FormStatusLabel.setHidden(false);
                        //FormSaveBtn.setHidden(true);
                        FormSubmitBtn.setHidden(true);
                        SecurityFormDetailPanel.getForm().getFields().each(function (field) {
                            field.setReadOnly(true);
                        });
                        EmployeeSignaturePanel.setDisabled(true);
                        ClearSignatureBtn.setHidden(true);
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
        }
        else {
            Ext.Msg.alert(
                                'Warning',
                                'Form fields may not be submitted with invalid values'
                            );
        }
    }


});
