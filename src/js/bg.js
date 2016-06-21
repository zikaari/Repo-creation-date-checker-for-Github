chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log("request received", request);
    if(typeof request === "object") {
        console.log("ut s");
        var req = Object.keys(request)[0];
        var args = request[req];
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                var res = JSON.parse(xhttp.response);
                var created_on = new Date(res.created_at).toLocaleDateString().replace(/\/+/g, "-");
                var updated_on = new Date(res.updated_at).toLocaleDateString().replace(/\/+/g, "-");
                
                var html = '<div style="float: right;margin-top: -31px;">' +  
                                '<span class="ext-meta-container">' +
                                    '<span class="ext-meta-label">Created</span>' +
                                    '<span class="ext-meta-value">'+ created_on +'</span>' +
                                '</span>' + 
                                '<span class="ext-meta-container">' +
                                    '<span class="ext-meta-label">Last updated</span>' +
                                    '<span class="ext-meta-value">'+ updated_on +'</span>' +
                                '</span>' +
                            '</div>';
                
                sendResponse(html);
            }
        }
        xhttp.open("GET", "https://api.github.com/repos/" + args, true);
        xhttp.send();
    }
    return true;
});