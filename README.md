ZMock
=====

KISSY mock tool

这是一个是用来截获KISSY中io，ajax请求的小工具  

使用  

先引用  

	<script src="zmock.js" type="text/javascript" charset="utf-8"></script>

在js脚本中添加配置

如：

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
	

参数说明 

+ url: url地址，可以是字符串或者正则表达式  
+ type: 'post','get'...; 不定义时匹配所有
+ data: 返回数据 
+ process: 处理逻辑，参数data为ajax请求传入过来的参数组成的对象
