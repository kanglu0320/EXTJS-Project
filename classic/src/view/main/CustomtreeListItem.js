Ext.define('Admin.view.main.CustomtreeListItem', {
    extend: 'Ext.list.TreeItem',
    xtype: 'customtreelistitem',
    updateNode: function (node, oldNode) {
        //console.log(node);
        if (node != null) {
            var qtip = node.get('qtip'),
                oldQtip = oldNode ? oldNode.get('qtip') : null;

            this.callParent([node, oldNode]);
            if (node && qtip) {
                this.element.dom.setAttribute('data-qtip', qtip);
            }
            if (!node && oldQtip) {
                this.element.dom.remoteAttribute('data-qtip');
            }
        }
    }
})
