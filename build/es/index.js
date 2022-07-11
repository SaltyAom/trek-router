'use strict';
import { parse as a } from 'querystring';
let [b, c, d, e, f, g] = [
    0,
    1,
    2,
    42,
    47,
    58
];
export const removeHostnamePath = (a)=>{
    if (47 === a.charCodeAt(0)) return a;
    let b = a.length, c = 1, d = 0;
    for(; c < b; c++)if (47 === a.charCodeAt(c)) {
        if (d < 2) d++;
        else break;
    }
    return a.slice(c);
};
let h = (a)=>{
    let b = a.indexOf('?');
    return -1 === b ? [
        a,
        ''
    ] : [
        a.slice(0, b),
        a.slice(b + 1)
    ];
};
class i {
    constructor(a = '/', c = [], d = b, e = Object.create(null)){
        this.label = a.charCodeAt(0), this.prefix = a, this.children = c, this.kind = d, this.map = e;
    }
    addChild(a) {
        this.children.push(a);
    }
    findChild(a, b, c, d, e = 0) {
        for(c = this.children.length; e < c; e++)if (a === (null == (d = this.children[e]) ? void 0 : d.label) && b === d.kind) return d;
    }
    findChildWithLabel(a, b, c, d = 0) {
        for(b = this.children.length; d < b; d++)if (a === (null == (c = this.children[d]) ? void 0 : c.label)) return c;
    }
    findChildByKind(a, b, c, d = 0) {
        for(b = this.children.length; d < b; d++)if (a === (null == (c = this.children[d]) ? void 0 : c.kind)) return c;
    }
    addHandler(a, b, c) {
        this.map[a] = {
            handler: b,
            pnames: c
        };
    }
    findHandler(a) {
        return this.map[a];
    }
}
export default class j {
    #a;
    constructor(){
        this.#a = new i(), this.routes = [];
    }
    add(a, h, i) {
        let [j, k, l] = [
            0,
            h.length,
            []
        ], m, n;
        for(this.routes.push([
            a,
            h,
            i
        ]); j < k; ++j)if ((m = h.charCodeAt(j)) === g) {
            for(n = j + 1, this.#b(a, h.substring(0, j), b); j < k && h.charCodeAt(j) !== f;)j++;
            if (l.push(h.substring(n, j)), h = h.substring(0, n) + h.substring(j), j = n, k = h.length, j === k) {
                this.#b(a, h.substring(0, j), c, l, i);
                return;
            }
            this.#b(a, h.substring(0, j), c, l);
        } else if (m === e) {
            this.#b(a, h.substring(0, j), b), l.push('*'), this.#b(a, h.substring(0, k), d, l, i);
            return;
        }
        this.#b(a, h, b, l, i);
    }
     #b(j, k, l, m, n) {
        let [o] = [
            this.#a
        ], p, q, r, s, t, u, v;
        for(;;){
            for(p = o.prefix, q = k.length, r = p.length, s = 0, t = q < r ? q : r; s < t && k.charCodeAt(s) === p.charCodeAt(s);)s++;
            if (s < r) u = new i(p.substring(s), o.children, o.kind, o.map), o.children = [
                u
            ], o.label = p.charCodeAt(0), o.prefix = p.substring(0, s), o.map = Object.create(null), o.kind = b, s === q ? (o.addHandler(j, n, m), o.kind = l) : ((u = new i(k.substring(s), [], l)).addHandler(j, n, m), o.addChild(u));
            else if (s < q) {
                if (k = k.substring(s), void 0 !== (v = o.findChildWithLabel(k.charCodeAt(0)))) {
                    o = v;
                    continue;
                }
                (u = new i(k, [], l)).addHandler(j, n, m), o.addChild(u);
            } else void 0 !== n && o.addHandler(j, n, m);
            return;
        }
    }
    find(b, c) {
        let [d, e] = h(removeHostnamePath(c)), f = this.#c(b, d, void 0, 0, [
            void 0,
            []
        ]);
        return e && (f[2] = a(e)), f;
    }
     #c(w, x, y, z, A) {
        y = y || this.#a;
        let B = x.length, C = y.prefix, D = A[1], E, F, G, H, I, J;
        if (0 === B || x === C) {
            let K = y.findHandler(w);
            if (void 0 !== (A[0] = K && K.handler)) {
                let L = K.pnames;
                if (void 0 !== L) for(E = 0, G = L.length; E < G; ++E)D[E] = [
                    L[E],
                    D[E]
                ];
            }
            return A;
        }
        for(F = C.length, G = 0, H = B < F ? B : F; G < H && x.charCodeAt(G) === C.charCodeAt(G);)G++;
        if (G === F && (x = x.substring(G)), J = x, void 0 !== (I = y.findChild(x.charCodeAt(0), b))) {
            if (this.#c(w, x, I, z, A), void 0 !== A[0]) return A;
            x = J;
        }
        if (G !== F) return A;
        if (void 0 !== (I = y.findChildByKind(c))) {
            for(G = x.length, E = 0; E < G && x.charCodeAt(E) !== f;)E++;
            if (D[z] = x.substring(0, E), z++, J = x, x = x.substring(E), this.#c(w, x, I, z, A), void 0 !== A[0]) return A;
            z--, D.pop(), x = J;
        }
        return void 0 !== (I = y.findChildByKind(d)) && (D[z] = x, x = '', this.#c(w, x, I, z, A)), A;
    }
};

//# sourceMappingURL=index.js.map