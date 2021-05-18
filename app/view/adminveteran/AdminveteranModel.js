Ext.define('Admin.view.adminveteran.AdminveteranModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adminveteran',

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
        adminveteranResults: {
            type: 'adminveteran'
        }
    }
});
