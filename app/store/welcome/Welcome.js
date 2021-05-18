Ext.define('Admin.store.welcome.Welcome', {
    extend: 'Ext.data.Store',
    alias: 'store.welcomeWelcome',
    storeId: 'welcomeWelcome',
    model: 'Admin.model.welcome.Welcome',
    proxy: {
        type: 'api',
        url: 'app/data/welcome/Welcome.json'
    },

    autoLoad: true,
    //proxy: {
    //    type: 'ajax',
    //    url: 'app/data/search/Results.json'
    //},
    //reader: {
    //    type: 'json',
    //    rootProperty: 'data'
    //},
    //autoLoad: true,

    sorters: {
        direction: 'ASC',
        property: 'title'
    }
});
