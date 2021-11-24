song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;


function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(600, 500);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('poseNet is Initialized');
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);

}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#42f5cb");
    stroke("#425af5");

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHtml = "speed = 0.5x";
            song.rate(0.5);
        }

        if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHtml = "speed = 1x";
            song.rate(1);
        }

        if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHtml = "speed = 1.5x";
            song.rate(1.5);
        }

        if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHtml = "speed = 2x";
            song.rate(2);
        }

        if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHtml = "speed = 2.5x";
            song.rate(2.5);
        }
    }

    if (scoreLeftWrist > 0.2)
        circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals / 500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);
}

function stop() {
    song.stop();
}

function pause() {
    song.pause();
}


function gotPoses(results) {
    if (results.length > 0)

    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftwristX = " + leftWristX + " leftWristY = " + leftWristY);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightwristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}