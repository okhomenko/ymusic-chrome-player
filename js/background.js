(function () {
  'use strict';

  var icons = ['i/pause.png', 'i/play.png']
    , defaultIcon = 1
    , changeIcon
    
    , injectScript;

  changeIcon = function (icon) {
    chrome.browserAction.setIcon({
      path: icon
    });
  };
  
  injectScript = function(tabs) {
    if (!tabs.length) {
      return;
    }

    // take first tab. Every page has the same functionality
    var tab = tabs[0];
    chrome.tabs.executeScript(tab.id, { file: 'js/inject.js' });
  };

  
  chrome.browserAction.onClicked.addListener(function (tab) {

    chrome.tabs.query({
      url: '*://music.yandex.ru/*'
    }, function(tabs) {
      injectScript(tabs);
    });
    
  });
  
  // On request - change icon
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    var currentIcon = (request === "playing" ? 0 : 1);
    changeIcon(icons[currentIcon]);
  });
  

}());


