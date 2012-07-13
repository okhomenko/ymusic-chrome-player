(function (player, events) {
  'use strict';
  
  var binded = window.ymusic_player_binded || false;
  if (!binded) {
    var prefix = 'ymusic_player',
        event = document.createEvent('Event'),
        element = document.body;
  
    event.initEvent(prefix + '-toggle', true, true);

    var muPlayEvents = [
      'player_resume', 
      'player_start'
    ];

    // Bind on start, play and pause
    // and dispatch events into extension context that we catch in inject.js
    events.bind(muPlayEvents.join(' '), function() {
      element.setAttribute('data-' + prefix, 'playing');
      element.dispatchEvent(event);
    });

    events.bind('player_pause', function() {
      element.setAttribute('data-' + prefix, 'paused');
      element.dispatchEvent(event);
    });

    window.ymusic_player_binded = true;
  }

  // Depends on player state - play or pause it
  // If it's after load page - start player
  switch (true) {
    case player.isPaused():
      events.trigger('player_resume');
      break;

    case player.isPlaying():
      events.trigger('player_pause');
      break;
      
    case player.isReady():
      events.trigger("player_start");
      break;
  };

}(Mu.Player, Mu.events));
