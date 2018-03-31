/*
* This code is going to be a fucking mess
*/

var VERSION = "0.0.1";
var BETA = true;

function get(string) {
    return document.getElementById(string);
}

function addEvent(element, name, execute) {
    if (element.attachEvent) {
        element.attachEvent("on" + name, function() {
            execute.call(element);
        });
    } else if (element.addEventListener) {
        element.addEventListener(name, execute, false);
    }
}

var Game = {};

Game.Launch = function() {
    Game.version = VERSION;
    Game.beta = BETA;
    Game.gold = 0;
    Game.gps = 0;
    
    Game.CalculateClick = function() {
        return 1; // TODO
    }
    
    Game.ClickCreep = function() {
        Game.gold = Game.gold + Game.CalculateClick();
    }
    
    Game.Update = function() {
        Game.gold = Game.gold + Game.gps;
    }
    
    Game.Render = function() {
        get("gold").innerHTML = Game.gold + " Gold";
        get("gps").innerHTML = Game.gps + " Gold/s";
        document.title = Game.gold + " Gold - Dota 2 Clicker";
    }
    
    Game.Tick = function() {
        Game.Update();
        Game.Render();
    }
    
    Game.Init = function() {
        get("version").innerHTML = "v" + Game.version + (Game.beta ? " <span style='color:#f00;'>BETA</span>" : "");
        
        Game.Tick();
        
        addEvent(get("bigCreep"), "click", Game.ClickCreep)
        
        window.setInterval(function() {
            Game.Tick();
        }, 1000 / 60);
    }
    
    Game.Init();
}

window.onload = function() {
    Game.Launch(); // Launch this
}