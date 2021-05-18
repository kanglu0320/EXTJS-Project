Ext.define('Admin.view.admin.AdminController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin',
    init: function () {
        //var usersStore = Ext.getStore('adminusers');
        currentUser = Ext.getStore('authenticationloginuser');
        currentToken = Ext.getStore('authenticationlogintoken');
        usersStore = this.getStore('usersResults');
        usersRoles = this.getStore('allroles');
        selectedRecord = null;
        this.control({
            '#': {
                render: function () {
                    //this.getView().getEl().mask('Initail Components...');
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
                },

                activate: function (t) {                    
                    //if (usersRoles.getCount() == 0) {
                        usersRoles.getProxy().setExtraParam("Roles", currentUser.first().data.Roles);
                        usersRoles.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + currentToken.first().data.access_token });
                        usersRoles.load({
                            scope: this,
                            callback: function (records, operation, success) {
                            }
                        });
                    //}
                    if (usersStore.getCount() == 0) {
                        usersStore.getProxy().setExtraParam("Roles", currentUser.first().data.Roles);
                        usersStore.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + currentToken.first().data.access_token });
                        usersStore.load({
                            scope: this,
                            callback: function (records, operation, success) {
                            }
                        });
                    }
                    var l = this.getView().getLayout();
                    l.setActiveItem(0);
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
                        this.getView().getEl().mask('Loading...please wait!');
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
                                this.getView().getEl().unmask();
                                usersStore.reload();
                                Ext.Msg.alert('Success', 'The status/email confirmed of selected user has been updated!');
                            },

                            failure: function (response, opts) {
                                this.getView().getEl().unmask();
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


    deleteUser: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        selectedRecord = rec;

                var msgstr = 'Are you sure you want to delete this user account?';
                Ext.window.MessageBox.prototype.closeToolText = 'Close Dialog';
                Ext.Msg.confirm('Warning', msgstr, function (id, value) {
                    if (id === 'yes') {
                        this.getView().getEl().mask('Deleting user...please wait!');
                        Ext.Ajax.request({
                            url: Config.getServices() + '/api/account/DeleteUserByID',
                            method: 'GET',
                            params: {
                                'Id': rec.data.Id
                            },
                            success: function (response, opts) {
                                //var obj = Ext.decode(response.responseText);
                                this.getView().getEl().unmask();
                                usersStore.reload();
                                Ext.Msg.alert('Success', 'The selected user has been removed from the system!');
                            },

                            failure: function (response, opts) {
                                this.getView().getEl().unmask();
                                console.log('server-side failure with status code ' + response.status);
                            },
                            scope: this,
                            headers: {
                                'Authorization': 'Bearer ' + currentToken.first().data.access_token
                            }
                        });
                    }
                }, this);
            

        

    },

    backtouserlist: function () {
        var me = this;
        if (selectedRecord != null && selectedRecord.dirty) {
            usersStore.reload();
            
        }
        var l = this.getView().getLayout();
        l.setActiveItem(0);
        selectedRecord = null;
    },

    userdetailsave: function () {
        var me = this;
        refs = me.getReferences();
        AdminUserDetailPanel = refs.AdminUserDetailPanel;
        Ext.window.MessageBox.prototype.closeToolText = 'Close Window';
        Ext.Msg.confirm('Warning', 'Are you sure you want to update this user account?', function (id, value) {
            if (id === 'yes') {
                this.getView().getEl().mask('Loading...please wait!');
                AdminUserDetailPanel.getForm().submit({
                    clientValidation: true,
                    url: Config.getServices() + '/api/Account/UpdateUserInfo',
                    scope: this,
                    headers: {
                        'Authorization': 'Bearer ' + currentToken.first().data.access_token
                    },
                    success: function (form, action) {
                        this.getView().getEl().unmask();
                        //usersStore.reload();
                        Ext.Msg.alert('Success', 'User information and roles have been updated!');
                    },
                    failure: function (form, action) {
                        this.getView().getEl().unmask();
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
    }

   


});
