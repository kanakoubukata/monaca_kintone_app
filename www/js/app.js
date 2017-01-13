// kintoneアプリ設定
window.appInfo = {
	id : 34,
	domain : "https://xxxxx.cybozu.com/",
	token : "APIトークン"
};

// QRコード読込
function readQRCode() {
	var correctText = "12345678";
	
	window.plugins.barcodeScanner.scan(success, fail);
    
    function success(result) {
		if(result.cancelled) return;
        
        console.log(result.text);
        if(result.text === correctText) {
        	regist();
        } else {
        	alert("QRコードが異なります");
        }
    }
    
    function fail(error) {
        alert("error: " + error);
    }
}

// 登録
function regist() {
    $.ajax({
        url: appInfo.domain + "k/v1/record.json",
        method: "POST",
        headers: {
            "X-Cybozu-API-Token": appInfo.token,
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "app": appInfo.id
        })
    })
    .done(function(result) {
    	console.log(JSON.stringify(result));
    	alert("登録が完了しました");	
    })
    .fail(function(result){
    	console.log(JSON.stringify(result));
    	alert("登録に失敗しました");
    });
}

// カウント
function count() {
    $.ajax({
        url: appInfo.domain + "k/v1/records.json",
        method: "GET",
        headers: {
            "X-Cybozu-API-Token": appInfo.token
        },
        data: {
            "app": appInfo.id,
            "totalCount": "true",
            "query": "作成日時 = TODAY()"
        }
    })
    .done(function(result) {
    	document.getElementById('todayCount').innerHTML = result.totalCount + '人';
    	console.log(JSON.stringify(result));
    })
    .fail(function(result){
    	console.log(JSON.stringify(result));
    });
}

// 初期処理
ons.ready(function() {
	document.getElementById('tabbar').addEventListener('postchange', function() {
	 	if(this.getActiveTabIndex() === 1) {
	 		count();
	 	}
	});
});