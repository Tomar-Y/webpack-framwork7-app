var HCAPPDict = {
    toString: function(obj){
		var result = "";
		for(var p in obj){
			result+=(";"+p+":"+obj[p]);
		}
		return result.substring(1);
	},
	format:function(obj,key){
		return this[obj][key];
	}
}
