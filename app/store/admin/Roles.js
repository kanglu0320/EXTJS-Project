Ext.define('Admin.store.admin.Roles', {
    extend: 'Ext.data.Store',

    alias: 'store.adminroles',
    storeId: 'adminroles',
    model: 'Admin.model.admin.Roles',

    proxy: {
        type: 'webapi',
        url: Config.getServices() + '/api/account/GetAllRoles'
    },
    autoLoad: false,

    sorters: {
        direction: 'ASC',
        property: 'Email'
    }
});
