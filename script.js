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
     * Restituisce l'elemento nella posizione indicata.
     * @param {int} i la posizione nel vettore dell'elemento
     * @returns l'elemento nella posizione indicata
     */
    getElemento(i){
        return this.#elementi[i];
    }
    /**
     * 
     * @returns la dimensione del vettore
     */
    getDimensione(){
        return this.#elementi.length;
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
    #inAria;
    #lunghezza;
    #altezza;
    #immagine;
    #vita;
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
        this.lunghezza=80;
        this.altezza=percentualeHeight(15);
        this.#inAria=false;
        this.#immagine=new Image();
        this.#immagine.src="characters/runner/Idle__000.png";
        this.#vita=2;
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
    get vita(){
        return this.#vita;
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
    set vita(vita){
        return this.#vita;
    }
    /**
     * Muove il personaggio.
     */
    muovi(){
        if(!this.collisione()){
            this.x+=this.velocitaX;
        }
        if(this.#inAria){
            this.y+=this.velocitaY;
        }
        if(!this.atterrato()){
            this.gravita(2);
        }
    }
    /**
     * Fa saltare e cadere il personaggio.
     * @param {int} velocitaDiPartenza la velocità aerea da cui parte (negativa nel caso del salto, positiva nel caso della caduta)
     */
    gravita(velocitaDiPartenza){
        if(!this.#inAria){
            this.#inAria=true;
            let salta=setInterval(()=>{
                this.velocitaY=velocitaDiPartenza;
                velocitaDiPartenza++;
                if(this.atterrato()){
                    this.velocitaY=0;
                    this.#inAria=false;
                    clearInterval(salta);
                }
            },20);
        }
    }
    /**
     * Controlla se il personaggio sbatte contro una piattaforma o contro un ostacolo orizzontalmente.
     * @returns se ha sbattuto o no
     */
    collisione(){
        if(this.x+this.lunghezza+this.velocitaX >= canvas.width){
            this.x=canvas.width-this.lunghezza;
            return true;
        }
        if(this.x+this.velocitaX < 0){
            this.x=0;
            return true;
        }
        for(let i=0; i<livello.getDimensione(); i++){
            if(this.x+this.lunghezza+this.velocitaX > livello.getElemento(i).x && 
            this.x+this.velocitaX < livello.getElemento(i).x+livello.getElemento(i).lunghezza &&
            this.y+this.altezza > livello.getElemento(i).y && 
            this.y < livello.getElemento(i).y+livello.getElemento(i).altezza){
                if(livello.getElemento(i) instanceof Piattaforma){
                    if(this.velocitaX>0)
                        this.x=livello.getElemento(i).x-this.lunghezza;
                    else
                        this.x=livello.getElemento(i).x+livello.getElemento(i).lunghezza;
                    return true;
                }else if(livello.getElemento(i) instanceof Ostacolo){
                    this.vita--;
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Controlla se il personaggio è atterrato.
     * @returns se deve smettere di cadere o no
     */
    atterrato(){
        if(this.y+this.altezza+this.velocitaY > pavimento.y){
            this.y=pavimento.y-this.#altezza;
            return true;
        }
        for(let i=0; i<livello.getDimensione(); i++){
            if(this.x+this.lunghezza > livello.getElemento(i).x && 
            this.x < livello.getElemento(i).x+livello.getElemento(i).lunghezza &&
            this.y+this.altezza+this.velocitaY > livello.getElemento(i).y){
                if(livello.getElemento(i) instanceof Piattaforma){
                    this.y=livello.getElemento(i).y-this.#altezza;
                    return true;
                }else if(livello.getElemento(i) instanceof Ostacolo){
                    this.vita--;
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Disegna il personaggio nel canvas.
     */
    disegna(){
        if(this.velocitaX!=0 || this.velocitaY!=0)
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
let pavimento;
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
    pavimento=new Piattaforma(0,canvas.height-percentualeHeight(20),canvas.width,percentualeHeight(20),"rgb(93, 222, 38)");
    //aggiungo piattaforme
    livello.addElemento(new Piattaforma(400,700,200,15,"rgb(31, 0, 156)"));
    //creo il personaggio
    personaggio=new Personaggio(percentualeWidth(5),pavimento.y-percentualeHeight(15));
    //ogni 10 millisecondi il canvas viene ridisegnato
    riferimento=setInterval(render, 10);
    //gestisco i controlli
    window.addEventListener("keydown", function(event){
        switch (event.code){
        case "KeyD": case "ArrowRight":
            personaggio.velocitaX=4;
            break;
        case "KeyA": case "ArrowLeft":
            personaggio.velocitaX=-4;
            break;
        case "KeyW": case "ArrowUp":
            personaggio.gravita(-15);
            break;
        }
    },false);
    window.addEventListener("keyup", function(event){
        switch (event.code){
        case "KeyD": case "ArrowRight": case "KeyA": case "ArrowLeft":
            personaggio.velocitaX=0;
            break;
        }
    },false);
}
/**
 * Disegna lo sfondo, il livello e infine il personaggio.
 */
function render(){
    if(sfondo.complete)
        context.drawImage(sfondo,0,0,canvas.width,canvas.height);
    livello.disegnaLivello();
    pavimento.disegna();
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
}
