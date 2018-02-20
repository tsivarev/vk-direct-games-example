const AND_SIGN = '&';

submitScore(2);

function sendRequest(url, params, callback) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var http = new XMLHttpRequest();
    var paramsString = params.reduce(function(result, current) {
        return result + AND_SIGN + current;
    }, '');

    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = callback(http);

    http.send(paramsString);
    alert('send ' + http.responseText + ' ' + http.readyState + ' ' + http.status);
}

function submitScore(score) {
    var url = 'http://185.29.130.2/~Viktoria/server.php';
    var params = ['score=' + score, 'viewer_id=100500', 'api_id=1', 'auth_key=805134f02c15fe256c4f7d196b03d9fe'];

    sendRequest(url, params, function(http) {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    });
}
