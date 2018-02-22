//! moment.js
//! version : 2.20.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function() {
  'use strict';

  var Locale = "en";
  var today;
  var date;
  var month;
  var year;
  var hour;
  var min;
  var secs;
  var day;
  var AMPM;
  var regexExp = [];

  var hookCallback;
  var monthFull = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var monthHalf = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var dayFull = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var dayHalf = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var dayOneFourth = ["", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  var yearIndex, monthIndex, dateIndex, yCount, mCount, dCount, extractY, extractM, extractD, presentY, presentM, presentD;

  function hooks() {
    return hookCallback.apply(null, arguments);
  }

  // This is done to register the method called with moment()
  // without creating circular dependencies.
  function setHookCallback(callback) {
    hookCallback = callback;
  }

  var updateInProgress = false;

  function Create(dateString, formatString) {

    Regex();
    if (typeof formatString === "undefined" && typeof dateString === "undefined") {
      today = new Date();
      setVariables(today);
      setFormatTokens();
      var res = new Moment();
      return res;
    } else if (typeof formatString === "string" && typeof dateString === "string") {
      var res = new Moment(dateString, formatString);
      return res;
    }

  }

  var setVariables = function(today) {
    date = today.getDate();
    month = today.getMonth() + 1;
    year = today.getFullYear();
    hour = today.getHours();
    min = today.getMinutes();
    secs = today.getSeconds();
    day = today.getDay();
    AMPM = hour >= 12 ? 'PM' : 'AM';
  }

  function Moment(dateString, formatString) {
    if (typeof formatString === "undefined" && typeof dateString === "undefined") {
      this.date = today;
    } else if (typeof formatString === "string" && typeof dateString === "string") {
      var res = extractDate(dateString, formatString);
      res = res.split(",");
      today = new Date(res[0], res[1], res[2]);
      setVariables(today);
      setFormatTokens();
      this.date = today;
    }

  }
  var formatToken = [];

  function addFormatToken(token) {

    formatToken[token] = getFormatTokenValue(token);
  }

  function extractDate(dateString, formatString) {

    if (formatString.search("YYYY") >= 0) {
      yearIndex = formatString.indexOf("YYYY");
      yCount = 4;
    } else if (formatString.search("YYY") >= 0) {
      yearIndex = formatString.indexOf("YYY");
      yCount = 3;
    } else if (formatString.search("YY") >= 0) {
      yearIndex = formatString.indexOf("YY");
      yCount = 2;
    } else if (formatString.search("Y") >= 0) {
      yearIndex = formatString.indexOf("Y");
      yCount = 1;
    }
    if (formatString.search("MM") >= 0) {
      monthIndex = formatString.indexOf("MM");
      mCount = 2;
    } else if (formatString.search("M") >= 0) {
      monthIndex = formatString.indexOf("M");
      mCount = 2;
    }
    if (formatString.search("DD") >= 0) {
      dateIndex = formatString.indexOf("DD");
      dCount = 2;
    } else if (formatString.search("D") >= 0) {
      dateIndex = formatString.indexOf("D");
      dCount = 2;
    }
    extractY = dateString.substring(yearIndex, yearIndex + yCount);
    extractM = dateString.substring(monthIndex, monthIndex + mCount);
    extractD = dateString.substring(dateIndex, dateIndex + dCount);


    return extractY.toString() + "," + extractM.toString() + "," + extractD.toString();
  }

  function setFormatTokens() {

    addFormatToken("Y");
    addFormatToken("YY");
    addFormatToken("YYY");
    addFormatToken("YYYY");
    addFormatToken("MMMM");
    addFormatToken("MMM");
    addFormatToken("MM");
    addFormatToken("M");
    addFormatToken("D");
    addFormatToken("DD");
    addFormatToken("Do");
    addFormatToken("h");
    addFormatToken("hh");
    addFormatToken("m");
    addFormatToken("mm");
    addFormatToken("ss");
    addFormatToken("s");
    addFormatToken("a");
    addFormatToken("d");
    addFormatToken("dd");
    addFormatToken("ddd");
    addFormatToken("dddd");

  }

  function getFormatTokenValue(token) {

    if (token === "Y") {
      return year;
    }
    if (token === "YY") {
      var y = year.toString().substring(2, 4);
      return y;
    }
    if (token === "YYY") {
      return year.toString().substring(2, 4);

    }
    if (token === "YYYY") {
      return year;

    }
    if (token === "MMMM") {
      return monthFull[month];

    }
    if (token === "MMM") {
      return monthHalf[month];

    }
    if (token === "M") {
      return month;


    }
    if (token === "MM") {
      if (month < 10) {
        return "0" + month;
      } else {
        return month;
      }

    }
    if (token === "D") {
      return date;

    }
    if (token === "DD") {
      if (date < 10) {
        return "0" + date;
      } else {
        return date;
      }

    }
    if (token === "hh") {
      var h;
      h = hour;

      if (Locale === "en") {
        if (AMPM === "AM") {
          h = "0" + h;
        } else {
          if (h > 12) {
            h = h - 12;
            if (h < 10) {
              h = "0" + h;
            }
          }
        }

      } else if (Locale === "en-gb") {
        if (AMPM === "AM") {
          h = "0" + h;
        }

      }

      return h;
      // if(hour < 10){
      //   return "0"+hour;
      // }
      // else{
      //   return hour;
      // }
    }
    if (token === "h") {
      var h;
      h = hour;
      if (Locale === "en") {
        if (h >= 13) {
          h = h - 12;
        }
      } else {
        if (h < 13 && AMPM === "PM") {
          h = h + 12;
        }
      }
      return h;

    }
    if (token === "m") {
      if (min < 10) {
        return "0" + min;
      } else {
        return min;
      }

    }
    if (token === "mm") {
      return min;

    }
    if (token === "ss") {
      return secs;

    }
    if (token === "s") {
      if (secs < 10) {
        return "0" + secs;
      } else {
        return secs
      }

    }
    if (token === "a") {
      return AMPM;

    }
    if (token === "Do") {
      var d;
      if (date == 1)
        d = "st";
      else if (date == 2)
        d = "nd";
      else if (date == 3)
        d = "rd";
      else
        d = "th";
      return date + d;

    }
    if (token === "d") {
      return dayFull[day];

    }
    if (token === "dd") {
      return dayOneFourth[day];

    }
    if (token === "ddd") {
      return dayHalf[day];
    }
    if (token === "dddd") {
      return dayFull[day];
    }


  }

  var MultiLocaleSupportFormats = [];


  function checkLocale(dateFormat) {
    if ((Locale === "en" || typeof Locale === "undefined")) {
      Locale = "en";
      MultiLocaleSupportFormats["LT"] = "h:mm a";
      MultiLocaleSupportFormats["LTS"] = "h:mm:ss a";
      MultiLocaleSupportFormats["L"] = "MM/DD/YYYY";
      MultiLocaleSupportFormats["l"] = "M/D/YYYY";
      MultiLocaleSupportFormats["LL"] = "MMMM DD, YYYY";
      MultiLocaleSupportFormats["ll"] = "MMM DD, YYYY";
      MultiLocaleSupportFormats["LLL"] = "MMMM DD, YYYY h:mm a";
      MultiLocaleSupportFormats["lll"] = "MMM DD, YYYY h:mm a";
      MultiLocaleSupportFormats["LLLL"] = "dddd, MMMM DD, YYYY h:mm a";
      MultiLocaleSupportFormats["llll"] = "ddd, MMM DD, YYYY h:mm a";
    } else if (Locale === "en-gb") {
      MultiLocaleSupportFormats["LT"] = "h:mm";
      MultiLocaleSupportFormats["LTS"] = "h:mm:ss";
      MultiLocaleSupportFormats["L"] = "DD/MM/YYYY";
      MultiLocaleSupportFormats["l"] = "D/M/YYYY";
      MultiLocaleSupportFormats["LL"] = "DD MMMM YYYY";
      MultiLocaleSupportFormats["ll"] = "DD MMM YYYY";
      MultiLocaleSupportFormats["LLL"] = "DD MMMM YYYY h:mm";
      MultiLocaleSupportFormats["lll"] = "DD MMM YYYY h:mm";
      MultiLocaleSupportFormats["LLLL"] = "dddd, DD MMMM YYYY h:mm";
      MultiLocaleSupportFormats["llll"] = "ddd, DD MMM YYYY h:mm";

    }

    if (typeof MultiLocaleSupportFormats[dateFormat] === "undefined") {
      var dateFormatSplit = dateFormat.split(/[\s:\/\,]/);
      for (var i = 0; i < dateFormatSplit.length; i++) {

        dateFormat = dateFormat.replace(regexExp[dateFormatSplit[i]], formatToken[dateFormatSplit[i]]);

      }
      return dateFormat;

    } else {

      var output = MultiLocaleSupportFormats[dateFormat];
      var dateFormatSplit = MultiLocaleSupportFormats[dateFormat].split(/[\s:\/\,]/);

      for (var i = 0; i < dateFormatSplit.length; i++) {
        output = output.replace(regexExp[dateFormatSplit[i]], formatToken[dateFormatSplit[i]]);
      }
      return output;
    }



  }


  function Regex() {

    regexExp["DD"] = /\bDD\b/;
    regexExp["MM"] = /\bMM\b/;
    regexExp["D"] = /\bD\b/;
    regexExp["M"] = /\bM\b/;
    regexExp["YYYY"] = /YYYY/;
    regexExp["YY"] = /YY/;
    regexExp["MMMM"] = /MMMM/;
    regexExp["MMM"] = /MMM/;
    regexExp["dddd"] = /dddd/;
    regexExp["ddd"] = /ddd/;
    regexExp["h"] = /\bh\b/;
    regexExp["hh"] = /\bhh\b/;
    regexExp["mm"] = /\bmm\b/;
    regexExp["ss"] = /\bss\b/;
    regexExp["a"] = /\ba\b/;
    regexExp["Do"] = /\bDo\b/;
    regexExp["ddd"] = /\bddd\b/;
    regexExp["dddd"] = /\bdddd\b/;

  }

  function format(dateFormat) {

    if ((Locale === "en" || typeof Locale === "undefined") && (typeof dateFormat === "undefined")) {

      Locale = "en";
      return today;

    } else if (typeof dateFormat != "undefined") {

      var res = checkLocale(dateFormat);
      return res;
    }

  }

  function localeData(locale) {
    if (typeof locale === "undefined") {

      return Locale;
    } else {
      Locale = locale;
      if (locale === "en-gb") {
        if ((formatToken["h"] < 13) && (AMPM === "PM")) {
          formatToken["h"] = formatToken["hh"] = formatToken["h"] + 12;
        }

      } else if (locale === "en") {
        if (formatToken["h"] >= 13) {
          formatToken["h"] = formatToken["hh"] = formatToken["h"] - 12;
        }
      }

    }
  }

  function fromNow() {
    var myDate = new Date();

    if (yCount === 1 || yCount === 4 || yCount === 3) {
      presentY = myDate.getFullYear();
    } else {
      presentY = myDate.getFullYear().toString().substring(2, 4);
    }
    presentM = myDate.getMonth() + 1;
    presentD = myDate.getDate();

    if (parseInt(presentY) === parseInt(extractY)) {
      if (parseInt(presentM) === parseInt(extractM)) {
        if (parseInt(presentD) === parseInt(extractD)) {
          return "12 hours ago";
        } else {
          if (presentD > extractD) {
            return (presentD - extractD) + " day/days ago";
          } else {
            return "in " + (extractD - presentD) + " day/days";
          }
        }
      } else {
        if (presentM > extractM) {
          return (presentM - extractM) + " month/months ago";
        } else {
          return "in " + (extractM - presentM) + " month/months";
        }
      }
    } else {
      if (presentY > extractY) {
        return (presentY - extractY) + " year/years ago";
      } else if (presentY < extractY) {
        return "in " + (extractY - presentY) + " year/years";
      } else {
        selector = selector.split(",");
        if (selector[1] === "start") {
          selector = selector[0];
          if (typeof selector === "undefined") {
            return "a few seconds ago";
          } else {

            switch (selector) {

              case "minute":
                {
                  return secs + " second/s ago";
                  break;
                }
              case "hour":
                {
                  return min + " minute/s ago";
                  break;
                }
              case "day":
                {
                  return hour + " hour/s ago";
                  break;
                }
              case "month":
                {
                  return date + " day/s ago";
                  break;
                }
              case "year":
                {
                  return month + " month/months ago";
                  break;
                }
              default:
                {
                  return "SyntaxError";
                }
            }
          }
        } else if (selector[1] === "end") {
          selector = selector[0];
          if (typeof selector === "undefined") {
            return "in few seconds";
          } else {

            switch (selector) {

              case "minute":
                {
                  return "in " + (60 - secs) + " second/s";
                  break;
                }
              case "hour":
                {
                  return "in " + (60 - min) + " minute/s";
                  break;
                }
              case "day":
                {
                  return "in " + (24 - hour) + " hour/s";
                  break;
                }
              case "month":
                {
                  return "in " + (30 - date) + " day/s";
                  break;
                }
              case "year":
                {
                  return "in " + (12 - month) + " month/months";
                  break;
                }
              default:
                {
                  return "SyntaxError";
                }
            }
          }

        }
      }
    }

  }
  var selector;

  function startOf(selectorParam) {

    selector = selectorParam + ",start";
    return {
      fromNow: fromNow
    }

  }

  function endOf(selectorParam) {

    selector = selectorParam + ",end";
    return {
      fromNow: fromNow
    }

  }
  var addSub;

  function configLocaleHour() {
    if (Locale === "en") {
      if (hour >= 13 && AMPM === "PM") {
        hour = hour - 12;
      }
    }
  }

  function calendar() {

    configLocaleHour();

    if (typeof selector != "undefined") {
      selector = selector.split(",");
      var count = parseInt(selector[1]);
      var condition = selector[0];
      selector = selector[2];


      if (condition === "subtract") {
        switch (selector) {

          case "days":
            {

              if (count > 7) {


                var myDate = new Date();
                var dayOfMonth = myDate.getDate();
                myDate.setDate(dayOfMonth - count);
                var subDate = myDate.getDate();
                var subMonth = myDate.getMonth() + 1;
                var subYear = myDate.getFullYear();

                return subMonth + "/" + subDate + "/" + subYear;



              } else {
                if (Locale === "en-gb") {
                  return "Last " + dayFull[(7) - ((7 - day) + count)] + " at " + hour + ":" + min;
                } else if (Locale === "en") {
                  return "Last " + dayFull[(7) - ((7 - day) + count)] + " at " + hour + ":" + min + " " + AMPM;
                }


              }
              break;
            }
          case "months":
            {

              var myDate = new Date();
              var dayOfMonth = myDate.getDate();
              myDate.setDate(dayOfMonth - count * 30);
              var subDate = myDate.getDate();
              var subMonth = myDate.getMonth() + 1;
              var subYear = myDate.getFullYear();

              return subMonth + "/" + subDate + "/" + subYear;


              break;
            }
          case "years":
            {
              var myDate = new Date();
              var dayOfMonth = myDate.getDate();
              myDate.setDate(dayOfMonth - count * 365);
              var subDate = myDate.getDate();
              var subMonth = myDate.getMonth() + 1;
              var subYear = myDate.getFullYear();

              return subMonth + "/" + subDate + "/" + subYear;
              break;
            }
          default:
            {
              return "SyntaxError";
            }
        }

      } else if (condition === "add") {
        switch (selector) {

          case "days":
            {

              if (count > 7) {


                var myDate = new Date();
                var dayOfMonth = myDate.getDate();
                myDate.setDate(dayOfMonth + count);
                var subDate = myDate.getDate();
                var subMonth = myDate.getMonth() + 1;
                var subYear = myDate.getFullYear();

                return subMonth + "/" + subDate + "/" + subYear;



              } else {
                if (Locale === "en-gb") {
                  return dayFull[day + (count)] + " at " + hour + ":" + min;

                } else if (Locale === "en") {
                  return dayFull[day + (count)] + " at " + hour + ":" + min + " " + AMPM;

                }

              }
              break;
            }
          case "months":
            {

              var myDate = new Date();
              var dayOfMonth = myDate.getDate();
              myDate.setDate(dayOfMonth + count * 30);
              var subDate = myDate.getDate();
              var subMonth = myDate.getMonth() + 1;
              var subYear = myDate.getFullYear();

              return subMonth + "/" + subDate + "/" + subYear;


              break;
            }
          case "years":
            {
              var myDate = new Date();
              var dayOfMonth = myDate.getDate();
              myDate.setDate(dayOfMonth + count * 365);
              var subDate = myDate.getDate();
              var subMonth = myDate.getMonth() + 1;
              var subYear = myDate.getFullYear();

              return subMonth + "/" + subDate + "/" + subYear;
              break;
            }
          default:
            {
              return "SyntaxError";
            }
        }
      }

    } else {
      return "Today at " + hour + ":" + min + " " + AMPM;
    }

  }

  function add(count, period) {
    if (typeof count != "undefined" && typeof period != "undefined") {
      selector = "add," + count + "," + period;
    }

    return {
      calendar: calendar
    }
  }

  function subtract(count, period) {

    if (typeof count != "undefined" && typeof period != "undefined") {
      selector = "subtract," + count + "," + period;
    }
    return {
      calendar: calendar
    }
  }

  var proto = Moment.prototype;
  proto.format = format;
  proto.localeData = localeData;
  proto.fromNow = fromNow;
  proto.startOf = startOf;
  proto.endOf = endOf;
  proto.calendar = calendar;
  proto.add = add;
  proto.subtract = subtract;


  hooks.prototype = proto;

  setHookCallback(Create);

  return hooks;

})));
moment().localeData("en-gb")
moment().format("LTS") // Tomorrow at 7:40 PM
