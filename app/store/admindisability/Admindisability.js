Ext.define('Admin.store.admindisability.Admindisability', {
    extend: 'Ext.data.Store',

    alias: 'store.admindisability',
    storeId: 'admindisability',
    model: 'Admin.model.admindisability.Admindisability',

    proxy: {
        type: 'webapi',
        url: Config.getServices() + '/api/corp/GetAllDisabilityForms'
    },
    autoLoad: false,

    sorters: {
        direction: 'ASC',
        property: 'dsname'
    },
    pageSize: 50
});
