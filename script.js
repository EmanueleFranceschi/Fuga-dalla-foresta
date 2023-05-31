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
        this.#x=x;
    }
    set y (y){
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
     * @param {int} scroll 0 se non deve muoversi, negativo se deve tornare indietro, positivo se deve andare avanti
     */
    disegnaLivello(scroll){
        for(let i=0; i<this.#elementi.length; i++){
            if(scroll>0){
                this.#elementi[i].x-=3;
            }else if(scroll<0){
                this.#elementi[i].x+=3;
            }
            this.#elementi[i].disegna();
        }
    }
    /**
     * Resetta il livello dopo una morte.
     */
    resetLivello(){
        for(let i=0; i<this.#elementi.length; i++){
            this.#elementi[i].x+= pavimento.x*-1;
        }
    }
}

class Piattaforma extends Elemento{
    #lunghezza;
    #altezza;
    #immagine;
    /**
     * Classe che rappresenta piattaforme dove il personaggio ed i nemici possono stare in piedi.
     * @constructor
     * @param {int} x - ascissa del primo punto in alto a sinistra della piattaforma
     * @param {int} y - ordinata del primo punto in alto a sinistra della piattaforma
     * @param {int} lunghezza quanti pixel è lunga la piattaforma
     * @param {int} altezza quanti pixel è alta la piattaforma
     * @param {String} immagine il path per l'immagine della piattaforma
     */
    constructor (x,y,lunghezza,altezza,immagine){
        super(x,y);
        this.altezza=altezza;
        this.lunghezza=lunghezza;
        this.#immagine=new Image();
        this.#immagine.src=immagine;
    }
    
    get lunghezza(){
        return this.#lunghezza;
    }

    get altezza(){
        return this.#altezza;
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

    set immagine(immagine){
        this.#immagine.src=immagine;
    }

    /**
     * Disegna la piattaforma nel canvas.
     */
    disegna(){
        if(this.#immagine.complete)
            context.drawImage(this.#immagine,this.x,this.y,this.lunghezza,this.altezza);
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
     * @param {int} x - ascissa del primo punto in alto a sinistra del personaggio
     * @param {int} y - ordinata del primo punto in alto a sinistra del personaggio
     */
    constructor(x,y){
        super(x,y);
        this.velocitaX=0;
        this.velocitaY=0;
        this.lunghezza=percentualeWidth(5);
        this.altezza=percentualeHeight(15);
        this.#inAria=false;
        this.#immagine=new Image();
        this.#immagine.src="characters/runner/Idle__000.png";
        this.#vita=3;
        decrVita=this.vita;
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
    get inAria(){
        return this.#inAria;
    }
    set inAria(inAria){
        this.#inAria=inAria;
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
        this.#vita=vita;
        if(this.vita<decrVita)
            morte();
    }
    set immagine(immagine){
        this.#immagine.src=immagine;
    }
    /**
     * Muove il personaggio.
     */
    muovi(){
        if(this.velocitaX>0 && this.velocitaY==0)
            personaggio.immagine="characters/runner/RunRight.png";
        else if(this.velocitaX<0 && this.velocitaY==0)
            personaggio.immagine="characters/runner/RunLeft.png";
        else if(this.velocitaY!=0)
            personaggio.immagine="characters/runner/Jump__004.png";
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
                if(velocitaDiPartenza<=15)
                    this.velocitaY=velocitaDiPartenza;
                else
                    this.velocitaY=15;
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
        //collisione con canvas a destra
        if(this.x+this.lunghezza+this.velocitaX >= canvas.width){
            this.x=canvas.width-this.lunghezza;
            return true;
        }
        //collisione con canvas a sinistra
        if(this.x+this.velocitaX < 0){
            this.x=0;
            return true;
        }
        for(let i=0; i<livello.getDimensione(); i++){
            if((this.x+this.lunghezza+this.velocitaX > livello.getElemento(i).x && this.x+this.lunghezza+this.velocitaX <= livello.getElemento(i).x+this.velocitaX || //collisione da sinistra
            this.x+this.velocitaX < livello.getElemento(i).x+livello.getElemento(i).lunghezza && this.x+this.velocitaX >= livello.getElemento(i).x+livello.getElemento(i).lunghezza+this.velocitaX) && //collisione da destra
            this.y+this.altezza > livello.getElemento(i).y &&                                                      //controllo che siano alla stessa altezza
            this.y < livello.getElemento(i).y+livello.getElemento(i).altezza){
                if(livello.getElemento(i) instanceof Piattaforma){
                    if(this.velocitaX>0)
                        this.x=livello.getElemento(i).x-this.lunghezza;
                    else if(this.velocitaX<0)
                        this.x=livello.getElemento(i).x+livello.getElemento(i).lunghezza;
                    return true;
                }else if(livello.getElemento(i) instanceof Ostacolo){
                    contCollisione++;
                    if(contCollisione==1)
                        decrVita=this.vita;
                        this.vita--;
                    
                    return true;
                }else if(livello.getElemento(i) instanceof Fine){
                    vittoria();
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
        //collisione con pavimento
        if(this.y+this.altezza+this.velocitaY > pavimento.y){
            this.y=pavimento.y-this.#altezza;
            return true;
        }
        for(let i=0; i<livello.getDimensione(); i++){
            if(this.x+this.lunghezza > livello.getElemento(i).x &&                  //controllo che siano alla stessa x
            this.x < livello.getElemento(i).x+livello.getElemento(i).lunghezza &&
            this.y+this.altezza+this.velocitaY > livello.getElemento(i).y &&
            this.y+this.altezza <= livello.getElemento(i).y){
                if(livello.getElemento(i) instanceof Piattaforma){
                    this.y=livello.getElemento(i).y-this.#altezza;
                    return true;
                }else if(livello.getElemento(i) instanceof Ostacolo){
                    contCollisione++;
                    if(contCollisione==1)
                        decrVita=this.vita;
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
        else if(this.vita<decrVita)
            this.immagine="characters/runner/Dead__004.png";
        else
            this.immagine="characters/runner/Idle__000.png";
        if(this.#immagine.complete)
            context.drawImage(this.#immagine,this.x,this.y,this.lunghezza,this.altezza);
    }
}

class Powerup extends Elemento{
    #icona;
    #sparito;

    /**
     * Classe che rappresenta i power ups raccoglibili dal personaggio
     * @constructor
     * @param {Image} icona
     * @param {boolean} sparito
     */
    constructor(icona,x,y){
        super(x,y);
        this.icona=icona;
        this.sparito=false;
    }

    set sparito(sparito){
        this.#sparito=sparito;
    }

    get sparito(){
        return this.#sparito;
    }

    get icona(){
        return this.#icona;
    }

    set icona(icona){
        this.#icona=icona;
    }

    disegna(){
        if(this.icona.complete){
            context.drawImage(this.icona,this.x,this.y);
        }
    }
}

class Ostacolo extends Elemento{
    #lunghezza;
    #altezza;
    #immagine;
    /**
     * Classe che rappresenta gli ostacoli.
     * @constructor
     * @param {int} x - ascissa del primo punto in alto a sinistra dell'ostacolo
     * @param {int} y - ordinata del primo punto in alto a sinistra dell'ostacolo
     * @param {int} lunghezza quanti pixel è lungo l'ostacolo
     * @param {int} altezza quanti pixel è alto l'ostacolo
     * @param {String} immagine il path per l'immagine dell'ostacolo
     */
    constructor(x,y,lunghezza,altezza,immagine){
        super(x,y);
        this.lunghezza=lunghezza;
        this.altezza=altezza;
        this.#immagine=new Image();
        this.#immagine.src=immagine;
    }

    get lunghezza(){
        return this.#lunghezza;
    }
    get altezza(){
        return this.#altezza;
    }
    set lunghezza(lunghezza){
        this.#lunghezza=lunghezza;
    }
    set altezza(altezza){
        this.#altezza=altezza;
    }
    set immagine(immagine){
        this.#immagine.src=immagine;
    }

    disegna(){
        if(this.#immagine.complete)
            context.drawImage(this.#immagine,this.x,this.y,this.lunghezza,this.altezza);
    }
}
class Fine extends Elemento{
    #lunghezza;
    #altezza;
    /**
     * Classe che rappresenta la fine.
     * @constructor
     * @param {int} x - ascissa del primo punto in alto a sinistra della bandierina della fine
     * @param {int} y - ordinata del primo punto in alto a sinistra della bandierina della fine
     * @param {int} lunghezza quanti pixel è lunga la bandierina della fine
     * @param {int} altezza quanti pixel è alta la bandierina della fine
     */
    constructor(x,y,lunghezza,altezza){
        super(x,y);
        this.lunghezza=lunghezza;
        this.altezza=altezza;
    }

    get lunghezza(){
        return this.#lunghezza;
    }
    get altezza(){
        return this.#altezza;
    }
    set lunghezza(lunghezza){
        this.#lunghezza=lunghezza;
    }
    set altezza(altezza){
        this.#altezza=altezza;
    }
    /**
     * Disegna la bandierina della fine.
     */
    disegna(){
        context.fillStyle="rgb(46, 43, 66)";
        context.fillRect(this.x, this.y, this.lunghezza, this.altezza);
        context.beginPath();
        context.fillStyle = "rgb(255,215,0)";
        context.arc(this.x+(this.lunghezza/2), this.y, this.lunghezza*1.5, 0, 2*Math.PI, false);
        context.fill();
        context.stroke();
    }
}

let canvas;
let context;
let riferimentoRender;
let livello;
let personaggio;
let sfondo;
let pavimento;
let decrVita=0;
let contCollisione=0;
/**
 * Setup iniziale per il gioco
 */
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
    pavimento=new Piattaforma(0,canvas.height-percentualeHeight(20),3000,percentualeHeight(20),"platforms/png/Tiles/2.png");
    //aggiungo piattaforme e nemici
    livello.addElemento(new Piattaforma(400,500,200,25,"platforms/png/Tiles/14.png"));
    livello.addElemento(new Ostacolo(700,pavimento.y-50,30,50,"characters/enemies/snake.png"));
    livello.addElemento(new Piattaforma(800,600,200,25,"platforms/png/Tiles/14.png"));
    livello.addElemento(new Ostacolo(1100,pavimento.y-50,30,50,"characters/enemies/snake.png"));
    livello.addElemento(new Ostacolo(1470,550,30,50,"characters/enemies/snake.png"));
    livello.addElemento(new Piattaforma(1400,600,200,25,"platforms/png/Tiles/14.png"));
    livello.addElemento(new Piattaforma(1600,450,200,25,"platforms/png/Tiles/14.png"));
    
    livello.addElemento(new Ostacolo(1850,pavimento.y-50,30,50,"characters/enemies/snake.png"));
    livello.addElemento(new Ostacolo(1900,pavimento.y-50,30,50,"characters/enemies/snake.png"));
    livello.addElemento(new Ostacolo(1950,pavimento.y-50,30,50,"characters/enemies/snake.png"));
    livello.addElemento(new Ostacolo(2000,pavimento.y-50,30,50,"characters/enemies/snake.png"));
    livello.addElemento(new Piattaforma(2100,600,200,25,"platforms/png/Tiles/14.png"));
    livello.addElemento(new Piattaforma(2300,500,200,25,"platforms/png/Tiles/14.png"));
    livello.addElemento(new Piattaforma(2500,400,200,25,"platforms/png/Tiles/14.png"));
    livello.addElemento(new Fine(pavimento.lunghezza-100,percentualeHeight(20),20,pavimento.y-percentualeHeight(20)));

    /*//Creo le icone dei power up
    iconaStella=new Powerup("icons/Icon_Star.png",1000,500);
    iconaTeschio=new Powerup("icons/Icon_Skull.png",400,100);
    iconaCuore=new Powerup("icons/Icon_Heart",400,300);
    iconaInterrogativo=new Powerup("icons/Icon_Question.png",100,600);

    livello.addElemento(iconaStella);
    livello.addElemento(iconaTeschio);
    livello.addElemento(iconaCuore);
    livello.addElemento(iconaInterrogativo);*/
    
    //creo il personaggio
    personaggio=new Personaggio(percentualeWidth(5),pavimento.y-percentualeHeight(15));
    //ogni 10 millisecondi il canvas viene ridisegnato
    riferimentoRender=setInterval(render, 10);
    //gestisco i controlli
    window.addEventListener("keydown", controlliMosse ,true);
    window.addEventListener("keyup", fermaMosse ,true);
}
/**
 * Risponde ai controlli
 */
function controlliMosse(event){
    switch (event.code){
    case "KeyD": case "ArrowRight":{
        personaggio.velocitaX=4;
    }break;
    case "KeyA": case "ArrowLeft":{
        personaggio.velocitaX=-4;
    }break;
    case "KeyW": case "ArrowUp":{
        personaggio.gravita(-15);
    }break;
    }
}
/**
 * Ferma il personaggio quando non viene più mosso
 */
function fermaMosse(event){
    switch (event.code){
    case "KeyD": case "ArrowRight": case "KeyA": case "ArrowLeft":
        personaggio.velocitaX=0;
        break;
    }
}
/**
 * Disegna lo sfondo, il livello e infine il personaggio.
 */
function render(){
    if(sfondo.complete)
        context.drawImage(sfondo,0,0,canvas.width,canvas.height);
    if(personaggio.x>percentualeWidth(60) && pavimento.x+pavimento.lunghezza>canvas.width){
        livello.disegnaLivello(1);
        pavimento.x-=3;
        personaggio.x-=3;
    }else if(personaggio.x<percentualeWidth(40) && pavimento.x<0){
        livello.disegnaLivello(-1);
        pavimento.x+=3;
        personaggio.x+=3;
    }else{
        livello.disegnaLivello(0);
    }
    pavimento.disegna();
    personaggio.disegna();
}
/**
 * Calcola una percentuale della width del canvas in pixel.
 * @param {double} percento la percentuale da calcolare
 * @returns il numero di pixel che corrispondono alla percentuale della width del canvas
 */
function percentualeWidth(percento){
    return (canvas.width/100)*percento;
}
/**
 * Calcola una percentuale della height del canvas in pixel.
 * @param {double} percento la percentuale da calcolare
 * @returns il numero di pixel che corrispondono alla percentuale della height del canvas
 */
function percentualeHeight(percento){
    return (canvas.height/100)*percento;
}
/**
 * Fa perdere una vita e blocca il gioco di conseguenza.
 */
function morte(){
    clearInterval(riferimentoRender);
    personaggio.velocitaX=0;
    personaggio.velocitaY=0;
    personaggio.immagine="characters/runner/Dead__004.png";
    personaggio.disegna();
    setTimeout(()=>{
        if(personaggio.vita==0){
            canvas.hidden=true;
        document.getElementById("div").hidden=false;
        document.getElementById("div").innerHTML=`<h1 class="centerText h1">GAME OVER!</h1><br><input class="centerImg buttonMenu" type="button" value="Home" onclick="window.location.href='index.html'">`;
        }else{
            canvas.hidden=true;
        document.getElementById("div").hidden=false;
        document.getElementById("div").innerHTML='<h1 class="centerText h1">Hai perso!</h1><br><input class="centerImg buttonMenu" type="button" value="Gioca" onclick="riGioca()">';
        }
    },1000)
} 
/**
 * Ripristina il gioco.
 */
function riGioca(){
    riferimentoRender=setInterval(render, 10);
    decrVita=personaggio.vita;
    personaggio.inAria=false;
    livello.resetLivello();
    pavimento.x=0;
    document.getElementById("div").hidden=true;
    personaggio.x=percentualeWidth(5);
    personaggio.y=pavimento.y-percentualeHeight(15);
    canvas.hidden=false;
}
/**
 * Termina il gioco.
 */
function vittoria(){
    canvas.hidden=true;
    document.getElementById("div").hidden=false;
    document.getElementById("div").innerHTML=`<h1 class="centerText h1">VITTORIA!</h1><br><input class="centerImg buttonMenu" type="button" value="Home" onclick="window.location.href='index.html'">`;
}