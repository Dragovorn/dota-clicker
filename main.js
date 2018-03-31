/*
* This code is going to be a fucking mess
*/

var VERSION = "0.0.1";
var BETA = true;

function get(string) {
    return document.getElementById(string);
}

var Game = {};

Game.Launch = function() {
    Game.version = VERSION;
    Game.beta = BETA;
    Game.gold = 0;
    Game.gps = 0;
    
    Game.Init = function() {
        get("version").innerHTML = "v" + Game.version + (Game.beta ? " <span style='color:#f00;'>BETA</span>" : "");
        
        Game.gold = Game.gold + Game.gps;
        get("gold").innerHTML = Game.gold + " Gold";
        get("gps").innerHTML = Game.gps + " Gold/s";
        document.title = Game.gold + " Gold - Dota 2 Clicker";
    }
    
    Game.Init();
}

window.onload = function() {
    Game.Launch(); // Launch this
}