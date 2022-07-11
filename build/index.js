'use strict';
!function(a, b) {
    for(var c in b)Object.defineProperty(a, c, {
        enumerable: !0,
        get: b[c]
    });
}(exports, {
    default: ()=>k,
    removeHostnamePath: ()=>h
});
const a = require("querystring"), [b, c, d, e, f, g] = [
    0,
    1,
    2,
    42,
    47,
    58
], h = (a)=>{
    if (47 === a.charCodeAt(0)) return a;
    let b = a.length, c = 1, d = 0;
    for(; c < b; c++)if (47 === a.charCodeAt(c)) {
        if (d < 2) d++;
        else break;
    }
    return a.slice(c);
}, i = (a)=>{
    let b = a.indexOf('?');
    return -1 === b ? [
        a,
        ''
    ] : [
        a.slice(0, b),
        a.slice(b + 1)
    ];
};
class j {
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
class k {
    #a;
    constructor(){
        this.#a = new j(), this.routes = [];
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
     #b(l, m, n, o, p) {
        let [q] = [
            this.#a
        ], r, s, t, u, v, w, x;
        for(;;){
            for(r = q.prefix, s = m.length, t = r.length, u = 0, v = s < t ? s : t; u < v && m.charCodeAt(u) === r.charCodeAt(u);)u++;
            if (u < t) w = new j(r.substring(u), q.children, q.kind, q.map), q.children = [
                w
            ], q.label = r.charCodeAt(0), q.prefix = r.substring(0, u), q.map = Object.create(null), q.kind = b, u === s ? (q.addHandler(l, p, o), q.kind = n) : ((w = new j(m.substring(u), [], n)).addHandler(l, p, o), q.addChild(w));
            else if (u < s) {
                if (m = m.substring(u), void 0 !== (x = q.findChildWithLabel(m.charCodeAt(0)))) {
                    q = x;
                    continue;
                }
                (w = new j(m, [], n)).addHandler(l, p, o), q.addChild(w);
            } else void 0 !== p && q.addHandler(l, p, o);
            return;
        }
    }
    find(b, c) {
        let [d, e] = i(h(c)), f = this.#c(b, d, void 0, 0, [
            void 0,
            []
        ]);
        return e && (f[2] = (0, a.parse)(e)), f;
    }
     #c(y, z, A, B, C) {
        A = A || this.#a;
        let D = z.length, E = A.prefix, F = C[1], G, H, I, J, K, L;
        if (0 === D || z === E) {
            let M = A.findHandler(y);
            if (void 0 !== (C[0] = M && M.handler)) {
                let N = M.pnames;
                if (void 0 !== N) for(G = 0, I = N.length; G < I; ++G)F[G] = [
                    N[G],
                    F[G]
                ];
            }
            return C;
        }
        for(H = E.length, I = 0, J = D < H ? D : H; I < J && z.charCodeAt(I) === E.charCodeAt(I);)I++;
        if (I === H && (z = z.substring(I)), L = z, void 0 !== (K = A.findChild(z.charCodeAt(0), b))) {
            if (this.#c(y, z, K, B, C), void 0 !== C[0]) return C;
            z = L;
        }
        if (I !== H) return C;
        if (void 0 !== (K = A.findChildByKind(c))) {
            for(I = z.length, G = 0; G < I && z.charCodeAt(G) !== f;)G++;
            if (F[B] = z.substring(0, G), B++, L = z, z = z.substring(G), this.#c(y, z, K, B, C), void 0 !== C[0]) return C;
            B--, F.pop(), z = L;
        }
        return void 0 !== (K = A.findChildByKind(d)) && (F[B] = z, z = '', this.#c(y, z, K, B, C)), C;
    }
}

//# sourceMappingURL=index.js.map