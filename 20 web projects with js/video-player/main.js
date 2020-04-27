const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
const timestamp = document.getElementById('timestamp')

//Play and Pause video
const toggleVideoStatus = () => video.paused ? video.play() : video.pause()

//Update play icon to pause when the video is paused
const updatePlayIcon = () => video.paused ? play.innerHTML = '<i class="fa fa-play fa-2x">' : play.innerHTML = '<i class="fa fa-pause fa-2x">'

//Updating the progress bar
const updateProgress = () => {
    progress.value = (video.currentTime / video.duration) * 100

    let mins = Math.floor(video.currentTime / 60)
    if (mins < 10) mins = `0${mins}`

    let secs = Math.floor(video.currentTime % 60)
    if (secs < 10) secs = `0${secs}`

    timestamp.textContent = `${mins}:${secs}`
}

const stopVideo = () => {
    video.currentTime = 0
    video.pause()
}

const setVideoProgress = () => {
    video.currentTime = (+progress.value * video.duration / 100)
}


//Event handlers
video.addEventListener('click', toggleVideoStatus)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)
play.addEventListener('click', toggleVideoStatus)
stop.addEventListener('click', stopVideo)
progress.addEventListener('change', setVideoProgress)