Ext.define('Admin.view.veteranform.VeteranformModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.veteranform',

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
        veteranformResults: {
            type: 'veteranformvform'
        }
    }
});
