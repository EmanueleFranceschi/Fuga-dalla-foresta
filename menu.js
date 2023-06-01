

//function playSound(audioName,loop){
    //let s = new Audio(audioName);
    //s.loop = loop;
    //s.play();
//}




var musicSlider = null;

function intro(){
    let s = document.getElementById("intro");
    return s;
}

function buttonClick(){
    let b = document.getElementById("intro");
    return b;
}


let contSound=0;
function soundMenu(){
    if(contSound==0){
        document.getElementById("soundButton").src= "imgMenu/soundMuted.png";
        console.log("suono attivo")
        contSound++;
    }else{
        contSound--;
        document.getElementById("soundButton").src="imgMenu/sound.png";
        console.log("suono disattivato")
    }
    
    
}
document.addEventListener('DOMContentLoaded', function() {
    if(window.location.pathname=="/Opzioni.html" || 
    window.location.pathname=="/login.html" || 
    window.location.pathname=="/help.html" || 
    window.location.pathname=="/credits.html" || 
    window.location.pathname=="/classifica.html" || 
    window.location.pathname=="/livelli.html"){
        musicMenu();
        console.log("a");
    }
    console.log(window.location.pathname);
}, false);



class Music{
    #music;
    #path;
    
    constructor(){
        this.#music=false;
        this.#path=true;
    }

    get music(){
        return this.#music;
    }
    get path(){
        return this.#path;
    }
    set music(music){
        this.#music=music;
    }
    set path(path){
        this.#path=path;
    }

    
}
let m = new Music();




//fare che le modifiche di potions si applichino



function volumeMusicSlider() {
    musicSlider = document.getElementById("musicSlider").value;
    intro().volume=0+"."+musicSlider;
}

function volumeSoundSlider() {
    intro().volume=0+"."+document.getElementById("musicSlider").value;

}

function musicMenu(){
    if(m.path==true && (window.location.pathname=="/Opzioni.html" || 
    window.location.pathname=="/login.html" || 
    window.location.pathname=="/help.html" || 
    window.location.pathname=="/credits.html" || 
    window.location.pathname=="/classifica.html" || 
    window.location.pathname=="/livelli.html")){
        m.music=true;
        document.getElementById("musicButton").src="imgMenu/music.png";
        m.path=false;
        intro().play();
        intro().volume = 0+"."+musicSlider;

       
    }else{
        if(!m.music){
            document.getElementById("musicButton").src= "imgMenu/music.png";
            console.log("musica attivo")
            m.music=true;
            console.log(m.music)
    
            intro().play();
            console.log(0+"."+musicSlider)
            intro().volume = 0+"."+musicSlider;
        }else{
            document.getElementById("musicButton").src="imgMenu/musicMuted.png";
            console.log("musica disattivato")
            console.log(m.music)
            m.music=false;
            console.log(m.music)
    
            intro().pause();
        }
    }
    
    
}