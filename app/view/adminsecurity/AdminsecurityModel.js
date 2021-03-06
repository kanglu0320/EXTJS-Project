Ext.define('Admin.view.adminsecurity.AdminsecurityModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adminsecurity',

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
        adminsecurityResults: {
            type: 'adminsecurity'
        },
        adminsecurityResult: {
            type: 'adminsecurityasform' 
        }
    }
});
