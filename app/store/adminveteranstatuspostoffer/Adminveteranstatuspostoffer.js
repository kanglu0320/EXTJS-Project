Ext.define('Admin.store.adminveteranstatuspostoffer.Adminveteranstatuspostoffer', {
    extend: 'Ext.data.Store',

    alias: 'store.adminveteranstatuspostoffer',
    storeId: 'adminveteranstatuspostoffer',
    model: 'Admin.model.adminveteranstatuspostoffer.Adminveteranstatuspostoffer',

    proxy: {
        type: 'webapi',
        url: Config.getServices() + '/api/corp/GetAllVeteranStatusPostOfferForms'
    },
    autoLoad: false,

    sorters: {
        direction: 'ASC',
        property: 'lastname'
    },
    pageSize: 50
});
