(function (exports) {
'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var webfontloader = createCommonjsModule(function (module) {
/* Web Font Loader v1.6.26 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.m=b||a;this.c=this.m.document;}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild);}function v(a){a.parentNode&&a.parentNode.removeChild(a);}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e]);}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e]);}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"");}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function z(a){if("string"===typeof a.f)return a.f;var b=a.m.location.protocol;"about:"==b&&(b=a.a.location.protocol);return"https:"==b?"https:":"http:"}function ea(a){return a.m.location.hostname||a.a.location.hostname}
function A(a,b,c){function d(){k&&e&&f&&(k(g),k=null);}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,k=c||null;da?(b.onload=function(){e=!0;d();},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d();}):setTimeout(function(){e=!0;d();},0);u(a,"head",b);}
function B(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f));};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")));},d||5E3);return f}return null}function C(){this.a=0;this.c=null;}function D(a){a.a++;return function(){a.a--;E(a);}}function F(a,b){a.c=b;E(a);}function E(a){0==a.a&&a.c&&(a.c(),a.c=null);}function G(a){this.a=a||"-";}G.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function H(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10));}function fa(a){return I(a)+" "+(a.f+"00")+" 300px "+J(a.c)}function J(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d);}return b.join(",")}function K(a){return a.a+a.f}function I(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b}function ha(a,b){this.c=a;this.f=a.m.document.documentElement;this.h=b;this.a=new G("-");this.j=!1!==b.events;this.g=!1!==b.classes;}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);L(a,"loading");}function M(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d);}L(a,"inactive");}function L(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,K(c));else a.h[b]();}function ja(){this.c={};}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c));}return d}function N(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f);}function O(a){u(a.c,"body",a.a);}function P(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+J(a.c)+";"+("font-style:"+I(a)+";font-weight:"+(a.f+"00")+";")}function Q(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0;}Q.prototype.start=function(){var a=this.c.m.document,b=this,c=q(),d=new Promise(function(d,e){function k(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(k,25);},function(){e();});}k();}),e=new Promise(function(a,d){setTimeout(d,b.f);});Promise.race([e,d]).then(function(){b.g(b.a);},function(){b.j(b.a);});};function R(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.o=this.j=this.h=this.g=null;this.g=new N(this.c,this.s);this.h=new N(this.c,this.s);this.j=new N(this.c,this.s);this.o=new N(this.c,this.s);a=new H(this.a.c+",serif",K(this.a));a=P(a);this.g.a.style.cssText=a;a=new H(this.a.c+",sans-serif",K(this.a));a=P(a);this.h.a.style.cssText=a;a=new H("serif",K(this.a));a=P(a);this.j.a.style.cssText=a;a=new H("sans-serif",K(this.a));a=
P(a);this.o.a.style.cssText=a;O(this.g);O(this.h);O(this.j);O(this.o);}var S={D:"serif",C:"sans-serif"},T=null;function U(){if(null===T){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);T=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10));}return T}R.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.o.a.offsetWidth;this.A=q();la(this);};
function ma(a,b,c){for(var d in S)if(S.hasOwnProperty(d)&&b===a.f[S[d]]&&c===a.f[S[d]])return!0;return!1}function la(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=U()&&ma(a,b,c));d?q()-a.A>=a.w?U()&&ma(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):na(a):V(a,a.v);}function na(a){setTimeout(p(function(){la(this);},a),50);}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.o.a);b(this.a);},a),0);}function W(a,b,c){this.c=a;this.a=b;this.f=0;this.o=this.j=!1;this.s=c;}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,K(a).toString(),"active")],[b.a.c("wf",a.c,K(a).toString(),"loading"),b.a.c("wf",a.c,K(a).toString(),"inactive")]);L(b,"fontactive",a);this.o=!0;oa(this);};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,K(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,K(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,K(a).toString(),"inactive"));w(b.f,d,e);}L(b,"fontinactive",a);oa(this);};function oa(a){0==--a.f&&a.j&&(a.o?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),L(a,"active")):M(a.a));}function pa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0;}pa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;qa(this,new ha(this.c,a),a);};
function ra(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,k=d||null||{};if(0===c.length&&f)M(b.a);else{b.f+=c.length;f&&(b.j=f);var h,m=[];for(h=0;h<c.length;h++){var l=c[h],n=k[l.c],r=b.a,x=l;r.g&&w(r.f,[r.a.c("wf",x.c,K(x).toString(),"loading")]);L(r,"fontloading",x);r=null;null===X&&(X=window.FontFace?(x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent))?42<parseInt(x[1],10):!0:!1);X?r=new Q(p(b.g,b),p(b.h,b),b.c,l,b.s,n):r=new R(p(b.g,b),p(b.h,b),b.c,l,b.s,a,
n);m.push(r);}for(h=0;h<m.length;h++)m[h].start();}},0);}function qa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){ra(a,f,b,d,c);});}function sa(a,b){this.c=a;this.a=b;}function ta(a,b,c){var d=z(a.c);a=(a.a.api||"fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/,"");return d+"//"+a+"/"+b+".js"+(c?"?v="+c:"")}
sa.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var m=0;m<c.length;m++){var l=c[m].fontfamily;void 0!=c[m].fontStyle&&void 0!=c[m].fontWeight?(h=c[m].fontStyle+c[m].fontWeight,e.push(new H(l,h))):e.push(new H(l));}a(e);}else setTimeout(function(){b();},50);}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.m;B(this.c,ta(c,d,e),function(e){e?a([]):(f["__MonotypeConfiguration__"+d]=function(){return c.a},b());}).id="__MonotypeAPIScript__"+
d;}else a([]);};function ua(a,b){this.c=a;this.a=b;}ua.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new C;b=0;for(c=d.length;b<c;b++)A(this.c,d[b],D(g));var k=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),m=0;m<h.length;m+=1)k.push(new H(d[0],h[m]));else k.push(new H(d[0]));F(g,function(){a(k,f);});};function va(a,b,c){a?this.c=a:this.c=b+wa;this.a=[];this.f=[];this.g=c||"";}var wa="//fonts.googleapis.com/css";function xa(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f));}}
function ya(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b}function za(a){this.f=a;this.a=[];this.c={};}
var Aa={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Ba={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ca={i:"i",italic:"i",n:"n",normal:"n"},
Da=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Ea(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var k=d[1];g=[];if(k)for(var k=k.split(","),h=k.length,m=0;m<h;m++){var l;l=k[m];if(l.match(/^[\w-]+$/)){var n=Da.exec(l.toLowerCase());if(null==n)l="";else{l=n[2];l=null==l||""==l?"n":Ca[l];n=n[1];if(null==n||""==n)n="4";else var r=Ba[n],n=r?r:isNaN(n)?"4":n.substr(0,1);l=[l,n].join("");}}else l="";l&&g.push(l);}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=Aa[d[0]])&&(a.c[e]=d));}a.c[e]||(d=Aa[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new H(e,f[d]));}}function Fa(a,b){this.c=a;this.a=b;}var Ga={Arimo:!0,Cousine:!0,Tinos:!0};Fa.prototype.load=function(a){var b=new C,c=this.c,d=new va(this.a.api,z(c),this.a.text),e=this.a.families;xa(d,e);var f=new za(e);Ea(f);A(c,ya(d),D(b));F(b,function(){a(f.a,f.c,Ga);});};function Ha(a,b){this.c=a;this.a=b;}Ha.prototype.load=function(a){var b=this.a.id,c=this.c.m;b?B(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],k=b[f+1],h=0;h<k.length;h++)e.push(new H(g,k[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0});}catch(m){}a(e);}},2E3):a([]);};function Ia(a,b){this.c=a;this.f=b;this.a=[];}Ia.prototype.load=function(a){var b=this.f.id,c=this.c.m,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,k=c.fonts.length;g<k;++g){var h=c.fonts[g];d.a.push(new H(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)));}a(d.a);},B(this.c,z(this.c)+(this.f.api||"//f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([]);})):a([]);};var Y=new pa(window);Y.a.c.custom=function(a,b){return new ua(b,a)};Y.a.c.fontdeck=function(a,b){return new Ia(b,a)};Y.a.c.monotype=function(a,b){return new sa(b,a)};Y.a.c.typekit=function(a,b){return new Ha(b,a)};Y.a.c.google=function(a,b){return new Fa(b,a)};var Z={load:p(Y.load,Y)};"function"===typeof define&&define.amd?define(function(){return Z}):"undefined"!==typeof module&&module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function init() {
  [].concat(toConsumableArray(document.querySelectorAll('.datepicker'))).forEach(function (el) {
    var $el = $(el);
    var form = $el.parents('form')[0];
    var picker = $el.pickadate({
      select: new Date(),
      format: 'mmmm d, yyyy',
      onSet: function onSet() {
        // better than nothing
        form.dispatchEvent(new Event('input'));
      }
    }).pickadate('picker');

    picker.set('select', new Date());
  });
}

function getDate(el) {
  return $(el).data('pickadate').get('select').obj;
}

var firebase = window.firebase;
var config = Object.freeze({
  apiKey: 'AIzaSyB_NVhYdoJVw1xAhQvX7opeXo6OIgKJNQs',
  authDomain: 'sparkplug-cf508.firebaseapp.com',
  databaseURL: 'https://sparkplug-cf508.firebaseio.com',
  storageBucket: 'sparkplug-cf508.appspot.com',
  messagingSenderId: '880163842790'
});

function toggleLogin() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    Materialze.toast('Unfortunately, iOS sucks. It is therefore very unlikely\n    that the login will actually work. If it does work on your device, it is\n    considered a bug, so please report it.');
  }

  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      hd: 'pixelclubs.org'
    });
    firebase.auth().signInWithRedirect(provider);
  } else {
    firebase.auth().signOut();
  }
}

function getUser() {
  return firebase.auth().currentUser;
}

function init$2() {
  var accountBtn = document.querySelector('#account');
  var initing = true;

  firebase.initializeApp(config);

  accountBtn.addEventListener('click', toggleLogin);

  firebase.auth().getRedirectResult().then(function () {
    accountBtn.classList.remove('hidden');
  }).catch(function (err) {
    window.dispatchEvent(new CustomEvent('log-in-failed', {
      detail: {
        message: err.message,
        err: err
      }
    }));
  });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      if (!user.email.endsWith('@pixelclubs.org')) {
        user = null;
        firebase.auth().signOut();
        accountBtn.textContent = 'Sign in';
        window.dispatchEvent(new CustomEvent('log-in-failed', {
          detail: {
            message: 'Please sign in with a pixelclubs.org account'
          }
        }));
      } else {
        accountBtn.textContent = 'Sign out';
        window.dispatchEvent(new CustomEvent('logged-in'));
      }
    } else if (!initing) {
      accountBtn.textContent = 'Sign in';
      window.dispatchEvent(new CustomEvent('logged-out'));
    }

    initing = false;
  });
}

var root = 'https://api.github.com/repos/PIxELclubs/static-assets/contents/';

function getLogin() {
  if (!getUser()) {
    return Promise.reject(new Error('You need to sign in first before you can upload'));
  }

  return firebase.database().ref('/tokens/github').once('value').then(function (r) {
    return r.val();
  });
}

function blobToBase64(blob) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      var result = reader.result;

      resolve(result.substr(result.indexOf(',') + 1));
    });
    reader.addEventListener('error', function () {
      reject(reader.error);
    });
    reader.readAsDataURL(blob);
  });
}

var pad = function pad(num) {
  return (num < 10 ? '0' : '') + num;
};
function dateToYYYYMMDD(date) {
  return date.getFullYear() + '-' + pad(date.getMonth()) + '-' + pad(date.getDate());
}

function upload(blob, date, shouldConfirm) {
  return Promise.all([getLogin(), blobToBase64(blob)]).then(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2);

    var _ref2$ = _ref2[0];
    var user = _ref2$.user;
    var token = _ref2$.token;
    var b64 = _ref2[1];

    var dateStr = dateToYYYYMMDD(date);
    var auth = btoa(user + ':' + token);
    var path = 'sparkplug/' + dateStr + '-banner.png';

    if (shouldConfirm && !confirm('Are you sure you want to upload the image now?')) {
      return;
    }

    return fetch('' + root + path, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        path: path,
        message: 'Add banner for ' + dateStr + ' meeting',
        content: b64
      })
    });
  }).then(function (res) {
    if (!res.ok) {
      var _ret = function () {
        if (res.status === 422) {
          throw new Error('Target file already exists on the server');
        }

        var errMsg = res.statusText;
        return {
          v: res.json().then(function (_ref3) {
            var message = _ref3.message;

            if (message) {
              errMsg += '; ' + message;
            }
          }, function (err) {
            // ignored
          }).then(function () {
            throw new Error(errMsg);
          })
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  });
}

var logo = document.querySelector('#logo');
var form = document.querySelector('#values');
var date = document.querySelector('#date');
var canvas = document.querySelector('#preview');
var ctx = canvas.getContext('2d');

function svgToImage(svg) {
  var DOMURL = window.URL || window.webkitURL || window;

  return new Promise(function (resolve) {
    var img = new Image();
    var blob = new Blob([svg], { type: 'image/svg+xml' });
    var url = DOMURL.createObjectURL(blob);
    img.onload = function () {
      resolve(img);
      DOMURL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

function generate() {
  var values = [].concat(toConsumableArray(form.querySelectorAll('input'))).map(function (i) {
    return i.value;
  });

  var _values = slicedToArray(values, 6);

  var name = _values[0];
  var dateStr = _values[1];
  var headingColor = _values[2];
  var backgroundColor = _values[3];
  var stop1 = _values[4];
  var stop2 = _values[5];


  ctx.textBaseline = 'top';

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, 800, 200);

  var coloredLogo = logo.innerHTML.replace(/\${COLOR}/g, headingColor);
  var svgPromise = svgToImage(coloredLogo).then(function (logoImg) {
    ctx.imageSmoothingQuality = 'high';
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(logoImg, 55, 55, 180, 69.6);
  });

  var gradient = ctx.createLinearGradient(0, 0, 800, 0);
  gradient.addColorStop(0, stop1);
  gradient.addColorStop(1, stop2);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 170, 800, 30);

  ctx.font = '700 20pt Lato';
  ctx.fillStyle = stop2;
  ctx.fillText(dateStr, 400, 50);

  ctx.font = '700 30pt Lato';
  ctx.fillStyle = headingColor;
  ctx.fillText(name, 400, 80);

  return svgPromise;
}

function canvasToBlob() {
  return new Promise(function (resolve) {
    canvas.toBlob(resolve, 'image/png');
  });
}

function init$1() {
  form.addEventListener('input', generate);
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    generate().then(function () {
      return canvasToBlob();
    }).then(function (blob) {
      return upload(blob, getDate(date), true);
    }).then(function () {
      window.dispatchEvent(new CustomEvent('upload-success'));
    }).catch(function (err) {
      window.dispatchEvent(new CustomEvent('upload-error', {
        detail: {
          message: err.message,
          err: err
        }
      }));
    });
  });

  window.addEventListener('fontsloaded', generate);
}

window.addEventListener('logged-in', function () {
  console.log('logged-in');
  Materialize.toast('Logged in as ' + getUser().displayName, 3000);
});

window.addEventListener('logged-out', function () {
  console.log('logged-out');
  Materialize.toast('Logged out', 3000);
});

window.addEventListener('log-in-failed', function (_ref) {
  var _ref$detail = _ref.detail;
  var message = _ref$detail.message;
  var err = _ref$detail.err;

  Materialize.toast('Login failed: ' + message, 3000);
  if (err) {
    console.error(err);
  }
});

window.addEventListener('upload-success', function () {
  Materialize.toast('Upload succeeded', 3000);
});

window.addEventListener('upload-error', function (_ref2) {
  var _ref2$detail = _ref2.detail;
  var message = _ref2$detail.message;
  var err = _ref2$detail.err;

  var span = document.createElement('span');
  span.innerText = 'Upload failed: ' + message;
  Materialize.toast(span.innerHTML, 3000);
  if (err) {
    console.error(err);
  }
});

init();
init$1();
init$2();

webfontloader.load({
  google: {
    families: ['Lato', 'Lato:bold']
  },
  active: function active() {
    window.dispatchEvent(new Event('fontsloaded'));
  }
});

exports.generate = generate;
exports.firebase = firebase;
exports.toggleLogin = toggleLogin;
exports.upload = upload;
exports.logo = logo;
exports.form = form;
exports.canvas = canvas;
exports.ctx = ctx;

}((this.main = this.main || {})));
