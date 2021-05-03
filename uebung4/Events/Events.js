 //Listener-Setup für Objekte 
 window.onload = function(){
        document.getElementById("object1").onclick = function(){
            window.alert("Es wurde auf die schwarze Fläche geklickt");
        }
        document.getElementById("object2").onmouseover = function(){
            window.alert("Es wurde über die rote Fläche gehovered");
        }
        document.getElementById("text").addEventListener('input',function(){
            window.alert("Es wurde in die Textbox getippt");
        });
        document.getElementById("dropdown").onchange = function(){
            window.alert("Es wurde die Nummer " + document.getElementById("dropdown").value + " ausgewählt");
        };
        document.getElementById("form3").onsubmit = function(e){
            window.alert("Das form wurde submitted")
        };
        document.getElementById("form4").onsubmit = function(e){
            e.preventDefault();
            var value = parseInt(document.getElementById('number').value, 10);
            value = isNaN(value) ? 0 : value;
            value++;
            document.getElementById('number').value = value;    
        };
        document.getElementById("object7").onclick = function(){
            window.alert(1);
        }
        document.getElementById("object7").onmousedown = function(){
            window.alert(2);
        }
        document.getElementById("object8").onclick = function(){
            document.getElementById("object8").style.backgroundColor = "#000000";
        }
 }