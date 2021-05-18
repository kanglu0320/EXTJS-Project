Ext.define('Admin.store.admin.Users', {
    extend: 'Ext.data.Store',

    alias: 'store.adminusers',
    storeId: 'adminusers',
    model: 'Admin.model.admin.User',

    //proxy: {
    //    type: 'api',
    //    url: 'app/data/admin/Users.json'
    //},autoLoad: true,

    proxy: {
        type: 'webapi',
        url: Config.getServices() + '/api/account/users'
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
