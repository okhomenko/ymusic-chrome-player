(function () {
  'use strict';

  var icons = ['i/pause.png', 'i/play.png']
    , defaultIcon = 1
    , changeIcon
    
    , injectScript
    , injectedTabs = [];

  changeIcon = function (icon) {
    chrome.browserAction.setIcon({
      path: icon
    });
  };
  
  injectScript = function(tab) {
    
    console.log(tab.id, injectedTabs[tab.id]);
    if (injectedTabs[tab.id] === undefined) {
      chrome.tabs.executeScript(tab.id, { file: 'js/inject.js' }, function () {
        injectedTabs[tab.id] = true;
      });
    }

  };
  
  chrome.browserAction.onClicked.addListener(function () {

    chrome.tabs.query({
      url: '*://music.yandex.ru/*'
    }, function (tabs) {

      var tab = tabs[0];

      if (tab !== undefined) {
        injectScript(tab);
      } else {
        chrome.tabs.create({
          url: 'https://music.yandex.ru',
          pinned: true
        }, function (tab) {
          injectScript(tab);
        });
      }
    });

  });
  
  // On request - change icon
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    var currentIcon = (request === 'playing' ? 0 : 1);
    changeIcon(icons[currentIcon]);
  });
  

}());


