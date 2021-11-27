song1="";
song2="";
song1status="";
song2status="";
rightwristscore=0;
leftwristscore=0;
leftwristx=0;
rightwristx=0;
leftwristy=0;
rightwristy=0;
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.position(400,200);
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',getposes)
}
function modelloaded(){
    console.log("Posenet is Initialized");
}
function stop(){
    song1.stop();
    song2.stop();
}
function getposes(results){
    if (results.length>0){
        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwristx="+leftwristx);
        console.log("leftwristy="+leftwristy);
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("rightwristx="+rightwristx);
        console.log("rightwristy="+rightwristy);
        leftwristscore=results[0].pose.keypoints[9].score;
        rightwristscore=results[0].pose.keypoints[10].score;
    }
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    if(leftwristscore>0.2){
        circle(leftwristx,leftwristy,20);
        song2.stop();
        if(song1status==false){
            song1.play();
            document.getElementById("songname").innerHTML="Playing Harry Poter";
        }
    }
    if (rightwristscore>0.2){
        circle(rightwristx,rightwristy,20);
        song1.stop();
        if(song2status==false){
            song2.play();
            document.getElementById("songname").innerHTML="Playing Peter Pan";
        }
}
}