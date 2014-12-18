// ==UserScript==
// @name            speed_dns.uc.js
// @include         chrome://browser/content/browser.xul
// @charset         UTF-8
// ==/UserScript==

var SpeedNS = {
   
    /**
     * Regular expression to match a domain name from uri.
     */
    domainRegex: /((http)|(https)):\/\/[A-Za-z0-9.-]+\//,
   

    eventListenerHandle: null,

    initialize:  function() {
            SpeedNS.attachLookupListener();
    },
   
    attachLookupListener: function() {
		var appContent = document.getElementById("appcontent");
		SpeedNS.eventListenerHandle = appContent.addEventListener("DOMContentLoaded", SpeedNS.fireDNSLookups, true);
    },
    
    removeLookupListener: function() {
		var appContent = document.getElementById("appcontent");
		SpeedNS.eventListenerHandle =  appContent.removeEventListener("DOMContentLoaded", SpeedNS.fireDNSLookups, true);
    },
    
   
   /**
    * Fires DNS lookups for all the links in the current document. This is 
    * done for every page that gets loaded in a browser.
    *
    * @param {object} e is the current html document for which the onload event
    *   has fired.
    */
   fireDNSLookups: function(e) {   
       var doc = e.target;
       var links = doc.getElementsByTagName("a");
       var uniqueLinks = {};
       for (var i = 0, l = links.length; i < l; i++ ) {
           var uri = links[i].href;
           var matches = SpeedNS.domainRegex.exec(uri);

           if ( matches ){
	           var domain = matches[0];      
	           // hash each domain name.
	           uniqueLinks[domain] = false;
           }
       }
       
       for (var ud in uniqueLinks) {
           if (uniqueLinks.hasOwnProperty(ud)) {
               SpeedNS.sendAsyncHeadRequest(ud, SpeedNS.processHeadResponses);
           }
       }
   },
   
   /**
    * Sends a async http head request to the requested URI.
    *
    * @param {String} uri is the uri of the domain to which the head request 
    *   should be sent.
    * @param {function} callback in the function that should be called once
    *   the request succeeds.
    */
   sendAsyncHeadRequest: function(uri, callback) {
       var httpReq = new XMLHttpRequest();
       httpReq.onreadystatechange = function() {
           if (httpReq.readyState == 4) {
               callback(httpReq, uri);
           }
       };
       httpReq.open('HEAD', uri, true);
       httpReq.send();
   },
   
   /**
    * Processes the response for aync head requests.
    *
    * @param {XMLHttpRequest} req is the request object.
    * @param {String} uri is the uri to which the head request was sent.
    */
    processHeadResponses: function(req, uri) {
       Application.console.log("DNS lookup completed for Uri: " + uri);
       //Application.console.log("\n Response Headers: \n" + req.getAllResponseHeaders());
    },

}

SpeedNS.initialize();