(function () {
  'use strict';
  
  var include,
      env = 'development',
      link = "js/ymusic-injection.js";

  include = function (link) {
    var scr = document.createElement('script');

    // Use bust for prevent caching if in dev environment
    link += (env === 'development' ? '?bust=' + (new Date()).getTime() : '');

    scr.src = link;
    document.getElementsByTagName('head')[0].appendChild(scr);
  };
  
  include(chrome.extension.getURL(link));

  (function(event, element, prefix){
    // Catch event and send request to extension context
    element.addEventListener(prefix + '-' + event, function(evt) {
      var data = element.getAttribute('data-ymusic_player');
      chrome.extension.sendRequest(data);
    });

  }('toggle', document.body, 'ymusic_player'));
  
 }());


