class Elemento{
    #x;
    #y;
    /**
     * Classe padre per ogni elemento che deve essere rappresentato sul canvas.
     * @constructor
     * @param {int} x - ascissa del primo punto in alto a sinistra dell'elemento
     * @param {int} y - ordinata del primo punto in alto a sinistra dell'elemento
     */
    constructor (x,y){
        this.x=x;
        this.y=y;
    }
    get x(){
        return this.#x;
    }
    get y(){
        return this.#y;
    }
    set x (x){
        if(x<0 || x>canvas.width)
            throw new Error("errore x elemento");
        this.#x=x;
    }
    set y (y){
        if(y<0 || y>canvas.height)
            throw new Error("errore y elemento");
        this.#y=y;
    }
}

class Livello{
    #elementi;
    /**
     * Classe che rappresenta tutti gli elementi che appartengono al livello.
     * @constructor
     */
    constructor(){
        this.#elementi=[];
    }
    /**
     * Aggiunge un elemento al livello.
     * @param {Elemento} e elemento da aggiungere
     */
    addElemento(e){
        if(e==null) 
            throw new Error("errore add elemento");
        this.#elementi.push(e);
    }
    /**
     * Disegna tutti gli elementi del livello nel canvas.
     */
    disegnaLivello(){
        for(let i=0; i<this.#elementi.length; i++){
            this.#elementi[i].disegna();
        }
    }
}

class Piattaforma extends Elemento{
    #lunghezza;
    #altezza;
    #colore;
    /**
     * Classe che rappresenta piattaforme dove il personaggio ed i nemici possono stare in piedi.
     * @constructor
     * @param {int} x 
     * @param {int} y 
     * @param {int} lunghezza quanti pixel è lunga la piattaforma
     * @param {int} altezza quanti pixel è alta la piattaforma
     * @param {string} colore il colore della piattaforma
     */
    constructor (x,y,lunghezza,altezza,colore){
        super(x,y);
        this.altezza=altezza;
        this.lunghezza=lunghezza;
        this.colore=colore;
    }
    
    get lunghezza(){
        return this.#lunghezza;
    }

    get altezza(){
        return this.#altezza;
    }

    get colore(){
        return this.#colore;
    }
    
    set lunghezza (lunghezza){
        if(lunghezza<=0)
            throw new Error("errore lunghezza piattaforma");
        this.#lunghezza=lunghezza;
    }

    set altezza(altezza){
        if(altezza<=0)
            throw new Error("errore altezza piattaforma");
        this.#altezza=altezza;
    }

    set colore (colore){
        this.#colore=colore;
    }

    /**
     * Disegna la piattaforma nel canvas.
     */
    disegna(){
        context.fillStyle=this.colore;
        context.fillRect(this.x,this.y,this.lunghezza,this.altezza);
    }
}

class Personaggio extends Elemento{
    #velocitaX;
    #velocitaY;
    #staSaltando;
    #lunghezza;
    #altezza;
    #immagine;
    /**
     * Classe che rappresenta il personaggio del gioco. 
     * @constructor
     * @param {int} x 
     * @param {int} y 
     */
    constructor(x,y){
        super(x,y);
        this.velocitaX=0;
        this.velocitaY=0;
        this.lunghezza=50;
        this.altezza=percentualeHeight(15);
        this.#staSaltando=false;
        this.#immagine=new Image();
        this.#immagine.src="characters/runner/Idle__000.png";
    }

    get velocitaX(){
        return this.#velocitaX;
    }
    get velocitaY(){
        return this.#velocitaY;
    }
    get lunghezza(){
        return this.#lunghezza;
    }
    get altezza(){
        return this.#altezza;
    }
    set velocitaX(velocitaX){
        this.#velocitaX=velocitaX;
    }
    set velocitaY(velocitaY){
        this.#velocitaY=velocitaY;
    }
    set lunghezza(lunghezza){
        this.#lunghezza=lunghezza;
    }
    set altezza(altezza){
        this.#altezza=altezza;
    }
    /**
     * Muove il personaggio.
     */
    muovi(){
        if(this.x+this.velocitaX<0){
            this.x=0;
        }else if(this.x+this.velocitaX+this.lunghezza>canvas.width){
            this.x=canvas.width-this.lunghezza;
        }else{
            this.x+=this.velocitaX;
        }

        if(this.x+this.velocitaX<0){
            this.x=0;
        }else if(this.x+this.velocitaX+this.lunghezza>canvas.width){
            this.x=canvas.width-this.lunghezza;
        }else{
            this.x+=this.velocitaX;
        }
    }
    /**
     * Fa saltare il personaggio.
     * @param {int} velocitaY 
     */
    salta(velocitaY){
        if(!this.#staSaltando){
            this.#staSaltando=true;
            this.velocitaY=velocitaY;
            let salta=setInterval(()=>{
                this.y+=this.velocitaY;
            },20);
            setTimeout(()=> {
                clearInterval(salta);
                this.#staSaltando=false;
                if(velocitaY!=10){
                    this.salta(velocitaY+1);
                }
            },60);
        }
    }

    collisione(){
        if(this.velocitaX>0){

        }else{

        }
    }

    atterraggio(){

    }

    /**
     * Disegna il personaggio nel canvas.
     */
    disegna(){
        this.muovi();
        if(this.#immagine.complete)
            context.drawImage(this.#immagine,this.x,this.y,this.lunghezza,this.altezza);
    }
}
class Ostacolo extends Elemento{
    disegna(){

    }
}

let canvas;
let context;
let riferimento;
let livello;
let personaggio;
let sfondo;
function gioca(){
    //rendo il canvas visibile
    canvas = document.getElementById('id');
    context = canvas.getContext('2d');
    canvas.hidden=false;
    document.getElementById("div").hidden=true;
    canvas.height=canvas.width*0.6;
    //creo lo sfondo
    sfondo=new Image();
    sfondo.src="platforms/png/BG/BG.png";
    //creo il livello
    livello=new Livello();
    //creo il pavimento
    let pavimento=new Piattaforma(0,canvas.height-percentualeHeight(20),canvas.width,percentualeHeight(20),"rgb(93, 222, 38)");
    livello.addElemento(pavimento);
    //aggiungo piattaforme
    livello.addElemento(new Piattaforma(400,560,200,15,"rgb(31, 0, 156)"));
    //creo il personaggio
    personaggio=new Personaggio(percentualeWidth(5),pavimento.y-percentualeHeight(15));
    //ogni 10 millisecondi il canvas viene ridisegnato
    riferimento=setInterval(render, 10);
    //inizializzo i controlli
    window.addEventListener("keydown", function(event){
        if(event.code=="KeyD" || event.code=="ArrowRight")
            personaggio.velocitaX=8;
    },false);
    window.addEventListener("keydown", function(event){
        if(event.code=="KeyA" || event.code=="ArrowLeft")
            personaggio.velocitaX=-8;
    },false);
    window.addEventListener("keydown", function(event){
        if(event.code=="KeyW" || event.code=="ArrowUp")
            personaggio.salta(-10);
    },false);
}
/**
 * Disegna lo sfondo, il livello e infine il personaggio.
 */
function render(){
    if(sfondo.complete)
        context.drawImage(sfondo,0,0,canvas.width,canvas.height);
    livello.disegnaLivello();
    personaggio.disegna();
}
/**
 * Calcola una percentuale della width del canvas in pixel.
 * @param {double} percento la percentuale da calcolare
 * @returns il numero di pixel che corrispondono alla percentuale della width del canvas
 */
function percentualeWidth(percento){
    return canvas.width/100*percento;
}
/**
 * Calcola una percentuale della height del canvas in pixel.
 * @param {double} percento la percentuale da calcolare
 * @returns il numero di pixel che corrispondono alla percentuale della height del canvas
 */
function percentualeHeight(percento){
    return canvas.height/100*percento;
}

function test(){
    let r=setInterval(()=>{personaggio.muovi(5);},500);
    setTimeout(()=>{
        clearInterval(r);
    },10000);
    r=setInterval(()=>{personaggio.muovi(-5);},500);
    setTimeout(()=>{
        clearInterval(r);
    },10000);
    r=setInterval(()=>{personaggio.salta(-5);},500);
    setTimeout(()=>{
        clearInterval(r);
    },10000);
}
