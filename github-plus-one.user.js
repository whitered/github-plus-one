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

var button = document.createElement("g:plusone"); 
button.setAttribute("size", "medium");

var plusone = document.createElement("li");
plusone.setAttribute("class", "plusone");
plusone.appendChild(button);

var container = getElementByXPath("//ul[@class='pagehead-actions']", document);
container.insertBefore(plusone, container.firstChild);

var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = "li.plusone>div { vertical-align: middle !important; }";


var po = document.createElement("script"); 
po.type = "text/javascript"; 
po.async = true;
po.src = "https://apis.google.com/js/plusone.js";

var head = document.head;
head.appendChild(po);
head.appendChild(style);
