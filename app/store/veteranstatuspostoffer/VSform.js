Ext.define('Admin.store.veteranstatuspostoffer.VSform', {
    extend: 'Ext.data.Store',

    alias: 'store.veteranstatuspostoffervform',
    storeId: 'veteranstatuspostoffervform',
    model: 'Admin.model.veteranstatuspostoffer.VSform',

    //proxy: {
    //    type: 'api',
    //    url: 'app/data/admin/Users.json'
    //},autoLoad: true,

    proxy: {
        type: 'webapi',
        url: Config.getServices() + '/api/corp/GetAllVeteranStatusPostOfferFormByID'
    },
    autoLoad: false,
    pageSize: 20,

    //reader: {
    //    type: 'json'//,
    //    //rootProperty: 'data'
    //},

    sorters: {
        direction: 'ASC',
        property: 'lastname'
    }
});
