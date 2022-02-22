let video = document.getElementById('video')
let playPause = document.getElementById('playPause')
let currentTime = document.getElementById('currentTime')
let totalTime = document.getElementById('totalTime')
let minus10 = document.getElementById('minus10')
let plus10 = document.getElementById('plus10')
let mute = document.getElementById('mute')
let volumeRocker = document.getElementById('volumeRocker')
let fullScreen = document.getElementById('fullScreen')
let progressBar = document.getElementById('progressBar')
let bar = document.getElementById('bar')
let container = document.getElementsByClassName('container')[0]

function convertHMS(value) {
  const sec = parseInt(value, 10);
  let hours   = Math.floor(sec / 3600); 
  let minutes = Math.floor((sec - (hours * 3600)) / 60);
  let seconds = sec - (hours * 3600) - (minutes * 60);
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  if(hours == 0) {
    return minutes+':'+seconds;
  } else {
    return hours+':'+minutes+':'+seconds;
  }
}

function getVideoDimensions() {
  let h = video.videoHeight
  let w = video.videoWidth
  let rate
  if(h > w) {
    rate = h / w
    container.style.width = ``
    container.style.height = `100vh`
  } else {
    rate = w / h
    container.style.width = `65vw`
    container.style.height = `calc(65vw / ${rate})`
  }
}

video.addEventListener('loadeddata',function() {
  let dur = convertHMS(video.duration)
  volumeRocker.value = video.volume * 100
  currentTime.innerHTML = convertHMS(video.currentTime)
  totalTime.innerHTML = dur
  getVideoDimensions()
})

video.addEventListener('playing', function(){
  playPause.src = "./Assets/icons/pause.png"
})

video.addEventListener('pause', function(){
  playPause.src = "./Assets/icons/play.png"
})

video.addEventListener('click', playP)

video.addEventListener('dblclick', full)

video.addEventListener('ended', function() {
  playPause.src = "./Assets/icons/play.png"
  progressBar.value=0
})

video.addEventListener('timeupdate', function(){
  currentTime.innerHTML = convertHMS(video.currentTime)
  progressBar.value = calcWidth()*10
  bar.style.width = `${calcWidth()}%`
})

function calcWidth () {
  let total = video.duration
  let actual = video.currentTime
  let width = ((actual) / total) * 100
  return width
}

playPause.addEventListener('click', playP)

function playP(){
  if(video.paused) {
    video.play()
    playPause.src = "./Assets/icons/pause.png"
  } else {
    video.pause()
    playPause.src = "./Assets/icons/play.png"
  }
}

minus10.addEventListener('click', function(){
  video.currentTime = video.currentTime - 10
})

plus10.addEventListener('click', function(){
  video.currentTime = video.currentTime + 10
})

mute.addEventListener('click', function(){
  if(video.muted) {
    video.muted = false
    if(video.volume > 0.5) {
      mute.src = "./Assets/icons/volumeUp.png"  
    } else {
      mute.src = "./Assets/icons/volumeDown.png"  
    }
  } else {
    video.muted = true
    mute.src = "./Assets/icons/mute.png"
  }
})

volumeRocker.addEventListener('input', function(){
  video.volume = (volumeRocker.value / 100)
  if(video.volume > 0.5) {
    mute.src = "./Assets/icons/volumeUp.png"  
  } else if (video.volume == 0){
    mute.src = "./Assets/icons/mute.png"  
  } else {
    mute.src = "./Assets/icons/volumeDown.png"  
  }
})

fullScreen.addEventListener('click', full)

function full() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) { /* Safari */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { /* IE11 */
    video.msRequestFullscreen();
  }
}

progressBar.addEventListener('input', function(){
  let actual = progressBar.value/10
  video.currentTime = video.duration * (actual/100)
})