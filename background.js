var yt_Tab_Id_Table = new Array();
var for_button = "this is background";
var objectId;
var alreadyCreated = new Array();
var state = false;

chrome.tabs.getAllInWindow(null,
//window読み込み時でのplayerを開いているtabのidを登録
	function(tab){
		for(var i=0;i<tab.length;i++){
			if(tab[i].url.indexOf('http://www.youtube')!=-1 || tab[i].url.indexOf('https://www.youtube')!=-1){
				yt_Tab_Id_Table.push(tab[i].id);
			}
		}
	}
	
);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(yt_Tab_Id_Table.indexOf(tabId) != -1){
		//更新前のtabがplayerだった場合 yt_Tab_Id__Tableから該当するidを削除
		yt_Tab_Id_Table.splice(yt_Tab_Id_Table.indexOf(tabId),1);
	}
	if(tab.url.indexOf('http://www.youtube.com/watch')!=-1 || tab.url.indexOf('https://www.youtube/watch')!=-1){
		//更新後のtabがplayerだった場合 idを登録
		yt_Tab_Id_Table.push(tab.id);
	}
});

//削除されたtabがplayerだった場合 yt_Tab_Id__Tableから該当するidを削除
chrome.tabs.onRemoved.addListener(function(tabId) {
	if(yt_Tab_Id_Table.indexOf(tabId) != -1){
		yt_Tab_Id_Table.splice(yt_Tab_Id_Table.indexOf(tabId),1);
	}
});
