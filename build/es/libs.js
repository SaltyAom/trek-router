let a = /^\w+:\/\/.*?\//g, b = /([^?=&]+)(=([^&]*))?/g;
export const parseUrl = (b)=>{
    let [c, d] = b.replace(a, '/').split('?');
    return [
        c,
        d
    ];
};
export const parseQuery = (a)=>(a.match(b) || []).reduce((a, b)=>{
        let [c, d] = b.split('=');
        return a[c] = d, a;
    }, {});

//# sourceMappingURL=libs.js.map