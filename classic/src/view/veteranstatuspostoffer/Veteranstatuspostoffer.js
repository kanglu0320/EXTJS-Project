

Ext.define('Admin.view.veteranstatuspostoffer.Veteranstatuspostoffer', {
    extend: 'Ext.panel.Panel',
    xtype: 'veteranstatuspostoffer',
    width: 700,
    controller: 'veteranstatuspostoffer',
    viewModel: {
        type: 'veteranstatuspostoffer'
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
                    reference: 'VeteranStatusPostFieldset',
                    //title: 'Veteran Status Post Offer',
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
                            value: '<h1 style="text-align:center;">Veteran Status Post Offer</h1>'
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
                                             value: '<p style="text-align:left;">INCATech, LLC<p style="text-align:left;">Veteran Status Post Offer</p></p>'
                                         },
                                         {
                                             xtype: 'displayfield',
                                             flex: 1,
                                             margin: '0 10 0 0',
                                             value: '<p style="text-align:center;"> &nbsp;<p style="text-align:center;">QMS-TEMP-HR-Veteran-Status-Post-Offer-V1.1-020419</p></p>'
                                         },
                                         {
                                             xtype: 'displayfield',
                                             flex: 1,
                                             margin: '0 10 0 0',
                                             value: '<p style="text-align:right;">Document Version: 1.1<p style="text-align:right;">Date: 02/04/2019</p></p>'
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
                                                fieldLabel: 'LAST NAME: *',
                                                name: 'lastname',
                                                emptyText: 'Last Name',
                                                allowBlank: false
                                            },
                                            {
                                                xtype: 'textfield',
                                                flex: 1,
                                                margin: '0 10 0 0',
                                                fieldLabel: 'FIRST NAME: *',
                                                name: 'firstname',
                                                emptyText: 'First Name',
                                                allowBlank: false
                                            },
                                            {
                                                xtype: 'textfield',
                                                flex: 1,
                                                margin: '0 10 0 0',
                                                fieldLabel: 'EMPLOYEE ID: *',
                                                name: 'employeeid',
                                                emptyText: 'Employee ID',
                                                allowBlank: false
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
                                                fieldLabel: 'Current Position: *',
                                                name: 'currentposition',
                                                emptyText: 'Current Position',
                                                allowBlank: false
                                            },
                                            {
                                                xtype: 'textfield',
                                                flex: 1,
                                                margin: '0 10 0 0',
                                                fieldLabel: 'Current Supervisor: *',
                                                name: 'currentsupervisor',
                                                emptyText: 'Current Supervisor',
                                                allowBlank: false
                                            },
                                            {
                                                xtype: 'datefield',
                                                flex: 1,
                                                margin: '0 10 0 0',
                                                fieldLabel: 'Date of Hire: *',
                                                name: 'dateofhire',
                                                emptyText: 'Date of Hire',
                                                allowBlank: false
                                            }
                                    ]
                                },
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    value: '<p style="text-align:center;"><b>Why are you being asked to complete this form?</b></p>'
                                },
                                  {
                                      xtype: 'displayfield',
                                      value: '1. This employer is a Government contractor subject to the Vietnam Era Veterans’ Readjustment Assistance Act of 1974, as' +
                                      'amended by the Jobs for Veterans Act of 2002,38 U.S.C. 4212 (VEVRAA), which requires Government contractors to take' +
                                      'affirmative action to employ and advance in employment: (1) disabled veterans; (2) recently separated veterans; (3) active duty' +
                                      'wartime or campaign badge veterans; and (4) Armed Forces service medal veterans. These classifications are defined as follows:' +
                                      '<ul><li>A “disabled veteran” is one of the following:<br />' +
                                      '<ul><li>A veteran of the U.S. military, ground, naval or air service who is entitled to compensation' +
                                      '(or who but for the receipt of military retired pay would be entitled to compensation) under' +
                                      'laws administered by the Secretary of Veterans Affairs;<br /><br />' +
                                      '<li>or A person who was discharged or released from active duty because of a service-connected disability.</ul><br />' +
                                      '<li>A “recently separated veteran” means any veteran during the three-year period beginning on the date of such veteran’s' +
                                      'discharge or release from active duty in the U.S. military, ground, naval, or air service.<br /><br /></li>' +
                                      '<li>An “active duty wartime or campaign badge veteran” means a veteran who served on active duty in the U.S. military,' +
                                      'ground, naval or air service during a war, or in a campaign or expedition for which a campaign badge has been authorized' +
                                      'under the laws administered by the Department of Defense.</li><br />' +
                                      '<li>An “Armed forces service medal veteran” means a veteran who, while serving on active duty in the U.S. military, ground,' +
                                      'naval or air service, participated in a United States military operation for which an Armed Forces service medal was ' +
                                      'awarded pursuant to Executive Order 12985.<br /></li></ul>' +
                                      '<p>Protected veterans may have additional rights under USERRA—the Uniformed Services Employment and Reemployment Rights' +
                                      'Act. In particular, if you were absent from employment in order to perform service in the uniformed service, you may be entitled' +
                                      'to be reemployed by your employer in the position you would have obtained with reasonable certainty if not for the absence due' +
                                      'to service. For more information, call the U.S. Department of Labor’s Veterans Employment and Training Service (VETS), toll-free,' +
                                      'at 1-866-4-USA-DOL.</p>' +
                                      '2. As a Government contractor subject to VEVRAA, we are required to submit a report to the United States Department of Labor' +
                                      'each year identifying the number of our employees belonging to each specified “protected veteran” category. If you believe you' +
                                      'belong to any of the categories of protected veterans listed above, please indicate by checking the appropriate box below.'
                                  },
                                  {
                                      xtype: 'displayfield',
                                      flex: 1,
                                      margin: '0 10 0 0',
                                      value: '<p style="text-align:left;">I BELONG TO THE FOLLOWING CLASSIFICATIONS OF PROTECTED VETERANS (CHOOSE ALL THAT APPLY)</p>'
                                  },
                                  {
                                      xtype: 'fieldcontainer',
                                      defaults: {
                                          margin: '0 5 0 15'
                                      },
                                      layout: 'vbox',
                                      items: [
                                              {
                                                  xtype: 'radiofield', boxLabel: 'DISABLED VETERAN', name: 'disabledveteran', inputValue: 'Yes',
                                                  reference: 'VeteranStatusPostRadiodisabledveteran',
                                                  listeners: {
                                                      afterrender: function (e) {
                                                                  var elDom = e.getEl() ;
                                                                  elDom.on('click', function () {
                                                                      this.setValue(!e.value);
                                                                  }, this);
                                                      },
                                                      change: 'radiochange'
                                                  }},
                                              {
                                                  xtype: 'radiofield', boxLabel: 'RECENTLY SEPARATED VETERAN', name: 'rsveteran', inputValue: 'Yes',
                                                  reference: 'VeteranStatusPostRadiorsveteran',
                                              listeners: {
                                                  afterrender: function (e) {
                                                      var elDom = e.getEl();
                                                      elDom.on('click', function () {
                                                          this.setValue(!e.value);
                                                      }, this);
                                                  },
                                                  change: 'radiochange'
                                              }
                                              },
                                              {
                                                  xtype: 'radiofield', boxLabel: "ACTIVE WARTIME OR CAMPAIGN BADGE VETERAN", name: 'awveteran', inputValue: 'Yes',
                                                  reference: 'VeteranStatusPostRadioawveteran',
                                              listeners: {
                                                  afterrender: function (e) {
                                                      var elDom = e.getEl();
                                                      elDom.on('click', function () {
                                                          this.setValue(!e.value);
                                                      }, this);
                                                  },
                                                  change: 'radiochange'
                                              }
                                              },
                                              {
                                                  xtype: 'radiofield', boxLabel: "ARMED FORCES SERVICE MEDAL VETERAN", name: 'afsmedalveteran', inputValue: 'Yes',
                                                  reference: 'VeteranStatusPostRadioafsmedalveteran',
                                              listeners: {
                                                  afterrender: function (e) {
                                                      var elDom = e.getEl();
                                                      elDom.on('click', function () {
                                                          this.setValue(!e.value);
                                                      }, this);
                                                  },
                                                  change: 'radiochange'
                                              }
                                              },
                                              { xtype: 'radiofield', boxLabel: "I am a protected veteran, but I choose not to self-identify the classifications to which I belong.", name: 'protectedveteran', inputValue: 'Yes',
                                              reference: 'VeteranStatusPostRadioprotectedveteran',
                                              listeners: {
                                                  afterrender: function (e) {
                                                      var elDom = e.getEl();
                                                      elDom.on('click', function () {
                                                          this.setValue(!e.value);
                                                      }, this);
                                                  },
                                                  change: 'radiochange'
                                              }
                                              },
                                              { xtype: 'radiofield', boxLabel: "I am NOT a protected veteran.", name: 'notprotectedveteran', inputValue: 'Yes',
                                              reference: 'VeteranStatusPostRadionotprotectedveteran',
                                              listeners: {
                                                  afterrender: function (e) {
                                                      var elDom = e.getEl();
                                                      elDom.on('click', function () {
                                                          this.setValue(!e.value);
                                                      }, this);
                                                  },
                                                  change: 'radiochange'
                                              }
                                              },
                                              { xtype: 'radiofield', boxLabel: "I don’t wish to answer", name: 'noanswer', inputValue: 'Yes' ,
                                              reference: 'VeteranStatusPostRadionoanswer',
                                              listeners: {
                                                  afterrender: function (e) {
                                                      var elDom = e.getEl();
                                                      elDom.on('click', function () {
                                                          this.setValue(!e.value);
                                                      }, this);
                                                  },
                                                  change: 'radiochange'
                                              }
                                              }
                                      ]
                                  },
                                 {
                            xtype: 'displayfield',
                            value: '<ul><li>If you are a disabled veteran it would assist us if you tell us whether there are accommodations we could make that would' +
                            'enable you to perform the essential functions of the job, including special equipment, changes in the physical layout of the' +
                            'job, changes in the way the job is customarily performed, provision of personal assistance services or other' +
                            'accommodations. This information will assist us in making reasonable accommodations for your disability.</li></ul>' +
                            '3. Submission of this information is voluntary and refusal to provide it will not subject you to any adverse treatment. The' +
                            'information provided will be used only in ways that are not inconsistent with the Vietnam Era Veterans’ Readjustment Assistance' +
                            'Act of 1974, as amended.' +
                            '<br /><br />4. The information you submit will be kept confidential, except that (i) supervisors and managers may be informed regarding' +
                            'restrictions on the work or duties of disabled veterans, and regarding necessary accommodations; (ii) first aid and safety' +
                            'personnel may be informed, when and to the extent appropriate, if you have a condition that might require emergency treatment;' +
                            'and (iii) Government officials engaged in enforcing laws administered by the Office of Federal Contract Compliance Programs, or' +
                            'enforcing the Americans with Disabilities Act, may be informed.'
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
                                },
                                {
                                    xtype: 'button',
                                    text: 'clear',
                                    tooltip: 'Clear Signature and Resign it',
                                    reference: 'ClearSignatureBtn',
                                    handler: 'clearSignature'

                                },
                                {
                                    xtype: 'datefield',
                                    flex: 1,
                                    labelWidth: 50,
                                    margin: '0 10 0 10',
                                    fieldLabel: 'Date *',
                                    name: 'vsdate',
                                    allowBlank: false
                                }
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
                       //    reference: 'FormSaveBtn',
                       //    handler: 'saveSignature'
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
