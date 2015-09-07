// A boilerplate for jumpstarting jQuery plugins development
// version 2.0, July 8th, 2011
// by Stefan Gabos
// *********************************************************
// Based on the Stefan Gabos plugin boilerplate (http://stefangabos.ro/jquery/jquery-plugin-boilerplate-oop/),
// i've written this jquery plugin to standardize and facilitate the way you make ajax requests
// by Paolo Bersan

; (function ($) {

    $.request = function(options) {
        var msgContainerId="requestMsgId";
        var msgMaskId="requestMsgMaskId";

        var defaults = {
            enableMessaging: false,
            onRequestBeforeSend: function (context,jqXHR, settings) { },
            onRequestSuccess: function (context) { },
            onRequestComplete: function (context,jqXHR, textStatus) { },
            onRequestError: function (context,XMLHttpRequest, textStatus, errorThrown) { }
        }

        // to avoid confusions, use "plugin" to reference the
        // current instance of the  object
        var plugin = this;

        plugin.settings = {};
        plugin.network={};
        plugin.network.request = {};
        plugin.network.response = {};

        // the "constructor" method that gets called when the object is created
        // this is a private method, it can be called only from inside the plugin
        var init = function () {
            //Merge plugin configuration options
            plugin.settings = $.extend({}, defaults, options);

            plugin.network.request.requestParam = new Object();
            plugin.network.request.requestMessage = new Object();
            plugin.network.response = new Object();

            //Default jquery value
            plugin.network.request.requestParam["async"]=true;	
			plugin.network.request.requestParam["cache"]=true;
            plugin.network.request.requestParam["contents"]='';	
			plugin.network.request.requestParam["contentType"]='application/x-www-form-urlencoded; charset=UTF-8';	
			plugin.network.request.requestParam["crossDomain"]=false;	
			plugin.network.request.requestParam["data"]='';	
			plugin.network.request.requestParam["dataType"]='html';	
			plugin.network.request.requestParam["headers"]='';	
			plugin.network.request.requestParam["password"]='';	
			plugin.network.request.requestParam["timeout"]=300000;	//timeout impostato a 5 minuti
			plugin.network.request.requestParam["type"]='GET';	
			plugin.network.request.requestParam["url"]='';	
			plugin.network.request.requestParam["username"]='';
        }

        // public methods
        /* Adds/overwrite a list of request parameters */
        plugin.addRequestParams = function (opt) {
		    plugin.network.request.requestParam=$.extend(plugin.settings.requestParam,opt);
        }

        /* Adds/overwrite a request parameter */
        plugin.addRequestParam = function (key,val) {
            plugin.network.request.requestParam[key]=val;
        }

        /* Adds data to send along with request */
        plugin.addRequestData = function (data) {
            var tmpData="";

		    if (data) {
                if (typeof(data)=="string") {
                    tmpData=data;
                } else if(typeof(data)=="object") {
			        for (param in data) {
				        if (tmpData=="") {
					        tmpData=param+"="+data[param];
				        } else {
					        tmpData+="&"+param+"="+data[param];
				        }		
			        }
                }
		    }

            plugin.addRequestParam("data",tmpData);
        }

        /* Used to get the response */
        plugin.getResponse = function() {
            try {
                //returns plugin.network.response[key];
                return plugin.network.response;
            } catch(ex) {
                alert("[jquery.request] getResponse::"+ex.name+": " + ex.message);
            }
        }
        
        /* performs the request */
        plugin.makeRequest = function() {
            try {
                $.ajax({
			        async: plugin.network.request.requestParam.async,	
			        cache: plugin.network.request.requestParam.cache,
			        contents: plugin.network.request.requestParam.contents,
			        contentType: plugin.network.request.requestParam.contentType,
			        crossDomain: plugin.network.request.requestParam.crossDomain,
			        data: plugin.network.request.requestParam.data,
			        dataType: plugin.network.request.requestParam.dataType,
			        headers: plugin.network.request.requestParam.headers,
			        timeout: plugin.network.request.requestParam.timeout,	//timeout impostato a 5 minuti
			        type: plugin.network.request.requestParam.type,
			        url: plugin.network.request.requestParam.url,
			        beforeSend: function(jqXHR, settings) {
                        plugin.settings.onRequestBeforeSend(plugin,jqXHR, settings);
			        },
			        success: function(msg, textStatus, jqXHR) {
				        plugin.network.response.msg=msg;
				        plugin.network.response.textStatus=textStatus;
				        plugin.network.response.jqXHR=jqXHR;
                
                        plugin.settings.onRequestSuccess(plugin);
			        },
			        complete: function(jqXHR, textStatus) {
                        plugin.settings.onRequestComplete(plugin,jqXHR, textStatus);
			        },
			        error: function(XMLHttpRequest, textStatus, errorThrown) {
                        plugin.settings.onRequestError(plugin,XMLHttpRequest, textStatus, errorThrown);
			        }
		        });	
	        } catch (e) {
		        alert("[jquery.request] makeRequest::"+e.name+": " + e.message);
	        }	
        }

        init();
    }

})(jQuery);