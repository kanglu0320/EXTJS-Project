Ext.define('Admin.store.employeesecurityform.Sform', {
    extend: 'Ext.data.Store',

    alias: 'store.employeesecurityformsform',
    storeId: 'employeesecurityformsform',
    model: 'Admin.model.employeesecurityform.Sform',

    //proxy: {
    //    type: 'api',
    //    url: 'app/data/admin/Users.json'
    //},autoLoad: true,

    proxy: {
        type: 'webapi',
        url: Config.getServices() + '/api/corp/GetAllSecurityFormByID'
    },
    autoLoad: false,
    pageSize: 20,

    //reader: {
    //    type: 'json'//,
    //    //rootProperty: 'data'
    //},

    sorters: {
        direction: 'ASC',
        property: 'Email'
    }
});
