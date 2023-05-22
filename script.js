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
    constructor(){
        this.#elementi=[];
    }
    addElemento(e){
        if(e==null) 
            throw new Error("errore add elemento");
        this.#elementi.push(e);
    }
    disegnaLivello(){
        for(let i=0; i<this.#elementi.length; i++){
            this.#elementi[i].disegna();
        }
    }
}

class Sfondo extends Elemento{
    #immSfondo;
    constructor(x,y,immSfondo){     
        super(x,y);
        this.immSfondo=new Image();
        this.immSfondo.src=immSfondo;
    }

    get immSfondo(){
        return this.#immSfondo;
    }

    disegna() {
        context.drawImage(0,0,this.immSfondo);
    }
}
class Pavimento extends Elemento{
    #lunghezza;
    #colore;
    constructor (x,y,lunghezza,colore){
        super(x,y);
        this.lunghezza=lunghezza;
        this.colore=colore;
    }
    
    get lunghezza(){
        return this.#lunghezza;
    }
    get colore(){
        return this.#colore;
    }
    
    set lunghezza (lunghezza){
        if(lunghezza<=0)
            throw new Error("errore lunghezza pavimento");
        this.#lunghezza=lunghezza;
    }
    set colore (colore){
        this.#colore=colore;
    }

    disegna(){
        context.fillStyle=this.colore;
        context.fillRect(this.x,this.y,this.lunghezza,canvas.height-this.y);
    }
}

class Piattaforma extends Elemento{
    #lunghezza;
    #altezza;
    #colore;
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

    disegna(){
        context.fillStyle=this.colore;
        context.fillRect(this.x,this.y,this.lunghezza,this.altezza);
    }
}

class Personaggio extends Elemento{
    #velocitaX;
    #velocitaY;
    #staSaltando;
    constructor(x,y){
        super(x,y);
        this.velocitaX=0;
        this.velocitaY=0;
        this.#staSaltando=false;
    }

    get velocitaX(){
        return this.#velocitaX;
    }
    get velocitaY(){
        return this.#velocitaY;
    }
    set velocitaX(velocitaX){
        this.#velocitaX=velocitaX;
    }
    set velocitaY(velocitaY){
        this.#velocitaY=velocitaY;
    }

    muovi(velocitaX){
        this.velocitaX=velocitaX;
        if(this.x+this.velocitaX<0){
            this.x=0;
        }else if(this.x+this.velocitaX+50>canvas.width){
            this.x=canvas.width-50;
        }else{
            this.x+=this.velocitaX;
        }
    }

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

    salePiattaforma(piattaforma){
        if(this.y+this.height<=piattaforma.y && this.y+this.height+this.velocitaY>=piattaforma.y){
            this.velocitaY=0;
        }
    } //Non va

    disegna(){
        context.fillStyle="rgb(255,0,0)";
        context.fillRect(this.x,this.y,50,(canvas.height/100*15));
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
function gioca(){
    canvas = document.getElementById('id');
    context = canvas.getContext('2d');
    canvas.hidden=false;
    document.getElementById("div").hidden=true;
    canvas.height=canvas.width*0.6;

    livello=new Livello();
    
    /*let sfondo=new Sfondo(0,0,);
    livello.addElemento(sfondo);*/ //Non carica le immagini

    let pavimento=new Pavimento(0,canvas.height-(canvas.height/100*20),canvas.width,"rgb(93, 222, 38)");
    livello.addElemento(pavimento);

    let piattaforma=new Piattaforma(400,560,200,15,"rgb(31, 0, 156)");
    livello.addElemento(piattaforma);

    personaggio=new Personaggio(100,pavimento.y-(canvas.height/100*15));
    livello.addElemento(personaggio);

    riferimento=setInterval(render, 10);
    window.addEventListener("keydown", function(event){
        if(event.code=="KeyD" || event.code=="ArrowRight")
            personaggio.muovi(8);
    },false);
    window.addEventListener("keydown", function(event){
        if(event.code=="KeyA" || event.code=="ArrowLeft")
            personaggio.muovi(-8);
    },false);
    window.addEventListener("keydown", function(event){
        if(event.code=="KeyW" || event.code=="ArrowUp")
            personaggio.salta(-10);
    },false);
    
}
function render(){
    context.fillStyle="rgb(38, 188, 222)";
    context.fillRect(0,0,canvas.width,canvas.height);
    livello.disegnaLivello();
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
