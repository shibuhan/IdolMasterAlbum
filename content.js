const csvUrl = location.host === 'columbia.jp' ? 'myAlbums_columbia.csv' : 'myAlbums_lantis.csv';
const targetClass = location.host === 'columbia.jp' ? 'img.jacketLink' : 'img.hv';

var myAlbumUrls = [];
getCSV(csvUrl);

$(function () {
    $(targetClass).each(function(index, album) {
        const targetUrl = $(album).attr('src');
        $(myAlbumUrls).each(function(index2, myAlbumUrl) {
            const myUrl = myAlbumUrl[1];
            if(targetUrl === myUrl) {
                $(album).css('filter', 'opacity(30%)');
            }
        });
    });
});

/**
 * 持っているアルバムのCSVファイルを読み込む
 * @param url CSVファイルの相対パス
 */
function getCSV(url){
    var req = new XMLHttpRequest();
    req.open('GET', chrome.extension.getURL(url), true);
    req.send(null);
    req.onload = function(){
        convertCSVtoArray(req.responseText);
    }
}

/**
 * text形式で読み込んだCSVファイルを二次元配列に格納
 * @param str text形式で読み込んだCSVファイル
 */
function convertCSVtoArray(str){
    var row = str.split("\n");
    for(var i=0;i<row.length-1;++i){
        myAlbumUrls[i] = row[i+1].split(',');
    }
}
