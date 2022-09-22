async function setupCamera() {
  let video = document.getElementById("video");

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      height: { ideal: 1920 },
      width: { ideal: 1920 },
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

function drawWebcamContinuous() {
  ctx.drawImage(video, 0, 0);
  requestAnimationFrame(drawWebcamContinuous);
}

let canvas;
let ctx;

async function main() {
  await setupCamera();
  video.play();

  canvas = document.getElementById("facecanvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx = canvas.getContext("2d");

  drawWebcamContinuous();

  console.log("CAMARA WORKING");
}

document.addEventListener("DOMContentLoaded", main);
