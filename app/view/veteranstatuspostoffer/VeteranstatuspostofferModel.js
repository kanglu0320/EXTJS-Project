Ext.define('Admin.view.veteranstatuspostoffer.VeteranstatuspostofferModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.veteranstatuspostoffer',

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
        veteranstatuspostofferResults: {
            type: 'veteranstatuspostoffervform'
        }
    }
});
