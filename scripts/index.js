const state = {
    play: false,
    currentTrack: String,
    seconds: 0,
    minutes: 0,
    currentVolume: 0,
    previousVolume:0,
    muted: false
};

let playAudioInterval;

// audio buttons
const playButton = document.getElementById('play-button');
const backButton = document.getElementById('back-button');
const minusButton = document.getElementById('minus-10-secs');
const plusButton = document.getElementById('plus-10-secs');
const audioTitle = document.getElementById('audio-title');
const muteButton = document.getElementById('mute-button');
const audioSlider = document.getElementById('myRange');

const duration = document.getElementById('duration');
const currentTime = document.getElementById('currentTime');
const timeElapsedBar = document.getElementById('time-elapsed');
const cards = document.getElementsByClassName('card');
const trackList = [
  'https://dev-sfbh.pantheonsite.io/sites/default/files/2021-10/FtVigilance-FinalCut1%20%281%29.mp3', 
  'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'
];

state.currentTrack = trackList[0]
const audio = document.createElement("AUDIO");
audio.src = state.currentTrack;
state.currentVolume = audio.volume = audioSlider.value / 100;

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "0";
    var sDisplay = s >= 0 ? (s < 10 ? `0${s}` : s) : "0";
    return hDisplay + "" + mDisplay + ":" + sDisplay; 
}

const handleSliderChange = event =>{
    state.currentVolume = audio.volume = event.target.value / 100;
    audio.volume == 0.01 ? audio.volume = 0 : null;
    console.log(state.volume, audio.volume);
}

const changeAudioButtons = () =>{
    if(state.play){
        playButton.classList.replace('fa-play','fa-pause');
    } else {
        playButton.classList.replace('fa-pause','fa-play');
    };
};

const toggleAudio = () =>{
    if(state.play && audio.currentTime < audio.duration){
        audio.play();
        playAudioInterval = setInterval(()=>{
          state.seconds++;
          if (state.seconds >= 10){
            state.minutes++;
            state.seconds = 0;
          };
          timeElapsedBar.style.width = `${(audio.currentTime/audio.duration) * 100}%`
          currentTime.innerHTML = `${secondsToHms(audio.currentTime)}`;
          duration.innerHTML = `${secondsToHms(audio.duration)}`;
          console.log();
        }, 1000);
    } else {
        audio.pause();
        clearInterval(playAudioInterval);
    };
};

playButton.addEventListener('click', () => {
    state.play = !state.play;
    changeAudioButtons();
    toggleAudio();
});

muteButton.addEventListener('click', () => {
    state.muted ? (audio.volume = state.previousVolume, audioSlider.value = state.previousVolume * 100, state.muted = !state.muted) : (state.previousVolume = state.currentVolume, audio.volume = 0, audioSlider.value = 0, state.muted = !state.muted);
    console.log(`the previous volume was `,state.previousVolume);
});

backButton.addEventListener('click', () => {
    audio.currentTime = 0;
    state.seconds = 0;
    state.minutes = 0;
    currentTime.innerHTML = `0:00`;
    timeElapsedBar.style.width = '0';
});

minusButton.addEventListener('click', () => {
    audio.currentTime = audio.currentTime - 10;
    currentTime.innerHTML = `${secondsToHms(audio.currentTime)}`;
    timeElapsedBar.style.width = `${(audio.currentTime/audio.duration) * 100}%`;
});

plusButton.addEventListener('click', () => {
    audio.currentTime = audio.currentTime + 10;
    currentTime.innerHTML = `${secondsToHms(audio.currentTime)}`;
    timeElapsedBar.style.width = `${(audio.currentTime/audio.duration) * 100}%`;
});

for(let i=0;i < cards.length; i++){
  cards[i].addEventListener('click', e=>{
    if(e.target.id === 'other'){
      console.log(e.target.childNodes[1].innerHTML);
      audioTitle.innerHTML = `<h2>${e.target.childNodes[1].innerHTML}</h2>`;
      state.currentTrack = trackList[1];
      console.log(state.currentTrack)
    } else {
      console.log(e.target.childNodes[1].innerHTML);
      audioTitle.innerHTML = `<h2>${e.target.childNodes[1].innerHTML}</h2>`;
      state.currentTrack = trackList[1];
      state.currentTrack = trackList[0];
      console.log(state.currentTrack)
    };
  });
};
