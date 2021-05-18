Ext.define('Admin.view.authentication.AuthenticationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.authentication',


    stores: {
        authenticationuserGroup: {
            type: 'authenticationusergroup'
        }

    }
    
});