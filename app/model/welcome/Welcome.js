Ext.define('Admin.model.welcome.Welcome', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'title'
        },
        {
            type: 'string',
            name: 'thumbnail'
        },
        {
            type: 'string',
            name: 'url'
        },
        {
            type: 'string',
            name: 'content'
        },
        {
            type: 'string',
            name: 'heading'
        }
    ],

    hasMany: {
        name: 'attachments',
        model: 'welcome.Attachment'
    }
});
