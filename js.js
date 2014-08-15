var Song1MobileBridge = {};

Song1MobileBridge.getBridge = function () {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ) {
    return {
      play: function (playlist) {
        var play = window.IOSInterface.play_(JSON.stringify(playlist));
        document.write(play);
      }
    };
  } else if( userAgent.match( /Android/i ) ) {
    return {
      play: function (playlist) {
        window.androidInterface.play(JSON.stringify(playlist));
      }
    };
  } else {
    return {
      play: function(playlist) {
        console.log("Not Support");
      }
    };
  }
};

$(document).ready(function () {
  var audios = [];
  $('.audio').each(function () {
    var audio = {
      id: $(this).data('id'),
      title: $(this).data('title'),
      largeImage: $(this).data('largeimg'),
      url: $(this).data('url'),
      smallImage: $(this).data('smallimg'),
      album: $(this).data('album'),
      artist: $(this).data('artist')
    };

    audios.push(audio);
    console.log("Add audio: " + JSON.stringify(audio));

    $(this).click(function () {
      var playlist = {
        currentAudio: audio,
        audioList: audios
      };

      Song1MobileBridge.getBridge().play(playlist);
    });
  });
});
