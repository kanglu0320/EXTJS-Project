Ext.define('Admin.model.authentication.LoginUser', {
    extend: 'Ext.data.Model',
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
            type: 'date',
            name: 'PasswordLastUpdateDate'
        }
    ]

});
