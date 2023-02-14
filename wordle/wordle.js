var height = 4; //guesses
var width = 4; //word len

var row = 0;
var column = 0;

var endGame = false;
var word = "SQUID";

//put array of words from dictionary

window.onload = function(){
    initialize();
}


function initialize();{
    //make board
    for(r = 0; r < height; r++){
        for(let c = 0; c < width; c++){
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "P";
            document.getElementById("interface").appendChild(tile);
            
        }
    }
}

