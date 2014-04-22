ZMock.mock({
	url: /\.json/, //所有.json结尾的
	type: 'post',
	data: null,
	process: function(request) {
		if (request.page == 1) {
			
			this.data = "str page 1";
		}
		else {
			
			return {
				content: "obj page 2"
			};
		}
	}
});
