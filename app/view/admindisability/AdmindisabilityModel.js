Ext.define('Admin.view.admindisability.AdmindisabilityModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admindisability',

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
        admindisabilityResults: {
            type: 'admindisability'
        }
    }
});
