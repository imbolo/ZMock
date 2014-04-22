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
	

参数说明 

+ url: url地址，可以是字符串或者正则表达式  
+ type: 'post','get'...; 不定义时匹配所有
+ data: 返回数据 
+ process: 处理逻辑，参数request为ajax请求传入过来的参数组成的对象

data 和 process 两个参数，只需要传入一个  
只有data时，返回固定数据  
用process参数来处理需要模拟的逻辑  
