

let audioAnalyser= null;
let audioCntxt = null;
let source = null;
let masterGainNode = null;
let constraint = {audio: true, video: false,}
let freqDomainDataArry=null;
let bufferLength = null;
let fftSize = 32768
let listenerProcedure = null

//stop button
var sw = document.querySelector(".switch")
sw.addEventListener('click',(e)=>{
    let state = e.target.innerText
    console.log(state)
    switch(state){
        case "Start":
                initialize();
                listenerProcedure= window.setInterval(listener, 500)
                e.target.innerText="Stop"
                var msg = document.querySelector(".msg-box")
                if(msg.classList.contains("error")){
                    msg.classList.remove("error")   
                }
                msg.classList.remove("regular")   
                msg.classList.add("engaged")
                msg.innerText =  "engaged"
                break;
        case "Stop":
                window.clearInterval(listenerProcedure)
                var msg = document.querySelector(".msg-box")
                msg.classList.remove("engaged")
                msg.classList.add("regular")
                
                msg.innerText =  "off"
                e.target.innerText="Start"
                break;
    }
   
})

function initialize(){
    //set audio context
audioCntxt = new (window.AudioContext||window.webkitAudioContext);

//create analyser
audioAnalyser = audioCntxt.createAnalyser();
audioAnalyser.minDecibels = -100;
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
    
    

    
})
.catch((err)=>{
        var msg = document.querySelector(".msg-box")
        msg.innerText = "error: " + err
        msg.classList.add("error")
        alert(err)
})

}
function listener(){

    freqDomainDataArry = new Float32Array(audioAnalyser.frequencyBinCount); 
    // fill the Float32Array with data returned from getFloatFrequencyData()
    audioAnalyser.getFloatFrequencyData(freqDomainDataArry);
    console.log(freqDomainDataArry)
}