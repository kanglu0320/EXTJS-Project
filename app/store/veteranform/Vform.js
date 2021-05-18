Ext.define('Admin.store.veteranform.Vform', {
    extend: 'Ext.data.Store',

    alias: 'store.veteranformvform',
    storeId: 'veteranformvform',
    model: 'Admin.model.veteranform.Vform',

    //proxy: {
    //    type: 'api',
    //    url: 'app/data/admin/Users.json'
    //},autoLoad: true,

    proxy: {
        type: 'webapi',
        url: Config.getServices() + '/api/corp/GetAllVeteranFormByID'
    },
    autoLoad: false,
    pageSize: 20,

    //reader: {
    //    type: 'json'//,
    //    //rootProperty: 'data'
    //},

    sorters: {
        direction: 'ASC',
        property: 'vsname'
    }
});
