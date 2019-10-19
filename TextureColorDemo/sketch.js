// Constants.
var sizeMult = 16*9;
var resourceNames = ["ingot", "nugget", "dust", "dustsmall", "plate"]

// HTML elements.
let primRedS
let primGreenS
let primBlueS
let hex

// Textures.
let stone;
let ore = []
let chunkStone;
let chunkPiece = []
let coverPiece
let itemResources = []





let items = []


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

function RGBtoHEX(r,g,b) {
    return "0x"+componentToHex(r)+componentToHex(g)+componentToHex(b);
}


function loadBlock(name) {
    return loadImage("resources/block/"+name+".png")
}
function loadItem(name) {
    return loadImage("resources/item/"+name+".png")
}

function preload() {
    stone = loadBlock("stone")
    chunkStone = loadItem("base_type1")
    
    coverPiece = [loadItem("pieces_type1_1"),loadItem("pieces_type1_2")]

    for (var i=0; i<4;i++) {
        ore[i] = loadBlock("ore_"+i)
    }

    for (var i=0; i<resourceNames.length;i++) {
        itemResources[i] = loadItem(resourceNames[i])
    }
    
    
}

function setup() {
    createCanvas(1280,720)

    primRedS = createSlider(0,255,255)
    primGreenS = createSlider(0,255,255)
    primBlueS = createSlider(0,255,255)

    primRedS.position(0)
    primGreenS.position(0,20)
    primBlueS.position(0,40)

    primRedS.attribute("title", "Red");
    primGreenS.attribute("title", "Green");
    primBlueS.attribute("title", "Blue");



    hex = createP(RGBtoHEX(primRedS.value(),primGreenS.value(),primBlueS.value()))

    hex.position(5,50)
    
    var y = 20;

    for (var i=0;i<ore.length;i++) {
        items.push(new item(i*sizeMult*1.1+50,y,stone,ore[i]))
    }

    y+=160;

    for (var i=0;i<2;i++) {
        items.push(new item(i*sizeMult*1.1+50,y,chunkStone,coverPiece[i]))
    }

    y+=160;

    for (var i=0;i<itemResources.length;i++) {
        items.push(new item(i*sizeMult*1.1+50,y,itemResources[i]))
    }
    
}


function draw() {

    noSmooth();
    background(220);


    items.forEach(block => {
        block.draw();
    });

    hex.html(RGBtoHEX(primRedS.value(),primGreenS.value(),primBlueS.value()))
    //rect(50,50,50,50)

    
    //image(stone,70,120,sizeMult,sizeMult)
    //image(ore[3],70,120,sizeMult,sizeMult)

}