Ext.define('Admin.store.adminsecurity.Adminsecurity', {
    extend: 'Ext.data.Store',

    alias: 'store.adminsecurity',
    storeId: 'adminsecurity',
    model: 'Admin.model.adminsecurity.Adminsecurity',

    proxy: {
        type: 'webapi',
        url: Config.getServices() + '/api/corp/GetAllSecurityForms'
    },
    autoLoad: false,

    sorters: {
        direction: 'ASC',
        property: 'Email'
    },
    pageSize: 50
});
