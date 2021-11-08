const state = {
    play: false,
};

const playButton = document.getElementById('play-button');
const backButton = document.getElementById('back-button');
const timeElapsedBar = document.getElementById('time-elapsed');
const audio = document.createElement("AUDIO");
audio.src = './bensound-ukulele.mp3';

let playAudioInterval;

const changeAudioButtons = () =>{
    if(state.play){
        playButton.classList.replace('fa-play','fa-pause');
    } else {
        playButton.classList.replace('fa-pause','fa-play');
    }
};

const playAudio = () =>{
    if(state.play && audio.currentTime < audio.duration){
        audio.play();
        playAudioInterval = setInterval(()=>{
            timeElapsedBar.style.width = `${(audio.currentTime/audio.duration) * 100}%`
        }, 1000);
    } else {
        audio.pause();
        clearInterval(playAudioInterval);
    };
};

playButton.addEventListener('click', () => {
    state.play = !state.play;
    changeAudioButtons();
    playAudio();
});
backButton.addEventListener('click', () => {
    audio.currentTime = 0;
    timeElapsedBar.style.width = `0`;
});
