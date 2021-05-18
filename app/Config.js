Ext.define('Admin.Config', {
    alternateClassName: 'Config',

    singleton: true,
    constructor: function () {
        this.initConfig();
        return this;
    },
    getGeometryServerUrl: function () {
        //return 'http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer';
        return 'https://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer';
    },



    getReportServiceUrl: function () {
        //return 'http://vm-city102:6080/arcgis/rest/services/DelDOT_NPDES_Reports/makeReport/GPServer/Make%20Report';
        return 'https://newarkgis.kci.com/arcgis/rest/services/DelDOT_NPDES_reports/makeReport/GPServer/Make%20Report';
    },

    getPrintMapUrl: function () {
        //return 'http://vm-deldot103:6080/arcgis/rest/services/DelDotWebViewer/ExportWebMapTest/GPServer/Export%20Web%20Map';
        return 'https://newarkgis.kci.com/arcgis/rest/services/DelDotWebViewer/ExportWebMapTest/GPServer/Export%20Web%20Map';
    },

    getReportExportPathUrl: function () {
        //return 'http://vm-city102/';
        return 'https://newarkgis.kci.com/';
    },

    getBaseUrl: function () {
        return location.origin + '/CorpAppWebServices1';
    },

    getServices: function () {
        return location.origin + '/CorpAppWebServices1';
        //return location.origin + '/deldotwebviewer';
    }
});