Ext.define('Admin.store.adminsecurity.Asform', {
    extend: 'Ext.data.Store',

    alias: 'store.adminsecurityasform',
    storeId: 'adminsecurityasform',
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
