//所有.json
ZMock.mock({
	url: /\.json/,
	type: 'post',
	data: null,
	process: function(data) {
		if (data.page == 1) {
			this.data = {
				content: "page 1"
			};
		}
		else {
			this.data.content = "page 2";
		}
	}
});
