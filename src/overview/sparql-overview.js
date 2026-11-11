var _n = Object.defineProperty, kn = Object.defineProperties;
var Tn = Object.getOwnPropertyDescriptors;
var wi = Object.getOwnPropertySymbols;
var Cn = Object.prototype.hasOwnProperty, An = Object.prototype.propertyIsEnumerable;
var Tt = Math.pow, bi = (s, e, t) => e in s ? _n(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, le = (s, e) => {
  for (var t in e || (e = {}))
    Cn.call(e, t) && bi(s, t, e[t]);
  if (wi)
    for (var t of wi(e))
      An.call(e, t) && bi(s, t, e[t]);
  return s;
}, _e = (s, e) => kn(s, Tn(e));
var ke = (s, e, t) => new Promise((i, r) => {
  var n = (h) => {
    try {
      a(t.next(h));
    } catch (l) {
      r(l);
    }
  }, o = (h) => {
    try {
      a(t.throw(h));
    } catch (l) {
      r(l);
    }
  }, a = (h) => h.done ? i(h.value) : Promise.resolve(h.value).then(n, o);
  a((t = t.apply(s, e)).next());
});
function hi(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var ut = { exports: {} }, Ei;
function Rn() {
  if (Ei) return ut.exports;
  Ei = 1;
  var s = typeof Reflect == "object" ? Reflect : null, e = s && typeof s.apply == "function" ? s.apply : function(y, b, S) {
    return Function.prototype.apply.call(y, b, S);
  }, t;
  s && typeof s.ownKeys == "function" ? t = s.ownKeys : Object.getOwnPropertySymbols ? t = function(y) {
    return Object.getOwnPropertyNames(y).concat(Object.getOwnPropertySymbols(y));
  } : t = function(y) {
    return Object.getOwnPropertyNames(y);
  };
  function i(g) {
    console && console.warn && console.warn(g);
  }
  var r = Number.isNaN || function(y) {
    return y !== y;
  };
  function n() {
    n.init.call(this);
  }
  ut.exports = n, ut.exports.once = E, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._eventsCount = 0, n.prototype._maxListeners = void 0;
  var o = 10;
  function a(g) {
    if (typeof g != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof g);
  }
  Object.defineProperty(n, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return o;
    },
    set: function(g) {
      if (typeof g != "number" || g < 0 || r(g))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + g + ".");
      o = g;
    }
  }), n.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, n.prototype.setMaxListeners = function(y) {
    if (typeof y != "number" || y < 0 || r(y))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + y + ".");
    return this._maxListeners = y, this;
  };
  function h(g) {
    return g._maxListeners === void 0 ? n.defaultMaxListeners : g._maxListeners;
  }
  n.prototype.getMaxListeners = function() {
    return h(this);
  }, n.prototype.emit = function(y) {
    for (var b = [], S = 1; S < arguments.length; S++) b.push(arguments[S]);
    var k = y === "error", C = this._events;
    if (C !== void 0)
      k = k && C.error === void 0;
    else if (!k)
      return !1;
    if (k) {
      var A;
      if (b.length > 0 && (A = b[0]), A instanceof Error)
        throw A;
      var G = new Error("Unhandled error." + (A ? " (" + A.message + ")" : ""));
      throw G.context = A, G;
    }
    var N = C[y];
    if (N === void 0)
      return !1;
    if (typeof N == "function")
      e(N, this, b);
    else
      for (var _ = N.length, z = v(N, _), S = 0; S < _; ++S)
        e(z[S], this, b);
    return !0;
  };
  function l(g, y, b, S) {
    var k, C, A;
    if (a(b), C = g._events, C === void 0 ? (C = g._events = /* @__PURE__ */ Object.create(null), g._eventsCount = 0) : (C.newListener !== void 0 && (g.emit(
      "newListener",
      y,
      b.listener ? b.listener : b
    ), C = g._events), A = C[y]), A === void 0)
      A = C[y] = b, ++g._eventsCount;
    else if (typeof A == "function" ? A = C[y] = S ? [b, A] : [A, b] : S ? A.unshift(b) : A.push(b), k = h(g), k > 0 && A.length > k && !A.warned) {
      A.warned = !0;
      var G = new Error("Possible EventEmitter memory leak detected. " + A.length + " " + String(y) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      G.name = "MaxListenersExceededWarning", G.emitter = g, G.type = y, G.count = A.length, i(G);
    }
    return g;
  }
  n.prototype.addListener = function(y, b) {
    return l(this, y, b, !1);
  }, n.prototype.on = n.prototype.addListener, n.prototype.prependListener = function(y, b) {
    return l(this, y, b, !0);
  };
  function c() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function d(g, y, b) {
    var S = { fired: !1, wrapFn: void 0, target: g, type: y, listener: b }, k = c.bind(S);
    return k.listener = b, S.wrapFn = k, k;
  }
  n.prototype.once = function(y, b) {
    return a(b), this.on(y, d(this, y, b)), this;
  }, n.prototype.prependOnceListener = function(y, b) {
    return a(b), this.prependListener(y, d(this, y, b)), this;
  }, n.prototype.removeListener = function(y, b) {
    var S, k, C, A, G;
    if (a(b), k = this._events, k === void 0)
      return this;
    if (S = k[y], S === void 0)
      return this;
    if (S === b || S.listener === b)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete k[y], k.removeListener && this.emit("removeListener", y, S.listener || b));
    else if (typeof S != "function") {
      for (C = -1, A = S.length - 1; A >= 0; A--)
        if (S[A] === b || S[A].listener === b) {
          G = S[A].listener, C = A;
          break;
        }
      if (C < 0)
        return this;
      C === 0 ? S.shift() : u(S, C), S.length === 1 && (k[y] = S[0]), k.removeListener !== void 0 && this.emit("removeListener", y, G || b);
    }
    return this;
  }, n.prototype.off = n.prototype.removeListener, n.prototype.removeAllListeners = function(y) {
    var b, S, k;
    if (S = this._events, S === void 0)
      return this;
    if (S.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : S[y] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete S[y]), this;
    if (arguments.length === 0) {
      var C = Object.keys(S), A;
      for (k = 0; k < C.length; ++k)
        A = C[k], A !== "removeListener" && this.removeAllListeners(A);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (b = S[y], typeof b == "function")
      this.removeListener(y, b);
    else if (b !== void 0)
      for (k = b.length - 1; k >= 0; k--)
        this.removeListener(y, b[k]);
    return this;
  };
  function f(g, y, b) {
    var S = g._events;
    if (S === void 0)
      return [];
    var k = S[y];
    return k === void 0 ? [] : typeof k == "function" ? b ? [k.listener || k] : [k] : b ? p(k) : v(k, k.length);
  }
  n.prototype.listeners = function(y) {
    return f(this, y, !0);
  }, n.prototype.rawListeners = function(y) {
    return f(this, y, !1);
  }, n.listenerCount = function(g, y) {
    return typeof g.listenerCount == "function" ? g.listenerCount(y) : w.call(g, y);
  }, n.prototype.listenerCount = w;
  function w(g) {
    var y = this._events;
    if (y !== void 0) {
      var b = y[g];
      if (typeof b == "function")
        return 1;
      if (b !== void 0)
        return b.length;
    }
    return 0;
  }
  n.prototype.eventNames = function() {
    return this._eventsCount > 0 ? t(this._events) : [];
  };
  function v(g, y) {
    for (var b = new Array(y), S = 0; S < y; ++S)
      b[S] = g[S];
    return b;
  }
  function u(g, y) {
    for (; y + 1 < g.length; y++)
      g[y] = g[y + 1];
    g.pop();
  }
  function p(g) {
    for (var y = new Array(g.length), b = 0; b < y.length; ++b)
      y[b] = g[b].listener || g[b];
    return y;
  }
  function E(g, y) {
    return new Promise(function(b, S) {
      function k(A) {
        g.removeListener(y, C), S(A);
      }
      function C() {
        typeof g.removeListener == "function" && g.removeListener("error", k), b([].slice.call(arguments));
      }
      x(g, y, C, { once: !0 }), y !== "error" && m(g, k, { once: !0 });
    });
  }
  function m(g, y, b) {
    typeof g.on == "function" && x(g, "error", y, b);
  }
  function x(g, y, b, S) {
    if (typeof g.on == "function")
      S.once ? g.once(y, b) : g.on(y, b);
    else if (typeof g.addEventListener == "function")
      g.addEventListener(y, function k(C) {
        S.once && g.removeEventListener(y, k), b(C);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof g);
  }
  return ut.exports;
}
var Lr = Rn();
function Ln() {
  const s = arguments[0];
  for (let e = 1, t = arguments.length; e < t; e++)
    if (arguments[e])
      for (const i in arguments[e]) s[i] = arguments[e][i];
  return s;
}
let he = Ln;
typeof Object.assign == "function" && (he = Object.assign);
function be(s, e, t, i) {
  const r = s._nodes.get(e);
  let n = null;
  return r && (i === "mixed" ? n = r.out && r.out[t] || r.undirected && r.undirected[t] : i === "directed" ? n = r.out && r.out[t] : n = r.undirected && r.undirected[t]), n;
}
function ce(s) {
  return typeof s == "object" && s !== null;
}
function Gr(s) {
  let e;
  for (e in s) return !1;
  return !0;
}
function we(s, e, t) {
  Object.defineProperty(s, e, {
    enumerable: !1,
    configurable: !1,
    writable: !0,
    value: t
  });
}
function Te(s, e, t) {
  const i = {
    enumerable: !0,
    configurable: !0
  };
  typeof t == "function" ? i.get = t : (i.value = t, i.writable = !1), Object.defineProperty(s, e, i);
}
function xi(s) {
  return !(!ce(s) || s.attributes && !Array.isArray(s.attributes));
}
function Gn() {
  let s = Math.floor(Math.random() * 256) & 255;
  return () => s++;
}
function ze() {
  const s = arguments;
  let e = null, t = -1;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let i = null;
      do {
        if (e === null) {
          if (t++, t >= s.length) return { done: !0 };
          e = s[t][Symbol.iterator]();
        }
        if (i = e.next(), i.done) {
          e = null;
          continue;
        }
        break;
      } while (!0);
      return i;
    }
  };
}
function Ke() {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return { done: !0 };
    }
  };
}
class li extends Error {
  constructor(e) {
    super(), this.name = "GraphError", this.message = e;
  }
}
class O extends li {
  constructor(e) {
    super(e), this.name = "InvalidArgumentsGraphError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(
      this,
      O.prototype.constructor
    );
  }
}
class P extends li {
  constructor(e) {
    super(e), this.name = "NotFoundGraphError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, P.prototype.constructor);
  }
}
class q extends li {
  constructor(e) {
    super(e), this.name = "UsageGraphError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, q.prototype.constructor);
  }
}
function Nr(s, e) {
  this.key = s, this.attributes = e, this.clear();
}
Nr.prototype.clear = function() {
  this.inDegree = 0, this.outDegree = 0, this.undirectedDegree = 0, this.undirectedLoops = 0, this.directedLoops = 0, this.in = {}, this.out = {}, this.undirected = {};
};
function Dr(s, e) {
  this.key = s, this.attributes = e, this.clear();
}
Dr.prototype.clear = function() {
  this.inDegree = 0, this.outDegree = 0, this.directedLoops = 0, this.in = {}, this.out = {};
};
function Ir(s, e) {
  this.key = s, this.attributes = e, this.clear();
}
Ir.prototype.clear = function() {
  this.undirectedDegree = 0, this.undirectedLoops = 0, this.undirected = {};
};
function Qe(s, e, t, i, r) {
  this.key = e, this.attributes = r, this.undirected = s, this.source = t, this.target = i;
}
Qe.prototype.attach = function() {
  let s = "out", e = "in";
  this.undirected && (s = e = "undirected");
  const t = this.source.key, i = this.target.key;
  this.source[s][i] = this, !(this.undirected && t === i) && (this.target[e][t] = this);
};
Qe.prototype.attachMulti = function() {
  let s = "out", e = "in";
  const t = this.source.key, i = this.target.key;
  this.undirected && (s = e = "undirected");
  const r = this.source[s], n = r[i];
  if (typeof n == "undefined") {
    r[i] = this, this.undirected && t === i || (this.target[e][t] = this);
    return;
  }
  n.previous = this, this.next = n, r[i] = this, this.target[e][t] = this;
};
Qe.prototype.detach = function() {
  const s = this.source.key, e = this.target.key;
  let t = "out", i = "in";
  this.undirected && (t = i = "undirected"), delete this.source[t][e], delete this.target[i][s];
};
Qe.prototype.detachMulti = function() {
  const s = this.source.key, e = this.target.key;
  let t = "out", i = "in";
  this.undirected && (t = i = "undirected"), this.previous === void 0 ? this.next === void 0 ? (delete this.source[t][e], delete this.target[i][s]) : (this.next.previous = void 0, this.source[t][e] = this.next, this.target[i][s] = this.next) : (this.previous.next = this.next, this.next !== void 0 && (this.next.previous = this.previous));
};
const Pr = 0, $r = 1, Nn = 2, zr = 3;
function Me(s, e, t, i, r, n, o) {
  let a, h, l, c;
  if (i = "" + i, t === Pr) {
    if (a = s._nodes.get(i), !a)
      throw new P(
        `Graph.${e}: could not find the "${i}" node in the graph.`
      );
    l = r, c = n;
  } else if (t === zr) {
    if (r = "" + r, h = s._edges.get(r), !h)
      throw new P(
        `Graph.${e}: could not find the "${r}" edge in the graph.`
      );
    const d = h.source.key, f = h.target.key;
    if (i === d)
      a = h.target;
    else if (i === f)
      a = h.source;
    else
      throw new P(
        `Graph.${e}: the "${i}" node is not attached to the "${r}" edge (${d}, ${f}).`
      );
    l = n, c = o;
  } else {
    if (h = s._edges.get(i), !h)
      throw new P(
        `Graph.${e}: could not find the "${i}" edge in the graph.`
      );
    t === $r ? a = h.source : a = h.target, l = r, c = n;
  }
  return [a, l, c];
}
function Dn(s, e, t) {
  s.prototype[e] = function(i, r, n) {
    const [o, a] = Me(
      this,
      e,
      t,
      i,
      r,
      n
    );
    return o.attributes[a];
  };
}
function In(s, e, t) {
  s.prototype[e] = function(i, r) {
    const [n] = Me(
      this,
      e,
      t,
      i,
      r
    );
    return n.attributes;
  };
}
function Pn(s, e, t) {
  s.prototype[e] = function(i, r, n) {
    const [o, a] = Me(
      this,
      e,
      t,
      i,
      r,
      n
    );
    return o.attributes.hasOwnProperty(a);
  };
}
function $n(s, e, t) {
  s.prototype[e] = function(i, r, n, o) {
    const [a, h, l] = Me(
      this,
      e,
      t,
      i,
      r,
      n,
      o
    );
    return a.attributes[h] = l, this.emit("nodeAttributesUpdated", {
      key: a.key,
      type: "set",
      attributes: a.attributes,
      name: h
    }), this;
  };
}
function zn(s, e, t) {
  s.prototype[e] = function(i, r, n, o) {
    const [a, h, l] = Me(
      this,
      e,
      t,
      i,
      r,
      n,
      o
    );
    if (typeof l != "function")
      throw new O(
        `Graph.${e}: updater should be a function.`
      );
    const c = a.attributes, d = l(c[h]);
    return c[h] = d, this.emit("nodeAttributesUpdated", {
      key: a.key,
      type: "set",
      attributes: a.attributes,
      name: h
    }), this;
  };
}
function Mn(s, e, t) {
  s.prototype[e] = function(i, r, n) {
    const [o, a] = Me(
      this,
      e,
      t,
      i,
      r,
      n
    );
    return delete o.attributes[a], this.emit("nodeAttributesUpdated", {
      key: o.key,
      type: "remove",
      attributes: o.attributes,
      name: a
    }), this;
  };
}
function Fn(s, e, t) {
  s.prototype[e] = function(i, r, n) {
    const [o, a] = Me(
      this,
      e,
      t,
      i,
      r,
      n
    );
    if (!ce(a))
      throw new O(
        `Graph.${e}: provided attributes are not a plain object.`
      );
    return o.attributes = a, this.emit("nodeAttributesUpdated", {
      key: o.key,
      type: "replace",
      attributes: o.attributes
    }), this;
  };
}
function On(s, e, t) {
  s.prototype[e] = function(i, r, n) {
    const [o, a] = Me(
      this,
      e,
      t,
      i,
      r,
      n
    );
    if (!ce(a))
      throw new O(
        `Graph.${e}: provided attributes are not a plain object.`
      );
    return he(o.attributes, a), this.emit("nodeAttributesUpdated", {
      key: o.key,
      type: "merge",
      attributes: o.attributes,
      data: a
    }), this;
  };
}
function Bn(s, e, t) {
  s.prototype[e] = function(i, r, n) {
    const [o, a] = Me(
      this,
      e,
      t,
      i,
      r,
      n
    );
    if (typeof a != "function")
      throw new O(
        `Graph.${e}: provided updater is not a function.`
      );
    return o.attributes = a(o.attributes), this.emit("nodeAttributesUpdated", {
      key: o.key,
      type: "update",
      attributes: o.attributes
    }), this;
  };
}
const Un = [
  {
    name: (s) => `get${s}Attribute`,
    attacher: Dn
  },
  {
    name: (s) => `get${s}Attributes`,
    attacher: In
  },
  {
    name: (s) => `has${s}Attribute`,
    attacher: Pn
  },
  {
    name: (s) => `set${s}Attribute`,
    attacher: $n
  },
  {
    name: (s) => `update${s}Attribute`,
    attacher: zn
  },
  {
    name: (s) => `remove${s}Attribute`,
    attacher: Mn
  },
  {
    name: (s) => `replace${s}Attributes`,
    attacher: Fn
  },
  {
    name: (s) => `merge${s}Attributes`,
    attacher: On
  },
  {
    name: (s) => `update${s}Attributes`,
    attacher: Bn
  }
];
function Hn(s) {
  Un.forEach(function({ name: e, attacher: t }) {
    t(s, e("Node"), Pr), t(s, e("Source"), $r), t(s, e("Target"), Nn), t(s, e("Opposite"), zr);
  });
}
function jn(s, e, t) {
  s.prototype[e] = function(i, r) {
    let n;
    if (this.type !== "mixed" && t !== "mixed" && t !== this.type)
      throw new q(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new q(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const o = "" + i, a = "" + r;
      if (r = arguments[2], n = be(this, o, a, t), !n)
        throw new P(
          `Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`
        );
    } else {
      if (t !== "mixed")
        throw new q(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, n = this._edges.get(i), !n)
        throw new P(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    return n.attributes[r];
  };
}
function Wn(s, e, t) {
  s.prototype[e] = function(i) {
    let r;
    if (this.type !== "mixed" && t !== "mixed" && t !== this.type)
      throw new q(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 1) {
      if (this.multi)
        throw new q(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const n = "" + i, o = "" + arguments[1];
      if (r = be(this, n, o, t), !r)
        throw new P(
          `Graph.${e}: could not find an edge for the given path ("${n}" - "${o}").`
        );
    } else {
      if (t !== "mixed")
        throw new q(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, r = this._edges.get(i), !r)
        throw new P(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    return r.attributes;
  };
}
function qn(s, e, t) {
  s.prototype[e] = function(i, r) {
    let n;
    if (this.type !== "mixed" && t !== "mixed" && t !== this.type)
      throw new q(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new q(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const o = "" + i, a = "" + r;
      if (r = arguments[2], n = be(this, o, a, t), !n)
        throw new P(
          `Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`
        );
    } else {
      if (t !== "mixed")
        throw new q(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, n = this._edges.get(i), !n)
        throw new P(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    return n.attributes.hasOwnProperty(r);
  };
}
function Vn(s, e, t) {
  s.prototype[e] = function(i, r, n) {
    let o;
    if (this.type !== "mixed" && t !== "mixed" && t !== this.type)
      throw new q(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 3) {
      if (this.multi)
        throw new q(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const a = "" + i, h = "" + r;
      if (r = arguments[2], n = arguments[3], o = be(this, a, h, t), !o)
        throw new P(
          `Graph.${e}: could not find an edge for the given path ("${a}" - "${h}").`
        );
    } else {
      if (t !== "mixed")
        throw new q(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, o = this._edges.get(i), !o)
        throw new P(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    return o.attributes[r] = n, this.emit("edgeAttributesUpdated", {
      key: o.key,
      type: "set",
      attributes: o.attributes,
      name: r
    }), this;
  };
}
function Yn(s, e, t) {
  s.prototype[e] = function(i, r, n) {
    let o;
    if (this.type !== "mixed" && t !== "mixed" && t !== this.type)
      throw new q(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 3) {
      if (this.multi)
        throw new q(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const a = "" + i, h = "" + r;
      if (r = arguments[2], n = arguments[3], o = be(this, a, h, t), !o)
        throw new P(
          `Graph.${e}: could not find an edge for the given path ("${a}" - "${h}").`
        );
    } else {
      if (t !== "mixed")
        throw new q(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, o = this._edges.get(i), !o)
        throw new P(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    if (typeof n != "function")
      throw new O(
        `Graph.${e}: updater should be a function.`
      );
    return o.attributes[r] = n(o.attributes[r]), this.emit("edgeAttributesUpdated", {
      key: o.key,
      type: "set",
      attributes: o.attributes,
      name: r
    }), this;
  };
}
function Xn(s, e, t) {
  s.prototype[e] = function(i, r) {
    let n;
    if (this.type !== "mixed" && t !== "mixed" && t !== this.type)
      throw new q(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new q(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const o = "" + i, a = "" + r;
      if (r = arguments[2], n = be(this, o, a, t), !n)
        throw new P(
          `Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`
        );
    } else {
      if (t !== "mixed")
        throw new q(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, n = this._edges.get(i), !n)
        throw new P(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    return delete n.attributes[r], this.emit("edgeAttributesUpdated", {
      key: n.key,
      type: "remove",
      attributes: n.attributes,
      name: r
    }), this;
  };
}
function Zn(s, e, t) {
  s.prototype[e] = function(i, r) {
    let n;
    if (this.type !== "mixed" && t !== "mixed" && t !== this.type)
      throw new q(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new q(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const o = "" + i, a = "" + r;
      if (r = arguments[2], n = be(this, o, a, t), !n)
        throw new P(
          `Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`
        );
    } else {
      if (t !== "mixed")
        throw new q(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, n = this._edges.get(i), !n)
        throw new P(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    if (!ce(r))
      throw new O(
        `Graph.${e}: provided attributes are not a plain object.`
      );
    return n.attributes = r, this.emit("edgeAttributesUpdated", {
      key: n.key,
      type: "replace",
      attributes: n.attributes
    }), this;
  };
}
function Kn(s, e, t) {
  s.prototype[e] = function(i, r) {
    let n;
    if (this.type !== "mixed" && t !== "mixed" && t !== this.type)
      throw new q(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new q(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const o = "" + i, a = "" + r;
      if (r = arguments[2], n = be(this, o, a, t), !n)
        throw new P(
          `Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`
        );
    } else {
      if (t !== "mixed")
        throw new q(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, n = this._edges.get(i), !n)
        throw new P(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    if (!ce(r))
      throw new O(
        `Graph.${e}: provided attributes are not a plain object.`
      );
    return he(n.attributes, r), this.emit("edgeAttributesUpdated", {
      key: n.key,
      type: "merge",
      attributes: n.attributes,
      data: r
    }), this;
  };
}
function Qn(s, e, t) {
  s.prototype[e] = function(i, r) {
    let n;
    if (this.type !== "mixed" && t !== "mixed" && t !== this.type)
      throw new q(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new q(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const o = "" + i, a = "" + r;
      if (r = arguments[2], n = be(this, o, a, t), !n)
        throw new P(
          `Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`
        );
    } else {
      if (t !== "mixed")
        throw new q(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, n = this._edges.get(i), !n)
        throw new P(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    if (typeof r != "function")
      throw new O(
        `Graph.${e}: provided updater is not a function.`
      );
    return n.attributes = r(n.attributes), this.emit("edgeAttributesUpdated", {
      key: n.key,
      type: "update",
      attributes: n.attributes
    }), this;
  };
}
const Jn = [
  {
    name: (s) => `get${s}Attribute`,
    attacher: jn
  },
  {
    name: (s) => `get${s}Attributes`,
    attacher: Wn
  },
  {
    name: (s) => `has${s}Attribute`,
    attacher: qn
  },
  {
    name: (s) => `set${s}Attribute`,
    attacher: Vn
  },
  {
    name: (s) => `update${s}Attribute`,
    attacher: Yn
  },
  {
    name: (s) => `remove${s}Attribute`,
    attacher: Xn
  },
  {
    name: (s) => `replace${s}Attributes`,
    attacher: Zn
  },
  {
    name: (s) => `merge${s}Attributes`,
    attacher: Kn
  },
  {
    name: (s) => `update${s}Attributes`,
    attacher: Qn
  }
];
function es(s) {
  Jn.forEach(function({ name: e, attacher: t }) {
    t(s, e("Edge"), "mixed"), t(s, e("DirectedEdge"), "directed"), t(s, e("UndirectedEdge"), "undirected");
  });
}
const ts = [
  {
    name: "edges",
    type: "mixed"
  },
  {
    name: "inEdges",
    type: "directed",
    direction: "in"
  },
  {
    name: "outEdges",
    type: "directed",
    direction: "out"
  },
  {
    name: "inboundEdges",
    type: "mixed",
    direction: "in"
  },
  {
    name: "outboundEdges",
    type: "mixed",
    direction: "out"
  },
  {
    name: "directedEdges",
    type: "directed"
  },
  {
    name: "undirectedEdges",
    type: "undirected"
  }
];
function is(s, e, t, i) {
  let r = !1;
  for (const n in e) {
    if (n === i) continue;
    const o = e[n];
    if (r = t(
      o.key,
      o.attributes,
      o.source.key,
      o.target.key,
      o.source.attributes,
      o.target.attributes,
      o.undirected
    ), s && r) return o.key;
  }
}
function rs(s, e, t, i) {
  let r, n, o, a = !1;
  for (const h in e)
    if (h !== i) {
      r = e[h];
      do {
        if (n = r.source, o = r.target, a = t(
          r.key,
          r.attributes,
          n.key,
          o.key,
          n.attributes,
          o.attributes,
          r.undirected
        ), s && a) return r.key;
        r = r.next;
      } while (r !== void 0);
    }
}
function Ct(s, e) {
  const t = Object.keys(s), i = t.length;
  let r, n = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      do
        if (r)
          r = r.next;
        else {
          if (n >= i) return { done: !0 };
          const o = t[n++];
          if (o === e) {
            r = void 0;
            continue;
          }
          r = s[o];
        }
      while (!r);
      return {
        done: !1,
        value: {
          edge: r.key,
          attributes: r.attributes,
          source: r.source.key,
          target: r.target.key,
          sourceAttributes: r.source.attributes,
          targetAttributes: r.target.attributes,
          undirected: r.undirected
        }
      };
    }
  };
}
function ns(s, e, t, i) {
  const r = e[t];
  if (!r) return;
  const n = r.source, o = r.target;
  if (i(
    r.key,
    r.attributes,
    n.key,
    o.key,
    n.attributes,
    o.attributes,
    r.undirected
  ) && s)
    return r.key;
}
function ss(s, e, t, i) {
  let r = e[t];
  if (!r) return;
  let n = !1;
  do {
    if (n = i(
      r.key,
      r.attributes,
      r.source.key,
      r.target.key,
      r.source.attributes,
      r.target.attributes,
      r.undirected
    ), s && n) return r.key;
    r = r.next;
  } while (r !== void 0);
}
function At(s, e) {
  let t = s[e];
  if (t.next !== void 0)
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (!t) return { done: !0 };
        const r = {
          edge: t.key,
          attributes: t.attributes,
          source: t.source.key,
          target: t.target.key,
          sourceAttributes: t.source.attributes,
          targetAttributes: t.target.attributes,
          undirected: t.undirected
        };
        return t = t.next, {
          done: !1,
          value: r
        };
      }
    };
  let i = !1;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return i === !0 ? { done: !0 } : (i = !0, {
        done: !1,
        value: {
          edge: t.key,
          attributes: t.attributes,
          source: t.source.key,
          target: t.target.key,
          sourceAttributes: t.source.attributes,
          targetAttributes: t.target.attributes,
          undirected: t.undirected
        }
      });
    }
  };
}
function os(s, e) {
  if (s.size === 0) return [];
  if (e === "mixed" || e === s.type)
    return Array.from(s._edges.keys());
  const t = e === "undirected" ? s.undirectedSize : s.directedSize, i = new Array(t), r = e === "undirected", n = s._edges.values();
  let o = 0, a, h;
  for (; a = n.next(), a.done !== !0; )
    h = a.value, h.undirected === r && (i[o++] = h.key);
  return i;
}
function Mr(s, e, t, i) {
  if (e.size === 0) return;
  const r = t !== "mixed" && t !== e.type, n = t === "undirected";
  let o, a, h = !1;
  const l = e._edges.values();
  for (; o = l.next(), o.done !== !0; ) {
    if (a = o.value, r && a.undirected !== n) continue;
    const { key: c, attributes: d, source: f, target: w } = a;
    if (h = i(
      c,
      d,
      f.key,
      w.key,
      f.attributes,
      w.attributes,
      a.undirected
    ), s && h) return c;
  }
}
function as(s, e) {
  if (s.size === 0) return Ke();
  const t = e !== "mixed" && e !== s.type, i = e === "undirected", r = s._edges.values();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let n, o;
      for (; ; ) {
        if (n = r.next(), n.done) return n;
        if (o = n.value, !(t && o.undirected !== i))
          break;
      }
      return { value: {
        edge: o.key,
        attributes: o.attributes,
        source: o.source.key,
        target: o.target.key,
        sourceAttributes: o.source.attributes,
        targetAttributes: o.target.attributes,
        undirected: o.undirected
      }, done: !1 };
    }
  };
}
function ci(s, e, t, i, r, n) {
  const o = e ? rs : is;
  let a;
  if (t !== "undirected" && (i !== "out" && (a = o(s, r.in, n), s && a) || i !== "in" && (a = o(
    s,
    r.out,
    n,
    i ? void 0 : r.key
  ), s && a)) || t !== "directed" && (a = o(s, r.undirected, n), s && a))
    return a;
}
function hs(s, e, t, i) {
  const r = [];
  return ci(!1, s, e, t, i, function(n) {
    r.push(n);
  }), r;
}
function ls(s, e, t) {
  let i = Ke();
  return s !== "undirected" && (e !== "out" && typeof t.in != "undefined" && (i = ze(i, Ct(t.in))), e !== "in" && typeof t.out != "undefined" && (i = ze(
    i,
    Ct(t.out, e ? void 0 : t.key)
  ))), s !== "directed" && typeof t.undirected != "undefined" && (i = ze(i, Ct(t.undirected))), i;
}
function di(s, e, t, i, r, n, o) {
  const a = t ? ss : ns;
  let h;
  if (e !== "undirected" && (typeof r.in != "undefined" && i !== "out" && (h = a(s, r.in, n, o), s && h) || typeof r.out != "undefined" && i !== "in" && (i || r.key !== n) && (h = a(s, r.out, n, o), s && h)) || e !== "directed" && typeof r.undirected != "undefined" && (h = a(s, r.undirected, n, o), s && h))
    return h;
}
function cs(s, e, t, i, r) {
  const n = [];
  return di(
    !1,
    s,
    e,
    t,
    i,
    r,
    function(o) {
      n.push(o);
    }
  ), n;
}
function ds(s, e, t, i) {
  let r = Ke();
  return s !== "undirected" && (typeof t.in != "undefined" && e !== "out" && i in t.in && (r = ze(r, At(t.in, i))), typeof t.out != "undefined" && e !== "in" && i in t.out && (e || t.key !== i) && (r = ze(r, At(t.out, i)))), s !== "directed" && typeof t.undirected != "undefined" && i in t.undirected && (r = ze(
    r,
    At(t.undirected, i)
  )), r;
}
function us(s, e) {
  const { name: t, type: i, direction: r } = e;
  s.prototype[t] = function(n, o) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type)
      return [];
    if (!arguments.length) return os(this, i);
    if (arguments.length === 1) {
      n = "" + n;
      const a = this._nodes.get(n);
      if (typeof a == "undefined")
        throw new P(
          `Graph.${t}: could not find the "${n}" node in the graph.`
        );
      return hs(
        this.multi,
        i === "mixed" ? this.type : i,
        r,
        a
      );
    }
    if (arguments.length === 2) {
      n = "" + n, o = "" + o;
      const a = this._nodes.get(n);
      if (!a)
        throw new P(
          `Graph.${t}:  could not find the "${n}" source node in the graph.`
        );
      if (!this._nodes.has(o))
        throw new P(
          `Graph.${t}:  could not find the "${o}" target node in the graph.`
        );
      return cs(
        i,
        this.multi,
        r,
        a,
        o
      );
    }
    throw new O(
      `Graph.${t}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`
    );
  };
}
function fs(s, e) {
  const { name: t, type: i, direction: r } = e, n = "forEach" + t[0].toUpperCase() + t.slice(1, -1);
  s.prototype[n] = function(l, c, d) {
    if (!(i !== "mixed" && this.type !== "mixed" && i !== this.type)) {
      if (arguments.length === 1)
        return d = l, Mr(!1, this, i, d);
      if (arguments.length === 2) {
        l = "" + l, d = c;
        const f = this._nodes.get(l);
        if (typeof f == "undefined")
          throw new P(
            `Graph.${n}: could not find the "${l}" node in the graph.`
          );
        return ci(
          !1,
          this.multi,
          i === "mixed" ? this.type : i,
          r,
          f,
          d
        );
      }
      if (arguments.length === 3) {
        l = "" + l, c = "" + c;
        const f = this._nodes.get(l);
        if (!f)
          throw new P(
            `Graph.${n}:  could not find the "${l}" source node in the graph.`
          );
        if (!this._nodes.has(c))
          throw new P(
            `Graph.${n}:  could not find the "${c}" target node in the graph.`
          );
        return di(
          !1,
          i,
          this.multi,
          r,
          f,
          c,
          d
        );
      }
      throw new O(
        `Graph.${n}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`
      );
    }
  };
  const o = "map" + t[0].toUpperCase() + t.slice(1);
  s.prototype[o] = function() {
    const l = Array.prototype.slice.call(arguments), c = l.pop();
    let d;
    if (l.length === 0) {
      let f = 0;
      i !== "directed" && (f += this.undirectedSize), i !== "undirected" && (f += this.directedSize), d = new Array(f);
      let w = 0;
      l.push((v, u, p, E, m, x, g) => {
        d[w++] = c(v, u, p, E, m, x, g);
      });
    } else
      d = [], l.push((f, w, v, u, p, E, m) => {
        d.push(c(f, w, v, u, p, E, m));
      });
    return this[n].apply(this, l), d;
  };
  const a = "filter" + t[0].toUpperCase() + t.slice(1);
  s.prototype[a] = function() {
    const l = Array.prototype.slice.call(arguments), c = l.pop(), d = [];
    return l.push((f, w, v, u, p, E, m) => {
      c(f, w, v, u, p, E, m) && d.push(f);
    }), this[n].apply(this, l), d;
  };
  const h = "reduce" + t[0].toUpperCase() + t.slice(1);
  s.prototype[h] = function() {
    let l = Array.prototype.slice.call(arguments);
    if (l.length < 2 || l.length > 4)
      throw new O(
        `Graph.${h}: invalid number of arguments (expecting 2, 3 or 4 and got ${l.length}).`
      );
    if (typeof l[l.length - 1] == "function" && typeof l[l.length - 2] != "function")
      throw new O(
        `Graph.${h}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`
      );
    let c, d;
    l.length === 2 ? (c = l[0], d = l[1], l = []) : l.length === 3 ? (c = l[1], d = l[2], l = [l[0]]) : l.length === 4 && (c = l[2], d = l[3], l = [l[0], l[1]]);
    let f = d;
    return l.push((w, v, u, p, E, m, x) => {
      f = c(f, w, v, u, p, E, m, x);
    }), this[n].apply(this, l), f;
  };
}
function ps(s, e) {
  const { name: t, type: i, direction: r } = e, n = "find" + t[0].toUpperCase() + t.slice(1, -1);
  s.prototype[n] = function(h, l, c) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type)
      return !1;
    if (arguments.length === 1)
      return c = h, Mr(!0, this, i, c);
    if (arguments.length === 2) {
      h = "" + h, c = l;
      const d = this._nodes.get(h);
      if (typeof d == "undefined")
        throw new P(
          `Graph.${n}: could not find the "${h}" node in the graph.`
        );
      return ci(
        !0,
        this.multi,
        i === "mixed" ? this.type : i,
        r,
        d,
        c
      );
    }
    if (arguments.length === 3) {
      h = "" + h, l = "" + l;
      const d = this._nodes.get(h);
      if (!d)
        throw new P(
          `Graph.${n}:  could not find the "${h}" source node in the graph.`
        );
      if (!this._nodes.has(l))
        throw new P(
          `Graph.${n}:  could not find the "${l}" target node in the graph.`
        );
      return di(
        !0,
        i,
        this.multi,
        r,
        d,
        l,
        c
      );
    }
    throw new O(
      `Graph.${n}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`
    );
  };
  const o = "some" + t[0].toUpperCase() + t.slice(1, -1);
  s.prototype[o] = function() {
    const h = Array.prototype.slice.call(arguments), l = h.pop();
    return h.push((d, f, w, v, u, p, E) => l(d, f, w, v, u, p, E)), !!this[n].apply(this, h);
  };
  const a = "every" + t[0].toUpperCase() + t.slice(1, -1);
  s.prototype[a] = function() {
    const h = Array.prototype.slice.call(arguments), l = h.pop();
    return h.push((d, f, w, v, u, p, E) => !l(d, f, w, v, u, p, E)), !this[n].apply(this, h);
  };
}
function gs(s, e) {
  const { name: t, type: i, direction: r } = e, n = t.slice(0, -1) + "Entries";
  s.prototype[n] = function(o, a) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type)
      return Ke();
    if (!arguments.length) return as(this, i);
    if (arguments.length === 1) {
      o = "" + o;
      const h = this._nodes.get(o);
      if (!h)
        throw new P(
          `Graph.${n}: could not find the "${o}" node in the graph.`
        );
      return ls(i, r, h);
    }
    if (arguments.length === 2) {
      o = "" + o, a = "" + a;
      const h = this._nodes.get(o);
      if (!h)
        throw new P(
          `Graph.${n}:  could not find the "${o}" source node in the graph.`
        );
      if (!this._nodes.has(a))
        throw new P(
          `Graph.${n}:  could not find the "${a}" target node in the graph.`
        );
      return ds(i, r, h, a);
    }
    throw new O(
      `Graph.${n}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`
    );
  };
}
function vs(s) {
  ts.forEach((e) => {
    us(s, e), fs(s, e), ps(s, e), gs(s, e);
  });
}
const ms = [
  {
    name: "neighbors",
    type: "mixed"
  },
  {
    name: "inNeighbors",
    type: "directed",
    direction: "in"
  },
  {
    name: "outNeighbors",
    type: "directed",
    direction: "out"
  },
  {
    name: "inboundNeighbors",
    type: "mixed",
    direction: "in"
  },
  {
    name: "outboundNeighbors",
    type: "mixed",
    direction: "out"
  },
  {
    name: "directedNeighbors",
    type: "directed"
  },
  {
    name: "undirectedNeighbors",
    type: "undirected"
  }
];
function _t() {
  this.A = null, this.B = null;
}
_t.prototype.wrap = function(s) {
  this.A === null ? this.A = s : this.B === null && (this.B = s);
};
_t.prototype.has = function(s) {
  return this.A !== null && s in this.A || this.B !== null && s in this.B;
};
function et(s, e, t, i, r) {
  for (const n in i) {
    const o = i[n], a = o.source, h = o.target, l = a === t ? h : a;
    if (e && e.has(l.key)) continue;
    const c = r(l.key, l.attributes);
    if (s && c) return l.key;
  }
}
function ui(s, e, t, i, r) {
  if (e !== "mixed") {
    if (e === "undirected")
      return et(
        s,
        null,
        i,
        i.undirected,
        r
      );
    if (typeof t == "string")
      return et(
        s,
        null,
        i,
        i[t],
        r
      );
  }
  const n = new _t();
  let o;
  if (e !== "undirected") {
    if (t !== "out") {
      if (o = et(
        s,
        null,
        i,
        i.in,
        r
      ), s && o) return o;
      n.wrap(i.in);
    }
    if (t !== "in") {
      if (o = et(
        s,
        n,
        i,
        i.out,
        r
      ), s && o) return o;
      n.wrap(i.out);
    }
  }
  if (e !== "directed" && (o = et(
    s,
    n,
    i,
    i.undirected,
    r
  ), s && o))
    return o;
}
function ys(s, e, t) {
  if (s !== "mixed") {
    if (s === "undirected") return Object.keys(t.undirected);
    if (typeof e == "string") return Object.keys(t[e]);
  }
  const i = [];
  return ui(!1, s, e, t, function(r) {
    i.push(r);
  }), i;
}
function tt(s, e, t) {
  const i = Object.keys(t), r = i.length;
  let n = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let o = null;
      do {
        if (n >= r)
          return s && s.wrap(t), { done: !0 };
        const a = t[i[n++]], h = a.source, l = a.target;
        if (o = h === e ? l : h, s && s.has(o.key)) {
          o = null;
          continue;
        }
      } while (o === null);
      return {
        done: !1,
        value: { neighbor: o.key, attributes: o.attributes }
      };
    }
  };
}
function ws(s, e, t) {
  if (s !== "mixed") {
    if (s === "undirected")
      return tt(null, t, t.undirected);
    if (typeof e == "string")
      return tt(null, t, t[e]);
  }
  let i = Ke();
  const r = new _t();
  return s !== "undirected" && (e !== "out" && (i = ze(
    i,
    tt(r, t, t.in)
  )), e !== "in" && (i = ze(
    i,
    tt(r, t, t.out)
  ))), s !== "directed" && (i = ze(
    i,
    tt(r, t, t.undirected)
  )), i;
}
function bs(s, e) {
  const { name: t, type: i, direction: r } = e;
  s.prototype[t] = function(n) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type)
      return [];
    n = "" + n;
    const o = this._nodes.get(n);
    if (typeof o == "undefined")
      throw new P(
        `Graph.${t}: could not find the "${n}" node in the graph.`
      );
    return ys(
      i === "mixed" ? this.type : i,
      r,
      o
    );
  };
}
function Es(s, e) {
  const { name: t, type: i, direction: r } = e, n = "forEach" + t[0].toUpperCase() + t.slice(1, -1);
  s.prototype[n] = function(l, c) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type) return;
    l = "" + l;
    const d = this._nodes.get(l);
    if (typeof d == "undefined")
      throw new P(
        `Graph.${n}: could not find the "${l}" node in the graph.`
      );
    ui(
      !1,
      i === "mixed" ? this.type : i,
      r,
      d,
      c
    );
  };
  const o = "map" + t[0].toUpperCase() + t.slice(1);
  s.prototype[o] = function(l, c) {
    const d = [];
    return this[n](l, (f, w) => {
      d.push(c(f, w));
    }), d;
  };
  const a = "filter" + t[0].toUpperCase() + t.slice(1);
  s.prototype[a] = function(l, c) {
    const d = [];
    return this[n](l, (f, w) => {
      c(f, w) && d.push(f);
    }), d;
  };
  const h = "reduce" + t[0].toUpperCase() + t.slice(1);
  s.prototype[h] = function(l, c, d) {
    if (arguments.length < 3)
      throw new O(
        `Graph.${h}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`
      );
    let f = d;
    return this[n](l, (w, v) => {
      f = c(f, w, v);
    }), f;
  };
}
function xs(s, e) {
  const { name: t, type: i, direction: r } = e, n = t[0].toUpperCase() + t.slice(1, -1), o = "find" + n;
  s.prototype[o] = function(l, c) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type) return;
    l = "" + l;
    const d = this._nodes.get(l);
    if (typeof d == "undefined")
      throw new P(
        `Graph.${o}: could not find the "${l}" node in the graph.`
      );
    return ui(
      !0,
      i === "mixed" ? this.type : i,
      r,
      d,
      c
    );
  };
  const a = "some" + n;
  s.prototype[a] = function(l, c) {
    return !!this[o](l, c);
  };
  const h = "every" + n;
  s.prototype[h] = function(l, c) {
    return !this[o](l, (f, w) => !c(f, w));
  };
}
function Ss(s, e) {
  const { name: t, type: i, direction: r } = e, n = t.slice(0, -1) + "Entries";
  s.prototype[n] = function(o) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type)
      return Ke();
    o = "" + o;
    const a = this._nodes.get(o);
    if (typeof a == "undefined")
      throw new P(
        `Graph.${n}: could not find the "${o}" node in the graph.`
      );
    return ws(
      i === "mixed" ? this.type : i,
      r,
      a
    );
  };
}
function _s(s) {
  ms.forEach((e) => {
    bs(s, e), Es(s, e), xs(s, e), Ss(s, e);
  });
}
function ft(s, e, t, i, r) {
  const n = i._nodes.values(), o = i.type;
  let a, h, l, c, d, f;
  for (; a = n.next(), a.done !== !0; ) {
    let w = !1;
    if (h = a.value, o !== "undirected") {
      c = h.out;
      for (l in c) {
        d = c[l];
        do
          f = d.target, w = !0, r(
            h.key,
            f.key,
            h.attributes,
            f.attributes,
            d.key,
            d.attributes,
            d.undirected
          ), d = d.next;
        while (d);
      }
    }
    if (o !== "directed") {
      c = h.undirected;
      for (l in c)
        if (!(e && h.key > l)) {
          d = c[l];
          do
            f = d.target, f.key !== l && (f = d.source), w = !0, r(
              h.key,
              f.key,
              h.attributes,
              f.attributes,
              d.key,
              d.attributes,
              d.undirected
            ), d = d.next;
          while (d);
        }
    }
    t && !w && r(
      h.key,
      null,
      h.attributes,
      null,
      null,
      null,
      null
    );
  }
}
function ks(s, e) {
  const t = { key: s };
  return Gr(e.attributes) || (t.attributes = he({}, e.attributes)), t;
}
function Ts(s, e, t) {
  const i = {
    key: e,
    source: t.source.key,
    target: t.target.key
  };
  return Gr(t.attributes) || (i.attributes = he({}, t.attributes)), s === "mixed" && t.undirected && (i.undirected = !0), i;
}
function Cs(s) {
  if (!ce(s))
    throw new O(
      'Graph.import: invalid serialized node. A serialized node should be a plain object with at least a "key" property.'
    );
  if (!("key" in s))
    throw new O(
      "Graph.import: serialized node is missing its key."
    );
  if ("attributes" in s && (!ce(s.attributes) || s.attributes === null))
    throw new O(
      "Graph.import: invalid attributes. Attributes should be a plain object, null or omitted."
    );
}
function As(s) {
  if (!ce(s))
    throw new O(
      'Graph.import: invalid serialized edge. A serialized edge should be a plain object with at least a "source" & "target" property.'
    );
  if (!("source" in s))
    throw new O(
      "Graph.import: serialized edge is missing its source."
    );
  if (!("target" in s))
    throw new O(
      "Graph.import: serialized edge is missing its target."
    );
  if ("attributes" in s && (!ce(s.attributes) || s.attributes === null))
    throw new O(
      "Graph.import: invalid attributes. Attributes should be a plain object, null or omitted."
    );
  if ("undirected" in s && typeof s.undirected != "boolean")
    throw new O(
      "Graph.import: invalid undirectedness information. Undirected should be boolean or omitted."
    );
}
const Rs = Gn(), Ls = /* @__PURE__ */ new Set(["directed", "undirected", "mixed"]), Si = /* @__PURE__ */ new Set([
  "domain",
  "_events",
  "_eventsCount",
  "_maxListeners"
]), Gs = [
  {
    name: (s) => `${s}Edge`,
    generateKey: !0
  },
  {
    name: (s) => `${s}DirectedEdge`,
    generateKey: !0,
    type: "directed"
  },
  {
    name: (s) => `${s}UndirectedEdge`,
    generateKey: !0,
    type: "undirected"
  },
  {
    name: (s) => `${s}EdgeWithKey`
  },
  {
    name: (s) => `${s}DirectedEdgeWithKey`,
    type: "directed"
  },
  {
    name: (s) => `${s}UndirectedEdgeWithKey`,
    type: "undirected"
  }
], Ns = {
  allowSelfLoops: !0,
  multi: !1,
  type: "mixed"
};
function Ds(s, e, t) {
  if (t && !ce(t))
    throw new O(
      `Graph.addNode: invalid attributes. Expecting an object but got "${t}"`
    );
  if (e = "" + e, t = t || {}, s._nodes.has(e))
    throw new q(
      `Graph.addNode: the "${e}" node already exist in the graph.`
    );
  const i = new s.NodeDataClass(e, t);
  return s._nodes.set(e, i), s.emit("nodeAdded", {
    key: e,
    attributes: t
  }), i;
}
function _i(s, e, t) {
  const i = new s.NodeDataClass(e, t);
  return s._nodes.set(e, i), s.emit("nodeAdded", {
    key: e,
    attributes: t
  }), i;
}
function Fr(s, e, t, i, r, n, o, a) {
  if (!i && s.type === "undirected")
    throw new q(
      `Graph.${e}: you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead.`
    );
  if (i && s.type === "directed")
    throw new q(
      `Graph.${e}: you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead.`
    );
  if (a && !ce(a))
    throw new O(
      `Graph.${e}: invalid attributes. Expecting an object but got "${a}"`
    );
  if (n = "" + n, o = "" + o, a = a || {}, !s.allowSelfLoops && n === o)
    throw new q(
      `Graph.${e}: source & target are the same ("${n}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`
    );
  const h = s._nodes.get(n), l = s._nodes.get(o);
  if (!h)
    throw new P(
      `Graph.${e}: source node "${n}" not found.`
    );
  if (!l)
    throw new P(
      `Graph.${e}: target node "${o}" not found.`
    );
  const c = {
    key: null,
    undirected: i,
    source: n,
    target: o,
    attributes: a
  };
  if (t)
    r = s._edgeKeyGenerator();
  else if (r = "" + r, s._edges.has(r))
    throw new q(
      `Graph.${e}: the "${r}" edge already exists in the graph.`
    );
  if (!s.multi && (i ? typeof h.undirected[o] != "undefined" : typeof h.out[o] != "undefined"))
    throw new q(
      `Graph.${e}: an edge linking "${n}" to "${o}" already exists. If you really want to add multiple edges linking those nodes, you should create a multi graph by using the 'multi' option.`
    );
  const d = new Qe(
    i,
    r,
    h,
    l,
    a
  );
  s._edges.set(r, d);
  const f = n === o;
  return i ? (h.undirectedDegree++, l.undirectedDegree++, f && (h.undirectedLoops++, s._undirectedSelfLoopCount++)) : (h.outDegree++, l.inDegree++, f && (h.directedLoops++, s._directedSelfLoopCount++)), s.multi ? d.attachMulti() : d.attach(), i ? s._undirectedSize++ : s._directedSize++, c.key = r, s.emit("edgeAdded", c), r;
}
function Is(s, e, t, i, r, n, o, a, h) {
  if (!i && s.type === "undirected")
    throw new q(
      `Graph.${e}: you cannot merge/update a directed edge to an undirected graph. Use the #.mergeEdge/#.updateEdge or #.addUndirectedEdge instead.`
    );
  if (i && s.type === "directed")
    throw new q(
      `Graph.${e}: you cannot merge/update an undirected edge to a directed graph. Use the #.mergeEdge/#.updateEdge or #.addDirectedEdge instead.`
    );
  if (a) {
    if (h) {
      if (typeof a != "function")
        throw new O(
          `Graph.${e}: invalid updater function. Expecting a function but got "${a}"`
        );
    } else if (!ce(a))
      throw new O(
        `Graph.${e}: invalid attributes. Expecting an object but got "${a}"`
      );
  }
  n = "" + n, o = "" + o;
  let l;
  if (h && (l = a, a = void 0), !s.allowSelfLoops && n === o)
    throw new q(
      `Graph.${e}: source & target are the same ("${n}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`
    );
  let c = s._nodes.get(n), d = s._nodes.get(o), f, w;
  if (!t && (f = s._edges.get(r), f)) {
    if ((f.source.key !== n || f.target.key !== o) && (!i || f.source.key !== o || f.target.key !== n))
      throw new q(
        `Graph.${e}: inconsistency detected when attempting to merge the "${r}" edge with "${n}" source & "${o}" target vs. ("${f.source.key}", "${f.target.key}").`
      );
    w = f;
  }
  if (!w && !s.multi && c && (w = i ? c.undirected[o] : c.out[o]), w) {
    const m = [w.key, !1, !1, !1];
    if (h ? !l : !a) return m;
    if (h) {
      const x = w.attributes;
      w.attributes = l(x), s.emit("edgeAttributesUpdated", {
        type: "replace",
        key: w.key,
        attributes: w.attributes
      });
    } else
      he(w.attributes, a), s.emit("edgeAttributesUpdated", {
        type: "merge",
        key: w.key,
        attributes: w.attributes,
        data: a
      });
    return m;
  }
  a = a || {}, h && l && (a = l(a));
  const v = {
    key: null,
    undirected: i,
    source: n,
    target: o,
    attributes: a
  };
  if (t)
    r = s._edgeKeyGenerator();
  else if (r = "" + r, s._edges.has(r))
    throw new q(
      `Graph.${e}: the "${r}" edge already exists in the graph.`
    );
  let u = !1, p = !1;
  c || (c = _i(s, n, {}), u = !0, n === o && (d = c, p = !0)), d || (d = _i(s, o, {}), p = !0), f = new Qe(i, r, c, d, a), s._edges.set(r, f);
  const E = n === o;
  return i ? (c.undirectedDegree++, d.undirectedDegree++, E && (c.undirectedLoops++, s._undirectedSelfLoopCount++)) : (c.outDegree++, d.inDegree++, E && (c.directedLoops++, s._directedSelfLoopCount++)), s.multi ? f.attachMulti() : f.attach(), i ? s._undirectedSize++ : s._directedSize++, v.key = r, s.emit("edgeAdded", v), [r, !0, u, p];
}
function qe(s, e) {
  s._edges.delete(e.key);
  const { source: t, target: i, attributes: r } = e, n = e.undirected, o = t === i;
  n ? (t.undirectedDegree--, i.undirectedDegree--, o && (t.undirectedLoops--, s._undirectedSelfLoopCount--)) : (t.outDegree--, i.inDegree--, o && (t.directedLoops--, s._directedSelfLoopCount--)), s.multi ? e.detachMulti() : e.detach(), n ? s._undirectedSize-- : s._directedSize--, s.emit("edgeDropped", {
    key: e.key,
    attributes: r,
    source: t.key,
    target: i.key,
    undirected: n
  });
}
class ee extends Lr.EventEmitter {
  constructor(e) {
    if (super(), e = he({}, Ns, e), typeof e.multi != "boolean")
      throw new O(
        `Graph.constructor: invalid 'multi' option. Expecting a boolean but got "${e.multi}".`
      );
    if (!Ls.has(e.type))
      throw new O(
        `Graph.constructor: invalid 'type' option. Should be one of "mixed", "directed" or "undirected" but got "${e.type}".`
      );
    if (typeof e.allowSelfLoops != "boolean")
      throw new O(
        `Graph.constructor: invalid 'allowSelfLoops' option. Expecting a boolean but got "${e.allowSelfLoops}".`
      );
    const t = e.type === "mixed" ? Nr : e.type === "directed" ? Dr : Ir;
    we(this, "NodeDataClass", t);
    const i = "geid_" + Rs() + "_";
    let r = 0;
    const n = () => {
      let o;
      do
        o = i + r++;
      while (this._edges.has(o));
      return o;
    };
    we(this, "_attributes", {}), we(this, "_nodes", /* @__PURE__ */ new Map()), we(this, "_edges", /* @__PURE__ */ new Map()), we(this, "_directedSize", 0), we(this, "_undirectedSize", 0), we(this, "_directedSelfLoopCount", 0), we(this, "_undirectedSelfLoopCount", 0), we(this, "_edgeKeyGenerator", n), we(this, "_options", e), Si.forEach((o) => we(this, o, this[o])), Te(this, "order", () => this._nodes.size), Te(this, "size", () => this._edges.size), Te(this, "directedSize", () => this._directedSize), Te(this, "undirectedSize", () => this._undirectedSize), Te(
      this,
      "selfLoopCount",
      () => this._directedSelfLoopCount + this._undirectedSelfLoopCount
    ), Te(
      this,
      "directedSelfLoopCount",
      () => this._directedSelfLoopCount
    ), Te(
      this,
      "undirectedSelfLoopCount",
      () => this._undirectedSelfLoopCount
    ), Te(this, "multi", this._options.multi), Te(this, "type", this._options.type), Te(this, "allowSelfLoops", this._options.allowSelfLoops), Te(this, "implementation", () => "graphology");
  }
  _resetInstanceCounters() {
    this._directedSize = 0, this._undirectedSize = 0, this._directedSelfLoopCount = 0, this._undirectedSelfLoopCount = 0;
  }
  /**---------------------------------------------------------------------------
   * Read
   **---------------------------------------------------------------------------
   */
  /**
   * Method returning whether the given node is found in the graph.
   *
   * @param  {any}     node - The node.
   * @return {boolean}
   */
  hasNode(e) {
    return this._nodes.has("" + e);
  }
  /**
   * Method returning whether the given directed edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasDirectedEdge(e, t) {
    if (this.type === "undirected") return !1;
    if (arguments.length === 1) {
      const i = "" + e, r = this._edges.get(i);
      return !!r && !r.undirected;
    } else if (arguments.length === 2) {
      e = "" + e, t = "" + t;
      const i = this._nodes.get(e);
      return i ? i.out.hasOwnProperty(t) : !1;
    }
    throw new O(
      `Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
  }
  /**
   * Method returning whether the given undirected edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasUndirectedEdge(e, t) {
    if (this.type === "directed") return !1;
    if (arguments.length === 1) {
      const i = "" + e, r = this._edges.get(i);
      return !!r && r.undirected;
    } else if (arguments.length === 2) {
      e = "" + e, t = "" + t;
      const i = this._nodes.get(e);
      return i ? i.undirected.hasOwnProperty(t) : !1;
    }
    throw new O(
      `Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
  }
  /**
   * Method returning whether the given edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasEdge(e, t) {
    if (arguments.length === 1) {
      const i = "" + e;
      return this._edges.has(i);
    } else if (arguments.length === 2) {
      e = "" + e, t = "" + t;
      const i = this._nodes.get(e);
      return i ? typeof i.out != "undefined" && i.out.hasOwnProperty(t) || typeof i.undirected != "undefined" && i.undirected.hasOwnProperty(t) : !1;
    }
    throw new O(
      `Graph.hasEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
  }
  /**
   * Method returning the edge matching source & target in a directed fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  directedEdge(e, t) {
    if (this.type === "undirected") return;
    if (e = "" + e, t = "" + t, this.multi)
      throw new q(
        "Graph.directedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.directedEdges instead."
      );
    const i = this._nodes.get(e);
    if (!i)
      throw new P(
        `Graph.directedEdge: could not find the "${e}" source node in the graph.`
      );
    if (!this._nodes.has(t))
      throw new P(
        `Graph.directedEdge: could not find the "${t}" target node in the graph.`
      );
    const r = i.out && i.out[t] || void 0;
    if (r) return r.key;
  }
  /**
   * Method returning the edge matching source & target in a undirected fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  undirectedEdge(e, t) {
    if (this.type === "directed") return;
    if (e = "" + e, t = "" + t, this.multi)
      throw new q(
        "Graph.undirectedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.undirectedEdges instead."
      );
    const i = this._nodes.get(e);
    if (!i)
      throw new P(
        `Graph.undirectedEdge: could not find the "${e}" source node in the graph.`
      );
    if (!this._nodes.has(t))
      throw new P(
        `Graph.undirectedEdge: could not find the "${t}" target node in the graph.`
      );
    const r = i.undirected && i.undirected[t] || void 0;
    if (r) return r.key;
  }
  /**
   * Method returning the edge matching source & target in a mixed fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  edge(e, t) {
    if (this.multi)
      throw new q(
        "Graph.edge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.edges instead."
      );
    e = "" + e, t = "" + t;
    const i = this._nodes.get(e);
    if (!i)
      throw new P(
        `Graph.edge: could not find the "${e}" source node in the graph.`
      );
    if (!this._nodes.has(t))
      throw new P(
        `Graph.edge: could not find the "${t}" target node in the graph.`
      );
    const r = i.out && i.out[t] || i.undirected && i.undirected[t] || void 0;
    if (r) return r.key;
  }
  /**
   * Method returning whether two nodes are directed neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areDirectedNeighbors(e, t) {
    e = "" + e, t = "" + t;
    const i = this._nodes.get(e);
    if (!i)
      throw new P(
        `Graph.areDirectedNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? !1 : t in i.in || t in i.out;
  }
  /**
   * Method returning whether two nodes are out neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areOutNeighbors(e, t) {
    e = "" + e, t = "" + t;
    const i = this._nodes.get(e);
    if (!i)
      throw new P(
        `Graph.areOutNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? !1 : t in i.out;
  }
  /**
   * Method returning whether two nodes are in neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areInNeighbors(e, t) {
    e = "" + e, t = "" + t;
    const i = this._nodes.get(e);
    if (!i)
      throw new P(
        `Graph.areInNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? !1 : t in i.in;
  }
  /**
   * Method returning whether two nodes are undirected neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areUndirectedNeighbors(e, t) {
    e = "" + e, t = "" + t;
    const i = this._nodes.get(e);
    if (!i)
      throw new P(
        `Graph.areUndirectedNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type === "directed" ? !1 : t in i.undirected;
  }
  /**
   * Method returning whether two nodes are neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areNeighbors(e, t) {
    e = "" + e, t = "" + t;
    const i = this._nodes.get(e);
    if (!i)
      throw new P(
        `Graph.areNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type !== "undirected" && (t in i.in || t in i.out) || this.type !== "directed" && t in i.undirected;
  }
  /**
   * Method returning whether two nodes are inbound neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areInboundNeighbors(e, t) {
    e = "" + e, t = "" + t;
    const i = this._nodes.get(e);
    if (!i)
      throw new P(
        `Graph.areInboundNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type !== "undirected" && t in i.in || this.type !== "directed" && t in i.undirected;
  }
  /**
   * Method returning whether two nodes are outbound neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areOutboundNeighbors(e, t) {
    e = "" + e, t = "" + t;
    const i = this._nodes.get(e);
    if (!i)
      throw new P(
        `Graph.areOutboundNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type !== "undirected" && t in i.out || this.type !== "directed" && t in i.undirected;
  }
  /**
   * Method returning the given node's in degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inDegree(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.inDegree: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? 0 : t.inDegree;
  }
  /**
   * Method returning the given node's out degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outDegree(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.outDegree: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? 0 : t.outDegree;
  }
  /**
   * Method returning the given node's directed degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  directedDegree(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.directedDegree: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? 0 : t.inDegree + t.outDegree;
  }
  /**
   * Method returning the given node's undirected degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  undirectedDegree(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.undirectedDegree: could not find the "${e}" node in the graph.`
      );
    return this.type === "directed" ? 0 : t.undirectedDegree;
  }
  /**
   * Method returning the given node's inbound degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's inbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inboundDegree(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.inboundDegree: could not find the "${e}" node in the graph.`
      );
    let i = 0;
    return this.type !== "directed" && (i += t.undirectedDegree), this.type !== "undirected" && (i += t.inDegree), i;
  }
  /**
   * Method returning the given node's outbound degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's outbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outboundDegree(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.outboundDegree: could not find the "${e}" node in the graph.`
      );
    let i = 0;
    return this.type !== "directed" && (i += t.undirectedDegree), this.type !== "undirected" && (i += t.outDegree), i;
  }
  /**
   * Method returning the given node's directed degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  degree(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.degree: could not find the "${e}" node in the graph.`
      );
    let i = 0;
    return this.type !== "directed" && (i += t.undirectedDegree), this.type !== "undirected" && (i += t.inDegree + t.outDegree), i;
  }
  /**
   * Method returning the given node's in degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inDegreeWithoutSelfLoops(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.inDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? 0 : t.inDegree - t.directedLoops;
  }
  /**
   * Method returning the given node's out degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outDegreeWithoutSelfLoops(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.outDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? 0 : t.outDegree - t.directedLoops;
  }
  /**
   * Method returning the given node's directed degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  directedDegreeWithoutSelfLoops(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.directedDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? 0 : t.inDegree + t.outDegree - t.directedLoops * 2;
  }
  /**
   * Method returning the given node's undirected degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  undirectedDegreeWithoutSelfLoops(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.undirectedDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    return this.type === "directed" ? 0 : t.undirectedDegree - t.undirectedLoops * 2;
  }
  /**
   * Method returning the given node's inbound degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's inbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inboundDegreeWithoutSelfLoops(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.inboundDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    let i = 0, r = 0;
    return this.type !== "directed" && (i += t.undirectedDegree, r += t.undirectedLoops * 2), this.type !== "undirected" && (i += t.inDegree, r += t.directedLoops), i - r;
  }
  /**
   * Method returning the given node's outbound degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's outbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outboundDegreeWithoutSelfLoops(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.outboundDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    let i = 0, r = 0;
    return this.type !== "directed" && (i += t.undirectedDegree, r += t.undirectedLoops * 2), this.type !== "undirected" && (i += t.outDegree, r += t.directedLoops), i - r;
  }
  /**
   * Method returning the given node's directed degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  degreeWithoutSelfLoops(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.degreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    let i = 0, r = 0;
    return this.type !== "directed" && (i += t.undirectedDegree, r += t.undirectedLoops * 2), this.type !== "undirected" && (i += t.inDegree + t.outDegree, r += t.directedLoops * 2), i - r;
  }
  /**
   * Method returning the given edge's source.
   *
   * @param  {any} edge - The edge's key.
   * @return {any}      - The edge's source.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  source(e) {
    e = "" + e;
    const t = this._edges.get(e);
    if (!t)
      throw new P(
        `Graph.source: could not find the "${e}" edge in the graph.`
      );
    return t.source.key;
  }
  /**
   * Method returning the given edge's target.
   *
   * @param  {any} edge - The edge's key.
   * @return {any}      - The edge's target.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  target(e) {
    e = "" + e;
    const t = this._edges.get(e);
    if (!t)
      throw new P(
        `Graph.target: could not find the "${e}" edge in the graph.`
      );
    return t.target.key;
  }
  /**
   * Method returning the given edge's extremities.
   *
   * @param  {any}   edge - The edge's key.
   * @return {array}      - The edge's extremities.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  extremities(e) {
    e = "" + e;
    const t = this._edges.get(e);
    if (!t)
      throw new P(
        `Graph.extremities: could not find the "${e}" edge in the graph.`
      );
    return [t.source.key, t.target.key];
  }
  /**
   * Given a node & an edge, returns the other extremity of the edge.
   *
   * @param  {any}   node - The node's key.
   * @param  {any}   edge - The edge's key.
   * @return {any}        - The related node.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph or if the
   *                   edge & node are not related.
   */
  opposite(e, t) {
    e = "" + e, t = "" + t;
    const i = this._edges.get(t);
    if (!i)
      throw new P(
        `Graph.opposite: could not find the "${t}" edge in the graph.`
      );
    const r = i.source.key, n = i.target.key;
    if (e === r) return n;
    if (e === n) return r;
    throw new P(
      `Graph.opposite: the "${e}" node is not attached to the "${t}" edge (${r}, ${n}).`
    );
  }
  /**
   * Returns whether the given edge has the given node as extremity.
   *
   * @param  {any}     edge - The edge's key.
   * @param  {any}     node - The node's key.
   * @return {boolean}      - The related node.
   *
   * @throws {Error} - Will throw if either the node or the edge isn't in the graph.
   */
  hasExtremity(e, t) {
    e = "" + e, t = "" + t;
    const i = this._edges.get(e);
    if (!i)
      throw new P(
        `Graph.hasExtremity: could not find the "${e}" edge in the graph.`
      );
    return i.source.key === t || i.target.key === t;
  }
  /**
   * Method returning whether the given edge is undirected.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isUndirected(e) {
    e = "" + e;
    const t = this._edges.get(e);
    if (!t)
      throw new P(
        `Graph.isUndirected: could not find the "${e}" edge in the graph.`
      );
    return t.undirected;
  }
  /**
   * Method returning whether the given edge is directed.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isDirected(e) {
    e = "" + e;
    const t = this._edges.get(e);
    if (!t)
      throw new P(
        `Graph.isDirected: could not find the "${e}" edge in the graph.`
      );
    return !t.undirected;
  }
  /**
   * Method returning whether the given edge is a self loop.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isSelfLoop(e) {
    e = "" + e;
    const t = this._edges.get(e);
    if (!t)
      throw new P(
        `Graph.isSelfLoop: could not find the "${e}" edge in the graph.`
      );
    return t.source === t.target;
  }
  /**---------------------------------------------------------------------------
   * Mutation
   **---------------------------------------------------------------------------
   */
  /**
   * Method used to add a node to the graph.
   *
   * @param  {any}    node         - The node.
   * @param  {object} [attributes] - Optional attributes.
   * @return {any}                 - The node.
   *
   * @throws {Error} - Will throw if the given node already exist.
   * @throws {Error} - Will throw if the given attributes are not an object.
   */
  addNode(e, t) {
    return Ds(this, e, t).key;
  }
  /**
   * Method used to merge a node into the graph.
   *
   * @param  {any}    node         - The node.
   * @param  {object} [attributes] - Optional attributes.
   * @return {any}                 - The node.
   */
  mergeNode(e, t) {
    if (t && !ce(t))
      throw new O(
        `Graph.mergeNode: invalid attributes. Expecting an object but got "${t}"`
      );
    e = "" + e, t = t || {};
    let i = this._nodes.get(e);
    return i ? (t && (he(i.attributes, t), this.emit("nodeAttributesUpdated", {
      type: "merge",
      key: e,
      attributes: i.attributes,
      data: t
    })), [e, !1]) : (i = new this.NodeDataClass(e, t), this._nodes.set(e, i), this.emit("nodeAdded", {
      key: e,
      attributes: t
    }), [e, !0]);
  }
  /**
   * Method used to add a node if it does not exist in the graph or else to
   * update its attributes using a function.
   *
   * @param  {any}      node      - The node.
   * @param  {function} [updater] - Optional updater function.
   * @return {any}                - The node.
   */
  updateNode(e, t) {
    if (t && typeof t != "function")
      throw new O(
        `Graph.updateNode: invalid updater function. Expecting a function but got "${t}"`
      );
    e = "" + e;
    let i = this._nodes.get(e);
    if (i) {
      if (t) {
        const n = i.attributes;
        i.attributes = t(n), this.emit("nodeAttributesUpdated", {
          type: "replace",
          key: e,
          attributes: i.attributes
        });
      }
      return [e, !1];
    }
    const r = t ? t({}) : {};
    return i = new this.NodeDataClass(e, r), this._nodes.set(e, i), this.emit("nodeAdded", {
      key: e,
      attributes: r
    }), [e, !0];
  }
  /**
   * Method used to drop a single node & all its attached edges from the graph.
   *
   * @param  {any}    node - The node.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the node doesn't exist.
   */
  dropNode(e) {
    e = "" + e;
    const t = this._nodes.get(e);
    if (!t)
      throw new P(
        `Graph.dropNode: could not find the "${e}" node in the graph.`
      );
    let i;
    if (this.type !== "undirected") {
      for (const r in t.out) {
        i = t.out[r];
        do
          qe(this, i), i = i.next;
        while (i);
      }
      for (const r in t.in) {
        i = t.in[r];
        do
          qe(this, i), i = i.next;
        while (i);
      }
    }
    if (this.type !== "directed")
      for (const r in t.undirected) {
        i = t.undirected[r];
        do
          qe(this, i), i = i.next;
        while (i);
      }
    this._nodes.delete(e), this.emit("nodeDropped", {
      key: e,
      attributes: t.attributes
    });
  }
  /**
   * Method used to drop a single edge from the graph.
   *
   * Arity 1:
   * @param  {any}    edge - The edge.
   *
   * Arity 2:
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropEdge(e) {
    let t;
    if (arguments.length > 1) {
      const i = "" + arguments[0], r = "" + arguments[1];
      if (t = be(this, i, r, this.type), !t)
        throw new P(
          `Graph.dropEdge: could not find the "${i}" -> "${r}" edge in the graph.`
        );
    } else if (e = "" + e, t = this._edges.get(e), !t)
      throw new P(
        `Graph.dropEdge: could not find the "${e}" edge in the graph.`
      );
    return qe(this, t), this;
  }
  /**
   * Method used to drop a single directed edge from the graph.
   *
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropDirectedEdge(e, t) {
    if (arguments.length < 2)
      throw new q(
        "Graph.dropDirectedEdge: it does not make sense to try and drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead."
      );
    if (this.multi)
      throw new q(
        "Graph.dropDirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones."
      );
    e = "" + e, t = "" + t;
    const i = be(this, e, t, "directed");
    if (!i)
      throw new P(
        `Graph.dropDirectedEdge: could not find a "${e}" -> "${t}" edge in the graph.`
      );
    return qe(this, i), this;
  }
  /**
   * Method used to drop a single undirected edge from the graph.
   *
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropUndirectedEdge(e, t) {
    if (arguments.length < 2)
      throw new q(
        "Graph.dropUndirectedEdge: it does not make sense to drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead."
      );
    if (this.multi)
      throw new q(
        "Graph.dropUndirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones."
      );
    const i = be(this, e, t, "undirected");
    if (!i)
      throw new P(
        `Graph.dropUndirectedEdge: could not find a "${e}" -> "${t}" edge in the graph.`
      );
    return qe(this, i), this;
  }
  /**
   * Method used to remove every edge & every node from the graph.
   *
   * @return {Graph}
   */
  clear() {
    this._edges.clear(), this._nodes.clear(), this._resetInstanceCounters(), this.emit("cleared");
  }
  /**
   * Method used to remove every edge from the graph.
   *
   * @return {Graph}
   */
  clearEdges() {
    const e = this._nodes.values();
    let t;
    for (; t = e.next(), t.done !== !0; )
      t.value.clear();
    this._edges.clear(), this._resetInstanceCounters(), this.emit("edgesCleared");
  }
  /**---------------------------------------------------------------------------
   * Attributes-related methods
   **---------------------------------------------------------------------------
   */
  /**
   * Method returning the desired graph's attribute.
   *
   * @param  {string} name - Name of the attribute.
   * @return {any}
   */
  getAttribute(e) {
    return this._attributes[e];
  }
  /**
   * Method returning the graph's attributes.
   *
   * @return {object}
   */
  getAttributes() {
    return this._attributes;
  }
  /**
   * Method returning whether the graph has the desired attribute.
   *
   * @param  {string}  name - Name of the attribute.
   * @return {boolean}
   */
  hasAttribute(e) {
    return this._attributes.hasOwnProperty(e);
  }
  /**
   * Method setting a value for the desired graph's attribute.
   *
   * @param  {string}  name  - Name of the attribute.
   * @param  {any}     value - Value for the attribute.
   * @return {Graph}
   */
  setAttribute(e, t) {
    return this._attributes[e] = t, this.emit("attributesUpdated", {
      type: "set",
      attributes: this._attributes,
      name: e
    }), this;
  }
  /**
   * Method using a function to update the desired graph's attribute's value.
   *
   * @param  {string}   name    - Name of the attribute.
   * @param  {function} updater - Function use to update the attribute's value.
   * @return {Graph}
   */
  updateAttribute(e, t) {
    if (typeof t != "function")
      throw new O(
        "Graph.updateAttribute: updater should be a function."
      );
    const i = this._attributes[e];
    return this._attributes[e] = t(i), this.emit("attributesUpdated", {
      type: "set",
      attributes: this._attributes,
      name: e
    }), this;
  }
  /**
   * Method removing the desired graph's attribute.
   *
   * @param  {string} name  - Name of the attribute.
   * @return {Graph}
   */
  removeAttribute(e) {
    return delete this._attributes[e], this.emit("attributesUpdated", {
      type: "remove",
      attributes: this._attributes,
      name: e
    }), this;
  }
  /**
   * Method replacing the graph's attributes.
   *
   * @param  {object} attributes - New attributes.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given attributes are not a plain object.
   */
  replaceAttributes(e) {
    if (!ce(e))
      throw new O(
        "Graph.replaceAttributes: provided attributes are not a plain object."
      );
    return this._attributes = e, this.emit("attributesUpdated", {
      type: "replace",
      attributes: this._attributes
    }), this;
  }
  /**
   * Method merging the graph's attributes.
   *
   * @param  {object} attributes - Attributes to merge.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given attributes are not a plain object.
   */
  mergeAttributes(e) {
    if (!ce(e))
      throw new O(
        "Graph.mergeAttributes: provided attributes are not a plain object."
      );
    return he(this._attributes, e), this.emit("attributesUpdated", {
      type: "merge",
      attributes: this._attributes,
      data: e
    }), this;
  }
  /**
   * Method updating the graph's attributes.
   *
   * @param  {function} updater - Function used to update the attributes.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given updater is not a function.
   */
  updateAttributes(e) {
    if (typeof e != "function")
      throw new O(
        "Graph.updateAttributes: provided updater is not a function."
      );
    return this._attributes = e(this._attributes), this.emit("attributesUpdated", {
      type: "update",
      attributes: this._attributes
    }), this;
  }
  /**
   * Method used to update each node's attributes using the given function.
   *
   * @param {function}  updater - Updater function to use.
   * @param {object}    [hints] - Optional hints.
   */
  updateEachNodeAttributes(e, t) {
    if (typeof e != "function")
      throw new O(
        "Graph.updateEachNodeAttributes: expecting an updater function."
      );
    if (t && !xi(t))
      throw new O(
        "Graph.updateEachNodeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}"
      );
    const i = this._nodes.values();
    let r, n;
    for (; r = i.next(), r.done !== !0; )
      n = r.value, n.attributes = e(n.key, n.attributes);
    this.emit("eachNodeAttributesUpdated", {
      hints: t || null
    });
  }
  /**
   * Method used to update each edge's attributes using the given function.
   *
   * @param {function}  updater - Updater function to use.
   * @param {object}    [hints] - Optional hints.
   */
  updateEachEdgeAttributes(e, t) {
    if (typeof e != "function")
      throw new O(
        "Graph.updateEachEdgeAttributes: expecting an updater function."
      );
    if (t && !xi(t))
      throw new O(
        "Graph.updateEachEdgeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}"
      );
    const i = this._edges.values();
    let r, n, o, a;
    for (; r = i.next(), r.done !== !0; )
      n = r.value, o = n.source, a = n.target, n.attributes = e(
        n.key,
        n.attributes,
        o.key,
        a.key,
        o.attributes,
        a.attributes,
        n.undirected
      );
    this.emit("eachEdgeAttributesUpdated", {
      hints: t || null
    });
  }
  /**---------------------------------------------------------------------------
   * Iteration-related methods
   **---------------------------------------------------------------------------
   */
  /**
   * Method iterating over the graph's adjacency using the given callback.
   *
   * @param  {function}  callback - Callback to use.
   */
  forEachAdjacencyEntry(e) {
    if (typeof e != "function")
      throw new O(
        "Graph.forEachAdjacencyEntry: expecting a callback."
      );
    ft(!1, !1, !1, this, e);
  }
  forEachAdjacencyEntryWithOrphans(e) {
    if (typeof e != "function")
      throw new O(
        "Graph.forEachAdjacencyEntryWithOrphans: expecting a callback."
      );
    ft(!1, !1, !0, this, e);
  }
  /**
   * Method iterating over the graph's assymetric adjacency using the given callback.
   *
   * @param  {function}  callback - Callback to use.
   */
  forEachAssymetricAdjacencyEntry(e) {
    if (typeof e != "function")
      throw new O(
        "Graph.forEachAssymetricAdjacencyEntry: expecting a callback."
      );
    ft(!1, !0, !1, this, e);
  }
  forEachAssymetricAdjacencyEntryWithOrphans(e) {
    if (typeof e != "function")
      throw new O(
        "Graph.forEachAssymetricAdjacencyEntryWithOrphans: expecting a callback."
      );
    ft(!1, !0, !0, this, e);
  }
  /**
   * Method returning the list of the graph's nodes.
   *
   * @return {array} - The nodes.
   */
  nodes() {
    return Array.from(this._nodes.keys());
  }
  /**
   * Method iterating over the graph's nodes using the given callback.
   *
   * @param  {function}  callback - Callback (key, attributes, index).
   */
  forEachNode(e) {
    if (typeof e != "function")
      throw new O(
        "Graph.forEachNode: expecting a callback."
      );
    const t = this._nodes.values();
    let i, r;
    for (; i = t.next(), i.done !== !0; )
      r = i.value, e(r.key, r.attributes);
  }
  /**
   * Method iterating attempting to find a node matching the given predicate
   * function.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  findNode(e) {
    if (typeof e != "function")
      throw new O(
        "Graph.findNode: expecting a callback."
      );
    const t = this._nodes.values();
    let i, r;
    for (; i = t.next(), i.done !== !0; )
      if (r = i.value, e(r.key, r.attributes)) return r.key;
  }
  /**
   * Method mapping nodes.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  mapNodes(e) {
    if (typeof e != "function")
      throw new O(
        "Graph.mapNode: expecting a callback."
      );
    const t = this._nodes.values();
    let i, r;
    const n = new Array(this.order);
    let o = 0;
    for (; i = t.next(), i.done !== !0; )
      r = i.value, n[o++] = e(r.key, r.attributes);
    return n;
  }
  /**
   * Method returning whether some node verify the given predicate.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  someNode(e) {
    if (typeof e != "function")
      throw new O(
        "Graph.someNode: expecting a callback."
      );
    const t = this._nodes.values();
    let i, r;
    for (; i = t.next(), i.done !== !0; )
      if (r = i.value, e(r.key, r.attributes)) return !0;
    return !1;
  }
  /**
   * Method returning whether all node verify the given predicate.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  everyNode(e) {
    if (typeof e != "function")
      throw new O(
        "Graph.everyNode: expecting a callback."
      );
    const t = this._nodes.values();
    let i, r;
    for (; i = t.next(), i.done !== !0; )
      if (r = i.value, !e(r.key, r.attributes)) return !1;
    return !0;
  }
  /**
   * Method filtering nodes.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  filterNodes(e) {
    if (typeof e != "function")
      throw new O(
        "Graph.filterNodes: expecting a callback."
      );
    const t = this._nodes.values();
    let i, r;
    const n = [];
    for (; i = t.next(), i.done !== !0; )
      r = i.value, e(r.key, r.attributes) && n.push(r.key);
    return n;
  }
  /**
   * Method reducing nodes.
   *
   * @param  {function}  callback - Callback (accumulator, key, attributes).
   */
  reduceNodes(e, t) {
    if (typeof e != "function")
      throw new O(
        "Graph.reduceNodes: expecting a callback."
      );
    if (arguments.length < 2)
      throw new O(
        "Graph.reduceNodes: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array."
      );
    let i = t;
    const r = this._nodes.values();
    let n, o;
    for (; n = r.next(), n.done !== !0; )
      o = n.value, i = e(i, o.key, o.attributes);
    return i;
  }
  /**
   * Method returning an iterator over the graph's node entries.
   *
   * @return {Iterator}
   */
  nodeEntries() {
    const e = this._nodes.values();
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const t = e.next();
        if (t.done) return t;
        const i = t.value;
        return {
          value: { node: i.key, attributes: i.attributes },
          done: !1
        };
      }
    };
  }
  /**---------------------------------------------------------------------------
   * Serialization
   **---------------------------------------------------------------------------
   */
  /**
   * Method used to export the whole graph.
   *
   * @return {object} - The serialized graph.
   */
  export() {
    const e = new Array(this._nodes.size);
    let t = 0;
    this._nodes.forEach((r, n) => {
      e[t++] = ks(n, r);
    });
    const i = new Array(this._edges.size);
    return t = 0, this._edges.forEach((r, n) => {
      i[t++] = Ts(this.type, n, r);
    }), {
      options: {
        type: this.type,
        multi: this.multi,
        allowSelfLoops: this.allowSelfLoops
      },
      attributes: this.getAttributes(),
      nodes: e,
      edges: i
    };
  }
  /**
   * Method used to import a serialized graph.
   *
   * @param  {object|Graph} data  - The serialized graph.
   * @param  {boolean}      merge - Whether to merge data.
   * @return {Graph}              - Returns itself for chaining.
   */
  import(e, t = !1) {
    if (e instanceof ee)
      return e.forEachNode((h, l) => {
        t ? this.mergeNode(h, l) : this.addNode(h, l);
      }), e.forEachEdge((h, l, c, d, f, w, v) => {
        t ? v ? this.mergeUndirectedEdgeWithKey(h, c, d, l) : this.mergeDirectedEdgeWithKey(h, c, d, l) : v ? this.addUndirectedEdgeWithKey(h, c, d, l) : this.addDirectedEdgeWithKey(h, c, d, l);
      }), this;
    if (!ce(e))
      throw new O(
        "Graph.import: invalid argument. Expecting a serialized graph or, alternatively, a Graph instance."
      );
    if (e.attributes) {
      if (!ce(e.attributes))
        throw new O(
          "Graph.import: invalid attributes. Expecting a plain object."
        );
      t ? this.mergeAttributes(e.attributes) : this.replaceAttributes(e.attributes);
    }
    let i, r, n, o, a;
    if (e.nodes) {
      if (n = e.nodes, !Array.isArray(n))
        throw new O(
          "Graph.import: invalid nodes. Expecting an array."
        );
      for (i = 0, r = n.length; i < r; i++) {
        o = n[i], Cs(o);
        const { key: h, attributes: l } = o;
        t ? this.mergeNode(h, l) : this.addNode(h, l);
      }
    }
    if (e.edges) {
      let h = !1;
      if (this.type === "undirected" && (h = !0), n = e.edges, !Array.isArray(n))
        throw new O(
          "Graph.import: invalid edges. Expecting an array."
        );
      for (i = 0, r = n.length; i < r; i++) {
        a = n[i], As(a);
        const {
          source: l,
          target: c,
          attributes: d,
          undirected: f = h
        } = a;
        let w;
        "key" in a ? (w = t ? f ? this.mergeUndirectedEdgeWithKey : this.mergeDirectedEdgeWithKey : f ? this.addUndirectedEdgeWithKey : this.addDirectedEdgeWithKey, w.call(this, a.key, l, c, d)) : (w = t ? f ? this.mergeUndirectedEdge : this.mergeDirectedEdge : f ? this.addUndirectedEdge : this.addDirectedEdge, w.call(this, l, c, d));
      }
    }
    return this;
  }
  /**---------------------------------------------------------------------------
   * Utils
   **---------------------------------------------------------------------------
   */
  /**
   * Method returning a null copy of the graph, i.e. a graph without nodes
   * & edges but with the exact same options.
   *
   * @param  {object} options - Options to merge with the current ones.
   * @return {Graph}          - The null copy.
   */
  nullCopy(e) {
    const t = new ee(he({}, this._options, e));
    return t.replaceAttributes(he({}, this.getAttributes())), t;
  }
  /**
   * Method returning an empty copy of the graph, i.e. a graph without edges but
   * with the exact same options.
   *
   * @param  {object} options - Options to merge with the current ones.
   * @return {Graph}          - The empty copy.
   */
  emptyCopy(e) {
    const t = this.nullCopy(e);
    return this._nodes.forEach((i, r) => {
      const n = he({}, i.attributes);
      i = new t.NodeDataClass(r, n), t._nodes.set(r, i);
    }), t;
  }
  /**
   * Method returning an exact copy of the graph.
   *
   * @param  {object} options - Upgrade options.
   * @return {Graph}          - The copy.
   */
  copy(e) {
    if (e = e || {}, typeof e.type == "string" && e.type !== this.type && e.type !== "mixed")
      throw new q(
        `Graph.copy: cannot create an incompatible copy from "${this.type}" type to "${e.type}" because this would mean losing information about the current graph.`
      );
    if (typeof e.multi == "boolean" && e.multi !== this.multi && e.multi !== !0)
      throw new q(
        "Graph.copy: cannot create an incompatible copy by downgrading a multi graph to a simple one because this would mean losing information about the current graph."
      );
    if (typeof e.allowSelfLoops == "boolean" && e.allowSelfLoops !== this.allowSelfLoops && e.allowSelfLoops !== !0)
      throw new q(
        "Graph.copy: cannot create an incompatible copy from a graph allowing self loops to one that does not because this would mean losing information about the current graph."
      );
    const t = this.emptyCopy(e), i = this._edges.values();
    let r, n;
    for (; r = i.next(), r.done !== !0; )
      n = r.value, Fr(
        t,
        "copy",
        !1,
        n.undirected,
        n.key,
        n.source.key,
        n.target.key,
        he({}, n.attributes)
      );
    return t;
  }
  /**---------------------------------------------------------------------------
   * Known methods
   **---------------------------------------------------------------------------
   */
  /**
   * Method used by JavaScript to perform JSON serialization.
   *
   * @return {object} - The serialized graph.
   */
  toJSON() {
    return this.export();
  }
  /**
   * Method returning [object Graph].
   */
  toString() {
    return "[object Graph]";
  }
  /**
   * Method used internally by node's console to display a custom object.
   *
   * @return {object} - Formatted object representation of the graph.
   */
  inspect() {
    const e = {};
    this._nodes.forEach((n, o) => {
      e[o] = n.attributes;
    });
    const t = {}, i = {};
    this._edges.forEach((n, o) => {
      const a = n.undirected ? "--" : "->";
      let h = "", l = n.source.key, c = n.target.key, d;
      n.undirected && l > c && (d = l, l = c, c = d);
      const f = `(${l})${a}(${c})`;
      o.startsWith("geid_") ? this.multi && (typeof i[f] == "undefined" ? i[f] = 0 : i[f]++, h += `${i[f]}. `) : h += `[${o}]: `, h += f, t[h] = n.attributes;
    });
    const r = {};
    for (const n in this)
      this.hasOwnProperty(n) && !Si.has(n) && typeof this[n] != "function" && typeof n != "symbol" && (r[n] = this[n]);
    return r.attributes = this._attributes, r.nodes = e, r.edges = t, we(r, "constructor", this.constructor), r;
  }
}
typeof Symbol != "undefined" && (ee.prototype[Symbol.for("nodejs.util.inspect.custom")] = ee.prototype.inspect);
Gs.forEach((s) => {
  ["add", "merge", "update"].forEach((e) => {
    const t = s.name(e), i = e === "add" ? Fr : Is;
    s.generateKey ? ee.prototype[t] = function(r, n, o) {
      return i(
        this,
        t,
        !0,
        (s.type || this.type) === "undirected",
        null,
        r,
        n,
        o,
        e === "update"
      );
    } : ee.prototype[t] = function(r, n, o, a) {
      return i(
        this,
        t,
        !1,
        (s.type || this.type) === "undirected",
        r,
        n,
        o,
        a,
        e === "update"
      );
    };
  });
});
Hn(ee);
es(ee);
vs(ee);
_s(ee);
class Or extends ee {
  constructor(e) {
    const t = he({ type: "directed" }, e);
    if ("multi" in t && t.multi !== !1)
      throw new O(
        "DirectedGraph.from: inconsistent indication that the graph should be multi in given options!"
      );
    if (t.type !== "directed")
      throw new O(
        'DirectedGraph.from: inconsistent "' + t.type + '" type in given options!'
      );
    super(t);
  }
}
class Br extends ee {
  constructor(e) {
    const t = he({ type: "undirected" }, e);
    if ("multi" in t && t.multi !== !1)
      throw new O(
        "UndirectedGraph.from: inconsistent indication that the graph should be multi in given options!"
      );
    if (t.type !== "undirected")
      throw new O(
        'UndirectedGraph.from: inconsistent "' + t.type + '" type in given options!'
      );
    super(t);
  }
}
class Ur extends ee {
  constructor(e) {
    const t = he({ multi: !0 }, e);
    if ("multi" in t && t.multi !== !0)
      throw new O(
        "MultiGraph.from: inconsistent indication that the graph should be simple in given options!"
      );
    super(t);
  }
}
class Hr extends ee {
  constructor(e) {
    const t = he({ type: "directed", multi: !0 }, e);
    if ("multi" in t && t.multi !== !0)
      throw new O(
        "MultiDirectedGraph.from: inconsistent indication that the graph should be simple in given options!"
      );
    if (t.type !== "directed")
      throw new O(
        'MultiDirectedGraph.from: inconsistent "' + t.type + '" type in given options!'
      );
    super(t);
  }
}
class jr extends ee {
  constructor(e) {
    const t = he({ type: "undirected", multi: !0 }, e);
    if ("multi" in t && t.multi !== !0)
      throw new O(
        "MultiUndirectedGraph.from: inconsistent indication that the graph should be simple in given options!"
      );
    if (t.type !== "undirected")
      throw new O(
        'MultiUndirectedGraph.from: inconsistent "' + t.type + '" type in given options!'
      );
    super(t);
  }
}
function Je(s) {
  s.from = function(e, t) {
    const i = he({}, e.options, t), r = new s(i);
    return r.import(e), r;
  };
}
Je(ee);
Je(Or);
Je(Br);
Je(Ur);
Je(Hr);
Je(jr);
ee.Graph = ee;
ee.DirectedGraph = Or;
ee.UndirectedGraph = Br;
ee.MultiGraph = Ur;
ee.MultiDirectedGraph = Hr;
ee.MultiUndirectedGraph = jr;
ee.InvalidArgumentsGraphError = O;
ee.NotFoundGraphError = P;
ee.UsageGraphError = q;
function Ps(s, e) {
  if (typeof s != "object" || !s) return s;
  var t = s[Symbol.toPrimitive];
  if (t !== void 0) {
    var i = t.call(s, e);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(s);
}
function ht(s) {
  var e = Ps(s, "string");
  return typeof e == "symbol" ? e : e + "";
}
function de(s, e) {
  if (!(s instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function ki(s, e) {
  for (var t = 0; t < e.length; t++) {
    var i = e[t];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, ht(i.key), i);
  }
}
function ue(s, e, t) {
  return e && ki(s.prototype, e), t && ki(s, t), Object.defineProperty(s, "prototype", {
    writable: !1
  }), s;
}
function Ye(s) {
  return Ye = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Ye(s);
}
function Wr() {
  try {
    var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (e) {
  }
  return (Wr = function() {
    return !!s;
  })();
}
function $s(s) {
  if (s === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function zs(s, e) {
  if (e && (typeof e == "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return $s(s);
}
function ge(s, e, t) {
  return e = Ye(e), zs(s, Wr() ? Reflect.construct(e, t || [], Ye(s).constructor) : e.apply(s, t));
}
function Jt(s, e) {
  return Jt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, i) {
    return t.__proto__ = i, t;
  }, Jt(s, e);
}
function ve(s, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  s.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: s,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(s, "prototype", {
    writable: !1
  }), e && Jt(s, e);
}
function Ms(s) {
  if (Array.isArray(s)) return s;
}
function Fs(s, e) {
  var t = s == null ? null : typeof Symbol != "undefined" && s[Symbol.iterator] || s["@@iterator"];
  if (t != null) {
    var i, r, n, o, a = [], h = !0, l = !1;
    try {
      if (n = (t = t.call(s)).next, e === 0) {
        if (Object(t) !== t) return;
        h = !1;
      } else for (; !(h = (i = n.call(t)).done) && (a.push(i.value), a.length !== e); h = !0) ;
    } catch (c) {
      l = !0, r = c;
    } finally {
      try {
        if (!h && t.return != null && (o = t.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw r;
      }
    }
    return a;
  }
}
function ei(s, e) {
  (e == null || e > s.length) && (e = s.length);
  for (var t = 0, i = Array(e); t < e; t++) i[t] = s[t];
  return i;
}
function qr(s, e) {
  if (s) {
    if (typeof s == "string") return ei(s, e);
    var t = {}.toString.call(s).slice(8, -1);
    return t === "Object" && s.constructor && (t = s.constructor.name), t === "Map" || t === "Set" ? Array.from(s) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ei(s, e) : void 0;
  }
}
function Os() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Xe(s, e) {
  return Ms(s) || Fs(s, e) || qr(s, e) || Os();
}
var Rt = {
  black: "#000000",
  silver: "#C0C0C0",
  gray: "#808080",
  grey: "#808080",
  white: "#FFFFFF",
  maroon: "#800000",
  red: "#FF0000",
  purple: "#800080",
  fuchsia: "#FF00FF",
  green: "#008000",
  lime: "#00FF00",
  olive: "#808000",
  yellow: "#FFFF00",
  navy: "#000080",
  blue: "#0000FF",
  teal: "#008080",
  aqua: "#00FFFF",
  darkblue: "#00008B",
  mediumblue: "#0000CD",
  darkgreen: "#006400",
  darkcyan: "#008B8B",
  deepskyblue: "#00BFFF",
  darkturquoise: "#00CED1",
  mediumspringgreen: "#00FA9A",
  springgreen: "#00FF7F",
  cyan: "#00FFFF",
  midnightblue: "#191970",
  dodgerblue: "#1E90FF",
  lightseagreen: "#20B2AA",
  forestgreen: "#228B22",
  seagreen: "#2E8B57",
  darkslategray: "#2F4F4F",
  darkslategrey: "#2F4F4F",
  limegreen: "#32CD32",
  mediumseagreen: "#3CB371",
  turquoise: "#40E0D0",
  royalblue: "#4169E1",
  steelblue: "#4682B4",
  darkslateblue: "#483D8B",
  mediumturquoise: "#48D1CC",
  indigo: "#4B0082",
  darkolivegreen: "#556B2F",
  cadetblue: "#5F9EA0",
  cornflowerblue: "#6495ED",
  rebeccapurple: "#663399",
  mediumaquamarine: "#66CDAA",
  dimgray: "#696969",
  dimgrey: "#696969",
  slateblue: "#6A5ACD",
  olivedrab: "#6B8E23",
  slategray: "#708090",
  slategrey: "#708090",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  mediumslateblue: "#7B68EE",
  lawngreen: "#7CFC00",
  chartreuse: "#7FFF00",
  aquamarine: "#7FFFD4",
  skyblue: "#87CEEB",
  lightskyblue: "#87CEFA",
  blueviolet: "#8A2BE2",
  darkred: "#8B0000",
  darkmagenta: "#8B008B",
  saddlebrown: "#8B4513",
  darkseagreen: "#8FBC8F",
  lightgreen: "#90EE90",
  mediumpurple: "#9370DB",
  darkviolet: "#9400D3",
  palegreen: "#98FB98",
  darkorchid: "#9932CC",
  yellowgreen: "#9ACD32",
  sienna: "#A0522D",
  brown: "#A52A2A",
  darkgray: "#A9A9A9",
  darkgrey: "#A9A9A9",
  lightblue: "#ADD8E6",
  greenyellow: "#ADFF2F",
  paleturquoise: "#AFEEEE",
  lightsteelblue: "#B0C4DE",
  powderblue: "#B0E0E6",
  firebrick: "#B22222",
  darkgoldenrod: "#B8860B",
  mediumorchid: "#BA55D3",
  rosybrown: "#BC8F8F",
  darkkhaki: "#BDB76B",
  mediumvioletred: "#C71585",
  indianred: "#CD5C5C",
  peru: "#CD853F",
  chocolate: "#D2691E",
  tan: "#D2B48C",
  lightgray: "#D3D3D3",
  lightgrey: "#D3D3D3",
  thistle: "#D8BFD8",
  orchid: "#DA70D6",
  goldenrod: "#DAA520",
  palevioletred: "#DB7093",
  crimson: "#DC143C",
  gainsboro: "#DCDCDC",
  plum: "#DDA0DD",
  burlywood: "#DEB887",
  lightcyan: "#E0FFFF",
  lavender: "#E6E6FA",
  darksalmon: "#E9967A",
  violet: "#EE82EE",
  palegoldenrod: "#EEE8AA",
  lightcoral: "#F08080",
  khaki: "#F0E68C",
  aliceblue: "#F0F8FF",
  honeydew: "#F0FFF0",
  azure: "#F0FFFF",
  sandybrown: "#F4A460",
  wheat: "#F5DEB3",
  beige: "#F5F5DC",
  whitesmoke: "#F5F5F5",
  mintcream: "#F5FFFA",
  ghostwhite: "#F8F8FF",
  salmon: "#FA8072",
  antiquewhite: "#FAEBD7",
  linen: "#FAF0E6",
  lightgoldenrodyellow: "#FAFAD2",
  oldlace: "#FDF5E6",
  magenta: "#FF00FF",
  deeppink: "#FF1493",
  orangered: "#FF4500",
  tomato: "#FF6347",
  hotpink: "#FF69B4",
  coral: "#FF7F50",
  darkorange: "#FF8C00",
  lightsalmon: "#FFA07A",
  orange: "#FFA500",
  lightpink: "#FFB6C1",
  pink: "#FFC0CB",
  gold: "#FFD700",
  peachpuff: "#FFDAB9",
  navajowhite: "#FFDEAD",
  moccasin: "#FFE4B5",
  bisque: "#FFE4C4",
  mistyrose: "#FFE4E1",
  blanchedalmond: "#FFEBCD",
  papayawhip: "#FFEFD5",
  lavenderblush: "#FFF0F5",
  seashell: "#FFF5EE",
  cornsilk: "#FFF8DC",
  lemonchiffon: "#FFFACD",
  floralwhite: "#FFFAF0",
  snow: "#FFFAFA",
  lightyellow: "#FFFFE0",
  ivory: "#FFFFF0"
}, Vr = new Int8Array(4), Lt = new Int32Array(Vr.buffer, 0, 1), Bs = new Float32Array(Vr.buffer, 0, 1), Us = /^\s*rgba?\s*\(/, Hs = /^\s*rgba?\s*\(\s*([0-9]*)\s*,\s*([0-9]*)\s*,\s*([0-9]*)(?:\s*,\s*(.*)?)?\)\s*$/;
function js(s) {
  var e = 0, t = 0, i = 0, r = 1;
  if (s[0] === "#")
    s.length === 4 ? (e = parseInt(s.charAt(1) + s.charAt(1), 16), t = parseInt(s.charAt(2) + s.charAt(2), 16), i = parseInt(s.charAt(3) + s.charAt(3), 16)) : (e = parseInt(s.charAt(1) + s.charAt(2), 16), t = parseInt(s.charAt(3) + s.charAt(4), 16), i = parseInt(s.charAt(5) + s.charAt(6), 16)), s.length === 9 && (r = parseInt(s.charAt(7) + s.charAt(8), 16) / 255);
  else if (Us.test(s)) {
    var n = s.match(Hs);
    n && (e = +n[1], t = +n[2], i = +n[3], n[4] && (r = +n[4]));
  }
  return {
    r: e,
    g: t,
    b: i,
    a: r
  };
}
var Ve = {};
for (var pt in Rt)
  Ve[pt] = Ue(Rt[pt]), Ve[Rt[pt]] = Ve[pt];
function Yr(s, e, t, i, r) {
  return Lt[0] = i << 24 | t << 16 | e << 8 | s, Lt[0] = Lt[0] & 4278190079, Bs[0];
}
function Ue(s) {
  if (s = s.toLowerCase(), typeof Ve[s] != "undefined") return Ve[s];
  var e = js(s), t = e.r, i = e.g, r = e.b, n = e.a;
  n = n * 255 | 0;
  var o = Yr(t, i, r, n);
  return Ve[s] = o, o;
}
var Gt = {};
function Xr(s) {
  if (typeof Gt[s] != "undefined") return Gt[s];
  var e = (s & 16711680) >>> 16, t = (s & 65280) >>> 8, i = s & 255, r = 255, n = Yr(e, t, i, r);
  return Gt[s] = n, n;
}
function Ti(s, e, t, i) {
  return t + (e << 8) + (s << 16);
}
function Ci(s, e, t, i, r, n) {
  var o = Math.floor(t / n * r), a = Math.floor(s.drawingBufferHeight / n - i / n * r), h = new Uint8Array(4);
  s.bindFramebuffer(s.FRAMEBUFFER, e), s.readPixels(o, a, 1, 1, s.RGBA, s.UNSIGNED_BYTE, h);
  var l = Xe(h, 4), c = l[0], d = l[1], f = l[2], w = l[3];
  return [c, d, f, w];
}
function D(s, e, t) {
  return (e = ht(e)) in s ? Object.defineProperty(s, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : s[e] = t, s;
}
function Ai(s, e) {
  var t = Object.keys(s);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(s);
    e && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(s, r).enumerable;
    })), t.push.apply(t, i);
  }
  return t;
}
function H(s) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ai(Object(t), !0).forEach(function(i) {
      D(s, i, t[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(t)) : Ai(Object(t)).forEach(function(i) {
      Object.defineProperty(s, i, Object.getOwnPropertyDescriptor(t, i));
    });
  }
  return s;
}
function Ws(s, e) {
  for (; !{}.hasOwnProperty.call(s, e) && (s = Ye(s)) !== null; ) ;
  return s;
}
function ti() {
  return ti = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function(s, e, t) {
    var i = Ws(s, e);
    if (i) {
      var r = Object.getOwnPropertyDescriptor(i, e);
      return r.get ? r.get.call(arguments.length < 3 ? s : t) : r.value;
    }
  }, ti.apply(null, arguments);
}
function Zr(s, e, t, i) {
  var r = ti(Ye(s.prototype), e, t);
  return typeof r == "function" ? function(n) {
    return r.apply(t, n);
  } : r;
}
function qs(s) {
  return s.normalized ? 1 : s.size;
}
function Nt(s) {
  var e = 0;
  return s.forEach(function(t) {
    return e += qs(t);
  }), e;
}
function Kr(s, e, t) {
  var i = s === "VERTEX" ? e.VERTEX_SHADER : e.FRAGMENT_SHADER, r = e.createShader(i);
  if (r === null)
    throw new Error("loadShader: error while creating the shader");
  e.shaderSource(r, t), e.compileShader(r);
  var n = e.getShaderParameter(r, e.COMPILE_STATUS);
  if (!n) {
    var o = e.getShaderInfoLog(r);
    throw e.deleteShader(r), new Error(`loadShader: error while compiling the shader:
`.concat(o, `
`).concat(t));
  }
  return r;
}
function Vs(s, e) {
  return Kr("VERTEX", s, e);
}
function Ys(s, e) {
  return Kr("FRAGMENT", s, e);
}
function Xs(s, e) {
  var t = s.createProgram();
  if (t === null)
    throw new Error("loadProgram: error while creating the program.");
  var i, r;
  for (i = 0, r = e.length; i < r; i++) s.attachShader(t, e[i]);
  s.linkProgram(t);
  var n = s.getProgramParameter(t, s.LINK_STATUS);
  if (!n)
    throw s.deleteProgram(t), new Error("loadProgram: error while linking the program.");
  return t;
}
function Ri(s) {
  var e = s.gl, t = s.buffer, i = s.program, r = s.vertexShader, n = s.fragmentShader;
  e.deleteShader(r), e.deleteShader(n), e.deleteProgram(i), e.deleteBuffer(t);
}
function Li(s) {
  return s % 1 === 0 ? s.toFixed(1) : s.toString();
}
var Gi = `#define PICKING_MODE
`, Zs = D(D(D(D(D(D(D(D({}, WebGL2RenderingContext.BOOL, 1), WebGL2RenderingContext.BYTE, 1), WebGL2RenderingContext.UNSIGNED_BYTE, 1), WebGL2RenderingContext.SHORT, 2), WebGL2RenderingContext.UNSIGNED_SHORT, 2), WebGL2RenderingContext.INT, 4), WebGL2RenderingContext.UNSIGNED_INT, 4), WebGL2RenderingContext.FLOAT, 4), Qr = /* @__PURE__ */ function() {
  function s(e, t, i) {
    de(this, s), D(this, "array", new Float32Array()), D(this, "constantArray", new Float32Array()), D(this, "capacity", 0), D(this, "verticesCount", 0);
    var r = this.getDefinition();
    if (this.VERTICES = r.VERTICES, this.VERTEX_SHADER_SOURCE = r.VERTEX_SHADER_SOURCE, this.FRAGMENT_SHADER_SOURCE = r.FRAGMENT_SHADER_SOURCE, this.UNIFORMS = r.UNIFORMS, this.ATTRIBUTES = r.ATTRIBUTES, this.METHOD = r.METHOD, this.CONSTANT_ATTRIBUTES = "CONSTANT_ATTRIBUTES" in r ? r.CONSTANT_ATTRIBUTES : [], this.CONSTANT_DATA = "CONSTANT_DATA" in r ? r.CONSTANT_DATA : [], this.isInstanced = "CONSTANT_ATTRIBUTES" in r, this.ATTRIBUTES_ITEMS_COUNT = Nt(this.ATTRIBUTES), this.STRIDE = this.VERTICES * this.ATTRIBUTES_ITEMS_COUNT, this.renderer = i, this.normalProgram = this.getProgramInfo("normal", e, r.VERTEX_SHADER_SOURCE, r.FRAGMENT_SHADER_SOURCE, null), this.pickProgram = t ? this.getProgramInfo("pick", e, Gi + r.VERTEX_SHADER_SOURCE, Gi + r.FRAGMENT_SHADER_SOURCE, t) : null, this.isInstanced) {
      var n = Nt(this.CONSTANT_ATTRIBUTES);
      if (this.CONSTANT_DATA.length !== this.VERTICES) throw new Error("Program: error while getting constant data (expected ".concat(this.VERTICES, " items, received ").concat(this.CONSTANT_DATA.length, " instead)"));
      this.constantArray = new Float32Array(this.CONSTANT_DATA.length * n);
      for (var o = 0; o < this.CONSTANT_DATA.length; o++) {
        var a = this.CONSTANT_DATA[o];
        if (a.length !== n) throw new Error("Program: error while getting constant data (one vector has ".concat(a.length, " items instead of ").concat(n, ")"));
        for (var h = 0; h < a.length; h++) this.constantArray[o * n + h] = a[h];
      }
      this.STRIDE = this.ATTRIBUTES_ITEMS_COUNT;
    }
  }
  return ue(s, [{
    key: "kill",
    value: function() {
      Ri(this.normalProgram), this.pickProgram && (Ri(this.pickProgram), this.pickProgram = null);
    }
  }, {
    key: "getProgramInfo",
    value: function(t, i, r, n, o) {
      var a = this.getDefinition(), h = i.createBuffer();
      if (h === null) throw new Error("Program: error while creating the WebGL buffer.");
      var l = Vs(i, r), c = Ys(i, n), d = Xs(i, [l, c]), f = {};
      a.UNIFORMS.forEach(function(u) {
        var p = i.getUniformLocation(d, u);
        p && (f[u] = p);
      });
      var w = {};
      a.ATTRIBUTES.forEach(function(u) {
        w[u.name] = i.getAttribLocation(d, u.name);
      });
      var v;
      if ("CONSTANT_ATTRIBUTES" in a && (a.CONSTANT_ATTRIBUTES.forEach(function(u) {
        w[u.name] = i.getAttribLocation(d, u.name);
      }), v = i.createBuffer(), v === null))
        throw new Error("Program: error while creating the WebGL constant buffer.");
      return {
        name: t,
        program: d,
        gl: i,
        frameBuffer: o,
        buffer: h,
        constantBuffer: v || {},
        uniformLocations: f,
        attributeLocations: w,
        isPicking: t === "pick",
        vertexShader: l,
        fragmentShader: c
      };
    }
  }, {
    key: "bindProgram",
    value: function(t) {
      var i = this, r = 0, n = t.gl, o = t.buffer;
      this.isInstanced ? (n.bindBuffer(n.ARRAY_BUFFER, t.constantBuffer), r = 0, this.CONSTANT_ATTRIBUTES.forEach(function(a) {
        return r += i.bindAttribute(a, t, r, !1);
      }), n.bufferData(n.ARRAY_BUFFER, this.constantArray, n.STATIC_DRAW), n.bindBuffer(n.ARRAY_BUFFER, t.buffer), r = 0, this.ATTRIBUTES.forEach(function(a) {
        return r += i.bindAttribute(a, t, r, !0);
      }), n.bufferData(n.ARRAY_BUFFER, this.array, n.DYNAMIC_DRAW)) : (n.bindBuffer(n.ARRAY_BUFFER, o), r = 0, this.ATTRIBUTES.forEach(function(a) {
        return r += i.bindAttribute(a, t, r);
      }), n.bufferData(n.ARRAY_BUFFER, this.array, n.DYNAMIC_DRAW)), n.bindBuffer(n.ARRAY_BUFFER, null);
    }
  }, {
    key: "unbindProgram",
    value: function(t) {
      var i = this;
      this.isInstanced ? (this.CONSTANT_ATTRIBUTES.forEach(function(r) {
        return i.unbindAttribute(r, t, !1);
      }), this.ATTRIBUTES.forEach(function(r) {
        return i.unbindAttribute(r, t, !0);
      })) : this.ATTRIBUTES.forEach(function(r) {
        return i.unbindAttribute(r, t);
      });
    }
  }, {
    key: "bindAttribute",
    value: function(t, i, r, n) {
      var o = Zs[t.type];
      if (typeof o != "number") throw new Error('Program.bind: yet unsupported attribute type "'.concat(t.type, '"'));
      var a = i.attributeLocations[t.name], h = i.gl;
      if (a !== -1) {
        h.enableVertexAttribArray(a);
        var l = this.isInstanced ? (n ? this.ATTRIBUTES_ITEMS_COUNT : Nt(this.CONSTANT_ATTRIBUTES)) * Float32Array.BYTES_PER_ELEMENT : this.ATTRIBUTES_ITEMS_COUNT * Float32Array.BYTES_PER_ELEMENT;
        if (h.vertexAttribPointer(a, t.size, t.type, t.normalized || !1, l, r), this.isInstanced && n)
          if (h instanceof WebGL2RenderingContext)
            h.vertexAttribDivisor(a, 1);
          else {
            var c = h.getExtension("ANGLE_instanced_arrays");
            c && c.vertexAttribDivisorANGLE(a, 1);
          }
      }
      return t.size * o;
    }
  }, {
    key: "unbindAttribute",
    value: function(t, i, r) {
      var n = i.attributeLocations[t.name], o = i.gl;
      if (n !== -1 && (o.disableVertexAttribArray(n), this.isInstanced && r))
        if (o instanceof WebGL2RenderingContext)
          o.vertexAttribDivisor(n, 0);
        else {
          var a = o.getExtension("ANGLE_instanced_arrays");
          a && a.vertexAttribDivisorANGLE(n, 0);
        }
    }
  }, {
    key: "reallocate",
    value: function(t) {
      t !== this.capacity && (this.capacity = t, this.verticesCount = this.VERTICES * t, this.array = new Float32Array(this.isInstanced ? this.capacity * this.ATTRIBUTES_ITEMS_COUNT : this.verticesCount * this.ATTRIBUTES_ITEMS_COUNT));
    }
  }, {
    key: "hasNothingToRender",
    value: function() {
      return this.verticesCount === 0;
    }
  }, {
    key: "renderProgram",
    value: function(t, i) {
      var r = i.gl, n = i.program;
      r.enable(r.BLEND), r.useProgram(n), this.setUniforms(t, i), this.drawWebGL(this.METHOD, i);
    }
  }, {
    key: "render",
    value: function(t) {
      this.hasNothingToRender() || (this.pickProgram && (this.pickProgram.gl.viewport(0, 0, t.width * t.pixelRatio / t.downSizingRatio, t.height * t.pixelRatio / t.downSizingRatio), this.bindProgram(this.pickProgram), this.renderProgram(H(H({}, t), {}, {
        pixelRatio: t.pixelRatio / t.downSizingRatio
      }), this.pickProgram), this.unbindProgram(this.pickProgram)), this.normalProgram.gl.viewport(0, 0, t.width * t.pixelRatio, t.height * t.pixelRatio), this.bindProgram(this.normalProgram), this.renderProgram(t, this.normalProgram), this.unbindProgram(this.normalProgram));
    }
  }, {
    key: "drawWebGL",
    value: function(t, i) {
      var r = i.gl, n = i.frameBuffer;
      if (r.bindFramebuffer(r.FRAMEBUFFER, n), !this.isInstanced)
        r.drawArrays(t, 0, this.verticesCount);
      else if (r instanceof WebGL2RenderingContext)
        r.drawArraysInstanced(t, 0, this.VERTICES, this.capacity);
      else {
        var o = r.getExtension("ANGLE_instanced_arrays");
        o && o.drawArraysInstancedANGLE(t, 0, this.VERTICES, this.capacity);
      }
    }
  }]);
}(), Jr = /* @__PURE__ */ function(s) {
  function e() {
    return de(this, e), ge(this, e, arguments);
  }
  return ve(e, s), ue(e, [{
    key: "kill",
    value: function() {
      Zr(e, "kill", this)([]);
    }
  }, {
    key: "process",
    value: function(i, r, n) {
      var o = r * this.STRIDE;
      if (n.hidden) {
        for (var a = o + this.STRIDE; o < a; o++)
          this.array[o] = 0;
        return;
      }
      return this.processVisibleItem(Xr(i), o, n);
    }
  }]);
}(Qr), lt = /* @__PURE__ */ function(s) {
  function e() {
    var t;
    de(this, e);
    for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
      r[n] = arguments[n];
    return t = ge(this, e, [].concat(r)), D(t, "drawLabel", void 0), t;
  }
  return ve(e, s), ue(e, [{
    key: "kill",
    value: function() {
      Zr(e, "kill", this)([]);
    }
  }, {
    key: "process",
    value: function(i, r, n, o, a) {
      var h = r * this.STRIDE;
      if (a.hidden || n.hidden || o.hidden) {
        for (var l = h + this.STRIDE; h < l; h++)
          this.array[h] = 0;
        return;
      }
      return this.processVisibleItem(Xr(i), h, n, o, a);
    }
  }]);
}(Qr);
function en(s, e) {
  return /* @__PURE__ */ function() {
    function t(i, r, n) {
      de(this, t), D(this, "drawLabel", e), this.programs = s.map(function(o) {
        return new o(i, r, n);
      });
    }
    return ue(t, [{
      key: "reallocate",
      value: function(r) {
        this.programs.forEach(function(n) {
          return n.reallocate(r);
        });
      }
    }, {
      key: "process",
      value: function(r, n, o, a, h) {
        this.programs.forEach(function(l) {
          return l.process(r, n, o, a, h);
        });
      }
    }, {
      key: "render",
      value: function(r) {
        this.programs.forEach(function(n) {
          return n.render(r);
        });
      }
    }, {
      key: "kill",
      value: function() {
        this.programs.forEach(function(r) {
          return r.kill();
        });
      }
    }]);
  }();
}
function Ks(s, e, t, i, r) {
  var n = r.edgeLabelSize, o = r.edgeLabelFont, a = r.edgeLabelWeight, h = r.edgeLabelColor.attribute ? e[r.edgeLabelColor.attribute] || r.edgeLabelColor.color || "#000" : r.edgeLabelColor.color, l = e.label;
  if (l) {
    s.fillStyle = h, s.font = "".concat(a, " ").concat(n, "px ").concat(o);
    var c = t.size, d = i.size, f = t.x, w = t.y, v = i.x, u = i.y, p = (f + v) / 2, E = (w + u) / 2, m = v - f, x = u - w, g = Math.sqrt(m * m + x * x);
    if (!(g < c + d)) {
      f += m * c / g, w += x * c / g, v -= m * d / g, u -= x * d / g, p = (f + v) / 2, E = (w + u) / 2, m = v - f, x = u - w, g = Math.sqrt(m * m + x * x);
      var y = s.measureText(l).width;
      if (y > g) {
        var b = "…";
        for (l = l + b, y = s.measureText(l).width; y > g && l.length > 1; )
          l = l.slice(0, -2) + b, y = s.measureText(l).width;
        if (l.length < 4) return;
      }
      var S;
      m > 0 ? x > 0 ? S = Math.acos(m / g) : S = Math.asin(x / g) : x > 0 ? S = Math.acos(m / g) + Math.PI : S = Math.asin(m / g) + Math.PI / 2, s.save(), s.translate(p, E), s.rotate(S), s.fillText(l, -y / 2, e.size / 2 + n), s.restore();
    }
  }
}
function tn(s, e, t) {
  if (e.label) {
    var i = t.labelSize, r = t.labelFont, n = t.labelWeight, o = t.labelColor.attribute ? e[t.labelColor.attribute] || t.labelColor.color || "#000" : t.labelColor.color;
    s.fillStyle = o, s.font = "".concat(n, " ").concat(i, "px ").concat(r), s.fillText(e.label, e.x + e.size + 3, e.y + i / 3);
  }
}
function Qs(s, e, t) {
  var i = t.labelSize, r = t.labelFont, n = t.labelWeight;
  s.font = "".concat(n, " ").concat(i, "px ").concat(r), s.fillStyle = "#FFF", s.shadowOffsetX = 0, s.shadowOffsetY = 0, s.shadowBlur = 8, s.shadowColor = "#000";
  var o = 2;
  if (typeof e.label == "string") {
    var a = s.measureText(e.label).width, h = Math.round(a + 5), l = Math.round(i + 2 * o), c = Math.max(e.size, i / 2) + o, d = Math.asin(l / 2 / c), f = Math.sqrt(Math.abs(Math.pow(c, 2) - Math.pow(l / 2, 2)));
    s.beginPath(), s.moveTo(e.x + f, e.y + l / 2), s.lineTo(e.x + c + h, e.y + l / 2), s.lineTo(e.x + c + h, e.y - l / 2), s.lineTo(e.x + f, e.y - l / 2), s.arc(e.x, e.y, c, d, -d), s.closePath(), s.fill();
  } else
    s.beginPath(), s.arc(e.x, e.y, e.size + o, 0, Math.PI * 2), s.closePath(), s.fill();
  s.shadowOffsetX = 0, s.shadowOffsetY = 0, s.shadowBlur = 0, tn(s, e, t);
}
var Js = (
  /*glsl*/
  `
precision highp float;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;

uniform float u_correctionRatio;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float border = u_correctionRatio * 2.0;
  float dist = length(v_diffVector) - v_radius + border;

  // No antialiasing for picking mode:
  #ifdef PICKING_MODE
  if (dist > border)
    gl_FragColor = transparent;
  else
    gl_FragColor = v_color;

  #else
  float t = 0.0;
  if (dist > border)
    t = 1.0;
  else if (dist > 0.0)
    t = dist / border;

  gl_FragColor = mix(v_color, transparent, t);
  #endif
}
`
), eo = Js, to = (
  /*glsl*/
  `
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_position;
attribute float a_size;
attribute float a_angle;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;
varying float v_border;

const float bias = 255.0 / 254.0;

void main() {
  float size = a_size * u_correctionRatio / u_sizeRatio * 4.0;
  vec2 diffVector = size * vec2(cos(a_angle), sin(a_angle));
  vec2 position = a_position + diffVector;
  gl_Position = vec4(
    (u_matrix * vec3(position, 1)).xy,
    0,
    1
  );

  v_diffVector = diffVector;
  v_radius = size / 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`
), io = to, rn = WebGLRenderingContext, Ni = rn.UNSIGNED_BYTE, Dt = rn.FLOAT, ro = ["u_sizeRatio", "u_correctionRatio", "u_matrix"], kt = /* @__PURE__ */ function(s) {
  function e() {
    return de(this, e), ge(this, e, arguments);
  }
  return ve(e, s), ue(e, [{
    key: "getDefinition",
    value: function() {
      return {
        VERTICES: 3,
        VERTEX_SHADER_SOURCE: io,
        FRAGMENT_SHADER_SOURCE: eo,
        METHOD: WebGLRenderingContext.TRIANGLES,
        UNIFORMS: ro,
        ATTRIBUTES: [{
          name: "a_position",
          size: 2,
          type: Dt
        }, {
          name: "a_size",
          size: 1,
          type: Dt
        }, {
          name: "a_color",
          size: 4,
          type: Ni,
          normalized: !0
        }, {
          name: "a_id",
          size: 4,
          type: Ni,
          normalized: !0
        }],
        CONSTANT_ATTRIBUTES: [{
          name: "a_angle",
          size: 1,
          type: Dt
        }],
        CONSTANT_DATA: [[e.ANGLE_1], [e.ANGLE_2], [e.ANGLE_3]]
      };
    }
  }, {
    key: "processVisibleItem",
    value: function(i, r, n) {
      var o = this.array, a = Ue(n.color);
      o[r++] = n.x, o[r++] = n.y, o[r++] = n.size, o[r++] = a, o[r++] = i;
    }
  }, {
    key: "setUniforms",
    value: function(i, r) {
      var n = r.gl, o = r.uniformLocations, a = o.u_sizeRatio, h = o.u_correctionRatio, l = o.u_matrix;
      n.uniform1f(h, i.correctionRatio), n.uniform1f(a, i.sizeRatio), n.uniformMatrix3fv(l, !1, i.matrix);
    }
  }]);
}(Jr);
D(kt, "ANGLE_1", 0);
D(kt, "ANGLE_2", 2 * Math.PI / 3);
D(kt, "ANGLE_3", 4 * Math.PI / 3);
var no = (
  /*glsl*/
  `
precision mediump float;

varying vec4 v_color;

void main(void) {
  gl_FragColor = v_color;
}
`
), so = no, oo = (
  /*glsl*/
  `
attribute vec2 a_position;
attribute vec2 a_normal;
attribute float a_radius;
attribute vec3 a_barycentric;

#ifdef PICKING_MODE
attribute vec4 a_id;
#else
attribute vec4 a_color;
#endif

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_lengthToThicknessRatio;
uniform float u_widenessToThicknessRatio;

varying vec4 v_color;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  float normalLength = length(a_normal);
  vec2 unitNormal = a_normal / normalLength;

  // These first computations are taken from edge.vert.glsl and
  // edge.clamped.vert.glsl. Please read it to get better comments on what's
  // happening:
  float pixelsThickness = max(normalLength / u_sizeRatio, minThickness);
  float webGLThickness = pixelsThickness * u_correctionRatio;
  float webGLNodeRadius = a_radius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;
  float webGLArrowHeadThickness = webGLThickness * u_widenessToThicknessRatio;

  float da = a_barycentric.x;
  float db = a_barycentric.y;
  float dc = a_barycentric.z;

  vec2 delta = vec2(
      da * (webGLNodeRadius * unitNormal.y)
    + db * ((webGLNodeRadius + webGLArrowHeadLength) * unitNormal.y + webGLArrowHeadThickness * unitNormal.x)
    + dc * ((webGLNodeRadius + webGLArrowHeadLength) * unitNormal.y - webGLArrowHeadThickness * unitNormal.x),

      da * (-webGLNodeRadius * unitNormal.x)
    + db * (-(webGLNodeRadius + webGLArrowHeadLength) * unitNormal.x + webGLArrowHeadThickness * unitNormal.y)
    + dc * (-(webGLNodeRadius + webGLArrowHeadLength) * unitNormal.x - webGLArrowHeadThickness * unitNormal.y)
  );

  vec2 position = (u_matrix * vec3(a_position + delta, 1)).xy;

  gl_Position = vec4(position, 0, 1);

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`
), ao = oo, nn = WebGLRenderingContext, Di = nn.UNSIGNED_BYTE, gt = nn.FLOAT, ho = ["u_matrix", "u_sizeRatio", "u_correctionRatio", "u_minEdgeThickness", "u_lengthToThicknessRatio", "u_widenessToThicknessRatio"], ct = {
  extremity: "target",
  lengthToThicknessRatio: 2.5,
  widenessToThicknessRatio: 2
};
function xt(s) {
  var e = H(H({}, ct), s || {});
  return /* @__PURE__ */ function(t) {
    function i() {
      return de(this, i), ge(this, i, arguments);
    }
    return ve(i, t), ue(i, [{
      key: "getDefinition",
      value: function() {
        return {
          VERTICES: 3,
          VERTEX_SHADER_SOURCE: ao,
          FRAGMENT_SHADER_SOURCE: so,
          METHOD: WebGLRenderingContext.TRIANGLES,
          UNIFORMS: ho,
          ATTRIBUTES: [{
            name: "a_position",
            size: 2,
            type: gt
          }, {
            name: "a_normal",
            size: 2,
            type: gt
          }, {
            name: "a_radius",
            size: 1,
            type: gt
          }, {
            name: "a_color",
            size: 4,
            type: Di,
            normalized: !0
          }, {
            name: "a_id",
            size: 4,
            type: Di,
            normalized: !0
          }],
          CONSTANT_ATTRIBUTES: [{
            name: "a_barycentric",
            size: 3,
            type: gt
          }],
          CONSTANT_DATA: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        };
      }
    }, {
      key: "processVisibleItem",
      value: function(n, o, a, h, l) {
        if (e.extremity === "source") {
          var c = [h, a];
          a = c[0], h = c[1];
        }
        var d = l.size || 1, f = h.size || 1, w = a.x, v = a.y, u = h.x, p = h.y, E = Ue(l.color), m = u - w, x = p - v, g = m * m + x * x, y = 0, b = 0;
        g && (g = 1 / Math.sqrt(g), y = -x * g * d, b = m * g * d);
        var S = this.array;
        S[o++] = u, S[o++] = p, S[o++] = -y, S[o++] = -b, S[o++] = f, S[o++] = E, S[o++] = n;
      }
    }, {
      key: "setUniforms",
      value: function(n, o) {
        var a = o.gl, h = o.uniformLocations, l = h.u_matrix, c = h.u_sizeRatio, d = h.u_correctionRatio, f = h.u_minEdgeThickness, w = h.u_lengthToThicknessRatio, v = h.u_widenessToThicknessRatio;
        a.uniformMatrix3fv(l, !1, n.matrix), a.uniform1f(c, n.sizeRatio), a.uniform1f(d, n.correctionRatio), a.uniform1f(f, n.minEdgeThickness), a.uniform1f(w, e.lengthToThicknessRatio), a.uniform1f(v, e.widenessToThicknessRatio);
      }
    }]);
  }(lt);
}
xt();
var lo = (
  /*glsl*/
  `
precision mediump float;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  // We only handle antialiasing for normal mode:
  #ifdef PICKING_MODE
  gl_FragColor = v_color;
  #else
  float dist = length(v_normal) * v_thickness;

  float t = smoothstep(
    v_thickness - v_feather,
    v_thickness,
    dist
  );

  gl_FragColor = mix(v_color, transparent, t);
  #endif
}
`
), fi = lo, co = (
  /*glsl*/
  `
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_normal;
attribute float a_normalCoef;
attribute vec2 a_positionStart;
attribute vec2 a_positionEnd;
attribute float a_positionCoef;
attribute float a_radius;
attribute float a_radiusCoef;

uniform mat3 u_matrix;
uniform float u_zoomRatio;
uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_lengthToThicknessRatio;
uniform float u_feather;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  float radius = a_radius * a_radiusCoef;
  vec2 normal = a_normal * a_normalCoef;
  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;

  float normalLength = length(normal);
  vec2 unitNormal = normal / normalLength;

  // These first computations are taken from edge.vert.glsl. Please read it to
  // get better comments on what's happening:
  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);
  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;

  // Here, we move the point to leave space for the arrow head:
  float direction = sign(radius);
  float webGLNodeRadius = direction * radius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;

  vec2 compensationVector = vec2(-direction * unitNormal.y, direction * unitNormal.x) * (webGLNodeRadius + webGLArrowHeadLength);

  // Here is the proper position of the vertex
  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness + compensationVector, 1)).xy, 0, 1);

  v_thickness = webGLThickness / u_zoomRatio;

  v_normal = unitNormal;

  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`
), uo = co, sn = WebGLRenderingContext, Ii = sn.UNSIGNED_BYTE, je = sn.FLOAT, fo = ["u_matrix", "u_zoomRatio", "u_sizeRatio", "u_correctionRatio", "u_pixelRatio", "u_feather", "u_minEdgeThickness", "u_lengthToThicknessRatio"], po = {
  lengthToThicknessRatio: ct.lengthToThicknessRatio
};
function on(s) {
  var e = H(H({}, po), {});
  return /* @__PURE__ */ function(t) {
    function i() {
      return de(this, i), ge(this, i, arguments);
    }
    return ve(i, t), ue(i, [{
      key: "getDefinition",
      value: function() {
        return {
          VERTICES: 6,
          VERTEX_SHADER_SOURCE: uo,
          FRAGMENT_SHADER_SOURCE: fi,
          METHOD: WebGLRenderingContext.TRIANGLES,
          UNIFORMS: fo,
          ATTRIBUTES: [{
            name: "a_positionStart",
            size: 2,
            type: je
          }, {
            name: "a_positionEnd",
            size: 2,
            type: je
          }, {
            name: "a_normal",
            size: 2,
            type: je
          }, {
            name: "a_color",
            size: 4,
            type: Ii,
            normalized: !0
          }, {
            name: "a_id",
            size: 4,
            type: Ii,
            normalized: !0
          }, {
            name: "a_radius",
            size: 1,
            type: je
          }],
          CONSTANT_ATTRIBUTES: [
            // If 0, then position will be a_positionStart
            // If 1, then position will be a_positionEnd
            {
              name: "a_positionCoef",
              size: 1,
              type: je
            },
            {
              name: "a_normalCoef",
              size: 1,
              type: je
            },
            {
              name: "a_radiusCoef",
              size: 1,
              type: je
            }
          ],
          CONSTANT_DATA: [[0, 1, 0], [0, -1, 0], [1, 1, 1], [1, 1, 1], [0, -1, 0], [1, -1, -1]]
        };
      }
    }, {
      key: "processVisibleItem",
      value: function(n, o, a, h, l) {
        var c = l.size || 1, d = a.x, f = a.y, w = h.x, v = h.y, u = Ue(l.color), p = w - d, E = v - f, m = h.size || 1, x = p * p + E * E, g = 0, y = 0;
        x && (x = 1 / Math.sqrt(x), g = -E * x * c, y = p * x * c);
        var b = this.array;
        b[o++] = d, b[o++] = f, b[o++] = w, b[o++] = v, b[o++] = g, b[o++] = y, b[o++] = u, b[o++] = n, b[o++] = m;
      }
    }, {
      key: "setUniforms",
      value: function(n, o) {
        var a = o.gl, h = o.uniformLocations, l = h.u_matrix, c = h.u_zoomRatio, d = h.u_feather, f = h.u_pixelRatio, w = h.u_correctionRatio, v = h.u_sizeRatio, u = h.u_minEdgeThickness, p = h.u_lengthToThicknessRatio;
        a.uniformMatrix3fv(l, !1, n.matrix), a.uniform1f(c, n.zoomRatio), a.uniform1f(v, n.sizeRatio), a.uniform1f(w, n.correctionRatio), a.uniform1f(f, n.pixelRatio), a.uniform1f(d, n.antiAliasingFeather), a.uniform1f(u, n.minEdgeThickness), a.uniform1f(p, e.lengthToThicknessRatio);
      }
    }]);
  }(lt);
}
on();
function go(s) {
  return en([on(), xt(s)]);
}
var vo = go(), an = vo, mo = (
  /*glsl*/
  `
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_normal;
attribute float a_normalCoef;
attribute vec2 a_positionStart;
attribute vec2 a_positionEnd;
attribute float a_positionCoef;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_zoomRatio;
uniform float u_pixelRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_feather;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  vec2 normal = a_normal * a_normalCoef;
  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;

  float normalLength = length(normal);
  vec2 unitNormal = normal / normalLength;

  // We require edges to be at least "minThickness" pixels thick *on screen*
  // (so we need to compensate the size ratio):
  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);

  // Then, we need to retrieve the normalized thickness of the edge in the WebGL
  // referential (in a ([0, 1], [0, 1]) space), using our "magic" correction
  // ratio:
  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;

  // Here is the proper position of the vertex
  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness, 1)).xy, 0, 1);

  // For the fragment shader though, we need a thickness that takes the "magic"
  // correction ratio into account (as in webGLThickness), but so that the
  // antialiasing effect does not depend on the zoom level. So here's yet
  // another thickness version:
  v_thickness = webGLThickness / u_zoomRatio;

  v_normal = unitNormal;

  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`
), yo = mo, hn = WebGLRenderingContext, Pi = hn.UNSIGNED_BYTE, it = hn.FLOAT, wo = ["u_matrix", "u_zoomRatio", "u_sizeRatio", "u_correctionRatio", "u_pixelRatio", "u_feather", "u_minEdgeThickness"], bo = /* @__PURE__ */ function(s) {
  function e() {
    return de(this, e), ge(this, e, arguments);
  }
  return ve(e, s), ue(e, [{
    key: "getDefinition",
    value: function() {
      return {
        VERTICES: 6,
        VERTEX_SHADER_SOURCE: yo,
        FRAGMENT_SHADER_SOURCE: fi,
        METHOD: WebGLRenderingContext.TRIANGLES,
        UNIFORMS: wo,
        ATTRIBUTES: [{
          name: "a_positionStart",
          size: 2,
          type: it
        }, {
          name: "a_positionEnd",
          size: 2,
          type: it
        }, {
          name: "a_normal",
          size: 2,
          type: it
        }, {
          name: "a_color",
          size: 4,
          type: Pi,
          normalized: !0
        }, {
          name: "a_id",
          size: 4,
          type: Pi,
          normalized: !0
        }],
        CONSTANT_ATTRIBUTES: [
          // If 0, then position will be a_positionStart
          // If 2, then position will be a_positionEnd
          {
            name: "a_positionCoef",
            size: 1,
            type: it
          },
          {
            name: "a_normalCoef",
            size: 1,
            type: it
          }
        ],
        CONSTANT_DATA: [[0, 1], [0, -1], [1, 1], [1, 1], [0, -1], [1, -1]]
      };
    }
  }, {
    key: "processVisibleItem",
    value: function(i, r, n, o, a) {
      var h = a.size || 1, l = n.x, c = n.y, d = o.x, f = o.y, w = Ue(a.color), v = d - l, u = f - c, p = v * v + u * u, E = 0, m = 0;
      p && (p = 1 / Math.sqrt(p), E = -u * p * h, m = v * p * h);
      var x = this.array;
      x[r++] = l, x[r++] = c, x[r++] = d, x[r++] = f, x[r++] = E, x[r++] = m, x[r++] = w, x[r++] = i;
    }
  }, {
    key: "setUniforms",
    value: function(i, r) {
      var n = r.gl, o = r.uniformLocations, a = o.u_matrix, h = o.u_zoomRatio, l = o.u_feather, c = o.u_pixelRatio, d = o.u_correctionRatio, f = o.u_sizeRatio, w = o.u_minEdgeThickness;
      n.uniformMatrix3fv(a, !1, i.matrix), n.uniform1f(h, i.zoomRatio), n.uniform1f(f, i.sizeRatio), n.uniform1f(d, i.correctionRatio), n.uniform1f(c, i.pixelRatio), n.uniform1f(l, i.antiAliasingFeather), n.uniform1f(w, i.minEdgeThickness);
    }
  }]);
}(lt), pi = /* @__PURE__ */ function(s) {
  function e() {
    var t;
    return de(this, e), t = ge(this, e), t.rawEmitter = t, t;
  }
  return ve(e, s), ue(e);
}(Lr.EventEmitter), It, $i;
function ln() {
  return $i || ($i = 1, It = function(e) {
    return e !== null && typeof e == "object" && typeof e.addUndirectedEdgeWithKey == "function" && typeof e.dropNode == "function" && typeof e.multi == "boolean";
  }), It;
}
var Eo = ln();
const xo = /* @__PURE__ */ hi(Eo);
var So = function(e) {
  return e;
}, _o = function(e) {
  return e * e;
}, ko = function(e) {
  return e * (2 - e);
}, To = function(e) {
  return (e *= 2) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
}, Co = function(e) {
  return e * e * e;
}, Ao = function(e) {
  return --e * e * e + 1;
}, Ro = function(e) {
  return (e *= 2) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2);
}, cn = {
  linear: So,
  quadraticIn: _o,
  quadraticOut: ko,
  quadraticInOut: To,
  cubicIn: Co,
  cubicOut: Ao,
  cubicInOut: Ro
}, dn = {
  easing: "quadraticInOut",
  duration: 150
};
function Lo(s, e, t, i) {
  var r = Object.assign({}, dn, t), n = typeof r.easing == "function" ? r.easing : cn[r.easing], o = Date.now(), a = {};
  for (var h in e) {
    var l = e[h];
    a[h] = {};
    for (var c in l) a[h][c] = s.getNodeAttribute(h, c);
  }
  var d = null, f = function() {
    d = null;
    var v = (Date.now() - o) / r.duration;
    if (v >= 1) {
      for (var u in e) {
        var p = e[u];
        for (var E in p) s.setNodeAttribute(u, E, p[E]);
      }
      return;
    }
    v = n(v);
    for (var m in e) {
      var x = e[m], g = a[m];
      for (var y in x) s.setNodeAttribute(m, y, x[y] * v + g[y] * (1 - v));
    }
    d = requestAnimationFrame(f);
  };
  return f(), function() {
    d && cancelAnimationFrame(d);
  };
}
function Ce() {
  return Float32Array.of(1, 0, 0, 0, 1, 0, 0, 0, 1);
}
function vt(s, e, t) {
  return s[0] = e, s[4] = typeof t == "number" ? t : e, s;
}
function zi(s, e) {
  var t = Math.sin(e), i = Math.cos(e);
  return s[0] = i, s[1] = t, s[3] = -t, s[4] = i, s;
}
function Mi(s, e, t) {
  return s[6] = e, s[7] = t, s;
}
function Fe(s, e) {
  var t = s[0], i = s[1], r = s[2], n = s[3], o = s[4], a = s[5], h = s[6], l = s[7], c = s[8], d = e[0], f = e[1], w = e[2], v = e[3], u = e[4], p = e[5], E = e[6], m = e[7], x = e[8];
  return s[0] = d * t + f * n + w * h, s[1] = d * i + f * o + w * l, s[2] = d * r + f * a + w * c, s[3] = v * t + u * n + p * h, s[4] = v * i + u * o + p * l, s[5] = v * r + u * a + p * c, s[6] = E * t + m * n + x * h, s[7] = E * i + m * o + x * l, s[8] = E * r + m * a + x * c, s;
}
function ii(s, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, i = s[0], r = s[1], n = s[3], o = s[4], a = s[6], h = s[7], l = e.x, c = e.y;
  return {
    x: l * i + c * n + a * t,
    y: l * r + c * o + h * t
  };
}
function Go(s, e) {
  var t = s.height / s.width, i = e.height / e.width;
  return t < 1 && i > 1 || t > 1 && i < 1 ? 1 : Math.min(Math.max(i, 1 / i), Math.max(1 / t, t));
}
function rt(s, e, t, i, r) {
  var n = s.angle, o = s.ratio, a = s.x, h = s.y, l = e.width, c = e.height, d = Ce(), f = Math.min(l, c) - 2 * i, w = Go(e, t);
  return r ? (Fe(d, Mi(Ce(), a, h)), Fe(d, vt(Ce(), o)), Fe(d, zi(Ce(), n)), Fe(d, vt(Ce(), l / f / 2 / w, c / f / 2 / w))) : (Fe(d, vt(Ce(), 2 * (f / l) * w, 2 * (f / c) * w)), Fe(d, zi(Ce(), -n)), Fe(d, vt(Ce(), 1 / o)), Fe(d, Mi(Ce(), -a, -h))), d;
}
function No(s, e, t) {
  var i = ii(s, {
    x: Math.cos(e.angle),
    y: Math.sin(e.angle)
  }, 0), r = i.x, n = i.y;
  return 1 / Math.sqrt(Math.pow(r, 2) + Math.pow(n, 2)) / t.width;
}
function Do(s) {
  if (!s.order) return {
    x: [0, 1],
    y: [0, 1]
  };
  var e = 1 / 0, t = -1 / 0, i = 1 / 0, r = -1 / 0;
  return s.forEachNode(function(n, o) {
    var a = o.x, h = o.y;
    a < e && (e = a), a > t && (t = a), h < i && (i = h), h > r && (r = h);
  }), {
    x: [e, t],
    y: [i, r]
  };
}
function Io(s) {
  if (!xo(s)) throw new Error("Sigma: invalid graph instance.");
  s.forEachNode(function(e, t) {
    if (!Number.isFinite(t.x) || !Number.isFinite(t.y))
      throw new Error("Sigma: Coordinates of node ".concat(e, " are invalid. A node must have a numeric 'x' and 'y' attribute."));
  });
}
function Po(s, e, t) {
  var i = document.createElement(s);
  if (e)
    for (var r in e)
      i.style[r] = e[r];
  if (t)
    for (var n in t)
      i.setAttribute(n, t[n]);
  return i;
}
function Fi() {
  return typeof window.devicePixelRatio != "undefined" ? window.devicePixelRatio : 1;
}
function Oi(s, e, t) {
  return t.sort(function(i, r) {
    var n = e(i) || 0, o = e(r) || 0;
    return n < o ? -1 : n > o ? 1 : 0;
  });
}
function Bi(s) {
  var e = Xe(s.x, 2), t = e[0], i = e[1], r = Xe(s.y, 2), n = r[0], o = r[1], a = Math.max(i - t, o - n), h = (i + t) / 2, l = (o + n) / 2;
  (a === 0 || Math.abs(a) === 1 / 0 || isNaN(a)) && (a = 1), isNaN(h) && (h = 0), isNaN(l) && (l = 0);
  var c = function(f) {
    return {
      x: 0.5 + (f.x - h) / a,
      y: 0.5 + (f.y - l) / a
    };
  };
  return c.applyTo = function(d) {
    d.x = 0.5 + (d.x - h) / a, d.y = 0.5 + (d.y - l) / a;
  }, c.inverse = function(d) {
    return {
      x: h + a * (d.x - 0.5),
      y: l + a * (d.y - 0.5)
    };
  }, c.ratio = a, c;
}
function ri(s) {
  "@babel/helpers - typeof";
  return ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ri(s);
}
function Ui(s, e) {
  var t = e.size;
  if (t !== 0) {
    var i = s.length;
    s.length += t;
    var r = 0;
    e.forEach(function(n) {
      s[i + r] = n, r++;
    });
  }
}
function Pt(s) {
  s = s || {};
  for (var e = 0, t = arguments.length <= 1 ? 0 : arguments.length - 1; e < t; e++) {
    var i = e + 1 < 1 || arguments.length <= e + 1 ? void 0 : arguments[e + 1];
    i && Object.assign(s, i);
  }
  return s;
}
var gi = {
  // Performance
  hideEdgesOnMove: !1,
  hideLabelsOnMove: !1,
  renderLabels: !0,
  renderEdgeLabels: !1,
  enableEdgeEvents: !1,
  // Component rendering
  defaultNodeColor: "#999",
  defaultNodeType: "circle",
  defaultEdgeColor: "#ccc",
  defaultEdgeType: "line",
  labelFont: "Arial",
  labelSize: 14,
  labelWeight: "normal",
  labelColor: {
    color: "#000"
  },
  edgeLabelFont: "Arial",
  edgeLabelSize: 14,
  edgeLabelWeight: "normal",
  edgeLabelColor: {
    attribute: "color"
  },
  stagePadding: 30,
  defaultDrawEdgeLabel: Ks,
  defaultDrawNodeLabel: tn,
  defaultDrawNodeHover: Qs,
  minEdgeThickness: 1.7,
  antiAliasingFeather: 1,
  // Mouse and touch settings
  dragTimeout: 100,
  draggedEventsTolerance: 3,
  inertiaDuration: 200,
  inertiaRatio: 3,
  zoomDuration: 250,
  zoomingRatio: 1.7,
  doubleClickTimeout: 300,
  doubleClickZoomingRatio: 2.2,
  doubleClickZoomingDuration: 200,
  tapMoveTolerance: 10,
  // Size and scaling
  zoomToSizeRatioFunction: Math.sqrt,
  itemSizesReference: "screen",
  autoRescale: !0,
  autoCenter: !0,
  // Labels
  labelDensity: 1,
  labelGridCellSize: 100,
  labelRenderedSizeThreshold: 6,
  // Reducers
  nodeReducer: null,
  edgeReducer: null,
  // Features
  zIndex: !1,
  minCameraRatio: null,
  maxCameraRatio: null,
  enableCameraZooming: !0,
  enableCameraPanning: !0,
  enableCameraRotation: !0,
  cameraPanBoundaries: null,
  // Lifecycle
  allowInvalidContainer: !1,
  // Program classes
  nodeProgramClasses: {},
  nodeHoverProgramClasses: {},
  edgeProgramClasses: {}
}, $o = {
  circle: kt
}, zo = {
  arrow: an,
  line: bo
};
function $t(s) {
  if (typeof s.labelDensity != "number" || s.labelDensity < 0)
    throw new Error("Settings: invalid `labelDensity`. Expecting a positive number.");
  var e = s.minCameraRatio, t = s.maxCameraRatio;
  if (typeof e == "number" && typeof t == "number" && t < e)
    throw new Error("Settings: invalid camera ratio boundaries. Expecting `maxCameraRatio` to be greater than `minCameraRatio`.");
}
function Mo(s) {
  var e = Pt({}, gi, s);
  return e.nodeProgramClasses = Pt({}, $o, e.nodeProgramClasses), e.edgeProgramClasses = Pt({}, zo, e.edgeProgramClasses), e;
}
var mt = 1.5, Hi = /* @__PURE__ */ function(s) {
  function e() {
    var t;
    return de(this, e), t = ge(this, e), D(t, "x", 0.5), D(t, "y", 0.5), D(t, "angle", 0), D(t, "ratio", 1), D(t, "minRatio", null), D(t, "maxRatio", null), D(t, "enabledZooming", !0), D(t, "enabledPanning", !0), D(t, "enabledRotation", !0), D(t, "clean", null), D(t, "nextFrame", null), D(t, "previousState", null), D(t, "enabled", !0), t.previousState = t.getState(), t;
  }
  return ve(e, s), ue(e, [{
    key: "enable",
    value: (
      /**
       * Method used to enable the camera.
       */
      function() {
        return this.enabled = !0, this;
      }
    )
    /**
     * Method used to disable the camera.
     */
  }, {
    key: "disable",
    value: function() {
      return this.enabled = !1, this;
    }
    /**
     * Method used to retrieve the camera's current state.
     */
  }, {
    key: "getState",
    value: function() {
      return {
        x: this.x,
        y: this.y,
        angle: this.angle,
        ratio: this.ratio
      };
    }
    /**
     * Method used to check whether the camera has the given state.
     */
  }, {
    key: "hasState",
    value: function(i) {
      return this.x === i.x && this.y === i.y && this.ratio === i.ratio && this.angle === i.angle;
    }
    /**
     * Method used to retrieve the camera's previous state.
     */
  }, {
    key: "getPreviousState",
    value: function() {
      var i = this.previousState;
      return i ? {
        x: i.x,
        y: i.y,
        angle: i.angle,
        ratio: i.ratio
      } : null;
    }
    /**
     * Method used to check minRatio and maxRatio values.
     */
  }, {
    key: "getBoundedRatio",
    value: function(i) {
      var r = i;
      return typeof this.minRatio == "number" && (r = Math.max(r, this.minRatio)), typeof this.maxRatio == "number" && (r = Math.min(r, this.maxRatio)), r;
    }
    /**
     * Method used to check various things to return a legit state candidate.
     */
  }, {
    key: "validateState",
    value: function(i) {
      var r = {};
      return this.enabledPanning && typeof i.x == "number" && (r.x = i.x), this.enabledPanning && typeof i.y == "number" && (r.y = i.y), this.enabledZooming && typeof i.ratio == "number" && (r.ratio = this.getBoundedRatio(i.ratio)), this.enabledRotation && typeof i.angle == "number" && (r.angle = i.angle), this.clean ? this.clean(H(H({}, this.getState()), r)) : r;
    }
    /**
     * Method used to check whether the camera is currently being animated.
     */
  }, {
    key: "isAnimated",
    value: function() {
      return !!this.nextFrame;
    }
    /**
     * Method used to set the camera's state.
     */
  }, {
    key: "setState",
    value: function(i) {
      if (!this.enabled) return this;
      this.previousState = this.getState();
      var r = this.validateState(i);
      return typeof r.x == "number" && (this.x = r.x), typeof r.y == "number" && (this.y = r.y), typeof r.ratio == "number" && (this.ratio = r.ratio), typeof r.angle == "number" && (this.angle = r.angle), this.hasState(this.previousState) || this.emit("updated", this.getState()), this;
    }
    /**
     * Method used to update the camera's state using a function.
     */
  }, {
    key: "updateState",
    value: function(i) {
      return this.setState(i(this.getState())), this;
    }
    /**
     * Method used to animate the camera.
     */
  }, {
    key: "animate",
    value: function(i) {
      var r = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = arguments.length > 2 ? arguments[2] : void 0;
      if (!o) return new Promise(function(w) {
        return r.animate(i, n, w);
      });
      if (this.enabled) {
        var a = H(H({}, dn), n), h = this.validateState(i), l = typeof a.easing == "function" ? a.easing : cn[a.easing], c = Date.now(), d = this.getState(), f = function() {
          var v = (Date.now() - c) / a.duration;
          if (v >= 1) {
            r.nextFrame = null, r.setState(h), r.animationCallback && (r.animationCallback.call(null), r.animationCallback = void 0);
            return;
          }
          var u = l(v), p = {};
          typeof h.x == "number" && (p.x = d.x + (h.x - d.x) * u), typeof h.y == "number" && (p.y = d.y + (h.y - d.y) * u), r.enabledRotation && typeof h.angle == "number" && (p.angle = d.angle + (h.angle - d.angle) * u), typeof h.ratio == "number" && (p.ratio = d.ratio + (h.ratio - d.ratio) * u), r.setState(p), r.nextFrame = requestAnimationFrame(f);
        };
        this.nextFrame ? (cancelAnimationFrame(this.nextFrame), this.animationCallback && this.animationCallback.call(null), this.nextFrame = requestAnimationFrame(f)) : f(), this.animationCallback = o;
      }
    }
    /**
     * Method used to zoom the camera.
     */
  }, {
    key: "animatedZoom",
    value: function(i) {
      return i ? typeof i == "number" ? this.animate({
        ratio: this.ratio / i
      }) : this.animate({
        ratio: this.ratio / (i.factor || mt)
      }, i) : this.animate({
        ratio: this.ratio / mt
      });
    }
    /**
     * Method used to unzoom the camera.
     */
  }, {
    key: "animatedUnzoom",
    value: function(i) {
      return i ? typeof i == "number" ? this.animate({
        ratio: this.ratio * i
      }) : this.animate({
        ratio: this.ratio * (i.factor || mt)
      }, i) : this.animate({
        ratio: this.ratio * mt
      });
    }
    /**
     * Method used to reset the camera.
     */
  }, {
    key: "animatedReset",
    value: function(i) {
      return this.animate({
        x: 0.5,
        y: 0.5,
        ratio: 1,
        angle: 0
      }, i);
    }
    /**
     * Returns a new Camera instance, with the same state as the current camera.
     */
  }, {
    key: "copy",
    value: function() {
      return e.from(this.getState());
    }
  }], [{
    key: "from",
    value: function(i) {
      var r = new e();
      return r.setState(i);
    }
  }]);
}(pi);
function Ae(s, e) {
  var t = e.getBoundingClientRect();
  return {
    x: s.clientX - t.left,
    y: s.clientY - t.top
  };
}
function Pe(s, e) {
  var t = H(H({}, Ae(s, e)), {}, {
    sigmaDefaultPrevented: !1,
    preventSigmaDefault: function() {
      t.sigmaDefaultPrevented = !0;
    },
    original: s
  });
  return t;
}
function nt(s) {
  var e = "x" in s ? s : H(H({}, s.touches[0] || s.previousTouches[0]), {}, {
    original: s.original,
    sigmaDefaultPrevented: s.sigmaDefaultPrevented,
    preventSigmaDefault: function() {
      s.sigmaDefaultPrevented = !0, e.sigmaDefaultPrevented = !0;
    }
  });
  return e;
}
function Fo(s, e) {
  return H(H({}, Pe(s, e)), {}, {
    delta: un(s)
  });
}
var Oo = 2;
function Et(s) {
  for (var e = [], t = 0, i = Math.min(s.length, Oo); t < i; t++) e.push(s[t]);
  return e;
}
function st(s, e, t) {
  var i = {
    touches: Et(s.touches).map(function(r) {
      return Ae(r, t);
    }),
    previousTouches: e.map(function(r) {
      return Ae(r, t);
    }),
    sigmaDefaultPrevented: !1,
    preventSigmaDefault: function() {
      i.sigmaDefaultPrevented = !0;
    },
    original: s
  };
  return i;
}
function un(s) {
  if (typeof s.deltaY != "undefined") return s.deltaY * -3 / 360;
  if (typeof s.detail != "undefined") return s.detail / -9;
  throw new Error("Captor: could not extract delta from event.");
}
var fn = /* @__PURE__ */ function(s) {
  function e(t, i) {
    var r;
    return de(this, e), r = ge(this, e), r.container = t, r.renderer = i, r;
  }
  return ve(e, s), ue(e);
}(pi), Bo = ["doubleClickTimeout", "doubleClickZoomingDuration", "doubleClickZoomingRatio", "dragTimeout", "draggedEventsTolerance", "inertiaDuration", "inertiaRatio", "zoomDuration", "zoomingRatio"], Uo = Bo.reduce(function(s, e) {
  return H(H({}, s), {}, D({}, e, gi[e]));
}, {}), Ho = /* @__PURE__ */ function(s) {
  function e(t, i) {
    var r;
    return de(this, e), r = ge(this, e, [t, i]), D(r, "enabled", !0), D(r, "draggedEvents", 0), D(r, "downStartTime", null), D(r, "lastMouseX", null), D(r, "lastMouseY", null), D(r, "isMouseDown", !1), D(r, "isMoving", !1), D(r, "movingTimeout", null), D(r, "startCameraState", null), D(r, "clicks", 0), D(r, "doubleClickTimeout", null), D(r, "currentWheelDirection", 0), D(r, "settings", Uo), r.handleClick = r.handleClick.bind(r), r.handleRightClick = r.handleRightClick.bind(r), r.handleDown = r.handleDown.bind(r), r.handleUp = r.handleUp.bind(r), r.handleMove = r.handleMove.bind(r), r.handleWheel = r.handleWheel.bind(r), r.handleLeave = r.handleLeave.bind(r), r.handleEnter = r.handleEnter.bind(r), t.addEventListener("click", r.handleClick, {
      capture: !1
    }), t.addEventListener("contextmenu", r.handleRightClick, {
      capture: !1
    }), t.addEventListener("mousedown", r.handleDown, {
      capture: !1
    }), t.addEventListener("wheel", r.handleWheel, {
      capture: !1
    }), t.addEventListener("mouseleave", r.handleLeave, {
      capture: !1
    }), t.addEventListener("mouseenter", r.handleEnter, {
      capture: !1
    }), document.addEventListener("mousemove", r.handleMove, {
      capture: !1
    }), document.addEventListener("mouseup", r.handleUp, {
      capture: !1
    }), r;
  }
  return ve(e, s), ue(e, [{
    key: "kill",
    value: function() {
      var i = this.container;
      i.removeEventListener("click", this.handleClick), i.removeEventListener("contextmenu", this.handleRightClick), i.removeEventListener("mousedown", this.handleDown), i.removeEventListener("wheel", this.handleWheel), i.removeEventListener("mouseleave", this.handleLeave), i.removeEventListener("mouseenter", this.handleEnter), document.removeEventListener("mousemove", this.handleMove), document.removeEventListener("mouseup", this.handleUp);
    }
  }, {
    key: "handleClick",
    value: function(i) {
      var r = this;
      if (this.enabled) {
        if (this.clicks++, this.clicks === 2)
          return this.clicks = 0, typeof this.doubleClickTimeout == "number" && (clearTimeout(this.doubleClickTimeout), this.doubleClickTimeout = null), this.handleDoubleClick(i);
        setTimeout(function() {
          r.clicks = 0, r.doubleClickTimeout = null;
        }, this.settings.doubleClickTimeout), this.draggedEvents < this.settings.draggedEventsTolerance && this.emit("click", Pe(i, this.container));
      }
    }
  }, {
    key: "handleRightClick",
    value: function(i) {
      this.enabled && this.emit("rightClick", Pe(i, this.container));
    }
  }, {
    key: "handleDoubleClick",
    value: function(i) {
      if (this.enabled) {
        i.preventDefault(), i.stopPropagation();
        var r = Pe(i, this.container);
        if (this.emit("doubleClick", r), !r.sigmaDefaultPrevented) {
          var n = this.renderer.getCamera(), o = n.getBoundedRatio(n.getState().ratio / this.settings.doubleClickZoomingRatio);
          n.animate(this.renderer.getViewportZoomedState(Ae(i, this.container), o), {
            easing: "quadraticInOut",
            duration: this.settings.doubleClickZoomingDuration
          });
        }
      }
    }
  }, {
    key: "handleDown",
    value: function(i) {
      if (this.enabled) {
        if (i.button === 0) {
          this.startCameraState = this.renderer.getCamera().getState();
          var r = Ae(i, this.container), n = r.x, o = r.y;
          this.lastMouseX = n, this.lastMouseY = o, this.draggedEvents = 0, this.downStartTime = Date.now(), this.isMouseDown = !0;
        }
        this.emit("mousedown", Pe(i, this.container));
      }
    }
  }, {
    key: "handleUp",
    value: function(i) {
      var r = this;
      if (!(!this.enabled || !this.isMouseDown)) {
        var n = this.renderer.getCamera();
        this.isMouseDown = !1, typeof this.movingTimeout == "number" && (clearTimeout(this.movingTimeout), this.movingTimeout = null);
        var o = Ae(i, this.container), a = o.x, h = o.y, l = n.getState(), c = n.getPreviousState() || {
          x: 0,
          y: 0
        };
        this.isMoving ? n.animate({
          x: l.x + this.settings.inertiaRatio * (l.x - c.x),
          y: l.y + this.settings.inertiaRatio * (l.y - c.y)
        }, {
          duration: this.settings.inertiaDuration,
          easing: "quadraticOut"
        }) : (this.lastMouseX !== a || this.lastMouseY !== h) && n.setState({
          x: l.x,
          y: l.y
        }), this.isMoving = !1, setTimeout(function() {
          var d = r.draggedEvents > 0;
          r.draggedEvents = 0, d && r.renderer.getSetting("hideEdgesOnMove") && r.renderer.refresh();
        }, 0), this.emit("mouseup", Pe(i, this.container));
      }
    }
  }, {
    key: "handleMove",
    value: function(i) {
      var r = this;
      if (this.enabled) {
        var n = Pe(i, this.container);
        if (this.emit("mousemovebody", n), (i.target === this.container || i.composedPath()[0] === this.container) && this.emit("mousemove", n), !n.sigmaDefaultPrevented && this.isMouseDown) {
          this.isMoving = !0, this.draggedEvents++, typeof this.movingTimeout == "number" && clearTimeout(this.movingTimeout), this.movingTimeout = window.setTimeout(function() {
            r.movingTimeout = null, r.isMoving = !1;
          }, this.settings.dragTimeout);
          var o = this.renderer.getCamera(), a = Ae(i, this.container), h = a.x, l = a.y, c = this.renderer.viewportToFramedGraph({
            x: this.lastMouseX,
            y: this.lastMouseY
          }), d = this.renderer.viewportToFramedGraph({
            x: h,
            y: l
          }), f = c.x - d.x, w = c.y - d.y, v = o.getState(), u = v.x + f, p = v.y + w;
          o.setState({
            x: u,
            y: p
          }), this.lastMouseX = h, this.lastMouseY = l, i.preventDefault(), i.stopPropagation();
        }
      }
    }
  }, {
    key: "handleLeave",
    value: function(i) {
      this.emit("mouseleave", Pe(i, this.container));
    }
  }, {
    key: "handleEnter",
    value: function(i) {
      this.emit("mouseenter", Pe(i, this.container));
    }
  }, {
    key: "handleWheel",
    value: function(i) {
      var r = this, n = this.renderer.getCamera();
      if (!(!this.enabled || !n.enabledZooming)) {
        var o = un(i);
        if (o) {
          var a = Fo(i, this.container);
          if (this.emit("wheel", a), a.sigmaDefaultPrevented) {
            i.preventDefault(), i.stopPropagation();
            return;
          }
          var h = n.getState().ratio, l = o > 0 ? 1 / this.settings.zoomingRatio : this.settings.zoomingRatio, c = n.getBoundedRatio(h * l), d = o > 0 ? 1 : -1, f = Date.now();
          h !== c && (i.preventDefault(), i.stopPropagation(), !(this.currentWheelDirection === d && this.lastWheelTriggerTime && f - this.lastWheelTriggerTime < this.settings.zoomDuration / 5) && (n.animate(this.renderer.getViewportZoomedState(Ae(i, this.container), c), {
            easing: "quadraticOut",
            duration: this.settings.zoomDuration
          }, function() {
            r.currentWheelDirection = 0;
          }), this.currentWheelDirection = d, this.lastWheelTriggerTime = f));
        }
      }
    }
  }, {
    key: "setSettings",
    value: function(i) {
      this.settings = i;
    }
  }]);
}(fn), jo = ["dragTimeout", "inertiaDuration", "inertiaRatio", "doubleClickTimeout", "doubleClickZoomingRatio", "doubleClickZoomingDuration", "tapMoveTolerance"], Wo = jo.reduce(function(s, e) {
  return H(H({}, s), {}, D({}, e, gi[e]));
}, {}), qo = /* @__PURE__ */ function(s) {
  function e(t, i) {
    var r;
    return de(this, e), r = ge(this, e, [t, i]), D(r, "enabled", !0), D(r, "isMoving", !1), D(r, "hasMoved", !1), D(r, "touchMode", 0), D(r, "startTouchesPositions", []), D(r, "lastTouches", []), D(r, "lastTap", null), D(r, "settings", Wo), r.handleStart = r.handleStart.bind(r), r.handleLeave = r.handleLeave.bind(r), r.handleMove = r.handleMove.bind(r), t.addEventListener("touchstart", r.handleStart, {
      capture: !1
    }), t.addEventListener("touchcancel", r.handleLeave, {
      capture: !1
    }), document.addEventListener("touchend", r.handleLeave, {
      capture: !1,
      passive: !1
    }), document.addEventListener("touchmove", r.handleMove, {
      capture: !1,
      passive: !1
    }), r;
  }
  return ve(e, s), ue(e, [{
    key: "kill",
    value: function() {
      var i = this.container;
      i.removeEventListener("touchstart", this.handleStart), i.removeEventListener("touchcancel", this.handleLeave), document.removeEventListener("touchend", this.handleLeave), document.removeEventListener("touchmove", this.handleMove);
    }
  }, {
    key: "getDimensions",
    value: function() {
      return {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight
      };
    }
  }, {
    key: "handleStart",
    value: function(i) {
      var r = this;
      if (this.enabled) {
        i.preventDefault();
        var n = Et(i.touches);
        if (this.touchMode = n.length, this.startCameraState = this.renderer.getCamera().getState(), this.startTouchesPositions = n.map(function(w) {
          return Ae(w, r.container);
        }), this.touchMode === 2) {
          var o = Xe(this.startTouchesPositions, 2), a = o[0], h = a.x, l = a.y, c = o[1], d = c.x, f = c.y;
          this.startTouchesAngle = Math.atan2(f - l, d - h), this.startTouchesDistance = Math.sqrt(Math.pow(d - h, 2) + Math.pow(f - l, 2));
        }
        this.emit("touchdown", st(i, this.lastTouches, this.container)), this.lastTouches = n, this.lastTouchesPositions = this.startTouchesPositions;
      }
    }
  }, {
    key: "handleLeave",
    value: function(i) {
      if (!(!this.enabled || !this.startTouchesPositions.length)) {
        switch (i.cancelable && i.preventDefault(), this.movingTimeout && (this.isMoving = !1, clearTimeout(this.movingTimeout)), this.touchMode) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          case 2:
            if (i.touches.length === 1) {
              this.handleStart(i), i.preventDefault();
              break;
            }
          /* falls through */
          case 1:
            if (this.isMoving) {
              var r = this.renderer.getCamera(), n = r.getState(), o = r.getPreviousState() || {
                x: 0,
                y: 0
              };
              r.animate({
                x: n.x + this.settings.inertiaRatio * (n.x - o.x),
                y: n.y + this.settings.inertiaRatio * (n.y - o.y)
              }, {
                duration: this.settings.inertiaDuration,
                easing: "quadraticOut"
              });
            }
            this.hasMoved = !1, this.isMoving = !1, this.touchMode = 0;
            break;
        }
        if (this.emit("touchup", st(i, this.lastTouches, this.container)), !i.touches.length) {
          var a = Ae(this.lastTouches[0], this.container), h = this.startTouchesPositions[0], l = Math.pow(a.x - h.x, 2) + Math.pow(a.y - h.y, 2);
          if (!i.touches.length && l < Math.pow(this.settings.tapMoveTolerance, 2))
            if (this.lastTap && Date.now() - this.lastTap.time < this.settings.doubleClickTimeout) {
              var c = st(i, this.lastTouches, this.container);
              if (this.emit("doubletap", c), this.lastTap = null, !c.sigmaDefaultPrevented) {
                var d = this.renderer.getCamera(), f = d.getBoundedRatio(d.getState().ratio / this.settings.doubleClickZoomingRatio);
                d.animate(this.renderer.getViewportZoomedState(a, f), {
                  easing: "quadraticInOut",
                  duration: this.settings.doubleClickZoomingDuration
                });
              }
            } else {
              var w = st(i, this.lastTouches, this.container);
              this.emit("tap", w), this.lastTap = {
                time: Date.now(),
                position: w.touches[0] || w.previousTouches[0]
              };
            }
        }
        this.lastTouches = Et(i.touches), this.startTouchesPositions = [];
      }
    }
  }, {
    key: "handleMove",
    value: function(i) {
      var r = this;
      if (!(!this.enabled || !this.startTouchesPositions.length)) {
        i.preventDefault();
        var n = Et(i.touches), o = n.map(function(K) {
          return Ae(K, r.container);
        }), a = this.lastTouches;
        this.lastTouches = n, this.lastTouchesPositions = o;
        var h = st(i, a, this.container);
        if (this.emit("touchmove", h), !h.sigmaDefaultPrevented && (this.hasMoved || (this.hasMoved = o.some(function(K, X) {
          var M = r.startTouchesPositions[X];
          return M && (K.x !== M.x || K.y !== M.y);
        })), !!this.hasMoved)) {
          this.isMoving = !0, this.movingTimeout && clearTimeout(this.movingTimeout), this.movingTimeout = window.setTimeout(function() {
            r.isMoving = !1;
          }, this.settings.dragTimeout);
          var l = this.renderer.getCamera(), c = this.startCameraState, d = this.renderer.getSetting("stagePadding");
          switch (this.touchMode) {
            case 1: {
              var f = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0]), w = f.x, v = f.y, u = this.renderer.viewportToFramedGraph(o[0]), p = u.x, E = u.y;
              l.setState({
                x: c.x + w - p,
                y: c.y + v - E
              });
              break;
            }
            case 2: {
              var m = {
                x: 0.5,
                y: 0.5,
                angle: 0,
                ratio: 1
              }, x = o[0], g = x.x, y = x.y, b = o[1], S = b.x, k = b.y, C = Math.atan2(k - y, S - g) - this.startTouchesAngle, A = Math.hypot(k - y, S - g) / this.startTouchesDistance, G = l.getBoundedRatio(c.ratio / A);
              m.ratio = G, m.angle = c.angle + C;
              var N = this.getDimensions(), _ = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0], {
                cameraState: c
              }), z = Math.min(N.width, N.height) - 2 * d, W = z / N.width, L = z / N.height, T = G / z, B = g - z / 2 / W, $ = y - z / 2 / L, j = [B * Math.cos(-m.angle) - $ * Math.sin(-m.angle), $ * Math.cos(-m.angle) + B * Math.sin(-m.angle)];
              B = j[0], $ = j[1], m.x = _.x - B * T, m.y = _.y + $ * T, l.setState(m);
              break;
            }
          }
        }
      }
    }
  }, {
    key: "setSettings",
    value: function(i) {
      this.settings = i;
    }
  }]);
}(fn);
function Vo(s) {
  if (Array.isArray(s)) return ei(s);
}
function Yo(s) {
  if (typeof Symbol != "undefined" && s[Symbol.iterator] != null || s["@@iterator"] != null) return Array.from(s);
}
function Xo() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ji(s) {
  return Vo(s) || Yo(s) || qr(s) || Xo();
}
function Zo(s, e) {
  if (s == null) return {};
  var t = {};
  for (var i in s) if ({}.hasOwnProperty.call(s, i)) {
    if (e.indexOf(i) !== -1) continue;
    t[i] = s[i];
  }
  return t;
}
function zt(s, e) {
  if (s == null) return {};
  var t, i, r = Zo(s, e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(s);
    for (i = 0; i < n.length; i++) t = n[i], e.indexOf(t) === -1 && {}.propertyIsEnumerable.call(s, t) && (r[t] = s[t]);
  }
  return r;
}
var Wi = /* @__PURE__ */ function() {
  function s(e, t) {
    de(this, s), this.key = e, this.size = t;
  }
  return ue(s, null, [{
    key: "compare",
    value: function(t, i) {
      return t.size > i.size ? -1 : t.size < i.size || t.key > i.key ? 1 : -1;
    }
  }]);
}(), qi = /* @__PURE__ */ function() {
  function s() {
    de(this, s), D(this, "width", 0), D(this, "height", 0), D(this, "cellSize", 0), D(this, "columns", 0), D(this, "rows", 0), D(this, "cells", {});
  }
  return ue(s, [{
    key: "resizeAndClear",
    value: function(t, i) {
      this.width = t.width, this.height = t.height, this.cellSize = i, this.columns = Math.ceil(t.width / i), this.rows = Math.ceil(t.height / i), this.cells = {};
    }
  }, {
    key: "getIndex",
    value: function(t) {
      var i = Math.floor(t.x / this.cellSize), r = Math.floor(t.y / this.cellSize);
      return r * this.columns + i;
    }
  }, {
    key: "add",
    value: function(t, i, r) {
      var n = new Wi(t, i), o = this.getIndex(r), a = this.cells[o];
      a || (a = [], this.cells[o] = a), a.push(n);
    }
  }, {
    key: "organize",
    value: function() {
      for (var t in this.cells) {
        var i = this.cells[t];
        i.sort(Wi.compare);
      }
    }
  }, {
    key: "getLabelsToDisplay",
    value: function(t, i) {
      var r = this.cellSize * this.cellSize, n = r / t / t, o = n * i / r, a = Math.ceil(o), h = [];
      for (var l in this.cells)
        for (var c = this.cells[l], d = 0; d < Math.min(a, c.length); d++)
          h.push(c[d].key);
      return h;
    }
  }]);
}();
function Ko(s) {
  var e = s.graph, t = s.hoveredNode, i = s.highlightedNodes, r = s.displayedNodeLabels, n = [];
  return e.forEachEdge(function(o, a, h, l) {
    (h === t || l === t || i.has(h) || i.has(l) || r.has(h) && r.has(l)) && n.push(o);
  }), n;
}
var Qo = 150, Jo = 50, $e = Object.prototype.hasOwnProperty;
function ea(s, e, t) {
  if (!$e.call(t, "x") || !$e.call(t, "y")) throw new Error('Sigma: could not find a valid position (x, y) for node "'.concat(e, '". All your nodes must have a number "x" and "y". Maybe your forgot to apply a layout or your "nodeReducer" is not returning the correct data?'));
  return t.color || (t.color = s.defaultNodeColor), !t.label && t.label !== "" && (t.label = null), t.label !== void 0 && t.label !== null ? t.label = "" + t.label : t.label = null, t.size || (t.size = 2), $e.call(t, "hidden") || (t.hidden = !1), $e.call(t, "highlighted") || (t.highlighted = !1), $e.call(t, "forceLabel") || (t.forceLabel = !1), (!t.type || t.type === "") && (t.type = s.defaultNodeType), t.zIndex || (t.zIndex = 0), t;
}
function ta(s, e, t) {
  return t.color || (t.color = s.defaultEdgeColor), t.label || (t.label = ""), t.size || (t.size = 0.5), $e.call(t, "hidden") || (t.hidden = !1), $e.call(t, "forceLabel") || (t.forceLabel = !1), (!t.type || t.type === "") && (t.type = s.defaultEdgeType), t.zIndex || (t.zIndex = 0), t;
}
var ia = /* @__PURE__ */ function(s) {
  function e(t, i) {
    var r, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (de(this, e), r = ge(this, e), D(r, "elements", {}), D(r, "canvasContexts", {}), D(r, "webGLContexts", {}), D(r, "pickingLayers", /* @__PURE__ */ new Set()), D(r, "textures", {}), D(r, "frameBuffers", {}), D(r, "activeListeners", {}), D(r, "labelGrid", new qi()), D(r, "nodeDataCache", {}), D(r, "edgeDataCache", {}), D(r, "nodeProgramIndex", {}), D(r, "edgeProgramIndex", {}), D(r, "nodesWithForcedLabels", /* @__PURE__ */ new Set()), D(r, "edgesWithForcedLabels", /* @__PURE__ */ new Set()), D(r, "nodeExtent", {
      x: [0, 1],
      y: [0, 1]
    }), D(r, "nodeZExtent", [1 / 0, -1 / 0]), D(r, "edgeZExtent", [1 / 0, -1 / 0]), D(r, "matrix", Ce()), D(r, "invMatrix", Ce()), D(r, "correctionRatio", 1), D(r, "customBBox", null), D(r, "normalizationFunction", Bi({
      x: [0, 1],
      y: [0, 1]
    })), D(r, "graphToViewportRatio", 1), D(r, "itemIDsIndex", {}), D(r, "nodeIndices", {}), D(r, "edgeIndices", {}), D(r, "width", 0), D(r, "height", 0), D(r, "pixelRatio", Fi()), D(r, "pickingDownSizingRatio", 2 * r.pixelRatio), D(r, "displayedNodeLabels", /* @__PURE__ */ new Set()), D(r, "displayedEdgeLabels", /* @__PURE__ */ new Set()), D(r, "highlightedNodes", /* @__PURE__ */ new Set()), D(r, "hoveredNode", null), D(r, "hoveredEdge", null), D(r, "renderFrame", null), D(r, "renderHighlightedNodesFrame", null), D(r, "needToProcess", !1), D(r, "checkEdgesEventsFrame", null), D(r, "nodePrograms", {}), D(r, "nodeHoverPrograms", {}), D(r, "edgePrograms", {}), r.settings = Mo(n), $t(r.settings), Io(t), !(i instanceof HTMLElement)) throw new Error("Sigma: container should be an html element.");
    r.graph = t, r.container = i, r.createWebGLContext("edges", {
      picking: n.enableEdgeEvents
    }), r.createCanvasContext("edgeLabels"), r.createWebGLContext("nodes", {
      picking: !0
    }), r.createCanvasContext("labels"), r.createCanvasContext("hovers"), r.createWebGLContext("hoverNodes"), r.createCanvasContext("mouse", {
      style: {
        touchAction: "none",
        userSelect: "none"
      }
    }), r.resize();
    for (var o in r.settings.nodeProgramClasses)
      r.registerNodeProgram(o, r.settings.nodeProgramClasses[o], r.settings.nodeHoverProgramClasses[o]);
    for (var a in r.settings.edgeProgramClasses)
      r.registerEdgeProgram(a, r.settings.edgeProgramClasses[a]);
    return r.camera = new Hi(), r.bindCameraHandlers(), r.mouseCaptor = new Ho(r.elements.mouse, r), r.mouseCaptor.setSettings(r.settings), r.touchCaptor = new qo(r.elements.mouse, r), r.touchCaptor.setSettings(r.settings), r.bindEventHandlers(), r.bindGraphHandlers(), r.handleSettingsUpdate(), r.refresh(), r;
  }
  return ve(e, s), ue(e, [{
    key: "registerNodeProgram",
    value: function(i, r, n) {
      return this.nodePrograms[i] && this.nodePrograms[i].kill(), this.nodeHoverPrograms[i] && this.nodeHoverPrograms[i].kill(), this.nodePrograms[i] = new r(this.webGLContexts.nodes, this.frameBuffers.nodes, this), this.nodeHoverPrograms[i] = new (n || r)(this.webGLContexts.hoverNodes, null, this), this;
    }
    /**
     * Internal function used to register an edge program
     *
     * @param  {string}          key              - The program's key, matching the related edges "type" values.
     * @param  {EdgeProgramType} EdgeProgramClass - An edges program class.
     * @return {Sigma}
     */
  }, {
    key: "registerEdgeProgram",
    value: function(i, r) {
      return this.edgePrograms[i] && this.edgePrograms[i].kill(), this.edgePrograms[i] = new r(this.webGLContexts.edges, this.frameBuffers.edges, this), this;
    }
    /**
     * Internal function used to unregister a node program
     *
     * @param  {string} key - The program's key, matching the related nodes "type" values.
     * @return {Sigma}
     */
  }, {
    key: "unregisterNodeProgram",
    value: function(i) {
      if (this.nodePrograms[i]) {
        var r = this.nodePrograms, n = r[i], o = zt(r, [i].map(ht));
        n.kill(), this.nodePrograms = o;
      }
      if (this.nodeHoverPrograms[i]) {
        var a = this.nodeHoverPrograms, h = a[i], l = zt(a, [i].map(ht));
        h.kill(), this.nodePrograms = l;
      }
      return this;
    }
    /**
     * Internal function used to unregister an edge program
     *
     * @param  {string} key - The program's key, matching the related edges "type" values.
     * @return {Sigma}
     */
  }, {
    key: "unregisterEdgeProgram",
    value: function(i) {
      if (this.edgePrograms[i]) {
        var r = this.edgePrograms, n = r[i], o = zt(r, [i].map(ht));
        n.kill(), this.edgePrograms = o;
      }
      return this;
    }
    /**
     * Method (re)binding WebGL texture (for picking).
     *
     * @return {Sigma}
     */
  }, {
    key: "resetWebGLTexture",
    value: function(i) {
      var r = this.webGLContexts[i], n = this.frameBuffers[i], o = this.textures[i];
      o && r.deleteTexture(o);
      var a = r.createTexture();
      return r.bindFramebuffer(r.FRAMEBUFFER, n), r.bindTexture(r.TEXTURE_2D, a), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, this.width, this.height, 0, r.RGBA, r.UNSIGNED_BYTE, null), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, a, 0), this.textures[i] = a, this;
    }
    /**
     * Method binding camera handlers.
     *
     * @return {Sigma}
     */
  }, {
    key: "bindCameraHandlers",
    value: function() {
      var i = this;
      return this.activeListeners.camera = function() {
        i.scheduleRender();
      }, this.camera.on("updated", this.activeListeners.camera), this;
    }
    /**
     * Method unbinding camera handlers.
     *
     * @return {Sigma}
     */
  }, {
    key: "unbindCameraHandlers",
    value: function() {
      return this.camera.removeListener("updated", this.activeListeners.camera), this;
    }
    /**
     * Method that returns the closest node to a given position.
     */
  }, {
    key: "getNodeAtPosition",
    value: function(i) {
      var r = i.x, n = i.y, o = Ci(this.webGLContexts.nodes, this.frameBuffers.nodes, r, n, this.pixelRatio, this.pickingDownSizingRatio), a = Ti.apply(void 0, ji(o)), h = this.itemIDsIndex[a];
      return h && h.type === "node" ? h.id : null;
    }
    /**
     * Method binding event handlers.
     *
     * @return {Sigma}
     */
  }, {
    key: "bindEventHandlers",
    value: function() {
      var i = this;
      this.activeListeners.handleResize = function() {
        i.scheduleRefresh();
      }, window.addEventListener("resize", this.activeListeners.handleResize), this.activeListeners.handleMove = function(n) {
        var o = nt(n), a = {
          event: o,
          preventSigmaDefault: function() {
            o.preventSigmaDefault();
          }
        }, h = i.getNodeAtPosition(o);
        if (h && i.hoveredNode !== h && !i.nodeDataCache[h].hidden) {
          i.hoveredNode && i.emit("leaveNode", H(H({}, a), {}, {
            node: i.hoveredNode
          })), i.hoveredNode = h, i.emit("enterNode", H(H({}, a), {}, {
            node: h
          })), i.scheduleHighlightedNodesRender();
          return;
        }
        if (i.hoveredNode && i.getNodeAtPosition(o) !== i.hoveredNode) {
          var l = i.hoveredNode;
          i.hoveredNode = null, i.emit("leaveNode", H(H({}, a), {}, {
            node: l
          })), i.scheduleHighlightedNodesRender();
          return;
        }
        if (i.settings.enableEdgeEvents) {
          var c = i.hoveredNode ? null : i.getEdgeAtPoint(a.event.x, a.event.y);
          c !== i.hoveredEdge && (i.hoveredEdge && i.emit("leaveEdge", H(H({}, a), {}, {
            edge: i.hoveredEdge
          })), c && i.emit("enterEdge", H(H({}, a), {}, {
            edge: c
          })), i.hoveredEdge = c);
        }
      }, this.activeListeners.handleMoveBody = function(n) {
        var o = nt(n);
        i.emit("moveBody", {
          event: o,
          preventSigmaDefault: function() {
            o.preventSigmaDefault();
          }
        });
      }, this.activeListeners.handleLeave = function(n) {
        var o = nt(n), a = {
          event: o,
          preventSigmaDefault: function() {
            o.preventSigmaDefault();
          }
        };
        i.hoveredNode && (i.emit("leaveNode", H(H({}, a), {}, {
          node: i.hoveredNode
        })), i.scheduleHighlightedNodesRender()), i.settings.enableEdgeEvents && i.hoveredEdge && (i.emit("leaveEdge", H(H({}, a), {}, {
          edge: i.hoveredEdge
        })), i.scheduleHighlightedNodesRender()), i.emit("leaveStage", H({}, a));
      }, this.activeListeners.handleEnter = function(n) {
        var o = nt(n), a = {
          event: o,
          preventSigmaDefault: function() {
            o.preventSigmaDefault();
          }
        };
        i.emit("enterStage", H({}, a));
      };
      var r = function(o) {
        return function(a) {
          var h = nt(a), l = {
            event: h,
            preventSigmaDefault: function() {
              h.preventSigmaDefault();
            }
          }, c = i.getNodeAtPosition(h);
          if (c) return i.emit("".concat(o, "Node"), H(H({}, l), {}, {
            node: c
          }));
          if (i.settings.enableEdgeEvents) {
            var d = i.getEdgeAtPoint(h.x, h.y);
            if (d) return i.emit("".concat(o, "Edge"), H(H({}, l), {}, {
              edge: d
            }));
          }
          return i.emit("".concat(o, "Stage"), l);
        };
      };
      return this.activeListeners.handleClick = r("click"), this.activeListeners.handleRightClick = r("rightClick"), this.activeListeners.handleDoubleClick = r("doubleClick"), this.activeListeners.handleWheel = r("wheel"), this.activeListeners.handleDown = r("down"), this.activeListeners.handleUp = r("up"), this.mouseCaptor.on("mousemove", this.activeListeners.handleMove), this.mouseCaptor.on("mousemovebody", this.activeListeners.handleMoveBody), this.mouseCaptor.on("click", this.activeListeners.handleClick), this.mouseCaptor.on("rightClick", this.activeListeners.handleRightClick), this.mouseCaptor.on("doubleClick", this.activeListeners.handleDoubleClick), this.mouseCaptor.on("wheel", this.activeListeners.handleWheel), this.mouseCaptor.on("mousedown", this.activeListeners.handleDown), this.mouseCaptor.on("mouseup", this.activeListeners.handleUp), this.mouseCaptor.on("mouseleave", this.activeListeners.handleLeave), this.mouseCaptor.on("mouseenter", this.activeListeners.handleEnter), this.touchCaptor.on("touchdown", this.activeListeners.handleDown), this.touchCaptor.on("touchdown", this.activeListeners.handleMove), this.touchCaptor.on("touchup", this.activeListeners.handleUp), this.touchCaptor.on("touchmove", this.activeListeners.handleMove), this.touchCaptor.on("tap", this.activeListeners.handleClick), this.touchCaptor.on("doubletap", this.activeListeners.handleDoubleClick), this.touchCaptor.on("touchmove", this.activeListeners.handleMoveBody), this;
    }
    /**
     * Method binding graph handlers
     *
     * @return {Sigma}
     */
  }, {
    key: "bindGraphHandlers",
    value: function() {
      var i = this, r = this.graph, n = /* @__PURE__ */ new Set(["x", "y", "zIndex", "type"]);
      return this.activeListeners.eachNodeAttributesUpdatedGraphUpdate = function(o) {
        var a, h = (a = o.hints) === null || a === void 0 ? void 0 : a.attributes;
        i.graph.forEachNode(function(c) {
          return i.updateNode(c);
        });
        var l = !h || h.some(function(c) {
          return n.has(c);
        });
        i.refresh({
          partialGraph: {
            nodes: r.nodes()
          },
          skipIndexation: !l,
          schedule: !0
        });
      }, this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate = function(o) {
        var a, h = (a = o.hints) === null || a === void 0 ? void 0 : a.attributes;
        i.graph.forEachEdge(function(c) {
          return i.updateEdge(c);
        });
        var l = h && ["zIndex", "type"].some(function(c) {
          return h == null ? void 0 : h.includes(c);
        });
        i.refresh({
          partialGraph: {
            edges: r.edges()
          },
          skipIndexation: !l,
          schedule: !0
        });
      }, this.activeListeners.addNodeGraphUpdate = function(o) {
        var a = o.key;
        i.addNode(a), i.refresh({
          partialGraph: {
            nodes: [a]
          },
          skipIndexation: !1,
          schedule: !0
        });
      }, this.activeListeners.updateNodeGraphUpdate = function(o) {
        var a = o.key;
        i.refresh({
          partialGraph: {
            nodes: [a]
          },
          skipIndexation: !1,
          schedule: !0
        });
      }, this.activeListeners.dropNodeGraphUpdate = function(o) {
        var a = o.key;
        i.removeNode(a), i.refresh({
          schedule: !0
        });
      }, this.activeListeners.addEdgeGraphUpdate = function(o) {
        var a = o.key;
        i.addEdge(a), i.refresh({
          partialGraph: {
            edges: [a]
          },
          schedule: !0
        });
      }, this.activeListeners.updateEdgeGraphUpdate = function(o) {
        var a = o.key;
        i.refresh({
          partialGraph: {
            edges: [a]
          },
          skipIndexation: !1,
          schedule: !0
        });
      }, this.activeListeners.dropEdgeGraphUpdate = function(o) {
        var a = o.key;
        i.removeEdge(a), i.refresh({
          schedule: !0
        });
      }, this.activeListeners.clearEdgesGraphUpdate = function() {
        i.clearEdgeState(), i.clearEdgeIndices(), i.refresh({
          schedule: !0
        });
      }, this.activeListeners.clearGraphUpdate = function() {
        i.clearEdgeState(), i.clearNodeState(), i.clearEdgeIndices(), i.clearNodeIndices(), i.refresh({
          schedule: !0
        });
      }, r.on("nodeAdded", this.activeListeners.addNodeGraphUpdate), r.on("nodeDropped", this.activeListeners.dropNodeGraphUpdate), r.on("nodeAttributesUpdated", this.activeListeners.updateNodeGraphUpdate), r.on("eachNodeAttributesUpdated", this.activeListeners.eachNodeAttributesUpdatedGraphUpdate), r.on("edgeAdded", this.activeListeners.addEdgeGraphUpdate), r.on("edgeDropped", this.activeListeners.dropEdgeGraphUpdate), r.on("edgeAttributesUpdated", this.activeListeners.updateEdgeGraphUpdate), r.on("eachEdgeAttributesUpdated", this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate), r.on("edgesCleared", this.activeListeners.clearEdgesGraphUpdate), r.on("cleared", this.activeListeners.clearGraphUpdate), this;
    }
    /**
     * Method used to unbind handlers from the graph.
     *
     * @return {undefined}
     */
  }, {
    key: "unbindGraphHandlers",
    value: function() {
      var i = this.graph;
      i.removeListener("nodeAdded", this.activeListeners.addNodeGraphUpdate), i.removeListener("nodeDropped", this.activeListeners.dropNodeGraphUpdate), i.removeListener("nodeAttributesUpdated", this.activeListeners.updateNodeGraphUpdate), i.removeListener("eachNodeAttributesUpdated", this.activeListeners.eachNodeAttributesUpdatedGraphUpdate), i.removeListener("edgeAdded", this.activeListeners.addEdgeGraphUpdate), i.removeListener("edgeDropped", this.activeListeners.dropEdgeGraphUpdate), i.removeListener("edgeAttributesUpdated", this.activeListeners.updateEdgeGraphUpdate), i.removeListener("eachEdgeAttributesUpdated", this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate), i.removeListener("edgesCleared", this.activeListeners.clearEdgesGraphUpdate), i.removeListener("cleared", this.activeListeners.clearGraphUpdate);
    }
    /**
     * Method looking for an edge colliding with a given point at (x, y). Returns
     * the key of the edge if any, or null else.
     */
  }, {
    key: "getEdgeAtPoint",
    value: function(i, r) {
      var n = Ci(this.webGLContexts.edges, this.frameBuffers.edges, i, r, this.pixelRatio, this.pickingDownSizingRatio), o = Ti.apply(void 0, ji(n)), a = this.itemIDsIndex[o];
      return a && a.type === "edge" ? a.id : null;
    }
    /**
     * Method used to process the whole graph's data.
     *  - extent
     *  - normalizationFunction
     *  - compute node's coordinate
     *  - labelgrid
     *  - program data allocation
     * @return {Sigma}
     */
  }, {
    key: "process",
    value: function() {
      var i = this;
      this.emit("beforeProcess");
      var r = this.graph, n = this.settings, o = this.getDimensions();
      if (this.nodeExtent = Do(this.graph), !this.settings.autoRescale) {
        var a = o.width, h = o.height, l = this.nodeExtent, c = l.x, d = l.y;
        this.nodeExtent = {
          x: [(c[0] + c[1]) / 2 - a / 2, (c[0] + c[1]) / 2 + a / 2],
          y: [(d[0] + d[1]) / 2 - h / 2, (d[0] + d[1]) / 2 + h / 2]
        };
      }
      this.normalizationFunction = Bi(this.customBBox || this.nodeExtent);
      var f = new Hi(), w = rt(f.getState(), o, this.getGraphDimensions(), this.getStagePadding());
      this.labelGrid.resizeAndClear(o, n.labelGridCellSize);
      for (var v = {}, u = {}, p = {}, E = {}, m = 1, x = r.nodes(), g = 0, y = x.length; g < y; g++) {
        var b = x[g], S = this.nodeDataCache[b], k = r.getNodeAttributes(b);
        S.x = k.x, S.y = k.y, this.normalizationFunction.applyTo(S), typeof S.label == "string" && !S.hidden && this.labelGrid.add(b, S.size, this.framedGraphToViewport(S, {
          matrix: w
        })), v[S.type] = (v[S.type] || 0) + 1;
      }
      this.labelGrid.organize();
      for (var C in this.nodePrograms) {
        if (!$e.call(this.nodePrograms, C))
          throw new Error('Sigma: could not find a suitable program for node type "'.concat(C, '"!'));
        this.nodePrograms[C].reallocate(v[C] || 0), v[C] = 0;
      }
      this.settings.zIndex && this.nodeZExtent[0] !== this.nodeZExtent[1] && (x = Oi(this.nodeZExtent, function(Q) {
        return i.nodeDataCache[Q].zIndex;
      }, x));
      for (var A = 0, G = x.length; A < G; A++) {
        var N = x[A];
        u[N] = m, E[u[N]] = {
          type: "node",
          id: N
        }, m++;
        var _ = this.nodeDataCache[N];
        this.addNodeToProgram(N, u[N], v[_.type]++);
      }
      for (var z = {}, W = r.edges(), L = 0, T = W.length; L < T; L++) {
        var B = W[L], $ = this.edgeDataCache[B];
        z[$.type] = (z[$.type] || 0) + 1;
      }
      this.settings.zIndex && this.edgeZExtent[0] !== this.edgeZExtent[1] && (W = Oi(this.edgeZExtent, function(Q) {
        return i.edgeDataCache[Q].zIndex;
      }, W));
      for (var j in this.edgePrograms) {
        if (!$e.call(this.edgePrograms, j))
          throw new Error('Sigma: could not find a suitable program for edge type "'.concat(j, '"!'));
        this.edgePrograms[j].reallocate(z[j] || 0), z[j] = 0;
      }
      for (var K = 0, X = W.length; K < X; K++) {
        var M = W[K];
        p[M] = m, E[p[M]] = {
          type: "edge",
          id: M
        }, m++;
        var ie = this.edgeDataCache[M];
        this.addEdgeToProgram(M, p[M], z[ie.type]++);
      }
      return this.itemIDsIndex = E, this.nodeIndices = u, this.edgeIndices = p, this.emit("afterProcess"), this;
    }
    /**
     * Method that backports potential settings updates where it's needed.
     * @private
     */
  }, {
    key: "handleSettingsUpdate",
    value: function(i) {
      var r = this, n = this.settings;
      if (this.camera.minRatio = n.minCameraRatio, this.camera.maxRatio = n.maxCameraRatio, this.camera.enabledZooming = n.enableCameraZooming, this.camera.enabledPanning = n.enableCameraPanning, this.camera.enabledRotation = n.enableCameraRotation, n.cameraPanBoundaries ? this.camera.clean = function(c) {
        return r.cleanCameraState(c, n.cameraPanBoundaries && ri(n.cameraPanBoundaries) === "object" ? n.cameraPanBoundaries : {});
      } : this.camera.clean = null, this.camera.setState(this.camera.validateState(this.camera.getState())), i) {
        if (i.edgeProgramClasses !== n.edgeProgramClasses) {
          for (var o in n.edgeProgramClasses)
            n.edgeProgramClasses[o] !== i.edgeProgramClasses[o] && this.registerEdgeProgram(o, n.edgeProgramClasses[o]);
          for (var a in i.edgeProgramClasses)
            n.edgeProgramClasses[a] || this.unregisterEdgeProgram(a);
        }
        if (i.nodeProgramClasses !== n.nodeProgramClasses || i.nodeHoverProgramClasses !== n.nodeHoverProgramClasses) {
          for (var h in n.nodeProgramClasses)
            (n.nodeProgramClasses[h] !== i.nodeProgramClasses[h] || n.nodeHoverProgramClasses[h] !== i.nodeHoverProgramClasses[h]) && this.registerNodeProgram(h, n.nodeProgramClasses[h], n.nodeHoverProgramClasses[h]);
          for (var l in i.nodeProgramClasses)
            n.nodeProgramClasses[l] || this.unregisterNodeProgram(l);
        }
      }
      return this.mouseCaptor.setSettings(this.settings), this.touchCaptor.setSettings(this.settings), this;
    }
  }, {
    key: "cleanCameraState",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = r.tolerance, o = n === void 0 ? 0 : n, a = r.boundaries, h = H({}, i), l = a || this.nodeExtent, c = Xe(l.x, 2), d = c[0], f = c[1], w = Xe(l.y, 2), v = w[0], u = w[1], p = [this.graphToViewport({
        x: d,
        y: v
      }, {
        cameraState: i
      }), this.graphToViewport({
        x: f,
        y: v
      }, {
        cameraState: i
      }), this.graphToViewport({
        x: d,
        y: u
      }, {
        cameraState: i
      }), this.graphToViewport({
        x: f,
        y: u
      }, {
        cameraState: i
      })], E = 1 / 0, m = -1 / 0, x = 1 / 0, g = -1 / 0;
      p.forEach(function(z) {
        var W = z.x, L = z.y;
        E = Math.min(E, W), m = Math.max(m, W), x = Math.min(x, L), g = Math.max(g, L);
      });
      var y = m - E, b = g - x, S = this.getDimensions(), k = S.width, C = S.height, A = 0, G = 0;
      if (y >= k ? m < k - o ? A = m - (k - o) : E > o && (A = E - o) : m > k + o ? A = m - (k + o) : E < -o && (A = E + o), b >= C ? g < C - o ? G = g - (C - o) : x > o && (G = x - o) : g > C + o ? G = g - (C + o) : x < -o && (G = x + o), A || G) {
        var N = this.viewportToFramedGraph({
          x: 0,
          y: 0
        }, {
          cameraState: i
        }), _ = this.viewportToFramedGraph({
          x: A,
          y: G
        }, {
          cameraState: i
        });
        A = _.x - N.x, G = _.y - N.y, h.x += A, h.y += G;
      }
      return h;
    }
    /**
     * Method used to render labels.
     *
     * @return {Sigma}
     */
  }, {
    key: "renderLabels",
    value: function() {
      if (!this.settings.renderLabels) return this;
      var i = this.camera.getState(), r = this.labelGrid.getLabelsToDisplay(i.ratio, this.settings.labelDensity);
      Ui(r, this.nodesWithForcedLabels), this.displayedNodeLabels = /* @__PURE__ */ new Set();
      for (var n = this.canvasContexts.labels, o = 0, a = r.length; o < a; o++) {
        var h = r[o], l = this.nodeDataCache[h];
        if (!this.displayedNodeLabels.has(h) && !l.hidden) {
          var c = this.framedGraphToViewport(l), d = c.x, f = c.y, w = this.scaleSize(l.size);
          if (!(!l.forceLabel && w < this.settings.labelRenderedSizeThreshold) && !(d < -150 || d > this.width + Qo || f < -50 || f > this.height + Jo)) {
            this.displayedNodeLabels.add(h);
            var v = this.settings.defaultDrawNodeLabel, u = this.nodePrograms[l.type], p = (u == null ? void 0 : u.drawLabel) || v;
            p(n, H(H({
              key: h
            }, l), {}, {
              size: w,
              x: d,
              y: f
            }), this.settings);
          }
        }
      }
      return this;
    }
    /**
     * Method used to render edge labels, based on which node labels were
     * rendered.
     *
     * @return {Sigma}
     */
  }, {
    key: "renderEdgeLabels",
    value: function() {
      if (!this.settings.renderEdgeLabels) return this;
      var i = this.canvasContexts.edgeLabels;
      i.clearRect(0, 0, this.width, this.height);
      var r = Ko({
        graph: this.graph,
        hoveredNode: this.hoveredNode,
        displayedNodeLabels: this.displayedNodeLabels,
        highlightedNodes: this.highlightedNodes
      });
      Ui(r, this.edgesWithForcedLabels);
      for (var n = /* @__PURE__ */ new Set(), o = 0, a = r.length; o < a; o++) {
        var h = r[o], l = this.graph.extremities(h), c = this.nodeDataCache[l[0]], d = this.nodeDataCache[l[1]], f = this.edgeDataCache[h];
        if (!n.has(h) && !(f.hidden || c.hidden || d.hidden)) {
          var w = this.settings.defaultDrawEdgeLabel, v = this.edgePrograms[f.type], u = (v == null ? void 0 : v.drawLabel) || w;
          u(i, H(H({
            key: h
          }, f), {}, {
            size: this.scaleSize(f.size)
          }), H(H(H({
            key: l[0]
          }, c), this.framedGraphToViewport(c)), {}, {
            size: this.scaleSize(c.size)
          }), H(H(H({
            key: l[1]
          }, d), this.framedGraphToViewport(d)), {}, {
            size: this.scaleSize(d.size)
          }), this.settings), n.add(h);
        }
      }
      return this.displayedEdgeLabels = n, this;
    }
    /**
     * Method used to render the highlighted nodes.
     *
     * @return {Sigma}
     */
  }, {
    key: "renderHighlightedNodes",
    value: function() {
      var i = this, r = this.canvasContexts.hovers;
      r.clearRect(0, 0, this.width, this.height);
      var n = function(w) {
        var v = i.nodeDataCache[w], u = i.framedGraphToViewport(v), p = u.x, E = u.y, m = i.scaleSize(v.size), x = i.settings.defaultDrawNodeHover, g = i.nodePrograms[v.type], y = (g == null ? void 0 : g.drawHover) || x;
        y(r, H(H({
          key: w
        }, v), {}, {
          size: m,
          x: p,
          y: E
        }), i.settings);
      }, o = [];
      this.hoveredNode && !this.nodeDataCache[this.hoveredNode].hidden && o.push(this.hoveredNode), this.highlightedNodes.forEach(function(f) {
        f !== i.hoveredNode && o.push(f);
      }), o.forEach(function(f) {
        return n(f);
      });
      var a = {};
      o.forEach(function(f) {
        var w = i.nodeDataCache[f].type;
        a[w] = (a[w] || 0) + 1;
      });
      for (var h in this.nodeHoverPrograms)
        this.nodeHoverPrograms[h].reallocate(a[h] || 0), a[h] = 0;
      o.forEach(function(f) {
        var w = i.nodeDataCache[f];
        i.nodeHoverPrograms[w.type].process(0, a[w.type]++, w);
      }), this.webGLContexts.hoverNodes.clear(this.webGLContexts.hoverNodes.COLOR_BUFFER_BIT);
      var l = this.getRenderParams();
      for (var c in this.nodeHoverPrograms) {
        var d = this.nodeHoverPrograms[c];
        d.render(l);
      }
    }
    /**
     * Method used to schedule a hover render.
     *
     */
  }, {
    key: "scheduleHighlightedNodesRender",
    value: function() {
      var i = this;
      this.renderHighlightedNodesFrame || this.renderFrame || (this.renderHighlightedNodesFrame = requestAnimationFrame(function() {
        i.renderHighlightedNodesFrame = null, i.renderHighlightedNodes(), i.renderEdgeLabels();
      }));
    }
    /**
     * Method used to render.
     *
     * @return {Sigma}
     */
  }, {
    key: "render",
    value: function() {
      var i = this;
      this.emit("beforeRender");
      var r = function() {
        return i.emit("afterRender"), i;
      };
      if (this.renderFrame && (cancelAnimationFrame(this.renderFrame), this.renderFrame = null), this.resize(), this.needToProcess && this.process(), this.needToProcess = !1, this.clear(), this.pickingLayers.forEach(function(p) {
        return i.resetWebGLTexture(p);
      }), !this.graph.order) return r();
      var n = this.mouseCaptor, o = this.camera.isAnimated() || n.isMoving || n.draggedEvents || n.currentWheelDirection, a = this.camera.getState(), h = this.getDimensions(), l = this.getGraphDimensions(), c = this.getStagePadding();
      this.matrix = rt(a, h, l, c), this.invMatrix = rt(a, h, l, c, !0), this.correctionRatio = No(this.matrix, a, h), this.graphToViewportRatio = this.getGraphToViewportRatio();
      var d = this.getRenderParams();
      for (var f in this.nodePrograms) {
        var w = this.nodePrograms[f];
        w.render(d);
      }
      if (!this.settings.hideEdgesOnMove || !o)
        for (var v in this.edgePrograms) {
          var u = this.edgePrograms[v];
          u.render(d);
        }
      return this.settings.hideLabelsOnMove && o || (this.renderLabels(), this.renderEdgeLabels(), this.renderHighlightedNodes()), r();
    }
    /**
     * Add a node in the internal data structures.
     * @private
     * @param key The node's graphology ID
     */
  }, {
    key: "addNode",
    value: function(i) {
      var r = Object.assign({}, this.graph.getNodeAttributes(i));
      this.settings.nodeReducer && (r = this.settings.nodeReducer(i, r));
      var n = ea(this.settings, i, r);
      this.nodeDataCache[i] = n, this.nodesWithForcedLabels.delete(i), n.forceLabel && !n.hidden && this.nodesWithForcedLabels.add(i), this.highlightedNodes.delete(i), n.highlighted && !n.hidden && this.highlightedNodes.add(i), this.settings.zIndex && (n.zIndex < this.nodeZExtent[0] && (this.nodeZExtent[0] = n.zIndex), n.zIndex > this.nodeZExtent[1] && (this.nodeZExtent[1] = n.zIndex));
    }
    /**
     * Update a node the internal data structures.
     * @private
     * @param key The node's graphology ID
     */
  }, {
    key: "updateNode",
    value: function(i) {
      this.addNode(i);
      var r = this.nodeDataCache[i];
      this.normalizationFunction.applyTo(r);
    }
    /**
     * Remove a node from the internal data structures.
     * @private
     * @param key The node's graphology ID
     */
  }, {
    key: "removeNode",
    value: function(i) {
      delete this.nodeDataCache[i], delete this.nodeProgramIndex[i], this.highlightedNodes.delete(i), this.hoveredNode === i && (this.hoveredNode = null), this.nodesWithForcedLabels.delete(i);
    }
    /**
     * Add an edge into the internal data structures.
     * @private
     * @param key The edge's graphology ID
     */
  }, {
    key: "addEdge",
    value: function(i) {
      var r = Object.assign({}, this.graph.getEdgeAttributes(i));
      this.settings.edgeReducer && (r = this.settings.edgeReducer(i, r));
      var n = ta(this.settings, i, r);
      this.edgeDataCache[i] = n, this.edgesWithForcedLabels.delete(i), n.forceLabel && !n.hidden && this.edgesWithForcedLabels.add(i), this.settings.zIndex && (n.zIndex < this.edgeZExtent[0] && (this.edgeZExtent[0] = n.zIndex), n.zIndex > this.edgeZExtent[1] && (this.edgeZExtent[1] = n.zIndex));
    }
    /**
     * Update an edge in the internal data structures.
     * @private
     * @param key The edge's graphology ID
     */
  }, {
    key: "updateEdge",
    value: function(i) {
      this.addEdge(i);
    }
    /**
     * Remove an edge from the internal data structures.
     * @private
     * @param key The edge's graphology ID
     */
  }, {
    key: "removeEdge",
    value: function(i) {
      delete this.edgeDataCache[i], delete this.edgeProgramIndex[i], this.hoveredEdge === i && (this.hoveredEdge = null), this.edgesWithForcedLabels.delete(i);
    }
    /**
     * Clear all indices related to nodes.
     * @private
     */
  }, {
    key: "clearNodeIndices",
    value: function() {
      this.labelGrid = new qi(), this.nodeExtent = {
        x: [0, 1],
        y: [0, 1]
      }, this.nodeDataCache = {}, this.edgeProgramIndex = {}, this.nodesWithForcedLabels = /* @__PURE__ */ new Set(), this.nodeZExtent = [1 / 0, -1 / 0], this.highlightedNodes = /* @__PURE__ */ new Set();
    }
    /**
     * Clear all indices related to edges.
     * @private
     */
  }, {
    key: "clearEdgeIndices",
    value: function() {
      this.edgeDataCache = {}, this.edgeProgramIndex = {}, this.edgesWithForcedLabels = /* @__PURE__ */ new Set(), this.edgeZExtent = [1 / 0, -1 / 0];
    }
    /**
     * Clear all indices.
     * @private
     */
  }, {
    key: "clearIndices",
    value: function() {
      this.clearEdgeIndices(), this.clearNodeIndices();
    }
    /**
     * Clear all graph state related to nodes.
     * @private
     */
  }, {
    key: "clearNodeState",
    value: function() {
      this.displayedNodeLabels = /* @__PURE__ */ new Set(), this.highlightedNodes = /* @__PURE__ */ new Set(), this.hoveredNode = null;
    }
    /**
     * Clear all graph state related to edges.
     * @private
     */
  }, {
    key: "clearEdgeState",
    value: function() {
      this.displayedEdgeLabels = /* @__PURE__ */ new Set(), this.highlightedNodes = /* @__PURE__ */ new Set(), this.hoveredEdge = null;
    }
    /**
     * Clear all graph state.
     * @private
     */
  }, {
    key: "clearState",
    value: function() {
      this.clearEdgeState(), this.clearNodeState();
    }
    /**
     * Add the node data to its program.
     * @private
     * @param node The node's graphology ID
     * @param fingerprint A fingerprint used to identity the node with picking
     * @param position The index where to place the node in the program
     */
  }, {
    key: "addNodeToProgram",
    value: function(i, r, n) {
      var o = this.nodeDataCache[i], a = this.nodePrograms[o.type];
      if (!a) throw new Error('Sigma: could not find a suitable program for node type "'.concat(o.type, '"!'));
      a.process(r, n, o), this.nodeProgramIndex[i] = n;
    }
    /**
     * Add the edge data to its program.
     * @private
     * @param edge The edge's graphology ID
     * @param fingerprint A fingerprint used to identity the edge with picking
     * @param position The index where to place the edge in the program
     */
  }, {
    key: "addEdgeToProgram",
    value: function(i, r, n) {
      var o = this.edgeDataCache[i], a = this.edgePrograms[o.type];
      if (!a) throw new Error('Sigma: could not find a suitable program for edge type "'.concat(o.type, '"!'));
      var h = this.graph.extremities(i), l = this.nodeDataCache[h[0]], c = this.nodeDataCache[h[1]];
      a.process(r, n, l, c, o), this.edgeProgramIndex[i] = n;
    }
    /**---------------------------------------------------------------------------
     * Public API.
     **---------------------------------------------------------------------------
     */
    /**
     * Function used to get the render params.
     *
     * @return {RenderParams}
     */
  }, {
    key: "getRenderParams",
    value: function() {
      return {
        matrix: this.matrix,
        invMatrix: this.invMatrix,
        width: this.width,
        height: this.height,
        pixelRatio: this.pixelRatio,
        zoomRatio: this.camera.ratio,
        cameraAngle: this.camera.angle,
        sizeRatio: 1 / this.scaleSize(),
        correctionRatio: this.correctionRatio,
        downSizingRatio: this.pickingDownSizingRatio,
        minEdgeThickness: this.settings.minEdgeThickness,
        antiAliasingFeather: this.settings.antiAliasingFeather
      };
    }
    /**
     * Function used to retrieve the actual stage padding value.
     *
     * @return {number}
     */
  }, {
    key: "getStagePadding",
    value: function() {
      var i = this.settings, r = i.stagePadding, n = i.autoRescale;
      return n && r || 0;
    }
    /**
     * Function used to create a layer element.
     *
     * @param {string} id - Context's id.
     * @param {string} tag - The HTML tag to use.
     * @param options
     * @return {Sigma}
     */
  }, {
    key: "createLayer",
    value: function(i, r) {
      var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (this.elements[i]) throw new Error('Sigma: a layer named "'.concat(i, '" already exists'));
      var o = Po(r, {
        position: "absolute"
      }, {
        class: "sigma-".concat(i)
      });
      return n.style && Object.assign(o.style, n.style), this.elements[i] = o, "beforeLayer" in n && n.beforeLayer ? this.elements[n.beforeLayer].before(o) : "afterLayer" in n && n.afterLayer ? this.elements[n.afterLayer].after(o) : this.container.appendChild(o), o;
    }
    /**
     * Function used to create a canvas element.
     *
     * @param {string} id - Context's id.
     * @param options
     * @return {Sigma}
     */
  }, {
    key: "createCanvas",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.createLayer(i, "canvas", r);
    }
    /**
     * Function used to create a canvas context and add the relevant DOM elements.
     *
     * @param  {string} id - Context's id.
     * @param  options
     * @return {Sigma}
     */
  }, {
    key: "createCanvasContext",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = this.createCanvas(i, r), o = {
        preserveDrawingBuffer: !1,
        antialias: !1
      };
      return this.canvasContexts[i] = n.getContext("2d", o), this;
    }
    /**
     * Function used to create a WebGL context and add the relevant DOM
     * elements.
     *
     * @param  {string}  id      - Context's id.
     * @param  {object?} options - #getContext params to override (optional)
     * @return {WebGLRenderingContext}
     */
  }, {
    key: "createWebGLContext",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = (r == null ? void 0 : r.canvas) || this.createCanvas(i, r);
      r.hidden && n.remove();
      var o = H({
        preserveDrawingBuffer: !1,
        antialias: !1
      }, r), a;
      a = n.getContext("webgl2", o), a || (a = n.getContext("webgl", o)), a || (a = n.getContext("experimental-webgl", o));
      var h = a;
      if (this.webGLContexts[i] = h, h.blendFunc(h.ONE, h.ONE_MINUS_SRC_ALPHA), r.picking) {
        this.pickingLayers.add(i);
        var l = h.createFramebuffer();
        if (!l) throw new Error("Sigma: cannot create a new frame buffer for layer ".concat(i));
        this.frameBuffers[i] = l;
      }
      return h;
    }
    /**
     * Function used to properly kill a layer.
     *
     * @param  {string} id - Layer id.
     * @return {Sigma}
     */
  }, {
    key: "killLayer",
    value: function(i) {
      var r = this.elements[i];
      if (!r) throw new Error("Sigma: cannot kill layer ".concat(i, ", which does not exist"));
      if (this.webGLContexts[i]) {
        var n, o = this.webGLContexts[i];
        (n = o.getExtension("WEBGL_lose_context")) === null || n === void 0 || n.loseContext(), delete this.webGLContexts[i];
      } else this.canvasContexts[i] && delete this.canvasContexts[i];
      return r.remove(), delete this.elements[i], this;
    }
    /**
     * Method returning the renderer's camera.
     *
     * @return {Camera}
     */
  }, {
    key: "getCamera",
    value: function() {
      return this.camera;
    }
    /**
     * Method setting the renderer's camera.
     *
     * @param  {Camera} camera - New camera.
     * @return {Sigma}
     */
  }, {
    key: "setCamera",
    value: function(i) {
      this.unbindCameraHandlers(), this.camera = i, this.bindCameraHandlers();
    }
    /**
     * Method returning the container DOM element.
     *
     * @return {HTMLElement}
     */
  }, {
    key: "getContainer",
    value: function() {
      return this.container;
    }
    /**
     * Method returning the renderer's graph.
     *
     * @return {Graph}
     */
  }, {
    key: "getGraph",
    value: function() {
      return this.graph;
    }
    /**
     * Method used to set the renderer's graph.
     *
     * @return {Graph}
     */
  }, {
    key: "setGraph",
    value: function(i) {
      i !== this.graph && (this.hoveredNode && !i.hasNode(this.hoveredNode) && (this.hoveredNode = null), this.hoveredEdge && !i.hasEdge(this.hoveredEdge) && (this.hoveredEdge = null), this.unbindGraphHandlers(), this.checkEdgesEventsFrame !== null && (cancelAnimationFrame(this.checkEdgesEventsFrame), this.checkEdgesEventsFrame = null), this.graph = i, this.bindGraphHandlers(), this.refresh());
    }
    /**
     * Method returning the mouse captor.
     *
     * @return {MouseCaptor}
     */
  }, {
    key: "getMouseCaptor",
    value: function() {
      return this.mouseCaptor;
    }
    /**
     * Method returning the touch captor.
     *
     * @return {TouchCaptor}
     */
  }, {
    key: "getTouchCaptor",
    value: function() {
      return this.touchCaptor;
    }
    /**
     * Method returning the current renderer's dimensions.
     *
     * @return {Dimensions}
     */
  }, {
    key: "getDimensions",
    value: function() {
      return {
        width: this.width,
        height: this.height
      };
    }
    /**
     * Method returning the current graph's dimensions.
     *
     * @return {Dimensions}
     */
  }, {
    key: "getGraphDimensions",
    value: function() {
      var i = this.customBBox || this.nodeExtent;
      return {
        width: i.x[1] - i.x[0] || 1,
        height: i.y[1] - i.y[0] || 1
      };
    }
    /**
     * Method used to get all the sigma node attributes.
     * It's useful for example to get the position of a node
     * and to get values that are set by the nodeReducer
     *
     * @param  {string} key - The node's key.
     * @return {NodeDisplayData | undefined} A copy of the desired node's attribute or undefined if not found
     */
  }, {
    key: "getNodeDisplayData",
    value: function(i) {
      var r = this.nodeDataCache[i];
      return r ? Object.assign({}, r) : void 0;
    }
    /**
     * Method used to get all the sigma edge attributes.
     * It's useful for example to get values that are set by the edgeReducer.
     *
     * @param  {string} key - The edge's key.
     * @return {EdgeDisplayData | undefined} A copy of the desired edge's attribute or undefined if not found
     */
  }, {
    key: "getEdgeDisplayData",
    value: function(i) {
      var r = this.edgeDataCache[i];
      return r ? Object.assign({}, r) : void 0;
    }
    /**
     * Method used to get the set of currently displayed node labels.
     *
     * @return {Set<string>} A set of node keys whose label is displayed.
     */
  }, {
    key: "getNodeDisplayedLabels",
    value: function() {
      return new Set(this.displayedNodeLabels);
    }
    /**
     * Method used to get the set of currently displayed edge labels.
     *
     * @return {Set<string>} A set of edge keys whose label is displayed.
     */
  }, {
    key: "getEdgeDisplayedLabels",
    value: function() {
      return new Set(this.displayedEdgeLabels);
    }
    /**
     * Method returning a copy of the settings collection.
     *
     * @return {Settings} A copy of the settings collection.
     */
  }, {
    key: "getSettings",
    value: function() {
      return H({}, this.settings);
    }
    /**
     * Method returning the current value for a given setting key.
     *
     * @param  {string} key - The setting key to get.
     * @return {any} The value attached to this setting key or undefined if not found
     */
  }, {
    key: "getSetting",
    value: function(i) {
      return this.settings[i];
    }
    /**
     * Method setting the value of a given setting key. Note that this will schedule
     * a new render next frame.
     *
     * @param  {string} key - The setting key to set.
     * @param  {any}    value - The value to set.
     * @return {Sigma}
     */
  }, {
    key: "setSetting",
    value: function(i, r) {
      var n = H({}, this.settings);
      return this.settings[i] = r, $t(this.settings), this.handleSettingsUpdate(n), this.scheduleRefresh(), this;
    }
    /**
     * Method updating the value of a given setting key using the provided function.
     * Note that this will schedule a new render next frame.
     *
     * @param  {string}   key     - The setting key to set.
     * @param  {function} updater - The update function.
     * @return {Sigma}
     */
  }, {
    key: "updateSetting",
    value: function(i, r) {
      return this.setSetting(i, r(this.settings[i])), this;
    }
    /**
     * Method setting multiple settings at once.
     *
     * @param  {Partial<Settings>} settings - The settings to set.
     * @return {Sigma}
     */
  }, {
    key: "setSettings",
    value: function(i) {
      var r = H({}, this.settings);
      return this.settings = H(H({}, this.settings), i), $t(this.settings), this.handleSettingsUpdate(r), this.scheduleRefresh(), this;
    }
    /**
     * Method used to resize the renderer.
     *
     * @param  {boolean} force - If true, then resize is processed even if size is unchanged (optional).
     * @return {Sigma}
     */
  }, {
    key: "resize",
    value: function(i) {
      var r = this.width, n = this.height;
      if (this.width = this.container.offsetWidth, this.height = this.container.offsetHeight, this.pixelRatio = Fi(), this.width === 0)
        if (this.settings.allowInvalidContainer) this.width = 1;
        else throw new Error("Sigma: Container has no width. You can set the allowInvalidContainer setting to true to stop seeing this error.");
      if (this.height === 0)
        if (this.settings.allowInvalidContainer) this.height = 1;
        else throw new Error("Sigma: Container has no height. You can set the allowInvalidContainer setting to true to stop seeing this error.");
      if (!i && r === this.width && n === this.height) return this;
      for (var o in this.elements) {
        var a = this.elements[o];
        a.style.width = this.width + "px", a.style.height = this.height + "px";
      }
      for (var h in this.canvasContexts)
        this.elements[h].setAttribute("width", this.width * this.pixelRatio + "px"), this.elements[h].setAttribute("height", this.height * this.pixelRatio + "px"), this.pixelRatio !== 1 && this.canvasContexts[h].scale(this.pixelRatio, this.pixelRatio);
      for (var l in this.webGLContexts) {
        this.elements[l].setAttribute("width", this.width * this.pixelRatio + "px"), this.elements[l].setAttribute("height", this.height * this.pixelRatio + "px");
        var c = this.webGLContexts[l];
        if (c.viewport(0, 0, this.width * this.pixelRatio, this.height * this.pixelRatio), this.pickingLayers.has(l)) {
          var d = this.textures[l];
          d && c.deleteTexture(d);
        }
      }
      return this.emit("resize"), this;
    }
    /**
     * Method used to clear all the canvases.
     *
     * @return {Sigma}
     */
  }, {
    key: "clear",
    value: function() {
      return this.emit("beforeClear"), this.webGLContexts.nodes.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null), this.webGLContexts.nodes.clear(WebGLRenderingContext.COLOR_BUFFER_BIT), this.webGLContexts.edges.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null), this.webGLContexts.edges.clear(WebGLRenderingContext.COLOR_BUFFER_BIT), this.webGLContexts.hoverNodes.clear(WebGLRenderingContext.COLOR_BUFFER_BIT), this.canvasContexts.labels.clearRect(0, 0, this.width, this.height), this.canvasContexts.hovers.clearRect(0, 0, this.width, this.height), this.canvasContexts.edgeLabels.clearRect(0, 0, this.width, this.height), this.emit("afterClear"), this;
    }
    /**
     * Method used to refresh, i.e. force the renderer to reprocess graph
     * data and render, but keep the state.
     * - if a partialGraph is provided, we only reprocess those nodes & edges.
     * - if schedule is TRUE, we schedule a render instead of sync render
     * - if skipIndexation is TRUE, then labelGrid & program indexation are skipped (can be used if you haven't modify x, y, zIndex & size)
     *
     * @return {Sigma}
     */
  }, {
    key: "refresh",
    value: function(i) {
      var r = this, n = (i == null ? void 0 : i.skipIndexation) !== void 0 ? i == null ? void 0 : i.skipIndexation : !1, o = (i == null ? void 0 : i.schedule) !== void 0 ? i.schedule : !1, a = !i || !i.partialGraph;
      if (a)
        this.clearEdgeIndices(), this.clearNodeIndices(), this.graph.forEachNode(function(g) {
          return r.addNode(g);
        }), this.graph.forEachEdge(function(g) {
          return r.addEdge(g);
        });
      else {
        for (var h, l, c = ((h = i.partialGraph) === null || h === void 0 ? void 0 : h.nodes) || [], d = 0, f = (c == null ? void 0 : c.length) || 0; d < f; d++) {
          var w = c[d];
          if (this.updateNode(w), n) {
            var v = this.nodeProgramIndex[w];
            if (v === void 0) throw new Error('Sigma: node "'.concat(w, `" can't be repaint`));
            this.addNodeToProgram(w, this.nodeIndices[w], v);
          }
        }
        for (var u = (i == null || (l = i.partialGraph) === null || l === void 0 ? void 0 : l.edges) || [], p = 0, E = u.length; p < E; p++) {
          var m = u[p];
          if (this.updateEdge(m), n) {
            var x = this.edgeProgramIndex[m];
            if (x === void 0) throw new Error('Sigma: edge "'.concat(m, `" can't be repaint`));
            this.addEdgeToProgram(m, this.edgeIndices[m], x);
          }
        }
      }
      return (a || !n) && (this.needToProcess = !0), o ? this.scheduleRender() : this.render(), this;
    }
    /**
     * Method used to schedule a render at the next available frame.
     * This method can be safely called on a same frame because it basically
     * debounces refresh to the next frame.
     *
     * @return {Sigma}
     */
  }, {
    key: "scheduleRender",
    value: function() {
      var i = this;
      return this.renderFrame || (this.renderFrame = requestAnimationFrame(function() {
        i.render();
      })), this;
    }
    /**
     * Method used to schedule a refresh (i.e. fully reprocess graph data and render)
     * at the next available frame.
     * This method can be safely called on a same frame because it basically
     * debounces refresh to the next frame.
     *
     * @return {Sigma}
     */
  }, {
    key: "scheduleRefresh",
    value: function(i) {
      return this.refresh(H(H({}, i), {}, {
        schedule: !0
      }));
    }
    /**
     * Method used to (un)zoom, while preserving the position of a viewport point.
     * Used for instance to zoom "on the mouse cursor".
     *
     * @param viewportTarget
     * @param newRatio
     * @return {CameraState}
     */
  }, {
    key: "getViewportZoomedState",
    value: function(i, r) {
      var n = this.camera.getState(), o = n.ratio, a = n.angle, h = n.x, l = n.y, c = this.settings, d = c.minCameraRatio, f = c.maxCameraRatio;
      typeof f == "number" && (r = Math.min(r, f)), typeof d == "number" && (r = Math.max(r, d));
      var w = r / o, v = {
        x: this.width / 2,
        y: this.height / 2
      }, u = this.viewportToFramedGraph(i), p = this.viewportToFramedGraph(v);
      return {
        angle: a,
        x: (u.x - p.x) * (1 - w) + h,
        y: (u.y - p.y) * (1 - w) + l,
        ratio: r
      };
    }
    /**
     * Method returning the abstract rectangle containing the graph according
     * to the camera's state.
     *
     * @return {object} - The view's rectangle.
     */
  }, {
    key: "viewRectangle",
    value: function() {
      var i = this.viewportToFramedGraph({
        x: 0,
        y: 0
      }), r = this.viewportToFramedGraph({
        x: this.width,
        y: 0
      }), n = this.viewportToFramedGraph({
        x: 0,
        y: this.height
      });
      return {
        x1: i.x,
        y1: i.y,
        x2: r.x,
        y2: r.y,
        height: r.y - n.y
      };
    }
    /**
     * Method returning the coordinates of a point from the framed graph system to the viewport system. It allows
     * overriding anything that is used to get the translation matrix, or even the matrix itself.
     *
     * Be careful if overriding dimensions, padding or cameraState, as the computation of the matrix is not the lightest
     * of computations.
     */
  }, {
    key: "framedGraphToViewport",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = !!r.cameraState || !!r.viewportDimensions || !!r.graphDimensions, o = r.matrix ? r.matrix : n ? rt(r.cameraState || this.camera.getState(), r.viewportDimensions || this.getDimensions(), r.graphDimensions || this.getGraphDimensions(), r.padding || this.getStagePadding()) : this.matrix, a = ii(o, i);
      return {
        x: (1 + a.x) * this.width / 2,
        y: (1 - a.y) * this.height / 2
      };
    }
    /**
     * Method returning the coordinates of a point from the viewport system to the framed graph system. It allows
     * overriding anything that is used to get the translation matrix, or even the matrix itself.
     *
     * Be careful if overriding dimensions, padding or cameraState, as the computation of the matrix is not the lightest
     * of computations.
     */
  }, {
    key: "viewportToFramedGraph",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = !!r.cameraState || !!r.viewportDimensions || !r.graphDimensions, o = r.matrix ? r.matrix : n ? rt(r.cameraState || this.camera.getState(), r.viewportDimensions || this.getDimensions(), r.graphDimensions || this.getGraphDimensions(), r.padding || this.getStagePadding(), !0) : this.invMatrix, a = ii(o, {
        x: i.x / this.width * 2 - 1,
        y: 1 - i.y / this.height * 2
      });
      return isNaN(a.x) && (a.x = 0), isNaN(a.y) && (a.y = 0), a;
    }
    /**
     * Method used to translate a point's coordinates from the viewport system (pixel distance from the top-left of the
     * stage) to the graph system (the reference system of data as they are in the given graph instance).
     *
     * This method accepts an optional camera which can be useful if you need to translate coordinates
     * based on a different view than the one being currently being displayed on screen.
     *
     * @param {Coordinates}                  viewportPoint
     * @param {CoordinateConversionOverride} override
     */
  }, {
    key: "viewportToGraph",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.normalizationFunction.inverse(this.viewportToFramedGraph(i, r));
    }
    /**
     * Method used to translate a point's coordinates from the graph system (the reference system of data as they are in
     * the given graph instance) to the viewport system (pixel distance from the top-left of the stage).
     *
     * This method accepts an optional camera which can be useful if you need to translate coordinates
     * based on a different view than the one being currently being displayed on screen.
     *
     * @param {Coordinates}                  graphPoint
     * @param {CoordinateConversionOverride} override
     */
  }, {
    key: "graphToViewport",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.framedGraphToViewport(this.normalizationFunction(i), r);
    }
    /**
     * Method returning the distance multiplier between the graph system and the
     * viewport system.
     */
  }, {
    key: "getGraphToViewportRatio",
    value: function() {
      var i = {
        x: 0,
        y: 0
      }, r = {
        x: 1,
        y: 1
      }, n = Math.sqrt(Math.pow(i.x - r.x, 2) + Math.pow(i.y - r.y, 2)), o = this.graphToViewport(i), a = this.graphToViewport(r), h = Math.sqrt(Math.pow(o.x - a.x, 2) + Math.pow(o.y - a.y, 2));
      return h / n;
    }
    /**
     * Method returning the graph's bounding box.
     *
     * @return {{ x: Extent, y: Extent }}
     */
  }, {
    key: "getBBox",
    value: function() {
      return this.nodeExtent;
    }
    /**
     * Method returning the graph's custom bounding box, if any.
     *
     * @return {{ x: Extent, y: Extent } | null}
     */
  }, {
    key: "getCustomBBox",
    value: function() {
      return this.customBBox;
    }
    /**
     * Method used to override the graph's bounding box with a custom one. Give `null` as the argument to stop overriding.
     *
     * @return {Sigma}
     */
  }, {
    key: "setCustomBBox",
    value: function(i) {
      return this.customBBox = i, this.scheduleRender(), this;
    }
    /**
     * Method used to shut the container & release event listeners.
     *
     * @return {undefined}
     */
  }, {
    key: "kill",
    value: function() {
      this.emit("kill"), this.removeAllListeners(), this.unbindCameraHandlers(), window.removeEventListener("resize", this.activeListeners.handleResize), this.mouseCaptor.kill(), this.touchCaptor.kill(), this.unbindGraphHandlers(), this.clearIndices(), this.clearState(), this.nodeDataCache = {}, this.edgeDataCache = {}, this.highlightedNodes.clear(), this.renderFrame && (cancelAnimationFrame(this.renderFrame), this.renderFrame = null), this.renderHighlightedNodesFrame && (cancelAnimationFrame(this.renderHighlightedNodesFrame), this.renderHighlightedNodesFrame = null);
      for (var i = this.container; i.firstChild; ) i.removeChild(i.firstChild);
      for (var r in this.nodePrograms)
        this.nodePrograms[r].kill();
      for (var n in this.nodeHoverPrograms)
        this.nodeHoverPrograms[n].kill();
      for (var o in this.edgePrograms)
        this.edgePrograms[o].kill();
      this.nodePrograms = {}, this.nodeHoverPrograms = {}, this.edgePrograms = {};
      for (var a in this.elements)
        this.killLayer(a);
      this.canvasContexts = {}, this.webGLContexts = {}, this.elements = {};
    }
    /**
     * Method used to scale the given size according to the camera's ratio, i.e.
     * zooming state.
     *
     * @param  {number?} size -        The size to scale (node size, edge thickness etc.).
     * @param  {number?} cameraRatio - A camera ratio (defaults to the actual camera ratio).
     * @return {number}              - The scaled size.
     */
  }, {
    key: "scaleSize",
    value: function() {
      var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.camera.ratio;
      return i / this.settings.zoomToSizeRatioFunction(r) * (this.getSetting("itemSizesReference") === "positions" ? r * this.graphToViewportRatio : 1);
    }
    /**
     * Method that returns the collection of all used canvases.
     * At the moment, the instantiated canvases are the following, and in the
     * following order in the DOM:
     * - `edges`
     * - `nodes`
     * - `edgeLabels`
     * - `labels`
     * - `hovers`
     * - `hoverNodes`
     * - `mouse`
     *
     * @return {PlainObject<HTMLCanvasElement>} - The collection of canvases.
     */
  }, {
    key: "getCanvases",
    value: function() {
      var i = {};
      for (var r in this.elements) this.elements[r] instanceof HTMLCanvasElement && (i[r] = this.elements[r]);
      return i;
    }
  }]);
}(pi), ra = ia, ot = {}, Vi;
function na() {
  if (Vi) return ot;
  Vi = 1;
  function s(i) {
    return typeof i != "number" || isNaN(i) ? 1 : i;
  }
  function e(i, r) {
    var n = {}, o = function(l) {
      return typeof l == "undefined" ? r : l;
    };
    typeof r == "function" && (o = r);
    var a = function(l) {
      return o(l[i]);
    }, h = function() {
      return o(void 0);
    };
    return typeof i == "string" ? (n.fromAttributes = a, n.fromGraph = function(l, c) {
      return a(l.getNodeAttributes(c));
    }, n.fromEntry = function(l, c) {
      return a(c);
    }) : typeof i == "function" ? (n.fromAttributes = function() {
      throw new Error(
        "graphology-utils/getters/createNodeValueGetter: irrelevant usage."
      );
    }, n.fromGraph = function(l, c) {
      return o(
        i(c, l.getNodeAttributes(c))
      );
    }, n.fromEntry = function(l, c) {
      return o(i(l, c));
    }) : (n.fromAttributes = h, n.fromGraph = h, n.fromEntry = h), n;
  }
  function t(i, r) {
    var n = {}, o = function(l) {
      return typeof l == "undefined" ? r : l;
    };
    typeof r == "function" && (o = r);
    var a = function(l) {
      return o(l[i]);
    }, h = function() {
      return o(void 0);
    };
    return typeof i == "string" ? (n.fromAttributes = a, n.fromGraph = function(l, c) {
      return a(l.getEdgeAttributes(c));
    }, n.fromEntry = function(l, c) {
      return a(c);
    }, n.fromPartialEntry = n.fromEntry, n.fromMinimalEntry = n.fromEntry) : typeof i == "function" ? (n.fromAttributes = function() {
      throw new Error(
        "graphology-utils/getters/createEdgeValueGetter: irrelevant usage."
      );
    }, n.fromGraph = function(l, c) {
      var d = l.extremities(c);
      return o(
        i(
          c,
          l.getEdgeAttributes(c),
          d[0],
          d[1],
          l.getNodeAttributes(d[0]),
          l.getNodeAttributes(d[1]),
          l.isUndirected(c)
        )
      );
    }, n.fromEntry = function(l, c, d, f, w, v, u) {
      return o(i(l, c, d, f, w, v, u));
    }, n.fromPartialEntry = function(l, c, d, f) {
      return o(i(l, c, d, f));
    }, n.fromMinimalEntry = function(l, c) {
      return o(i(l, c));
    }) : (n.fromAttributes = h, n.fromGraph = h, n.fromEntry = h, n.fromMinimalEntry = h), n;
  }
  return ot.createNodeValueGetter = e, ot.createEdgeValueGetter = t, ot.createEdgeWeightGetter = function(i) {
    return t(i, s);
  }, ot;
}
var Mt, Yi;
function sa() {
  if (Yi) return Mt;
  Yi = 1;
  var s = 0, e = 1, t = 2, i = 3, r = 4, n = 5, o = 6, a = 7, h = 8, l = 9, c = 0, d = 1, f = 2, w = 0, v = 1, u = 2, p = 3, E = 4, m = 5, x = 6, g = 7, y = 8, b = 3, S = 10, k = 3, C = 9, A = 10;
  return Mt = function(N, _, z) {
    var W, L, T, B, $, j, K, X, M, ie, Q = _.length, re = z.length, ne = N.adjustSizes, oe = N.barnesHutTheta * N.barnesHutTheta, te, Y, Z, J, F, I, U, R = [];
    for (T = 0; T < Q; T += S)
      _[T + r] = _[T + t], _[T + n] = _[T + i], _[T + t] = 0, _[T + i] = 0;
    if (N.outboundAttractionDistribution) {
      for (te = 0, T = 0; T < Q; T += S)
        te += _[T + o];
      te /= Q / S;
    }
    if (N.barnesHutOptimize) {
      var ae = 1 / 0, fe = -1 / 0, pe = 1 / 0, Ee = -1 / 0, se, me, xe;
      for (T = 0; T < Q; T += S)
        ae = Math.min(ae, _[T + s]), fe = Math.max(fe, _[T + s]), pe = Math.min(pe, _[T + e]), Ee = Math.max(Ee, _[T + e]);
      var Se = fe - ae, ye = Ee - pe;
      for (Se > ye ? (pe -= (Se - ye) / 2, Ee = pe + Se) : (ae -= (ye - Se) / 2, fe = ae + ye), R[0 + w] = -1, R[0 + v] = (ae + fe) / 2, R[0 + u] = (pe + Ee) / 2, R[0 + p] = Math.max(fe - ae, Ee - pe), R[0 + E] = -1, R[0 + m] = -1, R[0 + x] = 0, R[0 + g] = 0, R[0 + y] = 0, W = 1, T = 0; T < Q; T += S)
        for (L = 0, xe = b; ; )
          if (R[L + m] >= 0) {
            _[T + s] < R[L + v] ? _[T + e] < R[L + u] ? se = R[L + m] : se = R[L + m] + C : _[T + e] < R[L + u] ? se = R[L + m] + C * 2 : se = R[L + m] + C * 3, R[L + g] = (R[L + g] * R[L + x] + _[T + s] * _[T + o]) / (R[L + x] + _[T + o]), R[L + y] = (R[L + y] * R[L + x] + _[T + e] * _[T + o]) / (R[L + x] + _[T + o]), R[L + x] += _[T + o], L = se;
            continue;
          } else if (R[L + w] < 0) {
            R[L + w] = T;
            break;
          } else {
            if (R[L + m] = W * C, X = R[L + p] / 2, M = R[L + m], R[M + w] = -1, R[M + v] = R[L + v] - X, R[M + u] = R[L + u] - X, R[M + p] = X, R[M + E] = M + C, R[M + m] = -1, R[M + x] = 0, R[M + g] = 0, R[M + y] = 0, M += C, R[M + w] = -1, R[M + v] = R[L + v] - X, R[M + u] = R[L + u] + X, R[M + p] = X, R[M + E] = M + C, R[M + m] = -1, R[M + x] = 0, R[M + g] = 0, R[M + y] = 0, M += C, R[M + w] = -1, R[M + v] = R[L + v] + X, R[M + u] = R[L + u] - X, R[M + p] = X, R[M + E] = M + C, R[M + m] = -1, R[M + x] = 0, R[M + g] = 0, R[M + y] = 0, M += C, R[M + w] = -1, R[M + v] = R[L + v] + X, R[M + u] = R[L + u] + X, R[M + p] = X, R[M + E] = R[L + E], R[M + m] = -1, R[M + x] = 0, R[M + g] = 0, R[M + y] = 0, W += 4, _[R[L + w] + s] < R[L + v] ? _[R[L + w] + e] < R[L + u] ? se = R[L + m] : se = R[L + m] + C : _[R[L + w] + e] < R[L + u] ? se = R[L + m] + C * 2 : se = R[L + m] + C * 3, R[L + x] = _[R[L + w] + o], R[L + g] = _[R[L + w] + s], R[L + y] = _[R[L + w] + e], R[se + w] = R[L + w], R[L + w] = -1, _[T + s] < R[L + v] ? _[T + e] < R[L + u] ? me = R[L + m] : me = R[L + m] + C : _[T + e] < R[L + u] ? me = R[L + m] + C * 2 : me = R[L + m] + C * 3, se === me)
              if (xe--) {
                L = se;
                continue;
              } else {
                xe = b;
                break;
              }
            R[me + w] = T;
            break;
          }
    }
    if (N.barnesHutOptimize)
      for (Y = N.scalingRatio, T = 0; T < Q; T += S)
        for (L = 0; ; )
          if (R[L + m] >= 0)
            if (I = Math.pow(
              _[T + s] - R[L + g],
              2
            ) + Math.pow(
              _[T + e] - R[L + y],
              2
            ), ie = R[L + p], 4 * ie * ie / I < oe) {
              if (Z = _[T + s] - R[L + g], J = _[T + e] - R[L + y], ne === !0 ? I > 0 ? (U = Y * _[T + o] * R[L + x] / I, _[T + t] += Z * U, _[T + i] += J * U) : I < 0 && (U = -Y * _[T + o] * R[L + x] / Math.sqrt(I), _[T + t] += Z * U, _[T + i] += J * U) : I > 0 && (U = Y * _[T + o] * R[L + x] / I, _[T + t] += Z * U, _[T + i] += J * U), L = R[L + E], L < 0) break;
              continue;
            } else {
              L = R[L + m];
              continue;
            }
          else {
            if (j = R[L + w], j >= 0 && j !== T && (Z = _[T + s] - _[j + s], J = _[T + e] - _[j + e], I = Z * Z + J * J, ne === !0 ? I > 0 ? (U = Y * _[T + o] * _[j + o] / I, _[T + t] += Z * U, _[T + i] += J * U) : I < 0 && (U = -Y * _[T + o] * _[j + o] / Math.sqrt(I), _[T + t] += Z * U, _[T + i] += J * U) : I > 0 && (U = Y * _[T + o] * _[j + o] / I, _[T + t] += Z * U, _[T + i] += J * U)), L = R[L + E], L < 0) break;
            continue;
          }
    else
      for (Y = N.scalingRatio, B = 0; B < Q; B += S)
        for ($ = 0; $ < B; $ += S)
          Z = _[B + s] - _[$ + s], J = _[B + e] - _[$ + e], ne === !0 ? (I = Math.sqrt(Z * Z + J * J) - _[B + h] - _[$ + h], I > 0 ? (U = Y * _[B + o] * _[$ + o] / I / I, _[B + t] += Z * U, _[B + i] += J * U, _[$ + t] -= Z * U, _[$ + i] -= J * U) : I < 0 && (U = 100 * Y * _[B + o] * _[$ + o], _[B + t] += Z * U, _[B + i] += J * U, _[$ + t] -= Z * U, _[$ + i] -= J * U)) : (I = Math.sqrt(Z * Z + J * J), I > 0 && (U = Y * _[B + o] * _[$ + o] / I / I, _[B + t] += Z * U, _[B + i] += J * U, _[$ + t] -= Z * U, _[$ + i] -= J * U));
    for (M = N.gravity / N.scalingRatio, Y = N.scalingRatio, T = 0; T < Q; T += S)
      U = 0, Z = _[T + s], J = _[T + e], I = Math.sqrt(Math.pow(Z, 2) + Math.pow(J, 2)), N.strongGravityMode ? I > 0 && (U = Y * _[T + o] * M) : I > 0 && (U = Y * _[T + o] * M / I), _[T + t] -= Z * U, _[T + i] -= J * U;
    for (Y = 1 * (N.outboundAttractionDistribution ? te : 1), K = 0; K < re; K += k)
      B = z[K + c], $ = z[K + d], X = z[K + f], F = Math.pow(X, N.edgeWeightInfluence), Z = _[B + s] - _[$ + s], J = _[B + e] - _[$ + e], ne === !0 ? (I = Math.sqrt(Z * Z + J * J) - _[B + h] - _[$ + h], N.linLogMode ? N.outboundAttractionDistribution ? I > 0 && (U = -Y * F * Math.log(1 + I) / I / _[B + o]) : I > 0 && (U = -Y * F * Math.log(1 + I) / I) : N.outboundAttractionDistribution ? I > 0 && (U = -Y * F / _[B + o]) : I > 0 && (U = -Y * F)) : (I = Math.sqrt(Math.pow(Z, 2) + Math.pow(J, 2)), N.linLogMode ? N.outboundAttractionDistribution ? I > 0 && (U = -Y * F * Math.log(1 + I) / I / _[B + o]) : I > 0 && (U = -Y * F * Math.log(1 + I) / I) : N.outboundAttractionDistribution ? (I = 1, U = -Y * F / _[B + o]) : (I = 1, U = -Y * F)), I > 0 && (_[B + t] += Z * U, _[B + i] += J * U, _[$ + t] -= Z * U, _[$ + i] -= J * U);
    var Re, He, Le, Ge, We, dt;
    if (ne === !0)
      for (T = 0; T < Q; T += S)
        _[T + l] !== 1 && (Re = Math.sqrt(
          Math.pow(_[T + t], 2) + Math.pow(_[T + i], 2)
        ), Re > A && (_[T + t] = _[T + t] * A / Re, _[T + i] = _[T + i] * A / Re), He = _[T + o] * Math.sqrt(
          (_[T + r] - _[T + t]) * (_[T + r] - _[T + t]) + (_[T + n] - _[T + i]) * (_[T + n] - _[T + i])
        ), Le = Math.sqrt(
          (_[T + r] + _[T + t]) * (_[T + r] + _[T + t]) + (_[T + n] + _[T + i]) * (_[T + n] + _[T + i])
        ) / 2, Ge = 0.1 * Math.log(1 + Le) / (1 + Math.sqrt(He)), We = _[T + s] + _[T + t] * (Ge / N.slowDown), _[T + s] = We, dt = _[T + e] + _[T + i] * (Ge / N.slowDown), _[T + e] = dt);
    else
      for (T = 0; T < Q; T += S)
        _[T + l] !== 1 && (He = _[T + o] * Math.sqrt(
          (_[T + r] - _[T + t]) * (_[T + r] - _[T + t]) + (_[T + n] - _[T + i]) * (_[T + n] - _[T + i])
        ), Le = Math.sqrt(
          (_[T + r] + _[T + t]) * (_[T + r] + _[T + t]) + (_[T + n] + _[T + i]) * (_[T + n] + _[T + i])
        ) / 2, Ge = _[T + a] * Math.log(1 + Le) / (1 + Math.sqrt(He)), _[T + a] = Math.min(
          1,
          Math.sqrt(
            Ge * (Math.pow(_[T + t], 2) + Math.pow(_[T + i], 2)) / (1 + Math.sqrt(He))
          )
        ), We = _[T + s] + _[T + t] * (Ge / N.slowDown), _[T + s] = We, dt = _[T + e] + _[T + i] * (Ge / N.slowDown), _[T + e] = dt);
    return {};
  }, Mt;
}
var Ne = {}, Xi;
function oa() {
  if (Xi) return Ne;
  Xi = 1;
  var s = 10, e = 3;
  return Ne.assign = function(t) {
    t = t || {};
    var i = Array.prototype.slice.call(arguments).slice(1), r, n, o;
    for (r = 0, o = i.length; r < o; r++)
      if (i[r])
        for (n in i[r]) t[n] = i[r][n];
    return t;
  }, Ne.validateSettings = function(t) {
    return "linLogMode" in t && typeof t.linLogMode != "boolean" ? { message: "the `linLogMode` setting should be a boolean." } : "outboundAttractionDistribution" in t && typeof t.outboundAttractionDistribution != "boolean" ? {
      message: "the `outboundAttractionDistribution` setting should be a boolean."
    } : "adjustSizes" in t && typeof t.adjustSizes != "boolean" ? { message: "the `adjustSizes` setting should be a boolean." } : "edgeWeightInfluence" in t && typeof t.edgeWeightInfluence != "number" ? {
      message: "the `edgeWeightInfluence` setting should be a number."
    } : "scalingRatio" in t && !(typeof t.scalingRatio == "number" && t.scalingRatio >= 0) ? { message: "the `scalingRatio` setting should be a number >= 0." } : "strongGravityMode" in t && typeof t.strongGravityMode != "boolean" ? { message: "the `strongGravityMode` setting should be a boolean." } : "gravity" in t && !(typeof t.gravity == "number" && t.gravity >= 0) ? { message: "the `gravity` setting should be a number >= 0." } : "slowDown" in t && !(typeof t.slowDown == "number" || t.slowDown >= 0) ? { message: "the `slowDown` setting should be a number >= 0." } : "barnesHutOptimize" in t && typeof t.barnesHutOptimize != "boolean" ? { message: "the `barnesHutOptimize` setting should be a boolean." } : "barnesHutTheta" in t && !(typeof t.barnesHutTheta == "number" && t.barnesHutTheta >= 0) ? { message: "the `barnesHutTheta` setting should be a number >= 0." } : null;
  }, Ne.graphToByteArrays = function(t, i) {
    var r = t.order, n = t.size, o = {}, a, h = new Float32Array(r * s), l = new Float32Array(n * e);
    return a = 0, t.forEachNode(function(c, d) {
      o[c] = a, h[a] = d.x, h[a + 1] = d.y, h[a + 2] = 0, h[a + 3] = 0, h[a + 4] = 0, h[a + 5] = 0, h[a + 6] = 1, h[a + 7] = 1, h[a + 8] = d.size || 1, h[a + 9] = d.fixed ? 1 : 0, a += s;
    }), a = 0, t.forEachEdge(function(c, d, f, w, v, u, p) {
      var E = o[f], m = o[w], x = i(c, d, f, w, v, u, p);
      h[E + 6] += x, h[m + 6] += x, l[a] = E, l[a + 1] = m, l[a + 2] = x, a += e;
    }), {
      nodes: h,
      edges: l
    };
  }, Ne.assignLayoutChanges = function(t, i, r) {
    var n = 0;
    t.updateEachNodeAttributes(function(o, a) {
      return a.x = i[n], a.y = i[n + 1], n += s, r ? r(o, a) : a;
    });
  }, Ne.readGraphPositions = function(t, i) {
    var r = 0;
    t.forEachNode(function(n, o) {
      i[r] = o.x, i[r + 1] = o.y, r += s;
    });
  }, Ne.collectLayoutChanges = function(t, i, r) {
    for (var n = t.nodes(), o = {}, a = 0, h = 0, l = i.length; a < l; a += s) {
      if (r) {
        var c = Object.assign({}, t.getNodeAttributes(n[h]));
        c.x = i[a], c.y = i[a + 1], c = r(n[h], c), o[n[h]] = {
          x: c.x,
          y: c.y
        };
      } else
        o[n[h]] = {
          x: i[a],
          y: i[a + 1]
        };
      h++;
    }
    return o;
  }, Ne.createWorker = function(i) {
    var r = window.URL || window.webkitURL, n = i.toString(), o = r.createObjectURL(
      new Blob(["(" + n + ").call(this);"], { type: "text/javascript" })
    ), a = new Worker(o);
    return r.revokeObjectURL(o), a;
  }, Ne;
}
var Ft, Zi;
function aa() {
  return Zi || (Zi = 1, Ft = {
    linLogMode: !1,
    outboundAttractionDistribution: !1,
    adjustSizes: !1,
    edgeWeightInfluence: 1,
    scalingRatio: 1,
    strongGravityMode: !1,
    gravity: 1,
    slowDown: 1,
    barnesHutOptimize: !1,
    barnesHutTheta: 0.5
  }), Ft;
}
var Ot, Ki;
function ha() {
  if (Ki) return Ot;
  Ki = 1;
  var s = ln(), e = na().createEdgeWeightGetter, t = sa(), i = oa(), r = aa();
  function n(h, l, c) {
    if (!s(l))
      throw new Error(
        "graphology-layout-forceatlas2: the given graph is not a valid graphology instance."
      );
    typeof c == "number" && (c = { iterations: c });
    var d = c.iterations;
    if (typeof d != "number")
      throw new Error(
        "graphology-layout-forceatlas2: invalid number of iterations."
      );
    if (d <= 0)
      throw new Error(
        "graphology-layout-forceatlas2: you should provide a positive number of iterations."
      );
    var f = e(
      "getEdgeWeight" in c ? c.getEdgeWeight : "weight"
    ).fromEntry, w = typeof c.outputReducer == "function" ? c.outputReducer : null, v = i.assign({}, r, c.settings), u = i.validateSettings(v);
    if (u)
      throw new Error(
        "graphology-layout-forceatlas2: " + u.message
      );
    var p = i.graphToByteArrays(l, f), E;
    for (E = 0; E < d; E++)
      t(v, p.nodes, p.edges);
    if (h) {
      i.assignLayoutChanges(l, p.nodes, w);
      return;
    }
    return i.collectLayoutChanges(l, p.nodes);
  }
  function o(h) {
    var l = typeof h == "number" ? h : h.order;
    return {
      barnesHutOptimize: l > 2e3,
      strongGravityMode: !0,
      gravity: 0.05,
      scalingRatio: 10,
      slowDown: 1 + Math.log(l)
    };
  }
  var a = n.bind(null, !1);
  return a.assign = n.bind(null, !0), a.inferSettings = o, Ot = a, Ot;
}
var la = ha();
const Qi = /* @__PURE__ */ hi(la);
var Bt, Ji;
function ca() {
  if (Ji) return Bt;
  Ji = 1;
  function s(t, i) {
    return t + Math.floor(Math.random() * (i - t + 1));
  }
  function e(t) {
    t || (t = s(0, Math.pow(2, 31) - 1)), this.seed = t % 2147483647, this.seed <= 0 && (this.seed += 2147483646);
  }
  return e.prototype.next = function() {
    return this.seed = this.seed * 16807 % 2147483647, this.seed;
  }, e.prototype.nextFloat = function() {
    return (this.next() - 1) / 2147483646;
  }, Bt = e, Bt;
}
var De = {}, er;
function pn() {
  if (er) return De;
  er = 1;
  var s = {
    // D65 standard referent
    Xn: 0.95047,
    Yn: 1,
    Zn: 1.08883,
    t0: 0.137931034,
    // 4 / 29
    t1: 0.206896552,
    // 6 / 29
    t2: 0.12841855,
    // 3 * t1 * t1
    t3: 8856452e-9
    // t1 * t1 * t1
  };
  function e(u) {
    return Math.round(
      255 * (u <= 304e-5 ? 12.92 * u : 1.055 * Math.pow(u, 1 / 2.4) - 0.055)
    );
  }
  function t(u) {
    return (u /= 255) <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4);
  }
  function i(u) {
    return u > s.t3 ? Math.pow(u, 1 / 3) : u / s.t2 + s.t0;
  }
  function r(u) {
    var p = u[0], E = u[1], m = u[2];
    p = t(p), E = t(E), m = t(m);
    var x = i((0.4124564 * p + 0.3575761 * E + 0.1804375 * m) / s.Xn), g = i((0.2126729 * p + 0.7151522 * E + 0.072175 * m) / s.Yn), y = i((0.0193339 * p + 0.119192 * E + 0.9503041 * m) / s.Zn);
    return [x, g, y];
  }
  function n(u) {
    return u > s.t1 ? u * u * u : s.t2 * (u - s.t0);
  }
  function o(u) {
    var p = u[0], E = u[1], m = u[2], x = (p + 16) / 116, g = isNaN(E) ? x : x + E / 500, y = isNaN(m) ? x : x - m / 200;
    x = s.Yn * n(x), g = s.Xn * n(g), y = s.Zn * n(y);
    var b = e(3.2404542 * g - 1.5371385 * x - 0.4985314 * y), S = e(-0.969266 * g + 1.8760108 * x + 0.041556 * y);
    return m = e(0.0556434 * g - 0.2040259 * x + 1.0572252 * y), [b, S, m];
  }
  function a(u) {
    var p = r(u), E = p[0], m = p[1], x = p[2], g = 116 * m - 16;
    return [g < 0 ? 0 : g, 500 * (E - m), 200 * (m - x)];
  }
  function h(u) {
    var p = u[0], E = u[1], m = u[2];
    return p >= 0 && p <= 255 && E >= 0 && E <= 255 && m >= 0 && m <= 255;
  }
  function l(u) {
    return ("0" + u.toString(16)).slice(-2);
  }
  function c(u) {
    var p = o(u);
    return "#" + l(p[0]) + l(p[1]) + l(p[2]);
  }
  var d = 180 / Math.PI;
  function f(u) {
    var p = u[0], E = u[1], m = u[2], x = Math.sqrt(E * E + m * m), g = (Math.atan2(m, E) * d + 360) % 360;
    return Math.round(x * 1e4) === 0 && (g = NaN), [g, x, p];
  }
  function w(u, p) {
    p = p.slice();
    for (var E = [p.shift()], m, x, g, y, b, S, k; p.length > 0; ) {
      for (m = -1, x = -1 / 0, g = 0; g < p.length; g++)
        for (y = p[g], k = 0; k < E.length; k++)
          b = E[k], S = u(y, b), S > x && (x = S, m = g);
      E.push(p[m]), p.splice(m, 1);
    }
    return E;
  }
  function v(u, p) {
    var E, m, x, g = 1 / 0, y, b = 0, S = 0;
    for (E = 0, x = p.length; E < x; E++)
      for (m = E + 1; m < x; m++)
        y = u(p[E], p[m]), y < g && (g = y), b += y, S++;
    return { min: g, mean: b / S };
  }
  return De.validateRgb = h, De.labToRgb = o, De.labToRgbHex = c, De.rgbToLab = a, De.labToHcl = f, De.diffSort = w, De.computeQualityMetrics = v, De;
}
var Ut, tr;
function da() {
  if (tr) return Ut;
  tr = 1;
  var s = pn(), e = {
    protanope: {
      x: 0.7465,
      y: 0.2535,
      m: 1.273463,
      yint: -0.073894
    },
    deuteranope: {
      x: 1.4,
      y: -0.4,
      m: 0.968437,
      yint: 3331e-6
    },
    tritanope: {
      x: 0.1748,
      y: 0,
      m: 0.062921,
      yint: 0.292119
    }
  };
  function t(o, a) {
    return Math.sqrt(
      Math.pow(o[0] - a[0], 2) + Math.pow(o[1] - a[1], 2) + Math.pow(o[2] - a[2], 2)
    );
  }
  function i(o, a, h, l) {
    for (var c = h[0], d = l[0], f = h[1], w = l[1], v = h[2], u = l[2], p = Math.sqrt(Math.pow(f, 2) + Math.pow(v, 2)), E = Math.sqrt(Math.pow(w, 2) + Math.pow(u, 2)), m = p - E, x = c - d, g = f - w, y = v - u, b = Math.sqrt(
      Math.pow(g, 2) + Math.pow(y, 2) + Math.pow(m, 2)
    ), S = Math.atan2(v, f) * (180 / Math.PI); S < 0; )
      S += 360;
    var k = Math.sqrt(Math.pow(p, 4) / (Math.pow(p, 4) + 1900)), C = S >= 164 && S <= 345 ? 0.56 + Math.abs(0.2 * Math.cos(S + 168)) : 0.36 + Math.abs(0.4 * Math.cos(S + 35)), A = h[0] < 16 ? 0.511 : 0.040975 * c / (1 + 0.01765 * c), G = 0.0638 * p / (1 + 0.0131 * p) + 0.638, N = G * (k * C + 1 - k), _ = Math.sqrt(
      Math.pow(x / (o * A), 2) + Math.pow(m / (a * G), 2) + Math.pow(b / N, 2)
    );
    return _;
  }
  function r() {
    this.cache = {};
  }
  r.prototype.simulate = function(o, a, h) {
    h = h || 1;
    var l = o.join("-") + "-" + a + "-" + h, c = this.cache[l];
    if (c)
      return c;
    var d = e[a].x, f = e[a].y, w = e[a].m, v = e[a].yint, u = s.labToRgb(o), p = u[0], E = u[1], m = u[2], x = p, g = E, y = m, b = Math.pow(p, 2.2), S = Math.pow(E, 2.2), k = Math.pow(m, 2.2), C = b * 0.412424 + S * 0.357579 + k * 0.180464, A = b * 0.212656 + S * 0.715158 + k * 0.0721856, G = b * 0.0193324 + S * 0.119193 + k * 0.950444, N = C / (C + A + G), _ = A / (C + A + G), z = (_ - f) / (N - d), W = _ - N * z, L = (v - W) / (z - w), T = z * L + W;
    C = L * A / T, G = (1 - (L + T)) * A / T;
    var B = 0.312713 * A / 0.329016, $ = 0.358271 * A / 0.329016, j = B - C, K = $ - G, X = j * 3.24071 + K * -0.498571, M = j * -0.969258 + K * 0.0415557, ie = j * 0.0556352 + K * 1.05707;
    x = C * 3.24071 + A * -1.53726 + G * -0.498571, g = C * -0.969258 + A * 1.87599 + G * 0.0415557, y = C * 0.0556352 + A * -0.203996 + G * 1.05707;
    var Q = ((x < 0 ? 0 : 1) - x) / X, re = ((g < 0 ? 0 : 1) - g) / M, ne = ((y < 0 ? 0 : 1) - y) / ie, oe = Math.max(
      // highest value
      Q > 1 || Q < 0 ? 0 : Q,
      re > 1 || re < 0 ? 0 : re,
      ne > 1 || ne < 0 ? 0 : ne
    );
    x = x + oe * X, g = g + oe * M, y = y + oe * ie, x = Math.pow(x, 1 / 2.2), g = Math.pow(g, 1 / 2.2), y = Math.pow(y, 1 / 2.2), x = p * (1 - h) + x * h, g = E * (1 - h) + g * h, y = m * (1 - h) + y * h;
    var te = [x, g, y], Y = s.rgbToLab(te);
    return this.cache[l] = Y, Y;
  }, r.prototype.euclidean = t, r.prototype.cmc = i.bind(null, 2, 1), r.prototype.colorblind = function(o, a, h) {
    return a = this.simulate(a, o), h = this.simulate(h, o), this.cmc(a, h);
  }, Object.keys(e).forEach(function(o) {
    r.prototype[o] = function(a, h) {
      return this.colorblind(o, a, h);
    };
  });
  var n = 1601;
  return r.prototype.compromise = function(o, a) {
    var h = 0, l = this.cmc(o, a);
    return h += l * 1e3, l = this.colorblind("protanope", o, a), isNaN(l) || (h += l * 100), l = this.colorblind("deuteranope", o, a), isNaN(l) || (h += l * 500), l = this.colorblind("tritanope", o, a), isNaN(l) || (h += l * 1), h / n;
  }, r.prototype.get = function(o) {
    return o in e ? this.colorblind.bind(this, o) : this[o].bind(this);
  }, Ut = r, Ut;
}
var Ht, ir;
function ua() {
  if (ir) return Ht;
  ir = 1;
  var s = {
    all: [0, 360, 0, 100, 0, 100],
    default: [0, 360, 30, 80, 35, 80],
    sensible: [0, 360, 25.59, 55.59, 60.94, 90.94],
    colorblind: [0, 360, 40, 70, 15, 85],
    "fancy-light": [0, 360, 15, 40, 70, 100],
    "fancy-dark": [0, 360, 8, 40, 7, 40],
    shades: [0, 240, 0, 15, 0, 100],
    tarnish: [0, 360, 0, 15, 30, 70],
    pastel: [0, 360, 0, 30, 70, 100],
    pimp: [0, 360, 30, 100, 25, 70],
    intense: [0, 360, 20, 100, 15, 80],
    fluo: [0, 300, 35, 100, 75, 100],
    "red-roses": [330, 20, 10, 100, 35, 100],
    "ochre-sand": [20, 60, 20, 50, 35, 100],
    "yellow-lime": [60, 90, 10, 100, 35, 100],
    "green-mint": [90, 150, 10, 100, 35, 100],
    "ice-cube": [150, 200, 0, 100, 35, 100],
    "blue-ocean": [220, 260, 8, 80, 0, 50],
    "indigo-night": [260, 290, 40, 100, 35, 100],
    "purple-wine": [290, 330, 0, 100, 0, 40]
  };
  return Ht = s, Ht;
}
var jt, rr;
function fa() {
  if (rr) return jt;
  rr = 1;
  var s = ca(), e = da(), t = pn(), i = ua(), r = t.validateRgb, n = t.labToRgb, o = t.labToRgbHex, a = t.labToHcl, h = t.diffSort, l = {
    attempts: 1,
    colorFilter: null,
    colorSpace: "default",
    clustering: "k-means",
    quality: 50,
    ultraPrecision: !1,
    distance: "euclidean",
    seed: null
  }, c = /* @__PURE__ */ new Set(["force-vector", "k-means"]), d = /* @__PURE__ */ new Set([
    "euclidean",
    "cmc",
    "compromise",
    "protanope",
    "deuteranope",
    "tritanope"
  ]), f = new Set(Object.keys(i));
  function w(g) {
    for (var y = 0, b = 0, S = g.length; b < S; b++)
      y += g.charCodeAt(b);
    return y;
  }
  function v(g) {
    var y = Object.assign({}, l, g);
    if (typeof y.attempts != "number" || y.attempts <= 0)
      throw new Error("iwanthue: invalid `attempts` setting. Expecting a positive number.");
    if (y.colorFilter && typeof y.colorFilter != "function")
      throw new Error("iwanthue: invalid `colorFilter` setting. Expecting a function.");
    if (!c.has(y.clustering))
      throw new Error('iwanthue: unknown `clustering` "' + y.clustering + '".');
    if (typeof y.quality != "number" || isNaN(y.quality) || y.quality < 1)
      throw new Error("iwanthue: invalid `quality`. Expecting a number > 0.");
    if (typeof y.ultraPrecision != "boolean")
      throw new Error("iwanthue: invalid `ultraPrecision`. Expecting a boolean.");
    if (!d.has(y.distance))
      throw new Error('iwanthue: unknown `distance` "' + y.distance + '".');
    if (typeof y.seed == "string" && (y.seed = w(y.seed)), y.seed !== null && typeof y.seed != "number")
      throw new Error("iwanthue: invalid `seed`. Expecting an integer or a string.");
    if (!y.colorFilter && y.colorSpace && y.colorSpace !== "all") {
      var b;
      if (typeof y.colorSpace == "string") {
        if (!f.has(y.colorSpace))
          throw new Error('iwanthue: unknown `colorSpace` "' + y.colorSpace + '".');
        b = i[y.colorSpace];
      } else if (Array.isArray(y.colorSpace)) {
        if (y.colorSpace.length !== 6)
          throw new Error("iwanthue: expecting a `colorSpace` array of length 6 ([hmin, hmax, cmin, cmax, lmin, lmax]).");
        b = y.colorSpace;
      } else
        b = [
          y.colorSpace.hmin || 0,
          y.colorSpace.hmax || 360,
          y.colorSpace.cmin || 0,
          y.colorSpace.cmax || 100,
          y.colorSpace.lmin || 0,
          y.colorSpace.lmax || 100
        ];
      b[0] < b[1] ? y.colorFilter = function(S, k) {
        var C = a(k);
        return C[0] >= b[0] && C[0] <= b[1] && C[1] >= b[2] && C[1] <= b[3] && C[2] >= b[4] && C[2] <= b[5];
      } : y.colorFilter = function(S, k) {
        var C = a(k);
        return (C[0] >= b[0] || C[0] <= b[1]) && C[1] >= b[2] && C[1] <= b[3] && C[2] >= b[4] && C[2] <= b[5];
      };
    }
    return y;
  }
  function u(g, y, b) {
    for (var S = new Array(y), k, C, A = 0; A < y; A++) {
      do
        k = [
          100 * g(),
          100 * (2 * g() - 1),
          100 * (2 * g() - 1)
        ], C = n(k);
      while (!b(C, k));
      S[A] = k;
    }
    return S;
  }
  var p = 100, E = 100;
  function m(g, y, b, S, k) {
    for (var C = new Array(S.length), A = k.quality * 20, G, N, _ = S.length, z, W, L, T, B, $, j, K, X, M, ie, Q; A-- > 0; ) {
      for (G = 0; G < _; G++)
        C[G] = { dl: 0, da: 0, db: 0 };
      for (G = 0; G < _; G++)
        for (z = S[G], N = 0; N < G; N++)
          W = S[N], L = y(z, W), L > 0 ? (T = z[0] - W[0], B = z[1] - W[1], $ = z[2] - W[2], j = p / Math.pow(L, 2), C[G].dl += T * j / L, C[G].da += B * j / L, C[G].db += $ * j / L, C[N].dl -= T * j / L, C[N].da -= B * j / L, C[N].db -= $ * j / L) : (C[N].dl += 2 - 4 * g(), C[N].da += 2 - 4 * g(), C[N].db += 2 - 4 * g());
      for (G = 0; G < _; G++)
        X = S[G], ie = E * Math.sqrt(
          Math.pow(C[G].dl, 2) + Math.pow(C[G].da, 2) + Math.pow(C[G].db, 2)
        ), ie > 0 && (M = E * Math.min(0.1, ie) / ie, K = [
          X[0] + C[G].dl * M,
          X[1] + C[G].da * M,
          X[2] + C[G].db * M
        ], Q = n(K), b(Q, K) && (S[G] = K));
    }
  }
  function x(g, y, b, S) {
    var k = [], C = [], A, G, N, _, z, W = 5, L = 10, T = 10;
    for (S.ultraPrecision && (W = 1, L = 5, T = 5), A = 0; A <= 100; A += W)
      for (G = -100; G <= 100; G += L)
        for (N = -100; N <= 100; N += T)
          _ = [A, G, N], z = n(_), y(z, _) && (k.push(_), C.push(null));
    for (var B = S.quality, $, j, K, X, M = k.length, ie = b.length, Q, re, ne, oe, te, Y; B-- > 0; ) {
      for ($ = 0; $ < M; $++)
        for (X = k[$], re = 1 / 0, j = 0; j < ie; j++)
          K = b[j], Q = g(K, X), Q < re && (re = Q, C[$] = j);
      for (ne = k.slice(), j = 0; j < ie; j++) {
        for (oe = 0, te = [0, 0, 0], $ = 0; $ < M; $++)
          C[$] === j && (oe++, te[0] += k[$][0], te[1] += k[$][1], te[2] += k[$][2]);
        if (oe !== 0)
          if (te[0] /= oe, te[1] /= oe, te[2] /= oe, z = n(te), y(z, te))
            b[j] = te;
          else {
            if (ne.length > 0) {
              for (re = 1 / 0, Y = -1, $ = 0; $ < ne.length; $++)
                Q = g(ne[$], te), Q < re && (re = Q, Y = $);
              b[j] = k[Y];
            } else {
              for (re = 1 / 0, Y = -1, $ = 0; $ < k.length; $++)
                Q = g(k[$], te), Q < re && (re = Q, Y = $);
              b[j] = k[Y];
            }
            ne = ne.filter(function(Z) {
              return Z[0] !== b[j][0] || Z[1] !== b[j][1] || Z[2] !== b[j][2];
            });
          }
      }
    }
    return b;
  }
  return jt = function(y, b) {
    if (typeof y != "number" || y < 1)
      throw new Error("iwanthue: expecting a color count > 1.");
    b = v(b);
    var S = new s(b.seed), k = function() {
      return S.nextFloat();
    }, C = new e(), A = C.get(b.distance), G = function(T, B) {
      return r(T) ? b.colorFilter ? !!b.colorFilter(T, B) : !0 : !1;
    }, N;
    if (y === 1)
      return N = u(k, y, G), [o(N[0])];
    for (var _ = b.attempts, z, W = -1 / 0, L; _ > 0; )
      N = u(k, y, G), b.clustering === "force-vector" ? m(k, A, G, N, b) : x(A, G, N, b), z = t.computeQualityMetrics(A, N), z.min > W && (W = z.min, L = N), _--;
    return N = L, N = h(A, N), N.map(o);
  }, jt;
}
var pa = fa();
const ga = /* @__PURE__ */ hi(pa);
var va = (
  /*glsl*/
  `
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_normal;
attribute float a_normalCoef;
attribute vec2 a_positionStart;
attribute vec2 a_positionEnd;
attribute float a_positionCoef;
attribute float a_sourceRadius;
attribute float a_targetRadius;
attribute float a_sourceRadiusCoef;
attribute float a_targetRadiusCoef;

uniform mat3 u_matrix;
uniform float u_zoomRatio;
uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_lengthToThicknessRatio;
uniform float u_feather;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  vec2 normal = a_normal * a_normalCoef;
  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;

  float normalLength = length(normal);
  vec2 unitNormal = normal / normalLength;

  // These first computations are taken from edge.vert.glsl. Please read it to
  // get better comments on what's happening:
  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);
  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;

  // Here, we move the point to leave space for the arrow heads:
  // Source arrow head
  float sourceRadius = a_sourceRadius * a_sourceRadiusCoef;
  float sourceDirection = sign(sourceRadius);
  float webGLSourceRadius = sourceDirection * sourceRadius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLSourceArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;
  vec2 sourceCompensationVector =
    vec2(-sourceDirection * unitNormal.y, sourceDirection * unitNormal.x)
    * (webGLSourceRadius + webGLSourceArrowHeadLength);
    
  // Target arrow head
  float targetRadius = a_targetRadius * a_targetRadiusCoef;
  float targetDirection = sign(targetRadius);
  float webGLTargetRadius = targetDirection * targetRadius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLTargetArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;
  vec2 targetCompensationVector =
  vec2(-targetDirection * unitNormal.y, targetDirection * unitNormal.x)
    * (webGLTargetRadius + webGLTargetArrowHeadLength);

  // Here is the proper position of the vertex
  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness + sourceCompensationVector + targetCompensationVector, 1)).xy, 0, 1);

  v_thickness = webGLThickness / u_zoomRatio;

  v_normal = unitNormal;

  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`
), ma = va, gn = WebGLRenderingContext, nr = gn.UNSIGNED_BYTE, Ie = gn.FLOAT, ya = ["u_matrix", "u_zoomRatio", "u_sizeRatio", "u_correctionRatio", "u_pixelRatio", "u_feather", "u_minEdgeThickness", "u_lengthToThicknessRatio"], wa = {
  lengthToThicknessRatio: ct.lengthToThicknessRatio
};
function vn(s) {
  var e = H(H({}, wa), {});
  return /* @__PURE__ */ function(t) {
    function i() {
      return de(this, i), ge(this, i, arguments);
    }
    return ve(i, t), ue(i, [{
      key: "getDefinition",
      value: function() {
        return {
          VERTICES: 6,
          VERTEX_SHADER_SOURCE: ma,
          FRAGMENT_SHADER_SOURCE: fi,
          METHOD: WebGLRenderingContext.TRIANGLES,
          UNIFORMS: ya,
          ATTRIBUTES: [{
            name: "a_positionStart",
            size: 2,
            type: Ie
          }, {
            name: "a_positionEnd",
            size: 2,
            type: Ie
          }, {
            name: "a_normal",
            size: 2,
            type: Ie
          }, {
            name: "a_color",
            size: 4,
            type: nr,
            normalized: !0
          }, {
            name: "a_id",
            size: 4,
            type: nr,
            normalized: !0
          }, {
            name: "a_sourceRadius",
            size: 1,
            type: Ie
          }, {
            name: "a_targetRadius",
            size: 1,
            type: Ie
          }],
          CONSTANT_ATTRIBUTES: [
            // If 0, then position will be a_positionStart
            // If 1, then position will be a_positionEnd
            {
              name: "a_positionCoef",
              size: 1,
              type: Ie
            },
            {
              name: "a_normalCoef",
              size: 1,
              type: Ie
            },
            {
              name: "a_sourceRadiusCoef",
              size: 1,
              type: Ie
            },
            {
              name: "a_targetRadiusCoef",
              size: 1,
              type: Ie
            }
          ],
          CONSTANT_DATA: [[0, 1, -1, 0], [0, -1, 1, 0], [1, 1, 0, 1], [1, 1, 0, 1], [0, -1, 1, 0], [1, -1, 0, -1]]
        };
      }
    }, {
      key: "processVisibleItem",
      value: function(n, o, a, h, l) {
        var c = l.size || 1, d = a.x, f = a.y, w = h.x, v = h.y, u = Ue(l.color), p = w - d, E = v - f, m = a.size || 1, x = h.size || 1, g = p * p + E * E, y = 0, b = 0;
        g && (g = 1 / Math.sqrt(g), y = -E * g * c, b = p * g * c);
        var S = this.array;
        S[o++] = d, S[o++] = f, S[o++] = w, S[o++] = v, S[o++] = y, S[o++] = b, S[o++] = u, S[o++] = n, S[o++] = m, S[o++] = x;
      }
    }, {
      key: "setUniforms",
      value: function(n, o) {
        var a = o.gl, h = o.uniformLocations, l = h.u_matrix, c = h.u_zoomRatio, d = h.u_feather, f = h.u_pixelRatio, w = h.u_correctionRatio, v = h.u_sizeRatio, u = h.u_minEdgeThickness, p = h.u_lengthToThicknessRatio;
        a.uniformMatrix3fv(l, !1, n.matrix), a.uniform1f(c, n.zoomRatio), a.uniform1f(v, n.sizeRatio), a.uniform1f(w, n.correctionRatio), a.uniform1f(f, n.pixelRatio), a.uniform1f(d, n.antiAliasingFeather), a.uniform1f(u, n.minEdgeThickness), a.uniform1f(p, e.lengthToThicknessRatio);
      }
    }]);
  }(lt);
}
vn();
function ba(s) {
  return en([vn(), xt(s), xt(H(H({}, s), {}, {
    extremity: "source"
  }))]);
}
var Ea = ba(), xa = Ea;
function Sa(s, e) {
  if (typeof s != "object" || !s) return s;
  var t = s[Symbol.toPrimitive];
  if (t !== void 0) {
    var i = t.call(s, e);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(s);
}
function mn(s) {
  var e = Sa(s, "string");
  return typeof e == "symbol" ? e : e + "";
}
function yn(s, e, t) {
  return (e = mn(e)) in s ? Object.defineProperty(s, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : s[e] = t, s;
}
function sr(s, e) {
  var t = Object.keys(s);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(s);
    e && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(s, r).enumerable;
    })), t.push.apply(t, i);
  }
  return t;
}
function Ze(s) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? sr(Object(t), !0).forEach(function(i) {
      yn(s, i, t[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(t)) : sr(Object(t)).forEach(function(i) {
      Object.defineProperty(s, i, Object.getOwnPropertyDescriptor(t, i));
    });
  }
  return s;
}
function _a(s, e) {
  if (!(s instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function ka(s, e) {
  for (var t = 0; t < e.length; t++) {
    var i = e[t];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, mn(i.key), i);
  }
}
function Ta(s, e, t) {
  return e && ka(s.prototype, e), Object.defineProperty(s, "prototype", {
    writable: !1
  }), s;
}
function St(s) {
  return St = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, St(s);
}
function wn() {
  try {
    var s = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (e) {
  }
  return (wn = function() {
    return !!s;
  })();
}
function bn(s) {
  if (s === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function Ca(s, e) {
  if (e && (typeof e == "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return bn(s);
}
function Aa(s, e, t) {
  return e = St(e), Ca(s, wn() ? Reflect.construct(e, t || [], St(s).constructor) : e.apply(s, t));
}
function ni(s, e) {
  return ni = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, i) {
    return t.__proto__ = i, t;
  }, ni(s, e);
}
function Ra(s, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  s.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: s,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(s, "prototype", {
    writable: !1
  }), e && ni(s, e);
}
function si(s, e) {
  (e == null || e > s.length) && (e = s.length);
  for (var t = 0, i = Array(e); t < e; t++) i[t] = s[t];
  return i;
}
function La(s) {
  if (Array.isArray(s)) return si(s);
}
function Ga(s) {
  if (typeof Symbol != "undefined" && s[Symbol.iterator] != null || s["@@iterator"] != null) return Array.from(s);
}
function Na(s, e) {
  if (s) {
    if (typeof s == "string") return si(s, e);
    var t = {}.toString.call(s).slice(8, -1);
    return t === "Object" && s.constructor && (t = s.constructor.name), t === "Map" || t === "Set" ? Array.from(s) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? si(s, e) : void 0;
  }
}
function Da() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Wt(s) {
  return La(s) || Ga(s) || Na(s) || Da();
}
function En(s, e, t, i) {
  var r = Math.pow(1 - s, 2) * e.x + 2 * (1 - s) * s * t.x + Math.pow(s, 2) * i.x, n = Math.pow(1 - s, 2) * e.y + 2 * (1 - s) * s * t.y + Math.pow(s, 2) * i.y;
  return {
    x: r,
    y: n
  };
}
function Ia(s, e, t) {
  for (var i = 20, r = 0, n = s, o = 0; o < i; o++) {
    var a = En((o + 1) / i, s, e, t);
    r += Math.sqrt(Math.pow(n.x - a.x, 2) + Math.pow(n.y - a.y, 2)), n = a;
  }
  return r;
}
function Pa(s) {
  var e = s.curvatureAttribute, t = s.defaultCurvature, i = s.keepLabelUpright, r = i === void 0 ? !0 : i;
  return function(n, o, a, h, l) {
    var c = l.edgeLabelSize, d = o[e] || t, f = l.edgeLabelFont, w = l.edgeLabelWeight, v = l.edgeLabelColor.attribute ? o[l.edgeLabelColor.attribute] || l.edgeLabelColor.color || "#000" : l.edgeLabelColor.color, u = o.label;
    if (u) {
      n.fillStyle = v, n.font = "".concat(w, " ").concat(c, "px ").concat(f);
      var p = !r || a.x < h.x, E = p ? a.x : h.x, m = p ? a.y : h.y, x = p ? h.x : a.x, g = p ? h.y : a.y, y = (E + x) / 2, b = (m + g) / 2, S = x - E, k = g - m, C = Math.sqrt(Math.pow(S, 2) + Math.pow(k, 2)), A = p ? 1 : -1, G = y + k * d * A, N = b - S * d * A, _ = o.size * 0.7 + 5, z = {
        x: N - m,
        y: -(G - E)
      }, W = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2)), L = {
        x: g - N,
        y: -(x - G)
      }, T = Math.sqrt(Math.pow(L.x, 2) + Math.pow(L.y, 2));
      E += _ * z.x / W, m += _ * z.y / W, x += _ * L.x / T, g += _ * L.y / T, G += _ * k / C, N -= _ * S / C;
      var B = {
        x: G,
        y: N
      }, $ = {
        x: E,
        y: m
      }, j = {
        x,
        y: g
      }, K = Ia($, B, j);
      if (!(K < a.size + h.size)) {
        var X = n.measureText(u).width, M = K - a.size - h.size;
        if (X > M) {
          var ie = "…";
          for (u = u + ie, X = n.measureText(u).width; X > M && u.length > 1; )
            u = u.slice(0, -2) + ie, X = n.measureText(u).width;
          if (u.length < 4) return;
        }
        for (var Q = {}, re = 0, ne = u.length; re < ne; re++) {
          var oe = u[re];
          Q[oe] || (Q[oe] = n.measureText(oe).width * (1 + d * 0.35));
        }
        for (var te = 0.5 - X / K / 2, Y = 0, Z = u.length; Y < Z; Y++) {
          var J = u[Y], F = En(te, $, B, j), I = 2 * (1 - te) * (G - E) + 2 * te * (x - G), U = 2 * (1 - te) * (N - m) + 2 * te * (g - N), R = Math.atan2(U, I);
          n.save(), n.translate(F.x, F.y), n.rotate(R), n.fillText(J, 0, 0), n.restore(), te += Q[J] / K;
        }
      }
    }
  };
}
function $a(s) {
  var e = s.arrowHead, t = (e == null ? void 0 : e.extremity) === "target" || (e == null ? void 0 : e.extremity) === "both", i = (e == null ? void 0 : e.extremity) === "source" || (e == null ? void 0 : e.extremity) === "both", r = (
    /*glsl*/
    `
precision highp float;

varying vec4 v_color;
varying float v_thickness;
varying float v_feather;
varying vec2 v_cpA;
varying vec2 v_cpB;
varying vec2 v_cpC;
`.concat(t ? `
varying float v_targetSize;
varying vec2 v_targetPoint;` : "", `
`).concat(i ? `
varying float v_sourceSize;
varying vec2 v_sourcePoint;` : "", `
`).concat(e ? `
uniform float u_lengthToThicknessRatio;
uniform float u_widenessToThicknessRatio;` : "", `

float det(vec2 a, vec2 b) {
  return a.x * b.y - b.x * a.y;
}

vec2 getDistanceVector(vec2 b0, vec2 b1, vec2 b2) {
  float a = det(b0, b2), b = 2.0 * det(b1, b0), d = 2.0 * det(b2, b1);
  float f = b * d - a * a;
  vec2 d21 = b2 - b1, d10 = b1 - b0, d20 = b2 - b0;
  vec2 gf = 2.0 * (b * d21 + d * d10 + a * d20);
  gf = vec2(gf.y, -gf.x);
  vec2 pp = -f * gf / dot(gf, gf);
  vec2 d0p = b0 - pp;
  float ap = det(d0p, d20), bp = 2.0 * det(d10, d0p);
  float t = clamp((ap + bp) / (2.0 * a + b + d), 0.0, 1.0);
  return mix(mix(b0, b1, t), mix(b1, b2, t), t);
}

float distToQuadraticBezierCurve(vec2 p, vec2 b0, vec2 b1, vec2 b2) {
  return length(getDistanceVector(b0 - p, b1 - p, b2 - p));
}

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float dist = distToQuadraticBezierCurve(gl_FragCoord.xy, v_cpA, v_cpB, v_cpC);
  float thickness = v_thickness;
`).concat(t ? `
  float distToTarget = length(gl_FragCoord.xy - v_targetPoint);
  float targetArrowLength = v_targetSize + thickness * u_lengthToThicknessRatio;
  if (distToTarget < targetArrowLength) {
    thickness = (distToTarget - v_targetSize) / (targetArrowLength - v_targetSize) * u_widenessToThicknessRatio * thickness;
  }` : "", `
`).concat(i ? `
  float distToSource = length(gl_FragCoord.xy - v_sourcePoint);
  float sourceArrowLength = v_sourceSize + thickness * u_lengthToThicknessRatio;
  if (distToSource < sourceArrowLength) {
    thickness = (distToSource - v_sourceSize) / (sourceArrowLength - v_sourceSize) * u_widenessToThicknessRatio * thickness;
  }` : "", `

  float halfThickness = thickness / 2.0;
  if (dist < halfThickness) {
    #ifdef PICKING_MODE
    gl_FragColor = v_color;
    #else
    float t = smoothstep(
      halfThickness - v_feather,
      halfThickness,
      dist
    );

    gl_FragColor = mix(v_color, transparent, t);
    #endif
  } else {
    gl_FragColor = transparent;
  }
}
`)
  );
  return r;
}
function za(s) {
  var e = s.arrowHead, t = (e == null ? void 0 : e.extremity) === "target" || (e == null ? void 0 : e.extremity) === "both", i = (e == null ? void 0 : e.extremity) === "source" || (e == null ? void 0 : e.extremity) === "both", r = (
    /*glsl*/
    `
attribute vec4 a_id;
attribute vec4 a_color;
attribute float a_direction;
attribute float a_thickness;
attribute vec2 a_source;
attribute vec2 a_target;
attribute float a_current;
attribute float a_curvature;
`.concat(t ? `attribute float a_targetSize;
` : "", `
`).concat(i ? `attribute float a_sourceSize;
` : "", `

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform vec2 u_dimensions;
uniform float u_minEdgeThickness;
uniform float u_feather;

varying vec4 v_color;
varying float v_thickness;
varying float v_feather;
varying vec2 v_cpA;
varying vec2 v_cpB;
varying vec2 v_cpC;
`).concat(t ? `
varying float v_targetSize;
varying vec2 v_targetPoint;` : "", `
`).concat(i ? `
varying float v_sourceSize;
varying vec2 v_sourcePoint;` : "", `
`).concat(e ? `
uniform float u_widenessToThicknessRatio;` : "", `

const float bias = 255.0 / 254.0;
const float epsilon = 0.7;

vec2 clipspaceToViewport(vec2 pos, vec2 dimensions) {
  return vec2(
    (pos.x + 1.0) * dimensions.x / 2.0,
    (pos.y + 1.0) * dimensions.y / 2.0
  );
}

vec2 viewportToClipspace(vec2 pos, vec2 dimensions) {
  return vec2(
    pos.x / dimensions.x * 2.0 - 1.0,
    pos.y / dimensions.y * 2.0 - 1.0
  );
}

void main() {
  float minThickness = u_minEdgeThickness;

  // Selecting the correct position
  // Branchless "position = a_source if a_current == 1.0 else a_target"
  vec2 position = a_source * max(0.0, a_current) + a_target * max(0.0, 1.0 - a_current);
  position = (u_matrix * vec3(position, 1)).xy;

  vec2 source = (u_matrix * vec3(a_source, 1)).xy;
  vec2 target = (u_matrix * vec3(a_target, 1)).xy;

  vec2 viewportPosition = clipspaceToViewport(position, u_dimensions);
  vec2 viewportSource = clipspaceToViewport(source, u_dimensions);
  vec2 viewportTarget = clipspaceToViewport(target, u_dimensions);

  vec2 delta = viewportTarget.xy - viewportSource.xy;
  float len = length(delta);
  vec2 normal = vec2(-delta.y, delta.x) * a_direction;
  vec2 unitNormal = normal / len;
  float boundingBoxThickness = len * a_curvature;

  float curveThickness = max(minThickness, a_thickness / u_sizeRatio);
  v_thickness = curveThickness * u_pixelRatio;
  v_feather = u_feather;

  v_cpA = viewportSource;
  v_cpB = 0.5 * (viewportSource + viewportTarget) + unitNormal * a_direction * boundingBoxThickness;
  v_cpC = viewportTarget;

  vec2 viewportOffsetPosition = (
    viewportPosition +
    unitNormal * (boundingBoxThickness / 2.0 + sign(boundingBoxThickness) * (`).concat(e ? "curveThickness * u_widenessToThicknessRatio" : "curveThickness", ` + epsilon)) *
    max(0.0, a_direction) // NOTE: cutting the bounding box in half to avoid overdraw
  );

  position = viewportToClipspace(viewportOffsetPosition, u_dimensions);
  gl_Position = vec4(position, 0, 1);
    
`).concat(t ? `
  v_targetSize = a_targetSize * u_pixelRatio / u_sizeRatio;
  v_targetPoint = viewportTarget;
` : "", `
`).concat(i ? `
  v_sourceSize = a_sourceSize * u_pixelRatio / u_sizeRatio;
  v_sourcePoint = viewportSource;
` : "", `

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`)
  );
  return r;
}
var vi = 0.25, Ma = {
  arrowHead: null,
  curvatureAttribute: "curvature",
  defaultCurvature: vi
}, Fa = {
  edgeIndexAttribute: "parallelIndex",
  edgeMinIndexAttribute: "parallelMinIndex",
  edgeMaxIndexAttribute: "parallelMaxIndex"
};
function Oa(s, e) {
  var t = Ze(Ze({}, Fa), e || {}), i = {}, r = {}, n = {}, o = 0;
  s.forEachNode(function(b) {
    i[b] = ++o + "";
  }), s.forEachEdge(function(b, S, k, C) {
    var A = i[k], G = i[C], N = [A, G].join("-");
    r[b] = N, n[N] = [A, G].sort().join("-");
  });
  var a = {}, h = {};
  s.forEachEdge(function(b) {
    var S = r[b], k = n[S];
    a[S] = a[S] || [], a[S].push(b), h[k] = h[k] || [], h[k].push(b);
  });
  for (var l in a) {
    var c = a[l], d = c.length, f = h[n[l]].length;
    if (d === 1 && f === 1) {
      var w = c[0];
      s.setEdgeAttribute(w, t.edgeIndexAttribute, null), s.setEdgeAttribute(w, t.edgeMaxIndexAttribute, null);
    } else if (d === 1) {
      var v = c[0];
      s.setEdgeAttribute(v, t.edgeIndexAttribute, 1), s.setEdgeAttribute(v, t.edgeMaxIndexAttribute, 1);
    } else if (d === f)
      for (var u = (d - 1) / 2, p = -u, E = 0; E < d; E++) {
        var m = c[E], x = -(d - 1) / 2 + E;
        s.setEdgeAttribute(m, t.edgeIndexAttribute, x), s.setEdgeAttribute(m, t.edgeMinIndexAttribute, p), s.setEdgeAttribute(m, t.edgeMaxIndexAttribute, u);
      }
    else
      for (var g = 0; g < d; g++) {
        var y = c[g];
        s.setEdgeAttribute(y, t.edgeIndexAttribute, g + 1), s.setEdgeAttribute(y, t.edgeMaxIndexAttribute, d);
      }
  }
}
var xn = WebGLRenderingContext, or = xn.UNSIGNED_BYTE, Oe = xn.FLOAT;
function mi(s) {
  var e = Ze(Ze({}, Ma), s || {}), t = e, i = t.arrowHead, r = t.curvatureAttribute, n = t.drawLabel, o = (i == null ? void 0 : i.extremity) === "target" || (i == null ? void 0 : i.extremity) === "both", a = (i == null ? void 0 : i.extremity) === "source" || (i == null ? void 0 : i.extremity) === "both", h = ["u_matrix", "u_sizeRatio", "u_dimensions", "u_pixelRatio", "u_feather", "u_minEdgeThickness"].concat(Wt(i ? ["u_lengthToThicknessRatio", "u_widenessToThicknessRatio"] : []));
  return /* @__PURE__ */ function(l) {
    Ra(c, l);
    function c() {
      var d;
      _a(this, c);
      for (var f = arguments.length, w = new Array(f), v = 0; v < f; v++)
        w[v] = arguments[v];
      return d = Aa(this, c, [].concat(w)), yn(bn(d), "drawLabel", n || Pa(e)), d;
    }
    return Ta(c, [{
      key: "getDefinition",
      value: function() {
        return {
          VERTICES: 6,
          VERTEX_SHADER_SOURCE: za(e),
          FRAGMENT_SHADER_SOURCE: $a(e),
          METHOD: WebGLRenderingContext.TRIANGLES,
          UNIFORMS: h,
          ATTRIBUTES: [{
            name: "a_source",
            size: 2,
            type: Oe
          }, {
            name: "a_target",
            size: 2,
            type: Oe
          }].concat(Wt(o ? [{
            name: "a_targetSize",
            size: 1,
            type: Oe
          }] : []), Wt(a ? [{
            name: "a_sourceSize",
            size: 1,
            type: Oe
          }] : []), [{
            name: "a_thickness",
            size: 1,
            type: Oe
          }, {
            name: "a_curvature",
            size: 1,
            type: Oe
          }, {
            name: "a_color",
            size: 4,
            type: or,
            normalized: !0
          }, {
            name: "a_id",
            size: 4,
            type: or,
            normalized: !0
          }]),
          CONSTANT_ATTRIBUTES: [
            {
              name: "a_current",
              size: 1,
              type: Oe
            },
            // TODO: could optimize to bool
            {
              name: "a_direction",
              size: 1,
              type: Oe
            }
            // TODO: could optimize to byte
          ],
          CONSTANT_DATA: [[0, 1], [0, -1], [1, 1], [0, -1], [1, 1], [1, -1]]
        };
      }
    }, {
      key: "processVisibleItem",
      value: function(f, w, v, u, p) {
        var E, m = p.size || 1, x = v.x, g = v.y, y = u.x, b = u.y, S = Ue(p.color), k = (E = p[r]) !== null && E !== void 0 ? E : vi, C = this.array;
        C[w++] = x, C[w++] = g, C[w++] = y, C[w++] = b, o && (C[w++] = u.size), a && (C[w++] = v.size), C[w++] = m, C[w++] = k, C[w++] = S, C[w++] = f;
      }
    }, {
      key: "setUniforms",
      value: function(f, w) {
        var v = w.gl, u = w.uniformLocations, p = u.u_matrix, E = u.u_pixelRatio, m = u.u_feather, x = u.u_sizeRatio, g = u.u_dimensions, y = u.u_minEdgeThickness;
        if (v.uniformMatrix3fv(p, !1, f.matrix), v.uniform1f(E, f.pixelRatio), v.uniform1f(x, f.sizeRatio), v.uniform1f(m, f.antiAliasingFeather), v.uniform2f(g, f.width * f.pixelRatio, f.height * f.pixelRatio), v.uniform1f(y, f.minEdgeThickness), i) {
          var b = u.u_lengthToThicknessRatio, S = u.u_widenessToThicknessRatio;
          v.uniform1f(b, i.lengthToThicknessRatio), v.uniform1f(S, i.widenessToThicknessRatio);
        }
      }
    }]), c;
  }(lt);
}
mi();
var Ba = mi({
  arrowHead: ct
}), Ua = mi({
  arrowHead: Ze(Ze({}, ct), {}, {
    extremity: "both"
  })
});
function Ha(s, e) {
  let t;
  for (const i in s) {
    const r = s[i];
    e.startsWith(r) && (t === void 0 || r.length > s[t].length) && (t = i);
  }
  return t === void 0 ? e : e.replace(s[t], t + ":");
}
function oi(s, e) {
  if (e <= 0)
    throw new Error("Invalid maxIndex");
  if (s < 0)
    return -oi(-s, e);
  const t = 3.5;
  return t * (1 - Math.exp(-e / t)) * vi * s / e;
}
const ja = (
  /*glsl*/
  `
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_position;
attribute float a_size;
attribute float a_angle;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;

const float bias = 255.0 / 254.0;

void main() {
  // a pixel (of CSS) is two units of the correction ratio in the coordinates of the nodes
  float pixel = 2.0 * u_correctionRatio;
  float radius = a_size / u_sizeRatio * pixel;
  vec2 diffVector = 2.0 * (radius + pixel) * vec2(cos(a_angle), sin(a_angle));
  gl_Position = vec4((u_matrix * vec3(a_position + diffVector, 1)).xy, 0, 1);

  v_diffVector = diffVector;
  v_radius = radius;

  #ifdef PICKING_MODE
  v_color = a_id;
  #else
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`
), Wa = ["u_sizeRatio", "u_correctionRatio", "u_pixelRatio", "u_matrix"];
function qa(s, e) {
  const t = (
    /*glsl*/
    `
precision highp float;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;

uniform float u_correctionRatio;
uniform float u_pixelRatio;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);
const vec4 white = vec4(1.0, 1.0, 1.0, 1.0);

// The share of a pixel of the device at the given distance from the centre that lies within the given radius
float inside(float radius, float dist, float smoothing) {
  return clamp((radius - dist) / smoothing + 0.5, 0.0, 1.0);
}

void main(void) {
  float dist = length(v_diffVector);

  // the node is picked exactly within its circle
  #ifdef PICKING_MODE
  gl_FragColor = dist > v_radius ? transparent : v_color;
  #else
  float pixel = 2.0 * u_correctionRatio;
  float smoothing = pixel / u_pixelRatio;
  float gapOuter = v_radius - ${Li(s)} * pixel;
  float gapInner = gapOuter - ${Li(e)} * pixel;
  float gap = inside(gapOuter, dist, smoothing) - inside(gapInner, dist, smoothing);
  gl_FragColor = mix(v_color, white, gap) * inside(v_radius, dist, smoothing);
  #endif
}
`
  );
  return class extends Jr {
    getDefinition() {
      const { FLOAT: r, UNSIGNED_BYTE: n, TRIANGLES: o } = WebGLRenderingContext;
      return {
        VERTICES: 3,
        VERTEX_SHADER_SOURCE: ja,
        FRAGMENT_SHADER_SOURCE: t,
        METHOD: o,
        UNIFORMS: Wa,
        ATTRIBUTES: [
          { name: "a_position", size: 2, type: r },
          { name: "a_size", size: 1, type: r },
          { name: "a_color", size: 4, type: n, normalized: !0 },
          { name: "a_id", size: 4, type: n, normalized: !0 }
        ],
        // the corners of the triangle around the circle
        CONSTANT_ATTRIBUTES: [{ name: "a_angle", size: 1, type: r }],
        CONSTANT_DATA: [[0], [2 * Math.PI / 3], [4 * Math.PI / 3]]
      };
    }
    processVisibleItem(r, n, o) {
      const a = this.array;
      a[n++] = o.x, a[n++] = o.y, a[n++] = o.size, a[n++] = Ue(o.color), a[n++] = r;
    }
    setUniforms(r, { gl: n, uniformLocations: o }) {
      n.uniform1f(o.u_sizeRatio, r.sizeRatio), n.uniform1f(o.u_correctionRatio, r.correctionRatio), n.uniform1f(o.u_pixelRatio, r.pixelRatio), n.uniformMatrix3fv(o.u_matrix, !1, r.matrix);
    }
  };
}
const Va = `
  #sparql-overview {
    height: 100%;

    a {
      text-decoration: none;
    }
    a:hover {
      filter: brightness(60%);
      text-decoration: underline;
    }
    .overview-panel {
      flex: none;
      box-sizing: border-box;
      min-width: 150px;
      /* the panels leave a fifth of the width to the network, see maxPanelsShare */
      max-width: 40%;
      height: 100%;
      overflow-y: auto;
      color: #1f2937;

      /* the blocks of the panels, which collapse by their titles */
      .overview-block {
        margin-top: .9em;
      }
      /* the title of a block, a band opening and closing it, with a chevron pointing down while it is open */
      .overview-block-title {
        display: flex;
        align-items: center;
        gap: .5em;
        margin: 0 0 .55em;
        padding: .45em .6em;
        border-left: 3px solid #475569;
        border-radius: 4px;
        background: #f1f5f9;
        color: #1e293b;
        font-size: .74em;
        font-weight: 700;
        letter-spacing: .07em;
        text-transform: uppercase;
        cursor: pointer;
        list-style: none;
        user-select: none;
        transition: background-color .15s ease;
      }
      .overview-block-title::-webkit-details-marker {
        display: none;
      }
      .overview-block-title:hover {
        background: #e2e8f0;
      }
      .overview-block-title::after {
        content: "";
        flex: none;
        width: .45em;
        height: .45em;
        margin: 0 .2em 0 auto;
        border-right: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        transform: rotate(-45deg);
        transition: transform .15s ease;
      }
      .overview-block[open] > .overview-block-title::after {
        transform: translateY(-.15em) rotate(45deg);
      }
      .overview-block:not([open]) > .overview-block-title {
        margin-bottom: 0;
      }
      /* the sign of the tooltip of a title, which tells what the block shows */
      .overview-help {
        flex: none;
        width: 1.3em;
        height: 1.3em;
        fill: none;
        stroke: #94a3b8;
        stroke-width: 1.3;
        stroke-linecap: round;
        transition: stroke .15s ease;
      }
      .overview-help-dot {
        fill: #94a3b8;
        stroke: none;
      }
      .overview-block-title:hover .overview-help {
        stroke: #475569;
      }
      .overview-block-title:hover .overview-help-dot {
        fill: #475569;
      }
      .overview-dot {
        flex: none;
        width: .7em;
        height: .7em;
        border-radius: 50%;
        background: var(--overview-color, #9ca3af);
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);
      }

      /* a button copying an IRI: beside the IRI in a head, at the end of a row elsewhere, shown while the pointer is
         over the row or the focus in it, and always on a screen without a pointer */
      .overview-copy {
        display: flex;
        flex: none;
        padding: .25em;
        color: #6b7280;
        background: none;
        cursor: pointer;
      }
      .overview-copy:hover {
        filter: none;
        color: #111827;
        background: #f3f4f6;
      }
      .overview-copy svg {
        width: 1.2em;
        height: 1.2em;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.4;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .overview-copied-icon, .overview-copy.copied .overview-copy-icon {
        display: none;
      }
      .overview-copy.copied .overview-copied-icon {
        display: block;
        color: #16a34a;
      }
      /* of the same size after the texts of all sizes */
      .overview-copy-hover {
        display: inline-flex;
        vertical-align: middle;
        margin: -2px 0 -2px 3px;
        padding: 2px;
        border-radius: 4px;
        visibility: hidden;
      }
      .overview-copy-hover svg {
        width: 12px;
        height: 12px;
      }
      /* the last characters of a text and the button after it, see textWithCopy() */
      .overview-nowrap {
        white-space: nowrap;
      }
      :is(.overview-filter, .overview-class, .overview-tree summary, .overview-tree-leaf, .overview-predicate,
          .overview-graph, .overview-datatype, .overview-endpoint):is(:hover, :focus-within) .overview-copy-hover,
      .overview-copy.copied {
        visibility: visible;
      }
      @media (hover: none) {
        .overview-copy-hover {
          visibility: visible;
        }
      }
    }
    &.overview-settings-hidden #overview-details,
    &.overview-details-hidden #overview-settings {
      max-width: 80%;
    }
    &.overview-settings-hidden :is(#overview-settings, #overview-settings-splitter),
    &.overview-details-hidden :is(#overview-details, #overview-details-splitter) {
      display: none;
    }
    #overview-settings {
      display: flex;
      flex-direction: column;
      width: 230px;
      padding: 0 0.6em 0.4em 0.2em;

      /* the search of classes, with its icon, and the button of the information about the page */
      .overview-search {
        position: relative;
        display: flex;
        align-items: center;
        gap: .35em;
        margin: .5em 0 .1em;
      }
      .overview-search-icon {
        position: absolute;
        left: .6em;
        width: 1em;
        height: 1em;
        fill: none;
        stroke: #94a3b8;
        stroke-width: 1.6;
        stroke-linecap: round;
        pointer-events: none;
      }
      /* the fields of the endpoint and of the search of classes */
      .overview-search input {
        flex: 1;
        min-width: 0;
        box-sizing: border-box;
        padding: .45em .6em .45em 2em;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        background: #fff;
        color: #111827;
        font-size: .88em;
        outline: none;
        transition: border-color .15s ease, box-shadow .15s ease;
      }
      .overview-search input:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, .15);
      }
      .overview-icon-button[hidden] {
        display: none;
      }
      .overview-icon-button {
        display: flex;
        flex: none;
        padding: .3em;
        border-radius: 6px;
        background: none;
        color: #64748b;
        cursor: pointer;
      }
      .overview-icon-button:hover {
        filter: none;
        background: #f1f5f9;
        color: #1e293b;
      }
      .overview-icon-button svg {
        width: 1.35em;
        height: 1.35em;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.3;
        stroke-linecap: round;
      }
      .overview-icon-button .overview-help-dot {
        fill: currentColor;
      }

      /* the settings: a name, then a switch, a value or a number, the options of grouping dimmed while it is off */
      .overview-settings-group {
        min-width: 0;
        margin: 0;
        padding: 0;
        border: none;
      }
      .overview-settings-group:disabled {
        opacity: .5;
      }
      /* the block of the settings keeps its height below the filters, which share the rest of the panel */
      & > .overview-block {
        flex: none;
      }
      /* the line between the options of grouping and those of the display */
      .overview-settings-divider {
        height: 1px;
        margin: .35em .3em;
        background: #e5e7eb;
      }
      .overview-setting {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .6em;
        padding: .3em .3em .3em .4em;
        border-radius: 6px;
        font-size: .85em;
        line-height: 1.3;
        cursor: pointer;
      }
      label.overview-setting:hover {
        background: #f8fafc;
      }
      .overview-switch-input {
        position: absolute;
        opacity: 0;
        width: 1px;
        height: 1px;
        margin: 0;
        pointer-events: none;
      }
      .overview-switch {
        position: relative;
        flex: none;
        width: 2.1em;
        height: 1.2em;
        border-radius: 999px;
        background: #cbd5e1;
        transition: background-color .15s ease;
      }
      .overview-switch::before {
        content: "";
        position: absolute;
        top: .15em;
        left: .15em;
        width: .9em;
        height: .9em;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
        transition: transform .15s ease;
      }
      .overview-switch-input:checked + .overview-switch {
        background: #2563eb;
      }
      .overview-switch-input:checked + .overview-switch::before {
        transform: translateX(.9em);
      }
      .overview-switch-input:focus-visible + .overview-switch {
        outline: 2px solid #93c5fd;
        outline-offset: 2px;
      }
      .overview-switch-input:disabled + .overview-switch {
        opacity: .5;
      }
      .overview-value {
        padding: .05em .5em;
        border-radius: 999px;
        background: #eef2ff;
        color: #3730a3;
        font-size: .92em;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .overview-range {
        display: block;
        box-sizing: border-box;
        width: 100%;
        margin: 0 0 .3em;
        padding: 0 .4em;
        accent-color: #2563eb;
        cursor: pointer;
      }
      .overview-number {
        width: 3.6em;
        padding: .2em .3em;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font-size: .95em;
        text-align: center;
      }
      .overview-number:focus {
        border-color: #2563eb;
        outline: none;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, .15);
      }

      /* the sections of the filters, which share the height of the panel; one collapsed takes only its title */
      .overview-section {
        margin-top: .9em;
      }
      .overview-section.collapsed {
        flex: 0 0 auto !important;
      }
      .overview-section.collapsed .overview-graph-set,
      .overview-section.collapsed .overview-list,
      .overview-splitter:has(+ .overview-section.collapsed),
      .overview-section.collapsed + .overview-splitter {
        display: none;
      }
      .overview-section.collapsed > .overview-section-title {
        margin-bottom: 0;
      }
      .overview-section:not(.collapsed) > .overview-section-title::after {
        transform: translateY(-.15em) rotate(45deg);
      }
      .overview-section-title {
        flex: none;
      }
      /* the choice of a set of graphs, above the filter of graphs */
      .overview-graph-set {
        flex: none;
        box-sizing: border-box;
        width: 100%;
        margin: 0 0 .4em;
        padding: .25em .4em;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        background: #fff;
        color: #1f2937;
        font-size: .85em;
        cursor: pointer;
      }
      .overview-graph-set:focus-visible {
        border-color: #2563eb;
        outline: none;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, .15);
      }
      .overview-section-title::after {
        margin-left: .2em;
      }
      .overview-section-title:focus-visible {
        outline: 2px solid #93c5fd;
        outline-offset: 1px;
      }
      .overview-title-actions {
        display: flex;
        gap: .25em;
        margin-left: auto;
        letter-spacing: 0;
        text-transform: none;
      }
      .overview-title-actions button {
        padding: .1em .45em;
        border-radius: 4px;
        background: #fff;
        box-shadow: inset 0 0 0 1px #cbd5e1;
        color: #475569;
        font-size: .95em;
        font-weight: 600;
        cursor: pointer;
      }
      .overview-title-actions button:hover {
        filter: none;
        background: #e2e8f0;
      }

      /* a row of a filter: its checkbox, a dot of the color of a graph, its name and the number of its items */
      .overview-filter {
        display: flex;
        align-items: center;
        gap: .45em;
        padding: .25em .4em;
        border-radius: 6px;
        font-size: .82em;
        line-height: 1.3;
        cursor: pointer;
      }
      .overview-filter:hover {
        background: #f3f4f6;
      }
      .overview-filter input {
        flex: none;
        margin: 0;
        accent-color: #2563eb;
        cursor: pointer;
      }
      .overview-filter-name {
        flex: 1;
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .overview-filter-iri {
        /* on a line of its own below the label */
        display: block;
        font-family: 'Fira Code', monospace;
        font-size: .85em;
        color: #6b7280;
      }
      .overview-filter-count {
        flex: none;
        padding: 0 .45em;
        border-radius: 999px;
        background: #f1f5f9;
        color: #475569;
        font-size: .85em;
        font-variant-numeric: tabular-nums;
      }
      .overview-filter:has(input:not(:checked)) :is(.overview-filter-name, .overview-filter-count, .overview-dot) {
        opacity: .45;
      }
    }
    #overview-details {
      width: 260px;
      padding: 0 0.6em 0.6em;
      /* a size container, so that the list of the classes of a group can take a share of its height */
      container-type: size;

      /* the head of the details, with the color of the node */
      .overview-head {
        margin: .6em 0 .2em;
        padding: .15em 0 .2em .65em;
        border-left: 4px solid var(--overview-color, #cbd5e1);
      }
      .overview-kind {
        display: flex;
        align-items: center;
        gap: .45em;
        font-size: .7em;
        font-weight: 600;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: #6b7280;
      }
      .overview-title {
        margin: .2em 0 .3em;
        font-size: 1.2em;
        line-height: 1.25;
        color: #111827;
        overflow-wrap: anywhere;
      }
      .overview-iri {
        display: flex;
        align-items: center;
        gap: .25em;
        font-family: 'Fira Code', monospace;
        font-size: .75em;
        color: #4b5563;
      }
      .overview-iri > span {
        padding: .1em .45em;
        border-radius: 4px;
        background: #f3f4f6;
        overflow-wrap: anywhere;
      }
      .overview-comment {
        margin: .5em 0 0;
        font-size: .85em;
        line-height: 1.45;
        color: #374151;
      }
      .overview-term {
        font-weight: 600;
      }
      .overview-action {
        margin-top: .6em;
        padding: .3em .75em;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        background: #fff;
        font-size: .8em;
        cursor: pointer;
      }
      .overview-action:hover {
        filter: none;
        background: #f3f4f6;
      }

      .overview-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: .4em;
        font-size: .9em;
      }
      .overview-group .overview-action {
        margin-top: 0;
      }

      /* a graph in a row, as a class in a list: a dot of its color, its name and the instances in it */
      .overview-graph {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: start;
        column-gap: .45em;
        padding: .3em .5em;
        font-size: .85em;
        line-height: 1.3;
        color: #1f2937;
      }
      .overview-graph .overview-dot {
        /* in the middle of the first line */
        margin-top: .3em;
      }
      .overview-graph-name {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .overview-count {
        color: #6b7280;
        font-size: .9em;
        font-variant-numeric: tabular-nums;
      }
      .overview-more {
        display: block;
        margin-left: .5em;
        padding: .2em .4em;
        background: none;
        color: #2563eb;
        font-size: .78em;
        cursor: pointer;
      }
      .overview-more:hover {
        filter: none;
        text-decoration: underline;
      }

      /* the properties: their labels and CURIEs, then the classes or datatypes of their values */
      .overview-property {
        padding: .45em 0;
        border-bottom: 1px solid #d6d9df;
      }
      .overview-property:last-child {
        border-bottom: none;
      }
      /* the label of a predicate above its CURIE */
      .overview-predicate {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: .3em;
      }
      .overview-predicate-label {
        font-size: .85em;
        font-weight: 600;
        color: #111827;
      }
      .overview-curie {
        font-family: 'Fira Code', monospace;
        font-size: .72em;
        color: #6b7280;
        overflow-wrap: anywhere;
      }
      /* a datatype in a row, as a class in a list: its CURIE and the triples of its values, on the right */
      .overview-datatype {
        display: flex;
        align-items: center;
        column-gap: .45em;
        padding: .1em .5em;
        font-size: .8em;
        line-height: 1.3;
      }
      .overview-datatype .overview-count {
        margin-left: auto;
        /* as large as those of the classes */
        font-size: .95em;
      }
      .overview-pill {
        padding: .1em .45em;
        border-radius: 4px;
        background: #eef2ff;
        color: #3730a3;
        font-family: 'Fira Code', monospace;
        font-size: .92em;
      }

      /* a class: a dot of the color of its graph, its label above its IRI, and the triples of a relation to it */
      .overview-class {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: start;
        column-gap: .45em;
        width: 100%;
        box-sizing: border-box;
        padding: .3em .5em;
        border-radius: 6px;
        background: none;
        font-size: .85em;
        line-height: 1.3;
        text-align: left;
        color: #1f2937;
      }
      button.overview-class {
        cursor: pointer;
        transition: background-color .15s ease;
      }
      button.overview-class:hover {
        filter: none;
        background: #f3f4f6;
      }
      span.overview-class {
        color: #6b7280;
      }
      .overview-class.marked {
        background: #fef3c7;
      }
      .overview-class .overview-dot {
        /* in the middle of the first line */
        margin-top: .3em;
      }
      .overview-class-name {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .overview-class-label {
        overflow-wrap: anywhere;
      }
      .overview-class-iri {
        font-family: 'Fira Code', monospace;
        font-size: .8em;
        color: #6b7280;
        overflow-wrap: anywhere;
      }

      /* lists of classes, those of a group scrolled where they are many, a line between two classes */
      .overview-members {
        max-height: 12em;
        max-height: 50cqh;
        overflow-y: auto;
      }
      .overview-members .overview-class {
        border-bottom: 1px solid #f3f4f6;
        border-radius: 0;
      }
      .overview-members .overview-class:last-child {
        border-bottom: none;
      }
      .overview-group-name {
        display: flex;
        align-items: center;
        gap: .4em;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: .35em;
        padding: .35em .55em;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        background: #f8fafc;
        font-size: .82em;
        font-weight: 600;
        line-height: 1.3;
        text-align: left;
        color: #1e293b;
      }
      button.overview-group-name {
        cursor: pointer;
        transition: background-color .15s ease, border-color .15s ease;
      }
      button.overview-group-name:hover {
        filter: none;
        border-color: var(--overview-color, #cbd5e1);
        background: #f1f5f9;
      }

      /* the hierarchy: branches opened and closed by their chevrons, guides along the open ones */
      .overview-tree, .overview-tree ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .overview-tree ul {
        margin-left: .45em;
        padding-left: .45em;
        border-left: 1px solid #e5e7eb;
      }
      .overview-tree li {
        margin: .1em 0;
      }
      .overview-tree summary, .overview-tree-leaf {
        display: flex;
        align-items: center;
        gap: .3em;
      }
      .overview-tree summary {
        cursor: pointer;
        list-style: none;
      }
      .overview-tree summary::-webkit-details-marker {
        display: none;
      }
      .overview-tree summary::before {
        content: "";
        flex: none;
        width: .38em;
        height: .38em;
        margin: 0 .15em 0 .05em;
        border-right: 1.5px solid #6b7280;
        border-bottom: 1.5px solid #6b7280;
        transform: rotate(-45deg);
        transition: transform .15s ease;
      }
      .overview-tree details[open] > summary::before {
        transform: translateY(-.1em) rotate(45deg);
      }
      .overview-tree-leaf {
        /* the room of a chevron */
        padding-left: .9em;
      }
      .overview-tree-class {
        display: inline-flex;
        align-items: flex-start;
        gap: .35em;
        min-width: 0;
        padding: .1em .4em;
        border-radius: 4px;
        background: none;
        font-size: .82em;
        line-height: 1.3;
        text-align: left;
        color: #1f2937;
      }
      button.overview-tree-class {
        cursor: pointer;
      }
      button.overview-tree-class:hover {
        filter: none;
        background: #f3f4f6;
      }
      span.overview-tree-class {
        color: #6b7280;
      }
      .overview-tree-class .overview-dot {
        margin-top: .3em;
      }
      .overview-tree-name {
        overflow-wrap: anywhere;
      }
      .overview-tree-name .overview-class-iri {
        /* on a line of its own below the label */
        display: block;
        font-weight: normal;
      }
      .overview-tree-class.overview-focus {
        background: #fef3c7;
        color: #111827;
        font-weight: 600;
      }
      .overview-tree-count {
        flex: none;
        padding: 0 .45em;
        border-radius: 999px;
        background: #f3f4f6;
        color: #6b7280;
        font-size: .68em;
      }
      .overview-hollow {
        background: transparent;
        box-shadow: inset 0 0 0 1.5px #9ca3af;
      }

      /* a relation: the node it goes from, an arrow, and the node it goes to */
      .overview-route {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin-top: .7em;
      }
      /* an end of a relation that is a group: its name, and its classes the relation goes from or to */
      .overview-end {
        padding: .3em;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
      }
      .overview-end .overview-group-name {
        margin-bottom: 0;
        border-color: transparent;
      }
      .overview-end-note {
        margin: .35em .5em .15em;
        font-size: .75em;
        color: #6b7280;
      }
      .overview-arrow {
        position: relative;
        margin: .2em 0 .4em .95em;
        padding: .45em 0 .45em .9em;
        border-left: 2px solid #9ca3af;
        font-size: .75em;
        color: #6b7280;
      }
      .overview-arrow::after {
        content: "";
        position: absolute;
        left: -6px;
        bottom: -6px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 7px solid #9ca3af;
      }
      /* a relation and its inverse: an arrow at both ends, a line for each */
      .overview-arrow-both {
        display: flex;
        flex-direction: column;
        gap: .2em;
        margin-top: .4em;
      }
      .overview-arrow-both::before {
        content: "";
        position: absolute;
        left: -6px;
        top: -6px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 7px solid #9ca3af;
      }
    }
    .overview-section {
      display: flex;
      flex-direction: column;
      flex: 1 1 0;
      min-height: 0;
      overflow: hidden;
    }
    .overview-list {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overflow-wrap: anywhere;
    }
    #overview-edge-info:not(:empty) + #overview-node-info:not(:empty) {
      margin-top: 1.1em;
      border-top: 2px solid #e5e7eb;
    }
    #overview-info-hint {
      display: none;
      margin-top: 2em;
      color: #9ca3af;
      text-align: center;
      font-size: .9em;
    }
    #overview-edge-info:empty + #overview-node-info:empty + #overview-info-hint {
      display: block;
    }
    .overview-splitter {
      flex: none;
      height: 9px;
      cursor: row-resize;
      touch-action: none;
      background: linear-gradient(lightgray, lightgray) center / 80% 1px no-repeat;
    }
    .overview-panel-splitter {
      flex: none;
      width: 7px;
      cursor: col-resize;
      touch-action: none;
    }
    .overview-splitter:hover, .overview-splitter.dragging,
    .overview-panel-splitter:hover, .overview-panel-splitter.dragging {
      background-color: #e0e0e0;
    }
    .overview-panel p, #overview-dialog-info p, h3, h5 {
      margin: .5em 0;
    }
    #network-container {
      width: 100%;
      float: right;
      height: 100%;
      box-sizing: border-box;
      border: 1px solid lightgray;
      border-radius: 2px;
    }
    #overview-tools {
      position: absolute;
      top: .5em;
      left: .5em;
      right: .5em;
      z-index: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: .5em;
      /* the network gets the pointer between the tools */
      pointer-events: none;
    }
    #overview-tools > * {
      pointer-events: auto;
    }
    #overview-toggle-details {
      margin-left: auto;
    }
    /* the zoom of the view, the buttons zooming it and the one laying out the classes again, in the bottom right corner
       of the network */
    #overview-view-tools {
      position: absolute;
      right: .5em;
      bottom: .5em;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: .5em;
    }
    #overview-zoom {
      min-width: 3em;
      text-align: right;
      color: #94a3b8;
      font-size: .85em;
      font-variant-numeric: tabular-nums;
      text-shadow: 0 0 2px white, 0 0 2px white;
      cursor: default;
      user-select: none;
    }
    .overview-view-buttons {
      display: flex;
      border-radius: 6px;
      background-color: rgba(255, 255, 255, 0.85);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
      overflow: hidden;
    }
    .overview-view-buttons button {
      display: flex;
      padding: .3em;
      border-radius: 0;
      background: none;
      color: #334155;
      cursor: pointer;
    }
    .overview-view-buttons button + button {
      border-left: 1px solid #e2e8f0;
    }
    .overview-view-buttons button:hover {
      filter: none;
      background-color: #e2e8f0;
    }
    .overview-view-buttons button:disabled {
      background: none;
      color: #cbd5e1;
      cursor: default;
    }
    .overview-view-buttons svg {
      width: 1.5em;
      height: 1.5em;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .overview-view-buttons .overview-icon-solid {
      fill: currentColor;
      stroke: none;
    }
    .overview-view-buttons .overview-icon-thin {
      stroke-width: 1;
    }
    .overview-panel-toggle {
      display: flex;
      padding: .2em;
    }
    .overview-panel-toggle svg {
      width: 1.4em;
      height: 1.4em;
      fill: none;
      stroke: currentColor;
    }
    /* the part of the icon standing for the panel is filled while the panel is shown */
    .overview-panel-toggle .overview-panel-shown {
      fill: currentColor;
      stroke: none;
      opacity: 0;
    }
    .overview-panel-toggle[aria-pressed="true"] .overview-panel-shown {
      opacity: .5;
    }
    hr {
      width: 80%;
      border: none;
      height: 1px;
      background: lightgrey;
    }
    .clusterLabel {
      position: absolute;
      // transform: translate(-50%, -50%);
      font-size: 1.5rem;
      font-family: sans-serif;
      font-variant: small-caps;
      font-weight: 400;
      text-shadow: 2px 2px 1px white, -2px -2px 1px white, -2px 2px 1px white, 2px -2px 1px white;
    }
    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      border-radius: 6px;
      padding: 0.2em 0.4em;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      border: 1px solid #e0e0e0;
      display: inline-block;
      word-wrap: break-word;
    }
    dialog {
      border-color: #cccccc;
      background-color: #f5f5f5;
      border-radius: 10px;
    }
    button {
      font-size: 0.9em;
      border: none;
      padding: 0.3em 0.4em;
      border-radius: 5px;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }
    button:hover {
      filter: brightness(90%);
    }
    #loading-msg {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      background-color: rgba(255, 255, 255, 0.8);
      padding: 1em 2em;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      // display: none;
    }
  }
`, Ya = `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sh:<http://www.w3.org/ns/shacl#>
PREFIX sd:<http://www.w3.org/ns/sparql-service-description#>
PREFIX void:<http://rdfs.org/ns/void#>
PREFIX void-ext:<http://ldf.fi/void-ext#>
SELECT DISTINCT ?graph ?graphLabel ?linksetGraph ?linksetGraphLabel ?subjectClass ?prop ?objectClass ?objectDatatype
?triples ?linksetTriples ?datatypeTriples ?entities ?subjectClassLabel ?objectClassLabel ?subjectClassComment
?objectClassComment ?propLabel ?propComment
WHERE {
  {
    OPTIONAL {
      ?graph sd:graph ?graphDesc .
      OPTIONAL { ?graph rdfs:label ?graphLabel }
      ?graphDesc void:classPartition ?cp .
    }
    ?cp void:class ?subjectClass ;
      void:propertyPartition ?pp .
    OPTIONAL { ?cp void:entities ?entities }
    OPTIONAL { ?subjectClass rdfs:label ?subjectClassLabel }
    OPTIONAL { ?subjectClass rdfs:comment ?subjectClassComment }

    ?pp void:property ?prop .
    OPTIONAL { ?pp void:triples ?triples }
    OPTIONAL { ?prop rdfs:label ?propLabel }
    OPTIONAL { ?prop rdfs:comment ?propComment }
    OPTIONAL {
      {
        ?pp  void:classPartition [ void:class ?objectClass ] .
        OPTIONAL { ?objectClass rdfs:label ?objectClassLabel }
        OPTIONAL { ?objectClass rdfs:comment ?objectClassComment }
      } UNION {
        ?pp void-ext:datatypePartition ?dp .
        ?dp void-ext:datatype ?objectDatatype .
        OPTIONAL { ?dp void:triples ?datatypeTriples }
      }
    }
  } UNION {
    ?linkset void:subjectsTarget [ void:class ?subjectClass ] ;
      void:linkPredicate ?prop ;
      void:objectsTarget [ void:class ?objectClass ] .
    OPTIONAL { ?linkset void:triples ?linksetTriples }
    OPTIONAL {
      ?linksetGraph sd:graph ?linksetGraphDesc .
      OPTIONAL { ?linksetGraph rdfs:label ?linksetGraphLabel }
      ?linksetGraphDesc void:subset ?linkset .
    }
  }
} ORDER BY ?subjectClass ?objectClass ?objectDatatype ?graph ?triples`, Xa = `PREFIX sh: <http://www.w3.org/ns/shacl#>
SELECT DISTINCT ?prefix ?namespace
WHERE { [] sh:namespace ?namespace ; sh:prefix ?prefix }
ORDER BY ?prefix`, Za = 6e4, ar = 200;
function ai(s, e, t, i = "GET") {
  return ke(this, null, function* () {
    var h, l, c, d;
    const r = (h = t.timeout) != null ? h : Za, n = new AbortController(), o = () => {
      var f;
      return n.abort((f = t.signal) == null ? void 0 : f.reason);
    };
    (l = t.signal) != null && l.aborted && o(), (c = t.signal) == null || c.addEventListener("abort", o);
    const a = setTimeout(() => n.abort(`The endpoint did not answer in ${r / 1e3} s`), r);
    try {
      const f = yield fetch(i === "GET" ? `${s}?query=${encodeURIComponent(e)}` : s, {
        method: i,
        headers: { Accept: "application/sparql-results+json" },
        body: i === "GET" ? void 0 : new URLSearchParams({ query: e }),
        signal: n.signal
      });
      if (!f.ok)
        throw new Error(`HTTP ${f.status} ${f.statusText}`.trim());
      return (yield f.json()).results.bindings;
    } finally {
      clearTimeout(a), (d = t.signal) == null || d.removeEventListener("abort", o);
    }
  });
}
function yi(s, e, t, i) {
  return ke(this, null, function* () {
    const r = [...e], n = [];
    for (let a = 0; a < r.length; a += ar)
      n.push(r.slice(a, a + ar));
    return (yield Promise.all(n.map((a) => ai(s, t(a.map((h) => `<${h}>`).join(" ")), i, "POST")))).flat();
  });
}
function Ka(s, e, t) {
  return ke(this, null, function* () {
    const i = [], r = new Set(e);
    let n = [...r];
    for (let o = 0; o < 10 && n.length > 0; o++) {
      const a = yield yi(s, n, (h) => `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT ?class ?superClass ?superClassLabel WHERE {
  VALUES ?class { ${h} }
  ?class rdfs:subClassOf ?superClass .
  FILTER(isIRI(?superClass) && ?superClass != ?class && !STRSTARTS(STR(?superClass), "http://blank/"))
  OPTIONAL { ?superClass rdfs:label ?superClassLabel }
}`, t);
      n = [];
      for (const h of a)
        i.push(h), r.has(h.superClass.value) || (r.add(h.superClass.value), n.push(h.superClass.value));
    }
    return i;
  });
}
function Qa(s, e, t) {
  return yi(s, e, (i) => `PREFIX owl: <http://www.w3.org/2002/07/owl#>
SELECT DISTINCT ?property ?inverse WHERE {
  VALUES ?property { ${i} }
  { ?property owl:inverseOf ?inverse } UNION { ?inverse owl:inverseOf ?property }
  UNION { ?property a owl:SymmetricProperty . BIND(?property AS ?inverse) }
  FILTER(isIRI(?inverse))
}`, t);
}
function Ja(s, e, t) {
  return yi(s, e, (i) => `PREFIX owl: <http://www.w3.org/2002/07/owl#>
SELECT DISTINCT ?property WHERE {
  VALUES ?property { ${i} }
  ?property owl:deprecated true .
}`, t);
}
function Bh(t) {
  return ke(this, arguments, function* (s, e = {}) {
    var d, f, w;
    (d = e.onProgress) == null || d.call(e, `Loading the VoID description of ${s}...`);
    const [i, r] = yield Promise.all([
      ai(s, Ya, e),
      ai(s, Xa, e)
    ]);
    (f = e.onProgress) == null || f.call(e, "Loading the class hierarchy...");
    const n = new Set(i.flatMap((v) => {
      var u, p;
      return [(u = v.subjectClass) == null ? void 0 : u.value, (p = v.objectClass) == null ? void 0 : p.value].filter((E) => E !== void 0);
    })), o = new Set(i.map((v) => v.prop.value));
    let a = [], h = [], l = [];
    try {
      [a, h, l] = yield Promise.all([
        Ka(s, n, e),
        Qa(s, o, e),
        Ja(s, o, e)
      ]);
    } catch (v) {
      if ((w = e.signal) != null && w.aborted)
        throw e.signal.reason;
      console.warn("Groups are named by their classes, the class hierarchy, the inverses or the deprecated predicates are not available:", v);
    }
    const c = Object.fromEntries(r.map((v) => [v.prefix.value, v.namespace.value]));
    return { voidBindings: i, prefixes: c, hierarchy: a, inverses: h, deprecated: l };
  });
}
const eh = "Endpoint Metadata", at = "Default", th = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", qt = 8, hr = 4, ih = 20, lr = 0.66, cr = 5, dr = /* @__PURE__ */ new Set(["http://www.w3.org/2002/07/owl#Class", "http://www.w3.org/2000/01/rdf-schema#Class"]), ur = /* @__PURE__ */ new Set([
  "http://www.w3.org/2002/07/owl#Thing",
  "http://www.w3.org/2000/01/rdf-schema#Resource"
]), fr = (s) => `${Math.round(s * 100)} %`, rh = () => {
  var i, r, n;
  const s = document.createElement("canvas"), e = [];
  s.addEventListener("webglcontextcreationerror", (o) => {
    const a = o.statusMessage;
    a && !e.includes(a) && e.push(a);
  });
  const t = (r = (i = s.getContext("webgl2")) != null ? i : s.getContext("webgl")) != null ? r : s.getContext("experimental-webgl");
  return (n = t == null ? void 0 : t.getExtension("WEBGL_lose_context")) == null || n.loseContext(), { available: t !== null, reasons: e };
}, pr = (s, e, t) => {
  var i;
  return s.set(e, Math.max((i = s.get(e)) != null ? i : 0, t));
}, gr = (s) => {
  var t, i;
  const e = (i = (t = s["xml:lang"]) == null ? void 0 : t.toLowerCase()) != null ? i : "";
  return e === "en" || e === "" ? 0 : e.startsWith("en-") ? 1 : 2;
}, vr = (s, e = !1) => {
  if (!s)
    return;
  const t = (e ? s.value : s.value.replace(/\s+/g, " ")).trim();
  return t === "" ? void 0 : _e(le({}, s), { value: t });
}, mr = (s) => s.replace(/\([^)]*\)/g, " ").split(" ").filter((e) => e !== "").length, yr = (s, e, t = !1) => {
  if (!e)
    return !0;
  const i = gr(s) - gr(e);
  if (i !== 0)
    return i < 0;
  const r = t ? 0 : mr(s.value) - mr(e.value);
  if (r !== 0)
    return r > 0;
  const n = s.value.length - e.value.length;
  return n !== 0 ? t ? n > 0 : n < 0 : s.value < e.value;
}, nh = (s) => {
  const e = (i) => [...i].filter((r) => r !== r.toLowerCase()).length, t = /* @__PURE__ */ new Map();
  for (const i of s) {
    const r = i.toLowerCase(), n = t.get(r);
    (n === void 0 || e(i) > e(n)) && t.set(r, i);
  }
  return [...t.values()];
}, wr = (s) => {
  const [e] = [...s];
  return e === void 0 || e === e.toUpperCase() || [...s.split(/\s/, 1)[0]].some((i) => i !== i.toLowerCase()) ? s : e.toUpperCase() + s.slice(e.length);
}, V = (s) => String(s).replace(/[&<>"']/g, (e) => `&#${e.charCodeAt(0)};`), Be = (s, e, t) => `${s.toLocaleString()} ${s === 1 ? e : t}`, sh = new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 }), Sn = (s, e, t) => s === void 0 ? "" : `<span class="overview-count" title="${Be(s, e, t)}">${sh.format(s)}</span>`, yt = (s) => Sn(s, "triple", "triples"), Vt = (s) => Sn(s, "instance", "instances"), wt = '<svg class="overview-help" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.3v4.2"/><circle class="overview-help-dot" cx="8" cy="4.9" r=".8"/></svg>', Yt = 6, oh = 1e3, ah = '<svg class="overview-search-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5l3.5 3.5"/></svg>', hh = '<svg class="overview-search-icon" viewBox="0 0 16 16" aria-hidden="true"><ellipse cx="8" cy="4" rx="5" ry="2"/><path d="M3 4v8c0 1.1 2.2 2 5 2s5-.9 5-2V4M3 8c0 1.1 2.2 2 5 2s5-.9 5-2"/></svg>', lh = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.3v4.2"/><circle class="overview-help-dot" cx="8" cy="4.9" r=".8"/></svg>', ch = '<svg class="overview-copy-icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5"/><path d="M10.5 3.5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 1.5 1.5"/></svg><svg class="overview-copied-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3 3 7-7"/></svg>', dh = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13.92 10.15A6.3 6.3 0 0 0 4.85 2.54M2.08 5.85A6.3 6.3 0 0 0 11.15 13.46"/><path class="overview-icon-solid" d="M3.8 3.15L4.86 .58L6.56 3.52ZM12.2 12.85L11.14 15.42L9.44 12.48Z"/><path class="overview-icon-thin" d="M8 5.6L5.8 9.9M8 5.6L10.2 9.9M5.8 9.9H10.2"/><circle class="overview-icon-solid" cx="8" cy="5.6" r="1.15"/><circle class="overview-icon-solid" cx="5.8" cy="9.9" r="1.15"/><circle class="overview-icon-solid" cx="10.2" cy="9.9" r="1.15"/></svg>', uh = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 8h8"/></svg>', fh = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 8h8M8 4v8"/></svg>', ph = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6V4a1.5 1.5 0 0 1 1.5-1.5h2M10 2.5h2a1.5 1.5 0 0 1 1.5 1.5v2M13.5 10v2a1.5 1.5 0 0 1-1.5 1.5h-2M6 13.5H4a1.5 1.5 0 0 1-1.5-1.5v-2"/></svg>', br = "sparql-overview-sizes", Xt = /* @__PURE__ */ new Set(["settings-options"]), gh = 150, Er = 40, xr = 0.8, Zt = 150, vh = 0.8, mh = 6, yh = 8, bt = 1.25, Sr = 4, wh = (s, e) => e >= s ? 0 : s - Math.sqrt(s * s - Tt(s - e, 2)), bh = 1e3, Eh = 200, _r = 700, Kt = 0.05, Qt = 4, xh = 1.07, Sh = 10, _h = 50, kr = 200, Tr = 250, kh = 0.5, Th = 1.3, Ch = 1.2, Ah = 3, Rh = "#dc2626", Lh = 1.05, Gh = 13.5, Nh = 0.75, Cr = 2, Dh = 0.8, Ih = 0.7, Ph = "#cbd5e1", Ar = (s, e) => {
  var n;
  const t = (n = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(s != null ? s : "")) == null ? void 0 : n[1];
  if (!t)
    return "#e5e7eb";
  const i = t.length === 3 ? [...t].map((o) => o + o).join("") : t, r = (o) => Math.round(parseInt(i.slice(o, o + 2), 16) * (1 - e) + 255 * e);
  return `#${[0, 2, 4].map((o) => r(o).toString(16).padStart(2, "0")).join("")}`;
};
function $h(s) {
  const e = [...s].sort((r, n) => r.x - n.x || r.y - n.y), t = (r, n, o) => (n.x - r.x) * (o.y - r.y) - (n.y - r.y) * (o.x - r.x), i = (r) => {
    const n = [];
    for (const o of r) {
      for (; n.length >= 2 && t(n[n.length - 2], n[n.length - 1], o) <= 0; )
        n.pop();
      n.push(o);
    }
    return n.pop(), n;
  };
  return [...i(e), ...i(e.reverse())];
}
function Rr(s, e, t, i) {
  let r = 0;
  for (let n = 0; n < s.length; n++) {
    const o = s[n], a = s[(n + 1) % s.length], h = a.x - o.x, l = a.y - o.y, c = t * l - i * h;
    if (Math.abs(c) < 1e-12)
      continue;
    const d = o.x - e.x, f = o.y - e.y, w = (d * l - f * h) / c, v = (d * i - f * t) / c;
    w > 0 && v >= -1e-9 && v <= 1 + 1e-9 && (r = Math.max(r, w));
  }
  return r;
}
function zh(s) {
  const e = s.map((v) => v.x), t = s.map((v) => v.y), [i, r, n, o] = [Math.min(...e), Math.max(...e), Math.min(...t), Math.max(...t)], [a, h] = [(r - i) / 2 || 1, (o - n) / 2 || 1], l = (v) => ({ x: (v.x - (i + r) / 2) / a, y: (v.y - (n + o) / 2) / h }), c = (v) => ({ x: (i + r) / 2 + v.x * a, y: (n + o) / 2 + v.y * h }), d = s.map(l), f = $h(d);
  if (f.length < 3)
    return { forward: l, inverse: c, width: 2 * a, height: 2 * h };
  const w = {
    x: d.reduce((v, u) => v + u.x, 0) / d.length,
    y: d.reduce((v, u) => v + u.y, 0) / d.length
  };
  return {
    forward: (v) => {
      const u = l(v), p = Math.hypot(u.x - w.x, u.y - w.y);
      if (p === 0)
        return { x: 0, y: 0 };
      const E = (u.x - w.x) / p, m = (u.y - w.y) / p, x = Rr(f, w, E, m), g = x > 0 ? p / x : 1, y = Math.max(Math.abs(E), Math.abs(m));
      return { x: g * E / y, y: g * m / y };
    },
    inverse: (v) => {
      const u = Math.hypot(v.x, v.y);
      if (u === 0)
        return c(w);
      const p = v.x / u, E = v.y / u, m = Rr(f, w, p, E), x = u * Math.max(Math.abs(p), Math.abs(E)) * (m > 0 ? m : 1);
      return c({ x: w.x + p * x, y: w.y + E * x });
    },
    width: 2 * a,
    height: 2 * h
  };
}
function Mh(s) {
  const e = s.map((a) => a.x), t = s.map((a) => a.y), [i, r] = [Math.min(...e), Math.min(...t)], [n, o] = [Math.max(...e) - i || 1, Math.max(...t) - r || 1];
  return {
    forward: (a) => ({ x: 2 * (a.x - i) / n - 1, y: 2 * (a.y - r) / o - 1 }),
    inverse: (a) => ({ x: i + (a.x + 1) * n / 2, y: r + (a.y + 1) * o / 2 }),
    width: n,
    height: o
  };
}
class Uh {
  /** Create a new SPARQL overview instance
   *
   * @param containerElement - The HTML element where the component will be rendered
   * @param endpoints - An object with SPARQL endpoint URLs as keys and their VoID description as values
   * @param prefixes - An object with prefixes as keys and their full URIs as values
   * @param options - The class hierarchy and the options of grouping similar classes
   */
  constructor(e, t, i = {}, r = {}) {
    var z, W, L, T, B, $, j, K, X, M, ie, Q, re, ne, oe, te, Y, Z, J;
    this.classGraph = new ee({ multi: !0 }), this.graph = new ee({ multi: !0 }), this.groups = /* @__PURE__ */ new Map(), this.groupOf = /* @__PURE__ */ new Map(), this.shownAs = /* @__PURE__ */ new Map(), this.superClasses = /* @__PURE__ */ new Map(), this.subClasses = /* @__PURE__ */ new Map(), this.superClassLabels = /* @__PURE__ */ new Map(), this.inverseProperties = /* @__PURE__ */ new Map(), this.deprecatedProperties = /* @__PURE__ */ new Set(), this.dataClasses = /* @__PURE__ */ new Set(), this.leadsToData = /* @__PURE__ */ new Set(), this.labels = /* @__PURE__ */ new Map(), this.comments = /* @__PURE__ */ new Map(), this.clusters = {}, this.clusterPositions = {}, this.layoutPositions = /* @__PURE__ */ new Map(), this.laidOut = /* @__PURE__ */ new Set(), this.fillArea = !0, this.toolsBand = 0, this.pinned = /* @__PURE__ */ new Set(), this.heldBlocked = !1, this.suppressClick = !1, this.areaShares = /* @__PURE__ */ new Map(), this.sharesShown = !1, this.displayPositions = /* @__PURE__ */ new Map(), this.settled = /* @__PURE__ */ new Map(), this.steady = /* @__PURE__ */ new Set(), this.labelSizes = /* @__PURE__ */ new Map(), this.shownLabels = /* @__PURE__ */ new Map(), this.labelsChosen = !1, this.labelObstacles = [], this.loopShapes = [], this.groupSimilarity = lr, this.maxAncestorDistance = cr, this.groupByAncestor = !1, this.groupAcrossGraphs = !1, this.grouping = !0, this.expandedGroups = /* @__PURE__ */ new Set(), this.predicates = {}, this.hidePredicates = /* @__PURE__ */ new Set(), this.hideClusters = /* @__PURE__ */ new Set(), this.hiddenGraphs = /* @__PURE__ */ new Set(), this.graphSets = [], this.destroyed = !1, this.endpointChoices = [], this.graphNames = /* @__PURE__ */ new Map(), this.hideIsolatedClasses = !0, this.hideEdgesToMetaclasses = !0, this.isolated = /* @__PURE__ */ new Set(), this.sizeByInstances = !0, this.selectedNodes = /* @__PURE__ */ new Set(), this.searchQuery = "", this.dialogElOpen = null, this.collapsedBlocks = /* @__PURE__ */ new Set(), this.onRender = () => {
      var F;
      return (F = this.renderer) == null ? void 0 : F.refresh({ skipIndexation: !0 });
    }, this.onPopState = (F) => {
      this.dialogElOpen && (this.dialogElOpen.close(), this.dialogElOpen = null, F.preventDefault());
    }, this.drawNodeLabel = (F, I, U) => {
      var Ee, se, me;
      const R = (Ee = I.key) != null ? Ee : "";
      if (!I.label)
        return;
      if (this.labelsChosen || this.chooseLabels(), R === this.draggedNode()) {
        this.drawLabelLines(F, I, U, this.heldBlocked ? Rh : void 0);
        return;
      }
      const ae = this.shownLabels.get(R);
      if (!ae) {
        (me = (se = this.renderer) == null ? void 0 : se.displayedNodeLabels) == null || me.delete(R);
        return;
      }
      const fe = I.shortLabel, pe = I.faded ? Ph : void 0;
      this.drawLabelLines(F, ae === "short" && fe ? _e(le({}, I), { label: fe }) : I, U, pe);
    }, this.drawNodeHover = (F, I, U) => {
      if (I.key === this.draggedNode())
        return;
      const R = U.labelSize, ae = 2, fe = I.label ? I.label.split(`
`) : [], pe = Math.max(I.size, R / 2) + ae;
      if (F.fillStyle = "#FFF", F.shadowOffsetX = 0, F.shadowOffsetY = 0, F.shadowBlur = 8, F.shadowColor = "#000", F.beginPath(), fe.length > 0) {
        const Ee = Math.max(...fe.map((Ge, We) => (F.font = `${We === 0 && I.labelTitle ? "bold" : U.labelWeight} ${R}px ${U.labelFont}`, F.measureText(Ge).width))), se = ((fe.length - 1) * R * bt + R) / 2, me = fe.length > 1, xe = I.y - Math.max(pe, se + (me ? 3 * ae : ae)), Se = I.y + Math.max(pe, se + (me ? 2.5 * ae : ae)), ye = Math.min(pe, (Se - xe) / 2), Re = I.x - pe, He = Math.min(I.y - se - xe, Se - I.y - se), Le = I.x + I.size + 3 + Ee + 3 + ye / 4 + wh(ye, He);
        F.moveTo(Re + ye, xe), F.arcTo(Le, xe, Le, Se, ye), F.arcTo(Le, Se, Re, Se, ye), F.arcTo(Re, Se, Re, xe, ye), F.arcTo(Re, xe, Le, xe, ye);
      } else
        F.arc(I.x, I.y, I.size + ae, 0, Math.PI * 2);
      F.closePath(), F.fill(), F.shadowBlur = 0, this.drawLabelLines(F, I, U);
    }, this.dom = e, this.endpoints = t, this.prefixes = i, this.groupSimilarity = (z = r.groupSimilarity) != null ? z : lr, this.maxAncestorDistance = (W = r.maxAncestorDistance) != null ? W : cr, this.groupByAncestor = (L = r.groupByAncestor) != null ? L : !1, this.groupAcrossGraphs = (T = r.groupAcrossGraphs) != null ? T : !1, this.fillArea = (B = r.fillArea) != null ? B : !0, this.hideIsolatedClasses = ($ = r.hideIsolatedClasses) != null ? $ : !0, this.hideEdgesToMetaclasses = (j = r.hideEdgesToMetaclasses) != null ? j : !0, this.hiddenGraphs = new Set((K = r.hiddenGraphs) != null ? K : []), this.graphSets = (X = r.graphSets) != null ? X : [], this.initialGraphSet = r.graphSet, this.endpointChoices = (M = r.endpointChoices) != null ? M : [], this.onEndpointChoice = r.onEndpointChoice, this.sizeByInstances = (ie = r.sizeByInstances) != null ? ie : !0;
    for (const F of (Q = r.inverses) != null ? Q : []) {
      const [I, U] = [(re = F.property) == null ? void 0 : re.value, (ne = F.inverse) == null ? void 0 : ne.value];
      if (!(!I || !U))
        for (const [R, ae] of [
          [I, U],
          [U, I]
        ])
          this.inverseProperties.has(R) || this.inverseProperties.set(R, /* @__PURE__ */ new Set()), this.inverseProperties.get(R).add(ae);
    }
    for (const F of (oe = r.deprecated) != null ? oe : [])
      (te = F.property) != null && te.value && this.deprecatedProperties.add(F.property.value);
    const n = /* @__PURE__ */ new Map();
    for (const F of (Y = r.hierarchy) != null ? Y : []) {
      const I = (Z = this.superClasses.get(F.class.value)) != null ? Z : /* @__PURE__ */ new Set();
      I.add(F.superClass.value), this.superClasses.set(F.class.value, I);
      const U = (J = this.subClasses.get(F.superClass.value)) != null ? J : /* @__PURE__ */ new Set();
      U.add(F.class.value), this.subClasses.set(F.superClass.value, U);
      const R = vr(F.superClassLabel);
      R && yr(R, n.get(F.superClass.value)) && n.set(F.superClass.value, R);
    }
    for (const [F, I] of n)
      this.superClassLabels.set(F, wr(I.value));
    try {
      localStorage.removeItem("sparql-overview-metadata");
    } catch (F) {
    }
    if (Object.keys(this.endpoints).length === 0)
      throw new Error("No endpoints provided. Please provide at least one SPARQL endpoint URL.");
    this.dom.style.height = "100%";
    const o = document.createElement("style");
    o.textContent = Va;
    const a = document.createElement("div");
    a.id = "sparql-overview", a.style.display = "flex", a.style.height = "100%";
    let h = "";
    for (const F of Object.keys(this.endpoints))
      h += `<p><a href="${F}" target="_blank"><code>${F}</code></a></p>`;
    const l = this.superClasses.size === 0 ? ' disabled title="Needs the class hierarchy"' : "", c = this.graphSets.map((F, I) => `<option value="${I}">${V(F.name)}</option>`), d = this.graphSets.length === 0 ? "" : `<select id="overview-graph-set" class="overview-graph-set" aria-label="Set of graphs shown" title="Show the graphs of a set; the checkboxes below change the selection"><option value="" disabled>Custom selection</option>${c.join("")}</select>`;
    a.innerHTML = `
      <div id="overview-settings" class="overview-panel">
        ${this.endpointChoiceHtml()}
        <div class="overview-search">
          ${ah}
          <input type="search" id="search-input" list="suggestions" placeholder="Search classes…" aria-label="Search classes">
          <datalist id="suggestions"></datalist>
          <button id="overview-show-info" class="overview-icon-button" hidden title="Information about this page" aria-label="Information about this page">${lh}</button>
        </div>
        <div class="overview-section" data-block="settings-graphs">
          <div class="overview-block-title overview-section-title" role="button" tabindex="0" aria-expanded="true">
            Graphs${wt}
            <span class="overview-title-actions">
              <button id="overview-show-clusters" title="Show the classes of all the graphs">All</button>
              <button id="overview-hide-clusters" title="Hide the classes of all the graphs">None</button>
            </span>
          </div>${d}
          <div id="overview-clusters-list" class="overview-list"></div>
        </div>
        <div class="overview-splitter" title="Drag to resize the sections, double click to make them even"></div>
        <div class="overview-section" data-block="settings-predicates">
          <div class="overview-block-title overview-section-title" role="button" tabindex="0" aria-expanded="true">
            Predicates${wt}
            <span class="overview-title-actions">
              <button id="overview-show-preds" title="Show the relations of all the predicates">All</button>
              <button id="overview-hide-preds" title="Hide the relations of all the predicates">None</button>
            </span>
          </div>
          <div id="overview-predicates-list" class="overview-list"></div>
        </div>
        <details class="overview-block" data-block="settings-options">
          <summary class="overview-block-title" title="Classes of a graph with similar relations to other classes are shown as one node, a group, and the first options decide which classes are grouped; the others hide more of the network besides the graphs and predicates filtered above, size the nodes and lay them out.">Settings${wt}</summary>
          <label class="overview-setting" title="Show each group of classes of a graph with similar relations as one node">
            <span>Group similar classes</span>
            <input type="checkbox" class="overview-switch-input" id="overview-group-classes" checked>
            <span class="overview-switch" aria-hidden="true"></span>
          </label>
          <fieldset id="overview-grouping-fieldset" class="overview-settings-group">
            <div class="overview-setting" title="The share of their relations to other classes two classes need in common to be grouped">
              <label for="overview-group-similarity">Similarity</label>
              <output id="overview-group-similarity-value" class="overview-value" for="overview-group-similarity">${fr(this.groupSimilarity)}</output>
            </div>
            <input type="range" id="overview-group-similarity" class="overview-range" min="0" max="1" step="0.01" value="${this.groupSimilarity}" title="The share of their relations to other classes two classes need in common to be grouped">
            <div class="overview-setting" title="How many levels above its classes the superclass naming or forming a group may be">
              <label for="overview-ancestor-distance">Superclass levels</label>
              <input type="number" id="overview-ancestor-distance" class="overview-number" min="0" step="1" value="${this.maxAncestorDistance}"${l}>
            </div>
            <label class="overview-setting" title="Make each group of a superclass and all the classes of a graph under it, none of them left out">
              <span>Group by superclass</span>
              <input type="checkbox" class="overview-switch-input" id="overview-group-by-ancestor"${this.groupByAncestor ? " checked" : ""}${l}>
              <span class="overview-switch" aria-hidden="true"></span>
            </label>
            <label class="overview-setting" title="Group similar classes of different graphs too; a group of several graphs takes the color of the graph of the most triples of its classes">
              <span>Group across graphs</span>
              <input type="checkbox" class="overview-switch-input" id="overview-group-across-graphs"${this.groupAcrossGraphs ? " checked" : ""}>
              <span class="overview-switch" aria-hidden="true"></span>
            </label>
          </fieldset>
          <div class="overview-settings-divider" role="separator"></div>
          <label class="overview-setting" title="Hide the classes and groups with no relation to another one shown, e.g. after hiding predicates or graphs">
            <span>Hide classes without relations</span>
            <input type="checkbox" class="overview-switch-input" id="overview-hide-isolated"${this.hideIsolatedClasses ? " checked" : ""}>
            <span class="overview-switch" aria-hidden="true"></span>
          </label>
          <label class="overview-setting" title="Hide the relations whose objects are classes, i.e. instances of owl:Class or rdfs:Class">
            <span>Hide relations to owl:Class and rdfs:Class</span>
            <input type="checkbox" class="overview-switch-input" id="overview-hide-metaclass-edges"${this.hideEdgesToMetaclasses ? " checked" : ""}>
            <span class="overview-switch" aria-hidden="true"></span>
          </label>
          <label class="overview-setting" title="Make a node bigger the more instances its classes have in the graphs shown, by the VoID description, on a logarithmic scale">
            <span>Size by instances</span>
            <input type="checkbox" class="overview-switch-input" id="overview-size-by-instances"${this.sizeByInstances ? " checked" : ""}>
            <span class="overview-switch" aria-hidden="true"></span>
          </label>
          <label class="overview-setting" title="Spread the classes over the whole area instead of keeping the round shape of the layout">
            <span>Fill the area</span>
            <input type="checkbox" class="overview-switch-input" id="overview-fill-area"${this.fillArea ? " checked" : ""}>
            <span class="overview-switch" aria-hidden="true"></span>
          </label>
        </details>
      </div>
      <div id="overview-settings-splitter" class="overview-panel-splitter" title="Drag to resize the settings, double click to reset their width"></div>

      <div id="loading-msg">
        <p style="margin: 0; text-align: center">Loading overview...</p>
      </div>
      <div id="network-container" width="100%" heigth="100%" style="flex: 1; display: flex; position: relative; align-items: center; justify-content: center; width: 100%; height: 100%;">
        <div id="overview-tools">
          <button id="overview-toggle-settings" class="overview-panel-toggle" aria-label="Settings and filters" aria-controls="overview-settings" aria-pressed="true">
            <svg viewBox="0 0 16 16" aria-hidden="true"><rect class="overview-panel-shown" x="2" y="3" width="4.5" height="10"/><rect x="1.5" y="2.5" width="13" height="11" rx="1.5"/><path d="M6.5 2.5v11"/></svg>
          </button>
          <button id="overview-toggle-details" class="overview-panel-toggle" aria-label="Details" aria-controls="overview-details" aria-pressed="true">
            <svg viewBox="0 0 16 16" aria-hidden="true"><rect class="overview-panel-shown" x="9.5" y="3" width="4.5" height="10"/><rect x="1.5" y="2.5" width="13" height="11" rx="1.5"/><path d="M9.5 2.5v11"/></svg>
          </button>
        </div>
        <div id="overview-view-tools">
          <span id="overview-zoom" title="Zoom of the view: at 100% it shows all the classes shown">100%</span>
          <div class="overview-view-buttons">
            <button id="overview-zoom-out" title="Zoom out" aria-label="Zoom out">${uh}</button>
            <button id="overview-zoom-in" title="Zoom in" aria-label="Zoom in">${fh}</button>
            <button id="overview-zoom-fit" title="Show all the classes shown (zoom 100%)" aria-label="Show all">${ph}</button>
          </div>
          <div class="overview-view-buttons">
            <button id="overview-rearrange" title="Rearrange: lay out the shown classes again, also those moved by hand; the hidden ones keep their places" aria-label="Rearrange">${dh}</button>
          </div>
        </div>
      </div>
      <div id="overview-details-splitter" class="overview-panel-splitter" title="Drag to resize the details, double click to reset their width"></div>
      <div id="overview-details" class="overview-panel">
        <div id="overview-edge-info"></div>
        <div id="overview-node-info"></div>
        <p id="overview-info-hint">Point at a class or a relation to see more about it</p>
      </div>
      <dialog id="overview-dialog-info" style="text-align: center;">
        <h4>
          Overview of classes and their relations for SPARQL endpoint${Object.keys(this.endpoints).length > 1 ? "s" : ""}
        </h4>
        ${h}
        <p style="margin-top: 1.5em;">
          This visualization uses informations about classes and their relations described using
          <a href="https://www.w3.org/TR/void/" target="_blank">VoID description</a> RDF uploaded to the endpoint, or added to the SPARQL service description.
        <p>
        </p>
          You can easily generate it for your endpoint with the
          <a href="https://github.com/JervenBolleman/void-generator" target="_blank"><code>void-generator</code></a> CLI tool.
        </p>
        <p>
          <a href="https://github.com/sib-swiss/sparql-editor/tree/main/packages/sparql-overview" target="_blank">
            Web component source code available
          </a>
        </p>
        <p style="opacity: 60%; margin: 1.5em 0;">
          💡 <code>shift + left click</code> to select multiple nodes.
        </p>
        <p style="opacity: 60%; margin: 1.5em 0;">
          💡 <code>double click</code> a group of classes to show its classes, and one of them to group them again.
        </p>
        <button id="overview-close-info">Close</button>
      </dialog>
    `, this.dom.appendChild(o), this.dom.appendChild(a);
    const f = a.querySelector("#overview-show-info"), w = a.querySelector("#overview-dialog-info");
    f.addEventListener("click", () => ke(this, null, function* () {
      w.showModal(), this.dialogElOpen = w, history.pushState({ dialogOpen: !0 }, "");
    })), a.querySelector("#overview-close-info").addEventListener("click", () => ke(this, null, function* () {
      w.close();
    })), w.addEventListener("close", () => ke(this, null, function* () {
      this.dialogElOpen = null;
    })), this.dom.addEventListener("render", this.onRender);
    const u = a.querySelector("#overview-group-classes"), p = a.querySelector("#overview-grouping-fieldset");
    u.addEventListener("change", () => {
      this.grouping = u.checked, p.disabled = !this.grouping, this.expandedGroups.clear(), this.refreshGraph();
    });
    const E = a.querySelector("#overview-group-similarity"), m = a.querySelector("#overview-group-similarity-value");
    E.addEventListener("input", () => {
      m.textContent = fr(E.valueAsNumber);
    }), E.addEventListener("change", () => {
      this.groupSimilarity = E.valueAsNumber, this.regroup();
    });
    const x = a.querySelector("#overview-ancestor-distance");
    x.addEventListener("change", () => {
      const F = Math.round(x.valueAsNumber);
      if (Number.isNaN(F) || F < 0) {
        x.value = String(this.maxAncestorDistance);
        return;
      }
      x.value = String(F), this.maxAncestorDistance = F, this.regroup();
    });
    const g = a.querySelector("#overview-group-by-ancestor");
    g.addEventListener("change", () => {
      this.groupByAncestor = g.checked, this.regroup();
    });
    const y = a.querySelector("#overview-group-across-graphs");
    y.addEventListener("change", () => {
      this.groupAcrossGraphs = y.checked, this.regroup();
    });
    const b = a.querySelector("#overview-hide-isolated");
    b.addEventListener("change", () => {
      this.hideIsolatedClasses = b.checked, this.refreshFilters();
    });
    const S = a.querySelector("#overview-hide-metaclass-edges");
    S.addEventListener("change", () => {
      this.hideEdgesToMetaclasses = S.checked, this.renderPredicatesFilter(), this.refreshFilters();
    });
    const k = a.querySelector("#overview-size-by-instances");
    k.addEventListener("change", () => {
      this.sizeByInstances = k.checked, this.refreshGraph();
    }), this.initPanels(a), this.initBlocks(a), this.initDetails(a), this.initCopy(a), this.initEndpointChoice(a), a.querySelector("#overview-show-preds").addEventListener("click", () => {
      a.querySelectorAll("#overview-predicates-list input[type='checkbox']").forEach((I) => {
        I.checked = !0;
      }), this.hidePredicates.clear(), this.refreshFilters();
    }), a.querySelector("#overview-hide-preds").addEventListener("click", () => {
      a.querySelectorAll("#overview-predicates-list input[type='checkbox']").forEach((I) => {
        I.checked = !1;
      }), this.hidePredicates = new Set(Object.keys(this.predicates)), this.refreshFilters();
    }), a.querySelector("#overview-show-clusters").addEventListener("click", () => {
      a.querySelectorAll("#overview-clusters-list input[type='checkbox']").forEach((I) => {
        I.checked = !0;
      }), this.hideClusters.clear(), this.updateGraphSetChoice(), this.renderPredicatesFilter(), this.refreshGraphFilter();
    }), a.querySelector("#overview-hide-clusters").addEventListener("click", () => {
      a.querySelectorAll("#overview-clusters-list input[type='checkbox']").forEach((I) => {
        I.checked = !1;
      }), this.hideClusters = new Set(Object.keys(this.clusters)), this.updateGraphSetChoice(), this.renderPredicatesFilter(), this.refreshGraphFilter();
    });
    const _ = a.querySelector("#overview-graph-set");
    _ == null || _.addEventListener("change", () => this.showGraphSet(this.graphSets[Number(_.value)])), this.initialize(), window.addEventListener("popstate", this.onPopState);
  }
  // Take the overview down, so that the element can show another one: its renderer with the WebGL contexts, the
  // animations, the observer of the size of the network, the listeners outside its content, and the content
  destroy() {
    var e, t, i;
    this.destroyed = !0, (e = this.stopAnimation) == null || e.call(this), this.stopAnimation = void 0, (t = this.renderer) == null || t.kill(), this.renderer = void 0, (i = this.resizeObserver) == null || i.disconnect(), this.dom.removeEventListener("render", this.onRender), window.removeEventListener("popstate", this.onPopState), this.dom.replaceChildren();
  }
  // Let the splitters resize the panels beside the network and the sections of the settings, and the toggles over the
  // network hide and show the panels; the sizes and the hidden panels are kept for the next time, and a double click on a
  // splitter resets the sizes
  initPanels(e) {
    const t = [
      { name: "settings", label: "the settings and filters", grows: 1 },
      { name: "details", label: "the details of the class or relation pointed at or selected", grows: -1 }
    ].map((c) => _e(le({}, c), {
      element: e.querySelector(`#overview-${c.name}`),
      splitter: e.querySelector(`#overview-${c.name}-splitter`),
      toggle: e.querySelector(`#overview-toggle-${c.name}`)
    })), i = [...e.querySelectorAll(".overview-section")], r = (c) => e.classList.contains(`overview-${c.name}-hidden`), n = (c, d) => {
      e.classList.toggle(`overview-${c.name}-hidden`, d), c.toggle.setAttribute("aria-pressed", String(!d)), c.toggle.title = `${d ? "Show" : "Hide"} ${c.label}`;
    }, o = (c) => {
      var d, f, w, v, u;
      for (const p of t) {
        const E = (d = c.widths) == null ? void 0 : d[p.name];
        p.element.style.width = E ? `${E}px` : "", n(p, (w = (f = c.hidden) == null ? void 0 : f.includes(p.name)) != null ? w : !1);
      }
      for (const p of i)
        p.style.flexGrow = String((u = (v = c.sections) == null ? void 0 : v[p.dataset.block]) != null ? u : 1);
    }, a = () => this.keepSizes({
      widths: Object.fromEntries(t.filter((c) => c.element.style.width).map((c) => [c.name, parseFloat(c.element.style.width)])),
      sections: Object.fromEntries(i.map((c) => [c.dataset.block, parseFloat(c.style.flexGrow) || 1])),
      hidden: t.filter(r).map((c) => c.name)
    });
    try {
      const c = this.keptSizes();
      (typeof c.sections != "object" || Array.isArray(c.sections)) && delete c.sections, o(c);
    } catch (c) {
      o({});
    }
    const h = (c, d) => {
      c.addEventListener("pointerdown", (f) => {
        if (f.button !== 0)
          return;
        f.preventDefault(), c.setPointerCapture(f.pointerId), c.classList.add("dragging");
        const w = d(), v = (p) => w(p.clientX - f.clientX, p.clientY - f.clientY), u = () => {
          c.removeEventListener("pointermove", v), c.removeEventListener("pointerup", u), c.removeEventListener("pointercancel", u), c.classList.remove("dragging"), a();
        };
        c.addEventListener("pointermove", v), c.addEventListener("pointerup", u), c.addEventListener("pointercancel", u);
      });
    };
    for (const c of t)
      h(c.splitter, () => {
        const d = c.element.getBoundingClientRect().width, f = t.some((v) => v !== c && !r(v)), w = e.getBoundingClientRect().width * (f ? xr / 2 : xr);
        return (v) => c.element.style.width = `${Math.max(gh, Math.min(w, d + c.grows * v))}px`;
      }), c.splitter.addEventListener("dblclick", () => {
        c.element.style.width = "", a();
      }), c.toggle.addEventListener("click", () => {
        n(c, !r(c)), a();
      });
    e.querySelectorAll(".overview-splitter").forEach((c, d) => {
      h(c, () => {
        const f = i.map((v) => v.getBoundingClientRect().height), w = f[d] + f[d + 1];
        return (v, u) => {
          const p = Math.max(Er, Math.min(w - Er, f[d] + u));
          i.forEach((E, m) => {
            E.style.flexGrow = String(m === d ? p : m === d + 1 ? w - p : f[m]);
          });
        };
      }), c.addEventListener("dblclick", () => {
        for (const f of i)
          f.style.flexGrow = "1";
        a();
      });
    });
    const l = e.querySelector("#network-container");
    typeof ResizeObserver != "undefined" && (this.resizeObserver = new ResizeObserver(() => {
      this.renderer && (this.scaleNodes(), this.fitShown(), this.renderer.scheduleRefresh());
    }), this.resizeObserver.observe(l));
  }
  // The sizes kept for the next time, see PanelSizes
  keptSizes() {
    var e;
    try {
      const t = JSON.parse((e = localStorage.getItem(br)) != null ? e : "{}");
      return t && typeof t == "object" ? t : {};
    } catch (t) {
      return {};
    }
  }
  // Keep the given sizes for the next time, with the others kept before
  keepSizes(e) {
    try {
      localStorage.setItem(br, JSON.stringify(le(le({}, this.keptSizes()), e)));
    } catch (t) {
    }
  }
  // Let the blocks of both panels collapse, a block collapsed staying so in the details of other nodes and the next
  // time, and one collapsed by default (see collapsedByDefault) staying open once opened: those of the details and the
  // settings are details elements, the sections of the filters, which share the height of the panel, collapse by their
  // titles
  initBlocks(e) {
    const { collapsed: t, expanded: i } = this.keptSizes(), r = Array.isArray(i) ? i : [];
    this.collapsedBlocks = /* @__PURE__ */ new Set([
      ...Array.isArray(t) ? t : [],
      ...[...Xt].filter((o) => !r.includes(o))
    ]);
    const n = (o, a) => {
      a ? this.collapsedBlocks.delete(o) : this.collapsedBlocks.add(o), this.keepSizes({
        collapsed: [...this.collapsedBlocks].filter((h) => !Xt.has(h)),
        expanded: [...Xt].filter((h) => !this.collapsedBlocks.has(h))
      });
    };
    e.addEventListener("toggle", (o) => {
      var l;
      const a = o.target, h = (l = a.dataset) == null ? void 0 : l.block;
      h && a.open === this.collapsedBlocks.has(h) && n(h, a.open);
    }, !0), e.querySelectorAll("#overview-settings details.overview-block").forEach((o) => {
      o.open = !this.collapsedBlocks.has(o.dataset.block);
    }), e.querySelectorAll(".overview-section").forEach((o) => {
      const a = o.dataset.block, h = o.querySelector(".overview-section-title"), l = (d) => {
        o.classList.toggle("collapsed", !d), h.setAttribute("aria-expanded", String(d));
      };
      l(!this.collapsedBlocks.has(a));
      const c = () => {
        const d = o.classList.contains("collapsed");
        l(d), n(a, d);
      };
      h.addEventListener("click", (d) => {
        d.target.closest("button") || c();
      }), h.addEventListener("keydown", (d) => {
        d.target !== h || d.key !== "Enter" && d.key !== " " || (d.preventDefault(), c());
      });
    });
  }
  // Let the details select the classes and nodes they name, show the groups as their classes and back, list the other
  // classes of a predicate, and copy IRIs
  initDetails(e) {
    const t = e.querySelector("#overview-details");
    t.addEventListener("click", (i) => {
      const r = i.target.closest("button");
      if (!r || !t.contains(r))
        return;
      i.preventDefault();
      const n = r.dataset;
      n.class ? this.selectClass(n.class) : n.node ? this.selectNode(n.node, this.selectedClass) : n.expand ? this.expandGroup(n.expand, n.select) : n.collapse ? this.collapseGroup(n.collapse) : n.more && n.for && this.showMore(r, n.for, n.more);
    });
  }
  // The field of the endpoint at the top of the left panel, when endpoints are offered, alike the search of classes: it
  // shows the URL of the endpoint shown and suggests those offered, by their names, and takes any other one
  endpointChoiceHtml() {
    var i;
    if (this.endpointChoices.length === 0)
      return "";
    const e = (i = Object.keys(this.endpoints)[0]) != null ? i : "", t = this.endpointChoices.map((r) => `<option value="${V(r.url)}" label="${V(r.name)}"></option>`);
    return `<div class="overview-search overview-endpoint-choice">${hh}<input type="url" id="overview-endpoint" list="overview-endpoints" value="${V(e)}" placeholder="${V(e)}" aria-label="SPARQL endpoint" spellcheck="false" title="The SPARQL endpoint whose classes are shown: choose one of those suggested, or write another one and press Enter"><datalist id="overview-endpoints">${t.join("")}</datalist></div>`;
  }
  // Let the field of the endpoint call onEndpointChoice() with an endpoint picked among those suggested, or with the
  // one written in when Enter is pressed; the field is emptied while it has the focus, so that it suggests all the
  // endpoints offered, with the one shown in its placeholder, and gets the one shown back when it is left empty, or on
  // Escape
  initEndpointChoice(e) {
    var o;
    const t = e.querySelector("#overview-endpoint");
    if (!t)
      return;
    const i = (o = Object.keys(this.endpoints)[0]) != null ? o : "", r = new Set(this.endpointChoices.map((a) => a.url)), n = (a) => {
      var h;
      a && a !== i && ((h = this.onEndpointChoice) == null || h.call(this, a));
    };
    t.addEventListener("focus", () => t.value = ""), t.addEventListener("blur", () => {
      t.value.trim() || (t.value = i);
    }), t.addEventListener("input", (a) => {
      const h = a.inputType;
      r.has(t.value) && (!h || h === "insertReplacementText") && n(t.value);
    }), t.addEventListener("keydown", (a) => {
      a.key === "Enter" ? n(t.value.trim()) : a.key === "Escape" && (t.value = i, t.blur());
    });
  }
  // Let the buttons beside the IRIs in both panels copy them, see copyButton(); one in a row of a filter, a label, does
  // not change the checkbox of the row, as it is a button
  initCopy(e) {
    const t = (i) => {
      var r;
      return (r = navigator.clipboard) == null ? void 0 : r.writeText(i.dataset.copy).then(() => {
        i.classList.add("copied"), setTimeout(() => i.classList.remove("copied"), 1500);
      }, () => {
      });
    };
    e.addEventListener("click", (i) => {
      const r = i.target.closest("[data-copy]");
      !r || !e.contains(r) || (i.preventDefault(), i.stopPropagation(), t(r));
    }, !0), e.addEventListener("keydown", (i) => {
      const r = i.target.closest("span[data-copy]");
      !r || i.key !== "Enter" && i.key !== " " || (i.preventDefault(), i.stopPropagation(), t(r));
    }, !0);
  }
  initialize() {
    return ke(this, null, function* () {
      yield this.initGraph(), yield this.renderGraph();
      const e = this.dom.querySelector("#loading-msg");
      e.style.color != "red" && (e.style.display = "none");
    });
  }
  // Initialize the graph by retrieving metadata from the SPARQL endpoints
  initGraph() {
    return ke(this, null, function* () {
      var E, m, x, g, y;
      const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), i = (b, S, k) => {
        const C = b === t, A = vr(k, C);
        S && A && yr(A, b.get(S), C) && b.set(S, A);
      };
      for (const b of Object.values(this.endpoints))
        for (const S of b != null ? b : [])
          i(e, (E = S.graph) == null ? void 0 : E.value, S.graphLabel), i(e, (m = S.linksetGraph) == null ? void 0 : m.value, S.linksetGraphLabel), i(e, S.subjectClass.value, S.subjectClassLabel), i(t, S.subjectClass.value, S.subjectClassComment), i(e, S.prop.value, S.propLabel), i(t, S.prop.value, S.propComment), i(e, (x = S.objectClass) == null ? void 0 : x.value, S.objectClassLabel), i(t, (g = S.objectClass) == null ? void 0 : g.value, S.objectClassComment);
      const r = (b) => new Map([...b].map(([S, k]) => [S, k.value])), n = this.labels = r(e), o = this.comments = r(t), a = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), d = (b) => {
        var S;
        return (S = n.get(b)) != null ? S : this.getCurie(b);
      }, f = (b, S, k) => {
        var A;
        if (S === at)
          return;
        a.has(b) || a.set(b, /* @__PURE__ */ new Map());
        const C = a.get(b);
        C.set(S, ((A = C.get(S)) != null ? A : 0) + (k.triples ? parseInt(k.triples.value) : 1));
      };
      for (const [b, S] of Object.entries(this.endpoints))
        if (S)
          for (const k of S) {
            const C = k.triples ? parseInt(k.triples.value) : 5;
            this.dataClasses.add(k.subjectClass.value), k.objectClass && this.dataClasses.add(k.objectClass.value);
            const A = k.subjectClass.value, G = k.graph ? d(k.graph.value) : at;
            k.graph && this.graphNames.set(k.graph.value, G);
            const N = this.getCurie(A);
            this.classGraph.hasNode(A) || this.classGraph.addNode(A, {
              label: N,
              curie: N,
              // count: 1,
              size: qt,
              cluster: G,
              endpoints: [],
              datatypes: []
            }), f(A, G, k);
            const _ = this.deprecatedProperties.has(k.prop.value);
            if (k.triples && !_ && (h.has(A) || h.set(A, /* @__PURE__ */ new Map()), h.get(A).set(`${b}
${G}
${k.prop.value}`, parseInt(k.triples.value))), k.entities && (l.has(A) || l.set(A, /* @__PURE__ */ new Map()), l.get(A).set(`${b}
${G}`, parseInt(k.entities.value))), this.classGraph.updateNodeAttribute(A, "count", (z) => z + C), this.classGraph.updateNodeAttribute(A, "endpoints", (z) => z.includes(b) ? z : [...z, b]), k.objectDatatype && !_) {
              const z = this.classGraph.getNodeAttribute(A, "datatypes");
              let W = z.find((L) => L.predUri === k.prop.value && L.datatypeUri === k.objectDatatype.value);
              W || (W = {
                predCurie: this.getCurie(k.prop.value),
                predUri: k.prop.value,
                datatypeCurie: this.getCurie(k.objectDatatype.value),
                datatypeUri: k.objectDatatype.value,
                // the triples of the whole property partition, when its datatype partitions have none
                count: k.triples ? parseInt(k.triples.value) : void 0,
                graphTriples: /* @__PURE__ */ new Map()
              }, z.push(W)), k.datatypeTriples && pr(W.graphTriples, G, parseInt(k.datatypeTriples.value));
            }
            if (k.objectClass && !k.objectDatatype && k.prop.value !== th && !_) {
              const z = k.objectClass.value;
              if (!this.classGraph.hasNode(z)) {
                const B = this.getCurie(z);
                this.classGraph.addNode(z, {
                  label: B,
                  curie: B,
                  // count: 1,
                  size: qt,
                  cluster: G,
                  endpoints: [],
                  datatypes: []
                });
              }
              this.classGraph.updateNodeAttribute(z, "endpoints", (B) => B.includes(b) ? B : [...B, b]), f(z, G, k);
              const W = this.getCurie(k.prop.value);
              let L = this.classGraph.outEdges(A, z).find((B) => this.classGraph.getEdgeAttribute(B, "curie") === W);
              if (L === void 0) {
                const B = {
                  label: W,
                  curie: W,
                  uri: k.prop.value,
                  count: C,
                  type: "arrow"
                };
                k.triples && (B.triples = parseInt(k.triples.value)), L = this.classGraph.addEdge(A, z, B);
              }
              const T = k.linksetGraph ? d(k.linksetGraph.value) : G;
              k.linksetGraph && this.graphNames.set(k.linksetGraph.value, T), c.has(L) || c.set(L, /* @__PURE__ */ new Set()), c.get(L).add(T), k.linksetTriples && (this.classGraph.hasEdgeAttribute(L, "graphTriples") || this.classGraph.setEdgeAttribute(L, "graphTriples", /* @__PURE__ */ new Map()), pr(this.classGraph.getEdgeAttribute(L, "graphTriples"), T, parseInt(k.linksetTriples.value)));
            }
          }
      this.classGraph.forEachNode((b) => {
        var _, z, W, L, T, B;
        const S = [...(z = (_ = h.get(b)) == null ? void 0 : _.values()) != null ? z : []].reduce(($, j) => $ + j, 0);
        this.classGraph.setNodeAttribute(b, "triples", S);
        const k = /* @__PURE__ */ new Map();
        for (const [$, j] of (W = l.get(b)) != null ? W : []) {
          const K = $.slice($.indexOf(`
`) + 1);
          k.set(K, ((L = k.get(K)) != null ? L : 0) + j);
        }
        this.classGraph.setNodeAttribute(b, "instances", k);
        const C = wr((T = n.get(b)) != null ? T : "");
        C && this.classGraph.mergeNodeAttributes(b, { label: C, displayLabel: C });
        const A = o.get(b);
        A && this.classGraph.setNodeAttribute(b, "comment", A);
        const G = [...(B = a.get(b)) != null ? B : []].sort(($, j) => j[1] - $[1] || $[0].localeCompare(j[0])), N = G.length > 0 ? G.map(([$]) => $) : [at];
        this.classGraph.mergeNodeAttributes(b, { cluster: N[0], clusters: N });
      }), this.classGraph.forEachEdge((b, S) => {
        var N;
        const k = [...(N = c.get(b)) != null ? N : []], C = k.filter((_) => _ !== at);
        this.classGraph.setEdgeAttribute(b, "graphs", C.length > 0 ? C : k);
        const A = n.get(S.uri);
        A && this.classGraph.mergeEdgeAttributes(b, { label: A, displayLabel: A });
        const G = o.get(S.uri);
        G && this.classGraph.setEdgeAttribute(b, "comment", G);
      });
      const w = [...this.dataClasses];
      for (; w.length > 0; ) {
        const b = w.pop();
        this.leadsToData.has(b) || (this.leadsToData.add(b), w.push(...(y = this.superClasses.get(b)) != null ? y : []));
      }
      if (this.classGraph.order < 2) {
        this.displayMsg(`No VoID description found in endpoints ${Object.keys(this.endpoints).join(", ")}`, !0);
        return;
      }
      this.classGraph.forEachNode((b, S) => {
        for (const k of S.clusters)
          this.clusters[k] ? this.clusters[k].count += 1 : this.clusters[k] = { label: k, positions: [], count: 1, endpoint: [...S.endpoints][0] };
      });
      for (const b in this.clusters)
        this.clusters[b].count === 0 && delete this.clusters[b];
      const v = this.graphSets.find((b) => b.name === this.initialGraphSet);
      if (v)
        this.hideClusters = this.hiddenBy(v);
      else
        for (const b of this.hiddenGraphs)
          this.hideClusters.add(d(b));
      const u = ga(Object.keys(this.clusters).length, { seed: "topClassesClusters" });
      for (const b in this.clusters)
        this.clusters[b].color = u.pop();
      let p = 0;
      for (const b in this.clusters) {
        const S = p * 2 * Math.PI / Object.keys(this.clusters).length;
        p++;
        const k = 200;
        this.clusterPositions[b] = {
          x: k * Math.cos(S),
          y: k * Math.sin(S)
        };
      }
      this.computeGroups(), this.buildGraph();
    });
  }
  // Group the classes of each graph whose relations to other classes (direction, predicate and the other class) are
  // similar to those of the class of most relations among them, see similar(); with groupByAncestor a group is all the
  // classes under a superclass, see ancestorGroups(), otherwise a group is open to any similar class, see similarGroups().
  // The groups are those of the graphs the filter shows: a class belongs to the one of its graphs shown where it has the
  // most triples, which also colors it, and its relations are those of the graphs shown to the classes shown; the
  // classes of no graph shown, which the filter hides, are not grouped. The groups expanded stay so where they remain.
  computeGroups() {
    this.classGraph.forEachNode((i, r) => {
      const n = r.clusters.find((o) => !this.hideClusters.has(o));
      this.classGraph.setNodeAttribute(i, "cluster", n != null ? n : r.clusters[0]);
    });
    const e = /* @__PURE__ */ new Map();
    this.classGraph.forEachNode((i, r) => {
      this.hiddenByGraphs(r) || e.set(i, /* @__PURE__ */ new Set());
    }), this.classGraph.forEachEdge((i, r, n, o) => {
      !e.has(n) || !e.has(o) || this.edgeHiddenByGraphs(r) || (e.get(n).add(`> ${r.uri} ${o}`), e.get(o).add(`< ${r.uri} ${n}`));
    });
    const t = this.groupByAncestor ? this.ancestorGroups(e) : this.similarGroups(e);
    this.groups.clear(), this.groupOf.clear();
    for (const { cluster: i, members: r, named: n } of t) {
      const o = `group ${r[0]}`;
      this.groups.set(o, le(le({ key: o, cluster: i, members: r }, this.groupLabels(r, n)), n));
      for (const a of r)
        this.groupOf.set(a, o);
    }
    this.expandedGroups = new Set([...this.expandedGroups].filter((i) => this.groups.has(i)));
  }
  // Whether two sets of relations have a Jaccard index of at least groupSimilarity
  similar(e, t) {
    let i = 0;
    for (const n of e)
      t.has(n) && i++;
    const r = e.size + t.size - i;
    return r === 0 || i / r >= this.groupSimilarity;
  }
  // A group starts with the class of most relations not grouped yet and takes the classes of its graph similar to it;
  // it is named by the superclass most of them fall under, see commonAncestor()
  similarGroups(e) {
    const t = [], i = [...e.keys()].sort((r, n) => e.get(n).size - e.get(r).size);
    for (const r of i) {
      const n = this.classGraph.getNodeAttribute(r, "cluster"), o = t.find((a) => (this.groupAcrossGraphs || a.cluster === n) && this.similar(a.relations, e.get(r)));
      o ? o.members.push(r) : t.push({ cluster: n, relations: e.get(r), members: [r] });
    }
    return t.filter((r) => r.members.length >= 2).map(({ members: r }) => ({ cluster: this.groupCluster(r), members: r, named: this.commonAncestor(r) }));
  }
  // A group is a superclass (or a class) and all the classes of a graph under it, at most maxAncestorDistance levels
  // below it and similar to the one of most relations among them; the largest such sets go first, and a class joins
  // one group at most, so a superclass some of whose classes are in another group forms none
  ancestorGroups(e) {
    const t = /* @__PURE__ */ new Map();
    this.classGraph.forEachNode((o, a) => {
      if (e.has(o))
        for (const [h, l] of this.ancestorsOf(o, 1 / 0)) {
          if (ur.has(h))
            continue;
          const c = this.groupAcrossGraphs ? h : `${a.cluster}
${h}`;
          t.has(c) || t.set(c, { ancestor: h, cluster: a.cluster, classes: /* @__PURE__ */ new Map() }), t.get(c).classes.set(o, l);
        }
    });
    const i = [...t.values()].map(({ ancestor: o, cluster: a, classes: h }) => ({
      ancestor: o,
      cluster: a,
      members: [...h.keys()],
      farthest: Math.max(...h.values())
    })).filter((o) => o.members.length >= 2 && o.farthest <= this.maxAncestorDistance).sort((o, a) => a.members.length - o.members.length || o.farthest - a.farthest || o.ancestor.localeCompare(a.ancestor)), r = /* @__PURE__ */ new Set(), n = [];
    for (const { ancestor: o, members: a } of i)
      if (!a.some((h) => r.has(h)) && (a.sort((h, l) => e.get(l).size - e.get(h).size), !!a.every((h) => this.similar(e.get(a[0]), e.get(h))))) {
        for (const h of a)
          r.add(h);
        n.push({ cluster: this.groupCluster(a), members: a, named: { ancestor: o, covered: a.length } });
      }
    return n;
  }
  // A class and its superclasses at most maxDistance levels up, with their distances
  ancestorsOf(e, t) {
    var n;
    const i = /* @__PURE__ */ new Map([[e, 0]]);
    let r = [e];
    for (let o = 1; o <= t && r.length > 0; o++) {
      const a = [];
      for (const h of r)
        for (const l of (n = this.superClasses.get(h)) != null ? n : [])
          i.has(l) || (i.set(l, o), a.push(l));
      r = a;
    }
    return i;
  }
  // The superclass most classes of a group fall under, at most maxAncestorDistance levels up, the nearest of such ones
  // (a class of the group itself may be the one); none when fewer than half of the classes fall under it
  commonAncestor(e) {
    var r;
    const t = /* @__PURE__ */ new Map();
    for (const n of e)
      for (const [o, a] of this.ancestorsOf(n, this.maxAncestorDistance))
        ur.has(o) || t.set(o, [...(r = t.get(o)) != null ? r : [], a]);
    const i = [...t].map(([n, o]) => ({
      ancestor: n,
      covered: o.length,
      farthest: Math.max(...o),
      total: o.reduce((a, h) => a + h, 0)
    })).filter((n) => n.covered >= 2 && n.covered * 2 >= e.length).sort((n, o) => o.covered - n.covered || n.farthest - o.farthest || n.total - o.total || n.ancestor.localeCompare(o.ancestor));
    return i.length > 0 ? { ancestor: i[0].ancestor, covered: i[0].covered } : void 0;
  }
  // The label of a class or a superclass
  classLabel(e) {
    var t;
    return this.classGraph.hasNode(e) ? this.classGraph.getNodeAttribute(e, "label") : (t = this.superClassLabels.get(e)) != null ? t : this.getCurie(e);
  }
  // The graph of a group: that of its classes, or, of a group of several graphs, see groupAcrossGraphs, the one of the
  // most triples of its classes
  groupCluster(e) {
    var i, r;
    const t = /* @__PURE__ */ new Map();
    for (const n of e) {
      const o = this.classGraph.getNodeAttribute(n, "cluster");
      t.set(o, ((i = t.get(o)) != null ? i : 0) + ((r = this.classGraph.getNodeAttribute(n, "triples")) != null ? r : 0));
    }
    return [...t].sort((n, o) => o[1] - n[1] || n[0].localeCompare(o[0]))[0][0];
  }
  // The instances of a class in its graph, the one shown where it has the most triples, see computeGroups()
  ownInstances(e) {
    return this.instancesIn(e, this.classGraph.getNodeAttribute(e, "cluster"));
  }
  // Where the details count the instances of classes, each in its graph: the graph of them all, or the graphs of the
  // classes of a group of several graphs, see groupAcrossGraphs
  instancesWhere(e) {
    const t = new Set(e.map((i) => this.classGraph.getNodeAttribute(i, "cluster")));
    return t.size === 1 ? [...t][0] : "the graphs of the classes";
  }
  // The instances of a class in a graph, when the VoID description gives them
  instancesIn(e, t) {
    var i;
    return (i = this.classGraph.getNodeAttribute(e, "instances")) == null ? void 0 : i.get(t);
  }
  // The label of a group of classes of a graph in the network: the superclass naming it, if any, and its classes of
  // most instances in the graph, the most represented ones, a line each, then a line with the number of the others; and
  // its name in one line: the superclass, or its first two classes, followed by an ellipsis when it does not name all of
  // them, and the number of its classes. A label is shown once, those differing only in case too, see distinctTexts()
  groupLabels(e, t) {
    const i = (u) => this.classGraph.getNodeAttribute(u, "label"), r = (u) => {
      var p;
      return (p = this.ownInstances(u)) != null ? p : -1;
    }, n = (u) => {
      var p;
      return (p = this.classGraph.getNodeAttribute(u, "triples")) != null ? p : 0;
    }, o = e.map((u, p) => ({ member: u, i: p })).sort((u, p) => r(p.member) - r(u.member) || n(p.member) - n(u.member) || u.i - p.i).map(({ member: u }) => u), a = nh([
      ...t ? [this.classLabel(t.ancestor)] : [],
      ...o.filter((u) => u !== (t == null ? void 0 : t.ancestor)).map(i)
    ]), h = t ? a[0] : void 0, l = t ? a.slice(1) : a, c = t ? Sr - 1 : Sr, d = l.length <= c ? l : [...l.slice(0, c - 1), `+ ${l.length - c + 1} more`];
    h !== void 0 && d.unshift(h);
    const f = t ? t.covered < e.length : l.length > 1, w = t ? `${h}${f ? ", …" : ""} (${e.length})` : `${l.slice(0, 2).join(", ")}${l.length > 2 ? ", …" : ""} (${e.length})`, v = `${t ? h : l[0]}${f ? ", …" : ""} (${e.length})`;
    return { label: d.join(`
`), shortLabel: v, name: w, titled: t !== void 0 };
  }
  // The data properties of the classes of a group, the counts of the same ones summed
  mergeDatatypes(e) {
    var i, r;
    const t = /* @__PURE__ */ new Map();
    for (const n of e)
      for (const o of this.classGraph.getNodeAttribute(n, "datatypes")) {
        const a = `${o.predUri} ${o.datatypeUri}`, h = t.get(a);
        if (!h) {
          t.set(a, _e(le({}, o), { graphTriples: new Map(o.graphTriples) }));
          continue;
        }
        o.count !== void 0 && (h.count = ((i = h.count) != null ? i : 0) + o.count);
        for (const [l, c] of o.graphTriples)
          h.graphTriples.set(l, ((r = h.graphTriples.get(l)) != null ? r : 0) + c);
      }
    return [...t.values()];
  }
  // Fill the shown graph from the graph of classes, each group of similar classes not expanded being one node; the nodes
  // keep their positions, and a new node starts where its classes were shown, e.g. a group where its classes were and
  // the classes of a group where the group was
  buildGraph(e = !1) {
    var w;
    const t = this.layoutPositions, i = this.shownAs;
    this.shownAs = /* @__PURE__ */ new Map();
    const r = (v) => {
      var u;
      return this.grouping && !this.expandedGroups.has((u = this.groupOf.get(v)) != null ? u : "");
    }, n = (v) => this.groupOf.has(v) && r(v) ? this.groupOf.get(v) : v, o = new ee({ multi: !0 });
    if (this.classGraph.forEachNode((v, u) => {
      const p = n(v);
      if (this.shownAs.set(v, p), o.hasNode(p))
        return;
      const E = this.groups.get(p);
      if (!E) {
        const g = this.grouping ? this.groupOf.get(v) : void 0;
        o.addNode(p, g ? _e(le({}, u), { group: g }) : le({}, u));
        return;
      }
      const m = /* @__PURE__ */ new Set(), x = /* @__PURE__ */ new Set([E.cluster]);
      for (const g of E.members) {
        for (const y of this.classGraph.getNodeAttribute(g, "endpoints"))
          m.add(y);
        for (const y of this.classGraph.getNodeAttribute(g, "clusters"))
          x.add(y);
      }
      o.addNode(p, {
        label: E.label,
        shortLabel: E.shortLabel,
        name: E.name,
        labelTitle: E.titled,
        members: E.members,
        type: "group",
        size: qt + 2 * Math.log2(E.members.length),
        cluster: E.cluster,
        clusters: [...x],
        endpoints: [...m],
        datatypes: this.mergeDatatypes(E.members)
      });
    }), this.classGraph.forEachEdge((v, u, p, E) => {
      const m = n(p), x = n(E), g = dr.has(E), y = o.outEdges(m, x).find((S) => o.getEdgeAttribute(S, "uri") === u.uri && o.getEdgeAttribute(S, "toMetaclass") === g), b = this.edgeTriples(u);
      if (y === void 0) {
        o.addEdge(m, x, _e(le({}, u), { toMetaclass: g, weight: b }));
        return;
      }
      o.updateEdgeAttributes(y, (S) => {
        var k;
        return _e(le({}, S), {
          count: S.count + u.count,
          weight: b === void 0 ? S.weight : Math.max((k = S.weight) != null ? k : 0, b),
          graphs: [.../* @__PURE__ */ new Set([...S.graphs, ...u.graphs])]
        });
      });
    }), this.sizeByInstances) {
      const v = new Map(o.mapNodes((p, E) => {
        var m;
        return [
          p,
          Math.max(...((m = E.members) != null ? m : [p]).map((x) => this.shownInstances(x)))
        ];
      })), u = Math.log10(1 + Math.max(0, ...v.values()));
      if (u > 0)
        for (const [p, E] of v)
          o.setNodeAttribute(p, "size", hr + (ih - hr) * Math.log10(1 + E) / u);
    }
    const a = o.reduceEdges((v, u, p) => {
      var E;
      return Math.max(v, (E = p.weight) != null ? E : 0);
    }, 0);
    o.forEachEdge((v, u) => {
      u.size = u.weight && a > 0 ? 1 + (Ah - 1) * Math.log10(1 + u.weight) / Math.log10(1 + a) : 1;
    });
    let h = 0;
    if (t.size > 1) {
      const v = [...t.values()].map((p) => p.x), u = [...t.values()].map((p) => p.y);
      h = Math.max(Math.max(...v) - Math.min(...v), Math.max(...u) - Math.min(...u));
    }
    const l = h > 0 ? h / 40 : 20, c = /* @__PURE__ */ new Map();
    o.forEachNode((v, u) => {
      var E;
      const p = t.get(v);
      if (p)
        c.set(v, p);
      else {
        const m = (E = u.members) != null ? E : [v], x = [...new Set(m.map((S) => i.get(S)))].map((S) => t.get(S != null ? S : "")).filter((S) => S !== void 0), g = x.length > 0 ? {
          x: x.reduce((S, k) => S + k.x, 0) / x.length,
          y: x.reduce((S, k) => S + k.y, 0) / x.length
        } : this.clusterPositions[u.cluster], y = Math.random() * 2 * Math.PI, b = Math.random() * l;
        c.set(v, {
          x: g.x + b * Math.cos(y),
          y: g.y + b * Math.sin(y)
        });
      }
      u.color = this.clusters[u.cluster].color;
    }), this.layoutPositions = c, this.pinned = new Set([...this.pinned].filter((v) => o.hasNode(v))), this.updateIsolated(o), this.steady = e ? this.steadyNodes(o) : /* @__PURE__ */ new Set();
    const d = [...this.laidOut].filter((v) => o.hasNode(v));
    this.steady.size === 0 || d.length === 0 ? (this.laidOut = new Set(o.filterNodes((v, u) => !this.hiddenByFilters(v, u))), this.areaMapping = void 0) : this.laidOut = new Set(d), this.measureLabels(o), this.placeNodes(o, !1, !1);
    for (const v of Object.values(this.clusters))
      v.positions = [];
    o.forEachNode((v, u) => this.clusters[u.cluster].positions.push({ x: u.x, y: u.y }));
    for (const v in this.clusters)
      this.clusters[v].positions.length !== 0 && (this.clusters[v].x = this.clusters[v].positions.reduce((u, p) => u + p.x, 0) / this.clusters[v].positions.length, this.clusters[v].y = this.clusters[v].positions.reduce((u, p) => u + p.y, 0) / this.clusters[v].positions.length);
    o.forEachEdge((v, u, p, E) => {
      if (p === E || u.inverse)
        return;
      const m = this.inverseProperties.get(u.uri);
      if (!m)
        return;
      const x = o.outEdges(E, p).find((b) => !o.getEdgeAttribute(b, "inverse") && m.has(o.getEdgeAttribute(b, "uri")));
      if (!x)
        return;
      const g = o.getEdgeAttribute(x, "uri"), y = u.uri < g || u.uri === g && p < E;
      o.mergeEdgeAttributes(v, { inverse: x, second: !y }), o.mergeEdgeAttributes(x, { inverse: v, second: y });
    });
    const f = new ee({ multi: !0 });
    o.forEachNode((v) => f.addNode(v)), o.forEachEdge((v, u, p, E) => {
      u.second || f.addEdgeWithKey(v, p, E);
    }), Oa(f, {
      edgeIndexAttribute: "parallelIndex",
      edgeMinIndexAttribute: "parallelMinIndex",
      edgeMaxIndexAttribute: "parallelMaxIndex"
    }), o.forEachEdge((v, u) => {
      const { parallelIndex: p, parallelMinIndex: E, parallelMaxIndex: m } = f.getEdgeAttributes(u.second ? u.inverse : v);
      o.mergeEdgeAttributes(v, { parallelIndex: p, parallelMinIndex: E, parallelMaxIndex: m });
    }), o.forEachEdge((v, { parallelIndex: u, parallelMinIndex: p, parallelMaxIndex: E }) => {
      typeof p == "number" ? o.mergeEdgeAttributes(v, {
        type: u ? "curved" : "straight",
        curvature: oi(u, E)
      }) : typeof u == "number" ? o.mergeEdgeAttributes(v, {
        type: "curved",
        curvature: oi(u, E)
      }) : o.setEdgeAttribute(v, "type", "straight");
    }), this.graph = o, this.fitShown(), (w = this.renderer) == null || w.setGraph(o);
  }
  // Rebuild the shown graph after a change of the groups shown, and let the layout settle the new nodes, see layoutNew(),
  // or with full, all the nodes shown
  refreshGraph(e = !1) {
    var i;
    this.hoveredNode = void 0, this.hoveredNeighbors = void 0, this.selectedEdge = void 0, this.displayEdgeInfo();
    const t = (i = this.selectedClass) != null ? i : this.selectedNode && this.classGraph.hasNode(this.selectedNode) ? this.selectedNode : void 0;
    this.buildGraph(!e), t && this.shownAs.has(t) && (this.selectedNode = this.shownAs.get(t), this.selectedNodes = /* @__PURE__ */ new Set([this.selectedNode]), this.selectedClass = this.selectedNode === t ? void 0 : t), this.selectedNodes = new Set([...this.selectedNodes].filter((r) => this.graph.hasNode(r))), this.selectedNode && !this.graph.hasNode(this.selectedNode) && (this.selectedNode = void 0), this.displayNodeInfo(this.selectedNode), this.renderPredicatesFilter(), this.renderSuggestions(), this.setSearchQuery(this.searchQuery), e ? this.runLayout() : this.layoutNew();
  }
  // The nodes shown now that were shown at about the same sizes when the network settled last, see settle()
  steadyNodes(e = this.graph) {
    return new Set(e.filterNodes((t, i) => {
      const r = this.settled.get(t);
      return !this.hiddenByFilters(t, i) && r !== void 0 && Math.abs(r - i.size) < kh;
    }));
  }
  // Lay out only the nodes shown that were not shown, or not at their sizes, when the network settled last, e.g. the
  // classes of a group expanded or of groups found again: the others keep their places on the screen, see placeNodes(),
  // and the new ones keep away from them; Rearrange and a change of the graphs shown lay them all out again
  layoutNew() {
    if (this.steady = this.steadyNodes(), !this.graph.someNode((e, t) => !this.hiddenByFilters(e, t) && !this.steady.has(e))) {
      this.placeNodes(), this.refreshFilters();
      return;
    }
    this.runLayout(this.steady.size > 0);
  }
  // Remember the nodes shown and their sizes once the network has settled, see layoutNew()
  settle() {
    this.settled = new Map(this.graph.filterNodes((e, t) => !this.hiddenByFilters(e, t)).map((e) => [e, this.graph.getNodeAttribute(e, "size")]));
  }
  // Group the classes again after a change of the options of the grouping
  regroup() {
    this.expandedGroups.clear(), this.computeGroups(), this.refreshGraph();
  }
  // Show a group as its classes, which get selected, or only the one given; the classes the filters hide, e.g. those
  // without relations to the others shown, stay hidden, not selected
  expandGroup(e, t) {
    var i;
    this.expandedGroups.add(e), this.selectedNodes = new Set(t ? [t] : (i = this.groups.get(e)) == null ? void 0 : i.members), this.selectedNode = t, this.selectedClass = void 0, this.refreshGraph(), t || (this.selectedNodes = new Set([...this.selectedNodes].filter((r) => !this.hiddenByFilters(r))));
  }
  // The instances of a class in the graphs the filter shows, which size its node, see sizeByInstances
  shownInstances(e) {
    let t = 0;
    for (const [i, r] of this.classGraph.getNodeAttribute(e, "instances"))
      this.hideClusters.has(i) || (t += r);
    return t;
  }
  // What of the network depends on the graph filter: the groups, the graphs of the classes and their instances shown
  graphFilterState() {
    const e = [...this.groups.values()].map(({ key: i, members: r }) => `${i} ${r.join(" ")}`), t = this.classGraph.mapNodes((i, r) => `${i} ${r.cluster}${this.sizeByInstances ? ` ${this.shownInstances(i)}` : ""}`);
    return [...e, ...t].join(`
`);
  }
  // Show the result of a change of the graph filter: the groups are found again for the graphs shown, see
  // computeGroups(), and when they, the graphs of the classes or their sizes change, the network is built again; all
  // the nodes shown are laid out again, also those moved by hand, as by Rearrange, as many of them may be new
  refreshGraphFilter() {
    this.pinned.clear();
    const e = this.graphFilterState();
    this.computeGroups(), this.graphFilterState() !== e ? this.refreshGraph(!0) : (this.updateIsolated(), this.runLayout(), this.displayNodeInfo(this.selectedNode));
  }
  // Show the classes of an expanded group as the group again, which gets selected
  collapseGroup(e) {
    this.expandedGroups.delete(e), this.selectedNodes = /* @__PURE__ */ new Set([e]), this.selectedNode = e, this.selectedClass = void 0, this.refreshGraph();
  }
  // Lay out the nodes the graph filter shows by the relations shown between them, with the ForceAtlas2 layout run to its
  // end at once, and move them to their new places, apart where they or their labels would overlap, see placeNodes(), in
  // one animation; the hidden nodes keep their places, and so do those moved by hand and, with incremental, those
  // keeping their places while the new ones are laid out, see layoutNew(); unless incremental, the view zooms back to all
  // the nodes shown meanwhile
  runLayout(e = !1) {
    var a;
    e || (this.steady = /* @__PURE__ */ new Set());
    const t = this.graph, i = new ee({ multi: !0 });
    if (t.forEachNode((h, l) => {
      if (!this.hiddenByFilters(h, l)) {
        const c = this.pinned.has(h) || this.steady.has(h);
        i.addNode(h, _e(le({}, this.layoutPositions.get(h)), { size: l.size, fixed: c }));
      }
    }), t.forEachEdge((h, l, c, d) => {
      i.hasNode(c) && i.hasNode(d) && this.edgeShown(l) && i.addEdge(c, d);
    }), i.order === 0)
      return;
    e || i.forEachNode((h, l) => {
      if (l.fixed)
        return;
      const c = this.clusterPositions[t.getNodeAttribute(h, "cluster")], d = Math.random() * 2 * Math.PI, f = Math.random() * 20;
      i.mergeNodeAttributes(h, {
        x: c.x + f * Math.cos(d),
        y: c.y + f * Math.sin(d)
      });
    });
    const r = _e(le({}, Qi.inferSettings(i)), { linLogMode: !0 }), n = Math.round(bh * Math.min(1, Eh / i.order)), o = Qi(i, { iterations: n, settings: r });
    for (const [h, l] of Object.entries(o))
      this.layoutPositions.set(h, l);
    e || (this.laidOut = new Set(i.nodes()), this.areaMapping = void 0), this.placeNodes(t, !0), this.fitShown(), e || this.zoomToAll(_r), (a = this.renderer) == null || a.refresh({ skipIndexation: !0 }), this.settle();
  }
  // Keep a node moved by hand where it was dropped, and the others where they are: its layout position follows it, the
  // layout leaves it there until Rearrange, and the view stays
  pinNode(e) {
    var o;
    const { x: t, y: i } = this.graph.getNodeAttributes(e);
    this.areaPositions(this.graph), this.pinned.add(e), this.toLayout && this.layoutPositions.set(e, this.toLayout({ x: t, y: i })), this.displayPositions.set(e, { x: t, y: i });
    const { width: r, height: n } = this.areaSize();
    this.areaShares.set(e, { x: (t + r / 2) / r, y: (i + n / 2) / n }), (o = this.renderer) == null || o.refresh({ skipIndexation: !0 });
  }
  // Let the camera fit the nodes the graph filter shows, wherever the hidden ones are, with their labels (as much of them
  // as there is room for, see areaPositions()) and the band under the tools
  fitShown() {
    if (!this.renderer)
      return;
    const e = [1 / 0, -1 / 0], t = [1 / 0, -1 / 0];
    this.graph.forEachNode((i, r) => {
      var a;
      if (this.hiddenByFilters(i, r))
        return;
      const n = (a = this.displayPositions.get(i)) != null ? a : r, o = this.roomOf(this.graph, i);
      e[0] = Math.min(e[0], n.x - o.left), e[1] = Math.max(e[1], n.x + o.left + 3 + Math.min(o.width, Zt)), t[0] = Math.min(t[0], n.y - o.half), t[1] = Math.max(t[1], n.y + o.half);
    }), this.renderer.setCustomBBox(e[0] <= e[1] ? { x: [e[0], e[1]], y: [t[0], t[1] + this.toolsBand] } : null);
  }
  // Let the wheel zoom the view smoothly, by as much as it turns, see zoomTo(), and the buttons in the bottom right corner
  // of the network zoom it out, in and back to all the classes shown, beside the zoom shown; a button zooming beyond a
  // limit of the zoom is disabled there
  initZoom() {
    const e = this.renderer;
    if (!e)
      return;
    const t = e.getCamera();
    e.getMouseCaptor().on("wheel", (o) => {
      o.preventSigmaDefault(), o.sigmaDefaultPrevented = !0;
      const a = o.original, h = a.deltaMode === WheelEvent.DOM_DELTA_LINE ? 40 : a.deltaMode === WheelEvent.DOM_DELTA_PAGE ? 800 : 1, l = a.deltaY * h * (a.ctrlKey ? 4 : 1);
      l && this.zoomTo(this.zoomState().ratio * Tt(xh, l / 100), o);
    });
    const i = this.dom.querySelector("#overview-zoom"), r = this.dom.querySelector("#overview-zoom-out"), n = this.dom.querySelector("#overview-zoom-in");
    r.addEventListener("click", () => this.zoomStep(-1)), n.addEventListener("click", () => this.zoomStep(1)), this.dom.querySelector("#overview-zoom-fit").addEventListener("click", () => this.zoomToAll()), t.on("updated", (o) => {
      i.textContent = `${Math.round(100 / o.ratio)}%`, r.disabled = o.ratio >= Qt, n.disabled = o.ratio <= Kt;
    });
  }
  // Zoom the view back to all the nodes shown, the zoom of 100%, see fitShown()
  zoomToAll(e = Tr) {
    var t;
    (t = this.renderer) == null || t.getCamera().animate({ x: 0.5, y: 0.5, ratio: 1, angle: 0 }, { duration: e });
  }
  // The state of the camera, or the one it is going to while the view zooms, from which the next step of zoom goes on, see
  // zoomTo()
  zoomState() {
    var e, t, i;
    return (i = (t = this.zoomTarget) != null ? t : (e = this.renderer) == null ? void 0 : e.getCamera().getState()) != null ? i : { x: 0.5, y: 0.5, ratio: 1, angle: 0 };
  }
  // Zoom the view in (direction 1) or out (-1) to the next whole step of the zoom shown, see buttonZoomStep, e.g. from 107%
  // to 110% or 100%, and from 220% to 250% or 200%
  zoomStep(e) {
    const t = Math.round(100 / this.zoomState().ratio), r = (e > 0 ? t >= kr : t > kr) ? _h : Sh, n = e > 0 ? Math.floor(t / r) + 1 : Math.ceil(t / r) - 1;
    this.zoomTo(100 / (n * r));
  }
  // Zoom the view to the given ratio of the camera, see minCameraRatio, around the given point of the network, its centre
  // unless given, within the limits of the zoom; a zoom under way goes on from where it is going, so that quick turns of
  // the wheel and clicks add up and the view moves smoothly
  zoomTo(e, t) {
    const i = this.renderer;
    if (!i)
      return;
    const r = i.getCamera(), n = this.zoomState();
    if (e = Math.min(Qt, Math.max(Kt, e)), e === n.ratio)
      return;
    const { width: o, height: a } = i.getDimensions(), h = { x: o / 2, y: a / 2 }, l = i.viewportToFramedGraph(t != null ? t : h, { cameraState: n }), c = i.viewportToFramedGraph(h, { cameraState: n }), d = 1 - e / n.ratio, f = _e(le({}, n), { ratio: e, x: n.x + (l.x - c.x) * d, y: n.y + (l.y - c.y) * d });
    r.animate(f, { duration: Tr, easing: "quadraticOut" }, () => this.zoomTarget = void 0), this.zoomTarget = f;
  }
  // Show the nodes at their positions in the area of the network, see areaPositions(), apart where their labels would
  // overlap, see separateLabels(), unless a layout follows; animated, when asked, from where they are shown
  placeNodes(e = this.graph, t = !1, i = !0) {
    const r = this.areaPositions(e);
    for (const h of this.steady) {
      const l = this.displayPositions.get(h);
      l && e.hasNode(h) && r.set(h, l);
    }
    i && this.separateLabels(e, r);
    const { width: n, height: o } = this.areaSize();
    this.areaShares = new Map([...r].map(([h, l]) => [h, { x: (l.x + n / 2) / n, y: (l.y + o / 2) / o }]));
    const a = this.dom.querySelector("#network-container");
    this.sharesShown = a.clientWidth > 0 && a.clientHeight > 0, this.showPositions(e, r, t);
  }
  // Keep the nodes in their places in the network after a change of its size, scaled with its area, so that the size of
  // the panels beside it moves no node in its arrangement; nodes not placed in the network shown are placed anew
  scaleNodes() {
    const e = this.graph;
    if (!this.sharesShown || e.someNode((n) => !this.areaShares.has(n))) {
      this.steady = /* @__PURE__ */ new Set(), this.placeNodes(e);
      return;
    }
    const { width: t, height: i } = this.areaSize(), r = /* @__PURE__ */ new Map();
    for (const [n, o] of this.areaShares)
      r.set(n, { x: -t / 2 + o.x * t, y: -i / 2 + o.y * i });
    this.showPositions(e, r, !1);
  }
  // Show the nodes at the positions given, animated from where they are shown, when asked
  showPositions(e, t, i) {
    var r;
    if (this.displayPositions = t, (r = this.stopAnimation) == null || r.call(this), this.stopAnimation = void 0, i && this.renderer && e === this.graph) {
      const n = Object.fromEntries([...t].map(([o, a]) => [o, { x: a.x, y: a.y }]));
      this.stopAnimation = Lo(e, n, { duration: _r });
      return;
    }
    e.updateEachNodeAttributes((n, o) => {
      const a = t.get(n);
      return o.x = a.x, o.y = a.y, o;
    }, { attributes: ["x", "y"] });
  }
  // The room a node takes in the network with its label, the short one of a group, see chooseLabels(): to its left,
  // to its right, above and below it, and the width of the label
  roomOf(e, t) {
    var l, c, d;
    const i = ((c = (l = this.renderer) == null ? void 0 : l.getSetting("labelSize")) != null ? c : 14) * bt, r = e.getNodeAttribute(t, "size"), n = (d = this.labelSizes.get(t)) != null ? d : { width: 0, lines: 1, shortWidth: 0 }, o = !!e.getNodeAttribute(t, "shortLabel"), a = o ? n.shortWidth : n.width, h = Math.max(r, (o ? 1 : n.lines) * i / 2);
    return { left: r, right: r + 3 + a, half: h, width: a };
  }
  // The area of the network in the pixels of the box the renderer fits to it, its smaller side less the padding, see
  // fitShown(), and the band at its top under the tools
  areaSize() {
    var c, d;
    const e = this.dom.querySelector("#network-container"), t = this.dom.querySelector("#overview-tools"), i = (d = (c = this.renderer) == null ? void 0 : c.getSetting("stagePadding")) != null ? d : 30, r = e.clientWidth || 1e3, n = e.clientHeight || 600, o = Math.min(r, n), a = Math.max(1, o - 2 * i) * r / o, h = Math.max(1, o - 2 * i) * n / o, l = Math.min(h / 4, Math.max(0, t.offsetTop + t.offsetHeight + mh - i));
    return { width: a, height: h, top: l };
  }
  // The layout positions in the pixels of the area of the network, by those of the nodes laid out last: spread over it
  // with fillArea, see spreadingMapping(), so that a round layout reaches the corners too, or scaled as a whole,
  // keeping its shape; room is left on the right for the labels of the rightmost nodes, and at the top for the tools;
  // the nodes moved by hand go where they were dropped, see pinNode()
  areaPositions(e) {
    const { width: t, height: i, top: r } = this.areaSize(), n = e.nodes(), o = n.filter((m) => this.laidOut.has(m)), a = o.length > 0 ? o : n;
    let h = this.areaMapping;
    if ((h == null ? void 0 : h.fill) !== this.fillArea) {
      const m = a.map((x) => this.layoutPositions.get(x));
      h = { mapping: this.fillArea ? zh(m) : Mh(m), fill: this.fillArea }, this.areaMapping = h;
    }
    const { mapping: l } = h, c = new Map(n.map((m) => [m, l.forward(this.layoutPositions.get(m))]));
    let d = t;
    for (const m of a) {
      if (this.pinned.has(m))
        continue;
      const x = (c.get(m).x + 1) / 2, g = Math.min(this.roomOf(e, m).width, Zt) + e.getNodeAttribute(m, "size") + yh;
      x > 0 && (d = Math.min(d, (t - g) / x));
    }
    d = Math.max(d, t * vh), this.toolsBand = r;
    const f = Math.min(d / l.width, (i - r) / l.height), w = this.fillArea ? d : l.width * f, v = this.fillArea ? i - r : l.height * f, u = -t / 2 + (d - w) / 2, p = -i / 2 + (i - r - v) / 2;
    this.toLayout = (m) => l.inverse({ x: 2 * (m.x - u) / w - 1, y: 2 * (m.y - p) / v - 1 });
    const E = /* @__PURE__ */ new Map();
    for (const [m, x] of c)
      E.set(m, { x: u + (x.x + 1) / 2 * w, y: p + (x.y + 1) / 2 * v });
    return E;
  }
  // Move the nodes shown apart where they, or their labels, would overlap in the network fitted, keeping them and their
  // labels (as much of them as there is room for, see areaPositions()) in its area: each overlapping pair goes apart
  // the shorter way, horizontally or vertically, each node by its share of the room left that way, for some rounds or
  // until no pair overlaps; where the area is too small for all the labels, some overlaps stay, see chooseLabels().
  // The circles of the nodes then go apart where they still overlap, along the line between their centres, as the
  // labels give way but the nodes cannot. The nodes moved by hand keep their places: they take no part in the
  // separation of the labels, so that they move no other, and the other nodes only keep out of their circles; the nodes
  // keeping their places while the new ones are laid out, see layoutNew(), do not move either, the others keeping out of
  // their circles and labels
  separateLabels(e, t) {
    const { width: i, height: r, top: n } = this.areaSize(), o = e.filterNodes((f, w) => !this.hiddenByFilters(f, w) && !this.pinned.has(f)).map((f) => {
      const { left: w, right: v, half: u, width: p } = this.roomOf(e, f), E = t.get(f), m = (g, y) => g <= y ? [g, y] : [(g + y) / 2, (g + y) / 2], x = this.steady.has(f);
      return {
        node: f,
        x: E.x,
        y: -E.y,
        left: w,
        right: v,
        half: u,
        steady: x,
        // where the node may be, its label in the area, as much of it as there is room for
        xs: x ? [E.x, E.x] : m(-i / 2 + w, i / 2 - w - 3 - Math.min(p, Zt)),
        ys: x ? [-E.y, -E.y] : m(-r / 2 + n + u, r / 2 - u)
      };
    }), a = 2, h = 40;
    for (let f = 0; f < 60; f++) {
      const w = /* @__PURE__ */ new Map();
      o.forEach((p, E) => {
        var m;
        for (let x = Math.floor((p.x - p.left) / h); x <= Math.floor((p.x + p.right) / h); x++)
          for (let g = Math.floor((p.y - p.half) / h); g <= Math.floor((p.y + p.half) / h); g++) {
            const y = `${x} ${g}`;
            w.set(y, [...(m = w.get(y)) != null ? m : [], E]);
          }
      });
      const v = /* @__PURE__ */ new Set();
      let u = !1;
      for (const p of w.values())
        for (let E = 0; E < p.length; E++)
          for (let m = E + 1; m < p.length; m++) {
            const x = p[E] * o.length + p[m];
            if (v.has(x))
              continue;
            v.add(x);
            const g = o[p[E]], y = o[p[m]], b = Math.min(g.x + g.right, y.x + y.right) - Math.max(g.x - g.left, y.x - y.left) + a, S = Math.min(g.y + g.half, y.y + y.half) - Math.max(g.y - g.half, y.y - y.half) + a;
            if (b <= 0 || S <= 0)
              continue;
            const k = b < S ? "x" : "y", C = k === "x" ? "xs" : "ys", A = g[k] < y[k] || g[k] === y[k] && p[E] < p[m] ? 1 : -1, G = A > 0 ? g[k] - g[C][0] : g[C][1] - g[k], N = A > 0 ? y[C][1] - y[k] : y[k] - y[C][0];
            if (G + N <= 0)
              continue;
            u = !0;
            const _ = k === "x" ? b : S;
            g[k] -= A * _ * (G / (G + N)), y[k] += A * _ * (N / (G + N));
          }
      for (const p of o)
        p.x = Math.min(p.xs[1], Math.max(p.xs[0], p.x)), p.y = Math.min(p.ys[1], Math.max(p.ys[0], p.y));
      if (!u)
        break;
    }
    const l = [
      ...o.map((f) => f.steady ? { x: f.x, y: f.y, left: f.left } : f),
      ...e.filterNodes((f, w) => !this.hiddenByFilters(f, w) && this.pinned.has(f)).map((f) => ({
        x: t.get(f).x,
        y: -t.get(f).y,
        left: e.getNodeAttribute(f, "size")
      }))
    ], c = 2, d = 2 * Math.max(0, ...l.map((f) => f.left)) + c;
    for (let f = 0; f < 100; f++) {
      const w = /* @__PURE__ */ new Map();
      l.forEach((u, p) => {
        var m;
        const E = `${Math.floor(u.x / d)} ${Math.floor(u.y / d)}`;
        w.set(E, [...(m = w.get(E)) != null ? m : [], p]);
      });
      let v = !1;
      l.forEach((u, p) => {
        var x;
        const [E, m] = [Math.floor(u.x / d), Math.floor(u.y / d)];
        for (let g = -1; g <= 1; g++)
          for (let y = -1; y <= 1; y++)
            for (const b of (x = w.get(`${E + g} ${m + y}`)) != null ? x : []) {
              if (b <= p)
                continue;
              const S = l[b], [k, C] = [S.x - u.x, S.y - u.y], A = Math.hypot(k, C), G = u.left + S.left + c - A;
              if (G <= 0)
                continue;
              const [N, _] = A > 0 ? [k / A, C / A] : [Math.cos(p + b), Math.sin(p + b)], z = u.xs ? S.xs ? 0.5 : 1 : 0, W = S.xs ? 1 - z : 0;
              z + W !== 0 && (v = !0, u.x -= N * G * z, u.y -= _ * G * z, S.x += N * G * W, S.y += _ * G * W);
            }
      });
      for (const u of l)
        !u.xs || !u.ys || (u.x = Math.min(u.xs[1], Math.max(u.xs[0], u.x)), u.y = Math.min(u.ys[1], Math.max(u.ys[0], u.y)));
      if (!v)
        break;
    }
    for (const f of o)
      t.set(f.node, { x: f.x, y: -f.y });
  }
  // The sizes of the labels of the nodes as the renderer draws them, see drawNodeLabel(), or estimated without a canvas:
  // the width of their widest lines, and their numbers of lines
  measureLabels(e) {
    var a, h, l, c, d, f;
    const t = (h = (a = this.renderer) == null ? void 0 : a.getSetting("labelSize")) != null ? h : 14, i = (c = (l = this.renderer) == null ? void 0 : l.getSetting("labelWeight")) != null ? c : "normal", r = (f = (d = this.renderer) == null ? void 0 : d.getSetting("labelFont")) != null ? f : "Arial";
    let n = null;
    try {
      n = document.createElement("canvas").getContext("2d");
    } catch (w) {
    }
    const o = (w, v) => n ? (n.font = `${v ? "bold" : i} ${t}px ${r}`, n.measureText(w).width) : w.length * t * 0.6;
    this.labelSizes = /* @__PURE__ */ new Map(), e.forEachNode((w, v) => {
      var m;
      const u = String((m = v.label) != null ? m : "").split(`
`), p = Math.max(...u.map((x, g) => o(x, g === 0 && !!v.labelTitle))), E = v.shortLabel ? o(v.shortLabel, !!v.labelTitle) : p;
      this.labelSizes.set(w, { width: p, lines: u.length, shortWidth: E });
    });
  }
  // Choose the labels drawn in the frame being rendered: those of the nodes shown and big enough on the screen, from
  // the hovered, selected and highlighted ones, those moved by hand and the biggest ones on, each unless it overlaps one chosen before, a
  // group with its short label; then the groups get their whole labels, in lines, where these fit in the view and
  // overlap no label chosen. The node being dragged takes no room from the others, its label is drawn anyway, and
  // whether it or its label overlaps another node or a label chosen is noted for its color
  chooseLabels() {
    this.labelsChosen = !0, this.shownLabels = /* @__PURE__ */ new Map();
    const e = this.renderer;
    if (!e)
      return;
    const t = e.getSetting("labelRenderedSizeThreshold"), i = e.getSetting("labelSize") * bt, { width: r, height: n } = e.getDimensions(), o = [], a = this.draggedNode(), h = [];
    let l;
    this.graph.forEachNode((m) => {
      var W, L;
      const x = e.getNodeDisplayData(m);
      if (!x || x.hidden)
        return;
      const g = e.scaleSize(x.size), { x: y, y: b } = e.framedGraphToViewport(x);
      if (m === a) {
        const { width: T, lines: B } = (W = this.labelSizes.get(m)) != null ? W : { width: 0, lines: 1 }, $ = Math.max(g, B * i / 2);
        l = { left: y - g, right: y + g + 3 + T, top: b - $, bottom: b + $ };
        return;
      }
      if (h.push({ left: y - g, right: y + g, top: b - g, bottom: b + g }), !x.label)
        return;
      const S = x.forceLabel || x.highlighted || m === this.hoveredNode;
      if (!S && g < t)
        return;
      const { width: k, lines: C, shortWidth: A } = (L = this.labelSizes.get(m)) != null ? L : { width: 0, lines: 1, shortWidth: 0 }, G = (T, B) => ({
        left: y + g + 3,
        right: y + g + 3 + T,
        top: b - B * i / 2,
        bottom: b + B * i / 2
      }), N = x.shortLabel ? G(A, 1) : void 0, _ = this.pinned.has(m), z = !!x.faded;
      o.push({
        node: m,
        forced: S,
        faded: z,
        pinned: _,
        size: g,
        degree: this.graph.degree(m),
        whole: G(k, C),
        short: N
      });
    }), o.sort((m, x) => Number(x.forced) - Number(m.forced) || Number(m.faded) - Number(x.faded) || Number(x.pinned) - Number(m.pinned) || x.size - m.size || x.degree - m.degree || (m.node < x.node ? -1 : 1));
    const c = 50, d = /* @__PURE__ */ new Map(), f = (m) => {
      const x = [];
      for (let g = Math.floor(m.left / c); g <= Math.floor(m.right / c); g++)
        for (let y = Math.floor(m.top / c); y <= Math.floor(m.bottom / c); y++)
          x.push(`${g} ${y}`);
      return x;
    }, w = (m, x) => !f(m).some((g) => {
      var y;
      return (y = d.get(g)) == null ? void 0 : y.some((b) => b.node !== x && m.left < b.box.right && b.box.left < m.right && m.top < b.box.bottom && b.box.top < m.bottom);
    }), v = [], u = (m, x) => {
      var g;
      for (const y of f(x))
        d.set(y, [...(g = d.get(y)) != null ? g : [], { node: m, box: x }]);
      v.push(x);
    };
    for (const { node: m, forced: x, whole: g, short: y } of o) {
      const b = x || !y ? g : y;
      !x && !w(b, m) || (this.shownLabels.set(m, b === g ? "whole" : "short"), u(m, b));
    }
    const p = (m) => m.top >= 0 && m.bottom <= n && m.right <= r;
    for (const { node: m, whole: x } of o)
      this.shownLabels.get(m) !== "short" || !p(x) || !w(x, m) || (this.shownLabels.set(m, "whole"), u(m, x));
    const E = (m, x) => m.left < x.right && x.left < m.right && m.top < x.bottom && x.top < m.bottom;
    this.heldBlocked = l !== void 0 && (!w(l, "") || h.some((m) => E(l, m))), this.labelObstacles = [...h, ...v];
  }
  // The node being dragged, once it has moved
  draggedNode() {
    var e;
    return (e = this.held) != null && e.moved ? this.held.node : void 0;
  }
  // The display of an edge by the internal state: hidden by the filters, faded when a hovered or selected node or the
  // search does not concern it, highlighted when it does, or shown with its inverse, see the edge reducer
  edgeStyle(e, t) {
    var n, o;
    const i = le({}, t);
    let r = !!this.selectedNode && !this.graph.hasExtremity(e, this.selectedNode);
    if (this.hoveredNode && !this.graph.hasExtremity(e, this.hoveredNode) && (r = !0), this.selectedNodes && this.selectedNodes.size > 0 && (r = !this.selectedNodes.has(this.graph.source(e)) && !this.selectedNodes.has(this.graph.target(e))), this.hoveredNode && this.graph.hasExtremity(e, this.hoveredNode) && (r = !1), this.selectedNode && this.graph.hasExtremity(e, this.selectedNode) && (i.zIndex = 9e3, i.color = "red", r = !1), e == this.selectedEdge && (i.color = "blue", r = !1), this.suggestions && (!this.suggestions.has(this.graph.source(e)) || !this.suggestions.has(this.graph.target(e))) && (r = !0), this.hidePredicates.size > 0 && this.hidePredicates.has(t.curie) && (i.hidden = !0), this.hideEdgesToMetaclasses && t.toMetaclass && (i.hidden = !0), this.edgeHiddenByGraphs(t) && (i.hidden = !0), t.inverse && !i.hidden && this.edgeShown(this.graph.getEdgeAttributes(t.inverse)))
      if (t.second)
        i.hidden = !0;
      else {
        const a = this.graph.getEdgeAttributes(t.inverse);
        i.type = t.type === "curved" ? "curvedBoth" : "straightBoth", a.uri !== t.uri && (i.label = `${t.label} ⇄ ${a.label}`);
      }
    return r && (i.color = Ar((o = t.color) != null ? o : (n = this.renderer) == null ? void 0 : n.getSetting("defaultEdgeColor"), Ih), i.label = "", i.forceLabel = !1, i.zIndex = -1, i.faded = !0), i;
  }
  // Draw the relations of the classes (or groups) to themselves, which sigma.js does not: a loop at the top left of the
  // node, away from its label, with an arrowhead where it comes back, and above it the labels of its relations (the first
  // one and the number of the others), where they overlap no node, no label chosen by chooseLabels() and no other loop or
  // its label, those of a hovered or selected node in any case; a loop fades and is highlighted as the other edges are,
  // see edgeStyle(), and the shapes are kept for the pointer, see loopAt(); they have a layer of their own, as sigma.js
  // clears the one of the labels of the edges also when it draws only the hovered nodes, without a call back
  drawLoops() {
    var f, w, v;
    const e = this.renderer;
    this.loopShapes = [];
    const t = (f = e == null ? void 0 : e.getCanvases().loops) == null ? void 0 : f.getContext("2d");
    if (!e || !t)
      return;
    const { width: i, height: r } = e.getDimensions();
    t.clearRect(0, 0, i, r), this.labelsChosen || this.chooseLabels();
    const n = /* @__PURE__ */ new Map();
    this.graph.forEachEdge((u, p, E, m) => {
      if (E !== m)
        return;
      const x = this.edgeStyle(u, p);
      x.hidden || (n.has(E) || n.set(E, []), n.get(E).push({ edge: u, style: x }));
    });
    const o = e.getSetting("defaultEdgeColor"), a = e.getSetting("edgeLabelSize"), h = [];
    for (const [u, p] of n) {
      const E = e.getNodeDisplayData(u);
      if (!E || E.hidden)
        continue;
      const { x: m, y: x } = e.framedGraphToViewport(E), g = e.scaleSize(E.size), y = Math.max(Gh, g * Lh), b = (g + y * Nh) * Math.SQRT1_2, S = p.filter((A) => !A.style.faded), k = (w = S[0]) != null ? w : p[0], C = [...new Set(S.map((A) => A.style.label).filter((A) => !!A))];
      h.push({
        node: u,
        edge: k.edge,
        x: m,
        y: x,
        radius: g,
        cx: m - b,
        cy: x - b,
        r: y,
        color: (v = k.style.color) != null ? v : o,
        // as thick as the thickest of the relations it stands for, see buildGraph()
        size: Math.max(...(S.length > 0 ? S : p).map((A) => {
          var G;
          return (G = this.graph.getEdgeAttribute(A.edge, "size")) != null ? G : 1;
        })),
        text: C.length === 0 ? void 0 : C.length === 1 ? C[0] : `${C[0]}, +${C.length - 1}`,
        forced: u === this.hoveredNode || this.selectedNodes.has(u) || p.some((A) => A.edge === this.selectedEdge)
      });
    }
    const l = e.getSetting("minEdgeThickness");
    t.save();
    for (const u of h) {
      const p = Math.max(u.size, l), E = p * 2.5, m = p;
      t.lineWidth = Math.max(0.5, p - 1 / (window.devicePixelRatio || 1)), t.strokeStyle = t.fillStyle = u.color, t.beginPath(), t.arc(u.cx, u.cy, u.r, 0, 2 * Math.PI), t.stroke();
      const x = Math.hypot(u.x - u.cx, u.y - u.cy), g = (u.r * u.r - u.radius * u.radius + x * x) / (2 * x), y = Math.sqrt(Math.max(0, u.r * u.r - g * g)), [b, S] = [(u.x - u.cx) / x, (u.y - u.cy) / x];
      for (const k of [1, -1]) {
        const C = u.cx + g * b - k * y * S, A = u.cy + g * S + k * y * b, [G, N] = [-(A - u.cy) / u.r, (C - u.cx) / u.r];
        if (!(G * (u.x - C) + N * (u.y - A) <= 0)) {
          t.beginPath(), t.moveTo(C, A), t.lineTo(C - G * E - N * m, A - N * E + G * m), t.lineTo(C - G * E + N * m, A - N * E - G * m), t.closePath(), t.fill();
          break;
        }
      }
    }
    const c = [
      ...this.labelObstacles,
      ...h.map((u) => ({
        left: u.cx - u.r,
        right: u.cx + u.r,
        top: u.cy - u.r,
        bottom: u.cy + u.r
      }))
    ], d = (u, p) => u.left < p.right && p.left < u.right && u.top < p.bottom && p.top < u.bottom;
    t.font = `${e.getSetting("edgeLabelWeight")} ${a}px ${e.getSetting("edgeLabelFont")}`, t.textAlign = "center";
    for (const u of [...h].sort((p, E) => Number(E.forced) - Number(p.forced) || E.radius - p.radius)) {
      if (!u.text)
        continue;
      const p = t.measureText(u.text).width, E = u.cy - u.r - Cr, m = u.cx - u.r - Cr, x = [
        { left: u.cx - p / 2, right: u.cx + p / 2, top: E - a, bottom: E },
        { left: u.cx - p, right: u.cx, top: E - a, bottom: E },
        { left: m - p, right: m, top: u.cy - a / 2, bottom: u.cy + a / 2 }
      ], g = (b) => b.left >= 0 && b.top >= 0 && b.right <= i && b.bottom <= r, y = u.forced ? x[0] : x.find((b) => g(b) && !c.some((S) => d(b, S)));
      y && (t.fillStyle = u.color, t.fillText(u.text, (y.left + y.right) / 2, y.bottom - a * 0.22), c.push(y), u.label = y);
    }
    t.restore(), this.loopShapes = h;
  }
  // The loop drawn by drawLoops() at the point given in the network, on its circle (outside its node) or its label
  loopAt(e, t) {
    return this.loopShapes.find((i) => Math.abs(Math.hypot(e - i.cx, t - i.cy) - i.r) <= 4 && Math.hypot(e - i.x, t - i.y) > i.radius || i.label !== void 0 && e >= i.label.left && e <= i.label.right && t >= i.label.top && t <= i.label.bottom);
  }
  // Show the details of a relation clicked, or hide them when it is clicked again
  toggleEdgeDetails(e) {
    this.selectedEdge !== e ? (this.selectedEdge = e, this.displayEdgeInfo(e)) : (this.selectedEdge = void 0, this.displayEdgeInfo());
  }
  // The lines of a label, see drawNodeLabel(), in the color given or that of the settings
  drawLabelLines(e, t, i, r) {
    if (!t.label)
      return;
    const n = i.labelSize, o = t.label.split(`
`), a = n * bt, h = t.y + n / 3 - (o.length - 1) * a / 2, l = r != null ? r : i.labelColor.attribute ? t[i.labelColor.attribute] || i.labelColor.color || "#000" : i.labelColor.color;
    e.fillStyle = l, o.forEach((c, d) => {
      const f = d === 0 && t.labelTitle;
      e.font = `${f ? "bold" : i.labelWeight} ${n}px ${i.labelFont}`, e.fillText(c, t.x + t.size + 3, h + d * a);
    });
  }
  // Render the initialized graph and add all event listeners
  renderGraph() {
    return ke(this, null, function* () {
      if (this.destroyed)
        return;
      const e = rh();
      if (!e.available) {
        const h = e.reasons.map((l) => V(l)).join("; ");
        this.displayMsg(`<p style="margin: 0 0 .8em; max-width: 32em;">The overview of classes needs WebGL, which the browser does not provide now${h ? ` (the browser says: ${h})` : ""}. It may be turned off, or blocked for a while after a failure of the graphics, which a restart of the browser lifts; turning on hardware (graphics) acceleration in the settings of the browser, or another browser, helps too.</p><p style="margin: 0; text-align: center;"><button id="overview-webgl-retry">Try again</button></p>`, !0), this.dom.querySelector("#overview-webgl-retry").addEventListener("click", () => {
          this.displayMsg(), this.renderGraph();
        });
        return;
      }
      const t = this.dom.querySelector("#network-container");
      this.renderer = new ra(this.graph, t, {
        renderEdgeLabels: !0,
        enableEdgeEvents: !0,
        // every label is a candidate, also that of a small node (see sizeByInstances), and chooseLabels() leaves out
        // those overlapping others
        labelDensity: 100,
        labelRenderedSizeThreshold: 0,
        defaultDrawNodeLabel: this.drawNodeLabel,
        defaultDrawNodeHover: this.drawNodeHover,
        allowInvalidContainer: !0,
        // the faded nodes and edges are drawn below the others, see the reducers
        zIndex: !0,
        minCameraRatio: Kt,
        maxCameraRatio: Qt,
        // a group is drawn as a circle within a thin ring, see groupRingWidth
        nodeProgramClasses: {
          group: qa(Th, Ch)
        },
        defaultEdgeType: "straight",
        // a little darker than the light grey of sigma.js (#ccc)
        defaultEdgeColor: "#b4b4b4",
        edgeProgramClasses: {
          straight: an,
          curved: Ba,
          // a relation and its inverse as one edge
          straightBoth: xa,
          curvedBoth: Ua
        }
        // https://www.npmjs.com/package/@sigma/edge-curve
      }), this.renderer.on("beforeRender", () => this.labelsChosen = !1), this.renderer.createCanvasContext("loops", { afterLayer: "edgeLabels" }), this.renderer.resize(!0), this.runLayout(), this.fitShown(), this.renderer.refresh(), this.dom.querySelector("#overview-rearrange").addEventListener("click", () => {
        this.pinned.clear(), this.runLayout();
      }), this.initZoom();
      const r = this.dom.querySelector("#overview-fill-area");
      r.addEventListener("change", () => {
        var h;
        this.fillArea = r.checked, this.steady = /* @__PURE__ */ new Set(), this.placeNodes(this.graph, !0), this.fitShown(), (h = this.renderer) == null || h.refresh({ skipIndexation: !0 });
      });
      const n = this.dom.querySelector("#search-input");
      n.addEventListener("input", () => {
        this.setSearchQuery(n.value || "");
      }), this.renderer.on("enterNode", ({ node: h }) => {
        this.draggedNode() || (this.setHoveredNode(h), this.selectedNode || this.displayNodeInfo(h), this.held || (t.style.cursor = "grab"));
      }), this.renderer.on("leaveNode", () => {
        this.draggedNode() || (this.setHoveredNode(void 0), this.selectedNode || this.displayNodeInfo(void 0), this.held || (t.style.cursor = ""));
      }), this.renderer.on("downNode", ({ node: h, event: l }) => {
        this.held = { node: h, x: l.x, y: l.y, moved: !1 }, this.suppressClick = !1;
      }), this.renderer.on("downStage", () => this.suppressClick = !1), this.renderer.on("moveBody", ({ event: h }) => {
        var d;
        const l = this.held;
        if (!l || (h.preventSigmaDefault(), !l.moved && Math.hypot(h.x - l.x, h.y - l.y) < 4))
          return;
        l.moved || (l.moved = !0, t.style.cursor = "grabbing", (d = this.stopAnimation) == null || d.call(this), this.stopAnimation = void 0, this.renderer.refresh({ skipIndexation: !0 }));
        const c = this.renderer.viewportToGraph(h);
        this.graph.mergeNodeAttributes(l.node, { x: c.x, y: c.y });
      });
      const o = () => {
        const h = this.held;
        this.held = void 0, h != null && h.moved && (t.style.cursor = "grab", this.suppressClick = !0, this.setHoveredNode(void 0), this.pinNode(h.node));
      };
      this.renderer.on("upNode", o), this.renderer.on("upStage", o), this.renderer.on("clickNode", ({ node: h, event: l }) => {
        if (this.suppressClick) {
          this.suppressClick = !1;
          return;
        }
        if (l.original.shiftKey)
          if (this.selectedNodes.has(h)) {
            this.selectedNodes.delete(h);
            return;
          } else
            this.selectedNodes.add(h);
        else
          this.selectedNodes = /* @__PURE__ */ new Set([h]);
        this.selectedNode = h, this.selectedClass = void 0, this.displayNodeInfo(h);
      }), this.renderer.on("doubleClickNode", (h) => {
        const l = this.graph.getNodeAttributes(h.node);
        if (l.members)
          this.expandGroup(h.node);
        else if (l.group)
          this.collapseGroup(l.group);
        else
          return;
        h.preventSigmaDefault();
      }), this.renderer.on("clickStage", ({ event: h }) => {
        if (this.suppressClick) {
          this.suppressClick = !1;
          return;
        }
        const l = this.loopAt(h.x, h.y);
        if (l) {
          this.toggleEdgeDetails(l.edge);
          return;
        }
        this.selectedNodes = /* @__PURE__ */ new Set(), this.selectedNode = void 0, this.selectedClass = void 0, this.displayNodeInfo(), this.selectedEdge = void 0, this.displayEdgeInfo();
      }), this.renderer.on("clickEdge", ({ edge: h }) => this.toggleEdgeDetails(h));
      let a;
      this.renderer.on("moveBody", ({ event: h }) => {
        var c;
        if (this.held || this.hoveredNode)
          return;
        const l = (c = this.loopAt(h.x, h.y)) == null ? void 0 : c.edge;
        l !== a && (a = l, t.style.cursor = l ? "pointer" : "", this.selectedEdge || this.displayEdgeInfo(l));
      }), this.renderer.on("enterEdge", ({ edge: h }) => {
        this.selectedEdge || this.displayEdgeInfo(h);
      }), this.renderer.on("leaveEdge", () => {
        this.selectedEdge || this.displayEdgeInfo();
      }), this.renderer.setSetting("nodeReducer", (h, l) => {
        const c = le({}, l);
        this.hiddenByFilters(h, l) && (c.hidden = !0);
        let d = this.hoveredNeighbors !== void 0 && !this.hoveredNeighbors.has(h) && this.hoveredNode !== h && !this.draggedNode();
        return this.selectedNodes.has(h) ? (c.highlighted = !0, c.hidden = !1, d = !1) : this.suggestions && (this.suggestions.has(h) ? (c.forceLabel = !0, c.hidden = !1, d = !1) : d = !0), this.selectedEdge && this.graph.hasExtremity(this.selectedEdge, h) && (c.highlighted = !0, c.hidden = !1, d = !1), d && Object.assign(c, { color: Ar(l.color, Dh), faded: !0, zIndex: -1 }), c;
      }), this.renderer.setSetting("edgeReducer", (h, l) => {
        const c = this.edgeStyle(h, l);
        return this.graph.source(h) === this.graph.target(h) && (c.hidden = !0), c;
      }), this.renderer.on("afterRender", () => this.drawLoops()), this.renderPredicatesFilter(), this.renderClustersFilter(), this.renderSuggestions();
    });
  }
  // Feed the datalist autocomplete values
  renderSuggestions() {
    const e = this.dom.querySelector("#suggestions");
    e.innerHTML = [...new Set(this.graph.nodes().flatMap((t) => this.nodeNames(t)))].sort().map((t) => `<option value="${t}"></option>`).join(`
`);
  }
  // Show the details of a relation, or none
  displayEdgeInfo(e) {
    var i;
    const t = this.dom.querySelector("#overview-edge-info");
    t.innerHTML = e ? this.edgeDetails(e) : "", (i = this.renderer) == null || i.refresh({ skipIndexation: !0 });
  }
  // Show the details of a node, or those of the class of the selected group given by selectClass(), or none; marked
  // is a class of the group the node shows, marked among its classes
  displayNodeInfo(e, t) {
    var n, o, a;
    const i = this.dom.querySelector("#overview-node-info"), r = e !== void 0 && e === this.selectedNode ? this.selectedClass : void 0;
    i.innerHTML = e ? r ? this.classDetails(r) : this.nodeDetails(e, t) : "", (o = (n = i.querySelector(".overview-class.marked")) == null ? void 0 : n.scrollIntoView) == null || o.call(n, { block: "nearest" }), (a = this.renderer) == null || a.refresh({ skipIndexation: !0 });
  }
  // The details of a relation: its predicate, and the classes it goes from and to, those of a group with the group
  edgeDetails(e) {
    const t = this.graph.getEdgeAttributes(e), [i, r] = this.graph.extremities(e), o = !!t.inverse && this.edgeShown(t) && this.edgeShown(this.graph.getEdgeAttributes(t.inverse)) ? this.graph.getEdgeAttributes(t.inverse) : void 0, a = (v) => {
      var u;
      return (u = v.displayLabel) != null ? u : v.curie;
    }, h = (o == null ? void 0 : o.uri) === t.uri;
    let l = this.kind(o ? h ? "Symmetric relation" : "Relation and its inverse" : "Relation", !1);
    l += `<h3 class="overview-title">${V(o && !h ? `${a(t)} ⇄ ${a(o)}` : a(t))}</h3>`;
    for (const v of o && !h ? [t, o] : [t])
      l += this.iriLine(v.uri, v.displayLabel ? v.curie : v.uri), v.comment && (l += `<p class="overview-comment">${V(v.comment)}</p>`);
    const c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
    this.relationClasses(i, r, t, c, d), o && this.relationClasses(r, i, o, d, c);
    const f = (v, u, p) => {
      const E = /* @__PURE__ */ new Map();
      this.relationClasses(v, u, p, E, /* @__PURE__ */ new Map());
      const m = [...E.values()].filter((x) => x !== void 0);
      return m.length === 0 ? "" : ` · ${yt(m.reduce((x, g) => x + g, 0))} triples`;
    }, w = o ? `<div class="overview-arrow overview-arrow-both"><span>↓ ${V(a(t))}${f(i, r, t)}</span><span>↑ ${V(a(o))}${f(r, i, o)}</span></div>` : `<div class="overview-arrow">${V(a(t))}${f(i, r, t)}</div>`;
    return `<div class="overview-head">${l}</div><div class="overview-route">${this.relationEnd(i, c)}${w}${this.relationEnd(r, d)}</div>`;
  }
  // The classes of the relations an edge stands for, those it goes from and those it goes to, added to the maps given
  // with the triples of the relations; the ones to the metaclasses are apart, see buildGraph()
  relationClasses(e, t, i, r, n) {
    var h, l;
    const o = new Set((h = this.graph.getNodeAttribute(t, "members")) != null ? h : [t]), a = (c, d, f) => {
      var w;
      return c.set(d, f === void 0 ? c.get(d) : ((w = c.get(d)) != null ? w : 0) + f);
    };
    for (const c of (l = this.graph.getNodeAttribute(e, "members")) != null ? l : [e])
      for (const d of this.classGraph.outEdges(c)) {
        const f = this.classGraph.getEdgeAttributes(d), w = this.classGraph.target(d);
        f.uri !== i.uri || !o.has(w) || dr.has(w) === !!i.toMetaclass && (a(r, c, this.edgeTriples(f)), a(n, w, this.edgeTriples(f)));
      }
  }
  // An end of a relation: its class, or its group with those of its classes the relation goes from or to
  relationEnd(e, t) {
    const i = this.graph.getNodeAttribute(e, "members");
    if (!i)
      return this.classRow(e);
    const r = t.size === i.length ? `All its ${i.length} classes:` : `${t.size} of its ${i.length} classes:`, n = this.classList([...t].map(([o, a]) => [o, yt(a)]));
    return `<div class="overview-end">${this.groupName(e)}<p class="overview-end-note">${r}</p>${n}</div>`;
  }
  // The details of a node: a group of classes, or a class
  nodeDetails(e, t) {
    return this.groups.has(e) ? this.groupDetails(e, t) : this.classDetails(e);
  }
  // The details of a group of classes not expanded: its classes, a click on one showing its details while the group
  // stays one node, and their graphs, hierarchy and relations; marked is one of its classes, marked among them
  groupDetails(e, t) {
    var f;
    const i = this.graph.getNodeAttributes(e), r = i.members, n = this.groups.get(e);
    let o = this.kind(`Group of ${r.length} classes`);
    if (o += `<h3 class="overview-title">${V(i.name)}</h3>`, n.ancestor) {
      const w = n.covered === r.length ? "All its classes fall" : `${n.covered} of its classes fall`;
      o += `<p class="overview-comment">${w} under</p>${this.classRow(n.ancestor)}`;
    }
    o += `<button class="overview-action" data-expand="${V(e)}" title="Show the classes of the group as nodes">Expand group</button>`;
    let a = `<div class="overview-head" style="--overview-color: ${(f = this.clusters[i.cluster]) == null ? void 0 : f.color}">${o}</div>`;
    const l = `The classes of the group${r.some((w) => this.ownInstances(w) !== void 0) ? `, with the numbers of their instances in ${this.instancesWhere(r)}` : ""}; a click on one shows its details, the group staying one node.

${Be(r.length, "class", "classes")}`, c = this.classList(r.map((w) => [w, Vt(this.ownInstances(w))]), t);
    a += this.block("classes", "Classes", c, l, t);
    const d = "the classes of the group";
    return a += this.graphsBlock(i.clusters, d), a += this.hierarchyBlock(r), a += this.relationsBlock("object-properties", "Object properties", e, r, !0, d), a += this.relationsBlock("referenced-by", "Referenced by", e, r, !1, d), i.datatypes.length > 0 && (a += this.datatypesBlock(i.datatypes, d)), a += this.endpointsBlock(i.endpoints, d), a;
  }
  // The details of a class, also of one in a group not expanded: its group, its graphs, hierarchy and relations
  classDetails(e) {
    var o, a;
    const t = this.classGraph.getNodeAttributes(e);
    let i = this.kind("Class");
    i += `<h3 class="overview-title">${V((o = t.displayLabel) != null ? o : t.curie)}</h3>`, i += this.iriLine(e, t.displayLabel ? t.curie : e), t.comment && (i += `<p class="overview-comment">${V(t.comment)}</p>`);
    let r = `<div class="overview-head" style="--overview-color: ${(a = this.clusters[t.cluster]) == null ? void 0 : a.color}">${i}</div>`;
    const n = this.grouping ? this.groupOf.get(e) : void 0;
    return n && (r += this.groupBlock(e, n)), r += this.graphsBlock(t.clusters, "the class", t.instances), r += this.hierarchyBlock([e]), r += this.relationsBlock("object-properties", "Object properties", e, [e], !0, "the class"), r += this.relationsBlock("referenced-by", "Referenced by", e, [e], !1, "the class"), t.datatypes.length > 0 && (r += this.datatypesBlock(t.datatypes, "the class")), r += this.endpointsBlock(t.endpoints, "the class"), r;
  }
  // The group of a class: its name, its classes with the class marked, and the button expanding or collapsing it
  groupBlock(e, t) {
    const { members: i } = this.groups.get(t), r = this.expandedGroups.has(t), n = r ? `<button class="overview-action" data-collapse="${V(t)}" title="Show the classes of the group as one node">Collapse group</button>` : `<button class="overview-action" data-expand="${V(t)}" data-select="${V(e)}" title="Show the classes of the group as nodes, with this one selected">Expand group</button>`, o = i.some((l) => this.ownInstances(l) !== void 0), a = `The group of similar classes the class belongs to, ${r ? "shown as its classes" : "shown as one node"}${o ? `, with the numbers of their instances in ${this.instancesWhere(i)}` : ""}; a click on a class shows its details.

${Be(i.length, "class", "classes")}`, h = `${this.groupName(t)}${this.classList(i.map((l) => [l, Vt(this.ownInstances(l))]), e)}`;
    return this.block("group", "Group", `${h}${n}`, a);
  }
  // The name of a group, a click on which shows the details of the group while it is one node
  groupName(e) {
    var o;
    const { name: t, cluster: i } = this.groups.get(e), r = ` style="--overview-color: ${(o = this.clusters[i]) == null ? void 0 : o.color}"`, n = `<span class="overview-dot"></span><span>${V(t)}</span>`;
    return this.graph.hasNode(e) ? `<button class="overview-group-name" data-node="${V(e)}" title="Show the details of the group"${r}>${n}</button>` : `<div class="overview-group-name"${r}>${n}</div>`;
  }
  // The line naming what the details are about, after a dot of the color of the node
  kind(e, t = !0) {
    return `<div class="overview-kind">${t ? '<span class="overview-dot"></span>' : ""}${e}</div>`;
  }
  // A block of the details, which a click on its title closes and opens, the key keeping it closed in the details of
  // other nodes; the tooltip of the title tells what the block shows
  block(e, t, i, r, n) {
    const o = this.collapsedBlocks.has(e) && !n ? "" : " open";
    return `<details class="overview-block" data-block="${e}"${o}><summary class="overview-block-title" title="${V(r)}">${t}${wt}</summary>${i}</details>`;
  }
  // A button copying the given IRI whole, when the browser lets it, see initCopy(), right after the text it belongs to;
  // unless always shown, it shows only while the pointer is over its row, or the focus is in that, on a screen without a
  // pointer always; in a row that is a button itself, it is a span acting as a button
  copyButton(e, t = !1, i = !1) {
    return typeof navigator == "undefined" || !navigator.clipboard ? "" : `<${i ? 'span role="button" tabindex="0"' : "button"} class="overview-copy${t ? "" : " overview-copy-hover"}" data-copy="${V(e)}" title="Copy the IRI ${V(e)}" aria-label="Copy the IRI">${ch}</${i ? "span" : "button"}>`;
  }
  // The given text, escaped, followed by a button copying the given IRI, see copyButton(), which keeps to the last
  // characters of the text, so that it never goes to a line of its own
  textWithCopy(e, t, i = !1) {
    const r = this.copyButton(t, !1, i);
    if (!r)
      return V(e);
    const n = [...e], o = n.splice(Math.max(0, n.length - 3)).join("");
    return `${V(n.join(""))}<span class="overview-nowrap">${V(o)}${r}</span>`;
  }
  // An IRI, shortened when a CURIE is given, with a button copying it whole
  iriLine(e, t) {
    return `<div class="overview-iri"><span title="${V(e)}">${V(t)}</span>${this.copyButton(e, !0)}</div>`;
  }
  // The IRI of the named graph of the given name, see graphNames, unless it has none, as the default graph
  graphIri(e) {
    for (const [t, i] of this.graphNames)
      if (i === e)
        return t;
  }
  // The label of a class above its IRI, shortened by the prefixes, or the IRI alone for a class without a label
  className(e) {
    const t = this.getCurie(e), i = this.classLabel(e);
    return i === t ? `<span class="overview-class-name"><span class="overview-class-label">${this.textWithCopy(i, e, !0)}</span></span>` : `<span class="overview-class-name"><span class="overview-class-label">${V(i)}</span><span class="overview-class-iri">${this.textWithCopy(t, e, !0)}</span></span>`;
  }
  // A class with its label and IRI, colored by its graph, with a count, see countHtml(), e.g. the triples of a relation
  // to it or its instances, and a button copying its IRI; a click on a class of the VoID description shows its details,
  // and marked marks it
  classRow(e, t = "", i = !1) {
    var a;
    const n = `<span class="overview-dot${this.dataClasses.has(e) ? "" : " overview-hollow"}"></span>${this.className(e)}${t}`;
    if (!this.classGraph.hasNode(e))
      return `<span class="overview-class" title="${V(e)}">${n}</span>`;
    const o = (a = this.clusters[this.classGraph.getNodeAttribute(e, "cluster")]) == null ? void 0 : a.color;
    return `<button class="overview-class${i ? " marked" : ""}" data-class="${V(e)}" title="${V(e)}" style="--overview-color: ${o}">${n}</button>`;
  }
  // Classes with their counts, see classRow(), in a box, by their labels; marked is one of them, marked
  classList(e, t) {
    return `<div class="overview-members">${[...e].sort((r, n) => this.classLabel(r[0]).localeCompare(this.classLabel(n[0]))).map(([r, n]) => this.classRow(r, n, r === t)).join("")}</div>`;
  }
  // The label of a predicate with its CURIE and a button copying its IRI, its IRI and comment in the tooltip
  predicateName(e) {
    const t = this.labels.get(e), i = this.comments.get(e), r = `<span class="overview-curie">${this.textWithCopy(this.getCurie(e), e)}</span>`;
    return `<div class="overview-predicate" title="${V(i ? `${e}

${i}` : e)}">${t ? `<span class="overview-predicate-label">${V(t)}</span>` : ""}${r}</div>`;
  }
  // The named graphs the VoID description places classes in, the first one giving the node its color, with the
  // instances of a class in each of them, when given
  graphsBlock(e, t, i) {
    const r = (h) => {
      const l = this.graphIri(h);
      return l ? this.textWithCopy(h, l) : V(h);
    }, n = e.map((h) => {
      var l;
      return `<div class="overview-graph" style="--overview-color: ${(l = this.clusters[h]) == null ? void 0 : l.color}"><span class="overview-dot"></span><span class="overview-graph-name">${r(h)}</span>${Vt(i == null ? void 0 : i.get(h))}</div>`;
    }), o = e.some((h) => i == null ? void 0 : i.has(h)), a = e.length > 1 ? `The named graphs the VoID description places ${t} in${o ? ", with the number of its instances in each" : ""}; the node has the color of the first one.

${Be(e.length, "graph", "graphs")}` : `The named graph the VoID description places ${t} in${o ? ", with the number of its instances there" : ""}; the node has its color.`;
    return this.block("graphs", e.length > 1 ? "Named graphs" : "Named graph", `<div class="overview-graphs">${n.join("")}</div>`, a);
  }
  // The hierarchy of classes: their superclasses up to the top, and those of their subclasses that have data, or
  // subclasses with data, by the VoID description; the ways to the classes and their subclasses are open
  hierarchyBlock(e) {
    const t = new Set(e), i = (p) => {
      const E = /* @__PURE__ */ new Set(), m = [...e];
      for (; m.length > 0; )
        for (const x of p(m.pop()))
          E.has(x) || (E.add(x), m.push(x));
      return E;
    }, r = i((p) => {
      var E;
      return (E = this.superClasses.get(p)) != null ? E : [];
    }), n = i((p) => {
      var E;
      return [...(E = this.subClasses.get(p)) != null ? E : []].filter((m) => this.leadsToData.has(m));
    }), o = /* @__PURE__ */ new Set([...r, ...e, ...n]), a = (p) => {
      var E;
      return [...(E = this.superClasses.get(p)) != null ? E : []].filter((m) => o.has(m));
    };
    if (![...o].some((p) => a(p).length > 0))
      return "";
    const h = /* @__PURE__ */ new Map(), l = (p) => {
      var m;
      let E = h.get(p);
      if (E)
        return E;
      E = /* @__PURE__ */ new Set(), h.set(p, E);
      for (const x of (m = this.subClasses.get(p)) != null ? m : [])
        if (this.leadsToData.has(x)) {
          this.dataClasses.has(x) && E.add(x);
          for (const g of l(x))
            E.add(g);
        }
      return E;
    }, c = (p, E) => this.classLabel(p).localeCompare(this.classLabel(E));
    let d = oh;
    const f = (p, E) => {
      var S;
      if (d--, d < 0)
        return d === -1 ? '<li class="overview-tree-leaf">…</li>' : "";
      const m = [...(S = this.subClasses.get(p)) != null ? S : []].filter((k) => o.has(k) && !E.has(k)).sort(c), x = t.has(p) || n.has(p), g = this.treeEntry(p, t.has(p), x ? l(p).size : 0);
      if (m.length === 0)
        return `<li class="overview-tree-leaf">${g}</li>`;
      E.add(p);
      const y = m.map((k) => f(k, E)).join("");
      return E.delete(p), `<li><details class="overview-tree-node"${r.has(p) || t.has(p) ? " open" : ""}><summary>${g}</summary><ul>${y}</ul></details></li>`;
    }, v = [...o].filter((p) => a(p).length === 0).sort(c).map((p) => f(p, /* @__PURE__ */ new Set())).join("");
    return this.block("hierarchy", "Hierarchy", `<ul class="overview-tree">${v}</ul>`, "The superclasses up to the top, and the subclasses with data or with subclasses that have data, by the VoID description. A filled dot marks a class with data, a hollow one a class without, and a number the classes with data under a class; a click on a class of the VoID description shows its details.");
  }
  // A class in the hierarchy, with its label and IRI: one of the VoID description, a click on which shows its details,
  // or another one, with a button copying its IRI; a filled dot marks a class with data, and a number the classes with
  // data under it
  treeEntry(e, t, i) {
    var f;
    const r = this.getCurie(e), n = this.classLabel(e), o = this.dataClasses.has(e), a = `overview-tree-class${t ? " overview-focus" : ""}`, h = n === r ? this.textWithCopy(n, e, !0) : `${V(n)} <span class="overview-class-iri">${this.textWithCopy(r, e, !0)}</span>`, l = `<span class="overview-dot${o ? "" : " overview-hollow"}"></span><span class="overview-tree-name">${h}</span>`, c = i > 0 ? `<span class="overview-tree-count" title="${i} ${i > 1 ? "subclasses" : "subclass"} with data">${i}</span>` : "";
    if (!this.classGraph.hasNode(e))
      return `<span class="${a}" title="${V(o ? e : `${e}, without data`)}">${l}</span>${c}`;
    const d = (f = this.clusters[this.classGraph.getNodeAttribute(e, "cluster")]) == null ? void 0 : f.color;
    return `<button class="${a}" data-class="${V(e)}" title="${V(e)}" style="--overview-color: ${d}">${l}</button>${c}`;
  }
  // The relations of the given classes to other classes, outgoing or incoming, by their predicates, those of several
  // classes merged with their triples summed; the predicates of most triples first
  relationsOf(e, t) {
    var r;
    const i = /* @__PURE__ */ new Map();
    for (const n of e)
      for (const o of t ? this.classGraph.outEdges(n) : this.classGraph.inEdges(n)) {
        const a = this.classGraph.getEdgeAttributes(o), h = t ? this.classGraph.target(o) : this.classGraph.source(o);
        i.has(a.uri) || i.set(a.uri, { uri: a.uri, classes: /* @__PURE__ */ new Map() });
        const l = i.get(a.uri), c = l.classes.get(h), d = this.edgeTriples(a);
        l.classes.set(h, d === void 0 ? c : (c != null ? c : 0) + d), d !== void 0 && (l.triples = ((r = l.triples) != null ? r : 0) + d);
      }
    return [...i.values()].sort((n, o) => {
      var a, h;
      return ((a = o.triples) != null ? a : 0) - ((h = n.triples) != null ? h : 0) || o.classes.size - n.classes.size || n.uri.localeCompare(o.uri);
    });
  }
  // The relations of classes to other classes, outgoing or incoming, by their predicates, each with the first classes
  // at the other ends and a button showing the others, see showMore(); holder is the class or the group of the classes
  relationsBlock(e, t, i, r, n, o) {
    const a = this.relationsOf(r, n);
    if (a.length === 0)
      return "";
    const h = a.map((d) => {
      const f = d.classes.size - Yt, w = f > 0 ? `<button class="overview-more" data-for="${V(i)}" data-more="${n ? ">" : "<"} ${V(d.uri)}">+ ${f} more</button>` : "", v = this.relationRows(d, 0, Yt).join("");
      return `<div class="overview-property">${this.predicateName(d.uri)}<div class="overview-classes">${v}${w}</div></div>`;
    }), l = n ? `The predicates of the instances of ${o} whose values are instances of other classes, with these classes` : `The predicates whose values are instances of ${o}, with the classes of their subjects`, c = Be(a.length, "predicate", "predicates");
    return this.block(e, t, h.join(""), `${l}; a click on a class shows its details.

${c}`);
  }
  // The classes at the other ends of relations by a predicate, of most triples first, from start on
  relationRows({ classes: e }, t = 0, i = e.size) {
    return [...e].sort((r, n) => {
      var o, a;
      return ((o = n[1]) != null ? o : 0) - ((a = r[1]) != null ? a : 0) || this.classLabel(r[0]).localeCompare(this.classLabel(n[0]));
    }).slice(t, i).map(([r, n]) => this.classRow(r, yt(n)));
  }
  // Replace the button of a relations block by the classes it holds back, see relationsBlock()
  showMore(e, t, i) {
    var a, h;
    const r = (h = (a = this.groups.get(t)) == null ? void 0 : a.members) != null ? h : this.classGraph.hasNode(t) ? [t] : [], n = i.slice(2), o = this.relationsOf(r, i.startsWith(">")).find((l) => l.uri === n);
    o && (e.outerHTML = this.relationRows(o, Yt).join(""));
  }
  // The data properties by their predicates, with the datatypes of their values and the triples
  datatypesBlock(e, t) {
    var h;
    const i = /* @__PURE__ */ new Map();
    for (const l of e)
      i.set(l.predUri, [...(h = i.get(l.predUri)) != null ? h : [], l]);
    const r = (l) => {
      var c;
      return (c = this.shownTriples(l.graphTriples)) != null ? c : l.count;
    }, n = (l) => l.reduce((c, d) => {
      var f;
      return c + ((f = r(d)) != null ? f : 0);
    }, 0), o = [...i].sort((l, c) => n(c[1]) - n(l[1]) || l[0].localeCompare(c[0])).map(([l, c]) => {
      const d = c.sort((f, w) => {
        var v, u;
        return ((v = r(w)) != null ? v : 0) - ((u = r(f)) != null ? u : 0);
      }).map((f) => `<div class="overview-datatype"><span class="overview-pill" title="${V(f.datatypeUri)}">${V(f.datatypeCurie)}</span>${this.copyButton(f.datatypeUri)}${yt(r(f))}</div>`);
      return `<div class="overview-property">${this.predicateName(l)}<div class="overview-datatypes">${d.join("")}</div></div>`;
    }), a = `The predicates of the instances of ${t} whose values are literals, with their datatypes and the numbers of triples.

${Be(i.size, "predicate", "predicates")}`;
    return this.block("data-properties", "Data properties", o.join(""), a);
  }
  // The endpoints whose VoID descriptions hold classes, when there are several
  endpointsBlock(e, t) {
    if (Object.keys(this.endpoints).length < 2)
      return "";
    const i = e.map((n) => `<div class="overview-curie overview-endpoint">${this.textWithCopy(n, n)}</div>`), r = `The endpoints whose VoID descriptions hold ${t}.

${Be(e.length, "endpoint", "endpoints")}`;
    return this.block("endpoints", "Endpoints", i.join(""), r);
  }
  // Select a node as a click on it does, and show its details; marked is a class of the group the node shows, marked
  // among its classes
  selectNode(e, t) {
    this.graph.hasNode(e) && (this.selectedNodes = /* @__PURE__ */ new Set([e]), this.selectedNode = e, this.selectedClass = void 0, this.showSelection(t));
  }
  // Select the node showing a class, the class or the group not expanded it is in, and show the details of the class
  selectClass(e) {
    const t = this.shownAs.get(e);
    !t || !this.graph.hasNode(t) || (this.selectedNodes = /* @__PURE__ */ new Set([t]), this.selectedNode = t, this.selectedClass = t === e ? void 0 : e, this.showSelection());
  }
  // Show the details of the selected node from their top, and bring the node into the view when out of it
  showSelection(e) {
    if (!this.selectedNode || (this.selectedEdge = void 0, this.displayEdgeInfo(), this.dom.querySelector("#overview-details").scrollTop = 0, this.displayNodeInfo(this.selectedNode, e), !this.renderer))
      return;
    const { x: t, y: i } = this.renderer.graphToViewport(this.graph.getNodeAttributes(this.selectedNode)), { width: r, height: n } = this.renderer.getDimensions();
    if (t >= 0 && i >= 0 && t <= r && i <= n)
      return;
    const o = this.renderer.getNodeDisplayData(this.selectedNode);
    o && this.renderer.getCamera().animate({ x: o.x, y: o.y }, { duration: 500 });
  }
  // https://www.sigmajs.org/storybook/?path=/story/use-reducers--story
  setSearchQuery(e) {
    var i, r, n, o;
    this.searchQuery = e;
    const t = this.dom.querySelector("#search-input");
    if (t.value !== e && (t.value = e), e) {
      const a = e.toLowerCase(), h = this.graph.nodes().map((l) => ({ id: l, names: this.nodeNames(l) })).filter(({ names: l }) => l.some((c) => c.toLowerCase().includes(a)));
      if (h.length === 1 && h[0].names.includes(e)) {
        this.selectedNode = h[0].id;
        const l = (i = this.graph.getNodeAttribute(this.selectedNode, "members")) != null ? i : [];
        this.selectedClass = l.find((d) => this.classGraph.getNodeAttribute(d, "label") === e), this.displayNodeInfo(h[0].id), this.suggestions = void 0;
        const c = (r = this.renderer) == null ? void 0 : r.getNodeDisplayData(this.selectedNode);
        (n = this.renderer) == null || n.getCamera().animate(c, { duration: 500 });
      } else
        this.suggestions = new Set(h.map(({ id: l }) => l));
    } else
      this.suggestions = void 0;
    (o = this.renderer) == null || o.refresh({ skipIndexation: !0 });
  }
  setHoveredNode(e) {
    var t;
    e && (this.hoveredNode = e, this.hoveredNeighbors = new Set(this.graph.neighbors(e))), e || (this.hoveredNode = void 0, this.hoveredNeighbors = void 0), (t = this.renderer) == null || t.refresh({
      // partialGraph: {
      //   nodes,
      //   edges,
      // },
      // We don't touch the graph data so we can skip its reindexation
      skipIndexation: !0
    });
  }
  displayMsg(e, t = !1) {
    const i = this.dom.querySelector("#loading-msg");
    e ? (i.style.color = t ? "red" : "black", i.innerHTML = e, i.style.display = "") : i.style.display = "none";
  }
  // TODO: NOT USED, remove, should be done in parent (e.g. sparql-editor)
  // Fetch endpoints metadata in parallel (prefixes, VoID)
  // async fetchEndpointsMetadata(endpoints: string[]) {
  //   const prefixes: {[key: string]: string} = {};
  //   const metadata: any = {};
  //   // Function to fetch prefixes and VoID data for one endpoint
  //   const fetchEndpointMetadata = async (endpoint: string) => {
  //     try {
  //       const [endpointPrefixes, voidInfo] = await Promise.all([getPrefixes(endpoint), getVoidDescription(endpoint)]);
  //       // Merge results
  //       Object.assign(prefixes, endpointPrefixes); // Merge prefixes into shared object
  //       metadata[endpoint] = {prefixes: endpointPrefixes, void: voidInfo};
  //     } catch (err) {
  //       this.displayMsg(`Error fetching metadata for endpoint ${endpoint}: ${err}`, true);
  //     }
  //   };
  //   // Run all endpoint metadata fetches in parallel
  //   await Promise.all(endpoints.map(fetchEndpointMetadata));
  //   return {prefixes, metadata};
  // }
  renderPredicatesFilter() {
    const e = this.dom.querySelector("#overview-predicates-list");
    this.predicates = {}, this.graph.forEachEdge((i, r, n, o) => {
      this.hiddenByGraphs(this.graph.getNodeAttributes(n)) || this.hiddenByGraphs(this.graph.getNodeAttributes(o)) || this.hideEdgesToMetaclasses && r.toMetaclass || this.edgeHiddenByGraphs(r) || (this.predicates[r.curie] ? this.predicates[r.curie].count += 1 : this.predicates[r.curie] = { count: 1, label: r.label, uri: r.uri });
    });
    const t = Object.entries(this.predicates).sort((i, r) => r[1].count - i[1].count);
    e.replaceChildren(...t.map(([i, { count: r, label: n, uri: o }]) => this.filterRow(!this.hidePredicates.has(i), (a) => this.togglePredicate(i, a), n, n === i ? void 0 : i, r, o, void 0, o))), this.updateFilterTitle("settings-predicates", t.length, "predicate", "predicates");
  }
  // A row of a filter: a checkbox showing or hiding what it stands for, a dot of the color of a graph, the label and
  // CURIE of the predicate or the graph, the number of the relations or classes, and a button copying the IRI given
  filterRow(e, t, i, r, n, o, a, h) {
    const l = document.createElement("label");
    l.className = "overview-filter", l.title = o;
    const c = a ? `<span class="overview-dot" style="--overview-color: ${a}"></span>` : "", d = (v) => h ? this.textWithCopy(v, h) : V(v), f = r ? `${V(i)} <span class="overview-filter-iri">${d(r)}</span>` : d(i);
    l.innerHTML = `<input type="checkbox"${e ? " checked" : ""}>${c}<span class="overview-filter-name">${f}</span><span class="overview-filter-count">${n.toLocaleString()}</span>`;
    const w = l.querySelector("input");
    return w.addEventListener("change", () => t(w.checked)), l;
  }
  // The tooltip of the title of a section of the settings, with the number of its items
  updateFilterTitle(e, t, i, r) {
    const n = this.dom.querySelector(`[data-block="${e}"] .overview-section-title`);
    if (!n)
      return;
    const o = e === "settings-predicates" ? "The predicates of the relations between the classes shown, by the numbers of these relations; unchecked, a predicate has its relations hidden." : "The named graphs of the classes, in the colors of their nodes, by their numbers of classes; unchecked, a graph has its classes hidden, unless they are in another graph shown.";
    n.title = `${o}

${Be(t, i, r)}`;
  }
  togglePredicate(e, t) {
    t ? this.hidePredicates.delete(e) : this.hidePredicates.add(e), this.refreshFilters();
  }
  renderClustersFilter() {
    const e = this.dom.querySelector("#overview-clusters-list"), t = Object.entries(this.clusters).filter(([, r]) => r.count > 0).sort((r, n) => n[1].count - r[1].count), i = Object.keys(this.endpoints).length;
    e.replaceChildren(...t.map(([r, { count: n, color: o, endpoint: a }]) => this.filterRow(
      !this.hideClusters.has(r),
      (h) => this.toggleCluster(r, h),
      r,
      void 0,
      n,
      // the endpoint, when there are several, and what the metadata of the endpoints are
      r === eh ? "Show metadata classes (ontology, SHACL, VoID, examples)" : i > 1 ? a : r,
      o,
      this.graphIri(r)
    ))), this.updateFilterTitle("settings-graphs", t.length, "graph", "graphs"), this.updateGraphSetChoice();
  }
  toggleCluster(e, t) {
    t ? this.hideClusters.delete(e) : this.hideClusters.add(e), this.updateGraphSetChoice(), this.renderPredicatesFilter(), this.refreshGraphFilter();
  }
  // The names of the graphs a set of graphs leaves hidden: all those known but the graphs of the set, see GraphSet
  hiddenBy(e) {
    const t = (o, a) => {
      var h;
      return (h = o == null ? void 0 : o.some((l) => l.endsWith("*") ? a.startsWith(l.slice(0, -1)) : a === l)) != null ? h : !1;
    }, i = /* @__PURE__ */ new Set();
    for (const [o, a] of this.graphNames)
      (e.graphs === void 0 || t(e.graphs, o)) && !t(e.except, o) && i.add(a);
    const r = new Set(this.graphNames.values()), n = /* @__PURE__ */ new Set([...Object.keys(this.clusters), ...r]);
    if (e.graphs === void 0)
      for (const o of n)
        r.has(o) || i.add(o);
    return new Set([...n].filter((o) => !i.has(o)));
  }
  // Show the graphs of a set and hide the others, laying out the classes shown again, see refreshGraphFilter()
  showGraphSet(e) {
    this.hideClusters = this.hiddenBy(e), this.renderClustersFilter(), this.renderPredicatesFilter(), this.refreshGraphFilter();
  }
  // Show in the choice of the sets of graphs the set the filter of graphs shows, if any
  updateGraphSetChoice() {
    const e = this.dom.querySelector("#overview-graph-set");
    if (!e)
      return;
    const t = (r) => r.size === this.hideClusters.size && [...r].every((n) => this.hideClusters.has(n)), i = this.graphSets.findIndex((r) => t(this.hiddenBy(r)));
    e.value = i < 0 ? "" : String(i);
  }
  getCurie(e) {
    return Ha(this.prefixes, e);
  }
  // Whether the graph filter hides a node: when all the graphs of its classes are hidden
  hiddenByGraphs(e) {
    return this.hideClusters.size > 0 && e.clusters.every((t) => this.hideClusters.has(t));
  }
  // The triples of a relation or of a datatype of values by graph, see initGraph(), in the graphs shown: those of the
  // named graphs shown, or, for one the description places in no named graph, those of the default graph (which are
  // those of all the named graphs together in IDSM); none without counts, or with all its graphs hidden
  shownTriples(e) {
    if (!e || e.size === 0)
      return;
    const t = [...e].filter(([r]) => r !== at), i = (t.length > 0 ? t : [...e]).filter(([r]) => !this.hideClusters.has(r));
    return i.length === 0 ? void 0 : i.reduce((r, [, n]) => r + n, 0);
  }
  // The triples of a relation between two classes, see shownTriples(), or those of the property partition of the
  // relation, when the description counts it so
  edgeTriples(e) {
    return e.graphTriples ? this.shownTriples(e.graphTriples) : e.triples;
  }
  // Whether the filters hide a node: the graph filter, or the one of the nodes without shown relations
  hiddenByFilters(e, t = this.graph.getNodeAttributes(e)) {
    return this.hiddenByGraphs(t) || this.hideIsolatedClasses && this.isolated.has(e);
  }
  // Whether the filters of predicates, of the relations to metaclasses and of graphs show an edge
  edgeShown(e) {
    return !this.hidePredicates.has(e.curie) && !(this.hideEdgesToMetaclasses && e.toMetaclass) && !this.edgeHiddenByGraphs(e);
  }
  // Whether the graph filter hides an edge: when all the graphs of its relations are hidden; one of no known graph
  // goes with its nodes only
  edgeHiddenByGraphs(e) {
    var i;
    const t = (i = e.graphs) != null ? i : [];
    return this.hideClusters.size > 0 && t.length > 0 && t.every((r) => this.hideClusters.has(r));
  }
  // The nodes without relations to other nodes shown by the filters, of the shown graph or of one being built
  updateIsolated(e = this.graph) {
    this.isolated = new Set(e.nodes()), e.forEachEdge((t, i, r, n, o, a) => {
      r === n || !this.edgeShown(i) || this.hiddenByGraphs(o) || this.hiddenByGraphs(a) || (this.isolated.delete(r), this.isolated.delete(n));
    });
  }
  // Show the result of a change of the filters: the nodes left without relations, and the view fitting the shown ones;
  // the nodes shown then count as settled, see settle()
  refreshFilters() {
    var e;
    this.updateIsolated(), this.fitShown(), (e = this.renderer) == null || e.refresh({ skipIndexation: !0 }), this.settle();
  }
  // The names a node is found by: its label, and for a group also the labels of its classes
  nodeNames(e) {
    const t = this.graph.getNodeAttributes(e);
    return t.members ? [t.name, ...t.members.map((i) => this.classGraph.getNodeAttribute(i, "label"))] : [t.label];
  }
}
export {
  Uh as SparqlOverview,
  Bh as loadOverview,
  Xa as prefixQuery,
  Ya as voidQuery
};
//# sourceMappingURL=sparql-overview.js.map
