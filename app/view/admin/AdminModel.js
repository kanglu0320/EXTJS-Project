Ext.define('Admin.view.admin.AdminModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin',

    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Memory',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date',
        'Ext.data.field.Boolean',
        'Ext.data.reader.Json'
    ],

    stores: {
        usersResults: {
            type: 'adminusers'
        },
        allroles: {
            type: 'adminroles'
        },
        adminuserGroup: {
            type: 'adminusergroup'
        }
    }
});
