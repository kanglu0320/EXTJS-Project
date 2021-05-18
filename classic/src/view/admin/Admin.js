Ext.define('Admin.view.admin.Admin', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin',
    
    controller: 'admin',
    viewModel: {
        type: 'admin'
    },
    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.Card',
        'Ext.grid.plugin.RowEditing',
        'Ext.form.field.Tag',
        'Ext.ux.ProgressBarPager'
    ],
    cls: 'shadow',
    //activeTab: 0,
    layout: 'card',
    items: [
        {
            xtype: 'gridpanel',
            id: 'adminalluserpanel',
            //cls: 'user-grid',
            selModel: 'rowmodel',
            //title: 'All Users',
            style: {

            },
            reference: 'AdminUserGrid',
            bind: '{usersResults}',
            columns: [
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'UserName',
                    text: 'Name',
                    width: 300
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'FirstName',
                    text: 'First Name',
                    flex: 1

                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'LastName',
                    text: 'Last Name',
                    flex: 1

                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'UserGroup',
                    text: 'Group',
                    width: 80

                },
                //{
                //    xtype: 'gridcolumn',
                //    cls: 'content-column',
                //    dataIndex: 'Roles',
                //    text: 'Roles',
                //    flex: 1//,
                //    //editor: {
                //    //    xtype: 'tagfield',
                //    //    bind: { store: '{allroles}' },  
                //    //    displayField: 'Name',
                //    //    valueField: 'Name',
                //    //    filterPickList: true,
                //    //    queryMode: 'local',
                //    //    createNewOnEnter: true,
                //    //    createNewOnBlur: true
                //    //}
                //},,
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'EmailConfirmed',
                    text: 'Emailed',
                    width: 80,
                    editor: {
                        xtype: 'combobox',
                        store: [
                              true, false
                        ],
                        queryMode: 'local'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'Status',
                    header: 'Status',
                    width: 100,
                    editor: {
                        xtype: 'combobox',
                        store: [
                              "Active", "Deactivated"
                        ],
                        queryMode: 'local'
                    }
                },
                {
                    xtype: 'actioncolumn',
                    defaults: {
                        margin: '3 5 3 5'
                    },
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-edit',
                            tooltip: 'Edit',
                            handler: 'edit'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-check',
                            tooltip: 'Activate/Deactivate User account',
                            handler: 'activeUser',
                            isActionDisabled: function (view, rowIndex, colIndex, item, record) {
                                // Returns true if 'editable' is false (, null, or undefined)
                                var res = true;
                                var currentUser = Ext.getStore('authenticationloginuser');
                                if (currentUser.first().data.Roles.indexOf('ITAdmin') > -1 || currentUser.first().data.Roles.indexOf('Security') > -1) {
                                    res = false;
                                }
                                else {
                                    if (currentUser.first().data.Roles.indexOf('SuperAdmin') > -1) {
                                        res = false;
                                        if ((currentUser.first().data.Email !== record.get('Email')) && record.get('Roles').indexOf('SuperAdmin') > -1) {
                                            res = true;
                                        }
                                    }
                                }
                                return res;
                            }
                        }, '-',
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-trash-alt',
                            tooltip: 'Delete User',
                            handler: 'deleteUser',
                            isActionDisabled: function (view, rowIndex, colIndex, item, record) {
                                // Returns true if 'editable' is false (, null, or undefined)
                                var res = true;
                                var currentUser = Ext.getStore('authenticationloginuser');
                                if (currentUser.first().data.Roles.indexOf('SuperAdmin') > -1 || currentUser.first().data.Roles.indexOf('Security') > -1) {
                                    res = false;
                                }
                                else {
                                    res = true;
                                }
                                return res;
                            }
                        }
                    ],
                    cls: 'content-column',
                    header: 'Actions',
                    width: 80,
                    dataIndex: 'bool',
                    tooltip: 'Actions'
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'userPaginationToolbar',
                    displayInfo: true,
                    bind: '{usersResults}',
                    plugins: new Ext.ux.ProgressBarPager()
                    //plugins: Ext.create('Ext.ux.ProgressBarPager')
                }
            ],
            plugins: {
                ptype: 'rowediting',
                clicksToEdit: 2,
                autoCancel: false
            },
            tbar: [
                    {
                        xtype: 'label',
                        html: 'User List',
                        margin: '10 10 0 10',
                        style: {
                            'font-size': '17px',
                            'color': 'grey'
                        }
                    },
                    '->'
            ]
        },
        {
            xtype: 'form',
            reference: 'AdminUserDetailPanel',
            items: [
                {
                    xtype: 'fieldset',
                    id: 'adminuserdetailfset',
                    title: 'User Details',

                    defaults: {
                        anchor: '100%',
                        hideEmptyLabel: true
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'User Id',
                            editable: false,
                            bind: '{AdminUserGrid.selection.Id}',
                            name: 'Id',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            reference: 'adminUserEmailtxt',
                            fieldLabel: 'Email/User Name',
                            name: 'Email',
                            //editable: false,
                            bind: '{AdminUserGrid.selection.Email}',
                            allowBlank: false,
                            emptyText: 'user@example.com'
                        },
                        //{
                        //    xtype: 'combobox',
                        //    reference: 'adminUserStatustxt',
                        //    fieldLabel: 'User Status',
                        //    hideTrigger: true,
                        //    editable: false,
                        //    bind: { value: '{AdminUserGrid.selection.Status}' },
                        //    store: [
                        //          "Active", "Deactivated"
                        //    ],
                        //    queryMode: 'local',
                        //    name: 'Status'
                        //},
                        //{
                        //     xtype: 'combobox',
                        //     fieldLabel: 'Email Confirmed',
                        //     hideTrigger: true,
                        //     editable: false,
                        //     bind: { value: '{AdminUserGrid.selection.EmailConfirmed}' },
                        //     store: [
                        //           true, false
                        //     ],
                        //     queryMode: 'local',
                        //     name: 'EmailConfirmed'
                        //},
                        {
                            xtype: 'textfield',
                            fieldLabel: 'User Status',
                            editable: false,
                            bind: '{AdminUserGrid.selection.Status}',
                            name: 'Status',
                            cls: 'x-item-disabled'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Email Confirmed',
                            editable: false,
                            bind: '{AdminUserGrid.selection.EmailConfirmed}',
                            name: 'EmailConfirmed',
                            cls: 'x-item-disabled'
                        },
                        {
                            xtype: 'textfield',
                            //reference: 'adminUserEmailtxt',
                            fieldLabel: 'First Name',
                            editable: true,
                            bind: '{AdminUserGrid.selection.FirstName}',
                            name: 'FirstName'
                        },
                        {
                            xtype: 'textfield',
                            //reference: 'adminUserEmailtxt',
                            fieldLabel: 'Last Name',
                            editable: true,
                            bind: '{AdminUserGrid.selection.LastName}',
                            name: 'LastName'
                        },
                        {
                            xtype: 'combobox',
                            //reference: 'adminUserStatustxt',
                            fieldLabel: 'User Group',
                            bind: {
                                value: '{AdminUserGrid.selection.UserGroup}',
                                store: '{adminuserGroup}'
                            },
                            displayField: 'value',
                            valueField: 'value',
                            queryMode: 'local',
                            name: 'UserGroup'
                        },
                        {
                            xtype: 'textfield',
                            //reference: 'adminUserEmailtxt',
                            fieldLabel: 'Company or Group',
                            editable: true,
                            bind: '{AdminUserGrid.selection.CompanyorGroup}',
                            name: 'CompanyorGroup'
                        },
                        {
                            xtype: 'tagfield',
                            fieldLabel: 'Roles',
                            bind: {
                                store: '{allroles}',
                                value: '{AdminUserGrid.selection.Roles}'
                            },
                            displayField: 'Name',
                            valueField: 'Name',
                            filterPickList: true,
                            queryMode: 'local',
                            createNewOnEnter: true,
                            createNewOnBlur: true,
                            name: 'Roles',
                            selectOnFocus: false,
                            editable: false
                        },
                        {
                            xtype: 'panel',
                            bbar: ['->',
                               {
                                   text: '&bull; Back',
                                   componentCls: 'btnbckcolor',
                                   handler: 'backtouserlist'
                               },
                               {
                                   text: '&bull; Save',
                                   componentCls: 'btnbckcolor',
                                   handler: 'userdetailsave'
                               }
                            ]
                        }
                    ]


                }
            ]
        }

    ]
});
