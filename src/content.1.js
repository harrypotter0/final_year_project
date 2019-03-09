// read the list generated 
var wordList = read();

// keep extracting titles infinitely
addEventListener('scroll',scrollevent);
function scrollevent(){getTitles();}

// Rating Calculation 
function getrating(title){
  var rate_count = 0;
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
  if (tempRate > 21){
    tempRate += 30;
    if (tempRate >= 100){
      tempRate = 94.1;
    }
    return Math.round(tempRate);
  }
  else{
    return Math.round(tempRate);
  }
}
var txtFile = "wordlist.txt";
var file = new File([""],txtFile);

file.open("a"); 

// Get Title of Videos
function getTitles(){
  
  let a_tags = document.getElementsByTagName('a');
  for(elm of a_tags){
    if (elm.id == "video-title"){
      var ii;
      for(ii in elm.title.toLowerCase()){
        file.writeln(ii.toString());
      }
      var i =  getrating(elm.title.toLowerCase());
      elm.innerHTML = ("EV-> " + i.toString() + "% ").bold().big() + "    " + elm.title;
    }
  }

  let b_tags = document.getElementsByTagName('span');
  for(elm of b_tags){
    if (elm.id == "video-title"){
      var ii;
      for(ii in elm.title.toLowerCase()){
        file.writeln(ii.toString());
      }
      var i =  getrating(elm.title.toLowerCase());
      elm.innerHTML = ("EV-> "+ i.toString() + "% ").bold().big() + "    " + elm.title;
    }
  }
}
file.close();

function read(){
  var txt = '';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.status == 200 && xmlhttp.readyState == 4){}
  };
  // Send request to server
  xmlhttp.open("GET","https://raw.githubusercontent.com/harrypotter0/final_year_project/master/backend/wordlist.txt" ,true);
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
