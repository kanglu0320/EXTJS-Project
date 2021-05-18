Ext.define('Admin.proxy.WebApi', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.webapi',

    reader: {
        type: 'json',
        rootProperty: 'Tables',
        totalProperty: 'results'
    }
});