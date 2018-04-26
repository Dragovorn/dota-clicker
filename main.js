/*
 * This code is going to be a fucking mess
 */

var VERSION = "0.0.1";
var BETA = true;

/*
 * Just some helper functions to help us along our way.
 */
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

function setCookie(name, value, days) {
    var expires = "";

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "") + ";" + expires + ";path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for (var x = 0; x < ca.length; x++) {
        var i = ca[x];

        while (i.charAt(0) == ' ') {
            i = i.substring(1, i.length);
        }

        if (i.indexOf(nameEQ) == 0) {
            return i.substring(nameEQ.length, i.length);
        }
    }

    return null;
}

/*
 * Time for some real game code friends.
 */

var Game = {};

Game.Launch = function() {
    Game.version = VERSION;
    Game.beta = BETA;
    Game.gold = 0;
    Game.gps = 0;

    Game.CalculateClick = function() {
        return 1; // TODO make this take upgrades and shit into account
    }

    Game.ClickCreep = function() {
        var audio = new Audio("sound/last_hit.mp3");
        audio.play();

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

    Game.Save = function() {
        var jsonData = "{\"gold\" : \"" + Game.gold + "\"}";

        setCookie("D2Csavedata", jsonData, 365); // Maybe somehow make this a better 'infinite' duration cookie

        console.log("Saved!");
    }

    Game.Load = function() {
        var data = getCookie("D2Csavedata");

        if (!data) {
            console.log("No data to load!");
            return;
        }

        var json = JSON.parse(data);

        if (json.gold) {
            Game.gold = Number(json.gold);
        }

        console.log("Successfully loaded!");
    }

    Game.Init = function() {
        Game.Load();

        get("version").innerHTML = "v" + Game.version + (Game.beta ? " <span style='color:#f00;'>BETA</span>" : "");

        addEvent(get("bigCreep"), "click", Game.ClickCreep)

        window.setInterval(function() {
            Game.Tick();
        }, 1000 / 60);

        window.setInterval(function() {
            Game.Save();
        }, 500); // Every half a second save it
    }

    Game.Init();
}

window.onload = function() {
    Game.Launch(); // Launch this trainwreck
}
