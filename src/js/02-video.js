var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
    const player = new Vimeo.Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay ({seconds}) {
localStorage.setItem("videoplayer-current-time", seconds);
        console.log(seconds);
    }

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

player.setCurrentTime(localStorage.getItem("videoplayer-current-time"))