Ext.define('Admin.view.adminsecurity.Adminsecurity', {
    extend: 'Ext.panel.Panel',
    xtype: 'adminsecurity',
    
    controller: 'adminsecurity',
    viewModel: {
        type: 'adminsecurity'
    },
    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.Card',
        'Ext.grid.plugin.RowEditing',
        'Ext.form.field.Tag',
        'Ext.ux.ProgressBarPager',
        'Ext.grid.filters.Filters'
    ],
    cls: 'shadow',
    //activeTab: 0,
    layout: 'card',
    items: [
        {
            xtype: 'gridpanel',
            //cls: 'user-grid',
            selModel: 'rowmodel',
            //title: 'All Users',
            style: {

            },
            reference: 'AdminUserGrid',
            bind: '{adminsecurityResults}',
            columns: [
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'name',
                    text: 'Name',
                    width: 250,
                    filter: {
                        // required configs
                        type: 'string',
                        // optional configs
                        itemDefaults: {
                            emptyText: 'Search for Name...'
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'username',
                    text: 'Email',
                    flex: 1,
                    filter: {
                        // required configs
                        type: 'string',
                        // optional configs
                        itemDefaults: {
                            emptyText: 'Search for Email...'
                        }
                    }

                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'homePhoneNumber',
                    text: 'Home Phone #',
                    width: 100

                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'workPhoneNumber',
                    text: 'Work Phone #',
                    width: 100,
                    filter: {
                        // required configs
                        type: 'string',
                        // optional configs
                        itemDefaults: {
                            emptyText: 'Search for Cell #...'
                        }
                    }

                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'dateofBirth',
                    text: 'Date of Birth',
                    width: 100

                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'Id',
                    text: 'ID',
                    width: 80,
                    hidden: true

                },
                //{
                //    xtype: 'gridcolumn',
                //    cls: 'content-column',
                //    dataIndex: 'EmailConfirmed',
                //    text: 'Emailed',
                //    width: 80,
                //    editor: {
                //        xtype: 'combobox',
                //        store: [
                //              true, false
                //        ],
                //        queryMode: 'local'
                //    }
                //},
                //{
                //    xtype: 'gridcolumn',
                //    cls: 'content-column',
                //    dataIndex: 'Status',
                //    header: 'Status',
                //    width: 100,
                //    editor: {
                //        xtype: 'combobox',
                //        store: [
                //              "Active", "Deactivated"
                //        ],
                //        queryMode: 'local'
                //    }
                //},
                {
                    xtype: 'actioncolumn',
                    defaults: {
                        margin: '3 5 3 5'
                    },
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-edit',
                            tooltip: 'View Detail',
                            handler: 'edit'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-file-pdf',
                            tooltip: 'Save as PDF',
                            handler: 'formdetailprintfromlist'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-trash-alt',
                            tooltip: 'Delete this form record',
                            handler: 'deleteRecord'//,
                            //isActionDisabled: function (view, rowIndex, colIndex, item, record) {
                            //    // Returns true if 'editable' is false (, null, or undefined)
                            //    var res = true;
                            //    //var currentUser = Ext.getStore('authenticationloginuser');
                            //    //if (currentUser.first().data.Roles.indexOf('SystemAdmin') > -1) {
                            //    //    res = false;
                            //    //}
                            //    //else {
                            //    //    if (currentUser.first().data.Roles.indexOf('SuperAdmin') > -1) {
                            //    //        res = false;
                            //    //        if ((currentUser.first().data.Email !== record.get('Email')) && record.get('Roles').indexOf('SuperAdmin') > -1) {
                            //    //            res = true;
                            //    //        }
                            //    //    }
                            //    //}
                            //    return res;
                            //}
                        }
                    ],
                    cls: 'content-column',
                    header: 'Actions',
                    width: 80,
                    dataIndex: 'bool',
                    tooltip: 'Actions'
                }
            ],
            plugins: {
                gridfilters: true
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'userPaginationToolbar',
                    displayInfo: true,
                    bind: '{adminsecurityResults}',
                    plugins: new Ext.ux.ProgressBarPager()
                    //plugins: Ext.create('Ext.ux.ProgressBarPager')
                }
            ],
            //plugins: {
            //    ptype: 'rowediting',
            //    clicksToEdit: 2,
            //    autoCancel: false
            //},
            tbar: [
                    {
                        xtype: 'label',
                        html: 'Prescreen Security Form Potential Candidates',
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
            reference: 'AdminSecurityDetailPanel',
            scrollable: 'y',
            items: [
                    {
                        xtype: 'fieldset',
                        reference: 'SecurityFormStatementFieldset',
                        title: 'Statement of Security Requirements',
                        collapsible: true,
                        collapsed: true,
                        defaults: {
                            anchor: '100%',
                            hideEmptyLabel: true,
                            readOnly: true
                        },
                        items: [
                        {
                            xtype: 'displayfield',
                            value: 'You are being considered for a sensitive position with INCATech LLC. This position involves highly ' +
    'sensitive and/or classified work that INCATech LLC is contracted to perform for the US Government.' +
    'Placement in such position will require obtaining and maintaining a background investigation and,' +
                        'possibly a polygraph examination conducted by the US Government. INCATech LLC will not have ' +
    'access to or knowledge of any answers given during the polygraph examination. The scope of the ' +
    'background investigation and/or polygraph may include, but is not limited to: <br>' +
    '<p><br>&emsp;1. National security-related areas such as handling of classified material, acts of espionage, secret contracts with foreign governments, or involvement in subversive or terrorist groups.</p>' +
    '<p>&emsp;2. Search into any activities, past or present, which could conceivably compromise your loyalty to the United States of America.</p>' +
    '<p>&emsp;3. Citizenship of you and your immediate family (spouse, parents, step-parents, brothers/sisters, children), cohabitant (someone living with you in a spouse-like relationship but not married), close associates, and evaluation of the status for immediate family members living in a foreign country.</p>' +
    '<p>&emsp;4. Use of / or dealing in illegal drugs and/or abuse of alcohol or drugs.</p>' +
    '<p>&emsp;5. An attempt to cover police or conviction records or any involvement in illegal activity.</p>' +
    '<p>&emsp;6. A determination of your financial responsibility and credit standing.</p>' +
    '<p>&emsp;7. Activities susceptible to blackmail.</p>' +
    '<p>&emsp;8. Serious mental instability or emotional disorders.</p><br>' +
    'I acknowledge and understand the security requirements outlined above and have no objection to a ' +
    'background investigation and/or polygraph examination being conducted by the US Government. I ' +
    'understand that any information provided by me on this form will be treated as PERSONAL and ' +
    'CONFIDENTIAL, and will not be disclosed outside INCATech LLC Security Office. I understand this ' +
    'information is being furnished voluntarily and agree to continue completing the attached form.'

                        },
                        {
                            xtype: 'displayfield',
                            value: '* required fields'

                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Name',
                            allowBlank: false,
                            emptyText: 'Please endter your full name',
                            //editable: false,
                            //bind: '{AdminUserGrid.selection.Id}',
                            name: 'inputName'
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                //xtype: 'textfield',
                                //labelAlign: 'top',
                                //padding: 10
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    fieldLabel: 'Signature',
                                    name: 'inputSignature',
                                    emptyText: 'Please endter your full name if you agree',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'datefield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    labelWidth: 50,
                                    fieldLabel: 'Date',
                                    name: 'inputDate',
                                    editable: false,
                                    allowBlank: false
                                }
                            ]
                        }

                        ]
                    },
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        reference: 'SecurityFormDetailFieldset',
                        collapsed: true,
                        title: 'Form Details (Read and answer each question in this section)',
                        defaults: {
                            anchor: '100%',
                            hideEmptyLabel: true,
                            readOnly: true
                        },
                        items: [
                            {
                                xtype: 'displayfield',
                                value: '<b>INSTRUCTIONS: Read and answer each question. If any of the answers require explanation, please provide details in the allotted space. If more space is needed, use an additional sheet of paper.</b>'
                            },
                            {
                                xtype: 'fieldcontainer',
                                defaults: {

                                },
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'displayfield',
                                        width: 500,
                                        //flex: 1,
                                        value: '1. Are you a United States citizen?'
                                    },
                                    {
                                        xtype: 'radiogroup', msgTarget: 'side',
                                        allowBlank: false,
                                        columns: 2,
                                        defaults: {
                                            margin: '0 5 0 5'
                                        },
                                        //vertical: false,
                                        items: [
                                            { boxLabel: 'YES', name: 'usCitizen', inputValue: 'Yes' },
                                            { boxLabel: 'NO', name: 'usCitizen', inputValue: 'No' }
                                        ]
                                    }
                                ]
                            },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '2. Are all immediate family members (spouse, parents, siblings, children, and fiancé/fiancée/cohabitant) of yours United States citizens? If no, please explain.'

                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'familyMemUsCitizen', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'familyMemUsCitizen', inputValue: 'No' }
                                       ]
                                   }

                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '3. Are your spouse/cohabitant or family members United States citizens by naturalization? If yes, please explain.'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'spouseCitizen', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'spouseCitizen', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '4. Do you or any member of your household and/or family possess dual citizenship?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'dualCitizen', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'dualCitizen', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'textareafield',
                               grow: true,
                               name: 'part1Questions',
                               fieldLabel: 'If you must explain any of the above questions, include names, dates, countries of citizenship, etc.',
                               labelAlign: 'top',
                               anchor: '100%'
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '5. Have you ever had a security clearance?'

                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'securityClearance', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'securityClearance', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'displayfield',
                               value: 'If YES, answer the following questions for each clearance held.'
                           },
                           {
                               xtype: 'textfield',
                               grow: true,
                               name: 'clearedEnvironment',
                               fieldLabel: 'Are you currently working in a cleared environment?',
                               labelAlign: 'top',
                               anchor: '100%'
                           },
                           {
                               xtype: 'textfield',
                               grow: true,
                               name: 'lastBriefing',
                               fieldLabel: 'If no, what was the date of your last debriefing?',
                               labelAlign: 'top',
                               anchor: '100%'
                           },
                           {
                               xtype: 'textfield',
                               grow: true,
                               name: 'backgroundInvest',
                               fieldLabel: 'Date of most recent background investigation:',
                               labelAlign: 'top',
                               anchor: '100%'
                           },
                           {
                               xtype: 'textfield',
                               grow: true,
                               name: 'polygraph',
                               fieldLabel: 'Date and type of most recent polygraph examination:',
                               labelAlign: 'top',
                               anchor: '100%'
                           },
                           {
                               xtype: 'textfield',
                               grow: true,
                               name: 'govagencies',
                               fieldLabel: 'Name of government agency which processed your clearance:',
                               labelAlign: 'top',
                               anchor: '100%'
                           },
                           {
                               xtype: 'textfield',
                               grow: true,
                               name: 'Level',
                               fieldLabel: 'Level of clearance/SCI access held:',
                               labelAlign: 'top',
                               anchor: '100%'
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '6. Have you ever had a security clearance suspended, denied, or revoked?'

                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'suspended', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'suspended', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'textareafield',
                               grow: true,
                               name: 'suspendedyes',
                               fieldLabel: 'If yes please explain:',
                               labelAlign: 'top',
                               anchor: '100%'
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '7. Have you ever been discharged from the armed forces of the United States under conditions other than honorable?'

                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'discharged', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'discharged', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'textareafield',
                               grow: true,
                               name: 'typedischarge',
                               fieldLabel: 'If yes, describe the type of discharge and date it occurred.',
                               labelAlign: 'top',
                               anchor: '100%'
                           },
                           {
                               xtype: 'displayfield',
                               value: '<b>ANSWER THE FOLLOWING QUESTIONS COVERING THE LAST TEN YEARS OR SINCE YOUR 16th BIRTHDAY (whichever is LESS)</b>'
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '8. Have you been charged with or convicted of any felony (including those under the Uniform Code of Military Justice)?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'convictedfelony', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'convictedfelony', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '9. Have you ever been charged or convicted of a firearms offense?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'firearmsoffense', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'firearmsoffense', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '10. Have you ever been charged with or convicted of any alcohol or drug related offense?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'alcohol', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'alcohol', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '11. Do you currently have any criminal offenses pending against you?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'criminaloffenses', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'criminaloffenses', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '12. Have you been arrested for, charged with, or convicted of offense(s) not listed above?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'arrested', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'arrested', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'textareafield',
                               grow: true,
                               name: 'secondsetquestions',
                               fieldLabel: 'If you answered YES to questions 8, 9, 10, 11, or 12, please explain to include month/year, offense, and action taken, city/county offense(s) occurred.',
                               labelAlign: 'top',
                               anchor: '100%'
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '13. Have you illegally used any controlled substance (marijuana, cocaine, crack cocaine, hashish, narcotics, amphetamines, depressants, hallucinogenics, or prescription drugs)?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'controlled', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'controlled', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '14. Have you ever used illegal substances while holding security clearances?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'illegal', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'illegal', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '15. Have you been involved in the illegal purchase, manufacture, trafficking, production, transfer, shipping, receiving, or sale of any narcotic, depressant, '
                               + 'stimulant, or cannabis for your own intended profit or that of another?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'involved', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'involved', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'textareafield',
                               grow: true,
                               name: 'thirdsetquestions',
                               fieldLabel: 'If you answered YES to questions 13, 14, or 15, please explain to include month/year, controlled substance/prescription drug, and number of times used:',
                               labelAlign: 'top',
                               anchor: '100%'
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '16. Has your use of alcoholic beverages resulted in any related treatment or counseling?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'counseling', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'counseling', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               defaults: {
                                   //flex: 1
                               },
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       //flex: 1,
                                       value: '17. In the last ten years have you consulted with a mental health professional (psychiatrist, psychologist, counselor, etc.)?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'mentalhealth', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'mentalhealth', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'textareafield',
                               grow: true,
                               name: 'fourthsetquestions',
                               fieldLabel: 'If you answered yes to questions 16, or 17, please provide month/year, name and address of therapist or doctor (do not include family, marital, or grief counseling unless related to violence by you):',
                               labelAlign: 'top',
                               anchor: '100%'
                           },
                           {
                               xtype: 'displayfield',
                               value: '18. In the last ten years have you:'
                           },
                           {
                               xtype: 'fieldcontainer',
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       value: 'a. Filed a petition under any chapter of the bankruptcy code?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'bankruptcy', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'bankruptcy', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       value: 'b. Had you wages garnished or property repossessed for any reason?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'garnished', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'garnished', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       value: 'c. Had a lien placed against your property for failing to pay taxes or other debts?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'debts', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'debts', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       value: 'd. Had judgments filed against you that have not been paid?'
                                   },
                                    {
                                        xtype: 'radiogroup', msgTarget: 'side',
                                        allowBlank: false,
                                        columns: 2,
                                        defaults: {
                                            margin: '0 5 0 5'
                                        },
                                        vertical: false,
                                        items: [
                                            { boxLabel: 'YES', name: 'judgments', inputValue: 'Yes' },
                                            { boxLabel: 'NO', name: 'judgments', inputValue: 'No' }
                                        ]
                                    }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       value: 'e. Been over 180 days delinquent on any debt(s)?'
                                   },
                                   {
                                       xtype: 'radiogroup', msgTarget: 'side',
                                       allowBlank: false,
                                       columns: 2,
                                       defaults: {
                                           margin: '0 5 0 5'
                                       },
                                       vertical: false,
                                       items: [
                                           { boxLabel: 'YES', name: 'delinquent', inputValue: 'Yes' },
                                           { boxLabel: 'NO', name: 'delinquent', inputValue: 'No' }
                                       ]
                                   }
                               ]
                           },
                           {
                               xtype: 'fieldcontainer',
                               layout: 'hbox',
                               items: [
                                   {
                                       xtype: 'displayfield',
                                       width: 500,
                                       value: 'f. Are you currently over 90 days delinquent on any debt?'
                                   },
                                    {
                                        xtype: 'radiogroup', msgTarget: 'side',
                                        allowBlank: false,
                                        columns: 2,
                                        defaults: {
                                            margin: '0 5 0 5'
                                        },
                                        vertical: false,
                                        items: [
                                            { boxLabel: 'YES', name: 'ninetydays', inputValue: 'Yes' },
                                            { boxLabel: 'NO', name: 'ninetydays', inputValue: 'No' }
                                        ]
                                    }
                               ]
                           },
                           {
                               xtype: 'textareafield',
                               grow: true,
                               name: 'fifthsetquestions',
                               fieldLabel: 'If you answered YES to any part of question 18, please provide month/year, type of action, amount,' +
    ' name/address of court system, date delinquency satisfied, type of loan or obligation, and name of creditor:',
                               labelAlign: 'top',
                               anchor: '100%'
                           }
                        ]


                    },
                    {
                    xtype: 'fieldset',
                    title: 'Authorization to Release Information',
                    defaults: {
                        anchor: '100%',
                        hideEmptyLabel: true,
                        readOnly: true
                    },
                    items: [
                    {
                        xtype: 'displayfield',
                        value: 'I understand that INCATech LLC, requires certain information about me to evaluate my eligibility for' +
'employment in a security sensitive position. Therefore, I authorize the use, by INCATech LLC Security' +
'Department, of the information I have provided in this form to evaluate my eligibility for access to' +
                    'classified and/or sensitive information. I agree to cooperate in any required background investigation' +
'and/or polygraph examinations, and release those partied involved in the evaluation and use of the' +
'information contained in understand, however, that INCATech LLC will protect the confidentiality of any' +
'personal information it obtains concerning me.'
                    }
                    ]
                },
                    {
                    xtype: 'fieldset',
                    title: 'CERTIFICATION',
                    defaults: {
                        anchor: '100%',
                        hideEmptyLabel: true,
                        readOnly: true
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            value: '<b>I HEREBY CERTIFY THAT THE ENTRIES ON THIS FORM ARE MADE VOLUNTARILY AND IN GOOD FAITH, AND THAT THE ENTRIES ON THIS FORM AND ITS ' +
                                        'ATTACHMENTS ARE TRUE, COMPLETE, AND ACCURATE TO THE BEST OF MY KNOWLEDGE AND BELIEF. I UNDERSTAND THAT ANY FALSE ANSWERS OR FALSE ' +
                                        'STATEMENTS COULD DISQUALIFY ME FOR EMPLOYMENT WITH INCATECH CORP OR IF LATER DISCOVERED, COULD BE SUFFICIENT GROUNDS FOR DISCHARGE FROM EMPLOYMENT.</b>'
                        },

                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    fieldLabel: 'Name',
                                    emptyText: 'Name (Last, First, Middle-and maiden name if any)',
                                    name: 'inputName1',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'datefield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    //labelWidth: 50,
                                    fieldLabel: 'Date',
                                    name: 'inputDate1',
                                    editable: false,
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    fieldLabel: 'Gender',
                                    emptyText: 'Please select your gender',
                                    name: 'gender',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    //labelWidth: 50,
                                    fieldLabel: 'Marital Status',
                                    emptyText: 'Marital Status',
                                    name: 'maritalstatus',
                                    allowBlank: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    fieldLabel: 'Address',
                                    emptyText: 'Please enter your address',
                                    name: 'inputAddress',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    //labelWidth: 50,
                                    fieldLabel: 'Home Phone #',
                                    emptyText: 'Home Phone Number',
                                    name: 'homePhoneNumber',
                                    allowBlank: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    fieldLabel: 'SSN',
                                    emptyText: 'Please enter your SSN',
                                    name: 'sSn',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    //labelWidth: 50,
                                    fieldLabel: 'Work Phone #',
                                    emptyText: 'Work Phone Number',
                                    name: 'workPhoneNumber',
                                    allowBlank: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                //{
                                //    xtype: 'textfield',
                                //    flex: 1,
                                //    margin: '0 10 0 0',
                                //    //labelWidth: 50,
                                //    fieldLabel: 'Place of Birth',
                                //    emptyText: 'Place of Birth',
                                //    name: 'placeofBirth'
                                //},
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    fieldLabel: 'Email Address',
                                    reference: 'useremailfield',
                                    editable: false,
                                    name: 'email'
                                },
                                {
                                    xtype: 'datefield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    fieldLabel: 'Date of Birth',
                                    name: 'dateofBirth',
                                    editable: false,
                                    allowBlank: false
                                }
                            ]
                        },
                       {
                           xtype: 'fieldcontainer',
                           layout: 'hbox',
                           items: [
                               {
                                   xtype: 'textfield',
                                   flex: 1,
                                   margin: '0 10 0 0',
                                   fieldLabel: 'City of Birth',
                                   emptyText: 'City of Birth',
                                   name: 'birthcity',
                                   allowBlank: false
                               },
                               {
                                   xtype: 'combobox',
                                   flex: 1,
                                   margin: '0 10 0 0',
                                   store: Ext.create('Ext.data.Store', {
                                       fields: ['abbr', 'name'],
                                       data: [
                                           { "abbr": "Alabama", "name": "Alabama" },
                                           { "abbr": "Alaska", "name": "Alaska" },
                                           { "abbr": "Arizona", "name": "Arizona" },
                                           { "abbr": "Arkansas", "name": "Arkansas" },
                                           { "abbr": "California", "name": "California" },
                                           { "abbr": "Colorado", "name": "Colorado" },
                                           { "abbr": "Connecticut", "name": "Connecticut" },
                                           { "abbr": "Delaware", "name": "Delaware" },
                                           { "abbr": "Georgia", "name": "Georgia" },
                                           { "abbr": "Hawaii", "name": "Hawaii" },
                                           { "abbr": "Idaho", "name": "Idaho" },
                                           { "abbr": "Illinois", "name": "Illinois" },
                                           { "abbr": "Indiana", "name": "Indiana" },
                                           { "abbr": "Iowa", "name": "Iowa" },
                                           { "abbr": "Kansas", "name": "Kansas" },
                                           { "abbr": "Kentucky", "name": "Kentucky" },
                                           { "abbr": "Louisiana", "name": "Louisiana" },
                                           { "abbr": "Maine", "name": "Maine" },
                                           { "abbr": "Maryland", "name": "Maryland" },
                                           { "abbr": "Massachusetts", "name": "Massachusetts" },
                                           { "abbr": "Michigan", "name": "Michigan" },
                                           { "abbr": "Minnesota", "name": "Minnesota" },
                                           { "abbr": "Mississippi", "name": "Mississippi" },
                                           { "abbr": "Missouri", "name": "Missouri" },
                                           { "abbr": "Montana", "name": "Montana" },
                                           { "abbr": "Nebraska", "name": "Nebraska" },
                                           { "abbr": "Nevada", "name": "Nevada" },
                                           { "abbr": "New Hampshire", "name": "New Hampshire" },
                                           { "abbr": "New Jersey", "name": "New Jersey" },
                                           { "abbr": "New Mexico", "name": "New Mexico" },
                                           { "abbr": "New York", "name": "New York" },
                                           { "abbr": "North Carolina", "name": "North Carolina" },
                                           { "abbr": "North Dakota", "name": "North Dakota" },
                                           { "abbr": "Ohio", "name": "Ohio" },
                                           { "abbr": "Oklahoma", "name": "Oklahoma" },
                                           { "abbr": "Oregon", "name": "Oregon" },
                                           { "abbr": "Pennsylvania", "name": "Pennsylvania" },
                                           { "abbr": "Rhode Island", "name": "Rhode Island" },
                                           { "abbr": "South Carolina", "name": "South Carolina" },
                                           { "abbr": "South Dakota", "name": "South Dakota" },
                                           { "abbr": "Tennessee", "name": "Tennessee" },
                                           { "abbr": "Texas", "name": "Texas" },
                                           { "abbr": "Utah", "name": "Utah" },
                                           { "abbr": "Vermont", "name": "Vermont" },
                                           { "abbr": "Virginia", "name": "Virginia" },
                                            { "abbr": "Washington", "name": "Washington" },
                                           { "abbr": "West Virginia", "name": "West Virginia" },
                                           { "abbr": "Wisconsin", "name": "Wisconsin" },
                                           { "abbr": "Wyoming", "name": "Wyoming" }
                                       ]
                                   }),
                                   fieldLabel: '* State of Birth',
                                   name: 'birthstate',
                                   editable: true,
                                   queryMode: 'local',
                                   displayField: 'name',
                                   valueField: 'abbr',
                                   allowBlank: false
                               }
                           ]
                       },
                       {
                           xtype: 'fieldcontainer',
                           layout: 'hbox',
                           items: [{
                               xtype: 'textfield',
                               flex: 1,
                               margin: '0 10 0 0',
                               fieldLabel: 'Country of Birth',
                               emptyText: 'Country of Birth',
                               name: 'birthcountry',
                               allowBlank: false
                           }]
                       },
                       {
                           xtype: 'textfield',
                           fieldLabel: 'Name',
                           emptyText: '0',
                           editable: false,
                           reference: 'userIDfield',
                           //bind: '{AdminUserGrid.selection.Id}',
                           name: 'Id',
                           hidden: true
                       },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Name',
                        emptyText: 'US Name',
                        editable: false,
                        reference: 'Namefield',
                        //bind: '{AdminUserGrid.selection.Id}',
                        name: 'name',
                        hidden: true
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Name',
                        emptyText: 'US Name',
                        editable: false,
                        reference: 'userNamefield',
                        //bind: '{AdminUserGrid.selection.Id}',
                        name: 'username',
                        hidden: true
                    },

                        {
                            xtype: 'displayfield',
                            value: '<b>* Please sign below</b>'
                        },
                        {
                            xtype: "fieldcontainer",
                            height: 100,
                            //width: 600,
                            layout: {
                                type: 'hbox',
                                //align: 'stretch',
                                pack: 'start'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    reference: 'EmployeeSignaturePanel',
                                    disabled: true,
                                    border: 1,
                                    //margin: 5,
                                    bodyStyle: 'border-style: dotted',
                                    //layout: 'fit',
                                    //flex: 1,                               
                                    items: [{
                                        xtype: 'signaturePad',
                                        width: 600,
                                        reference: 'EmployeeSignaturePad'
                                    }]
                                }
                            ]
                        }
                    ]


                }
                
            ],
            bbar: [
                     {
                         text: '&bull; Back',
                         componentCls: 'btnbckcolor',
                         handler: 'backtouserlist'
                     },  '->',

                              {
                                  text: '&bull; Save as PDF',
                                  componentCls: 'btnbckcolor',
                                  handler: 'formdetailprint'
                              },
                              {
                                  text: '&bull; Delete',
                                  componentCls: 'btnbckcolor',
                                  handler: 'formdetaildelete'
                              }
            ]
        }

    ]
});
