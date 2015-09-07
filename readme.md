Description
--------------------------------------
This jquery plugin helps makes ajax request in a standard way.

Version history
--------------------------------------
```bash
Version 1.0.8
- Changed the license from ISC to MIT
- Updated some comment
```

Configuration options
--------------------------------------
Next a list of all supported configuration options:

	**async**: true/false, default true;	
	**cache**: true/false, default true;
    **contents**: string, default is '';	
	**contentType**: string, default is 'application/x-www-form-urlencoded; charset=UTF-8';	
	**crossDomain**: true/false, default false;	
	**data**: string, default is '';	
	**dataType**: string, default is 'html';	
	**headers**: string, default is '';	
	**password**: string, default is '';	
	**timeout**: integer, default is 300000;	//5 minutes
	**type**: GET/POST and any type supported by jquery, default is 'GET';	
	**url**: string, default is '';	
	**username**: string, default is '';

These are the same supported by jquery, see it for further details.
Next are the event supported by the library:

	**onRequestBeforeSend**: execute before request is executed, useful to create a loader or spinner in the ui
	**onRequestError**: triggered if request fails
	**onRequestSuccess**: triggered on success, like jquery
	**onRequestComplete**: triggered when request ends (after onRequestSuccess events)

Use
--------------------------------------
1. Include jquery library (version >=1.5)
2. Include jquery.request.js or jquery.request.min.js library
3. Next write your custom function to process request as this one:

```bash
	function requestExample() {
		//Object containing the configuration plugin options
		var options = new Object();
		try {
			options["onRequestBeforeSend"] = function (context, jqXHR, settings) {
				try {
					//Useful to perform actions before the request execution
				} catch (ex) {
					alert("onRequestBeforeSend:"+ex.message)
				}
			}
			
			options["onRequestSuccess"] = function (context, key) {
				try {
					//getting response
					var objResp = context.getResponse();

				} catch (ex) {
					alert("onRequestSuccess:"+ex.message)
				}
			}

			options["onRequestError"] = function (context, XMLHttpRequest, textStatus, errorThrown) {
				try {
					alert(errorThrown);
				} catch (ex) {
					alert("onRequestError:"+ex.message)
				}
			}
	
			 //Create the instance with the options
			var req = new $.request(options);

			//Url to call: you can define it directly in the options object before 
			req.addRequestParam("url", 'http://www.google.com');

			//Change some defualt options value
			//Cache
			req.addRequestParam("cache", false);

			//data to send along with the request
			req.addRequestParam("data", { "code": "001", "description": "Hello world" });

			.......

			//Perform the request
			req.makeRequest();

		} catch (ex) {
			alert("requestExample:"ex.message)
		}
	}
```