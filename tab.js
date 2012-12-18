var bg = chrome.extension.getBackgroundPage();

for(i in bg.yt_Tab_Id_Table){
	var j = bg.yt_Tab_Id_Table[i];
	crateController(j);
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(bg.yt_Tab_Id_Table.indexOf(tabId) != -1){
		//更新前のtabがplayerだった場合 該当するbuttonを削除
		$("tabId:"+tabId).remove();
	}
	if(tab.url.indexOf('http://www.youtube.com/watch')!=-1 || tab.url.indexOf('https://www.youtube.com/watch')!=-1){
		//更新後のtabがplayerだった場合新たにbuttonを作成
		crateController(tab.id);
	}
});

//削除されたtabがplayerだった場合 該当するbuttonを削除
chrome.tabs.onRemoved.addListener(function(tabId) {
	if(bg.yt_Tab_Id_Table.indexOf(tabId) != -1){
		$("tabId:"+tabId).remove();
	}
});

//コントローラー作成
function crateController(tabId){
	chrome.tabs.executeScript(tabId, {code:"var player = document.getElementById('movie_player')"});
	$("#controll-area").append("<div id='tabId-"+tabId+"' class='yt'></div>");

	chrome.tabs.get(tabId,function(tab){
		//alert("title:"+tab.title);
		var title = tab.title;
		title = title.substr(0, title.length - " - YouTube".length);
		var tabURL = tab.url;
		$("#tabId-"+tabId).append("<span class='title'>"+title+"</span><br />");
	
		var play = document.createElement("input");
		play.type = "image";
		play.src = "play.png";
		$("#tabId-"+tabId).append(play);
		$(play).click(function(){
			bg.objectId = tabId;
			chrome.tabs.executeScript(tabId, {file:"play.js"},function(){
				//window.close();
			});
		});
		$(play).blur();

		var pause = document.createElement("input");
		pause.type = "image";
		pause.src = "pause.png";
		$("#tabId-"+tabId).append(pause);
		$(pause).click(function(){
			bg.objectId = tabId;
			chrome.tabs.executeScript(tabId, {file:"pause.js"},function(){
				//window.close();
			});
		});	
		$(pause).blur();

		var up = document.createElement("input");
		up.type = "button";
		up.value = "update";
		$("#tabId-"+tabId).append(up);
		$(up).click(function(){
			chrome.tabs.update(tabId,{url:tab.url},function(){
				window.close();
			});
		})

	});
}

function deleteController(tabId){
	$("tabId-"+tabid).remove();
}

	//.click(Request())とするとクリックする前にクリックイベントが発生してしまう。
