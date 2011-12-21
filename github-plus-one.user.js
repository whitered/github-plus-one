// ==UserScript==
// @name           Github Plus One
// @namespace      ru.whitered
// @include        http://github.com/*
// @include        https://github.com/*
// @exclude        http://github.com/*/*/*
// @exclude        https://github.com/*/*/*
// @version        0.1
// ==/UserScript==

function getElementByXPath(expr, node)
{
  return document.evaluate(expr, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

button = document.createElement("g:plusone"); 
button.setAttribute("size", "medium");
plusone = document.createElement("li");
plusone.setAttribute("class", "plusone");
plusone.appendChild(button);

container = getElementByXPath("//ul[@class='pagehead-actions']", document);
container.insertBefore(plusone, container.firstChild);

var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = "li.plusone>div { vertical-align: middle !important; }";


var po = document.createElement("script"); 
po.type = "text/javascript"; 
po.async = true;
po.src = "https://apis.google.com/js/plusone.js";

var head = document.getElementsByTagName("head")[0];
head.appendChild(po);
head.appendChild(style);
