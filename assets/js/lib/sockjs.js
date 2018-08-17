var JSON;JSON||(JSON={}),function(){function str(e,t){var n="object",r="function",i="string",s="null",o="length",u,a,f,l,c=gap,h,p=t[e];p&&typeof p==n&&typeof p.toJSON==r&&(p=p.toJSON(e)),typeof rep==r&&(p=rep.call(t,e,p));switch(typeof p){case i:return quote(p);case"number":return isFinite(p)?String(p):s;case"boolean":case s:return String(p);case n:if(!p)return s;gap+=indent,h=[];if(Object.prototype.toString.apply(p)==="[object Array]"){l=p[o];for(u=0;u<l;u+=1)h[u]=str(u,p)||s;return f=h[o]===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+c+"]":"["+h.join(",")+"]",gap=c,f}if(rep&&typeof rep==n){l=rep[o];for(u=0;u<l;u+=1)typeof rep[u]==i&&(a=rep[u],f=str(a,p),f&&h.push(quote(a)+(gap?": ":":")+f))}else for(a in p)Object.prototype.hasOwnProperty.call(p,a)&&(f=str(a,p),f&&h.push(quote(a)+(gap?": ":":")+f));return f=h[o]===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+c+"}":"{"+h.join(",")+"}",gap=c,f}}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function f(e){return e<10?"0"+e:e}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r="number",i;gap="",indent="";if(typeof n==r)for(i=0;i<n;i+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length==r)return str("",{"":e});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n]);return reviver.call(e,t,i)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),SockJS=function(){var e="prototype",t="_listeners",n="readyState",r="dispatchEvent",i="_options",s="random_string",o=null,u="finish",a="slice",f=!0,l="createElement",c="onreadystatechange",h="_transport_tref",p="enabled",d="XHRLocalObject",v="_didClose",m="undefined",g="postMessage",y="protocol",b="closeFrame",w="length",E="_didMessage",S="roundTrips",x="unload_ref",T="attachEvent",N=!1,C="CONNECTING",k="_transport",L="onerror",A="indexOf",O="close",M="_cleanup",_="Only basic urls are supported in SockJS",D="iframe_close",P="stringify",H="addEventListener",B="polluteGlobalNamespace",j="onmessage",F="message",I="doCleanup",q="iframeObj",R="xhr-streaming",U="xdr-streaming",z="isSameOriginUrl",W="contentWindow",X="appendChild",V="i_constructor",$="iframe-eventsource",J="iframe-xhr-polling",K="xhr-polling",Q="xdr-polling",G="unload_del",Y="unload_add",Z="apply",et="arrIndexOf",tt="iframe-htmlfile",nt="send_buffer",rt="removeChild",it="null_origin",st="protocols_whitelist",ot="send_stop",ut="need_body",at="permanent",ft="parent_origin",lt="trans_url",ct="withCredentials",ht="_try_next_protocol",pt="jsonp-polling",dt="userSetCode",vt="parentNode",mt="_recv_stop",gt="onmessage_cb",yt="responseText",bt="send_constructor",wt="on",Et="emit",St="_dispatchMessage",xt="hasOwnProperty",Tt="w-iframe-info-receiver",Nt="detachEvent",Ct="websocket",kt="delay",Lt="function",At="/",Ot="ActiveXObject",Mt="w-iframe-eventsource",_t="w-iframe-xhr-polling",Dt="push",Pt="XMLHttpRequest",Ht="_schedule_recv",Bt="objectExtend",jt="_events",Ft="XDomainRequest",It="_protocols",qt="onload",Rt="send_schedule",Ut="onfinish",zt="attachMessage",Wt="location",Xt="_scheduleRecv",Vt="w-iframe-htmlfile",$t="_verifyType",Jt="INVALID_STATE_ERR",Kt="random_number_string",Qt="XHRCorsObject",Gt="removeEventListener",Yt="_base_url",Zt="window_id",en="iframe",tn="lastIndex",nn="ontimeout",rn="createIframe",sn="userAgent",on="chunk",un="XDRObject",an="flatUrl",fn="_send_form",ln="network",cn="/xhr_streaming",hn="_is_closing",pn="_dispatchHeartbeat",dn="es_close",vn="send_schedule_wait",mn="origin",gn="onclick",yn="toString",bn="_send_stop",wn="abort",En="random_number",Sn="isXHRCorsCapable",xn="version",Tn="_debug",Nn="detectProtocols",Cn="_start",kn="onclose",Ln="poll_is_closing",An="doSend",On="send_destructor",Mn="replace",_n="POST",Dn="complete",Pn="probeProtocols",Hn="user",Bn="htmlfile",jn="createHtmlfile",Fn="none",In="absolute",qn="/xhr",Rn="async",Un="cookie_needed",zn="parse",Wn="detachMessage",Xn="timeout",Vn="_dispatchOpen",$n=document,Jn=window,Kn={},Qn=function(){};Qn[e][H]=function(e,n){this[t]||(this[t]={}),e in this[t]||(this[t][e]=[]);var r=this[t][e];Kn[et](r,n)===-1&&r[Dt](n);return},Qn[e][Gt]=function(e,n){if(!(this[t]&&e in this[t]))return;var r=this[t][e],i=Kn[et](r,n);if(i!==-1){r[w]>1?this[t][e]=r[a](0,i).concat(r[a](i+1)):delete this[t][e];return}return},Qn[e][r]=function(n){var r=n.type,i=Array[e][a].call(arguments,0);this[wt+r]&&this[wt+r][Z](this,i);if(this[t]&&r in this[t])for(var s=0;s<this[t][r][w];s++)this[t][r][s][Z](this,i)};var Gn=function(e,t){this.type=e;if(typeof t!==m)for(var n in t){if(!t[xt](n))continue;this[n]=t[n]}};Gn[e][yn]=function(){var e=[];for(var t in this){if(!this[xt](t))continue;var n=this[t];typeof n===Lt&&(n="[function]"),e[Dt](t+"="+n)}return"SimpleEvent("+e.join(", ")+")"};var Yn=function(e){var n=this;n[jt]=e||[],n[t]={}};Yn[e][Et]=function(n){var r=this;r[$t](n);if(r._nuked)return;var i=Array[e][a].call(arguments,1);r[wt+n]&&r[wt+n][Z](r,i);if(n in r[t])for(var s=0;s<r[t][n][w];s++)r[t][n][s][Z](r,i)},Yn[e][wt]=function(e,n){var r=this;r[$t](e);if(r._nuked)return;e in r[t]||(r[t][e]=[]),r[t][e][Dt](n)},Yn[e][$t]=function(e){var t=this;Kn[et](t[jt],e)===-1&&Kn.log("Event "+JSON[P](e)+" not listed "+JSON[P](t[jt])+" in "+t)},Yn[e].nuke=function(){var e=this;e._nuked=f;for(var n=0;n<e[jt][w];n++)delete e[e[jt][n]];e[t]={}};var Zn="abcdefghijklmnopqrstuvwxyz0123456789_";Kn[s]=function(e,t){t=t||Zn[w];var n,r=[];for(n=0;n<e;n++)r[Dt](Zn.substr(Math.floor(Math.random()*t),1));return r.join("")},Kn[En]=function(e){return Math.floor(Math.random()*e)},Kn[Kt]=function(e){var t=(""+(e-1))[w],n=Array(t+1).join("0");return(n+Kn[En](e))[a](-t)},Kn.getOrigin=function(e){e+=At;var t=e.split(At)[a](0,3);return t.join(At)},Kn[z]=function(e,t){return t||(t=Jn[Wt].href),e.split(At)[a](0,3).join(At)===t.split(At)[a](0,3).join(At)},Kn.getParentDomain=function(e){if(/^[0-9.]*$/.test(e))return e;if(/^\[/.test(e))return e;if(!/[.]/.test(e))return e;var t=e.split(".")[a](1);return t.join(".")},Kn[Bt]=function(e,t){for(var n in t)t[xt](n)&&(e[n]=t[n]);return e};var er="_jp";Kn[B]=function(){er in Jn||(Jn[er]={})},Kn[b]=function(e,t){return"c"+JSON[P]([e,t])},Kn[dt]=function(e){return e===1e3||e>=3e3&&e<=4999},Kn.countRTO=function(e){var t;return e>100?t=3*e:t=e+200,t},Kn.log=function(){Jn.console&&console.log&&console.log[Z]&&console.log[Z](console,arguments)},Kn.bind=function(e,t){return e.bind?e.bind(t):function(){return e[Z](t,arguments)}},Kn[an]=function(e){return e[A]("?")===-1&&e[A]("#")===-1},Kn.amendUrl=function(e){var t=$n[Wt];if(!e)throw new Error("Wrong url for SockJS");if(!Kn[an](e))throw new Error(_);return e[A]("//")===0&&(e=t[y]+e),e[A](At)===0&&(e=t[y]+"//"+t.host+e),e=e[Mn](/[/]+$/,""),e},Kn[et]=function(e,t){for(var n=0;n<e[w];n++)if(e[n]===t)return n;return-1},Kn.arrSkip=function(e,t){var n=Kn[et](e,t);if(n===-1)return e[a]();var r=e[a](0,n);return r.concat(e[a](n+1))},Kn.isArray=Array.isArray||function(e){return{}[yn].call(e)[A]("Array")>=0},Kn[kt]=function(e,t){return typeof e===Lt&&(t=e,e=0),setTimeout(t,e)};var tr=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,nr={"\0":"\\u0000","":"\\u0001","":"\\u0002","":"\\u0003","":"\\u0004","":"\\u0005","":"\\u0006","":"\\u0007","\b":"\\b","	":"\\t","\n":"\\n","":"\\u000b","\f":"\\f","\r":"\\r","":"\\u000e","":"\\u000f","":"\\u0010","":"\\u0011","":"\\u0012","":"\\u0013","":"\\u0014","":"\\u0015","":"\\u0016","":"\\u0017","":"\\u0018","":"\\u0019","":"\\u001a","":"\\u001b","":"\\u001c","":"\\u001d","":"\\u001e","":"\\u001f",'"':'\\"',"\\":"\\\\","":"\\u007f","":"\\u0080","":"\\u0081","":"\\u0082","":"\\u0083","":"\\u0084","":"\\u0085","":"\\u0086","":"\\u0087","":"\\u0088","":"\\u0089","":"\\u008a","":"\\u008b","":"\\u008c","":"\\u008d","":"\\u008e","":"\\u008f","":"\\u0090","":"\\u0091","":"\\u0092","":"\\u0093","":"\\u0094","":"\\u0095","":"\\u0096","":"\\u0097","":"\\u0098","":"\\u0099","":"\\u009a","":"\\u009b","":"\\u009c","":"\\u009d","":"\\u009e","":"\\u009f","­":"\\u00ad","؀":"\\u0600","؁":"\\u0601","؂":"\\u0602","؃":"\\u0603","؄":"\\u0604","܏":"\\u070f","឴":"\\u17b4","឵":"\\u17b5","‌":"\\u200c","‍":"\\u200d","‎":"\\u200e","‏":"\\u200f","\u2028":"\\u2028","\u2029":"\\u2029","‪":"\\u202a","‫":"\\u202b","‬":"\\u202c","‭":"\\u202d","‮":"\\u202e"," ":"\\u202f","⁠":"\\u2060","⁡":"\\u2061","⁢":"\\u2062","⁣":"\\u2063","⁤":"\\u2064","⁥":"\\u2065","⁦":"\\u2066","⁧":"\\u2067","⁨":"\\u2068","⁩":"\\u2069","⁪":"\\u206a","⁫":"\\u206b","⁬":"\\u206c","⁭":"\\u206d","⁮":"\\u206e","⁯":"\\u206f","﻿":"\\ufeff","￰":"\\ufff0","￱":"\\ufff1","￲":"\\ufff2","￳":"\\ufff3","￴":"\\ufff4","￵":"\\ufff5","￶":"\\ufff6","￷":"\\ufff7","￸":"\\ufff8","￹":"\\ufff9","￺":"\\ufffa","￻":"\\ufffb","￼":"\\ufffc","�":"\\ufffd","￾":"\\ufffe","￿":"\\uffff"},rr=/[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,ir,sr=JSON&&JSON[P]||function(e){return tr[tn]=0,tr.test(e)&&(e=e[Mn](tr,function(e){return nr[e]})),'"'+e+'"'},or=function(e){var t,n={},r=[];for(t=0;t<65536;t++)r[Dt](String.fromCharCode(t));return e[tn]=0,r.join("")[Mn](e,function(e){return n[e]="\\u"+("0000"+e.charCodeAt(0)[yn](16))[a](-4),""}),e[tn]=0,n};Kn.quote=function(e){var t=sr(e);return rr[tn]=0,rr.test(t)?(ir||(ir=or(rr)),t[Mn](rr,function(e){return ir[e]})):t};var ur=[Ct,U,R,$,tt,Q,K,J,pt];Kn[Pn]=function(){var e={};for(var t=0;t<ur[w];t++){var n=ur[t];e[n]=gr[n]&&gr[n][p]()}return e},Kn[Nn]=function(e,t,n){var r={},i=[];t||(t=ur);for(var s=0;s<t[w];s++){var o=t[s];r[o]=e[o]}var u=function(e){var t=e.shift();r[t]?i[Dt](t):e[w]>0&&u(e)};return n[Ct]!==N&&u([Ct]),r[R]&&!n[it]?i[Dt](R):r[U]&&!n[Un]&&!n[it]?i[Dt](U):u([$,tt]),r[K]&&!n[it]?i[Dt](K):r[Q]&&!n[Un]&&!n[it]?i[Dt](Q):u([J,pt]),i};var ar="_sockjs_global";Kn.createHook=function(){var e="a"+Kn[s](8);if(!(ar in Jn)){var t={};Jn[ar]=function(e){return e in t||(t[e]={id:e,del:function(){delete t[e]}}),t[e]}}return Jn[ar](e)},Kn[zt]=function(e){Kn[T](F,e)},Kn[T]=function(e,t){typeof Jn[H]!==m?Jn[H](e,t,N):($n[T](wt+e,t),Jn[T](wt+e,t))},Kn[Wn]=function(e){Kn[Nt](F,e)},Kn[Nt]=function(e,t){typeof Jn[H]!==m?Jn[Gt](e,t,N):($n[Nt](wt+e,t),Jn[Nt](wt+e,t))};var fr={},lr=N,cr=function(){for(var e in fr)fr[e](),delete fr[e]},hr=function(){if(lr)return;lr=f,cr()};Kn[T]("unload",hr),Kn[Y]=function(e){var t=Kn[s](8);return fr[t]=e,lr&&Kn[kt](cr),t},Kn[G]=function(e){e in fr&&delete fr[e]},Kn[rn]=function(e,t){var n=$n[l](en),r,i,s=function(){clearTimeout(r);try{n[qt]=o}catch(e){}n[L]=o},u=function(){n&&(s(),setTimeout(function(){n&&n[vt][rt](n),n=o},0),Kn[G](i))},a=function(e){n&&(u(),t(e))},f=function(e,t){try{n&&n[W]&&n[W][g](e,t)}catch(r){}};return n.src=e,n.style.display=Fn,n.style.position=In,n[L]=function(){a(L)},n[qt]=function(){clearTimeout(r),r=setTimeout(function(){a("onload timeout")},2e3)},$n.body[X](n),r=setTimeout(function(){a(Xn)},15e3),i=Kn[Y](u),{post:f,cleanup:u,loaded:s}},Kn[jn]=function(e,t){var n=new ActiveXObject(Bn),r,i,s,u=function(){clearTimeout(r)},a=function(){n&&(u(),Kn[G](i),s[vt][rt](s),s=n=o,CollectGarbage())},f=function(e){n&&(a(),t(e))},c=function(e,t){try{s&&s[W]&&s[W][g](e,t)}catch(n){}};n.open(),n.write('<html><script>document.domain="'+document.domain+'";'+"</s"+"cript></html>"),n[O](),n.parentWindow[er]=Jn[er];var h=n[l]("div");return n.body[X](h),s=n[l](en),h[X](s),s.src=e,r=setTimeout(function(){f(Xn)},15e3),i=Kn[Y](a),{post:c,cleanup:a,loaded:u}};var pr=function(){};pr[e]=new Yn([on,u]),pr[e][Cn]=function(e,t,r,i){var s=this;try{s.xhr=new XMLHttpRequest}catch(o){}if(!s.xhr)try{s.xhr=new Jn[Ot]("Microsoft.XMLHTTP")}catch(o){}if(Jn[Ot]||Jn[Ft])t+=(t[A]("?")===-1?"?":"&")+"t="+ +(new Date);s[x]=Kn[Y](function(){s[M](f)});try{s.xhr.open(e,t,f)}catch(a){s[Et](u,0,""),s[M]();return}if(!i||!i.no_credentials)s.xhr[ct]="true";if(i&&i.headers)for(var l in i.headers)s.xhr.setRequestHeader(l,i.headers[l]);s.xhr[c]=function(){if(s.xhr){var e=s.xhr;switch(e[n]){case 3:try{var t=e.status,r=e[yt]}catch(e){}t===1223&&(t=204),r&&r[w]>0&&s[Et](on,t,r);break;case 4:var t=e.status;t===1223&&(t=204),s[Et](u,t,e[yt]),s[M](N)}}},s.xhr.send(r)},pr[e][M]=function(e){var t=this;if(!t.xhr)return;Kn[G](t[x]),t.xhr[c]=function(){};if(e)try{t.xhr[wn]()}catch(n){}t[x]=t.xhr=o},pr[e][O]=function(){var e=this;e.nuke(),e[M](f)};var dr=Kn[Qt]=function(){var e=this,t=arguments;Kn[kt](function(){e[Cn][Z](e,t)})};dr[e]=new pr;var vr=Kn[d]=function(e,t,n){var r=this;Kn[kt](function(){r[Cn](e,t,n,{no_credentials:f})})};vr[e]=new pr;var mr=Kn[un]=function(e,t,n){var r=this;Kn[kt](function(){r[Cn](e,t,n)})};mr[e]=new Yn([on,u]),mr[e][Cn]=function(e,t,n){var r=this,i=new XDomainRequest;t+=(t[A]("?")===-1?"?":"&")+"t="+ +(new Date);var s=i[nn]=i[L]=function(){r[Et](u,0,""),r[M](N)};i.onprogress=function(){r[Et](on,200,i[yt])},i[qt]=function(){r[Et](u,200,i[yt]),r[M](N)},r.xdr=i,r[x]=Kn[Y](function(){r[M](f)});try{r.xdr.open(e,t),r.xdr.send(n)}catch(o){s()}},mr[e][M]=function(e){var t=this;if(!t.xdr)return;Kn[G](t[x]),t.xdr[nn]=t.xdr[L]=t.xdr.onprogress=t.xdr[qt]=o;if(e)try{t.xdr[wn]()}catch(n){}t[x]=t.xdr=o},mr[e][O]=function(){var e=this;e.nuke(),e[M](f)},Kn[Sn]=function(){return Jn[Pt]&&ct in new XMLHttpRequest?1:Jn[Ft]&&$n.domain?2:Or[p]()?3:4};var gr=function(e,t,r){if(this===Jn)return new gr(e,t,r);var s=this,u;s[i]={devel:N,debug:N,protocols_whitelist:[],info:undefined,rtt:undefined},r&&Kn[Bt](s[i],r),s[Yt]=Kn.amendUrl(e),s._server=s[i].server||Kn[Kt](1e3),s[i][st]&&s[i][st][w]?u=s[i][st]:(typeof t=="string"&&t[w]>0?u=[t]:Kn.isArray(t)?u=t:u=o,u&&s[Tn]('Deprecated API: Use "protocols_whitelist" option instead of supplying protocol list as a second parameter to SockJS constructor.')),s[It]=[],s[y]=o,s[n]=gr[C],s._ir=jr(s[Yt]),s._ir[Ut]=function(e,t){s._ir=o,e?(s[i].info&&(e=Kn[Bt](e,s[i].info)),s[i].rtt&&(t=s[i].rtt),s._applyInfo(e,t,u),s[v]()):s[v](1002,"Can't connect to server",f)}};gr[e]=new Qn,gr[xn]="0.3.4",gr[C]=0,gr.OPEN=1,gr.CLOSING=2,gr.CLOSED=3,gr[e][Tn]=function(){this[i].debug&&Kn.log[Z](Kn,arguments)},gr[e][Vn]=function(){var e=this;e[n]===gr[C]?(e[h]&&(clearTimeout(e[h]),e[h]=o),e[n]=gr.OPEN,e[r](new Gn("open"))):e[v](1006,"Server lost session")},gr[e][St]=function(e){var t=this;if(t[n]!==gr.OPEN)return;t[r](new Gn(F,{data:e}))},gr[e][pn]=function(e){var t=this;if(t[n]!==gr.OPEN)return;t[r](new Gn("heartbeat",{}))},gr[e][v]=function(e,t,i){var s=this;if(s[n]!==gr[C]&&s[n]!==gr.OPEN&&s[n]!==gr.CLOSING)throw new Error(Jt);s._ir&&(s._ir.nuke(),s._ir=o),s[k]&&(s[k][I](),s[k]=o);var u=new Gn(O,{code:e,reason:t,wasClean:Kn[dt](e)});if(!Kn[dt](e)&&s[n]===gr[C]&&!i){if(s[ht](u))return;u=new Gn(O,{code:2e3,reason:"All transports failed",wasClean:N,last_event:u})}s[n]=gr.CLOSED,Kn[kt](function(){s[r](u)})},gr[e][E]=function(e){var t=this,n=e[a](0,1);switch(n){case"o":t[Vn]();break;case"a":var r=JSON[zn](e[a](1)||"[]");for(var i=0;i<r[w];i++)t[St](r[i]);break;case"m":var r=JSON[zn](e[a](1)||"null");t[St](r);break;case"c":var r=JSON[zn](e[a](1)||"[]");t[v](r[0],r[1]);break;case"h":t[pn]()}},gr[e][ht]=function(e){var t=this;t[y]&&(t[Tn]("Closed transport:",t[y],""+e),t[y]=o),t[h]&&(clearTimeout(t[h]),t[h]=o);for(;;){var r=t[y]=t[It].shift();if(!r)return N;if(gr[r]&&gr[r][ut]===f&&(!$n.body||typeof $n[n]!==m&&$n[n]!==Dn))return t[It].unshift(r),t[y]="waiting-for-load",Kn[T]("load",function(){t[ht]()}),f;if(!!gr[r]&&!!gr[r][p](t[i])){var u=gr[r][S]||1,a=(t[i].rto||0)*u||5e3;t[h]=Kn[kt](a,function(){t[n]===gr[C]&&t[v](2007,"Transport timeouted")});var l=Kn[s](8),c=t[Yt]+At+t._server+At+l;return t[Tn]("Opening transport:",r," url:"+c," RTO:"+t[i].rto),t[k]=new gr[r](t,c,t[Yt]),f}t[Tn]("Skipping transport:",r)}},gr[e][O]=function(e,t){var r=this;if(e&&!Kn[dt](e))throw new Error("INVALID_ACCESS_ERR");return r[n]!==gr[C]&&r[n]!==gr.OPEN?N:(r[n]=gr.CLOSING,r[v](e||1e3,t||"Normal closure"),f)},gr[e].send=function(e){var t=this;if(t[n]===gr[C])throw new Error(Jt);return t[n]===gr.OPEN&&t[k][An](Kn.quote(""+e)),f},gr[e]._applyInfo=function(e,t,n){var r=this;r[i].info=e,r[i].rtt=t,r[i].rto=Kn.countRTO(t),r[i].info[it]=!$n.domain;var s=Kn[Pn]();r[It]=Kn[Nn](s,n,e)};var yr=gr[Ct]=function(e,t){var n=this,r=t+"/websocket";r[a](0,5)==="https"?r="wss"+r[a](5):r="ws"+r[a](4),n.ri=e,n.url=r;var i=Jn.WebSocket||Jn.MozWebSocket;n.ws=new i(n.url),n.ws[j]=function(e){n.ri[E](e.data)},n[x]=Kn[Y](function(){n.ws[O]()}),n.ws[kn]=function(){n.ri[E](Kn[b](1006,"WebSocket connection broken"))}};yr[e][An]=function(e){this.ws.send("["+e+"]")},yr[e][I]=function(){var e=this,t=e.ws;t&&(t[j]=t[kn]=o,t[O](),Kn[G](e[x]),e[x]=e.ri=e.ws=o)},yr[p]=function(){return!!Jn.WebSocket||!!Jn.MozWebSocket},yr[S]=2;var br=function(){};br[e][bt]=function(e){var t=this;t[nt]=[],t.sender=e},br[e][An]=function(e){var t=this;t[nt][Dt](e),t[ot]||t[Rt]()},br[e][vn]=function(){var e=this,t;e[ot]=function(){e[ot]=o,clearTimeout(t)},t=Kn[kt](25,function(){e[ot]=o,e[Rt]()})},br[e][Rt]=function(){var e=this;if(e[nt][w]>0){var t="["+e[nt].join(",")+"]";e[ot]=e.sender(e[lt],t,function(t,n){e[ot]=o,t===N?e.ri[v](1006,"Sending error "+n):e[vn]()}),e[nt]=[]}},br[e][On]=function(){var e=this;e[bn]&&e[bn](),e[bn]=o};var wr=function(e,t,r){var i=this;if(!(fn in i)){var u=i[fn]=$n[l]("form"),a=i._send_area=$n[l]("textarea");a.name="d",u.style.display=Fn,u.style.position=In,u.method=_n,u.enctype="application/x-www-form-urlencoded",u.acceptCharset="UTF-8",u[X](a),$n.body[X](u)}var u=i[fn],a=i._send_area,h="a"+Kn[s](8);u.target=h,u.action=e+"/jsonp_send?i="+h;var p;try{p=$n[l]('<iframe name="'+h+'">')}catch(d){p=$n[l](en),p.name=h}p.id=h,u[X](p),p.style.display=Fn;try{a.value=t}catch(v){Kn.log("Your browser is seriously broken. Go home! "+v[F])}u.submit();var m=function(e){if(!p[L])return;p[c]=p[L]=p[qt]=o,Kn[kt](500,function(){p[vt][rt](p),p=o}),a.value="",r(f)};return p[L]=p[qt]=m,p[c]=function(e){p[n]==Dn&&m()},m},Er=function(e){return function(t,n,r){var i=new e(_n,t+"/xhr_send",n);return i[Ut]=function(e,t){r(e===200||e===204,"http status "+e)},function(e){r(N,e)}}},Sr=function(e,t){var r,i=$n[l]("script"),u,a=function(e){u&&(u[vt][rt](u),u=o),i&&(clearTimeout(r),i[vt][rt](i),i[c]=i[L]=i[qt]=i[gn]=o,i=o,t(e),t=o)},h=N,p=o;i.id="a"+Kn[s](8),i.src=e,i.type="text/javascript",i.charset="UTF-8",i[L]=function(e){p||(p=setTimeout(function(){h||a(Kn[b](1006,"JSONP script loaded abnormally (onerror)"))},1e3))},i[qt]=function(e){a(Kn[b](1006,"JSONP script loaded abnormally (onload)"))},i[c]=function(e){if(/loaded|closed/.test(i[n])){if(i&&i.htmlFor&&i[gn]){h=f;try{i[gn]()}catch(t){}}i&&a(Kn[b](1006,"JSONP script loaded abnormally (onreadystatechange)"))}};if(typeof i[Rn]===m&&$n[T])if(!/opera/i.test(navigator[sn])){try{i.htmlFor=i.id,i.event=gn}catch(d){}i[Rn]=f}else u=$n[l]("script"),u.text="try{var a = document.getElementById('"+i.id+"'); if(a)a.onerror();}catch(x){};",i[Rn]=u[Rn]=N;typeof i[Rn]!==m&&(i[Rn]=f),r=setTimeout(function(){a(Kn[b](1006,"JSONP script loaded abnormally (timeout)"))},35e3);var v=$n.getElementsByTagName("head")[0];return v.insertBefore(i,v.firstChild),u&&v.insertBefore(u,v.firstChild),a},xr=gr[pt]=function(e,t){Kn[B]();var n=this;n.ri=e,n[lt]=t,n[bt](wr),n[Ht]()};xr[e]=new br,xr[e][Ht]=function(){var e=this,t=function(t){e[mt]=o,t&&(e[hn]||e.ri[E](t)),e[hn]||e[Ht]()};e[mt]=Tr(e[lt]+"/jsonp",Sr,t)},xr[p]=function(){return f},xr[ut]=f,xr[e][I]=function(){var e=this;e[hn]=f,e[mt]&&e[mt](),e.ri=e[mt]=o,e[On]()};var Tr=function(e,t,n){var r="a"+Kn[s](6),i=e+"?c="+escape(er+"."+r),o=0,u=function(e){switch(o){case 0:delete Jn[er][r],n(e);break;case 1:n(e),o=2;break;case 2:delete Jn[er][r]}},a=t(i,u);Jn[er][r]=a;var f=function(){Jn[er][r]&&(o=1,Jn[er][r](Kn[b](1e3,"JSONP user aborted read")))};return f},Nr=function(){};Nr[e]=new br,Nr[e].run=function(e,t,n,r,i){var s=this;s.ri=e,s[lt]=t,s[bt](Er(i)),s.poll=new Xr(e,r,t+n,i)},Nr[e][I]=function(){var e=this;e.poll&&(e.poll[wn](),e.poll=o)};var Cr=gr[R]=function(e,t){this.run(e,t,cn,Qr,Kn[Qt])};Cr[e]=new Nr,Cr[p]=function(){return Jn[Pt]&&ct in new XMLHttpRequest&&!/opera/i.test(navigator[sn])},Cr[S]=2,Cr[ut]=f;var kr=gr[U]=function(e,t){this.run(e,t,cn,Qr,Kn[un])};kr[e]=new Nr,kr[p]=function(){return!!Jn[Ft]},kr[S]=2;var Lr=gr[K]=function(e,t){this.run(e,t,qn,Qr,Kn[Qt])};Lr[e]=new Nr,Lr[p]=Cr[p],Lr[S]=2;var Ar=gr[Q]=function(e,t){this.run(e,t,qn,Qr,Kn[un])};Ar[e]=new Nr,Ar[p]=kr[p],Ar[S]=2;var Or=function(){};Or[e][V]=function(e,t,n){var r=this;r.ri=e,r[mn]=Kn.getOrigin(n),r.base_url=n,r[lt]=t;var o=n+"/iframe.html";r.ri[i].devel&&(o+="?t="+ +(new Date)),r[Zt]=Kn[s](8),o+="#"+r[Zt],r[q]=Kn[rn](o,function(e){r.ri[v](1006,"Unable to load an iframe ("+e+")")}),r[gt]=Kn.bind(r[j],r),Kn[zt](r[gt])},Or[e][I]=function(){var e=this;if(e[q]){Kn[Wn](e[gt]);try{e[q][en][W]&&e[g]("c")}catch(t){}e[q].cleanup(),e[q]=o,e[gt]=e[q]=o}},Or[e][j]=function(e){var t=this;if(e[mn]!==t[mn])return;var n=e.data[a](0,8),r=e.data[a](8,9),i=e.data[a](9);if(n!==t[Zt])return;switch(r){case"s":t[q].loaded(),t[g]("s",JSON[P]([gr[xn],t[y],t[lt],t.base_url]));break;case"t":t.ri[E](i)}},Or[e][g]=function(e,t){var n=this;n[q].post(n[Zt]+e+(t||""),n[mn])},Or[e][An]=function(e){this[g]("m",e)},Or[p]=function(){var e=navigator&&navigator[sn]&&navigator[sn][A]("Konqueror")!==-1;return(typeof Jn[g]===Lt||typeof Jn[g]=="object")&&!e};var Mr,_r=function(e,t){parent!==Jn?parent[g](Mr+e+(t||""),"*"):Kn.log("Can't postMessage, no parent window.",e,t)},Dr=function(){};Dr[e][v]=function(e,t){_r("t",Kn[b](e,t))},Dr[e][E]=function(e){_r("t",e)},Dr[e]._doSend=function(e){this[k][An](e)},Dr[e]._doCleanup=function(){this[k][I]()},Kn[ft]=undefined,gr.bootstrap_iframe=function(){var e;Mr=$n[Wt].hash[a](1);var t=function(t){if(t.source!==parent)return;typeof Kn[ft]===m&&(Kn[ft]=t[mn]);if(t[mn]!==Kn[ft])return;var n=t.data[a](0,8),r=t.data[a](8,9),i=t.data[a](9);if(n!==Mr)return;switch(r){case"s":var s=JSON[zn](i),u=s[0],f=s[1],l=s[2],c=s[3];u!==gr[xn]&&Kn.log('Incompatibile SockJS! Main site uses: "'+u+'", the iframe:'+' "'+gr[xn]+'".');if(!Kn[an](l)||!Kn[an](c)){Kn.log(_);return}if(!Kn[z](l)||!Kn[z](c)){Kn.log("Can't connect to different domain from within an iframe. ("+JSON[P]([Jn[Wt].href,l,c])+")");return}e=new Dr,e[k]=new Dr[f](e,l,c);break;case"m":e._doSend(i);break;case"c":e&&e._doCleanup(),e=o}};Kn[zt](t),_r("s")};var Pr=function(e,t){var n=this;Kn[kt](function(){n.doXhr(e,t)})};Pr[e]=new Yn([u]),Pr[e].doXhr=function(e,t){var n=this,r=(new Date).getTime(),i=new t("GET",e+"/info"),s=Kn[kt](8e3,function(){i[nn]()});i[Ut]=function(e,t){clearTimeout(s),s=o;if(e===200){var i=(new Date).getTime()-r,a=JSON[zn](t);typeof a!="object"&&(a={}),n[Et](u,a,i)}else n[Et](u)},i[nn]=function(){i[O](),n[Et](u)}};var Hr=function(e){var t=this,n=function(){var n=new Or;n[y]=Tt;var r=function(e){if(typeof e=="string"&&e.substr(0,1)==="m"){var r=JSON[zn](e.substr(1)),i=r[0],s=r[1];t[Et](u,i,s)}else t[Et](u);n[I](),n=o},i={_options:{},_didClose:r,_didMessage:r};n[V](i,e,e)};$n.body?n():Kn[T]("load",n)};Hr[e]=new Yn([u]);var Br=function(){var e=this;Kn[kt](function(){e[Et](u,{},2e3)})};Br[e]=new Yn([u]);var jr=function(e){if(Kn[z](e))return new Pr(e,Kn[d]);switch(Kn[Sn]()){case 1:return new Pr(e,Kn[d]);case 2:return new Pr(e,Kn[un]);case 3:return new Hr(e);default:return new Br}},Fr=Dr[Tt]=function(e,t,n){var r=new Pr(n,Kn[d]);r[Ut]=function(t,n){e[E]("m"+JSON[P]([t,n])),e[v]()}};Fr[e][I]=function(){};var Ir=gr[$]=function(){var e=this;e[y]=Mt,e[V][Z](e,arguments)};Ir[e]=new Or,Ir[p]=function(){return"EventSource"in Jn&&Or[p]()},Ir[ut]=f,Ir[S]=3;var qr=Dr[Mt]=function(e,t){this.run(e,t,"/eventsource",Vr,Kn[d])};qr[e]=new Nr;var Rr=gr[J]=function(){var e=this;e[y]=_t,e[V][Z](e,arguments)};Rr[e]=new Or,Rr[p]=function(){return Jn[Pt]&&Or[p]()},Rr[ut]=f,Rr[S]=3;var Ur=Dr[_t]=function(e,t){this.run(e,t,qn,Qr,Kn[d])};Ur[e]=new Nr;var zr=gr[tt]=function(){var e=this;e[y]=Vt,e[V][Z](e,arguments)};zr[e]=new Or,zr[p]=function(){return Or[p]()},zr[ut]=f,zr[S]=3;var Wr=Dr[Vt]=function(e,t){this.run(e,t,"/htmlfile",Kr,Kn[d])};Wr[e]=new Nr;var Xr=function(e,t,n,r){var i=this;i.ri=e,i.Receiver=t,i.recv_url=n,i.AjaxObject=r,i[Xt]()};Xr[e][Xt]=function(){var e=this,t=e.poll=new e.Receiver(e.recv_url,e.AjaxObject),n=0;t[j]=function(t){n+=1,e.ri[E](t.data)},t[kn]=function(n){e.poll=t=t[j]=t[kn]=o,e[Ln]||(n.reason===at?e.ri[v](1006,"Polling error ("+n.reason+")"):e[Xt]())}},Xr[e][wn]=function(){var e=this;e[Ln]=f,e.poll&&e.poll[wn]()};var Vr=function(e){var t=this,i=new EventSource(e);i[j]=function(e){t[r](new Gn(F,{data:unescape(e.data)}))},t[dn]=i[L]=function(e,s){var u=s?Hn:i[n]!==2?ln:at;t[dn]=i[j]=i[L]=o,i[O](),i=o,Kn[kt](200,function(){t[r](new Gn(O,{reason:u}))})}};Vr[e]=new Qn,Vr[e][wn]=function(){var e=this;e[dn]&&e[dn]({},f)};var $r,Jr=function(){if($r===undefined)if(Ot in Jn)try{$r=!!(new ActiveXObject(Bn))}catch(e){}else $r=N;return $r},Kr=function(e){var t=this;Kn[B](),t.id="a"+Kn[s](6,26),e+=(e[A]("?")===-1?"?":"&")+"c="+escape(er+"."+t.id);var n=Jr()?Kn[jn]:Kn[rn],i;Jn[er][t.id]={start:function(){i.loaded()},message:function(e){t[r](new Gn(F,{data:e}))},stop:function(){t[D]({},ln)}},t[D]=function(e,n){i.cleanup(),t[D]=i=o,delete Jn[er][t.id],t[r](new Gn(O,{reason:n}))},i=n(e,function(e){t[D]({},at)})};Kr[e]=new Qn,Kr[e][wn]=function(){var e=this;e[D]&&e[D]({},Hn)};var Qr=function(e,t){var n=this,i=0;n.xo=new t(_n,e,o),n.xo.onchunk=function(e,t){if(e!==200)return;for(;;){var s=t[a](i),o=s[A]("\n");if(o===-1)break;i+=o+1;var u=s[a](0,o);n[r](new Gn(F,{data:u}))}},n.xo[Ut]=function(e,t){n.xo.onchunk(e,t),n.xo=o;var i=e===200?ln:at;n[r](new Gn(O,{reason:i}))}};return Qr[e]=new Qn,Qr[e][wn]=function(){var e=this;e.xo&&(e.xo[O](),e[r](new Gn(O,{reason:Hn})),e.xo=o)},gr.getUtils=function(){return Kn},gr.getIframeTransport=function(){return Or},gr}(),"_sockjs_onload"in window&&setTimeout(_sockjs_onload,1),typeof define=="function"&&define.amd&&define("sockjs",[],function(){return SockJS});