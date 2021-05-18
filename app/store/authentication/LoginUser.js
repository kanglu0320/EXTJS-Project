Ext.define('Admin.store.authentication.LoginUser', {
    extend: 'Ext.data.Store',
    alias: 'store.authenticationloginuser',
    storeId: 'authenticationloginuser',
    model: 'Admin.model.authentication.LoginUser',
    proxy: {
    type: 'ajax'//,
    //url: Config.getServices() + '/api/account/GetUserByName'
    },
    autoLoad: false,
    reader: {
        type: 'json'//,
        //rootProperty: 'data'
    }

});


