
var recordedBassNotes = (function(){
    //private variables
    let modAudioContext,modMasterGain, modAudioAnalyser;
    var createAudioNotes, loadModule;
    var track
    loadModule = function(audioContext, audioAnalyser,gainNode){

        modAudioContext = audioContext
        modAudioAnalyser = audioAnalyser
        modMasterGain = gainNode
        createPlayButons()
    }
    createAudioNotes = function(){
        let audio=[]
      
        for(var i=0; i<=2; i++){
          audio[i]=[]
        }
        audio[0]["B"] = "none"
        audio[1]["C"] = "none"
        audio[1]["C#"] = "none" //34.65 
        audio[1]["D"] =  "none" //36.71
        audio[1]["Eb"] = "none" //38.89
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
    };

    function createPlayButons(){
        var notes = []
        notes = createAudioNotes()
        var controlDeck = document.querySelector(".audio-keys")

        notes.forEach((items,index)=>{
            var entries = Object.entries(items)
            entries.forEach((keys)=>{  
                var button = document.createElement("button")
                
                button.dataset["note"] = keys[0]
                button.dataset["url"] = keys[1]
                button.innerText = button.dataset["note"]
                button.addEventListener("click",(e)=>{
                    buttonPressed(e);
                })
                
                controlDeck.appendChild(button)
            })
        })
    }
     
    function playCompleted(e){
        alert(e.target.dataset["note"])
    }
    function buttonPressed(event){
        var dataset = event.target.dataset
        var audio = new Audio()
        audio.volume = 0.8
        audio.src = dataset["url"]
        audio.crossOrigin = "anonymous"
        track = modAudioContext.createMediaElementSource(audio)
        track.connect(modAudioAnalyser)
        track.connect(modMasterGain)
        
        audio.play()
        audio.addEventListener("ended", (e)=>{
           // alert("done")
        })
    }
    

    return {
        initializeModule: loadModule,
        
    }

})();

export {recordedBassNotes}