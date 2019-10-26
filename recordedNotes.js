
export class RecordedNotes{
  
    constructor(){console.log("Recorded Notes") }

    createAudioNotes(){
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
        
        console.log(audio)
        return audio
      
      }
      
      createAudioKeys(){
                     
        var notes = []
        notes = this.createAudioNotes()
        var kContainer = document.querySelector(".audio-keys")
        
  
        notes.forEach((note, idx)=>{
            var keys = 		Object.entries(note)
          
          keys.forEach((k)=>{
              kContainer.appendChild(this.createAudioKey(k[0],k[1], idx))
          })
        
        })
      }
      createAudioKey(note, link, octave){
        //Create a button on the fly
        var kButton = document.createElement("button")
        kButton.dataset["note"] = note
        kButton.dataset["link"] = link
        
        kButton.innerText = note + octave
        kButton.className = "audio-key"
        
        kButton.addEventListener("mousedown", (e)=>{this.audioNotePressed(e)})
        kButton.addEventListener("mouseleave", (e)=> {this.audioNoteReleased(e)})
        return kButton // return the button
      }

      audioNotePressed(event){
        console.log(event )
      }
      audioNoteReleased(event){
        console.log(event)
      }
}
