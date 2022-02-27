const csvUrlBase = "https://raw.githubusercontent.com/shibuhan/IdolMasterAlbum/makkoi/";
const csvUrl = csvUrlBase + (location.host === 'columbia.jp' ? 'myAlbums_columbia.csv' : 'myAlbums_lantis.csv');
const csvUrlNoNeed = csvUrlBase + (location.host === 'columbia.jp' ? 'myAlbums_columbia_noneed.csv' : 'myAlbums_lantis_noneed.csv');
const targetClass = location.host === 'columbia.jp' ? 'img.jacketLink' : 'img.hv';

$(async function () {
    const myAlbumUrls = convertCSVtoArray(await getCSV(csvUrl));
    const myAlbumUrlsNoNeed = convertCSVtoArray(await getCSV(csvUrlNoNeed));
    $(targetClass).each(function(index, album) {
        const targetUrl = $(album).attr('src');
        if ($.inArray(targetUrl, myAlbumUrls) != -1) {
             // 既に持っているアルバム
            $(album).css('filter', 'opacity(20%)');
        }
        if ($.inArray(targetUrl, myAlbumUrlsNoNeed) != -1) {
            // 最優先ではないアルバム
            $(album).css('filter', 'opacity(20%) blur(2px)');
        }
    });
});

/**
 * 持っているアルバムのCSVファイルを読み込む
 * @param url CSVファイルの相対パス
 * @returns ajaxのPromise?
 */
async function getCSV(url){
    return $.ajax({
        url: url,
        type: 'get',
        dataType:'text',
        cache:false,
        success: csv => csv  // TODO: どうしてこの書き方で動くのか調査。戻り値はPromiseになっている。
    });
}

/**
 * text形式で読み込んだCSVファイルを配列に変換する
 * @param str text形式で読み込んだCSVファイル
 * @returns URLの配列
 */
function convertCSVtoArray(str){
    var row = str.split(/\r\n|\n/);
    const albumUrls = [];
    for(var i=0;i<row.length-1;++i){
        albumUrls[i] = row[i+1].split(',');
    }
    return albumUrls.map(urls => urls[1]);  // 二次元配列からURLだけ抽出
}
