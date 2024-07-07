x = 0;
y = 0;
screen_width=0;
screen_height=0;
apple="";
to_number="";
speak_data="";
draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload(){
  apple = loadImage("apple.png");
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {
console.log(event); 
content = event.results[0][0].transcript;
document.getElementById("status").innerHTML = "Ths speech has been recognized: " + content;
to_number = Number(content);
console.log(to_number);
if (Number.isInteger(to_number)){
  document.getElementById("status").innerHTML = "Started Drawing Apple"
  draw_apple = "set";
}else{
    document.getElementById("status").innerHTML = "The speech has been recognized as: " + content; 
}
}

function setup() {
 screen_width = window.innerWidth;
 screen_height = window.innerHeight;
 canvas = createCanvas(screen_width, screen_height);
 canvas.position(0,150);
}

function draw() {
  if(draw_apple == "set")
  {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speak_data = to_number + "Apples drawn" ;
    speak()
    for (var i = 1; i <= to_number; i++){
      x = Math.floor(Math.random()*(screen_width-100));
      y = Math.floor(Math.random()*(screen_height-200));
      image(apple, x, y, 50, 50);
    }
  }}


function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    speak_data = "" ;
}
