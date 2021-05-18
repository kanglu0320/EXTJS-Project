Ext.define('Admin.store.authentication.UserGroup', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.authentication.UserGroup',
    storeId: 'authenticationusergroup',
    alias: 'store.authenticationusergroup',

        proxy: {
            type: 'api',
            url: 'app/data/authentication/EmployeeUserGroup.json'
            
        },
    autoLoad: true
    
});

