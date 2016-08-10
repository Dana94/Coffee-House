/*Dana Ottaviani
  12-9-2015
  CS 275
  info.js*/

"use strict";

// array of personalized messages
var messages = ["Nice to have you back, " + localStorage.getItem("fName") + ".", 
                localStorage.getItem("fName") + ", we are glad you enjoyed our coffee last time!",
                "Welcome back, " + localStorage.getItem("fName") + "!",
                "Need another delivery " + localStorage.getItem("fName") + "?",
                "Can't stay away, can you " + localStorage.getItem("fName") + "?"];

/*
* This function looks to see if the current date is passed the expiration date. If it is, then a standard message shows. If the expiration date has  * not passed, then a random personal greeting is shown with a discount to their recent coffee purchases. Then the exiration date is updated.  
*/
function updateStorage()
{
    var date = new Date(); 
    var expDate = new Date();
    var exp = new Date(localStorage.expires); // makes new date containing the epiration date of the storage

    if (date > exp) // if the current date is greater than the expiration date
    {
        document.getElementsByTagName("h1")[0].innerHTML = "Welcome to the Coffee House!";
        
        document.getElementsByTagName("h3")[1].innerHTML = "Keep an eye out for sales each week!";
        
        localStorage.clear(); // clears out all information
    }
    else // extra-credit, 5 random personalized greeting
    {
        var greet = Math.floor(Math.random() * 5);
        document.getElementsByTagName("h1")[0].innerHTML = messages[greet];     
        
        var coffees = localStorage.getItem("coffee");
        var coffeeList = coffees.substring(0, coffees.length - 2); //removes the last ", " from the list
        
        document.getElementById("sale").innerHTML = "<h1>Special Deal This Week!</h1> <br> <h2> <span style='color:red'>50% off </span>" + coffeeList + "</h2>";
    }
    
    expDate.setMonth(date.getMonth() + 1); // updates the expiration by 1 month
    
    localStorage.expires = expDate;
}

if (window.addEventListener)
{
   window.addEventListener("load", updateStorage, false);
}
else
{
   window.attachEvent("onload", updateStorage);  
}