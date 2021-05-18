Ext.define('Admin.model.admin.User', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'string',
            name: 'Url'
        },
        {
            type: 'string',
            name: 'Id'
        },
        {
            type: 'string',
            name: 'UserName'
        },
        {
            type: 'string',
            name: 'Email'
        }
        ,
        {
            type: 'auto',
            name: 'EmailConfirmed'
        },
        {
            type: 'auto',
            name: 'Roles'
        },
        {
            type: 'auto',
            name: 'Claims'
        },
        {
            type: 'string',
            name: 'Status'
        },
        {
            type: 'string',
            name: 'FirstName'
        },
        {
            type: 'string',
            name: 'LastName'
        },
        {
            type: 'string',
            name: 'UserGroup'
        },
        {
            type: 'string',
            name: 'CompanyorGroup'
        }
    ]
});

