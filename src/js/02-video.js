
import Player from "@vimeo/player";
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
    const player = new Player(iframe);

player.on('play', function() {
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

const onTimeupdate = function (data) { 
    const currentTime = data.seconds;
    console.log(currentTime);
};

const throttledOnTimeupdate = throttle(onTimeupdate, 1000);

player.on('timeupdate', throttledOnTimeupdate);

