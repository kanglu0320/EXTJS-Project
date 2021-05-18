Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',
    storeId: 'NavigationTree',
    requires: 'Admin.model.NavigationTree',
    model: 'Admin.model.NavigationTree',
    autoLoad: true,
    root: {
        expanded: true
    },
    proxy: {
        type: 'ajax',
        url: 'app/data/userroleNavigation/DefaultNavigationTree.json'
    }



});

