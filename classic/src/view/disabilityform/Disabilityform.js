Ext.define('Admin.view.disabilityform.Disabilityform', {
    extend: 'Ext.panel.Panel',
    xtype: 'disabilityform',
    width: 700,
    controller: 'disabilityform',
    viewModel: {
        type: 'disabilityform'
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
        'Admin.SignaturePad',
        'Ext.form.field.Date',
        'Ext.form.RadioGroup'
    ],
    cls: 'shadow',
    //activeTab: 0,
    layout: 'card',
    items: [
        {
            xtype: 'form',
            reference: 'SecurityFormDetailPanel',
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
                            xtype: 'displayfield',
                            value: '<b>* required fields</b>'

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
                        value: '<b>Please check one of the boxes below *:</b>'

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
                        xtype: 'displayfield',
                        reference: 'FormStatusLabel',
                        hidden: true,
                        value: '<b>Your form has been succesfully submitted!</b>'
                    },
                       '->',
                       //{
                       //    text: '&bull; Back',
                       //    handler: 'backtouserlist'
                       //},
                       //{
                       //    text: '&bull; Save',
                       //    hidden: false,
                       //    reference: 'FormSaveBtn'//,
                       //    //handler: 'saveSignature'
                       //}, 
                       {
                           text: '&bull; Submit',
                           reference: 'FormSubmitBtn',
                           componentCls: 'btnbckcolor',
                           hidden: false,
                          handler: 'submitSecurityForm'
                       }
                    
                
            ]
        }
        ]
});
