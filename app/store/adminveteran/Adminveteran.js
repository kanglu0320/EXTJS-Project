Ext.define('Admin.store.adminveteran.Adminveteran', {
    extend: 'Ext.data.Store',

    alias: 'store.adminveteran',
    storeId: 'adminveteran',
    model: 'Admin.model.adminveteran.Adminveteran',

    proxy: {
        type: 'webapi',
        url: Config.getServices() + '/api/corp/GetAllVeteranForms'
    },
    autoLoad: false,

    sorters: {
        direction: 'ASC',
        property: 'vsname'
    },
    pageSize: 50
});
