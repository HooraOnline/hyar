import RN, {React, Alert, AsyncStorage } from 'react-native';
import Api from './api';
import Dimensions from 'Dimensions';
import { dataAdapter } from './dataAdapter';

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.toPersionDate = function (format) {
  var target;
  try {
    target = new Date(this);
  } catch (ex) {
    return "فرمت اشتباه";
  }

  let temp = this.split("T")[0].split("-");
  var date = Util.ginj(Number(temp[0]), Number(temp[1]), Number(temp[2]), true);
  var time = target.getHours() + ":" + target.getMinutes();
  if (format == 'dateTime')
    return date + " ساعت: " + time;
  if (format == 'time')
    return time
  return date;
};

Date.prototype.toPersionDate = function (format) {
  let temp = this.toJSON().split("T")[0].split("-");
  var date = Util.ginj(Number(temp[0]), Number(temp[1]), Number(temp[2]), true);
  var time = this.getHours() + ":" + this.getMinutes();
  if (format == 'dateTime')
    return date + " ساعت: " + time;
  if (format == 'time')
    return time
  return date;
};
Date.prototype.addDay = function (day) {
  let dayAdd = day | 1;
  let newDate = new Date(this.setDate(this.getDate() + dayAdd));
  return newDate;
};
Number.prototype.format = function (c, d, t) {
  var n = this,
  c = isNaN(c = Math.abs(c)) ? 0 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};


class util {
  //date
  t2j(date, f) {
    /*
     * time and date converter
     * by arash tavanaei
     * Email : arash.tavanaei69@gmail.com
     * Website : http://www.zhupin.ir
     * mobile & telegram : +989130246374
     * 
     * 
     * 
     * 
     */





    /* time to jalali */




    var g = t2g(date, false);


    return ginj(g.y, g.m, g.d, f);

  }

  /* gregorian to jalali */
  ginj(year, month, day, f) {

    var $g_days_in_month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var $j_days_in_month = new Array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);

    $gy = year - 1600;
    $gm = month - 1;
    $gd = day - 1;

    $g_day_no = 365 * $gy + div($gy + 3, 4) - div($gy + 99, 100) + div($gy + 399, 400);

    for ($i = 0; $i < $gm; ++$i)
      $g_day_no += $g_days_in_month[$i];
    if ($gm > 1 && (($gy % 4 == 0 && $gy % 100 != 0) || ($gy % 400 == 0)))
      /* leap and after Feb */
      $g_day_no++;
    $g_day_no += $gd;

    $j_day_no = $g_day_no - 79;

    $j_np = div($j_day_no, 12053); /* 12053 = 365*33 + 32/4 */
    $j_day_no = $j_day_no % 12053;

    $jy = 979 + 33 * $j_np + 4 * div($j_day_no, 1461); /* 1461 = 365*4 + 4/4 */

    $j_day_no %= 1461;

    if ($j_day_no >= 366) {
      $jy += div($j_day_no - 1, 365);
      $j_day_no = ($j_day_no - 1) % 365;
    }

    for ($i = 0; $i < 11 && $j_day_no >= $j_days_in_month[$i]; ++$i)
      $j_day_no -= $j_days_in_month[$i];
    $jm = $i + 1;
    $jd = $j_day_no + 1;

    function div(x, y) {
      return Math.floor(x / y);


    }
    if (!f || f == undefined)
      return { y: $jy, m: $jm, d: $jd }
    else
      return $jy + '/' + $jm + '/' + $jd;





  }




  /* jalali to gregorian  */
  jing(year, month, day, f) {
    function div(x, y) {
      return Math.floor(x / y);


    }
    $g_days_in_month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    $j_days_in_month = new Array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);



    $jy = year - 979;
    $jm = month - 1;
    $jd = day - 1;

    $j_day_no = 365 * $jy + div($jy, 33) * 8 + div($jy % 33 + 3, 4);
    for ($i = 0; $i < $jm; ++$i)
      $j_day_no += $j_days_in_month[$i];

    $j_day_no += $jd;

    $g_day_no = $j_day_no + 79;

    $gy = 1600 + 400 * div($g_day_no, 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
    $g_day_no = $g_day_no % 146097;

    $leap = true;
    if ($g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
      $g_day_no--;
      $gy += 100 * div($g_day_no, 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
      $g_day_no = $g_day_no % 36524;

      if ($g_day_no >= 365)
        $g_day_no++;
      else
        $leap = false;
    }

    $gy += 4 * div($g_day_no, 1461); /* 1461 = 365*4 + 4/4 */
    $g_day_no %= 1461;

    if ($g_day_no >= 366) {
      $leap = false;

      $g_day_no--;
      $gy += div($g_day_no, 365);
      $g_day_no = $g_day_no % 365;
    }

    for ($i = 0; $g_day_no >= $g_days_in_month[$i] + ($i == 1 && $leap); $i++)
      $g_day_no -= $g_days_in_month[$i] + ($i == 1 && $leap);
    $gm = $i + 1;
    $gd = $g_day_no + 1;

    if (!f || f == undefined)
      return { y: $gy, m: $gm, d: $gd }
    else
      return $gy + '/' + $gm + '/' + $gd;
  }






  /* time to gregorian  */
  t2g(date, f) {


    date = date * 1000;
    var d = new Date(date);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    if (!f || f == undefined)
      return { y: year, m: month, d: day }
    else
      return year + '/' + month + '/' + day;
  }

  //end jalali date


  //RegEXp
  mobileReg = /^09[0-9]{9}$/i
  digitReg = /^-?\d+\.?\d*$/

  saveInStorage(key, value) {
    try {
      AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }
  clearFromLocalStorage = (key) => {
    return AsyncStorage.removeItem(key)
  }
  clearTokenFromLocalStorage = () => {
    return this.clearFromLocalStorage('userPT209873366')
  }
  saveTokenInStorage(userId, token) {
    Api.token = token;
    let user = `{"id":"${userId}","token":"${Api.token}"}`;
    this.saveInStorage('userPT209873366', user);
  }
  getTokenFromStorage(success, failed) {
    return AsyncStorage.getItem('userPT209873366')
      .then((cUser) => {
        if (!cUser) {
          failed('!token not found');
          return;
        }
        let user = JSON.parse(cUser);
        Api.token = user.token;
        success(user.id, user.token);
      }).catch(e => {
        failed(e);
      });

  }
  loginLocally(success, failed) {
    return this.getTokenFromStorage(function (userId, token) {
             dataAdapter.getUserById(userId).then((user) => {
              if (success) success(user, token);
             });
    }, failed);
  }
  confirm(title, confirmMessage, okfunc, actionButtomArray) {
    if (actionButtomArray)
      Alert.alert(title, confirmMessage, actionButtomArray, { cancelable: false })
    else
      Alert.alert(
        title,
        confirmMessage,
        [
          { text: "تایید", onPress: () => okfunc() },
          { text: 'انصراف', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      )
  }
  chunkArray(myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }
  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
   
  xmlToJson(xml) {
	
    // Create the return object
    var obj = {};
  
    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }
  
    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  };
   getResponse(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () { 
      callback(this.responseText) 
    };
    xhr.open('GET', url, true);
    xhr.send();
  }
  string2React(text){
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text,"text/xml");
    let json=this.xmlToJson(xmlDoc);
    return json;
  }
  getMongoObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  };
  nibsonToReactNative(nibson){
    const list =
    React.createElement(RN.View, {},
      React.createElement(RN.Text, {}, 'My favorite ice cream flavors'),
      React.createElement(RN.View, {},
        [
          React.createElement(RN.Image, { style:{borderRadius: 6, resizeMode: 'cover', height: 115, width: 100, },class: 'white',source:{uri:'http://n.diemacher.at/assets/front/images/team/david-boehm.jpg'} }, null),
          React.createElement(RN.Text, {style:{color:'red'}, class: 'brown' }, entity444.mobile),
          React.createElement(RN.Text, { style:{color:'red'},class: 'white' }, 'Vanilla'),
          React.createElement(RN.Text, {style:{color:'blue'}, class: 'yellow' }, 'Banana')
        ]
      )
    );
  }

}

export const Util = new util();
Util.device={};
Util.device.width=Dimensions.get('window').width;
Util.device.height=Dimensions.get('window').height;




