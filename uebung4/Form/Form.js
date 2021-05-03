window.onload = function() {

    $('[data-toggle="tooltip"]').tooltip();
    $('#successmessage').hide();
    document.getElementById("btn").onclick = function() {


        var vornamefeld = document.getElementById("vorname");
        var nachnamefeld = document.getElementById("nachname");
        var emailfeld = document.getElementById("email");
        var datumfeld = document.getElementById("datum");
        var telfeld = document.getElementById("tel");
        var addressfeld = document.getElementById("addresse");
        var Correct = true;

        if (!vornamefeld.value) {
            vornamefeld.style.borderColor = "red";
            Correct = false;
        } else {
            vornamefeld.style.borderColor = "";
        }

        if (!nachnamefeld.value) {
            nachnamefeld.style.borderColor = "red";
            Correct = false;
        } else {
            nachnamefeld.style.borderColor = "";
        }

        if ((!emailfeld.value) || (!emailfeld.value.match("[a-zA-Z0-9]{4}@[a-zA-Z0-9]{4}\.[a-zA-Z0-9]{4}"))) {
            emailfeld.style.borderColor = "red";
            Correct = false;
        } else {
            emailfeld.style.borderColor = "";
        }

        if ((!telfeld.value)) {
            telfeld.style.borderColor = "red";
            Correct = false;
        } else {
            telfeld.style.borderColor = "";
        }

        if ((!addressfeld.value)) {
            addressfeld.style.borderColor = "red";
            Correct = false;
        } else {
            addressfeld.style.borderColor = "";
        }

        if ((!datumfeld.value)) {
            datumfeld.style.borderColor = "red";
            Correct = false;
        } else {
            const date = new Date(datumfeld.value);
            const now = new Date();
            const diff = now - date;
            if (diff >= 5.676e+11) {
                datumfeld.style.borderColor = "";
            } else {
                datumfeld.style.borderColor = "red";
                Correct = false;
            }
        }
        if (Correct) {
            $('#successmessage').show();
        }

    }
}