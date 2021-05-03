let header = document.getElementsByTagName("header")
let a = document.createElement("div")
a.innerHTML = "Dies ist ein Dynamisch erstelltes Element."
header.item(0).appendChild(a)