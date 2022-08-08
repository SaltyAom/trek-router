import { parseQuery as a, parseUrl as b } from './libs';
let [c, d, e, f, g, h] = [
    0,
    1,
    2,
    42,
    47,
    58
];
class i {
    constructor(a = '/', b = [], d = c, e = Object.create(null)){
        this.label = a.charCodeAt(0), this.prefix = a, this.children = b, this.kind = d, this.map = e;
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
    constructor(){
        this._tree = new i(), this.routes = [];
    }
    add(a, b, i) {
        let [j, k, l] = [
            0,
            b.length,
            []
        ], m, n;
        for(this.routes.push([
            a,
            b,
            i
        ]); j < k; ++j)if ((m = b.charCodeAt(j)) === h) {
            for(n = j + 1, this._insert(a, b.substring(0, j), c); j < k && b.charCodeAt(j) !== g;)j++;
            if (l.push(b.substring(n, j)), b = b.substring(0, n) + b.substring(j), j = n, k = b.length, j === k) return void this._insert(a, b.substring(0, j), d, l, i);
            this._insert(a, b.substring(0, j), d, l);
        } else if (m === f) {
            this._insert(a, b.substring(0, j), c), l.push('*'), this._insert(a, b.substring(0, k), e, l, i);
            return;
        }
        this._insert(a, b, c, l, i);
    }
    _insert(a, b, d, e, f) {
        let [g] = [
            this._tree
        ], h, j, k, l, m, n, o;
        for(;;){
            for(h = g.prefix, j = b.length, k = h.length, l = 0, m = j < k ? j : k; l < m && b.charCodeAt(l) === h.charCodeAt(l);)l++;
            if (l < k) n = new i(h.substring(l), g.children, g.kind, g.map), g.children = [
                n
            ], g.label = h.charCodeAt(0), g.prefix = h.substring(0, l), g.map = Object.create(null), g.kind = c, l === j ? (g.addHandler(a, f, e), g.kind = d) : ((n = new i(b.substring(l), [], d)).addHandler(a, f, e), g.addChild(n));
            else if (l < j) {
                if (b = b.substring(l), void 0 !== (o = g.findChildWithLabel(b.charCodeAt(0)))) {
                    g = o;
                    continue;
                }
                (n = new i(b, [], d)).addHandler(a, f, e), g.addChild(n);
            } else void 0 !== f && g.addHandler(a, f, e);
            return;
        }
    }
    find(c, d) {
        let [e, f] = b(d), g = this._find(c, e, void 0, 0, [
            void 0,
            []
        ]);
        return g[2] = f ? a(f) : {}, g;
    }
    _find(a, b, f, h, i) {
        f = f || this._tree;
        let j = b.length, k = f.prefix, l = i[1], m, n, o, p, q, r;
        if (0 === j || b === k) {
            let s = f.findHandler(a);
            if (void 0 !== (i[0] = s && s.handler)) {
                let t = s.pnames;
                if (void 0 !== t) for(m = 0, o = t.length; m < o; ++m)l[m] = [
                    t[m],
                    l[m]
                ];
            }
            return i;
        }
        for(n = k.length, o = 0, p = j < n ? j : n; o < p && b.charCodeAt(o) === k.charCodeAt(o);)o++;
        if (o === n && (b = b.substring(o)), r = b, void 0 !== (q = f.findChild(b.charCodeAt(0), c))) {
            if (this._find(a, b, q, h, i), void 0 !== i[0]) return i;
            b = r;
        }
        if (o !== n) return i;
        if (void 0 !== (q = f.findChildByKind(d))) {
            for(o = b.length, m = 0; m < o && b.charCodeAt(m) !== g;)m++;
            if (l[h] = b.substring(0, m), h++, r = b, b = b.substring(m), this._find(a, b, q, h, i), void 0 !== i[0]) return i;
            h--, l.pop(), b = r;
        }
        return void 0 !== (q = f.findChildByKind(e)) && (l[h] = b, b = '', this._find(a, b, q, h, i)), i;
    }
};

//# sourceMappingURL=index.js.map