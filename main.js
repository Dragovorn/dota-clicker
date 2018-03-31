/*
* This code is going to be a fucking mess
*/

var VERSION = "0.0.1";
var BETA = true;

var gold = 0;
var gps = 0;

var Game = {};

Game.Launch = function() {
    Game.version = VERSION;
    Game.beta = BETA;
    
    Game.Launch = function() {
        console.log("TEST");
        Game.Init();
    }
    
    Game.Init = function() {
        get("version").innerHTML = "v" + Game.version + (Game.beta ? " <span style='color:#ff0;'>BETA</span>" : "");
        
        window.setInterval(function() { // TODO move this to game
            gold = gold + gps;
            updateWindow();
        }, 1000);
    }
}

function updateWindow() {
    get("gold").innerHTML = gold;
    get("gps").innerHTML = gps;
    document.title = gold + " Gold - Dota 2 Clicker";
}

function lastHit() {
    gold = gold + 1; // Change this to calculate the percent
    updateWindow();
}

function increaseGPS(number) {
    gps = gps + number;
    updateWindow();
}

Game.Launch(); // Launch this