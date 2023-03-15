
import Player from "@vimeo/player";
const throttle = require('lodash.throttle');

const LOCALSTORAGE_CURTIME_KEY = "videoplayer-current-time";

const iframe = document.querySelector('iframe');
    const player = new Player(iframe);

player.on('play', function() {
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

const onTimeupdate = function (data) { 
    localStorage.setItem(LOCALSTORAGE_CURTIME_KEY, data.seconds);
};

player.on('timeupdate', throttle(onTimeupdate, 1000));


if (localStorage.getItem(LOCALSTORAGE_CURTIME_KEY)) {
    player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_CURTIME_KEY))
} else {
    player.setCurrentTime(0)
};


