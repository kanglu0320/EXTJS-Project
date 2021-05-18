Ext.define('Admin.view.admindisability.Admindisability', {
    extend: 'Ext.panel.Panel',
    xtype: 'admindisability',
    
    controller: 'admindisability',
    viewModel: {
        type: 'admindisability'
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
            bind: '{admindisabilityResults}',
            columns: [
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'dsname',
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
                    dataIndex: 'dsanswer',
                    text: 'Has Disability?',
                    flex: 1

                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'dsdate',
                    text: 'Date',
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
                            iconCls: 'x-fa fa-trash-alt',
                            tooltip: 'Delete this form record',
                            handler: 'deleteRecord'
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
                    bind: '{admindisabilityResults}',
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
                        html: 'Voluntary Self-Identification of Disability',
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
                    //title: 'Statement of Security Requirements',
                    collapsible: false,
                    collapsed: false,
                    defaults: {
                        anchor: '100%',
                        hideEmptyLabel: true
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            flex: 1,
                            value: '<h1 style="text-align:center;">Voluntary Self-Identification of Disability</h1>'
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    value: '<p style="text-align:left;">Form CC-305<p style="text-align:left;">Page 1 of 1</p></p>'
                                },
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    value: '<p style="text-align:right;">OMB Control Number 1250-0005<p style="text-align:right;">Expires 05/31/2023</p></p>'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                labelAlign: 'top'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    fieldLabel: 'Your Name *',
                                    name: 'dsname',
                                    emptyText: 'Name',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'datefield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    labelWidth: 50,
                                    fieldLabel: 'Date *',
                                    name: 'dsdate',
                                    editable: false,
                                    allowBlank: false
                                }
                            ]
                        },
                        //{
                        //    xtype: 'displayfield',
                        //    flex: 1,
                        //    value: '<h2 style="text-align:center;">Why are you being asked to complete this form?</h2>'
                        //},
                    {
                        xtype: 'displayfield',
                        value: '<h2 style="text-align:center;">Why are you being asked to complete this form?</h2><br />We are a federal contractor or subcontractor required by law to provide equal employment opportunity to qualified people with disabilities. We are also required ' +
'to measure our progress toward having at least 7% of our workforce be individuals with disabilities. To do this, we must ask applicants and employees if they ' +
'have a disability or have ever had a disability. Because a person may become disabled at any time, we ask all of our employees to update their information at least every five years.<br />' +
'Identifying yourself as an individual with a disability is voluntary, and we hope that you will choose to do so. Your answer will be maintained confidentially and' +
'not be seen by selecting officials or anyone else involved in making personnel decisions. Completing the form will not negatively impact you in any way,' +
'regardless of whether you have self-identified in the past. For more information about this form or the equal employment obligations of federal contractors under' +
'Section 503 of the Rehabilitation Act, visit the U.S. Department of Labor’s Office of Federal Contract Compliance Programs (OFCCP) website at<a href="https://www.dol.gov/ofccp" target="_blank">www.dol.gov/ofccp.</a><br />' +
'<h2 style="text-align:center;">How do I know if I have a disability?</h2><br />' +
'You are considered to have a disability if you have a physical or mental impairment or medical condition that substantially limits a major life activity, or if you' +
'have a history or record of such an impairment or medical condition. Disabilities include, but are not limited to:' +
'<div style="float:left;  height:100%; width:100%"><div style="float:left; width:33%; "><ul><li>Autism</li>' +
'<li>Autoimmune disorder, for example,  lupus, fibromyalgia, rheumatoid  arthritis, or HIV/AIDS</li>' +
'<li>Blind or low vision</li><li>Cancer</li><li>Cardiovascular or heart disease</li><li>Celiac disease</li><li>Cerebral palsy</li></ul>' +
'</div><div style="float:left; width:33%; "><ul><li> Deaf or hard of hearing</li>' +
"<li>Depression or anxiety</li><li>Diabetes</li><li>Epilepsy</li><li>Gastrointestinal disorders, for example, Crohn's Disease, or irritable bowel syndrome</li>" +
'<li>Intellectual disability</li></ul></div><div style="float:left; width:33%; "><ul><li>Missing limbs or partially missing limbs </li>' +
'<li>Nervous system condition for example, migraine headaches, Parkinson’s disease, or Multiple sclerosis (MS)</li>' +
    '<li>Psychiatric condition, for example, bipolar disorder, schizophrenia, PTSD, or major depression</li></ul></div></div>'
                    },
                    {
                        xtype: 'displayfield',
                        value: '<b>Please check one of the boxes below:</b>'

                    },
                    {
                        xtype: 'fieldcontainer',
                        defaults: {

                        },
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'radiogroup', msgTarget: 'side',
                                allowBlank: false,
                                columns: 1,
                                defaults: {
                                    margin: '0 5 0 5'
                                },
                                items: [
                                    { boxLabel: 'YES, I HAVE A DISABILITY, Or Have A History/Record Of Having A Disability', name: 'dsanswer', inputValue: 'Yes' },
                                    { boxLabel: 'NO, I DON’T HAVE A DISABILITY, Or A History/Record Of Having A Disability', name: 'dsanswer', inputValue: 'No' },
                                    { boxLabel: "I DON'T WISH TO ANSWER", name: 'dsanswer', inputValue: 'Declined to answer' }
                                ]
                            },
                        ]
                    },
                    {
                        xtype: 'displayfield',
                        value: 'PUBLIC BURDEN STATEMENT:  According to the Paperwork Reduction Act of 1995 no persons are required to respond to a collection of information unless ' +
                            'such collection displays a valid OMB control number. This survey should take about 5 minutes to complete'

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
