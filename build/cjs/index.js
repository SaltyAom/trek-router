"use strict";
Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: ()=>i
});
const a = require("./libs"), [b, c, d, e, f, g] = [
    0,
    1,
    2,
    42,
    47,
    58
];
class h {
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
class i {
    constructor(){
        this._tree = new h(), this.routes = [];
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
            for(n = j + 1, this._insert(a, h.substring(0, j), b); j < k && h.charCodeAt(j) !== f;)j++;
            if (l.push(h.substring(n, j)), h = h.substring(0, n) + h.substring(j), j = n, k = h.length, j === k) return void this._insert(a, h.substring(0, j), c, l, i);
            this._insert(a, h.substring(0, j), c, l);
        } else if (m === e) {
            this._insert(a, h.substring(0, j), b), l.push('*'), this._insert(a, h.substring(0, k), d, l, i);
            return;
        }
        this._insert(a, h, b, l, i);
    }
    _insert(a, c, d, e, f) {
        let [g] = [
            this._tree
        ], i, j, k, l, m, n, o;
        for(;;){
            for(i = g.prefix, j = c.length, k = i.length, l = 0, m = j < k ? j : k; l < m && c.charCodeAt(l) === i.charCodeAt(l);)l++;
            if (l < k) n = new h(i.substring(l), g.children, g.kind, g.map), g.children = [
                n
            ], g.label = i.charCodeAt(0), g.prefix = i.substring(0, l), g.map = Object.create(null), g.kind = b, l === j ? (g.addHandler(a, f, e), g.kind = d) : ((n = new h(c.substring(l), [], d)).addHandler(a, f, e), g.addChild(n));
            else if (l < j) {
                if (c = c.substring(l), void 0 !== (o = g.findChildWithLabel(c.charCodeAt(0)))) {
                    g = o;
                    continue;
                }
                (n = new h(c, [], d)).addHandler(a, f, e), g.addChild(n);
            } else void 0 !== f && g.addHandler(a, f, e);
            return;
        }
    }
    find(b, c) {
        let [d, e] = (0, a.parseUrl)(c), f = this._find(b, d, void 0, 0, [
            void 0,
            []
        ]);
        return f[2] = e ? (0, a.parseQuery)(e) : {}, f;
    }
    _find(a, e, g, h, i) {
        g = g || this._tree;
        let j = e.length, k = g.prefix, l = i[1], m, n, o, p, q, r;
        if (0 === j || e === k) {
            let s = g.findHandler(a);
            if (void 0 !== (i[0] = s && s.handler)) {
                let t = s.pnames;
                if (void 0 !== t) for(m = 0, o = t.length; m < o; ++m)l[m] = [
                    t[m],
                    l[m]
                ];
            }
            return i;
        }
        for(n = k.length, o = 0, p = j < n ? j : n; o < p && e.charCodeAt(o) === k.charCodeAt(o);)o++;
        if (o === n && (e = e.substring(o)), r = e, void 0 !== (q = g.findChild(e.charCodeAt(0), b))) {
            if (this._find(a, e, q, h, i), void 0 !== i[0]) return i;
            e = r;
        }
        if (o !== n) return i;
        if (void 0 !== (q = g.findChildByKind(c))) {
            for(o = e.length, m = 0; m < o && e.charCodeAt(m) !== f;)m++;
            if (l[h] = e.substring(0, m), h++, r = e, e = e.substring(m), this._find(a, e, q, h, i), void 0 !== i[0]) return i;
            h--, l.pop(), e = r;
        }
        return void 0 !== (q = g.findChildByKind(d)) && (l[h] = e, e = '', this._find(a, e, q, h, i)), i;
    }
}

//# sourceMappingURL=index.js.map