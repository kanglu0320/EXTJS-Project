Ext.define('Admin.view.welcome.Welcome', {
    extend: 'Ext.panel.Panel',
    xtype: 'welcome',
    controller: 'welcome',
    viewModel: {
        type: 'welcome'
    },
    cls: 'shadow',
    items: [
        {
            xtype: 'gridpanel',
            cls: 'allRecordsCls',
            scrollable: true,
            hideHeaders: true,
            border: false,
            //title: 'All',
            header: false,
            routeId: 'all',
            bind: '{allResults}',
            viewConfig: {
                preserveScrollOnRefresh: true,
                stripeRows: false
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function (value, metaData, record, rowIndex) {
                        var page = "<div class='resultsItemCls'>"+
                            "<div class='resultsTitleCls'>" + record.data.heading + "</div>" +                            
                            "<div class='resultsContentCls'>" + record.data.content + "</div>" +
                            "</div>";

                        //"<div class='resultsUrlCls'><a href='"+ record.data.url +"' target='_blank'>" + record.data.url + "</a></div>" +
                        //if (rowIndex === 3) {
                        //    page = "<div class='imageRowCls'>" +
                        //        "<img src='resources/images/img1.jpg' alt='Dandelion' class='search-result-attachment'>" +
                        //        "<img src='resources/images/img2.jpg' alt='Landscape' class='search-result-attachment'>" +
                        //        "</div>";
                        //}
                        return page;
                    },
                    dataIndex: 'content',
                    flex: 1
                }
                //,
                //{
                   // xtype: 'actioncolumn',
                   // items: [
                        //{
                        //    xtype: 'button',
                        //    iconCls: 'x-fa fa-paper-plane',
                        //    tooltip: 'Request Module Access',
                        //    handler: 'RequstAccess',
                        //    isDisabled: function (view, rowIndex, colIndex, item, record) {
                        //        // Returns true if 'editable' is false (, null, or undefined)
                        //        var res = true;
                        //        navigationTree = Ext.getStore('NavigationTree');
                        //        var rec = navigationTree.findRecord('text', record.data.title);
                        //        //console.log(rec);
                        //        if (!Ext.isEmpty(rec)) {
                        //            res = true;
                        //        }
                        //        else {
                        //            res = false;
                        //        }
                        //        return res;
                        //    }
                        //}
                  //  ],
                   // width: 25
                //}
            ]
            //,
            //dockedItems: [
            //    {
            //        xtype: 'pagingtoolbar',
            //        dock: 'bottom',
            //        displayInfo: true,
            //        bind: '{allResults}'
            //    }
            //]
        }
        
    ]
});
