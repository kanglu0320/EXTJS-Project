Ext.define('Admin.view.authentication.Register', {
    extend: 'Admin.view.authentication.LockingWindow',
    xtype: 'register',

    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.data.Store'
    ],

    title: 'User Registration',
    defaultFocus: 'authdialog',  // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            bodyPadding: '20 20',
            width: 455,
            reference: 'RegisterForm',

            defaultButton: 'submitButton',
            autoComplete: true,
            cls: 'auth-dialog-register',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                margin: '10 0',
                selectOnFocus: true
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'lock-screen-top-label',
                    text: 'Create an account'
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank: false,
                    reference: 'RegisterUserNametxt',
                    //name: 'username',
                    emptyText: 'user@example.com',
                    vtype: 'email',
                    //bind: '{email}',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-envelope-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank: false,
                    reference: 'RegisterPasswordtxt',
                    emptyText: 'Password',
                    //name: 'password',
                    inputType: 'password',
                    //bind: '{password}',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    reference: 'Registerfirstnametxt',
                    name: 'firstname',
                    height: 55,
                    hideLabel: true,
                    allowBlank: false,
                    emptyText: 'first name',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    reference: 'Registerlastnametxt',
                    name: 'lastname',
                    height: 55,
                    hideLabel: true,
                    allowBlank: false,
                    emptyText: 'last name',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    cls: 'auth-textbox',
                    reference: 'Registerusergroupcmb',
                    name: 'usergroup',
                    height: 55,
                    hideLabel: true,
                    allowBlank: false,
                    emptyText: 'usergroup',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    },
                    queryMode: 'local',
                    displayField: 'value',
                    valueField: 'value',
                    value: 'Candidates',
                    editable: true,
                    bind: {
                        store: '{authenticationuserGroup}'
                    },
                    //store: Ext.create('Ext.data.Store', {
                    //    fields: ['abbr', 'name'],
                    //    data : [
                    //        { "value": "SuperAdmin" },
                    //        { "value": "ITAdmin" },
                    //        { "value": "Admin" },
                    //         { "value": "Security" },
                    //        { "value": "HR" },
                    //        { "value": "Employee" }
                    //    ]
                    //})
                    

                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    reference: 'Registercompanytxt',
                    name: 'company',
                    height: 55,
                    hideLabel: true,
                    allowBlank: false,
                    value: 'INCATech',
                    emptyText: 'company or group',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                //{
                //    xtype: 'checkbox',
                //    flex: 1,
                //    //name: 'agrees',
                //    cls: 'form-panel-font-color rememberMeCheckbox',
                //    height: 32,
                //    //bind: '{agrees}',
                //    allowBlank : false,
                //    boxLabel: 'I agree with the Terms and Conditions',

                //    // In this case, the form operation is not VALID unless Terms are agreed upon
                //    isValid: function() {
                //        var me = this;
                //        return me.checked || me.disabled;
                //    }
                //},
                {
                    xtype: 'button',
                    scale: 'large',
                    ui: 'soft-blue',
                    formBind: true,
                    reference: 'submitButton',
                    bind: false,
                    margin: '5 0',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Signup',
                    listeners: {
                        click: 'onSignupClick'
                    }
                },
                {
                    xtype: 'component',
                    html: '<div style="text-align:right">' +
                        '<a href="#login" class="link-forgot-password">' +
                            'Back to Log In</a>' +
                        '</div>'
                }
            ]
        }
    ]
});
