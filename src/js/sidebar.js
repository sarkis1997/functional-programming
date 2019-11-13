const layout = document.getElementById('layOut');

let h1 = document.createElement('h1');
let h2 = document.createElement('h2');
let sidebar = document.createElement('div');

sidebar.classList.add("sidebar");
sidebar.appendChild(h1);
sidebar.appendChild(h2);
layout.appendChild(sidebar);

h1.append(document.createTextNode("Location: "));
h2.append(document.createTextNode("Objects: "));



