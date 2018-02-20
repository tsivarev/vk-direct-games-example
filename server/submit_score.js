const AND_SIGN = '&';

function sendRequest(url, params, callback) {
    var http = new XMLHttpRequest();
    var paramsString = params.reduce(function(result, current) {
        return result + AND_SIGN + current;
    }, '');

    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = callback(http);

    http.send(paramsString);
}

function submitScore(score) {
    alert('score is being submitted');
    var url = 'http://localhost/~Viktoria/server.php';
    var params = ['score=' + score];

    sendRequest(url, params, function(http) {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    });
}
