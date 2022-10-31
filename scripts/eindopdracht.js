// bronnen:
//Learning HTML and JavaScript with a Tic-Tac-Toe Game:
// https://www.youtube.com/watch?v=gN0fXvWbJSk
//https://www.youtube.com/watch?v=wRJmv2-FzVE
//https://www.youtube.com/watch?v=zj_rNazIwYo
//https://www.youtube.com/watch?v=T6zFEiXaH-Q
//https://www.youtube.com/watch?v=_r9vhz7PZIE

//https://teamtreehouse.com/community/while-loop-prompt-untill-correct-answer

//http://stackoverflow.com/questions/8878015/return-true-or-false-randomly

//http://stackoverflow.com/questions/9730895/how-to-write-a-javascript-variable-as-source-for-img-tag-in-html

//http://www.cburch.com/cs/340/reading/tictac/

//http://stackoverflow.com/questions/25666223/how-to-get-click-count-outside-of-the-function

//http://stackoverflow.com/questions/32485802/tic-tac-toe-returning-marked-square-number




// functie die ervoor zorgt dat de tekst wordt veranderd bovenin de pagina.
function veranderStatus(statusText) {
    console.log(statusText);
    document.getElementById("status").innerHTML = statusText;
}

// Deze functie zorgt ervoor dat de naam die je invoert via prompt wordt weergeven op de pagina. Als er geen naam of Drake wordt ingevoerd krijg je een melding en dien je alsnog een andere naam in te voeren..
function naamInvoer() {
var speler = prompt("Hello, What's your name?");

while (!speler || speler === "Drake") {
speler = prompt("You can't do this...");
}

document.getElementById("naam").innerHTML = " " + speler + "";
}

//variabelen.
var beurt =  document.getElementById("naam").innerHTML;
var imgSpeler = "<img src=\"img/speler.png\">";
var imgDrake = "<img src=\"img/drake.png\">";
var imgLeeg = "<img src=\"img/leeg.png\" alt=\"Leeg\">";
var neemRij = document.getElementsByClassName("rij");
var winnaar = null;


// Door middel van Math.random wordt er gekozen wie er mag beginnen met spelen. Dit wordt weer weergeven via de functie veranderStattus.
function startSpel() {
    if (Math.random() < 0.5) {
        beurt = "Drake";
    } else {
        beurt = document.getElementById("naam").innerHTML;
    }
    veranderStatus("This can only mean one thing " + beurt + " can begin.");
}

console.log (Math.random());


// De loop zorgt ervoor dat alle vakjes weer verandert wordt in imgLeeg. Als de winnaar "speler" is dan begint Drake, zo niet dan begint "speler". Dus wie verliest mag beginnen met spelen. Wanneer het leeg is winaar weer null.
function resetSpel() {
    var i;
    for (i = 0; i < 9; i++) {
        neemRij[i].innerHTML = imgLeeg;
    }
    if (winnaar == document.getElementById("naam").innerHTML) {
        beurt = "Drake";
    } else {
        beurt = document.getElementById("naam").innerHTML;
    }
    winnaar = null;
    veranderStatus("Ever since the other one won this round you.. " + beurt + " can begin this round. ");
}


// Deze functie controleert of er drie op een rij is gevonden en of deze gelijk zijn aan dezelfde speler.
function checkRij(a,b,c, move) {
    var result = false;
    if (neemRij[a].innerHTML == move && neemRij[b].innerHTML == move && neemRij[c].innerHTML == move) {
        result= true;
        return result;
        }
}

// Hier worden alle mogelijke win situaties gecontroleerd.
function checkWin(move) {
    var result = false;
    if (checkRij(0, 1, 2, move) ||
        checkRij(3, 4, 5, move) ||
        checkRij(6, 7, 8, move) ||
        checkRij(0, 3, 6, move) ||
        checkRij(1, 4, 7, move) ||
        checkRij(2, 5, 8, move) ||
        checkRij(2, 4, 6, move) ||
        checkRij(0, 4, 8, move)) {
        result = true;
    }
    return result;
}


// Hiervoor checkt hij ook viaCheckwin wie er heeft gewonnen. Aan de hand daarva checkt hij wie er aan de beurt is.
function wisselBeurt() {
    if (checkWin(imgSpeler)) {
        winnaar = document.getElementById("naam").innerHTML;
        document.getElementById("score1").innerText = Number(document.getElementById("score1").innerText) + 1;
        veranderStatus("I know when " + beurt + " wins. You need to start again.");
        return;
    } else if (checkWin(imgDrake)) {
        winnaar = "Drake";
        document.getElementById("score2").innerText = Number(document.getElementById("score2").innerText) + 1;
        veranderStatus("I know when " + beurt + " wins. You need to start again.");
        return;
    } else if (beurt == document.getElementById("naam").innerHTML) {
            beurt = "Drake";
        } else {
            beurt = document.getElementById("naam").innerHTML;
        }
        veranderStatus("Its your turn now " + beurt + "");
}


// function die kijkt of het vakje ingevuld moet worden, Als dit al zo is krijg je een melding vis veranderStatus. Als er al een winnaar is kan er geen zet gedaan worden.

function volgZet(check) {
    if (winnaar != null) {
        veranderStatus("I know when " + beurt + " wins. You need to start again.");
    } else if (document.getElementById(check).innerHTML == imgLeeg) {
        if (beurt == document.getElementById("naam").innerHTML) {
            document.getElementById(check).innerHTML = imgSpeler;
            wisselBeurt();
        } else {
            document.getElementById(check).innerHTML = imgDrake;
            wisselBeurt();
        }
    } else { veranderStatus("Choose another one.");
            return;
           }
}

// Hier wordt er gereageerd als je klikt op de rijtjes.
function klikVak(){
    neemRij[0].onclick = function() {
        volgZet("a1");
        };
    neemRij[1].onclick = function() {
        volgZet("a2");
        };
    neemRij[2].onclick = function() {
        volgZet("a3");
        };
    neemRij[3].onclick = function() {
        volgZet("b1");
        };
    neemRij[4].onclick = function() {
        volgZet("b2");
        };
    neemRij[5].onclick = function() {
        volgZet("b3");
        };
    neemRij[6].onclick = function() {
        volgZet("c1");
        };
    neemRij[7].onclick = function() {
        volgZet("c2");
        };
    neemRij[8].onclick = function() {
        volgZet("c3");
        };
}

// Hier wordt startSpel en klikVak aangeroepen, het spel kan dan beginnen.  Als er op nieuwespel wordt gedrukt wordt de functie resetSpel aangeroepen.

naamInvoer();

startSpel();
klikVak();
document.getElementsByClassName("newspel")[0].onclick = function() {
    resetSpel();
};


