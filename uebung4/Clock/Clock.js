window.onload = function() {
    var pi = Math.PI;
    for (var i = 0; i < 60; i++) {
        var obj = document.createElement('div');
        var deg = i * 6;

        obj.style.left = "50%";
        obj.style.top = "50%";

        if (i % 5 == 0) {
            obj.className = "bigline";
        } else {
            obj.className = "smalline";
        }

        var factorX = Math.sin((degtorad(deg)));
        var factorY = Math.cos((degtorad(deg)));

        deg = deg - 180;
        obj.style.transformOrigin = "Top";
        obj.style.transform = "translate(" + factorX * 250 + "px ," + factorY * 250 + "px) rotate(" + -deg + "deg)";

        document.body.appendChild(obj);
    }
    window.sec = document.createElement('div');
    window.sec.className = "sekunde";
    window.sec.style.left = "50%";
    window.sec.style.top = "50%";
    window.sec.style.transformOrigin = "Top";
    window.sec.style.transform = "rotate(180deg)";
    document.body.appendChild(window.sec);

    window.min = document.createElement('div');
    window.min.className = "minute";
    window.min.style.left = "50%";
    window.min.style.top = "50%";
    window.min.style.transformOrigin = "Top";
    window.min.style.transform = "rotate(180deg)";
    document.body.appendChild(window.min);

    window.hr = document.createElement('div');
    window.hr.className = "stunde";
    window.hr.style.left = "50%";
    window.hr.style.top = "50%";
    window.hr.style.transformOrigin = "Top";
    window.hr.style.transform = "rotate(180deg)";
    document.body.appendChild(window.hr);

    setCurrentTime();
    window.setInterval(function() {
        setCurrentTime();
    });
}

function setCurrentTime() {
    debugger;
    var d = new Date();
    var sdeg = d.getSeconds() * 6;
    sdeg = sdeg - 180;
    window.sec.style.transformOrigin = "Top";
    window.sec.style.transform = "rotate(" + sdeg + "deg)";

    var mindeg = d.getMinutes() * 6;
    mindeg = mindeg - 180;
    window.min.style.transformOrigin = "Top";
    window.min.style.transform = "rotate(" + mindeg + "deg)";


    if (d.getHours() > 12) {
        var hrdeg = (d.getHours() - 12) * 30;
    } else {
        var hrdeg = d.getHours() * 15;
    }
    hrdeg = hrdeg - 180;

    window.hr.style.transformOrigin = "Top";
    window.hr.style.transform = "rotate(" + hrdeg + "deg)";


}

function degtorad(deg) {
    return deg * (Math.PI / 180);
}