let baseURLImage = 'https://oscaraccorsi.github.io/pictures/';
let logo;
let xLogo;

let x = 0;
let y = 0;
let r = 1;
let g = 0;
let b = 255;
let incr = 20;
let rInc = 1;
let bInc = 1;
let del;

let stripes = [1, 2, 3, 5, 8, 13, 21];

let tic;

//--------------------------------------------preload
function preload() {
  ticMin = loadSound("assets/ticMin.mp3");
  logo = loadImage(baseURLImage + 'good one white.png');
}

  

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  
}  
function setup() {
  createCanvas(windowWidth, windowHeight);
  //background(10);
  xLogo = windowWidth-40;
  frameRate(random(stripes));
  y = round(random(0, windowHeight/2-5));
  noStroke();
  fill(r, g, b);
  
  //----------------------- connessioni e attivazione rev e filter
                                        
  reverb = new p5.Reverb();
  reverb.process(ticMin, 6, 0, false);
  low = new p5.LowPass();
  reverb.disconnect();
  reverb.connect(low);  
}
//----------------------------------------DRAW
function draw() {
  
  //---------------------------sezione di filtro col mouse
                                      
  filterFreq = map(mouseX, 0, width, 10, 22050);
  filterRes = map(mouseY, 0, height, 15, 5);
  low.set(filterFreq, filterRes);
  //--------------------------line, colore random
  let str = random(stripes);
  
  b = random(100, 255);
  fill(r, g, b);
  if (b < 180) {
    noFill();
  }
  
  
  rect(x, y, str, windowHeight-y*2);
  //strokeWeight(str);
  
  
  x = x + incr;
  
  if (x >= width || x < 0) {
    incr = -incr;
    y = round(random(0, windowHeight/2));
    frameRate(random(stripes));
    clear();
    
    //background(10);
   
  //------------------------conditional playing soundfile 
  }
  if (b > 250){
    ticMin.play(0, 1/str);
    ticMin.setVolume(1/str); 
  }  
}
//-------------------------------------------mousePressed
function mousePressed() {
  
  imageMode(CENTER);
  logo.resize(40, 0);
  image(logo, xLogo, windowHeight-25);
  tint(200); 
  save();
  clear();
  //background(10);
}
