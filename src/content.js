// read the list generated 
var wordList;
var wordList = [];
var xmlhttp;
if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var text = xmlhttp.responseText;
        // Now convert it into array using regex
        wordList = text.split(/\n|\r/g);
    }
}
// var file1 = "/home/harrypotter0/Documents/final_year_project/src/backend/wordlist.txt";
var file1 = "https://gist.githubusercontent.com/harrypotter0/d235733379d4994fca01a52e36fc5be9/raw/b0092319c16460bd9b434b4d4a7c80d1eff313f5/wordlist.txt";
xmlhttp.open("GET", file1, true);
xmlhttp.send();


// keep extracting titles infinitely
addEventListener('scroll',scrollevent);
function scrollevent(){getTitles();}

function getRandomInt(min, max) {
  return Math.random() * (+max - +min) + +min; 
}

// Get Title of Videos
function getTitles(){
  
  let a_tags = document.querySelectorAll('a,span');
  for(elm of a_tags){

///
    if (elm.id == "video-title"){
      var title = elm.title.toLowerCase();
      var rate_count = 0;
      var titleArray = title.split(/[\s,]+/);
      var matching_words = '';
      var i,j;
      // console.log("WORDLIST yeh rhhi==>"+wordList.toString().toLowerCase());
      // var w_list_string = wordList.toString().toLowerCase();

      for(i of titleArray){
        i = i.toLowerCase();
        // console.log(i+",");
        for(j of wordList){
          j = j.toLowerCase();
          if(i == j){
            rate_count += 1;
            matching_words += i+' ';
            break;
          }
        }
      }

      // console.log("TITLE>LENGTH: "+ title.split(/(\s+)/).length);
      tempRate = rate_count / titleArray.length * 100;
      if(tempRate>0){
        console.log("Rating of "+title+" is "+tempRate+"\n");
        console.log("Matching String ==> "+matching_words+"\n");
        console.log("No of Matching Words is ==> "+rate_count+"\n");
        console.log("No of Words is ==> "+titleArray.length+"\n");    
        // console.log("Title split into array ==> "+titleArray.toString());
      }

      if(tempRate>0){
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
/// 

  }

}

function read(){
  var txt = '';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.status == 200 && xmlhttp.readyState == 4){}
  };
  // Send request to server
  var link = "https://gist.githubusercontent.com/harrypotter0/d235733379d4994fca01a52e36fc5be9/raw/23bcf66b4403bb30c14b0f3c9f3f43175150c6f3/wordlist.txt";
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
