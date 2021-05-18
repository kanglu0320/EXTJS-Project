Ext.define('Admin.store.admin.UserGroup', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.authentication.UserGroup',
    storeId: 'adminusergroup',
    alias: 'store.adminusergroup',

        proxy: {
            type: 'api',
            url: 'app/data/authentication/UserGroup.json'
        },
    autoLoad: true
    
});
