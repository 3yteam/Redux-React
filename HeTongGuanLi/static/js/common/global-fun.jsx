let mobileCommon={};
mobileCommon.interfaceUrl = '../static/data/';
mobileCommon.sendAjax=(option,callback) =>{

	let defaultOpt  = {
		url:'',
		data:{},
		type:option.type || 'GET',
		done:function(){},
		fail:function(){},
	};
	let initOpt = Object.assign({},defaultOpt,option);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(initOpt.type,initOpt.url,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function(data) {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var response =  JSON.parse(xmlhttp.responseText);
            if(response.status==1) {

            	callback && callback(response)
            	
            } else {
            	callback && callback(response)
            }
        }
    };
}

export {mobileCommon} ;
