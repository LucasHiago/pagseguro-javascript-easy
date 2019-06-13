function psnLoadTrasnp(callback, sessionId, isSandbox) {
    var scriptId = 'sounoob-pagseguro-transparent-' + (isSandbox === true ? "sandbox" : "prod");
    if(!document.getElementById(scriptId)) 
    {
        var filePath = "https://stc." + (isSandbox === true ? "sandbox." : "") + "pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js";
        var scriptTag = document.createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.id = scriptId;
        scriptTag.src = filePath + "?bust=" + new Date().getTime();
        scriptTag.onload = function() {
            psnLoadTrasnpIsLoaded(callback, sessionId);
        }        
        document.getElementsByTagName("head")[0].appendChild(scriptTag);
    }else{
        psnLoadTrasnpIsLoaded(callback, sessionId);
    }
}

function psnLoadTrasnpIsLoaded(callback, sessionId) {
	PagSeguroDirectPayment.onSenderHashReady(function(response){
		if(response.status == 'error') {
			console.log(response.message);
			return false;
		}
		if(sessionId) {
            PagSeguroDirectPayment.setSessionId(sessionId);
        }
        var senderHash = response.senderHash;
        callback(senderHash);
	});
}


//Usage


//Carrega em ambiente de produção
psnLoadTrasnp(function(senderHash) {
    alert(senderHash);
    //Chame aqui os outros métodos da biblioteca que vá precisar.
}, false);


//Carrega em ambiente de sandbox
psnLoadTrasnp(function(senderHash) {
    alert(senderHash);
    //Chame aqui os outros métodos da biblioteca que vá precisar.
}, true);