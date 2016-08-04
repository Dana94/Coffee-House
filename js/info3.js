/*Dana Ottaviani
  12-11-2015
  CS 275
  info3.js*/

"use strict";

var fName = localStorage.getItem("fName");
var lName = localStorage.getItem("lName");
var dorm = localStorage.getItem("dorm");
var coffees = localStorage.getItem("coffee");

var coffeeList = coffees.substring(0, coffees.length - 2); //removes the last ", " from the list

/* This function displays the user's full name and their list of coffees and that it will be delivered to the given dorm room. */
function displayInfo()
{
    var purchase = fName + " " + lName + ", <br> your " + coffeeList + " will be delivered to dorm " + dorm + ". <br><br> Thank you for doing business with us.";
    document.getElementsByTagName("h2")[0].innerHTML = purchase; 
}

if (window.addEventListener)
{
   window.addEventListener("load", displayInfo, false);
}
else
{
   window.attachEvent("onload", displayInfo);  
}