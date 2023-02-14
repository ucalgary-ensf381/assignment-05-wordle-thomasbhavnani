var height = 4; //guesses
var width = 4; //word len

var row = 0;
var column = 0;


var correctWord = "BOOK";
var endGame = false;

//put array of words from dictionary

window.onload = function(){
    initialize();
}


function initialize(){
    //make board
    for(let r = 0; r < height; r++){
        let rowsDiv = document.createElement("div");  // rowsDiv =  <div id="0" class="rowsDiv"> </div>
        rowsDiv.id = r.toString();                      // 
        rowsDiv.classList.add("rowsDiv");
        document.getElementById("interface").appendChild(rowsDiv);
        
        for(let c = 0; c < width; c++){
            let tile = document.createElement("span");  // <span id = "0-1" class = "tile">P</span>
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            
            document.getElementById(r.toString()).appendChild(tile);
            
        }
        console.log(rowsDiv)
    }
    document.addEventListener("keyup", (e) => {
        if (endGame) return;
        
        if("KeyA" <= e.code && e.code <= "KeyZ"){
            console.log(e.code);
            if (column < width){
                let nowTile = document.getElementById(row.toString() + '-' + column.toString());
                console.log(nowTile)
                console.log(e.code[3])
                console.log(nowTile.innerText)
                if(nowTile.innerText = '<empty string>'){
                    //gets the letter being typed
                    console.log(e.code[3])
                    nowTile.innerText = e.code[3];
                    column += 1;
                }
            }
        }
            else if (e.code == "Backspace"){
                if (0 < column && column <= width){
                    column -=1;
                }
                let nowTile = document.getElementById(row.toString() + '-' + column.toString());
                nowTile.innerText = "";
            }
            else if(e.code == "Enter" ){
                update();
                row += 1;
                column = 0;
            }
            if(!endGame && row == height){
                endGame = true;
                document.getElementById("correct-answer").innerText = correctWord;
            }

        })
}

function update(){
    let rightLetter = 0;
    for(let col = 0; col < width; col++){
        let nowTile = document.getElementById(row.toString() + '-' + column.toString());
        let character = nowTile.innerText;

        if(word[col] == character){
            tile.classList.add("green-tile");
            rightLetter += 1;
        }
        else if(word.includes(character)){
            tile.classList.add("yellow-tile")
        }
        else{
            tile.classList.add("gray-tile")
        }
    }
}