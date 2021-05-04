const domein_lantis = "https://www.lantis.jp/imas/";
const domein_columbia = "https://columbia.jp/idolmaster/";
const titleRemovePart = "THE IDOLM@STER";

chrome.contextMenus.create({
    title: "csvに追加",
    contexts: ["image"],
    type: "normal",
    documentUrlPatterns : ["https://columbia.jp/idolmaster/*","http://www.lantis.jp/imas/*","https://www.lantis.jp/imas/*"]
});

chrome.contextMenus.onClicked.addListener(function(item, tab){
    const albumUrl = item.srcUrl.substring(item.pageUrl.length);
    $.ajax({
        type:"get",
        url: item.linkUrl,
    }).done(function(data){
        let title;
        if (item.pageUrl === domein_columbia) {
            title = data.match(/<title>(.*)<\/title>/)[1];
        } else if (item.pageUrl === domein_lantis) {
            title = $($.parseHTML(data)).find('.titles').find('h2').text();
        }
        
        const titleRemoveLength = title.indexOf(titleRemovePart);
        if (titleRemoveLength != -1) {
            title = title.substring(titleRemoveLength + titleRemovePart.length).trim();
        }
        
        console.log(title);
        console.log(albumUrl);
        console.log('------------------------------');
    });
});