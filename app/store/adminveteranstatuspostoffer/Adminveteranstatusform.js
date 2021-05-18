Ext.define('Admin.store.adminveteranstatuspostoffer.Adminveteranstatusform', {
    extend: 'Ext.data.Store',

    alias: 'store.adminveteranstatusform',
    storeId: 'adminveteranstatusform',
    model: 'Admin.model.veteranstatuspostoffer.VSform',

    proxy: {
        type: 'webapi',
        url: Config.getServices() + '/api/corp/GetAllVeteranStatusPostOfferFormByID'
    },
    autoLoad: false,

    sorters: {
        direction: 'ASC',
        property: 'lastname'
    },
    pageSize: 50
});
