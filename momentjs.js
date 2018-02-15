var moment = function(dateString,formatString){
  
  var monthFull=["January","February","March","April","May","June","July","August","September","October","November","December"];
    var monthHalf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var dayFull = ["","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
      var dayHalf = ["","Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
      var dayOneFourth = ["","Mo","Tu","We","Th","Fr","Sa","Su"];

  var today ;
  var date ;
var month ;
var year ;
var hour ; 
var min ; 
var secs;
var day ;
var AMPM ;
var yearIndex,monthIndex,dateIndex,yCount,mCount,dCount,extractY,extractM,extractD,presentY,presentM,presentD;
var setVariables = function (today){
  date = today.getDate();
month = today.getMonth();
year = today.getFullYear();
 hour = today.getHours(); 
 min = today.getMinutes(); 
 secs = today.getSeconds();
 day = today.getDay();
 AMPM = hour >= 12 ? 'PM' : 'AM';
}
var extractDate = function(dateString,formatString){
    if(formatString.search("YYYY")>=0){
    yearIndex = formatString.indexOf("YYYY");
    yCount = 4;
  }
  else if(formatString.search("YYY")>=0){
     yearIndex = formatString.indexOf("YYY");
    yCount = 3;
  }
    else if(formatString.search("YY")>=0){
     yearIndex = formatString.indexOf("YY");
    yCount = 2;
  }
    else if(formatString.search("Y")>=0){
     yearIndex = formatString.indexOf("Y");
    yCount = 1;
  }
  if(formatString.search("MM")>=0){
    monthIndex = formatString.indexOf("MM");
    mCount = 2;
  }
  else if(formatString.search("M")>=0){
     monthIndex = formatString.indexOf("M");
    mCount = 2;
  }
    if(formatString.search("DD")>=0){
    dateIndex = formatString.indexOf("DD");
    dCount = 2;
  }
  else if(formatString.search("D")>=0){
     dateIndex = formatString.indexOf("D");
    dCount = 2;
  }
  extractY= dateString.substring(yearIndex,yearIndex+yCount);
  extractM= dateString.substring(monthIndex,monthIndex+mCount);
  extractD= dateString.substring(dateIndex,dateIndex+dCount);
}
var setPresentDate = function(){
  today =new Date();
  setVariables(today);
}

var fornow = function(){
  
    extractDate(dateString,formatString);
    setPresentDate();
  
  if(yCount === 1 || yCount === 4 || yCount === 3){
    presentY = year;
  }
  else{
    presentY = year.toString().substring(2,4);
  }
  presentM = month+1;
  presentD = date;
  
  if(parseInt(presentY) === parseInt(extractY)){
    if(parseInt(presentM) === parseInt(extractM)){
      if(parseInt(presentD) === parseInt(extractD)){
        console.log("12 hours ago");
      }
      else{
        if(presentD > extractD){
          console.log((presentD - extractD)+" day/days ago");
        }
        else{
          console.log("in "+(extractD - presentD)+" day/days");
        }
      }
    }
    else{
      if(presentM > extractM){
        console.log((presentM - extractM)+" month/months ago");
      }else{
        console.log("in "+(extractM - presentM)+" month/months");
      }
    }
  }
  else{
    if(presentY > extractY){
      console.log((presentY - extractY)+" year/years ago");
    }
    else{
      console.log("in "+(extractY - presentY)+" year/years");
    }
  }
  
}

var endof = function(selector){
  
  var fromnow = function(){
    
    if(typeof selector === "undefined"){
      console.log("in few seconds")
    }else{
    
    switch(selector){
      
      case "minute":{
        console.log("in "+(60-secs)+" seconds");
        break;
      }
      case "hour":{
        console.log("in "+(60-min)+" minutes");
        break;
      }
      case "day":{
        console.log("in "+(24-hour)+" hours");
        break;
      }
      case "month":{
        console.log("in "+(30-date)+" days");
        break;
      }
      case "year":{
        console.log("in "+(12-month)+" month/months")
        break;
      }
      default:{
        console.log("SyntaxError");
      }
    }
    }
    
  }
  
  return{
    fromNow:fromnow
  }
  
}

var startof = function(selector){
  
  var fromnow = function(){
    
    if(typeof selector === "undefined"){
      console.log("a few seconds ago")
    }else{
    
    switch(selector){
      
      case "minute":{
        console.log(secs+" seconds ago");
        break;
      }
      case "hour":{
        console.log(min+" minutes ago");
        break;
      }
      case "day":{
        console.log(hour+" hours ago");
        break;
      }
      case "month":{
        console.log(date+" days ago");
        break;
      }
      case "year":{
        console.log(month+" month/months ago")
        break;
      }
      default:{
        console.log("SyntaxError");
      }
    }
    }
    
  }
  
  return{
    fromNow:fromnow
  }
  
}

var add = function(count,selector){
  
  var calender = function(){
    
     if(typeof count === "undefined" || typeof selector === "undefined"){
      console.log("Today at "+hour+":"+min+" "+AMPM);
    }
     else{
  switch(selector){
    
    case "days":{

      if(count>7){

     
          var myDate = new Date();  
          var dayOfMonth = myDate.getDate();  
          myDate.setDate(dayOfMonth + count); 
          var subDate = myDate.getDate();
          var subMonth = myDate.getMonth()+1;
          var subYear = myDate.getFullYear();
          
          console.log(subMonth+"/"+subDate+"/"+subYear);
          
       
     
      }else{
      console.log(dayFull[day+(count)]+" at "+hour+":"+min+" "+AMPM);
        
      }
      break;
    }
    case "months":{
      
          var myDate = new Date();  
          var dayOfMonth = myDate.getDate();  
          myDate.setDate(dayOfMonth + count*30); 
          var subDate = myDate.getDate();
          var subMonth = myDate.getMonth()+1;
          var subYear = myDate.getFullYear();
          
          console.log(subMonth+"/"+subDate+"/"+subYear);
      
      
      break;
    }
    case "years":{
      var myDate = new Date();  
          var dayOfMonth = myDate.getDate();  
          myDate.setDate(dayOfMonth + count*365); 
          var subDate = myDate.getDate();
          var subMonth = myDate.getMonth()+1;
          var subYear = myDate.getFullYear();
          
          console.log(subMonth+"/"+subDate+"/"+subYear);
      break;
    }
    default:{
      console.log("SyntaxError");
    }
  }
  
    }


  }

  return{
    calender:calender
  }
}

var sub = function(count,selector){
  
   var calender = function(){
    // console.log(count+selector);
    
    if(typeof count === "undefined" || typeof selector === "undefined"){
      console.log("Today at "+hour+":"+min+" "+AMPM);
    }
    else{
  switch(selector){
    
    case "days":{

      if(count>7){

     
          var myDate = new Date();  
          var dayOfMonth = myDate.getDate();  
          myDate.setDate(dayOfMonth - count); 
          var subDate = myDate.getDate();
          var subMonth = myDate.getMonth()+1;
          var subYear = myDate.getFullYear();
          
          console.log(subMonth+"/"+subDate+"/"+subYear);
          
       
     
      }else{
      console.log("Last "+dayFull[day+(7-count)]+" at "+hour+":"+min+" "+AMPM);
        
      }
      break;
    }
    case "months":{
      
          var myDate = new Date();  
          var dayOfMonth = myDate.getDate();  
          myDate.setDate(dayOfMonth - count*30); 
          var subDate = myDate.getDate();
          var subMonth = myDate.getMonth()+1;
          var subYear = myDate.getFullYear();
          
          console.log(subMonth+"/"+subDate+"/"+subYear);
      
      
      break;
    }
    case "years":{
      var myDate = new Date();  
          var dayOfMonth = myDate.getDate();  
          myDate.setDate(dayOfMonth - count*365); 
          var subDate = myDate.getDate();
          var subMonth = myDate.getMonth()+1;
          var subYear = myDate.getFullYear();
          
          console.log(subMonth+"/"+subDate+"/"+subYear);
      break;
    }
    default:{
      console.log("SyntaxError");
    }
  }
  
    }
    
  }
   return{
      calender:calender
    }
  
}
    


if(typeof dateString !== "undefined" && typeof formatString === "undefined")
 {
  
   if(typeof dateString.years === "undefined"){
     
   today = new Date(dateString);
   if(dateString.toString().length === 4)
   today.setYear(dateString);
   }
   
   else{
     today = new Date(dateString.years,dateString.months,dateString.date,dateString.hours,dateString.minutes,dateString.seconds,dateString.milliseconds);
   }
   setVariables(today);
   console.log(today);
 }
  else if(typeof dateString !== "undefined" && typeof formatString !== "undefined")
    {
         extractDate(dateString,formatString);
         today= new Date(extractY,extractM,extractD);
  // console.log(today);
  if (isNaN(today)==true)
{
  console.log("invalid ");
}else{
  setVariables(today);
    console.log(today);

}

    }
else if(typeof dateString === "undefined" && typeof formatString === "undefined"){
  today = new Date();
   setVariables(today);
}

var dmy = function(format){
  var m,d,escapeStart,escapeEnd,escapeString;
if(typeof format === "undefined"){
  
  if(typeof dateString === "undefined" && typeof formatString === "undefined"){
    
        format = today;
    }
   

}
else{
  var check1 = /[ \\[ ]/;
  var check2 = /[ \] ]/;


  if(check1.test(format) && check2.test(format)){
    escapeStart = format.indexOf("[");
    escapeEnd = format.indexOf("]");
    escapeString = format.substring(escapeStart+1,escapeEnd);
  }
  
    //for am and pm
  if(format.search("a")>=0){
        format = format.replace("a",AMPM);

  }
  //for time
  if(format.search("hh")>=0){
    format = format.replace("hh",hour);
  }
  else if(format.search("h")>=0){
    format = format.replace("h",hour);
  }
    if(format.search("mm")>=0){
    format = format.replace("mm",min);
  }
  else if(format.search("m")>=0){
    format = format.replace("m",min);
  }
    if(format.search("ss")>=0){
    format = format.replace("ss",secs);
  }
  else if(format.search("s")>=0){
    format = format.replace("s",secs);
  }
     //for Do
  if(format.search("Do")>=0){
    if(date == 1)
    d="st";
    else if(date == 2)
    d = "nd";
    else if(date == 3)
    d = "rd";
    else
    d = "th";
    format = format.replace("Do",date+d);
  }
  //for date
  if(format.search("DD")>=0){
    if(date<10)
    format = format.replace("DD","0"+date);
    else
        format = format.replace("DD",date);

  }
  else if(format.search("D")>=0){
      format = format.replace("D",date);

  }
  
  if(format.search("MMMM")>=0){
    m = monthFull[month];
    format = format.replace("MMMM",m);
  }
    else if(format.search("MMM")>=0){
    m = monthHalf[month];
        format = format.replace("MMM",m);

  }
  else if(format.search("MM")>=0){
    if((month+1)<10){
      m="0"+(month+1);
    }
    else{
      m=month+1;
    }
        format = format.replace("MM",m);

  }
  else if(format.search("M")>=0){
   
        format = format.replace("M",month+1);

  }
  //for year
    if(format.search("YYYY")>=0){
    
    format = format.replace("YYYY",year);

  }
  else if(format.search("YY")>=0){
    var y=year.toString().substring(2,4);
        format = format.replace("YY",y);

  }
  else if(format.search("Y")>=0){
     format = format.replace("Y",year);


  }

  
   //for day
  if(format.search("dddd")>=0){
    format = format.replace("dddd",dayFull[day]);
  }
  else if(format.search("ddd")>=0){
        format = format.replace("ddd",dayHalf[day]);

  }
    else if(format.search("dd")>=0){
        format = format.replace("dd",dayOneFourth[day]);

  }
      else if(format.search("d")>=0){
        format = format.replace("d",day);

  }
  

  
  if(format==="LT"){

    console.log(hour+":"+min+" "+AMPM);
  }
    if(format==="LTS"){

    console.log(hour+":"+min+":"+secs+" "+AMPM);
  }
      if(format==="L"){
        var t1,t2;
      if(month<10){
          t1="0"+month;
      }
      else{
        t1=month;
      }
      if(date<10){
        t2="0"+date;
      }
      else{
        t2=date;
      }
      console.log(t1+"/"+t2+"/"+year);

  }
      if(format==="LL"){

    console.log(monthFull[month]+" "+date+", "+year);
  }
      if(format==="LLL"){

    console.log(monthFull[month]+" "+date+", "+year+" "+hour+":"+min+" "+AMPM);
  }
      if(format==="LLLL"){

    console.log(dayFull[day]+", "+monthFull[month]+" "+date+", "+year+" "+hour+":"+min+" "+AMPM);
  }
  
  if(format === "l"){
    console.log(month+"/"+date+"/"+year);
  }
  
  if(format === "ll"){
    console.log(monthHalf[month]+" "+date+", "+year);
  }
    if(format === "lll"){
    console.log(monthHalf[month]+" "+date+", "+year+" "+hour+":"+min+" "+AMPM);
  }
   if(format === "llll"){
    console.log(dayHalf[day] + ", " + monthHalf[month] + " " + date + ", " + year + " " + hour + ":" + min + " " + AMPM);
  }
  
  if(check1.test(format) && check2.test(format)){
  escapeStart = format.indexOf("[");
  escapeEnd = format.indexOf("]");
  format = format.substring(0,escapeStart)+escapeString+format.substring(escapeEnd+1,format.toString().length);
}
  
}

console.log(format);

}
var returnYear = function(yearArg){
  if(typeof yearArg === "undefined")
  yearArg = year;
  else{
      today.setYear(yearArg);
      today.setDate(today.getDate()+1);
      setVariables(today);
  }

  console.log(today);
  return{
    format:dmy
   
  }

}
var utc = function(variable1,variable2){
  if(typeof variable1 === "undefined" && typeof variable2 === "undefined"){
    today = new Date();
  }
  else if(typeof variable1 === "number" && typeof variable2 === "undefined"){
    today = new Date(1970,variable1,1);
  }
    else if(variable1.constructor === Array && typeof variable2 === "undefined"){
     
    today = new Date(variable1[0],variable1[1],variable1[2]);
  }
   else if(typeof variable1 === "string" && typeof variable2 === "undefined"){
     
    today = new Date(variable1);
  }
  else if(typeof variable1 === "string" && typeof variable2 === "string"){
     
     extractDate(variable1,variable2);
   today= new Date(extractY,extractM-1,(parseInt(extractD)+1));
  }
   console.log(today);
  setVariables(today);
// return today;
  return{
     
    format:dmy
  }
  
}

var isvalid = function (){
    if (isNaN(today)==true)
{
  return false;
}
}
  return{
    isValid:isvalid,
    utc:utc,
    format:dmy,
    subtract:sub,
    add:add,
    startOf:startof,
    endOf:endof,
    forNow:fornow,
    year:returnYear
    
  }
}

moment().format("2018-02-03","YYYY-MM-DD");
