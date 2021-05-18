Ext.define('Admin.view.veteranform.Veteranform', {
    extend: 'Ext.panel.Panel',
    xtype: 'veteranform',
    width: 700,
    controller: 'veteranform',
    viewModel: {
        type: 'veteranform'
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
                            value: '<h1 style="text-align:center;">VOLUNTARY SELF-IDENTIFICATION OF VETERAN STATUS</h1><br /><h style="text-align:center;">Why are you being asked to complete this form?</h>'
                        },
                    {
                        xtype: 'displayfield',                       
                        value: "<ul><li >1. This employer is a Government contractor subject to the Vietnam Era Veterans' Readjustment Assistance Act of 1974, as amended by the Jobs for" +
'Veterans Act of 2002, 38 U.S.C. 4212 (VEVRAA), which requires Government contractors to take affirmative action to employ and advance in' +
'employment: (1) disabled veterans; (2) recently separated veterans; (3) active duty wartime or campaign badge veterans; and (4) Armed Forces service' +
'medal veterans. These classifications are defined as follows:<ul>' +
'<li>A "disabled veteran" is one of the following:<ul><li>A veteran of the U.S. military, ground, naval or air service who is entitled to compensation ' +
'(or who but for the receipt of military retired pay would be entitled to compensation) under laws administered by the Secretary of Veterans Affairs; or</li>'+
'<li>A person who was discharged or released from active duty because of a service-connected disability.</li></ul></li>'+
'<li>A "recently separated veteran" means any veteran during the three-year period beginning on the date of such '+ 
"veteran's discharge or release from active duty in the U.S. military, ground, naval, or air service.</li>"+
'<li>An "active duty wartime or campaign badge veteran" means a veteran who served on active duty in the U.S. military, ground, naval or air service during a war, or in a campaign or '+
'expedition for which a campaign badge has been authorized under the laws administered by the Department of Defense.</li><li>An "Armed forces service medal veteran" means a veteran who, '+
'while serving on active duty in the U.S. military, ground, naval or air service, participated in a United States military operation for which an Armed Forces service medal was awarded pursuant '+
'to Executive Order 12985.</li></ul></li></ul></ul>' +
                        '<ul>Protected veterans may have additional rights under USERRA—the Uniformed Services Employment and Reemployment Rights Act. In particular, if you ' +
                        'were absent from employment in order to perform service in the uniformed service, you may be entitled to be reemployed by your employer in the position '+
                        "you would have obtained with reasonable certainty if not for the absence due to service. For more information, call the U.S. Department of Labor's "+
                        'Veterans Employment and Training Service (VETS), toll-free, at 1-866-4-USA-DOL.</ul><ul>'+
                        '<li>2. If you believe you belong to any of the categories of protected veterans listed above, please indicate by checking the'+
                        'appropriate box below. As a Government contractor subject to VEVRAA, we request this information in order to measure the'+
                        'effectiveness of the outreach and positive recruitment efforts we undertake pursuant to VEVRAA.</li>'

                    },
                    {
                        xtype: 'displayfield',
                        value: '<b>* required fields</b>'

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
                                    { boxLabel: 'YES, I HAVE A DISABILITY, Or Have A History/Record Of Having A Disability', name: 'vsanswer', inputValue: 'Yes' },
                                    { boxLabel: 'NO, I DON’T HAVE A DISABILITY, Or A History/Record Of Having A Disability', name: 'vsanswer', inputValue: 'No' },
                                    { boxLabel: "I DON'T WISH TO ANSWER", name: 'vsanswer', inputValue: 'Declined to answer' }
                                ]
                            },
                        ]
                    },
                    {
                        xtype: 'displayfield',
                        value: '<ul><li>3. Submission of this information is voluntary and refusal to provide it will not subject you to any adverse treatment. The ' +
                        "information provided will be used only in ways that are not inconsistent with the Vietnam Era Veterans' Readjustment "+
                        'Assistance Act of 1974, as amended.</li>'+
                        '<li>4. The information you submit will be kept confidential, except that (i) supervisors and managers may be informed '+
                        'regarding restrictions on the work or duties of disabled veterans, and regarding necessary accommodations; (ii) first aid and '+
                        'safety personnel may be informed, when and to the extent appropriate, if you have a condition that might require emergency '+
                        'treatment; and (iii) Government officials engaged in enforcing laws administered by the Office of Federal Contract Compliance '+
                        'Programs, or enforcing the Americans with Disabilities Act, may be informed.</li></ul>'

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
                                name: 'vsname',
                                emptyText: 'Name',
                                allowBlank: false
                            },
                            {
                                xtype: 'datefield',
                                flex: 1,
                                margin: '0 10 0 0',
                                labelWidth: 50,
                                fieldLabel: 'Date *',
                                name: 'vsdate',
                                editable: false,
                                allowBlank: false
                            }
                        ]
                    },
                    {
                            xtype: 'fieldcontainer',
                            defaults: {
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    width: 80,
                                    //flex: 1,
                                    value: '<b>Signature *</b>'
                                },
                                {
                                    xtype: 'radiogroup', msgTarget: 'side',
                                    allowBlank: false,
                                    columns: 1,
                                    defaults: {
                                        margin: '0 5 0 0'
                                    },
                                    items: [
                                        { boxLabel: '(checking the checkbox above is equivalent to a handwritten signature)', name: 'vssignature', inputValue: 'Yes' }
                                    ]
                                },
                            ]
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Name',
                        emptyText: '0',
                        value: '0',
                        editable: false,
                        reference: 'userIDfield',
                        //bind: '{AdminUserGrid.selection.Id}',
                        name: 'Id',
                        hidden: true
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'vsid',
                        emptyText: '0',
                        value: 0,
                        editable: false,
                        reference: 'uservsIDfield',
                        //bind: '{AdminUserGrid.selection.Id}',
                        name: 'vsid',
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
                           componentCls: 'btnbckcolor',
                           reference: 'FormSubmitBtn',
                           hidden: false,
                          handler: 'submitSecurityForm'
                       }
                    
                
            ]
        }
        ]
});
