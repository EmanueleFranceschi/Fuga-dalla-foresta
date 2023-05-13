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
            throw new Error("errore addelemento");
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
        this.x+=velocitaX;
    }
    salta(velocitaY){
        this.velocitaY=velocitaY;
        this.y+=velocitaY;
    }
    disegna(){

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
    riferimento=setInterval(render, 200);
}
function render(){
    context.fillStyle="rgb(38, 188, 222)";
    context.fillRect(0,0,canvas.width,canvas.height);
    livello.disegnaLivello();
}
function linkOpzioni(){
    link("options.html");
}
function linkClassifica(){
    link("scoreboard.html");
}
function linkCrediti(){
    link("credits.html");
}
