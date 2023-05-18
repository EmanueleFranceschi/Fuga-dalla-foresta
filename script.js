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
}

class Piattaforma extends Elemento{
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
            throw new Error("errore lunghezza piattaforma");
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
class Personaggio extends Elemento{
    #velocitaX;
    #velocitaY;
    constructor(x,y){
        super(x,y);
        this.velocitaX=0;
        this.velocitaY=0;
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
        this.x+=this.velocitaX;
    }

    salta(velocitaY){
        this.velocitaY=velocitaY;
        let salta=setInterval(()=>{
            this.y+=this.velocitaY;
        },20);
        setTimeout(()=> {
            clearInterval(salta);
            if(velocitaY!=5){
                this.salta(velocitaY+1);
            }
        },60);
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
function gioca(){
    canvas = document.getElementById('id');
    context = canvas.getContext('2d');
    canvas.hidden=false;
    document.getElementById("div").hidden=true;
    livello=new Livello();
    let pavimento=new Piattaforma(0,canvas.height-(canvas.height/100*20),canvas.width,"rgb(93, 222, 38)");
    livello.addElemento(pavimento);
    let personaggio=new Personaggio(100,pavimento.y-(canvas.height/100*15));
    livello.addElemento(personaggio);
    riferimento=setInterval(render, 20);
    window.addEventListener("keydown", function(event){
        if(event.code=="KeyD")
            personaggio.muovi(5);
    },false);
    window.addEventListener("keydown", function(event){
        if(event.code=="KeyA")
            personaggio.muovi(-5);
    },false);
    window.addEventListener("keydown", function(event){
        if(event.code=="KeyW")
            personaggio.salta(-5);
    },false);
}
function render(){
    context.fillStyle="rgb(38, 188, 222)";
    context.fillRect(0,0,canvas.width,canvas.height);
    livello.disegnaLivello();
}