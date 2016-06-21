window.onload = function() {
    var url = window.location.pathname.split("/");
    var user = url[1];
    var repo = url[2];
    var data = user + "/" + repo;
    chrome.runtime.sendMessage({"getCreationDate" : data}, function(res) {
        var targetEl = document.getElementsByClassName("pagehead")[0].getElementsByClassName("container")[1];
        targetEl.insertAdjacentHTML('beforeend', res);
    });
}