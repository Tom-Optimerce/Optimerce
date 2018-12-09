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
  })('Session', this, function () {

    'use strict';
  
    var Session = function (options) {
      throw new Error("'new Session()' is deprecated");
    }

    Session.setSessionValueName = function (name) {
        sessionValueName = name;
    }

    Session.setSessionTime = function (time) {
        sessionTime = time;
    }

    Session.sessionStart = function() {
        return start();
    }

    Session.getSessionValue = function() {
        if (!check()) {
            start();
        }
        return sessionStorage.getItem(sessionValueName);
    }

    Session.check = function() {
        return check();
    }

    Session.stop = function() {
        sessionStorage.removeItem(sessionValueName);
    }

    var sessionValueName = 'sessionValueName';

    var sessionTime = 1440000;

    var start = function() {
        sessionStorage.setItem(sessionValueName, Date.now()+sessionTime);
        return sessionStorage.getItem(sessionValueName);
    }

    var check = function() {
        var result = false;
        var sessionValue = sessionStorage.getItem(sessionValueName);
        if (sessionValue && sessionValue >= (Date.now())) {
            result = true;
        }
        return result;
    }

    return Session;
  });
  