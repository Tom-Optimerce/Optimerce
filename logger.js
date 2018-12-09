(function (name, context, definition) {
    'use strict'
    if (typeof window !== 'undefined' && typeof window.define === 'function' && window.define.amd) { 
      window.define(definition) 
    } else if (typeof module !== 'undefined' && module.exports) { 
      module.exports = definition(); 
    } else if (context.exports) { 
      context.exports = definition(); 
    } else { 
      context[name] = definition();
    }
  })('Logger', this, function () {
    'use strict'

    var timeDelay = 1500;

    var  componentKeyList = [
      'userAgent',
      'colorDepth', 
      'hardwareConcurrency',
      'screenResolution',
      'availableScreenResolution',
      'timezone',
      'localStorage',
      'indexedDb',
      'cpuClass',
      'plugins',
      'canvas',
      'webgl',
      'webglVendorAndRenderer',
      'touchSupport',
      'fonts',
      'audio',
      'canvas',
      'webgl',
      'cookie', 
      'sessionId'
    ];

    function getJSessionId(){
      var regular = sessionKey+'=[^;]+';
      var jsId = document.cookie.match(new RegExp(regular));
      if(jsId != null) {
          if (jsId instanceof Array)
              jsId = jsId[0].substring(11);
          else
              jsId = jsId.substring(11);
      }
      return jsId;
    }

    var sessionKey = 'PHPSESSID';

    var heshedValue = [];

    var heshedFlag = false;
  
    var Logger = function (options) {
      throw new Error("'new Logger()' is deprecated");
    }

    Logger.setReturnElement = function(data) {
      if (data && typeof(data) == 'array') {
        componentKeyList = data;
      }
    }

    Logger.setSessionTime = function(time) {
      Session.setSessionTime(time);
    }

    Logger.setSessionKey = function(key) {
      sessionKey = key;
    }

    Logger.setTimeDelay = function(time) {
      timeDelay = time;
    }

    Logger.setHashed = function (flag, options) {
      if (options) {
        heshedValue = options;
      } else {
        heshedValue = [];
      }
      heshedFlag = flag;
    }
    
    Logger.get = function (callback, options) {
      if (!options) {
        options = false;
      }
      if (!Session.check()) {
        Session.sessionStart();
        setTimeout(function () {
          Fingerprint2.getV18(options, function (murmur, component) {
            var newComponent = [];
            component.forEach(function(item, index, arr) {
              if (componentKeyList.indexOf(item.key) != -1) {
                newComponent.push(item);
              }
            });
            if ((componentKeyList.indexOf('cookie') != -1)) {
              newComponent.push({key:'cookie', value: document.cookie});
            }
            if ((componentKeyList.indexOf('sessionId') != -1)) {
              newComponent.push({key:'sessionId', value: getJSessionId()});
            }
            var result;
            if (heshedFlag) {
              if (heshedValue.length != 0) {
                newComponent.forEach(function(item, index, arr) {
                  if (heshedValue.indexOf(item.key) != -1) {
                    if(typeof(item.value) == 'object') {
                      for (var data in item.value) {
                        newComponent[index].value[data] = Fingerprint2.x64hash128(item.value[data]);
                      }
                    } else {
                      newComponent[index].value = Fingerprint2.x64hash128(item.value);
                    }
                  }
                });
                result = newComponent;
              } else {
                result = murmur;
              }
            } else {
              result = newComponent;
            }
            callback(result);
          });
        }, timeDelay);
      }
    }


    var toCsv = function(data) {
      //console.log(data);
      let csvContent = "data:text/csv;charset=utf-8,";
      data.forEach(function(subObject){
        //console.log(typeof(subObject.value));
        if (typeof(subObject.value) == 'object') {
          let objectInStr = '';
          for (var key in subObject.value) {
            objectInStr += subObject.value[key]+'; ';
          }
          subObject.value = objectInStr;
        }
        let str = subObject.key+'$'+subObject.value.toString();
        //let row = rowArray.join(",");
        csvContent += str + "\r\n";
      }); 
      
      var a         = document.createElement('a');
      a.href        = csvContent;
      a.target      = '_blank';
      a.download    = 'myFile.csv';
      
      document.body.appendChild(a);
      a.click();
    }

    return Logger;
  });
  