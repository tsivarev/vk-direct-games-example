const AND_SIGN = '&';

function sendRequest(url, params, callback) {
    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var http = new XMLHttpRequest();

    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');

    alert('I am here');
    http.onreadystatechange = callback(http);

    http.send(JSON.stringify(params));
}

function submitScore(score) {
    alert(window.location.pathname);
    var parser = document.createElement('a');
    parser.href = window.location.pathname;
    alert(parser.user_id);


    var url = 'https://9698c55f.ngrok.io/~Viktoria/server.php';
    var params = {
        'score': score,
        // 'viewer_id': 100500,
        // 'api_id': 1,
        // 'auth_key': '805134f02c15fe256c4f7d196b03d9fe'
    };

    sendRequest(url, params, function(http) {
        return function() {
            console.log("Update!");
            if (http.readyState == 4 && http.status == 200) {
                console.log(http.responseText);
                alert(http.responseText);
            }
        }
    });
}
