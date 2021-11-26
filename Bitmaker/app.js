class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.currentkick = "./sounds/kick-classic.wav";
        this.currentsnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat-acoustic01.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 250;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtn = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }

    activepad(){
        this.classList.toggle("active");
    }

    repeat(){
        let step = this.index % 8;
        const activebars = document.querySelectorAll(`.b${step}`);
        // loop over the pads
        
        activebars.forEach(bar => {
             bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
             if(bar.classList.contains('active')){

                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime=0;
                     this.kickAudio.play();
                } 
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime=0;
                    this.snareAudio.play();
                } 
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime=0;
                    this.hihatAudio.play();
                } 
             }
    });
        this.index++;

    }
    start(){
        // console.log(this);
        const interval = (60/this.bpm)*1000;

        if(this.isPlaying){
        clearInterval(this.isPlaying)
        this.isPlaying = null;
    }else{
        // clear the interval
        this.isPlaying =  setInterval(() => {
            this.repeat()
        },interval);
        
    }
        
    }

    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.remove("active");
         } else{
            this.playBtn.innerText = "play";
            this.playBtn.classList.remove("active");
            }
        }

        changesound(e){
            const selectName = e.target.name;
            const selectionValue = e.target.value;
             switch(selectName){
                 case "kick-select":
                     this.kickAudio.src = selectionValue;
                     break;
                case "snare-select":
                     this.snareAudio.src = selectionValue;
                     break;
                case "hihat-select":
                    this.hihatAudio.src = selectionValue;
                    break;

             }

        }

        mute(e){
            const muteindex = e.target.getAttribute("data-track");
            e.target.classList.toggle("active");
            if(e.target.classList.contains("active")){
                switch(muteindex){
                    case "0":
                        this.snareAudio.volume=0;
                        break;
                    case "1":
                        this.kickAudio.volume=0;
                        break;
                    case "2":
                        this.hihatAudio.volume=0;
                        break;
                }
            }
            else{
                switch(muteindex){
                    case "0":
                        this.snareAudio.volume=1;
                        break;
                    case "1":
                        this.kickAudio.volume=1;
                        break;
                    case "2":
                        this.hihatAudio.volume=1;
                        break;
                }
            }
        }

        changeTempo(e){
            const tempoText = document.querySelector(".tempo-nr");
            
            tempoText.innerText = e.target.value;
        }

        updateTempo(e){
            this.bpm = e.target.value;
           clearInterval(this.isPlaying);
           this.isPlaying = null;
           const playBtn = document.querySelector(".play");
           if(playBtn.classList.contains("active")){
              this.start();
           }
        }

    }



const drumkit = new DrumKit();

// Events Listners

drumkit.pads.forEach(pad => {
   pad.addEventListener("click",drumkit.activepad);
   pad.addEventListener('animationend',function(){
       this.style.animation = "";
   });
});



drumkit.playBtn.addEventListener("click",function(){
    drumkit.updateBtn();
    drumkit.start();
});

drumkit.selects.forEach(select => {
       select.addEventListener("change",function(e){
           drumkit.changesound(e);
       });
});

drumkit.muteBtn.forEach(btn => {
    btn.addEventListener("click",function(e){
         drumkit.mute(e);
    });
});

drumkit.tempoSlider.addEventListener("input",function(e){
 drumkit.changeTempo(e);
});
drumkit.tempoSlider.addEventListener("change",function(e){
    drumkit.updateTempo(e);
});