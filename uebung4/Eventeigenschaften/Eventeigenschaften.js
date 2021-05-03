window.onload = function() {
    var x = 15;
    var y = 15;
    div1 = document.getElementById("div1");
    div2 = document.getElementById("div2");

    div1.onclick = function(event) {
        x = event.clientX;
        y = event.clientY;
        x = (x > 385) ? 385 : x;
        x = (x < 15) ? 15 : x;
        y = (y < 15) ? 15 : y;
        y = (y > 585) ? 585 : y;
        move(x, y, 2);
    }

    window.onkeydown = function(event) {
        console.log(event.key);
        if (event.keyCode == 40) {
            if (y < 585) { //KeyDown
                y++;
                move(x, y);
            }
        } else if (event.keyCode == 38) { //Keyup
            if (y > 15) {
                y--;
                move(x, y);
            }
        } else if (event.keyCode == 37) { //KeyLeft
            if (x > 15) {
                x--;
                move(x, y);
            }
        } else if (event.keyCode == 39) { //KeyRight
            if (x < 385) {
                x++;
                move(x, y);
            }
        }
    }
}


function move(x, y, t = 0) {
    var xo = x - 15;
    var yo = y - 15;

    div2.style.transitionDuration = t + "s";
    div2.style.transform = "translate(" + xo + "px, " + yo + "px)";
}