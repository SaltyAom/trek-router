"use strict";
!function(a, b) {
    for(var c in b)Object.defineProperty(a, c, {
        enumerable: !0,
        get: b[c]
    });
}(exports, {
    parseUrl: ()=>c,
    parseQuery: ()=>d
});
const a = /^\w+:\/\/.*?\//g, b = /([^?=&]+)(=([^&]*))?/g, c = (b)=>{
    let [c, d] = b.replace(a, '/').split('?');
    return [
        c,
        d
    ];
}, d = (a)=>(a.match(b) || []).reduce((a, b)=>{
        let [c, d] = b.split('=');
        return a[c] = d, a;
    }, {});

//# sourceMappingURL=libs.js.map