//create the sidebar html elements through js and do things with it.

const layout = document.getElementById('layOut');

let h1 = document.createElement('h1');
let h2 = document.createElement('h2');
let div = document.createElement('div');
let sidebar = document.createElement('div');

sidebar.classList.add("sidebar");
div.classList.add("metaData");

div.appendChild(h1);
div.appendChild(h2);
sidebar.appendChild(div);
layout.appendChild(sidebar);

h1.append(document.createTextNode("Location: "));
h2.append(document.createTextNode("Objects: "));




