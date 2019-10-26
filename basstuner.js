import {RecordedNotes as TestNotes} from './recordednotes.js'
import {recordedBassNotes as RecordedBassNotes} from './moduleRecordedNotes.js'

let audioAnalyser= null;
let audioCntxt = null;
let masterGainNode = null;
let canvas =null;
let canvasCntxt= null;
let constraint = {audio: true, video: false,}
let WIDTH = null
let HEIGHT = null
let drawWave;
let fps =0;


function fill(context2d){
  context2d.fillStyle = 'rgb(200, 200, 200)';
  context2d.fillRect(0, 0, WIDTH, HEIGHT);
}

//listener functions
function initialize2G(){
    canvasCntxt = getContext2G()
    fill(canvasCntxt) 

}

function getContext2G(canvasElement){
  
  if(canvasElement){
    return canvasElemen.getContext("2d");
  }
  canvas = document.querySelector("canvas")
  return canvas.getContext("2d");
}
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function visualize2(){
  
  var framerate =1000/32
  var time2 
  var timetaken
  var draw= function(){
    drawWave = requestAnimationFrame(draw);
    var time1 = Date.now() 
    
    
    sleep(100).then(()=>{
      console.log("Promise resolved")
      time2= Date.now();
      timetaken = (time2 - time1) 
      fps =(timetaken)/1000
      //fps = ( - fps)
      console.log("FPS: " + fps )
    })
   
   
   
  }
  draw()
}
//2G context must be initialize 
function visualize(){
	WIDTH = canvas.width;
  HEIGHT = canvas.height;
  
  audioAnalyser.fftSize = 32768;
	let bufferLength = audioAnalyser.frequencyBinCount;
	let dataArray = new Uint8Array(bufferLength);
 

  canvasCntxt.clearRect(0,0,WIDTH, HEIGHT)

  var draw = function(){
	
  	  drawWave = requestAnimationFrame(draw);

      audioAnalyser.getByteTimeDomainData(dataArray);
 		
    	fill(canvasCntxt)
        
      canvasCntxt.lineWidth = 2;
      canvasCntxt.strokeStyle = 'rgb(0, 0, 0)';

      canvasCntxt.beginPath();

      let sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;
      //console.log("Width and Height: " + WIDTH + "," + HEIGHT )
      for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;
 				
        if(i === 0) {
          canvasCntxt.moveTo(x, y);
        } else {
          canvasCntxt.lineTo(x, y);
        }
        
        x += sliceWidth;
       
        
      }
      
      canvasCntxt.lineTo(canvas.width, canvas.height/2);
      canvasCntxt.stroke();
 			const myDataArray = new Float32Array(audioAnalyser.frequencyBinCount); 
      // fill the Float32Array with data returned from getFloatFrequencyData()
      audioAnalyser.getFloatFrequencyData(myDataArray);
		
			//console.log(myDataArray)
  }
  	draw();
}
function initializeBassTuner(){
  //set audio context
  audioCntxt = new (window.AudioContext||window.webkitAudioContext);

  //create analyser
  audioAnalyser = audioCntxt.createAnalyser();
  audioAnalyser.minDecibels = -90;
  audioAnalyser.maxDecibels = -10; 
  audioAnalyser.smoothingTimeConstant = 0.85;
  //gain node

  masterGainNode = audioCntxt.createGain()
  masterGainNode.gain.value =0.8
  masterGainNode.connect(audioCntxt.destination)
  // create the keys
  RecordedBassNotes.initializeModule(audioCntxt, audioAnalyser,masterGainNode)
  
  // initialize the 2G Context
  initialize2G()

  // start the oscillator animation 
  visualize();

  //stop
  var stop = document.querySelector(".stop")
  stop.addEventListener("click",(e)=>{
        window.cancelAnimationFrame(drawWave);
  })



}
	

export {initializeBassTuner, visualize2}
