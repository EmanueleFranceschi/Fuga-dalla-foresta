class Elemento{
    #x;
    #y;
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
    collisonePiattaforma(P){
        for(let i=0;i<this.#elementi.length();i++){
            if(this.#elementi[i] instanceof Piattaforma){
                if(P.y + (canvas.height/100*15) <= this.#elementi[i].y){//non funziona perceh classe piattaforma e' anche il paviemnto in cui spowna il Personaggio, Soluzione: creare uan classe per le piattaforme, oppure far si che si riesca a saltare sopra le piattaforme
                    P.velocitaY=0;
                    P.fermo=true;
                }
            }
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
class Piattaforma extends Elemento{
    #lunghezza;
    #altezza;
    #colore;
    constructor (x,y,lunghezza,altezza,colore){
        super(x,y);
        this.lunghezza=lunghezza;
        this.altezza=altezza;
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
    #fermo;
    constructor(x,y){
        super(x,y);
        this.velocitaX=0;
        this.velocitaY=0;
        this.#staSaltando=false;
        this.#fermo=false;
    }

    get velocitaX(){
        return this.#velocitaX;
    }
    get fermo(){
        return this.#fermo;
    }
    get velocitaY(){
        return this.#velocitaY;
    }
    
    set fermo(fermo){
        this.#fermo=fermo;
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
            console.assert(this.x+this.velocitaX < 0, "Il personaggio esce dal canvas");
            console.assert(this.x+this.velocitaX+50 > canvas.width, "Il personaggio esce dal canvas");
            this.x+=this.velocitaX;
        }
    }

    salta(velocitaY){
        if(!this.#staSaltando){
            this.#staSaltando=true;
            this.velocitaY=velocitaY;
            let salta=setInterval(()=>{
                livello.collisonePiattaforma(this);
                if(!this.#fermo){
                    console.log("salto");
                    //console.assert(this.y+this.velocitaY < 0, "Il personaggio esce dal canvas");
                    //console.assert(this.y+this.velocitaY > canvas.height, "Il personaggio esce dal canvas");
                    this.y+=this.velocitaY;
                }
            },20);
            setTimeout(()=> {
                clearInterval(salta);
                this.#staSaltando=false;
                if(velocitaY!=10){
                    this.salta(velocitaY+1);
                }
            },60);
            this.#fermo=false;
        }
    }

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
    livello=new Livello();
    
    /*let sfondo=new Sfondo(0,0,);
    livello.addElemento(sfondo);*/

    let pavimento=new Piattaforma(0,canvas.height-(canvas.height/100*20),canvas.width,canvas.height,"rgb(93, 222, 38)");
    livello.addElemento(pavimento);

    personaggio=new Personaggio(100,pavimento.y-(canvas.height/100*15));
    livello.addElemento(personaggio);

    let piattaforma=new Piattaforma(300,510,200,10,"rgb(93, 222, 38)")
    livello.addElemento(piattaforma);

    riferimento=setInterval(render, 10);
    window.addEventListener("keydown", function(event){
        if(event.code=="KeyD" || event.code=="ArrowRight")
            personaggio.muovi(15);
    },false);
    window.addEventListener("keydown", function(event){
        if(event.code=="KeyA" || event.code=="ArrowLeft")
            personaggio.muovi(-15);
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
