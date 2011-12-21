// ==UserScript==
// @name           Github Plus One
// @namespace      ru.whitered
// @include        http://github.com/*
// @include        https://github.com/*
// @exclude        http://github.com/
// @exclude        https://github.com/
// @exclude        http://github.com/*/*/*
// @exclude        https://github.com/*/*/*
// @version        0.2
// ==/UserScript==

function getElementByXPath(expr, node)
{
  return document.evaluate(expr, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function insertPlusOne(node)
{
  var button = document.createElement("g:plusone"); 
  button.setAttribute("size", "small");
  node.appendChild(button);

  var po = document.createElement("script"); 
  po.type = "text/javascript"; 
  po.async = true;
  po.src = "https://apis.google.com/js/plusone.js";

  document.head.appendChild(po);
}

var pagehead = getElementByXPath("//ul[@class='pagehead-actions']", document);
if(pagehead)
{
  var nodes = pagehead.parentNode.childNodes;
  for (var i = 0; i < nodes.length; i++)
  {
    if(nodes[i].nodeType == 1)
    {
      insertPlusOne(nodes[i]);
      break;
    }
  }
}
