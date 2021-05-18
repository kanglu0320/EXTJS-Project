Ext.define('Admin.model.NavigationTree', {
    extend: 'Ext.data.TreeModel',
    fields: [
            {name: 'text',     type: 'string'},
            {name: 'iconCls',     type: 'string'},
            {name: 'rowCls', type: 'string'},
            {name: 'viewType',     type: 'string'},
            {name: 'routeId', type: 'string'},
            {name: 'leaf',     type: 'boolean'}
    ]
});
