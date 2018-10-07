var wordList = read();
// var wordList2 = read2();
// var wordList3 = read3();

addEventListener('scroll',scrollevent);
function scrollevent(){getTitles();}

function getTitles(){
  let a_tags = document.getElementsByTagName('a');
  for(elm of a_tags){
    if (elm.id == "video-title"){
      var i =  getrating(elm.title.toLowerCase());
      elm.innerHTML = ("PV-> " + "<img src=\"icons/logo.png\" height=\"15px\" width=\"15px\">" + i.toString() + "% ").bold().big() + "    " + elm.title;
    }
  }
  let b_tags = document.getElementsByTagName('span');
  for(elm of b_tags){
    if (elm.id == "video-title"){
      var i =  getrating(elm.title.toLowerCase());
      elm.innerHTML = ("PV->  "+ "<img src=\"icons/logo.png\" height=\"15px\" width=\"15px\">" + i.toString() + "% ").bold().big() + "    " + elm.title;
    }
  }
}

function read(){
  var txt = '';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){}
  };
  xmlhttp.open("GET","src/wordList.txt" ,true);
  xmlhttp.send();
  return this;
}

// function read2(){
//   var txt = '';
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.onreadystatechange = function(){
//   if(xmlhttp.status == 200 && xmlhttp.readyState == 4){}
//   };
//   xmlhttp.open("GET","src/wordList2.txt" ,true);
//   xmlhttp.send();
//   return this;
// }

// function read3(){
//   var txt = '';
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.onreadystatechange = function(){
//   if(xmlhttp.status == 200 && xmlhttp.readyState == 4){}
//   };
//   xmlhttp.open("GET","src/wordList3.txt" ,true);
//   xmlhttp.send();
//   return this;
// }

function getrating(title){
  var rate_count = 1;
  var titleArray = title.split(/[ ,]+/);

  for(i in wordList){
    if(title.includes(i.toLowerCase())){
      rate_count += 1;
    }
  }
  console.log("TITLE>LENGTH: "+ title.split(/(\s+)/).length);
  tempRate = rate_count / titleArray.length * 100;
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

chrome.runtime.onMessage.addListener(message);

function message(msg,sender,sendResponse){
  console.log(msg.txt);
  if(msg.txt === "activate"){
      getTitles();
  }
}
