Ext.define('Admin.store.disabilityform.Dform', {
    extend: 'Ext.data.Store',

    alias: 'store.disabilityformdform',
    storeId: 'disabilityformdform',
    model: 'Admin.model.disabilityform.Dform',

    //proxy: {
    //    type: 'api',
    //    url: 'app/data/admin/Users.json'
    //},autoLoad: true,

    proxy: {
        type: 'webapi',
        url: Config.getServices() + '/api/corp/GetAllDisabilityFormByID'
    },
    autoLoad: false,
    pageSize: 20,

    //reader: {
    //    type: 'json'//,
    //    //rootProperty: 'data'
    //},

    sorters: {
        direction: 'ASC',
        property: 'dsname'
    }
});
