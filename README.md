# Fingerprintjs2 integration system


## Installation

At the beginning, you need to connect [fingerprint2] (https://github.com/Valve/fingerprintjs2), then session.js from the archive and at the end of the logger.js from the archive.

## Logger

### Description

The library integrates fingerprint2 and session.js. And gives an interface to work with fingerprint2.

### Methods

#### setSessionTime

input parameters:

time - the lifetime of the session in ms.

description:

The method sets the lifetime of the session in ms. By default, the lifetime of a session is 1440000 ms. To work with sessions, use [sessionStorage] (https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage). Opening a page in a new tab or window will cause a new session to be initiated with the value of the top-level browsing context, which differs from how session cookies work.
Default value is 1500 ms.
 ```js 
Logger.setTimeDelay(1800000); // установка жизни сессии 30 мин
```

#### setSessionKey

input parameters:

key - a string; a string stores the key of a session variable for which it is in cookies.

description:

The method sets the key value of the session variable. According to this key, the session variable will be extracted from the cookie. The default value is PHPSESSID
```js
Logger.setTimeDelay('JSESSIONID'); // установка ключа сессионой переменной JSESSIONID
```

#### setTimeDelay

input parameters:

time - is the time in seconds.

description:

The method sets the delay time. This is the time that fingerprint2 will run.
```js
    Logger.setTimeDelay(10000); // установка задержки на 10c
```


#### setReturnElement

Input parameters:

data - is an array of strings.

description:

The method sets the fullness of the resulting array returned by the get method. The input array must contain the keys of those values that need to be obtained in the resulting array of the get method.
For information on keys, see the documentation on fingerprint2. By default, the result of the get method returns values by the following keys.

```
[
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
    'webglVendorAndRenderer',
    'touchSupport',
    'fonts',
    'audio',
    'canvas',
    'webgl',
    'cookie', 
    'sessionId'
];
 ```

```js 
Logger.setReturnElement(['userAgent','colorDepth']); 
```



#### setHashed

Input parameters:

flag - a flag that is responsible for performing hashing or not.

options - is an optional parameter. Array of strings The array includes the keys of those output parameters that will be hashed.

description:

The method sets hashing.
Hashing is disabled when flag = false.
```js
Logger.setHashed (false);
```
If flag = true and parameter options is missing. The result of the get function will be a hash that includes the parameters of fingerprint2.
```js
Logger.setHashed (true);
```
If flag = true and options are passed an array of strings, then the result will be hashed values ​​for those keys that were committed in the options array.
```js
Logger.setHashed (true, ['userAgent', 'canvas']);
```
By default, hashing is disabled.

#### get

input parameters

callback - function to which the resulting array is passed.

options - is  an optional parameter. An object that, if passed later, is passed to the get fingerprint2 method. The object format and the rules of somotri formation in the fingerprint2 documentation.

description:

The method returns an array or hash with the results of fingerprint2. Hashing results is performed according to the rules set by the method setHashed.
The array content is determined by the setReturnElement method.

```js 
Logger.get(function(data) { console.log(data); });
```

```js 
Logger.get(function(data) {
    console.log(data); 
}, {
    userDefinedFonts: ["Nimbus Mono", "Junicode", "Presto"]
});
```

