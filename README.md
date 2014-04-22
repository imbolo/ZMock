ZMock
=====

KISSY mock tool

使用  

先引用  

	<script src="zmock.js" type="text/javascript" charset="utf-8"></script>

在js脚本中添加配置

如：

	ZMock.mock({
		url: /\.json/,   
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
	

参数说明 

+ url: url地址，可以是字符串或者正则表达式  
+ data:  
+ process: 
