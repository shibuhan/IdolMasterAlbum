const domein_lantis = 'https://www.lantis.jp/imas/';
const domein_columbia = 'https://columbia.jp/idolmaster/';
const titleRemovePart = 'THE IDOLM@STER';

chrome.runtime.onMessage.addListener(({type, item}) => {
    if (type === 'csv_send') {
        const albumUrl = item.srcUrl.substring(item.pageUrl.length);
        $.ajax({
            type:'get',
            url: item.linkUrl,
        }).done(function(data){
            let title;
            let domain;
            if (item.pageUrl === domein_columbia) {
                domain = 'columbia';
                title = data.match(/<title>(.*)<\/title>/)[1];
            } else if (item.pageUrl === domein_lantis) {
                domain = 'lantis';
                title = $($.parseHTML(data)).find('.titles').find('h2').text();
            }
            
            const titleRemoveLength = title.indexOf(titleRemovePart);
            if (titleRemoveLength != -1) {
                title = title.substring(titleRemoveLength + titleRemovePart.length).trim();
            }
            
            const request = {
                domain: domain,
                data: `${title},${albumUrl}`
            }
            // TODO: サーバーに送信
            alert(request.data);
        });
    } else if (type === 'csv_update') {
        alert('TODO: サーバーに送信(git push)');
    }
  });