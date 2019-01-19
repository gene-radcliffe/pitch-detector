

let audioAnalyser= null;
let audioCntxt = null;
let source = null;
let masterGainNode = null;
let constraint = {audio: true, video: false,}
let freqDomainDataArry=null;
let bufferLength = null;
let fftSize = 32768
//set audio context
audioCntxt = new (window.AudioContext||window.webkitAudioContext);

//create analyser
audioAnalyser = audioCntxt.createAnalyser();
audioAnalyser.minDecibels = -90;
audioAnalyser.maxDecibels = -10;
audioAnalyser.smoothingTimeConstant = 0.85;
audioAnalyser.fftSize = fftSize;
bufferLength = audioAnalyser.frequencyBinCount

//

//get user media source
navigator.mediaDevices.getUserMedia(constraint)
.then((stream)=>{
	//create the media source from the stream (microhpone)
	source = audioCntxt.createMediaStreamSource(stream);
  
  //create a gain node. 
 	masterGainNode = audioCntxt.createGain();
    masterGainNode.connect(audioCntxt.destination)
    masterGainNode.gain.value=0.0
  
   //route the proper output
   //source.connect(masterGainNode) 
   //masterGainNode.connect(audioAnalyser)
  
   source.connect(audioAnalyser) 
   //masterGainNode.connect(audioAnalyser)
  
  
    //connect analyser to render
	//audioAnalyser.connect(audioCntxt.destination)   
    var msg = document.querySelector(".msg-box")
    if(msg.classList.contains("error")){
        msg.classList.remove("error")   
    }
    msg.classList.add("engaged")
  
})
.catch((err)=>{
        var msg = document.querySelector(".msg-box")
        msg.innerText = "error: " + err
        msg.classList.add("error")
})
