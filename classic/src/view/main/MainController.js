Ext.define('Admin.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    lastView: null,

    setCurrentView: function (hashTag) {
        hashTag = (hashTag || '').toLowerCase();
        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag) ||
                   store.findNode('viewType', hashTag),
            view = (node && node.get('viewType')) || 'page404',
            lastView = me.lastView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;

        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {
            newView = Ext.create({
                xtype: view,
                routeId: hashTag,  // for existingItem search later
                hideMode: 'offsets'
            });
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        me.lastView = newView;
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }
    },

    treenodeclick: function (s, i, e) {
        var me = this;
        refs = me.getReferences();
        mainCardPanel = refs.mainCardPanel;
        
        //var currentUser = Ext.getStore('authenticationloginuser');

        //var usergroup = currentUser.first().data.UserGroup;
        if (i.node.data.text == 'NPDES Web Viewer' || i.node.data.text == 'ES2M Web Viewer') {
            var mpsre = null;
            if (i.node.data.text == 'NPDES Web Viewer') {
                ////enable select by map tool
                //npdesselectedbymapbtn.setDisabled(false);
                //var NPDESmapServicesList = Ext.getStore('NPDESMapServices');
                //NPDESmapServicesList.each(function (record, idx) {
                //    if (record.data.usergroup == usergroup) {
                //        mpsre = record.data;
                //    }
                //});
                //if (!Ext.isEmpty(mpsre)) {
                //    gmapPanel.AddWidgetLayer(mpsre);
                //}
            }
            if (i.node.data.text == 'ES2M Web Viewer') {
                //var SWMmapServicesList = Ext.getStore('SWMMapServices');
                //SWMmapServicesList.each(function (record, idx) {
                //    //mpsre = record.data;
                //    gmapPanel.AddWidgetLayer(record.data);
                //});
            }



            var to = i.node.firstChild.data.routeId;
            if (to) {
                this.redirectTo(to);
            }
        }

        if (i.node.data.text == 'Welcome Page') {
            //console.log(i.node.parentNode.childNodes);
            Ext.Array.each(i.node.parentNode.childNodes, function (item, index, all) {
                item.collapse();
            });
        }
        //console.log(i.node.data.leaf);
        if (i.node.data.leaf == true) {
            mainCardPanel.setTitle(i.node.data.text); //'Special Security Eligibility Form'
        }
        if (i.node.data.text == 'Security Form') { mainCardPanel.setTitle('Special Security Eligibility Form'); }
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            westContainer = refs.westContainer,
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 330;
            westContainer.setWidth(new_width);


        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }
            navigationList.canMeasure = false;

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({ dynamic: true, to: { width: new_width } });

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({ isRoot: true });
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                        navigationList.canMeasure = true;
                    },
                    single: true
                });
            }
        }
    },

    onMainViewRender: function () {
        if (!window.location.hash) {
            this.redirectTo("login");
        }
    },

    onRouteChange: function (id) {
        //console.log(id);
        if (id == "login" || id == "register" || id == "passwordreset" || id == "changepassword"
            || id == "veteranform" || id == "disabilityform" || id == "veteranstatuspostoffer"
            ) {
            this.setCurrentView(id);
        }
        else {
            currentToken = Ext.getStore('authenticationlogintoken');
            if (currentToken.getCount() > 0) {
                var record = currentToken.first();
                var d2 = record.data['expires'];
                var dnow = Date.now();
                if (dnow - d2 > 0) {
                    this.redirectTo('login', true);
                    alert('Warning: Current login user session has expired, please login first!');

                }
                else {
                    this.setCurrentView(id);
                }
            } else {
                this.redirectTo('login', true);
                alert('Warning: Please Login first!');
            }
        }
    },

    onSearchRouteChange: function () {
        this.setCurrentView('searchresults');
    },

    onSwitchToModern: function () {
        Ext.Msg.confirm('Switch to Modern', 'Are you sure you want to switch toolkits?',
                        this.onSwitchToModernConfirmed, this);
    },

    onSwitchToModernConfirmed: function (choice) {
        if (choice === 'yes') {
            var s = window.location.search;

            // Strip "?classic" or "&classic" with optionally more "&foo" tokens
            // following and ensure we don't start with "?".
            s = s.replace(/(^\?|&)classic($|&)/, '').replace(/^\?/, '');

            // Add "?modern&" before the remaining tokens and strip & if there are
            // none.
            window.location.search = ('?modern&' + s).replace(/&$/, '');
        }
    },

    onEmailRouteChange: function () {
        this.setCurrentView('email');
    },

    logout: function () {

        currentToken = Ext.getStore('authenticationlogintoken');
        currentUser = Ext.getStore('authenticationloginuser');
        currentToken.removeAll();
        currentUser.removeAll();

        currentroles = Ext.getStore('adminroles');
        currentusers = Ext.getStore('adminusers');
        if (!Ext.isEmpty(currentroles)) {
            currentroles.removeAll();
        }
        currentusers.removeAll();

        this.redirectTo('login', true);

    }
});
