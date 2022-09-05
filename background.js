chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'menu_csv_send',
        title: 'csv追加',
        contexts: ['link'],
        type: 'normal',
        documentUrlPatterns : ['https://columbia.jp/idolmaster/*','http://www.lantis.jp/imas/*','https://www.lantis.jp/imas/*']
    });

    chrome.contextMenus.create({
        id: 'menu_csv_update',
        title: 'csv更新',
        contexts: ['link'],
        type: 'normal',
        documentUrlPatterns : ['https://columbia.jp/idolmaster/*','http://www.lantis.jp/imas/*','https://www.lantis.jp/imas/*']
    });
});

chrome.contextMenus.onClicked.addListener(function(item, tab){
    if (item.menuItemId === 'menu_csv_send') {
        chrome.tabs.sendMessage(tab.id, {type: 'csv_send', item: item});
    } else if (item.menuItemId === 'menu_csv_update') {
        chrome.tabs.sendMessage(tab.id, {type: 'csv_update', item: null});
    }
});