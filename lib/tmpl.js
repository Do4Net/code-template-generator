module.exports={
	simpTmplParse:function tmpl(tpl, data) {
		    var fn = this.xss(tpl).replace(/&lt;/g, '<').replace(/&gt;/g, '>') //    转义 <>
		        .replace(/(<%=)([\s\S]*?)(%>)/g, '$1_html_+= ($2)\n$3') // <%= %>  [\s\S]允许换行
		        .replace(/(<%)(?!=)([\s\S]*?)(%>)/g, '$1\n\t$2\n$3') // <% js code %>  (?!=)不要匹配到<%= %>
		        .replace(/(^|%>|%>)([\s\S]*?)(<%=|<%|$)/g, function($, $1, $2, $3) { // 边界符外的html, html 中的(\|"|\r|\n) 要转义
		            return '_html_+= "' + $2.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n') + '"\n'
		        });
		    return (fn = Function('data', 'with(data||{}){\nvar _html_=""\n' + fn + '\nreturn _html_\n}')), data ? fn(data) : fn
	},
	parse: function (template) {
		var __list__ = [];
		var that=this;
		var current="";
		try {
			return eval("(function(){return function(Model){var _$_ = [],model=Model;" + ("%>" + template.trim() + "<%").replace(/<\%\s*=\s*([\s\S]*?)\s*\%>/g, function (a, b) {
				return "<% _$_.push(" +that.xss(b) + "); %>";
			}).replace(/<\%\s*\-\s*([\s\S]*?)\s*\%>/g, function (a, b) {
				return "<% _$_.push(" + b + "); %>";
			}).replace(/\%>([\s\S]*?)<\%/g, function (a, b) {
				current=b;
				if (/^\s*%/.test(b))
					return "";
				else
					return "_$_.push(__list__[" + (__list__.push(b) - 1) + "]);";
			}) + "return _$_.join('');}})()");
		} catch (e) {
			console.error(e);
			console.error(current);
			return function(){}
		}
	},
	funcTmplParse: function (tpl, data) {
		var t = this.parse(tpl);
		if (t) {
			try {
				return t(data);
			} catch (e) {
				console.error(e);
				return "";
			}
		} else {
			return "";
		}
	},
	xss:function(str){
	    return str && (typeof str === "string") ? str.replace(/[<>&"]/g, function(target){
	        return {
	        	"&": "&amp;",
	            "<": "&lt;",
	            ">": "&gt;",
	            "\"": "&quot;"
	        }[target];
	    }) : str;
	}	
}