var buttons = require('sdk/ui/button/action');
var ss = require("sdk/simple-storage");
var tabs = require("sdk/tabs");
var urls = require("sdk/url");
//var self = require("sdk/self");
const { PageMod } = require("sdk/page-mod");

if (!ss.storage.pages) {
    ss.storage.pages = [];
    ss.storage.pages.push("*.google.com");
}
ss.storage.pages = [];
ss.storage.pages.push("*.google.com");

var options = {
    include: "*",
    exclude: ss.storage.pages,
    contentStyleFile: "./Stylish.css",
    attachTo: ["top"]
};

var mod = PageMod(options);

buttons.ActionButton({
    id: "mozilla-link",
    label: "Visit Mozilla",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: handleClick
});

function handleClick(state) {
//    var currentURL = tabs.activeTab.url;
    var currentDomain = "*." + extractDomain(tabs.activeTab.url);


    if(ss.storage.pages.indexOf(currentDomain) == -1){
        ss.storage.pages.push(currentDomain);
        console.info("Pushing url: " + currentDomain );
    } else {
        ss.storage.pages.splice(ss.storage.pages.indexOf(currentDomain), 1);
        console.info("Popping url: " + currentDomain);
    }
    console.info("Excluded page array after click: " +ss.storage.pages);

    if (mod) {
        console.log('destroying mod');
        mod.destroy();
    }


    options = {
        include: "*",
        exclude: ss.storage.pages,
        contentStyleFile: "./Stylish.css",
        attachTo: ["top", "existing"]
    };
    mod = PageMod(options);



 //   tabs.activeTab.reload();
}

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}
