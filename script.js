
console.log("Welcome to spotify")
//initialise variable
let songIndex = 0;
let audioElement = new Audio(' 1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Barrish",filePath:"songs/bollywood_HG 2017 - Baarish.mp3",coverPath:"covers/1.jpg"},
    {songName: "Lost Without You",filePath:"songs/bollywood_HG 2017 - Lost Without You.mp3",coverPath:"covers/4.jpg"},
    {songName: "mortals",filePath:"songs/1.mp3",coverPath:"covers/4.jpg"},
    {songName: "shine",filePath:"songs/2.mp3",coverPath:"covers/5.jpg"},
    {songName: "why we lose",filePath:"songs/3.mp3",coverPath:"covers/5.jpg"},
    {songName: "sky high",filePath:"songs/4.mp3",coverPath:"covers/5.jpg"},
    {songName: "symbolism",filePath:"songs/5.mp3",coverPath:"covers/6.jpg"},
    {songName: "Thodi der",filePath:"songs/bollywood_HG 2017 - Thodi Der.mp3",coverPath:"covers/7.jpg"},
    {songName: "Love theme",filePath:"songs/bollywood_HG 2017 - Half Girlfriend (Love Theme).mp3",coverPath:"covers/8.jpg"},
    {songName: "Phir bhi tumko chahuga",filePath:"songs/bollywood_HG 2017 - Phir Bhi Tumko Chaahunga.mp3",coverPath:"covers/8.jpg"},

];
//audioElement.play();songs/bollywood_HG 2017 - Phir Bhi Tumko Chaahunga.mp3

// Function to play the next song
const playNextSong = () => {
    if (songIndex < songs.length - 1) {
        songIndex++;
        playSong();
    } else {
        songIndex = 0; // Loop back to the first song
        playSong();
    }
};

// Function to play a specific song
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
};

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});
//listen to event
audioElement.addEventListener('timeupdate',()=>{
      console.log('timeupdate');
      //update seekbar
      progress= parseInt((audioElement.currentTime/audioElement.duration)*100)
      myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= myProgressBar.value * audioElement.duration/100
})
// Listen to the 'ended' event for playing the next song
audioElement.addEventListener('ended', playNextSong);

// ... (your existing event listeners)

// Function to initialize song items
const initializeSongItems = () => {
    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        element.getElementsByClassName("songItemPlay")[0].addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = i;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            playSong();
        });
    });
};

// Function to make all plays inactive
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Initialize song items
initializeSongItems();
