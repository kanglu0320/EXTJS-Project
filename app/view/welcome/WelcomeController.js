Ext.define('Admin.view.welcome.WelcomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.welcome',
    init: function () {
        currentUser = Ext.getStore('authenticationloginuser');
        currentToken = Ext.getStore('authenticationlogintoken');
        allResults = this.getStore('allResults');

        this.control({
            '#': {
                activate: function (t) {
                    console.log(currentUser);
                    console.log(allResults);
                    console.log(currentUser.first().data.Roles.includes('Employee'));
                    if (!currentUser.first().data.Roles.includes('Employee')) {
                        console.log('HR');
                        allResults.getProxy().setConfig("url", 'app/data/welcome/WelcomeHR.json');
                        allResults.load({
                                scope: this,
                                callback: function (records, operation, success) {
                                }
                            });
                    }

                //if (admindisabilityStore.getCount() == 0) {
                //    admindisabilityStore.getProxy().setExtraParam("Roles", currentUser.first().data.Roles);
                //    admindisabilityStore.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + currentToken.first().data.access_token });
                //    admindisabilityStore.load({
                //        scope: this,
                //        callback: function (records, operation, success) {
                //        }
                //    });
                //}

            }
            }
        });
    },

    RequstAccess: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);        
        refs = me.getReferences();
        //console.log(rec.data.title);

        //console.log(navigationTree.findRecord('text', rec.data.title));

        msgstr = 'Are you sure you want to request access to the ' + rec.data.title;
        Ext.window.MessageBox.prototype.closeToolText = 'Close Dialog';
        Ext.Msg.confirm('Warning', msgstr, function (id, value) {
            if (id === 'yes') {
                Ext.Ajax.request({
                    url: Config.getServices() + '/api/account/RequestWidgetAccess',
                    method: 'GET',
                    params: {
                        'userid': currentUser.first().data.Id,
                        'widgetName': rec.data.title
                    },
                    success: function (response, opts) {
                        //var obj = Ext.decode(response.responseText);
                        //usersStore.reload();
                        Ext.Msg.alert('Success', 'Your account request to access ' + rec.data.title + ' has been received, and is pending review by the Administrator. ' +
                ' You will be able to access the widget once your account is reviewed and access is granted!  Note: Please do not request again!');
                    },

                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    },
                    scope: this,
                    headers: {
                        'Authorization': 'Bearer ' + currentToken.first().data.access_token
                    }
                });
            }
        }, this);

    }

   


});
