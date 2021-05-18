Ext.define('Admin.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.button.Segmented',
        'Ext.list.Tree',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.layout.container.Accordion',
        'Admin.view.main.CustomtreeListItem',
        'Admin.view.welcome.Welcome',
        'Admin.view.dashboard.Dashboard',
        'Admin.view.admin.Admin'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: 'border',
    //layout: {
    //    type: 'vbox',
    //    align: 'stretch'
    //},

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            region: 'north',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo1',
                    html: '<div class="main-logo"><img src="resources/images/company-logo.png">INCATech LLC</div>',
                    width: 330
                },
                {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-bars',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize',
                    tooltip: 'Collapse/Expand Navigation Panel'
                },
                '->',
                //{
                //    xtype: 'segmentedbutton',
                //    margin: '0 16 0 0',

                //    platformConfig: {
                //        ie9m: {
                //            hidden: true
                //        }
                //    },

                //    items: [{
                //        iconCls: 'x-fa fa-desktop',
                //        pressed: true
                //    }, {
                //        iconCls: 'x-fa fa-tablet',
                //        handler: 'onSwitchToModern',
                //        tooltip: 'Switch to modern toolkit'
                //    }]
                //},
                {
                    iconCls: 'x-fa fa-question-circle',
                    ui: 'header',
                    handler: 'downloaduserguide',
                    tooltip: 'User Guide'
                },
                {
                    iconCls: 'x-fa fa-home',
                    ui: 'header',
                    href: '#welcome',
                    hrefTarget: '_self',
                    tooltip: 'Go to Welcome Page'
                },
                {
                    iconCls: 'x-fa fa-sign-out-alt',
                    ui: 'header',
                    handler: 'logout',
                    tooltip: 'Logout'
                },
                {
                    xtype: 'tbtext',
                    id: 'currentUserTxt',
                    //text: 'Goff Smith',
                    cls: 'top-user-name'
                },
                {
                    xtype: 'image',
                    //cls: 'header-right-profile-image',
                    height: 24,
                    width: 24,
                    alt: 'current user image',
                    src: 'resources/images/profile-icon.png'
                }
            ]
        },
        {
            xtype: 'panel',
            header: false,
            region: 'west',
            id: 'west-region',
            itemid: 'codepreview',
            stateful: true,
            stateid: 'mainnav.west',
            reference: 'westContainer',
            scrollable: 'y',
            width: 330,
            items: [
                            {
                            xtype: 'maincontainerwrap',
                            id: 'main-view-detail-wrap',
                            reference: 'mainContainerWrap',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'treelist',
                                    defaults: {
                                        xtype: 'customtreelistitem'
                                    },
                                    reference: 'navigationTreeList',
                                    itemId: 'navigationTreeList',
                                    ui: 'nav',
                                    store: 'NavigationTree',
                                    width: 330,
                                    expanderFirst: false,
                                    expanderOnly: false,
                                    listeners: {
                                        selectionchange: 'onNavigationTreeSelectionChange',
                                        itemclick: 'treenodeclick'
                                    }
                                }
                            ]
                        }
            ]            
        },
        {
            xtype: 'panel',
            title: 'Operations',
            titleAlign:'center',
            collapsible: false,
            collapsed: false,
            collapseDirection: 'left',
            collapseToolText: 'Collapse Panel',
            expandToolText: 'Expand Panel',
            region: 'center',
            id: 'centerpanel',
            margin: '0 0 0 3',
            border: true,
            flex: 1,
            reference: 'mainCardPanel',
            cls: 'sencha-dash-right-main-container',
            itemId: 'contentPanel',
            layout: {
                type: 'card',
                anchor: '100%'
            },
            tools: [
    
            ],
            items: [

            ],
            listeners: {
                Selectionhighlightall: 'mapHighlightall',
                Selectionhighlight: 'mapHighlight',
                Tracehighlight: 'traceHighlight'
            }
        }
        
        ]
    });
