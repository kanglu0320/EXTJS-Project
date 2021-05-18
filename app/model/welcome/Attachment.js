Ext.define('Admin.model.welcome.Attachment', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'url'
        },
        {
            type: 'string',
            name: 'title'
        }
    ]
});
