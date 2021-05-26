//grab the video dom element
const video = document.querySelector("video");
const time = document.getElementById("time");
const buffer = document.getElementById("buffer");
const speed = document.getElementById("speed");
const goto = document.getElementById("goto");
const link = document.getElementById("link");
// const notifications = document.querySelectorAll('.notification');
// const forwardNotificationValue = document.querySelector('.video-forward-notify span');
// const rewindNotificationValue = document.querySelector('.video-rewind-notify span');

// let timer;
// let rewindSpeed = 0;
// let forwardSpeed = 0;
const TIME = 5;
speed.innerHTML = video.playbackRate;
const round = (num, digit = 1) =>
  Math.round(num * Math.pow(10, digit)) / Math.pow(10, digit);
video.onloadeddata = function () {
  setTimeout(() => video.play(), 3000);
};

video.onwaiting = function () {
  // alert("Wait! I need to buffer the next frame");
  console.log("buffering....");
};

video.addEventListener("loadstart", function (event) {
  console.log("buffering....");
  buffer.style.display = "block";
});

video.addEventListener("canplay", function (event) {
  console.log("playing");
  buffer.style.display = "none";
  if (video.paused) {
    video.play();
  }

  setInterval(() => {
    time.innerHTML = `${round(video.currentTime, 0)}/${round(
      video.duration,
      0
    )}`;
  }, 1000);
});

goto.addEventListener("blur", () => {
  if (!goto.value) return;
  video.currentTime = goto.value;
  goto.value = null;
});

link.addEventListener("blur", () => {
  let src = link.value;
  if (!src) return;
  video.setAttribute("src", src);
  video.play();
  link.value = null;
});

(function () {
  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == "38") {
      // up arrow
      video.playbackRate = round(video.playbackRate + 0.1);
      console.log("speed is :", (speed.innerHTML = video.playbackRate));
    } else if (e.keyCode == "40") {
      // down arrow
      video.playbackRate = round(video.playbackRate - 0.1);
      console.log("speed is :", (speed.innerHTML = video.playbackRate));
    } else if (e.keyCode == "37") {
      // left arrow
      video.currentTime = video.currentTime - TIME;
      console.log("current time :", round(video.currentTime));
    } else if (e.keyCode == "39") {
      // right arrow
      video.currentTime = video.currentTime + TIME;
      console.log("current time :", round(video.currentTime));
    } else if (e.keyCode == 32) {
      if (video.paused) {
        video.currentTime = video.currentTime - 5;
        video.play();
      } else {
        video.pause();
      }
    }
  }
})();

//function for double click event listener on the video
// //todo change those variable to html5 data attributes
// function updateCurrentTime(delta) {
//   let isRewinding = delta < 0;

//   if (isRewinding) {
//     rewindSpeed = rewindSpeed + delta;
//     forwardSpeed = 0;
//   } else {
//     forwardSpeed = forwardSpeed + delta;
//     rewindSpeed = 0;
//   }

//   //clear the timeout
//   clearTimeout(timer);

//   let speed = (isRewinding ? rewindSpeed : forwardSpeed);
//   video.currentTime = video.currentTime + speed;

//   let NotificationValue = isRewinding ? rewindNotificationValue : forwardNotificationValue;
//   NotificationValue.innerHTML = `${Math.abs(speed)} seconds`;

//   //reset accumulator within 2 seconds of a double click
//   timer = setTimeout(function () {
//     rewindSpeed = 0;
//     forwardSpeed = 0;
//   }, 2000); // you can edit this delay value for the timeout, i have it set for 2 seconds
//   console.log(`updated time: ${video.currentTime}`);
// }

// function animateNotificationIn(isRewinding) {
//   isRewinding ? notifications[0].classList.add('animate-in') : notifications[1].classList.add('animate-in');
// }

// function animateNotificationOut() {
//   this.classList.remove('animate-in');
// }

// function forwardVideo() {
//   updateCurrentTime(10);
//   animateNotificationIn(false);
// }

// function rewindVideo() {
//   updateCurrentTime(-10);
//   animateNotificationIn(true);
// }

// //Event Handlers
// function doubleClickHandler(e) {
//   console.log(`current time: ${video.currentTime}`);
//   const videoWidth = video.offsetWidth;
//   (e.offsetX < videoWidth / 2) ? rewindVideo() : forwardVideo();
// }

// function togglePlay() {
//   video.paused ? video.play() : video.pause();
// }

// //Event Listeners
// // video.addEventListener('click', togglePlay);
// // video.addEventListener('dblclick', doubleClickHandler);
// // notifications.forEach(function (notification) {
// //   notification.addEventListener('animationend', animateNotificationOut);
// // });
