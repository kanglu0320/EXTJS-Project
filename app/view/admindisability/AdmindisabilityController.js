Ext.define('Admin.view.admindisability.AdmindisabilityController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admindisability',
    init: function () {
        //var usersStore = Ext.getStore('adminusers');
        currentUser = Ext.getStore('authenticationloginuser');
        currentToken = Ext.getStore('authenticationlogintoken');
        admindisabilityStore = this.getStore('admindisabilityResults');
        //adminsecurityResult = this.getStore('adminsecurityResult');
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
                    if (admindisabilityStore.getCount() == 0) {
                        admindisabilityStore.getProxy().setExtraParam("Roles", currentUser.first().data.Roles);
                        admindisabilityStore.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + currentToken.first().data.access_token });
                        admindisabilityStore.load({
                            scope: this,
                            callback: function (records, operation, success) {
                            }
                        });
                    }
                    var l = this.getView().getLayout();
                    l.setActiveItem(0);
                }
            },
            'form[reference=AdminSecurityDetailPanel]': {
                activate: function (t) {
                    //console.log(selectedRecord);
                    var me = this;
                    refs = me.getReferences();
                    this.getView().getEl().mask('Loading form...please wait!');
                    AdminSecurityDetailPanel = refs.AdminSecurityDetailPanel;
                    AdminSecurityDetailPanel.loadRecord(selectedRecord);
                    AdminSecurityDetailPanel.getForm().getFields().each(function (field) {
                                    field.setReadOnly(true);
                                });
                    this.getView().getEl().unmask();
                }
            }
        });
    },


    edit: function (grid, rowIndex, colIndex) {     
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        selectedRecord = rec;
        console.log(rec);
        refs = me.getReferences();       
        AdminUserGrid = refs.AdminUserGrid;
        AdminUserGrid.getSelectionModel().select(rec, true, false);
        var l = this.getView().getLayout();
        l.setActiveItem(1);
        
       
        
    },

    backtouserlist: function () {
        var me = this;
        if (selectedRecord != null && selectedRecord.dirty) {
            admindisabilityStore.reload();
            
        }
        var l = this.getView().getLayout();
        l.setActiveItem(0);
        selectedRecord = null;
    },

    formdetailprint: function () {
        var me = this;
        refs = me.getReferences();
        AdminSecurityDetailPanel = refs.AdminSecurityDetailPanel;
        console.log('Printing');
        this.getView().getEl().mask('Printing report...please wait!');
        Ext.Ajax.request({
            url: Config.getServices() + '/api/corp/GetDisabilityReporting',
            params: {
                dsid: selectedRecord.data.dsid
            },
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + currentToken.first().data.access_token
            },
            success: function (response) {
                console.log(response);
                this.getView().getEl().unmask();
                window.open(response.responseText.replace(/["']/g, ""), '_blank');
            },
            failure: function (response) {
                this.getView().getEl().unmask();
                var data = Ext.decode(response.responseText);
                Ext.Msg.alert(data['error'], data['error_description']);
            },
            scope: this
        });
    },


    formdetaildelete: function () {
        //console.log('Deleting');
        Ext.Msg.confirm('Warning', 'Are you sure you want to delete this record?', function (id, value) {
            if (id === 'yes') {
                Ext.Ajax.request({
                    url: Config.getServices() + '/api/corp/DeleteDisabilityFormByID',
                    params: {
                        dsid: selectedRecord.data.dsid
                    },
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + currentToken.first().data.access_token
                    },
                    success: function (response) {
                        console.log(response);
                        this.getView().getEl().unmask();
                        Ext.Msg.alert('Success', 'Selected record has been deleted!');
                        selectedRecord = null;
                        admindisabilityStore.getProxy().setExtraParam("Roles", currentUser.first().data.Roles);
                        admindisabilityStore.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + currentToken.first().data.access_token });
                        admindisabilityStore.load({
                            scope: this,
                            callback: function (records, operation, success) {
                                var l = this.getView().getLayout();
                                l.setActiveItem(0);
                            }
                        });
                    },
                    failure: function (response) {
                        this.getView().getEl().unmask();
                        var data = Ext.decode(response.responseText);
                        Ext.Msg.alert(data['error'], data['error_description']);
                    },
                    scope: this
                });
            }
        }, this);
    },

    deleteRecord: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rselectedRecord = rec;

        Ext.Msg.confirm('Warning', 'Are you sure you want to delete this record?', function (id, value) {
            if (id === 'yes') {
                Ext.Ajax.request({
                    url: Config.getServices() + '/api/corp/DeleteDisabilityFormByID',
                    params: {
                        dsid: rselectedRecord.data.dsid
                    },
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + currentToken.first().data.access_token
                    },
                    success: function (response) {
                        console.log(response);
                        this.getView().getEl().unmask();
                        Ext.Msg.alert('Success', 'Selected record has been deleted!');
                        selectedRecord = null;
                        admindisabilityStore.getProxy().setExtraParam("Roles", currentUser.first().data.Roles);
                        admindisabilityStore.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + currentToken.first().data.access_token });
                        admindisabilityStore.load({
                            scope: this,
                            callback: function (records, operation, success) {
                                var l = this.getView().getLayout();
                                l.setActiveItem(0);
                            }
                        });
                    },
                    failure: function (response) {
                        this.getView().getEl().unmask();
                        var data = Ext.decode(response.responseText);
                        Ext.Msg.alert(data['error'], data['error_description']);
                    },
                    scope: this
                });
            }
        }, this);
    },

   


});
