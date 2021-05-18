Ext.define('Admin.view.adminveteranstatuspostoffer.AdminveteranstatuspostofferModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adminveteranstatuspostoffer',

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
            type: 'adminveteranstatuspostoffer'
        },
        adminsecurityResult: {
            type: 'adminveteranstatusform'
        }
    }
});



//adminveteranstatusform