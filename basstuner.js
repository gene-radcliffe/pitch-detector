let audioAnalyser= null;
let audioCntxt = null;
let source = null;
let masterGainNode = null;
let canvas =null;
let canvasCntxt= null;
let constraint = {audio: true, video: false,}
let WIDTH = null
let HEIGHT = null
let notes=null
let drawWave;
let oscList=[]
let audioNotes = []

function createNotes(){
	let tones=[]

    for(var i=0; i<=2; i++){
      tones[i]=[]
    }
    tones[0]["B"] = 30.87
    tones[1]["C"] = 32.70
    tones[1]["C#"] = 34.65 
    tones[1]["D"] =  36.71
    tones[1]["Eb"] = 38.89
    tones[1]["E"] = 41.20
    tones[1]["F"] = 43.65
    tones[1]["F#"] = 46.25 
    tones[1]["G"] =  49.00
    tones[1]["G#"] = 51.91
    tones[1]["A"] = 55.00 
    tones[1]["Bb"] = 58.27
    tones[1]["B"] = 61.74
    tones[2]["C"] = 65.41
    tones[2]["C#"] = 69.30
    tones[2]["D"] = 73.42
    tones[2]["Eb"]= 77.78
    tones[2]["E"] = 82.41
    tones[2]["F"] = 87.31
    tones[2]["F#"] = 92.50
    tones[2]["G"] = 98.00


return tones
}
function createAudioNotes(){
  let audio=[]

  for(var i=0; i<=2; i++){
    audio[i]=[]
  }
  audio[0]["B"] = ""
  audio[1]["C"] = ""
  audio[1]["C#"] = 34.65 
  audio[1]["D"] =  36.71
  audio[1]["Eb"] = 38.89
  audio[1]["E"] = "https://s3.amazonaws.com/generadcliffe/audio/E1.mp3"
  audio[1]["F"] = "https://s3.amazonaws.com/generadcliffe/audio/F1.mp3"
  audio[1]["F#"] = "https://s3.amazonaws.com/generadcliffe/audio/F1%23.mp3"
  audio[1]["G"] = "https://s3.amazonaws.com/generadcliffe/audio/G1.mp3"
  audio[1]["G#"] = "https://s3.amazonaws.com/generadcliffe/audio/G1%23.mp3"
  audio[1]["A"] = "https://s3.amazonaws.com/generadcliffe/audio/A1.mp3" 
  audio[1]["Bb"] = "https://s3.amazonaws.com/generadcliffe/audio/B1b.mp3"
  audio[1]["B"] = "https://s3.amazonaws.com/generadcliffe/audio/B1.mp3"
  audio[2]["C"] = "https://s3.amazonaws.com/generadcliffe/audio/C1.mp3"
  audio[2]["C#"] = "https://s3.amazonaws.com/generadcliffe/audio/C1%23.mp3"
  audio[2]["D"] = "https://s3.amazonaws.com/generadcliffe/audio/D1.mp3"
  audio[1]["Eb"] = "https://s3.amazonaws.com/generadcliffe/audio/D1%23.mp3"
  audio[2]["E"] = "https://s3.amazonaws.com/generadcliffe/audio/E2.mp3"
  audio[2]["F"] = "https://s3.amazonaws.com/generadcliffe/audio/F2.mp3"
  audio[2]["F#"] = "https://s3.amazonaws.com/generadcliffe/audio/F2%23.mp3"
  audio[2]["G"] = "https://s3.amazonaws.com/generadcliffe/audio/G2.mp3"
  

  return audio

}

function createAudioKeys(){
  audioNotes = createAudioNotes();
  var kContainer = document.querySelector(".audio-keys")
  
  
  notes.forEach((note, idx)=>{
  	var keys = 		Object.entries(note)
    
    keys.forEach((k)=>{
    	kContainer.appendChild(createKey(k[0],k[1], idx))
    })
  
  })
}
function crateAudioKey(note, link, octave){
  var kButton = document.createElement("button")
  kButton.dataset["note"] = note
  kButton.dataset["link"] = link
  
  kButton.innerText = note + octave
  kButton.className = "audio-key"
  
  kButton.addEventListener("mousedown", audioNotePressed)
  kButton.addEventListener("mouseleave", audioNoteReleased)
  return kButton
}
function createKeys(){
	notes = createNotes();
  var kContainer = document.querySelector(".tone-keys")
  
  
  notes.forEach((note, idx)=>{
  	var keys = 		Object.entries(note)
    
    keys.forEach((k)=>{
    	kContainer.appendChild(createKey(k[0],k[1], idx))
    })
  
  })
}	
function createKey(note, frequency, octave){
	var kButton = document.createElement("button")
  kButton.dataset["note"] = note
  kButton.dataset["frequency"] = frequency
  
  kButton.innerText = note + octave
  kButton.className = "tone-key"
  
  kButton.addEventListener("mousedown", notePressed)
  kButton.addEventListener("mouseleave", noteReleased)
  return kButton
  
}
function fill(context2d){
  context2d.fillStyle = 'rgb(200, 200, 200)';
  context2d.fillRect(0, 0, WIDTH, HEIGHT);
}
//listener functions
function notePressed(event){
	var dataset = event.target.dataset
	if(!dataset["pressed"]){
 		oscList[dataset["note"][dataset["frequency"]]] = playNote(dataset["frequency"]) 
  	dataset["pressed"]="true"
  }
}

function noteReleased(event){
		var dataset = event.target.dataset
    
    if(dataset && dataset["pressed"]){
    		oscList[dataset["note"][dataset["frequency"]]].stop();
    		oscList[dataset["note"][dataset["frequency"]]] =null
    }
}
function playNote(frequency){
	var osc = audioCntxt.createOscillator()
  osc.connect(audioAnalyser)
  osc.type = 'sine'
  console.log(frequency)
  osc.frequency.value=frequency
  osc.start();
  return osc
}
function stopNote(event){
	console.log("stop")
  
}
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
		
			console.log(myDataArray)
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
//masterGainNode.connect(audioCntxt.destination)

// create the keys
createKeys() 
createAudioKeys()
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

function loadAudio(){
	var audioElement= document.querySelector("audio")
  track = audioCntxt.createMediaElementSource(audioElement)
 
  
  var play = document.querySelector(".play")

  play.addEventListener("click", (e)=>{
  
  		
  		track.connect(audioAnalyser)
      

      audioElement.play()
  })
}	

