(function () {
    "use strict";
    var _this = this;
    _this.repoMetaHtml = "";
    _this.isMetaLoaded = false;
    /* Fetch meta for the page ASAP and get it ready for it to be available when window loads.
     * Callback is optional, it'll passed when window loads, before meta is ready.
     */
    _this.getRepoMetaHtml = function (callback) {
        var url = window.location.pathname.split("/"),
            user = url[1],
            repo = url[2],
            data = user + "/" + repo;
        chrome.runtime.sendMessage({"getRepoMeta" : data}, function (htmlResponse) {
            _this.repoMetaHtml = htmlResponse;
            _this.isMetaLoaded = true;
            if (callback) {
                callback();
            }
        });
    };
    
    /* Inject the html into page pseudo*/
    this.insertMetaInPage = function () {
        var targetEl = document.getElementsByClassName("pagehead")[0].getElementsByClassName("container")[1];
        targetEl.insertAdjacentHTML('beforeend', this.repoMetaHtml);
    };
    
    /* Inject the html into page safely*/
    this.inject = function () {
        /* If meta is still not ready, try fetching it again, this time pass the callback to care of the rest */
        if (!this.isMetaLoaded) {
            this.getRepoMetaHtml(this.insertMetaInPage);
        } else {
            this.insertMetaInPage();
        }
    };
    
    window.onload = function () {
        _this.inject();
    };
    
    this.getRepoMetaHtml();
}).call(this);