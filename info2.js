/*Dana Ottaviani
  12-9-2015
  CS 275
  info2.js*/

"use strict";

var fName;
var lName;
var dorm;

/* This function retrieves the contact info from the query string and puts them into global variables. A personal message is also created.
* The localStorage is checked to see if there are any coffees purchased in the past and reduces the price of those coffees in the menu.
*/
function getInfo()
{    
    if (location.search)
    {
        var query = location.search;
     
        query = query.substring(1, query.length) // removes the "?"
        
        var queryArray = query.split("&");
        
        var i = 0;
        
        while (i < queryArray.length)
        {
            var data = queryArray[i];
            
            if (data.substring(0, data.indexOf("=")) === "fName") // finds the first name
            {
                fName = data.substring(data.indexOf("=") + 1, data.length);
                document.getElementsByTagName("h1")[0].innerHTML = "Which coffees would you like delivered " + fName + "?";
            }
            
            if (data.substring(0, data.indexOf("=")) === "lName") // finds the last name
            {
                lName = data.substring(data.indexOf("=") + 1, data.length);
            }
            
            if (data.substring(0, data.indexOf("=")) === "dorm") // finds the dorm room number
            {
                dorm = data.substring(data.indexOf("=") + 1, data.length);
            }
            
            i++;
        }
    }
    
    if (localStorage.coffee !== undefined) // there was a coffee purchased before
    {
       var coffees = localStorage.getItem("coffee");

       var coffeeList = coffees.split(", "); 
    
       for (var i = 0; i < coffeeList.length - 1; i++) // the last value in the array is a " ", so it isn't looked at
       {
           var pick = coffeeList[i];
          
           var price = document.getElementById(pick).innerHTML; // the price of the coffee is retrieved
           
           price = price.substring(1, price.length); // removes the "$"
           
           price = parseFloat(price); // parses the string as a float
           
           price = (price * .5).toPrecision(3); // price is multiplied by 1/2 and rounded to 2 decimal places
           
           document.getElementById(pick).innerHTML = "$" + price.toString() + " <span style='color:red'> SALE! </span>";        
       }
    }   
}

/* This function first removes the old coffee list from localStorage and checks each coffee in the menu. If it has been checked, then it is put into
* the list under the name "coffee". Then localStorage is checked to see if any coffees were picked. If the value of "coffee" is undefined, then an
* error message is shown saying to pick a coffee. If there is a value for "coffee" then the fName, lName, and dorm values are put into localStorage. 
*/
function orderComplete()
{
    localStorage.removeItem("coffee"); //deletes the old list of coffees
    
    var coffeeArray = document.getElementsByName("coffee");
  
    var i = 0;
    var j = 1;
    while (i < coffeeArray.length)
    {         
        if (coffeeArray[i].checked) // makes a list of any coffees picked into localStorage under "coffee"
        {
             localStorage.coffee = (localStorage.coffee === undefined ? "" : localStorage.coffee) + coffeeArray[i].value + ", ";
        }
        
        i++;
        j++;
    }
    
    if (localStorage.coffee === undefined) // if no coffees were picked
    {
        window.alert("Please choose from our selection.");
        return false;
    }
    else // at least one coffee has been picked
    {
        localStorage.setItem("fName", fName); // add the contact info to localStorage
        localStorage.setItem("lName", lName);
        localStorage.setItem("dorm", dorm);
        return true;
        
    }
}

if (window.addEventListener)
{
   window.addEventListener("load", getInfo, false);
}
else
{
   window.attachEvent("onload", getInfo);  
}