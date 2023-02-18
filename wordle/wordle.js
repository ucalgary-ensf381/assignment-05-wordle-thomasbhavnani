var height = 4; 
var width = 4; 

var row = 0;
var column = 0;


var wordList = null;
var word;
var hint;

async function getWordAndHint(){
    if(wordList == null){
        document.getElementById("startbutton").disabled;
        document.getElementById("startbutton").innerHTML = "Loading...";

        const res = await fetch("https://api.masoudkf.com/v1/wordle", {
            headers: {
            "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
            },
        });
        let temp = await res.json();
        var {dictionary} = temp;
        wordList = dictionary;
        document.getElementById("startbutton").enabled;
        document.getElementById("startbutton").innerHTML = "Start Over";
    }
}

async function setWordHint(){
    getWordAndHint().then(() => {
        var wordAndHint = wordList[Number.parseInt(Math.random() * wordList.length)];
        word = wordAndHint.word.toUpperCase();
        hint = wordAndHint.hint;
  })
}




var endGame = false;

//put array of words from dictionary

window.onload = function(){
    setWordHint();
    initialize();
    

}


function initialize(){
    //make board 
    for(let r = 0; r < height; r++){
        let rowsDiv = document.createElement("div");  
        rowsDiv.id = r.toString();                      
        rowsDiv.classList.add("rowsDiv");
        document.getElementById("interface").appendChild(rowsDiv);
        
        for(let c = 0; c < width; c++){
            let tile = document.createElement("span");  
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            
            document.getElementById(r.toString()).appendChild(tile);
            
        }
        console.log(rowsDiv)
    }

    let nextTile = document.getElementById("0-0");
    nextTile.classList.add("tile-active")

    document.addEventListener("keyup", (e) => {
        if (endGame){
            return;
        } 
        
        if("KeyA" <= e.code && e.code <= "KeyZ"){
            console.log(e.code);

            if (column < width){

                let nowTile = document.getElementById(row.toString() + '-' + column.toString());
                if(column < width - 1){
                    nowTile.classList.remove("tile-active");
                    let nextTile = document.getElementById(row.toString() + '-' + (column + 1).toString());
                    nextTile.classList.add("tile-active");
                }
                else{
                    nowTile.classList.remove("tile-active");
                }
                
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

                if(column < width - 1){
                    let nextTile = document.getElementById(row.toString() + '-' + (column + 1).toString())
                    nextTile.classList.remove("tile-active")
                }
                nowTile.classList.add("tile-active");
                nowTile.innerText = "";
            }
            else if(e.code == "Enter"){
                if(column != width){
                    window.alert("You must complete the word first.")
                }
                else{
                    check();
                    row += 1;
                    column = 0;
                }
            }
            if(!endGame && row == height){
                endGame = true;
                losscall();
            }
            
        })
}

function check(){

    let rightLetters = 0;
    letterDictCorrect = {}
    letterDictUser = {}
    

    
    for(let i = 0; i < width; i++){
        letterDictCorrect[word.charAt(i)] = (word.match(new RegExp(word.charAt(i), "g")) || []).length;
        console.log(letterDictCorrect)
    }



    for(let i = 0; i < width; i++){
        letterDictUser[word.charAt(i)] = 0;
    }
    
    for(let col = 0; col < width; col++){

        let nowTile = document.getElementById(row.toString() + '-' + col.toString());
        let character = nowTile.innerText;

        if(word[col] == character){
            nowTile.classList.add("green-tile");
            rightLetters += 1;
            letterDictUser[character] += 1
        }
        if(rightLetters == width){
            displaywin();
            endGame = true;
    
        }
    }
    for(let col = 0; col < width; col++){
        let nowTile = document.getElementById(row.toString() + '-' + col.toString());
        console.log(nowTile)
        let character = nowTile.innerText;
        console.log(letterDictUser[character])
        
        if(word.includes(character) && letterDictUser[character] < letterDictCorrect[character] && !nowTile.classList.contains("green-tile")){
            nowTile.classList.add("yellow-tile");
            letterDictUser[character] += 1;
        }
        else if(!nowTile.classList.contains('green-tile') && !nowTile.classList.contains('yellow-tile')){
            nowTile.classList.add("gray-tile");
        }
        else{

        }   
    }
}


function darkMode(){
    document.body.classList.toggle('dark-mode');
    
}


function hintcall(){
    
    document.getElementById("hintid").classList.add("hint");
    document.getElementById("hintid").innerText= hint;
}

function losscall(){
        document.getElementById("hintid").classList.add("loss");
        document.getElementById("hintid").innerText= "You missed the word " + word +" and lost!";
}

function displaywin(){
    document.getElementById("hide-congrats").classList.toggle("show-congrats");
    document.getElementById("interface").classList.toggle("hide-interface");

}

function howToPlay(){
    document.getElementById("interface").classList.toggle("shift-grid");
    document.getElementById("howto").classList.toggle("howToClass");
    document.getElementById("startover").classList.toggle("shift-grid");
    document.getElementById("spacer").classList.toggle("shift-grid");
    
}


function startOver(){
    setWordHint();
    if(document.getElementById("hintid").classList.contains("hint")){

        document.getElementById("hintid").classList.remove("hint");
        document.getElementById("hintid").innerText = "";
    }

    if(document.getElementById("hintid").classList.contains("loss")){

        document.getElementById("hintid").classList.remove("loss");
        document.getElementById("hintid").innerText = "";
    }

    if(document.getElementById("interface").classList.contains("hide-interface")){
        document.getElementById("interface").classList.remove("hide-interface")
        document.getElementById("hide-congrats").classList.remove("show-congrats")
        
    }
    endGame = false;

    for (let i=0; i< width; i++){
        for (let j=0; j< height; j++){
            var tile = document.getElementById(`${i}-${j}`);        
            tile.innerHTML = "";
            tile.remove(tile);   
        }
    }


    for(let r = 0; r < height; r++){
        let rowsDiv = document.createElement("div");  
        rowsDiv.id = r.toString();                      
        rowsDiv.classList.add("rowsDiv");
        document.getElementById("interface").appendChild(rowsDiv);
        
        for(let c = 0; c < width; c++){
            let tile = document.createElement("span");  
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            
            document.getElementById(r.toString()).appendChild(tile);   
        }
    }
    row = 0;
    column = 0;
}
    

