Ext.define('Admin.view.employeesecurityform.EmployeesecurityformModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employeesecurityform',

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
        securityformResults: {
            type: 'employeesecurityformsform'
        }
    }
});
