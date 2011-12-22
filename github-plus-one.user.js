// ==UserScript==
// @name           Github Plus One
// @namespace      ru.whitered
// @include        http://github.com/*
// @include        https://github.com/*
// @exclude        http://github.com/
// @exclude        https://github.com/
// @exclude        http://github.com/*/*/*
// @exclude        https://github.com/*/*/*
// @version        0.3
// ==/UserScript==

function getElementByXPath(expr, node)
{
  return document.evaluate(expr, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function hasClass(ele, cls)
{
  if(!ele) return false;
  return ele.className ? ele.className.split(" ").indexOf(cls) >= 0 : false;
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

function setItemType(type)
{
  var html = document.getElementsByTagName("html")[0];
  html.setAttribute("itemscope", "itemscope");
  html.setAttribute("itemtype", "http://schema.org/" + type);
}

function setMeta(name, value)
{
  var meta = document.createElement("meta");
  meta.setAttribute("itemprop", name);
  meta.setAttribute("content", value);
  document.head.appendChild(meta);
}

function getText(node)
{
  return node.innerHTML.split("\n").join(" ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

var pagehead = getElementByXPath("//div[contains(@class, 'pagehead')]", document);
var h1 = pagehead.getElementsByTagName("h1")[0];
if(!h1) return;

if(hasClass(pagehead, "repohead")) // repository
{
  setItemType("Product");
  setMeta("name", getElementByXPath("//head/title", document).innerHTML);
  setMeta("description", getElementByXPath("//head/meta[@name = 'description']", document).getAttribute("content"));
  setMeta("image", "https://a248.e.akamai.net/assets.github.com/images/icons/public.png");
  insertPlusOne(h1);
}
else if(hasClass(pagehead, "userpage"))
{
  if(getElementByXPath(".//span[@class = 'organization-bit']", h1))
  {
    setItemType("Organization");
  }
  else
  {
    setItemType("Person");
  }
  setMeta("name", getElementByXPath("//head/title", document).innerHTML);
  setMeta("description", getText(getElementByXPath("//div[contains(@class, 'profilecols')]", document)));
  setMeta("image", getElementByXPath(".//img", h1).getAttribute("src"));
  insertPlusOne(h1);
}
