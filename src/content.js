// read the list generated 
var wordList = read();

// keep extracting titles infinitely
addEventListener('scroll',scrollevent);
function scrollevent(){getTitles();}

function getRandomInt(min, max) {
  return Math.random() * (+max - +min) + +min; 
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
      var title = elm.title.toLowerCase();
      var rate_count = 0;
      // var titleArray = title.split(/[ ,]+/);
      var titleArray = title.split(/[\s,]+/);
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

      console.log("Title split into array+\n");
      console.log(titleArray.toString());

      if (tempRate > 0){
        tempRate = getRandomInt(80,100);
      }      
      if (tempRate == 0){
        tempRate = getRandomInt(0,10);
      }
      if (tempRate >= 100){
        tempRate = 87.1;
      }

      if(tempRate>=50){
        var str = new String("EDUCATIVE");
      }
      else{
        var str = new String("NON EDUCATIVE");          
      }

      // console.log(elm.title.toLowerCase()+"---"+i);
      if(str == "EDUCATIVE"){
        // elm.innerHTML = ("EV-> " + Math.round(tempRate).toString() + "% ").bold().big() + " " + str.fontcolor("green") +"    " + elm.title;
        elm.innerHTML = str.fontcolor("green").bold().big() +"    " + elm.title;
      }
      else{
        // elm.innerHTML = ("EV-> " + Math.round(tempRate).toString() + "% ").bold().big() + " " + str.fontcolor("red") +"    " + elm.title;
        elm.innerHTML = str.fontcolor("red").bold().big() +"    " + elm.title;
      }
    }
  }

  let b_tags = document.getElementsByTagName('span');
  for(elm of b_tags){
    if (elm.id == "video-title"){
      var title = elm.title.toLowerCase();
      var rate_count = 0;
      // var titleArray = title.split(/[ ,]+/);
      var titleArray = title.split(/[\s,]+/);
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

      console.log("Title split into array+\n");
      console.log(titleArray.toString());

      if (tempRate > 0){
        tempRate = getRandomInt(80,100);
      }      
      if (tempRate == 0){
        tempRate = getRandomInt(0,10);
      }
      if (tempRate >= 100){
        tempRate = 87.1;
      }

      if(tempRate>=50){
        var str = new String("EDUCATIVE");
      }
      else{
        var str = new String("NON EDUCATIVE");          
      }

      // console.log(elm.title.toLowerCase()+"---"+i);
      if(str == "EDUCATIVE"){
        // elm.innerHTML = ("EV-> " + Math.round(tempRate).toString() + "% ").bold().big() + " " + str.fontcolor("green") +"    " + elm.title;
        elm.innerHTML = str.fontcolor("green").bold().big() +"    " + elm.title;
      }
      else{
        // elm.innerHTML = ("EV-> " + Math.round(tempRate).toString() + "% ").bold().big() + " " + str.fontcolor("red") +"    " + elm.title;
        elm.innerHTML = str.fontcolor("red").bold().big() +"    " + elm.title;
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
  var link = "https://gist.githubusercontent.com/harrypotter0/d235733379d4994fca01a52e36fc5be9/raw/b0092319c16460bd9b434b4d4a7c80d1eff313f5/wordlist.txt";
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
