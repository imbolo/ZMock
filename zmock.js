var ZMock = {
	_mocked: {}
};

/**
* url, type, data, process
**/
ZMock.mock = function(options) {
	
	var url = options.url,
		type = options.type;
	
	// options.data = options.data || {};
	
	ZMock._mocked[url + (type || '')] = options;	
}

ZMock.overrideAjax = function(libName) {
	var xhr = {
		readyState: 4,
		responseText: '',
		responseXML: null,
		state: 2,
		status: 200,
		statusText: "success",
		timeoutTimer: null
	};
	var _originalAjax, newAjax;
	
	newAjax = function( options ) {
	
		var mock;
	
		for (var surl in ZMock._mocked) {
	
			mock = ZMock._mocked[surl];
		
			//match get post ...
			if (options.type !== undefined && mock.type !== undefined && mock.type !== options.type) continue;
		
			//match url
			if (Object.prototype.toString.apply(mock.url) === "[object String]") {
				if (mock.url !== options.url) continue;
			}
			if (Object.prototype.toString.apply(mock.url) === "[object RegExp]") {
				if (!mock.url.test(options.url)) continue;
			}

			if (options.success) {
				if (mock.process) {

					options.success(mock.process.call(mock, options.data), 'success', xhr);
					
				}
				else {
					options.success(mock.data, 'success', xhr);
				}
			}
		
			return;	
		}
	
		return _originalAjax.apply(this, arguments);

	};
	
	switch (libName) {
		case "jQuery":
			_originalAjax = $.ajax;
			$.ajax = newAjax;
			break;
		case "KISSY":
			_originalAjax = KISSY.io;
			KISSY.io = newAjax;
			KISSY.ajax = newAjax;
			break;
	}		
}

if (typeof jQuery !== "undefined") {

	ZMock.overrideAjax("jQuery");
}
if (typeof KISSY !== "undefined") {
	//modify KISSY.io
	KISSY.use('io', function(S, IO) {
		
		ZMock.overrideAjax("KISSY");
	});
}




