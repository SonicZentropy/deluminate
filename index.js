var buttons = require('sdk/ui/button/action');
var ss = require("sdk/simple-storage");
var tabs = require("sdk/tabs");
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

    console.log('Active Click Log2');

    ss.storage.pages.push(tabs.activeTab.url);
    if (mod) {
        console.error('destroying mod');
        mod.destroy();
    }
    console.log("Excluded page array: " +ss.storage.pages);

    options = {
        include: "*",
        exclude: ss.storage.pages,
        contentStyleFile: "./Stylish.css",
        attachTo: ["top", "existing"]
    };
    mod = PageMod(options);



 //   tabs.activeTab.reload();
}
