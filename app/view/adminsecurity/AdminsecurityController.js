Ext.define('Admin.view.adminsecurity.AdminsecurityController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.adminsecurity',
    init: function () {
        //var usersStore = Ext.getStore('adminusers');
        currentUser = Ext.getStore('authenticationloginuser');
        currentToken = Ext.getStore('authenticationlogintoken');
        adminsecurityStore = this.getStore('adminsecurityResults');
        adminsecurityResult = this.getStore('adminsecurityResult');
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
                    if (adminsecurityStore.getCount() == 0) {
                        adminsecurityStore.getProxy().setExtraParam("Roles", currentUser.first().data.Roles);
                        adminsecurityStore.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + currentToken.first().data.access_token });
                        adminsecurityStore.load({
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
                    SecurityFormDetailFieldset = refs.SecurityFormDetailFieldset;
                    SecurityFormStatementFieldset = refs.SecurityFormStatementFieldset;
                    EmployeeSignaturePad = refs.EmployeeSignaturePad;

                    adminsecurityResult.getProxy().setExtraParam("ID", selectedRecord.data.Id);
                    adminsecurityResult.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + currentToken.first().data.access_token });
                    adminsecurityResult.load({
                        scope: this,
                        callback: function (records, operation, success) {
                            //console.log(records);
                            //if (records.length > 0) {
                                AdminSecurityDetailPanel.loadRecord(records[0]);
                                EmployeeSignaturePad.clear();
                                EmployeeSignaturePad.fromDataURL(records[0].data.digitalsignature);
                                AdminSecurityDetailPanel.getForm().getFields().each(function (field) {
                                    field.setReadOnly(true);
                                });
                            //}
                            SecurityFormDetailFieldset.expand();
                            SecurityFormStatementFieldset.expand();
                            this.getView().getEl().unmask();
                        }
                    });
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

    deleteRecord: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rselectedRecord = rec;
        
        //console.log(selectedRecord);
        Ext.Msg.confirm('Warning', 'Are you sure you want to delete this record?', function (id, value) {
            if (id === 'yes') {
                Ext.Ajax.request({
                    url: Config.getServices() + '/api/corp/DeleteSecurityFormByID',
                    params: {
                        Id: rselectedRecord.data.Id
                    },
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + currentToken.first().data.access_token
                    },
                    success: function (response) {
                        //console.log(response);
                        this.getView().getEl().unmask();
                        Ext.Msg.alert('Success', 'Selected record has been deleted!');
                        var l = this.getView().getLayout();
                        l.setActiveItem(0);
                        selectedRecord = null;
                        adminsecurityStore.reload();
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

    backtouserlist: function () {
        var me = this;
        if (selectedRecord != null && selectedRecord.dirty) {
            adminsecurityStore.reload();
            
        }
        var l = this.getView().getLayout();
        l.setActiveItem(0);
        selectedRecord = null;
    },


    formdetailprintfromlist: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        selectedRecord = rec;
        console.log(rec);
        refs = me.getReferences();
        AdminUserGrid = refs.AdminUserGrid;
        AdminUserGrid.getSelectionModel().select(rec, true, false);
        //var l = this.getView().getLayout();
        //l.setActiveItem(1);

        console.log('Printing');
        this.getView().getEl().mask('Printing report...please wait!');
        Ext.Ajax.request({
            url: Config.getServices() + '/api/corp/GetSecurityReporting',
            params: {
                Id: selectedRecord.data.Id
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


    formdetailprint: function () {
        var me = this;
        refs = me.getReferences();
        //AdminSecurityDetailPanel = refs.AdminSecurityDetailPanel;
        console.log('Printing');
        this.getView().getEl().mask('Printing report...please wait!');
        Ext.Ajax.request({
            url: Config.getServices() + '/api/corp/GetSecurityReporting',
            params: {
                Id: selectedRecord.data.Id
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
        Ext.Msg.confirm('Warning', 'Are you sure you want to delete this record?', function (id, value) {
            if (id === 'yes') {
                Ext.Ajax.request({
                    url: Config.getServices() + '/api/corp/DeleteSecurityFormByID',
                    params: {
                        Id: selectedRecord.data.Id
                    },
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + currentToken.first().data.access_token
                    },
                    success: function (response) {
                        console.log(response);
                        this.getView().getEl().unmask();
                        Ext.Msg.alert('Success', 'Selected record has been deleted!');
                        var l = this.getView().getLayout();
                        l.setActiveItem(0);
                        selectedRecord = null;
                        adminsecurityStore.reload();
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
    }

   


});
