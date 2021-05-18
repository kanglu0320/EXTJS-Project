Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',
    init: function () {
        //userGroup = this.getStore('authenticationuserGroup');
//userGroup1 = Ext.getStore('authenticationusergroup');

        this.control({
            'register': {
                render: function () {
                    //this.getView().getEl().mask('Initail Components...');
                },
                boxready: function () {
                    //console.log('ready');
                },
                resize: function () {
                    //console.log('resize');
                },
                afterrender: function () {
                    //console.log(userGroup);

                },

                activate: function (t) {
                    //console.log(currentUser.first().data);
                   
                    //console.log(userGroup1);

                }
            }
        });

    },
    //TODO: implement central Facebook OATH handling here

    onLoginButton: function () {
        var me = this;
        this.getView().getEl().mask('Logging in... please wait!');
        refs = me.getReferences();
        usernametf = refs.username;
        passwordtf = refs.password;
        username = usernametf.getValue();
        password = passwordtf.getValue();
        //console.log(username); console.log(password);

        currentToken = Ext.getStore('authenticationlogintoken');
        currentUser = Ext.getStore('authenticationloginuser');
       
        Ext.Ajax.request({
            url: Config.getServices() + '/Token',
                    params: {
                        username: username,
                        password: password,
                        grant_type: 'password'
                    },
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success: function (response) {
                        navigationTree = Ext.getStore('NavigationTree');
                        //console.log(navigationTree.getRoot());
                        navigationTree.getRoot().removeAll();
                        navigationTree.getProxy().setConfig('url', 'app/data/userroleNavigation/DefaultNavigationTree.json');
                        var data = Ext.decode(response.responseText);
                        currentToken.removeAll();
                        currentToken.add({
                            access_token: data.access_token, token_type: data.token_type, expires_in: data.expires_in, userName: data.userName, issued: data['.issued'], expires: data['.expires']
                        });

                        currentUser.getProxy().setExtraParam("username", data.userName);
                        currentUser.getProxy().setConfig("headers", { 'Authorization': 'Bearer ' + data.access_token });
                        currentUser.getProxy().setConfig("url", Config.getServices() + '/api/account/GetUserByName');

                        
                        currentUser.load({
                            scope: this,
                            callback: function (records, operation, success) {
                                this.getView().getEl().unmask();
                                if (records[0].data.Status == "Active") {
                                    if (records[0].data.EmailConfirmed == true) {
                                        var date1 = Date.now();
                                        var date2 = records[0].data.PasswordLastUpdateDate;
                                        var timeDiff = Math.abs(date2 - date1);
                                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                                        console.log(diffDays);
                                        if (diffDays > 365) {
                                            navigationTree.load({
                                                node: navigationTree.getRoot(),
                                                callback: function (records, o, s) {
                                                    this.redirectTo('changepassword', true);
                                                    alert('It has been more than '+ diffDays + ' days since the password has been changed last time! You must update your password first!');
                                                },
                                                scope: this
                                            });
                                            
                                            //console.log('Your password has expired for ' + diffDays + ' days! You must update your password first!');
                                            //alert('Your password has expired for ' + diffDays + ' days! You must update your password first!');
                                        }
                                        else {

                                            var npdesobj = null;
                                            var swmobj = null;

                                            var currentRoles = records[0].data.Roles;
                                            if (currentRoles.indexOf('SuperAdmin') > -1 ) {
                                                navigationTree.getProxy().setConfig('url', 'app/data/userroleNavigation/AdminNavigationTree.json');
                                            }
                                            else if (currentRoles.indexOf('ITAdmin') > -1) {
                                                navigationTree.getProxy().setConfig('url', 'app/data/userroleNavigation/ITAdminNavigationTree.json');
                                            }
                                            else if (currentRoles.indexOf('Security') > -1) {
                                                navigationTree.getProxy().setConfig('url', 'app/data/userroleNavigation/SecurityNavigationTree.json');
                                            }
                                            else if (currentRoles.indexOf('HR') > -1) {
                                                navigationTree.getProxy().setConfig('url', 'app/data/userroleNavigation/HRNavigationTree.json');
                                            }
                                            else if (currentRoles.indexOf('Employee') > -1) {
                                                navigationTree.getProxy().setConfig('url', 'app/data/userroleNavigation/EmployeeNavigationTree.json');
                                            }                                            
                                            else {
                                                navigationTree.getProxy().setConfig('url', 'app/data/userroleNavigation/DefaultNavigationTree.json');
                                            }
                                            navigationTree.load({
                                                node: navigationTree.getRoot(),
                                                callback: function (records, o, s) {
                                                    console.log(records);
                                                    //if (!Ext.isEmpty(npdesobj)) { navigationTree.getRoot().appendChild(npdesobj); }
                                                    //if (!Ext.isEmpty(swmobj)) { navigationTree.getRoot().appendChild(swmobj); }
                                                    //Ext.getStore('welcomeWelcome').load();
                                                    Ext.getCmp('currentUserTxt').update(data.userName);
                                                    me.redirectTo('welcome', true);
                                                }
                                            });
                                        }
                                    }
                                    else {
                                        Ext.Msg.alert('Warning', 'Please confirm your account throught the email first!');
                                    }
                                }
                                else {
                                    Ext.Msg.alert('Warning', 'Your account is currently deactivated. Please contact admin to activate your account!!');
                                }

                            }
                        });
                    },
                    failure: function (response) {
                        this.getView().getEl().unmask();
                        var data = Ext.decode(response.responseText);
                        //"{"error":"invalid_grant","error_description":"The user name or password is incorrect."}"
                        Ext.Msg.alert(data['error'], data['error_description']);

                    },
                    scope: this
                });
         
        //this.getView().getEl().unmask();
    },

    onNewAccount:  function() {
        this.redirectTo('register', true);
       // console.log(userGroup);
        //console.log(userGroup1);
        
    },

    onSignupClick: function () {
        var me = this;
        this.getView().getEl().mask('Signing up...please wait!');
        refs = me.getReferences();
        usernametf = refs.RegisterUserNametxt;
        passwordtf = refs.RegisterPasswordtxt;

        firstnametf = refs.Registerfirstnametxt;
        lastnametf = refs.Registerlastnametxt;
        usergrouptf = refs.Registerusergroupcmb;
        companytf = refs.Registercompanytxt;

        username = usernametf.getValue();
        password = passwordtf.getValue();

        Ext.Ajax.request({
            url: Config.getServices() + '/api/Account/create',
            params: {
                Email: username,
                Username: username,
                Password: password,
                ConfirmPassword: password,
                FirstName: firstnametf.getValue(),
                LastName: lastnametf.getValue(),
                UserGroup: usergrouptf.getValue(),
                CompanyorGroup: companytf.getValue()
            },
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (response) {
                this.getView().getEl().unmask();
                var data = Ext.decode(response.responseText);
                alert('Success: User account has been created! Please click the confirmation link in the email you will receive shortly, then you can use your account to log in!');
                this.redirectTo('welcome', true);
            },
            failure: function (response) {
                var data = Ext.decode(response.responseText);
                //"{"error":"invalid_grant","error_description":"The user name or password is incorrect."}"
                //Ext.Msg.alert(data['Message'], data['ModelState'][""].toString());
                if (!Ext.isEmpty(data['ModelState'][''])) { Ext.Msg.alert(data['Message'], data['ModelState'][''].toString()); }
                if (!Ext.isEmpty(data['ModelState']['createUserModel.Password'])) { Ext.Msg.alert(data['Message'], data['ModelState']['createUserModel.Password'].toString()); }

                this.getView().getEl().unmask();
            },
            scope: this
        });
    },

    onResetClick:  function() {      
        var me = this;
        this.getView().getEl().mask('Resetting password...please wait!');
        refs = me.getReferences();
        usernametf = refs.resetEmailTxt;
        username = usernametf.getValue();
        Ext.Ajax.request({
            url: Config.getServices() + '/api/Account/ResetPassword',
            params: {
                Email: username
            },
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (response) {
                this.getView().getEl().unmask();
                alert('Success: Your password has been reset! You will receive an email with the New password shortly!');
                this.redirectTo('login', true);
            },
            failure: function (response) {
                this.getView().getEl().unmask();
                var data = Ext.decode(response.responseText);
                Ext.Msg.alert(data['Message'], data['ModelState'][""].toString());
            },
            scope: this
        });
    },

    onChangeClick: function () {
        var me = this;
        this.getView().getEl().mask('Updating password...please wait!');
        refs = me.getReferences();
        oldpassword = refs.oldpassword;
        newpassword = refs.newpassword;
        confirmpassword = refs.confirmpassword;
        oldp = oldpassword.getValue();
        newp= newpassword.getValue();
        confirmp = confirmpassword.getValue();
        if (oldp == newp) {
            this.getView().getEl().unmask();
            Ext.Msg.alert('Warning:', 'The new password cannot be the same as the current password!');
        }
        else {
            Ext.Ajax.request({
                url: Config.getServices() + '/api/Account/ChangePassword',
                params: {
                    OldPassword: oldp,
                    NewPassword: newp,
                    ConfirmPassword: confirmp
                },
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + Ext.getStore('authenticationlogintoken').first().data.access_token
                },
                success: function (response) {
                    this.getView().getEl().unmask();
                    currentToken.removeAll();
                    currentUser.removeAll();
                    this.redirectTo('login', true);
                    alert('Your password has been updated! Now you can log in with your new password!');
                },
                failure: function (response) {
                    this.getView().getEl().unmask();
                    var data = Ext.decode(response.responseText);
                    if (!Ext.isEmpty(data['ModelState'][''])) { Ext.Msg.alert(data['Message'], data['ModelState'][''].toString()); }
                    if (!Ext.isEmpty(data['ModelState']['model.ConfirmPassword'])) { Ext.Msg.alert(data['Message'], data['ModelState']['model.ConfirmPassword'].toString()); }
                },
                scope: this
            });
        }

    }
});

