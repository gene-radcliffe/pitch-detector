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

export { stopNote }