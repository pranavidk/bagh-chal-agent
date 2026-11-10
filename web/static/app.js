(()=>{var WM=Object.create;var kg=Object.defineProperty;var XM=Object.getOwnPropertyDescriptor;var YM=Object.getOwnPropertyNames;var qM=Object.getPrototypeOf,$M=Object.prototype.hasOwnProperty;var Ni=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ZM=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of YM(e))!$M.call(t,r)&&r!==n&&kg(t,r,{get:()=>e[r],enumerable:!(i=XM(e,r))||i.enumerable});return t};var lt=(t,e,n)=>(n=t!=null?WM(qM(t)):{},ZM(e||!t||!t.__esModule?kg(n,"default",{value:t,enumerable:!0}):n,t));var Zg=Ni(Ze=>{"use strict";var ra=Symbol.for("react.element"),JM=Symbol.for("react.portal"),KM=Symbol.for("react.fragment"),jM=Symbol.for("react.strict_mode"),QM=Symbol.for("react.profiler"),eS=Symbol.for("react.provider"),tS=Symbol.for("react.context"),nS=Symbol.for("react.forward_ref"),iS=Symbol.for("react.suspense"),rS=Symbol.for("react.memo"),sS=Symbol.for("react.lazy"),Fg=Symbol.iterator;function oS(t){return t===null||typeof t!="object"?null:(t=Fg&&t[Fg]||t["@@iterator"],typeof t=="function"?t:null)}var Vg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Hg=Object.assign,Gg={};function ks(t,e,n){this.props=t,this.context=e,this.refs=Gg,this.updater=n||Vg}ks.prototype.isReactComponent={};ks.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};ks.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Wg(){}Wg.prototype=ks.prototype;function Ah(t,e,n){this.props=t,this.context=e,this.refs=Gg,this.updater=n||Vg}var Ch=Ah.prototype=new Wg;Ch.constructor=Ah;Hg(Ch,ks.prototype);Ch.isPureReactComponent=!0;var Bg=Array.isArray,Xg=Object.prototype.hasOwnProperty,Rh={current:null},Yg={key:!0,ref:!0,__self:!0,__source:!0};function qg(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Xg.call(e,i)&&!Yg.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:ra,type:t,key:s,ref:o,props:r,_owner:Rh.current}}function aS(t,e){return{$$typeof:ra,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Ph(t){return typeof t=="object"&&t!==null&&t.$$typeof===ra}function lS(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var zg=/\/+/g;function Th(t,e){return typeof t=="object"&&t!==null&&t.key!=null?lS(""+t.key):e.toString(36)}function Fl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case ra:case JM:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Th(o,0):i,Bg(r)?(n="",t!=null&&(n=t.replace(zg,"$&/")+"/"),Fl(r,e,n,"",function(c){return c})):r!=null&&(Ph(r)&&(r=aS(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(zg,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Bg(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+Th(s,a);o+=Fl(s,e,n,l,r)}else if(l=oS(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+Th(s,a++),o+=Fl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function kl(t,e,n){if(t==null)return t;var i=[],r=0;return Fl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function cS(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var dn={current:null},Bl={transition:null},uS={ReactCurrentDispatcher:dn,ReactCurrentBatchConfig:Bl,ReactCurrentOwner:Rh};function $g(){throw Error("act(...) is not supported in production builds of React.")}Ze.Children={map:kl,forEach:function(t,e,n){kl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return kl(t,function(){e++}),e},toArray:function(t){return kl(t,function(e){return e})||[]},only:function(t){if(!Ph(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ze.Component=ks;Ze.Fragment=KM;Ze.Profiler=QM;Ze.PureComponent=Ah;Ze.StrictMode=jM;Ze.Suspense=iS;Ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=uS;Ze.act=$g;Ze.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Hg({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Rh.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Xg.call(e,l)&&!Yg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:ra,type:t.type,key:r,ref:s,props:i,_owner:o}};Ze.createContext=function(t){return t={$$typeof:tS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:eS,_context:t},t.Consumer=t};Ze.createElement=qg;Ze.createFactory=function(t){var e=qg.bind(null,t);return e.type=t,e};Ze.createRef=function(){return{current:null}};Ze.forwardRef=function(t){return{$$typeof:nS,render:t}};Ze.isValidElement=Ph;Ze.lazy=function(t){return{$$typeof:sS,_payload:{_status:-1,_result:t},_init:cS}};Ze.memo=function(t,e){return{$$typeof:rS,type:t,compare:e===void 0?null:e}};Ze.startTransition=function(t){var e=Bl.transition;Bl.transition={};try{t()}finally{Bl.transition=e}};Ze.unstable_act=$g;Ze.useCallback=function(t,e){return dn.current.useCallback(t,e)};Ze.useContext=function(t){return dn.current.useContext(t)};Ze.useDebugValue=function(){};Ze.useDeferredValue=function(t){return dn.current.useDeferredValue(t)};Ze.useEffect=function(t,e){return dn.current.useEffect(t,e)};Ze.useId=function(){return dn.current.useId()};Ze.useImperativeHandle=function(t,e,n){return dn.current.useImperativeHandle(t,e,n)};Ze.useInsertionEffect=function(t,e){return dn.current.useInsertionEffect(t,e)};Ze.useLayoutEffect=function(t,e){return dn.current.useLayoutEffect(t,e)};Ze.useMemo=function(t,e){return dn.current.useMemo(t,e)};Ze.useReducer=function(t,e,n){return dn.current.useReducer(t,e,n)};Ze.useRef=function(t){return dn.current.useRef(t)};Ze.useState=function(t){return dn.current.useState(t)};Ze.useSyncExternalStore=function(t,e,n){return dn.current.useSyncExternalStore(t,e,n)};Ze.useTransition=function(){return dn.current.useTransition()};Ze.version="18.3.1"});var An=Ni((E2,Jg)=>{"use strict";Jg.exports=Zg()});var o0=Ni(gt=>{"use strict";function Dh(t,e){var n=t.length;t.push(e);e:for(;0<n;){var i=n-1>>>1,r=t[i];if(0<zl(r,e))t[i]=e,t[n]=r,n=i;else break e}}function jn(t){return t.length===0?null:t[0]}function Hl(t){if(t.length===0)return null;var e=t[0],n=t.pop();if(n!==e){t[0]=n;e:for(var i=0,r=t.length,s=r>>>1;i<s;){var o=2*(i+1)-1,a=t[o],l=o+1,c=t[l];if(0>zl(a,n))l<r&&0>zl(c,a)?(t[i]=c,t[l]=n,i=l):(t[i]=a,t[o]=n,i=o);else if(l<r&&0>zl(c,n))t[i]=c,t[l]=n,i=l;else break e}}return e}function zl(t,e){var n=t.sortIndex-e.sortIndex;return n!==0?n:t.id-e.id}typeof performance=="object"&&typeof performance.now=="function"?(Kg=performance,gt.unstable_now=function(){return Kg.now()}):(Ih=Date,jg=Ih.now(),gt.unstable_now=function(){return Ih.now()-jg});var Kg,Ih,jg,gi=[],hr=[],hS=1,Bn=null,nn=3,Gl=!1,$r=!1,oa=!1,t0=typeof setTimeout=="function"?setTimeout:null,n0=typeof clearTimeout=="function"?clearTimeout:null,Qg=typeof setImmediate!="undefined"?setImmediate:null;typeof navigator!="undefined"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Uh(t){for(var e=jn(hr);e!==null;){if(e.callback===null)Hl(hr);else if(e.startTime<=t)Hl(hr),e.sortIndex=e.expirationTime,Dh(gi,e);else break;e=jn(hr)}}function Oh(t){if(oa=!1,Uh(t),!$r)if(jn(gi)!==null)$r=!0,Fh(kh);else{var e=jn(hr);e!==null&&Bh(Oh,e.startTime-t)}}function kh(t,e){$r=!1,oa&&(oa=!1,n0(aa),aa=-1),Gl=!0;var n=nn;try{for(Uh(e),Bn=jn(gi);Bn!==null&&(!(Bn.expirationTime>e)||t&&!s0());){var i=Bn.callback;if(typeof i=="function"){Bn.callback=null,nn=Bn.priorityLevel;var r=i(Bn.expirationTime<=e);e=gt.unstable_now(),typeof r=="function"?Bn.callback=r:Bn===jn(gi)&&Hl(gi),Uh(e)}else Hl(gi);Bn=jn(gi)}if(Bn!==null)var s=!0;else{var o=jn(hr);o!==null&&Bh(Oh,o.startTime-e),s=!1}return s}finally{Bn=null,nn=n,Gl=!1}}var Wl=!1,Vl=null,aa=-1,i0=5,r0=-1;function s0(){return!(gt.unstable_now()-r0<i0)}function Nh(){if(Vl!==null){var t=gt.unstable_now();r0=t;var e=!0;try{e=Vl(!0,t)}finally{e?sa():(Wl=!1,Vl=null)}}else Wl=!1}var sa;typeof Qg=="function"?sa=function(){Qg(Nh)}:typeof MessageChannel!="undefined"?(Lh=new MessageChannel,e0=Lh.port2,Lh.port1.onmessage=Nh,sa=function(){e0.postMessage(null)}):sa=function(){t0(Nh,0)};var Lh,e0;function Fh(t){Vl=t,Wl||(Wl=!0,sa())}function Bh(t,e){aa=t0(function(){t(gt.unstable_now())},e)}gt.unstable_IdlePriority=5;gt.unstable_ImmediatePriority=1;gt.unstable_LowPriority=4;gt.unstable_NormalPriority=3;gt.unstable_Profiling=null;gt.unstable_UserBlockingPriority=2;gt.unstable_cancelCallback=function(t){t.callback=null};gt.unstable_continueExecution=function(){$r||Gl||($r=!0,Fh(kh))};gt.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):i0=0<t?Math.floor(1e3/t):5};gt.unstable_getCurrentPriorityLevel=function(){return nn};gt.unstable_getFirstCallbackNode=function(){return jn(gi)};gt.unstable_next=function(t){switch(nn){case 1:case 2:case 3:var e=3;break;default:e=nn}var n=nn;nn=e;try{return t()}finally{nn=n}};gt.unstable_pauseExecution=function(){};gt.unstable_requestPaint=function(){};gt.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var n=nn;nn=t;try{return e()}finally{nn=n}};gt.unstable_scheduleCallback=function(t,e,n){var i=gt.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,t){case 1:var r=-1;break;case 2:r=250;break;case 5:r=1073741823;break;case 4:r=1e4;break;default:r=5e3}return r=n+r,t={id:hS++,callback:e,priorityLevel:t,startTime:n,expirationTime:r,sortIndex:-1},n>i?(t.sortIndex=n,Dh(hr,t),jn(gi)===null&&t===jn(hr)&&(oa?(n0(aa),aa=-1):oa=!0,Bh(Oh,n-i))):(t.sortIndex=r,Dh(gi,t),$r||Gl||($r=!0,Fh(kh))),t};gt.unstable_shouldYield=s0;gt.unstable_wrapCallback=function(t){var e=nn;return function(){var n=nn;nn=e;try{return t.apply(this,arguments)}finally{nn=n}}}});var l0=Ni((T2,a0)=>{"use strict";a0.exports=o0()});var d_=Ni(Ln=>{"use strict";var dS=An(),In=l0();function re(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var mv=new Set,Ra={};function as(t,e){ro(t,e),ro(t+"Capture",e)}function ro(t,e){for(Ra[t]=e,t=0;t<e.length;t++)mv.add(e[t])}var Fi=!(typeof window=="undefined"||typeof window.document=="undefined"||typeof window.document.createElement=="undefined"),ld=Object.prototype.hasOwnProperty,fS=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,c0={},u0={};function pS(t){return ld.call(u0,t)?!0:ld.call(c0,t)?!1:fS.test(t)?u0[t]=!0:(c0[t]=!0,!1)}function mS(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function gS(t,e,n,i){if(e===null||typeof e=="undefined"||mS(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function mn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Jt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Jt[t]=new mn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Jt[e]=new mn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Jt[t]=new mn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Jt[t]=new mn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Jt[t]=new mn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Jt[t]=new mn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Jt[t]=new mn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Jt[t]=new mn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Jt[t]=new mn(t,5,!1,t.toLowerCase(),null,!1,!1)});var ef=/[\-:]([a-z])/g;function tf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(ef,tf);Jt[e]=new mn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(ef,tf);Jt[e]=new mn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(ef,tf);Jt[e]=new mn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Jt[t]=new mn(t,1,!1,t.toLowerCase(),null,!1,!1)});Jt.xlinkHref=new mn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Jt[t]=new mn(t,1,!1,t.toLowerCase(),null,!0,!0)});function nf(t,e,n,i){var r=Jt.hasOwnProperty(e)?Jt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(gS(e,n,r,i)&&(n=null),i||r===null?pS(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Hi=dS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Xl=Symbol.for("react.element"),zs=Symbol.for("react.portal"),Vs=Symbol.for("react.fragment"),rf=Symbol.for("react.strict_mode"),cd=Symbol.for("react.profiler"),gv=Symbol.for("react.provider"),vv=Symbol.for("react.context"),sf=Symbol.for("react.forward_ref"),ud=Symbol.for("react.suspense"),hd=Symbol.for("react.suspense_list"),of=Symbol.for("react.memo"),fr=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var yv=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var h0=Symbol.iterator;function la(t){return t===null||typeof t!="object"?null:(t=h0&&t[h0]||t["@@iterator"],typeof t=="function"?t:null)}var Rt=Object.assign,zh;function ga(t){if(zh===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);zh=e&&e[1]||""}return`
`+zh+t}var Vh=!1;function Hh(t,e){if(!t||Vh)return"";Vh=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{Vh=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ga(t):""}function vS(t){switch(t.tag){case 5:return ga(t.type);case 16:return ga("Lazy");case 13:return ga("Suspense");case 19:return ga("SuspenseList");case 0:case 2:case 15:return t=Hh(t.type,!1),t;case 11:return t=Hh(t.type.render,!1),t;case 1:return t=Hh(t.type,!0),t;default:return""}}function dd(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Vs:return"Fragment";case zs:return"Portal";case cd:return"Profiler";case rf:return"StrictMode";case ud:return"Suspense";case hd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case vv:return(t.displayName||"Context")+".Consumer";case gv:return(t._context.displayName||"Context")+".Provider";case sf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case of:return e=t.displayName||null,e!==null?e:dd(t.type)||"Memo";case fr:e=t._payload,t=t._init;try{return dd(t(e))}catch{}}return null}function yS(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return dd(e);case 8:return e===rf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ar(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function _v(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function _S(t){var e=_v(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n!="undefined"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Yl(t){t._valueTracker||(t._valueTracker=_S(t))}function xv(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=_v(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function xc(t){if(t=t||(typeof document!="undefined"?document:void 0),typeof t=="undefined")return null;try{return t.activeElement||t.body}catch{return t.body}}function fd(t,e){var n=e.checked;return Rt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n!=null?n:t._wrapperState.initialChecked})}function d0(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Ar(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Mv(t,e){e=e.checked,e!=null&&nf(t,"checked",e,!1)}function pd(t,e){Mv(t,e);var n=Ar(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?md(t,e.type,n):e.hasOwnProperty("defaultValue")&&md(t,e.type,Ar(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function f0(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function md(t,e,n){(e!=="number"||xc(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var va=Array.isArray;function js(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Ar(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function gd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(re(91));return Rt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function p0(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(re(92));if(va(n)){if(1<n.length)throw Error(re(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Ar(n)}}function Sv(t,e){var n=Ar(e.value),i=Ar(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function m0(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function wv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function vd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?wv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ql,Ev=function(t){return typeof MSApp!="undefined"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ql=ql||document.createElement("div"),ql.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ql.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Pa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var xa={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},xS=["Webkit","ms","Moz","O"];Object.keys(xa).forEach(function(t){xS.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),xa[e]=xa[t]})});function bv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||xa.hasOwnProperty(t)&&xa[t]?(""+e).trim():e+"px"}function Tv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=bv(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var MS=Rt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function yd(t,e){if(e){if(MS[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(re(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(re(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(re(61))}if(e.style!=null&&typeof e.style!="object")throw Error(re(62))}}function _d(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var xd=null;function af(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Md=null,Qs=null,eo=null;function g0(t){if(t=$a(t)){if(typeof Md!="function")throw Error(re(280));var e=t.stateNode;e&&(e=$c(e),Md(t.stateNode,t.type,e))}}function Av(t){Qs?eo?eo.push(t):eo=[t]:Qs=t}function Cv(){if(Qs){var t=Qs,e=eo;if(eo=Qs=null,g0(t),e)for(t=0;t<e.length;t++)g0(e[t])}}function Rv(t,e){return t(e)}function Pv(){}var Gh=!1;function Iv(t,e,n){if(Gh)return t(e,n);Gh=!0;try{return Rv(t,e,n)}finally{Gh=!1,(Qs!==null||eo!==null)&&(Pv(),Cv())}}function Ia(t,e){var n=t.stateNode;if(n===null)return null;var i=$c(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(re(231,e,typeof n));return n}var Sd=!1;if(Fi)try{Fs={},Object.defineProperty(Fs,"passive",{get:function(){Sd=!0}}),window.addEventListener("test",Fs,Fs),window.removeEventListener("test",Fs,Fs)}catch{Sd=!1}var Fs;function SS(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var Ma=!1,Mc=null,Sc=!1,wd=null,wS={onError:function(t){Ma=!0,Mc=t}};function ES(t,e,n,i,r,s,o,a,l){Ma=!1,Mc=null,SS.apply(wS,arguments)}function bS(t,e,n,i,r,s,o,a,l){if(ES.apply(this,arguments),Ma){if(Ma){var c=Mc;Ma=!1,Mc=null}else throw Error(re(198));Sc||(Sc=!0,wd=c)}}function ls(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Nv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function v0(t){if(ls(t)!==t)throw Error(re(188))}function TS(t){var e=t.alternate;if(!e){if(e=ls(t),e===null)throw Error(re(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return v0(r),t;if(s===i)return v0(r),e;s=s.sibling}throw Error(re(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(re(189))}}if(n.alternate!==i)throw Error(re(190))}if(n.tag!==3)throw Error(re(188));return n.stateNode.current===n?t:e}function Lv(t){return t=TS(t),t!==null?Dv(t):null}function Dv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Dv(t);if(e!==null)return e;t=t.sibling}return null}var Uv=In.unstable_scheduleCallback,y0=In.unstable_cancelCallback,AS=In.unstable_shouldYield,CS=In.unstable_requestPaint,Dt=In.unstable_now,RS=In.unstable_getCurrentPriorityLevel,lf=In.unstable_ImmediatePriority,Ov=In.unstable_UserBlockingPriority,wc=In.unstable_NormalPriority,PS=In.unstable_LowPriority,kv=In.unstable_IdlePriority,Wc=null,xi=null;function IS(t){if(xi&&typeof xi.onCommitFiberRoot=="function")try{xi.onCommitFiberRoot(Wc,t,void 0,(t.current.flags&128)===128)}catch{}}var ii=Math.clz32?Math.clz32:DS,NS=Math.log,LS=Math.LN2;function DS(t){return t>>>=0,t===0?32:31-(NS(t)/LS|0)|0}var $l=64,Zl=4194304;function ya(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Ec(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=ya(a):(s&=o,s!==0&&(i=ya(s)))}else o=n&~r,o!==0?i=ya(o):s!==0&&(i=ya(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-ii(e),r=1<<n,i|=t[n],e&=~r;return i}function US(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function OS(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-ii(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=US(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Ed(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Fv(){var t=$l;return $l<<=1,!($l&4194240)&&($l=64),t}function Wh(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ya(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ii(e),t[e]=n}function kS(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-ii(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function cf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-ii(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var ct=0;function Bv(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var zv,uf,Vv,Hv,Gv,bd=!1,Jl=[],_r=null,xr=null,Mr=null,Na=new Map,La=new Map,mr=[],FS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function _0(t,e){switch(t){case"focusin":case"focusout":_r=null;break;case"dragenter":case"dragleave":xr=null;break;case"mouseover":case"mouseout":Mr=null;break;case"pointerover":case"pointerout":Na.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":La.delete(e.pointerId)}}function ca(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=$a(e),e!==null&&uf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function BS(t,e,n,i,r){switch(e){case"focusin":return _r=ca(_r,t,e,n,i,r),!0;case"dragenter":return xr=ca(xr,t,e,n,i,r),!0;case"mouseover":return Mr=ca(Mr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Na.set(s,ca(Na.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,La.set(s,ca(La.get(s)||null,t,e,n,i,r)),!0}return!1}function Wv(t){var e=Kr(t.target);if(e!==null){var n=ls(e);if(n!==null){if(e=n.tag,e===13){if(e=Nv(n),e!==null){t.blockedOn=e,Gv(t.priority,function(){Vv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function uc(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Td(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);xd=i,n.target.dispatchEvent(i),xd=null}else return e=$a(n),e!==null&&uf(e),t.blockedOn=n,!1;e.shift()}return!0}function x0(t,e,n){uc(t)&&n.delete(e)}function zS(){bd=!1,_r!==null&&uc(_r)&&(_r=null),xr!==null&&uc(xr)&&(xr=null),Mr!==null&&uc(Mr)&&(Mr=null),Na.forEach(x0),La.forEach(x0)}function ua(t,e){t.blockedOn===e&&(t.blockedOn=null,bd||(bd=!0,In.unstable_scheduleCallback(In.unstable_NormalPriority,zS)))}function Da(t){function e(r){return ua(r,t)}if(0<Jl.length){ua(Jl[0],t);for(var n=1;n<Jl.length;n++){var i=Jl[n];i.blockedOn===t&&(i.blockedOn=null)}}for(_r!==null&&ua(_r,t),xr!==null&&ua(xr,t),Mr!==null&&ua(Mr,t),Na.forEach(e),La.forEach(e),n=0;n<mr.length;n++)i=mr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<mr.length&&(n=mr[0],n.blockedOn===null);)Wv(n),n.blockedOn===null&&mr.shift()}var to=Hi.ReactCurrentBatchConfig,bc=!0;function VS(t,e,n,i){var r=ct,s=to.transition;to.transition=null;try{ct=1,hf(t,e,n,i)}finally{ct=r,to.transition=s}}function HS(t,e,n,i){var r=ct,s=to.transition;to.transition=null;try{ct=4,hf(t,e,n,i)}finally{ct=r,to.transition=s}}function hf(t,e,n,i){if(bc){var r=Td(t,e,n,i);if(r===null)Kh(t,e,i,Tc,n),_0(t,i);else if(BS(r,t,e,n,i))i.stopPropagation();else if(_0(t,i),e&4&&-1<FS.indexOf(t)){for(;r!==null;){var s=$a(r);if(s!==null&&zv(s),s=Td(t,e,n,i),s===null&&Kh(t,e,i,Tc,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Kh(t,e,i,null,n)}}var Tc=null;function Td(t,e,n,i){if(Tc=null,t=af(i),t=Kr(t),t!==null)if(e=ls(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Nv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Tc=t,null}function Xv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(RS()){case lf:return 1;case Ov:return 4;case wc:case PS:return 16;case kv:return 536870912;default:return 16}default:return 16}}var vr=null,df=null,hc=null;function Yv(){if(hc)return hc;var t,e=df,n=e.length,i,r="value"in vr?vr.value:vr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return hc=r.slice(t,1<i?1-i:void 0)}function dc(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Kl(){return!0}function M0(){return!1}function Nn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Kl:M0,this.isPropagationStopped=M0,this}return Rt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Kl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Kl)},persist:function(){},isPersistent:Kl}),e}var ho={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ff=Nn(ho),qa=Rt({},ho,{view:0,detail:0}),GS=Nn(qa),Xh,Yh,ha,Xc=Rt({},qa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:pf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ha&&(ha&&t.type==="mousemove"?(Xh=t.screenX-ha.screenX,Yh=t.screenY-ha.screenY):Yh=Xh=0,ha=t),Xh)},movementY:function(t){return"movementY"in t?t.movementY:Yh}}),S0=Nn(Xc),WS=Rt({},Xc,{dataTransfer:0}),XS=Nn(WS),YS=Rt({},qa,{relatedTarget:0}),qh=Nn(YS),qS=Rt({},ho,{animationName:0,elapsedTime:0,pseudoElement:0}),$S=Nn(qS),ZS=Rt({},ho,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),JS=Nn(ZS),KS=Rt({},ho,{data:0}),w0=Nn(KS),jS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},QS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},e1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function t1(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=e1[t])?!!e[t]:!1}function pf(){return t1}var n1=Rt({},qa,{key:function(t){if(t.key){var e=jS[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=dc(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?QS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:pf,charCode:function(t){return t.type==="keypress"?dc(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?dc(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),i1=Nn(n1),r1=Rt({},Xc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),E0=Nn(r1),s1=Rt({},qa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:pf}),o1=Nn(s1),a1=Rt({},ho,{propertyName:0,elapsedTime:0,pseudoElement:0}),l1=Nn(a1),c1=Rt({},Xc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),u1=Nn(c1),h1=[9,13,27,32],mf=Fi&&"CompositionEvent"in window,Sa=null;Fi&&"documentMode"in document&&(Sa=document.documentMode);var d1=Fi&&"TextEvent"in window&&!Sa,qv=Fi&&(!mf||Sa&&8<Sa&&11>=Sa),b0=" ",T0=!1;function $v(t,e){switch(t){case"keyup":return h1.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Zv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Hs=!1;function f1(t,e){switch(t){case"compositionend":return Zv(e);case"keypress":return e.which!==32?null:(T0=!0,b0);case"textInput":return t=e.data,t===b0&&T0?null:t;default:return null}}function p1(t,e){if(Hs)return t==="compositionend"||!mf&&$v(t,e)?(t=Yv(),hc=df=vr=null,Hs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return qv&&e.locale!=="ko"?null:e.data;default:return null}}var m1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function A0(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!m1[t.type]:e==="textarea"}function Jv(t,e,n,i){Av(i),e=Ac(e,"onChange"),0<e.length&&(n=new ff("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var wa=null,Ua=null;function g1(t){ay(t,0)}function Yc(t){var e=Xs(t);if(xv(e))return t}function v1(t,e){if(t==="change")return e}var Kv=!1;Fi&&(Fi?(Ql="oninput"in document,Ql||($h=document.createElement("div"),$h.setAttribute("oninput","return;"),Ql=typeof $h.oninput=="function"),jl=Ql):jl=!1,Kv=jl&&(!document.documentMode||9<document.documentMode));var jl,Ql,$h;function C0(){wa&&(wa.detachEvent("onpropertychange",jv),Ua=wa=null)}function jv(t){if(t.propertyName==="value"&&Yc(Ua)){var e=[];Jv(e,Ua,t,af(t)),Iv(g1,e)}}function y1(t,e,n){t==="focusin"?(C0(),wa=e,Ua=n,wa.attachEvent("onpropertychange",jv)):t==="focusout"&&C0()}function _1(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Yc(Ua)}function x1(t,e){if(t==="click")return Yc(e)}function M1(t,e){if(t==="input"||t==="change")return Yc(e)}function S1(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var si=typeof Object.is=="function"?Object.is:S1;function Oa(t,e){if(si(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!ld.call(e,r)||!si(t[r],e[r]))return!1}return!0}function R0(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function P0(t,e){var n=R0(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=R0(n)}}function Qv(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Qv(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function ey(){for(var t=window,e=xc();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=xc(t.document)}return e}function gf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function w1(t){var e=ey(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Qv(n.ownerDocument.documentElement,n)){if(i!==null&&gf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=P0(n,s);var o=P0(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var E1=Fi&&"documentMode"in document&&11>=document.documentMode,Gs=null,Ad=null,Ea=null,Cd=!1;function I0(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Cd||Gs==null||Gs!==xc(i)||(i=Gs,"selectionStart"in i&&gf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ea&&Oa(Ea,i)||(Ea=i,i=Ac(Ad,"onSelect"),0<i.length&&(e=new ff("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Gs)))}function ec(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ws={animationend:ec("Animation","AnimationEnd"),animationiteration:ec("Animation","AnimationIteration"),animationstart:ec("Animation","AnimationStart"),transitionend:ec("Transition","TransitionEnd")},Zh={},ty={};Fi&&(ty=document.createElement("div").style,"AnimationEvent"in window||(delete Ws.animationend.animation,delete Ws.animationiteration.animation,delete Ws.animationstart.animation),"TransitionEvent"in window||delete Ws.transitionend.transition);function qc(t){if(Zh[t])return Zh[t];if(!Ws[t])return t;var e=Ws[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in ty)return Zh[t]=e[n];return t}var ny=qc("animationend"),iy=qc("animationiteration"),ry=qc("animationstart"),sy=qc("transitionend"),oy=new Map,N0="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Rr(t,e){oy.set(t,e),as(e,[t])}for(tc=0;tc<N0.length;tc++)nc=N0[tc],L0=nc.toLowerCase(),D0=nc[0].toUpperCase()+nc.slice(1),Rr(L0,"on"+D0);var nc,L0,D0,tc;Rr(ny,"onAnimationEnd");Rr(iy,"onAnimationIteration");Rr(ry,"onAnimationStart");Rr("dblclick","onDoubleClick");Rr("focusin","onFocus");Rr("focusout","onBlur");Rr(sy,"onTransitionEnd");ro("onMouseEnter",["mouseout","mouseover"]);ro("onMouseLeave",["mouseout","mouseover"]);ro("onPointerEnter",["pointerout","pointerover"]);ro("onPointerLeave",["pointerout","pointerover"]);as("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));as("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));as("onBeforeInput",["compositionend","keypress","textInput","paste"]);as("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));as("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));as("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var _a="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),b1=new Set("cancel close invalid load scroll toggle".split(" ").concat(_a));function U0(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,bS(i,e,void 0,t),t.currentTarget=null}function ay(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;U0(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;U0(r,a,c),s=l}}}if(Sc)throw t=wd,Sc=!1,wd=null,t}function St(t,e){var n=e[Ld];n===void 0&&(n=e[Ld]=new Set);var i=t+"__bubble";n.has(i)||(ly(e,t,2,!1),n.add(i))}function Jh(t,e,n){var i=0;e&&(i|=4),ly(n,t,i,e)}var ic="_reactListening"+Math.random().toString(36).slice(2);function ka(t){if(!t[ic]){t[ic]=!0,mv.forEach(function(n){n!=="selectionchange"&&(b1.has(n)||Jh(n,!1,t),Jh(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ic]||(e[ic]=!0,Jh("selectionchange",!1,e))}}function ly(t,e,n,i){switch(Xv(e)){case 1:var r=VS;break;case 4:r=HS;break;default:r=hf}n=r.bind(null,e,n,t),r=void 0,!Sd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Kh(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Kr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Iv(function(){var c=s,u=af(n),d=[];e:{var f=oy.get(t);if(f!==void 0){var p=ff,g=t;switch(t){case"keypress":if(dc(n)===0)break e;case"keydown":case"keyup":p=i1;break;case"focusin":g="focus",p=qh;break;case"focusout":g="blur",p=qh;break;case"beforeblur":case"afterblur":p=qh;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=S0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=XS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=o1;break;case ny:case iy:case ry:p=$S;break;case sy:p=l1;break;case"scroll":p=GS;break;case"wheel":p=u1;break;case"copy":case"cut":case"paste":p=JS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=E0}var y=(e&4)!==0,m=!y&&t==="scroll",h=y?f!==null?f+"Capture":null:f;y=[];for(var v=c,_;v!==null;){_=v;var x=_.stateNode;if(_.tag===5&&x!==null&&(_=x,h!==null&&(x=Ia(v,h),x!=null&&y.push(Fa(v,x,_)))),m)break;v=v.return}0<y.length&&(f=new p(f,g,null,n,u),d.push({event:f,listeners:y}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==xd&&(g=n.relatedTarget||n.fromElement)&&(Kr(g)||g[Bi]))break e;if((p||f)&&(f=u.window===u?u:(f=u.ownerDocument)?f.defaultView||f.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?Kr(g):null,g!==null&&(m=ls(g),g!==m||g.tag!==5&&g.tag!==6)&&(g=null)):(p=null,g=c),p!==g)){if(y=S0,x="onMouseLeave",h="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(y=E0,x="onPointerLeave",h="onPointerEnter",v="pointer"),m=p==null?f:Xs(p),_=g==null?f:Xs(g),f=new y(x,v+"leave",p,n,u),f.target=m,f.relatedTarget=_,x=null,Kr(u)===c&&(y=new y(h,v+"enter",g,n,u),y.target=_,y.relatedTarget=m,x=y),m=x,p&&g)t:{for(y=p,h=g,v=0,_=y;_;_=Bs(_))v++;for(_=0,x=h;x;x=Bs(x))_++;for(;0<v-_;)y=Bs(y),v--;for(;0<_-v;)h=Bs(h),_--;for(;v--;){if(y===h||h!==null&&y===h.alternate)break t;y=Bs(y),h=Bs(h)}y=null}else y=null;p!==null&&O0(d,f,p,y,!1),g!==null&&m!==null&&O0(d,m,g,y,!0)}}e:{if(f=c?Xs(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var C=v1;else if(A0(f))if(Kv)C=M1;else{C=_1;var T=y1}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(C=x1);if(C&&(C=C(t,c))){Jv(d,C,n,u);break e}T&&T(t,f,c),t==="focusout"&&(T=f._wrapperState)&&T.controlled&&f.type==="number"&&md(f,"number",f.value)}switch(T=c?Xs(c):window,t){case"focusin":(A0(T)||T.contentEditable==="true")&&(Gs=T,Ad=c,Ea=null);break;case"focusout":Ea=Ad=Gs=null;break;case"mousedown":Cd=!0;break;case"contextmenu":case"mouseup":case"dragend":Cd=!1,I0(d,n,u);break;case"selectionchange":if(E1)break;case"keydown":case"keyup":I0(d,n,u)}var A;if(mf)e:{switch(t){case"compositionstart":var I="onCompositionStart";break e;case"compositionend":I="onCompositionEnd";break e;case"compositionupdate":I="onCompositionUpdate";break e}I=void 0}else Hs?$v(t,n)&&(I="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(I="onCompositionStart");I&&(qv&&n.locale!=="ko"&&(Hs||I!=="onCompositionStart"?I==="onCompositionEnd"&&Hs&&(A=Yv()):(vr=u,df="value"in vr?vr.value:vr.textContent,Hs=!0)),T=Ac(c,I),0<T.length&&(I=new w0(I,t,null,n,u),d.push({event:I,listeners:T}),A?I.data=A:(A=Zv(n),A!==null&&(I.data=A)))),(A=d1?f1(t,n):p1(t,n))&&(c=Ac(c,"onBeforeInput"),0<c.length&&(u=new w0("onBeforeInput","beforeinput",null,n,u),d.push({event:u,listeners:c}),u.data=A))}ay(d,e)})}function Fa(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ac(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Ia(t,n),s!=null&&i.unshift(Fa(t,s,r)),s=Ia(t,e),s!=null&&i.push(Fa(t,s,r))),t=t.return}return i}function Bs(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function O0(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Ia(n,s),l!=null&&o.unshift(Fa(n,l,a))):r||(l=Ia(n,s),l!=null&&o.push(Fa(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var T1=/\r\n?/g,A1=/\u0000|\uFFFD/g;function k0(t){return(typeof t=="string"?t:""+t).replace(T1,`
`).replace(A1,"")}function rc(t,e,n){if(e=k0(e),k0(t)!==e&&n)throw Error(re(425))}function Cc(){}var Rd=null,Pd=null;function Id(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Nd=typeof setTimeout=="function"?setTimeout:void 0,C1=typeof clearTimeout=="function"?clearTimeout:void 0,F0=typeof Promise=="function"?Promise:void 0,R1=typeof queueMicrotask=="function"?queueMicrotask:typeof F0!="undefined"?function(t){return F0.resolve(null).then(t).catch(P1)}:Nd;function P1(t){setTimeout(function(){throw t})}function jh(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Da(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Da(e)}function Sr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function B0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var fo=Math.random().toString(36).slice(2),_i="__reactFiber$"+fo,Ba="__reactProps$"+fo,Bi="__reactContainer$"+fo,Ld="__reactEvents$"+fo,I1="__reactListeners$"+fo,N1="__reactHandles$"+fo;function Kr(t){var e=t[_i];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Bi]||n[_i]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=B0(t);t!==null;){if(n=t[_i])return n;t=B0(t)}return e}t=n,n=t.parentNode}return null}function $a(t){return t=t[_i]||t[Bi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Xs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(re(33))}function $c(t){return t[Ba]||null}var Dd=[],Ys=-1;function Pr(t){return{current:t}}function wt(t){0>Ys||(t.current=Dd[Ys],Dd[Ys]=null,Ys--)}function vt(t,e){Ys++,Dd[Ys]=t.current,t.current=e}var Cr={},an=Pr(Cr),wn=Pr(!1),ns=Cr;function so(t,e){var n=t.type.contextTypes;if(!n)return Cr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function En(t){return t=t.childContextTypes,t!=null}function Rc(){wt(wn),wt(an)}function z0(t,e,n){if(an.current!==Cr)throw Error(re(168));vt(an,e),vt(wn,n)}function cy(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(re(108,yS(t)||"Unknown",r));return Rt({},n,i)}function Pc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Cr,ns=an.current,vt(an,t),vt(wn,wn.current),!0}function V0(t,e,n){var i=t.stateNode;if(!i)throw Error(re(169));n?(t=cy(t,e,ns),i.__reactInternalMemoizedMergedChildContext=t,wt(wn),wt(an),vt(an,t)):wt(wn),vt(wn,n)}var Di=null,Zc=!1,Qh=!1;function uy(t){Di===null?Di=[t]:Di.push(t)}function L1(t){Zc=!0,uy(t)}function Ir(){if(!Qh&&Di!==null){Qh=!0;var t=0,e=ct;try{var n=Di;for(ct=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Di=null,Zc=!1}catch(r){throw Di!==null&&(Di=Di.slice(t+1)),Uv(lf,Ir),r}finally{ct=e,Qh=!1}}return null}var qs=[],$s=0,Ic=null,Nc=0,zn=[],Vn=0,is=null,Ui=1,Oi="";function Zr(t,e){qs[$s++]=Nc,qs[$s++]=Ic,Ic=t,Nc=e}function hy(t,e,n){zn[Vn++]=Ui,zn[Vn++]=Oi,zn[Vn++]=is,is=t;var i=Ui;t=Oi;var r=32-ii(i)-1;i&=~(1<<r),n+=1;var s=32-ii(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Ui=1<<32-ii(e)+r|n<<r|i,Oi=s+t}else Ui=1<<s|n<<r|i,Oi=t}function vf(t){t.return!==null&&(Zr(t,1),hy(t,1,0))}function yf(t){for(;t===Ic;)Ic=qs[--$s],qs[$s]=null,Nc=qs[--$s],qs[$s]=null;for(;t===is;)is=zn[--Vn],zn[Vn]=null,Oi=zn[--Vn],zn[Vn]=null,Ui=zn[--Vn],zn[Vn]=null}var Pn=null,Rn=null,Et=!1,ni=null;function dy(t,e){var n=Hn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function H0(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Pn=t,Rn=Sr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Pn=t,Rn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=is!==null?{id:Ui,overflow:Oi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Hn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Pn=t,Rn=null,!0):!1;default:return!1}}function Ud(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Od(t){if(Et){var e=Rn;if(e){var n=e;if(!H0(t,e)){if(Ud(t))throw Error(re(418));e=Sr(n.nextSibling);var i=Pn;e&&H0(t,e)?dy(i,n):(t.flags=t.flags&-4097|2,Et=!1,Pn=t)}}else{if(Ud(t))throw Error(re(418));t.flags=t.flags&-4097|2,Et=!1,Pn=t}}}function G0(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Pn=t}function sc(t){if(t!==Pn)return!1;if(!Et)return G0(t),Et=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Id(t.type,t.memoizedProps)),e&&(e=Rn)){if(Ud(t))throw fy(),Error(re(418));for(;e;)dy(t,e),e=Sr(e.nextSibling)}if(G0(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(re(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Rn=Sr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Rn=null}}else Rn=Pn?Sr(t.stateNode.nextSibling):null;return!0}function fy(){for(var t=Rn;t;)t=Sr(t.nextSibling)}function oo(){Rn=Pn=null,Et=!1}function _f(t){ni===null?ni=[t]:ni.push(t)}var D1=Hi.ReactCurrentBatchConfig;function da(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(re(309));var i=n.stateNode}if(!i)throw Error(re(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(re(284));if(!n._owner)throw Error(re(290,t))}return t}function oc(t,e){throw t=Object.prototype.toString.call(e),Error(re(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function W0(t){var e=t._init;return e(t._payload)}function py(t){function e(h,v){if(t){var _=h.deletions;_===null?(h.deletions=[v],h.flags|=16):_.push(v)}}function n(h,v){if(!t)return null;for(;v!==null;)e(h,v),v=v.sibling;return null}function i(h,v){for(h=new Map;v!==null;)v.key!==null?h.set(v.key,v):h.set(v.index,v),v=v.sibling;return h}function r(h,v){return h=Tr(h,v),h.index=0,h.sibling=null,h}function s(h,v,_){return h.index=_,t?(_=h.alternate,_!==null?(_=_.index,_<v?(h.flags|=2,v):_):(h.flags|=2,v)):(h.flags|=1048576,v)}function o(h){return t&&h.alternate===null&&(h.flags|=2),h}function a(h,v,_,x){return v===null||v.tag!==6?(v=od(_,h.mode,x),v.return=h,v):(v=r(v,_),v.return=h,v)}function l(h,v,_,x){var C=_.type;return C===Vs?u(h,v,_.props.children,x,_.key):v!==null&&(v.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===fr&&W0(C)===v.type)?(x=r(v,_.props),x.ref=da(h,v,_),x.return=h,x):(x=_c(_.type,_.key,_.props,null,h.mode,x),x.ref=da(h,v,_),x.return=h,x)}function c(h,v,_,x){return v===null||v.tag!==4||v.stateNode.containerInfo!==_.containerInfo||v.stateNode.implementation!==_.implementation?(v=ad(_,h.mode,x),v.return=h,v):(v=r(v,_.children||[]),v.return=h,v)}function u(h,v,_,x,C){return v===null||v.tag!==7?(v=ts(_,h.mode,x,C),v.return=h,v):(v=r(v,_),v.return=h,v)}function d(h,v,_){if(typeof v=="string"&&v!==""||typeof v=="number")return v=od(""+v,h.mode,_),v.return=h,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Xl:return _=_c(v.type,v.key,v.props,null,h.mode,_),_.ref=da(h,null,v),_.return=h,_;case zs:return v=ad(v,h.mode,_),v.return=h,v;case fr:var x=v._init;return d(h,x(v._payload),_)}if(va(v)||la(v))return v=ts(v,h.mode,_,null),v.return=h,v;oc(h,v)}return null}function f(h,v,_,x){var C=v!==null?v.key:null;if(typeof _=="string"&&_!==""||typeof _=="number")return C!==null?null:a(h,v,""+_,x);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Xl:return _.key===C?l(h,v,_,x):null;case zs:return _.key===C?c(h,v,_,x):null;case fr:return C=_._init,f(h,v,C(_._payload),x)}if(va(_)||la(_))return C!==null?null:u(h,v,_,x,null);oc(h,_)}return null}function p(h,v,_,x,C){if(typeof x=="string"&&x!==""||typeof x=="number")return h=h.get(_)||null,a(v,h,""+x,C);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Xl:return h=h.get(x.key===null?_:x.key)||null,l(v,h,x,C);case zs:return h=h.get(x.key===null?_:x.key)||null,c(v,h,x,C);case fr:var T=x._init;return p(h,v,_,T(x._payload),C)}if(va(x)||la(x))return h=h.get(_)||null,u(v,h,x,C,null);oc(v,x)}return null}function g(h,v,_,x){for(var C=null,T=null,A=v,I=v=0,w=null;A!==null&&I<_.length;I++){A.index>I?(w=A,A=null):w=A.sibling;var M=f(h,A,_[I],x);if(M===null){A===null&&(A=w);break}t&&A&&M.alternate===null&&e(h,A),v=s(M,v,I),T===null?C=M:T.sibling=M,T=M,A=w}if(I===_.length)return n(h,A),Et&&Zr(h,I),C;if(A===null){for(;I<_.length;I++)A=d(h,_[I],x),A!==null&&(v=s(A,v,I),T===null?C=A:T.sibling=A,T=A);return Et&&Zr(h,I),C}for(A=i(h,A);I<_.length;I++)w=p(A,h,I,_[I],x),w!==null&&(t&&w.alternate!==null&&A.delete(w.key===null?I:w.key),v=s(w,v,I),T===null?C=w:T.sibling=w,T=w);return t&&A.forEach(function(R){return e(h,R)}),Et&&Zr(h,I),C}function y(h,v,_,x){var C=la(_);if(typeof C!="function")throw Error(re(150));if(_=C.call(_),_==null)throw Error(re(151));for(var T=C=null,A=v,I=v=0,w=null,M=_.next();A!==null&&!M.done;I++,M=_.next()){A.index>I?(w=A,A=null):w=A.sibling;var R=f(h,A,M.value,x);if(R===null){A===null&&(A=w);break}t&&A&&R.alternate===null&&e(h,A),v=s(R,v,I),T===null?C=R:T.sibling=R,T=R,A=w}if(M.done)return n(h,A),Et&&Zr(h,I),C;if(A===null){for(;!M.done;I++,M=_.next())M=d(h,M.value,x),M!==null&&(v=s(M,v,I),T===null?C=M:T.sibling=M,T=M);return Et&&Zr(h,I),C}for(A=i(h,A);!M.done;I++,M=_.next())M=p(A,h,I,M.value,x),M!==null&&(t&&M.alternate!==null&&A.delete(M.key===null?I:M.key),v=s(M,v,I),T===null?C=M:T.sibling=M,T=M);return t&&A.forEach(function(k){return e(h,k)}),Et&&Zr(h,I),C}function m(h,v,_,x){if(typeof _=="object"&&_!==null&&_.type===Vs&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case Xl:e:{for(var C=_.key,T=v;T!==null;){if(T.key===C){if(C=_.type,C===Vs){if(T.tag===7){n(h,T.sibling),v=r(T,_.props.children),v.return=h,h=v;break e}}else if(T.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===fr&&W0(C)===T.type){n(h,T.sibling),v=r(T,_.props),v.ref=da(h,T,_),v.return=h,h=v;break e}n(h,T);break}else e(h,T);T=T.sibling}_.type===Vs?(v=ts(_.props.children,h.mode,x,_.key),v.return=h,h=v):(x=_c(_.type,_.key,_.props,null,h.mode,x),x.ref=da(h,v,_),x.return=h,h=x)}return o(h);case zs:e:{for(T=_.key;v!==null;){if(v.key===T)if(v.tag===4&&v.stateNode.containerInfo===_.containerInfo&&v.stateNode.implementation===_.implementation){n(h,v.sibling),v=r(v,_.children||[]),v.return=h,h=v;break e}else{n(h,v);break}else e(h,v);v=v.sibling}v=ad(_,h.mode,x),v.return=h,h=v}return o(h);case fr:return T=_._init,m(h,v,T(_._payload),x)}if(va(_))return g(h,v,_,x);if(la(_))return y(h,v,_,x);oc(h,_)}return typeof _=="string"&&_!==""||typeof _=="number"?(_=""+_,v!==null&&v.tag===6?(n(h,v.sibling),v=r(v,_),v.return=h,h=v):(n(h,v),v=od(_,h.mode,x),v.return=h,h=v),o(h)):n(h,v)}return m}var ao=py(!0),my=py(!1),Lc=Pr(null),Dc=null,Zs=null,xf=null;function Mf(){xf=Zs=Dc=null}function Sf(t){var e=Lc.current;wt(Lc),t._currentValue=e}function kd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function no(t,e){Dc=t,xf=Zs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Sn=!0),t.firstContext=null)}function Wn(t){var e=t._currentValue;if(xf!==t)if(t={context:t,memoizedValue:e,next:null},Zs===null){if(Dc===null)throw Error(re(308));Zs=t,Dc.dependencies={lanes:0,firstContext:t}}else Zs=Zs.next=t;return e}var jr=null;function wf(t){jr===null?jr=[t]:jr.push(t)}function gy(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,wf(e)):(n.next=r.next,r.next=n),e.interleaved=n,zi(t,i)}function zi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var pr=!1;function Ef(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function vy(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function ki(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function wr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,et&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,zi(t,n)}return r=i.interleaved,r===null?(e.next=e,wf(i)):(e.next=r.next,r.next=e),i.interleaved=e,zi(t,n)}function fc(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,cf(t,n)}}function X0(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Uc(t,e,n,i){var r=t.updateQueue;pr=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=t.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,u=c=l=null,a=s;do{var f=a.lane,p=a.eventTime;if((i&f)===f){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=t,y=a;switch(f=e,p=n,y.tag){case 1:if(g=y.payload,typeof g=="function"){d=g.call(p,d,f);break e}d=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=y.payload,f=typeof g=="function"?g.call(p,d,f):g,f==null)break e;d=Rt({},d,f);break e;case 2:pr=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=d):u=u.next=p,o|=f;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;f=a,a=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(u===null&&(l=d),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);ss|=o,t.lanes=o,t.memoizedState=d}}function Y0(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(re(191,r));r.call(i)}}}var Za={},Mi=Pr(Za),za=Pr(Za),Va=Pr(Za);function Qr(t){if(t===Za)throw Error(re(174));return t}function bf(t,e){switch(vt(Va,e),vt(za,t),vt(Mi,Za),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:vd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=vd(e,t)}wt(Mi),vt(Mi,e)}function lo(){wt(Mi),wt(za),wt(Va)}function yy(t){Qr(Va.current);var e=Qr(Mi.current),n=vd(e,t.type);e!==n&&(vt(za,t),vt(Mi,n))}function Tf(t){za.current===t&&(wt(Mi),wt(za))}var At=Pr(0);function Oc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var ed=[];function Af(){for(var t=0;t<ed.length;t++)ed[t]._workInProgressVersionPrimary=null;ed.length=0}var pc=Hi.ReactCurrentDispatcher,td=Hi.ReactCurrentBatchConfig,rs=0,Ct=null,kt=null,Wt=null,kc=!1,ba=!1,Ha=0,U1=0;function rn(){throw Error(re(321))}function Cf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!si(t[n],e[n]))return!1;return!0}function Rf(t,e,n,i,r,s){if(rs=s,Ct=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,pc.current=t===null||t.memoizedState===null?B1:z1,t=n(i,r),ba){s=0;do{if(ba=!1,Ha=0,25<=s)throw Error(re(301));s+=1,Wt=kt=null,e.updateQueue=null,pc.current=V1,t=n(i,r)}while(ba)}if(pc.current=Fc,e=kt!==null&&kt.next!==null,rs=0,Wt=kt=Ct=null,kc=!1,e)throw Error(re(300));return t}function Pf(){var t=Ha!==0;return Ha=0,t}function yi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Wt===null?Ct.memoizedState=Wt=t:Wt=Wt.next=t,Wt}function Xn(){if(kt===null){var t=Ct.alternate;t=t!==null?t.memoizedState:null}else t=kt.next;var e=Wt===null?Ct.memoizedState:Wt.next;if(e!==null)Wt=e,kt=t;else{if(t===null)throw Error(re(310));kt=t,t={memoizedState:kt.memoizedState,baseState:kt.baseState,baseQueue:kt.baseQueue,queue:kt.queue,next:null},Wt===null?Ct.memoizedState=Wt=t:Wt=Wt.next=t}return Wt}function Ga(t,e){return typeof e=="function"?e(t):e}function nd(t){var e=Xn(),n=e.queue;if(n===null)throw Error(re(311));n.lastRenderedReducer=t;var i=kt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((rs&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var d={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,Ct.lanes|=u,ss|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,si(i,e.memoizedState)||(Sn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Ct.lanes|=s,ss|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function id(t){var e=Xn(),n=e.queue;if(n===null)throw Error(re(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);si(s,e.memoizedState)||(Sn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function _y(){}function xy(t,e){var n=Ct,i=Xn(),r=e(),s=!si(i.memoizedState,r);if(s&&(i.memoizedState=r,Sn=!0),i=i.queue,If(wy.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Wt!==null&&Wt.memoizedState.tag&1){if(n.flags|=2048,Wa(9,Sy.bind(null,n,i,r,e),void 0,null),Xt===null)throw Error(re(349));rs&30||My(n,e,r)}return r}function My(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ct.updateQueue,e===null?(e={lastEffect:null,stores:null},Ct.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Sy(t,e,n,i){e.value=n,e.getSnapshot=i,Ey(e)&&by(t)}function wy(t,e,n){return n(function(){Ey(e)&&by(t)})}function Ey(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!si(t,n)}catch{return!0}}function by(t){var e=zi(t,1);e!==null&&ri(e,t,1,-1)}function q0(t){var e=yi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ga,lastRenderedState:t},e.queue=t,t=t.dispatch=F1.bind(null,Ct,t),[e.memoizedState,t]}function Wa(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Ct.updateQueue,e===null?(e={lastEffect:null,stores:null},Ct.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Ty(){return Xn().memoizedState}function mc(t,e,n,i){var r=yi();Ct.flags|=t,r.memoizedState=Wa(1|e,n,void 0,i===void 0?null:i)}function Jc(t,e,n,i){var r=Xn();i=i===void 0?null:i;var s=void 0;if(kt!==null){var o=kt.memoizedState;if(s=o.destroy,i!==null&&Cf(i,o.deps)){r.memoizedState=Wa(e,n,s,i);return}}Ct.flags|=t,r.memoizedState=Wa(1|e,n,s,i)}function $0(t,e){return mc(8390656,8,t,e)}function If(t,e){return Jc(2048,8,t,e)}function Ay(t,e){return Jc(4,2,t,e)}function Cy(t,e){return Jc(4,4,t,e)}function Ry(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Py(t,e,n){return n=n!=null?n.concat([t]):null,Jc(4,4,Ry.bind(null,e,t),n)}function Nf(){}function Iy(t,e){var n=Xn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Cf(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Ny(t,e){var n=Xn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Cf(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Ly(t,e,n){return rs&21?(si(n,e)||(n=Fv(),Ct.lanes|=n,ss|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Sn=!0),t.memoizedState=n)}function O1(t,e){var n=ct;ct=n!==0&&4>n?n:4,t(!0);var i=td.transition;td.transition={};try{t(!1),e()}finally{ct=n,td.transition=i}}function Dy(){return Xn().memoizedState}function k1(t,e,n){var i=br(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Uy(t))Oy(e,n);else if(n=gy(t,e,n,i),n!==null){var r=pn();ri(n,t,i,r),ky(n,e,i)}}function F1(t,e,n){var i=br(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Uy(t))Oy(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,si(a,o)){var l=e.interleaved;l===null?(r.next=r,wf(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=gy(t,e,r,i),n!==null&&(r=pn(),ri(n,t,i,r),ky(n,e,i))}}function Uy(t){var e=t.alternate;return t===Ct||e!==null&&e===Ct}function Oy(t,e){ba=kc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function ky(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,cf(t,n)}}var Fc={readContext:Wn,useCallback:rn,useContext:rn,useEffect:rn,useImperativeHandle:rn,useInsertionEffect:rn,useLayoutEffect:rn,useMemo:rn,useReducer:rn,useRef:rn,useState:rn,useDebugValue:rn,useDeferredValue:rn,useTransition:rn,useMutableSource:rn,useSyncExternalStore:rn,useId:rn,unstable_isNewReconciler:!1},B1={readContext:Wn,useCallback:function(t,e){return yi().memoizedState=[t,e===void 0?null:e],t},useContext:Wn,useEffect:$0,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,mc(4194308,4,Ry.bind(null,e,t),n)},useLayoutEffect:function(t,e){return mc(4194308,4,t,e)},useInsertionEffect:function(t,e){return mc(4,2,t,e)},useMemo:function(t,e){var n=yi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=yi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=k1.bind(null,Ct,t),[i.memoizedState,t]},useRef:function(t){var e=yi();return t={current:t},e.memoizedState=t},useState:q0,useDebugValue:Nf,useDeferredValue:function(t){return yi().memoizedState=t},useTransition:function(){var t=q0(!1),e=t[0];return t=O1.bind(null,t[1]),yi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Ct,r=yi();if(Et){if(n===void 0)throw Error(re(407));n=n()}else{if(n=e(),Xt===null)throw Error(re(349));rs&30||My(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,$0(wy.bind(null,i,s,t),[t]),i.flags|=2048,Wa(9,Sy.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=yi(),e=Xt.identifierPrefix;if(Et){var n=Oi,i=Ui;n=(i&~(1<<32-ii(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ha++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=U1++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},z1={readContext:Wn,useCallback:Iy,useContext:Wn,useEffect:If,useImperativeHandle:Py,useInsertionEffect:Ay,useLayoutEffect:Cy,useMemo:Ny,useReducer:nd,useRef:Ty,useState:function(){return nd(Ga)},useDebugValue:Nf,useDeferredValue:function(t){var e=Xn();return Ly(e,kt.memoizedState,t)},useTransition:function(){var t=nd(Ga)[0],e=Xn().memoizedState;return[t,e]},useMutableSource:_y,useSyncExternalStore:xy,useId:Dy,unstable_isNewReconciler:!1},V1={readContext:Wn,useCallback:Iy,useContext:Wn,useEffect:If,useImperativeHandle:Py,useInsertionEffect:Ay,useLayoutEffect:Cy,useMemo:Ny,useReducer:id,useRef:Ty,useState:function(){return id(Ga)},useDebugValue:Nf,useDeferredValue:function(t){var e=Xn();return kt===null?e.memoizedState=t:Ly(e,kt.memoizedState,t)},useTransition:function(){var t=id(Ga)[0],e=Xn().memoizedState;return[t,e]},useMutableSource:_y,useSyncExternalStore:xy,useId:Dy,unstable_isNewReconciler:!1};function ei(t,e){if(t&&t.defaultProps){e=Rt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Fd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Rt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Kc={isMounted:function(t){return(t=t._reactInternals)?ls(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=pn(),r=br(t),s=ki(i,r);s.payload=e,n!=null&&(s.callback=n),e=wr(t,s,r),e!==null&&(ri(e,t,r,i),fc(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=pn(),r=br(t),s=ki(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=wr(t,s,r),e!==null&&(ri(e,t,r,i),fc(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=pn(),i=br(t),r=ki(n,i);r.tag=2,e!=null&&(r.callback=e),e=wr(t,r,i),e!==null&&(ri(e,t,i,n),fc(e,t,i))}};function Z0(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Oa(n,i)||!Oa(r,s):!0}function Fy(t,e,n){var i=!1,r=Cr,s=e.contextType;return typeof s=="object"&&s!==null?s=Wn(s):(r=En(e)?ns:an.current,i=e.contextTypes,s=(i=i!=null)?so(t,r):Cr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Kc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function J0(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Kc.enqueueReplaceState(e,e.state,null)}function Bd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Ef(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Wn(s):(s=En(e)?ns:an.current,r.context=so(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Fd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Kc.enqueueReplaceState(r,r.state,null),Uc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function co(t,e){try{var n="",i=e;do n+=vS(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function rd(t,e,n){return{value:t,source:null,stack:n!=null?n:null,digest:e!=null?e:null}}function zd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var H1=typeof WeakMap=="function"?WeakMap:Map;function By(t,e,n){n=ki(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){zc||(zc=!0,Jd=i),zd(t,e)},n}function zy(t,e,n){n=ki(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){zd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){zd(t,e),typeof i!="function"&&(Er===null?Er=new Set([this]):Er.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function K0(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new H1;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=nw.bind(null,t,e,n),e.then(t,t))}function j0(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Q0(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=ki(-1,1),e.tag=2,wr(n,e,1))),n.lanes|=1),t)}var G1=Hi.ReactCurrentOwner,Sn=!1;function fn(t,e,n,i){e.child=t===null?my(e,null,n,i):ao(e,t.child,n,i)}function ev(t,e,n,i,r){n=n.render;var s=e.ref;return no(e,r),i=Rf(t,e,n,i,s,r),n=Pf(),t!==null&&!Sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Vi(t,e,r)):(Et&&n&&vf(e),e.flags|=1,fn(t,e,i,r),e.child)}function tv(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!zf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Vy(t,e,s,i,r)):(t=_c(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Oa,n(o,i)&&t.ref===e.ref)return Vi(t,e,r)}return e.flags|=1,t=Tr(s,i),t.ref=e.ref,t.return=e,e.child=t}function Vy(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Oa(s,i)&&t.ref===e.ref)if(Sn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(Sn=!0);else return e.lanes=t.lanes,Vi(t,e,r)}return Vd(t,e,n,i,r)}function Hy(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},vt(Ks,Cn),Cn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,vt(Ks,Cn),Cn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,vt(Ks,Cn),Cn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,vt(Ks,Cn),Cn|=i;return fn(t,e,r,n),e.child}function Gy(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Vd(t,e,n,i,r){var s=En(n)?ns:an.current;return s=so(e,s),no(e,r),n=Rf(t,e,n,i,s,r),i=Pf(),t!==null&&!Sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Vi(t,e,r)):(Et&&i&&vf(e),e.flags|=1,fn(t,e,n,r),e.child)}function nv(t,e,n,i,r){if(En(n)){var s=!0;Pc(e)}else s=!1;if(no(e,r),e.stateNode===null)gc(t,e),Fy(e,n,i),Bd(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Wn(c):(c=En(n)?ns:an.current,c=so(e,c));var u=n.getDerivedStateFromProps,d=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&J0(e,o,i,c),pr=!1;var f=e.memoizedState;o.state=f,Uc(e,i,o,r),l=e.memoizedState,a!==i||f!==l||wn.current||pr?(typeof u=="function"&&(Fd(e,n,u,i),l=e.memoizedState),(a=pr||Z0(e,n,a,i,f,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,vy(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:ei(e.type,a),o.props=c,d=e.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Wn(l):(l=En(n)?ns:an.current,l=so(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||f!==l)&&J0(e,o,i,l),pr=!1,f=e.memoizedState,o.state=f,Uc(e,i,o,r);var g=e.memoizedState;a!==d||f!==g||wn.current||pr?(typeof p=="function"&&(Fd(e,n,p,i),g=e.memoizedState),(c=pr||Z0(e,n,c,i,f,g,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,g,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,g,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),o.props=i,o.state=g,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return Hd(t,e,n,i,s,r)}function Hd(t,e,n,i,r,s){Gy(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&V0(e,n,!1),Vi(t,e,s);i=e.stateNode,G1.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=ao(e,t.child,null,s),e.child=ao(e,null,a,s)):fn(t,e,a,s),e.memoizedState=i.state,r&&V0(e,n,!0),e.child}function Wy(t){var e=t.stateNode;e.pendingContext?z0(t,e.pendingContext,e.pendingContext!==e.context):e.context&&z0(t,e.context,!1),bf(t,e.containerInfo)}function iv(t,e,n,i,r){return oo(),_f(r),e.flags|=256,fn(t,e,n,i),e.child}var Gd={dehydrated:null,treeContext:null,retryLane:0};function Wd(t){return{baseLanes:t,cachePool:null,transitions:null}}function Xy(t,e,n){var i=e.pendingProps,r=At.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),vt(At,r&1),t===null)return Od(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=eu(o,i,0,null),t=ts(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Wd(n),e.memoizedState=Gd,t):Lf(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return W1(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Tr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Tr(a,s):(s=ts(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Wd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Gd,i}return s=t.child,t=s.sibling,i=Tr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Lf(t,e){return e=eu({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ac(t,e,n,i){return i!==null&&_f(i),ao(e,t.child,null,n),t=Lf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function W1(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=rd(Error(re(422))),ac(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=eu({mode:"visible",children:i.children},r,0,null),s=ts(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&ao(e,t.child,null,o),e.child.memoizedState=Wd(o),e.memoizedState=Gd,s);if(!(e.mode&1))return ac(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(re(419)),i=rd(s,i,void 0),ac(t,e,o,i)}if(a=(o&t.childLanes)!==0,Sn||a){if(i=Xt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,zi(t,r),ri(i,t,r,-1))}return Bf(),i=rd(Error(re(421))),ac(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=iw.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Rn=Sr(r.nextSibling),Pn=e,Et=!0,ni=null,t!==null&&(zn[Vn++]=Ui,zn[Vn++]=Oi,zn[Vn++]=is,Ui=t.id,Oi=t.overflow,is=e),e=Lf(e,i.children),e.flags|=4096,e)}function rv(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),kd(t.return,e,n)}function sd(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Yy(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(fn(t,e,i.children,n),i=At.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&rv(t,n,e);else if(t.tag===19)rv(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(vt(At,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Oc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),sd(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Oc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}sd(e,!0,n,null,s);break;case"together":sd(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function gc(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Vi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ss|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(re(153));if(e.child!==null){for(t=e.child,n=Tr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Tr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function X1(t,e,n){switch(e.tag){case 3:Wy(e),oo();break;case 5:yy(e);break;case 1:En(e.type)&&Pc(e);break;case 4:bf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;vt(Lc,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(vt(At,At.current&1),e.flags|=128,null):n&e.child.childLanes?Xy(t,e,n):(vt(At,At.current&1),t=Vi(t,e,n),t!==null?t.sibling:null);vt(At,At.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Yy(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),vt(At,At.current),i)break;return null;case 22:case 23:return e.lanes=0,Hy(t,e,n)}return Vi(t,e,n)}var qy,Xd,$y,Zy;qy=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Xd=function(){};$y=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Qr(Mi.current);var s=null;switch(n){case"input":r=fd(t,r),i=fd(t,i),s=[];break;case"select":r=Rt({},r,{value:void 0}),i=Rt({},i,{value:void 0}),s=[];break;case"textarea":r=gd(t,r),i=gd(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Cc)}yd(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ra.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ra.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&St("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};Zy=function(t,e,n,i){n!==i&&(e.flags|=4)};function fa(t,e){if(!Et)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function sn(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Y1(t,e,n){var i=e.pendingProps;switch(yf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return sn(e),null;case 1:return En(e.type)&&Rc(),sn(e),null;case 3:return i=e.stateNode,lo(),wt(wn),wt(an),Af(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(sc(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,ni!==null&&(Qd(ni),ni=null))),Xd(t,e),sn(e),null;case 5:Tf(e);var r=Qr(Va.current);if(n=e.type,t!==null&&e.stateNode!=null)$y(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(re(166));return sn(e),null}if(t=Qr(Mi.current),sc(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[_i]=e,i[Ba]=s,t=(e.mode&1)!==0,n){case"dialog":St("cancel",i),St("close",i);break;case"iframe":case"object":case"embed":St("load",i);break;case"video":case"audio":for(r=0;r<_a.length;r++)St(_a[r],i);break;case"source":St("error",i);break;case"img":case"image":case"link":St("error",i),St("load",i);break;case"details":St("toggle",i);break;case"input":d0(i,s),St("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},St("invalid",i);break;case"textarea":p0(i,s),St("invalid",i)}yd(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&rc(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&rc(i.textContent,a,t),r=["children",""+a]):Ra.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&St("scroll",i)}switch(n){case"input":Yl(i),f0(i,s,!0);break;case"textarea":Yl(i),m0(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Cc)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=wv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[_i]=e,t[Ba]=i,qy(t,e,!1,!1),e.stateNode=t;e:{switch(o=_d(n,i),n){case"dialog":St("cancel",t),St("close",t),r=i;break;case"iframe":case"object":case"embed":St("load",t),r=i;break;case"video":case"audio":for(r=0;r<_a.length;r++)St(_a[r],t);r=i;break;case"source":St("error",t),r=i;break;case"img":case"image":case"link":St("error",t),St("load",t),r=i;break;case"details":St("toggle",t),r=i;break;case"input":d0(t,i),r=fd(t,i),St("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Rt({},i,{value:void 0}),St("invalid",t);break;case"textarea":p0(t,i),r=gd(t,i),St("invalid",t);break;default:r=i}yd(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Tv(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Ev(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Pa(t,l):typeof l=="number"&&Pa(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ra.hasOwnProperty(s)?l!=null&&s==="onScroll"&&St("scroll",t):l!=null&&nf(t,s,l,o))}switch(n){case"input":Yl(t),f0(t,i,!1);break;case"textarea":Yl(t),m0(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Ar(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?js(t,!!i.multiple,s,!1):i.defaultValue!=null&&js(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Cc)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return sn(e),null;case 6:if(t&&e.stateNode!=null)Zy(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(re(166));if(n=Qr(Va.current),Qr(Mi.current),sc(e)){if(i=e.stateNode,n=e.memoizedProps,i[_i]=e,(s=i.nodeValue!==n)&&(t=Pn,t!==null))switch(t.tag){case 3:rc(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&rc(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[_i]=e,e.stateNode=i}return sn(e),null;case 13:if(wt(At),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Et&&Rn!==null&&e.mode&1&&!(e.flags&128))fy(),oo(),e.flags|=98560,s=!1;else if(s=sc(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(re(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(re(317));s[_i]=e}else oo(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;sn(e),s=!1}else ni!==null&&(Qd(ni),ni=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||At.current&1?Ft===0&&(Ft=3):Bf())),e.updateQueue!==null&&(e.flags|=4),sn(e),null);case 4:return lo(),Xd(t,e),t===null&&ka(e.stateNode.containerInfo),sn(e),null;case 10:return Sf(e.type._context),sn(e),null;case 17:return En(e.type)&&Rc(),sn(e),null;case 19:if(wt(At),s=e.memoizedState,s===null)return sn(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)fa(s,!1);else{if(Ft!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Oc(t),o!==null){for(e.flags|=128,fa(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return vt(At,At.current&1|2),e.child}t=t.sibling}s.tail!==null&&Dt()>uo&&(e.flags|=128,i=!0,fa(s,!1),e.lanes=4194304)}else{if(!i)if(t=Oc(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),fa(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Et)return sn(e),null}else 2*Dt()-s.renderingStartTime>uo&&n!==1073741824&&(e.flags|=128,i=!0,fa(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Dt(),e.sibling=null,n=At.current,vt(At,i?n&1|2:n&1),e):(sn(e),null);case 22:case 23:return Ff(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Cn&1073741824&&(sn(e),e.subtreeFlags&6&&(e.flags|=8192)):sn(e),null;case 24:return null;case 25:return null}throw Error(re(156,e.tag))}function q1(t,e){switch(yf(e),e.tag){case 1:return En(e.type)&&Rc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return lo(),wt(wn),wt(an),Af(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Tf(e),null;case 13:if(wt(At),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(re(340));oo()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return wt(At),null;case 4:return lo(),null;case 10:return Sf(e.type._context),null;case 22:case 23:return Ff(),null;case 24:return null;default:return null}}var lc=!1,on=!1,$1=typeof WeakSet=="function"?WeakSet:Set,we=null;function Js(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Nt(t,e,i)}else n.current=null}function Yd(t,e,n){try{n()}catch(i){Nt(t,e,i)}}var sv=!1;function Z1(t,e){if(Rd=bc,t=ey(),gf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,u=0,d=t,f=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)f=d,d=p;for(;;){if(d===t)break t;if(f===n&&++c===r&&(a=o),f===s&&++u===i&&(l=o),(p=d.nextSibling)!==null)break;d=f,f=d.parentNode}d=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Pd={focusedElem:t,selectionRange:n},bc=!1,we=e;we!==null;)if(e=we,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,we=t;else for(;we!==null;){e=we;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var y=g.memoizedProps,m=g.memoizedState,h=e.stateNode,v=h.getSnapshotBeforeUpdate(e.elementType===e.type?y:ei(e.type,y),m);h.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var _=e.stateNode.containerInfo;_.nodeType===1?_.textContent="":_.nodeType===9&&_.documentElement&&_.removeChild(_.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(re(163))}}catch(x){Nt(e,e.return,x)}if(t=e.sibling,t!==null){t.return=e.return,we=t;break}we=e.return}return g=sv,sv=!1,g}function Ta(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Yd(e,n,s)}r=r.next}while(r!==i)}}function jc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function qd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Jy(t){var e=t.alternate;e!==null&&(t.alternate=null,Jy(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[_i],delete e[Ba],delete e[Ld],delete e[I1],delete e[N1])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Ky(t){return t.tag===5||t.tag===3||t.tag===4}function ov(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Ky(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function $d(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Cc));else if(i!==4&&(t=t.child,t!==null))for($d(t,e,n),t=t.sibling;t!==null;)$d(t,e,n),t=t.sibling}function Zd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Zd(t,e,n),t=t.sibling;t!==null;)Zd(t,e,n),t=t.sibling}var $t=null,ti=!1;function dr(t,e,n){for(n=n.child;n!==null;)jy(t,e,n),n=n.sibling}function jy(t,e,n){if(xi&&typeof xi.onCommitFiberUnmount=="function")try{xi.onCommitFiberUnmount(Wc,n)}catch{}switch(n.tag){case 5:on||Js(n,e);case 6:var i=$t,r=ti;$t=null,dr(t,e,n),$t=i,ti=r,$t!==null&&(ti?(t=$t,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):$t.removeChild(n.stateNode));break;case 18:$t!==null&&(ti?(t=$t,n=n.stateNode,t.nodeType===8?jh(t.parentNode,n):t.nodeType===1&&jh(t,n),Da(t)):jh($t,n.stateNode));break;case 4:i=$t,r=ti,$t=n.stateNode.containerInfo,ti=!0,dr(t,e,n),$t=i,ti=r;break;case 0:case 11:case 14:case 15:if(!on&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Yd(n,e,o),r=r.next}while(r!==i)}dr(t,e,n);break;case 1:if(!on&&(Js(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Nt(n,e,a)}dr(t,e,n);break;case 21:dr(t,e,n);break;case 22:n.mode&1?(on=(i=on)||n.memoizedState!==null,dr(t,e,n),on=i):dr(t,e,n);break;default:dr(t,e,n)}}function av(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new $1),e.forEach(function(i){var r=rw.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Qn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:$t=a.stateNode,ti=!1;break e;case 3:$t=a.stateNode.containerInfo,ti=!0;break e;case 4:$t=a.stateNode.containerInfo,ti=!0;break e}a=a.return}if($t===null)throw Error(re(160));jy(s,o,r),$t=null,ti=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Nt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Qy(e,t),e=e.sibling}function Qy(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Qn(e,t),vi(t),i&4){try{Ta(3,t,t.return),jc(3,t)}catch(y){Nt(t,t.return,y)}try{Ta(5,t,t.return)}catch(y){Nt(t,t.return,y)}}break;case 1:Qn(e,t),vi(t),i&512&&n!==null&&Js(n,n.return);break;case 5:if(Qn(e,t),vi(t),i&512&&n!==null&&Js(n,n.return),t.flags&32){var r=t.stateNode;try{Pa(r,"")}catch(y){Nt(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Mv(r,s),_d(a,o);var c=_d(a,s);for(o=0;o<l.length;o+=2){var u=l[o],d=l[o+1];u==="style"?Tv(r,d):u==="dangerouslySetInnerHTML"?Ev(r,d):u==="children"?Pa(r,d):nf(r,u,d,c)}switch(a){case"input":pd(r,s);break;case"textarea":Sv(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?js(r,!!s.multiple,p,!1):f!==!!s.multiple&&(s.defaultValue!=null?js(r,!!s.multiple,s.defaultValue,!0):js(r,!!s.multiple,s.multiple?[]:"",!1))}r[Ba]=s}catch(y){Nt(t,t.return,y)}}break;case 6:if(Qn(e,t),vi(t),i&4){if(t.stateNode===null)throw Error(re(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(y){Nt(t,t.return,y)}}break;case 3:if(Qn(e,t),vi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Da(e.containerInfo)}catch(y){Nt(t,t.return,y)}break;case 4:Qn(e,t),vi(t);break;case 13:Qn(e,t),vi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Of=Dt())),i&4&&av(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(on=(c=on)||u,Qn(e,t),on=c):Qn(e,t),vi(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(we=t,u=t.child;u!==null;){for(d=we=u;we!==null;){switch(f=we,p=f.child,f.tag){case 0:case 11:case 14:case 15:Ta(4,f,f.return);break;case 1:Js(f,f.return);var g=f.stateNode;if(typeof g.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(y){Nt(i,n,y)}}break;case 5:Js(f,f.return);break;case 22:if(f.memoizedState!==null){cv(d);continue}}p!==null?(p.return=f,we=p):cv(d)}u=u.sibling}e:for(u=null,d=t;;){if(d.tag===5){if(u===null){u=d;try{r=d.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=bv("display",o))}catch(y){Nt(t,t.return,y)}}}else if(d.tag===6){if(u===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(y){Nt(t,t.return,y)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;u===d&&(u=null),d=d.return}u===d&&(u=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Qn(e,t),vi(t),i&4&&av(t);break;case 21:break;default:Qn(e,t),vi(t)}}function vi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Ky(n)){var i=n;break e}n=n.return}throw Error(re(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Pa(r,""),i.flags&=-33);var s=ov(t);Zd(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=ov(t);$d(t,a,o);break;default:throw Error(re(161))}}catch(l){Nt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function J1(t,e,n){we=t,e_(t,e,n)}function e_(t,e,n){for(var i=(t.mode&1)!==0;we!==null;){var r=we,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||lc;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||on;a=lc;var c=on;if(lc=o,(on=l)&&!c)for(we=r;we!==null;)o=we,l=o.child,o.tag===22&&o.memoizedState!==null?uv(r):l!==null?(l.return=o,we=l):uv(r);for(;s!==null;)we=s,e_(s,e,n),s=s.sibling;we=r,lc=a,on=c}lv(t,e,n)}else r.subtreeFlags&8772&&s!==null?(s.return=r,we=s):lv(t,e,n)}}function lv(t){for(;we!==null;){var e=we;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:on||jc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!on)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:ei(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Y0(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Y0(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var d=u.dehydrated;d!==null&&Da(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(re(163))}on||e.flags&512&&qd(e)}catch(f){Nt(e,e.return,f)}}if(e===t){we=null;break}if(n=e.sibling,n!==null){n.return=e.return,we=n;break}we=e.return}}function cv(t){for(;we!==null;){var e=we;if(e===t){we=null;break}var n=e.sibling;if(n!==null){n.return=e.return,we=n;break}we=e.return}}function uv(t){for(;we!==null;){var e=we;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{jc(4,e)}catch(l){Nt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Nt(e,r,l)}}var s=e.return;try{qd(e)}catch(l){Nt(e,s,l)}break;case 5:var o=e.return;try{qd(e)}catch(l){Nt(e,o,l)}}}catch(l){Nt(e,e.return,l)}if(e===t){we=null;break}var a=e.sibling;if(a!==null){a.return=e.return,we=a;break}we=e.return}}var K1=Math.ceil,Bc=Hi.ReactCurrentDispatcher,Df=Hi.ReactCurrentOwner,Gn=Hi.ReactCurrentBatchConfig,et=0,Xt=null,Ut=null,Zt=0,Cn=0,Ks=Pr(0),Ft=0,Xa=null,ss=0,Qc=0,Uf=0,Aa=null,Mn=null,Of=0,uo=1/0,Li=null,zc=!1,Jd=null,Er=null,cc=!1,yr=null,Vc=0,Ca=0,Kd=null,vc=-1,yc=0;function pn(){return et&6?Dt():vc!==-1?vc:vc=Dt()}function br(t){return t.mode&1?et&2&&Zt!==0?Zt&-Zt:D1.transition!==null?(yc===0&&(yc=Fv()),yc):(t=ct,t!==0||(t=window.event,t=t===void 0?16:Xv(t.type)),t):1}function ri(t,e,n,i){if(50<Ca)throw Ca=0,Kd=null,Error(re(185));Ya(t,n,i),(!(et&2)||t!==Xt)&&(t===Xt&&(!(et&2)&&(Qc|=n),Ft===4&&gr(t,Zt)),bn(t,i),n===1&&et===0&&!(e.mode&1)&&(uo=Dt()+500,Zc&&Ir()))}function bn(t,e){var n=t.callbackNode;OS(t,e);var i=Ec(t,t===Xt?Zt:0);if(i===0)n!==null&&y0(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&y0(n),e===1)t.tag===0?L1(hv.bind(null,t)):uy(hv.bind(null,t)),R1(function(){!(et&6)&&Ir()}),n=null;else{switch(Bv(i)){case 1:n=lf;break;case 4:n=Ov;break;case 16:n=wc;break;case 536870912:n=kv;break;default:n=wc}n=l_(n,t_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function t_(t,e){if(vc=-1,yc=0,et&6)throw Error(re(327));var n=t.callbackNode;if(io()&&t.callbackNode!==n)return null;var i=Ec(t,t===Xt?Zt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Hc(t,i);else{e=i;var r=et;et|=2;var s=i_();(Xt!==t||Zt!==e)&&(Li=null,uo=Dt()+500,es(t,e));do try{ew();break}catch(a){n_(t,a)}while(!0);Mf(),Bc.current=s,et=r,Ut!==null?e=0:(Xt=null,Zt=0,e=Ft)}if(e!==0){if(e===2&&(r=Ed(t),r!==0&&(i=r,e=jd(t,r))),e===1)throw n=Xa,es(t,0),gr(t,i),bn(t,Dt()),n;if(e===6)gr(t,i);else{if(r=t.current.alternate,!(i&30)&&!j1(r)&&(e=Hc(t,i),e===2&&(s=Ed(t),s!==0&&(i=s,e=jd(t,s))),e===1))throw n=Xa,es(t,0),gr(t,i),bn(t,Dt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(re(345));case 2:Jr(t,Mn,Li);break;case 3:if(gr(t,i),(i&130023424)===i&&(e=Of+500-Dt(),10<e)){if(Ec(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){pn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Nd(Jr.bind(null,t,Mn,Li),e);break}Jr(t,Mn,Li);break;case 4:if(gr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-ii(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Dt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*K1(i/1960))-i,10<i){t.timeoutHandle=Nd(Jr.bind(null,t,Mn,Li),i);break}Jr(t,Mn,Li);break;case 5:Jr(t,Mn,Li);break;default:throw Error(re(329))}}}return bn(t,Dt()),t.callbackNode===n?t_.bind(null,t):null}function jd(t,e){var n=Aa;return t.current.memoizedState.isDehydrated&&(es(t,e).flags|=256),t=Hc(t,e),t!==2&&(e=Mn,Mn=n,e!==null&&Qd(e)),t}function Qd(t){Mn===null?Mn=t:Mn.push.apply(Mn,t)}function j1(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!si(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function gr(t,e){for(e&=~Uf,e&=~Qc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ii(e),i=1<<n;t[n]=-1,e&=~i}}function hv(t){if(et&6)throw Error(re(327));io();var e=Ec(t,0);if(!(e&1))return bn(t,Dt()),null;var n=Hc(t,e);if(t.tag!==0&&n===2){var i=Ed(t);i!==0&&(e=i,n=jd(t,i))}if(n===1)throw n=Xa,es(t,0),gr(t,e),bn(t,Dt()),n;if(n===6)throw Error(re(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Jr(t,Mn,Li),bn(t,Dt()),null}function kf(t,e){var n=et;et|=1;try{return t(e)}finally{et=n,et===0&&(uo=Dt()+500,Zc&&Ir())}}function os(t){yr!==null&&yr.tag===0&&!(et&6)&&io();var e=et;et|=1;var n=Gn.transition,i=ct;try{if(Gn.transition=null,ct=1,t)return t()}finally{ct=i,Gn.transition=n,et=e,!(et&6)&&Ir()}}function Ff(){Cn=Ks.current,wt(Ks)}function es(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,C1(n)),Ut!==null)for(n=Ut.return;n!==null;){var i=n;switch(yf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Rc();break;case 3:lo(),wt(wn),wt(an),Af();break;case 5:Tf(i);break;case 4:lo();break;case 13:wt(At);break;case 19:wt(At);break;case 10:Sf(i.type._context);break;case 22:case 23:Ff()}n=n.return}if(Xt=t,Ut=t=Tr(t.current,null),Zt=Cn=e,Ft=0,Xa=null,Uf=Qc=ss=0,Mn=Aa=null,jr!==null){for(e=0;e<jr.length;e++)if(n=jr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}jr=null}return t}function n_(t,e){do{var n=Ut;try{if(Mf(),pc.current=Fc,kc){for(var i=Ct.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}kc=!1}if(rs=0,Wt=kt=Ct=null,ba=!1,Ha=0,Df.current=null,n===null||n.return===null){Ft=1,Xa=e,Ut=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Zt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,d=u.tag;if(!(u.mode&1)&&(d===0||d===11||d===15)){var f=u.alternate;f?(u.updateQueue=f.updateQueue,u.memoizedState=f.memoizedState,u.lanes=f.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=j0(o);if(p!==null){p.flags&=-257,Q0(p,o,a,s,e),p.mode&1&&K0(s,c,e),e=p,l=c;var g=e.updateQueue;if(g===null){var y=new Set;y.add(l),e.updateQueue=y}else g.add(l);break e}else{if(!(e&1)){K0(s,c,e),Bf();break e}l=Error(re(426))}}else if(Et&&a.mode&1){var m=j0(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Q0(m,o,a,s,e),_f(co(l,a));break e}}s=l=co(l,a),Ft!==4&&(Ft=2),Aa===null?Aa=[s]:Aa.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var h=By(s,l,e);X0(s,h);break e;case 1:a=l;var v=s.type,_=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||_!==null&&typeof _.componentDidCatch=="function"&&(Er===null||!Er.has(_)))){s.flags|=65536,e&=-e,s.lanes|=e;var x=zy(s,a,e);X0(s,x);break e}}s=s.return}while(s!==null)}s_(n)}catch(C){e=C,Ut===n&&n!==null&&(Ut=n=n.return);continue}break}while(!0)}function i_(){var t=Bc.current;return Bc.current=Fc,t===null?Fc:t}function Bf(){(Ft===0||Ft===3||Ft===2)&&(Ft=4),Xt===null||!(ss&268435455)&&!(Qc&268435455)||gr(Xt,Zt)}function Hc(t,e){var n=et;et|=2;var i=i_();(Xt!==t||Zt!==e)&&(Li=null,es(t,e));do try{Q1();break}catch(r){n_(t,r)}while(!0);if(Mf(),et=n,Bc.current=i,Ut!==null)throw Error(re(261));return Xt=null,Zt=0,Ft}function Q1(){for(;Ut!==null;)r_(Ut)}function ew(){for(;Ut!==null&&!AS();)r_(Ut)}function r_(t){var e=a_(t.alternate,t,Cn);t.memoizedProps=t.pendingProps,e===null?s_(t):Ut=e,Df.current=null}function s_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=q1(n,e),n!==null){n.flags&=32767,Ut=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ft=6,Ut=null;return}}else if(n=Y1(n,e,Cn),n!==null){Ut=n;return}if(e=e.sibling,e!==null){Ut=e;return}Ut=e=t}while(e!==null);Ft===0&&(Ft=5)}function Jr(t,e,n){var i=ct,r=Gn.transition;try{Gn.transition=null,ct=1,tw(t,e,n,i)}finally{Gn.transition=r,ct=i}return null}function tw(t,e,n,i){do io();while(yr!==null);if(et&6)throw Error(re(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(re(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(kS(t,s),t===Xt&&(Ut=Xt=null,Zt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||cc||(cc=!0,l_(wc,function(){return io(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Gn.transition,Gn.transition=null;var o=ct;ct=1;var a=et;et|=4,Df.current=null,Z1(t,n),Qy(n,t),w1(Pd),bc=!!Rd,Pd=Rd=null,t.current=n,J1(n,t,r),CS(),et=a,ct=o,Gn.transition=s}else t.current=n;if(cc&&(cc=!1,yr=t,Vc=r),s=t.pendingLanes,s===0&&(Er=null),IS(n.stateNode,i),bn(t,Dt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(zc)throw zc=!1,t=Jd,Jd=null,t;return Vc&1&&t.tag!==0&&io(),s=t.pendingLanes,s&1?t===Kd?Ca++:(Ca=0,Kd=t):Ca=0,Ir(),null}function io(){if(yr!==null){var t=Bv(Vc),e=Gn.transition,n=ct;try{if(Gn.transition=null,ct=16>t?16:t,yr===null)var i=!1;else{if(t=yr,yr=null,Vc=0,et&6)throw Error(re(331));var r=et;for(et|=4,we=t.current;we!==null;){var s=we,o=s.child;if(we.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(we=c;we!==null;){var u=we;switch(u.tag){case 0:case 11:case 15:Ta(8,u,s)}var d=u.child;if(d!==null)d.return=u,we=d;else for(;we!==null;){u=we;var f=u.sibling,p=u.return;if(Jy(u),u===c){we=null;break}if(f!==null){f.return=p,we=f;break}we=p}}}var g=s.alternate;if(g!==null){var y=g.child;if(y!==null){g.child=null;do{var m=y.sibling;y.sibling=null,y=m}while(y!==null)}}we=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,we=o;else e:for(;we!==null;){if(s=we,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ta(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,we=h;break e}we=s.return}}var v=t.current;for(we=v;we!==null;){o=we;var _=o.child;if(o.subtreeFlags&2064&&_!==null)_.return=o,we=_;else e:for(o=v;we!==null;){if(a=we,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:jc(9,a)}}catch(C){Nt(a,a.return,C)}if(a===o){we=null;break e}var x=a.sibling;if(x!==null){x.return=a.return,we=x;break e}we=a.return}}if(et=r,Ir(),xi&&typeof xi.onPostCommitFiberRoot=="function")try{xi.onPostCommitFiberRoot(Wc,t)}catch{}i=!0}return i}finally{ct=n,Gn.transition=e}}return!1}function dv(t,e,n){e=co(n,e),e=By(t,e,1),t=wr(t,e,1),e=pn(),t!==null&&(Ya(t,1,e),bn(t,e))}function Nt(t,e,n){if(t.tag===3)dv(t,t,n);else for(;e!==null;){if(e.tag===3){dv(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Er===null||!Er.has(i))){t=co(n,t),t=zy(e,t,1),e=wr(e,t,1),t=pn(),e!==null&&(Ya(e,1,t),bn(e,t));break}}e=e.return}}function nw(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=pn(),t.pingedLanes|=t.suspendedLanes&n,Xt===t&&(Zt&n)===n&&(Ft===4||Ft===3&&(Zt&130023424)===Zt&&500>Dt()-Of?es(t,0):Uf|=n),bn(t,e)}function o_(t,e){e===0&&(t.mode&1?(e=Zl,Zl<<=1,!(Zl&130023424)&&(Zl=4194304)):e=1);var n=pn();t=zi(t,e),t!==null&&(Ya(t,e,n),bn(t,n))}function iw(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),o_(t,n)}function rw(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(re(314))}i!==null&&i.delete(e),o_(t,n)}var a_;a_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||wn.current)Sn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Sn=!1,X1(t,e,n);Sn=!!(t.flags&131072)}else Sn=!1,Et&&e.flags&1048576&&hy(e,Nc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;gc(t,e),t=e.pendingProps;var r=so(e,an.current);no(e,n),r=Rf(null,e,i,t,r,n);var s=Pf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,En(i)?(s=!0,Pc(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Ef(e),r.updater=Kc,e.stateNode=r,r._reactInternals=e,Bd(e,i,t,n),e=Hd(null,e,i,!0,s,n)):(e.tag=0,Et&&s&&vf(e),fn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(gc(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=ow(i),t=ei(i,t),r){case 0:e=Vd(null,e,i,t,n);break e;case 1:e=nv(null,e,i,t,n);break e;case 11:e=ev(null,e,i,t,n);break e;case 14:e=tv(null,e,i,ei(i.type,t),n);break e}throw Error(re(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ei(i,r),Vd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ei(i,r),nv(t,e,i,r,n);case 3:e:{if(Wy(e),t===null)throw Error(re(387));i=e.pendingProps,s=e.memoizedState,r=s.element,vy(t,e),Uc(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=co(Error(re(423)),e),e=iv(t,e,i,n,r);break e}else if(i!==r){r=co(Error(re(424)),e),e=iv(t,e,i,n,r);break e}else for(Rn=Sr(e.stateNode.containerInfo.firstChild),Pn=e,Et=!0,ni=null,n=my(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(oo(),i===r){e=Vi(t,e,n);break e}fn(t,e,i,n)}e=e.child}return e;case 5:return yy(e),t===null&&Od(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Id(i,r)?o=null:s!==null&&Id(i,s)&&(e.flags|=32),Gy(t,e),fn(t,e,o,n),e.child;case 6:return t===null&&Od(e),null;case 13:return Xy(t,e,n);case 4:return bf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=ao(e,null,i,n):fn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ei(i,r),ev(t,e,i,r,n);case 7:return fn(t,e,e.pendingProps,n),e.child;case 8:return fn(t,e,e.pendingProps.children,n),e.child;case 12:return fn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,vt(Lc,i._currentValue),i._currentValue=o,s!==null)if(si(s.value,o)){if(s.children===r.children&&!wn.current){e=Vi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=ki(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),kd(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(re(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),kd(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}fn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,no(e,n),r=Wn(r),i=i(r),e.flags|=1,fn(t,e,i,n),e.child;case 14:return i=e.type,r=ei(i,e.pendingProps),r=ei(i.type,r),tv(t,e,i,r,n);case 15:return Vy(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ei(i,r),gc(t,e),e.tag=1,En(i)?(t=!0,Pc(e)):t=!1,no(e,n),Fy(e,i,r),Bd(e,i,r,n),Hd(null,e,i,!0,t,n);case 19:return Yy(t,e,n);case 22:return Hy(t,e,n)}throw Error(re(156,e.tag))};function l_(t,e){return Uv(t,e)}function sw(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Hn(t,e,n,i){return new sw(t,e,n,i)}function zf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ow(t){if(typeof t=="function")return zf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===sf)return 11;if(t===of)return 14}return 2}function Tr(t,e){var n=t.alternate;return n===null?(n=Hn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function _c(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")zf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Vs:return ts(n.children,r,s,e);case rf:o=8,r|=8;break;case cd:return t=Hn(12,n,e,r|2),t.elementType=cd,t.lanes=s,t;case ud:return t=Hn(13,n,e,r),t.elementType=ud,t.lanes=s,t;case hd:return t=Hn(19,n,e,r),t.elementType=hd,t.lanes=s,t;case yv:return eu(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case gv:o=10;break e;case vv:o=9;break e;case sf:o=11;break e;case of:o=14;break e;case fr:o=16,i=null;break e}throw Error(re(130,t==null?t:typeof t,""))}return e=Hn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function ts(t,e,n,i){return t=Hn(7,t,i,e),t.lanes=n,t}function eu(t,e,n,i){return t=Hn(22,t,i,e),t.elementType=yv,t.lanes=n,t.stateNode={isHidden:!1},t}function od(t,e,n){return t=Hn(6,t,null,e),t.lanes=n,t}function ad(t,e,n){return e=Hn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function aw(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Wh(0),this.expirationTimes=Wh(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Wh(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Vf(t,e,n,i,r,s,o,a,l){return t=new aw(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Hn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ef(s),t}function lw(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:zs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function c_(t){if(!t)return Cr;t=t._reactInternals;e:{if(ls(t)!==t||t.tag!==1)throw Error(re(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(En(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(re(171))}if(t.tag===1){var n=t.type;if(En(n))return cy(t,n,e)}return e}function u_(t,e,n,i,r,s,o,a,l){return t=Vf(n,i,!0,t,r,s,o,a,l),t.context=c_(null),n=t.current,i=pn(),r=br(n),s=ki(i,r),s.callback=e!=null?e:null,wr(n,s,r),t.current.lanes=r,Ya(t,r,i),bn(t,i),t}function tu(t,e,n,i){var r=e.current,s=pn(),o=br(r);return n=c_(n),e.context===null?e.context=n:e.pendingContext=n,e=ki(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=wr(r,e,o),t!==null&&(ri(t,r,o,s),fc(t,r,o)),o}function Gc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function fv(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Hf(t,e){fv(t,e),(t=t.alternate)&&fv(t,e)}function cw(){return null}var h_=typeof reportError=="function"?reportError:function(t){console.error(t)};function Gf(t){this._internalRoot=t}nu.prototype.render=Gf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(re(409));tu(t,e,null,null)};nu.prototype.unmount=Gf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;os(function(){tu(null,t,null,null)}),e[Bi]=null}};function nu(t){this._internalRoot=t}nu.prototype.unstable_scheduleHydration=function(t){if(t){var e=Hv();t={blockedOn:null,target:t,priority:e};for(var n=0;n<mr.length&&e!==0&&e<mr[n].priority;n++);mr.splice(n,0,t),n===0&&Wv(t)}};function Wf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function iu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function pv(){}function uw(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Gc(o);s.call(c)}}var o=u_(e,i,t,0,null,!1,!1,"",pv);return t._reactRootContainer=o,t[Bi]=o.current,ka(t.nodeType===8?t.parentNode:t),os(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Gc(l);a.call(c)}}var l=Vf(t,0,!1,null,null,!1,!1,"",pv);return t._reactRootContainer=l,t[Bi]=l.current,ka(t.nodeType===8?t.parentNode:t),os(function(){tu(e,l,n,i)}),l}function ru(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Gc(o);a.call(l)}}tu(e,o,t,r)}else o=uw(n,e,t,r,i);return Gc(o)}zv=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=ya(e.pendingLanes);n!==0&&(cf(e,n|1),bn(e,Dt()),!(et&6)&&(uo=Dt()+500,Ir()))}break;case 13:os(function(){var i=zi(t,1);if(i!==null){var r=pn();ri(i,t,1,r)}}),Hf(t,1)}};uf=function(t){if(t.tag===13){var e=zi(t,134217728);if(e!==null){var n=pn();ri(e,t,134217728,n)}Hf(t,134217728)}};Vv=function(t){if(t.tag===13){var e=br(t),n=zi(t,e);if(n!==null){var i=pn();ri(n,t,e,i)}Hf(t,e)}};Hv=function(){return ct};Gv=function(t,e){var n=ct;try{return ct=t,e()}finally{ct=n}};Md=function(t,e,n){switch(e){case"input":if(pd(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=$c(i);if(!r)throw Error(re(90));xv(i),pd(i,r)}}}break;case"textarea":Sv(t,n);break;case"select":e=n.value,e!=null&&js(t,!!n.multiple,e,!1)}};Rv=kf;Pv=os;var hw={usingClientEntryPoint:!1,Events:[$a,Xs,$c,Av,Cv,kf]},pa={findFiberByHostInstance:Kr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},dw={bundleType:pa.bundleType,version:pa.version,rendererPackageName:pa.rendererPackageName,rendererConfig:pa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Hi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Lv(t),t===null?null:t.stateNode},findFiberByHostInstance:pa.findFiberByHostInstance||cw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&(ma=__REACT_DEVTOOLS_GLOBAL_HOOK__,!ma.isDisabled&&ma.supportsFiber))try{Wc=ma.inject(dw),xi=ma}catch{}var ma;Ln.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=hw;Ln.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Wf(e))throw Error(re(200));return lw(t,e,null,n)};Ln.createRoot=function(t,e){if(!Wf(t))throw Error(re(299));var n=!1,i="",r=h_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Vf(t,1,!1,null,null,n,!1,i,r),t[Bi]=e.current,ka(t.nodeType===8?t.parentNode:t),new Gf(e)};Ln.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(re(188)):(t=Object.keys(t).join(","),Error(re(268,t)));return t=Lv(e),t=t===null?null:t.stateNode,t};Ln.flushSync=function(t){return os(t)};Ln.hydrate=function(t,e,n){if(!iu(e))throw Error(re(200));return ru(null,t,e,!0,n)};Ln.hydrateRoot=function(t,e,n){if(!Wf(t))throw Error(re(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=h_;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=u_(e,null,t,1,n!=null?n:null,r,!1,s,o),t[Bi]=e.current,ka(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new nu(e)};Ln.render=function(t,e,n){if(!iu(e))throw Error(re(200));return ru(null,t,e,!1,n)};Ln.unmountComponentAtNode=function(t){if(!iu(t))throw Error(re(40));return t._reactRootContainer?(os(function(){ru(null,null,t,!1,function(){t._reactRootContainer=null,t[Bi]=null})}),!0):!1};Ln.unstable_batchedUpdates=kf;Ln.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!iu(n))throw Error(re(200));if(t==null||t._reactInternals===void 0)throw Error(re(38));return ru(t,e,n,!1,i)};Ln.version="18.3.1-next-f1338f8080-20240426"});var m_=Ni((C2,p_)=>{"use strict";function f_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f_)}catch(t){console.error(t)}}f_(),p_.exports=d_()});var v_=Ni(Xf=>{"use strict";var g_=m_();Xf.createRoot=g_.createRoot,Xf.hydrateRoot=g_.hydrateRoot;var R2});var pM=Ni(yh=>{"use strict";var JR=An(),KR=Symbol.for("react.element"),jR=Symbol.for("react.fragment"),QR=Object.prototype.hasOwnProperty,e2=JR.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,t2={key:!0,ref:!0,__self:!0,__source:!0};function fM(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)QR.call(e,i)&&!t2.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:KR,type:t,key:s,ref:o,props:r,_owner:e2.current}}yh.Fragment=jR;yh.jsx=fM;yh.jsxs=fM});var Gt=Ni((eP,mM)=>{"use strict";mM.exports=pM()});var XP=lt(An()),BM=lt(v_());var Lt=lt(An());var Gi=null,Ka=null,su=!0;try{su=localStorage.getItem("baghchal.sound")!=="off"}catch{}function Yf(){if(!su)return null;let t=window.AudioContext||window.webkitAudioContext;if(!t)return null;if(!Gi){try{Gi=new t}catch{return null}Ka=Gi.createGain(),Ka.gain.value=.5,Ka.connect(Gi.destination)}return Gi.state==="suspended"&&Gi.resume().catch(()=>{}),Gi.state==="running"||Gi.state==="suspended"?Gi:null}function ou(){Yf()}function __(){return su}function x_(t){su=t;try{localStorage.setItem("baghchal.sound",t?"on":"off")}catch{}t&&Yf()}function Si(t,{type:e="sine",from:n,to:i=n,at:r=0,dur:s,gain:o}){let a=t.currentTime+r,l=t.createOscillator(),c=t.createGain();l.type=e,l.frequency.setValueAtTime(n,a),i!==n&&l.frequency.exponentialRampToValueAtTime(i,a+s),c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(o,a+.006),c.gain.exponentialRampToValueAtTime(1e-4,a+s),l.connect(c).connect(Ka),l.start(a),l.stop(a+s+.02)}function Ja(t,{at:e=0,dur:n=.07,gain:i=.3,freq:r=1400,q:s=1.2}){let o=t.currentTime+e,a=Math.ceil(t.sampleRate*n),l=t.createBuffer(1,a,t.sampleRate),c=l.getChannelData(0);for(let p=0;p<a;p++)c[p]=(Math.random()*2-1)*Math.pow(1-p/a,3);let u=t.createBufferSource();u.buffer=l;let d=t.createBiquadFilter();d.type="bandpass",d.frequency.value=r,d.Q.value=s;let f=t.createGain();f.gain.value=i,u.connect(d).connect(f).connect(Ka),u.start(o)}var y_={select:t=>{Ja(t,{dur:.03,gain:.16,freq:2600,q:2})},place:t=>{Ja(t,{gain:.34,freq:1500}),Si(t,{from:210,to:120,dur:.11,gain:.3})},step:t=>{Ja(t,{gain:.3,freq:1100}),Si(t,{from:170,to:95,dur:.12,gain:.34})},capture:t=>{Ja(t,{gain:.42,freq:800,dur:.09}),Si(t,{from:130,to:62,dur:.22,gain:.46}),Si(t,{type:"triangle",from:1180,at:.02,dur:.5,gain:.05})},button:t=>{Ja(t,{dur:.025,gain:.1,freq:3200,q:3})},start:t=>{Si(t,{from:392,dur:1.3,gain:.1}),Si(t,{from:587.3,at:.14,dur:1.5,gain:.08}),Si(t,{from:1176,at:.14,dur:.9,gain:.02})},end:t=>{Si(t,{from:293.7,dur:2.2,gain:.1}),Si(t,{from:440,at:.22,dur:2.2,gain:.08}),Si(t,{from:587.3,at:.44,dur:2.4,gain:.07})}};function Wi(t){let e=Yf();if(!(!e||!y_[t]))try{y_[t](e)}catch{}}var ot=lt(An());async function po(t,e){let n;try{n=await fetch(t,e===void 0?{}:{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}catch{throw new Error("Can't reach the engine. Start it with: python -m web.server")}let i=null;try{i=await n.json()}catch{}if(!n.ok)throw new Error(i&&i.error||`The engine answered ${n.status}.`);return i}var qf={alphabeta:6,minimax:5},M_=t=>t==="GOAT"?"TIGER":"GOAT",ja=(t,e,n)=>`${t} ${t===1?e:n}`,wi=t=>t==="GOAT"?"Goats":"Tigers",Xi=(t,e=0)=>Number(t).toLocaleString("en-US",{maximumFractionDigits:e});function Dn(t){let e=/^G@(\d+)$/.exec(t);return e?{side:"GOAT",from:-1,over:-1,to:+e[1]}:(e=/^([GT]) (\d+)-(\d+)$/.exec(t),e?{side:e[1]==="G"?"GOAT":"TIGER",from:+e[2],over:-1,to:+e[3]}:(e=/^T (\d+)x(\d+)>(\d+)$/.exec(t),e?{side:"TIGER",from:+e[1],over:+e[2],to:+e[3]}:null))}function Yi(t){let e=Dn(t);return e?e.from<0?`places on ${e.to}`:e.over>=0?`${e.from} takes ${e.over}, lands ${e.to}`:`${e.from} to ${e.to}`:t}function $f(t){return Math.abs(Number(t))>1e6/2}function Qa(t){let e=Number(t);if($f(e)){let n=1e6-Math.abs(e);return`${e>0?"Tigers":"Goats"} win in ${ja(n,"ply","plies")}`}return(e>0?"+":"")+Xi(e,2)}function S_(t){let e=t.map(n=>n===2?"T":n===1?"G":".");return[0,1,2,3,4].map(n=>e.slice(n*5,n*5+5).join("")).join("/")}var mo=t=>`${t.id}:${t.moves.length}`,fw={id:0,start:null,startSide:"GOAT",moves:[],notes:{}};function w_(){let[t,e]=(0,ot.useState)(null),[n,i]=(0,ot.useState)({mode:"human",human:"GOAT",depth:3,algorithm:"alphabeta",eval:"designed"}),[r,s]=(0,ot.useState)(!1),[o,a]=(0,ot.useState)(fw),[l,c]=(0,ot.useState)(null),[u,d]=(0,ot.useState)(null),[f,p]=(0,ot.useState)(!1),[g,y]=(0,ot.useState)(null),[m,h]=(0,ot.useState)(null),[v,_]=(0,ot.useState)(null),[x,C]=(0,ot.useState)(null),[T,A]=(0,ot.useState)(!1),[I,w]=(0,ot.useState)(!0),[M,R]=(0,ot.useState)(null),[k,F]=(0,ot.useState)(null),B=(0,ot.useRef)(o),J=(0,ot.useRef)(n),G=(0,ot.useRef)(0),ie=(0,ot.useRef)(0),W=(0,ot.useRef)(null);B.current=o,J.current=n;let K=n.mode==="auto",fe=!!(l&&l.key===mo(o)),xe=fe&&!l.terminal&&(K||l.to_move!==n.human),De=!!(r&&fe&&!l.terminal&&!K&&l.to_move===n.human&&!f&&!M);(0,ot.useEffect)(()=>{po("/api/topology").then(e).catch(Z=>_(Z.message))},[]),(0,ot.useEffect)(()=>{let Z=mo(o);po("/api/state",{start:o.start,moves:o.moves}).then(E=>{mo(B.current)===Z&&c({...E,key:Z})}).catch(E=>_(E.message))},[o]),(0,ot.useEffect)(()=>{if(!M){F(null);return}let Z=!0;return po("/api/state",{start:B.current.start,moves:M.moves}).then(E=>{Z&&F({...E,key:`view:${M.id}`})}).catch(E=>{Z&&(_(E.message),R(null))}),()=>{Z=!1}},[M]);async function Qe(Z){let E=B.current,S=J.current,O=mo(E),q=++G.current;p(!0),_(null);try{let j=await po("/api/search",{start:E.start,moves:E.moves,depth:S.depth,algorithm:S.algorithm,eval:S.eval});if(mo(B.current)!==O)return;Z?(y(j),h(null),a(Y=>({...Y,moves:[...Y.moves,j.move],notes:{...Y.notes,[Y.moves.length]:j}}))):h(j)}catch(j){mo(B.current)===O&&_(j.message)}finally{G.current===q&&p(!1)}}(0,ot.useEffect)(()=>{!r||!xe||f||K&&(T||!I||M)||W.current!==l.key&&(W.current=l.key,Qe(!0))},[l,r,n.human,n.mode,f,T,I,M]);function $(){d(null),h(null),C(null)}function oe(Z){$(),a(E=>({...E,moves:[...E.moves,Z]}))}function Te(Z){if(!De)return null;if(C(null),l.to_move==="GOAT"&&l.in_hand>0){let S=l.legal.find(O=>O.kind==="place"&&O.to===Z);return S?(oe(S.text),"move"):(C(l.board[Z]?`Point ${Z} is taken. Place the goat on an empty point.`:null),null)}if(u!==null){let S=l.legal.find(O=>O.from===u&&O.to===Z);if(S)return oe(S.text),"move"}let E=l.to_move==="GOAT"?1:2;return l.board[Z]===E?l.legal.some(S=>S.from===Z)?(d(Z===u?null:Z),"select"):(d(null),C(`The ${E===1?"goat":"tiger"} on point ${Z} has no legal move.`),null):(u!==null&&C("That piece can't go there. The marked points are its legal moves."),d(null),null)}function he(){G.current++,W.current=null,p(!1)}function Ne(Z=null,E="GOAT"){he(),$(),y(null),_(null),R(null),A(!1),a(S=>({id:S.id+1,start:Z,startSide:E,moves:[],notes:{}}))}function Fe(Z){i(E=>({...E,...Z})),Ne(),s(!0)}function Oe(){he(),$(),_(null),R(null);let Z=B.current,E=[...Z.moves],S=j=>j%2===0?Z.startSide:M_(Z.startSide);for(;E.length&&S(E.length-1)!==J.current.human;)E.pop();E.length&&E.pop();let O=Object.fromEntries(Object.entries(Z.notes).filter(([j])=>Number(j)<E.length)),q=Object.keys(O).map(Number).sort((j,Y)=>Y-j)[0];y(q===void 0?null:O[q]),a({...Z,id:Z.id+1,moves:E,notes:O})}async function Ke(Z){let E=await po("/api/state",{start:Z,moves:[]});Ne(Z,E.to_move),s(!0)}function Q(Z){let E=B.current,S=Math.max(0,Math.min(E.moves.length,Z));d(null),S===E.moves.length?R(null):R({id:++ie.current,kind:"review",moves:E.moves.slice(0,S),index:S})}function le(Z,E){if(!Z||!E){R(null);return}let O=B.current.moves.slice(0,Z.at);d(null),R({id:++ie.current,kind:"line",moves:[...O,...Z.pv.slice(0,E)],index:E,total:Z.pv.length,result:Z})}let P=(Z,E)=>Z?{...Z,at:E}:null,Ae=(0,ot.useMemo)(()=>{if(!g)return null;let Z=Object.entries(o.notes).find(([,E])=>E===g);return P(g,Z?Number(Z[0]):Math.max(0,o.moves.length-1))},[g,o]),ne=(0,ot.useMemo)(()=>P(m,o.moves.length),[m,o.moves.length]),Me=M?k&&k.key===`view:${M.id}`?k:null:fe?l:null,de=M?M.moves:o.moves,Ue=Me&&de.length?Dn(de[de.length-1]):null;return{topo:t,config:n,setConfig:i,started:r,setStarted:s,game:o,pos:fe?l:null,selected:u,setSelected:d,thinking:f,agentSearch:Ae,hintSearch:ne,error:v,notice:x,setNotice:C,paused:T,setPaused:A,settled:I,setSettled:w,view:M,shownPos:Me,shownMoves:de,lastMove:Ue,humanTurn:De,auto:K,agentStuck:!!(r&&xe&&!f&&v),onPoint:Te,play:oe,search:Qe,reset:Ne,begin:Fe,undo:Oe,loadPosition:Ke,reviewAt:Q,previewLine:le,clearHint:()=>h(null)}}var jm="170";var pw=0,E_=1,mw=2;var Dx=1,Qm=2,ji=3,Hr=0,un=1,Qi=2,Br=0,Lo=1,b_=2,T_=3,A_=4,gw=5,gs=100,vw=101,yw=102,_w=103,xw=104,Mw=200,Sw=201,ww=202,Ew=203,Cp=204,Rp=205,bw=206,Tw=207,Aw=208,Cw=209,Rw=210,Pw=211,Iw=212,Nw=213,Lw=214,Pp=0,Ip=1,Np=2,ko=3,Lp=4,Dp=5,Up=6,Op=7,Ux=0,Dw=1,Uw=2,zr=0,Ow=1,kw=2,Fw=3,Cl=4,Bw=5,zw=6,Vw=7;var Ox=300,Fo=301,Bo=302,kp=303,Fp=304,hh=306,zo=1e3,_s=1001,Bp=1002,hi=1003,Hw=1004;var lu=1005;var bi=1006,Zf=1007;var xs=1008;var rr=1009,kx=1010,Fx=1011,fl=1012,eg=1013,Ms=1014,er=1015,Rl=1016,tg=1017,ng=1018,Vo=1020,Bx=35902,zx=1021,Vx=1022,ui=1023,Hx=1024,Gx=1025,Do=1026,Ho=1027,Wx=1028,ig=1029,Xx=1030,rg=1031;var sg=1033,Lu=33776,Du=33777,Uu=33778,Ou=33779,zp=35840,Vp=35841,Hp=35842,Gp=35843,Wp=36196,Xp=37492,Yp=37496,qp=37808,$p=37809,Zp=37810,Jp=37811,Kp=37812,jp=37813,Qp=37814,em=37815,tm=37816,nm=37817,im=37818,rm=37819,sm=37820,om=37821,ku=36492,am=36494,lm=36495,Yx=36283,cm=36284,um=36285,hm=36286;var Fu=2300,dm=2301,Jf=2302,C_=2400,R_=2401,P_=2402;var Gw=3200,Ww=3201;var qx=0,Xw=1,Fr="",qt="srgb",Zo="srgb-linear",dh="linear",ut="srgb";var go=7680;var I_=519,Yw=512,qw=513,$w=514,$x=515,Zw=516,Jw=517,Kw=518,jw=519,N_=35044;var L_="300 es",tr=2e3,Bu=2001,Gr=class{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let i=this._listeners[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],D_=1234567,ll=Math.PI/180,Go=180/Math.PI;function Ps(){let t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ln[t&255]+ln[t>>8&255]+ln[t>>16&255]+ln[t>>24&255]+"-"+ln[e&255]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[n&63|128]+ln[n>>8&255]+"-"+ln[n>>16&255]+ln[n>>24&255]+ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]).toLowerCase()}function Bt(t,e,n){return Math.max(e,Math.min(n,t))}function og(t,e){return(t%e+e)%e}function Qw(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function eE(t,e,n){return t!==e?(n-t)/(e-t):0}function cl(t,e,n){return(1-n)*t+n*e}function tE(t,e,n,i){return cl(t,e,1-Math.exp(-n*i))}function nE(t,e=1){return e-Math.abs(og(t,e*2)-e)}function iE(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function rE(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function sE(t,e){return t+Math.floor(Math.random()*(e-t+1))}function oE(t,e){return t+Math.random()*(e-t)}function aE(t){return t*(.5-Math.random())}function lE(t){t!==void 0&&(D_=t);let e=D_+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function cE(t){return t*ll}function uE(t){return t*Go}function hE(t){return(t&t-1)===0&&t!==0}function dE(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function fE(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function pE(t,e,n,i,r){let s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),u=o((e+i)/2),d=s((e-i)/2),f=o((e-i)/2),p=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":t.set(a*u,l*d,l*f,a*c);break;case"YZY":t.set(l*f,a*u,l*d,a*c);break;case"ZXZ":t.set(l*d,l*f,a*u,a*c);break;case"XZX":t.set(a*u,l*g,l*p,a*c);break;case"YXY":t.set(l*p,a*u,l*g,a*c);break;case"ZYZ":t.set(l*g,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Po(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function gn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}var Zx={DEG2RAD:ll,RAD2DEG:Go,generateUUID:Ps,clamp:Bt,euclideanModulo:og,mapLinear:Qw,inverseLerp:eE,lerp:cl,damp:tE,pingpong:nE,smoothstep:iE,smootherstep:rE,randInt:sE,randFloat:oE,randFloatSpread:aE,seededRandom:lE,degToRad:cE,radToDeg:uE,isPowerOfTwo:hE,ceilPowerOfTwo:dE,floorPowerOfTwo:fE,setQuaternionFromProperEuler:pE,normalize:gn,denormalize:Po},ce=class t{constructor(e=0,n=0){t.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(e)/n;return Math.acos(Bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){let i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ge=class t{constructor(e,n,i,r,s,o,a,l,c){t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){let i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],p=i[5],g=i[8],y=r[0],m=r[3],h=r[6],v=r[1],_=r[4],x=r[7],C=r[2],T=r[5],A=r[8];return s[0]=o*y+a*v+l*C,s[3]=o*m+a*_+l*T,s[6]=o*h+a*x+l*A,s[1]=c*y+u*v+d*C,s[4]=c*m+u*_+d*T,s[7]=c*h+u*x+d*A,s[2]=f*y+p*v+g*C,s[5]=f*m+p*_+g*T,s[8]=f*h+p*x+g*A,this}multiplyScalar(e){let n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){let e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*o*u-n*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){let e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,p=c*s-o*l,g=n*d+i*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=d*y,e[1]=(r*c-u*i)*y,e[2]=(a*i-r*o)*y,e[3]=f*y,e[4]=(u*n-r*l)*y,e[5]=(r*s-a*n)*y,e[6]=p*y,e[7]=(i*l-c*n)*y,e[8]=(o*n-i*s)*y,this}transpose(){let e,n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Kf.makeScale(e,n)),this}rotate(e){return this.premultiply(Kf.makeRotation(-e)),this}translate(e,n){return this.premultiply(Kf.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){let n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){let n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){let i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Kf=new Ge;function Jx(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function zu(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function mE(){let t=zu("canvas");return t.style.display="block",t}var U_={};function ol(t){t in U_||(U_[t]=!0,console.warn(t))}function gE(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function vE(t){let e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function yE(t){let e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var tt={enabled:!0,workingColorSpace:Zo,spaces:{},convert:function(t,e,n){return this.enabled===!1||e===n||!e||!n||(this.spaces[e].transfer===ut&&(t.r=ir(t.r),t.g=ir(t.g),t.b=ir(t.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(t.applyMatrix3(this.spaces[e].toXYZ),t.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===ut&&(t.r=Uo(t.r),t.g=Uo(t.g),t.b=Uo(t.b))),t},fromWorkingColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this.workingColorSpace)},getPrimaries:function(t){return this.spaces[t].primaries},getTransfer:function(t){return t===Fr?dh:this.spaces[t].transfer},getLuminanceCoefficients:function(t,e=this.workingColorSpace){return t.fromArray(this.spaces[e].luminanceCoefficients)},define:function(t){Object.assign(this.spaces,t)},_getMatrix:function(t,e,n){return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(t){return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(t=this.workingColorSpace){return this.spaces[t].workingColorSpaceConfig.unpackColorSpace}};function ir(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Uo(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}var O_=[.64,.33,.3,.6,.15,.06],k_=[.2126,.7152,.0722],F_=[.3127,.329],B_=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),z_=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);tt.define({[Zo]:{primaries:O_,whitePoint:F_,transfer:dh,toXYZ:B_,fromXYZ:z_,luminanceCoefficients:k_,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:O_,whitePoint:F_,transfer:ut,toXYZ:B_,fromXYZ:z_,luminanceCoefficients:k_,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}});var vo,fm=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vo===void 0&&(vo=zu("canvas")),vo.width=e.width,vo.height=e.height;let i=vo.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=vo}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let n=zu("canvas");n.width=e.width,n.height=e.height;let i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ir(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){let n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ir(n[i]/255)*255):n[i]=ir(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},_E=0,Vu=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_E++}),this.uuid=Ps(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(jf(r[o].image)):s.push(jf(r[o]))}else s=jf(r);i.url=s}return n||(e.images[this.uuid]=i),i}};function jf(t){return typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap?fm.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var xE=0,kn=class t extends Gr{constructor(e=t.DEFAULT_IMAGE,n=t.DEFAULT_MAPPING,i=_s,r=_s,s=bi,o=xs,a=ui,l=rr,c=t.DEFAULT_ANISOTROPY,u=Fr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xE++}),this.uuid=Ps(),this.name="",this.source=new Vu(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ox)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zo:e.x=e.x-Math.floor(e.x);break;case _s:e.x=e.x<0?0:1;break;case Bp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zo:e.y=e.y-Math.floor(e.y);break;case _s:e.y=e.y<0?0:1;break;case Bp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};kn.DEFAULT_IMAGE=null;kn.DEFAULT_MAPPING=Ox;kn.DEFAULT_ANISOTROPY=1;var ht=class t{constructor(e=0,n=0,i=0,r=1){t.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s,l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],p=l[5],g=l[9],y=l[2],m=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let _=(c+1)/2,x=(p+1)/2,C=(h+1)/2,T=(u+f)/4,A=(d+y)/4,I=(g+m)/4;return _>x&&_>C?_<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(_),r=T/i,s=A/i):x>C?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=T/r,s=I/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=A/s,r=I/s),this.set(i,r,s,n),this}let v=Math.sqrt((m-g)*(m-g)+(d-y)*(d-y)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-y)/v,this.z=(f-u)/v,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){let n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},pm=class extends Gr{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new ht(0,0,e,n),this.scissorTest=!1,this.viewport=new ht(0,0,e,n);let r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let s=new kn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let n=Object.assign({},e.texture.image);return this.texture.source=new Vu(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},sr=class extends pm{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}},Hu=class extends kn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=hi,this.minFilter=hi,this.wrapR=_s,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var mm=class extends kn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=hi,this.minFilter=hi,this.wrapR=_s,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ti=class{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],f=s[o+0],p=s[o+1],g=s[o+2],y=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d;return}if(a===1){e[n+0]=f,e[n+1]=p,e[n+2]=g,e[n+3]=y;return}if(d!==y||l!==f||c!==p||u!==g){let m=1-a,h=l*f+c*p+u*g+d*y,v=h>=0?1:-1,_=1-h*h;if(_>Number.EPSILON){let C=Math.sqrt(_),T=Math.atan2(C,h*v);m=Math.sin(m*T)/C,a=Math.sin(a*T)/C}let x=a*v;if(l=l*m+f*x,c=c*m+p*x,u=u*m+g*x,d=d*m+y*x,m===1-a){let C=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=C,c*=C,u*=C,d*=C}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){let a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],f=s[o+1],p=s[o+2],g=s[o+3];return e[n]=a*g+u*d+l*p-c*f,e[n+1]=l*g+u*f+c*d-a*p,e[n+2]=c*g+u*p+a*f-l*d,e[n+3]=u*g-a*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),f=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*p*g,this._y=c*p*d-f*u*g,this._z=c*u*g+f*p*d,this._w=c*u*d-f*p*g;break;case"YXZ":this._x=f*u*d+c*p*g,this._y=c*p*d-f*u*g,this._z=c*u*g-f*p*d,this._w=c*u*d+f*p*g;break;case"ZXY":this._x=f*u*d-c*p*g,this._y=c*p*d+f*u*g,this._z=c*u*g+f*p*d,this._w=c*u*d-f*p*g;break;case"ZYX":this._x=f*u*d-c*p*g,this._y=c*p*d+f*u*g,this._z=c*u*g-f*p*d,this._w=c*u*d+f*p*g;break;case"YZX":this._x=f*u*d+c*p*g,this._y=c*p*d+f*u*g,this._z=c*u*g-f*p*d,this._w=c*u*d-f*p*g;break;case"XZY":this._x=f*u*d-c*p*g,this._y=c*p*d-f*u*g,this._z=c*u*g+f*p*d,this._w=c*u*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){let i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],u=n[6],d=n[10],f=i+a+d;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>d){let p=2*Math.sqrt(1+i-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>d){let p=2*Math.sqrt(1+a-i-d);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Bt(this.dot(e),-1,1)))}rotateTowards(e,n){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){let i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);let i=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-n)*u)/c,f=Math.sin(n*u)/c;return this._w=o*d+this._w*f,this._x=i*d+this._x*f,this._y=r*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){let e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class t{constructor(e=0,n=0,i=0){t.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(V_.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(V_.setFromAxisAngle(e,n))}applyMatrix3(e){let n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){let i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){let n=e.lengthSq();if(n===0)return this.set(0,0,0);let i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Qf.copy(this).projectOnVector(e),this.sub(Qf)}reflect(e){return this.sub(Qf.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(e)/n;return Math.acos(Bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){let r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){let n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){let n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Qf=new N,V_=new Ti,Ss=class{constructor(e=new N(1/0,1/0,1/0),n=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(oi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(oi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){let i=oi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,oi):oi.fromBufferAttribute(s,o),oi.applyMatrix4(e.matrixWorld),this.expandByPoint(oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),cu.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),cu.copy(i.boundingBox)),cu.applyMatrix4(e.matrixWorld),this.union(cu)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,oi),oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(tl),uu.subVectors(this.max,tl),yo.subVectors(e.a,tl),_o.subVectors(e.b,tl),xo.subVectors(e.c,tl),Nr.subVectors(_o,yo),Lr.subVectors(xo,_o),cs.subVectors(yo,xo);let n=[0,-Nr.z,Nr.y,0,-Lr.z,Lr.y,0,-cs.z,cs.y,Nr.z,0,-Nr.x,Lr.z,0,-Lr.x,cs.z,0,-cs.x,-Nr.y,Nr.x,0,-Lr.y,Lr.x,0,-cs.y,cs.x,0];return!ep(n,yo,_o,xo,uu)||(n=[1,0,0,0,1,0,0,0,1],!ep(n,yo,_o,xo,uu))?!1:(hu.crossVectors(Nr,Lr),n=[hu.x,hu.y,hu.z],ep(n,yo,_o,xo,uu))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},qi=[new N,new N,new N,new N,new N,new N,new N,new N],oi=new N,cu=new Ss,yo=new N,_o=new N,xo=new N,Nr=new N,Lr=new N,cs=new N,tl=new N,uu=new N,hu=new N,us=new N;function ep(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){us.fromArray(t,s);let a=r.x*Math.abs(us.x)+r.y*Math.abs(us.y)+r.z*Math.abs(us.z),l=e.dot(us),c=n.dot(us),u=i.dot(us);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var ME=new Ss,nl=new N,tp=new N,pl=class{constructor(e=new N,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){let i=this.center;n!==void 0?i.copy(n):ME.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){let i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;nl.subVectors(e,this.center);let n=nl.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(nl,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(tp.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(nl.copy(e.center).add(tp)),this.expandByPoint(nl.copy(e.center).sub(tp))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},$i=new N,np=new N,du=new N,Dr=new N,ip=new N,fu=new N,rp=new N,Gu=class{constructor(e=new N,n=new N(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$i)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let n=$i.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):($i.copy(this.origin).addScaledVector(this.direction,n),$i.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){np.copy(e).add(n).multiplyScalar(.5),du.copy(n).sub(e).normalize(),Dr.copy(this.origin).sub(np);let s=e.distanceTo(n)*.5,o=-this.direction.dot(du),a=Dr.dot(this.direction),l=-Dr.dot(du),c=Dr.lengthSq(),u=Math.abs(1-o*o),d,f,p,g;if(u>0)if(d=o*l-a,f=o*a-l,g=s*u,d>=0)if(f>=-g)if(f<=g){let y=1/u;d*=y,f*=y,p=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(np).addScaledVector(du,f),p}intersectSphere(e,n){$i.subVectors(e.center,this.origin);let i=$i.dot(this.direction),r=$i.dot($i)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){let i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){let n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,$i)!==null}intersectTriangle(e,n,i,r,s){ip.subVectors(n,e),fu.subVectors(i,e),rp.crossVectors(ip,fu);let o=this.direction.dot(rp),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Dr.subVectors(this.origin,e);let l=a*this.direction.dot(fu.crossVectors(Dr,fu));if(l<0)return null;let c=a*this.direction.dot(ip.cross(Dr));if(c<0||l+c>o)return null;let u=-a*Dr.dot(rp);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},yt=class t{constructor(e,n,i,r,s,o,a,l,c,u,d,f,p,g,y,m){t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,u,d,f,p,g,y,m)}set(e,n,i,r,s,o,a,l,c,u,d,f,p,g,y,m){let h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=g,h[11]=y,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new t().fromArray(this.elements)}copy(e){let n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){let n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){let n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){let n=this.elements,i=e.elements,r=1/Mo.setFromMatrixColumn(e,0).length(),s=1/Mo.setFromMatrixColumn(e,1).length(),o=1/Mo.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){let n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=o*u,p=o*d,g=a*u,y=a*d;n[0]=l*u,n[4]=-l*d,n[8]=c,n[1]=p+g*c,n[5]=f-y*c,n[9]=-a*l,n[2]=y-f*c,n[6]=g+p*c,n[10]=o*l}else if(e.order==="YXZ"){let f=l*u,p=l*d,g=c*u,y=c*d;n[0]=f+y*a,n[4]=g*a-p,n[8]=o*c,n[1]=o*d,n[5]=o*u,n[9]=-a,n[2]=p*a-g,n[6]=y+f*a,n[10]=o*l}else if(e.order==="ZXY"){let f=l*u,p=l*d,g=c*u,y=c*d;n[0]=f-y*a,n[4]=-o*d,n[8]=g+p*a,n[1]=p+g*a,n[5]=o*u,n[9]=y-f*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){let f=o*u,p=o*d,g=a*u,y=a*d;n[0]=l*u,n[4]=g*c-p,n[8]=f*c+y,n[1]=l*d,n[5]=y*c+f,n[9]=p*c-g,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){let f=o*l,p=o*c,g=a*l,y=a*c;n[0]=l*u,n[4]=y-f*d,n[8]=g*d+p,n[1]=d,n[5]=o*u,n[9]=-a*u,n[2]=-c*u,n[6]=p*d+g,n[10]=f-y*d}else if(e.order==="XZY"){let f=o*l,p=o*c,g=a*l,y=a*c;n[0]=l*u,n[4]=-d,n[8]=c*u,n[1]=f*d+y,n[5]=o*u,n[9]=p*d-g,n[2]=g*d-p,n[6]=a*u,n[10]=y*d+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(SE,e,wE)}lookAt(e,n,i){let r=this.elements;return Un.subVectors(e,n),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),Ur.crossVectors(i,Un),Ur.lengthSq()===0&&(Math.abs(i.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),Ur.crossVectors(i,Un)),Ur.normalize(),pu.crossVectors(Un,Ur),r[0]=Ur.x,r[4]=pu.x,r[8]=Un.x,r[1]=Ur.y,r[5]=pu.y,r[9]=Un.y,r[2]=Ur.z,r[6]=pu.z,r[10]=Un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){let i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],p=i[13],g=i[2],y=i[6],m=i[10],h=i[14],v=i[3],_=i[7],x=i[11],C=i[15],T=r[0],A=r[4],I=r[8],w=r[12],M=r[1],R=r[5],k=r[9],F=r[13],B=r[2],J=r[6],G=r[10],ie=r[14],W=r[3],K=r[7],fe=r[11],xe=r[15];return s[0]=o*T+a*M+l*B+c*W,s[4]=o*A+a*R+l*J+c*K,s[8]=o*I+a*k+l*G+c*fe,s[12]=o*w+a*F+l*ie+c*xe,s[1]=u*T+d*M+f*B+p*W,s[5]=u*A+d*R+f*J+p*K,s[9]=u*I+d*k+f*G+p*fe,s[13]=u*w+d*F+f*ie+p*xe,s[2]=g*T+y*M+m*B+h*W,s[6]=g*A+y*R+m*J+h*K,s[10]=g*I+y*k+m*G+h*fe,s[14]=g*w+y*F+m*ie+h*xe,s[3]=v*T+_*M+x*B+C*W,s[7]=v*A+_*R+x*J+C*K,s[11]=v*I+_*k+x*G+C*fe,s[15]=v*w+_*F+x*ie+C*xe,this}multiplyScalar(e){let n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){let e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],p=e[14],g=e[3],y=e[7],m=e[11],h=e[15];return g*(+s*l*d-r*c*d-s*a*f+i*c*f+r*a*p-i*l*p)+y*(+n*l*p-n*c*f+s*o*f-r*o*p+r*c*u-s*l*u)+m*(+n*c*d-n*a*p-s*o*d+i*o*p+s*a*u-i*c*u)+h*(-r*a*u-n*l*d+n*a*f+r*o*d-i*o*f+i*l*u)}transpose(){let e=this.elements,n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){let e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],p=e[11],g=e[12],y=e[13],m=e[14],h=e[15],v=d*m*c-y*f*c+y*l*p-a*m*p-d*l*h+a*f*h,_=g*f*c-u*m*c-g*l*p+o*m*p+u*l*h-o*f*h,x=u*y*c-g*d*c+g*a*p-o*y*p-u*a*h+o*d*h,C=g*d*l-u*y*l-g*a*f+o*y*f+u*a*m-o*d*m,T=n*v+i*_+r*x+s*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/T;return e[0]=v*A,e[1]=(y*f*s-d*m*s-y*r*p+i*m*p+d*r*h-i*f*h)*A,e[2]=(a*m*s-y*l*s+y*r*c-i*m*c-a*r*h+i*l*h)*A,e[3]=(d*l*s-a*f*s-d*r*c+i*f*c+a*r*p-i*l*p)*A,e[4]=_*A,e[5]=(u*m*s-g*f*s+g*r*p-n*m*p-u*r*h+n*f*h)*A,e[6]=(g*l*s-o*m*s-g*r*c+n*m*c+o*r*h-n*l*h)*A,e[7]=(o*f*s-u*l*s+u*r*c-n*f*c-o*r*p+n*l*p)*A,e[8]=x*A,e[9]=(g*d*s-u*y*s-g*i*p+n*y*p+u*i*h-n*d*h)*A,e[10]=(o*y*s-g*a*s+g*i*c-n*y*c-o*i*h+n*a*h)*A,e[11]=(u*a*s-o*d*s-u*i*c+n*d*c+o*i*p-n*a*p)*A,e[12]=C*A,e[13]=(u*y*r-g*d*r+g*i*f-n*y*f-u*i*m+n*d*m)*A,e[14]=(g*a*r-o*y*r-g*i*l+n*y*l+o*i*m-n*a*m)*A,e[15]=(o*d*r-u*a*r+u*i*l-n*d*l-o*i*f+n*a*f)*A,this}scale(e){let n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){let n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){let n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){let n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){let i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){let r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,u=o+o,d=a+a,f=s*c,p=s*u,g=s*d,y=o*u,m=o*d,h=a*d,v=l*c,_=l*u,x=l*d,C=i.x,T=i.y,A=i.z;return r[0]=(1-(y+h))*C,r[1]=(p+x)*C,r[2]=(g-_)*C,r[3]=0,r[4]=(p-x)*T,r[5]=(1-(f+h))*T,r[6]=(m+v)*T,r[7]=0,r[8]=(g+_)*A,r[9]=(m-v)*A,r[10]=(1-(f+y))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){let r=this.elements,s=Mo.set(r[0],r[1],r[2]).length(),o=Mo.set(r[4],r[5],r[6]).length(),a=Mo.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ai.copy(this);let c=1/s,u=1/o,d=1/a;return ai.elements[0]*=c,ai.elements[1]*=c,ai.elements[2]*=c,ai.elements[4]*=u,ai.elements[5]*=u,ai.elements[6]*=u,ai.elements[8]*=d,ai.elements[9]*=d,ai.elements[10]*=d,n.setFromRotationMatrix(ai),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=tr){let l=this.elements,c=2*s/(n-e),u=2*s/(i-r),d=(n+e)/(n-e),f=(i+r)/(i-r),p,g;if(a===tr)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Bu)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=tr){let l=this.elements,c=1/(n-e),u=1/(i-r),d=1/(o-s),f=(n+e)*c,p=(i+r)*u,g,y;if(a===tr)g=(o+s)*d,y=-2*d;else if(a===Bu)g=s*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){let i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}},Mo=new N,ai=new yt,SE=new N(0,0,0),wE=new N(1,1,1),Ur=new N,pu=new N,Un=new N,H_=new yt,G_=new Ti,qn=class t{constructor(e=0,n=0,i=0,r=t.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Bt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Bt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Bt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Bt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return H_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(H_,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return G_.setFromEuler(this),this.setFromQuaternion(G_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};qn.DEFAULT_ORDER="XYZ";var ml=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},EE=0,W_=new N,So=new Ti,Zi=new yt,mu=new N,il=new N,bE=new N,TE=new Ti,X_=new N(1,0,0),Y_=new N(0,1,0),q_=new N(0,0,1),$_={type:"added"},AE={type:"removed"},wo={type:"childadded",child:null},sp={type:"childremoved",child:null},Kt=class t extends Gr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:EE++}),this.uuid=Ps(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=t.DEFAULT_UP.clone();let e=new N,n=new qn,i=new Ti,r=new N(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new yt},normalMatrix:{value:new Ge}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ml,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return So.setFromAxisAngle(e,n),this.quaternion.multiply(So),this}rotateOnWorldAxis(e,n){return So.setFromAxisAngle(e,n),this.quaternion.premultiply(So),this}rotateX(e){return this.rotateOnAxis(X_,e)}rotateY(e){return this.rotateOnAxis(Y_,e)}rotateZ(e){return this.rotateOnAxis(q_,e)}translateOnAxis(e,n){return W_.copy(e).applyQuaternion(this.quaternion),this.position.add(W_.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(X_,e)}translateY(e){return this.translateOnAxis(Y_,e)}translateZ(e){return this.translateOnAxis(q_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?mu.copy(e):mu.set(e,n,i);let r=this.parent;this.updateWorldMatrix(!0,!1),il.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zi.lookAt(il,mu,this.up):Zi.lookAt(mu,il,this.up),this.quaternion.setFromRotationMatrix(Zi),r&&(Zi.extractRotation(r.matrixWorld),So.setFromRotationMatrix(Zi),this.quaternion.premultiply(So.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($_),wo.child=e,this.dispatchEvent(wo),wo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(AE),sp.child=e,this.dispatchEvent(sp),sp.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($_),wo.child=e,this.dispatchEvent(wo),wo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(il,e,bE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(il,TE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){let n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};Kt.DEFAULT_UP=new N(0,1,0);Kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var li=new N,Ji=new N,op=new N,Ki=new N,Eo=new N,bo=new N,Z_=new N,ap=new N,lp=new N,cp=new N,up=new ht,hp=new ht,dp=new ht,vs=class t{constructor(e=new N,n=new N,i=new N){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),li.subVectors(e,n),r.cross(li);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){li.subVectors(r,n),Ji.subVectors(i,n),op.subVectors(e,n);let o=li.dot(li),a=li.dot(Ji),l=li.dot(op),c=Ji.dot(Ji),u=Ji.dot(op),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;let f=1/d,p=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ki)===null?!1:Ki.x>=0&&Ki.y>=0&&Ki.x+Ki.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,Ki)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ki.x),l.addScaledVector(o,Ki.y),l.addScaledVector(a,Ki.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return up.setScalar(0),hp.setScalar(0),dp.setScalar(0),up.fromBufferAttribute(e,n),hp.fromBufferAttribute(e,i),dp.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(up,s.x),o.addScaledVector(hp,s.y),o.addScaledVector(dp,s.z),o}static isFrontFacing(e,n,i,r){return li.subVectors(i,n),Ji.subVectors(e,n),li.cross(Ji).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return li.subVectors(this.c,this.b),Ji.subVectors(this.a,this.b),li.cross(Ji).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return t.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return t.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return t.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return t.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return t.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){let i=this.a,r=this.b,s=this.c,o,a;Eo.subVectors(r,i),bo.subVectors(s,i),ap.subVectors(e,i);let l=Eo.dot(ap),c=bo.dot(ap);if(l<=0&&c<=0)return n.copy(i);lp.subVectors(e,r);let u=Eo.dot(lp),d=bo.dot(lp);if(u>=0&&d<=u)return n.copy(r);let f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),n.copy(i).addScaledVector(Eo,o);cp.subVectors(e,s);let p=Eo.dot(cp),g=bo.dot(cp);if(g>=0&&p<=g)return n.copy(s);let y=p*c-l*g;if(y<=0&&c>=0&&g<=0)return a=c/(c-g),n.copy(i).addScaledVector(bo,a);let m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return Z_.subVectors(s,r),a=(d-u)/(d-u+(p-g)),n.copy(r).addScaledVector(Z_,a);let h=1/(m+y+f);return o=y*h,a=f*h,n.copy(i).addScaledVector(Eo,o).addScaledVector(bo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Kx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Or={h:0,s:0,l:0},gu={h:0,s:0,l:0};function fp(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}var Ye=class{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=tt.workingColorSpace){return this.r=e,this.g=n,this.b=i,tt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=tt.workingColorSpace){if(e=og(e,1),n=Bt(n,0,1),i=Bt(i,0,1),n===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=fp(o,s,e+1/3),this.g=fp(o,s,e),this.b=fp(o,s,e-1/3)}return tt.toWorkingColorSpace(this,r),this}setStyle(e,n=qt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=qt){let i=Kx[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ir(e.r),this.g=ir(e.g),this.b=ir(e.b),this}copyLinearToSRGB(e){return this.r=Uo(e.r),this.g=Uo(e.g),this.b=Uo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return tt.fromWorkingColorSpace(cn.copy(this),e),Math.round(Bt(cn.r*255,0,255))*65536+Math.round(Bt(cn.g*255,0,255))*256+Math.round(Bt(cn.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=tt.workingColorSpace){tt.fromWorkingColorSpace(cn.copy(this),n);let i=cn.r,r=cn.g,s=cn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=tt.workingColorSpace){return tt.fromWorkingColorSpace(cn.copy(this),n),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=qt){tt.fromWorkingColorSpace(cn.copy(this),e);let n=cn.r,i=cn.g,r=cn.b;return e!==qt?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Or),this.setHSL(Or.h+e,Or.s+n,Or.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Or),e.getHSL(gu);let i=cl(Or.h,gu.h,n),r=cl(Or.s,gu.s,n),s=cl(Or.l,gu.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},cn=new Ye;Ye.NAMES=Kx;var CE=0,ws=class extends Gr{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:CE++}),this.uuid=Ps(),this.name="",this.blending=Lo,this.side=Hr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cp,this.blendDst=Rp,this.blendEquation=gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=ko,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=I_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=go,this.stencilZFail=go,this.stencilZPass=go,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let n in e){let i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}let r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){let n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Lo&&(i.blending=this.blending),this.side!==Hr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Cp&&(i.blendSrc=this.blendSrc),this.blendDst!==Rp&&(i.blendDst=this.blendDst),this.blendEquation!==gs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ko&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==I_&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==go&&(i.stencilFail=this.stencilFail),this.stencilZFail!==go&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==go&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(n){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let n=e.clippingPlanes,i=null;if(n!==null){let r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},or=class extends ws{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=Ux,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Ot=new N,vu=new ce,hn=class{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=N_,this.updateRanges=[],this.gpuType=er,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)vu.fromBufferAttribute(this,n),vu.applyMatrix3(e),this.setXY(n,vu.x,vu.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix3(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix4(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyNormalMatrix(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.transformDirection(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Po(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=gn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Po(n,this.array)),n}setX(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Po(n,this.array)),n}setY(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Po(n,this.array)),n}setZ(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Po(n,this.array)),n}setW(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array),r=gn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array),r=gn(r,this.array),s=gn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==N_&&(e.usage=this.usage),e}};var Wu=class extends hn{constructor(e,n,i){super(new Uint16Array(e),n,i)}};var Xu=class extends hn{constructor(e,n,i){super(new Uint32Array(e),n,i)}};var nt=class extends hn{constructor(e,n,i){super(new Float32Array(e),n,i)}},RE=0,Yn=new yt,pp=new Kt,To=new N,On=new Ss,rl=new Ss,Yt=new N,jt=class t extends Gr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:RE++}),this.uuid=Ps(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jx(e)?Xu:Wu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Ge().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yn.makeRotationFromQuaternion(e),this.applyMatrix4(Yn),this}rotateX(e){return Yn.makeRotationX(e),this.applyMatrix4(Yn),this}rotateY(e){return Yn.makeRotationY(e),this.applyMatrix4(Yn),this}rotateZ(e){return Yn.makeRotationZ(e),this.applyMatrix4(Yn),this}translate(e,n,i){return Yn.makeTranslation(e,n,i),this.applyMatrix4(Yn),this}scale(e,n,i){return Yn.makeScale(e,n,i),this.applyMatrix4(Yn),this}lookAt(e){return pp.lookAt(e),pp.updateMatrix(),this.applyMatrix4(pp.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(To).negate(),this.translate(To.x,To.y,To.z),this}setFromPoints(e){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new nt(i,3))}else{for(let i=0,r=n.count;i<r;i++){let s=e[i];n.setXYZ(i,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ss);let e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){let s=n[i];On.setFromBufferAttribute(s),this.morphTargetsRelative?(Yt.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint(Yt),Yt.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint(Yt)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pl);let e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let i=this.boundingSphere.center;if(On.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){let a=n[s];rl.setFromBufferAttribute(a),this.morphTargetsRelative?(Yt.addVectors(On.min,rl.min),On.expandByPoint(Yt),Yt.addVectors(On.max,rl.max),On.expandByPoint(Yt)):(On.expandByPoint(rl.min),On.expandByPoint(rl.max))}On.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Yt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Yt));if(n)for(let s=0,o=n.length;s<o;s++){let a=n[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Yt.fromBufferAttribute(a,c),l&&(To.fromBufferAttribute(e,c),Yt.add(To)),r=Math.max(r,i.distanceToSquared(Yt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<i.count;I++)a[I]=new N,l[I]=new N;let c=new N,u=new N,d=new N,f=new ce,p=new ce,g=new ce,y=new N,m=new N;function h(I,w,M){c.fromBufferAttribute(i,I),u.fromBufferAttribute(i,w),d.fromBufferAttribute(i,M),f.fromBufferAttribute(s,I),p.fromBufferAttribute(s,w),g.fromBufferAttribute(s,M),u.sub(c),d.sub(c),p.sub(f),g.sub(f);let R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),a[I].add(y),a[w].add(y),a[M].add(y),l[I].add(m),l[w].add(m),l[M].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let I=0,w=v.length;I<w;++I){let M=v[I],R=M.start,k=M.count;for(let F=R,B=R+k;F<B;F+=3)h(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let _=new N,x=new N,C=new N,T=new N;function A(I){C.fromBufferAttribute(r,I),T.copy(C);let w=a[I];_.copy(w),_.sub(C.multiplyScalar(C.dot(w))).normalize(),x.crossVectors(T,w);let R=x.dot(l[I])<0?-1:1;o.setXYZW(I,_.x,_.y,_.z,R)}for(let I=0,w=v.length;I<w;++I){let M=v[I],R=M.start,k=M.count;for(let F=R,B=R+k;F<B;F+=3)A(e.getX(F+0)),A(e.getX(F+1)),A(e.getX(F+2))}}computeVertexNormals(){let e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new hn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);let r=new N,s=new N,o=new N,a=new N,l=new N,c=new N,u=new N,d=new N;if(e)for(let f=0,p=e.count;f<p;f+=3){let g=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,y),o.fromBufferAttribute(n,m),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Yt.fromBufferAttribute(e,n),Yt.normalize(),e.setXYZ(n,Yt.x,Yt.y,Yt.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u),p=0,g=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*u;for(let h=0;h<u;h++)f[g++]=c[p++]}return new hn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new t,i=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=e(l,i);n.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){let f=c[u],p=e(f,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){let p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone(n));let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(n))}let s=e.morphAttributes;for(let c in s){let u=[],d=s[c];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},J_=new yt,hs=new Gu,yu=new pl,K_=new N,_u=new N,xu=new N,Mu=new N,mp=new N,Su=new N,j_=new N,wu=new N,qe=class extends Kt{constructor(e=new jt,n=new or){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Su.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=a[l],d=s[l];u!==0&&(mp.fromBufferAttribute(d,e),o?Su.addScaledVector(mp,u):Su.addScaledVector(mp.sub(n),u))}n.add(Su)}return n}raycast(e,n){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),yu.copy(i.boundingSphere),yu.applyMatrix4(s),hs.copy(e.ray).recast(e.near),!(yu.containsPoint(hs.origin)===!1&&(hs.intersectSphere(yu,K_)===null||hs.origin.distanceToSquared(K_)>(e.far-e.near)**2))&&(J_.copy(s).invert(),hs.copy(e.ray).applyMatrix4(J_),!(i.boundingBox!==null&&hs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,hs)))}_computeIntersections(e,n,i){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],h=o[m.materialIndex],v=Math.max(m.start,p.start),_=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=v,C=_;x<C;x+=3){let T=a.getX(x),A=a.getX(x+1),I=a.getX(x+2);r=Eu(this,h,e,i,c,u,d,T,A,I),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{let g=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=g,h=y;m<h;m+=3){let v=a.getX(m),_=a.getX(m+1),x=a.getX(m+2);r=Eu(this,o,e,i,c,u,d,v,_,x),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],h=o[m.materialIndex],v=Math.max(m.start,p.start),_=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=v,C=_;x<C;x+=3){let T=x,A=x+1,I=x+2;r=Eu(this,h,e,i,c,u,d,T,A,I),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{let g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=g,h=y;m<h;m+=3){let v=m,_=m+1,x=m+2;r=Eu(this,o,e,i,c,u,d,v,_,x),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}};function PE(t,e,n,i,r,s,o,a){let l;if(e.side===un?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Hr,a),l===null)return null;wu.copy(a),wu.applyMatrix4(t.matrixWorld);let c=n.ray.origin.distanceTo(wu);return c<n.near||c>n.far?null:{distance:c,point:wu.clone(),object:t}}function Eu(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,_u),t.getVertexPosition(l,xu),t.getVertexPosition(c,Mu);let u=PE(t,e,n,i,_u,xu,Mu,j_);if(u){let d=new N;vs.getBarycoord(j_,_u,xu,Mu,d),r&&(u.uv=vs.getInterpolatedAttribute(r,a,l,c,d,new ce)),s&&(u.uv1=vs.getInterpolatedAttribute(s,a,l,c,d,new ce)),o&&(u.normal=vs.getInterpolatedAttribute(o,a,l,c,d,new N),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new N,materialIndex:0};vs.getNormal(_u,xu,Mu,f.normal),u.face=f,u.barycoord=d}return u}var Es=class t extends jt{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],u=[],d=[],f=0,p=0;g("z","y","x",-1,-1,i,n,e,o,s,0),g("z","y","x",1,-1,i,n,-e,o,s,1),g("x","z","y",1,1,e,i,n,r,o,2),g("x","z","y",1,-1,e,i,-n,r,o,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new nt(c,3)),this.setAttribute("normal",new nt(u,3)),this.setAttribute("uv",new nt(d,2));function g(y,m,h,v,_,x,C,T,A,I,w){let M=x/A,R=C/I,k=x/2,F=C/2,B=T/2,J=A+1,G=I+1,ie=0,W=0,K=new N;for(let fe=0;fe<G;fe++){let xe=fe*R-F;for(let De=0;De<J;De++){let Qe=De*M-k;K[y]=Qe*v,K[m]=xe*_,K[h]=B,c.push(K.x,K.y,K.z),K[y]=0,K[m]=0,K[h]=T>0?1:-1,u.push(K.x,K.y,K.z),d.push(De/A),d.push(1-fe/I),ie+=1}}for(let fe=0;fe<I;fe++)for(let xe=0;xe<A;xe++){let De=f+xe+J*fe,Qe=f+xe+J*(fe+1),$=f+(xe+1)+J*(fe+1),oe=f+(xe+1)+J*fe;l.push(De,Qe,oe),l.push(Qe,$,oe),W+=6}a.addGroup(p,W,w),p+=W,f+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new t(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Wo(t){let e={};for(let n in t){e[n]={};for(let i in t[n]){let r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function vn(t){let e={};for(let n=0;n<t.length;n++){let i=Wo(t[n]);for(let r in i)e[r]=i[r]}return e}function IE(t){let e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function jx(t){let e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}var NE={clone:Wo,merge:vn},LE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,DE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ai=class extends ws{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=LE,this.fragmentShader=DE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wo(e.uniforms),this.uniformsGroups=IE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},Yu=class extends Kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=tr}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},kr=new N,Q_=new ce,ex=new ce,zt=class extends Yu{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let n=.5*this.getFilmHeight()/e;this.fov=Go*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ll*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Go*2*Math.atan(Math.tan(ll*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){kr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kr.x,kr.y).multiplyScalar(-e/kr.z),kr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(kr.x,kr.y).multiplyScalar(-e/kr.z)}getViewSize(e,n){return this.getViewBounds(e,Q_,ex),n.subVectors(ex,Q_)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,n=e*Math.tan(ll*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},Ao=-90,Co=1,gm=class extends Kt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new zt(Ao,Co,e,n);r.layers=this.layers,this.add(r);let s=new zt(Ao,Co,e,n);s.layers=this.layers,this.add(s);let o=new zt(Ao,Co,e,n);o.layers=this.layers,this.add(o);let a=new zt(Ao,Co,e,n);a.layers=this.layers,this.add(a);let l=new zt(Ao,Co,e,n);l.layers=this.layers,this.add(l);let c=new zt(Ao,Co,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(let c of n)this.remove(c);if(e===tr)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Bu)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(n,u),e.setRenderTarget(d,f,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},qu=class extends kn{constructor(e,n,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],n=n!==void 0?n:Fo,super(e,n,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},vm=class extends sr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new qu(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:bi}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Es(5,5,5),s=new Ai({name:"CubemapFromEquirect",uniforms:Wo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:Br});s.uniforms.tEquirect.value=n;let o=new qe(r,s),a=n.minFilter;return n.minFilter===xs&&(n.minFilter=bi),new gm(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}},gp=new N,UE=new N,OE=new Ge,ci=class{constructor(e=new N(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){let r=gp.subVectors(i,n).cross(UE.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){let i=e.delta(gp),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){let i=n||OE.getNormalMatrix(e),r=this.coplanarPoint(gp).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ds=new pl,bu=new N,gl=class{constructor(e=new ci,n=new ci,i=new ci,r=new ci,s=new ci,o=new ci){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=tr){let i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],d=r[6],f=r[7],p=r[8],g=r[9],y=r[10],m=r[11],h=r[12],v=r[13],_=r[14],x=r[15];if(i[0].setComponents(l-s,f-c,m-p,x-h).normalize(),i[1].setComponents(l+s,f+c,m+p,x+h).normalize(),i[2].setComponents(l+o,f+u,m+g,x+v).normalize(),i[3].setComponents(l-o,f-u,m-g,x-v).normalize(),i[4].setComponents(l-a,f-d,m-y,x-_).normalize(),n===tr)i[5].setComponents(l+a,f+d,m+y,x+_).normalize();else if(n===Bu)i[5].setComponents(a,d,y,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ds.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){return ds.center.set(0,0,0),ds.radius=.7071067811865476,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){let n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let n=this.planes;for(let i=0;i<6;i++){let r=n[i];if(bu.x=r.normal.x>0?e.max.x:e.min.x,bu.y=r.normal.y>0?e.max.y:e.min.y,bu.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(bu)<0)return!1}return!0}containsPoint(e){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Qx(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function kE(t){let e=new WeakMap;function n(a,l){let c=a.array,u=a.usage,d=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){let u=l.array,d=l.updateRanges;if(t.bindBuffer(c,a),d.length===0)t.bufferSubData(c,0,u);else{d.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<d.length;p++){let g=d[f],y=d[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,d[f]=y)}d.length=f+1;for(let p=0,g=d.length;p<g;p++){let y=d[p];t.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var ar=class t extends jt{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};let s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,f=n/l,p=[],g=[],y=[],m=[];for(let h=0;h<u;h++){let v=h*f-o;for(let _=0;_<c;_++){let x=_*d-s;g.push(x,-v,0),y.push(0,0,1),m.push(_/a),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let v=0;v<a;v++){let _=v+c*h,x=v+c*(h+1),C=v+1+c*(h+1),T=v+1+c*h;p.push(_,x,T),p.push(x,C,T)}this.setIndex(p),this.setAttribute("position",new nt(g,3)),this.setAttribute("normal",new nt(y,3)),this.setAttribute("uv",new nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new t(e.width,e.height,e.widthSegments,e.heightSegments)}},FE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,BE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,zE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,VE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,HE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,GE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,WE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,XE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,YE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,qE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$E=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ZE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,JE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,KE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,QE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,eb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ib=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,rb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ob=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ab=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,lb=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ub=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,db=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pb="gl_FragColor = linearToOutputTexel( gl_FragColor );",mb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,vb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yb=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_b=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Mb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Eb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bb=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Tb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ab=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cb=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Pb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ib=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Db=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ub=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ob=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kb=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Fb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Bb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zb=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vb=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hb=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gb=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qb=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$b=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qb=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,eT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,iT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,oT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,aT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,uT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,fT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_T=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,xT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,MT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ST=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ET=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,bT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,TT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,AT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,CT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,RT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,PT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,IT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,NT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,LT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,DT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,UT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,OT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,kT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,FT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,VT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,HT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,WT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,XT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,YT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$T=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,JT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,KT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,dA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,mA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:FE,alphahash_pars_fragment:BE,alphamap_fragment:zE,alphamap_pars_fragment:VE,alphatest_fragment:HE,alphatest_pars_fragment:GE,aomap_fragment:WE,aomap_pars_fragment:XE,batching_pars_vertex:YE,batching_vertex:qE,begin_vertex:$E,beginnormal_vertex:ZE,bsdfs:JE,iridescence_fragment:KE,bumpmap_pars_fragment:jE,clipping_planes_fragment:QE,clipping_planes_pars_fragment:eb,clipping_planes_pars_vertex:tb,clipping_planes_vertex:nb,color_fragment:ib,color_pars_fragment:rb,color_pars_vertex:sb,color_vertex:ob,common:ab,cube_uv_reflection_fragment:lb,defaultnormal_vertex:cb,displacementmap_pars_vertex:ub,displacementmap_vertex:hb,emissivemap_fragment:db,emissivemap_pars_fragment:fb,colorspace_fragment:pb,colorspace_pars_fragment:mb,envmap_fragment:gb,envmap_common_pars_fragment:vb,envmap_pars_fragment:yb,envmap_pars_vertex:_b,envmap_physical_pars_fragment:Pb,envmap_vertex:xb,fog_vertex:Mb,fog_pars_vertex:Sb,fog_fragment:wb,fog_pars_fragment:Eb,gradientmap_pars_fragment:bb,lightmap_pars_fragment:Tb,lights_lambert_fragment:Ab,lights_lambert_pars_fragment:Cb,lights_pars_begin:Rb,lights_toon_fragment:Ib,lights_toon_pars_fragment:Nb,lights_phong_fragment:Lb,lights_phong_pars_fragment:Db,lights_physical_fragment:Ub,lights_physical_pars_fragment:Ob,lights_fragment_begin:kb,lights_fragment_maps:Fb,lights_fragment_end:Bb,logdepthbuf_fragment:zb,logdepthbuf_pars_fragment:Vb,logdepthbuf_pars_vertex:Hb,logdepthbuf_vertex:Gb,map_fragment:Wb,map_pars_fragment:Xb,map_particle_fragment:Yb,map_particle_pars_fragment:qb,metalnessmap_fragment:$b,metalnessmap_pars_fragment:Zb,morphinstance_vertex:Jb,morphcolor_vertex:Kb,morphnormal_vertex:jb,morphtarget_pars_vertex:Qb,morphtarget_vertex:eT,normal_fragment_begin:tT,normal_fragment_maps:nT,normal_pars_fragment:iT,normal_pars_vertex:rT,normal_vertex:sT,normalmap_pars_fragment:oT,clearcoat_normal_fragment_begin:aT,clearcoat_normal_fragment_maps:lT,clearcoat_pars_fragment:cT,iridescence_pars_fragment:uT,opaque_fragment:hT,packing:dT,premultiplied_alpha_fragment:fT,project_vertex:pT,dithering_fragment:mT,dithering_pars_fragment:gT,roughnessmap_fragment:vT,roughnessmap_pars_fragment:yT,shadowmap_pars_fragment:_T,shadowmap_pars_vertex:xT,shadowmap_vertex:MT,shadowmask_pars_fragment:ST,skinbase_vertex:wT,skinning_pars_vertex:ET,skinning_vertex:bT,skinnormal_vertex:TT,specularmap_fragment:AT,specularmap_pars_fragment:CT,tonemapping_fragment:RT,tonemapping_pars_fragment:PT,transmission_fragment:IT,transmission_pars_fragment:NT,uv_pars_fragment:LT,uv_pars_vertex:DT,uv_vertex:UT,worldpos_vertex:OT,background_vert:kT,background_frag:FT,backgroundCube_vert:BT,backgroundCube_frag:zT,cube_vert:VT,cube_frag:HT,depth_vert:GT,depth_frag:WT,distanceRGBA_vert:XT,distanceRGBA_frag:YT,equirect_vert:qT,equirect_frag:$T,linedashed_vert:ZT,linedashed_frag:JT,meshbasic_vert:KT,meshbasic_frag:jT,meshlambert_vert:QT,meshlambert_frag:eA,meshmatcap_vert:tA,meshmatcap_frag:nA,meshnormal_vert:iA,meshnormal_frag:rA,meshphong_vert:sA,meshphong_frag:oA,meshphysical_vert:aA,meshphysical_frag:lA,meshtoon_vert:cA,meshtoon_frag:uA,points_vert:hA,points_frag:dA,shadow_vert:fA,shadow_frag:pA,sprite_vert:mA,sprite_frag:gA},pe={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Ei={basic:{uniforms:vn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:vn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:vn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:vn([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:vn([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:vn([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:vn([pe.points,pe.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:vn([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:vn([pe.common,pe.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:vn([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:vn([pe.sprite,pe.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:vn([pe.common,pe.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:vn([pe.lights,pe.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Ei.physical={uniforms:vn([Ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var Tu={r:0,b:0,g:0},fs=new qn,vA=new yt;function yA(t,e,n,i,r,s,o){let a=new Ye(0),l=s===!0?0:1,c,u,d=null,f=0,p=null;function g(v){let _=v.isScene===!0?v.background:null;return _&&_.isTexture&&(_=(v.backgroundBlurriness>0?n:e).get(_)),_}function y(v){let _=!1,x=g(v);x===null?h(a,l):x&&x.isColor&&(h(x,1),_=!0);let C=t.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(v,_){let x=g(_);x&&(x.isCubeTexture||x.mapping===hh)?(u===void 0&&(u=new qe(new Es(1,1,1),new Ai({name:"BackgroundCubeMaterial",uniforms:Wo(Ei.backgroundCube.uniforms),vertexShader:Ei.backgroundCube.vertexShader,fragmentShader:Ei.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),fs.copy(_.backgroundRotation),fs.x*=-1,fs.y*=-1,fs.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(vA.makeRotationFromEuler(fs)),u.material.toneMapped=tt.getTransfer(x.colorSpace)!==ut,(d!==x||f!==x.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,d=x,f=x.version,p=t.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new qe(new ar(2,2),new Ai({name:"BackgroundMaterial",uniforms:Wo(Ei.background.uniforms),vertexShader:Ei.background.vertexShader,fragmentShader:Ei.background.fragmentShader,side:Hr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=tt.getTransfer(x.colorSpace)!==ut,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||f!==x.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,d=x,f=x.version,p=t.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function h(v,_){v.getRGB(Tu,jx(t)),i.buffers.color.setClear(Tu.r,Tu.g,Tu.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(v,_=1){a.set(v),l=_,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,h(a,l)},render:y,addToRenderList:m}}function _A(t,e){let n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null),s=r,o=!1;function a(M,R,k,F,B){let J=!1,G=d(F,k,R);s!==G&&(s=G,c(s.object)),J=p(M,F,k,B),J&&g(M,F,k,B),B!==null&&e.update(B,t.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,x(M,R,k,F),B!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return t.createVertexArray()}function c(M){return t.bindVertexArray(M)}function u(M){return t.deleteVertexArray(M)}function d(M,R,k){let F=k.wireframe===!0,B=i[M.id];B===void 0&&(B={},i[M.id]=B);let J=B[R.id];J===void 0&&(J={},B[R.id]=J);let G=J[F];return G===void 0&&(G=f(l()),J[F]=G),G}function f(M){let R=[],k=[],F=[];for(let B=0;B<n;B++)R[B]=0,k[B]=0,F[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:k,attributeDivisors:F,object:M,attributes:{},index:null}}function p(M,R,k,F){let B=s.attributes,J=R.attributes,G=0,ie=k.getAttributes();for(let W in ie)if(ie[W].location>=0){let fe=B[W],xe=J[W];if(xe===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(xe=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(xe=M.instanceColor)),fe===void 0||fe.attribute!==xe||xe&&fe.data!==xe.data)return!0;G++}return s.attributesNum!==G||s.index!==F}function g(M,R,k,F){let B={},J=R.attributes,G=0,ie=k.getAttributes();for(let W in ie)if(ie[W].location>=0){let fe=J[W];fe===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(fe=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(fe=M.instanceColor));let xe={};xe.attribute=fe,fe&&fe.data&&(xe.data=fe.data),B[W]=xe,G++}s.attributes=B,s.attributesNum=G,s.index=F}function y(){let M=s.newAttributes;for(let R=0,k=M.length;R<k;R++)M[R]=0}function m(M){h(M,0)}function h(M,R){let k=s.newAttributes,F=s.enabledAttributes,B=s.attributeDivisors;k[M]=1,F[M]===0&&(t.enableVertexAttribArray(M),F[M]=1),B[M]!==R&&(t.vertexAttribDivisor(M,R),B[M]=R)}function v(){let M=s.newAttributes,R=s.enabledAttributes;for(let k=0,F=R.length;k<F;k++)R[k]!==M[k]&&(t.disableVertexAttribArray(k),R[k]=0)}function _(M,R,k,F,B,J,G){G===!0?t.vertexAttribIPointer(M,R,k,B,J):t.vertexAttribPointer(M,R,k,F,B,J)}function x(M,R,k,F){y();let B=F.attributes,J=k.getAttributes(),G=R.defaultAttributeValues;for(let ie in J){let W=J[ie];if(W.location>=0){let K=B[ie];if(K===void 0&&(ie==="instanceMatrix"&&M.instanceMatrix&&(K=M.instanceMatrix),ie==="instanceColor"&&M.instanceColor&&(K=M.instanceColor)),K!==void 0){let fe=K.normalized,xe=K.itemSize,De=e.get(K);if(De===void 0)continue;let Qe=De.buffer,$=De.type,oe=De.bytesPerElement,Te=$===t.INT||$===t.UNSIGNED_INT||K.gpuType===eg;if(K.isInterleavedBufferAttribute){let he=K.data,Ne=he.stride,Fe=K.offset;if(he.isInstancedInterleavedBuffer){for(let Oe=0;Oe<W.locationSize;Oe++)h(W.location+Oe,he.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Oe=0;Oe<W.locationSize;Oe++)m(W.location+Oe);t.bindBuffer(t.ARRAY_BUFFER,Qe);for(let Oe=0;Oe<W.locationSize;Oe++)_(W.location+Oe,xe/W.locationSize,$,fe,Ne*oe,(Fe+xe/W.locationSize*Oe)*oe,Te)}else{if(K.isInstancedBufferAttribute){for(let he=0;he<W.locationSize;he++)h(W.location+he,K.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let he=0;he<W.locationSize;he++)m(W.location+he);t.bindBuffer(t.ARRAY_BUFFER,Qe);for(let he=0;he<W.locationSize;he++)_(W.location+he,xe/W.locationSize,$,fe,xe*oe,xe/W.locationSize*he*oe,Te)}}else if(G!==void 0){let fe=G[ie];if(fe!==void 0)switch(fe.length){case 2:t.vertexAttrib2fv(W.location,fe);break;case 3:t.vertexAttrib3fv(W.location,fe);break;case 4:t.vertexAttrib4fv(W.location,fe);break;default:t.vertexAttrib1fv(W.location,fe)}}}}v()}function C(){I();for(let M in i){let R=i[M];for(let k in R){let F=R[k];for(let B in F)u(F[B].object),delete F[B];delete R[k]}delete i[M]}}function T(M){if(i[M.id]===void 0)return;let R=i[M.id];for(let k in R){let F=R[k];for(let B in F)u(F[B].object),delete F[B];delete R[k]}delete i[M.id]}function A(M){for(let R in i){let k=i[R];if(k[M.id]===void 0)continue;let F=k[M.id];for(let B in F)u(F[B].object),delete F[B];delete k[M.id]}}function I(){w(),o=!0,s!==r&&(s=r,c(s.object))}function w(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:I,resetDefaultState:w,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:m,disableUnusedAttributes:v}}function xA(t,e,n){let i;function r(c){i=c}function s(c,u){t.drawArrays(i,c,u),n.update(u,i,1)}function o(c,u,d){d!==0&&(t.drawArraysInstanced(i,c,u,d),n.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];n.update(p,i,1)}function l(c,u,d,f){if(d===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let g=0;for(let y=0;y<d;y++)g+=u[y]*f[y];n.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function MA(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==ui&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let I=A===Rl&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==rr&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==er&&!I)}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),v=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),_=t.getParameter(t.MAX_VARYING_VECTORS),x=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,T=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:v,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:C,maxSamples:T}}function SA(t){let e=this,n=null,i=0,r=!1,s=!1,o=new ci,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let p=d.length!==0||f||i!==0||r;return r=f,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){n=u(d,f,0)},this.setState=function(d,f,p){let g=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,h=t.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{let v=s?0:i,_=v*4,x=h.clippingState||null;l.value=x,x=u(g,f,_,p);for(let C=0;C!==_;++C)x[C]=n[C];h.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,p,g){let y=d!==null?d.length:0,m=null;if(y!==0){if(m=l.value,g!==!0||m===null){let h=p+y*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<h)&&(m=new Float32Array(h));for(let _=0,x=p;_!==y;++_,x+=4)o.copy(d[_]).applyMatrix4(v,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function wA(t){let e=new WeakMap;function n(o,a){return a===kp?o.mapping=Fo:a===Fp&&(o.mapping=Bo),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===kp||a===Fp)if(e.has(o)){let l=e.get(o).texture;return n(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new vm(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}var $u=class extends Yu{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}},Io=4,tx=[.125,.215,.35,.446,.526,.582],ys=20,vp=new $u,nx=new Ye,yp=null,_p=0,xp=0,Mp=!1,ms=(1+Math.sqrt(5))/2,Ro=1/ms,ix=[new N(-ms,Ro,0),new N(ms,Ro,0),new N(-Ro,0,ms),new N(Ro,0,ms),new N(0,ms,-Ro),new N(0,ms,Ro),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],Wr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){yp=this._renderer.getRenderTarget(),_p=this._renderer.getActiveCubeFace(),xp=this._renderer.getActiveMipmapLevel(),Mp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ox(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sx(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(yp,_p,xp),this._renderer.xr.enabled=Mp,e.scissorTest=!1,Au(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Fo||e.mapping===Bo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),yp=this._renderer.getRenderTarget(),_p=this._renderer.getActiveCubeFace(),xp=this._renderer.getActiveMipmapLevel(),Mp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:bi,minFilter:bi,generateMipmaps:!1,type:Rl,format:ui,colorSpace:Zo,depthBuffer:!1},r=rx(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=rx(e,n,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=EA(s)),this._blurMaterial=bA(s,e,n)}return r}_compileMaterial(e){let n=new qe(this._lodPlanes[0],e);this._renderer.compile(n,vp)}_sceneToCubeUV(e,n,i,r){let a=new zt(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(nx),u.toneMapping=zr,u.autoClear=!1;let p=new or({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1}),g=new qe(new Es,p),y=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,y=!0):(p.color.copy(nx),y=!0);for(let h=0;h<6;h++){let v=h%3;v===0?(a.up.set(0,l[h],0),a.lookAt(c[h],0,0)):v===1?(a.up.set(0,0,l[h]),a.lookAt(0,c[h],0)):(a.up.set(0,l[h],0),a.lookAt(0,0,c[h]));let _=this._cubeSize;Au(r,v*_,h>2?_:0,_,_),u.setRenderTarget(r),y&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=m}_textureToCubeUV(e,n){let i=this._renderer,r=e.mapping===Fo||e.mapping===Bo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ox()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sx());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new qe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;Au(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,vp)}_applyPMREM(e){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=ix[(r-s-1)%ix.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new qe(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ys-1),y=s/g,m=isFinite(s)?1+Math.floor(u*y):ys;m>ys&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ys}`);let h=[],v=0;for(let A=0;A<ys;++A){let I=A/y,w=Math.exp(-I*I/2);h.push(w),A===0?v+=w:A<m&&(v+=2*w)}for(let A=0;A<h.length;A++)h[A]=h[A]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-i;let x=this._sizeLods[r],C=3*x*(r>_-Io?r-_+Io:0),T=4*(this._cubeSize-x);Au(n,C,T,3*x,2*x),l.setRenderTarget(n),l.render(d,vp)}};function EA(t){let e=[],n=[],i=[],r=t,s=t-Io+1+tx.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);n.push(a);let l=1/a;o>t-Io?l=tx[o-t+Io-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,y=3,m=2,h=1,v=new Float32Array(y*g*p),_=new Float32Array(m*g*p),x=new Float32Array(h*g*p);for(let T=0;T<p;T++){let A=T%3*2/3-1,I=T>2?0:-1,w=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];v.set(w,y*g*T),_.set(f,m*g*T);let M=[T,T,T,T,T,T];x.set(M,h*g*T)}let C=new jt;C.setAttribute("position",new hn(v,y)),C.setAttribute("uv",new hn(_,m)),C.setAttribute("faceIndex",new hn(x,h)),e.push(C),r>Io&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function rx(t,e,n){let i=new sr(t,e,n);return i.texture.mapping=hh,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Au(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function bA(t,e,n){let i=new Float32Array(ys),r=new N(0,1,0);return new Ai({name:"SphericalGaussianBlur",defines:{n:ys,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ag(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Br,depthTest:!1,depthWrite:!1})}function sx(){return new Ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ag(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Br,depthTest:!1,depthWrite:!1})}function ox(){return new Ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ag(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Br,depthTest:!1,depthWrite:!1})}function ag(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function TA(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===kp||l===Fp,u=l===Fo||l===Bo;if(c||u){let d=e.get(a),f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return n===null&&(n=new Wr(t)),d=c?n.fromEquirectangular(a,d):n.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{let p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(n===null&&(n=new Wr(t)),d=c?n.fromEquirectangular(a):n.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function AA(t){let e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let r=n(i);return r===null&&ol("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function CA(t,e,n,i){let r={},s=new WeakMap;function o(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let y=f.morphAttributes[g];for(let m=0,h=y.length;m<h;m++)e.remove(y[m])}f.removeEventListener("dispose",o),delete r[f.id];let p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function l(d){let f=d.attributes;for(let g in f)e.update(f[g],t.ARRAY_BUFFER);let p=d.morphAttributes;for(let g in p){let y=p[g];for(let m=0,h=y.length;m<h;m++)e.update(y[m],t.ARRAY_BUFFER)}}function c(d){let f=[],p=d.index,g=d.attributes.position,y=0;if(p!==null){let v=p.array;y=p.version;for(let _=0,x=v.length;_<x;_+=3){let C=v[_+0],T=v[_+1],A=v[_+2];f.push(C,T,T,A,A,C)}}else if(g!==void 0){let v=g.array;y=g.version;for(let _=0,x=v.length/3-1;_<x;_+=3){let C=_+0,T=_+1,A=_+2;f.push(C,T,T,A,A,C)}}else return;let m=new(Jx(f)?Xu:Wu)(f,1);m.version=y;let h=s.get(d);h&&e.remove(h),s.set(d,m)}function u(d){let f=s.get(d);if(f){let p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function RA(t,e,n){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){t.drawElements(i,p,s,f*o),n.update(p,i,1)}function c(f,p,g){g!==0&&(t.drawElementsInstanced(i,p,s,f*o,g),n.update(p,i,g))}function u(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,g);let m=0;for(let h=0;h<g;h++)m+=p[h];n.update(m,i,1)}function d(f,p,g,y){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)c(f[h]/o,p[h],y[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,y,0,g);let h=0;for(let v=0;v<g;v++)h+=p[v]*y[v];n.update(h,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function PA(t){let e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function IA(t,e,n){let i=new WeakMap,r=new ht;function s(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let w=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",w)};f!==void 0&&f.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],h=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],_=0;p===!0&&(_=1),g===!0&&(_=2),y===!0&&(_=3);let x=a.attributes.position.count*_,C=1;x>e.maxTextureSize&&(C=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let T=new Float32Array(x*C*4*d),A=new Hu(T,x,C,d);A.type=er,A.needsUpdate=!0;let I=_*4;for(let M=0;M<d;M++){let R=m[M],k=h[M],F=v[M],B=x*C*4*M;for(let J=0;J<R.count;J++){let G=J*I;p===!0&&(r.fromBufferAttribute(R,J),T[B+G+0]=r.x,T[B+G+1]=r.y,T[B+G+2]=r.z,T[B+G+3]=0),g===!0&&(r.fromBufferAttribute(k,J),T[B+G+4]=r.x,T[B+G+5]=r.y,T[B+G+6]=r.z,T[B+G+7]=0),y===!0&&(r.fromBufferAttribute(F,J),T[B+G+8]=r.x,T[B+G+9]=r.y,T[B+G+10]=r.z,T[B+G+11]=F.itemSize===4?r.w:1)}}f={count:d,texture:A,size:new ce(x,C)},i.set(a,f),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let p=0;for(let y=0;y<c.length;y++)p+=c[y];let g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(t,"morphTargetBaseInfluence",g),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function NA(t,e,n,i){let r=new WeakMap;function s(l){let c=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return d}function o(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}var Zu=class extends kn{constructor(e,n,i,r,s,o,a,l,c,u=Do){if(u!==Do&&u!==Ho)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Do&&(i=Ms),i===void 0&&u===Ho&&(i=Vo),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:hi,this.minFilter=l!==void 0?l:hi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},eM=new kn,ax=new Zu(1,1),tM=new Hu,nM=new mm,iM=new qu,lx=[],cx=[],ux=new Float32Array(16),hx=new Float32Array(9),dx=new Float32Array(4);function Jo(t,e,n){let i=t[0];if(i<=0||i>0)return t;let r=e*n,s=lx[r];if(s===void 0&&(s=new Float32Array(r),lx[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Vt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ht(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function fh(t,e){let n=cx[e];n===void 0&&(n=new Int32Array(e),cx[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function LA(t,e){let n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function DA(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Vt(n,e))return;t.uniform2fv(this.addr,e),Ht(n,e)}}function UA(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Vt(n,e))return;t.uniform3fv(this.addr,e),Ht(n,e)}}function OA(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Vt(n,e))return;t.uniform4fv(this.addr,e),Ht(n,e)}}function kA(t,e){let n=this.cache,i=e.elements;if(i===void 0){if(Vt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Ht(n,e)}else{if(Vt(n,i))return;dx.set(i),t.uniformMatrix2fv(this.addr,!1,dx),Ht(n,i)}}function FA(t,e){let n=this.cache,i=e.elements;if(i===void 0){if(Vt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Ht(n,e)}else{if(Vt(n,i))return;hx.set(i),t.uniformMatrix3fv(this.addr,!1,hx),Ht(n,i)}}function BA(t,e){let n=this.cache,i=e.elements;if(i===void 0){if(Vt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Ht(n,e)}else{if(Vt(n,i))return;ux.set(i),t.uniformMatrix4fv(this.addr,!1,ux),Ht(n,i)}}function zA(t,e){let n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function VA(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Vt(n,e))return;t.uniform2iv(this.addr,e),Ht(n,e)}}function HA(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Vt(n,e))return;t.uniform3iv(this.addr,e),Ht(n,e)}}function GA(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Vt(n,e))return;t.uniform4iv(this.addr,e),Ht(n,e)}}function WA(t,e){let n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function XA(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Vt(n,e))return;t.uniform2uiv(this.addr,e),Ht(n,e)}}function YA(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Vt(n,e))return;t.uniform3uiv(this.addr,e),Ht(n,e)}}function qA(t,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Vt(n,e))return;t.uniform4uiv(this.addr,e),Ht(n,e)}}function $A(t,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(ax.compareFunction=$x,s=ax):s=eM,n.setTexture2D(e||s,r)}function ZA(t,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||nM,r)}function JA(t,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||iM,r)}function KA(t,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||tM,r)}function jA(t){switch(t){case 5126:return LA;case 35664:return DA;case 35665:return UA;case 35666:return OA;case 35674:return kA;case 35675:return FA;case 35676:return BA;case 5124:case 35670:return zA;case 35667:case 35671:return VA;case 35668:case 35672:return HA;case 35669:case 35673:return GA;case 5125:return WA;case 36294:return XA;case 36295:return YA;case 36296:return qA;case 35678:case 36198:case 36298:case 36306:case 35682:return $A;case 35679:case 36299:case 36307:return ZA;case 35680:case 36300:case 36308:case 36293:return JA;case 36289:case 36303:case 36311:case 36292:return KA}}function QA(t,e){t.uniform1fv(this.addr,e)}function eC(t,e){let n=Jo(e,this.size,2);t.uniform2fv(this.addr,n)}function tC(t,e){let n=Jo(e,this.size,3);t.uniform3fv(this.addr,n)}function nC(t,e){let n=Jo(e,this.size,4);t.uniform4fv(this.addr,n)}function iC(t,e){let n=Jo(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function rC(t,e){let n=Jo(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function sC(t,e){let n=Jo(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function oC(t,e){t.uniform1iv(this.addr,e)}function aC(t,e){t.uniform2iv(this.addr,e)}function lC(t,e){t.uniform3iv(this.addr,e)}function cC(t,e){t.uniform4iv(this.addr,e)}function uC(t,e){t.uniform1uiv(this.addr,e)}function hC(t,e){t.uniform2uiv(this.addr,e)}function dC(t,e){t.uniform3uiv(this.addr,e)}function fC(t,e){t.uniform4uiv(this.addr,e)}function pC(t,e,n){let i=this.cache,r=e.length,s=fh(n,r);Vt(i,s)||(t.uniform1iv(this.addr,s),Ht(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||eM,s[o])}function mC(t,e,n){let i=this.cache,r=e.length,s=fh(n,r);Vt(i,s)||(t.uniform1iv(this.addr,s),Ht(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||nM,s[o])}function gC(t,e,n){let i=this.cache,r=e.length,s=fh(n,r);Vt(i,s)||(t.uniform1iv(this.addr,s),Ht(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||iM,s[o])}function vC(t,e,n){let i=this.cache,r=e.length,s=fh(n,r);Vt(i,s)||(t.uniform1iv(this.addr,s),Ht(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||tM,s[o])}function yC(t){switch(t){case 5126:return QA;case 35664:return eC;case 35665:return tC;case 35666:return nC;case 35674:return iC;case 35675:return rC;case 35676:return sC;case 5124:case 35670:return oC;case 35667:case 35671:return aC;case 35668:case 35672:return lC;case 35669:case 35673:return cC;case 5125:return uC;case 36294:return hC;case 36295:return dC;case 36296:return fC;case 35678:case 36198:case 36298:case 36306:case 35682:return pC;case 35679:case 36299:case 36307:return mC;case 35680:case 36300:case 36308:case 36293:return gC;case 36289:case 36303:case 36311:case 36292:return vC}}var ym=class{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=jA(n.type)}},_m=class{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=yC(n.type)}},xm=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,n[a.id],i)}}},Sp=/(\w+)(\])?(\[|\.)?/g;function fx(t,e){t.seq.push(e),t.map[e.id]=e}function _C(t,e,n){let i=t.name,r=i.length;for(Sp.lastIndex=0;;){let s=Sp.exec(i),o=Sp.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){fx(n,c===void 0?new ym(a,t,e):new _m(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new xm(a),fx(n,d)),n=d}}}var Oo=class{constructor(e,n){this.seq=[],this.map={};let i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);_C(s,o,this)}}setValue(e,n,i,r){let s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){let r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){let a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in n&&i.push(o)}return i}};function px(t,e,n){let i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}var xC=37297,MC=0;function SC(t,e){let n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}var mx=new Ge;function wC(t){tt._getMatrix(mx,tt.workingColorSpace,t);let e=`mat3( ${mx.elements.map(n=>n.toFixed(4))} )`;switch(tt.getTransfer(t)){case dh:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function gx(t,e,n){let i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+SC(t.getShaderSource(e),o)}else return r}function EC(t,e){let n=wC(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function bC(t,e){let n;switch(e){case Ow:n="Linear";break;case kw:n="Reinhard";break;case Fw:n="Cineon";break;case Cl:n="ACESFilmic";break;case zw:n="AgX";break;case Vw:n="Neutral";break;case Bw:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var Cu=new N;function TC(){tt.getLuminanceCoefficients(Cu);let t=Cu.x.toFixed(4),e=Cu.y.toFixed(4),n=Cu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AC(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(al).join(`
`)}function CC(t){let e=[];for(let n in t){let i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function RC(t,e){let n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=t.getActiveAttrib(e,r),o=s.name,a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function al(t){return t!==""}function vx(t,e){let n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yx(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var PC=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mm(t){return t.replace(PC,NC)}var IC=new Map;function NC(t,e){let n=Xe[e];if(n===void 0){let i=IC.get(e);if(i!==void 0)n=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Mm(n)}var LC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _x(t){return t.replace(LC,DC)}function DC(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function xx(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function UC(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Dx?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Qm?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===ji&&(e="SHADOWMAP_TYPE_VSM"),e}function OC(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Fo:case Bo:e="ENVMAP_TYPE_CUBE";break;case hh:e="ENVMAP_TYPE_CUBE_UV";break}return e}function kC(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Bo:e="ENVMAP_MODE_REFRACTION";break}return e}function FC(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Ux:e="ENVMAP_BLENDING_MULTIPLY";break;case Dw:e="ENVMAP_BLENDING_MIX";break;case Uw:e="ENVMAP_BLENDING_ADD";break}return e}function BC(t){let e=t.envMapCubeUVHeight;if(e===null)return null;let n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function zC(t,e,n,i){let r=t.getContext(),s=n.defines,o=n.vertexShader,a=n.fragmentShader,l=UC(n),c=OC(n),u=kC(n),d=FC(n),f=BC(n),p=AC(n),g=CC(s),y=r.createProgram(),m,h,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(al).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(al).join(`
`),h.length>0&&(h+=`
`)):(m=[xx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(al).join(`
`),h=[xx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==zr?"#define TONE_MAPPING":"",n.toneMapping!==zr?Xe.tonemapping_pars_fragment:"",n.toneMapping!==zr?bC("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,EC("linearToOutputTexel",n.outputColorSpace),TC(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(al).join(`
`)),o=Mm(o),o=vx(o,n),o=yx(o,n),a=Mm(a),a=vx(a,n),a=yx(a,n),o=_x(o),a=_x(a),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",n.glslVersion===L_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===L_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let _=v+m+o,x=v+h+a,C=px(r,r.VERTEX_SHADER,_),T=px(r,r.FRAGMENT_SHADER,x);r.attachShader(y,C),r.attachShader(y,T),n.index0AttributeName!==void 0?r.bindAttribLocation(y,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function A(R){if(t.debug.checkShaderErrors){let k=r.getProgramInfoLog(y).trim(),F=r.getShaderInfoLog(C).trim(),B=r.getShaderInfoLog(T).trim(),J=!0,G=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(J=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,y,C,T);else{let ie=gx(r,C,"vertex"),W=gx(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+ie+`
`+W)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(F===""||B==="")&&(G=!1);G&&(R.diagnostics={runnable:J,programLog:k,vertexShader:{log:F,prefix:m},fragmentShader:{log:B,prefix:h}})}r.deleteShader(C),r.deleteShader(T),I=new Oo(r,y),w=RC(r,y)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(y,xC)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=MC++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=C,this.fragmentShader=T,this}var VC=0,Sm=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let n=this.materialCache.get(e);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let n=this.materialCache,i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){let n=this.shaderCache,i=n.get(e);return i===void 0&&(i=new wm(e),n.set(e,i)),i}},wm=class{constructor(e){this.id=VC++,this.code=e,this.usedTimes=0}};function HC(t,e,n,i,r,s,o){let a=new ml,l=new Sm,c=new Set,u=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures,p=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,M,R,k,F){let B=k.fog,J=F.geometry,G=w.isMeshStandardMaterial?k.environment:null,ie=(w.isMeshStandardMaterial?n:e).get(w.envMap||G),W=ie&&ie.mapping===hh?ie.image.height:null,K=g[w.type];w.precision!==null&&(p=r.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));let fe=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,xe=fe!==void 0?fe.length:0,De=0;J.morphAttributes.position!==void 0&&(De=1),J.morphAttributes.normal!==void 0&&(De=2),J.morphAttributes.color!==void 0&&(De=3);let Qe,$,oe,Te;if(K){let at=Ei[K];Qe=at.vertexShader,$=at.fragmentShader}else Qe=w.vertexShader,$=w.fragmentShader,l.update(w),oe=l.getVertexShaderID(w),Te=l.getFragmentShaderID(w);let he=t.getRenderTarget(),Ne=t.state.buffers.depth.getReversed(),Fe=F.isInstancedMesh===!0,Oe=F.isBatchedMesh===!0,Ke=!!w.map,Q=!!w.matcap,le=!!ie,P=!!w.aoMap,Ae=!!w.lightMap,ne=!!w.bumpMap,Me=!!w.normalMap,de=!!w.displacementMap,Ue=!!w.emissiveMap,Z=!!w.metalnessMap,E=!!w.roughnessMap,S=w.anisotropy>0,O=w.clearcoat>0,q=w.dispersion>0,j=w.iridescence>0,Y=w.sheen>0,Ce=w.transmission>0,me=S&&!!w.anisotropyMap,Se=O&&!!w.clearcoatMap,Je=O&&!!w.clearcoatNormalMap,ae=O&&!!w.clearcoatRoughnessMap,Ee=j&&!!w.iridescenceMap,ke=j&&!!w.iridescenceThicknessMap,Be=Y&&!!w.sheenColorMap,be=Y&&!!w.sheenRoughnessMap,je=!!w.specularMap,We=!!w.specularColorMap,pt=!!w.specularIntensityMap,L=Ce&&!!w.transmissionMap,ge=Ce&&!!w.thicknessMap,X=!!w.gradientMap,ee=!!w.alphaMap,_e=w.alphaTest>0,ve=!!w.alphaHash,Ve=!!w.extensions,It=zr;w.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(It=t.toneMapping);let tn={shaderID:K,shaderType:w.type,shaderName:w.name,vertexShader:Qe,fragmentShader:$,defines:w.defines,customVertexShaderID:oe,customFragmentShaderID:Te,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:Oe,batchingColor:Oe&&F._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&F.instanceColor!==null,instancingMorph:Fe&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:he===null?t.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Zo,alphaToCoverage:!!w.alphaToCoverage,map:Ke,matcap:Q,envMap:le,envMapMode:le&&ie.mapping,envMapCubeUVHeight:W,aoMap:P,lightMap:Ae,bumpMap:ne,normalMap:Me,displacementMap:f&&de,emissiveMap:Ue,normalMapObjectSpace:Me&&w.normalMapType===Xw,normalMapTangentSpace:Me&&w.normalMapType===qx,metalnessMap:Z,roughnessMap:E,anisotropy:S,anisotropyMap:me,clearcoat:O,clearcoatMap:Se,clearcoatNormalMap:Je,clearcoatRoughnessMap:ae,dispersion:q,iridescence:j,iridescenceMap:Ee,iridescenceThicknessMap:ke,sheen:Y,sheenColorMap:Be,sheenRoughnessMap:be,specularMap:je,specularColorMap:We,specularIntensityMap:pt,transmission:Ce,transmissionMap:L,thicknessMap:ge,gradientMap:X,opaque:w.transparent===!1&&w.blending===Lo&&w.alphaToCoverage===!1,alphaMap:ee,alphaTest:_e,alphaHash:ve,combine:w.combine,mapUv:Ke&&y(w.map.channel),aoMapUv:P&&y(w.aoMap.channel),lightMapUv:Ae&&y(w.lightMap.channel),bumpMapUv:ne&&y(w.bumpMap.channel),normalMapUv:Me&&y(w.normalMap.channel),displacementMapUv:de&&y(w.displacementMap.channel),emissiveMapUv:Ue&&y(w.emissiveMap.channel),metalnessMapUv:Z&&y(w.metalnessMap.channel),roughnessMapUv:E&&y(w.roughnessMap.channel),anisotropyMapUv:me&&y(w.anisotropyMap.channel),clearcoatMapUv:Se&&y(w.clearcoatMap.channel),clearcoatNormalMapUv:Je&&y(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&y(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&y(w.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&y(w.iridescenceThicknessMap.channel),sheenColorMapUv:Be&&y(w.sheenColorMap.channel),sheenRoughnessMapUv:be&&y(w.sheenRoughnessMap.channel),specularMapUv:je&&y(w.specularMap.channel),specularColorMapUv:We&&y(w.specularColorMap.channel),specularIntensityMapUv:pt&&y(w.specularIntensityMap.channel),transmissionMapUv:L&&y(w.transmissionMap.channel),thicknessMapUv:ge&&y(w.thicknessMap.channel),alphaMapUv:ee&&y(w.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Me||S),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!J.attributes.uv&&(Ke||ee),fog:!!B,useFog:w.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ne,skinning:F.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:De,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:t.shadowMap.enabled&&R.length>0,shadowMapType:t.shadowMap.type,toneMapping:It,decodeVideoTexture:Ke&&w.map.isVideoTexture===!0&&tt.getTransfer(w.map.colorSpace)===ut,decodeVideoTextureEmissive:Ue&&w.emissiveMap.isVideoTexture===!0&&tt.getTransfer(w.emissiveMap.colorSpace)===ut,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Qi,flipSided:w.side===un,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ve&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ve&&w.extensions.multiDraw===!0||Oe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return tn.vertexUv1s=c.has(1),tn.vertexUv2s=c.has(2),tn.vertexUv3s=c.has(3),c.clear(),tn}function h(w){let M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(let R in w.defines)M.push(R),M.push(w.defines[R]);return w.isRawShaderMaterial===!1&&(v(M,w),_(M,w),M.push(t.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function v(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function _(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function x(w){let M=g[w.type],R;if(M){let k=Ei[M];R=NE.clone(k.uniforms)}else R=w.uniforms;return R}function C(w,M){let R;for(let k=0,F=u.length;k<F;k++){let B=u[k];if(B.cacheKey===M){R=B,++R.usedTimes;break}}return R===void 0&&(R=new zC(t,M,w,s),u.push(R)),R}function T(w){if(--w.usedTimes===0){let M=u.indexOf(w);u[M]=u[u.length-1],u.pop(),w.destroy()}}function A(w){l.remove(w)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:x,acquireProgram:C,releaseProgram:T,releaseShaderCache:A,programs:u,dispose:I}}function GC(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function WC(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Mx(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Sx(){let t=[],e=0,n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d,f,p,g,y,m){let h=t[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:y,group:m},t[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=y,h.group=m),e++,h}function a(d,f,p,g,y,m){let h=o(d,f,p,g,y,m);p.transmission>0?i.push(h):p.transparent===!0?r.push(h):n.push(h)}function l(d,f,p,g,y,m){let h=o(d,f,p,g,y,m);p.transmission>0?i.unshift(h):p.transparent===!0?r.unshift(h):n.unshift(h)}function c(d,f){n.length>1&&n.sort(d||WC),i.length>1&&i.sort(f||Mx),r.length>1&&r.sort(f||Mx)}function u(){for(let d=e,f=t.length;d<f;d++){let p=t[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function XC(){let t=new WeakMap;function e(i,r){let s=t.get(i),o;return s===void 0?(o=new Sx,t.set(i,[o])):r>=s.length?(o=new Sx,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function YC(){let t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new N,color:new Ye};break;case"SpotLight":n={position:new N,direction:new N,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new N,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":n={direction:new N,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":n={color:new Ye,position:new N,halfWidth:new N,halfHeight:new N};break}return t[e.id]=n,n}}}function qC(){let t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}var $C=0;function ZC(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function JC(t){let e=new YC,n=qC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);let r=new N,s=new yt,o=new yt;function a(c){let u=0,d=0,f=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,g=0,y=0,m=0,h=0,v=0,_=0,x=0,C=0,T=0,A=0;c.sort(ZC);for(let w=0,M=c.length;w<M;w++){let R=c[w],k=R.color,F=R.intensity,B=R.distance,J=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=k.r*F,d+=k.g*F,f+=k.b*F;else if(R.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(R.sh.coefficients[G],F);A++}else if(R.isDirectionalLight){let G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let ie=R.shadow,W=n.get(R);W.shadowIntensity=ie.intensity,W.shadowBias=ie.bias,W.shadowNormalBias=ie.normalBias,W.shadowRadius=ie.radius,W.shadowMapSize=ie.mapSize,i.directionalShadow[p]=W,i.directionalShadowMap[p]=J,i.directionalShadowMatrix[p]=R.shadow.matrix,v++}i.directional[p]=G,p++}else if(R.isSpotLight){let G=e.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(k).multiplyScalar(F),G.distance=B,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,i.spot[y]=G;let ie=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,ie.updateMatrices(R),R.castShadow&&T++),i.spotLightMatrix[y]=ie.matrix,R.castShadow){let W=n.get(R);W.shadowIntensity=ie.intensity,W.shadowBias=ie.bias,W.shadowNormalBias=ie.normalBias,W.shadowRadius=ie.radius,W.shadowMapSize=ie.mapSize,i.spotShadow[y]=W,i.spotShadowMap[y]=J,x++}y++}else if(R.isRectAreaLight){let G=e.get(R);G.color.copy(k).multiplyScalar(F),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=G,m++}else if(R.isPointLight){let G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),G.distance=R.distance,G.decay=R.decay,R.castShadow){let ie=R.shadow,W=n.get(R);W.shadowIntensity=ie.intensity,W.shadowBias=ie.bias,W.shadowNormalBias=ie.normalBias,W.shadowRadius=ie.radius,W.shadowMapSize=ie.mapSize,W.shadowCameraNear=ie.camera.near,W.shadowCameraFar=ie.camera.far,i.pointShadow[g]=W,i.pointShadowMap[g]=J,i.pointShadowMatrix[g]=R.shadow.matrix,_++}i.point[g]=G,g++}else if(R.isHemisphereLight){let G=e.get(R);G.skyColor.copy(R.color).multiplyScalar(F),G.groundColor.copy(R.groundColor).multiplyScalar(F),i.hemi[h]=G,h++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let I=i.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==y||I.rectAreaLength!==m||I.hemiLength!==h||I.numDirectionalShadows!==v||I.numPointShadows!==_||I.numSpotShadows!==x||I.numSpotMaps!==C||I.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=y,i.rectArea.length=m,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=x+C-T,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=A,I.directionalLength=p,I.pointLength=g,I.spotLength=y,I.rectAreaLength=m,I.hemiLength=h,I.numDirectionalShadows=v,I.numPointShadows=_,I.numSpotShadows=x,I.numSpotMaps=C,I.numLightProbes=A,i.version=$C++)}function l(c,u){let d=0,f=0,p=0,g=0,y=0,m=u.matrixWorldInverse;for(let h=0,v=c.length;h<v;h++){let _=c[h];if(_.isDirectionalLight){let x=i.directional[d];x.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),d++}else if(_.isSpotLight){let x=i.spot[p];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),p++}else if(_.isRectAreaLight){let x=i.rectArea[g];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(_.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){let x=i.point[f];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){let x=i.hemi[y];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(m),y++}}}return{setup:a,setupView:l,state:i}}function wx(t){let e=new JC(t),n=[],i=[];function r(u){c.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function o(u){i.push(u)}function a(){e.setup(n)}function l(u){e.setupView(n,u)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function KC(t){let e=new WeakMap;function n(r,s=0){let o=e.get(r),a;return o===void 0?(a=new wx(t),e.set(r,[a])):s>=o.length?(a=new wx(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}var Em=class extends ws{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Gw,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},bm=class extends ws{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},jC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,QC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function eR(t,e,n){let i=new gl,r=new ce,s=new ce,o=new ht,a=new Em({depthPacking:Ww}),l=new bm,c={},u=n.maxTextureSize,d={[Hr]:un,[un]:Hr,[Qi]:Qi},f=new Ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:jC,fragmentShader:QC}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new jt;g.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new qe(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Dx;let h=this.type;this.render=function(T,A,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let w=t.getRenderTarget(),M=t.getActiveCubeFace(),R=t.getActiveMipmapLevel(),k=t.state;k.setBlending(Br),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let F=h!==ji&&this.type===ji,B=h===ji&&this.type!==ji;for(let J=0,G=T.length;J<G;J++){let ie=T[J],W=ie.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);let K=W.getFrameExtents();if(r.multiply(K),s.copy(W.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/K.x),r.x=s.x*K.x,W.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/K.y),r.y=s.y*K.y,W.mapSize.y=s.y)),W.map===null||F===!0||B===!0){let xe=this.type!==ji?{minFilter:hi,magFilter:hi}:{};W.map!==null&&W.map.dispose(),W.map=new sr(r.x,r.y,xe),W.map.texture.name=ie.name+".shadowMap",W.camera.updateProjectionMatrix()}t.setRenderTarget(W.map),t.clear();let fe=W.getViewportCount();for(let xe=0;xe<fe;xe++){let De=W.getViewport(xe);o.set(s.x*De.x,s.y*De.y,s.x*De.z,s.y*De.w),k.viewport(o),W.updateMatrices(ie,xe),i=W.getFrustum(),x(A,I,W.camera,ie,this.type)}W.isPointLightShadow!==!0&&this.type===ji&&v(W,I),W.needsUpdate=!1}h=this.type,m.needsUpdate=!1,t.setRenderTarget(w,M,R)};function v(T,A){let I=e.update(y);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new sr(r.x,r.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,t.setRenderTarget(T.mapPass),t.clear(),t.renderBufferDirect(A,null,I,f,y,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,t.setRenderTarget(T.map),t.clear(),t.renderBufferDirect(A,null,I,p,y,null)}function _(T,A,I,w){let M=null,R=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)M=R;else if(M=I.isPointLight===!0?l:a,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let k=M.uuid,F=A.uuid,B=c[k];B===void 0&&(B={},c[k]=B);let J=B[F];J===void 0&&(J=M.clone(),B[F]=J,A.addEventListener("dispose",C)),M=J}if(M.visible=A.visible,M.wireframe=A.wireframe,w===ji?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:d[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let k=t.properties.get(M);k.light=I}return M}function x(T,A,I,w,M){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===ji)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);let F=e.update(T),B=T.material;if(Array.isArray(B)){let J=F.groups;for(let G=0,ie=J.length;G<ie;G++){let W=J[G],K=B[W.materialIndex];if(K&&K.visible){let fe=_(T,K,w,M);T.onBeforeShadow(t,T,A,I,F,fe,W),t.renderBufferDirect(I,null,F,fe,T,W),T.onAfterShadow(t,T,A,I,F,fe,W)}}}else if(B.visible){let J=_(T,B,w,M);T.onBeforeShadow(t,T,A,I,F,J,null),t.renderBufferDirect(I,null,F,J,T,null),T.onAfterShadow(t,T,A,I,F,J,null)}}let k=T.children;for(let F=0,B=k.length;F<B;F++)x(k[F],A,I,w,M)}function C(T){T.target.removeEventListener("dispose",C);for(let I in c){let w=c[I],M=T.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}var tR={[Pp]:Ip,[Np]:Up,[Lp]:Op,[ko]:Dp,[Ip]:Pp,[Up]:Np,[Op]:Lp,[Dp]:ko};function nR(t,e){function n(){let L=!1,ge=new ht,X=null,ee=new ht(0,0,0,0);return{setMask:function(_e){X!==_e&&!L&&(t.colorMask(_e,_e,_e,_e),X=_e)},setLocked:function(_e){L=_e},setClear:function(_e,ve,Ve,It,tn){tn===!0&&(_e*=It,ve*=It,Ve*=It),ge.set(_e,ve,Ve,It),ee.equals(ge)===!1&&(t.clearColor(_e,ve,Ve,It),ee.copy(ge))},reset:function(){L=!1,X=null,ee.set(-1,0,0,0)}}}function i(){let L=!1,ge=!1,X=null,ee=null,_e=null;return{setReversed:function(ve){if(ge!==ve){let Ve=e.get("EXT_clip_control");ge?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT);let It=_e;_e=null,this.setClear(It)}ge=ve},getReversed:function(){return ge},setTest:function(ve){ve?he(t.DEPTH_TEST):Ne(t.DEPTH_TEST)},setMask:function(ve){X!==ve&&!L&&(t.depthMask(ve),X=ve)},setFunc:function(ve){if(ge&&(ve=tR[ve]),ee!==ve){switch(ve){case Pp:t.depthFunc(t.NEVER);break;case Ip:t.depthFunc(t.ALWAYS);break;case Np:t.depthFunc(t.LESS);break;case ko:t.depthFunc(t.LEQUAL);break;case Lp:t.depthFunc(t.EQUAL);break;case Dp:t.depthFunc(t.GEQUAL);break;case Up:t.depthFunc(t.GREATER);break;case Op:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ee=ve}},setLocked:function(ve){L=ve},setClear:function(ve){_e!==ve&&(ge&&(ve=1-ve),t.clearDepth(ve),_e=ve)},reset:function(){L=!1,X=null,ee=null,_e=null,ge=!1}}}function r(){let L=!1,ge=null,X=null,ee=null,_e=null,ve=null,Ve=null,It=null,tn=null;return{setTest:function(at){L||(at?he(t.STENCIL_TEST):Ne(t.STENCIL_TEST))},setMask:function(at){ge!==at&&!L&&(t.stencilMask(at),ge=at)},setFunc:function(at,Jn,Pi){(X!==at||ee!==Jn||_e!==Pi)&&(t.stencilFunc(at,Jn,Pi),X=at,ee=Jn,_e=Pi)},setOp:function(at,Jn,Pi){(ve!==at||Ve!==Jn||It!==Pi)&&(t.stencilOp(at,Jn,Pi),ve=at,Ve=Jn,It=Pi)},setLocked:function(at){L=at},setClear:function(at){tn!==at&&(t.clearStencil(at),tn=at)},reset:function(){L=!1,ge=null,X=null,ee=null,_e=null,ve=null,Ve=null,It=null,tn=null}}}let s=new n,o=new i,a=new r,l=new WeakMap,c=new WeakMap,u={},d={},f=new WeakMap,p=[],g=null,y=!1,m=null,h=null,v=null,_=null,x=null,C=null,T=null,A=new Ye(0,0,0),I=0,w=!1,M=null,R=null,k=null,F=null,B=null,J=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,ie=0,W=t.getParameter(t.VERSION);W.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(W)[1]),G=ie>=1):W.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),G=ie>=2);let K=null,fe={},xe=t.getParameter(t.SCISSOR_BOX),De=t.getParameter(t.VIEWPORT),Qe=new ht().fromArray(xe),$=new ht().fromArray(De);function oe(L,ge,X,ee){let _e=new Uint8Array(4),ve=t.createTexture();t.bindTexture(L,ve),t.texParameteri(L,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(L,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ve=0;Ve<X;Ve++)L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY?t.texImage3D(ge,0,t.RGBA,1,1,ee,0,t.RGBA,t.UNSIGNED_BYTE,_e):t.texImage2D(ge+Ve,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,_e);return ve}let Te={};Te[t.TEXTURE_2D]=oe(t.TEXTURE_2D,t.TEXTURE_2D,1),Te[t.TEXTURE_CUBE_MAP]=oe(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Te[t.TEXTURE_2D_ARRAY]=oe(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Te[t.TEXTURE_3D]=oe(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),he(t.DEPTH_TEST),o.setFunc(ko),ne(!1),Me(E_),he(t.CULL_FACE),P(Br);function he(L){u[L]!==!0&&(t.enable(L),u[L]=!0)}function Ne(L){u[L]!==!1&&(t.disable(L),u[L]=!1)}function Fe(L,ge){return d[L]!==ge?(t.bindFramebuffer(L,ge),d[L]=ge,L===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=ge),L===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=ge),!0):!1}function Oe(L,ge){let X=p,ee=!1;if(L){X=f.get(ge),X===void 0&&(X=[],f.set(ge,X));let _e=L.textures;if(X.length!==_e.length||X[0]!==t.COLOR_ATTACHMENT0){for(let ve=0,Ve=_e.length;ve<Ve;ve++)X[ve]=t.COLOR_ATTACHMENT0+ve;X.length=_e.length,ee=!0}}else X[0]!==t.BACK&&(X[0]=t.BACK,ee=!0);ee&&t.drawBuffers(X)}function Ke(L){return g!==L?(t.useProgram(L),g=L,!0):!1}let Q={[gs]:t.FUNC_ADD,[vw]:t.FUNC_SUBTRACT,[yw]:t.FUNC_REVERSE_SUBTRACT};Q[_w]=t.MIN,Q[xw]=t.MAX;let le={[Mw]:t.ZERO,[Sw]:t.ONE,[ww]:t.SRC_COLOR,[Cp]:t.SRC_ALPHA,[Rw]:t.SRC_ALPHA_SATURATE,[Aw]:t.DST_COLOR,[bw]:t.DST_ALPHA,[Ew]:t.ONE_MINUS_SRC_COLOR,[Rp]:t.ONE_MINUS_SRC_ALPHA,[Cw]:t.ONE_MINUS_DST_COLOR,[Tw]:t.ONE_MINUS_DST_ALPHA,[Pw]:t.CONSTANT_COLOR,[Iw]:t.ONE_MINUS_CONSTANT_COLOR,[Nw]:t.CONSTANT_ALPHA,[Lw]:t.ONE_MINUS_CONSTANT_ALPHA};function P(L,ge,X,ee,_e,ve,Ve,It,tn,at){if(L===Br){y===!0&&(Ne(t.BLEND),y=!1);return}if(y===!1&&(he(t.BLEND),y=!0),L!==gw){if(L!==m||at!==w){if((h!==gs||x!==gs)&&(t.blendEquation(t.FUNC_ADD),h=gs,x=gs),at)switch(L){case Lo:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case b_:t.blendFunc(t.ONE,t.ONE);break;case T_:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case A_:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Lo:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case b_:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case T_:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case A_:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}v=null,_=null,C=null,T=null,A.set(0,0,0),I=0,m=L,w=at}return}_e=_e||ge,ve=ve||X,Ve=Ve||ee,(ge!==h||_e!==x)&&(t.blendEquationSeparate(Q[ge],Q[_e]),h=ge,x=_e),(X!==v||ee!==_||ve!==C||Ve!==T)&&(t.blendFuncSeparate(le[X],le[ee],le[ve],le[Ve]),v=X,_=ee,C=ve,T=Ve),(It.equals(A)===!1||tn!==I)&&(t.blendColor(It.r,It.g,It.b,tn),A.copy(It),I=tn),m=L,w=!1}function Ae(L,ge){L.side===Qi?Ne(t.CULL_FACE):he(t.CULL_FACE);let X=L.side===un;ge&&(X=!X),ne(X),L.blending===Lo&&L.transparent===!1?P(Br):P(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);let ee=L.stencilWrite;a.setTest(ee),ee&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ue(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?he(t.SAMPLE_ALPHA_TO_COVERAGE):Ne(t.SAMPLE_ALPHA_TO_COVERAGE)}function ne(L){M!==L&&(L?t.frontFace(t.CW):t.frontFace(t.CCW),M=L)}function Me(L){L!==pw?(he(t.CULL_FACE),L!==R&&(L===E_?t.cullFace(t.BACK):L===mw?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Ne(t.CULL_FACE),R=L}function de(L){L!==k&&(G&&t.lineWidth(L),k=L)}function Ue(L,ge,X){L?(he(t.POLYGON_OFFSET_FILL),(F!==ge||B!==X)&&(t.polygonOffset(ge,X),F=ge,B=X)):Ne(t.POLYGON_OFFSET_FILL)}function Z(L){L?he(t.SCISSOR_TEST):Ne(t.SCISSOR_TEST)}function E(L){L===void 0&&(L=t.TEXTURE0+J-1),K!==L&&(t.activeTexture(L),K=L)}function S(L,ge,X){X===void 0&&(K===null?X=t.TEXTURE0+J-1:X=K);let ee=fe[X];ee===void 0&&(ee={type:void 0,texture:void 0},fe[X]=ee),(ee.type!==L||ee.texture!==ge)&&(K!==X&&(t.activeTexture(X),K=X),t.bindTexture(L,ge||Te[L]),ee.type=L,ee.texture=ge)}function O(){let L=fe[K];L!==void 0&&L.type!==void 0&&(t.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function q(){try{t.compressedTexImage2D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function j(){try{t.compressedTexImage3D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Y(){try{t.texSubImage2D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ce(){try{t.texSubImage3D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function me(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Je(){try{t.texStorage2D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ae(){try{t.texStorage3D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{t.texImage2D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ke(){try{t.texImage3D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Be(L){Qe.equals(L)===!1&&(t.scissor(L.x,L.y,L.z,L.w),Qe.copy(L))}function be(L){$.equals(L)===!1&&(t.viewport(L.x,L.y,L.z,L.w),$.copy(L))}function je(L,ge){let X=c.get(ge);X===void 0&&(X=new WeakMap,c.set(ge,X));let ee=X.get(L);ee===void 0&&(ee=t.getUniformBlockIndex(ge,L.name),X.set(L,ee))}function We(L,ge){let ee=c.get(ge).get(L);l.get(ge)!==ee&&(t.uniformBlockBinding(ge,ee,L.__bindingPointIndex),l.set(ge,ee))}function pt(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),u={},K=null,fe={},d={},f=new WeakMap,p=[],g=null,y=!1,m=null,h=null,v=null,_=null,x=null,C=null,T=null,A=new Ye(0,0,0),I=0,w=!1,M=null,R=null,k=null,F=null,B=null,Qe.set(0,0,t.canvas.width,t.canvas.height),$.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:he,disable:Ne,bindFramebuffer:Fe,drawBuffers:Oe,useProgram:Ke,setBlending:P,setMaterial:Ae,setFlipSided:ne,setCullFace:Me,setLineWidth:de,setPolygonOffset:Ue,setScissorTest:Z,activeTexture:E,bindTexture:S,unbindTexture:O,compressedTexImage2D:q,compressedTexImage3D:j,texImage2D:Ee,texImage3D:ke,updateUBOMapping:je,uniformBlockBinding:We,texStorage2D:Je,texStorage3D:ae,texSubImage2D:Y,texSubImage3D:Ce,compressedTexSubImage2D:me,compressedTexSubImage3D:Se,scissor:Be,viewport:be,reset:pt}}function Ex(t,e,n,i){let r=iR(i);switch(n){case zx:return t*e;case Hx:return t*e;case Gx:return t*e*2;case Wx:return t*e/r.components*r.byteLength;case ig:return t*e/r.components*r.byteLength;case Xx:return t*e*2/r.components*r.byteLength;case rg:return t*e*2/r.components*r.byteLength;case Vx:return t*e*3/r.components*r.byteLength;case ui:return t*e*4/r.components*r.byteLength;case sg:return t*e*4/r.components*r.byteLength;case Lu:case Du:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Uu:case Ou:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Vp:case Gp:return Math.max(t,16)*Math.max(e,8)/4;case zp:case Hp:return Math.max(t,8)*Math.max(e,8)/2;case Wp:case Xp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Yp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case qp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case $p:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Zp:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Jp:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Kp:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case jp:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Qp:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case em:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case tm:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case nm:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case im:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case rm:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case sm:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case om:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case ku:case am:case lm:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Yx:case cm:return Math.ceil(t/4)*Math.ceil(e/4)*8;case um:case hm:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function iR(t){switch(t){case rr:case kx:return{byteLength:1,components:1};case fl:case Fx:case Rl:return{byteLength:2,components:1};case tg:case ng:return{byteLength:2,components:4};case Ms:case eg:case er:return{byteLength:4,components:1};case Bx:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function rR(t,e,n,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ce,u=new WeakMap,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,S){return p?new OffscreenCanvas(E,S):zu("canvas")}function y(E,S,O){let q=1,j=Z(E);if((j.width>O||j.height>O)&&(q=O/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement!="undefined"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&E instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&E instanceof ImageBitmap||typeof VideoFrame!="undefined"&&E instanceof VideoFrame){let Y=Math.floor(q*j.width),Ce=Math.floor(q*j.height);d===void 0&&(d=g(Y,Ce));let me=S?g(Y,Ce):d;return me.width=Y,me.height=Ce,me.getContext("2d").drawImage(E,0,0,Y,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+Y+"x"+Ce+")."),me}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),E;return E}function m(E){return E.generateMipmaps}function h(E){t.generateMipmap(E)}function v(E){return E.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?t.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function _(E,S,O,q,j=!1){if(E!==null){if(t[E]!==void 0)return t[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Y=S;if(S===t.RED&&(O===t.FLOAT&&(Y=t.R32F),O===t.HALF_FLOAT&&(Y=t.R16F),O===t.UNSIGNED_BYTE&&(Y=t.R8)),S===t.RED_INTEGER&&(O===t.UNSIGNED_BYTE&&(Y=t.R8UI),O===t.UNSIGNED_SHORT&&(Y=t.R16UI),O===t.UNSIGNED_INT&&(Y=t.R32UI),O===t.BYTE&&(Y=t.R8I),O===t.SHORT&&(Y=t.R16I),O===t.INT&&(Y=t.R32I)),S===t.RG&&(O===t.FLOAT&&(Y=t.RG32F),O===t.HALF_FLOAT&&(Y=t.RG16F),O===t.UNSIGNED_BYTE&&(Y=t.RG8)),S===t.RG_INTEGER&&(O===t.UNSIGNED_BYTE&&(Y=t.RG8UI),O===t.UNSIGNED_SHORT&&(Y=t.RG16UI),O===t.UNSIGNED_INT&&(Y=t.RG32UI),O===t.BYTE&&(Y=t.RG8I),O===t.SHORT&&(Y=t.RG16I),O===t.INT&&(Y=t.RG32I)),S===t.RGB_INTEGER&&(O===t.UNSIGNED_BYTE&&(Y=t.RGB8UI),O===t.UNSIGNED_SHORT&&(Y=t.RGB16UI),O===t.UNSIGNED_INT&&(Y=t.RGB32UI),O===t.BYTE&&(Y=t.RGB8I),O===t.SHORT&&(Y=t.RGB16I),O===t.INT&&(Y=t.RGB32I)),S===t.RGBA_INTEGER&&(O===t.UNSIGNED_BYTE&&(Y=t.RGBA8UI),O===t.UNSIGNED_SHORT&&(Y=t.RGBA16UI),O===t.UNSIGNED_INT&&(Y=t.RGBA32UI),O===t.BYTE&&(Y=t.RGBA8I),O===t.SHORT&&(Y=t.RGBA16I),O===t.INT&&(Y=t.RGBA32I)),S===t.RGB&&O===t.UNSIGNED_INT_5_9_9_9_REV&&(Y=t.RGB9_E5),S===t.RGBA){let Ce=j?dh:tt.getTransfer(q);O===t.FLOAT&&(Y=t.RGBA32F),O===t.HALF_FLOAT&&(Y=t.RGBA16F),O===t.UNSIGNED_BYTE&&(Y=Ce===ut?t.SRGB8_ALPHA8:t.RGBA8),O===t.UNSIGNED_SHORT_4_4_4_4&&(Y=t.RGBA4),O===t.UNSIGNED_SHORT_5_5_5_1&&(Y=t.RGB5_A1)}return(Y===t.R16F||Y===t.R32F||Y===t.RG16F||Y===t.RG32F||Y===t.RGBA16F||Y===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function x(E,S){let O;return E?S===null||S===Ms||S===Vo?O=t.DEPTH24_STENCIL8:S===er?O=t.DEPTH32F_STENCIL8:S===fl&&(O=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ms||S===Vo?O=t.DEPTH_COMPONENT24:S===er?O=t.DEPTH_COMPONENT32F:S===fl&&(O=t.DEPTH_COMPONENT16),O}function C(E,S){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==hi&&E.minFilter!==bi?Math.log2(Math.max(S.width,S.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?S.mipmaps.length:1}function T(E){let S=E.target;S.removeEventListener("dispose",T),I(S),S.isVideoTexture&&u.delete(S)}function A(E){let S=E.target;S.removeEventListener("dispose",A),M(S)}function I(E){let S=i.get(E);if(S.__webglInit===void 0)return;let O=E.source,q=f.get(O);if(q){let j=q[S.__cacheKey];j.usedTimes--,j.usedTimes===0&&w(E),Object.keys(q).length===0&&f.delete(O)}i.remove(E)}function w(E){let S=i.get(E);t.deleteTexture(S.__webglTexture);let O=E.source,q=f.get(O);delete q[S.__cacheKey],o.memory.textures--}function M(E){let S=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(S.__webglFramebuffer[q]))for(let j=0;j<S.__webglFramebuffer[q].length;j++)t.deleteFramebuffer(S.__webglFramebuffer[q][j]);else t.deleteFramebuffer(S.__webglFramebuffer[q]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[q])}else{if(Array.isArray(S.__webglFramebuffer))for(let q=0;q<S.__webglFramebuffer.length;q++)t.deleteFramebuffer(S.__webglFramebuffer[q]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let q=0;q<S.__webglColorRenderbuffer.length;q++)S.__webglColorRenderbuffer[q]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let O=E.textures;for(let q=0,j=O.length;q<j;q++){let Y=i.get(O[q]);Y.__webglTexture&&(t.deleteTexture(Y.__webglTexture),o.memory.textures--),i.remove(O[q])}i.remove(E)}let R=0;function k(){R=0}function F(){let E=R;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),R+=1,E}function B(E){let S=[];return S.push(E.wrapS),S.push(E.wrapT),S.push(E.wrapR||0),S.push(E.magFilter),S.push(E.minFilter),S.push(E.anisotropy),S.push(E.internalFormat),S.push(E.format),S.push(E.type),S.push(E.generateMipmaps),S.push(E.premultiplyAlpha),S.push(E.flipY),S.push(E.unpackAlignment),S.push(E.colorSpace),S.join()}function J(E,S){let O=i.get(E);if(E.isVideoTexture&&de(E),E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){let q=E.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(O,E,S);return}}n.bindTexture(t.TEXTURE_2D,O.__webglTexture,t.TEXTURE0+S)}function G(E,S){let O=i.get(E);if(E.version>0&&O.__version!==E.version){$(O,E,S);return}n.bindTexture(t.TEXTURE_2D_ARRAY,O.__webglTexture,t.TEXTURE0+S)}function ie(E,S){let O=i.get(E);if(E.version>0&&O.__version!==E.version){$(O,E,S);return}n.bindTexture(t.TEXTURE_3D,O.__webglTexture,t.TEXTURE0+S)}function W(E,S){let O=i.get(E);if(E.version>0&&O.__version!==E.version){oe(O,E,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,O.__webglTexture,t.TEXTURE0+S)}let K={[zo]:t.REPEAT,[_s]:t.CLAMP_TO_EDGE,[Bp]:t.MIRRORED_REPEAT},fe={[hi]:t.NEAREST,[Hw]:t.NEAREST_MIPMAP_NEAREST,[lu]:t.NEAREST_MIPMAP_LINEAR,[bi]:t.LINEAR,[Zf]:t.LINEAR_MIPMAP_NEAREST,[xs]:t.LINEAR_MIPMAP_LINEAR},xe={[Yw]:t.NEVER,[jw]:t.ALWAYS,[qw]:t.LESS,[$x]:t.LEQUAL,[$w]:t.EQUAL,[Kw]:t.GEQUAL,[Zw]:t.GREATER,[Jw]:t.NOTEQUAL};function De(E,S){if(S.type===er&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===bi||S.magFilter===Zf||S.magFilter===lu||S.magFilter===xs||S.minFilter===bi||S.minFilter===Zf||S.minFilter===lu||S.minFilter===xs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(E,t.TEXTURE_WRAP_S,K[S.wrapS]),t.texParameteri(E,t.TEXTURE_WRAP_T,K[S.wrapT]),(E===t.TEXTURE_3D||E===t.TEXTURE_2D_ARRAY)&&t.texParameteri(E,t.TEXTURE_WRAP_R,K[S.wrapR]),t.texParameteri(E,t.TEXTURE_MAG_FILTER,fe[S.magFilter]),t.texParameteri(E,t.TEXTURE_MIN_FILTER,fe[S.minFilter]),S.compareFunction&&(t.texParameteri(E,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(E,t.TEXTURE_COMPARE_FUNC,xe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===hi||S.minFilter!==lu&&S.minFilter!==xs||S.type===er&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");t.texParameterf(E,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Qe(E,S){let O=!1;E.__webglInit===void 0&&(E.__webglInit=!0,S.addEventListener("dispose",T));let q=S.source,j=f.get(q);j===void 0&&(j={},f.set(q,j));let Y=B(S);if(Y!==E.__cacheKey){j[Y]===void 0&&(j[Y]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,O=!0),j[Y].usedTimes++;let Ce=j[E.__cacheKey];Ce!==void 0&&(j[E.__cacheKey].usedTimes--,Ce.usedTimes===0&&w(S)),E.__cacheKey=Y,E.__webglTexture=j[Y].texture}return O}function $(E,S,O){let q=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(q=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(q=t.TEXTURE_3D);let j=Qe(E,S),Y=S.source;n.bindTexture(q,E.__webglTexture,t.TEXTURE0+O);let Ce=i.get(Y);if(Y.version!==Ce.__version||j===!0){n.activeTexture(t.TEXTURE0+O);let me=tt.getPrimaries(tt.workingColorSpace),Se=S.colorSpace===Fr?null:tt.getPrimaries(S.colorSpace),Je=S.colorSpace===Fr||me===Se?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);let ae=y(S.image,!1,r.maxTextureSize);ae=Ue(S,ae);let Ee=s.convert(S.format,S.colorSpace),ke=s.convert(S.type),Be=_(S.internalFormat,Ee,ke,S.colorSpace,S.isVideoTexture);De(q,S);let be,je=S.mipmaps,We=S.isVideoTexture!==!0,pt=Ce.__version===void 0||j===!0,L=Y.dataReady,ge=C(S,ae);if(S.isDepthTexture)Be=x(S.format===Ho,S.type),pt&&(We?n.texStorage2D(t.TEXTURE_2D,1,Be,ae.width,ae.height):n.texImage2D(t.TEXTURE_2D,0,Be,ae.width,ae.height,0,Ee,ke,null));else if(S.isDataTexture)if(je.length>0){We&&pt&&n.texStorage2D(t.TEXTURE_2D,ge,Be,je[0].width,je[0].height);for(let X=0,ee=je.length;X<ee;X++)be=je[X],We?L&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,be.width,be.height,Ee,ke,be.data):n.texImage2D(t.TEXTURE_2D,X,Be,be.width,be.height,0,Ee,ke,be.data);S.generateMipmaps=!1}else We?(pt&&n.texStorage2D(t.TEXTURE_2D,ge,Be,ae.width,ae.height),L&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ae.width,ae.height,Ee,ke,ae.data)):n.texImage2D(t.TEXTURE_2D,0,Be,ae.width,ae.height,0,Ee,ke,ae.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){We&&pt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ge,Be,je[0].width,je[0].height,ae.depth);for(let X=0,ee=je.length;X<ee;X++)if(be=je[X],S.format!==ui)if(Ee!==null)if(We){if(L)if(S.layerUpdates.size>0){let _e=Ex(be.width,be.height,S.format,S.type);for(let ve of S.layerUpdates){let Ve=be.data.subarray(ve*_e/be.data.BYTES_PER_ELEMENT,(ve+1)*_e/be.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,ve,be.width,be.height,1,Ee,Ve)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,0,be.width,be.height,ae.depth,Ee,be.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,X,Be,be.width,be.height,ae.depth,0,be.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?L&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,0,be.width,be.height,ae.depth,Ee,ke,be.data):n.texImage3D(t.TEXTURE_2D_ARRAY,X,Be,be.width,be.height,ae.depth,0,Ee,ke,be.data)}else{We&&pt&&n.texStorage2D(t.TEXTURE_2D,ge,Be,je[0].width,je[0].height);for(let X=0,ee=je.length;X<ee;X++)be=je[X],S.format!==ui?Ee!==null?We?L&&n.compressedTexSubImage2D(t.TEXTURE_2D,X,0,0,be.width,be.height,Ee,be.data):n.compressedTexImage2D(t.TEXTURE_2D,X,Be,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?L&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,be.width,be.height,Ee,ke,be.data):n.texImage2D(t.TEXTURE_2D,X,Be,be.width,be.height,0,Ee,ke,be.data)}else if(S.isDataArrayTexture)if(We){if(pt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ge,Be,ae.width,ae.height,ae.depth),L)if(S.layerUpdates.size>0){let X=Ex(ae.width,ae.height,S.format,S.type);for(let ee of S.layerUpdates){let _e=ae.data.subarray(ee*X/ae.data.BYTES_PER_ELEMENT,(ee+1)*X/ae.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ee,ae.width,ae.height,1,Ee,ke,_e)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,Ee,ke,ae.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Be,ae.width,ae.height,ae.depth,0,Ee,ke,ae.data);else if(S.isData3DTexture)We?(pt&&n.texStorage3D(t.TEXTURE_3D,ge,Be,ae.width,ae.height,ae.depth),L&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,Ee,ke,ae.data)):n.texImage3D(t.TEXTURE_3D,0,Be,ae.width,ae.height,ae.depth,0,Ee,ke,ae.data);else if(S.isFramebufferTexture){if(pt)if(We)n.texStorage2D(t.TEXTURE_2D,ge,Be,ae.width,ae.height);else{let X=ae.width,ee=ae.height;for(let _e=0;_e<ge;_e++)n.texImage2D(t.TEXTURE_2D,_e,Be,X,ee,0,Ee,ke,null),X>>=1,ee>>=1}}else if(je.length>0){if(We&&pt){let X=Z(je[0]);n.texStorage2D(t.TEXTURE_2D,ge,Be,X.width,X.height)}for(let X=0,ee=je.length;X<ee;X++)be=je[X],We?L&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,Ee,ke,be):n.texImage2D(t.TEXTURE_2D,X,Be,Ee,ke,be);S.generateMipmaps=!1}else if(We){if(pt){let X=Z(ae);n.texStorage2D(t.TEXTURE_2D,ge,Be,X.width,X.height)}L&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Ee,ke,ae)}else n.texImage2D(t.TEXTURE_2D,0,Be,Ee,ke,ae);m(S)&&h(q),Ce.__version=Y.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function oe(E,S,O){if(S.image.length!==6)return;let q=Qe(E,S),j=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,E.__webglTexture,t.TEXTURE0+O);let Y=i.get(j);if(j.version!==Y.__version||q===!0){n.activeTexture(t.TEXTURE0+O);let Ce=tt.getPrimaries(tt.workingColorSpace),me=S.colorSpace===Fr?null:tt.getPrimaries(S.colorSpace),Se=S.colorSpace===Fr||Ce===me?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let Je=S.isCompressedTexture||S.image[0].isCompressedTexture,ae=S.image[0]&&S.image[0].isDataTexture,Ee=[];for(let ee=0;ee<6;ee++)!Je&&!ae?Ee[ee]=y(S.image[ee],!0,r.maxCubemapSize):Ee[ee]=ae?S.image[ee].image:S.image[ee],Ee[ee]=Ue(S,Ee[ee]);let ke=Ee[0],Be=s.convert(S.format,S.colorSpace),be=s.convert(S.type),je=_(S.internalFormat,Be,be,S.colorSpace),We=S.isVideoTexture!==!0,pt=Y.__version===void 0||q===!0,L=j.dataReady,ge=C(S,ke);De(t.TEXTURE_CUBE_MAP,S);let X;if(Je){We&&pt&&n.texStorage2D(t.TEXTURE_CUBE_MAP,ge,je,ke.width,ke.height);for(let ee=0;ee<6;ee++){X=Ee[ee].mipmaps;for(let _e=0;_e<X.length;_e++){let ve=X[_e];S.format!==ui?Be!==null?We?L&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e,0,0,ve.width,ve.height,Be,ve.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e,je,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?L&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e,0,0,ve.width,ve.height,Be,be,ve.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e,je,ve.width,ve.height,0,Be,be,ve.data)}}}else{if(X=S.mipmaps,We&&pt){X.length>0&&ge++;let ee=Z(Ee[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,ge,je,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(ae){We?L&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ee[ee].width,Ee[ee].height,Be,be,Ee[ee].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,je,Ee[ee].width,Ee[ee].height,0,Be,be,Ee[ee].data);for(let _e=0;_e<X.length;_e++){let Ve=X[_e].image[ee].image;We?L&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e+1,0,0,Ve.width,Ve.height,Be,be,Ve.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e+1,je,Ve.width,Ve.height,0,Be,be,Ve.data)}}else{We?L&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Be,be,Ee[ee]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,je,Be,be,Ee[ee]);for(let _e=0;_e<X.length;_e++){let ve=X[_e];We?L&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e+1,0,0,Be,be,ve.image[ee]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,_e+1,je,Be,be,ve.image[ee])}}}m(S)&&h(t.TEXTURE_CUBE_MAP),Y.__version=j.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function Te(E,S,O,q,j,Y){let Ce=s.convert(O.format,O.colorSpace),me=s.convert(O.type),Se=_(O.internalFormat,Ce,me,O.colorSpace),Je=i.get(S),ae=i.get(O);if(ae.__renderTarget=S,!Je.__hasExternalTextures){let Ee=Math.max(1,S.width>>Y),ke=Math.max(1,S.height>>Y);j===t.TEXTURE_3D||j===t.TEXTURE_2D_ARRAY?n.texImage3D(j,Y,Se,Ee,ke,S.depth,0,Ce,me,null):n.texImage2D(j,Y,Se,Ee,ke,0,Ce,me,null)}n.bindFramebuffer(t.FRAMEBUFFER,E),Me(S)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,q,j,ae.__webglTexture,0,ne(S)):(j===t.TEXTURE_2D||j>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,q,j,ae.__webglTexture,Y),n.bindFramebuffer(t.FRAMEBUFFER,null)}function he(E,S,O){if(t.bindRenderbuffer(t.RENDERBUFFER,E),S.depthBuffer){let q=S.depthTexture,j=q&&q.isDepthTexture?q.type:null,Y=x(S.stencilBuffer,j),Ce=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,me=ne(S);Me(S)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,me,Y,S.width,S.height):O?t.renderbufferStorageMultisample(t.RENDERBUFFER,me,Y,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,Y,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Ce,t.RENDERBUFFER,E)}else{let q=S.textures;for(let j=0;j<q.length;j++){let Y=q[j],Ce=s.convert(Y.format,Y.colorSpace),me=s.convert(Y.type),Se=_(Y.internalFormat,Ce,me,Y.colorSpace),Je=ne(S);O&&Me(S)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Je,Se,S.width,S.height):Me(S)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Je,Se,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,Se,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ne(E,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,E),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=i.get(S.depthTexture);q.__renderTarget=S,(!q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),J(S.depthTexture,0);let j=q.__webglTexture,Y=ne(S);if(S.depthTexture.format===Do)Me(S)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,j,0,Y):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,j,0);else if(S.depthTexture.format===Ho)Me(S)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,j,0,Y):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Fe(E){let S=i.get(E),O=E.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==E.depthTexture){let q=E.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),q){let j=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),S.__depthDisposeCallback=j}S.__boundDepthTexture=q}if(E.depthTexture&&!S.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Ne(S.__webglFramebuffer,E)}else if(O){S.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[q]),S.__webglDepthbuffer[q]===void 0)S.__webglDepthbuffer[q]=t.createRenderbuffer(),he(S.__webglDepthbuffer[q],E,!1);else{let j=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer[q];t.bindRenderbuffer(t.RENDERBUFFER,Y),t.framebufferRenderbuffer(t.FRAMEBUFFER,j,t.RENDERBUFFER,Y)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),he(S.__webglDepthbuffer,E,!1);else{let q=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,j=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,j),t.framebufferRenderbuffer(t.FRAMEBUFFER,q,t.RENDERBUFFER,j)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Oe(E,S,O){let q=i.get(E);S!==void 0&&Te(q.__webglFramebuffer,E,E.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),O!==void 0&&Fe(E)}function Ke(E){let S=E.texture,O=i.get(E),q=i.get(S);E.addEventListener("dispose",A);let j=E.textures,Y=E.isWebGLCubeRenderTarget===!0,Ce=j.length>1;if(Ce||(q.__webglTexture===void 0&&(q.__webglTexture=t.createTexture()),q.__version=S.version,o.memory.textures++),Y){O.__webglFramebuffer=[];for(let me=0;me<6;me++)if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer[me]=[];for(let Se=0;Se<S.mipmaps.length;Se++)O.__webglFramebuffer[me][Se]=t.createFramebuffer()}else O.__webglFramebuffer[me]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer=[];for(let me=0;me<S.mipmaps.length;me++)O.__webglFramebuffer[me]=t.createFramebuffer()}else O.__webglFramebuffer=t.createFramebuffer();if(Ce)for(let me=0,Se=j.length;me<Se;me++){let Je=i.get(j[me]);Je.__webglTexture===void 0&&(Je.__webglTexture=t.createTexture(),o.memory.textures++)}if(E.samples>0&&Me(E)===!1){O.__webglMultisampledFramebuffer=t.createFramebuffer(),O.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let me=0;me<j.length;me++){let Se=j[me];O.__webglColorRenderbuffer[me]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,O.__webglColorRenderbuffer[me]);let Je=s.convert(Se.format,Se.colorSpace),ae=s.convert(Se.type),Ee=_(Se.internalFormat,Je,ae,Se.colorSpace,E.isXRRenderTarget===!0),ke=ne(E);t.renderbufferStorageMultisample(t.RENDERBUFFER,ke,Ee,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,O.__webglColorRenderbuffer[me])}t.bindRenderbuffer(t.RENDERBUFFER,null),E.depthBuffer&&(O.__webglDepthRenderbuffer=t.createRenderbuffer(),he(O.__webglDepthRenderbuffer,E,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(Y){n.bindTexture(t.TEXTURE_CUBE_MAP,q.__webglTexture),De(t.TEXTURE_CUBE_MAP,S);for(let me=0;me<6;me++)if(S.mipmaps&&S.mipmaps.length>0)for(let Se=0;Se<S.mipmaps.length;Se++)Te(O.__webglFramebuffer[me][Se],E,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+me,Se);else Te(O.__webglFramebuffer[me],E,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);m(S)&&h(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ce){for(let me=0,Se=j.length;me<Se;me++){let Je=j[me],ae=i.get(Je);n.bindTexture(t.TEXTURE_2D,ae.__webglTexture),De(t.TEXTURE_2D,Je),Te(O.__webglFramebuffer,E,Je,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,0),m(Je)&&h(t.TEXTURE_2D)}n.unbindTexture()}else{let me=t.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(me=E.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(me,q.__webglTexture),De(me,S),S.mipmaps&&S.mipmaps.length>0)for(let Se=0;Se<S.mipmaps.length;Se++)Te(O.__webglFramebuffer[Se],E,S,t.COLOR_ATTACHMENT0,me,Se);else Te(O.__webglFramebuffer,E,S,t.COLOR_ATTACHMENT0,me,0);m(S)&&h(me),n.unbindTexture()}E.depthBuffer&&Fe(E)}function Q(E){let S=E.textures;for(let O=0,q=S.length;O<q;O++){let j=S[O];if(m(j)){let Y=v(E),Ce=i.get(j).__webglTexture;n.bindTexture(Y,Ce),h(Y),n.unbindTexture()}}}let le=[],P=[];function Ae(E){if(E.samples>0){if(Me(E)===!1){let S=E.textures,O=E.width,q=E.height,j=t.COLOR_BUFFER_BIT,Y=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ce=i.get(E),me=S.length>1;if(me)for(let Se=0;Se<S.length;Se++)n.bindFramebuffer(t.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Ce.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Se=0;Se<S.length;Se++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(j|=t.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(j|=t.STENCIL_BUFFER_BIT)),me){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Ce.__webglColorRenderbuffer[Se]);let Je=i.get(S[Se]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Je,0)}t.blitFramebuffer(0,0,O,q,0,0,O,q,j,t.NEAREST),l===!0&&(le.length=0,P.length=0,le.push(t.COLOR_ATTACHMENT0+Se),E.depthBuffer&&E.resolveDepthBuffer===!1&&(le.push(Y),P.push(Y),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,P)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,le))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),me)for(let Se=0;Se<S.length;Se++){n.bindFramebuffer(t.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,Ce.__webglColorRenderbuffer[Se]);let Je=i.get(S[Se]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Ce.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,Je,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let S=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function ne(E){return Math.min(r.maxSamples,E.samples)}function Me(E){let S=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function de(E){let S=o.render.frame;u.get(E)!==S&&(u.set(E,S),E.update())}function Ue(E,S){let O=E.colorSpace,q=E.format,j=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||O!==Zo&&O!==Fr&&(tt.getTransfer(O)===ut?(q!==ui||j!==rr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),S}function Z(E){return typeof HTMLImageElement!="undefined"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame!="undefined"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=k,this.setTexture2D=J,this.setTexture2DArray=G,this.setTexture3D=ie,this.setTextureCube=W,this.rebindTextures=Oe,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=Me}function sR(t,e){function n(i,r=Fr){let s,o=tt.getTransfer(r);if(i===rr)return t.UNSIGNED_BYTE;if(i===tg)return t.UNSIGNED_SHORT_4_4_4_4;if(i===ng)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Bx)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===kx)return t.BYTE;if(i===Fx)return t.SHORT;if(i===fl)return t.UNSIGNED_SHORT;if(i===eg)return t.INT;if(i===Ms)return t.UNSIGNED_INT;if(i===er)return t.FLOAT;if(i===Rl)return t.HALF_FLOAT;if(i===zx)return t.ALPHA;if(i===Vx)return t.RGB;if(i===ui)return t.RGBA;if(i===Hx)return t.LUMINANCE;if(i===Gx)return t.LUMINANCE_ALPHA;if(i===Do)return t.DEPTH_COMPONENT;if(i===Ho)return t.DEPTH_STENCIL;if(i===Wx)return t.RED;if(i===ig)return t.RED_INTEGER;if(i===Xx)return t.RG;if(i===rg)return t.RG_INTEGER;if(i===sg)return t.RGBA_INTEGER;if(i===Lu||i===Du||i===Uu||i===Ou)if(o===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Lu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Du)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Uu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ou)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Lu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Du)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Uu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ou)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===zp||i===Vp||i===Hp||i===Gp)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===zp)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Vp)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Hp)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Gp)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Wp||i===Xp||i===Yp)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Wp||i===Xp)return o===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Yp)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===qp||i===$p||i===Zp||i===Jp||i===Kp||i===jp||i===Qp||i===em||i===tm||i===nm||i===im||i===rm||i===sm||i===om)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===qp)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===$p)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Zp)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Jp)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Kp)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===jp)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Qp)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===em)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===tm)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===nm)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===im)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===rm)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===sm)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===om)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ku||i===am||i===lm)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ku)return o===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===am)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===lm)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Yx||i===cm||i===um||i===hm)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ku)return s.COMPRESSED_RED_RGTC1_EXT;if(i===cm)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===um)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===hm)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Vo?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}var Tm=class extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},nr=class extends Kt{constructor(){super(),this.isGroup=!0,this.type="Group"}},oR={type:"move"},ul=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let n=this._hand;if(n)for(let i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let y of e.hand.values()){let m=n.getJointPose(y,i),h=this._getHandJoint(c,y);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(oR)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){let i=new nr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}},aR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Am=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){let r=new kn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let n=e.cameras[0].viewport,i=new Ai({vertexShader:aR,fragmentShader:lR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new qe(new ar(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Cm=class extends Gr{constructor(e,n){super();let i=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,p=null,g=null,y=new Am,m=n.getContextAttributes(),h=null,v=null,_=[],x=[],C=new ce,T=null,A=new zt;A.viewport=new ht;let I=new zt;I.viewport=new ht;let w=[A,I],M=new Tm,R=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let oe=_[$];return oe===void 0&&(oe=new ul,_[$]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function($){let oe=_[$];return oe===void 0&&(oe=new ul,_[$]=oe),oe.getGripSpace()},this.getHand=function($){let oe=_[$];return oe===void 0&&(oe=new ul,_[$]=oe),oe.getHandSpace()};function F($){let oe=x.indexOf($.inputSource);if(oe===-1)return;let Te=_[oe];Te!==void 0&&(Te.update($.inputSource,$.frame,c||o),Te.dispatchEvent({type:$.type,data:$.inputSource}))}function B(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",J);for(let $=0;$<_.length;$++){let oe=x[$];oe!==null&&(x[$]=null,_[$].disconnect(oe))}R=null,k=null,y.reset(),e.setRenderTarget(h),p=null,f=null,d=null,r=null,v=null,Qe.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(h=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",B),r.addEventListener("inputsourceschange",J),m.xrCompatible!==!0&&await n.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(C),r.renderState.layers===void 0){let oe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,oe),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new sr(p.framebufferWidth,p.framebufferHeight,{format:ui,type:rr,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let oe=null,Te=null,he=null;m.depth&&(he=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,oe=m.stencil?Ho:Do,Te=m.stencil?Vo:Ms);let Ne={colorFormat:n.RGBA8,depthFormat:he,scaleFactor:s};d=new XRWebGLBinding(r,n),f=d.createProjectionLayer(Ne),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new sr(f.textureWidth,f.textureHeight,{format:ui,type:rr,depthTexture:new Zu(f.textureWidth,f.textureHeight,Te,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Qe.setContext(r),Qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function J($){for(let oe=0;oe<$.removed.length;oe++){let Te=$.removed[oe],he=x.indexOf(Te);he>=0&&(x[he]=null,_[he].disconnect(Te))}for(let oe=0;oe<$.added.length;oe++){let Te=$.added[oe],he=x.indexOf(Te);if(he===-1){for(let Fe=0;Fe<_.length;Fe++)if(Fe>=x.length){x.push(Te),he=Fe;break}else if(x[Fe]===null){x[Fe]=Te,he=Fe;break}if(he===-1)break}let Ne=_[he];Ne&&Ne.connect(Te)}}let G=new N,ie=new N;function W($,oe,Te){G.setFromMatrixPosition(oe.matrixWorld),ie.setFromMatrixPosition(Te.matrixWorld);let he=G.distanceTo(ie),Ne=oe.projectionMatrix.elements,Fe=Te.projectionMatrix.elements,Oe=Ne[14]/(Ne[10]-1),Ke=Ne[14]/(Ne[10]+1),Q=(Ne[9]+1)/Ne[5],le=(Ne[9]-1)/Ne[5],P=(Ne[8]-1)/Ne[0],Ae=(Fe[8]+1)/Fe[0],ne=Oe*P,Me=Oe*Ae,de=he/(-P+Ae),Ue=de*-P;if(oe.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ue),$.translateZ(de),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ne[10]===-1)$.projectionMatrix.copy(oe.projectionMatrix),$.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{let Z=Oe+de,E=Ke+de,S=ne-Ue,O=Me+(he-Ue),q=Q*Ke/E*Z,j=le*Ke/E*Z;$.projectionMatrix.makePerspective(S,O,q,j,Z,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function K($,oe){oe===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(oe.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let oe=$.near,Te=$.far;y.texture!==null&&(y.depthNear>0&&(oe=y.depthNear),y.depthFar>0&&(Te=y.depthFar)),M.near=I.near=A.near=oe,M.far=I.far=A.far=Te,(R!==M.near||k!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,k=M.far),A.layers.mask=$.layers.mask|2,I.layers.mask=$.layers.mask|4,M.layers.mask=A.layers.mask|I.layers.mask;let he=$.parent,Ne=M.cameras;K(M,he);for(let Fe=0;Fe<Ne.length;Fe++)K(Ne[Fe],he);Ne.length===2?W(M,A,I):M.projectionMatrix.copy(A.projectionMatrix),fe($,M,he)};function fe($,oe,Te){Te===null?$.matrix.copy(oe.matrixWorld):($.matrix.copy(Te.matrixWorld),$.matrix.invert(),$.matrix.multiply(oe.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(oe.projectionMatrix),$.projectionMatrixInverse.copy(oe.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Go*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(M)};let xe=null;function De($,oe){if(u=oe.getViewerPose(c||o),g=oe,u!==null){let Te=u.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let he=!1;Te.length!==M.cameras.length&&(M.cameras.length=0,he=!0);for(let Fe=0;Fe<Te.length;Fe++){let Oe=Te[Fe],Ke=null;if(p!==null)Ke=p.getViewport(Oe);else{let le=d.getViewSubImage(f,Oe);Ke=le.viewport,Fe===0&&(e.setRenderTargetTextures(v,le.colorTexture,f.ignoreDepthValues?void 0:le.depthStencilTexture),e.setRenderTarget(v))}let Q=w[Fe];Q===void 0&&(Q=new zt,Q.layers.enable(Fe),Q.viewport=new ht,w[Fe]=Q),Q.matrix.fromArray(Oe.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Oe.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),Fe===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),he===!0&&M.cameras.push(Q)}let Ne=r.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")){let Fe=d.getDepthInformation(Te[0]);Fe&&Fe.isValid&&Fe.texture&&y.init(e,Fe,r.renderState)}}for(let Te=0;Te<_.length;Te++){let he=x[Te],Ne=_[Te];he!==null&&Ne!==void 0&&Ne.update(he,oe,c||o)}xe&&xe($,oe),oe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:oe}),g=null}let Qe=new Qx;Qe.setAnimationLoop(De),this.setAnimationLoop=function($){xe=$},this.dispose=function(){}}},ps=new qn,cR=new yt;function uR(t,e){function n(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,jx(t)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,v,_,x){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),d(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,x)):h.isMeshMatcapMaterial?(s(m,h),g(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),y(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?l(m,h,v,_):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,n(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===un&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,n(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===un&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,n(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,n(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);let v=e.get(h),_=v.envMap,x=v.envMapRotation;_&&(m.envMap.value=_,ps.copy(x),ps.x*=-1,ps.y*=-1,ps.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),m.envMapRotation.value.setFromMatrix4(cR.makeRotationFromEuler(ps)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,v,_){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*v,m.scale.value=_*.5,h.map&&(m.map.value=h.map,n(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,v){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===un&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function y(m,h){let v=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function hR(t,e,n,i){let r={},s={},o=[],a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,_){let x=_.program;i.uniformBlockBinding(v,x)}function c(v,_){let x=r[v.id];x===void 0&&(g(v),x=u(v),r[v.id]=x,v.addEventListener("dispose",m));let C=_.program;i.updateUBOMapping(v,C);let T=e.render.frame;s[v.id]!==T&&(f(v),s[v.id]=T)}function u(v){let _=d();v.__bindingPointIndex=_;let x=t.createBuffer(),C=v.__size,T=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,x),t.bufferData(t.UNIFORM_BUFFER,C,T),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,_,x),x}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let _=r[v.id],x=v.uniforms,C=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,_);for(let T=0,A=x.length;T<A;T++){let I=Array.isArray(x[T])?x[T]:[x[T]];for(let w=0,M=I.length;w<M;w++){let R=I[w];if(p(R,T,w,C)===!0){let k=R.__offset,F=Array.isArray(R.value)?R.value:[R.value],B=0;for(let J=0;J<F.length;J++){let G=F[J],ie=y(G);typeof G=="number"||typeof G=="boolean"?(R.__data[0]=G,t.bufferSubData(t.UNIFORM_BUFFER,k+B,R.__data)):G.isMatrix3?(R.__data[0]=G.elements[0],R.__data[1]=G.elements[1],R.__data[2]=G.elements[2],R.__data[3]=0,R.__data[4]=G.elements[3],R.__data[5]=G.elements[4],R.__data[6]=G.elements[5],R.__data[7]=0,R.__data[8]=G.elements[6],R.__data[9]=G.elements[7],R.__data[10]=G.elements[8],R.__data[11]=0):(G.toArray(R.__data,B),B+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,k,R.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(v,_,x,C){let T=v.value,A=_+"_"+x;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:C[A]=T.clone(),!0;{let I=C[A];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return C[A]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function g(v){let _=v.uniforms,x=0,C=16;for(let A=0,I=_.length;A<I;A++){let w=Array.isArray(_[A])?_[A]:[_[A]];for(let M=0,R=w.length;M<R;M++){let k=w[M],F=Array.isArray(k.value)?k.value:[k.value];for(let B=0,J=F.length;B<J;B++){let G=F[B],ie=y(G),W=x%C,K=W%ie.boundary,fe=W+K;x+=K,fe!==0&&C-fe<ie.storage&&(x+=C-fe),k.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=x,x+=ie.storage}}}let T=x%C;return T>0&&(x+=C-T),v.__size=x,v.__cache={},this}function y(v){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function m(v){let _=v.target;_.removeEventListener("dispose",m);let x=o.indexOf(_.__bindingPointIndex);o.splice(x,1),t.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function h(){for(let v in r)t.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:c,dispose:h}}var Xo=class{constructor(e={}){let{canvas:n=mE(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext!="undefined"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),y=new Int32Array(4),m=null,h=null,v=[],_=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=qt,this.toneMapping=zr,this.toneMappingExposure=1;let x=this,C=!1,T=0,A=0,I=null,w=-1,M=null,R=new ht,k=new ht,F=null,B=new Ye(0),J=0,G=n.width,ie=n.height,W=1,K=null,fe=null,xe=new ht(0,0,G,ie),De=new ht(0,0,G,ie),Qe=!1,$=new gl,oe=!1,Te=!1,he=new yt,Ne=new yt,Fe=new N,Oe=new ht,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Q=!1;function le(){return I===null?W:1}let P=i;function Ae(b,D){return n.getContext(b,D)}try{let b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${jm}`),n.addEventListener("webglcontextlost",ee,!1),n.addEventListener("webglcontextrestored",_e,!1),n.addEventListener("webglcontextcreationerror",ve,!1),P===null){let D="webgl2";if(P=Ae(D,b),P===null)throw Ae(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let ne,Me,de,Ue,Z,E,S,O,q,j,Y,Ce,me,Se,Je,ae,Ee,ke,Be,be,je,We,pt,L;function ge(){ne=new AA(P),ne.init(),We=new sR(P,ne),Me=new MA(P,ne,e,We),de=new nR(P,ne),Me.reverseDepthBuffer&&f&&de.buffers.depth.setReversed(!0),Ue=new PA(P),Z=new GC,E=new rR(P,ne,de,Z,Me,We,Ue),S=new wA(x),O=new TA(x),q=new kE(P),pt=new _A(P,q),j=new CA(P,q,Ue,pt),Y=new NA(P,j,q,Ue),Be=new IA(P,Me,E),ae=new SA(Z),Ce=new HC(x,S,O,ne,Me,pt,ae),me=new uR(x,Z),Se=new XC,Je=new KC(ne),ke=new yA(x,S,O,de,Y,p,l),Ee=new eR(x,Y,Me),L=new hR(P,Ue,Me,de),be=new xA(P,ne,Ue),je=new RA(P,ne,Ue),Ue.programs=Ce.programs,x.capabilities=Me,x.extensions=ne,x.properties=Z,x.renderLists=Se,x.shadowMap=Ee,x.state=de,x.info=Ue}ge();let X=new Cm(x,P);this.xr=X,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let b=ne.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=ne.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(b){b!==void 0&&(W=b,this.setSize(G,ie,!1))},this.getSize=function(b){return b.set(G,ie)},this.setSize=function(b,D,V=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=b,ie=D,n.width=Math.floor(b*W),n.height=Math.floor(D*W),V===!0&&(n.style.width=b+"px",n.style.height=D+"px"),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(G*W,ie*W).floor()},this.setDrawingBufferSize=function(b,D,V){G=b,ie=D,W=V,n.width=Math.floor(b*V),n.height=Math.floor(D*V),this.setViewport(0,0,b,D)},this.getCurrentViewport=function(b){return b.copy(R)},this.getViewport=function(b){return b.copy(xe)},this.setViewport=function(b,D,V,H){b.isVector4?xe.set(b.x,b.y,b.z,b.w):xe.set(b,D,V,H),de.viewport(R.copy(xe).multiplyScalar(W).round())},this.getScissor=function(b){return b.copy(De)},this.setScissor=function(b,D,V,H){b.isVector4?De.set(b.x,b.y,b.z,b.w):De.set(b,D,V,H),de.scissor(k.copy(De).multiplyScalar(W).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(b){de.setScissorTest(Qe=b)},this.setOpaqueSort=function(b){K=b},this.setTransparentSort=function(b){fe=b},this.getClearColor=function(b){return b.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor.apply(ke,arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha.apply(ke,arguments)},this.clear=function(b=!0,D=!0,V=!0){let H=0;if(b){let U=!1;if(I!==null){let ue=I.texture.format;U=ue===sg||ue===rg||ue===ig}if(U){let ue=I.texture.type,ye=ue===rr||ue===Ms||ue===fl||ue===Vo||ue===tg||ue===ng,Re=ke.getClearColor(),Pe=ke.getClearAlpha(),ze=Re.r,He=Re.g,Ie=Re.b;ye?(g[0]=ze,g[1]=He,g[2]=Ie,g[3]=Pe,P.clearBufferuiv(P.COLOR,0,g)):(y[0]=ze,y[1]=He,y[2]=Ie,y[3]=Pe,P.clearBufferiv(P.COLOR,0,y))}else H|=P.COLOR_BUFFER_BIT}D&&(H|=P.DEPTH_BUFFER_BIT),V&&(H|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ee,!1),n.removeEventListener("webglcontextrestored",_e,!1),n.removeEventListener("webglcontextcreationerror",ve,!1),Se.dispose(),Je.dispose(),Z.dispose(),S.dispose(),O.dispose(),Y.dispose(),pt.dispose(),L.dispose(),Ce.dispose(),X.dispose(),X.removeEventListener("sessionstart",Rg),X.removeEventListener("sessionend",Pg),qr.stop()};function ee(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function _e(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let b=Ue.autoReset,D=Ee.enabled,V=Ee.autoUpdate,H=Ee.needsUpdate,U=Ee.type;ge(),Ue.autoReset=b,Ee.enabled=D,Ee.autoUpdate=V,Ee.needsUpdate=H,Ee.type=U}function ve(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Ve(b){let D=b.target;D.removeEventListener("dispose",Ve),It(D)}function It(b){tn(b),Z.remove(b)}function tn(b){let D=Z.get(b).programs;D!==void 0&&(D.forEach(function(V){Ce.releaseProgram(V)}),b.isShaderMaterial&&Ce.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,V,H,U,ue){D===null&&(D=Ke);let ye=U.isMesh&&U.matrixWorld.determinant()<0,Re=VM(b,D,V,H,U);de.setMaterial(H,ye);let Pe=V.index,ze=1;if(H.wireframe===!0){if(Pe=j.getWireframeAttribute(V),Pe===void 0)return;ze=2}let He=V.drawRange,Ie=V.attributes.position,it=He.start*ze,mt=(He.start+He.count)*ze;ue!==null&&(it=Math.max(it,ue.start*ze),mt=Math.min(mt,(ue.start+ue.count)*ze)),Pe!==null?(it=Math.max(it,0),mt=Math.min(mt,Pe.count)):Ie!=null&&(it=Math.max(it,0),mt=Math.min(mt,Ie.count));let xt=mt-it;if(xt<0||xt===1/0)return;pt.setup(U,H,Re,V,Pe);let xn,rt=be;if(Pe!==null&&(xn=q.get(Pe),rt=je,rt.setIndex(xn)),U.isMesh)H.wireframe===!0?(de.setLineWidth(H.wireframeLinewidth*le()),rt.setMode(P.LINES)):rt.setMode(P.TRIANGLES);else if(U.isLine){let Le=H.linewidth;Le===void 0&&(Le=1),de.setLineWidth(Le*le()),U.isLineSegments?rt.setMode(P.LINES):U.isLineLoop?rt.setMode(P.LINE_LOOP):rt.setMode(P.LINE_STRIP)}else U.isPoints?rt.setMode(P.POINTS):U.isSprite&&rt.setMode(P.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)rt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(ne.get("WEBGL_multi_draw"))rt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let Le=U._multiDrawStarts,Ii=U._multiDrawCounts,st=U._multiDrawCount,Kn=Pe?q.get(Pe).bytesPerElement:1,Os=Z.get(H).currentProgram.getUniforms();for(let Tn=0;Tn<st;Tn++)Os.setValue(P,"_gl_DrawID",Tn),rt.render(Le[Tn]/Kn,Ii[Tn])}else if(U.isInstancedMesh)rt.renderInstances(it,xt,U.count);else if(V.isInstancedBufferGeometry){let Le=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ii=Math.min(V.instanceCount,Le);rt.renderInstances(it,xt,Ii)}else rt.render(it,xt)};function at(b,D,V){b.transparent===!0&&b.side===Qi&&b.forceSinglePass===!1?(b.side=un,b.needsUpdate=!0,Ol(b,D,V),b.side=Hr,b.needsUpdate=!0,Ol(b,D,V),b.side=Qi):Ol(b,D,V)}this.compile=function(b,D,V=null){V===null&&(V=b),h=Je.get(V),h.init(D),_.push(h),V.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(h.pushLight(U),U.castShadow&&h.pushShadow(U))}),b!==V&&b.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(h.pushLight(U),U.castShadow&&h.pushShadow(U))}),h.setupLights();let H=new Set;return b.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let ue=U.material;if(ue)if(Array.isArray(ue))for(let ye=0;ye<ue.length;ye++){let Re=ue[ye];at(Re,V,U),H.add(Re)}else at(ue,V,U),H.add(ue)}),_.pop(),h=null,H},this.compileAsync=function(b,D,V=null){let H=this.compile(b,D,V);return new Promise(U=>{function ue(){if(H.forEach(function(ye){Z.get(ye).currentProgram.isReady()&&H.delete(ye)}),H.size===0){U(b);return}setTimeout(ue,10)}ne.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let Jn=null;function Pi(b){Jn&&Jn(b)}function Rg(){qr.stop()}function Pg(){qr.start()}let qr=new Qx;qr.setAnimationLoop(Pi),typeof self!="undefined"&&qr.setContext(self),this.setAnimationLoop=function(b){Jn=b,X.setAnimationLoop(b),b===null?qr.stop():qr.start()},X.addEventListener("sessionstart",Rg),X.addEventListener("sessionend",Pg),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(D),D=X.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,D,I),h=Je.get(b,_.length),h.init(D),_.push(h),Ne.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),$.setFromProjectionMatrix(Ne),Te=this.localClippingEnabled,oe=ae.init(this.clippingPlanes,Te),m=Se.get(b,v.length),m.init(),v.push(m),X.enabled===!0&&X.isPresenting===!0){let ue=x.xr.getDepthSensingMesh();ue!==null&&bh(ue,D,-1/0,x.sortObjects)}bh(b,D,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(K,fe),Q=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Q&&ke.addToRenderList(m,b),this.info.render.frame++,oe===!0&&ae.beginShadows();let V=h.state.shadowsArray;Ee.render(V,b,D),oe===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();let H=m.opaque,U=m.transmissive;if(h.setupLights(),D.isArrayCamera){let ue=D.cameras;if(U.length>0)for(let ye=0,Re=ue.length;ye<Re;ye++){let Pe=ue[ye];Ng(H,U,b,Pe)}Q&&ke.render(b);for(let ye=0,Re=ue.length;ye<Re;ye++){let Pe=ue[ye];Ig(m,b,Pe,Pe.viewport)}}else U.length>0&&Ng(H,U,b,D),Q&&ke.render(b),Ig(m,b,D);I!==null&&(E.updateMultisampleRenderTarget(I),E.updateRenderTargetMipmap(I)),b.isScene===!0&&b.onAfterRender(x,b,D),pt.resetDefaultState(),w=-1,M=null,_.pop(),_.length>0?(h=_[_.length-1],oe===!0&&ae.setGlobalState(x.clippingPlanes,h.state.camera)):h=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function bh(b,D,V,H){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)V=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)h.pushLight(b),b.castShadow&&h.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||$.intersectsSprite(b)){H&&Oe.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ne);let ye=Y.update(b),Re=b.material;Re.visible&&m.push(b,ye,Re,V,Oe.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||$.intersectsObject(b))){let ye=Y.update(b),Re=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Oe.copy(b.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Oe.copy(ye.boundingSphere.center)),Oe.applyMatrix4(b.matrixWorld).applyMatrix4(Ne)),Array.isArray(Re)){let Pe=ye.groups;for(let ze=0,He=Pe.length;ze<He;ze++){let Ie=Pe[ze],it=Re[Ie.materialIndex];it&&it.visible&&m.push(b,ye,it,V,Oe.z,Ie)}}else Re.visible&&m.push(b,ye,Re,V,Oe.z,null)}}let ue=b.children;for(let ye=0,Re=ue.length;ye<Re;ye++)bh(ue[ye],D,V,H)}function Ig(b,D,V,H){let U=b.opaque,ue=b.transmissive,ye=b.transparent;h.setupLightsView(V),oe===!0&&ae.setGlobalState(x.clippingPlanes,V),H&&de.viewport(R.copy(H)),U.length>0&&Ul(U,D,V),ue.length>0&&Ul(ue,D,V),ye.length>0&&Ul(ye,D,V),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function Ng(b,D,V,H){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[H.id]===void 0&&(h.state.transmissionRenderTarget[H.id]=new sr(1,1,{generateMipmaps:!0,type:ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float")?Rl:rr,minFilter:xs,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));let ue=h.state.transmissionRenderTarget[H.id],ye=H.viewport||R;ue.setSize(ye.z,ye.w);let Re=x.getRenderTarget();x.setRenderTarget(ue),x.getClearColor(B),J=x.getClearAlpha(),J<1&&x.setClearColor(16777215,.5),x.clear(),Q&&ke.render(V);let Pe=x.toneMapping;x.toneMapping=zr;let ze=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),h.setupLightsView(H),oe===!0&&ae.setGlobalState(x.clippingPlanes,H),Ul(b,V,H),E.updateMultisampleRenderTarget(ue),E.updateRenderTargetMipmap(ue),ne.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Ie=0,it=D.length;Ie<it;Ie++){let mt=D[Ie],xt=mt.object,xn=mt.geometry,rt=mt.material,Le=mt.group;if(rt.side===Qi&&xt.layers.test(H.layers)){let Ii=rt.side;rt.side=un,rt.needsUpdate=!0,Lg(xt,V,H,xn,rt,Le),rt.side=Ii,rt.needsUpdate=!0,He=!0}}He===!0&&(E.updateMultisampleRenderTarget(ue),E.updateRenderTargetMipmap(ue))}x.setRenderTarget(Re),x.setClearColor(B,J),ze!==void 0&&(H.viewport=ze),x.toneMapping=Pe}function Ul(b,D,V){let H=D.isScene===!0?D.overrideMaterial:null;for(let U=0,ue=b.length;U<ue;U++){let ye=b[U],Re=ye.object,Pe=ye.geometry,ze=H===null?ye.material:H,He=ye.group;Re.layers.test(V.layers)&&Lg(Re,D,V,Pe,ze,He)}}function Lg(b,D,V,H,U,ue){b.onBeforeRender(x,D,V,H,U,ue),b.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),U.onBeforeRender(x,D,V,H,b,ue),U.transparent===!0&&U.side===Qi&&U.forceSinglePass===!1?(U.side=un,U.needsUpdate=!0,x.renderBufferDirect(V,D,H,U,b,ue),U.side=Hr,U.needsUpdate=!0,x.renderBufferDirect(V,D,H,U,b,ue),U.side=Qi):x.renderBufferDirect(V,D,H,U,b,ue),b.onAfterRender(x,D,V,H,U,ue)}function Ol(b,D,V){D.isScene!==!0&&(D=Ke);let H=Z.get(b),U=h.state.lights,ue=h.state.shadowsArray,ye=U.state.version,Re=Ce.getParameters(b,U.state,ue,D,V),Pe=Ce.getProgramCacheKey(Re),ze=H.programs;H.environment=b.isMeshStandardMaterial?D.environment:null,H.fog=D.fog,H.envMap=(b.isMeshStandardMaterial?O:S).get(b.envMap||H.environment),H.envMapRotation=H.environment!==null&&b.envMap===null?D.environmentRotation:b.envMapRotation,ze===void 0&&(b.addEventListener("dispose",Ve),ze=new Map,H.programs=ze);let He=ze.get(Pe);if(He!==void 0){if(H.currentProgram===He&&H.lightsStateVersion===ye)return Ug(b,Re),He}else Re.uniforms=Ce.getUniforms(b),b.onBeforeCompile(Re,x),He=Ce.acquireProgram(Re,Pe),ze.set(Pe,He),H.uniforms=Re.uniforms;let Ie=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ie.clippingPlanes=ae.uniform),Ug(b,Re),H.needsLights=GM(b),H.lightsStateVersion=ye,H.needsLights&&(Ie.ambientLightColor.value=U.state.ambient,Ie.lightProbe.value=U.state.probe,Ie.directionalLights.value=U.state.directional,Ie.directionalLightShadows.value=U.state.directionalShadow,Ie.spotLights.value=U.state.spot,Ie.spotLightShadows.value=U.state.spotShadow,Ie.rectAreaLights.value=U.state.rectArea,Ie.ltc_1.value=U.state.rectAreaLTC1,Ie.ltc_2.value=U.state.rectAreaLTC2,Ie.pointLights.value=U.state.point,Ie.pointLightShadows.value=U.state.pointShadow,Ie.hemisphereLights.value=U.state.hemi,Ie.directionalShadowMap.value=U.state.directionalShadowMap,Ie.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Ie.spotShadowMap.value=U.state.spotShadowMap,Ie.spotLightMatrix.value=U.state.spotLightMatrix,Ie.spotLightMap.value=U.state.spotLightMap,Ie.pointShadowMap.value=U.state.pointShadowMap,Ie.pointShadowMatrix.value=U.state.pointShadowMatrix),H.currentProgram=He,H.uniformsList=null,He}function Dg(b){if(b.uniformsList===null){let D=b.currentProgram.getUniforms();b.uniformsList=Oo.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function Ug(b,D){let V=Z.get(b);V.outputColorSpace=D.outputColorSpace,V.batching=D.batching,V.batchingColor=D.batchingColor,V.instancing=D.instancing,V.instancingColor=D.instancingColor,V.instancingMorph=D.instancingMorph,V.skinning=D.skinning,V.morphTargets=D.morphTargets,V.morphNormals=D.morphNormals,V.morphColors=D.morphColors,V.morphTargetsCount=D.morphTargetsCount,V.numClippingPlanes=D.numClippingPlanes,V.numIntersection=D.numClipIntersection,V.vertexAlphas=D.vertexAlphas,V.vertexTangents=D.vertexTangents,V.toneMapping=D.toneMapping}function VM(b,D,V,H,U){D.isScene!==!0&&(D=Ke),E.resetTextureUnits();let ue=D.fog,ye=H.isMeshStandardMaterial?D.environment:null,Re=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Zo,Pe=(H.isMeshStandardMaterial?O:S).get(H.envMap||ye),ze=H.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,He=!!V.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ie=!!V.morphAttributes.position,it=!!V.morphAttributes.normal,mt=!!V.morphAttributes.color,xt=zr;H.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(xt=x.toneMapping);let xn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,rt=xn!==void 0?xn.length:0,Le=Z.get(H),Ii=h.state.lights;if(oe===!0&&(Te===!0||b!==M)){let Fn=b===M&&H.id===w;ae.setState(H,b,Fn)}let st=!1;H.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==Ii.state.version||Le.outputColorSpace!==Re||U.isBatchedMesh&&Le.batching===!1||!U.isBatchedMesh&&Le.batching===!0||U.isBatchedMesh&&Le.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Le.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Le.instancing===!1||!U.isInstancedMesh&&Le.instancing===!0||U.isSkinnedMesh&&Le.skinning===!1||!U.isSkinnedMesh&&Le.skinning===!0||U.isInstancedMesh&&Le.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Le.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Le.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Le.instancingMorph===!1&&U.morphTexture!==null||Le.envMap!==Pe||H.fog===!0&&Le.fog!==ue||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ae.numPlanes||Le.numIntersection!==ae.numIntersection)||Le.vertexAlphas!==ze||Le.vertexTangents!==He||Le.morphTargets!==Ie||Le.morphNormals!==it||Le.morphColors!==mt||Le.toneMapping!==xt||Le.morphTargetsCount!==rt)&&(st=!0):(st=!0,Le.__version=H.version);let Kn=Le.currentProgram;st===!0&&(Kn=Ol(H,D,U));let Os=!1,Tn=!1,na=!1,Mt=Kn.getUniforms(),mi=Le.uniforms;if(de.useProgram(Kn.program)&&(Os=!0,Tn=!0,na=!0),H.id!==w&&(w=H.id,Tn=!0),Os||M!==b){de.buffers.depth.getReversed()?(he.copy(b.projectionMatrix),vE(he),yE(he),Mt.setValue(P,"projectionMatrix",he)):Mt.setValue(P,"projectionMatrix",b.projectionMatrix),Mt.setValue(P,"viewMatrix",b.matrixWorldInverse);let cr=Mt.map.cameraPosition;cr!==void 0&&cr.setValue(P,Fe.setFromMatrixPosition(b.matrixWorld)),Me.logarithmicDepthBuffer&&Mt.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Mt.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,Tn=!0,na=!0)}if(U.isSkinnedMesh){Mt.setOptional(P,U,"bindMatrix"),Mt.setOptional(P,U,"bindMatrixInverse");let Fn=U.skeleton;Fn&&(Fn.boneTexture===null&&Fn.computeBoneTexture(),Mt.setValue(P,"boneTexture",Fn.boneTexture,E))}U.isBatchedMesh&&(Mt.setOptional(P,U,"batchingTexture"),Mt.setValue(P,"batchingTexture",U._matricesTexture,E),Mt.setOptional(P,U,"batchingIdTexture"),Mt.setValue(P,"batchingIdTexture",U._indirectTexture,E),Mt.setOptional(P,U,"batchingColorTexture"),U._colorsTexture!==null&&Mt.setValue(P,"batchingColorTexture",U._colorsTexture,E));let ia=V.morphAttributes;if((ia.position!==void 0||ia.normal!==void 0||ia.color!==void 0)&&Be.update(U,V,Kn),(Tn||Le.receiveShadow!==U.receiveShadow)&&(Le.receiveShadow=U.receiveShadow,Mt.setValue(P,"receiveShadow",U.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(mi.envMap.value=Pe,mi.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&D.environment!==null&&(mi.envMapIntensity.value=D.environmentIntensity),Tn&&(Mt.setValue(P,"toneMappingExposure",x.toneMappingExposure),Le.needsLights&&HM(mi,na),ue&&H.fog===!0&&me.refreshFogUniforms(mi,ue),me.refreshMaterialUniforms(mi,H,W,ie,h.state.transmissionRenderTarget[b.id]),Oo.upload(P,Dg(Le),mi,E)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Oo.upload(P,Dg(Le),mi,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Mt.setValue(P,"center",U.center),Mt.setValue(P,"modelViewMatrix",U.modelViewMatrix),Mt.setValue(P,"normalMatrix",U.normalMatrix),Mt.setValue(P,"modelMatrix",U.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let Fn=H.uniformsGroups;for(let cr=0,ur=Fn.length;cr<ur;cr++){let Og=Fn[cr];L.update(Og,Kn),L.bind(Og,Kn)}}return Kn}function HM(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function GM(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(b,D,V){Z.get(b.texture).__webglTexture=D,Z.get(b.depthTexture).__webglTexture=V;let H=Z.get(b);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=V===void 0,H.__autoAllocateDepthBuffer||ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,D){let V=Z.get(b);V.__webglFramebuffer=D,V.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,V=0){I=b,T=D,A=V;let H=!0,U=null,ue=!1,ye=!1;if(b){let Pe=Z.get(b);if(Pe.__useDefaultFramebuffer!==void 0)de.bindFramebuffer(P.FRAMEBUFFER,null),H=!1;else if(Pe.__webglFramebuffer===void 0)E.setupRenderTarget(b);else if(Pe.__hasExternalTextures)E.rebindTextures(b,Z.get(b.texture).__webglTexture,Z.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Ie=b.depthTexture;if(Pe.__boundDepthTexture!==Ie){if(Ie!==null&&Z.has(Ie)&&(b.width!==Ie.image.width||b.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(b)}}let ze=b.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(ye=!0);let He=Z.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(He[D])?U=He[D][V]:U=He[D],ue=!0):b.samples>0&&E.useMultisampledRTT(b)===!1?U=Z.get(b).__webglMultisampledFramebuffer:Array.isArray(He)?U=He[V]:U=He,R.copy(b.viewport),k.copy(b.scissor),F=b.scissorTest}else R.copy(xe).multiplyScalar(W).floor(),k.copy(De).multiplyScalar(W).floor(),F=Qe;if(de.bindFramebuffer(P.FRAMEBUFFER,U)&&H&&de.drawBuffers(b,U),de.viewport(R),de.scissor(k),de.setScissorTest(F),ue){let Pe=Z.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+D,Pe.__webglTexture,V)}else if(ye){let Pe=Z.get(b.texture),ze=D||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Pe.__webglTexture,V||0,ze)}w=-1},this.readRenderTargetPixels=function(b,D,V,H,U,ue,ye){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Z.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ye!==void 0&&(Re=Re[ye]),Re){de.bindFramebuffer(P.FRAMEBUFFER,Re);try{let Pe=b.texture,ze=Pe.format,He=Pe.type;if(!Me.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Me.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-H&&V>=0&&V<=b.height-U&&P.readPixels(D,V,H,U,We.convert(ze),We.convert(He),ue)}finally{let Pe=I!==null?Z.get(I).__webglFramebuffer:null;de.bindFramebuffer(P.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(b,D,V,H,U,ue,ye){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Z.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ye!==void 0&&(Re=Re[ye]),Re){let Pe=b.texture,ze=Pe.format,He=Pe.type;if(!Me.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Me.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=b.width-H&&V>=0&&V<=b.height-U){de.bindFramebuffer(P.FRAMEBUFFER,Re);let Ie=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ie),P.bufferData(P.PIXEL_PACK_BUFFER,ue.byteLength,P.STREAM_READ),P.readPixels(D,V,H,U,We.convert(ze),We.convert(He),0);let it=I!==null?Z.get(I).__webglFramebuffer:null;de.bindFramebuffer(P.FRAMEBUFFER,it);let mt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await gE(P,mt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Ie),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ue),P.deleteBuffer(Ie),P.deleteSync(mt),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,D=null,V=0){b.isTexture!==!0&&(ol("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,b=arguments[1]);let H=Math.pow(2,-V),U=Math.floor(b.image.width*H),ue=Math.floor(b.image.height*H),ye=D!==null?D.x:0,Re=D!==null?D.y:0;E.setTexture2D(b,0),P.copyTexSubImage2D(P.TEXTURE_2D,V,0,0,ye,Re,U,ue),de.unbindTexture()},this.copyTextureToTexture=function(b,D,V=null,H=null,U=0){b.isTexture!==!0&&(ol("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,b=arguments[1],D=arguments[2],U=arguments[3]||0,V=null);let ue,ye,Re,Pe,ze,He,Ie,it,mt,xt=b.isCompressedTexture?b.mipmaps[U]:b.image;V!==null?(ue=V.max.x-V.min.x,ye=V.max.y-V.min.y,Re=V.isBox3?V.max.z-V.min.z:1,Pe=V.min.x,ze=V.min.y,He=V.isBox3?V.min.z:0):(ue=xt.width,ye=xt.height,Re=xt.depth||1,Pe=0,ze=0,He=0),H!==null?(Ie=H.x,it=H.y,mt=H.z):(Ie=0,it=0,mt=0);let xn=We.convert(D.format),rt=We.convert(D.type),Le;D.isData3DTexture?(E.setTexture3D(D,0),Le=P.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(E.setTexture2DArray(D,0),Le=P.TEXTURE_2D_ARRAY):(E.setTexture2D(D,0),Le=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);let Ii=P.getParameter(P.UNPACK_ROW_LENGTH),st=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Kn=P.getParameter(P.UNPACK_SKIP_PIXELS),Os=P.getParameter(P.UNPACK_SKIP_ROWS),Tn=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,xt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,xt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Pe),P.pixelStorei(P.UNPACK_SKIP_ROWS,ze),P.pixelStorei(P.UNPACK_SKIP_IMAGES,He);let na=b.isDataArrayTexture||b.isData3DTexture,Mt=D.isDataArrayTexture||D.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){let mi=Z.get(b),ia=Z.get(D),Fn=Z.get(mi.__renderTarget),cr=Z.get(ia.__renderTarget);de.bindFramebuffer(P.READ_FRAMEBUFFER,Fn.__webglFramebuffer),de.bindFramebuffer(P.DRAW_FRAMEBUFFER,cr.__webglFramebuffer);for(let ur=0;ur<Re;ur++)na&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Z.get(b).__webglTexture,U,He+ur),b.isDepthTexture?(Mt&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Z.get(D).__webglTexture,U,mt+ur),P.blitFramebuffer(Pe,ze,ue,ye,Ie,it,ue,ye,P.DEPTH_BUFFER_BIT,P.NEAREST)):Mt?P.copyTexSubImage3D(Le,U,Ie,it,mt+ur,Pe,ze,ue,ye):P.copyTexSubImage2D(Le,U,Ie,it,mt+ur,Pe,ze,ue,ye);de.bindFramebuffer(P.READ_FRAMEBUFFER,null),de.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Mt?b.isDataTexture||b.isData3DTexture?P.texSubImage3D(Le,U,Ie,it,mt,ue,ye,Re,xn,rt,xt.data):D.isCompressedArrayTexture?P.compressedTexSubImage3D(Le,U,Ie,it,mt,ue,ye,Re,xn,xt.data):P.texSubImage3D(Le,U,Ie,it,mt,ue,ye,Re,xn,rt,xt):b.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,U,Ie,it,ue,ye,xn,rt,xt.data):b.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,U,Ie,it,xt.width,xt.height,xn,xt.data):P.texSubImage2D(P.TEXTURE_2D,U,Ie,it,ue,ye,xn,rt,xt);P.pixelStorei(P.UNPACK_ROW_LENGTH,Ii),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,st),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Kn),P.pixelStorei(P.UNPACK_SKIP_ROWS,Os),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Tn),U===0&&D.generateMipmaps&&P.generateMipmap(Le),de.unbindTexture()},this.copyTextureToTexture3D=function(b,D,V=null,H=null,U=0){return b.isTexture!==!0&&(ol("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,H=arguments[1]||null,b=arguments[2],D=arguments[3],U=arguments[4]||0),ol('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,D,V,H,U)},this.initRenderTarget=function(b){Z.get(b).__webglFramebuffer===void 0&&E.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?E.setTextureCube(b,0):b.isData3DTexture?E.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?E.setTexture2DArray(b,0):E.setTexture2D(b,0),de.unbindTexture()},this.resetState=function(){T=0,A=0,I=null,de.reset(),pt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return tr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let n=this.getContext();n.drawingBufferColorspace=tt._getDrawingBufferColorSpace(e),n.unpackColorSpace=tt._getUnpackColorSpace()}};var Ju=class t{constructor(e,n=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ye(e),this.near=n,this.far=i}clone(){return new t(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Xr=class extends Kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}};var lr=class extends kn{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},$n=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){let i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){let n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){let n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let n=[],i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){let i=this.getLengths(),r=0,s=i.length,o;n?o=n:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);let u=i[r],f=i[r+1]-u,p=(o-u)/f;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new ce:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){let i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n){let i=new N,r=[],s=[],o=[],a=new N,l=new yt;for(let p=0;p<=e;p++){let g=p/e;r[p]=this.getTangentAt(g,new N)}s[0]=new N,o[0]=new N;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),d=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Bt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(Bt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],p*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},vl=class extends $n{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n=new ce){let i=n,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*u-p*d+this.aX,c=f*d+p*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Rm=class extends vl{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function lg(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,d){let f=(o-s)/c-(a-s)/(c+u)+(a-o)/u,p=(a-o)/u-(l-o)/(u+d)+(l-a)/d;f*=u,p*=u,r(o,a,f,p)},calc:function(s){let o=s*s,a=o*s;return t+e*s+n*o+i*a}}}var Ru=new N,wp=new lg,Ep=new lg,bp=new lg,Pm=class extends $n{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new N){let i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(Ru.subVectors(r[0],r[1]).add(r[0]),c=Ru);let d=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(Ru.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Ru),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),p),y=Math.pow(d.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(u),p);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),wp.initNonuniformCatmullRom(c.x,d.x,f.x,u.x,g,y,m),Ep.initNonuniformCatmullRom(c.y,d.y,f.y,u.y,g,y,m),bp.initNonuniformCatmullRom(c.z,d.z,f.z,u.z,g,y,m)}else this.curveType==="catmullrom"&&(wp.initCatmullRom(c.x,d.x,f.x,u.x,this.tension),Ep.initCatmullRom(c.y,d.y,f.y,u.y,this.tension),bp.initCatmullRom(c.z,d.z,f.z,u.z,this.tension));return i.set(wp.calc(l),Ep.calc(l),bp.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){let r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){let r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){let r=e.points[n];this.points.push(new N().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function bx(t,e,n,i,r){let s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function dR(t,e){let n=1-t;return n*n*e}function fR(t,e){return 2*(1-t)*t*e}function pR(t,e){return t*t*e}function hl(t,e,n,i){return dR(t,e)+fR(t,n)+pR(t,i)}function mR(t,e){let n=1-t;return n*n*n*e}function gR(t,e){let n=1-t;return 3*n*n*t*e}function vR(t,e){return 3*(1-t)*t*t*e}function yR(t,e){return t*t*t*e}function dl(t,e,n,i,r){return mR(t,e)+gR(t,n)+vR(t,i)+yR(t,r)}var Ku=class extends $n{constructor(e=new ce,n=new ce,i=new ce,r=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new ce){let i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(dl(e,r.x,s.x,o.x,a.x),dl(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Im=class extends $n{constructor(e=new N,n=new N,i=new N,r=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new N){let i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(dl(e,r.x,s.x,o.x,a.x),dl(e,r.y,s.y,o.y,a.y),dl(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ju=class extends $n{constructor(e=new ce,n=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new ce){let i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new ce){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Nm=class extends $n{constructor(e=new N,n=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new N){let i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new N){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qu=class extends $n{constructor(e=new ce,n=new ce,i=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new ce){let i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(hl(e,r.x,s.x,o.x),hl(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Lm=class extends $n{constructor(e=new N,n=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new N){let i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(hl(e,r.x,s.x,o.x),hl(e,r.y,s.y,o.y),hl(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},eh=class extends $n{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new ce){let i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],d=r[o>r.length-3?r.length-1:o+2];return i.set(bx(a,l.x,c.x,u.x,d.x),bx(a,l.y,c.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){let r=e.points[n];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){let r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){let r=e.points[n];this.points.push(new ce().fromArray(r))}return this}},Dm=Object.freeze({__proto__:null,ArcCurve:Rm,CatmullRomCurve3:Pm,CubicBezierCurve:Ku,CubicBezierCurve3:Im,EllipseCurve:vl,LineCurve:ju,LineCurve3:Nm,QuadraticBezierCurve:Qu,QuadraticBezierCurve3:Lm,SplineCurve:eh}),Um=class extends $n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Dm[i](n,e))}return this}getPoint(e,n){let i=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=i){let o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,n)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){let n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){let n=[],i;for(let r=0,s=this.curves;r<s.length;r++){let o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let u=l[c];i&&i.equals(u)||(n.push(u),i=u)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){let r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){let r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){let r=e.curves[n];this.curves.push(new Dm[r.type]().fromJSON(r))}return this}},yl=class extends Um{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){let i=new ju(this.currentPoint.clone(),new ce(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){let s=new Qu(this.currentPoint.clone(),new ce(e,n),new ce(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){let a=new Ku(this.currentPoint.clone(),new ce(e,n),new ce(i,r),new ce(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){let n=[this.currentPoint.clone()].concat(e),i=new eh(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,n+u,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){let c=new vl(e,n,i,r,s,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},_l=class t extends jt{constructor(e=[new ce(0,-.5),new ce(.5,0),new ce(0,.5)],n=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:n,phiStart:i,phiLength:r},n=Math.floor(n),r=Bt(r,0,Math.PI*2);let s=[],o=[],a=[],l=[],c=[],u=1/n,d=new N,f=new ce,p=new N,g=new N,y=new N,m=0,h=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:m=e[v+1].x-e[v].x,h=e[v+1].y-e[v].y,p.x=h*1,p.y=-m,p.z=h*0,y.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(y.x,y.y,y.z);break;default:m=e[v+1].x-e[v].x,h=e[v+1].y-e[v].y,p.x=h*1,p.y=-m,p.z=h*0,g.copy(p),p.x+=y.x,p.y+=y.y,p.z+=y.z,p.normalize(),l.push(p.x,p.y,p.z),y.copy(g)}for(let v=0;v<=n;v++){let _=i+v*u*r,x=Math.sin(_),C=Math.cos(_);for(let T=0;T<=e.length-1;T++){d.x=e[T].x*x,d.y=e[T].y,d.z=e[T].x*C,o.push(d.x,d.y,d.z),f.x=v/n,f.y=T/(e.length-1),a.push(f.x,f.y);let A=l[3*T+0]*x,I=l[3*T+1],w=l[3*T+0]*C;c.push(A,I,w)}}for(let v=0;v<n;v++)for(let _=0;_<e.length-1;_++){let x=_+v*e.length,C=x,T=x+e.length,A=x+e.length+1,I=x+1;s.push(C,T,I),s.push(A,I,T)}this.setIndex(s),this.setAttribute("position",new nt(o,3)),this.setAttribute("uv",new nt(a,2)),this.setAttribute("normal",new nt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new t(e.points,e.segments,e.phiStart,e.phiLength)}},Yo=class t extends _l{constructor(e=1,n=1,i=4,r=8){let s=new yl;s.absarc(0,-n/2,e,Math.PI*1.5,0),s.absarc(0,n/2,e,0,Math.PI*.5),super(s.getPoints(i),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:n,capSegments:i,radialSegments:r}}static fromJSON(e){return new t(e.radius,e.length,e.capSegments,e.radialSegments)}},th=class t extends jt{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);let s=[],o=[],a=[],l=[],c=new N,u=new ce;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=n;d++,f+=3){let p=i+d/n*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=n;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new nt(o,3)),this.setAttribute("normal",new nt(a,3)),this.setAttribute("uv",new nt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new t(e.radius,e.segments,e.thetaStart,e.thetaLength)}},xl=class t extends jt{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],f=[],p=[],g=0,y=[],m=i/2,h=0;v(),o===!1&&(e>0&&_(!0),n>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new nt(d,3)),this.setAttribute("normal",new nt(f,3)),this.setAttribute("uv",new nt(p,2));function v(){let x=new N,C=new N,T=0,A=(n-e)/i;for(let I=0;I<=s;I++){let w=[],M=I/s,R=M*(n-e)+e;for(let k=0;k<=r;k++){let F=k/r,B=F*l+a,J=Math.sin(B),G=Math.cos(B);C.x=R*J,C.y=-M*i+m,C.z=R*G,d.push(C.x,C.y,C.z),x.set(J,A,G).normalize(),f.push(x.x,x.y,x.z),p.push(F,1-M),w.push(g++)}y.push(w)}for(let I=0;I<r;I++)for(let w=0;w<s;w++){let M=y[w][I],R=y[w+1][I],k=y[w+1][I+1],F=y[w][I+1];(e>0||w!==0)&&(u.push(M,R,F),T+=3),(n>0||w!==s-1)&&(u.push(R,k,F),T+=3)}c.addGroup(h,T,0),h+=T}function _(x){let C=g,T=new ce,A=new N,I=0,w=x===!0?e:n,M=x===!0?1:-1;for(let k=1;k<=r;k++)d.push(0,m*M,0),f.push(0,M,0),p.push(.5,.5),g++;let R=g;for(let k=0;k<=r;k++){let B=k/r*l+a,J=Math.cos(B),G=Math.sin(B);A.x=w*G,A.y=m*M,A.z=w*J,d.push(A.x,A.y,A.z),f.push(0,M,0),T.x=J*.5+.5,T.y=G*.5*M+.5,p.push(T.x,T.y),g++}for(let k=0;k<r;k++){let F=C+k,B=R+k;x===!0?u.push(B,B+1,F):u.push(B+1,B,F),I+=3}c.addGroup(h,I,x===!0?1:2),h+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new t(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},nh=class t extends xl{constructor(e=1,n=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,n,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new t(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var bs=class extends yl{constructor(e){super(e),this.uuid=Ps(),this.type="Shape",this.holes=[]}getPointsHoles(e){let n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){let r=e.holes[n];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){let r=this.holes[n];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){let r=e.holes[n];this.holes.push(new yl().fromJSON(r))}return this}},_R={triangulate:function(t,e,n=2){let i=e&&e.length,r=i?e[0]*n:t.length,s=rM(t,0,r,n,!0),o=[];if(!s||s.next===s.prev)return o;let a,l,c,u,d,f,p;if(i&&(s=ER(t,e,s,n)),t.length>80*n){a=c=t[0],l=u=t[1];for(let g=n;g<r;g+=n)d=t[g],f=t[g+1],d<a&&(a=d),f<l&&(l=f),d>c&&(c=d),f>u&&(u=f);p=Math.max(c-a,u-l),p=p!==0?32767/p:0}return Ml(s,o,n,a,l,p,0),o}};function rM(t,e,n,i,r){let s,o;if(r===UR(t,e,n,i)>0)for(s=e;s<n;s+=i)o=Tx(s,t[s],t[s+1],o);else for(s=n-i;s>=e;s-=i)o=Tx(s,t[s],t[s+1],o);return o&&ph(o,o.next)&&(wl(o),o=o.next),o}function Ts(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(ph(n,n.next)||Pt(n.prev,n,n.next)===0)){if(wl(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function Ml(t,e,n,i,r,s,o){if(!t)return;!o&&s&&RR(t,i,r,s);let a=t,l,c;for(;t.prev!==t.next;){if(l=t.prev,c=t.next,s?MR(t,i,r,s):xR(t)){e.push(l.i/n|0),e.push(t.i/n|0),e.push(c.i/n|0),wl(t),t=c.next,a=c.next;continue}if(t=c,t===a){o?o===1?(t=SR(Ts(t),e,n),Ml(t,e,n,i,r,s,2)):o===2&&wR(t,e,n,i,r,s):Ml(Ts(t),e,n,i,r,s,1);break}}}function xR(t){let e=t.prev,n=t,i=t.next;if(Pt(e,n,i)>=0)return!1;let r=e.x,s=n.x,o=i.x,a=e.y,l=n.y,c=i.y,u=r<s?r<o?r:o:s<o?s:o,d=a<l?a<c?a:c:l<c?l:c,f=r>s?r>o?r:o:s>o?s:o,p=a>l?a>c?a:c:l>c?l:c,g=i.next;for(;g!==e;){if(g.x>=u&&g.x<=f&&g.y>=d&&g.y<=p&&No(r,a,s,l,o,c,g.x,g.y)&&Pt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function MR(t,e,n,i){let r=t.prev,s=t,o=t.next;if(Pt(r,s,o)>=0)return!1;let a=r.x,l=s.x,c=o.x,u=r.y,d=s.y,f=o.y,p=a<l?a<c?a:c:l<c?l:c,g=u<d?u<f?u:f:d<f?d:f,y=a>l?a>c?a:c:l>c?l:c,m=u>d?u>f?u:f:d>f?d:f,h=Om(p,g,e,n,i),v=Om(y,m,e,n,i),_=t.prevZ,x=t.nextZ;for(;_&&_.z>=h&&x&&x.z<=v;){if(_.x>=p&&_.x<=y&&_.y>=g&&_.y<=m&&_!==r&&_!==o&&No(a,u,l,d,c,f,_.x,_.y)&&Pt(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=p&&x.x<=y&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&No(a,u,l,d,c,f,x.x,x.y)&&Pt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=h;){if(_.x>=p&&_.x<=y&&_.y>=g&&_.y<=m&&_!==r&&_!==o&&No(a,u,l,d,c,f,_.x,_.y)&&Pt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=v;){if(x.x>=p&&x.x<=y&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&No(a,u,l,d,c,f,x.x,x.y)&&Pt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function SR(t,e,n){let i=t;do{let r=i.prev,s=i.next.next;!ph(r,s)&&sM(r,i,i.next,s)&&Sl(r,s)&&Sl(s,r)&&(e.push(r.i/n|0),e.push(i.i/n|0),e.push(s.i/n|0),wl(i),wl(i.next),i=t=s),i=i.next}while(i!==t);return Ts(i)}function wR(t,e,n,i,r,s){let o=t;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&NR(o,a)){let l=oM(o,a);o=Ts(o,o.next),l=Ts(l,l.next),Ml(o,e,n,i,r,s,0),Ml(l,e,n,i,r,s,0);return}a=a.next}o=o.next}while(o!==t)}function ER(t,e,n,i){let r=[],s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:t.length,c=rM(t,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push(IR(c));for(r.sort(bR),s=0;s<r.length;s++)n=TR(r[s],n);return n}function bR(t,e){return t.x-e.x}function TR(t,e){let n=AR(t,e);if(!n)return e;let i=oM(n,t);return Ts(i,i.next),Ts(n,n.next)}function AR(t,e){let n=e,i=-1/0,r,s=t.x,o=t.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){let f=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(f<=s&&f>i&&(i=f,r=n.x<n.next.x?n:n.next,f===s))return r}n=n.next}while(n!==e);if(!r)return null;let a=r,l=r.x,c=r.y,u=1/0,d;n=r;do s>=n.x&&n.x>=l&&s!==n.x&&No(o<c?s:i,o,l,c,o<c?i:s,o,n.x,n.y)&&(d=Math.abs(o-n.y)/(s-n.x),Sl(n,t)&&(d<u||d===u&&(n.x>r.x||n.x===r.x&&CR(r,n)))&&(r=n,u=d)),n=n.next;while(n!==a);return r}function CR(t,e){return Pt(t.prev,t,e.prev)<0&&Pt(e.next,t,t.next)<0}function RR(t,e,n,i){let r=t;do r.z===0&&(r.z=Om(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,PR(r)}function PR(t){let e,n,i,r,s,o,a,l,c=1;do{for(n=t,t=null,s=null,o=0;n;){for(o++,i=n,a=0,e=0;e<c&&(a++,i=i.nextZ,!!i);e++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;n=i}s.nextZ=null,c*=2}while(o>1);return t}function Om(t,e,n,i,r){return t=(t-n)*r|0,e=(e-i)*r|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function IR(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function No(t,e,n,i,r,s,o,a){return(r-o)*(e-a)>=(t-o)*(s-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(s-a)>=(r-o)*(i-a)}function NR(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!LR(t,e)&&(Sl(t,e)&&Sl(e,t)&&DR(t,e)&&(Pt(t.prev,t,e.prev)||Pt(t,e.prev,e))||ph(t,e)&&Pt(t.prev,t,t.next)>0&&Pt(e.prev,e,e.next)>0)}function Pt(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function ph(t,e){return t.x===e.x&&t.y===e.y}function sM(t,e,n,i){let r=Iu(Pt(t,e,n)),s=Iu(Pt(t,e,i)),o=Iu(Pt(n,i,t)),a=Iu(Pt(n,i,e));return!!(r!==s&&o!==a||r===0&&Pu(t,n,e)||s===0&&Pu(t,i,e)||o===0&&Pu(n,t,i)||a===0&&Pu(n,e,i))}function Pu(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function Iu(t){return t>0?1:t<0?-1:0}function LR(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&sM(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function Sl(t,e){return Pt(t.prev,t,t.next)<0?Pt(t,e,t.next)>=0&&Pt(t,t.prev,e)>=0:Pt(t,e,t.prev)<0||Pt(t,t.next,e)<0}function DR(t,e){let n=t,i=!1,r=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function oM(t,e){let n=new km(t.i,t.x,t.y),i=new km(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function Tx(t,e,n,i){let r=new km(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function wl(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function km(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function UR(t,e,n,i){let r=0;for(let s=e,o=n-i;s<n;s+=i)r+=(t[o]-t[s])*(t[s+1]+t[o+1]),o=s;return r}var Vr=class t{static area(e){let n=e.length,i=0;for(let r=n-1,s=0;s<n;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return t.area(e)<0}static triangulateShape(e,n){let i=[],r=[],s=[];Ax(e),Cx(i,e);let o=e.length;n.forEach(Ax);for(let l=0;l<n.length;l++)r.push(o),o+=n[l].length,Cx(i,n[l]);let a=_R.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}};function Ax(t){let e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function Cx(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}var ih=class t extends jt{constructor(e=new bs([new ce(.5,.5),new ce(-.5,.5),new ce(-.5,-.5),new ce(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:n},e=Array.isArray(e)?e:[e];let i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new nt(r,3)),this.setAttribute("uv",new nt(s,2)),this.computeVertexNormals();function o(a){let l=[],c=n.curveSegments!==void 0?n.curveSegments:12,u=n.steps!==void 0?n.steps:1,d=n.depth!==void 0?n.depth:1,f=n.bevelEnabled!==void 0?n.bevelEnabled:!0,p=n.bevelThickness!==void 0?n.bevelThickness:.2,g=n.bevelSize!==void 0?n.bevelSize:p-.1,y=n.bevelOffset!==void 0?n.bevelOffset:0,m=n.bevelSegments!==void 0?n.bevelSegments:3,h=n.extrudePath,v=n.UVGenerator!==void 0?n.UVGenerator:OR,_,x=!1,C,T,A,I;h&&(_=h.getSpacedPoints(u),x=!0,f=!1,C=h.computeFrenetFrames(u,!1),T=new N,A=new N,I=new N),f||(m=0,p=0,g=0,y=0);let w=a.extractPoints(c),M=w.shape,R=w.holes;if(!Vr.isClockWise(M)){M=M.reverse();for(let Q=0,le=R.length;Q<le;Q++){let P=R[Q];Vr.isClockWise(P)&&(R[Q]=P.reverse())}}let F=Vr.triangulateShape(M,R),B=M;for(let Q=0,le=R.length;Q<le;Q++){let P=R[Q];M=M.concat(P)}function J(Q,le,P){return le||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(le,P)}let G=M.length,ie=F.length;function W(Q,le,P){let Ae,ne,Me,de=Q.x-le.x,Ue=Q.y-le.y,Z=P.x-Q.x,E=P.y-Q.y,S=de*de+Ue*Ue,O=de*E-Ue*Z;if(Math.abs(O)>Number.EPSILON){let q=Math.sqrt(S),j=Math.sqrt(Z*Z+E*E),Y=le.x-Ue/q,Ce=le.y+de/q,me=P.x-E/j,Se=P.y+Z/j,Je=((me-Y)*E-(Se-Ce)*Z)/(de*E-Ue*Z);Ae=Y+de*Je-Q.x,ne=Ce+Ue*Je-Q.y;let ae=Ae*Ae+ne*ne;if(ae<=2)return new ce(Ae,ne);Me=Math.sqrt(ae/2)}else{let q=!1;de>Number.EPSILON?Z>Number.EPSILON&&(q=!0):de<-Number.EPSILON?Z<-Number.EPSILON&&(q=!0):Math.sign(Ue)===Math.sign(E)&&(q=!0),q?(Ae=-Ue,ne=de,Me=Math.sqrt(S)):(Ae=de,ne=Ue,Me=Math.sqrt(S/2))}return new ce(Ae/Me,ne/Me)}let K=[];for(let Q=0,le=B.length,P=le-1,Ae=Q+1;Q<le;Q++,P++,Ae++)P===le&&(P=0),Ae===le&&(Ae=0),K[Q]=W(B[Q],B[P],B[Ae]);let fe=[],xe,De=K.concat();for(let Q=0,le=R.length;Q<le;Q++){let P=R[Q];xe=[];for(let Ae=0,ne=P.length,Me=ne-1,de=Ae+1;Ae<ne;Ae++,Me++,de++)Me===ne&&(Me=0),de===ne&&(de=0),xe[Ae]=W(P[Ae],P[Me],P[de]);fe.push(xe),De=De.concat(xe)}for(let Q=0;Q<m;Q++){let le=Q/m,P=p*Math.cos(le*Math.PI/2),Ae=g*Math.sin(le*Math.PI/2)+y;for(let ne=0,Me=B.length;ne<Me;ne++){let de=J(B[ne],K[ne],Ae);he(de.x,de.y,-P)}for(let ne=0,Me=R.length;ne<Me;ne++){let de=R[ne];xe=fe[ne];for(let Ue=0,Z=de.length;Ue<Z;Ue++){let E=J(de[Ue],xe[Ue],Ae);he(E.x,E.y,-P)}}}let Qe=g+y;for(let Q=0;Q<G;Q++){let le=f?J(M[Q],De[Q],Qe):M[Q];x?(A.copy(C.normals[0]).multiplyScalar(le.x),T.copy(C.binormals[0]).multiplyScalar(le.y),I.copy(_[0]).add(A).add(T),he(I.x,I.y,I.z)):he(le.x,le.y,0)}for(let Q=1;Q<=u;Q++)for(let le=0;le<G;le++){let P=f?J(M[le],De[le],Qe):M[le];x?(A.copy(C.normals[Q]).multiplyScalar(P.x),T.copy(C.binormals[Q]).multiplyScalar(P.y),I.copy(_[Q]).add(A).add(T),he(I.x,I.y,I.z)):he(P.x,P.y,d/u*Q)}for(let Q=m-1;Q>=0;Q--){let le=Q/m,P=p*Math.cos(le*Math.PI/2),Ae=g*Math.sin(le*Math.PI/2)+y;for(let ne=0,Me=B.length;ne<Me;ne++){let de=J(B[ne],K[ne],Ae);he(de.x,de.y,d+P)}for(let ne=0,Me=R.length;ne<Me;ne++){let de=R[ne];xe=fe[ne];for(let Ue=0,Z=de.length;Ue<Z;Ue++){let E=J(de[Ue],xe[Ue],Ae);x?he(E.x,E.y+_[u-1].y,_[u-1].x+P):he(E.x,E.y,d+P)}}}$(),oe();function $(){let Q=r.length/3;if(f){let le=0,P=G*le;for(let Ae=0;Ae<ie;Ae++){let ne=F[Ae];Ne(ne[2]+P,ne[1]+P,ne[0]+P)}le=u+m*2,P=G*le;for(let Ae=0;Ae<ie;Ae++){let ne=F[Ae];Ne(ne[0]+P,ne[1]+P,ne[2]+P)}}else{for(let le=0;le<ie;le++){let P=F[le];Ne(P[2],P[1],P[0])}for(let le=0;le<ie;le++){let P=F[le];Ne(P[0]+G*u,P[1]+G*u,P[2]+G*u)}}i.addGroup(Q,r.length/3-Q,0)}function oe(){let Q=r.length/3,le=0;Te(B,le),le+=B.length;for(let P=0,Ae=R.length;P<Ae;P++){let ne=R[P];Te(ne,le),le+=ne.length}i.addGroup(Q,r.length/3-Q,1)}function Te(Q,le){let P=Q.length;for(;--P>=0;){let Ae=P,ne=P-1;ne<0&&(ne=Q.length-1);for(let Me=0,de=u+m*2;Me<de;Me++){let Ue=G*Me,Z=G*(Me+1),E=le+Ae+Ue,S=le+ne+Ue,O=le+ne+Z,q=le+Ae+Z;Fe(E,S,O,q)}}}function he(Q,le,P){l.push(Q),l.push(le),l.push(P)}function Ne(Q,le,P){Oe(Q),Oe(le),Oe(P);let Ae=r.length/3,ne=v.generateTopUV(i,r,Ae-3,Ae-2,Ae-1);Ke(ne[0]),Ke(ne[1]),Ke(ne[2])}function Fe(Q,le,P,Ae){Oe(Q),Oe(le),Oe(Ae),Oe(le),Oe(P),Oe(Ae);let ne=r.length/3,Me=v.generateSideWallUV(i,r,ne-6,ne-3,ne-2,ne-1);Ke(Me[0]),Ke(Me[1]),Ke(Me[3]),Ke(Me[1]),Ke(Me[2]),Ke(Me[3])}function Oe(Q){r.push(l[Q*3+0]),r.push(l[Q*3+1]),r.push(l[Q*3+2])}function Ke(Q){s.push(Q.x),s.push(Q.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return kR(n,i,e)}static fromJSON(e,n){let i=[];for(let s=0,o=e.shapes.length;s<o;s++){let a=n[e.shapes[s]];i.push(a)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Dm[r.type]().fromJSON(r)),new t(i,e.options)}},OR={generateTopUV:function(t,e,n,i,r){let s=e[n*3],o=e[n*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new ce(s,o),new ce(a,l),new ce(c,u)]},generateSideWallUV:function(t,e,n,i,r,s){let o=e[n*3],a=e[n*3+1],l=e[n*3+2],c=e[i*3],u=e[i*3+1],d=e[i*3+2],f=e[r*3],p=e[r*3+1],g=e[r*3+2],y=e[s*3],m=e[s*3+1],h=e[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new ce(o,1-l),new ce(c,1-d),new ce(f,1-g),new ce(y,1-h)]:[new ce(a,1-l),new ce(u,1-d),new ce(p,1-g),new ce(m,1-h)]}};function kR(t,e,n){if(n.shapes=[],Array.isArray(t))for(let i=0,r=t.length;i<r;i++){let s=t[i];n.shapes.push(s.uuid)}else n.shapes.push(t.uuid);return n.options=Object.assign({},e),e.extrudePath!==void 0&&(n.options.extrudePath=e.extrudePath.toJSON()),n}var rh=class t extends jt{constructor(e=.5,n=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);let a=[],l=[],c=[],u=[],d=e,f=(n-e)/r,p=new N,g=new ce;for(let y=0;y<=r;y++){for(let m=0;m<=i;m++){let h=s+m/i*o;p.x=d*Math.cos(h),p.y=d*Math.sin(h),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/n+1)/2,g.y=(p.y/n+1)/2,u.push(g.x,g.y)}d+=f}for(let y=0;y<r;y++){let m=y*(i+1);for(let h=0;h<i;h++){let v=h+m,_=v,x=v+i+1,C=v+i+2,T=v+1;a.push(_,x,T),a.push(x,C,T)}}this.setIndex(a),this.setAttribute("position",new nt(l,3)),this.setAttribute("normal",new nt(c,3)),this.setAttribute("uv",new nt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new t(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},El=class t extends jt{constructor(e=new bs([new ce(0,.5),new ce(-.5,-.5),new ce(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:n};let i=[],r=[],s=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new nt(r,3)),this.setAttribute("normal",new nt(s,3)),this.setAttribute("uv",new nt(o,2));function c(u){let d=r.length/3,f=u.extractPoints(n),p=f.shape,g=f.holes;Vr.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,h=g.length;m<h;m++){let v=g[m];Vr.isClockWise(v)===!0&&(g[m]=v.reverse())}let y=Vr.triangulateShape(p,g);for(let m=0,h=g.length;m<h;m++){let v=g[m];p=p.concat(v)}for(let m=0,h=p.length;m<h;m++){let v=p[m];r.push(v.x,v.y,0),s.push(0,0,1),o.push(v.x,v.y)}for(let m=0,h=y.length;m<h;m++){let v=y[m],_=v[0]+d,x=v[1]+d,C=v[2]+d;i.push(_,x,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),n=this.parameters.shapes;return FR(n,e)}static fromJSON(e,n){let i=[];for(let r=0,s=e.shapes.length;r<s;r++){let o=n[e.shapes[r]];i.push(o)}return new t(i,e.curveSegments)}};function FR(t,e){if(e.shapes=[],Array.isArray(t))for(let n=0,i=t.length;n<i;n++){let r=t[n];e.shapes.push(r.uuid)}else e.shapes.push(t.uuid);return e}var bl=class t extends jt{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,u=[],d=new N,f=new N,p=[],g=[],y=[],m=[];for(let h=0;h<=i;h++){let v=[],_=h/i,x=0;h===0&&o===0?x=.5/n:h===i&&l===Math.PI&&(x=-.5/n);for(let C=0;C<=n;C++){let T=C/n;d.x=-e*Math.cos(r+T*s)*Math.sin(o+_*a),d.y=e*Math.cos(o+_*a),d.z=e*Math.sin(r+T*s)*Math.sin(o+_*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),y.push(f.x,f.y,f.z),m.push(T+x,1-_),v.push(c++)}u.push(v)}for(let h=0;h<i;h++)for(let v=0;v<n;v++){let _=u[h][v+1],x=u[h][v],C=u[h+1][v],T=u[h+1][v+1];(h!==0||o>0)&&p.push(_,x,T),(h!==i-1||l<Math.PI)&&p.push(x,C,T)}this.setIndex(p),this.setAttribute("position",new nt(g,3)),this.setAttribute("normal",new nt(y,3)),this.setAttribute("uv",new nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new t(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Tl=class t extends jt{constructor(e=1,n=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);let o=[],a=[],l=[],c=[],u=new N,d=new N,f=new N;for(let p=0;p<=i;p++)for(let g=0;g<=r;g++){let y=g/r*s,m=p/i*Math.PI*2;d.x=(e+n*Math.cos(m))*Math.cos(y),d.y=(e+n*Math.cos(m))*Math.sin(y),d.z=n*Math.sin(m),a.push(d.x,d.y,d.z),u.x=e*Math.cos(y),u.y=e*Math.sin(y),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=r;g++){let y=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,h=(r+1)*(p-1)+g,v=(r+1)*p+g;o.push(y,m,v),o.push(m,h,v)}this.setIndex(o),this.setAttribute("position",new nt(a,3)),this.setAttribute("normal",new nt(l,3)),this.setAttribute("uv",new nt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new t(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var yn=class extends ws{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qx,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},sh=class extends yn{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Bt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function Nu(t,e,n){return!t||!n&&t.constructor===e?t:typeof e.BYTES_PER_ELEMENT=="number"?new e(t):Array.prototype.slice.call(t)}function BR(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}var qo=class{constructor(e,n,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let n=this.parameterPositions,i=this._cachedIndex,r=n[i],s=n[i-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=n[++i],e<r)break t}o=n.length;break n}if(!(e>=s)){let a=n[1];e<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=n[--i-1],e>=s)break t}o=i,i=0;break n}break e}for(;i<o;){let a=i+o>>>1;e<n[a]?o=a:i=a+1}if(r=n[i],s=n[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let n=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)n[o]=i[s+o];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Fm=class extends qo{constructor(e,n,i,r){super(e,n,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:C_,endingEnd:C_}}intervalChanged_(e,n,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case R_:s=e,a=2*n-i;break;case P_:s=r.length-2,a=n+r[s]-r[s+1];break;default:s=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case R_:o=e,l=2*i-n;break;case P_:o=1,l=i+r[1]-r[0];break;default:o=e-1,l=n}let c=(i-n)*.5,u=this.valueSize;this._weightPrev=c/(n-a),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,n,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(i-n)/(r-n),y=g*g,m=y*g,h=-f*m+2*f*y-f*g,v=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*g+1,_=(-1-p)*m+(1.5+p)*y+.5*g,x=p*m-p*y;for(let C=0;C!==a;++C)s[C]=h*o[u+C]+v*o[c+C]+_*o[l+C]+x*o[d+C];return s}},Bm=class extends qo{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-n)/(r-n),d=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*d+o[l+f]*u;return s}},zm=class extends qo{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},di=class{constructor(e,n,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Nu(n,this.TimeBufferType),this.values=Nu(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let n=e.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(e);else{i={name:e.name,times:Nu(e.times,Array),values:Nu(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new zm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Bm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Fm(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let n;switch(e){case Fu:n=this.InterpolantFactoryMethodDiscrete;break;case dm:n=this.InterpolantFactoryMethodLinear;break;case Jf:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fu;case this.InterpolantFactoryMethodLinear:return dm;case this.InterpolantFactoryMethodSmooth:return Jf}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]+=e}return this}scale(e){if(e!==1){let n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]*=e}return this}trim(e,n){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>n;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&BR(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Jf,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{let d=a*i,f=d-i,p=d+i;for(let g=0;g!==i;++g){let y=n[d+g];if(y!==n[f+g]||y!==n[p+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*i,f=o*i;for(let p=0;p!==i;++p)n[f+p]=n[d+p]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)n[l+c]=n[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=n.slice(0,o*i)):(this.times=e,this.values=n),this}clone(){let e=this.times.slice(),n=this.values.slice(),i=this.constructor,r=new i(this.name,e,n);return r.createInterpolant=this.createInterpolant,r}};di.prototype.TimeBufferType=Float32Array;di.prototype.ValueBufferType=Float32Array;di.prototype.DefaultInterpolation=dm;var As=class extends di{constructor(e,n,i){super(e,n,i)}};As.prototype.ValueTypeName="bool";As.prototype.ValueBufferType=Array;As.prototype.DefaultInterpolation=Fu;As.prototype.InterpolantFactoryMethodLinear=void 0;As.prototype.InterpolantFactoryMethodSmooth=void 0;var Vm=class extends di{};Vm.prototype.ValueTypeName="color";var Hm=class extends di{};Hm.prototype.ValueTypeName="number";var Gm=class extends qo{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-n)/(r-n),c=e*a;for(let u=c+a;c!==u;c+=4)Ti.slerpFlat(s,0,o,c-a,o,c,l);return s}},oh=class extends di{InterpolantFactoryMethodLinear(e){return new Gm(this.times,this.values,this.getValueSize(),e)}};oh.prototype.ValueTypeName="quaternion";oh.prototype.InterpolantFactoryMethodSmooth=void 0;var Cs=class extends di{constructor(e,n,i){super(e,n,i)}};Cs.prototype.ValueTypeName="string";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=Fu;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;var Wm=class extends di{};Wm.prototype.ValueTypeName="vector";var Xm=class{constructor(e,n,i){let r=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){let p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}},zR=new Xm,Ym=class{constructor(e){this.manager=e!==void 0?e:zR,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){let i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ym.DEFAULT_MATERIAL_NAME="__DEFAULT";var $o=class extends Kt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}},ah=class extends $o{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}},Tp=new yt,Rx=new N,Px=new N,Al=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gl,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let n=this.camera,i=this.matrix;Rx.setFromMatrixPosition(e.matrixWorld),n.position.copy(Rx),Px.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Px),n.updateMatrixWorld(),Tp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tp),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Tp)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},qm=class extends Al{constructor(){super(new zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let n=this.camera,i=Go*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||n.far;(i!==n.fov||r!==n.aspect||s!==n.far)&&(n.fov=i,n.aspect=r,n.far=s,n.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},lh=class extends $o{constructor(e,n,i=0,r=Math.PI/3,s=0,o=2){super(e,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Kt.DEFAULT_UP),this.updateMatrix(),this.target=new Kt,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new qm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Ix=new yt,sl=new N,Ap=new N,$m=class extends Al{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ce(4,2),this._viewportCount=6,this._viewports=[new ht(2,1,1,1),new ht(0,1,1,1),new ht(3,1,1,1),new ht(1,1,1,1),new ht(3,0,1,1),new ht(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,n=0){let i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),sl.setFromMatrixPosition(e.matrixWorld),i.position.copy(sl),Ap.copy(i.position),Ap.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(Ap),i.updateMatrixWorld(),r.makeTranslation(-sl.x,-sl.y,-sl.z),Ix.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ix)}},ch=class extends $o{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new $m}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Zm=class extends Al{constructor(){super(new $u(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Rs=class extends $o{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Kt.DEFAULT_UP),this.updateMatrix(),this.target=new Kt,this.shadow=new Zm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var cg="\\[\\]\\.:\\/",VR=new RegExp("["+cg+"]","g"),ug="[^"+cg+"]",HR="[^"+cg.replace("\\.","")+"]",GR=/((?:WC+[\/:])*)/.source.replace("WC",ug),WR=/(WCOD+)?/.source.replace("WCOD",HR),XR=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ug),YR=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ug),qR=new RegExp("^"+GR+WR+XR+YR+"$"),$R=["material","materials","bones","map"],Jm=class{constructor(e,n,i){let r=i||bt.parseTrackName(n);this._targetGroup=e,this._bindings=e.subscribe_(n,r)}getValue(e,n){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,n)}setValue(e,n){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,n)}bind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].bind()}unbind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].unbind()}},bt=class t{constructor(e,n,i){this.path=n,this.parsedPath=i||t.parseTrackName(n),this.node=t.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,n,i){return e&&e.isAnimationObjectGroup?new t.Composite(e,n,i):new t(e,n,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(VR,"")}static parseTrackName(e){let n=qR.exec(e);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);$R.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,n){if(n===void 0||n===""||n==="."||n===-1||n===e.name||n===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(n);if(i!==void 0)return i}if(e.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===n||a.uuid===n)return a;let l=i(a.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,n){e[n]=this.targetObject[this.propertyName]}_getValue_array(e,n){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[n++]=i[r]}_getValue_arrayElement(e,n){e[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,n){this.resolvedProperty.toArray(e,n)}_setValue_direct(e,n){this.targetObject[this.propertyName]=e[n]}_setValue_direct_setNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,n){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[n++]}_setValue_array_setNeedsUpdate(e,n){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,n){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,n){this.resolvedProperty[this.propertyIndex]=e[n]}_setValue_arrayElement_setNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,n){this.resolvedProperty.fromArray(e,n)}_setValue_fromArray_setNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,n){this.bind(),this.getValue(e,n)}_setValue_unbound(e,n){this.bind(),this.setValue(e,n)}bind(){let e=this.node,n=this.parsedPath,i=n.objectName,r=n.propertyName,s=n.propertyIndex;if(e||(e=t.findNode(this.rootNode,n.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[r];if(o===void 0){let c=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};bt.Composite=Jm;bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};bt.prototype.GetterByBindingType=[bt.prototype._getValue_direct,bt.prototype._getValue_array,bt.prototype._getValue_arrayElement,bt.prototype._getValue_toArray];bt.prototype.SetterByBindingTypeAndVersioning=[[bt.prototype._setValue_direct,bt.prototype._setValue_direct_setNeedsUpdate,bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_array,bt.prototype._setValue_array_setNeedsUpdate,bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_arrayElement,bt.prototype._setValue_arrayElement_setNeedsUpdate,bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_fromArray,bt.prototype._setValue_fromArray_setNeedsUpdate,bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var k2=new Float32Array(1);var Nx=new yt,uh=class{constructor(e,n,i=0,r=1/0){this.ray=new Gu(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new ml,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return Nx.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Nx),this}intersectObject(e,n=!0,i=[]){return Km(e,this,i,n),i.sort(Lx),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Km(e[r],this,i,n);return i.sort(Lx),i}};function Lx(t,e){return t.distance-e.distance}function Km(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){let s=t.children;for(let o=0,a=s.length;o<a;o++)Km(s[o],e,n,!0)}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:jm}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=jm);var jo=class extends Xr{constructor(){super();let e=new Es;e.deleteAttribute("uv");let n=new yn({side:un}),i=new yn,r=new ch(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let s=new qe(e,n);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);let o=new qe(e,i);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);let a=new qe(e,i);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);let l=new qe(e,i);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);let c=new qe(e,i);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);let u=new qe(e,i);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);let d=new qe(e,i);d.position.set(-2.193,-.369,-5.547),d.rotation.set(0,.516,0),d.scale.set(3.875,3.487,2.986),this.add(d);let f=new qe(e,Ko(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);let p=new qe(e,Ko(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);let g=new qe(e,Ko(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);let y=new qe(e,Ko(43));y.position.set(-.462,8.89,14.52),y.scale.set(4.38,5.441,.088),this.add(y);let m=new qe(e,Ko(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);let h=new qe(e,Ko(100));h.position.set(0,20,0),h.scale.set(1,.1,1),this.add(h)}dispose(){let e=new Set;this.traverse(n=>{n.isMesh&&(e.add(n.geometry),e.add(n.material))});for(let n of e)n.dispose()}};function Ko(t){let e=new or;return e.color.setScalar(t),e}function lM(t,e=!1){let n=t[0].index!==null,i=new Set(Object.keys(t[0].attributes)),r=new Set(Object.keys(t[0].morphAttributes)),s={},o={},a=t[0].morphTargetsRelative,l=new jt,c=0;for(let u=0;u<t.length;++u){let d=t[u],f=0;if(n!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in d.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(d.attributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in d.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(d.morphAttributes[p])}if(e){let p;if(n)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,u),c+=p}}if(n){let u=0,d=[];for(let f=0;f<t.length;++f){let p=t[f].index;for(let g=0;g<p.count;++g)d.push(p.getX(g)+u);u+=t[f].attributes.position.count}l.setIndex(d)}for(let u in s){let d=aM(s[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,d)}for(let u in o){let d=o[u][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<d;++f){let p=[];for(let y=0;y<o[u].length;++y)p.push(o[u][y][f]);let g=aM(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function aM(t){let e,n,i,r=-1,s=0;for(let c=0;c<t.length;++c){let u=t[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(n===void 0&&(n=u.itemSize),n!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*n}let o=new e(s),a=new hn(o,n,i),l=0;for(let c=0;c<t.length;++c){let u=t[c];if(u.isInterleavedBufferAttribute){let d=l/n;for(let f=0,p=u.count;f<p;f++)for(let g=0;g<n;g++){let y=u.getComponent(f,g);a.setComponent(f+d,g,y)}}else o.set(u.array,l);l+=u.count*n}return r!==void 0&&(a.gpuType=r),a}var hg=.06;function ZR(t,e){let n=t.attributes.position,i=new Float32Array(n.count*3);for(let r=0;r<n.count;r++){let s=typeof e=="function"?e(n.getX(r),n.getY(r),n.getZ(r)):e;typeof s=="number"&&(s=[s,s,s]),i.set(s,r*3)}return t.setAttribute("color",new hn(i,3)),t}function _t(t,{p:e=[0,0,0],r:n=[0,0,0],s:i=[1,1,1]}={},r=1){let s=new yt().compose(new N(...e),new Ti().setFromEuler(new qn(...n)),new N(...i));return t.applyMatrix4(s),ZR(t,r)}var Qt=(t=28,e=18)=>new bl(1,t,e),Ci=t=>[t(1),t(-1)];function uM(t,e){let n=[[0,0],[t*.95,0],[t,.012],[t,e*.5],[t*.955,e*.62],[t*.93,e*.8],[t*.86,e],[0,e]].map(([i,r])=>new ce(i,r));return new _l(n,48)}function hM(t){let e=lM(t,!1);return t.forEach(n=>n.dispose()),e.computeBoundingSphere(),e}var cM=(t,e,n)=>{let i=Math.min(1,Math.max(0,(n-t)/(e-t)));return i*i*(3-2*i)};function mh(){let t=(i,r,s)=>1-.9*cM(.38,.7,Math.sin(r*84+s*26+Math.sin(i*34)*1.3)),e=(i,r,s)=>1-.9*cM(.3,.7,Math.sin(Math.atan2(s,i)*15)),n=(i,r,s)=>s>.15?1:t(i,r*1.25,s);return hM([_t(uM(.285,.075),{},.42),_t(Qt(44,36),{p:[0,.215,-.07],s:[.185,.155,.2]},t),_t(Qt(44,44),{p:[0,.35,.04],r:[.22,0,0],s:[.142,.215,.14]},t),...Ci(i=>_t(Qt(28,28),{p:[.145*i,.175,-.01],s:[.075,.105,.13]},t)),...Ci(i=>_t(new Yo(.046,.2,8,16,24),{p:[.078*i,.205,.135],r:[-.1,0,0]},t)),...Ci(i=>_t(Qt(16,10),{p:[.078*i,.1,.185],s:[.058,.034,.078]})),_t(Qt(36,28),{p:[0,.485,.075],s:[.118,.095,.11]},t),_t(Qt(36,30),{p:[0,.59,.1],s:[.112,.096,.106]},n),...Ci(i=>_t(Qt(16,10),{p:[.088*i,.556,.095],r:[0,0,.5*i],s:[.05,.064,.05]},n)),_t(Qt(18,12),{p:[0,.558,.178],s:[.064,.044,.052]}),_t(Qt(10,8),{p:[0,.574,.229],s:[.022,.014,.012]},hg),...Ci(i=>_t(new bl(.04,14,10),{p:[.08*i,.682,.075],r:[-.15,0,-.35*i],s:[.9,1.15,.45]})),...Ci(i=>_t(Qt(10,8),{p:[.046*i,.612,.192],r:[0,0,.4*i],s:[.019,.009,.008]},hg)),_t(new Tl(.215,.028,12,90,3.3),{p:[0,.103,-.02],r:[Math.PI/2,0,2.25]},e),_t(Qt(12,8),{p:[.215*Math.cos(5.55),.103,-.02+.215*Math.sin(5.55)],s:[.032,.032,.032]},.2)])}function gh(){let t=[.5,.39,.27];return hM([_t(uM(.19,.05),{},.84),_t(Qt(),{p:[0,.14,-.022],s:[.102,.088,.152]}),_t(new Yo(.046,.1,6,14),{p:[0,.222,.086],r:[.5,0,0]}),_t(Qt(22,14),{p:[0,.308,.14],r:[.35,0,0],s:[.053,.056,.08]}),_t(Qt(14,10),{p:[0,.288,.2],s:[.035,.032,.04]}),...Ci(e=>_t(Qt(12,8),{p:[.076*e,.312,.112],r:[0,0,-.5*e],s:[.046,.014,.023]})),...Ci(e=>_t(new Tl(.062,.0135,8,22,2.3),{p:[.03*e,.33,.085],r:[0,Math.PI/2-.3*e,.25]},t)),_t(new nh(.016,.052,10),{p:[0,.246,.203],r:[Math.PI,0,0]}),_t(Qt(10,8),{p:[0,.2,-.165],s:[.02,.03,.02]}),...Ci(e=>_t(new Yo(.022,.07,4,10),{p:[.056*e,.074,.112],r:[Math.PI/2,0,0]})),...Ci(e=>_t(Qt(8,6),{p:[.041*e,.322,.184],s:[.0075,.0075,.006]},hg))])}function vh(){return{tiger:new yn({color:12946764,metalness:1,roughness:.36,vertexColors:!0,envMapIntensity:1.15}),goat:new sh({color:15787987,metalness:0,roughness:.46,clearcoat:.35,clearcoatRoughness:.55,vertexColors:!0,envMapIntensity:.55})}}function dM(t=360){let e=null;try{let n=document.createElement("canvas");e=new Xo({canvas:n,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),e.setSize(t,t,!1),e.outputColorSpace=qt,e.toneMapping=Cl;let i=new Xr,r=new Wr(e),s=r.fromScene(new jo,.04).texture;i.environment=s,i.environmentIntensity=.55;let o=new Rs(16766883,3.2);o.position.set(-2,3,2.5);let a=new Rs(10335448,1.4);a.position.set(2.5,1.5,-3),i.add(o,a);let l=new zt(26,1,.1,20),c=vh(),u={tiger:[mh(),.36,1.9],goat:[gh(),.2,1.25]},d={};for(let[f,[p,g,y]]of Object.entries(u)){let m=new qe(p,c[f]);m.rotation.y=-.55,i.add(m),l.position.set(0,g+y*.3,y),l.lookAt(0,g,0),e.render(i,l),d[f]=n.toDataURL("image/png"),i.remove(m),p.dispose()}return c.tiger.dispose(),c.goat.dispose(),s.dispose(),r.dispose(),d}catch{return null}finally{e&&(e.dispose(),e.forceContextLoss())}}var Ns=lt(An());var Zn=lt(An()),z=lt(Gt()),gM=1e6,n2=4,fg=[{key:"minimax",name:"Minimax",note:"visits every position; move order makes no difference",color:"#8f877a"},{key:"ab_worst",name:"Alpha-beta, worst order",note:"worst move tried first at every turn: the worst case",color:"#c4573a"},{key:"ab_natural",name:"Alpha-beta, rule order",note:"how the agent actually plays (moves by point number)",color:"#c7a25b"},{key:"ab_heuristic",name:"Alpha-beta, heuristic order",note:"best-looking move first, by the evaluation",color:"#9db97a"},{key:"ab_best",name:"Alpha-beta, best order",note:"best move tried first at every turn: the best case",color:"#f0e7d3"}],i2=Object.fromEntries(fg.map(t=>[t.key,t])),Tt=(t,e=0)=>Number(t).toLocaleString("en-US",{maximumFractionDigits:e}),Nl=(t,e)=>{let n=100*t/e;return n>=10?`${Tt(n,0)}%`:`${Tt(n,1)}%`},dg=(t,e)=>e>0?`${Tt(t/e,t/e>=10?0:1)}\xD7`:"\u2013";function r2(t){let e=Number(t);if(Math.abs(e)>gM/2){let n=gM-Math.abs(e);return`${Tt(e)} (${e>0?"tigers":"goats"} win in ${n} ${n===1?"ply":"plies"})`}return Tt(e,2)}function s2({rows:t}){let e=t.find(n=>n.config==="minimax");return(0,z.jsx)("ul",{className:"bars","aria-label":"Positions searched by each configuration",children:t.map(n=>{let i=i2[n.config],r=n.nodes/e.nodes;return(0,z.jsxs)("li",{title:`${i.name}: ${Tt(n.nodes)} positions, ${Tt(n.time_ms,1)} ms. ${i.note}.`,children:[(0,z.jsxs)("div",{className:"bar-head",children:[(0,z.jsxs)("span",{className:"bar-name",children:[(0,z.jsx)("i",{style:{background:i.color},"aria-hidden":"true"}),i.name]}),(0,z.jsxs)("span",{className:"bar-num",children:[Tt(n.nodes),n.config!=="minimax"&&(0,z.jsxs)("em",{children:[" ",Nl(n.nodes,e.nodes)]})]})]}),(0,z.jsx)("div",{className:"bar-track",children:(0,z.jsx)("div",{className:"bar-fill",style:{width:`${Math.max(r*100,.6)}%`,background:i.color}})}),(0,z.jsxs)("div",{className:"bar-foot",children:[(0,z.jsx)("span",{children:i.note}),(0,z.jsx)("span",{children:n.oracle?(0,z.jsxs)("span",{className:"muted-time",children:[Tt(n.time_ms,1)," ms incl. oracle"]}):`${Tt(n.time_ms,1)} ms`})]})]},n.config)})})}function o2(t){let e=Object.fromEntries(t.rows.map(l=>[l.config,l])),n=e.minimax,i=e.ab_worst,r=e.ab_natural,s=e.ab_heuristic,o=e.ab_best,a=[];return a.push(t.same_score?["Same answer",`All five searches give this position the same score, ${r2(n.score)}. Alpha-beta never changes the result, only the work.`]:["Scores differ","The searches disagree on the score. That should never happen; please report this position."]),t.depth===1?(a.push(["Depth 1: a tie",`With one level there is nothing to prune: every search looks at all ${t.branching} moves (${n.nodes} positions). Try depth 2 or more.`]),{winner:"A tie at depth 1",lines:a}):(a.push(["Worst case",`With the worst move first, alpha-beta still searched ${Nl(i.nodes,n.nodes)} of minimax's positions (${Tt(i.nodes)} of ${Tt(n.nodes)}). It can't prune when each new move is better than the last, so it is no better than minimax: O(b^d).`]),a.push(["Best case",`With the best move first, only ${Nl(o.nodes,n.nodes)} (${Tt(o.nodes)}). The effective branching factor fell from ${Tt(n.ebf,1)} to ${Tt(o.ebf,1)}; the theoretical best is about \u221Ab \u2248 ${Tt(Math.sqrt(n.ebf),1)}, i.e. O(b^(d/2)).`]),a.push(["What the agent does",`In rule order (how the agent plays) alpha-beta searched ${Nl(r.nodes,n.nodes)} and ran ${dg(n.time_ms,r.time_ms)} faster than minimax. A cheap heuristic order gets ${Nl(s.nodes,n.nodes)}.`]),a.push(["When minimax is better","Only if you need the exact score of every move (alpha-beta gives bounds for the moves it prunes), or the simplest code. It never searches fewer positions."]),{winner:`Alpha-beta wins here: ${dg(n.nodes,r.nodes)} fewer positions in rule order, up to ${dg(n.nodes,o.nodes)} with the best order, same answer.`,lines:a})}function vM({game:t,pos:e,defaultDepth:n,evaluation:i,onShowResults:r}){let[s,o]=(0,Zn.useState)(Math.min(n,3)),[a,l]=(0,Zn.useState)(null),[c,u]=(0,Zn.useState)(!1),[d,f]=(0,Zn.useState)(null),p=`${t.id}:${t.moves.length}`;(0,Zn.useEffect)(()=>{l(null),f(null)},[p]);let g=async()=>{u(!0),f(null);try{let h=await fetch("/api/compare",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({start:t.start,moves:t.moves,depth:s,eval:i})}),v=await h.json();if(!h.ok)throw new Error(v.error||`The engine answered ${h.status}.`);l({...v,key:p})}catch(h){f(h.message==="Failed to fetch"?"Can't reach the engine. Start it with: python -m web.server":h.message)}finally{u(!1)}},y=a&&a.key===p?a:null,m=y&&o2(y);return(0,z.jsxs)("section",{className:"compare",children:[(0,z.jsx)("h3",{children:"Minimax vs alpha-beta on this position"}),(0,z.jsx)("p",{className:"help",children:"Runs minimax and alpha-beta with four move orders on the board as it is now, and counts the positions each one searches."}),(0,z.jsxs)("div",{className:"compare-controls",children:[(0,z.jsx)("label",{htmlFor:"cmp-depth",className:"field-label",children:"Depth"}),(0,z.jsx)("select",{id:"cmp-depth",value:s,onChange:h=>o(Number(h.target.value)),children:[1,2,3,4].map(h=>(0,z.jsxs)("option",{value:h,children:[h," ",h===1?"ply":"plies"]},h))}),(0,z.jsx)("button",{type:"button",className:"primary",onClick:g,disabled:c||!e||e.terminal,children:c?"Comparing\u2026":"Compare"})]}),e&&e.terminal&&(0,z.jsx)("p",{className:"help",children:"The game is over; start a new game or undo to compare."}),c&&s===n2&&(0,z.jsx)("p",{className:"help",children:"Depth 4 takes about a second: minimax and the worst order search tens of thousands of positions."}),d&&(0,z.jsx)("p",{className:"error",role:"alert",children:d}),y&&(0,z.jsxs)("div",{"aria-live":"polite",children:[(0,z.jsxs)("p",{className:"compare-meta",children:[y.side==="GOAT"?"Goats":"Tigers"," to move, ",y.branching," legal moves, depth ",y.depth,", ",y.eval," evaluation"]}),(0,z.jsx)(s2,{rows:y.rows}),(0,z.jsx)("p",{className:"winner",children:m.winner}),(0,z.jsx)("dl",{className:"verdict",children:m.lines.map(([h,v])=>(0,z.jsxs)(Zn.default.Fragment,{children:[(0,z.jsx)("dt",{children:h}),(0,z.jsx)("dd",{children:v})]},h))}),(0,z.jsx)("p",{className:"help",children:"The best and worst orders are measuring tools: they first find each move's true value with a separate search that isn't counted, so only their position counts mean anything."})]}),(0,z.jsx)("button",{type:"button",className:"text-link",onClick:r,children:"See the full experiment results (30 positions)"})]})}function Il({name:t,alt:e,caption:n}){return(0,z.jsxs)("figure",{className:"chart",children:[(0,z.jsx)("img",{src:`/results/${t}`,alt:e,loading:"lazy"}),(0,z.jsx)("figcaption",{children:n})]})}function a2({e1:t}){let e=(i,r,s)=>t.find(o=>o.phase===i&&o.depth===r&&o.algorithm===s),n=[];for(let i of["placement","movement","all"])for(let r of[2,3,4]){let s=e(i,r,"minimax"),o=e(i,r,"alphabeta");s&&o&&n.push({phase:i,depth:r,mm:s,ab:o})}return(0,z.jsx)("div",{className:"table-wrap",children:(0,z.jsxs)("table",{children:[(0,z.jsx)("thead",{children:(0,z.jsxs)("tr",{children:[(0,z.jsx)("th",{children:"Phase"}),(0,z.jsx)("th",{children:"Depth"}),(0,z.jsx)("th",{children:"Minimax positions"}),(0,z.jsx)("th",{children:"Alpha-beta positions"}),(0,z.jsx)("th",{children:"Alpha-beta share"}),(0,z.jsx)("th",{children:"Minimax ms"}),(0,z.jsx)("th",{children:"Alpha-beta ms"})]})}),(0,z.jsx)("tbody",{children:n.map(({phase:i,depth:r,mm:s,ab:o})=>(0,z.jsxs)("tr",{children:[(0,z.jsx)("td",{children:i[0].toUpperCase()+i.slice(1)}),(0,z.jsx)("td",{children:r}),(0,z.jsx)("td",{children:Tt(s.nodes_median)}),(0,z.jsx)("td",{children:Tt(o.nodes_median)}),(0,z.jsxs)("td",{children:[Tt(o.fraction_of_minimax_nodes*100,1),"%"]}),(0,z.jsx)("td",{children:Tt(s.time_ms_median,1)}),(0,z.jsx)("td",{children:Tt(o.time_ms_median,1)})]},`${i}${r}`))})]})})}function l2({e3:t,depth:e}){let n=(i,r)=>t.find(s=>s.phase===i&&s.depth===e&&s.config===r);return(0,z.jsx)("div",{className:"table-wrap",children:(0,z.jsxs)("table",{children:[(0,z.jsx)("thead",{children:(0,z.jsxs)("tr",{children:[(0,z.jsx)("th",{children:"Phase"}),fg.map(i=>(0,z.jsx)("th",{children:i.name},i.key))]})}),(0,z.jsx)("tbody",{children:["placement","movement","all"].map(i=>(0,z.jsxs)("tr",{children:[(0,z.jsx)("td",{children:i[0].toUpperCase()+i.slice(1)}),fg.map(r=>{let s=n(i,r.key);return(0,z.jsx)("td",{children:s?(0,z.jsxs)(z.Fragment,{children:[Tt(s.nodes_median),r.key!=="minimax"&&(0,z.jsxs)("em",{children:[" (",Tt(s.fraction_of_minimax_nodes*100,1),"%)"]})]}):"\u2013"},r.key)})]},i))})]})})}function c2({trees:t,b:e}){let n=[...new Set(t.filter(s=>s.b===e).map(s=>s.d))].filter(s=>s>=2).sort((s,o)=>s-o),i=(s,o,a,l="leaves")=>{let c=t.find(u=>u.b===e&&u.d===s&&u.tree===o&&u.config===a);return c?Tt(c[l]):"\u2013"},r=[["Minimax = b^d (also alpha-beta's worst case)",s=>i(s,"random","minimax","minimax_leaves")],["Alpha-beta, measured, tree built for the worst case",s=>i(s,"worst_case","ab_natural")],["Alpha-beta, measured, random tree, fixed order",s=>i(s,"random","ab_natural")],["Alpha-beta, measured, best order",s=>i(s,"random","ab_best")],["Formula b^\u2308d/2\u2309 + b^\u230Ad/2\u230B \u2212 1 (best case)",s=>i(s,"random","minimax","knuth_moore_leaves")]];return(0,z.jsx)("div",{className:"table-wrap",children:(0,z.jsxs)("table",{children:[(0,z.jsx)("thead",{children:(0,z.jsxs)("tr",{children:[(0,z.jsxs)("th",{children:["Leaves evaluated, b = ",e]}),n.map(s=>(0,z.jsxs)("th",{children:["d = ",s]},s))]})}),(0,z.jsx)("tbody",{children:r.map(([s,o])=>(0,z.jsxs)("tr",{children:[(0,z.jsx)("td",{children:s}),n.map(a=>(0,z.jsx)("td",{children:o(a)},a))]},s))})]})})}var u2=[["Deep search","Alpha-beta, by more each ply","A cutoff removes a whole subtree, and deeper trees have bigger subtrees. Rule order: 54% \u2192 35% \u2192 14% of minimax's positions from depth 2 to 4."],["Many moves per position (placement)","Alpha-beta, by most","Each cutoff skips all the remaining sibling moves, so more siblings means more saved: 8.4% in placement vs 18.6% in movement at depth 4."],["Good move order","Alpha-beta, dramatically","Best move first gives the best case, about b^(d/2): 2.5% of minimax's positions at depth 4. A cheap heuristic order gets 4.8%."],["Worst move order","A tie","Every move is better than the last, so the bounds never tighten in time: alpha-beta does minimax's work (exactly b^d on the worst-case tree)."],["Depth 1","A tie","There is only one level; every move has to be looked at."],["Exact score of every move needed","Minimax","Alpha-beta only proves that pruned moves are worse; minimax scores each one exactly."],["Simplest code, debugging, teaching","Minimax","No alpha/beta bookkeeping. We use it as the reference that alpha-beta is tested against."]];function yM({onBack:t}){let[e,n]=(0,Zn.useState)(null),[i,r]=(0,Zn.useState)(null);(0,Zn.useEffect)(()=>{fetch("/api/results").then(o=>o.json()).then(n).catch(()=>r("Can't reach the engine. Start it with: python -m web.server"))},[]);let s=o=>e&&e.charts.includes(o);return(0,z.jsxs)("div",{className:"results",children:[(0,z.jsxs)("header",{className:"results-head",children:[(0,z.jsx)("button",{type:"button",className:"text-link",onClick:t,children:"Back to the board"}),(0,z.jsx)("h1",{children:"Minimax vs alpha-beta"}),(0,z.jsxs)("p",{className:"subtitle",children:["The comparison, alpha-beta's best and worst case, and which algorithm wins when. Numbers are medians over the 30 fixed test positions (15 placement, 15 movement) with the designed evaluation; rebuild them with ",(0,z.jsx)("code",{children:"python -m experiments e1"})," and ",(0,z.jsx)("code",{children:"python -m e3"}),"."]})]}),i&&(0,z.jsx)("p",{className:"error",role:"alert",children:i}),!e&&!i&&(0,z.jsx)("p",{className:"help",children:"Loading the results\u2026"}),e&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)("section",{children:[(0,z.jsx)("h2",{children:"1. The comparison (E1)"}),(0,z.jsxs)("p",{children:["Both algorithms return the ",(0,z.jsx)("strong",{children:"same score on all 90 position/depth pairs"}),". Alpha-beta gets there by skipping moves that can't change the decision, so it searches far fewer positions, and the saving grows with depth."]}),s("e1_nodes_vs_depth.png")&&(0,z.jsx)(Il,{name:"e1_nodes_vs_depth.png",alt:"Nodes expanded against depth for minimax and alpha-beta, placement and movement phases",caption:"Positions searched per move against depth, log scale. The slope is the effective branching factor; alpha-beta's is lower."}),(0,z.jsx)(a2,{e1:e.e1}),s("e1_time_vs_depth.png")&&(0,z.jsx)(Il,{name:"e1_time_vs_depth.png",alt:"Time per move against depth for minimax and alpha-beta",caption:"Time per move follows the position count: at depth 4 alpha-beta takes about 16% of minimax's time."})]}),(0,z.jsxs)("section",{children:[(0,z.jsx)("h2",{children:"2. Best case and worst case (E3)"}),(0,z.jsxs)("div",{className:"cards",children:[(0,z.jsxs)("div",{className:"card",children:[(0,z.jsx)("h3",{children:"Minimax"}),(0,z.jsxs)("p",{children:["Always visits every position: ",(0,z.jsx)("strong",{children:"O(b^d)"}),". Move order makes no difference, so it has no best or worst case."]})]}),(0,z.jsxs)("div",{className:"card worst",children:[(0,z.jsx)("h3",{children:"Alpha-beta, worst case"}),(0,z.jsxs)("p",{children:["The worst move is tried first at every turn. Each new move is better than the last, so nothing can be cut: ",(0,z.jsx)("strong",{children:"O(b^d)"}),", the same as minimax."]})]}),(0,z.jsxs)("div",{className:"card best",children:[(0,z.jsx)("h3",{children:"Alpha-beta, best case"}),(0,z.jsxs)("p",{children:["The best move is tried first. One reply refutes each alternative: exactly ",(0,z.jsx)("strong",{children:"b^\u2308d/2\u2309 + b^\u230Ad/2\u230B \u2212 1"})," leaves, O(b^(d/2)), so it can search twice as deep for the same work."]})]})]}),(0,z.jsxs)("p",{children:["We measured both by changing only the order in which moves are tried (",(0,z.jsx)("code",{children:"baghchal/ordering.py"}),"); the search code is the agent's own. Best and worst order use an oracle that knows each move's true value, so they show the limits rather than a faster agent."]}),s("e3_ordering_nodes.png")&&(0,z.jsx)(Il,{name:"e3_ordering_nodes.png",alt:"Median nodes against depth for minimax and alpha-beta in worst, rule and best order",caption:"Same positions, same code, only the move order changes. Worst order sits on top of minimax; best order is the floor."}),s("e3_ratio_d4.png")&&(0,z.jsx)(Il,{name:"e3_ratio_d4.png",alt:"Alpha-beta nodes as a percentage of minimax at depth 4 for each ordering",caption:"Depth 4: how much of minimax's tree alpha-beta searches under each order."}),(0,z.jsx)(l2,{e3:e.e3,depth:4}),(0,z.jsx)("p",{className:"help",children:"Median positions searched at depth 4; in brackets, the median share of minimax's positions."}),s("e3_trees.png")&&(0,z.jsx)(Il,{name:"e3_trees.png",alt:"Measured leaf counts on uniform trees against the b^d and Knuth-Moore formulas",caption:"On uniform trees the textbook formulas hold exactly: measured points land on the lines."}),(0,z.jsx)(c2,{trees:e.trees,b:8})]}),(0,z.jsxs)("section",{children:[(0,z.jsx)("h2",{children:"3. Which algorithm does better, and why"}),(0,z.jsxs)("p",{children:[(0,z.jsx)("strong",{children:"Alpha-beta never searches more positions than minimax and always gives the same answer."})," How much better it does depends on the situation:"]}),(0,z.jsx)("div",{className:"table-wrap",children:(0,z.jsxs)("table",{className:"when",children:[(0,z.jsx)("thead",{children:(0,z.jsxs)("tr",{children:[(0,z.jsx)("th",{children:"Situation"}),(0,z.jsx)("th",{children:"Better"}),(0,z.jsx)("th",{children:"Why"})]})}),(0,z.jsx)("tbody",{children:u2.map(([o,a,l])=>(0,z.jsxs)("tr",{children:[(0,z.jsx)("td",{children:o}),(0,z.jsx)("td",{children:(0,z.jsx)("strong",{children:a})}),(0,z.jsx)("td",{children:l})]},o))})]})})]}),(0,z.jsxs)("section",{children:[(0,z.jsx)("h2",{children:"4. How AI is used here (and why there's no ML)"}),(0,z.jsxs)("p",{children:["The agent is classical AI: a rational agent that decides by ",(0,z.jsx)("strong",{children:"adversarial search"})," (minimax and alpha-beta, depth-limited) and scores the positions where the search stops with a ",(0,z.jsx)("strong",{children:"hand-designed evaluation"})," of six features (captures, tiger mobility and threats; trapped tigers, connected goats, goats on hub points). Nothing is learned: there is no training data and the weights were chosen by reasoning, so the agent plays the same way every time. ML could later tune the weights by self-play or replace the evaluation with a learned one, with the same search. Claude Code was used as a tool to write the code and report; that is declared in the report (\xA78). More: ",(0,z.jsx)("code",{children:"docs/ai_ml_usage.md"}),"."]})]})]})]})}var nP=lt(An()),_n=lt(Gt()),h2={analysis:"M3 17h14M5 14V9m5 5V4m5 10v-7",table:"M2 13l8-4 8 4-8 4zM2 13v-2l8-4 8 4v2",top:"M4 4h12v12H4zM4 10h12M10 4v12",numbers:"M7 4L5 16M13 4l-2 12M3.5 8h12M3 12h12",soundOn:"M3 8v4h3l4 3V5L6 8zM13 7.5a3.5 3.5 0 010 5M15 5a7 7 0 010 10",soundOff:"M3 8v4h3l4 3V5L6 8zM13 8l4 4M17 8l-4 4",undo:"M7 5L3 9l4 4M3 9h8a5 5 0 010 10H9",hint:"M10 3a5 5 0 00-3 9v2h6v-2a5 5 0 00-3-9zM8 17h4",pause:"M7 4v12M13 4v12",play:"M6 4l10 6-10 6z",restart:"M4 10a6 6 0 106-6H6M6 4L3.5 6.5M6 4l2.5 2.5",prev:"M12 4l-6 6 6 6",next:"M8 4l6 6-6 6",close:"M5 5l10 10M15 5L5 15",first:"M13 4l-6 6 6 6M5 4v12",last:"M7 4l6 6-6 6M15 4v12"};function Is({name:t}){return(0,_n.jsx)("svg",{className:"icon",viewBox:"0 0 20 20",width:"18",height:"18",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,_n.jsx)("path",{d:h2[t]})})}function fi({icon:t,label:e,onClick:n,pressed:i,disabled:r,quiet:s}){return(0,_n.jsxs)("button",{type:"button",className:`tool${s?" quiet":""}`,onClick:n,disabled:r,"aria-pressed":i===void 0?void 0:i,"aria-label":e,title:e,children:[(0,_n.jsx)(Is,{name:t}),(0,_n.jsx)("span",{children:e})]})}function pg({label:t,value:e,options:n,onChange:i}){let r=`seg-${t.replace(/\W+/g,"-")}`;return(0,_n.jsxs)("div",{className:"field",children:[(0,_n.jsx)("span",{className:"field-label",id:r,children:t}),(0,_n.jsx)("div",{className:"segmented",role:"radiogroup","aria-labelledby":r,children:n.map(([s,o])=>(0,_n.jsx)("button",{type:"button",role:"radio","aria-checked":e===s,className:e===s?"on":"",onClick:()=>i(s),children:o},s))})]})}function _h({value:t,max:e,onChange:n,id:i="depth"}){return(0,_n.jsx)("div",{className:"depth-picker",role:"radiogroup","aria-labelledby":`${i}-label`,children:Array.from({length:e},(r,s)=>s+1).map(r=>(0,_n.jsx)("button",{type:"button",role:"radio","aria-checked":t===r,"aria-label":`${r} ${r===1?"ply":"plies"}`,className:r<=t?"on":"",onClick:()=>n(r),children:r},r))})}function _M({filled:t,total:e=5,label:n}){return(0,_n.jsx)("span",{className:"pips",role:"img","aria-label":n,children:Array.from({length:e},(i,r)=>(0,_n.jsx)("i",{className:r<t?"full":""},r))})}var se=lt(Gt());function MM(t){return $f(t)?t>0?1:0:.5+.5*Math.tanh(t/150)}function d2({score:t}){let e=MM(t);return(0,se.jsxs)("div",{className:"gauge",role:"img","aria-label":`Evaluation ${Qa(t)}, from the tigers' side`,children:[(0,se.jsxs)("div",{className:"gauge-track",children:[(0,se.jsx)("div",{className:"gauge-fill",style:{width:`${e*100}%`}}),(0,se.jsx)("i",{style:{left:`${e*100}%`}})]}),(0,se.jsxs)("div",{className:"gauge-ends",children:[(0,se.jsx)("span",{children:"Tigers"}),(0,se.jsx)("span",{children:"Goats"})]})]})}function f2({notes:t,total:e}){let n=Object.entries(t).map(([a,l])=>[Number(a),MM(l.score)]).sort((a,l)=>a[0]-l[0]);if(n.length<2)return null;let i=320,r=64,s=a=>4+a/Math.max(1,e-1)*(i-8),o=a=>r-6-a*(r-12);return(0,se.jsxs)("figure",{className:"trace",children:[(0,se.jsxs)("svg",{viewBox:`0 0 ${i} ${r}`,role:"img","aria-label":"Evaluation after each of the agent's moves",children:[(0,se.jsx)("line",{x1:"0",x2:i,y1:o(.5),y2:o(.5),className:"trace-mid"}),(0,se.jsx)("polyline",{className:"trace-line",points:n.map(([a,l])=>`${s(a).toFixed(1)},${o(l).toFixed(1)}`).join(" ")}),(0,se.jsx)("circle",{className:"trace-dot",cx:s(n[n.length-1][0]),cy:o(n[n.length-1][1]),r:"3.5"})]}),(0,se.jsx)("figcaption",{children:"The agent's evaluation over the game. Above the line favours the tigers."})]})}function xM({result:t,title:e,view:n,onPreview:i}){let r=n&&n.kind==="line";return(0,se.jsxs)("section",{className:"report","aria-live":"polite",children:[(0,se.jsx)("h3",{children:e}),(0,se.jsxs)("p",{className:"report-move",children:[(0,se.jsx)("span",{className:`token small ${t.side.toLowerCase()}`,"aria-hidden":"true"}),wi(t.side)," ",Yi(t.move)]}),(0,se.jsx)(d2,{score:t.score}),(0,se.jsxs)("dl",{className:"facts",children:[(0,se.jsxs)("div",{children:[(0,se.jsx)("dt",{children:"Evaluation"}),(0,se.jsx)("dd",{children:Qa(t.score)})]}),(0,se.jsxs)("div",{children:[(0,se.jsx)("dt",{children:"Positions searched"}),(0,se.jsx)("dd",{children:Xi(t.nodes)})]}),(0,se.jsxs)("div",{children:[(0,se.jsx)("dt",{children:"Leaves evaluated"}),(0,se.jsx)("dd",{children:Xi(t.evals)})]}),(0,se.jsxs)("div",{children:[(0,se.jsx)("dt",{children:"Search time"}),(0,se.jsxs)("dd",{children:[Xi(t.time_ms,1)," ms"]})]}),(0,se.jsxs)("div",{children:[(0,se.jsx)("dt",{children:"Algorithm"}),(0,se.jsx)("dd",{className:"word",children:t.algorithm==="alphabeta"?"Alpha-beta":"Minimax"})]}),(0,se.jsxs)("div",{children:[(0,se.jsx)("dt",{children:"Depth"}),(0,se.jsx)("dd",{className:"word",children:ja(t.depth,"ply","plies")})]}),(0,se.jsxs)("div",{className:"wide",children:[(0,se.jsx)("dt",{children:"Evaluation function"}),(0,se.jsx)("dd",{className:"word",children:t.eval==="designed"?"Designed, six features":"Baseline, captures only"})]})]}),(0,se.jsx)("h4",{children:"Expected line"}),(0,se.jsx)("ol",{className:"pv",children:t.pv.map((s,o)=>(0,se.jsx)("li",{children:(0,se.jsxs)("button",{type:"button",className:r&&n.index===o+1?"on":"",onClick:()=>i(t,o+1),"aria-label":`Show the board after expected move ${o+1}`,children:[(0,se.jsx)("span",{className:`token small ${Dn(s).side.toLowerCase()}`,"aria-hidden":"true"}),Yi(s)]})},o))}),(0,se.jsx)("p",{className:"help",children:"Select a move to see the board as the engine expects it. The score is from the tigers' side: positive favours tigers."})]})}function p2({onLoad:t}){let[e,n]=(0,Ns.useState)(""),[i,r]=(0,Ns.useState)("GOAT"),[s,o]=(0,Ns.useState)("0"),[a,l]=(0,Ns.useState)(""),[c,u]=(0,Ns.useState)(null);return(0,se.jsxs)("details",{className:"load",children:[(0,se.jsx)("summary",{children:"Start from a position you type in"}),(0,se.jsxs)("form",{onSubmit:async f=>{f.preventDefault(),u(null);try{await t({board:e,to_move:i,captured:s===""?0:Number(s),in_hand:a===""?null:Number(a)})}catch(p){u(p.message)}},children:[(0,se.jsxs)("label",{children:["Board, rows top to bottom",(0,se.jsx)("textarea",{rows:"5",value:e,spellCheck:"false",placeholder:`T...T
.....
.....
.....
T...T`,onChange:f=>n(f.target.value)})]}),(0,se.jsx)("p",{className:"help",children:"T for tiger, G for goat, . for empty. One row per line, or rows joined with /."}),(0,se.jsxs)("div",{className:"row3",children:[(0,se.jsxs)("label",{children:["To move",(0,se.jsxs)("select",{value:i,onChange:f=>r(f.target.value),children:[(0,se.jsx)("option",{value:"GOAT",children:"Goats"}),(0,se.jsx)("option",{value:"TIGER",children:"Tigers"})]})]}),(0,se.jsxs)("label",{children:["Captured",(0,se.jsx)("input",{type:"number",min:"0",max:"5",value:s,onChange:f=>o(f.target.value)})]}),(0,se.jsxs)("label",{children:["In hand",(0,se.jsx)("input",{type:"number",min:"0",max:"20",value:a,placeholder:"auto",onChange:f=>l(f.target.value)})]})]}),c&&(0,se.jsx)("p",{className:"error",role:"alert",children:c}),(0,se.jsx)("button",{type:"submit",className:"primary",children:"Load this position"})]})]})}function mg({g:t,onClose:e,onResults:n,onCopyFail:i}){let{config:r,setConfig:s,pos:o,game:a,view:l}=t,[c,u]=(0,Ns.useState)(!1),d=o?`python -m baghchal analyse --board "${S_(o.board)}" --to-move ${o.to_move} --in-hand ${o.in_hand} --captured ${o.captured} --depth ${r.depth} --algorithm ${r.algorithm} --eval ${r.eval}`:"",f=async()=>{try{await navigator.clipboard.writeText(d),u(!0),setTimeout(()=>u(!1),1500)}catch{i()}},p=o&&!o.terminal&&!t.thinking&&!l;return(0,se.jsxs)("aside",{className:"analysis","aria-label":"Analysis",children:[(0,se.jsxs)("header",{className:"analysis-head",children:[(0,se.jsx)("h2",{children:"Analysis"}),(0,se.jsx)("button",{type:"button",className:"tool quiet",onClick:e,"aria-label":"Close analysis",children:(0,se.jsx)(Is,{name:"close"})})]}),(0,se.jsxs)("div",{className:"analysis-body",children:[(0,se.jsxs)("section",{children:[(0,se.jsx)("button",{type:"button",className:"primary wide",onClick:()=>t.search(!1),disabled:!p,children:t.thinking?"Searching\u2026":"Analyse this position"}),(0,se.jsx)("p",{className:"help",children:"Runs the search for the side to move and marks its best move on the board in green, without playing it."})]}),t.hintSearch&&(0,se.jsx)(xM,{result:t.hintSearch,title:"Best move in this position",view:l,onPreview:t.previewLine}),t.agentSearch&&(0,se.jsx)(xM,{result:t.agentSearch,title:"The agent's last move",view:l,onPreview:t.previewLine}),!t.hintSearch&&!t.agentSearch&&(0,se.jsx)("p",{className:"empty",children:"No search yet. The agent's numbers appear here after its first move."}),(0,se.jsx)(f2,{notes:a.notes,total:a.moves.length}),(0,se.jsxs)("section",{className:"settings",children:[(0,se.jsx)("h3",{children:"Engine"}),(0,se.jsx)(pg,{label:"Algorithm",value:r.algorithm,options:[["alphabeta","Alpha-beta"],["minimax","Minimax"]],onChange:g=>s({...r,algorithm:g,depth:Math.min(r.depth,qf[g])})}),(0,se.jsx)(pg,{label:"Evaluation",value:r.eval,options:[["designed","Designed"],["baseline","Captures only"]],onChange:g=>s({...r,eval:g})}),(0,se.jsxs)("div",{className:"field",children:[(0,se.jsx)("span",{className:"field-label",id:"depth-label",children:"Search depth"}),(0,se.jsx)(_h,{value:r.depth,max:qf[r.algorithm],onChange:g=>s({...r,depth:g})})]})]}),(0,se.jsx)(vM,{game:a,pos:l?null:o,defaultDepth:r.depth,evaluation:r.eval,onShowResults:n}),(0,se.jsxs)("section",{className:"cli",children:[(0,se.jsx)("h3",{children:"Check this position in the terminal"}),(0,se.jsx)("code",{children:d}),(0,se.jsx)("button",{type:"button",onClick:f,disabled:!o,children:c?"Copied":"Copy command"}),(0,se.jsx)("p",{className:"help",children:"The terminal starts with an empty repetition history, so a draw by repetition can differ."})]}),(0,se.jsx)(p2,{onLoad:t.loadPosition})]})]})}var bM=lt(An());var dt=lt(Gt()),SM=120,wM=60,pi=t=>[wM+t%5*SM,wM+Math.floor(t/5)*SM];function m2(){return(0,dt.jsxs)("g",{className:"piece tiger",children:[(0,dt.jsx)("circle",{r:"34",className:"tiger-body"}),(0,dt.jsx)("path",{className:"tiger-stripe",d:"M-33 -10 L-12 -6 L-32 -1 Z M-30 10 L-14 9 L-27 18 Z M33 -10 L12 -6 L32 -1 Z M30 10 L14 9 L27 18 Z M-8 -33 L0 -18 L8 -33 Z"})]})}function EM({ghost:t}){return(0,dt.jsxs)("g",{className:`piece goat${t?" ghost":""}`,children:[(0,dt.jsx)("circle",{r:"27",className:"goat-body"}),(0,dt.jsx)("circle",{r:"17",className:"goat-ring"})]})}function vg({topo:t,shown:e,ui:n,showNumbers:i,onPoint:r}){let[s,o]=(0,bM.useState)(null);if(!e)return null;let{pos:a}=e,l=new Set(n.placeable),c=new Set(n.movable),{lastMove:u,hint:d,selected:f,targets:p}=n,g=y=>a.board[y]===2?"tiger":a.board[y]===0?"empty":"goat";return(0,dt.jsxs)("svg",{className:"board2d",viewBox:"0 0 600 600",role:"group","aria-label":"Bagh-Chal board",children:[(0,dt.jsx)("rect",{className:"slab",x:"6",y:"6",width:"588",height:"588",rx:"18"}),(0,dt.jsx)("rect",{className:"slab-inset",x:"26",y:"26",width:"548",height:"548",rx:"8"}),(0,dt.jsx)("g",{children:t.edges.map(([y,m])=>{let[h,v]=pi(y),[_,x]=pi(m);return(0,dt.jsx)("line",{className:"line",x1:h,y1:v,x2:_,y2:x},`${y}-${m}`)})}),u&&u.from>=0&&(0,dt.jsx)("line",{className:"trail",x1:pi(u.from)[0],y1:pi(u.from)[1],x2:pi(u.to)[0],y2:pi(u.to)[1]}),d&&d.from>=0&&(0,dt.jsx)("line",{className:"hint-line",x1:pi(d.from)[0],y1:pi(d.from)[1],x2:pi(d.to)[0],y2:pi(d.to)[1]}),t.points.map(({i:y})=>{let[m,h]=pi(y),v=a.board[y],_=p.find(T=>T.to===y),x=p.some(T=>T.over===y),C=l.has(y)||c.has(y)||!!_;return(0,dt.jsxs)("g",{transform:`translate(${m} ${h})`,className:`point${C?" interactive":""}`,role:C?"button":void 0,tabIndex:C?0:-1,"aria-label":`Point ${y}, ${g(y)}`,onClick:()=>r(y),onKeyDown:T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),r(y))},onMouseEnter:()=>o(y),onMouseLeave:()=>o(T=>T===y?null:T),children:[(0,dt.jsx)("circle",{className:"hit",r:"48"}),(0,dt.jsx)("circle",{className:"dot",r:v===0?7:0}),d&&d.to===y&&(0,dt.jsx)("circle",{className:"hint-ring",r:"40"}),l.has(y)&&s===y&&(0,dt.jsx)(EM,{ghost:!0}),v!==0&&(v===2?(0,dt.jsx)(m2,{}):(0,dt.jsx)(EM,{})),u&&u.to===y&&(0,dt.jsx)("circle",{className:"last-ring",r:"40"}),f===y&&(0,dt.jsx)("circle",{className:"selected-ring",r:"42"}),_&&(0,dt.jsx)("circle",{className:"target",r:"15"}),x&&(0,dt.jsx)("circle",{className:"threatened",r:"36"}),i&&(0,dt.jsx)("text",{className:"index",x:"-44",y:"-30",children:y})]},y)})]})}var en=lt(An());var yg={play:{theta:0,phi:.9,zoom:1},top:{theta:0,phi:.02,zoom:1},intro:{theta:-.55,phi:1.08,zoom:.94}},Qo={theta:1.35,phiMin:.02,phiMax:1.2,zoomMin:.62,zoomMax:1.7},_g=(t,e,n)=>Math.min(n,Math.max(e,t)),xh=class{constructor(e){this.camera=e,this.cur={...yg.intro},this.goal={...yg.intro},this.size={w:1,h:1},this.insets={top:0,right:0,bottom:0,left:0},this.bounds={hx:4.1,hz:2.75,y0:-.6,y1:.75},this.target=new N(0,-.05,0),this.drift=0,this.moving=!0,this._v=new N}setPreset(e,n=!1){this.goal={...yg[e]},n&&(this.cur={...this.goal}),this.moving=!0}orbit(e,n){this.goal.theta=_g(this.goal.theta-e*.006,-Qo.theta,Qo.theta),this.goal.phi=_g(this.goal.phi-n*.005,Qo.phiMin,Qo.phiMax),this.moving=!0}zoomBy(e){this.goal.zoom=_g(this.goal.zoom*e,Qo.zoomMin,Qo.zoomMax),this.moving=!0}setViewport(e,n,i){this.size={w:e,h:n},this.insets=i,this.camera.aspect=e/n;let r=(i.left-i.right)/2,s=(i.top-i.bottom)/2;this.camera.setViewOffset(e,n,-r,-s,e,n),this.moving=!0}setBounds(e,n){this.bounds.hx=e,this.bounds.hz=n,this.moving=!0}fitDistance(e,n){let{w:i,h:r}=this.size,s=Math.max(.2,(i-this.insets.left-this.insets.right)/i),o=Math.max(.2,(r-this.insets.top-this.insets.bottom)/r),a=Math.tan(Zx.degToRad(this.camera.fov/2)),l=new N(Math.sin(n)*Math.sin(e),Math.cos(n),Math.sin(n)*Math.cos(e)),c=new N(Math.cos(e),0,-Math.sin(e)),u=new N().crossVectors(l,c),{hx:d,hz:f,y0:p,y1:g}=this.bounds,y=1;for(let m of[-d,d])for(let h of[p,g])for(let v of[-f,f]){let _=this._v.set(m,h-this.target.y,v),x=_.dot(l);y=Math.max(y,x+Math.abs(_.dot(c))/(a*this.camera.aspect*s),x+Math.abs(_.dot(u))/(a*o))}return y}update(e,n,i){let r=i?1:1-Math.exp(-e*5.2),s=this.cur,o=this.goal;s.theta+=(o.theta-s.theta)*r,s.phi+=(o.phi-s.phi)*r,s.zoom+=(o.zoom-s.zoom)*r;let a=Math.abs(o.theta-s.theta)+Math.abs(o.phi-s.phi)+Math.abs(o.zoom-s.zoom)<6e-4,l=this.drift&&!i?Math.sin(n*21e-5)*this.drift:0,c=s.theta+l,u=this.fitDistance(c,s.phi)*s.zoom;this.camera.position.set(this.target.x+u*Math.sin(s.phi)*Math.sin(c),this.target.y+u*Math.cos(s.phi),this.target.z+u*Math.sin(s.phi)*Math.cos(c)),this.camera.lookAt(this.target),this.camera.updateProjectionMatrix();let d=this.moving;return this.moving=!a||!!l,d||this.moving}};var Ls=5.1;function TM(t){let e=t>>>0;return()=>(e=Math.imul(e,1664525)+1013904223>>>0)/4294967296}function Mh(t,e){let n=document.createElement("canvas");return n.width=t,n.height=e,n}function AM(t,e,n,{base:i,dark:r,light:s,seed:o,strokes:a=1500}){let l=TM(o);t.fillStyle=i,t.fillRect(0,0,e,n);for(let c=0;c<26;c++){let u=l()*n,d=t.createLinearGradient(0,u-60,0,u+60),f=l()<.5?r:s;d.addColorStop(0,"transparent"),d.addColorStop(.5,f),d.addColorStop(1,"transparent"),t.globalAlpha=.1+l()*.12,t.fillStyle=d,t.fillRect(0,u-60,e,120)}for(let c=0;c<a;c++){let u=l()*n,d=1.5+l()*9,f=(.4+l()*1.8)*Math.PI*2/e,p=l()*7;t.globalAlpha=.04+l()*.13,t.strokeStyle=l()<.62?r:s,t.lineWidth=.5+l()*2.2,t.beginPath();for(let g=-8;g<=e+8;g+=16){let y=u+Math.sin(g*f+p)*d+Math.sin(g*f*3.1+p*2)*d*.25;g<0?t.moveTo(g,y):t.lineTo(g,y)}t.stroke()}t.fillStyle=r;for(let c=0;c<a*2;c++)t.globalAlpha=.08+l()*.18,t.fillRect(l()*e,l()*n,2+l()*10,1);t.globalAlpha=1}function Sh(t,e,n){return e&&(t.colorSpace=qt),t.anisotropy=n,t.needsUpdate=!0,t}function xg({size:t=1024,repeat:e=1,aniso:n=4,...i}){let r=Mh(t,t);AM(r.getContext("2d"),t,t,i);let s=new lr(r);return s.wrapS=s.wrapT=zo,s.repeat.set(e,e),Sh(s,!0,n)}function CM({size:t=512,aniso:e=4}){let n=Mh(t,t),i=n.getContext("2d"),r=TM(77);i.fillStyle="#293222",i.fillRect(0,0,t,t);for(let o=0;o<26e3;o++){i.globalAlpha=.05+r()*.1,i.fillStyle=r()<.5?"#161c10":"#58663f";let a=r()*Math.PI,l=r()*t,c=r()*t;i.fillRect(l,c,1+Math.abs(Math.cos(a))*3,1+Math.abs(Math.sin(a))*3)}let s=new lr(n);return s.wrapS=s.wrapT=zo,s.repeat.set(5,5),Sh(s,!0,e)}function Mg(t,{size:e=2048,showNumbers:n=!1,aniso:i=8}={}){let r=e/Ls,s=m=>[(m%5-2+Ls/2)*r,(Math.floor(m/5)-2+Ls/2)*r],o=Mh(e,e),a=Mh(e,e),l=o.getContext("2d"),c=a.getContext("2d");AM(l,e,e,{base:"#472a19",dark:"#1c0e07",light:"#7d4f2c",seed:11,strokes:2600});let u=(Ls/2-2.36)*r;l.fillStyle="rgba(12, 6, 3, 0.28)",l.fillRect(u,u,e-2*u,e-2*u),c.fillStyle="rgb(0,150,0)",c.fillRect(0,0,e,e),c.fillStyle="rgb(0,120,0)",c.fillRect(u,u,e-2*u,e-2*u);let d="#b58d48",f="rgb(0,74,255)",p=(m,h,v,_,x=0,C=0)=>{m.save(),m.translate(x,C),m.strokeStyle=h,m.lineWidth=v,m.lineCap="round",m.beginPath(),_(m),m.stroke(),m.restore()},g=(m,h)=>{p(l,"rgba(10,5,2,0.7)",m*r*1.55,h,1.5,2.5),p(l,d,m*r,h),p(l,"rgba(255,236,180,0.4)",m*r*.22,h,-1,-1.5),p(c,f,m*r,h)},y=.05*r;g(.06,m=>m.rect(y,y,e-2*y,e-2*y)),g(.018,m=>m.rect(u,u,e-2*u,e-2*u));for(let[m,h]of t.edges){let[v,_]=s(m),[x,C]=s(h);g(.042,T=>{T.moveTo(v,_),T.lineTo(x,C)})}for(let m of t.points){let[h,v]=s(m.i),_=(m.degree===8?.125:.1)*r;l.fillStyle="rgba(8,4,2,0.75)",l.beginPath(),l.arc(h+1.5,v+2.5,_*1.16,0,7),l.fill();let x=l.createRadialGradient(h-_*.3,v-_*.4,_*.1,h,v,_);x.addColorStop(0,"#e3c27c"),x.addColorStop(1,"#a9853f"),l.fillStyle=x,l.beginPath(),l.arc(h,v,_,0,7),l.fill(),l.fillStyle="rgba(30,16,6,0.85)",l.beginPath(),l.arc(h,v,_*.3,0,7),l.fill(),c.fillStyle=f,c.beginPath(),c.arc(h,v,_,0,7),c.fill(),m.degree===8&&g(.014,C=>{C.moveTo(h+.2*r,v),C.arc(h,v,.2*r,0,7)})}if(n){l.font=`500 ${Math.round(.15*r)}px "Alegreya Sans", "Gill Sans", sans-serif`,l.textAlign="center",l.textBaseline="middle";for(let m of t.points){let[h,v]=s(m.i);l.fillStyle="rgba(10,5,2,0.8)",l.fillText(String(m.i),h-.33*r+1.5,v-.14*r+2),l.fillStyle="#e0c488",l.fillText(String(m.i),h-.33*r,v-.14*r)}}return{map:Sh(new lr(o),!0,i),orm:Sh(new lr(a),!1,i)}}var Sg=1,RM=2,ea=5.46,wg=.3,ta=.05,Eg=.07,Ll=-(wg+2*ta+Eg),Ds=.007,PM=15247692,Dl=15787987,g2=12867386,v2=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,Ri=t=>[t%5-2,Math.floor(t/5)-2];function IM(t,e,n){let i=new bs,r=-t/2,s=-e/2;return i.moveTo(r+n,s),i.lineTo(r+t-n,s),i.quadraticCurveTo(r+t,s,r+t,s+n),i.lineTo(r+t,s+e-n),i.quadraticCurveTo(r+t,s+e,r+t-n,s+e),i.lineTo(r+n,s+e),i.quadraticCurveTo(r,s+e,r,s+e-n),i.lineTo(r,s+n),i.quadraticCurveTo(r,s,r+n,s),i}function Yr(t,e,n=48){let i=new rh(t,e,n);return i.rotateX(-Math.PI/2),i}function y2(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),n=e.createRadialGradient(64,64,4,64,64,64);return n.addColorStop(0,"rgba(0,0,0,0.85)"),n.addColorStop(.55,"rgba(0,0,0,0.35)"),n.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=n,e.fillRect(0,0,128,128),new lr(t)}var wh=class{constructor(e,n,i={}){this.canvas=e,this.topology=n,this.on=i,this.reduced=!1,this.disposed=!1;let r=new Xo({canvas:e,antialias:!0,powerPreference:"high-performance"});this.renderer=r,r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.outputColorSpace=qt,r.toneMapping=Cl,r.toneMappingExposure=1.05,r.shadowMap.enabled=!0,r.shadowMap.type=Qm,this.aniso=Math.min(8,r.capabilities.getMaxAnisotropy());let s=new Xr;this.scene=s,s.background=new Ye(723208),s.fog=new Ju(723208,13,30);let o=new Wr(r),a=new jo;this.env=o.fromScene(a,.04).texture,s.environment=this.env,s.environmentIntensity=.42,a.traverse(l=>{l.geometry&&l.geometry.dispose(),l.material&&l.material.dispose()}),o.dispose(),this.camera=new zt(32,1,.5,80),this.rig=new xh(this.camera),this.rig.drift=.16,this.buildLights(),this.buildTable(),this.buildBoard(!1),this.buildPieces(),this.buildMarkers(),this.ui={selected:null,targets:[],placeable:new Set,movable:new Set,lastMove:null,hint:null,focus:null},this.board=new Array(25).fill(0),this.queue=[],this.busyUntil=0,this.settled=!0,this.first=!0,this.hover=null,this.portrait=!1,this.raycaster=new uh,this.plane=new ci(new N(0,1,0),0),this.pointers=new Map,this.drag=null,this.orbitEnabled=!1,this.last=performance.now(),this.dirty=!0,this.bind(),this.frame=this.frame.bind(this),this.raf=requestAnimationFrame(this.frame)}buildLights(){let e=new lh(16766883,520,30,.5,.85,1.6);e.position.set(-5.2,9.5,4.2),e.target.position.set(.2,0,0),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),e.shadow.camera.near=4,e.shadow.camera.far=22,e.shadow.bias=-25e-5,e.shadow.normalBias=.02,e.shadow.radius=5,this.scene.add(e,e.target),this.scene.add(new ah(9410989,2824976,.5));let n=new Rs(10335448,.55);n.position.set(5,4,-7),this.scene.add(n)}buildTable(){let e=xg({base:"#1a110c",dark:"#070403",light:"#332116",seed:5,repeat:7,aniso:this.aniso}),n=new qe(new ar(70,70).rotateX(-Math.PI/2),new yn({map:e,roughness:.62,metalness:0,envMapIntensity:.5}));n.position.y=Ll,n.receiveShadow=!0,this.scene.add(n);let i=new qe(new El(IM(9.5,6.5,.18),6).rotateX(-Math.PI/2),new yn({map:CM({aniso:this.aniso}),roughness:1,metalness:0,envMapIntensity:.1}));i.position.y=Ll+.006,i.receiveShadow=!0,this.felt=i,this.scene.add(i)}buildBoard(e){if(this.boardGroup){let d=this.topMesh.material,f=Mg(this.topology,{showNumbers:e,aniso:this.aniso});d.map.dispose(),d.roughnessMap.dispose(),d.map=f.map,d.roughnessMap=d.metalnessMap=f.orm,d.needsUpdate=!0,this.dirty=!0;return}let n=new nr,i=xg({base:"#352014",dark:"#150b06",light:"#644025",seed:23,repeat:.35,aniso:this.aniso}),r=new yn({map:i,roughness:.5,metalness:0,envMapIntensity:.7}),s=new ih(IM(ea-2*ta,ea-2*ta,.12),{depth:wg,bevelEnabled:!0,bevelThickness:ta,bevelSize:ta,bevelSegments:5,curveSegments:10});s.rotateX(-Math.PI/2),s.translate(0,-(wg+ta),0);let o=new qe(s,r);o.castShadow=o.receiveShadow=!0,n.add(o);let a=Mg(this.topology,{showNumbers:e,aniso:this.aniso}),l=new qe(new ar(Ls,Ls).rotateX(-Math.PI/2),new yn({map:a.map,roughnessMap:a.orm,metalnessMap:a.orm,roughness:1,metalness:1,envMapIntensity:.7}));l.position.y=.002,l.receiveShadow=!0,this.topMesh=l,n.add(l);let c=new yn({color:12096076,metalness:1,roughness:.38}),u=new xl(.2,.24,Eg+.02,28);for(let d of[-1,1])for(let f of[-1,1]){let p=new qe(u,c);p.position.set(d*(ea/2-.42),Ll+Eg/2,f*(ea/2-.42)),p.castShadow=!0,n.add(p)}this.boardGroup=n,this.scene.add(n)}buildPieces(){this.geo={tiger:mh(),goat:gh()},this.mat=vh(),this.blobTex=y2();let e=new ar(1,1).rotateX(-Math.PI/2);this.blobGeo=e,this.pieces=[];let n=(i,r)=>{let s=new qe(this.geo[i],this.mat[i]);s.castShadow=!0,s.receiveShadow=!0,s.visible=!1;let o=new qe(e,new or({map:this.blobTex,transparent:!0,depthWrite:!1,opacity:.6})),a=i==="tiger"?.86:.58;o.scale.set(a,1,a),o.visible=!1,o.renderOrder=1,this.scene.add(s,o);let l=(r*2654435761>>>0)/4294967296-.5,c={id:r,type:i,mesh:s,blob:o,where:{kind:"hidden",idx:0},base:new N,tw:null,raise:0,raiseGoal:0,yaw:l*.9,yawGoal:l*.9,jitter:l};return s.userData.piece=c,this.pieces.push(c),c};this.tigers=[0,1,2,3].map(i=>n("tiger",i)),this.goats=Array.from({length:20},(i,r)=>n("goat",10+r))}buildMarkers(){let e=(c,u)=>new or({color:c,transparent:!0,opacity:u,depthWrite:!1}),n=(c,u,d=2)=>{let f=new qe(c,u);return f.visible=!1,f.renderOrder=d,f.position.y=Ds,this.scene.add(f),f};this.mk={},this.mk.targetMat=e(PM,.9),this.mk.targetGeo=Yr(.2,.262),this.mk.dotGeo=new th(.085,28).rotateX(-Math.PI/2),this.mk.targets=Array.from({length:25},(c,u)=>{let[d,f]=Ri(u),p=n(this.mk.targetGeo,this.mk.targetMat),g=n(this.mk.dotGeo,this.mk.targetMat);return p.position.set(d,Ds,f),g.position.set(d,Ds,f),{ring:p,dot:g}}),this.mk.threatMat=e(g2,.9),this.mk.threatGeo=Yr(.25,.3),this.mk.threats=[0,1,2,3,4,5,6,7].map(()=>n(this.mk.threatGeo,this.mk.threatMat)),this.mk.selected=n(Yr(.33,.375),e(PM,.95)),this.mk.from=n(Yr(.12,.15),e(Dl,.42)),this.mk.to=n(Yr(.33,.352),e(Dl,.36)),this.mk.focus=n(Yr(.41,.44),e(Dl,.9)),this.mk.hintRing=n(Yr(.3,.36),e(10336634,.95));let i=new nr,r=e(10336634,.9),s=new qe(new ar(1,.07).rotateX(-Math.PI/2).translate(.5,0,0),r),o=new bs;o.moveTo(0,0),o.lineTo(-.26,.13),o.lineTo(-.26,-.13),o.closePath();let a=new qe(new El(o).rotateX(-Math.PI/2),r);i.add(s,a),i.visible=!1,i.position.y=Ds+.002,s.renderOrder=a.renderOrder=3,this.mk.arrow={group:i,shaft:s,head:a},this.scene.add(i);let l=new qe(this.geo.goat,new yn({color:Dl,transparent:!0,opacity:.42,roughness:.6,depthWrite:!1}));l.visible=!1,this.mk.ghost=l,this.scene.add(l),this.mk.rippleGeo=Yr(.9,1,56),this.mk.ripples=[0,1,2].map(()=>{let c=n(this.mk.rippleGeo,e(Dl,0),2);return c.userData.t0=-1,c})}spot(e){let n=Ll+.008;if(e.kind==="board"){let[o,a]=Ri(e.idx);return new N(o,.002,a)}if(e.kind==="captured"){let o=(e.idx-2)*.56;return this.portrait?new N(o,n,3.3):new N(3.32,n,o)}let r=(Math.floor(e.idx/2)-4.5)*.5,s=3.25+e.idx%2*.5;return this.portrait?new N(r,n,-s):new N(-s,n,r)}pieceAt(e){return this.pieces.find(n=>n.where.kind==="board"&&n.where.idx===e)||null}setPosition(e,{move:n=null,animate:i=!0}={}){let r={target:e,move:n,animate:i&&!this.reduced&&!this.first};this.first=!1,this.board=e.board,this.queue.push(r),this.queue.length>3&&(this.queue=[{...this.queue[this.queue.length-1],move:null}]),this.settled&&(this.settled=!1,this.on.onSettled&&this.on.onSettled(!1)),this.refreshMarkers()}runJob(e,n){let i=n;e.move&&(i=this.playMove(e.move,e.target,e.animate,n)),i=Math.max(i,this.reconcile(e.target,e.animate,n)),this.busyUntil=i,this.dirty=!0}emit(e){this.on.onEvent&&this.on.onEvent(e)}playMove(e,n,i,r){let{from:s,over:o,to:a}=e;if(this.pieceAt(a))return r;if(s<0){let y=this.goats.filter(m=>m.where.kind==="reserve").sort((m,h)=>h.where.idx-m.where.idx)[0];return!y||n.board[a]!==Sg?r:(y.where={kind:"board",idx:a},this.send(y,{animate:i,now:r,dur:640,lift:.95,land:"place"}))}let l=this.pieceAt(s);if(!l||n.board[a]!==(l.type==="tiger"?RM:Sg))return r;let[c,u]=Ri(s),[d,f]=Ri(a);if(l.type==="tiger"&&(l.yawGoal=Math.atan2(d-c,f-u)),l.where={kind:"board",idx:a},o<0)return this.send(l,{animate:i,now:r,dur:400,lift:.2,land:"step"});let p=this.send(l,{animate:i,now:r,dur:560,lift:.78,land:"capture"}),g=this.pieceAt(o);if(g&&g.type==="goat"){let y=this.goats.filter(m=>m.where.kind==="captured").length;return g.where={kind:"captured",idx:y},Math.max(p,this.send(g,{animate:i,now:r,delay:330,dur:700,lift:.9}))}return p}reconcile(e,n,i){let r=i,s=0,o=(h,v)=>{if(h.where.kind===v.kind&&h.where.idx===v.idx)return;let _=h.where.kind==="hidden";if(h.where=v,v.kind==="hidden"){h.tw=null;return}if(_&&(h.base.copy(this.spot(v)),h.type==="tiger")){let x=this.spot(v);h.yaw=h.yawGoal=x.x||x.z?Math.atan2(-x.x,-x.z):0}r=Math.max(r,this.send(h,{animate:n&&!_,now:i,delay:s++*22,dur:520,lift:.55}))},a=[],l=[];e.board.forEach((h,v)=>{h===RM?a.push(v):h===Sg&&l.push(v)});let c=(h,v)=>{let _=v.filter(C=>!h.some(T=>T.where.kind==="board"&&T.where.idx===C)),x=h.filter(C=>!(C.where.kind==="board"&&v.includes(C.where.idx)));return{open:_,loose:x}},u=c(this.tigers,a);u.open.forEach(h=>{let v=u.loose.shift();v&&o(v,{kind:"board",idx:h})}),u.loose.forEach(h=>o(h,{kind:"hidden",idx:0}));let d=c(this.goats,l),f=h=>(v,_)=>h.indexOf(v.where.kind)-h.indexOf(_.where.kind)||v.where.idx-_.where.idx,p=(h,v)=>{let[_,x]=Ri(v);return Math.hypot(h.base.x-_,h.base.z-x)};for(let h of d.open){let v=d.loose.filter(T=>T.where.kind==="board").sort((T,A)=>p(T,h)-p(A,h))[0],_=d.loose.filter(T=>T.where.kind==="captured").length>e.captured?d.loose.filter(T=>T.where.kind==="captured").sort((T,A)=>A.where.idx-T.where.idx)[0]:null,x=d.loose.filter(T=>T.where.kind==="reserve").sort((T,A)=>A.where.idx-T.where.idx)[0],C=v||_||x||d.loose[0];if(!C)break;d.loose.splice(d.loose.indexOf(C),1),o(C,{kind:"board",idx:h})}let g=d.loose.slice().sort(f(["captured","board","hidden","reserve"])).slice(0,e.captured),y=d.loose.filter(h=>!g.includes(h)),m=y.slice().sort(f(["reserve","board","captured","hidden"])).slice(0,e.inHand);return g.forEach((h,v)=>o(h,{kind:"captured",idx:v})),m.forEach((h,v)=>o(h,{kind:"reserve",idx:v})),y.filter(h=>!m.includes(h)).forEach(h=>o(h,{kind:"hidden",idx:0})),r}send(e,{animate:n,now:i,delay:r=0,dur:s,lift:o,land:a=null}){let l=this.spot(e.where),c=()=>{a&&(this.emit(a),e.where.kind==="board"&&this.ripple(l,a==="capture"?1.25:e.type==="tiger"?1:.72))};return n?(e.tw={p0:e.base.clone(),p1:l,lift:o,t0:i+r,dur:s,done:c},i+r+s):(e.base.copy(l),e.tw=null,c(),i)}ripple(e,n){if(this.reduced)return;let i=this.mk.ripples.find(r=>r.userData.t0<0)||this.mk.ripples[0];i.position.set(e.x,Ds,e.z),i.userData.t0=performance.now(),i.userData.size=n*.62,i.visible=!0}setInteraction(e){var n,i;this.ui={selected:(n=e.selected)!=null?n:null,targets:e.targets||[],placeable:new Set(e.placeable||[]),movable:new Set(e.movable||[]),lastMove:e.lastMove||null,hint:e.hint||null,focus:(i=e.focus)!=null?i:null},this.refreshMarkers()}refreshMarkers(){let{selected:e,targets:n,lastMove:i,hint:r,focus:s}=this.ui,o=this.mk;o.targets.forEach(c=>{c.ring.visible=!1,c.dot.visible=!1}),o.threats.forEach(c=>{c.visible=!1});let a=0;for(let c of n)if(o.targets[c.to].ring.visible=!0,o.targets[c.to].dot.visible=!0,c.over>=0&&a<o.threats.length){let[u,d]=Ri(c.over);o.threats[a].position.set(u,Ds,d),o.threats[a++].visible=!0}let l=(c,u)=>{if(c.visible=u!=null&&u>=0,c.visible){let[d,f]=Ri(u);c.position.set(d,c.position.y,f)}};if(l(o.selected,e),l(o.from,i?i.from:null),l(o.to,i?i.to:null),l(o.focus,s),l(o.hintRing,r?r.to:null),o.arrow.group.visible=!!(r&&r.from>=0),o.arrow.group.visible){let[c,u]=Ri(r.from),[d,f]=Ri(r.to),p=Math.hypot(d-c,f-u);o.arrow.group.position.set(c,Ds+.002,u),o.arrow.group.rotation.y=-Math.atan2(f-u,d-c),o.arrow.shaft.scale.x=p-.56,o.arrow.head.position.x=p-.3}for(let c of this.pieces){let u=c.where.kind==="board";c.raiseGoal=u&&c.where.idx===e?.17:u&&c.where.idx===this.hover&&this.ui.movable.has(c.where.idx)?.05:0}this.refreshHover(),this.dirty=!0}refreshHover(){let e=this.hover,{placeable:n,movable:i,targets:r}=this.ui,s=e!==null&&(n.has(e)||i.has(e)||r.some(a=>a.to===e));this.canvas.style.cursor=s?"pointer":this.drag&&this.drag.moved?"grabbing":"";let o=this.mk.ghost;if(o.visible=e!==null&&n.has(e)&&this.board[e]===0,o.visible){let[a,l]=Ri(e);o.position.set(a,.002,l)}}bind(){let e=this.canvas;this.handlers={pointerdown:n=>this.onDown(n),pointermove:n=>this.onMove(n),pointerup:n=>this.onUp(n),pointercancel:n=>this.onCancel(n),pointerleave:()=>this.setHover(null),wheel:n=>{this.orbitEnabled&&(n.preventDefault(),this.rig.zoomBy(Math.exp(n.deltaY*.0012)))},webglcontextlost:n=>{n.preventDefault(),this.on.onLost&&this.on.onLost()}};for(let[n,i]of Object.entries(this.handlers))e.addEventListener(n,i,{passive:!1});this.onVisibility=()=>{this.last=performance.now(),this.dirty=!0},document.addEventListener("visibilitychange",this.onVisibility)}pick(e){let n=this.canvas.getBoundingClientRect(),i=new ce((e.clientX-n.left)/n.width*2-1,-((e.clientY-n.top)/n.height)*2+1);this.raycaster.setFromCamera(i,this.camera);let r=this.pieces.filter(c=>c.where.kind==="board"&&c.mesh.visible).map(c=>c.mesh),s=this.raycaster.intersectObjects(r,!1)[0];if(s)return s.object.userData.piece.where.idx;let o=this.raycaster.ray.intersectPlane(this.plane,new N);if(!o)return null;let a=Math.round(o.x+2),l=Math.round(o.z+2);return a<0||a>4||l<0||l>4?null:Math.hypot(o.x-(a-2),o.z-(l-2))<=.5?l*5+a:null}setHover(e){e!==this.hover&&(this.hover=e,this.refreshMarkers())}onDown(e){this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});try{this.canvas.setPointerCapture(e.pointerId)}catch{}if(this.pointers.size===1)this.drag={id:e.pointerId,x0:e.clientX,y0:e.clientY,x:e.clientX,y:e.clientY,moved:!1};else if(this.pointers.size===2){let[n,i]=[...this.pointers.values()];this.pinch=Math.hypot(n.x-i.x,n.y-i.y),this.drag&&(this.drag.moved=!0)}}onMove(e){let n=this.pointers.get(e.pointerId);if(n&&(n.x=e.clientX,n.y=e.clientY),this.pointers.size===2&&this.orbitEnabled){let[r,s]=[...this.pointers.values()],o=Math.hypot(r.x-s.x,r.y-s.y);this.pinch&&this.rig.zoomBy(this.pinch/o),this.pinch=o;return}let i=this.drag;i&&i.id===e.pointerId&&(!i.moved&&Math.hypot(e.clientX-i.x0,e.clientY-i.y0)>7&&(i.moved=!0),i.moved&&this.orbitEnabled&&(this.rig.orbit(e.clientX-i.x,e.clientY-i.y),this.canvas.style.cursor="grabbing"),i.x=e.clientX,i.y=e.clientY,i.moved)||e.pointerType!=="touch"&&this.setHover(this.pick(e))}onUp(e){this.pointers.delete(e.pointerId),this.pointers.size<2&&(this.pinch=0);let n=this.drag;if(!n||n.id!==e.pointerId)return;if(this.drag=null,n.moved){this.refreshHover();return}let i=this.pick(e);i===null?this.on.onMiss&&this.on.onMiss():this.on.onPoint&&this.on.onPoint(i)}onCancel(e){this.pointers.delete(e.pointerId),this.drag=null,this.pinch=0}setCamera(e,n=!1){this.rig.drift=e==="intro"?.16:0,this.orbitEnabled=e!=="intro",this.rig.setPreset(e,n||this.reduced)}setReducedMotion(e){this.reduced=e}setShowNumbers(e){this.buildBoard(e)}resize(e,n,i){if(!e||!n)return;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(e,n,!1);let r=(e-i.left-i.right)/(n-i.top-i.bottom)<.92;if(r!==this.portrait){this.portrait=r,this.felt.rotation.y=r?Math.PI/2:0;for(let s of this.pieces)s.where.kind!=="board"&&s.where.kind!=="hidden"&&(s.base.copy(this.spot(s.where)),s.tw=null)}this.rig.setBounds(r?2.8:4.15,r?4.15:2.8),this.rig.setViewport(e,n,i),this.dirty=!0}frame(e){if(this.disposed)return;this.raf=requestAnimationFrame(this.frame);let n=Math.min(.05,(e-this.last)/1e3);this.last=e,e>=this.busyUntil&&(this.queue.length?this.runJob(this.queue.shift(),e):this.settled||(this.settled=!0,this.on.onSettled&&this.on.onSettled(!0)));let i=this.dirty||!this.settled;this.dirty=!1,this.rig.update(n,e,this.reduced)&&(i=!0);let r=this.reduced?1:1-Math.exp(-n*16);for(let o of this.pieces){let a=0;if(o.tw){let f=(e-o.tw.t0)/o.tw.dur;if(f>=1){o.base.copy(o.tw.p1);let p=o.tw.done;o.tw=null,p()}else if(f>0){let p=v2(f);o.base.lerpVectors(o.tw.p0,o.tw.p1,p),a=o.tw.lift*4*p*(1-p)}i=!0}Math.abs(o.raiseGoal-o.raise)>5e-4&&(o.raise+=(o.raiseGoal-o.raise)*r,i=!0);let l=o.yawGoal-o.yaw;l=Math.atan2(Math.sin(l),Math.cos(l)),Math.abs(l)>.002&&(o.yaw+=l*r*.6,i=!0);let c=o.where.kind!=="hidden";if(o.mesh.visible=c,o.blob.visible=c,!c)continue;let u=a+o.raise;o.mesh.position.set(o.base.x,o.base.y+u,o.base.z),o.mesh.rotation.y=o.yaw;let d=Math.abs(o.base.x)<ea/2&&Math.abs(o.base.z)<ea/2;o.blob.position.set(o.base.x,(d?.002:Ll+.008)+.004,o.base.z),o.blob.material.opacity=.62/(1+u*5)}if((this.ui.targets.length||this.ui.hint)&&!this.reduced){let o=.5+.5*Math.sin(e*.004);this.mk.targetMat.opacity=.62+.3*o,this.mk.threatMat.opacity=.62+.3*o,i=!0}for(let o of this.mk.ripples){if(o.userData.t0<0)continue;let a=(e-o.userData.t0)/520;if(a>=1){o.visible=!1,o.userData.t0=-1;continue}let l=o.userData.size*(.45+.75*(1-Math.pow(1-a,3)));o.scale.set(l,1,l),o.material.opacity=.34*(1-a),i=!0}i&&!document.hidden&&(this.renderer.render(this.scene,this.camera),this.shown||(this.shown=!0,this.on.onReady&&this.on.onReady()))}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf);for(let[n,i]of Object.entries(this.handlers))this.canvas.removeEventListener(n,i);document.removeEventListener("visibilitychange",this.onVisibility),this.canvas.style.cursor="";let e=new Set;this.scene.traverse(n=>{n.geometry&&!e.has(n.geometry)&&(e.add(n.geometry),n.geometry.dispose());let i=Array.isArray(n.material)?n.material:n.material?[n.material]:[];for(let r of i)if(!e.has(r)){e.add(r);for(let s of["map","roughnessMap","metalnessMap"])r[s]&&!e.has(r[s])&&(e.add(r[s]),r[s].dispose());r.dispose()}}),this.env.dispose(),this.renderer.dispose()}};var Us=lt(Gt()),_2=["empty","goat","tiger"];function bg({topo:t,shown:e,ui:n,camera:i,showNumbers:r,insets:s,reduced:o,interactive:a,onPoint:l,onMiss:c,onSettled:u,onEvent:d,onFail:f,focus:p,setFocus:g}){let y=(0,en.useRef)(null),m=(0,en.useRef)(null),h=(0,en.useRef)(null),v=(0,en.useRef)(null),[_,x]=(0,en.useState)(!1),C=(0,en.useRef)({});C.current={onPoint:l,onMiss:c,onSettled:u,onEvent:d,onFail:f};let T=(0,en.useRef)(s);T.current=s,(0,en.useEffect)(()=>{let w;try{w=new wh(m.current,t,{onPoint:k=>C.current.onPoint(k),onMiss:()=>C.current.onMiss(),onSettled:k=>C.current.onSettled(k),onEvent:k=>C.current.onEvent(k),onLost:()=>C.current.onFail(),onReady:()=>x(!0)})}catch{C.current.onFail();return}h.current=w;let M=()=>{let k=y.current.getBoundingClientRect();w.resize(Math.round(k.width),Math.round(k.height),T.current)};M();let R=new ResizeObserver(M);return R.observe(y.current),w.fit=M,()=>{R.disconnect(),w.dispose(),h.current=null,v.current=null}},[t]),(0,en.useEffect)(()=>{h.current&&h.current.fit()},[s.top,s.right,s.bottom,s.left]),(0,en.useEffect)(()=>{h.current&&h.current.setReducedMotion(o)},[o]),(0,en.useEffect)(()=>{h.current&&h.current.setCamera(i)},[i]),(0,en.useEffect)(()=>{h.current&&h.current.setShowNumbers(r)},[r]),(0,en.useEffect)(()=>{if(!h.current||!e)return;let{pos:w,moves:M,start:R}=e,k=v.current,F=k&&k.start===R&&M.length===k.moves.length+1&&k.moves.every((B,J)=>B===M[J]);h.current.setPosition({board:w.board,inHand:w.in_hand,captured:w.captured},{move:F?Dn(M[M.length-1]):null}),v.current={start:R,moves:M}},[e]),(0,en.useEffect)(()=>{h.current&&h.current.setInteraction({...n,focus:p})},[n,p]);let A=e?e.pos.board:null,I=(w,M)=>{let R={ArrowLeft:-1,ArrowRight:1,ArrowUp:-5,ArrowDown:5}[M.key];if(!R)return;let k=w%5;if(R===-1&&k===0||R===1&&k===4)return;let F=w+R;F<0||F>24||(M.preventDefault(),y.current.querySelector(`[data-point="${F}"]`).focus())};return(0,Us.jsxs)("div",{className:`board3d${_?" ready":""}`,ref:y,children:[(0,Us.jsx)("canvas",{ref:m,"aria-hidden":"true"}),(0,Us.jsx)("div",{className:"point-grid",role:"grid","aria-label":"Bagh-Chal board, 5 by 5 points",children:A&&[0,1,2,3,4].map(w=>(0,Us.jsx)("div",{role:"row",children:[0,1,2,3,4].map(M=>{let R=w*5+M;return(0,Us.jsx)("button",{type:"button",role:"gridcell","data-point":R,tabIndex:R===(p!=null?p:12)?0:-1,"aria-label":`Point ${R}, ${_2[A[R]]}${n.selected===R?", selected":""}${n.targets.some(k=>k.to===R)?", legal destination":""}`,disabled:!a,onFocus:()=>g(R),onBlur:()=>g(null),onKeyDown:k=>I(R,k),onClick:()=>l(R)},R)})},w))})]})}var Eh=lt(An());var te=lt(Gt());function NM({modeLine:t,tools:e}){return(0,te.jsxs)("header",{className:"topbar",children:[(0,te.jsxs)("div",{className:"brand",children:[(0,te.jsx)("span",{className:"deva",lang:"ne","aria-hidden":"true",children:"\u092C\u093E\u0918 \u091A\u093E\u0932"}),(0,te.jsx)("span",{className:"brand-name",children:"Bagh-Chal"}),(0,te.jsx)("span",{className:"brand-mode",children:t})]}),(0,te.jsx)("nav",{className:"tools","aria-label":"Game controls",children:e})]})}function x2({side:t,who:e,active:n,thinking:i}){return(0,te.jsxs)("li",{className:`side-row ${t.toLowerCase()}${n?" active":""}`,children:[(0,te.jsx)("span",{className:"token","aria-hidden":"true"}),(0,te.jsx)("span",{className:"side-row-name",children:wi(t)}),(0,te.jsxs)("span",{className:"side-row-who",children:[e,i&&(0,te.jsxs)("span",{className:"thinking",role:"status","aria-label":"The agent is thinking",children:[(0,te.jsx)("i",{}),(0,te.jsx)("i",{}),(0,te.jsx)("i",{})]})]})]})}function LM({pos:t,config:e,auto:n,thinking:i,moves:r,shownMoves:s,notes:o,viewIndex:a,onReview:l}){let c=(0,Eh.useRef)(null);if((0,Eh.useEffect)(()=>{let y=c.current;y&&a===null&&(y.scrollTop=y.scrollHeight)},[r.length,a]),!t)return(0,te.jsx)("aside",{className:"ledger",children:(0,te.jsx)("p",{className:"help",children:"Connecting to the engine\u2026"})});let u=y=>n?"Agent":y===e.human?"You":"Agent",d=t.board.filter(y=>y===1).length,f=s.length?s[s.length-1]:null,p=f?Dn(f).side:null,g=a===null?r.length:a;return(0,te.jsxs)("aside",{className:"ledger","aria-label":"Game status",children:[(0,te.jsx)("ul",{className:"sides",children:["GOAT","TIGER"].map(y=>(0,te.jsx)(x2,{side:y,who:u(y),active:!t.terminal&&t.to_move===y,thinking:i&&t.to_move===y&&u(y)==="Agent"},y))}),(0,te.jsxs)("dl",{className:"counts",children:[(0,te.jsxs)("div",{children:[(0,te.jsx)("dt",{children:"Goats to place"}),(0,te.jsx)("dd",{children:t.in_hand})]}),(0,te.jsxs)("div",{children:[(0,te.jsx)("dt",{children:"Goats on board"}),(0,te.jsx)("dd",{children:d})]}),(0,te.jsxs)("div",{children:[(0,te.jsx)("dt",{children:"Tigers"}),(0,te.jsx)("dd",{children:"4"})]}),(0,te.jsxs)("div",{className:"wide",children:[(0,te.jsx)("dt",{children:"Captured"}),(0,te.jsxs)("dd",{children:[(0,te.jsx)(_M,{filled:t.captured,label:`${t.captured} of 5 goats captured`}),(0,te.jsxs)("span",{className:"of",children:[t.captured," of 5"]})]})]}),(0,te.jsxs)("div",{children:[(0,te.jsx)("dt",{children:"Phase"}),(0,te.jsx)("dd",{className:"word",children:t.in_hand>0?"Placement":"Movement"})]}),(0,te.jsxs)("div",{children:[(0,te.jsx)("dt",{children:"Move"}),(0,te.jsx)("dd",{children:t.ply})]})]}),(0,te.jsx)("p",{className:"last-move",children:f?(0,te.jsxs)(te.Fragment,{children:["Last move: ",(0,te.jsx)("strong",{children:wi(p)})," ",p==="GOAT"&&Dn(f).from<0?Yi(f).replace("places","placed"):Yi(f)]}):`No moves yet. ${wi(t.to_move)} move first.`}),(0,te.jsx)("div",{className:"moves",ref:c,children:(0,te.jsx)("ol",{children:r.map((y,m)=>{let h=Dn(y).side;return(0,te.jsx)("li",{className:m+1===g?"current":m+1>g?"future":"",children:(0,te.jsxs)("button",{type:"button",onClick:()=>l(m+1),"aria-label":`Show the board after move ${m+1}`,children:[(0,te.jsx)("span",{className:"n",children:m+1}),(0,te.jsx)("span",{className:`token small ${h.toLowerCase()}`,"aria-hidden":"true"}),(0,te.jsx)("span",{className:"mv",children:Yi(y)}),o[m]&&(0,te.jsx)("span",{className:"sc",children:Qa(o[m].score)})]})},m)})})})]})}function DM({status:t,tone:e,notice:n,error:i,children:r}){return(0,te.jsxs)("footer",{className:"bottombar",children:[(0,te.jsxs)("div",{className:"status","aria-live":"polite",children:[(0,te.jsx)("p",{className:`status-line ${e||""}`,children:t}),n&&(0,te.jsx)("p",{className:"notice",children:n}),i&&(0,te.jsx)("p",{className:"error",role:"alert",children:i})]}),(0,te.jsx)("div",{className:"actions",children:r})]})}function UM({index:t,total:e,kind:n,onStep:i,onExit:r}){return(0,te.jsxs)("div",{className:"review",children:[(0,te.jsx)("button",{type:"button",className:"tool quiet",onClick:()=>i(0),disabled:t<=0,"aria-label":"First position",children:(0,te.jsx)(Is,{name:"first"})}),(0,te.jsx)("button",{type:"button",className:"tool quiet",onClick:()=>i(t-1),disabled:t<=0,"aria-label":"Previous move",children:(0,te.jsx)(Is,{name:"prev"})}),(0,te.jsx)("input",{type:"range",min:"0",max:e,value:t,onChange:s=>i(Number(s.target.value)),"aria-label":n==="line"?"Position in the expected line":"Position in the game"}),(0,te.jsx)("button",{type:"button",className:"tool quiet",onClick:()=>i(t+1),disabled:t>=e,"aria-label":"Next move",children:(0,te.jsx)(Is,{name:"next"})}),(0,te.jsx)("span",{className:"review-count",children:n==="line"?`Expected move ${t} of ${e}`:`Move ${t} of ${e}`}),(0,te.jsx)("button",{type:"button",className:"primary",onClick:r,children:"Back to the game"})]})}function OM({pos:t,config:e,auto:n,notes:i,onAgain:r,onReview:s,onSetup:o}){let a=Object.values(i),l=a.reduce((f,p)=>f+p.nodes,0),c=a.reduce((f,p)=>f+p.time_ms,0),u=t.winner===null?"A draw":`${wi(t.winner)} win`,d=n?"":t.winner===null?"Neither side broke through.":t.winner===e.human?"The game is yours.":"The agent takes this one.";return(0,te.jsxs)("section",{className:"gameover",role:"dialog","aria-labelledby":"over-title",children:[(0,te.jsxs)("div",{className:"over-head",children:[(0,te.jsx)("h2",{id:"over-title",children:u}),(0,te.jsxs)("p",{className:"over-reason",children:[t.result," ",d]})]}),(0,te.jsxs)("dl",{className:"over-stats",children:[(0,te.jsxs)("div",{children:[(0,te.jsx)("dt",{children:"Moves played"}),(0,te.jsx)("dd",{children:t.ply})]}),(0,te.jsxs)("div",{children:[(0,te.jsx)("dt",{children:"Goats captured"}),(0,te.jsx)("dd",{children:t.captured})]}),(0,te.jsxs)("div",{children:[(0,te.jsx)("dt",{children:"Goats left on the board"}),(0,te.jsx)("dd",{children:t.board.filter(f=>f===1).length})]}),(0,te.jsxs)("div",{children:[(0,te.jsx)("dt",{children:"Positions the agent searched"}),(0,te.jsx)("dd",{children:Xi(l)})]}),(0,te.jsxs)("div",{children:[(0,te.jsx)("dt",{children:"Agent's thinking time"}),(0,te.jsx)("dd",{children:c<1e3?`${Xi(c)} ms`:`${Xi(c/1e3,1)} s`})]}),(0,te.jsxs)("div",{children:[(0,te.jsx)("dt",{children:"Search depth"}),(0,te.jsx)("dd",{children:ja(e.depth,"ply","plies")})]})]}),(0,te.jsxs)("div",{className:"over-actions",children:[(0,te.jsx)("button",{type:"button",className:"primary big",onClick:r,children:"Play again"}),(0,te.jsx)("button",{type:"button",className:"ghost",onClick:s,children:"Review the game"}),(0,te.jsx)("button",{type:"button",className:"ghost",onClick:o,children:"Change sides or depth"})]})]})}var Tg=lt(An());var ft=lt(Gt()),kM=[{key:"GOAT",mode:"human",art:"goat",name:"Lead the goats",text:"Twenty goats, placed one at a time. Crowd the board until no tiger can move. You open."},{key:"TIGER",mode:"human",art:"tiger",name:"Hunt as the tigers",text:"Four tigers from the corners. Jump a goat to take it; five captures win the game."},{key:"WATCH",mode:"auto",art:"both",name:"Watch the agent play itself",text:"The search plays both sides at the depth you choose. Pause or step back at any time."}],M2=["","Looks one move ahead. Quick, and easy to trap.","Looks two moves ahead. Answers instantly.","Looks three moves ahead. A fair opponent.","Looks four moves ahead. About a second a move.","Looks five moves ahead. Several seconds a move.","Looks six moves ahead. Slow and stubborn."];function Ag({config:t,thumbs:e,canResume:n,onBegin:i,onResume:r,onResults:s}){let[o,a]=(0,Tg.useState)(t.mode==="auto"?"WATCH":t.human),[l,c]=(0,Tg.useState)(Math.min(t.depth,6)),u=kM.find(d=>d.key===o);return(0,ft.jsxs)("section",{className:"setup","aria-labelledby":"setup-title",children:[(0,ft.jsxs)("header",{className:"setup-head",children:[(0,ft.jsx)("p",{className:"deva",lang:"ne","aria-hidden":"true",children:"\u092C\u093E\u0918 \u091A\u093E\u0932"}),(0,ft.jsx)("h1",{id:"setup-title",children:"Bagh-Chal"}),(0,ft.jsx)("p",{className:"lede",children:"The tiger game of Nepal: four tigers hunt, twenty goats close ranks. You play against a minimax search with alpha-beta pruning."})]}),(0,ft.jsx)("div",{className:"side-list",role:"radiogroup","aria-label":"Choose how to play",children:kM.map(d=>(0,ft.jsxs)("button",{type:"button",role:"radio","aria-checked":o===d.key,className:`side${o===d.key?" on":""}`,onClick:()=>a(d.key),children:[(0,ft.jsxs)("span",{className:`side-art ${d.art}`,"aria-hidden":"true",children:[e&&d.art!=="both"&&(0,ft.jsx)("img",{src:e[d.art],alt:""}),e&&d.art==="both"&&(0,ft.jsxs)(ft.Fragment,{children:[(0,ft.jsx)("img",{src:e.tiger,alt:""}),(0,ft.jsx)("img",{src:e.goat,alt:""})]})]}),(0,ft.jsxs)("span",{className:"side-copy",children:[(0,ft.jsx)("span",{className:"side-name",children:d.name}),(0,ft.jsx)("span",{className:"side-text",children:d.text})]})]},d.key))}),(0,ft.jsxs)("div",{className:"setup-depth",children:[(0,ft.jsx)("span",{className:"field-label",id:"setup-depth-label",children:"How far the agent looks ahead"}),(0,ft.jsx)(_h,{id:"setup-depth",value:l,max:6,onChange:c}),(0,ft.jsx)("p",{className:"help",children:M2[l]})]}),(0,ft.jsxs)("div",{className:"setup-actions",children:[(0,ft.jsx)("button",{type:"button",className:"primary big",onClick:()=>i({mode:u.mode,human:u.mode==="auto"?t.human:u.key,depth:l,algorithm:"alphabeta"}),children:u.mode==="auto"?"Start the game":"Begin the game"}),n&&(0,ft.jsx)("button",{type:"button",className:"ghost",onClick:r,children:"Back to the game in progress"}),(0,ft.jsx)("button",{type:"button",className:"text-link",onClick:s,children:"Experiment results"})]})]})}var $e=lt(Gt());function FM(t){let[e,n]=(0,Lt.useState)(()=>window.matchMedia(t).matches);return(0,Lt.useEffect)(()=>{let i=window.matchMedia(t),r=()=>n(i.matches);return i.addEventListener("change",r),()=>i.removeEventListener("change",r)},[t]),e}function Cg(){let t=w_(),[e,n]=(0,Lt.useState)("play"),[i,r]=(0,Lt.useState)(!1),[s,o]=(0,Lt.useState)(!1),[a,l]=(0,Lt.useState)("game"),[c,u]=(0,Lt.useState)(()=>!new URLSearchParams(window.location.search).has("flat")),[d,f]=(0,Lt.useState)(__()),[p,g]=(0,Lt.useState)(null),[y,m]=(0,Lt.useState)(null),h=FM("(prefers-reduced-motion: reduce)"),v=FM("(min-width: 1040px)");(0,Lt.useEffect)(()=>{let K=setTimeout(()=>m(dM()),60);return()=>clearTimeout(K)},[]);let _=(0,Lt.useMemo)(()=>t.shownPos?{pos:t.shownPos,moves:t.shownMoves,start:t.game.start}:null,[t.shownPos]),x=(0,Lt.useRef)(null);_&&(x.current=_);let C=_||x.current,T=(0,Lt.useMemo)(()=>{let K=t.pos,fe=t.humanTurn&&K,xe=fe&&K.to_move==="GOAT"&&K.in_hand>0;return{selected:fe?t.selected:null,targets:fe&&t.selected!==null?K.legal.filter(De=>De.from===t.selected).map(De=>({to:De.to,over:De.over,kind:De.kind})):[],placeable:xe?K.legal.map(De=>De.to):[],movable:fe&&!xe?[...new Set(K.legal.map(De=>De.from))]:[],lastMove:t.lastMove,hint:t.hintSearch&&!t.view?Dn(t.hintSearch.move):null}},[t.pos,t.humanTurn,t.selected,t.lastMove,t.hintSearch,t.view]),A=!!(t.pos&&t.pos.terminal);(0,Lt.useEffect)(()=>{A&&t.started&&Wi("end")},[A]);let I=t.game.moves.length;(0,Lt.useEffect)(()=>{!c&&I&&Wi("step")},[I,c]),(0,Lt.useEffect)(()=>{let K=fe=>{fe.key==="Escape"&&(t.view?t.reviewAt(1/0):t.setSelected(null))};return window.addEventListener("keydown",K),()=>window.removeEventListener("keydown",K)});let w=K=>(...fe)=>(ou(),Wi("button"),K(...fe)),M=K=>{ou(),t.onPoint(K)==="select"&&Wi("select")},R=K=>{ou(),t.begin(K),n("play"),window.scrollTo(0,0),Wi("start")},k=()=>{let K=!d;x_(K),f(K),K&&Wi("button")},F=(0,Lt.useMemo)(()=>{let K=t.pos;return K?t.view?[t.view.kind==="line"?"The line the engine expects. Nothing here has been played.":"Looking back through the game.","dim"]:K.terminal?[K.result,"over"]:t.auto?[t.paused?"Paused.":`${wi(K.to_move)} to move. The agent is playing both sides.`,t.paused?"dim":""]:t.thinking&&K.to_move!==t.config.human?["The agent is thinking.","dim"]:K.to_move!==t.config.human?["The agent's turn.","dim"]:K.to_move==="GOAT"&&K.in_hand>0?["Your move. Place a goat on any empty point.",""]:t.selected!==null?["Choose where it goes. The marked points are its legal moves.",""]:[K.to_move==="GOAT"?"Your move. Pick a goat, then a point beside it.":"Your move. Pick a tiger; jumping a goat captures it.",""]:["Waiting for the engine\u2026",""]},[t.pos,t.view,t.auto,t.paused,t.thinking,t.config,t.selected]);if(a==="results")return(0,$e.jsx)(yM,{onBack:()=>{l("game"),window.scrollTo(0,0)}});let B=t.started,J=B&&A&&!t.view&&t.settled,G=v?B?{top:78,right:356,bottom:J?250:124,left:s?452:28}:{top:30,right:30,bottom:30,left:560}:{top:4,right:4,bottom:4,left:4},ie=t.auto?`Agent against itself, depth ${t.config.depth}`:`You lead the ${t.config.human==="GOAT"?"goats":"tigers"}, agent at depth ${t.config.depth}`,W=t.hintSearch&&!t.view?`The search suggests: ${wi(t.hintSearch.side)} ${Yi(t.hintSearch.move)}.`:null;return(0,$e.jsxs)("div",{className:`app ${v?"wide":"narrow"} ${B?"playing":"in-setup"}${s&&B?" with-analysis":""}`,children:[(0,$e.jsxs)("main",{className:"stage",children:[t.topo?c?(0,$e.jsx)(bg,{topo:t.topo,shown:C,ui:T,camera:B?e:"intro",showNumbers:i,insets:G,reduced:h,interactive:t.humanTurn,focus:p,setFocus:g,onPoint:M,onMiss:()=>t.setSelected(null),onSettled:t.setSettled,onEvent:Wi,onFail:()=>{u(!1),t.setSettled(!0)}}):(0,$e.jsxs)("div",{className:"flat-wrap",children:[(0,$e.jsx)(vg,{topo:t.topo,shown:C,ui:T,showNumbers:i,onPoint:M}),(0,$e.jsx)("p",{className:"help",children:"This browser can't draw the 3D board, so the game is shown flat. Everything else works the same."})]}):(0,$e.jsx)("div",{className:"stage-note",children:t.error||"Setting the board\u2026"}),(0,$e.jsx)("div",{className:"vignette","aria-hidden":"true"})]}),!B&&(0,$e.jsx)(Ag,{config:t.config,thumbs:y,canResume:t.game.moves.length>0,onBegin:R,onResume:w(()=>t.setStarted(!0)),onResults:()=>l("results")}),B&&(0,$e.jsxs)($e.Fragment,{children:[(0,$e.jsx)(NM,{modeLine:ie,tools:(0,$e.jsxs)($e.Fragment,{children:[(0,$e.jsx)(fi,{icon:"analysis",label:"Analysis",pressed:s,onClick:w(()=>o(!s))}),c&&(0,$e.jsx)(fi,{icon:e==="play"?"top":"table",label:e==="play"?"Top view":"Table view",onClick:w(()=>n(e==="play"?"top":"play"))}),(0,$e.jsx)(fi,{icon:"numbers",label:"Point numbers",pressed:i,onClick:w(()=>r(!i))}),(0,$e.jsx)(fi,{icon:d?"soundOn":"soundOff",label:"Sound",pressed:d,onClick:k}),(0,$e.jsx)(fi,{icon:"restart",label:"Restart",onClick:w(()=>t.reset(t.game.start,t.game.startSide)),disabled:!t.game.moves.length}),(0,$e.jsx)("button",{type:"button",className:"primary",onClick:w(()=>t.setStarted(!1)),children:"New game"})]})}),s&&(0,$e.jsx)(mg,{g:t,onClose:()=>o(!1),onResults:()=>l("results"),onCopyFail:()=>t.setNotice("Copying isn't allowed here; select the command and copy it by hand.")}),(0,$e.jsx)(LM,{pos:C?C.pos:null,config:t.config,auto:t.auto,thinking:t.thinking&&!t.hintSearch,moves:t.game.moves,shownMoves:C?C.moves:[],notes:t.game.notes,viewIndex:t.view&&t.view.kind==="review"?t.view.index:null,onReview:w(t.reviewAt)}),J?(0,$e.jsx)(OM,{pos:t.pos,config:t.config,auto:t.auto,notes:t.game.notes,onAgain:w(()=>{t.reset(t.game.start,t.game.startSide),Wi("start")}),onReview:w(()=>t.reviewAt(0)),onSetup:w(()=>t.setStarted(!1))}):(0,$e.jsx)(DM,{status:F[0],tone:F[1],notice:t.notice||W,error:t.error,children:t.view?(0,$e.jsx)(UM,{index:t.view.index,total:t.view.kind==="line"?t.view.total:t.game.moves.length,kind:t.view.kind,onStep:t.view.kind==="line"?K=>t.previewLine(t.view.result,K):t.reviewAt,onExit:w(()=>t.reviewAt(1/0))}):t.auto?(0,$e.jsxs)($e.Fragment,{children:[(0,$e.jsx)(fi,{icon:t.paused?"play":"pause",label:t.paused?"Resume":"Pause",onClick:w(()=>t.setPaused(!t.paused)),disabled:A}),(0,$e.jsx)(fi,{icon:"prev",label:"Step back",onClick:w(()=>{t.setPaused(!0),t.reviewAt(t.game.moves.length-1)}),disabled:!t.game.moves.length})]}):(0,$e.jsxs)($e.Fragment,{children:[(0,$e.jsx)(fi,{icon:"undo",label:"Undo",onClick:w(t.undo),disabled:!t.game.moves.length}),t.agentStuck?(0,$e.jsx)(fi,{icon:"play",label:"Let the agent move",onClick:w(()=>t.search(!0))}):(0,$e.jsx)(fi,{icon:"hint",label:"Suggest a move",onClick:w(()=>t.search(!1)),disabled:!t.humanTurn})]})})]})]})}var zM=lt(Gt());(0,BM.createRoot)(document.getElementById("root")).render((0,zM.jsx)(Cg,{}));})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
