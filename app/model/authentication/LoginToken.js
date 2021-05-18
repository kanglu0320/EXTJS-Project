Ext.define('Admin.model.authentication.LoginToken', {
    extend: 'Ext.data.Model',
    fields: [
        {
            type: 'string',
            name: 'access_token'
        },
        {
            type: 'string',
            name: 'token_type'
        },
        {
            type: 'int',
            name: 'expires_in'
        },
        {
            type: 'string',
            name: 'userName'
        }
        ,
        {
            type: 'date',
            name: 'issued'
        },       
        {
            type: 'date',
            name: 'expires'
        }
    ]

});

