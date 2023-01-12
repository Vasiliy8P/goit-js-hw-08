import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);


const onPlay = function({ seconds }) {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(seconds))
}

player.on('timeupdate', throttle(onPlay, 1000));

// player.on('timeupdate', throttle(function({ seconds }) {
//     localStorage.setItem("videoplayer-current-time", seconds)
// }, 1000));

const lastCurrentTime = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(lastCurrentTime).then(function(seconds) {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(seconds))
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;
    }
});
