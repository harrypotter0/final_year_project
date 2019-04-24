// read the list generated 
var wordList = read();

// keep extracting titles infinitely
addEventListener('scroll',scrollevent);
function scrollevent(){getTitles();}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Rating Calculation 
function getrating(title){
  var rate_count = 1;
  var titleArray = title.split(/[ ,]+/);
  var matching_words = ' ';
  var i;
  for(i in wordList){
    if(title.includes(i.toLowerCase())){
      // console.log(i+"\n");
      rate_count += 1;
      matching_words += i.toLowerCase();
    }
  }
  // console.log("TITLE>LENGTH: "+ title.split(/(\s+)/).length);
  tempRate = rate_count / titleArray.length * 100;
  console.log("Rating of "+title+" is "+tempRate+"\n");
  console.log("Matching String "+matching_words+"\n");
  console.log("No of Matching Words is "+rate_count+"\n");
  console.log("No of Words is "+titleArray.length+"\n");  
  
}

// Get Title of Videos
function getTitles(){
  
  let a_tags = document.getElementsByTagName('a');
  for(elm of a_tags){
    if (elm.id == "video-title"){
      if (elm.id == "video-title"){
        // var i =  getrating(elm.title.toLowerCase());
        var title = elm.title.toLowerCase();
  
        var rate_count = 1;
        var titleArray = title.split(/[ ,]+/);
        var matching_words = ' ';
        var i;
        for(i in wordList){
          if(title.includes(i.toLowerCase())){
            // console.log(i+"\n");
            rate_count += 1;
            matching_words += i.toLowerCase();
          }
        }
        // console.log("TITLE>LENGTH: "+ title.split(/(\s+)/).length);
        tempRate = rate_count / titleArray.length * 100;
        console.log("Rating of "+title+" is "+tempRate+"\n");
        console.log("Matching String "+matching_words+"\n");
        console.log("No of Matching Words is "+rate_count+"\n");
        console.log("No of Words is "+titleArray.length+"\n");  
        
        if (tempRate > 20 && tempRate<50){
          tempRate += 50;
          if (tempRate == 100){
            tempRate = getRandomInt(9);
          }
          if (tempRate >= 100){
            tempRate = 87.1;
          }
        }
        
        if(tempRate>=50){
          var str = new String("EDUCATIVE");
        }
        else{
          var str = new String("NON EDUCATIVE");          
        }

        console.log(elm.title.toLowerCase()+"---"+i);
        if(str == "EDUCATIVE"){
          elm.innerHTML = ("EV-> " + Math.round(tempRate).toString() + "% ").bold().big() + " " + str.fontcolor("green") +"    " + elm.title;
        }
        else{
          elm.innerHTML = ("EV-> " + Math.round(tempRate).toString() + "% ").bold().big() + " " + str.fontcolor("red") +"    " + elm.title;
        }
      }
    }
  }

  let b_tags = document.getElementsByTagName('span');
  for(elm of b_tags){
    if (elm.id == "video-title"){
      if (elm.id == "video-title"){
        // var i =  getrating(elm.title.toLowerCase());
        var title = elm.title.toLowerCase();
  
        var rate_count = 1;
        var titleArray = title.split(/[ ,]+/);
        var matching_words = ' ';
        var i;
        for(i in wordList){
          if(title.includes(i.toLowerCase())){
            // console.log(i+"\n");
            rate_count += 1;
            matching_words += i.toLowerCase();
          }
        }
        // console.log("TITLE>LENGTH: "+ title.split(/(\s+)/).length);
        tempRate = rate_count / titleArray.length * 100;
        console.log("Rating of "+title+" is "+tempRate+"\n");
        console.log("Matching String "+matching_words+"\n");
        console.log("No of Matching Words is "+rate_count+"\n");
        console.log("No of Words is "+titleArray.length+"\n");  
        
        if (tempRate > 20 && tempRate<50){
          tempRate += 50;
          if (tempRate == 100){
            tempRate = getRandomInt(9);
          }
          if (tempRate >= 100){
            tempRate = 87.1;
          }
        }
        
        if(tempRate>=50){
          var str = new String("EDUCATIVE");
        }
        else{
          var str = new String("NON EDUCATIVE");          
        }

        console.log(elm.title.toLowerCase()+"---"+i);
        if(str == "EDUCATIVE"){
          elm.innerHTML = ("EV-> " + Math.round(tempRate).toString() + "% ").bold().big() + " " + str.fontcolor("green") +"    " + elm.title;
        }
        else{
          elm.innerHTML = ("EV-> " + Math.round(tempRate).toString() + "% ").bold().big() + " " + str.fontcolor("red") +"    " + elm.title;
        }
      }
    }
  }
}

function read(){
  var txt = '';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.status == 200 && xmlhttp.readyState == 4){}
  };
  // Send request to server
  var link = "https://gist.githubusercontent.com/harrypotter0/d235733379d4994fca01a52e36fc5be9/raw/e1da226b2b8f13b4228efcfd735a319396b497f8/wordlist.txt";
  xmlhttp.open("GET", link, true);
  xmlhttp.send();
  return this;
}

chrome.runtime.onMessage.addListener(message);
function message(msg,sender,sendResponse){
  // console.log(msg.txt);
  if(msg.txt === "activate"){
      getTitles();
  }
}
