var ZMock = {
	_mocked: {}
};

/**
* url, type, data, process
*/
ZMock.mock = function(options) {
	
	var url = options.url,
		type = options.type;
	
	// options.data = options.data || {};
	
	ZMock._mocked[url + (type || '')] = options;	
}
//modify KISSY.io
KISSY.use('io', function(S, IO) {
	
	var xhr = {
		readyState: 4,
		responseText: '',
		responseXML: null,
		state: 2,
		status: 200,
		statusText: "success",
		timeoutTimer: null
	};
	
	var original_ajax = KISSY.io;
	
	KISSY.io = function( options ) {
		
		var mock, tmpMockData;
		
		for (var surl in ZMock._mocked) {
		
			mock = ZMock._mocked[surl];
			
			//match get post ...
			if (options.type !== undefined && mock.type !== undefined && mock.type !== options.type) continue;
			
			//match url
			if (KISSY.type(mock.url) === "string" ) {
				if (mock.url !== options.url) continue;
			}
			if (KISSY.type(mock.url) === "regexp") {
				if (!mock.url.test(options.url)) continue;
			}
			
			//
			if (mock.process) {
				tmpMockData = mock.process.call(mock, options.data);
				mock.data = tmpMockData || mock.data;
			}

			if (options.success) {
				options.success(mock.data, 'success', xhr);
			}
			
			return;	
		}
		
		return original_ajax.apply(this, arguments);

	}	
});