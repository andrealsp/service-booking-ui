(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) l(n);
  new MutationObserver((n) => {
    for (const i of n)
      if (i.type === "childList")
        for (const u of i.addedNodes)
          u.tagName === "LINK" && u.rel === "modulepreload" && l(u);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(n) {
    const i = {};
    return (
      n.integrity && (i.integrity = n.integrity),
      n.referrerPolicy && (i.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : n.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function l(n) {
    if (n.ep) return;
    n.ep = !0;
    const i = a(n);
    fetch(n.href, i);
  }
})();
function ud(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var cd = { exports: {} },
  qu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wh = Symbol.for("react.transitional.element"),
  Ph = Symbol.for("react.fragment");
function sd(e, t, a) {
  var l = null;
  if (
    (a !== void 0 && (l = "" + a),
    t.key !== void 0 && (l = "" + t.key),
    "key" in t)
  ) {
    a = {};
    for (var n in t) n !== "key" && (a[n] = t[n]);
  } else a = t;
  return (
    (t = a.ref),
    { $$typeof: Wh, type: e, key: l, ref: t !== void 0 ? t : null, props: a }
  );
}
qu.Fragment = Ph;
qu.jsx = sd;
qu.jsxs = sd;
cd.exports = qu;
var c = cd.exports,
  rd = { exports: {} },
  B = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ps = Symbol.for("react.transitional.element"),
  Ih = Symbol.for("react.portal"),
  em = Symbol.for("react.fragment"),
  tm = Symbol.for("react.strict_mode"),
  am = Symbol.for("react.profiler"),
  lm = Symbol.for("react.consumer"),
  nm = Symbol.for("react.context"),
  im = Symbol.for("react.forward_ref"),
  um = Symbol.for("react.suspense"),
  cm = Symbol.for("react.memo"),
  od = Symbol.for("react.lazy"),
  sm = Symbol.for("react.activity"),
  oo = Symbol.iterator;
function rm(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (oo && e[oo]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var fd = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  dd = Object.assign,
  hd = {};
function Wl(e, t, a) {
  ((this.props = e),
    (this.context = t),
    (this.refs = hd),
    (this.updater = a || fd));
}
Wl.prototype.isReactComponent = {};
Wl.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Wl.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function md() {}
md.prototype = Wl.prototype;
function Is(e, t, a) {
  ((this.props = e),
    (this.context = t),
    (this.refs = hd),
    (this.updater = a || fd));
}
var er = (Is.prototype = new md());
er.constructor = Is;
dd(er, Wl.prototype);
er.isPureReactComponent = !0;
var fo = Array.isArray;
function Wc() {}
var de = { H: null, A: null, T: null, S: null },
  pd = Object.prototype.hasOwnProperty;
function tr(e, t, a) {
  var l = a.ref;
  return {
    $$typeof: Ps,
    type: e,
    key: t,
    ref: l !== void 0 ? l : null,
    props: a,
  };
}
function om(e, t) {
  return tr(e.type, t, e.props);
}
function ar(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ps;
}
function fm(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (a) {
      return t[a];
    })
  );
}
var ho = /\/+/g;
function sc(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? fm("" + e.key)
    : t.toString(36);
}
function dm(e) {
  switch (e.status) {
    case "fulfilled":
      return e.value;
    case "rejected":
      throw e.reason;
    default:
      switch (
        (typeof e.status == "string"
          ? e.then(Wc, Wc)
          : ((e.status = "pending"),
            e.then(
              function (t) {
                e.status === "pending" &&
                  ((e.status = "fulfilled"), (e.value = t));
              },
              function (t) {
                e.status === "pending" &&
                  ((e.status = "rejected"), (e.reason = t));
              },
            )),
        e.status)
      ) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw e.reason;
      }
  }
  throw e;
}
function pl(e, t, a, l, n) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var u = !1;
  if (e === null) u = !0;
  else
    switch (i) {
      case "bigint":
      case "string":
      case "number":
        u = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Ps:
          case Ih:
            u = !0;
            break;
          case od:
            return ((u = e._init), pl(u(e._payload), t, a, l, n));
        }
    }
  if (u)
    return (
      (n = n(e)),
      (u = l === "" ? "." + sc(e, 0) : l),
      fo(n)
        ? ((a = ""),
          u != null && (a = u.replace(ho, "$&/") + "/"),
          pl(n, t, a, "", function (o) {
            return o;
          }))
        : n != null &&
          (ar(n) &&
            (n = om(
              n,
              a +
                (n.key == null || (e && e.key === n.key)
                  ? ""
                  : ("" + n.key).replace(ho, "$&/") + "/") +
                u,
            )),
          t.push(n)),
      1
    );
  u = 0;
  var s = l === "" ? "." : l + ":";
  if (fo(e))
    for (var r = 0; r < e.length; r++)
      ((l = e[r]), (i = s + sc(l, r)), (u += pl(l, t, a, i, n)));
  else if (((r = rm(e)), typeof r == "function"))
    for (e = r.call(e), r = 0; !(l = e.next()).done; )
      ((l = l.value), (i = s + sc(l, r++)), (u += pl(l, t, a, i, n)));
  else if (i === "object") {
    if (typeof e.then == "function") return pl(dm(e), t, a, l, n);
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  }
  return u;
}
function bi(e, t, a) {
  if (e == null) return e;
  var l = [],
    n = 0;
  return (
    pl(e, l, "", "", function (i) {
      return t.call(a, i, n++);
    }),
    l
  );
}
function hm(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (a) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = a));
        },
        function (a) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = a));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var mo =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        },
  mm = {
    map: bi,
    forEach: function (e, t, a) {
      bi(
        e,
        function () {
          t.apply(this, arguments);
        },
        a,
      );
    },
    count: function (e) {
      var t = 0;
      return (
        bi(e, function () {
          t++;
        }),
        t
      );
    },
    toArray: function (e) {
      return (
        bi(e, function (t) {
          return t;
        }) || []
      );
    },
    only: function (e) {
      if (!ar(e))
        throw Error(
          "React.Children.only expected to receive a single React element child.",
        );
      return e;
    },
  };
B.Activity = sm;
B.Children = mm;
B.Component = Wl;
B.Fragment = em;
B.Profiler = am;
B.PureComponent = Is;
B.StrictMode = tm;
B.Suspense = um;
B.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = de;
B.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function (e) {
    return de.H.useMemoCache(e);
  },
};
B.cache = function (e) {
  return function () {
    return e.apply(null, arguments);
  };
};
B.cacheSignal = function () {
  return null;
};
B.cloneElement = function (e, t, a) {
  if (e == null)
    throw Error(
      "The argument must be a React element, but you passed " + e + ".",
    );
  var l = dd({}, e.props),
    n = e.key;
  if (t != null)
    for (i in (t.key !== void 0 && (n = "" + t.key), t))
      !pd.call(t, i) ||
        i === "key" ||
        i === "__self" ||
        i === "__source" ||
        (i === "ref" && t.ref === void 0) ||
        (l[i] = t[i]);
  var i = arguments.length - 2;
  if (i === 1) l.children = a;
  else if (1 < i) {
    for (var u = Array(i), s = 0; s < i; s++) u[s] = arguments[s + 2];
    l.children = u;
  }
  return tr(e.type, n, l);
};
B.createContext = function (e) {
  return (
    (e = {
      $$typeof: nm,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
    }),
    (e.Provider = e),
    (e.Consumer = { $$typeof: lm, _context: e }),
    e
  );
};
B.createElement = function (e, t, a) {
  var l,
    n = {},
    i = null;
  if (t != null)
    for (l in (t.key !== void 0 && (i = "" + t.key), t))
      pd.call(t, l) &&
        l !== "key" &&
        l !== "__self" &&
        l !== "__source" &&
        (n[l] = t[l]);
  var u = arguments.length - 2;
  if (u === 1) n.children = a;
  else if (1 < u) {
    for (var s = Array(u), r = 0; r < u; r++) s[r] = arguments[r + 2];
    n.children = s;
  }
  if (e && e.defaultProps)
    for (l in ((u = e.defaultProps), u)) n[l] === void 0 && (n[l] = u[l]);
  return tr(e, i, n);
};
B.createRef = function () {
  return { current: null };
};
B.forwardRef = function (e) {
  return { $$typeof: im, render: e };
};
B.isValidElement = ar;
B.lazy = function (e) {
  return { $$typeof: od, _payload: { _status: -1, _result: e }, _init: hm };
};
B.memo = function (e, t) {
  return { $$typeof: cm, type: e, compare: t === void 0 ? null : t };
};
B.startTransition = function (e) {
  var t = de.T,
    a = {};
  de.T = a;
  try {
    var l = e(),
      n = de.S;
    (n !== null && n(a, l),
      typeof l == "object" &&
        l !== null &&
        typeof l.then == "function" &&
        l.then(Wc, mo));
  } catch (i) {
    mo(i);
  } finally {
    (t !== null && a.types !== null && (t.types = a.types), (de.T = t));
  }
};
B.unstable_useCacheRefresh = function () {
  return de.H.useCacheRefresh();
};
B.use = function (e) {
  return de.H.use(e);
};
B.useActionState = function (e, t, a) {
  return de.H.useActionState(e, t, a);
};
B.useCallback = function (e, t) {
  return de.H.useCallback(e, t);
};
B.useContext = function (e) {
  return de.H.useContext(e);
};
B.useDebugValue = function () {};
B.useDeferredValue = function (e, t) {
  return de.H.useDeferredValue(e, t);
};
B.useEffect = function (e, t) {
  return de.H.useEffect(e, t);
};
B.useEffectEvent = function (e) {
  return de.H.useEffectEvent(e);
};
B.useId = function () {
  return de.H.useId();
};
B.useImperativeHandle = function (e, t, a) {
  return de.H.useImperativeHandle(e, t, a);
};
B.useInsertionEffect = function (e, t) {
  return de.H.useInsertionEffect(e, t);
};
B.useLayoutEffect = function (e, t) {
  return de.H.useLayoutEffect(e, t);
};
B.useMemo = function (e, t) {
  return de.H.useMemo(e, t);
};
B.useOptimistic = function (e, t) {
  return de.H.useOptimistic(e, t);
};
B.useReducer = function (e, t, a) {
  return de.H.useReducer(e, t, a);
};
B.useRef = function (e) {
  return de.H.useRef(e);
};
B.useState = function (e) {
  return de.H.useState(e);
};
B.useSyncExternalStore = function (e, t, a) {
  return de.H.useSyncExternalStore(e, t, a);
};
B.useTransition = function () {
  return de.H.useTransition();
};
B.version = "19.2.4";
rd.exports = B;
var g = rd.exports;
const Na = ud(g);
var vd = { exports: {} },
  Yu = {},
  gd = { exports: {} },
  yd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(A, O) {
    var L = A.length;
    A.push(O);
    e: for (; 0 < L; ) {
      var J = (L - 1) >>> 1,
        I = A[J];
      if (0 < n(I, O)) ((A[J] = O), (A[L] = I), (L = J));
      else break e;
    }
  }
  function a(A) {
    return A.length === 0 ? null : A[0];
  }
  function l(A) {
    if (A.length === 0) return null;
    var O = A[0],
      L = A.pop();
    if (L !== O) {
      A[0] = L;
      e: for (var J = 0, I = A.length, T = I >>> 1; J < T; ) {
        var G = 2 * (J + 1) - 1,
          $e = A[G],
          Te = G + 1,
          Vt = A[Te];
        if (0 > n($e, L))
          Te < I && 0 > n(Vt, $e)
            ? ((A[J] = Vt), (A[Te] = L), (J = Te))
            : ((A[J] = $e), (A[G] = L), (J = G));
        else if (Te < I && 0 > n(Vt, L)) ((A[J] = Vt), (A[Te] = L), (J = Te));
        else break e;
      }
    }
    return O;
  }
  function n(A, O) {
    var L = A.sortIndex - O.sortIndex;
    return L !== 0 ? L : A.id - O.id;
  }
  if (
    ((e.unstable_now = void 0),
    typeof performance == "object" && typeof performance.now == "function")
  ) {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var u = Date,
      s = u.now();
    e.unstable_now = function () {
      return u.now() - s;
    };
  }
  var r = [],
    o = [],
    f = 1,
    p = null,
    h = 3,
    v = !1,
    S = !1,
    b = !1,
    x = !1,
    d = typeof setTimeout == "function" ? setTimeout : null,
    m = typeof clearTimeout == "function" ? clearTimeout : null,
    y = typeof setImmediate < "u" ? setImmediate : null;
  function _(A) {
    for (var O = a(o); O !== null; ) {
      if (O.callback === null) l(o);
      else if (O.startTime <= A)
        (l(o), (O.sortIndex = O.expirationTime), t(r, O));
      else break;
      O = a(o);
    }
  }
  function E(A) {
    if (((b = !1), _(A), !S))
      if (a(r) !== null) ((S = !0), C || ((C = !0), se()));
      else {
        var O = a(o);
        O !== null && R(E, O.startTime - A);
      }
  }
  var C = !1,
    w = -1,
    j = 5,
    z = -1;
  function M() {
    return x ? !0 : !(e.unstable_now() - z < j);
  }
  function P() {
    if (((x = !1), C)) {
      var A = e.unstable_now();
      z = A;
      var O = !0;
      try {
        e: {
          ((S = !1), b && ((b = !1), m(w), (w = -1)), (v = !0));
          var L = h;
          try {
            t: {
              for (
                _(A), p = a(r);
                p !== null && !(p.expirationTime > A && M());
              ) {
                var J = p.callback;
                if (typeof J == "function") {
                  ((p.callback = null), (h = p.priorityLevel));
                  var I = J(p.expirationTime <= A);
                  if (((A = e.unstable_now()), typeof I == "function")) {
                    ((p.callback = I), _(A), (O = !0));
                    break t;
                  }
                  (p === a(r) && l(r), _(A));
                } else l(r);
                p = a(r);
              }
              if (p !== null) O = !0;
              else {
                var T = a(o);
                (T !== null && R(E, T.startTime - A), (O = !1));
              }
            }
            break e;
          } finally {
            ((p = null), (h = L), (v = !1));
          }
          O = void 0;
        }
      } finally {
        O ? se() : (C = !1);
      }
    }
  }
  var se;
  if (typeof y == "function")
    se = function () {
      y(P);
    };
  else if (typeof MessageChannel < "u") {
    var lt = new MessageChannel(),
      Ve = lt.port2;
    ((lt.port1.onmessage = P),
      (se = function () {
        Ve.postMessage(null);
      }));
  } else
    se = function () {
      d(P, 0);
    };
  function R(A, O) {
    w = d(function () {
      A(e.unstable_now());
    }, O);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (A) {
      A.callback = null;
    }),
    (e.unstable_forceFrameRate = function (A) {
      0 > A || 125 < A
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (j = 0 < A ? Math.floor(1e3 / A) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_next = function (A) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = h;
      }
      var L = h;
      h = O;
      try {
        return A();
      } finally {
        h = L;
      }
    }),
    (e.unstable_requestPaint = function () {
      x = !0;
    }),
    (e.unstable_runWithPriority = function (A, O) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3;
      }
      var L = h;
      h = A;
      try {
        return O();
      } finally {
        h = L;
      }
    }),
    (e.unstable_scheduleCallback = function (A, O, L) {
      var J = e.unstable_now();
      switch (
        (typeof L == "object" && L !== null
          ? ((L = L.delay), (L = typeof L == "number" && 0 < L ? J + L : J))
          : (L = J),
        A)
      ) {
        case 1:
          var I = -1;
          break;
        case 2:
          I = 250;
          break;
        case 5:
          I = 1073741823;
          break;
        case 4:
          I = 1e4;
          break;
        default:
          I = 5e3;
      }
      return (
        (I = L + I),
        (A = {
          id: f++,
          callback: O,
          priorityLevel: A,
          startTime: L,
          expirationTime: I,
          sortIndex: -1,
        }),
        L > J
          ? ((A.sortIndex = L),
            t(o, A),
            a(r) === null &&
              A === a(o) &&
              (b ? (m(w), (w = -1)) : (b = !0), R(E, L - J)))
          : ((A.sortIndex = I),
            t(r, A),
            S || v || ((S = !0), C || ((C = !0), se()))),
        A
      );
    }),
    (e.unstable_shouldYield = M),
    (e.unstable_wrapCallback = function (A) {
      var O = h;
      return function () {
        var L = h;
        h = O;
        try {
          return A.apply(this, arguments);
        } finally {
          h = L;
        }
      };
    }));
})(yd);
gd.exports = yd;
var pm = gd.exports,
  _d = { exports: {} },
  Ke = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vm = g;
function bd(e) {
  var t = "https://react.dev/errors/" + e;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var a = 2; a < arguments.length; a++)
      t += "&args[]=" + encodeURIComponent(arguments[a]);
  }
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function fa() {}
var ke = {
    d: {
      f: fa,
      r: function () {
        throw Error(bd(522));
      },
      D: fa,
      C: fa,
      L: fa,
      m: fa,
      X: fa,
      S: fa,
      M: fa,
    },
    p: 0,
    findDOMNode: null,
  },
  gm = Symbol.for("react.portal");
function ym(e, t, a) {
  var l = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: gm,
    key: l == null ? null : "" + l,
    children: e,
    containerInfo: t,
    implementation: a,
  };
}
var zn = vm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function Vu(e, t) {
  if (e === "font") return "";
  if (typeof t == "string") return t === "use-credentials" ? t : "";
}
Ke.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ke;
Ke.createPortal = function (e, t) {
  var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
    throw Error(bd(299));
  return ym(e, t, null, a);
};
Ke.flushSync = function (e) {
  var t = zn.T,
    a = ke.p;
  try {
    if (((zn.T = null), (ke.p = 2), e)) return e();
  } finally {
    ((zn.T = t), (ke.p = a), ke.d.f());
  }
};
Ke.preconnect = function (e, t) {
  typeof e == "string" &&
    (t
      ? ((t = t.crossOrigin),
        (t =
          typeof t == "string" ? (t === "use-credentials" ? t : "") : void 0))
      : (t = null),
    ke.d.C(e, t));
};
Ke.prefetchDNS = function (e) {
  typeof e == "string" && ke.d.D(e);
};
Ke.preinit = function (e, t) {
  if (typeof e == "string" && t && typeof t.as == "string") {
    var a = t.as,
      l = Vu(a, t.crossOrigin),
      n = typeof t.integrity == "string" ? t.integrity : void 0,
      i = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
    a === "style"
      ? ke.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
          crossOrigin: l,
          integrity: n,
          fetchPriority: i,
        })
      : a === "script" &&
        ke.d.X(e, {
          crossOrigin: l,
          integrity: n,
          fetchPriority: i,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0,
        });
  }
};
Ke.preinitModule = function (e, t) {
  if (typeof e == "string")
    if (typeof t == "object" && t !== null) {
      if (t.as == null || t.as === "script") {
        var a = Vu(t.as, t.crossOrigin);
        ke.d.M(e, {
          crossOrigin: a,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0,
        });
      }
    } else t == null && ke.d.M(e);
};
Ke.preload = function (e, t) {
  if (
    typeof e == "string" &&
    typeof t == "object" &&
    t !== null &&
    typeof t.as == "string"
  ) {
    var a = t.as,
      l = Vu(a, t.crossOrigin);
    ke.d.L(e, a, {
      crossOrigin: l,
      integrity: typeof t.integrity == "string" ? t.integrity : void 0,
      nonce: typeof t.nonce == "string" ? t.nonce : void 0,
      type: typeof t.type == "string" ? t.type : void 0,
      fetchPriority:
        typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
      referrerPolicy:
        typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
      imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
      imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
      media: typeof t.media == "string" ? t.media : void 0,
    });
  }
};
Ke.preloadModule = function (e, t) {
  if (typeof e == "string")
    if (t) {
      var a = Vu(t.as, t.crossOrigin);
      ke.d.m(e, {
        as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
        crossOrigin: a,
        integrity: typeof t.integrity == "string" ? t.integrity : void 0,
      });
    } else ke.d.m(e);
};
Ke.requestFormReset = function (e) {
  ke.d.r(e);
};
Ke.unstable_batchedUpdates = function (e, t) {
  return e(t);
};
Ke.useFormState = function (e, t, a) {
  return zn.H.useFormState(e, t, a);
};
Ke.useFormStatus = function () {
  return zn.H.useHostTransitionStatus();
};
Ke.version = "19.2.4";
function Sd() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sd);
    } catch (e) {
      console.error(e);
    }
}
(Sd(), (_d.exports = Ke));
var _m = _d.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ze = pm,
  xd = g,
  bm = _m;
function N(e) {
  var t = "https://react.dev/errors/" + e;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var a = 2; a < arguments.length; a++)
      t += "&args[]=" + encodeURIComponent(arguments[a]);
  }
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function Nd(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ii(e) {
  var t = e,
    a = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (a = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? a : null;
}
function Ed(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function jd(e) {
  if (e.tag === 31) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function po(e) {
  if (ii(e) !== e) throw Error(N(188));
}
function Sm(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = ii(e)), t === null)) throw Error(N(188));
    return t !== e ? null : e;
  }
  for (var a = e, l = t; ; ) {
    var n = a.return;
    if (n === null) break;
    var i = n.alternate;
    if (i === null) {
      if (((l = n.return), l !== null)) {
        a = l;
        continue;
      }
      break;
    }
    if (n.child === i.child) {
      for (i = n.child; i; ) {
        if (i === a) return (po(n), e);
        if (i === l) return (po(n), t);
        i = i.sibling;
      }
      throw Error(N(188));
    }
    if (a.return !== l.return) ((a = n), (l = i));
    else {
      for (var u = !1, s = n.child; s; ) {
        if (s === a) {
          ((u = !0), (a = n), (l = i));
          break;
        }
        if (s === l) {
          ((u = !0), (l = n), (a = i));
          break;
        }
        s = s.sibling;
      }
      if (!u) {
        for (s = i.child; s; ) {
          if (s === a) {
            ((u = !0), (a = i), (l = n));
            break;
          }
          if (s === l) {
            ((u = !0), (l = i), (a = n));
            break;
          }
          s = s.sibling;
        }
        if (!u) throw Error(N(189));
      }
    }
    if (a.alternate !== l) throw Error(N(190));
  }
  if (a.tag !== 3) throw Error(N(188));
  return a.stateNode.current === a ? e : t;
}
function Ad(e) {
  var t = e.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return e;
  for (e = e.child; e !== null; ) {
    if (((t = Ad(e)), t !== null)) return t;
    e = e.sibling;
  }
  return null;
}
var he = Object.assign,
  xm = Symbol.for("react.element"),
  Si = Symbol.for("react.transitional.element"),
  Nn = Symbol.for("react.portal"),
  yl = Symbol.for("react.fragment"),
  wd = Symbol.for("react.strict_mode"),
  Pc = Symbol.for("react.profiler"),
  Cd = Symbol.for("react.consumer"),
  Wt = Symbol.for("react.context"),
  lr = Symbol.for("react.forward_ref"),
  Ic = Symbol.for("react.suspense"),
  es = Symbol.for("react.suspense_list"),
  nr = Symbol.for("react.memo"),
  da = Symbol.for("react.lazy"),
  ts = Symbol.for("react.activity"),
  Nm = Symbol.for("react.memo_cache_sentinel"),
  vo = Symbol.iterator;
function on(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (vo && e[vo]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Em = Symbol.for("react.client.reference");
function as(e) {
  if (e == null) return null;
  if (typeof e == "function")
    return e.$$typeof === Em ? null : e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case yl:
      return "Fragment";
    case Pc:
      return "Profiler";
    case wd:
      return "StrictMode";
    case Ic:
      return "Suspense";
    case es:
      return "SuspenseList";
    case ts:
      return "Activity";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Nn:
        return "Portal";
      case Wt:
        return e.displayName || "Context";
      case Cd:
        return (e._context.displayName || "Context") + ".Consumer";
      case lr:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case nr:
        return (
          (t = e.displayName || null),
          t !== null ? t : as(e.type) || "Memo"
        );
      case da:
        ((t = e._payload), (e = e._init));
        try {
          return as(e(t));
        } catch {}
    }
  return null;
}
var En = Array.isArray,
  U = xd.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  K = bm.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  Ja = { pending: !1, data: null, method: null, action: null },
  ls = [],
  _l = -1;
function qt(e) {
  return { current: e };
}
function De(e) {
  0 > _l || ((e.current = ls[_l]), (ls[_l] = null), _l--);
}
function ce(e, t) {
  (_l++, (ls[_l] = e.current), (e.current = t));
}
var Bt = qt(null),
  Xn = qt(null),
  Ea = qt(null),
  lu = qt(null);
function nu(e, t) {
  switch ((ce(Ea, t), ce(Xn, e), ce(Bt, null), t.nodeType)) {
    case 9:
    case 11:
      e = (e = t.documentElement) && (e = e.namespaceURI) ? Nf(e) : 0;
      break;
    default:
      if (((e = t.tagName), (t = t.namespaceURI)))
        ((t = Nf(t)), (e = K2(t, e)));
      else
        switch (e) {
          case "svg":
            e = 1;
            break;
          case "math":
            e = 2;
            break;
          default:
            e = 0;
        }
  }
  (De(Bt), ce(Bt, e));
}
function Bl() {
  (De(Bt), De(Xn), De(Ea));
}
function ns(e) {
  e.memoizedState !== null && ce(lu, e);
  var t = Bt.current,
    a = K2(t, e.type);
  t !== a && (ce(Xn, e), ce(Bt, a));
}
function iu(e) {
  (Xn.current === e && (De(Bt), De(Xn)),
    lu.current === e && (De(lu), (ti._currentValue = Ja)));
}
var rc, go;
function Qa(e) {
  if (rc === void 0)
    try {
      throw Error();
    } catch (a) {
      var t = a.stack.trim().match(/\n( *(at )?)/);
      ((rc = (t && t[1]) || ""),
        (go =
          -1 <
          a.stack.indexOf(`
    at`)
            ? " (<anonymous>)"
            : -1 < a.stack.indexOf("@")
              ? "@unknown:0:0"
              : ""));
    }
  return (
    `
` +
    rc +
    e +
    go
  );
}
var oc = !1;
function fc(e, t) {
  if (!e || oc) return "";
  oc = !0;
  var a = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var l = {
      DetermineComponentFrameRoot: function () {
        try {
          if (t) {
            var p = function () {
              throw Error();
            };
            if (
              (Object.defineProperty(p.prototype, "props", {
                set: function () {
                  throw Error();
                },
              }),
              typeof Reflect == "object" && Reflect.construct)
            ) {
              try {
                Reflect.construct(p, []);
              } catch (v) {
                var h = v;
              }
              Reflect.construct(e, [], p);
            } else {
              try {
                p.call();
              } catch (v) {
                h = v;
              }
              e.call(p.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (v) {
              h = v;
            }
            (p = e()) &&
              typeof p.catch == "function" &&
              p.catch(function () {});
          }
        } catch (v) {
          if (v && h && typeof v.stack == "string") return [v.stack, h.stack];
        }
        return [null, null];
      },
    };
    l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var n = Object.getOwnPropertyDescriptor(
      l.DetermineComponentFrameRoot,
      "name",
    );
    n &&
      n.configurable &&
      Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot",
      });
    var i = l.DetermineComponentFrameRoot(),
      u = i[0],
      s = i[1];
    if (u && s) {
      var r = u.split(`
`),
        o = s.split(`
`);
      for (
        n = l = 0;
        l < r.length && !r[l].includes("DetermineComponentFrameRoot");
      )
        l++;
      for (; n < o.length && !o[n].includes("DetermineComponentFrameRoot"); )
        n++;
      if (l === r.length || n === o.length)
        for (
          l = r.length - 1, n = o.length - 1;
          1 <= l && 0 <= n && r[l] !== o[n];
        )
          n--;
      for (; 1 <= l && 0 <= n; l--, n--)
        if (r[l] !== o[n]) {
          if (l !== 1 || n !== 1)
            do
              if ((l--, n--, 0 > n || r[l] !== o[n])) {
                var f =
                  `
` + r[l].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    f.includes("<anonymous>") &&
                    (f = f.replace("<anonymous>", e.displayName)),
                  f
                );
              }
            while (1 <= l && 0 <= n);
          break;
        }
    }
  } finally {
    ((oc = !1), (Error.prepareStackTrace = a));
  }
  return (a = e ? e.displayName || e.name : "") ? Qa(a) : "";
}
function jm(e, t) {
  switch (e.tag) {
    case 26:
    case 27:
    case 5:
      return Qa(e.type);
    case 16:
      return Qa("Lazy");
    case 13:
      return e.child !== t && t !== null
        ? Qa("Suspense Fallback")
        : Qa("Suspense");
    case 19:
      return Qa("SuspenseList");
    case 0:
    case 15:
      return fc(e.type, !1);
    case 11:
      return fc(e.type.render, !1);
    case 1:
      return fc(e.type, !0);
    case 31:
      return Qa("Activity");
    default:
      return "";
  }
}
function yo(e) {
  try {
    var t = "",
      a = null;
    do ((t += jm(e, a)), (a = e), (e = e.return));
    while (e);
    return t;
  } catch (l) {
    return (
      `
Error generating stack: ` +
      l.message +
      `
` +
      l.stack
    );
  }
}
var is = Object.prototype.hasOwnProperty,
  ir = ze.unstable_scheduleCallback,
  dc = ze.unstable_cancelCallback,
  Am = ze.unstable_shouldYield,
  wm = ze.unstable_requestPaint,
  rt = ze.unstable_now,
  Cm = ze.unstable_getCurrentPriorityLevel,
  zd = ze.unstable_ImmediatePriority,
  Td = ze.unstable_UserBlockingPriority,
  uu = ze.unstable_NormalPriority,
  zm = ze.unstable_LowPriority,
  Md = ze.unstable_IdlePriority,
  Tm = ze.log,
  Mm = ze.unstable_setDisableYieldValue,
  ui = null,
  ot = null;
function ya(e) {
  if (
    (typeof Tm == "function" && Mm(e),
    ot && typeof ot.setStrictMode == "function")
  )
    try {
      ot.setStrictMode(ui, e);
    } catch {}
}
var ft = Math.clz32 ? Math.clz32 : Dm,
  Rm = Math.log,
  Om = Math.LN2;
function Dm(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((Rm(e) / Om) | 0)) | 0);
}
var xi = 256,
  Ni = 262144,
  Ei = 4194304;
function Za(e) {
  var t = e & 42;
  if (t !== 0) return t;
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
      return 128;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
      return e & 261888;
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 3932160;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return e & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return e;
  }
}
function $u(e, t, a) {
  var l = e.pendingLanes;
  if (l === 0) return 0;
  var n = 0,
    i = e.suspendedLanes,
    u = e.pingedLanes;
  e = e.warmLanes;
  var s = l & 134217727;
  return (
    s !== 0
      ? ((l = s & ~i),
        l !== 0
          ? (n = Za(l))
          : ((u &= s),
            u !== 0
              ? (n = Za(u))
              : a || ((a = s & ~e), a !== 0 && (n = Za(a)))))
      : ((s = l & ~i),
        s !== 0
          ? (n = Za(s))
          : u !== 0
            ? (n = Za(u))
            : a || ((a = l & ~e), a !== 0 && (n = Za(a)))),
    n === 0
      ? 0
      : t !== 0 &&
          t !== n &&
          !(t & i) &&
          ((i = n & -n),
          (a = t & -t),
          i >= a || (i === 32 && (a & 4194048) !== 0))
        ? t
        : n
  );
}
function ci(e, t) {
  return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
}
function Lm(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return t + 250;
    case 16:
    case 32:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Rd() {
  var e = Ei;
  return ((Ei <<= 1), !(Ei & 62914560) && (Ei = 4194304), e);
}
function hc(e) {
  for (var t = [], a = 0; 31 > a; a++) t.push(e);
  return t;
}
function si(e, t) {
  ((e.pendingLanes |= t),
    t !== 268435456 &&
      ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
}
function Um(e, t, a, l, n, i) {
  var u = e.pendingLanes;
  ((e.pendingLanes = a),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.warmLanes = 0),
    (e.expiredLanes &= a),
    (e.entangledLanes &= a),
    (e.errorRecoveryDisabledLanes &= a),
    (e.shellSuspendCounter = 0));
  var s = e.entanglements,
    r = e.expirationTimes,
    o = e.hiddenUpdates;
  for (a = u & ~a; 0 < a; ) {
    var f = 31 - ft(a),
      p = 1 << f;
    ((s[f] = 0), (r[f] = -1));
    var h = o[f];
    if (h !== null)
      for (o[f] = null, f = 0; f < h.length; f++) {
        var v = h[f];
        v !== null && (v.lane &= -536870913);
      }
    a &= ~p;
  }
  (l !== 0 && Od(e, l, 0),
    i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(u & ~t)));
}
function Od(e, t, a) {
  ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
  var l = 31 - ft(t);
  ((e.entangledLanes |= t),
    (e.entanglements[l] = e.entanglements[l] | 1073741824 | (a & 261930)));
}
function Dd(e, t) {
  var a = (e.entangledLanes |= t);
  for (e = e.entanglements; a; ) {
    var l = 31 - ft(a),
      n = 1 << l;
    ((n & t) | (e[l] & t) && (e[l] |= t), (a &= ~n));
  }
}
function Ld(e, t) {
  var a = t & -t;
  return ((a = a & 42 ? 1 : ur(a)), a & (e.suspendedLanes | t) ? 0 : a);
}
function ur(e) {
  switch (e) {
    case 2:
      e = 1;
      break;
    case 8:
      e = 4;
      break;
    case 32:
      e = 16;
      break;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      e = 128;
      break;
    case 268435456:
      e = 134217728;
      break;
    default:
      e = 0;
  }
  return e;
}
function cr(e) {
  return (
    (e &= -e),
    2 < e ? (8 < e ? (e & 134217727 ? 32 : 268435456) : 8) : 2
  );
}
function Ud() {
  var e = K.p;
  return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : ih(e.type));
}
function _o(e, t) {
  var a = K.p;
  try {
    return ((K.p = e), t());
  } finally {
    K.p = a;
  }
}
var qa = Math.random().toString(36).slice(2),
  Be = "__reactFiber$" + qa,
  et = "__reactProps$" + qa,
  Pl = "__reactContainer$" + qa,
  us = "__reactEvents$" + qa,
  Bm = "__reactListeners$" + qa,
  Hm = "__reactHandles$" + qa,
  bo = "__reactResources$" + qa,
  ri = "__reactMarker$" + qa;
function sr(e) {
  (delete e[Be], delete e[et], delete e[us], delete e[Bm], delete e[Hm]);
}
function bl(e) {
  var t = e[Be];
  if (t) return t;
  for (var a = e.parentNode; a; ) {
    if ((t = a[Pl] || a[Be])) {
      if (
        ((a = t.alternate),
        t.child !== null || (a !== null && a.child !== null))
      )
        for (e = Cf(e); e !== null; ) {
          if ((a = e[Be])) return a;
          e = Cf(e);
        }
      return t;
    }
    ((e = a), (a = e.parentNode));
  }
  return null;
}
function Il(e) {
  if ((e = e[Be] || e[Pl])) {
    var t = e.tag;
    if (
      t === 5 ||
      t === 6 ||
      t === 13 ||
      t === 31 ||
      t === 26 ||
      t === 27 ||
      t === 3
    )
      return e;
  }
  return null;
}
function jn(e) {
  var t = e.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
  throw Error(N(33));
}
function Tl(e) {
  var t = e[bo];
  return (
    t ||
      (t = e[bo] = { hoistableStyles: new Map(), hoistableScripts: new Map() }),
    t
  );
}
function Oe(e) {
  e[ri] = !0;
}
var Bd = new Set(),
  Hd = {};
function ul(e, t) {
  (Hl(e, t), Hl(e + "Capture", t));
}
function Hl(e, t) {
  for (Hd[e] = t, e = 0; e < t.length; e++) Bd.add(t[e]);
}
var qm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
  ),
  So = {},
  xo = {};
function Ym(e) {
  return is.call(xo, e)
    ? !0
    : is.call(So, e)
      ? !1
      : qm.test(e)
        ? (xo[e] = !0)
        : ((So[e] = !0), !1);
}
function Yi(e, t, a) {
  if (Ym(t))
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
          e.removeAttribute(t);
          return;
        case "boolean":
          var l = t.toLowerCase().slice(0, 5);
          if (l !== "data-" && l !== "aria-") {
            e.removeAttribute(t);
            return;
          }
      }
      e.setAttribute(t, "" + a);
    }
}
function ji(e, t, a) {
  if (a === null) e.removeAttribute(t);
  else {
    switch (typeof a) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        e.removeAttribute(t);
        return;
    }
    e.setAttribute(t, "" + a);
  }
}
function $t(e, t, a, l) {
  if (l === null) e.removeAttribute(a);
  else {
    switch (typeof l) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        e.removeAttribute(a);
        return;
    }
    e.setAttributeNS(t, a, "" + l);
  }
}
function gt(e) {
  switch (typeof e) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function qd(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Vm(e, t, a) {
  var l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
  if (
    !e.hasOwnProperty(t) &&
    typeof l < "u" &&
    typeof l.get == "function" &&
    typeof l.set == "function"
  ) {
    var n = l.get,
      i = l.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return n.call(this);
        },
        set: function (u) {
          ((a = "" + u), i.call(this, u));
        },
      }),
      Object.defineProperty(e, t, { enumerable: l.enumerable }),
      {
        getValue: function () {
          return a;
        },
        setValue: function (u) {
          a = "" + u;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function cs(e) {
  if (!e._valueTracker) {
    var t = qd(e) ? "checked" : "value";
    e._valueTracker = Vm(e, t, "" + e[t]);
  }
}
function Yd(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var a = t.getValue(),
    l = "";
  return (
    e && (l = qd(e) ? (e.checked ? "true" : "false") : e.value),
    (e = l),
    e !== a ? (t.setValue(e), !0) : !1
  );
}
function cu(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
var $m = /[\n"\\]/g;
function bt(e) {
  return e.replace($m, function (t) {
    return "\\" + t.charCodeAt(0).toString(16) + " ";
  });
}
function ss(e, t, a, l, n, i, u, s) {
  ((e.name = ""),
    u != null &&
    typeof u != "function" &&
    typeof u != "symbol" &&
    typeof u != "boolean"
      ? (e.type = u)
      : e.removeAttribute("type"),
    t != null
      ? u === "number"
        ? ((t === 0 && e.value === "") || e.value != t) &&
          (e.value = "" + gt(t))
        : e.value !== "" + gt(t) && (e.value = "" + gt(t))
      : (u !== "submit" && u !== "reset") || e.removeAttribute("value"),
    t != null
      ? rs(e, u, gt(t))
      : a != null
        ? rs(e, u, gt(a))
        : l != null && e.removeAttribute("value"),
    n == null && i != null && (e.defaultChecked = !!i),
    n != null &&
      (e.checked = n && typeof n != "function" && typeof n != "symbol"),
    s != null &&
    typeof s != "function" &&
    typeof s != "symbol" &&
    typeof s != "boolean"
      ? (e.name = "" + gt(s))
      : e.removeAttribute("name"));
}
function Vd(e, t, a, l, n, i, u, s) {
  if (
    (i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean" &&
      (e.type = i),
    t != null || a != null)
  ) {
    if (!((i !== "submit" && i !== "reset") || t != null)) {
      cs(e);
      return;
    }
    ((a = a != null ? "" + gt(a) : ""),
      (t = t != null ? "" + gt(t) : a),
      s || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((l = l ?? n),
    (l = typeof l != "function" && typeof l != "symbol" && !!l),
    (e.checked = s ? e.checked : !!l),
    (e.defaultChecked = !!l),
    u != null &&
      typeof u != "function" &&
      typeof u != "symbol" &&
      typeof u != "boolean" &&
      (e.name = u),
    cs(e));
}
function rs(e, t, a) {
  (t === "number" && cu(e.ownerDocument) === e) ||
    e.defaultValue === "" + a ||
    (e.defaultValue = "" + a);
}
function Ml(e, t, a, l) {
  if (((e = e.options), t)) {
    t = {};
    for (var n = 0; n < a.length; n++) t["$" + a[n]] = !0;
    for (a = 0; a < e.length; a++)
      ((n = t.hasOwnProperty("$" + e[a].value)),
        e[a].selected !== n && (e[a].selected = n),
        n && l && (e[a].defaultSelected = !0));
  } else {
    for (a = "" + gt(a), t = null, n = 0; n < e.length; n++) {
      if (e[n].value === a) {
        ((e[n].selected = !0), l && (e[n].defaultSelected = !0));
        return;
      }
      t !== null || e[n].disabled || (t = e[n]);
    }
    t !== null && (t.selected = !0);
  }
}
function $d(e, t, a) {
  if (
    t != null &&
    ((t = "" + gt(t)), t !== e.value && (e.value = t), a == null)
  ) {
    e.defaultValue !== t && (e.defaultValue = t);
    return;
  }
  e.defaultValue = a != null ? "" + gt(a) : "";
}
function Gd(e, t, a, l) {
  if (t == null) {
    if (l != null) {
      if (a != null) throw Error(N(92));
      if (En(l)) {
        if (1 < l.length) throw Error(N(93));
        l = l[0];
      }
      a = l;
    }
    (a == null && (a = ""), (t = a));
  }
  ((a = gt(t)),
    (e.defaultValue = a),
    (l = e.textContent),
    l === a && l !== "" && l !== null && (e.value = l),
    cs(e));
}
function ql(e, t) {
  if (t) {
    var a = e.firstChild;
    if (a && a === e.lastChild && a.nodeType === 3) {
      a.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Gm = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " ",
  ),
);
function No(e, t, a) {
  var l = t.indexOf("--") === 0;
  a == null || typeof a == "boolean" || a === ""
    ? l
      ? e.setProperty(t, "")
      : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
    : l
      ? e.setProperty(t, a)
      : typeof a != "number" || a === 0 || Gm.has(t)
        ? t === "float"
          ? (e.cssFloat = a)
          : (e[t] = ("" + a).trim())
        : (e[t] = a + "px");
}
function Xd(e, t, a) {
  if (t != null && typeof t != "object") throw Error(N(62));
  if (((e = e.style), a != null)) {
    for (var l in a)
      !a.hasOwnProperty(l) ||
        (t != null && t.hasOwnProperty(l)) ||
        (l.indexOf("--") === 0
          ? e.setProperty(l, "")
          : l === "float"
            ? (e.cssFloat = "")
            : (e[l] = ""));
    for (var n in t)
      ((l = t[n]), t.hasOwnProperty(n) && a[n] !== l && No(e, n, l));
  } else for (var i in t) t.hasOwnProperty(i) && No(e, i, t[i]);
}
function rr(e) {
  if (e.indexOf("-") === -1) return !1;
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Xm = new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"],
  ]),
  Qm =
    /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function Vi(e) {
  return Qm.test("" + e)
    ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    : e;
}
function Pt() {}
var os = null;
function or(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Sl = null,
  Rl = null;
function Eo(e) {
  var t = Il(e);
  if (t && (e = t.stateNode)) {
    var a = e[et] || null;
    e: switch (((e = t.stateNode), t.type)) {
      case "input":
        if (
          (ss(
            e,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
          ),
          (t = a.name),
          a.type === "radio" && t != null)
        ) {
          for (a = e; a.parentNode; ) a = a.parentNode;
          for (
            a = a.querySelectorAll(
              'input[name="' + bt("" + t) + '"][type="radio"]',
            ),
              t = 0;
            t < a.length;
            t++
          ) {
            var l = a[t];
            if (l !== e && l.form === e.form) {
              var n = l[et] || null;
              if (!n) throw Error(N(90));
              ss(
                l,
                n.value,
                n.defaultValue,
                n.defaultValue,
                n.checked,
                n.defaultChecked,
                n.type,
                n.name,
              );
            }
          }
          for (t = 0; t < a.length; t++)
            ((l = a[t]), l.form === e.form && Yd(l));
        }
        break e;
      case "textarea":
        $d(e, a.value, a.defaultValue);
        break e;
      case "select":
        ((t = a.value), t != null && Ml(e, !!a.multiple, t, !1));
    }
  }
}
var mc = !1;
function Qd(e, t, a) {
  if (mc) return e(t, a);
  mc = !0;
  try {
    var l = e(t);
    return l;
  } finally {
    if (
      ((mc = !1),
      (Sl !== null || Rl !== null) &&
        (ec(), Sl && ((t = Sl), (e = Rl), (Rl = Sl = null), Eo(t), e)))
    )
      for (t = 0; t < e.length; t++) Eo(e[t]);
  }
}
function Qn(e, t) {
  var a = e.stateNode;
  if (a === null) return null;
  var l = a[et] || null;
  if (l === null) return null;
  a = l[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((l = !l.disabled) ||
        ((e = e.type),
        (l = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !l));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (a && typeof a != "function") throw Error(N(231, t, typeof a));
  return a;
}
var la = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  fs = !1;
if (la)
  try {
    var fn = {};
    (Object.defineProperty(fn, "passive", {
      get: function () {
        fs = !0;
      },
    }),
      window.addEventListener("test", fn, fn),
      window.removeEventListener("test", fn, fn));
  } catch {
    fs = !1;
  }
var _a = null,
  fr = null,
  $i = null;
function Zd() {
  if ($i) return $i;
  var e,
    t = fr,
    a = t.length,
    l,
    n = "value" in _a ? _a.value : _a.textContent,
    i = n.length;
  for (e = 0; e < a && t[e] === n[e]; e++);
  var u = a - e;
  for (l = 1; l <= u && t[a - l] === n[i - l]; l++);
  return ($i = n.slice(e, 1 < l ? 1 - l : void 0));
}
function Gi(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Ai() {
  return !0;
}
function jo() {
  return !1;
}
function tt(e) {
  function t(a, l, n, i, u) {
    ((this._reactName = a),
      (this._targetInst = n),
      (this.type = l),
      (this.nativeEvent = i),
      (this.target = u),
      (this.currentTarget = null));
    for (var s in e)
      e.hasOwnProperty(s) && ((a = e[s]), (this[s] = a ? a(i) : i[s]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Ai
        : jo),
      (this.isPropagationStopped = jo),
      this
    );
  }
  return (
    he(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a &&
          (a.preventDefault
            ? a.preventDefault()
            : typeof a.returnValue != "unknown" && (a.returnValue = !1),
          (this.isDefaultPrevented = Ai));
      },
      stopPropagation: function () {
        var a = this.nativeEvent;
        a &&
          (a.stopPropagation
            ? a.stopPropagation()
            : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
          (this.isPropagationStopped = Ai));
      },
      persist: function () {},
      isPersistent: Ai,
    }),
    t
  );
}
var cl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Gu = tt(cl),
  oi = he({}, cl, { view: 0, detail: 0 }),
  Zm = tt(oi),
  pc,
  vc,
  dn,
  Xu = he({}, oi, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: dr,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== dn &&
            (dn && e.type === "mousemove"
              ? ((pc = e.screenX - dn.screenX), (vc = e.screenY - dn.screenY))
              : (vc = pc = 0),
            (dn = e)),
          pc);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : vc;
    },
  }),
  Ao = tt(Xu),
  km = he({}, Xu, { dataTransfer: 0 }),
  Km = tt(km),
  Jm = he({}, oi, { relatedTarget: 0 }),
  gc = tt(Jm),
  Fm = he({}, cl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Wm = tt(Fm),
  Pm = he({}, cl, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Im = tt(Pm),
  e0 = he({}, cl, { data: 0 }),
  wo = tt(e0),
  t0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  a0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  l0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function n0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = l0[e]) ? !!t[e] : !1;
}
function dr() {
  return n0;
}
var i0 = he({}, oi, {
    key: function (e) {
      if (e.key) {
        var t = t0[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Gi(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? a0[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: dr,
    charCode: function (e) {
      return e.type === "keypress" ? Gi(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Gi(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  u0 = tt(i0),
  c0 = he({}, Xu, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Co = tt(c0),
  s0 = he({}, oi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: dr,
  }),
  r0 = tt(s0),
  o0 = he({}, cl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  f0 = tt(o0),
  d0 = he({}, Xu, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  h0 = tt(d0),
  m0 = he({}, cl, { newState: 0, oldState: 0 }),
  p0 = tt(m0),
  v0 = [9, 13, 27, 32],
  hr = la && "CompositionEvent" in window,
  Tn = null;
la && "documentMode" in document && (Tn = document.documentMode);
var g0 = la && "TextEvent" in window && !Tn,
  kd = la && (!hr || (Tn && 8 < Tn && 11 >= Tn)),
  zo = " ",
  To = !1;
function Kd(e, t) {
  switch (e) {
    case "keyup":
      return v0.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Jd(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var xl = !1;
function y0(e, t) {
  switch (e) {
    case "compositionend":
      return Jd(t);
    case "keypress":
      return t.which !== 32 ? null : ((To = !0), zo);
    case "textInput":
      return ((e = t.data), e === zo && To ? null : e);
    default:
      return null;
  }
}
function _0(e, t) {
  if (xl)
    return e === "compositionend" || (!hr && Kd(e, t))
      ? ((e = Zd()), ($i = fr = _a = null), (xl = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return kd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var b0 = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Mo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!b0[e.type] : t === "textarea";
}
function Fd(e, t, a, l) {
  (Sl ? (Rl ? Rl.push(l) : (Rl = [l])) : (Sl = l),
    (t = ju(t, "onChange")),
    0 < t.length &&
      ((a = new Gu("onChange", "change", null, a, l)),
      e.push({ event: a, listeners: t })));
}
var Mn = null,
  Zn = null;
function S0(e) {
  Q2(e, 0);
}
function Qu(e) {
  var t = jn(e);
  if (Yd(t)) return e;
}
function Ro(e, t) {
  if (e === "change") return t;
}
var Wd = !1;
if (la) {
  var yc;
  if (la) {
    var _c = "oninput" in document;
    if (!_c) {
      var Oo = document.createElement("div");
      (Oo.setAttribute("oninput", "return;"),
        (_c = typeof Oo.oninput == "function"));
    }
    yc = _c;
  } else yc = !1;
  Wd = yc && (!document.documentMode || 9 < document.documentMode);
}
function Do() {
  Mn && (Mn.detachEvent("onpropertychange", Pd), (Zn = Mn = null));
}
function Pd(e) {
  if (e.propertyName === "value" && Qu(Zn)) {
    var t = [];
    (Fd(t, Zn, e, or(e)), Qd(S0, t));
  }
}
function x0(e, t, a) {
  e === "focusin"
    ? (Do(), (Mn = t), (Zn = a), Mn.attachEvent("onpropertychange", Pd))
    : e === "focusout" && Do();
}
function N0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Qu(Zn);
}
function E0(e, t) {
  if (e === "click") return Qu(t);
}
function j0(e, t) {
  if (e === "input" || e === "change") return Qu(t);
}
function A0(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var ht = typeof Object.is == "function" ? Object.is : A0;
function kn(e, t) {
  if (ht(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var a = Object.keys(e),
    l = Object.keys(t);
  if (a.length !== l.length) return !1;
  for (l = 0; l < a.length; l++) {
    var n = a[l];
    if (!is.call(t, n) || !ht(e[n], t[n])) return !1;
  }
  return !0;
}
function Lo(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Uo(e, t) {
  var a = Lo(e);
  e = 0;
  for (var l; a; ) {
    if (a.nodeType === 3) {
      if (((l = e + a.textContent.length), e <= t && l >= t))
        return { node: a, offset: t - e };
      e = l;
    }
    e: {
      for (; a; ) {
        if (a.nextSibling) {
          a = a.nextSibling;
          break e;
        }
        a = a.parentNode;
      }
      a = void 0;
    }
    a = Lo(a);
  }
}
function Id(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Id(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function e1(e) {
  e =
    e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
      ? e.ownerDocument.defaultView
      : window;
  for (var t = cu(e.document); t instanceof e.HTMLIFrameElement; ) {
    try {
      var a = typeof t.contentWindow.location.href == "string";
    } catch {
      a = !1;
    }
    if (a) e = t.contentWindow;
    else break;
    t = cu(e.document);
  }
  return t;
}
function mr(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
var w0 = la && "documentMode" in document && 11 >= document.documentMode,
  Nl = null,
  ds = null,
  Rn = null,
  hs = !1;
function Bo(e, t, a) {
  var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
  hs ||
    Nl == null ||
    Nl !== cu(l) ||
    ((l = Nl),
    "selectionStart" in l && mr(l)
      ? (l = { start: l.selectionStart, end: l.selectionEnd })
      : ((l = (
          (l.ownerDocument && l.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (l = {
          anchorNode: l.anchorNode,
          anchorOffset: l.anchorOffset,
          focusNode: l.focusNode,
          focusOffset: l.focusOffset,
        })),
    (Rn && kn(Rn, l)) ||
      ((Rn = l),
      (l = ju(ds, "onSelect")),
      0 < l.length &&
        ((t = new Gu("onSelect", "select", null, t, a)),
        e.push({ event: t, listeners: l }),
        (t.target = Nl))));
}
function $a(e, t) {
  var a = {};
  return (
    (a[e.toLowerCase()] = t.toLowerCase()),
    (a["Webkit" + e] = "webkit" + t),
    (a["Moz" + e] = "moz" + t),
    a
  );
}
var El = {
    animationend: $a("Animation", "AnimationEnd"),
    animationiteration: $a("Animation", "AnimationIteration"),
    animationstart: $a("Animation", "AnimationStart"),
    transitionrun: $a("Transition", "TransitionRun"),
    transitionstart: $a("Transition", "TransitionStart"),
    transitioncancel: $a("Transition", "TransitionCancel"),
    transitionend: $a("Transition", "TransitionEnd"),
  },
  bc = {},
  t1 = {};
la &&
  ((t1 = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete El.animationend.animation,
    delete El.animationiteration.animation,
    delete El.animationstart.animation),
  "TransitionEvent" in window || delete El.transitionend.transition);
function sl(e) {
  if (bc[e]) return bc[e];
  if (!El[e]) return e;
  var t = El[e],
    a;
  for (a in t) if (t.hasOwnProperty(a) && a in t1) return (bc[e] = t[a]);
  return e;
}
var a1 = sl("animationend"),
  l1 = sl("animationiteration"),
  n1 = sl("animationstart"),
  C0 = sl("transitionrun"),
  z0 = sl("transitionstart"),
  T0 = sl("transitioncancel"),
  i1 = sl("transitionend"),
  u1 = new Map(),
  ms =
    "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
ms.push("scrollEnd");
function Mt(e, t) {
  (u1.set(e, t), ul(t, [e]));
}
var su =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        },
  vt = [],
  jl = 0,
  pr = 0;
function Zu() {
  for (var e = jl, t = (pr = jl = 0); t < e; ) {
    var a = vt[t];
    vt[t++] = null;
    var l = vt[t];
    vt[t++] = null;
    var n = vt[t];
    vt[t++] = null;
    var i = vt[t];
    if (((vt[t++] = null), l !== null && n !== null)) {
      var u = l.pending;
      (u === null ? (n.next = n) : ((n.next = u.next), (u.next = n)),
        (l.pending = n));
    }
    i !== 0 && c1(a, n, i);
  }
}
function ku(e, t, a, l) {
  ((vt[jl++] = e),
    (vt[jl++] = t),
    (vt[jl++] = a),
    (vt[jl++] = l),
    (pr |= l),
    (e.lanes |= l),
    (e = e.alternate),
    e !== null && (e.lanes |= l));
}
function vr(e, t, a, l) {
  return (ku(e, t, a, l), ru(e));
}
function rl(e, t) {
  return (ku(e, null, null, t), ru(e));
}
function c1(e, t, a) {
  e.lanes |= a;
  var l = e.alternate;
  l !== null && (l.lanes |= a);
  for (var n = !1, i = e.return; i !== null; )
    ((i.childLanes |= a),
      (l = i.alternate),
      l !== null && (l.childLanes |= a),
      i.tag === 22 &&
        ((e = i.stateNode), e === null || e._visibility & 1 || (n = !0)),
      (e = i),
      (i = i.return));
  return e.tag === 3
    ? ((i = e.stateNode),
      n &&
        t !== null &&
        ((n = 31 - ft(a)),
        (e = i.hiddenUpdates),
        (l = e[n]),
        l === null ? (e[n] = [t]) : l.push(t),
        (t.lane = a | 536870912)),
      i)
    : null;
}
function ru(e) {
  if (50 < Vn) throw ((Vn = 0), (Ls = null), Error(N(185)));
  for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
  return e.tag === 3 ? e.stateNode : null;
}
var Al = {};
function M0(e, t, a, l) {
  ((this.tag = e),
    (this.key = a),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.refCleanup = this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = l),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function ct(e, t, a, l) {
  return new M0(e, t, a, l);
}
function gr(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function ea(e, t) {
  var a = e.alternate;
  return (
    a === null
      ? ((a = ct(e.tag, t, e.key, e.mode)),
        (a.elementType = e.elementType),
        (a.type = e.type),
        (a.stateNode = e.stateNode),
        (a.alternate = e),
        (e.alternate = a))
      : ((a.pendingProps = t),
        (a.type = e.type),
        (a.flags = 0),
        (a.subtreeFlags = 0),
        (a.deletions = null)),
    (a.flags = e.flags & 65011712),
    (a.childLanes = e.childLanes),
    (a.lanes = e.lanes),
    (a.child = e.child),
    (a.memoizedProps = e.memoizedProps),
    (a.memoizedState = e.memoizedState),
    (a.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (a.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (a.sibling = e.sibling),
    (a.index = e.index),
    (a.ref = e.ref),
    (a.refCleanup = e.refCleanup),
    a
  );
}
function s1(e, t) {
  e.flags &= 65011714;
  var a = e.alternate;
  return (
    a === null
      ? ((e.childLanes = 0),
        (e.lanes = t),
        (e.child = null),
        (e.subtreeFlags = 0),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.updateQueue = null),
        (e.dependencies = null),
        (e.stateNode = null))
      : ((e.childLanes = a.childLanes),
        (e.lanes = a.lanes),
        (e.child = a.child),
        (e.subtreeFlags = 0),
        (e.deletions = null),
        (e.memoizedProps = a.memoizedProps),
        (e.memoizedState = a.memoizedState),
        (e.updateQueue = a.updateQueue),
        (e.type = a.type),
        (t = a.dependencies),
        (e.dependencies =
          t === null
            ? null
            : { lanes: t.lanes, firstContext: t.firstContext })),
    e
  );
}
function Xi(e, t, a, l, n, i) {
  var u = 0;
  if (((l = e), typeof e == "function")) gr(e) && (u = 1);
  else if (typeof e == "string")
    u = U4(e, a, Bt.current)
      ? 26
      : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
  else
    e: switch (e) {
      case ts:
        return ((e = ct(31, a, t, n)), (e.elementType = ts), (e.lanes = i), e);
      case yl:
        return Fa(a.children, n, i, t);
      case wd:
        ((u = 8), (n |= 24));
        break;
      case Pc:
        return (
          (e = ct(12, a, t, n | 2)),
          (e.elementType = Pc),
          (e.lanes = i),
          e
        );
      case Ic:
        return ((e = ct(13, a, t, n)), (e.elementType = Ic), (e.lanes = i), e);
      case es:
        return ((e = ct(19, a, t, n)), (e.elementType = es), (e.lanes = i), e);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Wt:
              u = 10;
              break e;
            case Cd:
              u = 9;
              break e;
            case lr:
              u = 11;
              break e;
            case nr:
              u = 14;
              break e;
            case da:
              ((u = 16), (l = null));
              break e;
          }
        ((u = 29),
          (a = Error(N(130, e === null ? "null" : typeof e, ""))),
          (l = null));
    }
  return (
    (t = ct(u, a, t, n)),
    (t.elementType = e),
    (t.type = l),
    (t.lanes = i),
    t
  );
}
function Fa(e, t, a, l) {
  return ((e = ct(7, e, l, t)), (e.lanes = a), e);
}
function Sc(e, t, a) {
  return ((e = ct(6, e, null, t)), (e.lanes = a), e);
}
function r1(e) {
  var t = ct(18, null, null, 0);
  return ((t.stateNode = e), t);
}
function xc(e, t, a) {
  return (
    (t = ct(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = a),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
var Ho = new WeakMap();
function St(e, t) {
  if (typeof e == "object" && e !== null) {
    var a = Ho.get(e);
    return a !== void 0
      ? a
      : ((t = { value: e, source: t, stack: yo(t) }), Ho.set(e, t), t);
  }
  return { value: e, source: t, stack: yo(t) };
}
var wl = [],
  Cl = 0,
  ou = null,
  Kn = 0,
  yt = [],
  _t = 0,
  Oa = null,
  Dt = 1,
  Lt = "";
function Jt(e, t) {
  ((wl[Cl++] = Kn), (wl[Cl++] = ou), (ou = e), (Kn = t));
}
function o1(e, t, a) {
  ((yt[_t++] = Dt), (yt[_t++] = Lt), (yt[_t++] = Oa), (Oa = e));
  var l = Dt;
  e = Lt;
  var n = 32 - ft(l) - 1;
  ((l &= ~(1 << n)), (a += 1));
  var i = 32 - ft(t) + n;
  if (30 < i) {
    var u = n - (n % 5);
    ((i = (l & ((1 << u) - 1)).toString(32)),
      (l >>= u),
      (n -= u),
      (Dt = (1 << (32 - ft(t) + n)) | (a << n) | l),
      (Lt = i + e));
  } else ((Dt = (1 << i) | (a << n) | l), (Lt = e));
}
function yr(e) {
  e.return !== null && (Jt(e, 1), o1(e, 1, 0));
}
function _r(e) {
  for (; e === ou; )
    ((ou = wl[--Cl]), (wl[Cl] = null), (Kn = wl[--Cl]), (wl[Cl] = null));
  for (; e === Oa; )
    ((Oa = yt[--_t]),
      (yt[_t] = null),
      (Lt = yt[--_t]),
      (yt[_t] = null),
      (Dt = yt[--_t]),
      (yt[_t] = null));
}
function f1(e, t) {
  ((yt[_t++] = Dt),
    (yt[_t++] = Lt),
    (yt[_t++] = Oa),
    (Dt = t.id),
    (Lt = t.overflow),
    (Oa = e));
}
var He = null,
  fe = null,
  X = !1,
  ja = null,
  xt = !1,
  ps = Error(N(519));
function Da(e) {
  var t = Error(
    N(
      418,
      1 < arguments.length && arguments[1] !== void 0 && arguments[1]
        ? "text"
        : "HTML",
      "",
    ),
  );
  throw (Jn(St(t, e)), ps);
}
function qo(e) {
  var t = e.stateNode,
    a = e.type,
    l = e.memoizedProps;
  switch (((t[Be] = e), (t[et] = l), a)) {
    case "dialog":
      (Y("cancel", t), Y("close", t));
      break;
    case "iframe":
    case "object":
    case "embed":
      Y("load", t);
      break;
    case "video":
    case "audio":
      for (a = 0; a < In.length; a++) Y(In[a], t);
      break;
    case "source":
      Y("error", t);
      break;
    case "img":
    case "image":
    case "link":
      (Y("error", t), Y("load", t));
      break;
    case "details":
      Y("toggle", t);
      break;
    case "input":
      (Y("invalid", t),
        Vd(
          t,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0,
        ));
      break;
    case "select":
      Y("invalid", t);
      break;
    case "textarea":
      (Y("invalid", t), Gd(t, l.value, l.defaultValue, l.children));
  }
  ((a = l.children),
    (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
    t.textContent === "" + a ||
    l.suppressHydrationWarning === !0 ||
    k2(t.textContent, a)
      ? (l.popover != null && (Y("beforetoggle", t), Y("toggle", t)),
        l.onScroll != null && Y("scroll", t),
        l.onScrollEnd != null && Y("scrollend", t),
        l.onClick != null && (t.onclick = Pt),
        (t = !0))
      : (t = !1),
    t || Da(e, !0));
}
function Yo(e) {
  for (He = e.return; He; )
    switch (He.tag) {
      case 5:
      case 31:
      case 13:
        xt = !1;
        return;
      case 27:
      case 3:
        xt = !0;
        return;
      default:
        He = He.return;
    }
}
function dl(e) {
  if (e !== He) return !1;
  if (!X) return (Yo(e), (X = !0), !1);
  var t = e.tag,
    a;
  if (
    ((a = t !== 3 && t !== 27) &&
      ((a = t === 5) &&
        ((a = e.type),
        (a = !(a !== "form" && a !== "button") || Ys(e.type, e.memoizedProps))),
      (a = !a)),
    a && fe && Da(e),
    Yo(e),
    t === 13)
  ) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(N(317));
    fe = wf(e);
  } else if (t === 31) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(N(317));
    fe = wf(e);
  } else
    t === 27
      ? ((t = fe), Ya(e.type) ? ((e = Xs), (Xs = null), (fe = e)) : (fe = t))
      : (fe = He ? Et(e.stateNode.nextSibling) : null);
  return !0;
}
function el() {
  ((fe = He = null), (X = !1));
}
function Nc() {
  var e = ja;
  return (
    e !== null && (Pe === null ? (Pe = e) : Pe.push.apply(Pe, e), (ja = null)),
    e
  );
}
function Jn(e) {
  ja === null ? (ja = [e]) : ja.push(e);
}
var vs = qt(null),
  ol = null,
  It = null;
function ma(e, t, a) {
  (ce(vs, t._currentValue), (t._currentValue = a));
}
function ta(e) {
  ((e._currentValue = vs.current), De(vs));
}
function gs(e, t, a) {
  for (; e !== null; ) {
    var l = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), l !== null && (l.childLanes |= t))
        : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t),
      e === a)
    )
      break;
    e = e.return;
  }
}
function ys(e, t, a, l) {
  var n = e.child;
  for (n !== null && (n.return = e); n !== null; ) {
    var i = n.dependencies;
    if (i !== null) {
      var u = n.child;
      i = i.firstContext;
      e: for (; i !== null; ) {
        var s = i;
        i = n;
        for (var r = 0; r < t.length; r++)
          if (s.context === t[r]) {
            ((i.lanes |= a),
              (s = i.alternate),
              s !== null && (s.lanes |= a),
              gs(i.return, a, e),
              l || (u = null));
            break e;
          }
        i = s.next;
      }
    } else if (n.tag === 18) {
      if (((u = n.return), u === null)) throw Error(N(341));
      ((u.lanes |= a),
        (i = u.alternate),
        i !== null && (i.lanes |= a),
        gs(u, a, e),
        (u = null));
    } else u = n.child;
    if (u !== null) u.return = n;
    else
      for (u = n; u !== null; ) {
        if (u === e) {
          u = null;
          break;
        }
        if (((n = u.sibling), n !== null)) {
          ((n.return = u.return), (u = n));
          break;
        }
        u = u.return;
      }
    n = u;
  }
}
function en(e, t, a, l) {
  e = null;
  for (var n = t, i = !1; n !== null; ) {
    if (!i) {
      if (n.flags & 524288) i = !0;
      else if (n.flags & 262144) break;
    }
    if (n.tag === 10) {
      var u = n.alternate;
      if (u === null) throw Error(N(387));
      if (((u = u.memoizedProps), u !== null)) {
        var s = n.type;
        ht(n.pendingProps.value, u.value) ||
          (e !== null ? e.push(s) : (e = [s]));
      }
    } else if (n === lu.current) {
      if (((u = n.alternate), u === null)) throw Error(N(387));
      u.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
        (e !== null ? e.push(ti) : (e = [ti]));
    }
    n = n.return;
  }
  (e !== null && ys(t, e, a, l), (t.flags |= 262144));
}
function fu(e) {
  for (e = e.firstContext; e !== null; ) {
    if (!ht(e.context._currentValue, e.memoizedValue)) return !0;
    e = e.next;
  }
  return !1;
}
function tl(e) {
  ((ol = e),
    (It = null),
    (e = e.dependencies),
    e !== null && (e.firstContext = null));
}
function qe(e) {
  return d1(ol, e);
}
function wi(e, t) {
  return (ol === null && tl(e), d1(e, t));
}
function d1(e, t) {
  var a = t._currentValue;
  if (((t = { context: t, memoizedValue: a, next: null }), It === null)) {
    if (e === null) throw Error(N(308));
    ((It = t),
      (e.dependencies = { lanes: 0, firstContext: t }),
      (e.flags |= 524288));
  } else It = It.next = t;
  return a;
}
var R0 =
    typeof AbortController < "u"
      ? AbortController
      : function () {
          var e = [],
            t = (this.signal = {
              aborted: !1,
              addEventListener: function (a, l) {
                e.push(l);
              },
            });
          this.abort = function () {
            ((t.aborted = !0),
              e.forEach(function (a) {
                return a();
              }));
          };
        },
  O0 = ze.unstable_scheduleCallback,
  D0 = ze.unstable_NormalPriority,
  je = {
    $$typeof: Wt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0,
  };
function br() {
  return { controller: new R0(), data: new Map(), refCount: 0 };
}
function fi(e) {
  (e.refCount--,
    e.refCount === 0 &&
      O0(D0, function () {
        e.controller.abort();
      }));
}
var On = null,
  _s = 0,
  Yl = 0,
  Ol = null;
function L0(e, t) {
  if (On === null) {
    var a = (On = []);
    ((_s = 0),
      (Yl = Qr()),
      (Ol = {
        status: "pending",
        value: void 0,
        then: function (l) {
          a.push(l);
        },
      }));
  }
  return (_s++, t.then(Vo, Vo), t);
}
function Vo() {
  if (--_s === 0 && On !== null) {
    Ol !== null && (Ol.status = "fulfilled");
    var e = On;
    ((On = null), (Yl = 0), (Ol = null));
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
}
function U0(e, t) {
  var a = [],
    l = {
      status: "pending",
      value: null,
      reason: null,
      then: function (n) {
        a.push(n);
      },
    };
  return (
    e.then(
      function () {
        ((l.status = "fulfilled"), (l.value = t));
        for (var n = 0; n < a.length; n++) (0, a[n])(t);
      },
      function (n) {
        for (l.status = "rejected", l.reason = n, n = 0; n < a.length; n++)
          (0, a[n])(void 0);
      },
    ),
    l
  );
}
var $o = U.S;
U.S = function (e, t) {
  ((A2 = rt()),
    typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      L0(e, t),
    $o !== null && $o(e, t));
};
var Wa = qt(null);
function Sr() {
  var e = Wa.current;
  return e !== null ? e : ie.pooledCache;
}
function Qi(e, t) {
  t === null ? ce(Wa, Wa.current) : ce(Wa, t.pool);
}
function h1() {
  var e = Sr();
  return e === null ? null : { parent: je._currentValue, pool: e };
}
var tn = Error(N(460)),
  xr = Error(N(474)),
  Ku = Error(N(542)),
  du = { then: function () {} };
function Go(e) {
  return ((e = e.status), e === "fulfilled" || e === "rejected");
}
function m1(e, t, a) {
  switch (
    ((a = e[a]),
    a === void 0 ? e.push(t) : a !== t && (t.then(Pt, Pt), (t = a)),
    t.status)
  ) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw ((e = t.reason), Qo(e), e);
    default:
      if (typeof t.status == "string") t.then(Pt, Pt);
      else {
        if (((e = ie), e !== null && 100 < e.shellSuspendCounter))
          throw Error(N(482));
        ((e = t),
          (e.status = "pending"),
          e.then(
            function (l) {
              if (t.status === "pending") {
                var n = t;
                ((n.status = "fulfilled"), (n.value = l));
              }
            },
            function (l) {
              if (t.status === "pending") {
                var n = t;
                ((n.status = "rejected"), (n.reason = l));
              }
            },
          ));
      }
      switch (t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw ((e = t.reason), Qo(e), e);
      }
      throw ((Pa = t), tn);
  }
}
function ka(e) {
  try {
    var t = e._init;
    return t(e._payload);
  } catch (a) {
    throw a !== null && typeof a == "object" && typeof a.then == "function"
      ? ((Pa = a), tn)
      : a;
  }
}
var Pa = null;
function Xo() {
  if (Pa === null) throw Error(N(459));
  var e = Pa;
  return ((Pa = null), e);
}
function Qo(e) {
  if (e === tn || e === Ku) throw Error(N(483));
}
var Dl = null,
  Fn = 0;
function Ci(e) {
  var t = Fn;
  return ((Fn += 1), Dl === null && (Dl = []), m1(Dl, e, t));
}
function hn(e, t) {
  ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
}
function zi(e, t) {
  throw t.$$typeof === xm
    ? Error(N(525))
    : ((e = Object.prototype.toString.call(t)),
      Error(
        N(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      ));
}
function p1(e) {
  function t(d, m) {
    if (e) {
      var y = d.deletions;
      y === null ? ((d.deletions = [m]), (d.flags |= 16)) : y.push(m);
    }
  }
  function a(d, m) {
    if (!e) return null;
    for (; m !== null; ) (t(d, m), (m = m.sibling));
    return null;
  }
  function l(d) {
    for (var m = new Map(); d !== null; )
      (d.key !== null ? m.set(d.key, d) : m.set(d.index, d), (d = d.sibling));
    return m;
  }
  function n(d, m) {
    return ((d = ea(d, m)), (d.index = 0), (d.sibling = null), d);
  }
  function i(d, m, y) {
    return (
      (d.index = y),
      e
        ? ((y = d.alternate),
          y !== null
            ? ((y = y.index), y < m ? ((d.flags |= 67108866), m) : y)
            : ((d.flags |= 67108866), m))
        : ((d.flags |= 1048576), m)
    );
  }
  function u(d) {
    return (e && d.alternate === null && (d.flags |= 67108866), d);
  }
  function s(d, m, y, _) {
    return m === null || m.tag !== 6
      ? ((m = Sc(y, d.mode, _)), (m.return = d), m)
      : ((m = n(m, y)), (m.return = d), m);
  }
  function r(d, m, y, _) {
    var E = y.type;
    return E === yl
      ? f(d, m, y.props.children, _, y.key)
      : m !== null &&
          (m.elementType === E ||
            (typeof E == "object" &&
              E !== null &&
              E.$$typeof === da &&
              ka(E) === m.type))
        ? ((m = n(m, y.props)), hn(m, y), (m.return = d), m)
        : ((m = Xi(y.type, y.key, y.props, null, d.mode, _)),
          hn(m, y),
          (m.return = d),
          m);
  }
  function o(d, m, y, _) {
    return m === null ||
      m.tag !== 4 ||
      m.stateNode.containerInfo !== y.containerInfo ||
      m.stateNode.implementation !== y.implementation
      ? ((m = xc(y, d.mode, _)), (m.return = d), m)
      : ((m = n(m, y.children || [])), (m.return = d), m);
  }
  function f(d, m, y, _, E) {
    return m === null || m.tag !== 7
      ? ((m = Fa(y, d.mode, _, E)), (m.return = d), m)
      : ((m = n(m, y)), (m.return = d), m);
  }
  function p(d, m, y) {
    if (
      (typeof m == "string" && m !== "") ||
      typeof m == "number" ||
      typeof m == "bigint"
    )
      return ((m = Sc("" + m, d.mode, y)), (m.return = d), m);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Si:
          return (
            (y = Xi(m.type, m.key, m.props, null, d.mode, y)),
            hn(y, m),
            (y.return = d),
            y
          );
        case Nn:
          return ((m = xc(m, d.mode, y)), (m.return = d), m);
        case da:
          return ((m = ka(m)), p(d, m, y));
      }
      if (En(m) || on(m))
        return ((m = Fa(m, d.mode, y, null)), (m.return = d), m);
      if (typeof m.then == "function") return p(d, Ci(m), y);
      if (m.$$typeof === Wt) return p(d, wi(d, m), y);
      zi(d, m);
    }
    return null;
  }
  function h(d, m, y, _) {
    var E = m !== null ? m.key : null;
    if (
      (typeof y == "string" && y !== "") ||
      typeof y == "number" ||
      typeof y == "bigint"
    )
      return E !== null ? null : s(d, m, "" + y, _);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Si:
          return y.key === E ? r(d, m, y, _) : null;
        case Nn:
          return y.key === E ? o(d, m, y, _) : null;
        case da:
          return ((y = ka(y)), h(d, m, y, _));
      }
      if (En(y) || on(y)) return E !== null ? null : f(d, m, y, _, null);
      if (typeof y.then == "function") return h(d, m, Ci(y), _);
      if (y.$$typeof === Wt) return h(d, m, wi(d, y), _);
      zi(d, y);
    }
    return null;
  }
  function v(d, m, y, _, E) {
    if (
      (typeof _ == "string" && _ !== "") ||
      typeof _ == "number" ||
      typeof _ == "bigint"
    )
      return ((d = d.get(y) || null), s(m, d, "" + _, E));
    if (typeof _ == "object" && _ !== null) {
      switch (_.$$typeof) {
        case Si:
          return (
            (d = d.get(_.key === null ? y : _.key) || null),
            r(m, d, _, E)
          );
        case Nn:
          return (
            (d = d.get(_.key === null ? y : _.key) || null),
            o(m, d, _, E)
          );
        case da:
          return ((_ = ka(_)), v(d, m, y, _, E));
      }
      if (En(_) || on(_)) return ((d = d.get(y) || null), f(m, d, _, E, null));
      if (typeof _.then == "function") return v(d, m, y, Ci(_), E);
      if (_.$$typeof === Wt) return v(d, m, y, wi(m, _), E);
      zi(m, _);
    }
    return null;
  }
  function S(d, m, y, _) {
    for (
      var E = null, C = null, w = m, j = (m = 0), z = null;
      w !== null && j < y.length;
      j++
    ) {
      w.index > j ? ((z = w), (w = null)) : (z = w.sibling);
      var M = h(d, w, y[j], _);
      if (M === null) {
        w === null && (w = z);
        break;
      }
      (e && w && M.alternate === null && t(d, w),
        (m = i(M, m, j)),
        C === null ? (E = M) : (C.sibling = M),
        (C = M),
        (w = z));
    }
    if (j === y.length) return (a(d, w), X && Jt(d, j), E);
    if (w === null) {
      for (; j < y.length; j++)
        ((w = p(d, y[j], _)),
          w !== null &&
            ((m = i(w, m, j)),
            C === null ? (E = w) : (C.sibling = w),
            (C = w)));
      return (X && Jt(d, j), E);
    }
    for (w = l(w); j < y.length; j++)
      ((z = v(w, d, j, y[j], _)),
        z !== null &&
          (e && z.alternate !== null && w.delete(z.key === null ? j : z.key),
          (m = i(z, m, j)),
          C === null ? (E = z) : (C.sibling = z),
          (C = z)));
    return (
      e &&
        w.forEach(function (P) {
          return t(d, P);
        }),
      X && Jt(d, j),
      E
    );
  }
  function b(d, m, y, _) {
    if (y == null) throw Error(N(151));
    for (
      var E = null, C = null, w = m, j = (m = 0), z = null, M = y.next();
      w !== null && !M.done;
      j++, M = y.next()
    ) {
      w.index > j ? ((z = w), (w = null)) : (z = w.sibling);
      var P = h(d, w, M.value, _);
      if (P === null) {
        w === null && (w = z);
        break;
      }
      (e && w && P.alternate === null && t(d, w),
        (m = i(P, m, j)),
        C === null ? (E = P) : (C.sibling = P),
        (C = P),
        (w = z));
    }
    if (M.done) return (a(d, w), X && Jt(d, j), E);
    if (w === null) {
      for (; !M.done; j++, M = y.next())
        ((M = p(d, M.value, _)),
          M !== null &&
            ((m = i(M, m, j)),
            C === null ? (E = M) : (C.sibling = M),
            (C = M)));
      return (X && Jt(d, j), E);
    }
    for (w = l(w); !M.done; j++, M = y.next())
      ((M = v(w, d, j, M.value, _)),
        M !== null &&
          (e && M.alternate !== null && w.delete(M.key === null ? j : M.key),
          (m = i(M, m, j)),
          C === null ? (E = M) : (C.sibling = M),
          (C = M)));
    return (
      e &&
        w.forEach(function (se) {
          return t(d, se);
        }),
      X && Jt(d, j),
      E
    );
  }
  function x(d, m, y, _) {
    if (
      (typeof y == "object" &&
        y !== null &&
        y.type === yl &&
        y.key === null &&
        (y = y.props.children),
      typeof y == "object" && y !== null)
    ) {
      switch (y.$$typeof) {
        case Si:
          e: {
            for (var E = y.key; m !== null; ) {
              if (m.key === E) {
                if (((E = y.type), E === yl)) {
                  if (m.tag === 7) {
                    (a(d, m.sibling),
                      (_ = n(m, y.props.children)),
                      (_.return = d),
                      (d = _));
                    break e;
                  }
                } else if (
                  m.elementType === E ||
                  (typeof E == "object" &&
                    E !== null &&
                    E.$$typeof === da &&
                    ka(E) === m.type)
                ) {
                  (a(d, m.sibling),
                    (_ = n(m, y.props)),
                    hn(_, y),
                    (_.return = d),
                    (d = _));
                  break e;
                }
                a(d, m);
                break;
              } else t(d, m);
              m = m.sibling;
            }
            y.type === yl
              ? ((_ = Fa(y.props.children, d.mode, _, y.key)),
                (_.return = d),
                (d = _))
              : ((_ = Xi(y.type, y.key, y.props, null, d.mode, _)),
                hn(_, y),
                (_.return = d),
                (d = _));
          }
          return u(d);
        case Nn:
          e: {
            for (E = y.key; m !== null; ) {
              if (m.key === E)
                if (
                  m.tag === 4 &&
                  m.stateNode.containerInfo === y.containerInfo &&
                  m.stateNode.implementation === y.implementation
                ) {
                  (a(d, m.sibling),
                    (_ = n(m, y.children || [])),
                    (_.return = d),
                    (d = _));
                  break e;
                } else {
                  a(d, m);
                  break;
                }
              else t(d, m);
              m = m.sibling;
            }
            ((_ = xc(y, d.mode, _)), (_.return = d), (d = _));
          }
          return u(d);
        case da:
          return ((y = ka(y)), x(d, m, y, _));
      }
      if (En(y)) return S(d, m, y, _);
      if (on(y)) {
        if (((E = on(y)), typeof E != "function")) throw Error(N(150));
        return ((y = E.call(y)), b(d, m, y, _));
      }
      if (typeof y.then == "function") return x(d, m, Ci(y), _);
      if (y.$$typeof === Wt) return x(d, m, wi(d, y), _);
      zi(d, y);
    }
    return (typeof y == "string" && y !== "") ||
      typeof y == "number" ||
      typeof y == "bigint"
      ? ((y = "" + y),
        m !== null && m.tag === 6
          ? (a(d, m.sibling), (_ = n(m, y)), (_.return = d), (d = _))
          : (a(d, m), (_ = Sc(y, d.mode, _)), (_.return = d), (d = _)),
        u(d))
      : a(d, m);
  }
  return function (d, m, y, _) {
    try {
      Fn = 0;
      var E = x(d, m, y, _);
      return ((Dl = null), E);
    } catch (w) {
      if (w === tn || w === Ku) throw w;
      var C = ct(29, w, null, d.mode);
      return ((C.lanes = _), (C.return = d), C);
    } finally {
    }
  };
}
var al = p1(!0),
  v1 = p1(!1),
  ha = !1;
function Nr(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null,
  };
}
function bs(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null,
      }));
}
function Aa(e) {
  return { lane: e, tag: 0, payload: null, callback: null, next: null };
}
function wa(e, t, a) {
  var l = e.updateQueue;
  if (l === null) return null;
  if (((l = l.shared), k & 2)) {
    var n = l.pending;
    return (
      n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (l.pending = t),
      (t = ru(e)),
      c1(e, null, a),
      t
    );
  }
  return (ku(e, l, t, a), ru(e));
}
function Dn(e, t, a) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))
  ) {
    var l = t.lanes;
    ((l &= e.pendingLanes), (a |= l), (t.lanes = a), Dd(e, a));
  }
}
function Ec(e, t) {
  var a = e.updateQueue,
    l = e.alternate;
  if (l !== null && ((l = l.updateQueue), a === l)) {
    var n = null,
      i = null;
    if (((a = a.firstBaseUpdate), a !== null)) {
      do {
        var u = {
          lane: a.lane,
          tag: a.tag,
          payload: a.payload,
          callback: null,
          next: null,
        };
        (i === null ? (n = i = u) : (i = i.next = u), (a = a.next));
      } while (a !== null);
      i === null ? (n = i = t) : (i = i.next = t);
    } else n = i = t;
    ((a = {
      baseState: l.baseState,
      firstBaseUpdate: n,
      lastBaseUpdate: i,
      shared: l.shared,
      callbacks: l.callbacks,
    }),
      (e.updateQueue = a));
    return;
  }
  ((e = a.lastBaseUpdate),
    e === null ? (a.firstBaseUpdate = t) : (e.next = t),
    (a.lastBaseUpdate = t));
}
var Ss = !1;
function Ln() {
  if (Ss) {
    var e = Ol;
    if (e !== null) throw e;
  }
}
function Un(e, t, a, l) {
  Ss = !1;
  var n = e.updateQueue;
  ha = !1;
  var i = n.firstBaseUpdate,
    u = n.lastBaseUpdate,
    s = n.shared.pending;
  if (s !== null) {
    n.shared.pending = null;
    var r = s,
      o = r.next;
    ((r.next = null), u === null ? (i = o) : (u.next = o), (u = r));
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (s = f.lastBaseUpdate),
      s !== u &&
        (s === null ? (f.firstBaseUpdate = o) : (s.next = o),
        (f.lastBaseUpdate = r)));
  }
  if (i !== null) {
    var p = n.baseState;
    ((u = 0), (f = o = r = null), (s = i));
    do {
      var h = s.lane & -536870913,
        v = h !== s.lane;
      if (v ? ($ & h) === h : (l & h) === h) {
        (h !== 0 && h === Yl && (Ss = !0),
          f !== null &&
            (f = f.next =
              {
                lane: 0,
                tag: s.tag,
                payload: s.payload,
                callback: null,
                next: null,
              }));
        e: {
          var S = e,
            b = s;
          h = t;
          var x = a;
          switch (b.tag) {
            case 1:
              if (((S = b.payload), typeof S == "function")) {
                p = S.call(x, p, h);
                break e;
              }
              p = S;
              break e;
            case 3:
              S.flags = (S.flags & -65537) | 128;
            case 0:
              if (
                ((S = b.payload),
                (h = typeof S == "function" ? S.call(x, p, h) : S),
                h == null)
              )
                break e;
              p = he({}, p, h);
              break e;
            case 2:
              ha = !0;
          }
        }
        ((h = s.callback),
          h !== null &&
            ((e.flags |= 64),
            v && (e.flags |= 8192),
            (v = n.callbacks),
            v === null ? (n.callbacks = [h]) : v.push(h)));
      } else
        ((v = {
          lane: h,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          f === null ? ((o = f = v), (r = p)) : (f = f.next = v),
          (u |= h));
      if (((s = s.next), s === null)) {
        if (((s = n.shared.pending), s === null)) break;
        ((v = s),
          (s = v.next),
          (v.next = null),
          (n.lastBaseUpdate = v),
          (n.shared.pending = null));
      }
    } while (!0);
    (f === null && (r = p),
      (n.baseState = r),
      (n.firstBaseUpdate = o),
      (n.lastBaseUpdate = f),
      i === null && (n.shared.lanes = 0),
      (Ua |= u),
      (e.lanes = u),
      (e.memoizedState = p));
  }
}
function g1(e, t) {
  if (typeof e != "function") throw Error(N(191, e));
  e.call(t);
}
function y1(e, t) {
  var a = e.callbacks;
  if (a !== null)
    for (e.callbacks = null, e = 0; e < a.length; e++) g1(a[e], t);
}
var Vl = qt(null),
  hu = qt(0);
function Zo(e, t) {
  ((e = ca), ce(hu, e), ce(Vl, t), (ca = e | t.baseLanes));
}
function xs() {
  (ce(hu, ca), ce(Vl, Vl.current));
}
function Er() {
  ((ca = hu.current), De(Vl), De(hu));
}
var mt = qt(null),
  Nt = null;
function pa(e) {
  var t = e.alternate;
  (ce(Se, Se.current & 1),
    ce(mt, e),
    Nt === null &&
      (t === null || Vl.current !== null || t.memoizedState !== null) &&
      (Nt = e));
}
function Ns(e) {
  (ce(Se, Se.current), ce(mt, e), Nt === null && (Nt = e));
}
function _1(e) {
  e.tag === 22
    ? (ce(Se, Se.current), ce(mt, e), Nt === null && (Nt = e))
    : va();
}
function va() {
  (ce(Se, Se.current), ce(mt, mt.current));
}
function ut(e) {
  (De(mt), Nt === e && (Nt = null), De(Se));
}
var Se = qt(0);
function mu(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var a = t.memoizedState;
      if (a !== null && ((a = a.dehydrated), a === null || $s(a) || Gs(a)))
        return t;
    } else if (
      t.tag === 19 &&
      (t.memoizedProps.revealOrder === "forwards" ||
        t.memoizedProps.revealOrder === "backwards" ||
        t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
        t.memoizedProps.revealOrder === "together")
    ) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var na = 0,
  q = null,
  te = null,
  Ne = null,
  pu = !1,
  Ll = !1,
  ll = !1,
  vu = 0,
  Wn = 0,
  Ul = null,
  B0 = 0;
function ge() {
  throw Error(N(321));
}
function jr(e, t) {
  if (t === null) return !1;
  for (var a = 0; a < t.length && a < e.length; a++)
    if (!ht(e[a], t[a])) return !1;
  return !0;
}
function Ar(e, t, a, l, n, i) {
  return (
    (na = i),
    (q = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (U.H = e === null || e.memoizedState === null ? F1 : Br),
    (ll = !1),
    (i = a(l, n)),
    (ll = !1),
    Ll && (i = S1(t, a, l, n)),
    b1(e),
    i
  );
}
function b1(e) {
  U.H = Pn;
  var t = te !== null && te.next !== null;
  if (((na = 0), (Ne = te = q = null), (pu = !1), (Wn = 0), (Ul = null), t))
    throw Error(N(300));
  e === null || Ae || ((e = e.dependencies), e !== null && fu(e) && (Ae = !0));
}
function S1(e, t, a, l) {
  q = e;
  var n = 0;
  do {
    if ((Ll && (Ul = null), (Wn = 0), (Ll = !1), 25 <= n)) throw Error(N(301));
    if (((n += 1), (Ne = te = null), e.updateQueue != null)) {
      var i = e.updateQueue;
      ((i.lastEffect = null),
        (i.events = null),
        (i.stores = null),
        i.memoCache != null && (i.memoCache.index = 0));
    }
    ((U.H = W1), (i = t(a, l)));
  } while (Ll);
  return i;
}
function H0() {
  var e = U.H,
    t = e.useState()[0];
  return (
    (t = typeof t.then == "function" ? di(t) : t),
    (e = e.useState()[0]),
    (te !== null ? te.memoizedState : null) !== e && (q.flags |= 1024),
    t
  );
}
function wr() {
  var e = vu !== 0;
  return ((vu = 0), e);
}
function Cr(e, t, a) {
  ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
}
function zr(e) {
  if (pu) {
    for (e = e.memoizedState; e !== null; ) {
      var t = e.queue;
      (t !== null && (t.pending = null), (e = e.next));
    }
    pu = !1;
  }
  ((na = 0), (Ne = te = q = null), (Ll = !1), (Wn = vu = 0), (Ul = null));
}
function Ze() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (Ne === null ? (q.memoizedState = Ne = e) : (Ne = Ne.next = e), Ne);
}
function xe() {
  if (te === null) {
    var e = q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = te.next;
  var t = Ne === null ? q.memoizedState : Ne.next;
  if (t !== null) ((Ne = t), (te = e));
  else {
    if (e === null) throw q.alternate === null ? Error(N(467)) : Error(N(310));
    ((te = e),
      (e = {
        memoizedState: te.memoizedState,
        baseState: te.baseState,
        baseQueue: te.baseQueue,
        queue: te.queue,
        next: null,
      }),
      Ne === null ? (q.memoizedState = Ne = e) : (Ne = Ne.next = e));
  }
  return Ne;
}
function Ju() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function di(e) {
  var t = Wn;
  return (
    (Wn += 1),
    Ul === null && (Ul = []),
    (e = m1(Ul, e, t)),
    (t = q),
    (Ne === null ? t.memoizedState : Ne.next) === null &&
      ((t = t.alternate),
      (U.H = t === null || t.memoizedState === null ? F1 : Br)),
    e
  );
}
function Fu(e) {
  if (e !== null && typeof e == "object") {
    if (typeof e.then == "function") return di(e);
    if (e.$$typeof === Wt) return qe(e);
  }
  throw Error(N(438, String(e)));
}
function Tr(e) {
  var t = null,
    a = q.updateQueue;
  if ((a !== null && (t = a.memoCache), t == null)) {
    var l = q.alternate;
    l !== null &&
      ((l = l.updateQueue),
      l !== null &&
        ((l = l.memoCache),
        l != null &&
          (t = {
            data: l.data.map(function (n) {
              return n.slice();
            }),
            index: 0,
          })));
  }
  if (
    (t == null && (t = { data: [], index: 0 }),
    a === null && ((a = Ju()), (q.updateQueue = a)),
    (a.memoCache = t),
    (a = t.data[t.index]),
    a === void 0)
  )
    for (a = t.data[t.index] = Array(e), l = 0; l < e; l++) a[l] = Nm;
  return (t.index++, a);
}
function ia(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Zi(e) {
  var t = xe();
  return Mr(t, te, e);
}
function Mr(e, t, a) {
  var l = e.queue;
  if (l === null) throw Error(N(311));
  l.lastRenderedReducer = a;
  var n = e.baseQueue,
    i = l.pending;
  if (i !== null) {
    if (n !== null) {
      var u = n.next;
      ((n.next = i.next), (i.next = u));
    }
    ((t.baseQueue = n = i), (l.pending = null));
  }
  if (((i = e.baseState), n === null)) e.memoizedState = i;
  else {
    t = n.next;
    var s = (u = null),
      r = null,
      o = t,
      f = !1;
    do {
      var p = o.lane & -536870913;
      if (p !== o.lane ? ($ & p) === p : (na & p) === p) {
        var h = o.revertLane;
        if (h === 0)
          (r !== null &&
            (r = r.next =
              {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: o.action,
                hasEagerState: o.hasEagerState,
                eagerState: o.eagerState,
                next: null,
              }),
            p === Yl && (f = !0));
        else if ((na & h) === h) {
          ((o = o.next), h === Yl && (f = !0));
          continue;
        } else
          ((p = {
            lane: 0,
            revertLane: o.revertLane,
            gesture: null,
            action: o.action,
            hasEagerState: o.hasEagerState,
            eagerState: o.eagerState,
            next: null,
          }),
            r === null ? ((s = r = p), (u = i)) : (r = r.next = p),
            (q.lanes |= h),
            (Ua |= h));
        ((p = o.action),
          ll && a(i, p),
          (i = o.hasEagerState ? o.eagerState : a(i, p)));
      } else
        ((h = {
          lane: p,
          revertLane: o.revertLane,
          gesture: o.gesture,
          action: o.action,
          hasEagerState: o.hasEagerState,
          eagerState: o.eagerState,
          next: null,
        }),
          r === null ? ((s = r = h), (u = i)) : (r = r.next = h),
          (q.lanes |= p),
          (Ua |= p));
      o = o.next;
    } while (o !== null && o !== t);
    if (
      (r === null ? (u = i) : (r.next = s),
      !ht(i, e.memoizedState) && ((Ae = !0), f && ((a = Ol), a !== null)))
    )
      throw a;
    ((e.memoizedState = i),
      (e.baseState = u),
      (e.baseQueue = r),
      (l.lastRenderedState = i));
  }
  return (n === null && (l.lanes = 0), [e.memoizedState, l.dispatch]);
}
function jc(e) {
  var t = xe(),
    a = t.queue;
  if (a === null) throw Error(N(311));
  a.lastRenderedReducer = e;
  var l = a.dispatch,
    n = a.pending,
    i = t.memoizedState;
  if (n !== null) {
    a.pending = null;
    var u = (n = n.next);
    do ((i = e(i, u.action)), (u = u.next));
    while (u !== n);
    (ht(i, t.memoizedState) || (Ae = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (a.lastRenderedState = i));
  }
  return [i, l];
}
function x1(e, t, a) {
  var l = q,
    n = xe(),
    i = X;
  if (i) {
    if (a === void 0) throw Error(N(407));
    a = a();
  } else a = t();
  var u = !ht((te || n).memoizedState, a);
  if (
    (u && ((n.memoizedState = a), (Ae = !0)),
    (n = n.queue),
    Rr(j1.bind(null, l, n, e), [e]),
    n.getSnapshot !== t || u || (Ne !== null && Ne.memoizedState.tag & 1))
  ) {
    if (
      ((l.flags |= 2048),
      $l(9, { destroy: void 0 }, E1.bind(null, l, n, a, t), null),
      ie === null)
    )
      throw Error(N(349));
    i || na & 127 || N1(l, t, a);
  }
  return a;
}
function N1(e, t, a) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: a }),
    (t = q.updateQueue),
    t === null
      ? ((t = Ju()), (q.updateQueue = t), (t.stores = [e]))
      : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
}
function E1(e, t, a, l) {
  ((t.value = a), (t.getSnapshot = l), A1(t) && w1(e));
}
function j1(e, t, a) {
  return a(function () {
    A1(t) && w1(e);
  });
}
function A1(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var a = t();
    return !ht(e, a);
  } catch {
    return !0;
  }
}
function w1(e) {
  var t = rl(e, 2);
  t !== null && Ie(t, e, 2);
}
function Es(e) {
  var t = Ze();
  if (typeof e == "function") {
    var a = e;
    if (((e = a()), ll)) {
      ya(!0);
      try {
        a();
      } finally {
        ya(!1);
      }
    }
  }
  return (
    (t.memoizedState = t.baseState = e),
    (t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ia,
      lastRenderedState: e,
    }),
    t
  );
}
function C1(e, t, a, l) {
  return ((e.baseState = a), Mr(e, te, typeof l == "function" ? l : ia));
}
function q0(e, t, a, l, n) {
  if (Pu(e)) throw Error(N(485));
  if (((e = t.action), e !== null)) {
    var i = {
      payload: n,
      action: e,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function (u) {
        i.listeners.push(u);
      },
    };
    (U.T !== null ? a(!0) : (i.isTransition = !1),
      l(i),
      (a = t.pending),
      a === null
        ? ((i.next = t.pending = i), z1(t, i))
        : ((i.next = a.next), (t.pending = a.next = i)));
  }
}
function z1(e, t) {
  var a = t.action,
    l = t.payload,
    n = e.state;
  if (t.isTransition) {
    var i = U.T,
      u = {};
    U.T = u;
    try {
      var s = a(n, l),
        r = U.S;
      (r !== null && r(u, s), ko(e, t, s));
    } catch (o) {
      js(e, t, o);
    } finally {
      (i !== null && u.types !== null && (i.types = u.types), (U.T = i));
    }
  } else
    try {
      ((i = a(n, l)), ko(e, t, i));
    } catch (o) {
      js(e, t, o);
    }
}
function ko(e, t, a) {
  a !== null && typeof a == "object" && typeof a.then == "function"
    ? a.then(
        function (l) {
          Ko(e, t, l);
        },
        function (l) {
          return js(e, t, l);
        },
      )
    : Ko(e, t, a);
}
function Ko(e, t, a) {
  ((t.status = "fulfilled"),
    (t.value = a),
    T1(t),
    (e.state = a),
    (t = e.pending),
    t !== null &&
      ((a = t.next),
      a === t ? (e.pending = null) : ((a = a.next), (t.next = a), z1(e, a))));
}
function js(e, t, a) {
  var l = e.pending;
  if (((e.pending = null), l !== null)) {
    l = l.next;
    do ((t.status = "rejected"), (t.reason = a), T1(t), (t = t.next));
    while (t !== l);
  }
  e.action = null;
}
function T1(e) {
  e = e.listeners;
  for (var t = 0; t < e.length; t++) (0, e[t])();
}
function M1(e, t) {
  return t;
}
function Jo(e, t) {
  if (X) {
    var a = ie.formState;
    if (a !== null) {
      e: {
        var l = q;
        if (X) {
          if (fe) {
            t: {
              for (var n = fe, i = xt; n.nodeType !== 8; ) {
                if (!i) {
                  n = null;
                  break t;
                }
                if (((n = Et(n.nextSibling)), n === null)) {
                  n = null;
                  break t;
                }
              }
              ((i = n.data), (n = i === "F!" || i === "F" ? n : null));
            }
            if (n) {
              ((fe = Et(n.nextSibling)), (l = n.data === "F!"));
              break e;
            }
          }
          Da(l);
        }
        l = !1;
      }
      l && (t = a[0]);
    }
  }
  return (
    (a = Ze()),
    (a.memoizedState = a.baseState = t),
    (l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: M1,
      lastRenderedState: t,
    }),
    (a.queue = l),
    (a = k1.bind(null, q, l)),
    (l.dispatch = a),
    (l = Es(!1)),
    (i = Ur.bind(null, q, !1, l.queue)),
    (l = Ze()),
    (n = { state: t, dispatch: null, action: e, pending: null }),
    (l.queue = n),
    (a = q0.bind(null, q, n, i, a)),
    (n.dispatch = a),
    (l.memoizedState = e),
    [t, a, !1]
  );
}
function Fo(e) {
  var t = xe();
  return R1(t, te, e);
}
function R1(e, t, a) {
  if (
    ((t = Mr(e, t, M1)[0]),
    (e = Zi(ia)[0]),
    typeof t == "object" && t !== null && typeof t.then == "function")
  )
    try {
      var l = di(t);
    } catch (u) {
      throw u === tn ? Ku : u;
    }
  else l = t;
  t = xe();
  var n = t.queue,
    i = n.dispatch;
  return (
    a !== t.memoizedState &&
      ((q.flags |= 2048),
      $l(9, { destroy: void 0 }, Y0.bind(null, n, a), null)),
    [l, i, e]
  );
}
function Y0(e, t) {
  e.action = t;
}
function Wo(e) {
  var t = xe(),
    a = te;
  if (a !== null) return R1(t, a, e);
  (xe(), (t = t.memoizedState), (a = xe()));
  var l = a.queue.dispatch;
  return ((a.memoizedState = e), [t, l, !1]);
}
function $l(e, t, a, l) {
  return (
    (e = { tag: e, create: a, deps: l, inst: t, next: null }),
    (t = q.updateQueue),
    t === null && ((t = Ju()), (q.updateQueue = t)),
    (a = t.lastEffect),
    a === null
      ? (t.lastEffect = e.next = e)
      : ((l = a.next), (a.next = e), (e.next = l), (t.lastEffect = e)),
    e
  );
}
function O1() {
  return xe().memoizedState;
}
function ki(e, t, a, l) {
  var n = Ze();
  ((q.flags |= e),
    (n.memoizedState = $l(
      1 | t,
      { destroy: void 0 },
      a,
      l === void 0 ? null : l,
    )));
}
function Wu(e, t, a, l) {
  var n = xe();
  l = l === void 0 ? null : l;
  var i = n.memoizedState.inst;
  te !== null && l !== null && jr(l, te.memoizedState.deps)
    ? (n.memoizedState = $l(t, i, a, l))
    : ((q.flags |= e), (n.memoizedState = $l(1 | t, i, a, l)));
}
function Po(e, t) {
  ki(8390656, 8, e, t);
}
function Rr(e, t) {
  Wu(2048, 8, e, t);
}
function V0(e) {
  q.flags |= 4;
  var t = q.updateQueue;
  if (t === null) ((t = Ju()), (q.updateQueue = t), (t.events = [e]));
  else {
    var a = t.events;
    a === null ? (t.events = [e]) : a.push(e);
  }
}
function D1(e) {
  var t = xe().memoizedState;
  return (
    V0({ ref: t, nextImpl: e }),
    function () {
      if (k & 2) throw Error(N(440));
      return t.impl.apply(void 0, arguments);
    }
  );
}
function L1(e, t) {
  return Wu(4, 2, e, t);
}
function U1(e, t) {
  return Wu(4, 4, e, t);
}
function B1(e, t) {
  if (typeof t == "function") {
    e = e();
    var a = t(e);
    return function () {
      typeof a == "function" ? a() : t(null);
    };
  }
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function H1(e, t, a) {
  ((a = a != null ? a.concat([e]) : null), Wu(4, 4, B1.bind(null, t, e), a));
}
function Or() {}
function q1(e, t) {
  var a = xe();
  t = t === void 0 ? null : t;
  var l = a.memoizedState;
  return t !== null && jr(t, l[1]) ? l[0] : ((a.memoizedState = [e, t]), e);
}
function Y1(e, t) {
  var a = xe();
  t = t === void 0 ? null : t;
  var l = a.memoizedState;
  if (t !== null && jr(t, l[1])) return l[0];
  if (((l = e()), ll)) {
    ya(!0);
    try {
      e();
    } finally {
      ya(!1);
    }
  }
  return ((a.memoizedState = [l, t]), l);
}
function Dr(e, t, a) {
  return a === void 0 || (na & 1073741824 && !($ & 261930))
    ? (e.memoizedState = t)
    : ((e.memoizedState = a), (e = C2()), (q.lanes |= e), (Ua |= e), a);
}
function V1(e, t, a, l) {
  return ht(a, t)
    ? a
    : Vl.current !== null
      ? ((e = Dr(e, a, l)), ht(e, t) || (Ae = !0), e)
      : !(na & 42) || (na & 1073741824 && !($ & 261930))
        ? ((Ae = !0), (e.memoizedState = a))
        : ((e = C2()), (q.lanes |= e), (Ua |= e), t);
}
function $1(e, t, a, l, n) {
  var i = K.p;
  K.p = i !== 0 && 8 > i ? i : 8;
  var u = U.T,
    s = {};
  ((U.T = s), Ur(e, !1, t, a));
  try {
    var r = n(),
      o = U.S;
    if (
      (o !== null && o(s, r),
      r !== null && typeof r == "object" && typeof r.then == "function")
    ) {
      var f = U0(r, l);
      Bn(e, t, f, dt(e));
    } else Bn(e, t, l, dt(e));
  } catch (p) {
    Bn(e, t, { then: function () {}, status: "rejected", reason: p }, dt());
  } finally {
    ((K.p = i),
      u !== null && s.types !== null && (u.types = s.types),
      (U.T = u));
  }
}
function $0() {}
function As(e, t, a, l) {
  if (e.tag !== 5) throw Error(N(476));
  var n = G1(e).queue;
  $1(
    e,
    n,
    t,
    Ja,
    a === null
      ? $0
      : function () {
          return (X1(e), a(l));
        },
  );
}
function G1(e) {
  var t = e.memoizedState;
  if (t !== null) return t;
  t = {
    memoizedState: Ja,
    baseState: Ja,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ia,
      lastRenderedState: Ja,
    },
    next: null,
  };
  var a = {};
  return (
    (t.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ia,
        lastRenderedState: a,
      },
      next: null,
    }),
    (e.memoizedState = t),
    (e = e.alternate),
    e !== null && (e.memoizedState = t),
    t
  );
}
function X1(e) {
  var t = G1(e);
  (t.next === null && (t = e.alternate.memoizedState),
    Bn(e, t.next.queue, {}, dt()));
}
function Lr() {
  return qe(ti);
}
function Q1() {
  return xe().memoizedState;
}
function Z1() {
  return xe().memoizedState;
}
function G0(e) {
  for (var t = e.return; t !== null; ) {
    switch (t.tag) {
      case 24:
      case 3:
        var a = dt();
        e = Aa(a);
        var l = wa(t, e, a);
        (l !== null && (Ie(l, t, a), Dn(l, t, a)),
          (t = { cache: br() }),
          (e.payload = t));
        return;
    }
    t = t.return;
  }
}
function X0(e, t, a) {
  var l = dt();
  ((a = {
    lane: l,
    revertLane: 0,
    gesture: null,
    action: a,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  }),
    Pu(e)
      ? K1(t, a)
      : ((a = vr(e, t, a, l)), a !== null && (Ie(a, e, l), J1(a, t, l))));
}
function k1(e, t, a) {
  var l = dt();
  Bn(e, t, a, l);
}
function Bn(e, t, a, l) {
  var n = {
    lane: l,
    revertLane: 0,
    gesture: null,
    action: a,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  };
  if (Pu(e)) K1(t, n);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var u = t.lastRenderedState,
          s = i(u, a);
        if (((n.hasEagerState = !0), (n.eagerState = s), ht(s, u)))
          return (ku(e, t, n, 0), ie === null && Zu(), !1);
      } catch {
      } finally {
      }
    if (((a = vr(e, t, n, l)), a !== null))
      return (Ie(a, e, l), J1(a, t, l), !0);
  }
  return !1;
}
function Ur(e, t, a, l) {
  if (
    ((l = {
      lane: 2,
      revertLane: Qr(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Pu(e))
  ) {
    if (t) throw Error(N(479));
  } else ((t = vr(e, a, l, 2)), t !== null && Ie(t, e, 2));
}
function Pu(e) {
  var t = e.alternate;
  return e === q || (t !== null && t === q);
}
function K1(e, t) {
  Ll = pu = !0;
  var a = e.pending;
  (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
    (e.pending = t));
}
function J1(e, t, a) {
  if (a & 4194048) {
    var l = t.lanes;
    ((l &= e.pendingLanes), (a |= l), (t.lanes = a), Dd(e, a));
  }
}
var Pn = {
  readContext: qe,
  use: Fu,
  useCallback: ge,
  useContext: ge,
  useEffect: ge,
  useImperativeHandle: ge,
  useLayoutEffect: ge,
  useInsertionEffect: ge,
  useMemo: ge,
  useReducer: ge,
  useRef: ge,
  useState: ge,
  useDebugValue: ge,
  useDeferredValue: ge,
  useTransition: ge,
  useSyncExternalStore: ge,
  useId: ge,
  useHostTransitionStatus: ge,
  useFormState: ge,
  useActionState: ge,
  useOptimistic: ge,
  useMemoCache: ge,
  useCacheRefresh: ge,
};
Pn.useEffectEvent = ge;
var F1 = {
    readContext: qe,
    use: Fu,
    useCallback: function (e, t) {
      return ((Ze().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: qe,
    useEffect: Po,
    useImperativeHandle: function (e, t, a) {
      ((a = a != null ? a.concat([e]) : null),
        ki(4194308, 4, B1.bind(null, t, e), a));
    },
    useLayoutEffect: function (e, t) {
      return ki(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      ki(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var a = Ze();
      t = t === void 0 ? null : t;
      var l = e();
      if (ll) {
        ya(!0);
        try {
          e();
        } finally {
          ya(!1);
        }
      }
      return ((a.memoizedState = [l, t]), l);
    },
    useReducer: function (e, t, a) {
      var l = Ze();
      if (a !== void 0) {
        var n = a(t);
        if (ll) {
          ya(!0);
          try {
            a(t);
          } finally {
            ya(!1);
          }
        }
      } else n = t;
      return (
        (l.memoizedState = l.baseState = n),
        (e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: n,
        }),
        (l.queue = e),
        (e = e.dispatch = X0.bind(null, q, e)),
        [l.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ze();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: function (e) {
      e = Es(e);
      var t = e.queue,
        a = k1.bind(null, q, t);
      return ((t.dispatch = a), [e.memoizedState, a]);
    },
    useDebugValue: Or,
    useDeferredValue: function (e, t) {
      var a = Ze();
      return Dr(a, e, t);
    },
    useTransition: function () {
      var e = Es(!1);
      return (
        (e = $1.bind(null, q, e.queue, !0, !1)),
        (Ze().memoizedState = e),
        [!1, e]
      );
    },
    useSyncExternalStore: function (e, t, a) {
      var l = q,
        n = Ze();
      if (X) {
        if (a === void 0) throw Error(N(407));
        a = a();
      } else {
        if (((a = t()), ie === null)) throw Error(N(349));
        $ & 127 || N1(l, t, a);
      }
      n.memoizedState = a;
      var i = { value: a, getSnapshot: t };
      return (
        (n.queue = i),
        Po(j1.bind(null, l, i, e), [e]),
        (l.flags |= 2048),
        $l(9, { destroy: void 0 }, E1.bind(null, l, i, a, t), null),
        a
      );
    },
    useId: function () {
      var e = Ze(),
        t = ie.identifierPrefix;
      if (X) {
        var a = Lt,
          l = Dt;
        ((a = (l & ~(1 << (32 - ft(l) - 1))).toString(32) + a),
          (t = "_" + t + "R_" + a),
          (a = vu++),
          0 < a && (t += "H" + a.toString(32)),
          (t += "_"));
      } else ((a = B0++), (t = "_" + t + "r_" + a.toString(32) + "_"));
      return (e.memoizedState = t);
    },
    useHostTransitionStatus: Lr,
    useFormState: Jo,
    useActionState: Jo,
    useOptimistic: function (e) {
      var t = Ze();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null,
      };
      return (
        (t.queue = a),
        (t = Ur.bind(null, q, !0, a)),
        (a.dispatch = t),
        [e, t]
      );
    },
    useMemoCache: Tr,
    useCacheRefresh: function () {
      return (Ze().memoizedState = G0.bind(null, q));
    },
    useEffectEvent: function (e) {
      var t = Ze(),
        a = { impl: e };
      return (
        (t.memoizedState = a),
        function () {
          if (k & 2) throw Error(N(440));
          return a.impl.apply(void 0, arguments);
        }
      );
    },
  },
  Br = {
    readContext: qe,
    use: Fu,
    useCallback: q1,
    useContext: qe,
    useEffect: Rr,
    useImperativeHandle: H1,
    useInsertionEffect: L1,
    useLayoutEffect: U1,
    useMemo: Y1,
    useReducer: Zi,
    useRef: O1,
    useState: function () {
      return Zi(ia);
    },
    useDebugValue: Or,
    useDeferredValue: function (e, t) {
      var a = xe();
      return V1(a, te.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Zi(ia)[0],
        t = xe().memoizedState;
      return [typeof e == "boolean" ? e : di(e), t];
    },
    useSyncExternalStore: x1,
    useId: Q1,
    useHostTransitionStatus: Lr,
    useFormState: Fo,
    useActionState: Fo,
    useOptimistic: function (e, t) {
      var a = xe();
      return C1(a, te, e, t);
    },
    useMemoCache: Tr,
    useCacheRefresh: Z1,
  };
Br.useEffectEvent = D1;
var W1 = {
  readContext: qe,
  use: Fu,
  useCallback: q1,
  useContext: qe,
  useEffect: Rr,
  useImperativeHandle: H1,
  useInsertionEffect: L1,
  useLayoutEffect: U1,
  useMemo: Y1,
  useReducer: jc,
  useRef: O1,
  useState: function () {
    return jc(ia);
  },
  useDebugValue: Or,
  useDeferredValue: function (e, t) {
    var a = xe();
    return te === null ? Dr(a, e, t) : V1(a, te.memoizedState, e, t);
  },
  useTransition: function () {
    var e = jc(ia)[0],
      t = xe().memoizedState;
    return [typeof e == "boolean" ? e : di(e), t];
  },
  useSyncExternalStore: x1,
  useId: Q1,
  useHostTransitionStatus: Lr,
  useFormState: Wo,
  useActionState: Wo,
  useOptimistic: function (e, t) {
    var a = xe();
    return te !== null
      ? C1(a, te, e, t)
      : ((a.baseState = e), [e, a.queue.dispatch]);
  },
  useMemoCache: Tr,
  useCacheRefresh: Z1,
};
W1.useEffectEvent = D1;
function Ac(e, t, a, l) {
  ((t = e.memoizedState),
    (a = a(l, t)),
    (a = a == null ? t : he({}, t, a)),
    (e.memoizedState = a),
    e.lanes === 0 && (e.updateQueue.baseState = a));
}
var ws = {
  enqueueSetState: function (e, t, a) {
    e = e._reactInternals;
    var l = dt(),
      n = Aa(l);
    ((n.payload = t),
      a != null && (n.callback = a),
      (t = wa(e, n, l)),
      t !== null && (Ie(t, e, l), Dn(t, e, l)));
  },
  enqueueReplaceState: function (e, t, a) {
    e = e._reactInternals;
    var l = dt(),
      n = Aa(l);
    ((n.tag = 1),
      (n.payload = t),
      a != null && (n.callback = a),
      (t = wa(e, n, l)),
      t !== null && (Ie(t, e, l), Dn(t, e, l)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var a = dt(),
      l = Aa(a);
    ((l.tag = 2),
      t != null && (l.callback = t),
      (t = wa(e, l, a)),
      t !== null && (Ie(t, e, a), Dn(t, e, a)));
  },
};
function Io(e, t, a, l, n, i, u) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(l, i, u)
      : t.prototype && t.prototype.isPureReactComponent
        ? !kn(a, l) || !kn(n, i)
        : !0
  );
}
function ef(e, t, a, l) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(a, l),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(a, l),
    t.state !== e && ws.enqueueReplaceState(t, t.state, null));
}
function nl(e, t) {
  var a = t;
  if ("ref" in t) {
    a = {};
    for (var l in t) l !== "ref" && (a[l] = t[l]);
  }
  if ((e = e.defaultProps)) {
    a === t && (a = he({}, a));
    for (var n in e) a[n] === void 0 && (a[n] = e[n]);
  }
  return a;
}
function P1(e) {
  su(e);
}
function I1(e) {
  console.error(e);
}
function e2(e) {
  su(e);
}
function gu(e, t) {
  try {
    var a = e.onUncaughtError;
    a(t.value, { componentStack: t.stack });
  } catch (l) {
    setTimeout(function () {
      throw l;
    });
  }
}
function tf(e, t, a) {
  try {
    var l = e.onCaughtError;
    l(a.value, {
      componentStack: a.stack,
      errorBoundary: t.tag === 1 ? t.stateNode : null,
    });
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
function Cs(e, t, a) {
  return (
    (a = Aa(a)),
    (a.tag = 3),
    (a.payload = { element: null }),
    (a.callback = function () {
      gu(e, t);
    }),
    a
  );
}
function t2(e) {
  return ((e = Aa(e)), (e.tag = 3), e);
}
function a2(e, t, a, l) {
  var n = a.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var i = l.value;
    ((e.payload = function () {
      return n(i);
    }),
      (e.callback = function () {
        tf(t, a, l);
      }));
  }
  var u = a.stateNode;
  u !== null &&
    typeof u.componentDidCatch == "function" &&
    (e.callback = function () {
      (tf(t, a, l),
        typeof n != "function" &&
          (Ca === null ? (Ca = new Set([this])) : Ca.add(this)));
      var s = l.stack;
      this.componentDidCatch(l.value, { componentStack: s !== null ? s : "" });
    });
}
function Q0(e, t, a, l, n) {
  if (
    ((a.flags |= 32768),
    l !== null && typeof l == "object" && typeof l.then == "function")
  ) {
    if (
      ((t = a.alternate),
      t !== null && en(t, a, n, !0),
      (a = mt.current),
      a !== null)
    ) {
      switch (a.tag) {
        case 31:
        case 13:
          return (
            Nt === null ? xu() : a.alternate === null && _e === 0 && (_e = 3),
            (a.flags &= -257),
            (a.flags |= 65536),
            (a.lanes = n),
            l === du
              ? (a.flags |= 16384)
              : ((t = a.updateQueue),
                t === null ? (a.updateQueue = new Set([l])) : t.add(l),
                Bc(e, l, n)),
            !1
          );
        case 22:
          return (
            (a.flags |= 65536),
            l === du
              ? (a.flags |= 16384)
              : ((t = a.updateQueue),
                t === null
                  ? ((t = {
                      transitions: null,
                      markerInstances: null,
                      retryQueue: new Set([l]),
                    }),
                    (a.updateQueue = t))
                  : ((a = t.retryQueue),
                    a === null ? (t.retryQueue = new Set([l])) : a.add(l)),
                Bc(e, l, n)),
            !1
          );
      }
      throw Error(N(435, a.tag));
    }
    return (Bc(e, l, n), xu(), !1);
  }
  if (X)
    return (
      (t = mt.current),
      t !== null
        ? (!(t.flags & 65536) && (t.flags |= 256),
          (t.flags |= 65536),
          (t.lanes = n),
          l !== ps && ((e = Error(N(422), { cause: l })), Jn(St(e, a))))
        : (l !== ps && ((t = Error(N(423), { cause: l })), Jn(St(t, a))),
          (e = e.current.alternate),
          (e.flags |= 65536),
          (n &= -n),
          (e.lanes |= n),
          (l = St(l, a)),
          (n = Cs(e.stateNode, l, n)),
          Ec(e, n),
          _e !== 4 && (_e = 2)),
      !1
    );
  var i = Error(N(520), { cause: l });
  if (
    ((i = St(i, a)),
    Yn === null ? (Yn = [i]) : Yn.push(i),
    _e !== 4 && (_e = 2),
    t === null)
  )
    return !0;
  ((l = St(l, a)), (a = t));
  do {
    switch (a.tag) {
      case 3:
        return (
          (a.flags |= 65536),
          (e = n & -n),
          (a.lanes |= e),
          (e = Cs(a.stateNode, l, e)),
          Ec(a, e),
          !1
        );
      case 1:
        if (
          ((t = a.type),
          (i = a.stateNode),
          (a.flags & 128) === 0 &&
            (typeof t.getDerivedStateFromError == "function" ||
              (i !== null &&
                typeof i.componentDidCatch == "function" &&
                (Ca === null || !Ca.has(i)))))
        )
          return (
            (a.flags |= 65536),
            (n &= -n),
            (a.lanes |= n),
            (n = t2(n)),
            a2(n, e, a, l),
            Ec(a, n),
            !1
          );
    }
    a = a.return;
  } while (a !== null);
  return !1;
}
var Hr = Error(N(461)),
  Ae = !1;
function Ue(e, t, a, l) {
  t.child = e === null ? v1(t, null, a, l) : al(t, e.child, a, l);
}
function af(e, t, a, l, n) {
  a = a.render;
  var i = t.ref;
  if ("ref" in l) {
    var u = {};
    for (var s in l) s !== "ref" && (u[s] = l[s]);
  } else u = l;
  return (
    tl(t),
    (l = Ar(e, t, a, u, i, n)),
    (s = wr()),
    e !== null && !Ae
      ? (Cr(e, t, n), ua(e, t, n))
      : (X && s && yr(t), (t.flags |= 1), Ue(e, t, l, n), t.child)
  );
}
function lf(e, t, a, l, n) {
  if (e === null) {
    var i = a.type;
    return typeof i == "function" &&
      !gr(i) &&
      i.defaultProps === void 0 &&
      a.compare === null
      ? ((t.tag = 15), (t.type = i), l2(e, t, i, l, n))
      : ((e = Xi(a.type, null, l, t, t.mode, n)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !qr(e, n))) {
    var u = i.memoizedProps;
    if (
      ((a = a.compare), (a = a !== null ? a : kn), a(u, l) && e.ref === t.ref)
    )
      return ua(e, t, n);
  }
  return (
    (t.flags |= 1),
    (e = ea(i, l)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function l2(e, t, a, l, n) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (kn(i, l) && e.ref === t.ref)
      if (((Ae = !1), (t.pendingProps = l = i), qr(e, n)))
        e.flags & 131072 && (Ae = !0);
      else return ((t.lanes = e.lanes), ua(e, t, n));
  }
  return zs(e, t, a, l, n);
}
function n2(e, t, a, l) {
  var n = l.children,
    i = e !== null ? e.memoizedState : null;
  if (
    (e === null &&
      t.stateNode === null &&
      (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
    l.mode === "hidden")
  ) {
    if (t.flags & 128) {
      if (((i = i !== null ? i.baseLanes | a : a), e !== null)) {
        for (l = t.child = e.child, n = 0; l !== null; )
          ((n = n | l.lanes | l.childLanes), (l = l.sibling));
        l = n & ~i;
      } else ((l = 0), (t.child = null));
      return nf(e, t, i, a, l);
    }
    if (a & 536870912)
      ((t.memoizedState = { baseLanes: 0, cachePool: null }),
        e !== null && Qi(t, i !== null ? i.cachePool : null),
        i !== null ? Zo(t, i) : xs(),
        _1(t));
    else
      return (
        (l = t.lanes = 536870912),
        nf(e, t, i !== null ? i.baseLanes | a : a, a, l)
      );
  } else
    i !== null
      ? (Qi(t, i.cachePool), Zo(t, i), va(), (t.memoizedState = null))
      : (e !== null && Qi(t, null), xs(), va());
  return (Ue(e, t, n, a), t.child);
}
function An(e, t) {
  return (
    (e !== null && e.tag === 22) ||
      t.stateNode !== null ||
      (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
    t.sibling
  );
}
function nf(e, t, a, l, n) {
  var i = Sr();
  return (
    (i = i === null ? null : { parent: je._currentValue, pool: i }),
    (t.memoizedState = { baseLanes: a, cachePool: i }),
    e !== null && Qi(t, null),
    xs(),
    _1(t),
    e !== null && en(e, t, l, !0),
    (t.childLanes = n),
    null
  );
}
function Ki(e, t) {
  return (
    (t = yu({ mode: t.mode, children: t.children }, e.mode)),
    (t.ref = e.ref),
    (e.child = t),
    (t.return = e),
    t
  );
}
function uf(e, t, a) {
  return (
    al(t, e.child, null, a),
    (e = Ki(t, t.pendingProps)),
    (e.flags |= 2),
    ut(t),
    (t.memoizedState = null),
    e
  );
}
function Z0(e, t, a) {
  var l = t.pendingProps,
    n = (t.flags & 128) !== 0;
  if (((t.flags &= -129), e === null)) {
    if (X) {
      if (l.mode === "hidden")
        return ((e = Ki(t, l)), (t.lanes = 536870912), An(null, e));
      if (
        (Ns(t),
        (e = fe)
          ? ((e = F2(e, xt)),
            (e = e !== null && e.data === "&" ? e : null),
            e !== null &&
              ((t.memoizedState = {
                dehydrated: e,
                treeContext: Oa !== null ? { id: Dt, overflow: Lt } : null,
                retryLane: 536870912,
                hydrationErrors: null,
              }),
              (a = r1(e)),
              (a.return = t),
              (t.child = a),
              (He = t),
              (fe = null)))
          : (e = null),
        e === null)
      )
        throw Da(t);
      return ((t.lanes = 536870912), null);
    }
    return Ki(t, l);
  }
  var i = e.memoizedState;
  if (i !== null) {
    var u = i.dehydrated;
    if ((Ns(t), n))
      if (t.flags & 256) ((t.flags &= -257), (t = uf(e, t, a)));
      else if (t.memoizedState !== null)
        ((t.child = e.child), (t.flags |= 128), (t = null));
      else throw Error(N(558));
    else if ((Ae || en(e, t, a, !1), (n = (a & e.childLanes) !== 0), Ae || n)) {
      if (
        ((l = ie), l !== null && ((u = Ld(l, a)), u !== 0 && u !== i.retryLane))
      )
        throw ((i.retryLane = u), rl(e, u), Ie(l, e, u), Hr);
      (xu(), (t = uf(e, t, a)));
    } else
      ((e = i.treeContext),
        (fe = Et(u.nextSibling)),
        (He = t),
        (X = !0),
        (ja = null),
        (xt = !1),
        e !== null && f1(t, e),
        (t = Ki(t, l)),
        (t.flags |= 4096));
    return t;
  }
  return (
    (e = ea(e.child, { mode: l.mode, children: l.children })),
    (e.ref = t.ref),
    (t.child = e),
    (e.return = t),
    e
  );
}
function Ji(e, t) {
  var a = t.ref;
  if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
  else {
    if (typeof a != "function" && typeof a != "object") throw Error(N(284));
    (e === null || e.ref !== a) && (t.flags |= 4194816);
  }
}
function zs(e, t, a, l, n) {
  return (
    tl(t),
    (a = Ar(e, t, a, l, void 0, n)),
    (l = wr()),
    e !== null && !Ae
      ? (Cr(e, t, n), ua(e, t, n))
      : (X && l && yr(t), (t.flags |= 1), Ue(e, t, a, n), t.child)
  );
}
function cf(e, t, a, l, n, i) {
  return (
    tl(t),
    (t.updateQueue = null),
    (a = S1(t, l, a, n)),
    b1(e),
    (l = wr()),
    e !== null && !Ae
      ? (Cr(e, t, i), ua(e, t, i))
      : (X && l && yr(t), (t.flags |= 1), Ue(e, t, a, i), t.child)
  );
}
function sf(e, t, a, l, n) {
  if ((tl(t), t.stateNode === null)) {
    var i = Al,
      u = a.contextType;
    (typeof u == "object" && u !== null && (i = qe(u)),
      (i = new a(l, i)),
      (t.memoizedState =
        i.state !== null && i.state !== void 0 ? i.state : null),
      (i.updater = ws),
      (t.stateNode = i),
      (i._reactInternals = t),
      (i = t.stateNode),
      (i.props = l),
      (i.state = t.memoizedState),
      (i.refs = {}),
      Nr(t),
      (u = a.contextType),
      (i.context = typeof u == "object" && u !== null ? qe(u) : Al),
      (i.state = t.memoizedState),
      (u = a.getDerivedStateFromProps),
      typeof u == "function" && (Ac(t, a, u, l), (i.state = t.memoizedState)),
      typeof a.getDerivedStateFromProps == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function" ||
        (typeof i.UNSAFE_componentWillMount != "function" &&
          typeof i.componentWillMount != "function") ||
        ((u = i.state),
        typeof i.componentWillMount == "function" && i.componentWillMount(),
        typeof i.UNSAFE_componentWillMount == "function" &&
          i.UNSAFE_componentWillMount(),
        u !== i.state && ws.enqueueReplaceState(i, i.state, null),
        Un(t, l, i, n),
        Ln(),
        (i.state = t.memoizedState)),
      typeof i.componentDidMount == "function" && (t.flags |= 4194308),
      (l = !0));
  } else if (e === null) {
    i = t.stateNode;
    var s = t.memoizedProps,
      r = nl(a, s);
    i.props = r;
    var o = i.context,
      f = a.contextType;
    ((u = Al), typeof f == "object" && f !== null && (u = qe(f)));
    var p = a.getDerivedStateFromProps;
    ((f =
      typeof p == "function" || typeof i.getSnapshotBeforeUpdate == "function"),
      (s = t.pendingProps !== s),
      f ||
        (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
          typeof i.componentWillReceiveProps != "function") ||
        ((s || o !== u) && ef(t, i, l, u)),
      (ha = !1));
    var h = t.memoizedState;
    ((i.state = h),
      Un(t, l, i, n),
      Ln(),
      (o = t.memoizedState),
      s || h !== o || ha
        ? (typeof p == "function" && (Ac(t, a, p, l), (o = t.memoizedState)),
          (r = ha || Io(t, a, r, l, h, o, u))
            ? (f ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = l),
              (t.memoizedState = o)),
          (i.props = l),
          (i.state = o),
          (i.context = u),
          (l = r))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (l = !1)));
  } else {
    ((i = t.stateNode),
      bs(e, t),
      (u = t.memoizedProps),
      (f = nl(a, u)),
      (i.props = f),
      (p = t.pendingProps),
      (h = i.context),
      (o = a.contextType),
      (r = Al),
      typeof o == "object" && o !== null && (r = qe(o)),
      (s = a.getDerivedStateFromProps),
      (o =
        typeof s == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function") ||
        (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
          typeof i.componentWillReceiveProps != "function") ||
        ((u !== p || h !== r) && ef(t, i, l, r)),
      (ha = !1),
      (h = t.memoizedState),
      (i.state = h),
      Un(t, l, i, n),
      Ln());
    var v = t.memoizedState;
    u !== p ||
    h !== v ||
    ha ||
    (e !== null && e.dependencies !== null && fu(e.dependencies))
      ? (typeof s == "function" && (Ac(t, a, s, l), (v = t.memoizedState)),
        (f =
          ha ||
          Io(t, a, f, l, h, v, r) ||
          (e !== null && e.dependencies !== null && fu(e.dependencies)))
          ? (o ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(l, v, r),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(l, v, r)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (u === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (u === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = l),
            (t.memoizedState = v)),
        (i.props = l),
        (i.state = v),
        (i.context = r),
        (l = f))
      : (typeof i.componentDidUpdate != "function" ||
          (u === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (u === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (l = !1));
  }
  return (
    (i = l),
    Ji(e, t),
    (l = (t.flags & 128) !== 0),
    i || l
      ? ((i = t.stateNode),
        (a =
          l && typeof a.getDerivedStateFromError != "function"
            ? null
            : i.render()),
        (t.flags |= 1),
        e !== null && l
          ? ((t.child = al(t, e.child, null, n)), (t.child = al(t, null, a, n)))
          : Ue(e, t, a, n),
        (t.memoizedState = i.state),
        (e = t.child))
      : (e = ua(e, t, n)),
    e
  );
}
function rf(e, t, a, l) {
  return (el(), (t.flags |= 256), Ue(e, t, a, l), t.child);
}
var wc = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null,
};
function Cc(e) {
  return { baseLanes: e, cachePool: h1() };
}
function zc(e, t, a) {
  return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= st), e);
}
function i2(e, t, a) {
  var l = t.pendingProps,
    n = !1,
    i = (t.flags & 128) !== 0,
    u;
  if (
    ((u = i) ||
      (u =
        e !== null && e.memoizedState === null ? !1 : (Se.current & 2) !== 0),
    u && ((n = !0), (t.flags &= -129)),
    (u = (t.flags & 32) !== 0),
    (t.flags &= -33),
    e === null)
  ) {
    if (X) {
      if (
        (n ? pa(t) : va(),
        (e = fe)
          ? ((e = F2(e, xt)),
            (e = e !== null && e.data !== "&" ? e : null),
            e !== null &&
              ((t.memoizedState = {
                dehydrated: e,
                treeContext: Oa !== null ? { id: Dt, overflow: Lt } : null,
                retryLane: 536870912,
                hydrationErrors: null,
              }),
              (a = r1(e)),
              (a.return = t),
              (t.child = a),
              (He = t),
              (fe = null)))
          : (e = null),
        e === null)
      )
        throw Da(t);
      return (Gs(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
    }
    var s = l.children;
    return (
      (l = l.fallback),
      n
        ? (va(),
          (n = t.mode),
          (s = yu({ mode: "hidden", children: s }, n)),
          (l = Fa(l, n, a, null)),
          (s.return = t),
          (l.return = t),
          (s.sibling = l),
          (t.child = s),
          (l = t.child),
          (l.memoizedState = Cc(a)),
          (l.childLanes = zc(e, u, a)),
          (t.memoizedState = wc),
          An(null, l))
        : (pa(t), Ts(t, s))
    );
  }
  var r = e.memoizedState;
  if (r !== null && ((s = r.dehydrated), s !== null)) {
    if (i)
      t.flags & 256
        ? (pa(t), (t.flags &= -257), (t = Tc(e, t, a)))
        : t.memoizedState !== null
          ? (va(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (va(),
            (s = l.fallback),
            (n = t.mode),
            (l = yu({ mode: "visible", children: l.children }, n)),
            (s = Fa(s, n, a, null)),
            (s.flags |= 2),
            (l.return = t),
            (s.return = t),
            (l.sibling = s),
            (t.child = l),
            al(t, e.child, null, a),
            (l = t.child),
            (l.memoizedState = Cc(a)),
            (l.childLanes = zc(e, u, a)),
            (t.memoizedState = wc),
            (t = An(null, l)));
    else if ((pa(t), Gs(s))) {
      if (((u = s.nextSibling && s.nextSibling.dataset), u)) var o = u.dgst;
      ((u = o),
        (l = Error(N(419))),
        (l.stack = ""),
        (l.digest = u),
        Jn({ value: l, source: null, stack: null }),
        (t = Tc(e, t, a)));
    } else if (
      (Ae || en(e, t, a, !1), (u = (a & e.childLanes) !== 0), Ae || u)
    ) {
      if (
        ((u = ie), u !== null && ((l = Ld(u, a)), l !== 0 && l !== r.retryLane))
      )
        throw ((r.retryLane = l), rl(e, l), Ie(u, e, l), Hr);
      ($s(s) || xu(), (t = Tc(e, t, a)));
    } else
      $s(s)
        ? ((t.flags |= 192), (t.child = e.child), (t = null))
        : ((e = r.treeContext),
          (fe = Et(s.nextSibling)),
          (He = t),
          (X = !0),
          (ja = null),
          (xt = !1),
          e !== null && f1(t, e),
          (t = Ts(t, l.children)),
          (t.flags |= 4096));
    return t;
  }
  return n
    ? (va(),
      (s = l.fallback),
      (n = t.mode),
      (r = e.child),
      (o = r.sibling),
      (l = ea(r, { mode: "hidden", children: l.children })),
      (l.subtreeFlags = r.subtreeFlags & 65011712),
      o !== null ? (s = ea(o, s)) : ((s = Fa(s, n, a, null)), (s.flags |= 2)),
      (s.return = t),
      (l.return = t),
      (l.sibling = s),
      (t.child = l),
      An(null, l),
      (l = t.child),
      (s = e.child.memoizedState),
      s === null
        ? (s = Cc(a))
        : ((n = s.cachePool),
          n !== null
            ? ((r = je._currentValue),
              (n = n.parent !== r ? { parent: r, pool: r } : n))
            : (n = h1()),
          (s = { baseLanes: s.baseLanes | a, cachePool: n })),
      (l.memoizedState = s),
      (l.childLanes = zc(e, u, a)),
      (t.memoizedState = wc),
      An(e.child, l))
    : (pa(t),
      (a = e.child),
      (e = a.sibling),
      (a = ea(a, { mode: "visible", children: l.children })),
      (a.return = t),
      (a.sibling = null),
      e !== null &&
        ((u = t.deletions),
        u === null ? ((t.deletions = [e]), (t.flags |= 16)) : u.push(e)),
      (t.child = a),
      (t.memoizedState = null),
      a);
}
function Ts(e, t) {
  return (
    (t = yu({ mode: "visible", children: t }, e.mode)),
    (t.return = e),
    (e.child = t)
  );
}
function yu(e, t) {
  return ((e = ct(22, e, null, t)), (e.lanes = 0), e);
}
function Tc(e, t, a) {
  return (
    al(t, e.child, null, a),
    (e = Ts(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function of(e, t, a) {
  e.lanes |= t;
  var l = e.alternate;
  (l !== null && (l.lanes |= t), gs(e.return, t, a));
}
function Mc(e, t, a, l, n, i) {
  var u = e.memoizedState;
  u === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: l,
        tail: a,
        tailMode: n,
        treeForkCount: i,
      })
    : ((u.isBackwards = t),
      (u.rendering = null),
      (u.renderingStartTime = 0),
      (u.last = l),
      (u.tail = a),
      (u.tailMode = n),
      (u.treeForkCount = i));
}
function u2(e, t, a) {
  var l = t.pendingProps,
    n = l.revealOrder,
    i = l.tail;
  l = l.children;
  var u = Se.current,
    s = (u & 2) !== 0;
  if (
    (s ? ((u = (u & 1) | 2), (t.flags |= 128)) : (u &= 1),
    ce(Se, u),
    Ue(e, t, l, a),
    (l = X ? Kn : 0),
    !s && e !== null && e.flags & 128)
  )
    e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && of(e, a, t);
      else if (e.tag === 19) of(e, a, t);
      else if (e.child !== null) {
        ((e.child.return = e), (e = e.child));
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
  switch (n) {
    case "forwards":
      for (a = t.child, n = null; a !== null; )
        ((e = a.alternate),
          e !== null && mu(e) === null && (n = a),
          (a = a.sibling));
      ((a = n),
        a === null
          ? ((n = t.child), (t.child = null))
          : ((n = a.sibling), (a.sibling = null)),
        Mc(t, !1, n, a, i, l));
      break;
    case "backwards":
    case "unstable_legacy-backwards":
      for (a = null, n = t.child, t.child = null; n !== null; ) {
        if (((e = n.alternate), e !== null && mu(e) === null)) {
          t.child = n;
          break;
        }
        ((e = n.sibling), (n.sibling = a), (a = n), (n = e));
      }
      Mc(t, !0, a, null, i, l);
      break;
    case "together":
      Mc(t, !1, null, null, void 0, l);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function ua(e, t, a) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Ua |= t.lanes),
    !(a & t.childLanes))
  )
    if (e !== null) {
      if ((en(e, t, a, !1), (a & t.childLanes) === 0)) return null;
    } else return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (
      e = t.child, a = ea(e, e.pendingProps), t.child = a, a.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (a = a.sibling = ea(e, e.pendingProps)),
        (a.return = t));
    a.sibling = null;
  }
  return t.child;
}
function qr(e, t) {
  return e.lanes & t ? !0 : ((e = e.dependencies), !!(e !== null && fu(e)));
}
function k0(e, t, a) {
  switch (t.tag) {
    case 3:
      (nu(t, t.stateNode.containerInfo),
        ma(t, je, e.memoizedState.cache),
        el());
      break;
    case 27:
    case 5:
      ns(t);
      break;
    case 4:
      nu(t, t.stateNode.containerInfo);
      break;
    case 10:
      ma(t, t.type, t.memoizedProps.value);
      break;
    case 31:
      if (t.memoizedState !== null) return ((t.flags |= 128), Ns(t), null);
      break;
    case 13:
      var l = t.memoizedState;
      if (l !== null)
        return l.dehydrated !== null
          ? (pa(t), (t.flags |= 128), null)
          : a & t.child.childLanes
            ? i2(e, t, a)
            : (pa(t), (e = ua(e, t, a)), e !== null ? e.sibling : null);
      pa(t);
      break;
    case 19:
      var n = (e.flags & 128) !== 0;
      if (
        ((l = (a & t.childLanes) !== 0),
        l || (en(e, t, a, !1), (l = (a & t.childLanes) !== 0)),
        n)
      ) {
        if (l) return u2(e, t, a);
        t.flags |= 128;
      }
      if (
        ((n = t.memoizedState),
        n !== null &&
          ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
        ce(Se, Se.current),
        l)
      )
        break;
      return null;
    case 22:
      return ((t.lanes = 0), n2(e, t, a, t.pendingProps));
    case 24:
      ma(t, je, e.memoizedState.cache);
  }
  return ua(e, t, a);
}
function c2(e, t, a) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps) Ae = !0;
    else {
      if (!qr(e, a) && !(t.flags & 128)) return ((Ae = !1), k0(e, t, a));
      Ae = !!(e.flags & 131072);
    }
  else ((Ae = !1), X && t.flags & 1048576 && o1(t, Kn, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 16:
      e: {
        var l = t.pendingProps;
        if (((e = ka(t.elementType)), (t.type = e), typeof e == "function"))
          gr(e)
            ? ((l = nl(e, l)), (t.tag = 1), (t = sf(null, t, e, l, a)))
            : ((t.tag = 0), (t = zs(null, t, e, l, a)));
        else {
          if (e != null) {
            var n = e.$$typeof;
            if (n === lr) {
              ((t.tag = 11), (t = af(null, t, e, l, a)));
              break e;
            } else if (n === nr) {
              ((t.tag = 14), (t = lf(null, t, e, l, a)));
              break e;
            }
          }
          throw ((t = as(e) || e), Error(N(306, t, "")));
        }
      }
      return t;
    case 0:
      return zs(e, t, t.type, t.pendingProps, a);
    case 1:
      return ((l = t.type), (n = nl(l, t.pendingProps)), sf(e, t, l, n, a));
    case 3:
      e: {
        if ((nu(t, t.stateNode.containerInfo), e === null)) throw Error(N(387));
        l = t.pendingProps;
        var i = t.memoizedState;
        ((n = i.element), bs(e, t), Un(t, l, null, a));
        var u = t.memoizedState;
        if (
          ((l = u.cache),
          ma(t, je, l),
          l !== i.cache && ys(t, [je], a, !0),
          Ln(),
          (l = u.element),
          i.isDehydrated)
        )
          if (
            ((i = { element: l, isDehydrated: !1, cache: u.cache }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            t = rf(e, t, l, a);
            break e;
          } else if (l !== n) {
            ((n = St(Error(N(424)), t)), Jn(n), (t = rf(e, t, l, a)));
            break e;
          } else {
            switch (((e = t.stateNode.containerInfo), e.nodeType)) {
              case 9:
                e = e.body;
                break;
              default:
                e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
            }
            for (
              fe = Et(e.firstChild),
                He = t,
                X = !0,
                ja = null,
                xt = !0,
                a = v1(t, null, l, a),
                t.child = a;
              a;
            )
              ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
          }
        else {
          if ((el(), l === n)) {
            t = ua(e, t, a);
            break e;
          }
          Ue(e, t, l, a);
        }
        t = t.child;
      }
      return t;
    case 26:
      return (
        Ji(e, t),
        e === null
          ? (a = Tf(t.type, null, t.pendingProps, null))
            ? (t.memoizedState = a)
            : X ||
              ((a = t.type),
              (e = t.pendingProps),
              (l = Au(Ea.current).createElement(a)),
              (l[Be] = t),
              (l[et] = e),
              Ye(l, a, e),
              Oe(l),
              (t.stateNode = l))
          : (t.memoizedState = Tf(
              t.type,
              e.memoizedProps,
              t.pendingProps,
              e.memoizedState,
            )),
        null
      );
    case 27:
      return (
        ns(t),
        e === null &&
          X &&
          ((l = t.stateNode = W2(t.type, t.pendingProps, Ea.current)),
          (He = t),
          (xt = !0),
          (n = fe),
          Ya(t.type) ? ((Xs = n), (fe = Et(l.firstChild))) : (fe = n)),
        Ue(e, t, t.pendingProps.children, a),
        Ji(e, t),
        e === null && (t.flags |= 4194304),
        t.child
      );
    case 5:
      return (
        e === null &&
          X &&
          ((n = l = fe) &&
            ((l = N4(l, t.type, t.pendingProps, xt)),
            l !== null
              ? ((t.stateNode = l),
                (He = t),
                (fe = Et(l.firstChild)),
                (xt = !1),
                (n = !0))
              : (n = !1)),
          n || Da(t)),
        ns(t),
        (n = t.type),
        (i = t.pendingProps),
        (u = e !== null ? e.memoizedProps : null),
        (l = i.children),
        Ys(n, i) ? (l = null) : u !== null && Ys(n, u) && (t.flags |= 32),
        t.memoizedState !== null &&
          ((n = Ar(e, t, H0, null, null, a)), (ti._currentValue = n)),
        Ji(e, t),
        Ue(e, t, l, a),
        t.child
      );
    case 6:
      return (
        e === null &&
          X &&
          ((e = a = fe) &&
            ((a = E4(a, t.pendingProps, xt)),
            a !== null
              ? ((t.stateNode = a), (He = t), (fe = null), (e = !0))
              : (e = !1)),
          e || Da(t)),
        null
      );
    case 13:
      return i2(e, t, a);
    case 4:
      return (
        nu(t, t.stateNode.containerInfo),
        (l = t.pendingProps),
        e === null ? (t.child = al(t, null, l, a)) : Ue(e, t, l, a),
        t.child
      );
    case 11:
      return af(e, t, t.type, t.pendingProps, a);
    case 7:
      return (Ue(e, t, t.pendingProps, a), t.child);
    case 8:
      return (Ue(e, t, t.pendingProps.children, a), t.child);
    case 12:
      return (Ue(e, t, t.pendingProps.children, a), t.child);
    case 10:
      return (
        (l = t.pendingProps),
        ma(t, t.type, l.value),
        Ue(e, t, l.children, a),
        t.child
      );
    case 9:
      return (
        (n = t.type._context),
        (l = t.pendingProps.children),
        tl(t),
        (n = qe(n)),
        (l = l(n)),
        (t.flags |= 1),
        Ue(e, t, l, a),
        t.child
      );
    case 14:
      return lf(e, t, t.type, t.pendingProps, a);
    case 15:
      return l2(e, t, t.type, t.pendingProps, a);
    case 19:
      return u2(e, t, a);
    case 31:
      return Z0(e, t, a);
    case 22:
      return n2(e, t, a, t.pendingProps);
    case 24:
      return (
        tl(t),
        (l = qe(je)),
        e === null
          ? ((n = Sr()),
            n === null &&
              ((n = ie),
              (i = br()),
              (n.pooledCache = i),
              i.refCount++,
              i !== null && (n.pooledCacheLanes |= a),
              (n = i)),
            (t.memoizedState = { parent: l, cache: n }),
            Nr(t),
            ma(t, je, n))
          : (e.lanes & a && (bs(e, t), Un(t, null, null, a), Ln()),
            (n = e.memoizedState),
            (i = t.memoizedState),
            n.parent !== l
              ? ((n = { parent: l, cache: l }),
                (t.memoizedState = n),
                t.lanes === 0 &&
                  (t.memoizedState = t.updateQueue.baseState = n),
                ma(t, je, l))
              : ((l = i.cache),
                ma(t, je, l),
                l !== n.cache && ys(t, [je], a, !0))),
        Ue(e, t, t.pendingProps.children, a),
        t.child
      );
    case 29:
      throw t.pendingProps;
  }
  throw Error(N(156, t.tag));
}
function Gt(e) {
  e.flags |= 4;
}
function Rc(e, t, a, l, n) {
  if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
    if (((e.flags |= 16777216), (n & 335544128) === n))
      if (e.stateNode.complete) e.flags |= 8192;
      else if (M2()) e.flags |= 8192;
      else throw ((Pa = du), xr);
  } else e.flags &= -16777217;
}
function ff(e, t) {
  if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
  else if (((e.flags |= 16777216), !eh(t)))
    if (M2()) e.flags |= 8192;
    else throw ((Pa = du), xr);
}
function Ti(e, t) {
  (t !== null && (e.flags |= 4),
    e.flags & 16384 &&
      ((t = e.tag !== 22 ? Rd() : 536870912), (e.lanes |= t), (Gl |= t)));
}
function mn(e, t) {
  if (!X)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var a = null; t !== null; )
          (t.alternate !== null && (a = t), (t = t.sibling));
        a === null ? (e.tail = null) : (a.sibling = null);
        break;
      case "collapsed":
        a = e.tail;
        for (var l = null; a !== null; )
          (a.alternate !== null && (l = a), (a = a.sibling));
        l === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (l.sibling = null);
    }
}
function re(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    a = 0,
    l = 0;
  if (t)
    for (var n = e.child; n !== null; )
      ((a |= n.lanes | n.childLanes),
        (l |= n.subtreeFlags & 65011712),
        (l |= n.flags & 65011712),
        (n.return = e),
        (n = n.sibling));
  else
    for (n = e.child; n !== null; )
      ((a |= n.lanes | n.childLanes),
        (l |= n.subtreeFlags),
        (l |= n.flags),
        (n.return = e),
        (n = n.sibling));
  return ((e.subtreeFlags |= l), (e.childLanes = a), t);
}
function K0(e, t, a) {
  var l = t.pendingProps;
  switch ((_r(t), t.tag)) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (re(t), null);
    case 1:
      return (re(t), null);
    case 3:
      return (
        (a = t.stateNode),
        (l = null),
        e !== null && (l = e.memoizedState.cache),
        t.memoizedState.cache !== l && (t.flags |= 2048),
        ta(je),
        Bl(),
        a.pendingContext &&
          ((a.context = a.pendingContext), (a.pendingContext = null)),
        (e === null || e.child === null) &&
          (dl(t)
            ? Gt(t)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Nc())),
        re(t),
        null
      );
    case 26:
      var n = t.type,
        i = t.memoizedState;
      return (
        e === null
          ? (Gt(t),
            i !== null ? (re(t), ff(t, i)) : (re(t), Rc(t, n, null, l, a)))
          : i
            ? i !== e.memoizedState
              ? (Gt(t), re(t), ff(t, i))
              : (re(t), (t.flags &= -16777217))
            : ((e = e.memoizedProps),
              e !== l && Gt(t),
              re(t),
              Rc(t, n, e, l, a)),
        null
      );
    case 27:
      if (
        (iu(t),
        (a = Ea.current),
        (n = t.type),
        e !== null && t.stateNode != null)
      )
        e.memoizedProps !== l && Gt(t);
      else {
        if (!l) {
          if (t.stateNode === null) throw Error(N(166));
          return (re(t), null);
        }
        ((e = Bt.current),
          dl(t) ? qo(t) : ((e = W2(n, l, a)), (t.stateNode = e), Gt(t)));
      }
      return (re(t), null);
    case 5:
      if ((iu(t), (n = t.type), e !== null && t.stateNode != null))
        e.memoizedProps !== l && Gt(t);
      else {
        if (!l) {
          if (t.stateNode === null) throw Error(N(166));
          return (re(t), null);
        }
        if (((i = Bt.current), dl(t))) qo(t);
        else {
          var u = Au(Ea.current);
          switch (i) {
            case 1:
              i = u.createElementNS("http://www.w3.org/2000/svg", n);
              break;
            case 2:
              i = u.createElementNS("http://www.w3.org/1998/Math/MathML", n);
              break;
            default:
              switch (n) {
                case "svg":
                  i = u.createElementNS("http://www.w3.org/2000/svg", n);
                  break;
                case "math":
                  i = u.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    n,
                  );
                  break;
                case "script":
                  ((i = u.createElement("div")),
                    (i.innerHTML = "<script><\/script>"),
                    (i = i.removeChild(i.firstChild)));
                  break;
                case "select":
                  ((i =
                    typeof l.is == "string"
                      ? u.createElement("select", { is: l.is })
                      : u.createElement("select")),
                    l.multiple
                      ? (i.multiple = !0)
                      : l.size && (i.size = l.size));
                  break;
                default:
                  i =
                    typeof l.is == "string"
                      ? u.createElement(n, { is: l.is })
                      : u.createElement(n);
              }
          }
          ((i[Be] = t), (i[et] = l));
          e: for (u = t.child; u !== null; ) {
            if (u.tag === 5 || u.tag === 6) i.appendChild(u.stateNode);
            else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
              ((u.child.return = u), (u = u.child));
              continue;
            }
            if (u === t) break e;
            for (; u.sibling === null; ) {
              if (u.return === null || u.return === t) break e;
              u = u.return;
            }
            ((u.sibling.return = u.return), (u = u.sibling));
          }
          t.stateNode = i;
          e: switch ((Ye(i, n, l), n)) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              l = !!l.autoFocus;
              break e;
            case "img":
              l = !0;
              break e;
            default:
              l = !1;
          }
          l && Gt(t);
        }
      }
      return (
        re(t),
        Rc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a),
        null
      );
    case 6:
      if (e && t.stateNode != null) e.memoizedProps !== l && Gt(t);
      else {
        if (typeof l != "string" && t.stateNode === null) throw Error(N(166));
        if (((e = Ea.current), dl(t))) {
          if (
            ((e = t.stateNode),
            (a = t.memoizedProps),
            (l = null),
            (n = He),
            n !== null)
          )
            switch (n.tag) {
              case 27:
              case 5:
                l = n.memoizedProps;
            }
          ((e[Be] = t),
            (e = !!(
              e.nodeValue === a ||
              (l !== null && l.suppressHydrationWarning === !0) ||
              k2(e.nodeValue, a)
            )),
            e || Da(t, !0));
        } else ((e = Au(e).createTextNode(l)), (e[Be] = t), (t.stateNode = e));
      }
      return (re(t), null);
    case 31:
      if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
        if (((l = dl(t)), a !== null)) {
          if (e === null) {
            if (!l) throw Error(N(318));
            if (
              ((e = t.memoizedState),
              (e = e !== null ? e.dehydrated : null),
              !e)
            )
              throw Error(N(557));
            e[Be] = t;
          } else
            (el(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (re(t), (e = !1));
        } else
          ((a = Nc()),
            e !== null &&
              e.memoizedState !== null &&
              (e.memoizedState.hydrationErrors = a),
            (e = !0));
        if (!e) return t.flags & 256 ? (ut(t), t) : (ut(t), null);
        if (t.flags & 128) throw Error(N(558));
      }
      return (re(t), null);
    case 13:
      if (
        ((l = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (((n = dl(t)), l !== null && l.dehydrated !== null)) {
          if (e === null) {
            if (!n) throw Error(N(318));
            if (
              ((n = t.memoizedState),
              (n = n !== null ? n.dehydrated : null),
              !n)
            )
              throw Error(N(317));
            n[Be] = t;
          } else
            (el(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (re(t), (n = !1));
        } else
          ((n = Nc()),
            e !== null &&
              e.memoizedState !== null &&
              (e.memoizedState.hydrationErrors = n),
            (n = !0));
        if (!n) return t.flags & 256 ? (ut(t), t) : (ut(t), null);
      }
      return (
        ut(t),
        t.flags & 128
          ? ((t.lanes = a), t)
          : ((a = l !== null),
            (e = e !== null && e.memoizedState !== null),
            a &&
              ((l = t.child),
              (n = null),
              l.alternate !== null &&
                l.alternate.memoizedState !== null &&
                l.alternate.memoizedState.cachePool !== null &&
                (n = l.alternate.memoizedState.cachePool.pool),
              (i = null),
              l.memoizedState !== null &&
                l.memoizedState.cachePool !== null &&
                (i = l.memoizedState.cachePool.pool),
              i !== n && (l.flags |= 2048)),
            a !== e && a && (t.child.flags |= 8192),
            Ti(t, t.updateQueue),
            re(t),
            null)
      );
    case 4:
      return (Bl(), e === null && Zr(t.stateNode.containerInfo), re(t), null);
    case 10:
      return (ta(t.type), re(t), null);
    case 19:
      if ((De(Se), (l = t.memoizedState), l === null)) return (re(t), null);
      if (((n = (t.flags & 128) !== 0), (i = l.rendering), i === null))
        if (n) mn(l, !1);
        else {
          if (_e !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = mu(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    mn(l, !1),
                    e = i.updateQueue,
                    t.updateQueue = e,
                    Ti(t, e),
                    t.subtreeFlags = 0,
                    e = a,
                    a = t.child;
                  a !== null;
                )
                  (s1(a, e), (a = a.sibling));
                return (
                  ce(Se, (Se.current & 1) | 2),
                  X && Jt(t, l.treeForkCount),
                  t.child
                );
              }
              e = e.sibling;
            }
          l.tail !== null &&
            rt() > bu &&
            ((t.flags |= 128), (n = !0), mn(l, !1), (t.lanes = 4194304));
        }
      else {
        if (!n)
          if (((e = mu(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (n = !0),
              (e = e.updateQueue),
              (t.updateQueue = e),
              Ti(t, e),
              mn(l, !0),
              l.tail === null && l.tailMode === "hidden" && !i.alternate && !X)
            )
              return (re(t), null);
          } else
            2 * rt() - l.renderingStartTime > bu &&
              a !== 536870912 &&
              ((t.flags |= 128), (n = !0), mn(l, !1), (t.lanes = 4194304));
        l.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((e = l.last),
            e !== null ? (e.sibling = i) : (t.child = i),
            (l.last = i));
      }
      return l.tail !== null
        ? ((e = l.tail),
          (l.rendering = e),
          (l.tail = e.sibling),
          (l.renderingStartTime = rt()),
          (e.sibling = null),
          (a = Se.current),
          ce(Se, n ? (a & 1) | 2 : a & 1),
          X && Jt(t, l.treeForkCount),
          e)
        : (re(t), null);
    case 22:
    case 23:
      return (
        ut(t),
        Er(),
        (l = t.memoizedState !== null),
        e !== null
          ? (e.memoizedState !== null) !== l && (t.flags |= 8192)
          : l && (t.flags |= 8192),
        l
          ? a & 536870912 &&
            !(t.flags & 128) &&
            (re(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : re(t),
        (a = t.updateQueue),
        a !== null && Ti(t, a.retryQueue),
        (a = null),
        e !== null &&
          e.memoizedState !== null &&
          e.memoizedState.cachePool !== null &&
          (a = e.memoizedState.cachePool.pool),
        (l = null),
        t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (l = t.memoizedState.cachePool.pool),
        l !== a && (t.flags |= 2048),
        e !== null && De(Wa),
        null
      );
    case 24:
      return (
        (a = null),
        e !== null && (a = e.memoizedState.cache),
        t.memoizedState.cache !== a && (t.flags |= 2048),
        ta(je),
        re(t),
        null
      );
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(N(156, t.tag));
}
function J0(e, t) {
  switch ((_r(t), t.tag)) {
    case 1:
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        ta(je),
        Bl(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 26:
    case 27:
    case 5:
      return (iu(t), null);
    case 31:
      if (t.memoizedState !== null) {
        if ((ut(t), t.alternate === null)) throw Error(N(340));
        el();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 13:
      if ((ut(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(N(340));
        el();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (De(Se), null);
    case 4:
      return (Bl(), null);
    case 10:
      return (ta(t.type), null);
    case 22:
    case 23:
      return (
        ut(t),
        Er(),
        e !== null && De(Wa),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 24:
      return (ta(je), null);
    case 25:
      return null;
    default:
      return null;
  }
}
function s2(e, t) {
  switch ((_r(t), t.tag)) {
    case 3:
      (ta(je), Bl());
      break;
    case 26:
    case 27:
    case 5:
      iu(t);
      break;
    case 4:
      Bl();
      break;
    case 31:
      t.memoizedState !== null && ut(t);
      break;
    case 13:
      ut(t);
      break;
    case 19:
      De(Se);
      break;
    case 10:
      ta(t.type);
      break;
    case 22:
    case 23:
      (ut(t), Er(), e !== null && De(Wa));
      break;
    case 24:
      ta(je);
  }
}
function hi(e, t) {
  try {
    var a = t.updateQueue,
      l = a !== null ? a.lastEffect : null;
    if (l !== null) {
      var n = l.next;
      a = n;
      do {
        if ((a.tag & e) === e) {
          l = void 0;
          var i = a.create,
            u = a.inst;
          ((l = i()), (u.destroy = l));
        }
        a = a.next;
      } while (a !== n);
    }
  } catch (s) {
    W(t, t.return, s);
  }
}
function La(e, t, a) {
  try {
    var l = t.updateQueue,
      n = l !== null ? l.lastEffect : null;
    if (n !== null) {
      var i = n.next;
      l = i;
      do {
        if ((l.tag & e) === e) {
          var u = l.inst,
            s = u.destroy;
          if (s !== void 0) {
            ((u.destroy = void 0), (n = t));
            var r = a,
              o = s;
            try {
              o();
            } catch (f) {
              W(n, r, f);
            }
          }
        }
        l = l.next;
      } while (l !== i);
    }
  } catch (f) {
    W(t, t.return, f);
  }
}
function r2(e) {
  var t = e.updateQueue;
  if (t !== null) {
    var a = e.stateNode;
    try {
      y1(t, a);
    } catch (l) {
      W(e, e.return, l);
    }
  }
}
function o2(e, t, a) {
  ((a.props = nl(e.type, e.memoizedProps)), (a.state = e.memoizedState));
  try {
    a.componentWillUnmount();
  } catch (l) {
    W(e, t, l);
  }
}
function Hn(e, t) {
  try {
    var a = e.ref;
    if (a !== null) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          var l = e.stateNode;
          break;
        case 30:
          l = e.stateNode;
          break;
        default:
          l = e.stateNode;
      }
      typeof a == "function" ? (e.refCleanup = a(l)) : (a.current = l);
    }
  } catch (n) {
    W(e, t, n);
  }
}
function Ut(e, t) {
  var a = e.ref,
    l = e.refCleanup;
  if (a !== null)
    if (typeof l == "function")
      try {
        l();
      } catch (n) {
        W(e, t, n);
      } finally {
        ((e.refCleanup = null),
          (e = e.alternate),
          e != null && (e.refCleanup = null));
      }
    else if (typeof a == "function")
      try {
        a(null);
      } catch (n) {
        W(e, t, n);
      }
    else a.current = null;
}
function f2(e) {
  var t = e.type,
    a = e.memoizedProps,
    l = e.stateNode;
  try {
    e: switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        a.autoFocus && l.focus();
        break e;
      case "img":
        a.src ? (l.src = a.src) : a.srcSet && (l.srcset = a.srcSet);
    }
  } catch (n) {
    W(e, e.return, n);
  }
}
function Oc(e, t, a) {
  try {
    var l = e.stateNode;
    (g4(l, e.type, a, t), (l[et] = t));
  } catch (n) {
    W(e, e.return, n);
  }
}
function d2(e) {
  return (
    e.tag === 5 ||
    e.tag === 3 ||
    e.tag === 26 ||
    (e.tag === 27 && Ya(e.type)) ||
    e.tag === 4
  );
}
function Dc(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || d2(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
    ) {
      if (
        (e.tag === 27 && Ya(e.type)) ||
        e.flags & 2 ||
        e.child === null ||
        e.tag === 4
      )
        continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ms(e, t, a) {
  var l = e.tag;
  if (l === 5 || l === 6)
    ((e = e.stateNode),
      t
        ? (a.nodeType === 9
            ? a.body
            : a.nodeName === "HTML"
              ? a.ownerDocument.body
              : a
          ).insertBefore(e, t)
        : ((t =
            a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a),
          t.appendChild(e),
          (a = a._reactRootContainer),
          a != null || t.onclick !== null || (t.onclick = Pt)));
  else if (
    l !== 4 &&
    (l === 27 && Ya(e.type) && ((a = e.stateNode), (t = null)),
    (e = e.child),
    e !== null)
  )
    for (Ms(e, t, a), e = e.sibling; e !== null; )
      (Ms(e, t, a), (e = e.sibling));
}
function _u(e, t, a) {
  var l = e.tag;
  if (l === 5 || l === 6)
    ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
  else if (
    l !== 4 &&
    (l === 27 && Ya(e.type) && (a = e.stateNode), (e = e.child), e !== null)
  )
    for (_u(e, t, a), e = e.sibling; e !== null; )
      (_u(e, t, a), (e = e.sibling));
}
function h2(e) {
  var t = e.stateNode,
    a = e.memoizedProps;
  try {
    for (var l = e.type, n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    (Ye(t, l, a), (t[Be] = e), (t[et] = a));
  } catch (i) {
    W(e, e.return, i);
  }
}
var Ft = !1,
  Ee = !1,
  Lc = !1,
  df = typeof WeakSet == "function" ? WeakSet : Set,
  Re = null;
function F0(e, t) {
  if (((e = e.containerInfo), (Hs = Tu), (e = e1(e)), mr(e))) {
    if ("selectionStart" in e)
      var a = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        a = ((a = e.ownerDocument) && a.defaultView) || window;
        var l = a.getSelection && a.getSelection();
        if (l && l.rangeCount !== 0) {
          a = l.anchorNode;
          var n = l.anchorOffset,
            i = l.focusNode;
          l = l.focusOffset;
          try {
            (a.nodeType, i.nodeType);
          } catch {
            a = null;
            break e;
          }
          var u = 0,
            s = -1,
            r = -1,
            o = 0,
            f = 0,
            p = e,
            h = null;
          t: for (;;) {
            for (
              var v;
              p !== a || (n !== 0 && p.nodeType !== 3) || (s = u + n),
                p !== i || (l !== 0 && p.nodeType !== 3) || (r = u + l),
                p.nodeType === 3 && (u += p.nodeValue.length),
                (v = p.firstChild) !== null;
            )
              ((h = p), (p = v));
            for (;;) {
              if (p === e) break t;
              if (
                (h === a && ++o === n && (s = u),
                h === i && ++f === l && (r = u),
                (v = p.nextSibling) !== null)
              )
                break;
              ((p = h), (h = p.parentNode));
            }
            p = v;
          }
          a = s === -1 || r === -1 ? null : { start: s, end: r };
        } else a = null;
      }
    a = a || { start: 0, end: 0 };
  } else a = null;
  for (
    qs = { focusedElem: e, selectionRange: a }, Tu = !1, Re = t;
    Re !== null;
  )
    if (((t = Re), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (Re = e));
    else
      for (; Re !== null; ) {
        switch (((t = Re), (i = t.alternate), (e = t.flags), t.tag)) {
          case 0:
            if (
              e & 4 &&
              ((e = t.updateQueue),
              (e = e !== null ? e.events : null),
              e !== null)
            )
              for (a = 0; a < e.length; a++)
                ((n = e[a]), (n.ref.impl = n.nextImpl));
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (e & 1024 && i !== null) {
              ((e = void 0),
                (a = t),
                (n = i.memoizedProps),
                (i = i.memoizedState),
                (l = a.stateNode));
              try {
                var S = nl(a.type, n);
                ((e = l.getSnapshotBeforeUpdate(S, i)),
                  (l.__reactInternalSnapshotBeforeUpdate = e));
              } catch (b) {
                W(a, a.return, b);
              }
            }
            break;
          case 3:
            if (e & 1024) {
              if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9))
                Vs(e);
              else if (a === 1)
                switch (e.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    Vs(e);
                    break;
                  default:
                    e.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if (e & 1024) throw Error(N(163));
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (Re = e));
          break;
        }
        Re = t.return;
      }
}
function m2(e, t, a) {
  var l = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 15:
      (Qt(e, a), l & 4 && hi(5, a));
      break;
    case 1:
      if ((Qt(e, a), l & 4))
        if (((e = a.stateNode), t === null))
          try {
            e.componentDidMount();
          } catch (u) {
            W(a, a.return, u);
          }
        else {
          var n = nl(a.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate);
          } catch (u) {
            W(a, a.return, u);
          }
        }
      (l & 64 && r2(a), l & 512 && Hn(a, a.return));
      break;
    case 3:
      if ((Qt(e, a), l & 64 && ((e = a.updateQueue), e !== null))) {
        if (((t = null), a.child !== null))
          switch (a.child.tag) {
            case 27:
            case 5:
              t = a.child.stateNode;
              break;
            case 1:
              t = a.child.stateNode;
          }
        try {
          y1(e, t);
        } catch (u) {
          W(a, a.return, u);
        }
      }
      break;
    case 27:
      t === null && l & 4 && h2(a);
    case 26:
    case 5:
      (Qt(e, a), t === null && l & 4 && f2(a), l & 512 && Hn(a, a.return));
      break;
    case 12:
      Qt(e, a);
      break;
    case 31:
      (Qt(e, a), l & 4 && g2(e, a));
      break;
    case 13:
      (Qt(e, a),
        l & 4 && y2(e, a),
        l & 64 &&
          ((e = a.memoizedState),
          e !== null &&
            ((e = e.dehydrated),
            e !== null && ((a = i4.bind(null, a)), j4(e, a)))));
      break;
    case 22:
      if (((l = a.memoizedState !== null || Ft), !l)) {
        ((t = (t !== null && t.memoizedState !== null) || Ee), (n = Ft));
        var i = Ee;
        ((Ft = l),
          (Ee = t) && !i ? Kt(e, a, (a.subtreeFlags & 8772) !== 0) : Qt(e, a),
          (Ft = n),
          (Ee = i));
      }
      break;
    case 30:
      break;
    default:
      Qt(e, a);
  }
}
function p2(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), p2(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 && ((t = e.stateNode), t !== null && sr(t)),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
var me = null,
  We = !1;
function Xt(e, t, a) {
  for (a = a.child; a !== null; ) (v2(e, t, a), (a = a.sibling));
}
function v2(e, t, a) {
  if (ot && typeof ot.onCommitFiberUnmount == "function")
    try {
      ot.onCommitFiberUnmount(ui, a);
    } catch {}
  switch (a.tag) {
    case 26:
      (Ee || Ut(a, t),
        Xt(e, t, a),
        a.memoizedState
          ? a.memoizedState.count--
          : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
      break;
    case 27:
      Ee || Ut(a, t);
      var l = me,
        n = We;
      (Ya(a.type) && ((me = a.stateNode), (We = !1)),
        Xt(e, t, a),
        $n(a.stateNode),
        (me = l),
        (We = n));
      break;
    case 5:
      Ee || Ut(a, t);
    case 6:
      if (
        ((l = me),
        (n = We),
        (me = null),
        Xt(e, t, a),
        (me = l),
        (We = n),
        me !== null)
      )
        if (We)
          try {
            (me.nodeType === 9
              ? me.body
              : me.nodeName === "HTML"
                ? me.ownerDocument.body
                : me
            ).removeChild(a.stateNode);
          } catch (i) {
            W(a, t, i);
          }
        else
          try {
            me.removeChild(a.stateNode);
          } catch (i) {
            W(a, t, i);
          }
      break;
    case 18:
      me !== null &&
        (We
          ? ((e = me),
            jf(
              e.nodeType === 9
                ? e.body
                : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e,
              a.stateNode,
            ),
            kl(e))
          : jf(me, a.stateNode));
      break;
    case 4:
      ((l = me),
        (n = We),
        (me = a.stateNode.containerInfo),
        (We = !0),
        Xt(e, t, a),
        (me = l),
        (We = n));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      (La(2, a, t), Ee || La(4, a, t), Xt(e, t, a));
      break;
    case 1:
      (Ee ||
        (Ut(a, t),
        (l = a.stateNode),
        typeof l.componentWillUnmount == "function" && o2(a, t, l)),
        Xt(e, t, a));
      break;
    case 21:
      Xt(e, t, a);
      break;
    case 22:
      ((Ee = (l = Ee) || a.memoizedState !== null), Xt(e, t, a), (Ee = l));
      break;
    default:
      Xt(e, t, a);
  }
}
function g2(e, t) {
  if (
    t.memoizedState === null &&
    ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
  ) {
    e = e.dehydrated;
    try {
      kl(e);
    } catch (a) {
      W(t, t.return, a);
    }
  }
}
function y2(e, t) {
  if (
    t.memoizedState === null &&
    ((e = t.alternate),
    e !== null &&
      ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
  )
    try {
      kl(e);
    } catch (a) {
      W(t, t.return, a);
    }
}
function W0(e) {
  switch (e.tag) {
    case 31:
    case 13:
    case 19:
      var t = e.stateNode;
      return (t === null && (t = e.stateNode = new df()), t);
    case 22:
      return (
        (e = e.stateNode),
        (t = e._retryCache),
        t === null && (t = e._retryCache = new df()),
        t
      );
    default:
      throw Error(N(435, e.tag));
  }
}
function Mi(e, t) {
  var a = W0(e);
  t.forEach(function (l) {
    if (!a.has(l)) {
      a.add(l);
      var n = u4.bind(null, e, l);
      l.then(n, n);
    }
  });
}
function Je(e, t) {
  var a = t.deletions;
  if (a !== null)
    for (var l = 0; l < a.length; l++) {
      var n = a[l],
        i = e,
        u = t,
        s = u;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 27:
            if (Ya(s.type)) {
              ((me = s.stateNode), (We = !1));
              break e;
            }
            break;
          case 5:
            ((me = s.stateNode), (We = !1));
            break e;
          case 3:
          case 4:
            ((me = s.stateNode.containerInfo), (We = !0));
            break e;
        }
        s = s.return;
      }
      if (me === null) throw Error(N(160));
      (v2(i, u, n),
        (me = null),
        (We = !1),
        (i = n.alternate),
        i !== null && (i.return = null),
        (n.return = null));
    }
  if (t.subtreeFlags & 13886)
    for (t = t.child; t !== null; ) (_2(t, e), (t = t.sibling));
}
var Ct = null;
function _2(e, t) {
  var a = e.alternate,
    l = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      (Je(t, e),
        Fe(e),
        l & 4 && (La(3, e, e.return), hi(3, e), La(5, e, e.return)));
      break;
    case 1:
      (Je(t, e),
        Fe(e),
        l & 512 && (Ee || a === null || Ut(a, a.return)),
        l & 64 &&
          Ft &&
          ((e = e.updateQueue),
          e !== null &&
            ((l = e.callbacks),
            l !== null &&
              ((a = e.shared.hiddenCallbacks),
              (e.shared.hiddenCallbacks = a === null ? l : a.concat(l))))));
      break;
    case 26:
      var n = Ct;
      if (
        (Je(t, e),
        Fe(e),
        l & 512 && (Ee || a === null || Ut(a, a.return)),
        l & 4)
      ) {
        var i = a !== null ? a.memoizedState : null;
        if (((l = e.memoizedState), a === null))
          if (l === null)
            if (e.stateNode === null) {
              e: {
                ((l = e.type),
                  (a = e.memoizedProps),
                  (n = n.ownerDocument || n));
                t: switch (l) {
                  case "title":
                    ((i = n.getElementsByTagName("title")[0]),
                      (!i ||
                        i[ri] ||
                        i[Be] ||
                        i.namespaceURI === "http://www.w3.org/2000/svg" ||
                        i.hasAttribute("itemprop")) &&
                        ((i = n.createElement(l)),
                        n.head.insertBefore(
                          i,
                          n.querySelector("head > title"),
                        )),
                      Ye(i, l, a),
                      (i[Be] = e),
                      Oe(i),
                      (l = i));
                    break e;
                  case "link":
                    var u = Rf("link", "href", n).get(l + (a.href || ""));
                    if (u) {
                      for (var s = 0; s < u.length; s++)
                        if (
                          ((i = u[s]),
                          i.getAttribute("href") ===
                            (a.href == null || a.href === "" ? null : a.href) &&
                            i.getAttribute("rel") ===
                              (a.rel == null ? null : a.rel) &&
                            i.getAttribute("title") ===
                              (a.title == null ? null : a.title) &&
                            i.getAttribute("crossorigin") ===
                              (a.crossOrigin == null ? null : a.crossOrigin))
                        ) {
                          u.splice(s, 1);
                          break t;
                        }
                    }
                    ((i = n.createElement(l)),
                      Ye(i, l, a),
                      n.head.appendChild(i));
                    break;
                  case "meta":
                    if (
                      (u = Rf("meta", "content", n).get(l + (a.content || "")))
                    ) {
                      for (s = 0; s < u.length; s++)
                        if (
                          ((i = u[s]),
                          i.getAttribute("content") ===
                            (a.content == null ? null : "" + a.content) &&
                            i.getAttribute("name") ===
                              (a.name == null ? null : a.name) &&
                            i.getAttribute("property") ===
                              (a.property == null ? null : a.property) &&
                            i.getAttribute("http-equiv") ===
                              (a.httpEquiv == null ? null : a.httpEquiv) &&
                            i.getAttribute("charset") ===
                              (a.charSet == null ? null : a.charSet))
                        ) {
                          u.splice(s, 1);
                          break t;
                        }
                    }
                    ((i = n.createElement(l)),
                      Ye(i, l, a),
                      n.head.appendChild(i));
                    break;
                  default:
                    throw Error(N(468, l));
                }
                ((i[Be] = e), Oe(i), (l = i));
              }
              e.stateNode = l;
            } else Of(n, e.type, e.stateNode);
          else e.stateNode = Mf(n, l, e.memoizedProps);
        else
          i !== l
            ? (i === null
                ? a.stateNode !== null &&
                  ((a = a.stateNode), a.parentNode.removeChild(a))
                : i.count--,
              l === null
                ? Of(n, e.type, e.stateNode)
                : Mf(n, l, e.memoizedProps))
            : l === null &&
              e.stateNode !== null &&
              Oc(e, e.memoizedProps, a.memoizedProps);
      }
      break;
    case 27:
      (Je(t, e),
        Fe(e),
        l & 512 && (Ee || a === null || Ut(a, a.return)),
        a !== null && l & 4 && Oc(e, e.memoizedProps, a.memoizedProps));
      break;
    case 5:
      if (
        (Je(t, e),
        Fe(e),
        l & 512 && (Ee || a === null || Ut(a, a.return)),
        e.flags & 32)
      ) {
        n = e.stateNode;
        try {
          ql(n, "");
        } catch (S) {
          W(e, e.return, S);
        }
      }
      (l & 4 &&
        e.stateNode != null &&
        ((n = e.memoizedProps), Oc(e, n, a !== null ? a.memoizedProps : n)),
        l & 1024 && (Lc = !0));
      break;
    case 6:
      if ((Je(t, e), Fe(e), l & 4)) {
        if (e.stateNode === null) throw Error(N(162));
        ((l = e.memoizedProps), (a = e.stateNode));
        try {
          a.nodeValue = l;
        } catch (S) {
          W(e, e.return, S);
        }
      }
      break;
    case 3:
      if (
        ((Pi = null),
        (n = Ct),
        (Ct = wu(t.containerInfo)),
        Je(t, e),
        (Ct = n),
        Fe(e),
        l & 4 && a !== null && a.memoizedState.isDehydrated)
      )
        try {
          kl(t.containerInfo);
        } catch (S) {
          W(e, e.return, S);
        }
      Lc && ((Lc = !1), b2(e));
      break;
    case 4:
      ((l = Ct),
        (Ct = wu(e.stateNode.containerInfo)),
        Je(t, e),
        Fe(e),
        (Ct = l));
      break;
    case 12:
      (Je(t, e), Fe(e));
      break;
    case 31:
      (Je(t, e),
        Fe(e),
        l & 4 &&
          ((l = e.updateQueue),
          l !== null && ((e.updateQueue = null), Mi(e, l))));
      break;
    case 13:
      (Je(t, e),
        Fe(e),
        e.child.flags & 8192 &&
          (e.memoizedState !== null) !=
            (a !== null && a.memoizedState !== null) &&
          (Iu = rt()),
        l & 4 &&
          ((l = e.updateQueue),
          l !== null && ((e.updateQueue = null), Mi(e, l))));
      break;
    case 22:
      n = e.memoizedState !== null;
      var r = a !== null && a.memoizedState !== null,
        o = Ft,
        f = Ee;
      if (
        ((Ft = o || n),
        (Ee = f || r),
        Je(t, e),
        (Ee = f),
        (Ft = o),
        Fe(e),
        l & 8192)
      )
        e: for (
          t = e.stateNode,
            t._visibility = n ? t._visibility & -2 : t._visibility | 1,
            n && (a === null || r || Ft || Ee || Ka(e)),
            a = null,
            t = e;
          ;
        ) {
          if (t.tag === 5 || t.tag === 26) {
            if (a === null) {
              r = a = t;
              try {
                if (((i = r.stateNode), n))
                  ((u = i.style),
                    typeof u.setProperty == "function"
                      ? u.setProperty("display", "none", "important")
                      : (u.display = "none"));
                else {
                  s = r.stateNode;
                  var p = r.memoizedProps.style,
                    h =
                      p != null && p.hasOwnProperty("display")
                        ? p.display
                        : null;
                  s.style.display =
                    h == null || typeof h == "boolean" ? "" : ("" + h).trim();
                }
              } catch (S) {
                W(r, r.return, S);
              }
            }
          } else if (t.tag === 6) {
            if (a === null) {
              r = t;
              try {
                r.stateNode.nodeValue = n ? "" : r.memoizedProps;
              } catch (S) {
                W(r, r.return, S);
              }
            }
          } else if (t.tag === 18) {
            if (a === null) {
              r = t;
              try {
                var v = r.stateNode;
                n ? Af(v, !0) : Af(r.stateNode, !1);
              } catch (S) {
                W(r, r.return, S);
              }
            }
          } else if (
            ((t.tag !== 22 && t.tag !== 23) ||
              t.memoizedState === null ||
              t === e) &&
            t.child !== null
          ) {
            ((t.child.return = t), (t = t.child));
            continue;
          }
          if (t === e) break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) break e;
            (a === t && (a = null), (t = t.return));
          }
          (a === t && (a = null),
            (t.sibling.return = t.return),
            (t = t.sibling));
        }
      l & 4 &&
        ((l = e.updateQueue),
        l !== null &&
          ((a = l.retryQueue),
          a !== null && ((l.retryQueue = null), Mi(e, a))));
      break;
    case 19:
      (Je(t, e),
        Fe(e),
        l & 4 &&
          ((l = e.updateQueue),
          l !== null && ((e.updateQueue = null), Mi(e, l))));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      (Je(t, e), Fe(e));
  }
}
function Fe(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      for (var a, l = e.return; l !== null; ) {
        if (d2(l)) {
          a = l;
          break;
        }
        l = l.return;
      }
      if (a == null) throw Error(N(160));
      switch (a.tag) {
        case 27:
          var n = a.stateNode,
            i = Dc(e);
          _u(e, i, n);
          break;
        case 5:
          var u = a.stateNode;
          a.flags & 32 && (ql(u, ""), (a.flags &= -33));
          var s = Dc(e);
          _u(e, s, u);
          break;
        case 3:
        case 4:
          var r = a.stateNode.containerInfo,
            o = Dc(e);
          Ms(e, o, r);
          break;
        default:
          throw Error(N(161));
      }
    } catch (f) {
      W(e, e.return, f);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function b2(e) {
  if (e.subtreeFlags & 1024)
    for (e = e.child; e !== null; ) {
      var t = e;
      (b2(t),
        t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
        (e = e.sibling));
    }
}
function Qt(e, t) {
  if (t.subtreeFlags & 8772)
    for (t = t.child; t !== null; ) (m2(e, t.alternate, t), (t = t.sibling));
}
function Ka(e) {
  for (e = e.child; e !== null; ) {
    var t = e;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (La(4, t, t.return), Ka(t));
        break;
      case 1:
        Ut(t, t.return);
        var a = t.stateNode;
        (typeof a.componentWillUnmount == "function" && o2(t, t.return, a),
          Ka(t));
        break;
      case 27:
        $n(t.stateNode);
      case 26:
      case 5:
        (Ut(t, t.return), Ka(t));
        break;
      case 22:
        t.memoizedState === null && Ka(t);
        break;
      case 30:
        Ka(t);
        break;
      default:
        Ka(t);
    }
    e = e.sibling;
  }
}
function Kt(e, t, a) {
  for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
    var l = t.alternate,
      n = e,
      i = t,
      u = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        (Kt(n, i, a), hi(4, i));
        break;
      case 1:
        if (
          (Kt(n, i, a),
          (l = i),
          (n = l.stateNode),
          typeof n.componentDidMount == "function")
        )
          try {
            n.componentDidMount();
          } catch (o) {
            W(l, l.return, o);
          }
        if (((l = i), (n = l.updateQueue), n !== null)) {
          var s = l.stateNode;
          try {
            var r = n.shared.hiddenCallbacks;
            if (r !== null)
              for (n.shared.hiddenCallbacks = null, n = 0; n < r.length; n++)
                g1(r[n], s);
          } catch (o) {
            W(l, l.return, o);
          }
        }
        (a && u & 64 && r2(i), Hn(i, i.return));
        break;
      case 27:
        h2(i);
      case 26:
      case 5:
        (Kt(n, i, a), a && l === null && u & 4 && f2(i), Hn(i, i.return));
        break;
      case 12:
        Kt(n, i, a);
        break;
      case 31:
        (Kt(n, i, a), a && u & 4 && g2(n, i));
        break;
      case 13:
        (Kt(n, i, a), a && u & 4 && y2(n, i));
        break;
      case 22:
        (i.memoizedState === null && Kt(n, i, a), Hn(i, i.return));
        break;
      case 30:
        break;
      default:
        Kt(n, i, a);
    }
    t = t.sibling;
  }
}
function Yr(e, t) {
  var a = null;
  (e !== null &&
    e.memoizedState !== null &&
    e.memoizedState.cachePool !== null &&
    (a = e.memoizedState.cachePool.pool),
    (e = null),
    t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (e = t.memoizedState.cachePool.pool),
    e !== a && (e != null && e.refCount++, a != null && fi(a)));
}
function Vr(e, t) {
  ((e = null),
    t.alternate !== null && (e = t.alternate.memoizedState.cache),
    (t = t.memoizedState.cache),
    t !== e && (t.refCount++, e != null && fi(e)));
}
function At(e, t, a, l) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) (S2(e, t, a, l), (t = t.sibling));
}
function S2(e, t, a, l) {
  var n = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      (At(e, t, a, l), n & 2048 && hi(9, t));
      break;
    case 1:
      At(e, t, a, l);
      break;
    case 3:
      (At(e, t, a, l),
        n & 2048 &&
          ((e = null),
          t.alternate !== null && (e = t.alternate.memoizedState.cache),
          (t = t.memoizedState.cache),
          t !== e && (t.refCount++, e != null && fi(e))));
      break;
    case 12:
      if (n & 2048) {
        (At(e, t, a, l), (e = t.stateNode));
        try {
          var i = t.memoizedProps,
            u = i.id,
            s = i.onPostCommit;
          typeof s == "function" &&
            s(
              u,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0,
            );
        } catch (r) {
          W(t, t.return, r);
        }
      } else At(e, t, a, l);
      break;
    case 31:
      At(e, t, a, l);
      break;
    case 13:
      At(e, t, a, l);
      break;
    case 23:
      break;
    case 22:
      ((i = t.stateNode),
        (u = t.alternate),
        t.memoizedState !== null
          ? i._visibility & 2
            ? At(e, t, a, l)
            : qn(e, t)
          : i._visibility & 2
            ? At(e, t, a, l)
            : ((i._visibility |= 2),
              vl(e, t, a, l, (t.subtreeFlags & 10256) !== 0 || !1)),
        n & 2048 && Yr(u, t));
      break;
    case 24:
      (At(e, t, a, l), n & 2048 && Vr(t.alternate, t));
      break;
    default:
      At(e, t, a, l);
  }
}
function vl(e, t, a, l, n) {
  for (
    n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
    t !== null;
  ) {
    var i = e,
      u = t,
      s = a,
      r = l,
      o = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        (vl(i, u, s, r, n), hi(8, u));
        break;
      case 23:
        break;
      case 22:
        var f = u.stateNode;
        (u.memoizedState !== null
          ? f._visibility & 2
            ? vl(i, u, s, r, n)
            : qn(i, u)
          : ((f._visibility |= 2), vl(i, u, s, r, n)),
          n && o & 2048 && Yr(u.alternate, u));
        break;
      case 24:
        (vl(i, u, s, r, n), n && o & 2048 && Vr(u.alternate, u));
        break;
      default:
        vl(i, u, s, r, n);
    }
    t = t.sibling;
  }
}
function qn(e, t) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) {
      var a = e,
        l = t,
        n = l.flags;
      switch (l.tag) {
        case 22:
          (qn(a, l), n & 2048 && Yr(l.alternate, l));
          break;
        case 24:
          (qn(a, l), n & 2048 && Vr(l.alternate, l));
          break;
        default:
          qn(a, l);
      }
      t = t.sibling;
    }
}
var wn = 8192;
function hl(e, t, a) {
  if (e.subtreeFlags & wn)
    for (e = e.child; e !== null; ) (x2(e, t, a), (e = e.sibling));
}
function x2(e, t, a) {
  switch (e.tag) {
    case 26:
      (hl(e, t, a),
        e.flags & wn &&
          e.memoizedState !== null &&
          B4(a, Ct, e.memoizedState, e.memoizedProps));
      break;
    case 5:
      hl(e, t, a);
      break;
    case 3:
    case 4:
      var l = Ct;
      ((Ct = wu(e.stateNode.containerInfo)), hl(e, t, a), (Ct = l));
      break;
    case 22:
      e.memoizedState === null &&
        ((l = e.alternate),
        l !== null && l.memoizedState !== null
          ? ((l = wn), (wn = 16777216), hl(e, t, a), (wn = l))
          : hl(e, t, a));
      break;
    default:
      hl(e, t, a);
  }
}
function N2(e) {
  var t = e.alternate;
  if (t !== null && ((e = t.child), e !== null)) {
    t.child = null;
    do ((t = e.sibling), (e.sibling = null), (e = t));
    while (e !== null);
  }
}
function pn(e) {
  var t = e.deletions;
  if (e.flags & 16) {
    if (t !== null)
      for (var a = 0; a < t.length; a++) {
        var l = t[a];
        ((Re = l), j2(l, e));
      }
    N2(e);
  }
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; ) (E2(e), (e = e.sibling));
}
function E2(e) {
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      (pn(e), e.flags & 2048 && La(9, e, e.return));
      break;
    case 3:
      pn(e);
      break;
    case 12:
      pn(e);
      break;
    case 22:
      var t = e.stateNode;
      e.memoizedState !== null &&
      t._visibility & 2 &&
      (e.return === null || e.return.tag !== 13)
        ? ((t._visibility &= -3), Fi(e))
        : pn(e);
      break;
    default:
      pn(e);
  }
}
function Fi(e) {
  var t = e.deletions;
  if (e.flags & 16) {
    if (t !== null)
      for (var a = 0; a < t.length; a++) {
        var l = t[a];
        ((Re = l), j2(l, e));
      }
    N2(e);
  }
  for (e = e.child; e !== null; ) {
    switch (((t = e), t.tag)) {
      case 0:
      case 11:
      case 15:
        (La(8, t, t.return), Fi(t));
        break;
      case 22:
        ((a = t.stateNode),
          a._visibility & 2 && ((a._visibility &= -3), Fi(t)));
        break;
      default:
        Fi(t);
    }
    e = e.sibling;
  }
}
function j2(e, t) {
  for (; Re !== null; ) {
    var a = Re;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        La(8, a, t);
        break;
      case 23:
      case 22:
        if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
          var l = a.memoizedState.cachePool.pool;
          l != null && l.refCount++;
        }
        break;
      case 24:
        fi(a.memoizedState.cache);
    }
    if (((l = a.child), l !== null)) ((l.return = a), (Re = l));
    else
      e: for (a = e; Re !== null; ) {
        l = Re;
        var n = l.sibling,
          i = l.return;
        if ((p2(l), l === a)) {
          Re = null;
          break e;
        }
        if (n !== null) {
          ((n.return = i), (Re = n));
          break e;
        }
        Re = i;
      }
  }
}
var P0 = {
    getCacheForType: function (e) {
      var t = qe(je),
        a = t.data.get(e);
      return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
    },
    cacheSignal: function () {
      return qe(je).controller.signal;
    },
  },
  I0 = typeof WeakMap == "function" ? WeakMap : Map,
  k = 0,
  ie = null,
  V = null,
  $ = 0,
  F = 0,
  it = null,
  ba = !1,
  an = !1,
  $r = !1,
  ca = 0,
  _e = 0,
  Ua = 0,
  Ia = 0,
  Gr = 0,
  st = 0,
  Gl = 0,
  Yn = null,
  Pe = null,
  Rs = !1,
  Iu = 0,
  A2 = 0,
  bu = 1 / 0,
  Su = null,
  Ca = null,
  Ce = 0,
  za = null,
  Xl = null,
  aa = 0,
  Os = 0,
  Ds = null,
  w2 = null,
  Vn = 0,
  Ls = null;
function dt() {
  return k & 2 && $ !== 0 ? $ & -$ : U.T !== null ? Qr() : Ud();
}
function C2() {
  if (st === 0)
    if (!($ & 536870912) || X) {
      var e = Ni;
      ((Ni <<= 1), !(Ni & 3932160) && (Ni = 262144), (st = e));
    } else st = 536870912;
  return ((e = mt.current), e !== null && (e.flags |= 32), st);
}
function Ie(e, t, a) {
  (((e === ie && (F === 2 || F === 9)) || e.cancelPendingCommit !== null) &&
    (Ql(e, 0), Sa(e, $, st, !1)),
    si(e, a),
    (!(k & 2) || e !== ie) &&
      (e === ie && (!(k & 2) && (Ia |= a), _e === 4 && Sa(e, $, st, !1)),
      Yt(e)));
}
function z2(e, t, a) {
  if (k & 6) throw Error(N(327));
  var l = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || ci(e, t),
    n = l ? a4(e, t) : Uc(e, t, !0),
    i = l;
  do {
    if (n === 0) {
      an && !l && Sa(e, t, 0, !1);
      break;
    } else {
      if (((a = e.current.alternate), i && !e4(a))) {
        ((n = Uc(e, t, !1)), (i = !1));
        continue;
      }
      if (n === 2) {
        if (((i = t), e.errorRecoveryDisabledLanes & i)) var u = 0;
        else
          ((u = e.pendingLanes & -536870913),
            (u = u !== 0 ? u : u & 536870912 ? 536870912 : 0));
        if (u !== 0) {
          t = u;
          e: {
            var s = e;
            n = Yn;
            var r = s.current.memoizedState.isDehydrated;
            if ((r && (Ql(s, u).flags |= 256), (u = Uc(s, u, !1)), u !== 2)) {
              if ($r && !r) {
                ((s.errorRecoveryDisabledLanes |= i), (Ia |= i), (n = 4));
                break e;
              }
              ((i = Pe),
                (Pe = n),
                i !== null && (Pe === null ? (Pe = i) : Pe.push.apply(Pe, i)));
            }
            n = u;
          }
          if (((i = !1), n !== 2)) continue;
        }
      }
      if (n === 1) {
        (Ql(e, 0), Sa(e, t, 0, !0));
        break;
      }
      e: {
        switch (((l = e), (i = n), i)) {
          case 0:
          case 1:
            throw Error(N(345));
          case 4:
            if ((t & 4194048) !== t) break;
          case 6:
            Sa(l, t, st, !ba);
            break e;
          case 2:
            Pe = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(N(329));
        }
        if ((t & 62914560) === t && ((n = Iu + 300 - rt()), 10 < n)) {
          if ((Sa(l, t, st, !ba), $u(l, 0, !0) !== 0)) break e;
          ((aa = t),
            (l.timeoutHandle = J2(
              hf.bind(
                null,
                l,
                a,
                Pe,
                Su,
                Rs,
                t,
                st,
                Ia,
                Gl,
                ba,
                i,
                "Throttled",
                -0,
                0,
              ),
              n,
            )));
          break e;
        }
        hf(l, a, Pe, Su, Rs, t, st, Ia, Gl, ba, i, null, -0, 0);
      }
    }
    break;
  } while (!0);
  Yt(e);
}
function hf(e, t, a, l, n, i, u, s, r, o, f, p, h, v) {
  if (
    ((e.timeoutHandle = -1),
    (p = t.subtreeFlags),
    p & 8192 || (p & 16785408) === 16785408)
  ) {
    ((p = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: Pt,
    }),
      x2(t, i, p));
    var S =
      (i & 62914560) === i ? Iu - rt() : (i & 4194048) === i ? A2 - rt() : 0;
    if (((S = H4(p, S)), S !== null)) {
      ((aa = i),
        (e.cancelPendingCommit = S(
          pf.bind(null, e, t, i, a, l, n, u, s, r, f, p, null, h, v),
        )),
        Sa(e, i, u, !o));
      return;
    }
  }
  pf(e, t, i, a, l, n, u, s, r);
}
function e4(e) {
  for (var t = e; ; ) {
    var a = t.tag;
    if (
      (a === 0 || a === 11 || a === 15) &&
      t.flags & 16384 &&
      ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
    )
      for (var l = 0; l < a.length; l++) {
        var n = a[l],
          i = n.getSnapshot;
        n = n.value;
        try {
          if (!ht(i(), n)) return !1;
        } catch {
          return !1;
        }
      }
    if (((a = t.child), t.subtreeFlags & 16384 && a !== null))
      ((a.return = t), (t = a));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function Sa(e, t, a, l) {
  ((t &= ~Gr),
    (t &= ~Ia),
    (e.suspendedLanes |= t),
    (e.pingedLanes &= ~t),
    l && (e.warmLanes |= t),
    (l = e.expirationTimes));
  for (var n = t; 0 < n; ) {
    var i = 31 - ft(n),
      u = 1 << i;
    ((l[i] = -1), (n &= ~u));
  }
  a !== 0 && Od(e, a, t);
}
function ec() {
  return k & 6 ? !0 : (mi(0), !1);
}
function Xr() {
  if (V !== null) {
    if (F === 0) var e = V.return;
    else ((e = V), (It = ol = null), zr(e), (Dl = null), (Fn = 0), (e = V));
    for (; e !== null; ) (s2(e.alternate, e), (e = e.return));
    V = null;
  }
}
function Ql(e, t) {
  var a = e.timeoutHandle;
  (a !== -1 && ((e.timeoutHandle = -1), b4(a)),
    (a = e.cancelPendingCommit),
    a !== null && ((e.cancelPendingCommit = null), a()),
    (aa = 0),
    Xr(),
    (ie = e),
    (V = a = ea(e.current, null)),
    ($ = t),
    (F = 0),
    (it = null),
    (ba = !1),
    (an = ci(e, t)),
    ($r = !1),
    (Gl = st = Gr = Ia = Ua = _e = 0),
    (Pe = Yn = null),
    (Rs = !1),
    t & 8 && (t |= t & 32));
  var l = e.entangledLanes;
  if (l !== 0)
    for (e = e.entanglements, l &= t; 0 < l; ) {
      var n = 31 - ft(l),
        i = 1 << n;
      ((t |= e[n]), (l &= ~i));
    }
  return ((ca = t), Zu(), a);
}
function T2(e, t) {
  ((q = null),
    (U.H = Pn),
    t === tn || t === Ku
      ? ((t = Xo()), (F = 3))
      : t === xr
        ? ((t = Xo()), (F = 4))
        : (F =
            t === Hr
              ? 8
              : t !== null &&
                  typeof t == "object" &&
                  typeof t.then == "function"
                ? 6
                : 1),
    (it = t),
    V === null && ((_e = 1), gu(e, St(t, e.current))));
}
function M2() {
  var e = mt.current;
  return e === null
    ? !0
    : ($ & 4194048) === $
      ? Nt === null
      : ($ & 62914560) === $ || $ & 536870912
        ? e === Nt
        : !1;
}
function R2() {
  var e = U.H;
  return ((U.H = Pn), e === null ? Pn : e);
}
function O2() {
  var e = U.A;
  return ((U.A = P0), e);
}
function xu() {
  ((_e = 4),
    ba || (($ & 4194048) !== $ && mt.current !== null) || (an = !0),
    (!(Ua & 134217727) && !(Ia & 134217727)) ||
      ie === null ||
      Sa(ie, $, st, !1));
}
function Uc(e, t, a) {
  var l = k;
  k |= 2;
  var n = R2(),
    i = O2();
  ((ie !== e || $ !== t) && ((Su = null), Ql(e, t)), (t = !1));
  var u = _e;
  e: do
    try {
      if (F !== 0 && V !== null) {
        var s = V,
          r = it;
        switch (F) {
          case 8:
            (Xr(), (u = 6));
            break e;
          case 3:
          case 2:
          case 9:
          case 6:
            mt.current === null && (t = !0);
            var o = F;
            if (((F = 0), (it = null), zl(e, s, r, o), a && an)) {
              u = 0;
              break e;
            }
            break;
          default:
            ((o = F), (F = 0), (it = null), zl(e, s, r, o));
        }
      }
      (t4(), (u = _e));
      break;
    } catch (f) {
      T2(e, f);
    }
  while (!0);
  return (
    t && e.shellSuspendCounter++,
    (It = ol = null),
    (k = l),
    (U.H = n),
    (U.A = i),
    V === null && ((ie = null), ($ = 0), Zu()),
    u
  );
}
function t4() {
  for (; V !== null; ) D2(V);
}
function a4(e, t) {
  var a = k;
  k |= 2;
  var l = R2(),
    n = O2();
  ie !== e || $ !== t
    ? ((Su = null), (bu = rt() + 500), Ql(e, t))
    : (an = ci(e, t));
  e: do
    try {
      if (F !== 0 && V !== null) {
        t = V;
        var i = it;
        t: switch (F) {
          case 1:
            ((F = 0), (it = null), zl(e, t, i, 1));
            break;
          case 2:
          case 9:
            if (Go(i)) {
              ((F = 0), (it = null), mf(t));
              break;
            }
            ((t = function () {
              ((F !== 2 && F !== 9) || ie !== e || (F = 7), Yt(e));
            }),
              i.then(t, t));
            break e;
          case 3:
            F = 7;
            break e;
          case 4:
            F = 5;
            break e;
          case 7:
            Go(i)
              ? ((F = 0), (it = null), mf(t))
              : ((F = 0), (it = null), zl(e, t, i, 7));
            break;
          case 5:
            var u = null;
            switch (V.tag) {
              case 26:
                u = V.memoizedState;
              case 5:
              case 27:
                var s = V;
                if (u ? eh(u) : s.stateNode.complete) {
                  ((F = 0), (it = null));
                  var r = s.sibling;
                  if (r !== null) V = r;
                  else {
                    var o = s.return;
                    o !== null ? ((V = o), tc(o)) : (V = null);
                  }
                  break t;
                }
            }
            ((F = 0), (it = null), zl(e, t, i, 5));
            break;
          case 6:
            ((F = 0), (it = null), zl(e, t, i, 6));
            break;
          case 8:
            (Xr(), (_e = 6));
            break e;
          default:
            throw Error(N(462));
        }
      }
      l4();
      break;
    } catch (f) {
      T2(e, f);
    }
  while (!0);
  return (
    (It = ol = null),
    (U.H = l),
    (U.A = n),
    (k = a),
    V !== null ? 0 : ((ie = null), ($ = 0), Zu(), _e)
  );
}
function l4() {
  for (; V !== null && !Am(); ) D2(V);
}
function D2(e) {
  var t = c2(e.alternate, e, ca);
  ((e.memoizedProps = e.pendingProps), t === null ? tc(e) : (V = t));
}
function mf(e) {
  var t = e,
    a = t.alternate;
  switch (t.tag) {
    case 15:
    case 0:
      t = cf(a, t, t.pendingProps, t.type, void 0, $);
      break;
    case 11:
      t = cf(a, t, t.pendingProps, t.type.render, t.ref, $);
      break;
    case 5:
      zr(t);
    default:
      (s2(a, t), (t = V = s1(t, ca)), (t = c2(a, t, ca)));
  }
  ((e.memoizedProps = e.pendingProps), t === null ? tc(e) : (V = t));
}
function zl(e, t, a, l) {
  ((It = ol = null), zr(t), (Dl = null), (Fn = 0));
  var n = t.return;
  try {
    if (Q0(e, n, t, a, $)) {
      ((_e = 1), gu(e, St(a, e.current)), (V = null));
      return;
    }
  } catch (i) {
    if (n !== null) throw ((V = n), i);
    ((_e = 1), gu(e, St(a, e.current)), (V = null));
    return;
  }
  t.flags & 32768
    ? (X || l === 1
        ? (e = !0)
        : an || $ & 536870912
          ? (e = !1)
          : ((ba = e = !0),
            (l === 2 || l === 9 || l === 3 || l === 6) &&
              ((l = mt.current),
              l !== null && l.tag === 13 && (l.flags |= 16384))),
      L2(t, e))
    : tc(t);
}
function tc(e) {
  var t = e;
  do {
    if (t.flags & 32768) {
      L2(t, ba);
      return;
    }
    e = t.return;
    var a = K0(t.alternate, t, ca);
    if (a !== null) {
      V = a;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      V = t;
      return;
    }
    V = t = e;
  } while (t !== null);
  _e === 0 && (_e = 5);
}
function L2(e, t) {
  do {
    var a = J0(e.alternate, e);
    if (a !== null) {
      ((a.flags &= 32767), (V = a));
      return;
    }
    if (
      ((a = e.return),
      a !== null &&
        ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
      !t && ((e = e.sibling), e !== null))
    ) {
      V = e;
      return;
    }
    V = e = a;
  } while (e !== null);
  ((_e = 6), (V = null));
}
function pf(e, t, a, l, n, i, u, s, r) {
  e.cancelPendingCommit = null;
  do ac();
  while (Ce !== 0);
  if (k & 6) throw Error(N(327));
  if (t !== null) {
    if (t === e.current) throw Error(N(177));
    if (
      ((i = t.lanes | t.childLanes),
      (i |= pr),
      Um(e, a, i, u, s, r),
      e === ie && ((V = ie = null), ($ = 0)),
      (Xl = t),
      (za = e),
      (aa = a),
      (Os = i),
      (Ds = n),
      (w2 = l),
      t.subtreeFlags & 10256 || t.flags & 10256
        ? ((e.callbackNode = null),
          (e.callbackPriority = 0),
          c4(uu, function () {
            return (Y2(), null);
          }))
        : ((e.callbackNode = null), (e.callbackPriority = 0)),
      (l = (t.flags & 13878) !== 0),
      t.subtreeFlags & 13878 || l)
    ) {
      ((l = U.T), (U.T = null), (n = K.p), (K.p = 2), (u = k), (k |= 4));
      try {
        F0(e, t, a);
      } finally {
        ((k = u), (K.p = n), (U.T = l));
      }
    }
    ((Ce = 1), U2(), B2(), H2());
  }
}
function U2() {
  if (Ce === 1) {
    Ce = 0;
    var e = za,
      t = Xl,
      a = (t.flags & 13878) !== 0;
    if (t.subtreeFlags & 13878 || a) {
      ((a = U.T), (U.T = null));
      var l = K.p;
      K.p = 2;
      var n = k;
      k |= 4;
      try {
        _2(t, e);
        var i = qs,
          u = e1(e.containerInfo),
          s = i.focusedElem,
          r = i.selectionRange;
        if (
          u !== s &&
          s &&
          s.ownerDocument &&
          Id(s.ownerDocument.documentElement, s)
        ) {
          if (r !== null && mr(s)) {
            var o = r.start,
              f = r.end;
            if ((f === void 0 && (f = o), "selectionStart" in s))
              ((s.selectionStart = o),
                (s.selectionEnd = Math.min(f, s.value.length)));
            else {
              var p = s.ownerDocument || document,
                h = (p && p.defaultView) || window;
              if (h.getSelection) {
                var v = h.getSelection(),
                  S = s.textContent.length,
                  b = Math.min(r.start, S),
                  x = r.end === void 0 ? b : Math.min(r.end, S);
                !v.extend && b > x && ((u = x), (x = b), (b = u));
                var d = Uo(s, b),
                  m = Uo(s, x);
                if (
                  d &&
                  m &&
                  (v.rangeCount !== 1 ||
                    v.anchorNode !== d.node ||
                    v.anchorOffset !== d.offset ||
                    v.focusNode !== m.node ||
                    v.focusOffset !== m.offset)
                ) {
                  var y = p.createRange();
                  (y.setStart(d.node, d.offset),
                    v.removeAllRanges(),
                    b > x
                      ? (v.addRange(y), v.extend(m.node, m.offset))
                      : (y.setEnd(m.node, m.offset), v.addRange(y)));
                }
              }
            }
          }
          for (p = [], v = s; (v = v.parentNode); )
            v.nodeType === 1 &&
              p.push({ element: v, left: v.scrollLeft, top: v.scrollTop });
          for (
            typeof s.focus == "function" && s.focus(), s = 0;
            s < p.length;
            s++
          ) {
            var _ = p[s];
            ((_.element.scrollLeft = _.left), (_.element.scrollTop = _.top));
          }
        }
        ((Tu = !!Hs), (qs = Hs = null));
      } finally {
        ((k = n), (K.p = l), (U.T = a));
      }
    }
    ((e.current = t), (Ce = 2));
  }
}
function B2() {
  if (Ce === 2) {
    Ce = 0;
    var e = za,
      t = Xl,
      a = (t.flags & 8772) !== 0;
    if (t.subtreeFlags & 8772 || a) {
      ((a = U.T), (U.T = null));
      var l = K.p;
      K.p = 2;
      var n = k;
      k |= 4;
      try {
        m2(e, t.alternate, t);
      } finally {
        ((k = n), (K.p = l), (U.T = a));
      }
    }
    Ce = 3;
  }
}
function H2() {
  if (Ce === 4 || Ce === 3) {
    ((Ce = 0), wm());
    var e = za,
      t = Xl,
      a = aa,
      l = w2;
    t.subtreeFlags & 10256 || t.flags & 10256
      ? (Ce = 5)
      : ((Ce = 0), (Xl = za = null), q2(e, e.pendingLanes));
    var n = e.pendingLanes;
    if (
      (n === 0 && (Ca = null),
      cr(a),
      (t = t.stateNode),
      ot && typeof ot.onCommitFiberRoot == "function")
    )
      try {
        ot.onCommitFiberRoot(ui, t, void 0, (t.current.flags & 128) === 128);
      } catch {}
    if (l !== null) {
      ((t = U.T), (n = K.p), (K.p = 2), (U.T = null));
      try {
        for (var i = e.onRecoverableError, u = 0; u < l.length; u++) {
          var s = l[u];
          i(s.value, { componentStack: s.stack });
        }
      } finally {
        ((U.T = t), (K.p = n));
      }
    }
    (aa & 3 && ac(),
      Yt(e),
      (n = e.pendingLanes),
      a & 261930 && n & 42
        ? e === Ls
          ? Vn++
          : ((Vn = 0), (Ls = e))
        : (Vn = 0),
      mi(0));
  }
}
function q2(e, t) {
  (e.pooledCacheLanes &= t) === 0 &&
    ((t = e.pooledCache), t != null && ((e.pooledCache = null), fi(t)));
}
function ac() {
  return (U2(), B2(), H2(), Y2());
}
function Y2() {
  if (Ce !== 5) return !1;
  var e = za,
    t = Os;
  Os = 0;
  var a = cr(aa),
    l = U.T,
    n = K.p;
  try {
    ((K.p = 32 > a ? 32 : a), (U.T = null), (a = Ds), (Ds = null));
    var i = za,
      u = aa;
    if (((Ce = 0), (Xl = za = null), (aa = 0), k & 6)) throw Error(N(331));
    var s = k;
    if (
      ((k |= 4),
      E2(i.current),
      S2(i, i.current, u, a),
      (k = s),
      mi(0, !1),
      ot && typeof ot.onPostCommitFiberRoot == "function")
    )
      try {
        ot.onPostCommitFiberRoot(ui, i);
      } catch {}
    return !0;
  } finally {
    ((K.p = n), (U.T = l), q2(e, t));
  }
}
function vf(e, t, a) {
  ((t = St(a, t)),
    (t = Cs(e.stateNode, t, 2)),
    (e = wa(e, t, 2)),
    e !== null && (si(e, 2), Yt(e)));
}
function W(e, t, a) {
  if (e.tag === 3) vf(e, e, a);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        vf(t, e, a);
        break;
      } else if (t.tag === 1) {
        var l = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof l.componentDidCatch == "function" &&
            (Ca === null || !Ca.has(l)))
        ) {
          ((e = St(a, e)),
            (a = t2(2)),
            (l = wa(t, a, 2)),
            l !== null && (a2(a, l, t, e), si(l, 2), Yt(l)));
          break;
        }
      }
      t = t.return;
    }
}
function Bc(e, t, a) {
  var l = e.pingCache;
  if (l === null) {
    l = e.pingCache = new I0();
    var n = new Set();
    l.set(t, n);
  } else ((n = l.get(t)), n === void 0 && ((n = new Set()), l.set(t, n)));
  n.has(a) || (($r = !0), n.add(a), (e = n4.bind(null, e, t, a)), t.then(e, e));
}
function n4(e, t, a) {
  var l = e.pingCache;
  (l !== null && l.delete(t),
    (e.pingedLanes |= e.suspendedLanes & a),
    (e.warmLanes &= ~a),
    ie === e &&
      ($ & a) === a &&
      (_e === 4 || (_e === 3 && ($ & 62914560) === $ && 300 > rt() - Iu)
        ? !(k & 2) && Ql(e, 0)
        : (Gr |= a),
      Gl === $ && (Gl = 0)),
    Yt(e));
}
function V2(e, t) {
  (t === 0 && (t = Rd()), (e = rl(e, t)), e !== null && (si(e, t), Yt(e)));
}
function i4(e) {
  var t = e.memoizedState,
    a = 0;
  (t !== null && (a = t.retryLane), V2(e, a));
}
function u4(e, t) {
  var a = 0;
  switch (e.tag) {
    case 31:
    case 13:
      var l = e.stateNode,
        n = e.memoizedState;
      n !== null && (a = n.retryLane);
      break;
    case 19:
      l = e.stateNode;
      break;
    case 22:
      l = e.stateNode._retryCache;
      break;
    default:
      throw Error(N(314));
  }
  (l !== null && l.delete(t), V2(e, a));
}
function c4(e, t) {
  return ir(e, t);
}
var Nu = null,
  gl = null,
  Us = !1,
  Eu = !1,
  Hc = !1,
  xa = 0;
function Yt(e) {
  (e !== gl &&
    e.next === null &&
    (gl === null ? (Nu = gl = e) : (gl = gl.next = e)),
    (Eu = !0),
    Us || ((Us = !0), r4()));
}
function mi(e, t) {
  if (!Hc && Eu) {
    Hc = !0;
    do
      for (var a = !1, l = Nu; l !== null; ) {
        if (e !== 0) {
          var n = l.pendingLanes;
          if (n === 0) var i = 0;
          else {
            var u = l.suspendedLanes,
              s = l.pingedLanes;
            ((i = (1 << (31 - ft(42 | e) + 1)) - 1),
              (i &= n & ~(u & ~s)),
              (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0));
          }
          i !== 0 && ((a = !0), gf(l, i));
        } else
          ((i = $),
            (i = $u(
              l,
              l === ie ? i : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
            )),
            !(i & 3) || ci(l, i) || ((a = !0), gf(l, i)));
        l = l.next;
      }
    while (a);
    Hc = !1;
  }
}
function s4() {
  $2();
}
function $2() {
  Eu = Us = !1;
  var e = 0;
  xa !== 0 && _4() && (e = xa);
  for (var t = rt(), a = null, l = Nu; l !== null; ) {
    var n = l.next,
      i = G2(l, t);
    (i === 0
      ? ((l.next = null),
        a === null ? (Nu = n) : (a.next = n),
        n === null && (gl = a))
      : ((a = l), (e !== 0 || i & 3) && (Eu = !0)),
      (l = n));
  }
  ((Ce !== 0 && Ce !== 5) || mi(e), xa !== 0 && (xa = 0));
}
function G2(e, t) {
  for (
    var a = e.suspendedLanes,
      l = e.pingedLanes,
      n = e.expirationTimes,
      i = e.pendingLanes & -62914561;
    0 < i;
  ) {
    var u = 31 - ft(i),
      s = 1 << u,
      r = n[u];
    (r === -1
      ? (!(s & a) || s & l) && (n[u] = Lm(s, t))
      : r <= t && (e.expiredLanes |= s),
      (i &= ~s));
  }
  if (
    ((t = ie),
    (a = $),
    (a = $u(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
    )),
    (l = e.callbackNode),
    a === 0 ||
      (e === t && (F === 2 || F === 9)) ||
      e.cancelPendingCommit !== null)
  )
    return (
      l !== null && l !== null && dc(l),
      (e.callbackNode = null),
      (e.callbackPriority = 0)
    );
  if (!(a & 3) || ci(e, a)) {
    if (((t = a & -a), t === e.callbackPriority)) return t;
    switch ((l !== null && dc(l), cr(a))) {
      case 2:
      case 8:
        a = Td;
        break;
      case 32:
        a = uu;
        break;
      case 268435456:
        a = Md;
        break;
      default:
        a = uu;
    }
    return (
      (l = X2.bind(null, e)),
      (a = ir(a, l)),
      (e.callbackPriority = t),
      (e.callbackNode = a),
      t
    );
  }
  return (
    l !== null && l !== null && dc(l),
    (e.callbackPriority = 2),
    (e.callbackNode = null),
    2
  );
}
function X2(e, t) {
  if (Ce !== 0 && Ce !== 5)
    return ((e.callbackNode = null), (e.callbackPriority = 0), null);
  var a = e.callbackNode;
  if (ac() && e.callbackNode !== a) return null;
  var l = $;
  return (
    (l = $u(
      e,
      e === ie ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
    )),
    l === 0
      ? null
      : (z2(e, l, t),
        G2(e, rt()),
        e.callbackNode != null && e.callbackNode === a
          ? X2.bind(null, e)
          : null)
  );
}
function gf(e, t) {
  if (ac()) return null;
  z2(e, t, !0);
}
function r4() {
  S4(function () {
    k & 6 ? ir(zd, s4) : $2();
  });
}
function Qr() {
  if (xa === 0) {
    var e = Yl;
    (e === 0 && ((e = xi), (xi <<= 1), !(xi & 261888) && (xi = 256)), (xa = e));
  }
  return xa;
}
function yf(e) {
  return e == null || typeof e == "symbol" || typeof e == "boolean"
    ? null
    : typeof e == "function"
      ? e
      : Vi("" + e);
}
function _f(e, t) {
  var a = t.ownerDocument.createElement("input");
  return (
    (a.name = t.name),
    (a.value = t.value),
    e.id && a.setAttribute("form", e.id),
    t.parentNode.insertBefore(a, t),
    (e = new FormData(e)),
    a.parentNode.removeChild(a),
    e
  );
}
function o4(e, t, a, l, n) {
  if (t === "submit" && a && a.stateNode === n) {
    var i = yf((n[et] || null).action),
      u = l.submitter;
    u &&
      ((t = (t = u[et] || null)
        ? yf(t.formAction)
        : u.getAttribute("formAction")),
      t !== null && ((i = t), (u = null)));
    var s = new Gu("action", "action", null, l, n);
    e.push({
      event: s,
      listeners: [
        {
          instance: null,
          listener: function () {
            if (l.defaultPrevented) {
              if (xa !== 0) {
                var r = u ? _f(n, u) : new FormData(n);
                As(
                  a,
                  { pending: !0, data: r, method: n.method, action: i },
                  null,
                  r,
                );
              }
            } else
              typeof i == "function" &&
                (s.preventDefault(),
                (r = u ? _f(n, u) : new FormData(n)),
                As(
                  a,
                  { pending: !0, data: r, method: n.method, action: i },
                  i,
                  r,
                ));
          },
          currentTarget: n,
        },
      ],
    });
  }
}
for (var qc = 0; qc < ms.length; qc++) {
  var Yc = ms[qc],
    f4 = Yc.toLowerCase(),
    d4 = Yc[0].toUpperCase() + Yc.slice(1);
  Mt(f4, "on" + d4);
}
Mt(a1, "onAnimationEnd");
Mt(l1, "onAnimationIteration");
Mt(n1, "onAnimationStart");
Mt("dblclick", "onDoubleClick");
Mt("focusin", "onFocus");
Mt("focusout", "onBlur");
Mt(C0, "onTransitionRun");
Mt(z0, "onTransitionStart");
Mt(T0, "onTransitionCancel");
Mt(i1, "onTransitionEnd");
Hl("onMouseEnter", ["mouseout", "mouseover"]);
Hl("onMouseLeave", ["mouseout", "mouseover"]);
Hl("onPointerEnter", ["pointerout", "pointerover"]);
Hl("onPointerLeave", ["pointerout", "pointerover"]);
ul(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
ul(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
ul("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ul(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
ul(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
ul(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var In =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  h4 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle"
      .split(" ")
      .concat(In),
  );
function Q2(e, t) {
  t = (t & 4) !== 0;
  for (var a = 0; a < e.length; a++) {
    var l = e[a],
      n = l.event;
    l = l.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var u = l.length - 1; 0 <= u; u--) {
          var s = l[u],
            r = s.instance,
            o = s.currentTarget;
          if (((s = s.listener), r !== i && n.isPropagationStopped())) break e;
          ((i = s), (n.currentTarget = o));
          try {
            i(n);
          } catch (f) {
            su(f);
          }
          ((n.currentTarget = null), (i = r));
        }
      else
        for (u = 0; u < l.length; u++) {
          if (
            ((s = l[u]),
            (r = s.instance),
            (o = s.currentTarget),
            (s = s.listener),
            r !== i && n.isPropagationStopped())
          )
            break e;
          ((i = s), (n.currentTarget = o));
          try {
            i(n);
          } catch (f) {
            su(f);
          }
          ((n.currentTarget = null), (i = r));
        }
    }
  }
}
function Y(e, t) {
  var a = t[us];
  a === void 0 && (a = t[us] = new Set());
  var l = e + "__bubble";
  a.has(l) || (Z2(t, e, 2, !1), a.add(l));
}
function Vc(e, t, a) {
  var l = 0;
  (t && (l |= 4), Z2(a, e, l, t));
}
var Ri = "_reactListening" + Math.random().toString(36).slice(2);
function Zr(e) {
  if (!e[Ri]) {
    ((e[Ri] = !0),
      Bd.forEach(function (a) {
        a !== "selectionchange" && (h4.has(a) || Vc(a, !1, e), Vc(a, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ri] || ((t[Ri] = !0), Vc("selectionchange", !1, t));
  }
}
function Z2(e, t, a, l) {
  switch (ih(t)) {
    case 2:
      var n = V4;
      break;
    case 8:
      n = $4;
      break;
    default:
      n = Fr;
  }
  ((a = n.bind(null, t, a, e)),
    (n = void 0),
    !fs ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (n = !0),
    l
      ? n !== void 0
        ? e.addEventListener(t, a, { capture: !0, passive: n })
        : e.addEventListener(t, a, !0)
      : n !== void 0
        ? e.addEventListener(t, a, { passive: n })
        : e.addEventListener(t, a, !1));
}
function $c(e, t, a, l, n) {
  var i = l;
  if (!(t & 1) && !(t & 2) && l !== null)
    e: for (;;) {
      if (l === null) return;
      var u = l.tag;
      if (u === 3 || u === 4) {
        var s = l.stateNode.containerInfo;
        if (s === n) break;
        if (u === 4)
          for (u = l.return; u !== null; ) {
            var r = u.tag;
            if ((r === 3 || r === 4) && u.stateNode.containerInfo === n) return;
            u = u.return;
          }
        for (; s !== null; ) {
          if (((u = bl(s)), u === null)) return;
          if (((r = u.tag), r === 5 || r === 6 || r === 26 || r === 27)) {
            l = i = u;
            continue e;
          }
          s = s.parentNode;
        }
      }
      l = l.return;
    }
  Qd(function () {
    var o = i,
      f = or(a),
      p = [];
    e: {
      var h = u1.get(e);
      if (h !== void 0) {
        var v = Gu,
          S = e;
        switch (e) {
          case "keypress":
            if (Gi(a) === 0) break e;
          case "keydown":
          case "keyup":
            v = u0;
            break;
          case "focusin":
            ((S = "focus"), (v = gc));
            break;
          case "focusout":
            ((S = "blur"), (v = gc));
            break;
          case "beforeblur":
          case "afterblur":
            v = gc;
            break;
          case "click":
            if (a.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Ao;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Km;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = r0;
            break;
          case a1:
          case l1:
          case n1:
            v = Wm;
            break;
          case i1:
            v = f0;
            break;
          case "scroll":
          case "scrollend":
            v = Zm;
            break;
          case "wheel":
            v = h0;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Im;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Co;
            break;
          case "toggle":
          case "beforetoggle":
            v = p0;
        }
        var b = (t & 4) !== 0,
          x = !b && (e === "scroll" || e === "scrollend"),
          d = b ? (h !== null ? h + "Capture" : null) : h;
        b = [];
        for (var m = o, y; m !== null; ) {
          var _ = m;
          if (
            ((y = _.stateNode),
            (_ = _.tag),
            (_ !== 5 && _ !== 26 && _ !== 27) ||
              y === null ||
              d === null ||
              ((_ = Qn(m, d)), _ != null && b.push(ei(m, _, y))),
            x)
          )
            break;
          m = m.return;
        }
        0 < b.length &&
          ((h = new v(h, S, null, a, f)), p.push({ event: h, listeners: b }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === "mouseover" || e === "pointerover"),
          (v = e === "mouseout" || e === "pointerout"),
          h &&
            a !== os &&
            (S = a.relatedTarget || a.fromElement) &&
            (bl(S) || S[Pl]))
        )
          break e;
        if (
          (v || h) &&
          ((h =
            f.window === f
              ? f
              : (h = f.ownerDocument)
                ? h.defaultView || h.parentWindow
                : window),
          v
            ? ((S = a.relatedTarget || a.toElement),
              (v = o),
              (S = S ? bl(S) : null),
              S !== null &&
                ((x = ii(S)),
                (b = S.tag),
                S !== x || (b !== 5 && b !== 27 && b !== 6)) &&
                (S = null))
            : ((v = null), (S = o)),
          v !== S)
        ) {
          if (
            ((b = Ao),
            (_ = "onMouseLeave"),
            (d = "onMouseEnter"),
            (m = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((b = Co),
              (_ = "onPointerLeave"),
              (d = "onPointerEnter"),
              (m = "pointer")),
            (x = v == null ? h : jn(v)),
            (y = S == null ? h : jn(S)),
            (h = new b(_, m + "leave", v, a, f)),
            (h.target = x),
            (h.relatedTarget = y),
            (_ = null),
            bl(f) === o &&
              ((b = new b(d, m + "enter", S, a, f)),
              (b.target = y),
              (b.relatedTarget = x),
              (_ = b)),
            (x = _),
            v && S)
          )
            t: {
              for (b = m4, d = v, m = S, y = 0, _ = d; _; _ = b(_)) y++;
              _ = 0;
              for (var E = m; E; E = b(E)) _++;
              for (; 0 < y - _; ) ((d = b(d)), y--);
              for (; 0 < _ - y; ) ((m = b(m)), _--);
              for (; y--; ) {
                if (d === m || (m !== null && d === m.alternate)) {
                  b = d;
                  break t;
                }
                ((d = b(d)), (m = b(m)));
              }
              b = null;
            }
          else b = null;
          (v !== null && bf(p, h, v, b, !1),
            S !== null && x !== null && bf(p, x, S, b, !0));
        }
      }
      e: {
        if (
          ((h = o ? jn(o) : window),
          (v = h.nodeName && h.nodeName.toLowerCase()),
          v === "select" || (v === "input" && h.type === "file"))
        )
          var C = Ro;
        else if (Mo(h))
          if (Wd) C = j0;
          else {
            C = N0;
            var w = x0;
          }
        else
          ((v = h.nodeName),
            !v ||
            v.toLowerCase() !== "input" ||
            (h.type !== "checkbox" && h.type !== "radio")
              ? o && rr(o.elementType) && (C = Ro)
              : (C = E0));
        if (C && (C = C(e, o))) {
          Fd(p, C, a, f);
          break e;
        }
        (w && w(e, h, o),
          e === "focusout" &&
            o &&
            h.type === "number" &&
            o.memoizedProps.value != null &&
            rs(h, "number", h.value));
      }
      switch (((w = o ? jn(o) : window), e)) {
        case "focusin":
          (Mo(w) || w.contentEditable === "true") &&
            ((Nl = w), (ds = o), (Rn = null));
          break;
        case "focusout":
          Rn = ds = Nl = null;
          break;
        case "mousedown":
          hs = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((hs = !1), Bo(p, a, f));
          break;
        case "selectionchange":
          if (w0) break;
        case "keydown":
        case "keyup":
          Bo(p, a, f);
      }
      var j;
      if (hr)
        e: {
          switch (e) {
            case "compositionstart":
              var z = "onCompositionStart";
              break e;
            case "compositionend":
              z = "onCompositionEnd";
              break e;
            case "compositionupdate":
              z = "onCompositionUpdate";
              break e;
          }
          z = void 0;
        }
      else
        xl
          ? Kd(e, a) && (z = "onCompositionEnd")
          : e === "keydown" && a.keyCode === 229 && (z = "onCompositionStart");
      (z &&
        (kd &&
          a.locale !== "ko" &&
          (xl || z !== "onCompositionStart"
            ? z === "onCompositionEnd" && xl && (j = Zd())
            : ((_a = f),
              (fr = "value" in _a ? _a.value : _a.textContent),
              (xl = !0))),
        (w = ju(o, z)),
        0 < w.length &&
          ((z = new wo(z, e, null, a, f)),
          p.push({ event: z, listeners: w }),
          j ? (z.data = j) : ((j = Jd(a)), j !== null && (z.data = j)))),
        (j = g0 ? y0(e, a) : _0(e, a)) &&
          ((z = ju(o, "onBeforeInput")),
          0 < z.length &&
            ((w = new wo("onBeforeInput", "beforeinput", null, a, f)),
            p.push({ event: w, listeners: z }),
            (w.data = j))),
        o4(p, e, o, a, f));
    }
    Q2(p, t);
  });
}
function ei(e, t, a) {
  return { instance: e, listener: t, currentTarget: a };
}
function ju(e, t) {
  for (var a = t + "Capture", l = []; e !== null; ) {
    var n = e,
      i = n.stateNode;
    if (
      ((n = n.tag),
      (n !== 5 && n !== 26 && n !== 27) ||
        i === null ||
        ((n = Qn(e, a)),
        n != null && l.unshift(ei(e, n, i)),
        (n = Qn(e, t)),
        n != null && l.push(ei(e, n, i))),
      e.tag === 3)
    )
      return l;
    e = e.return;
  }
  return [];
}
function m4(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5 && e.tag !== 27);
  return e || null;
}
function bf(e, t, a, l, n) {
  for (var i = t._reactName, u = []; a !== null && a !== l; ) {
    var s = a,
      r = s.alternate,
      o = s.stateNode;
    if (((s = s.tag), r !== null && r === l)) break;
    ((s !== 5 && s !== 26 && s !== 27) ||
      o === null ||
      ((r = o),
      n
        ? ((o = Qn(a, i)), o != null && u.unshift(ei(a, o, r)))
        : n || ((o = Qn(a, i)), o != null && u.push(ei(a, o, r)))),
      (a = a.return));
  }
  u.length !== 0 && e.push({ event: t, listeners: u });
}
var p4 = /\r\n?/g,
  v4 = /\u0000|\uFFFD/g;
function Sf(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      p4,
      `
`,
    )
    .replace(v4, "");
}
function k2(e, t) {
  return ((t = Sf(t)), Sf(e) === t);
}
function ee(e, t, a, l, n, i) {
  switch (a) {
    case "children":
      typeof l == "string"
        ? t === "body" || (t === "textarea" && l === "") || ql(e, l)
        : (typeof l == "number" || typeof l == "bigint") &&
          t !== "body" &&
          ql(e, "" + l);
      break;
    case "className":
      ji(e, "class", l);
      break;
    case "tabIndex":
      ji(e, "tabindex", l);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      ji(e, a, l);
      break;
    case "style":
      Xd(e, l, i);
      break;
    case "data":
      if (t !== "object") {
        ji(e, "data", l);
        break;
      }
    case "src":
    case "href":
      if (l === "" && (t !== "a" || a !== "href")) {
        e.removeAttribute(a);
        break;
      }
      if (
        l == null ||
        typeof l == "function" ||
        typeof l == "symbol" ||
        typeof l == "boolean"
      ) {
        e.removeAttribute(a);
        break;
      }
      ((l = Vi("" + l)), e.setAttribute(a, l));
      break;
    case "action":
    case "formAction":
      if (typeof l == "function") {
        e.setAttribute(
          a,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
        );
        break;
      } else
        typeof i == "function" &&
          (a === "formAction"
            ? (t !== "input" && ee(e, t, "name", n.name, n, null),
              ee(e, t, "formEncType", n.formEncType, n, null),
              ee(e, t, "formMethod", n.formMethod, n, null),
              ee(e, t, "formTarget", n.formTarget, n, null))
            : (ee(e, t, "encType", n.encType, n, null),
              ee(e, t, "method", n.method, n, null),
              ee(e, t, "target", n.target, n, null)));
      if (l == null || typeof l == "symbol" || typeof l == "boolean") {
        e.removeAttribute(a);
        break;
      }
      ((l = Vi("" + l)), e.setAttribute(a, l));
      break;
    case "onClick":
      l != null && (e.onclick = Pt);
      break;
    case "onScroll":
      l != null && Y("scroll", e);
      break;
    case "onScrollEnd":
      l != null && Y("scrollend", e);
      break;
    case "dangerouslySetInnerHTML":
      if (l != null) {
        if (typeof l != "object" || !("__html" in l)) throw Error(N(61));
        if (((a = l.__html), a != null)) {
          if (n.children != null) throw Error(N(60));
          e.innerHTML = a;
        }
      }
      break;
    case "multiple":
      e.multiple = l && typeof l != "function" && typeof l != "symbol";
      break;
    case "muted":
      e.muted = l && typeof l != "function" && typeof l != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (
        l == null ||
        typeof l == "function" ||
        typeof l == "boolean" ||
        typeof l == "symbol"
      ) {
        e.removeAttribute("xlink:href");
        break;
      }
      ((a = Vi("" + l)),
        e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      l != null && typeof l != "function" && typeof l != "symbol"
        ? e.setAttribute(a, "" + l)
        : e.removeAttribute(a);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      l && typeof l != "function" && typeof l != "symbol"
        ? e.setAttribute(a, "")
        : e.removeAttribute(a);
      break;
    case "capture":
    case "download":
      l === !0
        ? e.setAttribute(a, "")
        : l !== !1 &&
            l != null &&
            typeof l != "function" &&
            typeof l != "symbol"
          ? e.setAttribute(a, l)
          : e.removeAttribute(a);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      l != null &&
      typeof l != "function" &&
      typeof l != "symbol" &&
      !isNaN(l) &&
      1 <= l
        ? e.setAttribute(a, l)
        : e.removeAttribute(a);
      break;
    case "rowSpan":
    case "start":
      l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
        ? e.removeAttribute(a)
        : e.setAttribute(a, l);
      break;
    case "popover":
      (Y("beforetoggle", e), Y("toggle", e), Yi(e, "popover", l));
      break;
    case "xlinkActuate":
      $t(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
      break;
    case "xlinkArcrole":
      $t(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
      break;
    case "xlinkRole":
      $t(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
      break;
    case "xlinkShow":
      $t(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
      break;
    case "xlinkTitle":
      $t(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
      break;
    case "xlinkType":
      $t(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
      break;
    case "xmlBase":
      $t(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
      break;
    case "xmlLang":
      $t(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
      break;
    case "xmlSpace":
      $t(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
      break;
    case "is":
      Yi(e, "is", l);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < a.length) ||
        (a[0] !== "o" && a[0] !== "O") ||
        (a[1] !== "n" && a[1] !== "N")) &&
        ((a = Xm.get(a) || a), Yi(e, a, l));
  }
}
function Bs(e, t, a, l, n, i) {
  switch (a) {
    case "style":
      Xd(e, l, i);
      break;
    case "dangerouslySetInnerHTML":
      if (l != null) {
        if (typeof l != "object" || !("__html" in l)) throw Error(N(61));
        if (((a = l.__html), a != null)) {
          if (n.children != null) throw Error(N(60));
          e.innerHTML = a;
        }
      }
      break;
    case "children":
      typeof l == "string"
        ? ql(e, l)
        : (typeof l == "number" || typeof l == "bigint") && ql(e, "" + l);
      break;
    case "onScroll":
      l != null && Y("scroll", e);
      break;
    case "onScrollEnd":
      l != null && Y("scrollend", e);
      break;
    case "onClick":
      l != null && (e.onclick = Pt);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!Hd.hasOwnProperty(a))
        e: {
          if (
            a[0] === "o" &&
            a[1] === "n" &&
            ((n = a.endsWith("Capture")),
            (t = a.slice(2, n ? a.length - 7 : void 0)),
            (i = e[et] || null),
            (i = i != null ? i[a] : null),
            typeof i == "function" && e.removeEventListener(t, i, n),
            typeof l == "function")
          ) {
            (typeof i != "function" &&
              i !== null &&
              (a in e
                ? (e[a] = null)
                : e.hasAttribute(a) && e.removeAttribute(a)),
              e.addEventListener(t, l, n));
            break e;
          }
          a in e ? (e[a] = l) : l === !0 ? e.setAttribute(a, "") : Yi(e, a, l);
        }
  }
}
function Ye(e, t, a) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      (Y("error", e), Y("load", e));
      var l = !1,
        n = !1,
        i;
      for (i in a)
        if (a.hasOwnProperty(i)) {
          var u = a[i];
          if (u != null)
            switch (i) {
              case "src":
                l = !0;
                break;
              case "srcSet":
                n = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(N(137, t));
              default:
                ee(e, t, i, u, a, null);
            }
        }
      (n && ee(e, t, "srcSet", a.srcSet, a, null),
        l && ee(e, t, "src", a.src, a, null));
      return;
    case "input":
      Y("invalid", e);
      var s = (i = u = n = null),
        r = null,
        o = null;
      for (l in a)
        if (a.hasOwnProperty(l)) {
          var f = a[l];
          if (f != null)
            switch (l) {
              case "name":
                n = f;
                break;
              case "type":
                u = f;
                break;
              case "checked":
                r = f;
                break;
              case "defaultChecked":
                o = f;
                break;
              case "value":
                i = f;
                break;
              case "defaultValue":
                s = f;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(N(137, t));
                break;
              default:
                ee(e, t, l, f, a, null);
            }
        }
      Vd(e, i, s, r, o, u, n, !1);
      return;
    case "select":
      (Y("invalid", e), (l = u = i = null));
      for (n in a)
        if (a.hasOwnProperty(n) && ((s = a[n]), s != null))
          switch (n) {
            case "value":
              i = s;
              break;
            case "defaultValue":
              u = s;
              break;
            case "multiple":
              l = s;
            default:
              ee(e, t, n, s, a, null);
          }
      ((t = i),
        (a = u),
        (e.multiple = !!l),
        t != null ? Ml(e, !!l, t, !1) : a != null && Ml(e, !!l, a, !0));
      return;
    case "textarea":
      (Y("invalid", e), (i = n = l = null));
      for (u in a)
        if (a.hasOwnProperty(u) && ((s = a[u]), s != null))
          switch (u) {
            case "value":
              l = s;
              break;
            case "defaultValue":
              n = s;
              break;
            case "children":
              i = s;
              break;
            case "dangerouslySetInnerHTML":
              if (s != null) throw Error(N(91));
              break;
            default:
              ee(e, t, u, s, a, null);
          }
      Gd(e, l, n, i);
      return;
    case "option":
      for (r in a)
        if (a.hasOwnProperty(r) && ((l = a[r]), l != null))
          switch (r) {
            case "selected":
              e.selected = l && typeof l != "function" && typeof l != "symbol";
              break;
            default:
              ee(e, t, r, l, a, null);
          }
      return;
    case "dialog":
      (Y("beforetoggle", e), Y("toggle", e), Y("cancel", e), Y("close", e));
      break;
    case "iframe":
    case "object":
      Y("load", e);
      break;
    case "video":
    case "audio":
      for (l = 0; l < In.length; l++) Y(In[l], e);
      break;
    case "image":
      (Y("error", e), Y("load", e));
      break;
    case "details":
      Y("toggle", e);
      break;
    case "embed":
    case "source":
    case "link":
      (Y("error", e), Y("load", e));
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (o in a)
        if (a.hasOwnProperty(o) && ((l = a[o]), l != null))
          switch (o) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(N(137, t));
            default:
              ee(e, t, o, l, a, null);
          }
      return;
    default:
      if (rr(t)) {
        for (f in a)
          a.hasOwnProperty(f) &&
            ((l = a[f]), l !== void 0 && Bs(e, t, f, l, a, void 0));
        return;
      }
  }
  for (s in a)
    a.hasOwnProperty(s) && ((l = a[s]), l != null && ee(e, t, s, l, a, null));
}
function g4(e, t, a, l) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var n = null,
        i = null,
        u = null,
        s = null,
        r = null,
        o = null,
        f = null;
      for (v in a) {
        var p = a[v];
        if (a.hasOwnProperty(v) && p != null)
          switch (v) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              r = p;
            default:
              l.hasOwnProperty(v) || ee(e, t, v, null, l, p);
          }
      }
      for (var h in l) {
        var v = l[h];
        if (((p = a[h]), l.hasOwnProperty(h) && (v != null || p != null)))
          switch (h) {
            case "type":
              i = v;
              break;
            case "name":
              n = v;
              break;
            case "checked":
              o = v;
              break;
            case "defaultChecked":
              f = v;
              break;
            case "value":
              u = v;
              break;
            case "defaultValue":
              s = v;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (v != null) throw Error(N(137, t));
              break;
            default:
              v !== p && ee(e, t, h, v, l, p);
          }
      }
      ss(e, u, s, r, o, f, i, n);
      return;
    case "select":
      v = u = s = h = null;
      for (i in a)
        if (((r = a[i]), a.hasOwnProperty(i) && r != null))
          switch (i) {
            case "value":
              break;
            case "multiple":
              v = r;
            default:
              l.hasOwnProperty(i) || ee(e, t, i, null, l, r);
          }
      for (n in l)
        if (
          ((i = l[n]),
          (r = a[n]),
          l.hasOwnProperty(n) && (i != null || r != null))
        )
          switch (n) {
            case "value":
              h = i;
              break;
            case "defaultValue":
              s = i;
              break;
            case "multiple":
              u = i;
            default:
              i !== r && ee(e, t, n, i, l, r);
          }
      ((t = s),
        (a = u),
        (l = v),
        h != null
          ? Ml(e, !!a, h, !1)
          : !!l != !!a &&
            (t != null ? Ml(e, !!a, t, !0) : Ml(e, !!a, a ? [] : "", !1)));
      return;
    case "textarea":
      v = h = null;
      for (s in a)
        if (
          ((n = a[s]), a.hasOwnProperty(s) && n != null && !l.hasOwnProperty(s))
        )
          switch (s) {
            case "value":
              break;
            case "children":
              break;
            default:
              ee(e, t, s, null, l, n);
          }
      for (u in l)
        if (
          ((n = l[u]),
          (i = a[u]),
          l.hasOwnProperty(u) && (n != null || i != null))
        )
          switch (u) {
            case "value":
              h = n;
              break;
            case "defaultValue":
              v = n;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (n != null) throw Error(N(91));
              break;
            default:
              n !== i && ee(e, t, u, n, l, i);
          }
      $d(e, h, v);
      return;
    case "option":
      for (var S in a)
        if (
          ((h = a[S]), a.hasOwnProperty(S) && h != null && !l.hasOwnProperty(S))
        )
          switch (S) {
            case "selected":
              e.selected = !1;
              break;
            default:
              ee(e, t, S, null, l, h);
          }
      for (r in l)
        if (
          ((h = l[r]),
          (v = a[r]),
          l.hasOwnProperty(r) && h !== v && (h != null || v != null))
        )
          switch (r) {
            case "selected":
              e.selected = h && typeof h != "function" && typeof h != "symbol";
              break;
            default:
              ee(e, t, r, h, l, v);
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var b in a)
        ((h = a[b]),
          a.hasOwnProperty(b) &&
            h != null &&
            !l.hasOwnProperty(b) &&
            ee(e, t, b, null, l, h));
      for (o in l)
        if (
          ((h = l[o]),
          (v = a[o]),
          l.hasOwnProperty(o) && h !== v && (h != null || v != null))
        )
          switch (o) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (h != null) throw Error(N(137, t));
              break;
            default:
              ee(e, t, o, h, l, v);
          }
      return;
    default:
      if (rr(t)) {
        for (var x in a)
          ((h = a[x]),
            a.hasOwnProperty(x) &&
              h !== void 0 &&
              !l.hasOwnProperty(x) &&
              Bs(e, t, x, void 0, l, h));
        for (f in l)
          ((h = l[f]),
            (v = a[f]),
            !l.hasOwnProperty(f) ||
              h === v ||
              (h === void 0 && v === void 0) ||
              Bs(e, t, f, h, l, v));
        return;
      }
  }
  for (var d in a)
    ((h = a[d]),
      a.hasOwnProperty(d) &&
        h != null &&
        !l.hasOwnProperty(d) &&
        ee(e, t, d, null, l, h));
  for (p in l)
    ((h = l[p]),
      (v = a[p]),
      !l.hasOwnProperty(p) ||
        h === v ||
        (h == null && v == null) ||
        ee(e, t, p, h, l, v));
}
function xf(e) {
  switch (e) {
    case "css":
    case "script":
    case "font":
    case "img":
    case "image":
    case "input":
    case "link":
      return !0;
    default:
      return !1;
  }
}
function y4() {
  if (typeof performance.getEntriesByType == "function") {
    for (
      var e = 0, t = 0, a = performance.getEntriesByType("resource"), l = 0;
      l < a.length;
      l++
    ) {
      var n = a[l],
        i = n.transferSize,
        u = n.initiatorType,
        s = n.duration;
      if (i && s && xf(u)) {
        for (u = 0, s = n.responseEnd, l += 1; l < a.length; l++) {
          var r = a[l],
            o = r.startTime;
          if (o > s) break;
          var f = r.transferSize,
            p = r.initiatorType;
          f &&
            xf(p) &&
            ((r = r.responseEnd), (u += f * (r < s ? 1 : (s - o) / (r - o))));
        }
        if ((--l, (t += (8 * (i + u)) / (n.duration / 1e3)), e++, 10 < e))
          break;
      }
    }
    if (0 < e) return t / e / 1e6;
  }
  return navigator.connection &&
    ((e = navigator.connection.downlink), typeof e == "number")
    ? e
    : 5;
}
var Hs = null,
  qs = null;
function Au(e) {
  return e.nodeType === 9 ? e : e.ownerDocument;
}
function Nf(e) {
  switch (e) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function K2(e, t) {
  if (e === 0)
    switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return e === 1 && t === "foreignObject" ? 0 : e;
}
function Ys(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    typeof t.children == "bigint" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Gc = null;
function _4() {
  var e = window.event;
  return e && e.type === "popstate"
    ? e === Gc
      ? !1
      : ((Gc = e), !0)
    : ((Gc = null), !1);
}
var J2 = typeof setTimeout == "function" ? setTimeout : void 0,
  b4 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Ef = typeof Promise == "function" ? Promise : void 0,
  S4 =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Ef < "u"
        ? function (e) {
            return Ef.resolve(null).then(e).catch(x4);
          }
        : J2;
function x4(e) {
  setTimeout(function () {
    throw e;
  });
}
function Ya(e) {
  return e === "head";
}
function jf(e, t) {
  var a = t,
    l = 0;
  do {
    var n = a.nextSibling;
    if ((e.removeChild(a), n && n.nodeType === 8))
      if (((a = n.data), a === "/$" || a === "/&")) {
        if (l === 0) {
          (e.removeChild(n), kl(t));
          return;
        }
        l--;
      } else if (
        a === "$" ||
        a === "$?" ||
        a === "$~" ||
        a === "$!" ||
        a === "&"
      )
        l++;
      else if (a === "html") $n(e.ownerDocument.documentElement);
      else if (a === "head") {
        ((a = e.ownerDocument.head), $n(a));
        for (var i = a.firstChild; i; ) {
          var u = i.nextSibling,
            s = i.nodeName;
          (i[ri] ||
            s === "SCRIPT" ||
            s === "STYLE" ||
            (s === "LINK" && i.rel.toLowerCase() === "stylesheet") ||
            a.removeChild(i),
            (i = u));
        }
      } else a === "body" && $n(e.ownerDocument.body);
    a = n;
  } while (a);
  kl(t);
}
function Af(e, t) {
  var a = e;
  e = 0;
  do {
    var l = a.nextSibling;
    if (
      (a.nodeType === 1
        ? t
          ? ((a._stashedDisplay = a.style.display), (a.style.display = "none"))
          : ((a.style.display = a._stashedDisplay || ""),
            a.getAttribute("style") === "" && a.removeAttribute("style"))
        : a.nodeType === 3 &&
          (t
            ? ((a._stashedText = a.nodeValue), (a.nodeValue = ""))
            : (a.nodeValue = a._stashedText || "")),
      l && l.nodeType === 8)
    )
      if (((a = l.data), a === "/$")) {
        if (e === 0) break;
        e--;
      } else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || e++;
    a = l;
  } while (a);
}
function Vs(e) {
  var t = e.firstChild;
  for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
    var a = t;
    switch (((t = t.nextSibling), a.nodeName)) {
      case "HTML":
      case "HEAD":
      case "BODY":
        (Vs(a), sr(a));
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (a.rel.toLowerCase() === "stylesheet") continue;
    }
    e.removeChild(a);
  }
}
function N4(e, t, a, l) {
  for (; e.nodeType === 1; ) {
    var n = a;
    if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
      if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
    } else if (l) {
      if (!e[ri])
        switch (t) {
          case "meta":
            if (!e.hasAttribute("itemprop")) break;
            return e;
          case "link":
            if (
              ((i = e.getAttribute("rel")),
              i === "stylesheet" && e.hasAttribute("data-precedence"))
            )
              break;
            if (
              i !== n.rel ||
              e.getAttribute("href") !==
                (n.href == null || n.href === "" ? null : n.href) ||
              e.getAttribute("crossorigin") !==
                (n.crossOrigin == null ? null : n.crossOrigin) ||
              e.getAttribute("title") !== (n.title == null ? null : n.title)
            )
              break;
            return e;
          case "style":
            if (e.hasAttribute("data-precedence")) break;
            return e;
          case "script":
            if (
              ((i = e.getAttribute("src")),
              (i !== (n.src == null ? null : n.src) ||
                e.getAttribute("type") !== (n.type == null ? null : n.type) ||
                e.getAttribute("crossorigin") !==
                  (n.crossOrigin == null ? null : n.crossOrigin)) &&
                i &&
                e.hasAttribute("async") &&
                !e.hasAttribute("itemprop"))
            )
              break;
            return e;
          default:
            return e;
        }
    } else if (t === "input" && e.type === "hidden") {
      var i = n.name == null ? null : "" + n.name;
      if (n.type === "hidden" && e.getAttribute("name") === i) return e;
    } else return e;
    if (((e = Et(e.nextSibling)), e === null)) break;
  }
  return null;
}
function E4(e, t, a) {
  if (t === "") return null;
  for (; e.nodeType !== 3; )
    if (
      ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
        !a) ||
      ((e = Et(e.nextSibling)), e === null)
    )
      return null;
  return e;
}
function F2(e, t) {
  for (; e.nodeType !== 8; )
    if (
      ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
        !t) ||
      ((e = Et(e.nextSibling)), e === null)
    )
      return null;
  return e;
}
function $s(e) {
  return e.data === "$?" || e.data === "$~";
}
function Gs(e) {
  return (
    e.data === "$!" ||
    (e.data === "$?" && e.ownerDocument.readyState !== "loading")
  );
}
function j4(e, t) {
  var a = e.ownerDocument;
  if (e.data === "$~") e._reactRetry = t;
  else if (e.data !== "$?" || a.readyState !== "loading") t();
  else {
    var l = function () {
      (t(), a.removeEventListener("DOMContentLoaded", l));
    };
    (a.addEventListener("DOMContentLoaded", l), (e._reactRetry = l));
  }
}
function Et(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (
        ((t = e.data),
        t === "$" ||
          t === "$!" ||
          t === "$?" ||
          t === "$~" ||
          t === "&" ||
          t === "F!" ||
          t === "F")
      )
        break;
      if (t === "/$" || t === "/&") return null;
    }
  }
  return e;
}
var Xs = null;
function wf(e) {
  e = e.nextSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var a = e.data;
      if (a === "/$" || a === "/&") {
        if (t === 0) return Et(e.nextSibling);
        t--;
      } else
        (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") ||
          t++;
    }
    e = e.nextSibling;
  }
  return null;
}
function Cf(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var a = e.data;
      if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
        if (t === 0) return e;
        t--;
      } else (a !== "/$" && a !== "/&") || t++;
    }
    e = e.previousSibling;
  }
  return null;
}
function W2(e, t, a) {
  switch (((t = Au(a)), e)) {
    case "html":
      if (((e = t.documentElement), !e)) throw Error(N(452));
      return e;
    case "head":
      if (((e = t.head), !e)) throw Error(N(453));
      return e;
    case "body":
      if (((e = t.body), !e)) throw Error(N(454));
      return e;
    default:
      throw Error(N(451));
  }
}
function $n(e) {
  for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
  sr(e);
}
var jt = new Map(),
  zf = new Set();
function wu(e) {
  return typeof e.getRootNode == "function"
    ? e.getRootNode()
    : e.nodeType === 9
      ? e
      : e.ownerDocument;
}
var ra = K.d;
K.d = { f: A4, r: w4, D: C4, C: z4, L: T4, m: M4, X: O4, S: R4, M: D4 };
function A4() {
  var e = ra.f(),
    t = ec();
  return e || t;
}
function w4(e) {
  var t = Il(e);
  t !== null && t.tag === 5 && t.type === "form" ? X1(t) : ra.r(e);
}
var ln = typeof document > "u" ? null : document;
function P2(e, t, a) {
  var l = ln;
  if (l && typeof t == "string" && t) {
    var n = bt(t);
    ((n = 'link[rel="' + e + '"][href="' + n + '"]'),
      typeof a == "string" && (n += '[crossorigin="' + a + '"]'),
      zf.has(n) ||
        (zf.add(n),
        (e = { rel: e, crossOrigin: a, href: t }),
        l.querySelector(n) === null &&
          ((t = l.createElement("link")),
          Ye(t, "link", e),
          Oe(t),
          l.head.appendChild(t))));
  }
}
function C4(e) {
  (ra.D(e), P2("dns-prefetch", e, null));
}
function z4(e, t) {
  (ra.C(e, t), P2("preconnect", e, t));
}
function T4(e, t, a) {
  ra.L(e, t, a);
  var l = ln;
  if (l && e && t) {
    var n = 'link[rel="preload"][as="' + bt(t) + '"]';
    t === "image" && a && a.imageSrcSet
      ? ((n += '[imagesrcset="' + bt(a.imageSrcSet) + '"]'),
        typeof a.imageSizes == "string" &&
          (n += '[imagesizes="' + bt(a.imageSizes) + '"]'))
      : (n += '[href="' + bt(e) + '"]');
    var i = n;
    switch (t) {
      case "style":
        i = Zl(e);
        break;
      case "script":
        i = nn(e);
    }
    jt.has(i) ||
      ((e = he(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t,
        },
        a,
      )),
      jt.set(i, e),
      l.querySelector(n) !== null ||
        (t === "style" && l.querySelector(pi(i))) ||
        (t === "script" && l.querySelector(vi(i))) ||
        ((t = l.createElement("link")),
        Ye(t, "link", e),
        Oe(t),
        l.head.appendChild(t)));
  }
}
function M4(e, t) {
  ra.m(e, t);
  var a = ln;
  if (a && e) {
    var l = t && typeof t.as == "string" ? t.as : "script",
      n = 'link[rel="modulepreload"][as="' + bt(l) + '"][href="' + bt(e) + '"]',
      i = n;
    switch (l) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        i = nn(e);
    }
    if (
      !jt.has(i) &&
      ((e = he({ rel: "modulepreload", href: e }, t)),
      jt.set(i, e),
      a.querySelector(n) === null)
    ) {
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (a.querySelector(vi(i))) return;
      }
      ((l = a.createElement("link")),
        Ye(l, "link", e),
        Oe(l),
        a.head.appendChild(l));
    }
  }
}
function R4(e, t, a) {
  ra.S(e, t, a);
  var l = ln;
  if (l && e) {
    var n = Tl(l).hoistableStyles,
      i = Zl(e);
    t = t || "default";
    var u = n.get(i);
    if (!u) {
      var s = { loading: 0, preload: null };
      if ((u = l.querySelector(pi(i)))) s.loading = 5;
      else {
        ((e = he({ rel: "stylesheet", href: e, "data-precedence": t }, a)),
          (a = jt.get(i)) && kr(e, a));
        var r = (u = l.createElement("link"));
        (Oe(r),
          Ye(r, "link", e),
          (r._p = new Promise(function (o, f) {
            ((r.onload = o), (r.onerror = f));
          })),
          r.addEventListener("load", function () {
            s.loading |= 1;
          }),
          r.addEventListener("error", function () {
            s.loading |= 2;
          }),
          (s.loading |= 4),
          Wi(u, t, l));
      }
      ((u = { type: "stylesheet", instance: u, count: 1, state: s }),
        n.set(i, u));
    }
  }
}
function O4(e, t) {
  ra.X(e, t);
  var a = ln;
  if (a && e) {
    var l = Tl(a).hoistableScripts,
      n = nn(e),
      i = l.get(n);
    i ||
      ((i = a.querySelector(vi(n))),
      i ||
        ((e = he({ src: e, async: !0 }, t)),
        (t = jt.get(n)) && Kr(e, t),
        (i = a.createElement("script")),
        Oe(i),
        Ye(i, "link", e),
        a.head.appendChild(i)),
      (i = { type: "script", instance: i, count: 1, state: null }),
      l.set(n, i));
  }
}
function D4(e, t) {
  ra.M(e, t);
  var a = ln;
  if (a && e) {
    var l = Tl(a).hoistableScripts,
      n = nn(e),
      i = l.get(n);
    i ||
      ((i = a.querySelector(vi(n))),
      i ||
        ((e = he({ src: e, async: !0, type: "module" }, t)),
        (t = jt.get(n)) && Kr(e, t),
        (i = a.createElement("script")),
        Oe(i),
        Ye(i, "link", e),
        a.head.appendChild(i)),
      (i = { type: "script", instance: i, count: 1, state: null }),
      l.set(n, i));
  }
}
function Tf(e, t, a, l) {
  var n = (n = Ea.current) ? wu(n) : null;
  if (!n) throw Error(N(446));
  switch (e) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof a.precedence == "string" && typeof a.href == "string"
        ? ((t = Zl(a.href)),
          (a = Tl(n).hoistableStyles),
          (l = a.get(t)),
          l ||
            ((l = { type: "style", instance: null, count: 0, state: null }),
            a.set(t, l)),
          l)
        : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (
        a.rel === "stylesheet" &&
        typeof a.href == "string" &&
        typeof a.precedence == "string"
      ) {
        e = Zl(a.href);
        var i = Tl(n).hoistableStyles,
          u = i.get(e);
        if (
          (u ||
            ((n = n.ownerDocument || n),
            (u = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null },
            }),
            i.set(e, u),
            (i = n.querySelector(pi(e))) &&
              !i._p &&
              ((u.instance = i), (u.state.loading = 5)),
            jt.has(e) ||
              ((a = {
                rel: "preload",
                as: "style",
                href: a.href,
                crossOrigin: a.crossOrigin,
                integrity: a.integrity,
                media: a.media,
                hrefLang: a.hrefLang,
                referrerPolicy: a.referrerPolicy,
              }),
              jt.set(e, a),
              i || L4(n, e, a, u.state))),
          t && l === null)
        )
          throw Error(N(528, ""));
        return u;
      }
      if (t && l !== null) throw Error(N(529, ""));
      return null;
    case "script":
      return (
        (t = a.async),
        (a = a.src),
        typeof a == "string" &&
        t &&
        typeof t != "function" &&
        typeof t != "symbol"
          ? ((t = nn(a)),
            (a = Tl(n).hoistableScripts),
            (l = a.get(t)),
            l ||
              ((l = { type: "script", instance: null, count: 0, state: null }),
              a.set(t, l)),
            l)
          : { type: "void", instance: null, count: 0, state: null }
      );
    default:
      throw Error(N(444, e));
  }
}
function Zl(e) {
  return 'href="' + bt(e) + '"';
}
function pi(e) {
  return 'link[rel="stylesheet"][' + e + "]";
}
function I2(e) {
  return he({}, e, { "data-precedence": e.precedence, precedence: null });
}
function L4(e, t, a, l) {
  e.querySelector('link[rel="preload"][as="style"][' + t + "]")
    ? (l.loading = 1)
    : ((t = e.createElement("link")),
      (l.preload = t),
      t.addEventListener("load", function () {
        return (l.loading |= 1);
      }),
      t.addEventListener("error", function () {
        return (l.loading |= 2);
      }),
      Ye(t, "link", a),
      Oe(t),
      e.head.appendChild(t));
}
function nn(e) {
  return '[src="' + bt(e) + '"]';
}
function vi(e) {
  return "script[async]" + e;
}
function Mf(e, t, a) {
  if ((t.count++, t.instance === null))
    switch (t.type) {
      case "style":
        var l = e.querySelector('style[data-href~="' + bt(a.href) + '"]');
        if (l) return ((t.instance = l), Oe(l), l);
        var n = he({}, a, {
          "data-href": a.href,
          "data-precedence": a.precedence,
          href: null,
          precedence: null,
        });
        return (
          (l = (e.ownerDocument || e).createElement("style")),
          Oe(l),
          Ye(l, "style", n),
          Wi(l, a.precedence, e),
          (t.instance = l)
        );
      case "stylesheet":
        n = Zl(a.href);
        var i = e.querySelector(pi(n));
        if (i) return ((t.state.loading |= 4), (t.instance = i), Oe(i), i);
        ((l = I2(a)),
          (n = jt.get(n)) && kr(l, n),
          (i = (e.ownerDocument || e).createElement("link")),
          Oe(i));
        var u = i;
        return (
          (u._p = new Promise(function (s, r) {
            ((u.onload = s), (u.onerror = r));
          })),
          Ye(i, "link", l),
          (t.state.loading |= 4),
          Wi(i, a.precedence, e),
          (t.instance = i)
        );
      case "script":
        return (
          (i = nn(a.src)),
          (n = e.querySelector(vi(i)))
            ? ((t.instance = n), Oe(n), n)
            : ((l = a),
              (n = jt.get(i)) && ((l = he({}, a)), Kr(l, n)),
              (e = e.ownerDocument || e),
              (n = e.createElement("script")),
              Oe(n),
              Ye(n, "link", l),
              e.head.appendChild(n),
              (t.instance = n))
        );
      case "void":
        return null;
      default:
        throw Error(N(443, t.type));
    }
  else
    t.type === "stylesheet" &&
      !(t.state.loading & 4) &&
      ((l = t.instance), (t.state.loading |= 4), Wi(l, a.precedence, e));
  return t.instance;
}
function Wi(e, t, a) {
  for (
    var l = a.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]',
      ),
      n = l.length ? l[l.length - 1] : null,
      i = n,
      u = 0;
    u < l.length;
    u++
  ) {
    var s = l[u];
    if (s.dataset.precedence === t) i = s;
    else if (i !== n) break;
  }
  i
    ? i.parentNode.insertBefore(e, i.nextSibling)
    : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
}
function kr(e, t) {
  (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
    e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
    e.title == null && (e.title = t.title));
}
function Kr(e, t) {
  (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
    e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
    e.integrity == null && (e.integrity = t.integrity));
}
var Pi = null;
function Rf(e, t, a) {
  if (Pi === null) {
    var l = new Map(),
      n = (Pi = new Map());
    n.set(a, l);
  } else ((n = Pi), (l = n.get(a)), l || ((l = new Map()), n.set(a, l)));
  if (l.has(e)) return l;
  for (
    l.set(e, null), a = a.getElementsByTagName(e), n = 0;
    n < a.length;
    n++
  ) {
    var i = a[n];
    if (
      !(
        i[ri] ||
        i[Be] ||
        (e === "link" && i.getAttribute("rel") === "stylesheet")
      ) &&
      i.namespaceURI !== "http://www.w3.org/2000/svg"
    ) {
      var u = i.getAttribute(t) || "";
      u = e + u;
      var s = l.get(u);
      s ? s.push(i) : l.set(u, [i]);
    }
  }
  return l;
}
function Of(e, t, a) {
  ((e = e.ownerDocument || e),
    e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null,
    ));
}
function U4(e, t, a) {
  if (a === 1 || t.itemProp != null) return !1;
  switch (e) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (
        typeof t.precedence != "string" ||
        typeof t.href != "string" ||
        t.href === ""
      )
        break;
      return !0;
    case "link":
      if (
        typeof t.rel != "string" ||
        typeof t.href != "string" ||
        t.href === "" ||
        t.onLoad ||
        t.onError
      )
        break;
      switch (t.rel) {
        case "stylesheet":
          return (
            (e = t.disabled),
            typeof t.precedence == "string" && e == null
          );
        default:
          return !0;
      }
    case "script":
      if (
        t.async &&
        typeof t.async != "function" &&
        typeof t.async != "symbol" &&
        !t.onLoad &&
        !t.onError &&
        t.src &&
        typeof t.src == "string"
      )
        return !0;
  }
  return !1;
}
function eh(e) {
  return !(e.type === "stylesheet" && !(e.state.loading & 3));
}
function B4(e, t, a, l) {
  if (
    a.type === "stylesheet" &&
    (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
    !(a.state.loading & 4)
  ) {
    if (a.instance === null) {
      var n = Zl(l.href),
        i = t.querySelector(pi(n));
      if (i) {
        ((t = i._p),
          t !== null &&
            typeof t == "object" &&
            typeof t.then == "function" &&
            (e.count++, (e = Cu.bind(e)), t.then(e, e)),
          (a.state.loading |= 4),
          (a.instance = i),
          Oe(i));
        return;
      }
      ((i = t.ownerDocument || t),
        (l = I2(l)),
        (n = jt.get(n)) && kr(l, n),
        (i = i.createElement("link")),
        Oe(i));
      var u = i;
      ((u._p = new Promise(function (s, r) {
        ((u.onload = s), (u.onerror = r));
      })),
        Ye(i, "link", l),
        (a.instance = i));
    }
    (e.stylesheets === null && (e.stylesheets = new Map()),
      e.stylesheets.set(a, t),
      (t = a.state.preload) &&
        !(a.state.loading & 3) &&
        (e.count++,
        (a = Cu.bind(e)),
        t.addEventListener("load", a),
        t.addEventListener("error", a)));
  }
}
var Xc = 0;
function H4(e, t) {
  return (
    e.stylesheets && e.count === 0 && Ii(e, e.stylesheets),
    0 < e.count || 0 < e.imgCount
      ? function (a) {
          var l = setTimeout(function () {
            if ((e.stylesheets && Ii(e, e.stylesheets), e.unsuspend)) {
              var i = e.unsuspend;
              ((e.unsuspend = null), i());
            }
          }, 6e4 + t);
          0 < e.imgBytes && Xc === 0 && (Xc = 62500 * y4());
          var n = setTimeout(
            function () {
              if (
                ((e.waitingForImages = !1),
                e.count === 0 &&
                  (e.stylesheets && Ii(e, e.stylesheets), e.unsuspend))
              ) {
                var i = e.unsuspend;
                ((e.unsuspend = null), i());
              }
            },
            (e.imgBytes > Xc ? 50 : 800) + t,
          );
          return (
            (e.unsuspend = a),
            function () {
              ((e.unsuspend = null), clearTimeout(l), clearTimeout(n));
            }
          );
        }
      : null
  );
}
function Cu() {
  if (
    (this.count--,
    this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
  ) {
    if (this.stylesheets) Ii(this, this.stylesheets);
    else if (this.unsuspend) {
      var e = this.unsuspend;
      ((this.unsuspend = null), e());
    }
  }
}
var zu = null;
function Ii(e, t) {
  ((e.stylesheets = null),
    e.unsuspend !== null &&
      (e.count++, (zu = new Map()), t.forEach(q4, e), (zu = null), Cu.call(e)));
}
function q4(e, t) {
  if (!(t.state.loading & 4)) {
    var a = zu.get(e);
    if (a) var l = a.get(null);
    else {
      ((a = new Map()), zu.set(e, a));
      for (
        var n = e.querySelectorAll(
            "link[data-precedence],style[data-precedence]",
          ),
          i = 0;
        i < n.length;
        i++
      ) {
        var u = n[i];
        (u.nodeName === "LINK" || u.getAttribute("media") !== "not all") &&
          (a.set(u.dataset.precedence, u), (l = u));
      }
      l && a.set(null, l);
    }
    ((n = t.instance),
      (u = n.getAttribute("data-precedence")),
      (i = a.get(u) || l),
      i === l && a.set(null, n),
      a.set(u, n),
      this.count++,
      (l = Cu.bind(this)),
      n.addEventListener("load", l),
      n.addEventListener("error", l),
      i
        ? i.parentNode.insertBefore(n, i.nextSibling)
        : ((e = e.nodeType === 9 ? e.head : e),
          e.insertBefore(n, e.firstChild)),
      (t.state.loading |= 4));
  }
}
var ti = {
  $$typeof: Wt,
  Provider: null,
  Consumer: null,
  _currentValue: Ja,
  _currentValue2: Ja,
  _threadCount: 0,
};
function Y4(e, t, a, l, n, i, u, s, r) {
  ((this.tag = 1),
    (this.containerInfo = e),
    (this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode =
      this.next =
      this.pendingContext =
      this.context =
      this.cancelPendingCommit =
        null),
    (this.callbackPriority = 0),
    (this.expirationTimes = hc(-1)),
    (this.entangledLanes =
      this.shellSuspendCounter =
      this.errorRecoveryDisabledLanes =
      this.expiredLanes =
      this.warmLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = hc(0)),
    (this.hiddenUpdates = hc(null)),
    (this.identifierPrefix = l),
    (this.onUncaughtError = n),
    (this.onCaughtError = i),
    (this.onRecoverableError = u),
    (this.pooledCache = null),
    (this.pooledCacheLanes = 0),
    (this.formState = r),
    (this.incompleteTransitions = new Map()));
}
function th(e, t, a, l, n, i, u, s, r, o, f, p) {
  return (
    (e = new Y4(e, t, a, u, r, o, f, p, s)),
    (t = 1),
    i === !0 && (t |= 24),
    (i = ct(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (t = br()),
    t.refCount++,
    (e.pooledCache = t),
    t.refCount++,
    (i.memoizedState = { element: l, isDehydrated: a, cache: t }),
    Nr(i),
    e
  );
}
function ah(e) {
  return e ? ((e = Al), e) : Al;
}
function lh(e, t, a, l, n, i) {
  ((n = ah(n)),
    l.context === null ? (l.context = n) : (l.pendingContext = n),
    (l = Aa(t)),
    (l.payload = { element: a }),
    (i = i === void 0 ? null : i),
    i !== null && (l.callback = i),
    (a = wa(e, l, t)),
    a !== null && (Ie(a, e, t), Dn(a, e, t)));
}
function Df(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var a = e.retryLane;
    e.retryLane = a !== 0 && a < t ? a : t;
  }
}
function Jr(e, t) {
  (Df(e, t), (e = e.alternate) && Df(e, t));
}
function nh(e) {
  if (e.tag === 13 || e.tag === 31) {
    var t = rl(e, 67108864);
    (t !== null && Ie(t, e, 67108864), Jr(e, 67108864));
  }
}
function Lf(e) {
  if (e.tag === 13 || e.tag === 31) {
    var t = dt();
    t = ur(t);
    var a = rl(e, t);
    (a !== null && Ie(a, e, t), Jr(e, t));
  }
}
var Tu = !0;
function V4(e, t, a, l) {
  var n = U.T;
  U.T = null;
  var i = K.p;
  try {
    ((K.p = 2), Fr(e, t, a, l));
  } finally {
    ((K.p = i), (U.T = n));
  }
}
function $4(e, t, a, l) {
  var n = U.T;
  U.T = null;
  var i = K.p;
  try {
    ((K.p = 8), Fr(e, t, a, l));
  } finally {
    ((K.p = i), (U.T = n));
  }
}
function Fr(e, t, a, l) {
  if (Tu) {
    var n = Qs(l);
    if (n === null) ($c(e, t, l, Mu, a), Uf(e, l));
    else if (X4(n, e, t, a, l)) l.stopPropagation();
    else if ((Uf(e, l), t & 4 && -1 < G4.indexOf(e))) {
      for (; n !== null; ) {
        var i = Il(n);
        if (i !== null)
          switch (i.tag) {
            case 3:
              if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                var u = Za(i.pendingLanes);
                if (u !== 0) {
                  var s = i;
                  for (s.pendingLanes |= 2, s.entangledLanes |= 2; u; ) {
                    var r = 1 << (31 - ft(u));
                    ((s.entanglements[1] |= r), (u &= ~r));
                  }
                  (Yt(i), !(k & 6) && ((bu = rt() + 500), mi(0)));
                }
              }
              break;
            case 31:
            case 13:
              ((s = rl(i, 2)), s !== null && Ie(s, i, 2), ec(), Jr(i, 2));
          }
        if (((i = Qs(l)), i === null && $c(e, t, l, Mu, a), i === n)) break;
        n = i;
      }
      n !== null && l.stopPropagation();
    } else $c(e, t, l, null, a);
  }
}
function Qs(e) {
  return ((e = or(e)), Wr(e));
}
var Mu = null;
function Wr(e) {
  if (((Mu = null), (e = bl(e)), e !== null)) {
    var t = ii(e);
    if (t === null) e = null;
    else {
      var a = t.tag;
      if (a === 13) {
        if (((e = Ed(t)), e !== null)) return e;
        e = null;
      } else if (a === 31) {
        if (((e = jd(t)), e !== null)) return e;
        e = null;
      } else if (a === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    }
  }
  return ((Mu = e), null);
}
function ih(e) {
  switch (e) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (Cm()) {
        case zd:
          return 2;
        case Td:
          return 8;
        case uu:
        case zm:
          return 32;
        case Md:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var Zs = !1,
  Ta = null,
  Ma = null,
  Ra = null,
  ai = new Map(),
  li = new Map(),
  ga = [],
  G4 =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " ",
    );
function Uf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Ta = null;
      break;
    case "dragenter":
    case "dragleave":
      Ma = null;
      break;
    case "mouseover":
    case "mouseout":
      Ra = null;
      break;
    case "pointerover":
    case "pointerout":
      ai.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      li.delete(t.pointerId);
  }
}
function vn(e, t, a, l, n, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: l,
        nativeEvent: i,
        targetContainers: [n],
      }),
      t !== null && ((t = Il(t)), t !== null && nh(t)),
      e)
    : ((e.eventSystemFlags |= l),
      (t = e.targetContainers),
      n !== null && t.indexOf(n) === -1 && t.push(n),
      e);
}
function X4(e, t, a, l, n) {
  switch (t) {
    case "focusin":
      return ((Ta = vn(Ta, e, t, a, l, n)), !0);
    case "dragenter":
      return ((Ma = vn(Ma, e, t, a, l, n)), !0);
    case "mouseover":
      return ((Ra = vn(Ra, e, t, a, l, n)), !0);
    case "pointerover":
      var i = n.pointerId;
      return (ai.set(i, vn(ai.get(i) || null, e, t, a, l, n)), !0);
    case "gotpointercapture":
      return (
        (i = n.pointerId),
        li.set(i, vn(li.get(i) || null, e, t, a, l, n)),
        !0
      );
  }
  return !1;
}
function uh(e) {
  var t = bl(e.target);
  if (t !== null) {
    var a = ii(t);
    if (a !== null) {
      if (((t = a.tag), t === 13)) {
        if (((t = Ed(a)), t !== null)) {
          ((e.blockedOn = t),
            _o(e.priority, function () {
              Lf(a);
            }));
          return;
        }
      } else if (t === 31) {
        if (((t = jd(a)), t !== null)) {
          ((e.blockedOn = t),
            _o(e.priority, function () {
              Lf(a);
            }));
          return;
        }
      } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function eu(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var a = Qs(e.nativeEvent);
    if (a === null) {
      a = e.nativeEvent;
      var l = new a.constructor(a.type, a);
      ((os = l), a.target.dispatchEvent(l), (os = null));
    } else return ((t = Il(a)), t !== null && nh(t), (e.blockedOn = a), !1);
    t.shift();
  }
  return !0;
}
function Bf(e, t, a) {
  eu(e) && a.delete(t);
}
function Q4() {
  ((Zs = !1),
    Ta !== null && eu(Ta) && (Ta = null),
    Ma !== null && eu(Ma) && (Ma = null),
    Ra !== null && eu(Ra) && (Ra = null),
    ai.forEach(Bf),
    li.forEach(Bf));
}
function Oi(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Zs ||
      ((Zs = !0),
      ze.unstable_scheduleCallback(ze.unstable_NormalPriority, Q4)));
}
var Di = null;
function Hf(e) {
  Di !== e &&
    ((Di = e),
    ze.unstable_scheduleCallback(ze.unstable_NormalPriority, function () {
      Di === e && (Di = null);
      for (var t = 0; t < e.length; t += 3) {
        var a = e[t],
          l = e[t + 1],
          n = e[t + 2];
        if (typeof l != "function") {
          if (Wr(l || a) === null) continue;
          break;
        }
        var i = Il(a);
        i !== null &&
          (e.splice(t, 3),
          (t -= 3),
          As(i, { pending: !0, data: n, method: a.method, action: l }, l, n));
      }
    }));
}
function kl(e) {
  function t(r) {
    return Oi(r, e);
  }
  (Ta !== null && Oi(Ta, e),
    Ma !== null && Oi(Ma, e),
    Ra !== null && Oi(Ra, e),
    ai.forEach(t),
    li.forEach(t));
  for (var a = 0; a < ga.length; a++) {
    var l = ga[a];
    l.blockedOn === e && (l.blockedOn = null);
  }
  for (; 0 < ga.length && ((a = ga[0]), a.blockedOn === null); )
    (uh(a), a.blockedOn === null && ga.shift());
  if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
    for (l = 0; l < a.length; l += 3) {
      var n = a[l],
        i = a[l + 1],
        u = n[et] || null;
      if (typeof i == "function") u || Hf(a);
      else if (u) {
        var s = null;
        if (i && i.hasAttribute("formAction")) {
          if (((n = i), (u = i[et] || null))) s = u.formAction;
          else if (Wr(n) !== null) continue;
        } else s = u.action;
        (typeof s == "function" ? (a[l + 1] = s) : (a.splice(l, 3), (l -= 3)),
          Hf(a));
      }
    }
}
function ch() {
  function e(i) {
    i.canIntercept &&
      i.info === "react-transition" &&
      i.intercept({
        handler: function () {
          return new Promise(function (u) {
            return (n = u);
          });
        },
        focusReset: "manual",
        scroll: "manual",
      });
  }
  function t() {
    (n !== null && (n(), (n = null)), l || setTimeout(a, 20));
  }
  function a() {
    if (!l && !navigation.transition) {
      var i = navigation.currentEntry;
      i &&
        i.url != null &&
        navigation.navigate(i.url, {
          state: i.getState(),
          info: "react-transition",
          history: "replace",
        });
    }
  }
  if (typeof navigation == "object") {
    var l = !1,
      n = null;
    return (
      navigation.addEventListener("navigate", e),
      navigation.addEventListener("navigatesuccess", t),
      navigation.addEventListener("navigateerror", t),
      setTimeout(a, 100),
      function () {
        ((l = !0),
          navigation.removeEventListener("navigate", e),
          navigation.removeEventListener("navigatesuccess", t),
          navigation.removeEventListener("navigateerror", t),
          n !== null && (n(), (n = null)));
      }
    );
  }
}
function Pr(e) {
  this._internalRoot = e;
}
lc.prototype.render = Pr.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  var a = t.current,
    l = dt();
  lh(a, l, e, t, null, null);
};
lc.prototype.unmount = Pr.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (lh(e.current, 2, null, e, null, null), ec(), (t[Pl] = null));
  }
};
function lc(e) {
  this._internalRoot = e;
}
lc.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Ud();
    e = { blockedOn: null, target: e, priority: t };
    for (var a = 0; a < ga.length && t !== 0 && t < ga[a].priority; a++);
    (ga.splice(a, 0, e), a === 0 && uh(e));
  }
};
var qf = xd.version;
if (qf !== "19.2.4") throw Error(N(527, qf, "19.2.4"));
K.findDOMNode = function (e) {
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(N(188))
      : ((e = Object.keys(e).join(",")), Error(N(268, e)));
  return (
    (e = Sm(t)),
    (e = e !== null ? Ad(e) : null),
    (e = e === null ? null : e.stateNode),
    e
  );
};
var Z4 = {
  bundleType: 0,
  version: "19.2.4",
  rendererPackageName: "react-dom",
  currentDispatcherRef: U,
  reconcilerVersion: "19.2.4",
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Li = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Li.isDisabled && Li.supportsFiber)
    try {
      ((ui = Li.inject(Z4)), (ot = Li));
    } catch {}
}
Yu.createRoot = function (e, t) {
  if (!Nd(e)) throw Error(N(299));
  var a = !1,
    l = "",
    n = P1,
    i = I1,
    u = e2;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (a = !0),
      t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
      t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
      t.onCaughtError !== void 0 && (i = t.onCaughtError),
      t.onRecoverableError !== void 0 && (u = t.onRecoverableError)),
    (t = th(e, 1, !1, null, null, a, l, null, n, i, u, ch)),
    (e[Pl] = t.current),
    Zr(e),
    new Pr(t)
  );
};
Yu.hydrateRoot = function (e, t, a) {
  if (!Nd(e)) throw Error(N(299));
  var l = !1,
    n = "",
    i = P1,
    u = I1,
    s = e2,
    r = null;
  return (
    a != null &&
      (a.unstable_strictMode === !0 && (l = !0),
      a.identifierPrefix !== void 0 && (n = a.identifierPrefix),
      a.onUncaughtError !== void 0 && (i = a.onUncaughtError),
      a.onCaughtError !== void 0 && (u = a.onCaughtError),
      a.onRecoverableError !== void 0 && (s = a.onRecoverableError),
      a.formState !== void 0 && (r = a.formState)),
    (t = th(e, 1, !0, t, a ?? null, l, n, r, i, u, s, ch)),
    (t.context = ah(null)),
    (a = t.current),
    (l = dt()),
    (l = ur(l)),
    (n = Aa(l)),
    (n.callback = null),
    wa(a, n, l),
    (a = l),
    (t.current.lanes = a),
    si(t, a),
    Yt(t),
    (e[Pl] = t.current),
    Zr(e),
    new lc(t)
  );
};
Yu.version = "19.2.4";
function sh() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sh);
    } catch (e) {
      console.error(e);
    }
}
(sh(), (vd.exports = Yu));
var k4 = vd.exports;
const K4 = ud(k4);
/**
 * react-router v7.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Yf = "popstate";
function Vf(e) {
  return (
    typeof e == "object" &&
    e != null &&
    "pathname" in e &&
    "search" in e &&
    "hash" in e &&
    "state" in e &&
    "key" in e
  );
}
function J4(e = {}) {
  function t(l, n) {
    var o;
    let i = (o = n.state) == null ? void 0 : o.masked,
      { pathname: u, search: s, hash: r } = i || l.location;
    return ks(
      "",
      { pathname: u, search: s, hash: r },
      (n.state && n.state.usr) || null,
      (n.state && n.state.key) || "default",
      i
        ? {
            pathname: l.location.pathname,
            search: l.location.search,
            hash: l.location.hash,
          }
        : void 0,
    );
  }
  function a(l, n) {
    return typeof n == "string" ? n : ni(n);
  }
  return W4(t, a, null, e);
}
function pe(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Tt(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function F4() {
  return Math.random().toString(36).substring(2, 10);
}
function $f(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
    masked: e.unstable_mask
      ? { pathname: e.pathname, search: e.search, hash: e.hash }
      : void 0,
  };
}
function ks(e, t, a = null, l, n) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof t == "string" ? un(t) : t),
    state: a,
    key: (t && t.key) || l || F4(),
    unstable_mask: n,
  };
}
function ni({ pathname: e = "/", search: t = "", hash: a = "" }) {
  return (
    t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t),
    a && a !== "#" && (e += a.charAt(0) === "#" ? a : "#" + a),
    e
  );
}
function un(e) {
  let t = {};
  if (e) {
    let a = e.indexOf("#");
    a >= 0 && ((t.hash = e.substring(a)), (e = e.substring(0, a)));
    let l = e.indexOf("?");
    (l >= 0 && ((t.search = e.substring(l)), (e = e.substring(0, l))),
      e && (t.pathname = e));
  }
  return t;
}
function W4(e, t, a, l = {}) {
  let { window: n = document.defaultView, v5Compat: i = !1 } = l,
    u = n.history,
    s = "POP",
    r = null,
    o = f();
  o == null && ((o = 0), u.replaceState({ ...u.state, idx: o }, ""));
  function f() {
    return (u.state || { idx: null }).idx;
  }
  function p() {
    s = "POP";
    let x = f(),
      d = x == null ? null : x - o;
    ((o = x), r && r({ action: s, location: b.location, delta: d }));
  }
  function h(x, d) {
    s = "PUSH";
    let m = Vf(x) ? x : ks(b.location, x, d);
    o = f() + 1;
    let y = $f(m, o),
      _ = b.createHref(m.unstable_mask || m);
    try {
      u.pushState(y, "", _);
    } catch (E) {
      if (E instanceof DOMException && E.name === "DataCloneError") throw E;
      n.location.assign(_);
    }
    i && r && r({ action: s, location: b.location, delta: 1 });
  }
  function v(x, d) {
    s = "REPLACE";
    let m = Vf(x) ? x : ks(b.location, x, d);
    o = f();
    let y = $f(m, o),
      _ = b.createHref(m.unstable_mask || m);
    (u.replaceState(y, "", _),
      i && r && r({ action: s, location: b.location, delta: 0 }));
  }
  function S(x) {
    return P4(x);
  }
  let b = {
    get action() {
      return s;
    },
    get location() {
      return e(n, u);
    },
    listen(x) {
      if (r) throw new Error("A history only accepts one active listener");
      return (
        n.addEventListener(Yf, p),
        (r = x),
        () => {
          (n.removeEventListener(Yf, p), (r = null));
        }
      );
    },
    createHref(x) {
      return t(n, x);
    },
    createURL: S,
    encodeLocation(x) {
      let d = S(x);
      return { pathname: d.pathname, search: d.search, hash: d.hash };
    },
    push: h,
    replace: v,
    go(x) {
      return u.go(x);
    },
  };
  return b;
}
function P4(e, t = !1) {
  let a = "http://localhost";
  (typeof window < "u" &&
    (a =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    pe(a, "No window.location.(origin|href) available to create URL"));
  let l = typeof e == "string" ? e : ni(e);
  return (
    (l = l.replace(/ $/, "%20")),
    !t && l.startsWith("//") && (l = a + l),
    new URL(l, a)
  );
}
function rh(e, t, a = "/") {
  return I4(e, t, a, !1);
}
function I4(e, t, a, l) {
  let n = typeof t == "string" ? un(t) : t,
    i = sa(n.pathname || "/", a);
  if (i == null) return null;
  let u = oh(e);
  e3(u);
  let s = null;
  for (let r = 0; s == null && r < u.length; ++r) {
    let o = f3(i);
    s = r3(u[r], o, l);
  }
  return s;
}
function oh(e, t = [], a = [], l = "", n = !1) {
  let i = (u, s, r = n, o) => {
    let f = {
      relativePath: o === void 0 ? u.path || "" : o,
      caseSensitive: u.caseSensitive === !0,
      childrenIndex: s,
      route: u,
    };
    if (f.relativePath.startsWith("/")) {
      if (!f.relativePath.startsWith(l) && r) return;
      (pe(
        f.relativePath.startsWith(l),
        `Absolute route path "${f.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (f.relativePath = f.relativePath.slice(l.length)));
    }
    let p = Ht([l, f.relativePath]),
      h = a.concat(f);
    (u.children &&
      u.children.length > 0 &&
      (pe(
        u.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${p}".`,
      ),
      oh(u.children, t, h, p, r)),
      !(u.path == null && !u.index) &&
        t.push({ path: p, score: c3(p, u.index), routesMeta: h }));
  };
  return (
    e.forEach((u, s) => {
      var r;
      if (u.path === "" || !((r = u.path) != null && r.includes("?"))) i(u, s);
      else for (let o of fh(u.path)) i(u, s, !0, o);
    }),
    t
  );
}
function fh(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [a, ...l] = t,
    n = a.endsWith("?"),
    i = a.replace(/\?$/, "");
  if (l.length === 0) return n ? [i, ""] : [i];
  let u = fh(l.join("/")),
    s = [];
  return (
    s.push(...u.map((r) => (r === "" ? i : [i, r].join("/")))),
    n && s.push(...u),
    s.map((r) => (e.startsWith("/") && r === "" ? "/" : r))
  );
}
function e3(e) {
  e.sort((t, a) =>
    t.score !== a.score
      ? a.score - t.score
      : s3(
          t.routesMeta.map((l) => l.childrenIndex),
          a.routesMeta.map((l) => l.childrenIndex),
        ),
  );
}
var t3 = /^:[\w-]+$/,
  a3 = 3,
  l3 = 2,
  n3 = 1,
  i3 = 10,
  u3 = -2,
  Gf = (e) => e === "*";
function c3(e, t) {
  let a = e.split("/"),
    l = a.length;
  return (
    a.some(Gf) && (l += u3),
    t && (l += l3),
    a
      .filter((n) => !Gf(n))
      .reduce((n, i) => n + (t3.test(i) ? a3 : i === "" ? n3 : i3), l)
  );
}
function s3(e, t) {
  return e.length === t.length && e.slice(0, -1).every((l, n) => l === t[n])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function r3(e, t, a = !1) {
  let { routesMeta: l } = e,
    n = {},
    i = "/",
    u = [];
  for (let s = 0; s < l.length; ++s) {
    let r = l[s],
      o = s === l.length - 1,
      f = i === "/" ? t : t.slice(i.length) || "/",
      p = Ru(
        { path: r.relativePath, caseSensitive: r.caseSensitive, end: o },
        f,
      ),
      h = r.route;
    if (
      (!p &&
        o &&
        a &&
        !l[l.length - 1].route.index &&
        (p = Ru(
          { path: r.relativePath, caseSensitive: r.caseSensitive, end: !1 },
          f,
        )),
      !p)
    )
      return null;
    (Object.assign(n, p.params),
      u.push({
        params: n,
        pathname: Ht([i, p.pathname]),
        pathnameBase: p3(Ht([i, p.pathnameBase])),
        route: h,
      }),
      p.pathnameBase !== "/" && (i = Ht([i, p.pathnameBase])));
  }
  return u;
}
function Ru(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [a, l] = o3(e.path, e.caseSensitive, e.end),
    n = t.match(a);
  if (!n) return null;
  let i = n[0],
    u = i.replace(/(.)\/+$/, "$1"),
    s = n.slice(1);
  return {
    params: l.reduce((o, { paramName: f, isOptional: p }, h) => {
      if (f === "*") {
        let S = s[h] || "";
        u = i.slice(0, i.length - S.length).replace(/(.)\/+$/, "$1");
      }
      const v = s[h];
      return (
        p && !v ? (o[f] = void 0) : (o[f] = (v || "").replace(/%2F/g, "/")),
        o
      );
    }, {}),
    pathname: i,
    pathnameBase: u,
    pattern: e,
  };
}
function o3(e, t = !1, a = !0) {
  Tt(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`,
  );
  let l = [],
    n =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (u, s, r, o, f) => {
          if ((l.push({ paramName: s, isOptional: r != null }), r)) {
            let p = f.charAt(o + u.length);
            return p && p !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    e.endsWith("*")
      ? (l.push({ paramName: "*" }),
        (n += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : a
        ? (n += "\\/*$")
        : e !== "" && e !== "/" && (n += "(?:(?=\\/|$))"),
    [new RegExp(n, t ? void 0 : "i"), l]
  );
}
function f3(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Tt(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    );
  }
}
function sa(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let a = t.endsWith("/") ? t.length - 1 : t.length,
    l = e.charAt(a);
  return l && l !== "/" ? null : e.slice(a) || "/";
}
var d3 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function h3(e, t = "/") {
  let {
      pathname: a,
      search: l = "",
      hash: n = "",
    } = typeof e == "string" ? un(e) : e,
    i;
  return (
    a
      ? ((a = a.replace(/\/\/+/g, "/")),
        a.startsWith("/") ? (i = Xf(a.substring(1), "/")) : (i = Xf(a, t)))
      : (i = t),
    { pathname: i, search: v3(l), hash: g3(n) }
  );
}
function Xf(e, t) {
  let a = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((n) => {
      n === ".." ? a.length > 1 && a.pop() : n !== "." && a.push(n);
    }),
    a.length > 1 ? a.join("/") : "/"
  );
}
function Qc(e, t, a, l) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(l)}].  Please separate it out to the \`to.${a}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function m3(e) {
  return e.filter(
    (t, a) => a === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function Ir(e) {
  let t = m3(e);
  return t.map((a, l) => (l === t.length - 1 ? a.pathname : a.pathnameBase));
}
function nc(e, t, a, l = !1) {
  let n;
  typeof e == "string"
    ? (n = un(e))
    : ((n = { ...e }),
      pe(
        !n.pathname || !n.pathname.includes("?"),
        Qc("?", "pathname", "search", n),
      ),
      pe(
        !n.pathname || !n.pathname.includes("#"),
        Qc("#", "pathname", "hash", n),
      ),
      pe(!n.search || !n.search.includes("#"), Qc("#", "search", "hash", n)));
  let i = e === "" || n.pathname === "",
    u = i ? "/" : n.pathname,
    s;
  if (u == null) s = a;
  else {
    let p = t.length - 1;
    if (!l && u.startsWith("..")) {
      let h = u.split("/");
      for (; h[0] === ".."; ) (h.shift(), (p -= 1));
      n.pathname = h.join("/");
    }
    s = p >= 0 ? t[p] : "/";
  }
  let r = h3(n, s),
    o = u && u !== "/" && u.endsWith("/"),
    f = (i || u === ".") && a.endsWith("/");
  return (!r.pathname.endsWith("/") && (o || f) && (r.pathname += "/"), r);
}
var Ht = (e) => e.join("/").replace(/\/\/+/g, "/"),
  p3 = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  v3 = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  g3 = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e),
  y3 = class {
    constructor(e, t, a, l = !1) {
      ((this.status = e),
        (this.statusText = t || ""),
        (this.internal = l),
        a instanceof Error
          ? ((this.data = a.toString()), (this.error = a))
          : (this.data = a));
    }
  };
function _3(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
function b3(e) {
  return (
    e
      .map((t) => t.route.path)
      .filter(Boolean)
      .join("/")
      .replace(/\/\/*/g, "/") || "/"
  );
}
var dh =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function hh(e, t) {
  let a = e;
  if (typeof a != "string" || !d3.test(a))
    return { absoluteURL: void 0, isExternal: !1, to: a };
  let l = a,
    n = !1;
  if (dh)
    try {
      let i = new URL(window.location.href),
        u = a.startsWith("//") ? new URL(i.protocol + a) : new URL(a),
        s = sa(u.pathname, t);
      u.origin === i.origin && s != null
        ? (a = s + u.search + u.hash)
        : (n = !0);
    } catch {
      Tt(
        !1,
        `<Link to="${a}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: l, isExternal: n, to: a };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var mh = ["POST", "PUT", "PATCH", "DELETE"];
new Set(mh);
var S3 = ["GET", ...mh];
new Set(S3);
var cn = g.createContext(null);
cn.displayName = "DataRouter";
var ic = g.createContext(null);
ic.displayName = "DataRouterState";
var x3 = g.createContext(!1),
  ph = g.createContext({ isTransitioning: !1 });
ph.displayName = "ViewTransition";
var N3 = g.createContext(new Map());
N3.displayName = "Fetchers";
var E3 = g.createContext(null);
E3.displayName = "Await";
var pt = g.createContext(null);
pt.displayName = "Navigation";
var gi = g.createContext(null);
gi.displayName = "Location";
var Rt = g.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Rt.displayName = "Route";
var eo = g.createContext(null);
eo.displayName = "RouteError";
var vh = "REACT_ROUTER_ERROR",
  j3 = "REDIRECT",
  A3 = "ROUTE_ERROR_RESPONSE";
function w3(e) {
  if (e.startsWith(`${vh}:${j3}:{`))
    try {
      let t = JSON.parse(e.slice(28));
      if (
        typeof t == "object" &&
        t &&
        typeof t.status == "number" &&
        typeof t.statusText == "string" &&
        typeof t.location == "string" &&
        typeof t.reloadDocument == "boolean" &&
        typeof t.replace == "boolean"
      )
        return t;
    } catch {}
}
function C3(e) {
  if (e.startsWith(`${vh}:${A3}:{`))
    try {
      let t = JSON.parse(e.slice(40));
      if (
        typeof t == "object" &&
        t &&
        typeof t.status == "number" &&
        typeof t.statusText == "string"
      )
        return new y3(t.status, t.statusText, t.data);
    } catch {}
}
function z3(e, { relative: t } = {}) {
  pe(
    sn(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: a, navigator: l } = g.useContext(pt),
    { hash: n, pathname: i, search: u } = yi(e, { relative: t }),
    s = i;
  return (
    a !== "/" && (s = i === "/" ? a : Ht([a, i])),
    l.createHref({ pathname: s, search: u, hash: n })
  );
}
function sn() {
  return g.useContext(gi) != null;
}
function at() {
  return (
    pe(
      sn(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    g.useContext(gi).location
  );
}
var gh =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function yh(e) {
  g.useContext(pt).static || g.useLayoutEffect(e);
}
function oa() {
  let { isDataRoute: e } = g.useContext(Rt);
  return e ? X3() : T3();
}
function T3() {
  pe(
    sn(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let e = g.useContext(cn),
    { basename: t, navigator: a } = g.useContext(pt),
    { matches: l } = g.useContext(Rt),
    { pathname: n } = at(),
    i = JSON.stringify(Ir(l)),
    u = g.useRef(!1);
  return (
    yh(() => {
      u.current = !0;
    }),
    g.useCallback(
      (r, o = {}) => {
        if ((Tt(u.current, gh), !u.current)) return;
        if (typeof r == "number") {
          a.go(r);
          return;
        }
        let f = nc(r, JSON.parse(i), n, o.relative === "path");
        (e == null &&
          t !== "/" &&
          (f.pathname = f.pathname === "/" ? t : Ht([t, f.pathname])),
          (o.replace ? a.replace : a.push)(f, o.state, o));
      },
      [t, a, i, n, e],
    )
  );
}
var M3 = g.createContext(null);
function R3(e) {
  let t = g.useContext(Rt).outlet;
  return g.useMemo(
    () => t && g.createElement(M3.Provider, { value: e }, t),
    [t, e],
  );
}
function yi(e, { relative: t } = {}) {
  let { matches: a } = g.useContext(Rt),
    { pathname: l } = at(),
    n = JSON.stringify(Ir(a));
  return g.useMemo(() => nc(e, JSON.parse(n), l, t === "path"), [e, n, l, t]);
}
function O3(e, t) {
  return _h(e, t);
}
function _h(e, t, a) {
  var x;
  pe(
    sn(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: l } = g.useContext(pt),
    { matches: n } = g.useContext(Rt),
    i = n[n.length - 1],
    u = i ? i.params : {},
    s = i ? i.pathname : "/",
    r = i ? i.pathnameBase : "/",
    o = i && i.route;
  {
    let d = (o && o.path) || "";
    Sh(
      s,
      !o || d.endsWith("*") || d.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${d}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${d}"> to <Route path="${d === "/" ? "*" : `${d}/*`}">.`,
    );
  }
  let f = at(),
    p;
  if (t) {
    let d = typeof t == "string" ? un(t) : t;
    (pe(
      r === "/" || ((x = d.pathname) == null ? void 0 : x.startsWith(r)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${r}" but pathname "${d.pathname}" was given in the \`location\` prop.`,
    ),
      (p = d));
  } else p = f;
  let h = p.pathname || "/",
    v = h;
  if (r !== "/") {
    let d = r.replace(/^\//, "").split("/");
    v = "/" + h.replace(/^\//, "").split("/").slice(d.length).join("/");
  }
  let S = rh(e, { pathname: v });
  (Tt(
    o || S != null,
    `No routes matched location "${p.pathname}${p.search}${p.hash}" `,
  ),
    Tt(
      S == null ||
        S[S.length - 1].route.element !== void 0 ||
        S[S.length - 1].route.Component !== void 0 ||
        S[S.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let b = H3(
    S &&
      S.map((d) =>
        Object.assign({}, d, {
          params: Object.assign({}, u, d.params),
          pathname: Ht([
            r,
            l.encodeLocation
              ? l.encodeLocation(
                  d.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23"),
                ).pathname
              : d.pathname,
          ]),
          pathnameBase:
            d.pathnameBase === "/"
              ? r
              : Ht([
                  r,
                  l.encodeLocation
                    ? l.encodeLocation(
                        d.pathnameBase
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23"),
                      ).pathname
                    : d.pathnameBase,
                ]),
        }),
      ),
    n,
    a,
  );
  return t && b
    ? g.createElement(
        gi.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              unstable_mask: void 0,
              ...p,
            },
            navigationType: "POP",
          },
        },
        b,
      )
    : b;
}
function D3() {
  let e = G3(),
    t = _3(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    a = e instanceof Error ? e.stack : null,
    l = "rgba(200,200,200, 0.5)",
    n = { padding: "0.5rem", backgroundColor: l },
    i = { padding: "2px 4px", backgroundColor: l },
    u = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (u = g.createElement(
      g.Fragment,
      null,
      g.createElement("p", null, "💿 Hey developer 👋"),
      g.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        g.createElement("code", { style: i }, "ErrorBoundary"),
        " or",
        " ",
        g.createElement("code", { style: i }, "errorElement"),
        " prop on your route.",
      ),
    )),
    g.createElement(
      g.Fragment,
      null,
      g.createElement("h2", null, "Unexpected Application Error!"),
      g.createElement("h3", { style: { fontStyle: "italic" } }, t),
      a ? g.createElement("pre", { style: n }, a) : null,
      u,
    )
  );
}
var L3 = g.createElement(D3, null),
  bh = class extends g.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      this.props.onError
        ? this.props.onError(e, t)
        : console.error(
            "React Router caught the following error during render",
            e,
          );
    }
    render() {
      let e = this.state.error;
      if (
        this.context &&
        typeof e == "object" &&
        e &&
        "digest" in e &&
        typeof e.digest == "string"
      ) {
        const a = C3(e.digest);
        a && (e = a);
      }
      let t =
        e !== void 0
          ? g.createElement(
              Rt.Provider,
              { value: this.props.routeContext },
              g.createElement(eo.Provider, {
                value: e,
                children: this.props.component,
              }),
            )
          : this.props.children;
      return this.context ? g.createElement(U3, { error: e }, t) : t;
    }
  };
bh.contextType = x3;
var Zc = new WeakMap();
function U3({ children: e, error: t }) {
  let { basename: a } = g.useContext(pt);
  if (
    typeof t == "object" &&
    t &&
    "digest" in t &&
    typeof t.digest == "string"
  ) {
    let l = w3(t.digest);
    if (l) {
      let n = Zc.get(t);
      if (n) throw n;
      let i = hh(l.location, a);
      if (dh && !Zc.get(t))
        if (i.isExternal || l.reloadDocument)
          window.location.href = i.absoluteURL || i.to;
        else {
          const u = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(i.to, {
              replace: l.replace,
            }),
          );
          throw (Zc.set(t, u), u);
        }
      return g.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${i.absoluteURL || i.to}`,
      });
    }
  }
  return e;
}
function B3({ routeContext: e, match: t, children: a }) {
  let l = g.useContext(cn);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = t.route.id),
    g.createElement(Rt.Provider, { value: e }, a)
  );
}
function H3(e, t = [], a) {
  let l = a == null ? void 0 : a.state;
  if (e == null) {
    if (!l) return null;
    if (l.errors) e = l.matches;
    else if (t.length === 0 && !l.initialized && l.matches.length > 0)
      e = l.matches;
    else return null;
  }
  let n = e,
    i = l == null ? void 0 : l.errors;
  if (i != null) {
    let f = n.findIndex(
      (p) => p.route.id && (i == null ? void 0 : i[p.route.id]) !== void 0,
    );
    (pe(
      f >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`,
    ),
      (n = n.slice(0, Math.min(n.length, f + 1))));
  }
  let u = !1,
    s = -1;
  if (a && l) {
    u = l.renderFallback;
    for (let f = 0; f < n.length; f++) {
      let p = n[f];
      if (
        ((p.route.HydrateFallback || p.route.hydrateFallbackElement) && (s = f),
        p.route.id)
      ) {
        let { loaderData: h, errors: v } = l,
          S =
            p.route.loader &&
            !h.hasOwnProperty(p.route.id) &&
            (!v || v[p.route.id] === void 0);
        if (p.route.lazy || S) {
          (a.isStatic && (u = !0),
            s >= 0 ? (n = n.slice(0, s + 1)) : (n = [n[0]]));
          break;
        }
      }
    }
  }
  let r = a == null ? void 0 : a.onError,
    o =
      l && r
        ? (f, p) => {
            var h, v;
            r(f, {
              location: l.location,
              params:
                ((v = (h = l.matches) == null ? void 0 : h[0]) == null
                  ? void 0
                  : v.params) ?? {},
              unstable_pattern: b3(l.matches),
              errorInfo: p,
            });
          }
        : void 0;
  return n.reduceRight((f, p, h) => {
    let v,
      S = !1,
      b = null,
      x = null;
    l &&
      ((v = i && p.route.id ? i[p.route.id] : void 0),
      (b = p.route.errorElement || L3),
      u &&
        (s < 0 && h === 0
          ? (Sh(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (S = !0),
            (x = null))
          : s === h &&
            ((S = !0), (x = p.route.hydrateFallbackElement || null))));
    let d = t.concat(n.slice(0, h + 1)),
      m = () => {
        let y;
        return (
          v
            ? (y = b)
            : S
              ? (y = x)
              : p.route.Component
                ? (y = g.createElement(p.route.Component, null))
                : p.route.element
                  ? (y = p.route.element)
                  : (y = f),
          g.createElement(B3, {
            match: p,
            routeContext: { outlet: f, matches: d, isDataRoute: l != null },
            children: y,
          })
        );
      };
    return l && (p.route.ErrorBoundary || p.route.errorElement || h === 0)
      ? g.createElement(bh, {
          location: l.location,
          revalidation: l.revalidation,
          component: b,
          error: v,
          children: m(),
          routeContext: { outlet: null, matches: d, isDataRoute: !0 },
          onError: o,
        })
      : m();
  }, null);
}
function to(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function q3(e) {
  let t = g.useContext(cn);
  return (pe(t, to(e)), t);
}
function Y3(e) {
  let t = g.useContext(ic);
  return (pe(t, to(e)), t);
}
function V3(e) {
  let t = g.useContext(Rt);
  return (pe(t, to(e)), t);
}
function ao(e) {
  let t = V3(e),
    a = t.matches[t.matches.length - 1];
  return (
    pe(
      a.route.id,
      `${e} can only be used on routes that contain a unique "id"`,
    ),
    a.route.id
  );
}
function $3() {
  return ao("useRouteId");
}
function G3() {
  var l;
  let e = g.useContext(eo),
    t = Y3("useRouteError"),
    a = ao("useRouteError");
  return e !== void 0 ? e : (l = t.errors) == null ? void 0 : l[a];
}
function X3() {
  let { router: e } = q3("useNavigate"),
    t = ao("useNavigate"),
    a = g.useRef(!1);
  return (
    yh(() => {
      a.current = !0;
    }),
    g.useCallback(
      async (n, i = {}) => {
        (Tt(a.current, gh),
          a.current &&
            (typeof n == "number"
              ? await e.navigate(n)
              : await e.navigate(n, { fromRouteId: t, ...i })));
      },
      [e, t],
    )
  );
}
var Qf = {};
function Sh(e, t, a) {
  !t && !Qf[e] && ((Qf[e] = !0), Tt(!1, a));
}
g.memo(Q3);
function Q3({ routes: e, future: t, state: a, isStatic: l, onError: n }) {
  return _h(e, void 0, { state: a, isStatic: l, onError: n });
}
function Ks({ to: e, replace: t, state: a, relative: l }) {
  pe(
    sn(),
    "<Navigate> may be used only in the context of a <Router> component.",
  );
  let { static: n } = g.useContext(pt);
  Tt(
    !n,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.",
  );
  let { matches: i } = g.useContext(Rt),
    { pathname: u } = at(),
    s = oa(),
    r = nc(e, Ir(i), u, l === "path"),
    o = JSON.stringify(r);
  return (
    g.useEffect(() => {
      s(JSON.parse(o), { replace: t, state: a, relative: l });
    }, [s, o, l, t, a]),
    null
  );
}
function Z3(e) {
  return R3(e.context);
}
function wt(e) {
  pe(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function k3({
  basename: e = "/",
  children: t = null,
  location: a,
  navigationType: l = "POP",
  navigator: n,
  static: i = !1,
  unstable_useTransitions: u,
}) {
  pe(
    !sn(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let s = e.replace(/^\/*/, "/"),
    r = g.useMemo(
      () => ({
        basename: s,
        navigator: n,
        static: i,
        unstable_useTransitions: u,
        future: {},
      }),
      [s, n, i, u],
    );
  typeof a == "string" && (a = un(a));
  let {
      pathname: o = "/",
      search: f = "",
      hash: p = "",
      state: h = null,
      key: v = "default",
      unstable_mask: S,
    } = a,
    b = g.useMemo(() => {
      let x = sa(o, s);
      return x == null
        ? null
        : {
            location: {
              pathname: x,
              search: f,
              hash: p,
              state: h,
              key: v,
              unstable_mask: S,
            },
            navigationType: l,
          };
    }, [s, o, f, p, h, v, l, S]);
  return (
    Tt(
      b != null,
      `<Router basename="${s}"> is not able to match the URL "${o}${f}${p}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    b == null
      ? null
      : g.createElement(
          pt.Provider,
          { value: r },
          g.createElement(gi.Provider, { children: t, value: b }),
        )
  );
}
function K3({ children: e, location: t }) {
  return O3(Js(e), t);
}
function Js(e, t = []) {
  let a = [];
  return (
    g.Children.forEach(e, (l, n) => {
      if (!g.isValidElement(l)) return;
      let i = [...t, n];
      if (l.type === g.Fragment) {
        a.push.apply(a, Js(l.props.children, i));
        return;
      }
      (pe(
        l.type === wt,
        `[${typeof l.type == "string" ? l.type : l.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        pe(
          !l.props.index || !l.props.children,
          "An index route cannot have child routes.",
        ));
      let u = {
        id: l.props.id || i.join("-"),
        caseSensitive: l.props.caseSensitive,
        element: l.props.element,
        Component: l.props.Component,
        index: l.props.index,
        path: l.props.path,
        middleware: l.props.middleware,
        loader: l.props.loader,
        action: l.props.action,
        hydrateFallbackElement: l.props.hydrateFallbackElement,
        HydrateFallback: l.props.HydrateFallback,
        errorElement: l.props.errorElement,
        ErrorBoundary: l.props.ErrorBoundary,
        hasErrorBoundary:
          l.props.hasErrorBoundary === !0 ||
          l.props.ErrorBoundary != null ||
          l.props.errorElement != null,
        shouldRevalidate: l.props.shouldRevalidate,
        handle: l.props.handle,
        lazy: l.props.lazy,
      };
      (l.props.children && (u.children = Js(l.props.children, i)), a.push(u));
    }),
    a
  );
}
var tu = "get",
  au = "application/x-www-form-urlencoded";
function uc(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function J3(e) {
  return uc(e) && e.tagName.toLowerCase() === "button";
}
function F3(e) {
  return uc(e) && e.tagName.toLowerCase() === "form";
}
function W3(e) {
  return uc(e) && e.tagName.toLowerCase() === "input";
}
function P3(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function I3(e, t) {
  return e.button === 0 && (!t || t === "_self") && !P3(e);
}
var Ui = null;
function e6() {
  if (Ui === null)
    try {
      (new FormData(document.createElement("form"), 0), (Ui = !1));
    } catch {
      Ui = !0;
    }
  return Ui;
}
var t6 = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function kc(e) {
  return e != null && !t6.has(e)
    ? (Tt(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${au}"`,
      ),
      null)
    : e;
}
function a6(e, t) {
  let a, l, n, i, u;
  if (F3(e)) {
    let s = e.getAttribute("action");
    ((l = s ? sa(s, t) : null),
      (a = e.getAttribute("method") || tu),
      (n = kc(e.getAttribute("enctype")) || au),
      (i = new FormData(e)));
  } else if (J3(e) || (W3(e) && (e.type === "submit" || e.type === "image"))) {
    let s = e.form;
    if (s == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let r = e.getAttribute("formaction") || s.getAttribute("action");
    if (
      ((l = r ? sa(r, t) : null),
      (a = e.getAttribute("formmethod") || s.getAttribute("method") || tu),
      (n =
        kc(e.getAttribute("formenctype")) ||
        kc(s.getAttribute("enctype")) ||
        au),
      (i = new FormData(s, e)),
      !e6())
    ) {
      let { name: o, type: f, value: p } = e;
      if (f === "image") {
        let h = o ? `${o}.` : "";
        (i.append(`${h}x`, "0"), i.append(`${h}y`, "0"));
      } else o && i.append(o, p);
    }
  } else {
    if (uc(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((a = tu), (l = null), (n = au), (u = e));
  }
  return (
    i && n === "text/plain" && ((u = i), (i = void 0)),
    { action: l, method: a.toLowerCase(), encType: n, formData: i, body: u }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function lo(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function l6(e, t, a, l) {
  let n =
    typeof e == "string"
      ? new URL(
          e,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : e;
  return (
    a
      ? n.pathname.endsWith("/")
        ? (n.pathname = `${n.pathname}_.${l}`)
        : (n.pathname = `${n.pathname}.${l}`)
      : n.pathname === "/"
        ? (n.pathname = `_root.${l}`)
        : t && sa(n.pathname, t) === "/"
          ? (n.pathname = `${t.replace(/\/$/, "")}/_root.${l}`)
          : (n.pathname = `${n.pathname.replace(/\/$/, "")}.${l}`),
    n
  );
}
async function n6(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let a = await import(e.module);
    return ((t[e.id] = a), a);
  } catch (a) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(a),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function i6(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function u6(e, t, a) {
  let l = await Promise.all(
    e.map(async (n) => {
      let i = t.routes[n.route.id];
      if (i) {
        let u = await n6(i, a);
        return u.links ? u.links() : [];
      }
      return [];
    }),
  );
  return o6(
    l
      .flat(1)
      .filter(i6)
      .filter((n) => n.rel === "stylesheet" || n.rel === "preload")
      .map((n) =>
        n.rel === "stylesheet"
          ? { ...n, rel: "prefetch", as: "style" }
          : { ...n, rel: "prefetch" },
      ),
  );
}
function Zf(e, t, a, l, n, i) {
  let u = (r, o) => (a[o] ? r.route.id !== a[o].route.id : !0),
    s = (r, o) => {
      var f;
      return (
        a[o].pathname !== r.pathname ||
        (((f = a[o].route.path) == null ? void 0 : f.endsWith("*")) &&
          a[o].params["*"] !== r.params["*"])
      );
    };
  return i === "assets"
    ? t.filter((r, o) => u(r, o) || s(r, o))
    : i === "data"
      ? t.filter((r, o) => {
          var p;
          let f = l.routes[r.route.id];
          if (!f || !f.hasLoader) return !1;
          if (u(r, o) || s(r, o)) return !0;
          if (r.route.shouldRevalidate) {
            let h = r.route.shouldRevalidate({
              currentUrl: new URL(
                n.pathname + n.search + n.hash,
                window.origin,
              ),
              currentParams: ((p = a[0]) == null ? void 0 : p.params) || {},
              nextUrl: new URL(e, window.origin),
              nextParams: r.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof h == "boolean") return h;
          }
          return !0;
        })
      : [];
}
function c6(e, t, { includeHydrateFallback: a } = {}) {
  return s6(
    e
      .map((l) => {
        let n = t.routes[l.route.id];
        if (!n) return [];
        let i = [n.module];
        return (
          n.clientActionModule && (i = i.concat(n.clientActionModule)),
          n.clientLoaderModule && (i = i.concat(n.clientLoaderModule)),
          a &&
            n.hydrateFallbackModule &&
            (i = i.concat(n.hydrateFallbackModule)),
          n.imports && (i = i.concat(n.imports)),
          i
        );
      })
      .flat(1),
  );
}
function s6(e) {
  return [...new Set(e)];
}
function r6(e) {
  let t = {},
    a = Object.keys(e).sort();
  for (let l of a) t[l] = e[l];
  return t;
}
function o6(e, t) {
  let a = new Set();
  return (
    new Set(t),
    e.reduce((l, n) => {
      let i = JSON.stringify(r6(n));
      return (a.has(i) || (a.add(i), l.push({ key: i, link: n })), l);
    }, [])
  );
}
function xh() {
  let e = g.useContext(cn);
  return (
    lo(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    e
  );
}
function f6() {
  let e = g.useContext(ic);
  return (
    lo(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    e
  );
}
var no = g.createContext(void 0);
no.displayName = "FrameworkContext";
function Nh() {
  let e = g.useContext(no);
  return (
    lo(e, "You must render this element inside a <HydratedRouter> element"),
    e
  );
}
function d6(e, t) {
  let a = g.useContext(no),
    [l, n] = g.useState(!1),
    [i, u] = g.useState(!1),
    {
      onFocus: s,
      onBlur: r,
      onMouseEnter: o,
      onMouseLeave: f,
      onTouchStart: p,
    } = t,
    h = g.useRef(null);
  (g.useEffect(() => {
    if ((e === "render" && u(!0), e === "viewport")) {
      let b = (d) => {
          d.forEach((m) => {
            u(m.isIntersecting);
          });
        },
        x = new IntersectionObserver(b, { threshold: 0.5 });
      return (
        h.current && x.observe(h.current),
        () => {
          x.disconnect();
        }
      );
    }
  }, [e]),
    g.useEffect(() => {
      if (l) {
        let b = setTimeout(() => {
          u(!0);
        }, 100);
        return () => {
          clearTimeout(b);
        };
      }
    }, [l]));
  let v = () => {
      n(!0);
    },
    S = () => {
      (n(!1), u(!1));
    };
  return a
    ? e !== "intent"
      ? [i, h, {}]
      : [
          i,
          h,
          {
            onFocus: gn(s, v),
            onBlur: gn(r, S),
            onMouseEnter: gn(o, v),
            onMouseLeave: gn(f, S),
            onTouchStart: gn(p, v),
          },
        ]
    : [!1, h, {}];
}
function gn(e, t) {
  return (a) => {
    (e && e(a), a.defaultPrevented || t(a));
  };
}
function h6({ page: e, ...t }) {
  let { router: a } = xh(),
    l = g.useMemo(() => rh(a.routes, e, a.basename), [a.routes, e, a.basename]);
  return l ? g.createElement(p6, { page: e, matches: l, ...t }) : null;
}
function m6(e) {
  let { manifest: t, routeModules: a } = Nh(),
    [l, n] = g.useState([]);
  return (
    g.useEffect(() => {
      let i = !1;
      return (
        u6(e, t, a).then((u) => {
          i || n(u);
        }),
        () => {
          i = !0;
        }
      );
    }, [e, t, a]),
    l
  );
}
function p6({ page: e, matches: t, ...a }) {
  let l = at(),
    { future: n, manifest: i, routeModules: u } = Nh(),
    { basename: s } = xh(),
    { loaderData: r, matches: o } = f6(),
    f = g.useMemo(() => Zf(e, t, o, i, l, "data"), [e, t, o, i, l]),
    p = g.useMemo(() => Zf(e, t, o, i, l, "assets"), [e, t, o, i, l]),
    h = g.useMemo(() => {
      if (e === l.pathname + l.search + l.hash) return [];
      let b = new Set(),
        x = !1;
      if (
        (t.forEach((m) => {
          var _;
          let y = i.routes[m.route.id];
          !y ||
            !y.hasLoader ||
            ((!f.some((E) => E.route.id === m.route.id) &&
              m.route.id in r &&
              (_ = u[m.route.id]) != null &&
              _.shouldRevalidate) ||
            y.hasClientLoader
              ? (x = !0)
              : b.add(m.route.id));
        }),
        b.size === 0)
      )
        return [];
      let d = l6(e, s, n.unstable_trailingSlashAwareDataRequests, "data");
      return (
        x &&
          b.size > 0 &&
          d.searchParams.set(
            "_routes",
            t
              .filter((m) => b.has(m.route.id))
              .map((m) => m.route.id)
              .join(","),
          ),
        [d.pathname + d.search]
      );
    }, [s, n.unstable_trailingSlashAwareDataRequests, r, l, i, f, t, e, u]),
    v = g.useMemo(() => c6(p, i), [p, i]),
    S = m6(p);
  return g.createElement(
    g.Fragment,
    null,
    h.map((b) =>
      g.createElement("link", {
        key: b,
        rel: "prefetch",
        as: "fetch",
        href: b,
        ...a,
      }),
    ),
    v.map((b) =>
      g.createElement("link", { key: b, rel: "modulepreload", href: b, ...a }),
    ),
    S.map(({ key: b, link: x }) =>
      g.createElement("link", {
        key: b,
        nonce: a.nonce,
        ...x,
        crossOrigin: x.crossOrigin ?? a.crossOrigin,
      }),
    ),
  );
}
function v6(...e) {
  return (t) => {
    e.forEach((a) => {
      typeof a == "function" ? a(t) : a != null && (a.current = t);
    });
  };
}
var g6 =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  g6 && (window.__reactRouterVersion = "7.13.1");
} catch {}
function y6({
  basename: e,
  children: t,
  unstable_useTransitions: a,
  window: l,
}) {
  let n = g.useRef();
  n.current == null && (n.current = J4({ window: l, v5Compat: !0 }));
  let i = n.current,
    [u, s] = g.useState({ action: i.action, location: i.location }),
    r = g.useCallback(
      (o) => {
        a === !1 ? s(o) : g.startTransition(() => s(o));
      },
      [a],
    );
  return (
    g.useLayoutEffect(() => i.listen(r), [i, r]),
    g.createElement(k3, {
      basename: e,
      children: t,
      location: u.location,
      navigationType: u.action,
      navigator: i,
      unstable_useTransitions: a,
    })
  );
}
var Eh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Ge = g.forwardRef(function (
    {
      onClick: t,
      discover: a = "render",
      prefetch: l = "none",
      relative: n,
      reloadDocument: i,
      replace: u,
      unstable_mask: s,
      state: r,
      target: o,
      to: f,
      preventScrollReset: p,
      viewTransition: h,
      unstable_defaultShouldRevalidate: v,
      ...S
    },
    b,
  ) {
    let {
        basename: x,
        navigator: d,
        unstable_useTransitions: m,
      } = g.useContext(pt),
      y = typeof f == "string" && Eh.test(f),
      _ = hh(f, x);
    f = _.to;
    let E = z3(f, { relative: n }),
      C = at(),
      w = null;
    if (s) {
      let R = nc(s, [], C.unstable_mask ? C.unstable_mask.pathname : "/", !0);
      (x !== "/" && (R.pathname = R.pathname === "/" ? x : Ht([x, R.pathname])),
        (w = d.createHref(R)));
    }
    let [j, z, M] = d6(l, S),
      P = x6(f, {
        replace: u,
        unstable_mask: s,
        state: r,
        target: o,
        preventScrollReset: p,
        relative: n,
        viewTransition: h,
        unstable_defaultShouldRevalidate: v,
        unstable_useTransitions: m,
      });
    function se(R) {
      (t && t(R), R.defaultPrevented || P(R));
    }
    let lt = !(_.isExternal || i),
      Ve = g.createElement("a", {
        ...S,
        ...M,
        href: (lt ? w : void 0) || _.absoluteURL || E,
        onClick: lt ? se : t,
        ref: v6(b, z),
        target: o,
        "data-discover": !y && a === "render" ? "true" : void 0,
      });
    return j && !y
      ? g.createElement(g.Fragment, null, Ve, g.createElement(h6, { page: E }))
      : Ve;
  });
Ge.displayName = "Link";
var _6 = g.forwardRef(function (
  {
    "aria-current": t = "page",
    caseSensitive: a = !1,
    className: l = "",
    end: n = !1,
    style: i,
    to: u,
    viewTransition: s,
    children: r,
    ...o
  },
  f,
) {
  let p = yi(u, { relative: o.relative }),
    h = at(),
    v = g.useContext(ic),
    { navigator: S, basename: b } = g.useContext(pt),
    x = v != null && w6(p) && s === !0,
    d = S.encodeLocation ? S.encodeLocation(p).pathname : p.pathname,
    m = h.pathname,
    y =
      v && v.navigation && v.navigation.location
        ? v.navigation.location.pathname
        : null;
  (a ||
    ((m = m.toLowerCase()),
    (y = y ? y.toLowerCase() : null),
    (d = d.toLowerCase())),
    y && b && (y = sa(y, b) || y));
  const _ = d !== "/" && d.endsWith("/") ? d.length - 1 : d.length;
  let E = m === d || (!n && m.startsWith(d) && m.charAt(_) === "/"),
    C =
      y != null &&
      (y === d || (!n && y.startsWith(d) && y.charAt(d.length) === "/")),
    w = { isActive: E, isPending: C, isTransitioning: x },
    j = E ? t : void 0,
    z;
  typeof l == "function"
    ? (z = l(w))
    : (z = [
        l,
        E ? "active" : null,
        C ? "pending" : null,
        x ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let M = typeof i == "function" ? i(w) : i;
  return g.createElement(
    Ge,
    {
      ...o,
      "aria-current": j,
      className: z,
      ref: f,
      style: M,
      to: u,
      viewTransition: s,
    },
    typeof r == "function" ? r(w) : r,
  );
});
_6.displayName = "NavLink";
var b6 = g.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: t,
      navigate: a,
      reloadDocument: l,
      replace: n,
      state: i,
      method: u = tu,
      action: s,
      onSubmit: r,
      relative: o,
      preventScrollReset: f,
      viewTransition: p,
      unstable_defaultShouldRevalidate: h,
      ...v
    },
    S,
  ) => {
    let { unstable_useTransitions: b } = g.useContext(pt),
      x = j6(),
      d = A6(s, { relative: o }),
      m = u.toLowerCase() === "get" ? "get" : "post",
      y = typeof s == "string" && Eh.test(s),
      _ = (E) => {
        if ((r && r(E), E.defaultPrevented)) return;
        E.preventDefault();
        let C = E.nativeEvent.submitter,
          w = (C == null ? void 0 : C.getAttribute("formmethod")) || u,
          j = () =>
            x(C || E.currentTarget, {
              fetcherKey: t,
              method: w,
              navigate: a,
              replace: n,
              state: i,
              relative: o,
              preventScrollReset: f,
              viewTransition: p,
              unstable_defaultShouldRevalidate: h,
            });
        b && a !== !1 ? g.startTransition(() => j()) : j();
      };
    return g.createElement("form", {
      ref: S,
      method: m,
      action: d,
      onSubmit: l ? r : _,
      ...v,
      "data-discover": !y && e === "render" ? "true" : void 0,
    });
  },
);
b6.displayName = "Form";
function S6(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function jh(e) {
  let t = g.useContext(cn);
  return (pe(t, S6(e)), t);
}
function x6(
  e,
  {
    target: t,
    replace: a,
    unstable_mask: l,
    state: n,
    preventScrollReset: i,
    relative: u,
    viewTransition: s,
    unstable_defaultShouldRevalidate: r,
    unstable_useTransitions: o,
  } = {},
) {
  let f = oa(),
    p = at(),
    h = yi(e, { relative: u });
  return g.useCallback(
    (v) => {
      if (I3(v, t)) {
        v.preventDefault();
        let S = a !== void 0 ? a : ni(p) === ni(h),
          b = () =>
            f(e, {
              replace: S,
              unstable_mask: l,
              state: n,
              preventScrollReset: i,
              relative: u,
              viewTransition: s,
              unstable_defaultShouldRevalidate: r,
            });
        o ? g.startTransition(() => b()) : b();
      }
    },
    [p, f, h, a, l, n, t, e, i, u, s, r, o],
  );
}
var N6 = 0,
  E6 = () => `__${String(++N6)}__`;
function j6() {
  let { router: e } = jh("useSubmit"),
    { basename: t } = g.useContext(pt),
    a = $3(),
    l = e.fetch,
    n = e.navigate;
  return g.useCallback(
    async (i, u = {}) => {
      let { action: s, method: r, encType: o, formData: f, body: p } = a6(i, t);
      if (u.navigate === !1) {
        let h = u.fetcherKey || E6();
        await l(h, a, u.action || s, {
          unstable_defaultShouldRevalidate: u.unstable_defaultShouldRevalidate,
          preventScrollReset: u.preventScrollReset,
          formData: f,
          body: p,
          formMethod: u.method || r,
          formEncType: u.encType || o,
          flushSync: u.flushSync,
        });
      } else
        await n(u.action || s, {
          unstable_defaultShouldRevalidate: u.unstable_defaultShouldRevalidate,
          preventScrollReset: u.preventScrollReset,
          formData: f,
          body: p,
          formMethod: u.method || r,
          formEncType: u.encType || o,
          replace: u.replace,
          state: u.state,
          fromRouteId: a,
          flushSync: u.flushSync,
          viewTransition: u.viewTransition,
        });
    },
    [l, n, t, a],
  );
}
function A6(e, { relative: t } = {}) {
  let { basename: a } = g.useContext(pt),
    l = g.useContext(Rt);
  pe(l, "useFormAction must be used inside a RouteContext");
  let [n] = l.matches.slice(-1),
    i = { ...yi(e || ".", { relative: t }) },
    u = at();
  if (e == null) {
    i.search = u.search;
    let s = new URLSearchParams(i.search),
      r = s.getAll("index");
    if (r.some((f) => f === "")) {
      (s.delete("index"),
        r.filter((p) => p).forEach((p) => s.append("index", p)));
      let f = s.toString();
      i.search = f ? `?${f}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      n.route.index &&
      (i.search = i.search ? i.search.replace(/^\?/, "?index&") : "?index"),
    a !== "/" && (i.pathname = i.pathname === "/" ? a : Ht([a, i.pathname])),
    ni(i)
  );
}
function w6(e, { relative: t } = {}) {
  let a = g.useContext(ph);
  pe(
    a != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: l } = jh("useViewTransitionState"),
    n = yi(e, { relative: t });
  if (!a.isTransitioning) return !1;
  let i = sa(a.currentLocation.pathname, l) || a.currentLocation.pathname,
    u = sa(a.nextLocation.pathname, l) || a.nextLocation.pathname;
  return Ru(n.pathname, u) != null || Ru(n.pathname, i) != null;
}
var Ah = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  kf = Na.createContext && Na.createContext(Ah),
  C6 = ["attr", "size", "title"];
function z6(e, t) {
  if (e == null) return {};
  var a,
    l,
    n = T6(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (l = 0; l < i.length; l++)
      ((a = i[l]),
        t.indexOf(a) === -1 &&
          {}.propertyIsEnumerable.call(e, a) &&
          (n[a] = e[a]));
  }
  return n;
}
function T6(e, t) {
  if (e == null) return {};
  var a = {};
  for (var l in e)
    if ({}.hasOwnProperty.call(e, l)) {
      if (t.indexOf(l) !== -1) continue;
      a[l] = e[l];
    }
  return a;
}
function Ou() {
  return (
    (Ou = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var a = arguments[t];
            for (var l in a) ({}).hasOwnProperty.call(a, l) && (e[l] = a[l]);
          }
          return e;
        }),
    Ou.apply(null, arguments)
  );
}
function Kf(e, t) {
  var a = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    (t &&
      (l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })),
      a.push.apply(a, l));
  }
  return a;
}
function Du(e) {
  for (var t = 1; t < arguments.length; t++) {
    var a = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Kf(Object(a), !0).forEach(function (l) {
          M6(e, l, a[l]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
        : Kf(Object(a)).forEach(function (l) {
            Object.defineProperty(e, l, Object.getOwnPropertyDescriptor(a, l));
          });
  }
  return e;
}
function M6(e, t, a) {
  return (
    (t = R6(t)) in e
      ? Object.defineProperty(e, t, {
          value: a,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = a),
    e
  );
}
function R6(e) {
  var t = O6(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function O6(e, t) {
  if (typeof e != "object" || !e) return e;
  var a = e[Symbol.toPrimitive];
  if (a !== void 0) {
    var l = a.call(e, t);
    if (typeof l != "object") return l;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wh(e) {
  return (
    e &&
    e.map((t, a) =>
      Na.createElement(t.tag, Du({ key: a }, t.attr), wh(t.child)),
    )
  );
}
function H(e) {
  return (t) =>
    Na.createElement(D6, Ou({ attr: Du({}, e.attr) }, t), wh(e.child));
}
function D6(e) {
  var t = (a) => {
    var { attr: l, size: n, title: i } = e,
      u = z6(e, C6),
      s = n || a.size || "1em",
      r;
    return (
      a.className && (r = a.className),
      e.className && (r = (r ? r + " " : "") + e.className),
      Na.createElement(
        "svg",
        Ou(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          a.attr,
          l,
          u,
          {
            className: r,
            style: Du(Du({ color: e.color || a.color }, a.style), e.style),
            height: s,
            width: s,
            xmlns: "http://www.w3.org/2000/svg",
          },
        ),
        i && Na.createElement("title", null, i),
        e.children,
      )
    );
  };
  return kf !== void 0
    ? Na.createElement(kf.Consumer, null, (a) => t(a))
    : t(Ah);
}
function L6(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z",
        },
        child: [],
      },
    ],
  })(e);
}
function U6(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
        },
        child: [],
      },
    ],
  })(e);
}
function B6(e) {
  return H({
    attr: { viewBox: "0 0 496 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
        },
        child: [],
      },
    ],
  })(e);
}
function cc(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z",
        },
        child: [],
      },
    ],
  })(e);
}
function H6(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z",
        },
        child: [],
      },
    ],
  })(e);
}
function Ch(e) {
  return H({
    attr: { viewBox: "0 0 640 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M622.3 271.1l-115.2-45c-4.1-1.6-12.6-3.7-22.2 0l-115.2 45c-10.7 4.2-17.7 14-17.7 24.9 0 111.6 68.7 188.8 132.9 213.9 9.6 3.7 18 1.6 22.2 0C558.4 489.9 640 420.5 640 296c0-10.9-7-20.7-17.7-24.9zM496 462.4V273.3l95.5 37.3c-5.6 87.1-60.9 135.4-95.5 151.8zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm96 40c0-2.5.8-4.8 1.1-7.2-2.5-.1-4.9-.8-7.5-.8h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c6.8 0 13.3-1.5 19.2-4-54-42.9-99.2-116.7-99.2-212z",
        },
        child: [],
      },
    ],
  })(e);
}
function zh(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zM104 424c0 13.3 10.7 24 24 24s24-10.7 24-24-10.7-24-24-24-24 10.7-24 24zm216-135.4v49c36.5 7.4 64 39.8 64 78.4v41.7c0 7.6-5.4 14.2-12.9 15.7l-32.2 6.4c-4.3.9-8.5-1.9-9.4-6.3l-3.1-15.7c-.9-4.3 1.9-8.6 6.3-9.4l19.3-3.9V416c0-62.8-96-65.1-96 1.9v26.7l19.3 3.9c4.3.9 7.1 5.1 6.3 9.4l-3.1 15.7c-.9 4.3-5.1 7.1-9.4 6.3l-31.2-4.2c-7.9-1.1-13.8-7.8-13.8-15.9V416c0-38.6 27.5-70.9 64-78.4v-45.2c-2.2.7-4.4 1.1-6.6 1.9-18 6.3-37.3 9.8-57.4 9.8s-39.4-3.5-57.4-9.8c-7.4-2.6-14.9-4.2-22.6-5.2v81.6c23.1 6.9 40 28.1 40 53.4 0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.3 16.9-46.5 40-53.4v-80.4C48.5 301 0 355.8 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-72-56.8-130.3-128-133.8z",
        },
        child: [],
      },
    ],
  })(e);
}
function q6(e) {
  return H({
    attr: { viewBox: "0 0 640 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z",
        },
        child: [],
      },
    ],
  })(e);
}
function Y6(e) {
  return H({
    attr: { viewBox: "0 0 496 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z",
        },
        child: [],
      },
    ],
  })(e);
}
function V6(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z",
        },
        child: [],
      },
    ],
  })(e);
}
function $6(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z",
        },
        child: [],
      },
    ],
  })(e);
}
function rn(e) {
  return H({
    attr: { viewBox: "0 0 352 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z",
        },
        child: [],
      },
    ],
  })(e);
}
function Th(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z",
        },
        child: [],
      },
    ],
  })(e);
}
function G6(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M312 320h136V56c0-13.3-10.7-24-24-24H24C10.7 32 0 42.7 0 56v400c0 13.3 10.7 24 24 24h264V344c0-13.2 10.8-24 24-24zm129 55l-98 98c-4.5 4.5-10.6 7-17 7h-6V352h128v6.1c0 6.3-2.5 12.4-7 16.9z",
        },
        child: [],
      },
    ],
  })(e);
}
function X6(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7 1.3 3 4.1 4.8 7.3 4.8 66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128.2 304H116c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h12.3c6 0 10.4-3.5 10.4-6.6 0-1.3-.8-2.7-2.1-3.8l-21.9-18.8c-8.5-7.2-13.3-17.5-13.3-28.1 0-21.3 19-38.6 42.4-38.6H156c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8h-12.3c-6 0-10.4 3.5-10.4 6.6 0 1.3.8 2.7 2.1 3.8l21.9 18.8c8.5 7.2 13.3 17.5 13.3 28.1.1 21.3-19 38.6-42.4 38.6zm191.8-8c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8v-68.2l-24.8 55.8c-2.9 5.9-11.4 5.9-14.3 0L224 227.8V296c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8V192c0-8.8 7.2-16 16-16h16c6.1 0 11.6 3.4 14.3 8.8l17.7 35.4 17.7-35.4c2.7-5.4 8.3-8.8 14.3-8.8h16c8.8 0 16 7.2 16 16v104zm48.3 8H356c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h12.3c6 0 10.4-3.5 10.4-6.6 0-1.3-.8-2.7-2.1-3.8l-21.9-18.8c-8.5-7.2-13.3-17.5-13.3-28.1 0-21.3 19-38.6 42.4-38.6H396c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8h-12.3c-6 0-10.4 3.5-10.4 6.6 0 1.3.8 2.7 2.1 3.8l21.9 18.8c8.5 7.2 13.3 17.5 13.3 28.1.1 21.3-18.9 38.6-42.3 38.6z",
        },
        child: [],
      },
    ],
  })(e);
}
function Q6(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z",
        },
        child: [],
      },
    ],
  })(e);
}
function Z6(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z",
        },
        child: [],
      },
    ],
  })(e);
}
function Mh(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z",
        },
        child: [],
      },
    ],
  })(e);
}
function k6(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z",
        },
        child: [],
      },
    ],
  })(e);
}
function K6(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z",
        },
        child: [],
      },
    ],
  })(e);
}
function J6(e) {
  return H({
    attr: { viewBox: "0 0 320 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z",
        },
        child: [],
      },
    ],
  })(e);
}
function F6(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160zm352 128l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zm70.62-193.77L417.77 9.38C411.53 3.12 403.34 0 395.15 0c-8.19 0-16.38 3.12-22.63 9.38L9.38 372.52c-12.5 12.5-12.5 32.76 0 45.25l84.85 84.85c6.25 6.25 14.44 9.37 22.62 9.37 8.19 0 16.38-3.12 22.63-9.37l363.14-363.15c12.5-12.48 12.5-32.75 0-45.24zM359.45 203.46l-50.91-50.91 86.6-86.6 50.91 50.91-86.6 86.6z",
        },
        child: [],
      },
    ],
  })(e);
}
function Rh(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z",
        },
        child: [],
      },
    ],
  })(e);
}
function Jf(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z",
        },
        child: [],
      },
    ],
  })(e);
}
function Oh(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z",
        },
        child: [],
      },
    ],
  })(e);
}
function Dh(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z",
        },
        child: [],
      },
    ],
  })(e);
}
function W6(e) {
  return H({
    attr: { viewBox: "0 0 384 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M360 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24zm-75.078 384H99.08c17.059-46.797 52.096-80 92.92-80 40.821 0 75.862 33.196 92.922 80zm.019-256H99.078C91.988 108.548 88 86.748 88 64h208c0 22.805-3.987 44.587-11.059 64z",
        },
        child: [],
      },
    ],
  })(e);
}
function io(e) {
  return H({
    attr: { viewBox: "0 0 576 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z",
        },
        child: [],
      },
    ],
  })(e);
}
function P6(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z",
        },
        child: [],
      },
    ],
  })(e);
}
function Lh(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z",
        },
        child: [],
      },
    ],
  })(e);
}
function Uh(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z",
        },
        child: [],
      },
    ],
  })(e);
}
function I6(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z",
        },
        child: [],
      },
    ],
  })(e);
}
function Bh(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z",
        },
        child: [],
      },
    ],
  })(e);
}
function ep(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z",
        },
        child: [],
      },
    ],
  })(e);
}
function tp(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z",
        },
        child: [],
      },
    ],
  })(e);
}
function ap(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M436 160H12c-6.6 0-12-5.4-12-12v-36c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48v36c0 6.6-5.4 12-12 12zM12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm316 140c0-6.6-5.4-12-12-12h-60v-60c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v60h-60c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h60v60c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-60h60c6.6 0 12-5.4 12-12v-40z",
        },
        child: [],
      },
    ],
  })(e);
}
function lp(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M436 160H12c-6.627 0-12-5.373-12-12v-36c0-26.51 21.49-48 48-48h48V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h128V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h48c26.51 0 48 21.49 48 48v36c0 6.627-5.373 12-12 12zM12 192h424c6.627 0 12 5.373 12 12v260c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V204c0-6.627 5.373-12 12-12zm333.296 95.947l-28.169-28.398c-4.667-4.705-12.265-4.736-16.97-.068L194.12 364.665l-45.98-46.352c-4.667-4.705-12.266-4.736-16.971-.068l-28.397 28.17c-4.705 4.667-4.736 12.265-.068 16.97l82.601 83.269c4.667 4.705 12.265 4.736 16.97.068l142.953-141.805c4.705-4.667 4.736-12.265.068-16.97z",
        },
        child: [],
      },
    ],
  })(e);
}
function np(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z",
        },
        child: [],
      },
    ],
  })(e);
}
function ip(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z",
        },
        child: [],
      },
    ],
  })(e);
}
function up(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z",
        },
        child: [],
      },
    ],
  })(e);
}
function cp(e) {
  return H({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z",
        },
        child: [],
      },
    ],
  })(e);
}
function Hh(e) {
  return H({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z",
        },
        child: [],
      },
    ],
  })(e);
}
function qh(e) {
  return H({
    attr: { viewBox: "0 0 576 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-352 96c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H86.4C74 384 64 375.4 64 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2zM512 312c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z",
        },
        child: [],
      },
    ],
  })(e);
}
const sp = "_wrap_1jiwf_1",
  rp = "_inline_1jiwf_7",
  op = "_dot_1jiwf_11",
  fp = "_bounce_1jiwf_1",
  dp = "_sm_1jiwf_27",
  hp = "_lg_1jiwf_32",
  mp = "_srOnly_1jiwf_37",
  Ga = {
    wrap: sp,
    inline: rp,
    dot: op,
    bounce: fp,
    sm: dp,
    lg: hp,
    srOnly: mp,
  };
function Kl({ label: e = "Loading", size: t = "md", inline: a = !1 }) {
  return c.jsxs("div", {
    className: `${Ga.wrap} ${Ga[t] || ""} ${a ? Ga.inline : ""}`,
    role: "status",
    "aria-live": "polite",
    children: [
      c.jsx("span", { className: Ga.dot }),
      c.jsx("span", { className: Ga.dot }),
      c.jsx("span", { className: Ga.dot }),
      c.jsx("span", { className: Ga.srOnly, children: e }),
    ],
  });
}
const pp = "_wrap_1ef73_1",
  vp = "_icon_1ef73_15",
  gp = "_title_1ef73_20",
  yp = "_description_1ef73_27",
  _p = "_action_1ef73_34",
  yn = { wrap: pp, icon: vp, title: gp, description: yp, action: _p };
function Lu({ icon: e = "📭", title: t, description: a, action: l }) {
  return c.jsxs("div", {
    className: yn.wrap,
    children: [
      c.jsx("div", { className: yn.icon, "aria-hidden": !0, children: e }),
      t && c.jsx("h3", { className: yn.title, children: t }),
      a && c.jsx("p", { className: yn.description, children: a }),
      l && c.jsx("div", { className: yn.action, children: l }),
    ],
  });
}
const bp = "_badge_1aer8_1",
  Sp = "_pending_approval_1aer8_18",
  xp = "_confirmed_1aer8_24",
  Np = "_cancelled_1aer8_29",
  Ep = "_completed_1aer8_34",
  jp = "_no_show_1aer8_39",
  Ff = {
    badge: bp,
    pending_approval: Sp,
    confirmed: xp,
    cancelled: Np,
    completed: Ep,
    no_show: jp,
  },
  Ap = {
    PENDING_APPROVAL: "Awaiting approval",
    CONFIRMED: "Confirmed",
    CANCELLED: "Cancelled",
    COMPLETED: "Completed",
    NO_SHOW: "No-show",
  };
function Yh({ status: e }) {
  const t = Ap[e] || e,
    a = `${Ff.badge} ${Ff[e == null ? void 0 : e.toLowerCase()] || ""}`;
  return c.jsx("span", { className: a, children: t });
}
const Wf = "http://localhost:8081",
  Pf = "/nexus/v1",
  wp = [
    "/auth/login",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/recover-username",
    "/auth/validate",
  ];
class Fs extends Error {
  constructor(t, { status: a, code: l, traceId: n, payload: i } = {}) {
    (super(t),
      (this.name = "ApiError"),
      (this.status = a),
      (this.code = l),
      (this.traceId = n),
      (this.payload = i));
  }
}
function Cp(e) {
  return /^https?:\/\//.test(e)
    ? e
    : e.startsWith(Pf)
      ? `${Wf}${e}`
      : `${Wf}${Pf}${e}`;
}
async function zp(e) {
  const t = e.headers.get("content-type") || "";
  if (e.status === 204) return null;
  if (t.includes("application/json"))
    try {
      return await e.json();
    } catch {
      return null;
    }
  try {
    return (await e.text()) || null;
  } catch {
    return null;
  }
}
function Tp(e) {
  return !wp.some((t) => e.includes(t));
}
function Mp(e) {
  if (Tp(e)) {
    try {
      localStorage.removeItem("token");
    } catch {}
    typeof window < "u" &&
      window.location.pathname !== "/login" &&
      window.location.replace("/login?reason=session_expired");
  }
}
async function _n(e, t = {}) {
  const a = localStorage.getItem("token"),
    l = {
      Accept: "application/json",
      ...(t.body ? { "Content-Type": "application/json" } : {}),
      ...(a ? { Authorization: `Bearer ${a}` } : {}),
      ...t.headers,
    };
  let n;
  try {
    n = await fetch(Cp(e), { ...t, headers: l });
  } catch {
    throw new Fs(
      "Could not reach the server. Check your connection and try again.",
      { status: 0, code: "NETWORK_ERROR" },
    );
  }
  const i = await zp(n);
  if (!n.ok) {
    n.status === 401 && Mp(e);
    const u = Rp(i, n.status);
    throw new Fs(u, {
      status: n.status,
      code: i == null ? void 0 : i.errorCode,
      traceId: i == null ? void 0 : i.traceId,
      payload: i,
    });
  }
  return i;
}
function Rp(e, t) {
  if (e && typeof e == "object") {
    if (typeof e.message == "string" && e.message.trim()) return e.message;
    if (typeof e.error == "string" && e.error.trim()) return e.error;
  }
  return typeof e == "string" && e.trim() ? e : Op(t);
}
function Op(e) {
  switch (e) {
    case 400:
      return "The request was rejected. Check the highlighted fields.";
    case 401:
      return "Your session expired. Please sign in again.";
    case 403:
      return "You don't have permission to do that.";
    case 404:
      return "We couldn't find what you were looking for.";
    case 409:
      return "Conflict — that value is already in use.";
    case 422:
      return "Invalid input.";
    case 429:
      return "Too many attempts. Please slow down and try again.";
    case 500:
      return "Something went wrong on our side. Please try again.";
    case 503:
      return "A dependency is temporarily unavailable. Try again shortly.";
    default:
      return `Request failed with status ${e}`;
  }
}
const we = {
  get: (e, t) => _n(e, { ...t, method: "GET" }),
  post: (e, t, a) =>
    _n(e, { ...a, method: "POST", body: t ? JSON.stringify(t) : void 0 }),
  patch: (e, t, a) =>
    _n(e, { ...a, method: "PATCH", body: t ? JSON.stringify(t) : void 0 }),
  put: (e, t, a) =>
    _n(e, { ...a, method: "PUT", body: t ? JSON.stringify(t) : void 0 }),
  delete: (e, t) => _n(e, { ...t, method: "DELETE" }),
};
function Dp(e) {
  return we.post("/appointments", e);
}
function Vh(e) {
  return we.get(`/clients/${e}/appointments`);
}
function $h(e) {
  return we.get(`/providers/${e}/appointments`);
}
function Lp(e) {
  return we.patch(`/appointments/${e}/confirm`);
}
function Up(e, t) {
  return we.patch(`/appointments/${e}/cancel`, t ? { reason: t } : null);
}
class Cn extends Error {}
Cn.prototype.name = "InvalidTokenError";
function Bp(e) {
  return decodeURIComponent(
    atob(e).replace(/(.)/g, (t, a) => {
      let l = a.charCodeAt(0).toString(16).toUpperCase();
      return (l.length < 2 && (l = "0" + l), "%" + l);
    }),
  );
}
function Hp(e) {
  let t = e.replace(/-/g, "+").replace(/_/g, "/");
  switch (t.length % 4) {
    case 0:
      break;
    case 2:
      t += "==";
      break;
    case 3:
      t += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return Bp(t);
  } catch {
    return atob(t);
  }
}
function qp(e, t) {
  if (typeof e != "string")
    throw new Cn("Invalid token specified: must be a string");
  t || (t = {});
  const a = t.header === !0 ? 0 : 1,
    l = e.split(".")[a];
  if (typeof l != "string")
    throw new Cn(`Invalid token specified: missing part #${a + 1}`);
  let n;
  try {
    n = Hp(l);
  } catch (i) {
    throw new Cn(
      `Invalid token specified: invalid base64 for part #${a + 1} (${i.message})`,
    );
  }
  try {
    return JSON.parse(n);
  } catch (i) {
    throw new Cn(
      `Invalid token specified: invalid json for part #${a + 1} (${i.message})`,
    );
  }
}
function Yp() {
  return localStorage.getItem("token");
}
function Va() {
  const e = Yp();
  if (!e) return null;
  try {
    const t = qp(e);
    return {
      id: t.userId,
      username: t.username,
      givenName: t.given_name,
      fullName: t.full_name,
      email: t.email,
      role: t.role,
      passwordChangeRequired: !!t.password_change_required,
      exp: t.exp,
    };
  } catch (t) {
    return (console.error("Invalid token:", t), null);
  }
}
function Vp() {
  const e = Va();
  return e != null && e.exp ? Date.now() >= e.exp * 1e3 : !0;
}
const Gh = new Intl.DateTimeFormat(void 0, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
  Ws = new Intl.DateTimeFormat(void 0, { hour: "2-digit", minute: "2-digit" });
function $p(e) {
  return e ? Gh.format(new Date(e)) : "";
}
function If(e) {
  return e ? Ws.format(new Date(e)) : "";
}
function Xh(e, t) {
  if (!e) return "";
  const a = new Date(e),
    l = t ? new Date(t) : null,
    n = Gh.format(a),
    i = Ws.format(a);
  if (!l) return `${n} · ${i}`;
  const u = Ws.format(l);
  return `${n} · ${i} – ${u}`;
}
function ed(e) {
  return e ? new Date(e).toISOString() : null;
}
function Qh(e) {
  const t = e instanceof Date ? e : new Date(e),
    a = (r) => String(r).padStart(2, "0"),
    l = t.getFullYear(),
    n = a(t.getMonth() + 1),
    i = a(t.getDate()),
    u = a(t.getHours()),
    s = a(t.getMinutes());
  return `${l}-${n}-${i}T${u}:${s}`;
}
function Gp(e, t) {
  const a = new Date(e);
  return (a.setMinutes(a.getMinutes() + t), a);
}
function Xp(e, t) {
  const a = new Date(e).getTime(),
    l = new Date(t).getTime();
  return Math.round((l - a) / 6e4);
}
const Qp = "_page_o3w2w_1",
  Zp = "_hero_o3w2w_13",
  kp = "_eyebrow_o3w2w_30",
  Kp = "_title_o3w2w_39",
  Jp = "_highlight_o3w2w_46",
  Fp = "_subtitle_o3w2w_50",
  Wp = "_heroActions_o3w2w_57",
  Pp = "_heroPrimary_o3w2w_63",
  Ip = "_heroSecondary_o3w2w_64",
  ev = "_statsGrid_o3w2w_102",
  tv = "_stat_o3w2w_102",
  av = "_statIcon_o3w2w_126",
  lv = "_statValue_o3w2w_140",
  nv = "_statLabel_o3w2w_148",
  iv = "_primary_o3w2w_158",
  uv = "_success_o3w2w_162",
  cv = "_warning_o3w2w_166",
  sv = "_section_o3w2w_173",
  rv = "_sectionHead_o3w2w_180",
  ov = "_sectionLink_o3w2w_194",
  fv = "_nextList_o3w2w_205",
  dv = "_nextItem_o3w2w_214",
  hv = "_nextInfo_o3w2w_226",
  mv = "_nextWhen_o3w2w_232",
  pv = "_nextNote_o3w2w_238",
  vv = "_nextMeta_o3w2w_243",
  gv = "_risk_o3w2w_249",
  yv = "_loading_o3w2w_257",
  _v = "_errorBox_o3w2w_267",
  le = {
    page: Qp,
    hero: Zp,
    eyebrow: kp,
    title: Kp,
    highlight: Jp,
    subtitle: Fp,
    heroActions: Wp,
    heroPrimary: Pp,
    heroSecondary: Ip,
    statsGrid: ev,
    stat: tv,
    statIcon: av,
    statValue: lv,
    statLabel: nv,
    primary: iv,
    success: uv,
    warning: cv,
    section: sv,
    sectionHead: rv,
    sectionLink: ov,
    nextList: fv,
    nextItem: dv,
    nextInfo: hv,
    nextWhen: mv,
    nextNote: pv,
    nextMeta: vv,
    risk: gv,
    loading: yv,
    errorBox: _v,
  };
function bv(e) {
  return (e || "").replace(/^ROLE_/, "").toUpperCase();
}
function bn({ icon: e, label: t, value: a, accent: l }) {
  return c.jsxs("div", {
    className: `${le.stat} ${l ? le[l] : ""}`,
    children: [
      c.jsx("span", {
        className: le.statIcon,
        children: c.jsx(e, { "aria-hidden": !0 }),
      }),
      c.jsxs("div", {
        children: [
          c.jsx("span", { className: le.statValue, children: a }),
          c.jsx("span", { className: le.statLabel, children: t }),
        ],
      }),
    ],
  });
}
function Sv() {
  const e = Va(),
    t = bv(e == null ? void 0 : e.role),
    a = t === "CLIENT",
    l = t === "PROVIDER",
    n = t === "PROVIDER" || t === "ASSISTANT" || t === "ADMIN",
    [i, u] = g.useState([]),
    [s, r] = g.useState(!0),
    [o, f] = g.useState(null),
    p = g.useCallback(async () => {
      if (!(e != null && e.id)) {
        (r(!1), f("Could not identify the current user"));
        return;
      }
      try {
        const b = a ? await Vh(e.id) : await $h(e.id);
        u(Array.isArray(b) ? b : []);
      } catch (b) {
        f(b.message || "Failed to load appointments");
      } finally {
        r(!1);
      }
    }, [e == null ? void 0 : e.id, a]);
  g.useEffect(() => {
    p();
  }, [p]);
  const h = g.useMemo(() => {
      const b = Date.now(),
        x = i.filter(
          (_) =>
            _.status !== "CANCELLED" &&
            _.status !== "NO_SHOW" &&
            new Date(_.endAt).getTime() >= b,
        ),
        d = i.filter((_) => _.status === "CONFIRMED"),
        m = i.filter((_) => _.status === "PENDING_APPROVAL"),
        y = i.filter(
          (_) =>
            (_.noShowProbability ?? 0) >= 0.5 &&
            _.status !== "CANCELLED" &&
            _.status !== "COMPLETED",
        );
      return {
        total: i.length,
        upcoming: x.length,
        confirmed: d.length,
        pending: m.length,
        highRisk: y.length,
      };
    }, [i]),
    v = g.useMemo(() => {
      const b = Date.now();
      return i
        .filter(
          (x) =>
            x.status !== "CANCELLED" &&
            x.status !== "NO_SHOW" &&
            new Date(x.endAt).getTime() >= b,
        )
        .sort(
          (x, d) =>
            new Date(x.startAt).getTime() - new Date(d.startAt).getTime(),
        )
        .slice(0, 3);
    }, [i]),
    S = a
      ? "Here's a quick view of your bookings on NEXUS."
      : l
        ? "Here's a quick view of the sessions booked with you."
        : "Here's the operational view of the booking platform.";
  return c.jsxs("section", {
    className: le.page,
    children: [
      c.jsxs("header", {
        className: le.hero,
        children: [
          c.jsxs("div", {
            children: [
              c.jsx("p", { className: le.eyebrow, children: "Welcome back" }),
              c.jsxs("h1", {
                className: le.title,
                children: [
                  "Hi, ",
                  c.jsx("span", {
                    className: le.highlight,
                    children: (e == null ? void 0 : e.givenName) || "there",
                  }),
                  " 👋",
                ],
              }),
              c.jsx("p", { className: le.subtitle, children: S }),
            ],
          }),
          c.jsxs("div", {
            className: le.heroActions,
            children: [
              c.jsxs(Ge, {
                to: "/appointments",
                className: le.heroSecondary,
                children: [c.jsx(Jf, {}), " See all"],
              }),
              (a || t === "ADMIN" || t === "ASSISTANT") &&
                c.jsxs(Ge, {
                  to: "/appointments",
                  className: le.heroPrimary,
                  children: [c.jsx(ap, {}), " Book a session"],
                }),
            ],
          }),
        ],
      }),
      s &&
        c.jsxs("div", {
          className: le.loading,
          children: [
            c.jsx(Kl, { size: "lg" }),
            c.jsx("span", { children: "Loading your dashboard…" }),
          ],
        }),
      !s &&
        o &&
        c.jsxs("div", {
          className: le.errorBox,
          children: [
            c.jsx("strong", { children: "Couldn't load your data." }),
            c.jsx("span", { children: o }),
          ],
        }),
      !s &&
        !o &&
        c.jsxs(c.Fragment, {
          children: [
            c.jsxs("div", {
              className: le.statsGrid,
              children: [
                c.jsx(bn, {
                  icon: Jf,
                  label: "Total bookings",
                  value: h.total,
                }),
                c.jsx(bn, {
                  icon: lp,
                  label: "Upcoming",
                  value: h.upcoming,
                  accent: "primary",
                }),
                c.jsx(bn, {
                  icon: tp,
                  label: "Confirmed",
                  value: h.confirmed,
                  accent: "success",
                }),
                n &&
                  c.jsx(bn, {
                    icon: W6,
                    label: "Awaiting approval",
                    value: h.pending,
                    accent: "warning",
                  }),
                c.jsx(bn, {
                  icon: io,
                  label: "High no-show risk",
                  value: h.highRisk,
                  accent: "warning",
                }),
              ],
            }),
            c.jsxs("section", {
              className: le.section,
              children: [
                c.jsxs("header", {
                  className: le.sectionHead,
                  children: [
                    c.jsx("h2", { children: "Next sessions" }),
                    c.jsx(Ge, {
                      to: "/appointments",
                      className: le.sectionLink,
                      children: "See all →",
                    }),
                  ],
                }),
                v.length === 0
                  ? c.jsx(Lu, {
                      icon: "🗓️",
                      title: "No upcoming sessions",
                      description: l
                        ? "When clients book with you, sessions will show up here."
                        : "You don't have any session scheduled. Book one to get started.",
                    })
                  : c.jsx("ul", {
                      className: le.nextList,
                      children: v.map((b) =>
                        c.jsxs(
                          "li",
                          {
                            className: le.nextItem,
                            children: [
                              c.jsxs("div", {
                                className: le.nextInfo,
                                children: [
                                  c.jsx("span", {
                                    className: le.nextWhen,
                                    children: Xh(b.startAt, b.endAt),
                                  }),
                                  b.notes &&
                                    c.jsx("span", {
                                      className: le.nextNote,
                                      children: b.notes,
                                    }),
                                ],
                              }),
                              c.jsxs("div", {
                                className: le.nextMeta,
                                children: [
                                  c.jsx(Yh, { status: b.status }),
                                  b.noShowProbability != null &&
                                    c.jsxs("span", {
                                      className: le.risk,
                                      children: [
                                        "risk ",
                                        Math.round(b.noShowProbability * 100),
                                        "%",
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          },
                          b.id,
                        ),
                      ),
                    }),
              ],
            }),
          ],
        }),
    ],
  });
}
async function xv(e, t) {
  const a = await we.post("/auth/login", { identifier: e, password: t });
  if (!(a != null && a.token))
    throw new Fs("Invalid credentials", { status: 401 });
  const l = a.token.replace(/^Bearer\s+/i, "");
  return (localStorage.setItem("token", l), a);
}
async function Nv(e) {
  const t = {
    fullName: e.fullName,
    givenName: e.givenName,
    identificationDocument: e.identificationDocument,
    contact: { phoneNumber: e.phoneNumber, email: e.email, address: e.address },
    username: e.username,
    password: e.password,
    role: "Client",
  };
  return we.post("/auth/register", t);
}
function Zh() {
  return localStorage.getItem("token");
}
function Gn() {
  localStorage.removeItem("token");
}
async function Ev() {
  const e = Zh();
  if (!e) return !1;
  try {
    return !!(await we.get("/auth/validate", {
      headers: { Authorization: `Bearer ${e}` },
    }));
  } catch {
    return !1;
  }
}
const jv = "_svg_1ixuq_1",
  Av = "_wordmark_1ixuq_6",
  wv = "_text_1ixuq_12",
  Cv = "_textInverse_1ixuq_20",
  Bi = { svg: jv, wordmark: Av, text: wv, textInverse: Cv };
function Ba({
  size: e = 40,
  variant: t = "mark",
  tone: a = "primary",
  label: l = "NEXUS",
}) {
  const n = `logo-grad-${a}`,
    i = a === "inverse",
    u = i ? "#ffffff" : "#4f9ed1",
    s = i ? "#e0f2fe" : "#154e78",
    r = i ? "#1e6fa8" : "#ffffff",
    f = c.jsxs("svg", {
      width: e,
      height: e,
      viewBox: "0 0 48 48",
      role: "img",
      "aria-label": l,
      xmlns: "http://www.w3.org/2000/svg",
      className: Bi.svg,
      children: [
        c.jsx("defs", {
          children: c.jsxs("linearGradient", {
            id: n,
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "100%",
            children: [
              c.jsx("stop", { offset: "0%", stopColor: u }),
              c.jsx("stop", { offset: "100%", stopColor: s }),
            ],
          }),
        }),
        c.jsx("rect", {
          x: "2",
          y: "2",
          width: "44",
          height: "44",
          rx: "12",
          fill: `url(#${n})`,
        }),
        c.jsxs("g", {
          stroke: r,
          strokeWidth: "4",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "none",
          children: [
            c.jsx("line", { x1: "15", y1: "34", x2: "15", y2: "14" }),
            c.jsx("line", { x1: "15", y1: "14", x2: "33", y2: "34" }),
            c.jsx("line", { x1: "33", y1: "34", x2: "33", y2: "14" }),
          ],
        }),
        c.jsx("circle", { cx: "36", cy: "12", r: "3.2", fill: "#f97316" }),
      ],
    });
  return t === "mark"
    ? f
    : c.jsxs("span", {
        className: Bi.wordmark,
        children: [
          f,
          c.jsx("span", {
            className: `${Bi.text} ${i ? Bi.textInverse : ""}`,
            "aria-hidden": !0,
            children: "NEXUS",
          }),
        ],
      });
}
const zv = "_navbar_rp9cn_1",
  Tv = "_inner_rp9cn_11",
  Mv = "_logoLink_rp9cn_22",
  Rv = "_menuButton_rp9cn_28",
  Ov = "_list_rp9cn_39",
  Dv = "_link_rp9cn_48",
  Lv = "_active_rp9cn_64",
  Uv = "_logout_rp9cn_75",
  Bv = "_listOpen_rp9cn_118",
  Zt = {
    navbar: zv,
    inner: Tv,
    logoLink: Mv,
    menuButton: Rv,
    list: Ov,
    link: Dv,
    active: Lv,
    logout: Uv,
    listOpen: Bv,
  },
  Hv = [
    { to: "/", label: "Home", roles: null },
    { to: "/services", label: "Services", roles: null },
    { to: "/appointments", label: "Appointments", roles: null },
    { to: "/users", label: "Users", roles: ["ADMIN", "ASSISTANT"] },
    { to: "/change-password", label: "Password", roles: null },
  ];
function qv(e) {
  return (e || "").replace(/^ROLE_/, "").toUpperCase();
}
function Yv() {
  const e = oa(),
    t = at(),
    [a, l] = g.useState(!1),
    n = Va(),
    i = qv(n == null ? void 0 : n.role),
    u = Hv.filter((f) => !f.roles || f.roles.includes(i)),
    s = () => {
      (Gn(), e("/login"));
    },
    r = (f) => t.pathname === f,
    o = () => l(!1);
  return c.jsx("nav", {
    className: Zt.navbar,
    children: c.jsxs("div", {
      className: Zt.inner,
      children: [
        c.jsx(Ge, {
          to: "/",
          className: Zt.logoLink,
          onClick: o,
          "aria-label": "NEXUS home",
          children: c.jsx(Ba, { size: 36, variant: "wordmark" }),
        }),
        c.jsx("button", {
          type: "button",
          className: Zt.menuButton,
          onClick: () => l((f) => !f),
          "aria-label": "Toggle menu",
          "aria-expanded": a,
          children: a ? c.jsx(rn, {}) : c.jsx(up, {}),
        }),
        c.jsxs("ul", {
          className: `${Zt.list} ${a ? Zt.listOpen : ""}`,
          children: [
            u.map((f) =>
              c.jsx(
                "li",
                {
                  children: c.jsx(Ge, {
                    to: f.to,
                    onClick: o,
                    className: `${Zt.link} ${r(f.to) ? Zt.active : ""}`,
                    children: f.label,
                  }),
                },
                f.to,
              ),
            ),
            c.jsx("li", {
              children: c.jsxs("button", {
                type: "button",
                onClick: s,
                className: Zt.logout,
                "aria-label": "Logout",
                children: [c.jsx(Q6, {}), " Logout"],
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
const Vv = "_footer_1hgn1_1",
  $v = "_content_1hgn1_31",
  Gv = "_brandLine_1hgn1_43",
  Xv = "_brand_1hgn1_43",
  Qv = "_authorLine_1hgn1_63",
  Zv = "_socialList_1hgn1_89",
  ml = {
    footer: Vv,
    content: $v,
    brandLine: Gv,
    brand: Xv,
    authorLine: Qv,
    socialList: Zv,
  },
  kv = [
    { icon: B6, url: "https://github.com/andrealsp", label: "GitHub" },
    {
      icon: U6,
      url: "https://www.linkedin.com/in/andre-pereira/",
      label: "LinkedIn",
    },
    { icon: Lh, url: "mailto:andre.alsp@outlook.com", label: "Email" },
    { icon: L6, url: "https://wa.me/5511986760568", label: "WhatsApp" },
  ];
function Kv() {
  return c.jsxs("footer", {
    className: ml.footer,
    children: [
      c.jsxs("div", {
        className: ml.content,
        children: [
          c.jsxs("p", {
            className: ml.brandLine,
            children: [
              c.jsx("span", { className: ml.brand, children: "NEXUS" }),
              " © 2026",
            ],
          }),
          c.jsxs("p", {
            className: ml.authorLine,
            children: [
              "Developed by ",
              c.jsx("span", { children: "Andre Luis" }),
            ],
          }),
        ],
      }),
      c.jsx("ul", {
        className: ml.socialList,
        children: kv.map(({ icon: e, url: t, label: a }) =>
          c.jsx(
            "li",
            {
              children: c.jsx("a", {
                href: t,
                target: "_blank",
                rel: "noreferrer",
                "aria-label": a,
                children: c.jsx(e, {}),
              }),
            },
            a,
          ),
        ),
      }),
    ],
  });
}
const Jv = [
    {
      id: "consult-30",
      name: "Quick Consultation",
      icon: "💬",
      durationMinutes: 30,
      price: 80,
      description:
        "Short focused session to align expectations, scope and next steps.",
      tags: ["Discovery", "Online"],
    },
    {
      id: "consult-60",
      name: "In-Depth Session",
      icon: "🧠",
      durationMinutes: 60,
      price: 150,
      description:
        "A one-hour deep dive into the topic, with a follow-up summary delivered after the meeting.",
      tags: ["Deep work", "Online", "Most popular"],
    },
    {
      id: "support-90",
      name: "Implementation Support",
      icon: "⚙️",
      durationMinutes: 90,
      price: 220,
      description:
        "Hands-on session focused on execution: pair-coding, reviews or rollout assistance.",
      tags: ["Hands-on", "Online"],
    },
    {
      id: "audit-120",
      name: "Architecture Audit",
      icon: "🛠️",
      durationMinutes: 120,
      price: 320,
      description:
        "Two-hour structured review with written recommendations covering risks, gaps and roadmap.",
      tags: ["Senior", "Written report"],
    },
  ],
  Fv = "_page_10sdo_1",
  Wv = "_header_10sdo_11",
  Pv = "_eyebrow_10sdo_21",
  Iv = "_title_10sdo_30",
  eg = "_subtitle_10sdo_41",
  tg = "_grid_10sdo_48",
  ag = "_card_10sdo_54",
  lg = "_cardHeader_10sdo_80",
  ng = "_icon_10sdo_87",
  ig = "_tags_10sdo_98",
  ug = "_tag_10sdo_98",
  cg = "_name_10sdo_116",
  sg = "_description_10sdo_123",
  rg = "_meta_10sdo_131",
  og = "_duration_10sdo_139",
  fg = "_price_10sdo_148",
  dg = "_book_10sdo_154",
  hg = "_disclaimer_10sdo_188",
  Me = {
    page: Fv,
    header: Wv,
    eyebrow: Pv,
    title: Iv,
    subtitle: eg,
    grid: tg,
    card: ag,
    cardHeader: lg,
    icon: ng,
    tags: ig,
    tag: ug,
    name: cg,
    description: sg,
    meta: rg,
    duration: og,
    price: fg,
    book: dg,
    disclaimer: hg,
  };
function mg(e) {
  return new Intl.NumberFormat(void 0, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(e);
}
function pg() {
  const e = oa();
  function t(a) {
    e("/appointments", { state: { selectedService: a } });
  }
  return c.jsxs("section", {
    className: Me.page,
    children: [
      c.jsxs("header", {
        className: Me.header,
        children: [
          c.jsx("p", { className: Me.eyebrow, children: "What we offer" }),
          c.jsxs("h1", {
            className: Me.title,
            children: [
              "Choose the ",
              c.jsx("span", { children: "service" }),
              " that fits you",
            ],
          }),
          c.jsx("p", {
            className: Me.subtitle,
            children:
              "Transparent durations and pricing — pick one and we'll prefill it on the booking form.",
          }),
        ],
      }),
      c.jsx("div", {
        className: Me.grid,
        children: Jv.map((a) =>
          c.jsxs(
            "article",
            {
              className: Me.card,
              children: [
                c.jsxs("div", {
                  className: Me.cardHeader,
                  children: [
                    c.jsx("span", {
                      className: Me.icon,
                      "aria-hidden": !0,
                      children: a.icon,
                    }),
                    c.jsx("div", {
                      className: Me.tags,
                      children: a.tags.map((l) =>
                        c.jsx("span", { className: Me.tag, children: l }, l),
                      ),
                    }),
                  ],
                }),
                c.jsx("h2", { className: Me.name, children: a.name }),
                c.jsx("p", {
                  className: Me.description,
                  children: a.description,
                }),
                c.jsxs("div", {
                  className: Me.meta,
                  children: [
                    c.jsxs("span", {
                      className: Me.duration,
                      children: [c.jsx(Uh, {}), " ", a.durationMinutes, " min"],
                    }),
                    c.jsx("span", {
                      className: Me.price,
                      children: mg(a.price),
                    }),
                  ],
                }),
                c.jsxs("button", {
                  type: "button",
                  className: Me.book,
                  onClick: () => t(a),
                  children: ["Book this service ", c.jsx(Hh, {})],
                }),
              ],
            },
            a.id,
          ),
        ),
      }),
      c.jsxs("footer", {
        className: Me.disclaimer,
        children: [
          c.jsx("span", { children: "📌" }),
          c.jsx("p", {
            children:
              "Services and pricing shown above are illustrative — the backend catalog endpoint is on the roadmap. Bookings already flow through the live API.",
          }),
        ],
      }),
    ],
  });
}
const vg = "_toast_x4cpd_1",
  gg = "_slideIn_x4cpd_1",
  yg = "_message_x4cpd_24",
  _g = "_close_x4cpd_31",
  bg = "_success_x4cpd_44",
  Sg = "_error_x4cpd_48",
  xg = "_warning_x4cpd_52",
  Hi = {
    toast: vg,
    slideIn: gg,
    message: yg,
    close: _g,
    success: bg,
    error: Sg,
    warning: xg,
  };
function kh({
  message: e,
  variant: t = "info",
  onDismiss: a,
  duration: l = 4e3,
}) {
  return (
    g.useEffect(() => {
      if (!e || !l) return;
      const n = setTimeout(() => (a == null ? void 0 : a()), l);
      return () => clearTimeout(n);
    }, [e, l, a]),
    e
      ? c.jsxs("div", {
          className: `${Hi.toast} ${Hi[t] || ""}`,
          role: "status",
          children: [
            c.jsx("span", { className: Hi.message, children: e }),
            c.jsx("button", {
              type: "button",
              className: Hi.close,
              onClick: a,
              "aria-label": "Dismiss",
              children: "×",
            }),
          ],
        })
      : null
  );
}
const Ng = "_card_16r2v_1",
  Eg = "_head_16r2v_21",
  jg = "_noShow_16r2v_28",
  Ag = "_noShowLabel_16r2v_39",
  wg = "_noShowValue_16r2v_43",
  Cg = "_low_16r2v_47",
  zg = "_medium_16r2v_52",
  Tg = "_high_16r2v_57",
  Mg = "_body_16r2v_62",
  Rg = "_row_16r2v_70",
  Og = "_icon_16r2v_76",
  Dg = "_muted_16r2v_82",
  Lg = "_uuid_16r2v_87",
  Ug = "_notes_16r2v_95",
  Bg = "_cancelReasonBox_16r2v_100",
  Hg = "_actions_16r2v_120",
  qg = "_confirm_16r2v_127",
  Yg = "_cancel_16r2v_100",
  ye = {
    card: Ng,
    head: Eg,
    noShow: jg,
    noShowLabel: Ag,
    noShowValue: wg,
    low: Cg,
    medium: zg,
    high: Tg,
    body: Mg,
    row: Rg,
    icon: Og,
    muted: Dg,
    uuid: Lg,
    notes: Ug,
    cancelReasonBox: Bg,
    actions: Hg,
    confirm: qg,
    cancel: Yg,
  };
function Vg({ probability: e }) {
  if (e == null) return null;
  const t = Math.round(e * 100);
  let a = "low";
  return (
    t >= 70 ? (a = "high") : t >= 40 && (a = "medium"),
    c.jsxs("div", {
      className: `${ye.noShow} ${ye[a]}`,
      title: "AI-estimated probability that the client will not show up",
      children: [
        c.jsx("span", { className: ye.noShowLabel, children: "No-show risk" }),
        c.jsxs("span", { className: ye.noShowValue, children: [t, "%"] }),
      ],
    })
  );
}
function $g({
  appointment: e,
  viewerRole: t,
  onConfirm: a,
  onCancel: l,
  busyAction: n,
}) {
  const i = Xp(e.startAt, e.endAt),
    u =
      e.status === "CANCELLED" ||
      e.status === "COMPLETED" ||
      e.status === "NO_SHOW",
    s =
      e.status === "PENDING_APPROVAL" &&
      (t === "PROVIDER" || t === "ASSISTANT" || t === "ADMIN"),
    r =
      t === "CLIENT"
        ? { icon: H6, label: "Provider", value: e.providerId }
        : { icon: V6, label: "Client", value: e.clientId };
  return c.jsxs("article", {
    className: ye.card,
    children: [
      c.jsxs("div", {
        className: ye.head,
        children: [
          c.jsx(Yh, { status: e.status }),
          c.jsx(Vg, { probability: e.noShowProbability }),
        ],
      }),
      c.jsxs("div", {
        className: ye.body,
        children: [
          c.jsxs("div", {
            className: ye.row,
            children: [
              c.jsx(np, { className: ye.icon, "aria-hidden": !0 }),
              c.jsx("span", { children: $p(e.startAt) }),
            ],
          }),
          c.jsxs("div", {
            className: ye.row,
            children: [
              c.jsx(Uh, { className: ye.icon, "aria-hidden": !0 }),
              c.jsxs("span", {
                children: [
                  If(e.startAt),
                  " – ",
                  If(e.endAt),
                  " ",
                  c.jsxs("span", {
                    className: ye.muted,
                    children: ["(", i, " min)"],
                  }),
                ],
              }),
            ],
          }),
          c.jsxs("div", {
            className: ye.row,
            children: [
              c.jsx(r.icon, { className: ye.icon, "aria-hidden": !0 }),
              c.jsxs("span", {
                className: ye.uuid,
                children: [r.label, ": ", c.jsx("code", { children: r.value })],
              }),
            ],
          }),
          e.notes &&
            c.jsxs("div", {
              className: ye.row,
              children: [
                c.jsx(G6, { className: ye.icon, "aria-hidden": !0 }),
                c.jsx("span", { className: ye.notes, children: e.notes }),
              ],
            }),
          e.status === "CANCELLED" &&
            e.cancellationReason &&
            c.jsxs("div", {
              className: ye.cancelReasonBox,
              children: [
                c.jsx("strong", { children: "Cancellation reason:" }),
                " ",
                e.cancellationReason,
              ],
            }),
        ],
      }),
      c.jsxs("div", {
        className: ye.actions,
        children: [
          s &&
            c.jsxs("button", {
              type: "button",
              className: ye.confirm,
              onClick: () => (a == null ? void 0 : a(e)),
              disabled: n === "confirm",
              children: [
                c.jsx(Bh, {}),
                n === "confirm" ? "Approving…" : "Approve",
              ],
            }),
          !u &&
            c.jsxs("button", {
              type: "button",
              className: ye.cancel,
              onClick: () => (l == null ? void 0 : l(e)),
              disabled: n === "cancel",
              children: [
                c.jsx(cp, {}),
                n === "cancel" ? "Cancelling…" : "Cancel",
              ],
            }),
        ],
      }),
    ],
  });
}
function Gg({ providerId: e, clientId: t, around: a, limit: l = 5 }) {
  const n = new URLSearchParams({
    providerId: e,
    clientId: t,
    limit: String(l),
  });
  return (
    a && n.set("around", a),
    we.get(`/scheduling/suggest?${n.toString()}`)
  );
}
function Xg() {
  return we.get("/providers");
}
const Qg = "_backdrop_17rro_1",
  Zg = "_modal_17rro_17",
  kg = "_head_17rro_33",
  Kg = "_servicePill_17rro_49",
  Jg = "_close_17rro_62",
  Fg = "_form_17rro_78",
  Wg = "_row_17rro_86",
  Pg = "_field_17rro_92",
  Ig = "_loadingInline_17rro_146",
  ey = "_fieldErrorBox_17rro_157",
  ty = "_fieldEmptyBox_17rro_166",
  ay = "_suggestRow_17rro_175",
  ly = "_suggestBtn_17rro_182",
  ny = "_suggestError_17rro_207",
  iy = "_suggestLoading_17rro_212",
  uy = "_suggestList_17rro_220",
  cy = "_suggestItem_17rro_231",
  sy = "_suggestRange_17rro_250",
  ry = "_suggestMeta_17rro_256",
  oy = "_formError_17rro_261",
  fy = "_actions_17rro_270",
  dy = "_primary_17rro_277",
  hy = "_secondary_17rro_278",
  ue = {
    backdrop: Qg,
    modal: Zg,
    head: kg,
    servicePill: Kg,
    close: Jg,
    form: Fg,
    row: Wg,
    field: Pg,
    loadingInline: Ig,
    fieldErrorBox: ey,
    fieldEmptyBox: ty,
    suggestRow: ay,
    suggestBtn: ly,
    suggestError: ny,
    suggestLoading: iy,
    suggestList: uy,
    suggestItem: cy,
    suggestRange: sy,
    suggestMeta: ry,
    formError: oy,
    actions: fy,
    primary: dy,
    secondary: hy,
  },
  my = 60;
function py() {
  const e = new Date();
  return (e.setMinutes(0, 0, 0), e.setHours(e.getHours() + 1), Qh(e));
}
function vy({ clientId: e, onSubmit: t, onClose: a, error: l, service: n }) {
  const [i, u] = g.useState(""),
    [s, r] = g.useState(py()),
    [o, f] = g.useState((n == null ? void 0 : n.durationMinutes) || my),
    [p, h] = g.useState(n ? `Service: ${n.name}` : ""),
    [v, S] = g.useState(!1),
    [b, x] = g.useState([]),
    [d, m] = g.useState(!0),
    [y, _] = g.useState(null),
    [E, C] = g.useState([]),
    [w, j] = g.useState(!1),
    [z, M] = g.useState(null);
  (g.useEffect(() => {
    function R(A) {
      A.key === "Escape" && (a == null || a());
    }
    return (
      window.addEventListener("keydown", R),
      () => window.removeEventListener("keydown", R)
    );
  }, [a]),
    g.useEffect(() => {
      let R = !1;
      async function A() {
        try {
          const O = await Xg();
          if (R) return;
          const L = Array.isArray(O) ? O : [];
          (x(L),
            u((J) => {
              var I;
              return J || ((I = L[0]) == null ? void 0 : I.id) || "";
            }));
        } catch (O) {
          if (R) return;
          _(O.message || "Failed to load providers");
        } finally {
          R || m(!1);
        }
      }
      return (
        A(),
        () => {
          R = !0;
        }
      );
    }, []));
  async function P() {
    if ((M(null), !i)) {
      M("Pick a provider first to fetch suggestions");
      return;
    }
    j(!0);
    try {
      const R = ed(s),
        A = await Gg({ providerId: i, clientId: e, around: R, limit: 5 });
      C((A == null ? void 0 : A.suggestions) || A || []);
    } catch (R) {
      M(R.message || "Failed to fetch suggestions");
    } finally {
      j(!1);
    }
  }
  function se(R) {
    r(Qh(R.startAt));
    const A = Math.max(
      5,
      Math.round((new Date(R.endAt) - new Date(R.startAt)) / 6e4),
    );
    f(A);
  }
  async function lt(R) {
    (R.preventDefault(), S(!0));
    const A = ed(s),
      O = Gp(s, Number(o)).toISOString();
    try {
      await t({
        providerId: i,
        clientId: e,
        startAt: A,
        endAt: O,
        notes: p || void 0,
      });
    } finally {
      S(!1);
    }
  }
  const Ve = !d && !y && b.length === 0;
  return c.jsx("div", {
    className: ue.backdrop,
    role: "dialog",
    "aria-modal": "true",
    onClick: (R) => {
      R.target === R.currentTarget && (a == null || a());
    },
    children: c.jsxs("div", {
      className: ue.modal,
      children: [
        c.jsxs("header", {
          className: ue.head,
          children: [
            c.jsxs("div", {
              children: [
                c.jsx("h3", { children: "New appointment" }),
                n &&
                  c.jsxs("p", {
                    className: ue.servicePill,
                    children: [
                      c.jsx("span", { "aria-hidden": !0, children: n.icon }),
                      c.jsx("span", { children: n.name }),
                    ],
                  }),
              ],
            }),
            c.jsx("button", {
              type: "button",
              className: ue.close,
              onClick: a,
              "aria-label": "Close",
              children: c.jsx(rn, {}),
            }),
          ],
        }),
        c.jsxs("form", {
          className: ue.form,
          onSubmit: lt,
          children: [
            c.jsxs("label", {
              className: ue.field,
              children: [
                c.jsxs("span", {
                  children: [c.jsx(zh, { "aria-hidden": !0 }), " Provider"],
                }),
                d
                  ? c.jsxs("div", {
                      className: ue.loadingInline,
                      children: [
                        c.jsx(Kl, {}),
                        " ",
                        c.jsx("span", { children: "Loading providers…" }),
                      ],
                    })
                  : y
                    ? c.jsxs("div", {
                        className: ue.fieldErrorBox,
                        children: ["Couldn't load providers: ", y],
                      })
                    : Ve
                      ? c.jsx("div", {
                          className: ue.fieldEmptyBox,
                          children:
                            "No users with the PROVIDER role yet. Ask one to sign up before booking.",
                        })
                      : c.jsx("select", {
                          value: i,
                          onChange: (R) => u(R.target.value),
                          required: !0,
                          children: b.map((R) => {
                            const A = R.givenName || R.fullName,
                              O = R.position ? `${R.position} - ${A}` : A;
                            return c.jsxs(
                              "option",
                              {
                                value: R.id,
                                children: [
                                  O,
                                  R.serviceProvided
                                    ? ` · ${R.serviceProvided}`
                                    : "",
                                ],
                              },
                              R.id,
                            );
                          }),
                        }),
              ],
            }),
            c.jsxs("div", {
              className: ue.row,
              children: [
                c.jsxs("label", {
                  className: ue.field,
                  children: [
                    c.jsx("span", { children: "Start" }),
                    c.jsx("input", {
                      type: "datetime-local",
                      value: s,
                      onChange: (R) => r(R.target.value),
                      required: !0,
                    }),
                  ],
                }),
                c.jsxs("label", {
                  className: ue.field,
                  children: [
                    c.jsx("span", { children: "Duration (min)" }),
                    c.jsx("input", {
                      type: "number",
                      min: "15",
                      step: "15",
                      value: o,
                      onChange: (R) => f(R.target.value),
                      required: !0,
                    }),
                  ],
                }),
              ],
            }),
            c.jsxs("label", {
              className: ue.field,
              children: [
                c.jsx("span", { children: "Notes" }),
                c.jsx("textarea", {
                  rows: 3,
                  value: p,
                  onChange: (R) => h(R.target.value),
                  placeholder: "Any context for the provider…",
                }),
              ],
            }),
            c.jsxs("div", {
              className: ue.suggestRow,
              children: [
                c.jsxs("button", {
                  type: "button",
                  className: ue.suggestBtn,
                  onClick: P,
                  disabled: w || !i,
                  children: [
                    c.jsx(F6, {}),
                    w ? "Asking AI…" : "AI suggestions",
                  ],
                }),
                z && c.jsx("span", { className: ue.suggestError, children: z }),
              ],
            }),
            w &&
              c.jsxs("div", {
                className: ue.suggestLoading,
                children: [
                  c.jsx(Kl, {}),
                  " ",
                  c.jsx("span", { children: "Fetching smart slots…" }),
                ],
              }),
            E.length > 0 &&
              c.jsx("ul", {
                className: ue.suggestList,
                children: E.map((R, A) =>
                  c.jsx(
                    "li",
                    {
                      children: c.jsxs("button", {
                        type: "button",
                        className: ue.suggestItem,
                        onClick: () => se(R),
                        children: [
                          c.jsx("span", {
                            className: ue.suggestRange,
                            children: Xh(R.startAt, R.endAt),
                          }),
                          c.jsxs("span", {
                            className: ue.suggestMeta,
                            children: [
                              "score ",
                              (R.score * 100).toFixed(0),
                              "% · ",
                              R.reason,
                            ],
                          }),
                        ],
                      }),
                    },
                    `${R.startAt}-${A}`,
                  ),
                ),
              }),
            l && c.jsx("div", { className: ue.formError, children: l }),
            c.jsxs("div", {
              className: ue.actions,
              children: [
                c.jsx("button", {
                  type: "button",
                  className: ue.secondary,
                  onClick: a,
                  disabled: v,
                  children: "Cancel",
                }),
                c.jsx("button", {
                  type: "submit",
                  className: ue.primary,
                  disabled: v || Ve || !i,
                  children: v ? "Saving…" : "Create appointment",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
const gy = "_backdrop_ihqcl_1",
  yy = "_modal_ihqcl_14",
  _y = "_head_ihqcl_24",
  by = "_close_ihqcl_39",
  Sy = "_form_ihqcl_54",
  xy = "_notice_ihqcl_61",
  Ny = "_field_ihqcl_84",
  Ey = "_req_ihqcl_96",
  jy = "_errorMsg_ihqcl_122",
  Ay = "_errorBox_ihqcl_128",
  wy = "_actions_ihqcl_137",
  Cy = "_danger_ihqcl_144",
  zy = "_secondary_ihqcl_145",
  nt = {
    backdrop: gy,
    modal: yy,
    head: _y,
    close: by,
    form: Sy,
    notice: xy,
    field: Ny,
    req: Ey,
    errorMsg: jy,
    errorBox: Ay,
    actions: wy,
    danger: Cy,
    secondary: zy,
  };
function Ty({
  appointment: e,
  reasonRequired: t = !1,
  onSubmit: a,
  onClose: l,
  error: n,
}) {
  const [i, u] = g.useState(""),
    [s, r] = g.useState(!1),
    [o, f] = g.useState(!1);
  g.useEffect(() => {
    function v(S) {
      S.key === "Escape" && (l == null || l());
    }
    return (
      window.addEventListener("keydown", v),
      () => window.removeEventListener("keydown", v)
    );
  }, [l]);
  const p = t && !i.trim();
  async function h(v) {
    if ((v.preventDefault(), f(!0), !p)) {
      r(!0);
      try {
        await a(i.trim() || null);
      } finally {
        r(!1);
      }
    }
  }
  return c.jsx("div", {
    className: nt.backdrop,
    role: "dialog",
    "aria-modal": "true",
    onClick: (v) => {
      v.target === v.currentTarget && (l == null || l());
    },
    children: c.jsxs("div", {
      className: nt.modal,
      children: [
        c.jsxs("header", {
          className: nt.head,
          children: [
            c.jsx("h3", { children: "Cancel appointment" }),
            c.jsx("button", {
              type: "button",
              className: nt.close,
              onClick: l,
              "aria-label": "Close",
              children: c.jsx(rn, {}),
            }),
          ],
        }),
        c.jsxs("form", {
          className: nt.form,
          onSubmit: h,
          children: [
            c.jsxs("div", {
              className: nt.notice,
              children: [
                c.jsx(io, { "aria-hidden": !0 }),
                c.jsxs("p", {
                  children: [
                    "You are about to cancel an appointment.",
                    " ",
                    t
                      ? c.jsx("strong", { children: "The reason is required." })
                      : "A short reason helps everyone involved understand what happened.",
                  ],
                }),
              ],
            }),
            c.jsxs("label", {
              className: nt.field,
              children: [
                c.jsxs("span", {
                  children: [
                    "Reason ",
                    t &&
                      c.jsx("em", {
                        className: nt.req,
                        children: "· required",
                      }),
                  ],
                }),
                c.jsx("textarea", {
                  rows: 4,
                  value: i,
                  onChange: (v) => u(v.target.value),
                  placeholder: t
                    ? "Why are you cancelling? (visible to the client)"
                    : "Optional context for the audit log",
                  maxLength: 500,
                  required: t,
                  onBlur: () => f(!0),
                }),
                o &&
                  p &&
                  c.jsx("span", {
                    className: nt.errorMsg,
                    children: "Provider cancellations require a reason.",
                  }),
              ],
            }),
            n && c.jsx("div", { className: nt.errorBox, children: n }),
            c.jsxs("div", {
              className: nt.actions,
              children: [
                c.jsx("button", {
                  type: "button",
                  className: nt.secondary,
                  onClick: l,
                  disabled: s,
                  children: "Keep appointment",
                }),
                c.jsx("button", {
                  type: "submit",
                  className: nt.danger,
                  disabled: s || p,
                  children: s ? "Cancelling…" : "Confirm cancellation",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
const My = "_page_14ok1_1",
  Ry = "_header_14ok1_11",
  Oy = "_title_14ok1_19",
  Dy = "_subtitle_14ok1_26",
  Ly = "_headerActions_14ok1_32",
  Uy = "_iconBtn_14ok1_38",
  By = "_spinning_14ok1_64",
  Hy = "_primaryBtn_14ok1_68",
  qy = "_filters_14ok1_92",
  Yy = "_filter_14ok1_92",
  Vy = "_filterActive_14ok1_117",
  $y = "_filterCount_14ok1_126",
  Gy = "_grid_14ok1_146",
  Xy = "_loadingBox_14ok1_152",
  Qy = "_errorBox_14ok1_162",
  Xe = {
    page: My,
    header: Ry,
    title: Oy,
    subtitle: Dy,
    headerActions: Ly,
    iconBtn: Uy,
    spinning: By,
    primaryBtn: Hy,
    filters: qy,
    filter: Yy,
    filterActive: Vy,
    filterCount: $y,
    grid: Gy,
    loadingBox: Xy,
    errorBox: Qy,
  };
function Zy(e) {
  return (e || "").replace(/^ROLE_/, "").toUpperCase();
}
function td(e) {
  return e === "CANCELLED" || e === "COMPLETED" || e === "NO_SHOW";
}
function ky(e) {
  const t = [
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" },
    { id: "all", label: "All" },
  ];
  return (
    (e === "PROVIDER" || e === "ADMIN" || e === "ASSISTANT") &&
      t.splice(1, 0, { id: "pending", label: "Awaiting approval" }),
    t
  );
}
function Ky() {
  const e = Va(),
    t = Zy(e == null ? void 0 : e.role),
    a = t === "CLIENT",
    l = t === "PROVIDER",
    n = t === "ADMIN" || t === "ASSISTANT",
    i = at(),
    u = oa(),
    [s, r] = g.useState([]),
    [o, f] = g.useState(!0),
    [p, h] = g.useState(!1),
    [v, S] = g.useState(null),
    [b, x] = g.useState(null),
    d = ky(t),
    m = l ? "pending" : "upcoming",
    [y, _] = g.useState(m),
    [E, C] = g.useState(!1),
    [w, j] = g.useState(null),
    [z, M] = g.useState(null),
    [P, se] = g.useState(null),
    [lt, Ve] = g.useState(null),
    [R, A] = g.useState(null),
    [O, L] = g.useState(null);
  g.useEffect(() => {
    var ve;
    const Z = (ve = i.state) == null ? void 0 : ve.selectedService;
    Z &&
      !E &&
      (M(Z), j(null), C(!0), u(i.pathname, { replace: !0, state: null }));
  }, [i.state]);
  const J = g.useCallback(async () => {
    if (!(e != null && e.id)) {
      (S("Could not identify the current user"), f(!1));
      return;
    }
    S(null);
    try {
      const Z = a ? await Vh(e.id) : await $h(e.id);
      r(Array.isArray(Z) ? Z : []);
    } catch (Z) {
      S(Z.message || "Failed to load appointments");
    } finally {
      (f(!1), h(!1));
    }
  }, [e == null ? void 0 : e.id, a]);
  g.useEffect(() => {
    J();
  }, [J]);
  const I = g.useMemo(() => {
      const Z = Date.now();
      return s
        .filter((ve) =>
          y === "pending"
            ? ve.status === "PENDING_APPROVAL"
            : y === "upcoming"
              ? !td(ve.status) && new Date(ve.endAt).getTime() >= Z
              : y === "past"
                ? td(ve.status) || new Date(ve.endAt).getTime() < Z
                : !0,
        )
        .sort(
          (ve, Ot) =>
            new Date(ve.startAt).getTime() - new Date(Ot.startAt).getTime(),
        );
    }, [s, y]),
    T = g.useMemo(
      () => s.filter((Z) => Z.status === "PENDING_APPROVAL").length,
      [s],
    );
  async function G(Z) {
    j(null);
    try {
      const ve = await Dp(Z);
      (r((fl) => [...fl, ve]), C(!1));
      const Ot =
        ve.status === "PENDING_APPROVAL"
          ? "Request sent — awaiting provider approval"
          : "Appointment scheduled";
      x({ variant: "success", message: Ot });
    } catch (ve) {
      j(ve.message || "Failed to create appointment");
    }
  }
  async function $e(Z) {
    (A(Z.id), L("confirm"));
    try {
      const ve = await Lp(Z.id);
      (r((Ot) => Ot.map((fl) => (fl.id === ve.id ? ve : fl))),
        x({ variant: "success", message: "Appointment approved" }));
    } catch (ve) {
      x({ variant: "error", message: ve.message || "Approve failed" });
    } finally {
      (A(null), L(null));
    }
  }
  function Te(Z) {
    (Ve(null), se(Z));
  }
  async function Vt(Z) {
    if (!P) return;
    const ve = P;
    (A(ve.id), L("cancel"), Ve(null));
    try {
      const Ot = await Up(ve.id, Z);
      (r((fl) => fl.map((ro) => (ro.id === Ot.id ? Ot : ro))),
        se(null),
        x({ variant: "success", message: "Appointment cancelled" }));
    } catch (Ot) {
      Ve(Ot.message || "Cancel failed");
    } finally {
      (A(null), L(null));
    }
  }
  async function so() {
    (h(!0), await J());
  }
  const Fh = a
    ? "Your scheduled sessions"
    : l
      ? "Sessions booked with you"
      : "All appointments on the platform";
  return c.jsxs("section", {
    className: Xe.page,
    children: [
      c.jsxs("header", {
        className: Xe.header,
        children: [
          c.jsxs("div", {
            children: [
              c.jsx("h1", { className: Xe.title, children: "Appointments" }),
              c.jsx("p", { className: Xe.subtitle, children: Fh }),
            ],
          }),
          c.jsxs("div", {
            className: Xe.headerActions,
            children: [
              c.jsx("button", {
                type: "button",
                className: Xe.iconBtn,
                onClick: so,
                disabled: p,
                "aria-label": "Refresh",
                children: c.jsx(Th, { className: p ? Xe.spinning : "" }),
              }),
              (a || n) &&
                c.jsxs("button", {
                  type: "button",
                  className: Xe.primaryBtn,
                  onClick: () => {
                    (j(null), M(null), C(!0));
                  },
                  children: [c.jsx(Mh, {}), " New appointment"],
                }),
            ],
          }),
        ],
      }),
      c.jsx("div", {
        className: Xe.filters,
        children: d.map((Z) =>
          c.jsxs(
            "button",
            {
              type: "button",
              className: `${Xe.filter} ${y === Z.id ? Xe.filterActive : ""}`,
              onClick: () => _(Z.id),
              children: [
                Z.label,
                Z.id === "pending" &&
                  T > 0 &&
                  c.jsx("span", { className: Xe.filterCount, children: T }),
              ],
            },
            Z.id,
          ),
        ),
      }),
      o &&
        c.jsxs("div", {
          className: Xe.loadingBox,
          children: [
            c.jsx(Kl, { size: "lg" }),
            c.jsx("span", { children: "Loading your appointments…" }),
          ],
        }),
      !o &&
        v &&
        c.jsxs("div", {
          className: Xe.errorBox,
          children: [
            c.jsx("strong", { children: "Something went wrong." }),
            c.jsx("span", { children: v }),
            c.jsx("button", {
              type: "button",
              onClick: so,
              children: "Try again",
            }),
          ],
        }),
      !o &&
        !v &&
        I.length === 0 &&
        c.jsx(Lu, {
          icon: "📅",
          title: "No appointments here",
          description:
            y === "pending"
              ? "No requests waiting for approval."
              : y === "upcoming"
                ? "You have no upcoming sessions. Create one to get started."
                : "Nothing to show for this filter.",
        }),
      !o &&
        !v &&
        I.length > 0 &&
        c.jsx("div", {
          className: Xe.grid,
          children: I.map((Z) =>
            c.jsx(
              $g,
              {
                appointment: Z,
                viewerRole: t,
                onConfirm: $e,
                onCancel: Te,
                busyAction: R === Z.id ? O : null,
              },
              Z.id,
            ),
          ),
        }),
      E &&
        c.jsx(vy, {
          clientId: e == null ? void 0 : e.id,
          service: z,
          onSubmit: G,
          onClose: () => {
            (C(!1), M(null));
          },
          error: w,
        }),
      P &&
        c.jsx(Ty, {
          appointment: P,
          reasonRequired: l,
          onSubmit: Vt,
          onClose: () => {
            (se(null), Ve(null));
          },
          error: lt,
        }),
      c.jsx(kh, {
        message: b == null ? void 0 : b.message,
        variant: b == null ? void 0 : b.variant,
        onDismiss: () => x(null),
      }),
    ],
  });
}
const Jy = "_group_137oq_1",
  Fy = "_label_137oq_17",
  Wy = "_input_137oq_33",
  Py = "_error_137oq_89",
  Iy = "_errorText_137oq_99",
  Sn = { group: Jy, label: Fy, input: Wy, error: Py, errorText: Iy };
function ne({
  type: e = "text",
  label: t,
  name: a,
  placeholder: l,
  value: n,
  onChange: i,
  required: u = !1,
  error: s = null,
}) {
  return c.jsxs("div", {
    className: Sn.group,
    children: [
      t && c.jsx("label", { htmlFor: a, className: Sn.label, children: t }),
      c.jsx("input", {
        id: a,
        name: a,
        type: e,
        placeholder: l,
        value: n || "",
        onChange: i,
        required: u,
        className: `${Sn.input} ${s ? Sn.error : ""}`,
      }),
      s && c.jsx("span", { className: Sn.errorText, children: s }),
    ],
  });
}
function Jl(e) {
  return e == null ? "" : String(e).replace(/\D/g, "");
}
function e8(e) {
  const t = Jl(e).slice(0, 11);
  return t.length <= 3
    ? t
    : t.length <= 6
      ? `${t.slice(0, 3)}.${t.slice(3)}`
      : t.length <= 9
        ? `${t.slice(0, 3)}.${t.slice(3, 6)}.${t.slice(6)}`
        : `${t.slice(0, 3)}.${t.slice(3, 6)}.${t.slice(6, 9)}-${t.slice(9, 11)}`;
}
function uo(e) {
  const t = Jl(e);
  if (t.length !== 11 || /^(\d)\1{10}$/.test(t)) return !1;
  let a = 0;
  for (let i = 0; i < 9; i++) a += parseInt(t[i], 10) * (10 - i);
  let l = (a * 10) % 11;
  if ((l === 10 && (l = 0), l !== parseInt(t[9], 10))) return !1;
  a = 0;
  for (let i = 0; i < 10; i++) a += parseInt(t[i], 10) * (11 - i);
  let n = (a * 10) % 11;
  return (n === 10 && (n = 0), n === parseInt(t[10], 10));
}
const t8 = "_group_1bhw3_1",
  a8 = "_label_1bhw3_7",
  l8 = "_inputWrap_1bhw3_13",
  n8 = "_input_1bhw3_13",
  i8 = "_errorInput_1bhw3_49",
  u8 = "_statusBadge_1bhw3_58",
  c8 = "_ok_1bhw3_74",
  s8 = "_bad_1bhw3_78",
  r8 = "_errorText_1bhw3_82",
  kt = {
    group: t8,
    label: a8,
    inputWrap: l8,
    input: n8,
    errorInput: i8,
    statusBadge: u8,
    ok: c8,
    bad: s8,
    errorText: r8,
  };
function Kh({
  label: e = "CPF",
  name: t = "identificationDocument",
  value: a = "",
  onChange: l,
  error: n,
  required: i = !0,
  disabled: u = !1,
  ...s
}) {
  const [r, o] = g.useState(!1),
    f = e8(a),
    p = Jl(a).length === 11,
    h = p && uo(a),
    v = (r && p && !h) || !!n;
  function S(b) {
    const x = Jl(b.target.value).slice(0, 11);
    l == null || l({ target: { name: t, value: x } });
  }
  return c.jsxs("div", {
    className: kt.group,
    children: [
      e && c.jsx("label", { htmlFor: t, className: kt.label, children: e }),
      c.jsxs("div", {
        className: kt.inputWrap,
        children: [
          c.jsx("input", {
            id: t,
            name: t,
            type: "text",
            inputMode: "numeric",
            autoComplete: "off",
            value: f,
            onChange: S,
            onBlur: () => o(!0),
            placeholder: "000.000.000-00",
            maxLength: 14,
            required: i,
            disabled: u,
            className: `${kt.input} ${v ? kt.errorInput : ""}`,
            ...s,
          }),
          p &&
            c.jsx("span", {
              className: `${kt.statusBadge} ${h ? kt.ok : kt.bad}`,
              "aria-hidden": !0,
              children: h ? "✓" : "✗",
            }),
        ],
      }),
      v &&
        c.jsx("span", {
          className: kt.errorText,
          children: n || "Invalid CPF — please double-check the digits.",
        }),
    ],
  });
}
function o8(e) {
  return e
    .toUpperCase()
    .replace(/./g, (t) => String.fromCodePoint(127462 + t.charCodeAt(0) - 65));
}
const f8 = [
    ["BR", "Brazil", "55"],
    ["US", "United States", "1"],
    ["AR", "Argentina", "54"],
    ["AU", "Australia", "61"],
    ["AT", "Austria", "43"],
    ["BE", "Belgium", "32"],
    ["BO", "Bolivia", "591"],
    ["CA", "Canada", "1"],
    ["CL", "Chile", "56"],
    ["CN", "China", "86"],
    ["CO", "Colombia", "57"],
    ["CR", "Costa Rica", "506"],
    ["CU", "Cuba", "53"],
    ["CZ", "Czech Republic", "420"],
    ["DK", "Denmark", "45"],
    ["DO", "Dominican Republic", "1"],
    ["EC", "Ecuador", "593"],
    ["EG", "Egypt", "20"],
    ["SV", "El Salvador", "503"],
    ["FI", "Finland", "358"],
    ["FR", "France", "33"],
    ["DE", "Germany", "49"],
    ["GR", "Greece", "30"],
    ["GT", "Guatemala", "502"],
    ["HN", "Honduras", "504"],
    ["HK", "Hong Kong", "852"],
    ["IS", "Iceland", "354"],
    ["IN", "India", "91"],
    ["ID", "Indonesia", "62"],
    ["IE", "Ireland", "353"],
    ["IL", "Israel", "972"],
    ["IT", "Italy", "39"],
    ["JP", "Japan", "81"],
    ["LU", "Luxembourg", "352"],
    ["MO", "Macau", "853"],
    ["MY", "Malaysia", "60"],
    ["MX", "Mexico", "52"],
    ["MA", "Morocco", "212"],
    ["NL", "Netherlands", "31"],
    ["NZ", "New Zealand", "64"],
    ["NI", "Nicaragua", "505"],
    ["NG", "Nigeria", "234"],
    ["NO", "Norway", "47"],
    ["PK", "Pakistan", "92"],
    ["PA", "Panama", "507"],
    ["PY", "Paraguay", "595"],
    ["PE", "Peru", "51"],
    ["PH", "Philippines", "63"],
    ["PL", "Poland", "48"],
    ["PT", "Portugal", "351"],
    ["PR", "Puerto Rico", "1"],
    ["RO", "Romania", "40"],
    ["RU", "Russia", "7"],
    ["SA", "Saudi Arabia", "966"],
    ["SG", "Singapore", "65"],
    ["ZA", "South Africa", "27"],
    ["KR", "South Korea", "82"],
    ["ES", "Spain", "34"],
    ["SE", "Sweden", "46"],
    ["CH", "Switzerland", "41"],
    ["TW", "Taiwan", "886"],
    ["TH", "Thailand", "66"],
    ["TR", "Turkey", "90"],
    ["UA", "Ukraine", "380"],
    ["AE", "United Arab Emirates", "971"],
    ["GB", "United Kingdom", "44"],
    ["UY", "Uruguay", "598"],
    ["VE", "Venezuela", "58"],
    ["VN", "Vietnam", "84"],
  ],
  Uu = f8
    .map(([e, t, a]) => ({ code: e, name: t, dialCode: a, flag: o8(e) }))
    .sort((e, t) => e.name.localeCompare(t.name)),
  d8 = Uu.find((e) => e.code === "BR");
function Bu(e) {
  return (e && Uu.find((t) => t.dialCode === String(e))) || null;
}
function Ha(e) {
  return e == null ? "" : String(e).replace(/\D/g, "");
}
function ad(e, t) {
  const a = Bu("55");
  if (!e)
    return {
      dialCode: (a == null ? void 0 : a.dialCode) || "55",
      national: "",
    };
  const l = Ha(e);
  if (!l)
    return {
      dialCode: (a == null ? void 0 : a.dialCode) || "55",
      national: "",
    };
  for (let n = 4; n >= 1; n--) {
    if (l.length <= n) continue;
    const i = l.slice(0, n);
    if (Bu(i)) return { dialCode: i, national: l.slice(n) };
  }
  return { dialCode: (a == null ? void 0 : a.dialCode) || "55", national: l };
}
function h8(e, t) {
  const a = Ha(t);
  return e === "55"
    ? a.length === 11
      ? `(${a.slice(0, 2)}) ${a.slice(2, 7)}-${a.slice(7)}`
      : a.length === 10
        ? `(${a.slice(0, 2)}) ${a.slice(2, 6)}-${a.slice(6)}`
        : a
    : e === "1"
      ? a.length === 10
        ? `(${a.slice(0, 3)}) ${a.slice(3, 6)}-${a.slice(6)}`
        : a
      : a.replace(/(.{4})(?=.)/g, "$1 ");
}
function m8(e, t) {
  const a = Ha(t);
  return a && e === "55"
    ? a.length === 11 && a[2] === "9"
      ? "mobile"
      : a.length === 10 && /^[2-5]/.test(a.slice(2, 3))
        ? "landline"
        : "unknown"
    : "unknown";
}
function p8(e, t) {
  const a = Ha(t);
  return a ? `+${e}${a}` : "";
}
const v8 = "_group_132ci_1",
  g8 = "_label_132ci_8",
  y8 = "_row_132ci_14",
  _8 = "_rowError_132ci_30",
  b8 = "_countryTrigger_132ci_39",
  S8 = "_flag_132ci_63",
  x8 = "_dial_132ci_67",
  N8 = "_chev_132ci_72",
  E8 = "_numberInput_132ci_77",
  j8 = "_lineBadge_132ci_100",
  A8 = "_lineMobile_132ci_115",
  w8 = "_lineLandline_132ci_120",
  C8 = "_lineLabel_132ci_125",
  z8 = "_errorText_132ci_129",
  T8 = "_picker_132ci_137",
  M8 = "_searchWrap_132ci_154",
  R8 = "_searchIcon_132ci_160",
  O8 = "_searchInput_132ci_169",
  D8 = "_list_132ci_186",
  L8 = "_item_132ci_194",
  U8 = "_itemActive_132ci_210",
  B8 = "_itemFlag_132ci_215",
  H8 = "_itemName_132ci_219",
  q8 = "_itemDial_132ci_225",
  Y8 = "_empty_132ci_231",
  oe = {
    group: v8,
    label: g8,
    row: y8,
    rowError: _8,
    countryTrigger: b8,
    flag: S8,
    dial: x8,
    chev: N8,
    numberInput: E8,
    lineBadge: j8,
    lineMobile: A8,
    lineLandline: w8,
    lineLabel: C8,
    errorText: z8,
    picker: T8,
    searchWrap: M8,
    searchIcon: R8,
    searchInput: O8,
    list: D8,
    item: L8,
    itemActive: U8,
    itemFlag: B8,
    itemName: H8,
    itemDial: q8,
    empty: Y8,
  };
function Jh({
  label: e = "Phone",
  name: t = "phoneNumber",
  value: a = "",
  onChange: l,
  error: n,
  required: i = !0,
  disabled: u = !1,
}) {
  const s = g.useMemo(() => ad(a), []),
    [r, o] = g.useState(() => Bu(s.dialCode) || d8),
    [f, p] = g.useState(s.national),
    [h, v] = g.useState(!1),
    [S, b] = g.useState(""),
    x = g.useRef(null),
    d = g.useRef(null);
  (g.useEffect(() => {
    const j = ad(a);
    (o((z) =>
      (z == null ? void 0 : z.dialCode) === j.dialCode
        ? z
        : Bu(j.dialCode) || z,
    ),
      p(j.national));
  }, [a]),
    g.useEffect(() => {
      function j(M) {
        x.current && !x.current.contains(M.target) && v(!1);
      }
      function z(M) {
        M.key === "Escape" && v(!1);
      }
      return (
        h &&
          (document.addEventListener("mousedown", j),
          document.addEventListener("keydown", z),
          setTimeout(() => {
            var M;
            return (M = d.current) == null ? void 0 : M.focus();
          }, 30)),
        () => {
          (document.removeEventListener("mousedown", j),
            document.removeEventListener("keydown", z));
        }
      );
    }, [h]));
  function m(j, z) {
    const M = p8(j.dialCode, z);
    l == null || l({ target: { name: t, value: M } });
  }
  function y(j) {
    const z = Ha(j.target.value);
    (p(z), m(r, z));
  }
  function _(j) {
    (o(j), v(!1), b(""), m(j, f));
  }
  const E = g.useMemo(() => {
      const j = S.trim().toLowerCase();
      return j
        ? Uu.filter(
            (z) =>
              z.name.toLowerCase().includes(j) ||
              z.dialCode.includes(j) ||
              z.code.toLowerCase().includes(j),
          )
        : Uu;
    }, [S]),
    C = m8(r.dialCode, f),
    w = Ha(f).length >= 8;
  return c.jsxs("div", {
    className: oe.group,
    children: [
      e && c.jsx("label", { htmlFor: t, className: oe.label, children: e }),
      c.jsxs("div", {
        className: `${oe.row} ${n ? oe.rowError : ""}`,
        ref: x,
        children: [
          c.jsxs("button", {
            type: "button",
            className: oe.countryTrigger,
            onClick: () => !u && v((j) => !j),
            disabled: u,
            "aria-haspopup": "listbox",
            "aria-expanded": h,
            children: [
              c.jsx("span", { className: oe.flag, children: r.flag }),
              c.jsxs("span", {
                className: oe.dial,
                children: ["+", r.dialCode],
              }),
              c.jsx(I6, { className: oe.chev, "aria-hidden": !0 }),
            ],
          }),
          c.jsx("input", {
            id: t,
            name: t,
            type: "tel",
            autoComplete: "tel-national",
            value: h8(r.dialCode, f),
            onChange: y,
            placeholder:
              r.dialCode === "55" ? "(11) 99999-1234" : "Phone number",
            required: i,
            disabled: u,
            className: oe.numberInput,
          }),
          w &&
            C !== "unknown" &&
            c.jsxs("span", {
              className: `${oe.lineBadge} ${C === "mobile" ? oe.lineMobile : oe.lineLandline}`,
              title: C === "mobile" ? "Mobile number" : "Landline number",
              children: [
                C === "mobile" ? c.jsx(J6, {}) : c.jsx(k6, {}),
                c.jsx("span", {
                  className: oe.lineLabel,
                  children: C === "mobile" ? "Mobile" : "Landline",
                }),
              ],
            }),
          h &&
            c.jsxs("div", {
              className: oe.picker,
              role: "listbox",
              children: [
                c.jsxs("div", {
                  className: oe.searchWrap,
                  children: [
                    c.jsx(Z6, { className: oe.searchIcon, "aria-hidden": !0 }),
                    c.jsx("input", {
                      ref: d,
                      type: "search",
                      value: S,
                      onChange: (j) => b(j.target.value),
                      placeholder: "Search country or code",
                      className: oe.searchInput,
                    }),
                  ],
                }),
                c.jsx("ul", {
                  className: oe.list,
                  children:
                    E.length === 0
                      ? c.jsx("li", {
                          className: oe.empty,
                          children: "No country matches",
                        })
                      : E.map((j) =>
                          c.jsxs(
                            "li",
                            {
                              role: "option",
                              "aria-selected": r.code === j.code,
                              className: `${oe.item} ${r.code === j.code ? oe.itemActive : ""}`,
                              onClick: () => _(j),
                              children: [
                                c.jsx("span", {
                                  className: oe.itemFlag,
                                  children: j.flag,
                                }),
                                c.jsx("span", {
                                  className: oe.itemName,
                                  children: j.name,
                                }),
                                c.jsxs("span", {
                                  className: oe.itemDial,
                                  children: ["+", j.dialCode],
                                }),
                              ],
                            },
                            `${j.code}-${j.dialCode}`,
                          ),
                        ),
                }),
              ],
            }),
        ],
      }),
      n && c.jsx("span", { className: oe.errorText, children: n }),
    ],
  });
}
const zt = {
  minLength: 8,
  maxLength: 64,
  allowedSpecials: "!@#$%^&*()-_=+[]{}<>?/,.:|~",
};
function _i(e) {
  if (!e) return "Password is required.";
  if (e.length < zt.minLength)
    return `Password must have at least ${zt.minLength} characters.`;
  if (e.length > zt.maxLength)
    return `Password must have at most ${zt.maxLength} characters.`;
  const t = zt.allowedSpecials.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^[A-Za-z0-9${t}]+$`).test(e)
    ? /[A-Z]/.test(e)
      ? /[a-z]/.test(e)
        ? /\d/.test(e)
          ? new RegExp(`[${t}]`).test(e)
            ? null
            : `Password must include one of: ${zt.allowedSpecials}`
          : "Password must include a digit."
        : "Password must include a lowercase letter."
      : "Password must include an uppercase letter."
    : `Password contains disallowed characters. Allowed specials: ${zt.allowedSpecials}`;
}
function V8(e, t) {
  return we.post("/auth/forgot-password", { identifier: e, channel: t });
}
function $8({ identifier: e, code: t, newPassword: a }) {
  return we.post("/auth/reset-password", {
    identifier: e,
    code: t,
    newPassword: a,
  });
}
function G8({ currentPassword: e, newPassword: t }) {
  return we.post("/auth/change-password", {
    currentPassword: e,
    newPassword: t,
  });
}
function X8(e) {
  return we.post("/auth/recover-username", { email: e });
}
const Q8 = "_backdrop_rtq3p_1",
  Z8 = "_modal_rtq3p_14",
  k8 = "_head_rtq3p_27",
  K8 = "_close_rtq3p_42",
  J8 = "_form_rtq3p_57",
  F8 = "_section_rtq3p_65",
  W8 = "_sectionHead_rtq3p_71",
  P8 = "_row_rtq3p_86",
  I8 = "_roleRow_rtq3p_98",
  e5 = "_roleChip_rtq3p_104",
  t5 = "_roleChipActive_rtq3p_128",
  a5 = "_roleChipLocked_rtq3p_140",
  l5 = "_editPasswordNote_rtq3p_150",
  n5 = "_errorBox_rtq3p_165",
  i5 = "_errorMsg_rtq3p_174",
  u5 = "_actions_rtq3p_180",
  c5 = "_primary_rtq3p_187",
  s5 = "_secondary_rtq3p_188",
  ae = {
    backdrop: Q8,
    modal: Z8,
    head: k8,
    close: K8,
    form: J8,
    section: F8,
    sectionHead: W8,
    row: P8,
    roleRow: I8,
    roleChip: e5,
    roleChipActive: t5,
    roleChipLocked: a5,
    editPasswordNote: l5,
    errorBox: n5,
    errorMsg: i5,
    actions: u5,
    primary: c5,
    secondary: s5,
  },
  r5 = [
    { id: "Client", label: "Client" },
    { id: "Provider", label: "Provider" },
    { id: "Assistant", label: "Assistant" },
    { id: "Admin", label: "Admin" },
  ],
  ld = {
    fullName: "",
    givenName: "",
    identificationDocument: "",
    phoneNumber: "",
    email: "",
    address: "",
    username: "",
    password: "",
    role: "Client",
    position: "",
    serviceProvided: "",
  };
function o5(e, t) {
  var l, n, i, u, s, r, o, f;
  const a = {};
  if (
    (((l = e.fullName) != null && l.trim()) || (a.fullName = "Required"),
    ((n = e.givenName) != null && n.trim()) || (a.givenName = "Required"),
    Jl(e.identificationDocument)
      ? uo(e.identificationDocument) ||
        (a.identificationDocument = "Invalid CPF — double-check the digits")
      : (a.identificationDocument = "CPF is required"),
    (!((i = e.phoneNumber) != null && i.trim()) ||
      Ha(e.phoneNumber).length < 8) &&
      (a.phoneNumber = "Phone is required"),
    (!((u = e.email) != null && u.trim()) || !/^\S+@\S+\.\S+$/.test(e.email)) &&
      (a.email = "Valid email required (must contain '@')"),
    (!((s = e.username) != null && s.trim()) || e.username.length < 3) &&
      (a.username = "Min 3 chars"),
    !t)
  ) {
    const p = _i(e.password);
    p && (a.password = p);
  }
  return (
    e.role || (a.role = "Pick a role"),
    e.role === "Provider"
      ? (((r = e.position) != null && r.trim()) ||
          (a.position = "Required for Provider"),
        ((o = e.serviceProvided) != null && o.trim()) ||
          (a.serviceProvided = "Required for Provider"))
      : e.role === "Assistant" &&
        (((f = e.position) != null && f.trim()) ||
          (a.position = "Required for Assistant")),
    a
  );
}
function f5({
  initial: e,
  onSubmit: t,
  onClose: a,
  error: l,
  lockedRole: n = !1,
}) {
  const i = !!e,
    [u, s] = g.useState(() => ({ ...ld, ...(e || {}), password: "" })),
    [r, o] = g.useState({}),
    [f, p] = g.useState(!1);
  (g.useEffect(() => {
    e && s((d) => ({ ...ld, ...e, password: "" }));
  }, [e]),
    g.useEffect(() => {
      function d(m) {
        m.key === "Escape" && (a == null || a());
      }
      return (
        window.addEventListener("keydown", d),
        () => window.removeEventListener("keydown", d)
      );
    }, [a]));
  function h(d) {
    const { name: m, value: y } = d.target;
    (s((_) => ({ ..._, [m]: y })),
      r[m] &&
        o((_) => {
          const E = { ..._ };
          return (delete E[m], E);
        }));
  }
  async function v(d) {
    d.preventDefault();
    const m = o5(u, i);
    if ((o(m), !(Object.keys(m).length > 0))) {
      p(!0);
      try {
        await t(u);
      } finally {
        p(!1);
      }
    }
  }
  const S = u.role === "Provider",
    b = u.role === "Assistant",
    x = S || b;
  return c.jsx("div", {
    className: ae.backdrop,
    role: "dialog",
    "aria-modal": "true",
    onClick: (d) => {
      d.target === d.currentTarget && (a == null || a());
    },
    children: c.jsxs("div", {
      className: ae.modal,
      children: [
        c.jsxs("header", {
          className: ae.head,
          children: [
            c.jsx("h3", { children: i ? "Edit user" : "Create user" }),
            c.jsx("button", {
              type: "button",
              className: ae.close,
              onClick: a,
              "aria-label": "Close",
              children: c.jsx(rn, {}),
            }),
          ],
        }),
        c.jsxs("form", {
          className: ae.form,
          onSubmit: v,
          noValidate: !0,
          children: [
            c.jsxs("section", {
              className: ae.section,
              children: [
                c.jsxs("header", {
                  className: ae.sectionHead,
                  children: [
                    c.jsx(cc, { "aria-hidden": !0 }),
                    c.jsx("span", { children: "Identity" }),
                  ],
                }),
                c.jsxs("div", {
                  className: ae.row,
                  children: [
                    c.jsx(ne, {
                      label: "Full name",
                      name: "fullName",
                      value: u.fullName,
                      onChange: h,
                      error: r.fullName,
                    }),
                    c.jsx(ne, {
                      label: "Preferred name",
                      name: "givenName",
                      value: u.givenName,
                      onChange: h,
                      error: r.givenName,
                    }),
                  ],
                }),
                c.jsx(Kh, {
                  name: "identificationDocument",
                  value: u.identificationDocument,
                  onChange: h,
                  error: r.identificationDocument,
                }),
              ],
            }),
            c.jsxs("section", {
              className: ae.section,
              children: [
                c.jsxs("header", {
                  className: ae.sectionHead,
                  children: [
                    c.jsx(qh, { "aria-hidden": !0 }),
                    c.jsx("span", { children: "Contact" }),
                  ],
                }),
                c.jsx(ne, {
                  label: "Email",
                  type: "email",
                  name: "email",
                  value: u.email,
                  onChange: h,
                  error: r.email,
                }),
                c.jsx(Jh, {
                  name: "phoneNumber",
                  value: u.phoneNumber,
                  onChange: h,
                  error: r.phoneNumber,
                }),
                c.jsx(ne, {
                  label: "Address",
                  name: "address",
                  value: u.address,
                  onChange: h,
                  placeholder: "City, State / Country",
                }),
              ],
            }),
            c.jsxs("section", {
              className: ae.section,
              children: [
                c.jsxs("header", {
                  className: ae.sectionHead,
                  children: [
                    c.jsx(Rh, { "aria-hidden": !0 }),
                    c.jsx("span", { children: i ? "Account" : "Credentials" }),
                  ],
                }),
                c.jsxs("div", {
                  className: ae.row,
                  children: [
                    c.jsx(ne, {
                      label: "Username",
                      name: "username",
                      value: u.username,
                      onChange: h,
                      error: r.username,
                      disabled: i,
                    }),
                    !i &&
                      c.jsx(ne, {
                        label: "Temporary password",
                        type: "password",
                        name: "password",
                        value: u.password,
                        onChange: h,
                        error: r.password,
                        autoComplete: "new-password",
                        placeholder:
                          "User will be asked to rotate it at first login",
                      }),
                  ],
                }),
                i &&
                  c.jsxs("p", {
                    className: ae.editPasswordNote,
                    children: [
                      "Use the ",
                      c.jsx("strong", { children: "“Reset password”" }),
                      " button on the user list to change this user's password.",
                    ],
                  }),
              ],
            }),
            c.jsxs("section", {
              className: ae.section,
              children: [
                c.jsxs("header", {
                  className: ae.sectionHead,
                  children: [
                    c.jsx(Ch, { "aria-hidden": !0 }),
                    c.jsx("span", { children: "Role" }),
                  ],
                }),
                c.jsx("div", {
                  className: ae.roleRow,
                  children: r5.map((d) =>
                    c.jsxs(
                      "label",
                      {
                        className: `${ae.roleChip} ${u.role === d.id ? ae.roleChipActive : ""} ${n ? ae.roleChipLocked : ""}`,
                        children: [
                          c.jsx("input", {
                            type: "radio",
                            name: "role",
                            value: d.id,
                            checked: u.role === d.id,
                            onChange: h,
                            disabled: n,
                          }),
                          c.jsx("span", { children: d.label }),
                        ],
                      },
                      d.id,
                    ),
                  ),
                }),
                r.role &&
                  c.jsx("span", { className: ae.errorMsg, children: r.role }),
              ],
            }),
            x &&
              c.jsxs("section", {
                className: ae.section,
                children: [
                  c.jsxs("header", {
                    className: ae.sectionHead,
                    children: [
                      c.jsx(ip, { "aria-hidden": !0 }),
                      c.jsx("span", {
                        children: S ? "Practice" : "Assignment",
                      }),
                    ],
                  }),
                  c.jsx(ne, {
                    label: S
                      ? "Position / specialty"
                      : "Position (manager, coordinator, operator, …)",
                    name: "position",
                    value: u.position,
                    onChange: h,
                    error: r.position,
                    placeholder: S
                      ? "e.g. Dentist · Orthodontist · Therapist"
                      : "e.g. Coordinator",
                  }),
                  S &&
                    c.jsx(ne, {
                      label: "Service provided",
                      name: "serviceProvided",
                      value: u.serviceProvided,
                      onChange: h,
                      error: r.serviceProvided,
                      placeholder:
                        "e.g. Orthodontic care · Pediatric dentistry",
                    }),
                ],
              }),
            l && c.jsx("div", { className: ae.errorBox, children: l }),
            c.jsxs("div", {
              className: ae.actions,
              children: [
                c.jsx("button", {
                  type: "button",
                  className: ae.secondary,
                  onClick: a,
                  disabled: f,
                  children: "Cancel",
                }),
                c.jsx("button", {
                  type: "submit",
                  className: ae.primary,
                  disabled: f,
                  children: f ? "Saving…" : i ? "Save changes" : "Create user",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
const d5 = "_list_1uyxu_1",
  h5 = "_rule_1uyxu_13",
  m5 = "_ok_1uyxu_26",
  p5 = "_specials_1uyxu_30",
  Hu = { list: d5, rule: h5, ok: m5, specials: p5 };
function xn({ ok: e, children: t }) {
  return c.jsxs("li", {
    className: `${Hu.rule} ${e ? Hu.ok : ""}`,
    children: [
      e ? c.jsx(Bh, { "aria-hidden": !0 }) : c.jsx(rn, { "aria-hidden": !0 }),
      c.jsx("span", { children: t }),
    ],
  });
}
function co({ value: e = "" }) {
  const t = zt.allowedSpecials.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    a = /[A-Z]/.test(e),
    l = /[a-z]/.test(e),
    n = /\d/.test(e),
    i = new RegExp(`[${t}]`).test(e),
    u = e.length >= zt.minLength;
  return c.jsxs("ul", {
    className: Hu.list,
    "aria-label": "Password requirements",
    children: [
      c.jsxs(xn, {
        ok: u,
        children: ["At least ", zt.minLength, " characters"],
      }),
      c.jsx(xn, { ok: a, children: "One uppercase letter (A–Z)" }),
      c.jsx(xn, { ok: l, children: "One lowercase letter (a–z)" }),
      c.jsx(xn, { ok: n, children: "One digit (0–9)" }),
      c.jsxs(xn, {
        ok: i,
        children: [
          "One special from",
          " ",
          c.jsx("code", {
            className: Hu.specials,
            children: zt.allowedSpecials,
          }),
        ],
      }),
    ],
  });
}
const v5 = "_backdrop_2rg2y_1",
  g5 = "_modal_2rg2y_14",
  y5 = "_head_2rg2y_27",
  _5 = "_close_2rg2y_49",
  b5 = "_body_2rg2y_64",
  S5 = "_notice_2rg2y_72",
  x5 = "_subtitle_2rg2y_95",
  N5 = "_error_2rg2y_102",
  E5 = "_actions_2rg2y_111",
  j5 = "_primary_2rg2y_118",
  A5 = "_secondary_2rg2y_119",
  Qe = {
    backdrop: v5,
    modal: g5,
    head: y5,
    close: _5,
    body: b5,
    notice: S5,
    subtitle: x5,
    error: N5,
    actions: E5,
    primary: j5,
    secondary: A5,
  };
function w5({ user: e, onConfirm: t, onClose: a, error: l }) {
  const [n, i] = g.useState("confirm"),
    [u, s] = g.useState(""),
    [r, o] = g.useState(!1),
    [f, p] = g.useState(null);
  g.useEffect(() => {
    function S(b) {
      b.key === "Escape" && (a == null || a());
    }
    return (
      window.addEventListener("keydown", S),
      () => window.removeEventListener("keydown", S)
    );
  }, [a]);
  async function h(S) {
    (S.preventDefault(), p(null));
    const b = _i(u);
    if (b) {
      p(b);
      return;
    }
    o(!0);
    try {
      await t(u);
    } finally {
      o(!1);
    }
  }
  const v =
    (e == null ? void 0 : e.givenName) ||
    (e == null ? void 0 : e.fullName) ||
    "this user";
  return c.jsx("div", {
    className: Qe.backdrop,
    role: "dialog",
    "aria-modal": "true",
    onClick: (S) => {
      S.target === S.currentTarget && (a == null || a());
    },
    children: c.jsxs("div", {
      className: Qe.modal,
      children: [
        c.jsxs("header", {
          className: Qe.head,
          children: [
            c.jsxs("h3", {
              children: [c.jsx(Oh, { "aria-hidden": !0 }), " Reset password"],
            }),
            c.jsx("button", {
              type: "button",
              className: Qe.close,
              onClick: a,
              "aria-label": "Close",
              children: c.jsx(rn, {}),
            }),
          ],
        }),
        n === "confirm" &&
          c.jsxs("div", {
            className: Qe.body,
            children: [
              c.jsxs("div", {
                className: Qe.notice,
                children: [
                  c.jsx(io, { "aria-hidden": !0 }),
                  c.jsxs("p", {
                    children: [
                      "Reset the password for ",
                      c.jsx("strong", { children: v }),
                      "?",
                      c.jsx("br", {}),
                      "After confirming, you'll define a temporary password. The user will be forced to change it at the next login.",
                    ],
                  }),
                ],
              }),
              c.jsxs("div", {
                className: Qe.actions,
                children: [
                  c.jsx("button", {
                    type: "button",
                    className: Qe.secondary,
                    onClick: a,
                    children: "Cancel",
                  }),
                  c.jsx("button", {
                    type: "button",
                    className: Qe.primary,
                    onClick: () => i("password"),
                    children: "Continue",
                  }),
                ],
              }),
            ],
          }),
        n === "password" &&
          c.jsxs("form", {
            onSubmit: h,
            className: Qe.body,
            noValidate: !0,
            children: [
              c.jsxs("p", {
                className: Qe.subtitle,
                children: [
                  "Choose a temporary password for",
                  " ",
                  c.jsx("strong", { children: v }),
                  ". Share it through a private channel — the user will be required to change it at next login.",
                ],
              }),
              c.jsx(ne, {
                label: "Temporary password",
                type: "password",
                name: "temporaryPassword",
                value: u,
                onChange: (S) => s(S.target.value),
                autoComplete: "new-password",
                autoFocus: !0,
              }),
              c.jsx(co, { value: u }),
              (f || l) &&
                c.jsx("div", { className: Qe.error, children: f || l }),
              c.jsxs("div", {
                className: Qe.actions,
                children: [
                  c.jsx("button", {
                    type: "button",
                    className: Qe.secondary,
                    onClick: () => i("confirm"),
                    disabled: r,
                    children: "Back",
                  }),
                  c.jsx("button", {
                    type: "submit",
                    className: Qe.primary,
                    disabled: r,
                    children: r ? "Resetting…" : "OK · Reset password",
                  }),
                ],
              }),
            ],
          }),
      ],
    }),
  });
}
function C5() {
  return we.get("/admin/users");
}
function nd(e) {
  return we.get(`/admin/users/${e}`);
}
function z5(e) {
  return we.post("/admin/users", e);
}
function T5(e, t) {
  return we.patch(`/admin/users/${e}`, t);
}
function M5(e, t) {
  return we.post(`/admin/users/${e}/reset-password`, { temporaryPassword: t });
}
function R5(e) {
  return we.delete(`/admin/users/${e}`);
}
const O5 = "_page_tapnb_1",
  D5 = "_header_tapnb_10",
  L5 = "_eyebrow_tapnb_18",
  U5 = "_title_tapnb_27",
  B5 = "_subtitle_tapnb_34",
  H5 = "_headerActions_tapnb_40",
  q5 = "_iconBtn_tapnb_46",
  Y5 = "_spinning_tapnb_70",
  V5 = "_spin_tapnb_70",
  $5 = "_primaryBtn_tapnb_74",
  G5 = "_toolbar_tapnb_95",
  X5 = "_filters_tapnb_103",
  Q5 = "_filter_tapnb_103",
  Z5 = "_filterActive_tapnb_127",
  k5 = "_search_tapnb_132",
  K5 = "_tableWrap_tapnb_150",
  J5 = "_table_tapnb_150",
  F5 = "_nameCell_tapnb_185",
  W5 = "_fullName_tapnb_191",
  P5 = "_givenName_tapnb_195",
  I5 = "_pill_tapnb_200",
  e_ = "_pill_danger_tapnb_212",
  t_ = "_pill_warning_tapnb_213",
  a_ = "_pill_info_tapnb_214",
  l_ = "_pill_muted_tapnb_215",
  n_ = "_actionsCell_tapnb_217",
  i_ = "_actionBtn_tapnb_222",
  u_ = "_danger_tapnb_241",
  c_ = "_warningBtn_tapnb_250",
  s_ = "_lockedHint_tapnb_259",
  r_ = "_loadingBox_tapnb_271",
  o_ = "_errorBox_tapnb_281",
  f_ = "_nameCellWrap_tapnb_368",
  Q = {
    page: O5,
    header: D5,
    eyebrow: L5,
    title: U5,
    subtitle: B5,
    headerActions: H5,
    iconBtn: q5,
    spinning: Y5,
    spin: V5,
    primaryBtn: $5,
    toolbar: G5,
    filters: X5,
    filter: Q5,
    filterActive: Z5,
    search: k5,
    tableWrap: K5,
    table: J5,
    nameCell: F5,
    fullName: W5,
    givenName: P5,
    pill: I5,
    pill_danger: e_,
    pill_warning: t_,
    pill_info: a_,
    pill_muted: l_,
    actionsCell: n_,
    actionBtn: i_,
    danger: u_,
    warningBtn: c_,
    lockedHint: s_,
    loadingBox: r_,
    errorBox: o_,
    nameCellWrap: f_,
  },
  d_ = {
    ADMIN: { label: "Admin", icon: Ch, tone: "danger" },
    ASSISTANT: { label: "Assistant", icon: q6, tone: "warning" },
    PROVIDER: { label: "Provider", icon: zh, tone: "info" },
    CLIENT: { label: "Client", icon: cc, tone: "muted" },
  },
  h_ = [
    { id: "ALL", label: "All" },
    { id: "ADMIN", label: "Admins" },
    { id: "ASSISTANT", label: "Assistants" },
    { id: "PROVIDER", label: "Providers" },
    { id: "CLIENT", label: "Clients" },
  ];
function m_(e) {
  const t = d_[e] || { label: e, icon: cc, tone: "muted" },
    a = t.icon;
  return c.jsxs("span", {
    className: `${Q.pill} ${Q[`pill_${t.tone}`]}`,
    children: [c.jsx(a, { "aria-hidden": !0 }), " ", t.label],
  });
}
function p_() {
  var I;
  const e = Va(),
    t =
      (I = e == null ? void 0 : e.role) == null
        ? void 0
        : I.replace(/^ROLE_/, ""),
    a = t === "ADMIN" || t === "ASSISTANT",
    [l, n] = g.useState([]),
    [i, u] = g.useState(!0),
    [s, r] = g.useState(!1),
    [o, f] = g.useState(null),
    [p, h] = g.useState("ALL"),
    [v, S] = g.useState(""),
    [b, x] = g.useState(!1),
    [d, m] = g.useState(null),
    [y, _] = g.useState(!1),
    [E, C] = g.useState(null),
    [w, j] = g.useState(null),
    [z, M] = g.useState(null),
    [P, se] = g.useState(null),
    lt = g.useCallback(async () => {
      f(null);
      try {
        const T = await C5();
        n(Array.isArray(T) ? T : []);
      } catch (T) {
        f(T.message || "Failed to load users");
      } finally {
        (u(!1), r(!1));
      }
    }, []);
  g.useEffect(() => {
    if (!a) {
      u(!1);
      return;
    }
    lt();
  }, [lt, a]);
  const Ve = g.useMemo(() => {
    const T = v.trim().toLowerCase();
    return l.filter((G) =>
      p !== "ALL" && (G.role || "").toUpperCase() !== p
        ? !1
        : T
          ? (G.fullName || "").toLowerCase().includes(T) ||
            (G.givenName || "").toLowerCase().includes(T) ||
            (G.email || "").toLowerCase().includes(T)
          : !0,
    );
  }, [l, p, v]);
  async function R(T) {
    (_(!0), C(null));
    try {
      const G = await nd(T.id);
      (m(G), x(!0));
    } catch (G) {
      se({
        variant: "error",
        message: G.message || "Could not load this user",
      });
    } finally {
      _(!1);
    }
  }
  async function A(T) {
    C(null);
    try {
      const G = {
          fullName: T.fullName,
          givenName: T.givenName,
          identificationDocument: T.identificationDocument,
          contact: {
            phoneNumber: T.phoneNumber,
            email: T.email,
            address: T.address,
          },
          username: T.username,
          password: T.password,
          role: T.role,
          position: T.position || void 0,
          serviceProvided: T.serviceProvided || void 0,
        },
        $e = await z5(G);
      (n((Te) => [...Te, $e]),
        x(!1),
        m(null),
        se({ variant: "success", message: "User created" }));
    } catch (G) {
      C(G.message || "Failed to create user");
    }
  }
  async function O(T) {
    C(null);
    try {
      const G = {
          fullName: T.fullName,
          givenName: T.givenName,
          identificationDocument: T.identificationDocument,
          phoneNumber: T.phoneNumber,
          email: T.email,
          address: T.address,
          role: T.role,
          position: T.position || null,
          serviceProvided: T.serviceProvided || null,
        },
        $e = await T5(d.id, G);
      (n((Te) => Te.map((Vt) => (Vt.id === $e.id ? $e : Vt))),
        x(!1),
        m(null),
        se({ variant: "success", message: "User updated" }));
    } catch (G) {
      C(G.message || "Failed to update user");
    }
  }
  async function L(T) {
    if (t !== "ADMIN") {
      se({ variant: "warning", message: "Only Admin can delete users" });
      return;
    }
    if (window.confirm(`Delete user ${T.givenName || T.fullName}?`))
      try {
        (await R5(T.id),
          n((G) => G.filter(($e) => $e.id !== T.id)),
          se({ variant: "success", message: "User deleted" }));
      } catch (G) {
        se({ variant: "error", message: G.message || "Delete failed" });
      }
  }
  async function J(T) {
    M(null);
    try {
      await M5(w.id, T);
      try {
        const G = await nd(w.id);
        n(($e) => $e.map((Te) => (Te.id === G.id ? G : Te)));
      } catch {}
      (j(null),
        se({
          variant: "success",
          message: "Password reset — user must change it at next login.",
        }));
    } catch (G) {
      M(G.message || "Reset failed");
    }
  }
  return e
    ? a
      ? c.jsxs("section", {
          className: Q.page,
          children: [
            c.jsxs("header", {
              className: Q.header,
              children: [
                c.jsxs("div", {
                  children: [
                    c.jsx("p", {
                      className: Q.eyebrow,
                      children: "User management",
                    }),
                    c.jsx("h1", { className: Q.title, children: "Users" }),
                    c.jsx("p", {
                      className: Q.subtitle,
                      children:
                        "Create, edit and reset passwords. Only Admin can permanently remove accounts.",
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: Q.headerActions,
                  children: [
                    c.jsx("button", {
                      type: "button",
                      className: Q.iconBtn,
                      onClick: () => {
                        (r(!0), lt());
                      },
                      disabled: s,
                      "aria-label": "Refresh",
                      children: c.jsx(Th, { className: s ? Q.spinning : "" }),
                    }),
                    c.jsxs("button", {
                      type: "button",
                      className: Q.primaryBtn,
                      onClick: () => {
                        (m(null), C(null), x(!0));
                      },
                      children: [c.jsx(Mh, {}), " New user"],
                    }),
                  ],
                }),
              ],
            }),
            c.jsxs("div", {
              className: Q.toolbar,
              children: [
                c.jsx("div", {
                  className: Q.filters,
                  children: h_.map((T) =>
                    c.jsx(
                      "button",
                      {
                        type: "button",
                        className: `${Q.filter} ${p === T.id ? Q.filterActive : ""}`,
                        onClick: () => h(T.id),
                        children: T.label,
                      },
                      T.id,
                    ),
                  ),
                }),
                c.jsx("input", {
                  type: "search",
                  placeholder: "Search by name or email…",
                  className: Q.search,
                  value: v,
                  onChange: (T) => S(T.target.value),
                }),
              ],
            }),
            i &&
              c.jsxs("div", {
                className: Q.loadingBox,
                children: [
                  c.jsx(Kl, { size: "lg" }),
                  c.jsx("span", { children: "Loading users…" }),
                ],
              }),
            !i &&
              o &&
              c.jsxs("div", {
                className: Q.errorBox,
                children: [
                  c.jsx("strong", { children: "Something went wrong." }),
                  c.jsx("span", { children: o }),
                ],
              }),
            !i &&
              !o &&
              Ve.length === 0 &&
              c.jsx(Lu, {
                icon: "👥",
                title: "No users to show",
                description:
                  "Try a different filter, or create the first user with the button above.",
              }),
            !i &&
              !o &&
              Ve.length > 0 &&
              c.jsx("div", {
                className: Q.tableWrap,
                children: c.jsxs("table", {
                  className: Q.table,
                  children: [
                    c.jsx("thead", {
                      children: c.jsxs("tr", {
                        children: [
                          c.jsx("th", { children: "Name" }),
                          c.jsx("th", { children: "Email" }),
                          c.jsx("th", { children: "Role" }),
                          c.jsx("th", { "aria-label": "Actions" }),
                        ],
                      }),
                    }),
                    c.jsx("tbody", {
                      children: Ve.map((T) => {
                        const G = (T.role || "").toUpperCase(),
                          $e = t === "ASSISTANT" && G === "ADMIN",
                          Te = (e == null ? void 0 : e.id) === T.id;
                        return c.jsxs(
                          "tr",
                          {
                            children: [
                              c.jsx("td", {
                                className: Q.nameCellWrap,
                                "data-label": "Name",
                                children: c.jsxs("div", {
                                  className: Q.nameCell,
                                  children: [
                                    c.jsx("span", {
                                      className: Q.fullName,
                                      children: T.fullName || "—",
                                    }),
                                    T.givenName &&
                                      c.jsxs("span", {
                                        className: Q.givenName,
                                        children: ["“", T.givenName, "”"],
                                      }),
                                  ],
                                }),
                              }),
                              c.jsx("td", {
                                "data-label": "Email",
                                children: T.email,
                              }),
                              c.jsx("td", {
                                "data-label": "Role",
                                children: m_(G),
                              }),
                              c.jsx("td", {
                                className: Q.actionsCell,
                                "data-label": "Actions",
                                children: $e
                                  ? c.jsx("span", {
                                      className: Q.lockedHint,
                                      children: "View only",
                                    })
                                  : c.jsxs(c.Fragment, {
                                      children: [
                                        c.jsx("button", {
                                          type: "button",
                                          className: Q.actionBtn,
                                          onClick: () => R(T),
                                          disabled: y,
                                          "aria-label": "Edit",
                                          title: "Edit user",
                                          children: c.jsx(K6, {}),
                                        }),
                                        c.jsx("button", {
                                          type: "button",
                                          className: `${Q.actionBtn} ${Q.warningBtn}`,
                                          onClick: () => {
                                            (M(null), j(T));
                                          },
                                          "aria-label": "Reset password",
                                          title: "Reset password",
                                          children: c.jsx(Oh, {}),
                                        }),
                                        t === "ADMIN" &&
                                          !Te &&
                                          c.jsx("button", {
                                            type: "button",
                                            className: `${Q.actionBtn} ${Q.danger}`,
                                            onClick: () => L(T),
                                            "aria-label": "Delete",
                                            title: "Delete user",
                                            children: c.jsx($6, {}),
                                          }),
                                      ],
                                    }),
                              }),
                            ],
                          },
                          T.id,
                        );
                      }),
                    }),
                  ],
                }),
              }),
            b &&
              c.jsx(f5, {
                initial: d,
                onSubmit: d ? O : A,
                onClose: () => {
                  (x(!1), m(null));
                },
                error: E,
                lockedRole:
                  d &&
                  t === "ASSISTANT" &&
                  (d.role || "").toUpperCase() === "ASSISTANT",
              }),
            w &&
              c.jsx(w5, {
                user: w,
                onConfirm: J,
                onClose: () => {
                  (j(null), M(null));
                },
                error: z,
              }),
            c.jsx(kh, {
              message: P == null ? void 0 : P.message,
              variant: P == null ? void 0 : P.variant,
              onDismiss: () => se(null),
            }),
          ],
        })
      : c.jsx("section", {
          className: Q.page,
          children: c.jsx(Lu, {
            icon: "🔒",
            title: "Restricted area",
            description: "Only Admins and Assistants can manage users.",
          }),
        })
    : c.jsx(Ks, { to: "/login", replace: !0 });
}
const v_ = "_footer_vhmio_1",
  g_ = "_text_vhmio_17",
  y_ = "_author_vhmio_29",
  Kc = { footer: v_, text: g_, author: y_ };
function Fl({ author: e = "Andre Luis", year: t = new Date().getFullYear() }) {
  return c.jsx("div", {
    className: Kc.footer,
    children: c.jsxs("p", {
      className: Kc.text,
      children: [
        "Developed by ",
        c.jsx("span", { className: Kc.author, children: e }),
        " ©",
        " ",
        t,
      ],
    }),
  });
}
const __ = "_button_11ynu_1",
  b_ = "_primary_11ynu_39",
  S_ = "_secondary_11ynu_71",
  x_ = "_fullWidth_11ynu_95",
  Jc = { button: __, primary: b_, secondary: S_, fullWidth: x_ };
function il({
  children: e,
  onClick: t,
  type: a = "button",
  variant: l = "primary",
  disabled: n = !1,
  fullWidth: i = !0,
}) {
  return c.jsx("button", {
    type: a,
    onClick: t,
    disabled: n,
    className: `
        ${Jc.button}
        ${Jc[l]}
        ${i ? Jc.fullWidth : ""}
      `,
    children: e,
  });
}
const N_ = "_page_x0z01_1",
  E_ = "_side_x0z01_19",
  j_ = "_sideHeader_x0z01_40",
  A_ = "_sideHeadline_x0z01_46",
  w_ = "_sideBody_x0z01_59",
  C_ = "_bullets_x0z01_67",
  z_ = "_bullet_x0z01_67",
  T_ = "_bulletDot_x0z01_84",
  M_ = "_sideFooter_x0z01_92",
  R_ = "_formPanel_x0z01_99",
  O_ = "_card_x0z01_106",
  D_ = "_cardHeader_x0z01_120",
  L_ = "_cardMobileLogo_x0z01_124",
  U_ = "_cardTitle_x0z01_134",
  B_ = "_cardSubtitle_x0z01_141",
  H_ = "_form_x0z01_99",
  q_ = "_error_x0z01_153",
  Y_ = "_actions_x0z01_163",
  V_ = "_forgotRow_x0z01_182",
  $_ = "_forgotLink_x0z01_188",
  G_ = "_divider_x0z01_201",
  be = {
    page: N_,
    side: E_,
    sideHeader: j_,
    sideHeadline: A_,
    sideBody: w_,
    bullets: C_,
    bullet: z_,
    bulletDot: T_,
    sideFooter: M_,
    formPanel: R_,
    card: O_,
    cardHeader: D_,
    cardMobileLogo: L_,
    cardTitle: U_,
    cardSubtitle: B_,
    form: H_,
    error: q_,
    actions: Y_,
    forgotRow: V_,
    forgotLink: $_,
    divider: G_,
  },
  X_ = [
    "Concurrency-safe slot reservation",
    "AI-suggested time slots that fit your day",
    "No-show predictions so you stay one step ahead",
  ];
function Q_() {
  const [e, t] = g.useState({ identifier: "", password: "" }),
    [a, l] = g.useState(null),
    [n, i] = g.useState(!1),
    u = oa();
  async function s(o) {
    (o.preventDefault(), l(null), i(!0));
    try {
      await xv(e.identifier, e.password);
      const f = Va();
      f != null && f.passwordChangeRequired
        ? u("/change-password", { replace: !0 })
        : u("/", { replace: !0 });
    } catch (f) {
      l(f.message);
    } finally {
      i(!1);
    }
  }
  function r(o) {
    (t({ ...e, [o.target.name]: o.target.value }), a && l(null));
  }
  return c.jsxs("section", {
    className: be.page,
    children: [
      c.jsxs("aside", {
        className: be.side,
        children: [
          c.jsx("header", {
            className: be.sideHeader,
            children: c.jsx(Ba, {
              size: 44,
              variant: "wordmark",
              tone: "inverse",
            }),
          }),
          c.jsxs("div", {
            children: [
              c.jsxs("h2", {
                className: be.sideHeadline,
                children: [
                  "Booking that just ",
                  c.jsx("span", { children: "works." }),
                ],
              }),
              c.jsx("p", {
                className: be.sideBody,
                children:
                  "NEXUS connects clients, providers and intelligent scheduling under a single, secure platform.",
              }),
              c.jsx("ul", {
                className: be.bullets,
                children: X_.map((o) =>
                  c.jsxs(
                    "li",
                    {
                      className: be.bullet,
                      children: [
                        c.jsx("span", {
                          className: be.bulletDot,
                          "aria-hidden": !0,
                        }),
                        c.jsx("span", { children: o }),
                      ],
                    },
                    o,
                  ),
                ),
              }),
            ],
          }),
          c.jsxs("p", {
            className: be.sideFooter,
            children: [
              "© ",
              new Date().getFullYear(),
              " NEXUS · Crafted by Andre Luis",
            ],
          }),
        ],
      }),
      c.jsx("div", {
        className: be.formPanel,
        children: c.jsxs("div", {
          className: be.card,
          children: [
            c.jsxs("header", {
              className: be.cardHeader,
              children: [
                c.jsx("div", {
                  className: be.cardMobileLogo,
                  children: c.jsx(Ba, { size: 40, variant: "wordmark" }),
                }),
                c.jsx("h1", {
                  className: be.cardTitle,
                  children: "Welcome back",
                }),
                c.jsx("p", {
                  className: be.cardSubtitle,
                  children: "Sign in to manage your appointments.",
                }),
              ],
            }),
            c.jsxs("form", {
              onSubmit: s,
              className: be.form,
              noValidate: !0,
              children: [
                c.jsx(ne, {
                  label: "Username or email",
                  type: "text",
                  name: "identifier",
                  placeholder: "Your username or email",
                  value: e.identifier,
                  onChange: r,
                  required: !0,
                }),
                c.jsx(ne, {
                  label: "Password",
                  type: "password",
                  name: "password",
                  placeholder: "Your password",
                  value: e.password,
                  onChange: r,
                  required: !0,
                }),
                a && c.jsx("div", { className: be.error, children: a }),
                c.jsx(il, {
                  type: "submit",
                  disabled: n,
                  children: n ? "Signing in…" : "Sign in",
                }),
                c.jsx("div", {
                  className: be.forgotRow,
                  children: c.jsx(Ge, {
                    to: "/forgot-password",
                    className: be.forgotLink,
                    children: "Forgot your password?",
                  }),
                }),
                c.jsx("div", { className: be.divider, children: "or" }),
                c.jsx("div", {
                  className: be.actions,
                  children: c.jsx(Ge, {
                    to: "/signup",
                    children: "Create a new account →",
                  }),
                }),
              ],
            }),
            c.jsx(Fl, {}),
          ],
        }),
      }),
    ],
  });
}
const Z_ = "_page_194qq_1",
  k_ = "_card_194qq_16",
  K_ = "_button_194qq_68",
  Fc = { page: Z_, card: k_, button: K_ };
function J_() {
  return c.jsx("section", {
    className: Fc.page,
    children: c.jsxs("div", {
      className: Fc.card,
      children: [
        c.jsx("h2", { children: "Account Created!" }),
        c.jsxs("p", {
          children: [
            "Your registration was successful. You can now access all features of",
            " ",
            c.jsx("span", { children: "NEXUS" }),
            ".",
          ],
        }),
        c.jsx(Ge, {
          to: "/login",
          className: Fc.button,
          children: "Go to Login",
        }),
      ],
    }),
  });
}
const F_ = "_page_1j3ir_1",
  W_ = "_card_1j3ir_16",
  P_ = "_header_1j3ir_38",
  I_ = "_brand_1j3ir_42",
  eb = "_title_1j3ir_46",
  tb = "_subtitle_1j3ir_53",
  ab = "_notice_1j3ir_69",
  lb = "_form_1j3ir_92",
  nb = "_section_1j3ir_98",
  ib = "_sectionHead_1j3ir_104",
  ub = "_grid_1j3ir_134",
  cb = "_submitError_1j3ir_246",
  Le = {
    page: F_,
    card: W_,
    header: P_,
    brand: I_,
    title: eb,
    subtitle: tb,
    notice: ab,
    form: lb,
    section: nb,
    sectionHead: ib,
    grid: ub,
    submitError: cb,
  };
function sb(e) {
  const t = {};
  (e.fullName.trim() || (t.fullName = "Full name is required."),
    e.givenName.trim() || (t.givenName = "Preferred name is required."),
    Jl(e.identificationDocument)
      ? uo(e.identificationDocument) ||
        (t.identificationDocument = "Invalid CPF — double-check the digits.")
      : (t.identificationDocument = "CPF is required."),
    (!e.email.trim() || !/^\S+@\S+\.\S+$/.test(e.email)) &&
      (t.email = "Enter a valid email (must contain '@')."),
    (!e.phoneNumber.trim() || Ha(e.phoneNumber).length < 8) &&
      (t.phoneNumber = "Phone is required."),
    e.address.trim() || (t.address = "Address is required."),
    (!e.username.trim() || e.username.length < 3) &&
      (t.username = "Username must be at least 3 characters."));
  const a = _i(e.password);
  return (
    a && (t.password = a),
    e.password !== e.confirmPassword &&
      (t.confirmPassword = "Passwords do not match."),
    t
  );
}
function rb() {
  const [e, t] = g.useState({
      fullName: "",
      givenName: "",
      identificationDocument: "",
      phoneNumber: "",
      email: "",
      address: "",
      username: "",
      password: "",
      confirmPassword: "",
    }),
    [a, l] = g.useState({}),
    [n, i] = g.useState(null),
    [u, s] = g.useState(!1),
    [r, o] = g.useState(!1);
  function f(h) {
    const { name: v, value: S } = h.target;
    (t((b) => ({ ...b, [v]: S })),
      a[v] &&
        l((b) => {
          const x = { ...b };
          return (delete x[v], x);
        }),
      n && i(null));
  }
  async function p(h) {
    h.preventDefault();
    const v = sb(e);
    if ((l(v), !(Object.keys(v).length > 0))) {
      (s(!0), i(null));
      try {
        (await Nv(e), o(!0));
      } catch (S) {
        i(S.message || "Error creating account");
      } finally {
        s(!1);
      }
    }
  }
  return r
    ? c.jsx(J_, {})
    : c.jsx("section", {
        className: Le.page,
        children: c.jsxs("div", {
          className: Le.card,
          children: [
            c.jsxs("header", {
              className: Le.header,
              children: [
                c.jsx("div", {
                  className: Le.brand,
                  children: c.jsx(Ba, { size: 40, variant: "wordmark" }),
                }),
                c.jsx("h2", {
                  className: Le.title,
                  children: "Create your client account",
                }),
                c.jsxs("p", {
                  className: Le.subtitle,
                  children: [
                    "Three quick sections and you're in. Already a member?",
                    " ",
                    c.jsx(Ge, { to: "/login", children: "Sign in" }),
                    ".",
                  ],
                }),
              ],
            }),
            c.jsxs("div", {
              className: Le.notice,
              role: "note",
              children: [
                c.jsx(Dh, { "aria-hidden": !0 }),
                c.jsxs("span", {
                  children: [
                    "Public signup creates a ",
                    c.jsx("strong", { children: "Client" }),
                    " account. Provider, Assistant and Admin accounts are managed internally by Admins or Assistants.",
                  ],
                }),
              ],
            }),
            c.jsxs("form", {
              onSubmit: p,
              className: Le.form,
              noValidate: !0,
              children: [
                c.jsxs("section", {
                  className: Le.section,
                  children: [
                    c.jsxs("header", {
                      className: Le.sectionHead,
                      children: [
                        c.jsx(cc, { "aria-hidden": !0 }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("h3", { children: "Who you are" }),
                            c.jsx("p", {
                              children: "Your basic identity on the platform.",
                            }),
                          ],
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: Le.grid,
                      children: [
                        c.jsx(ne, {
                          label: "Full name",
                          type: "text",
                          name: "fullName",
                          placeholder: "Andre Luis Santos Pereira",
                          value: e.fullName,
                          onChange: f,
                          error: a.fullName,
                          required: !0,
                        }),
                        c.jsx(ne, {
                          label: "Preferred name",
                          type: "text",
                          name: "givenName",
                          placeholder: "Andre",
                          value: e.givenName,
                          onChange: f,
                          error: a.givenName,
                          required: !0,
                        }),
                      ],
                    }),
                    c.jsx(Kh, {
                      name: "identificationDocument",
                      value: e.identificationDocument,
                      onChange: f,
                      error: a.identificationDocument,
                      required: !0,
                    }),
                  ],
                }),
                c.jsxs("section", {
                  className: Le.section,
                  children: [
                    c.jsxs("header", {
                      className: Le.sectionHead,
                      children: [
                        c.jsx(qh, { "aria-hidden": !0 }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("h3", { children: "How to reach you" }),
                            c.jsx("p", {
                              children: "Used for reminders and notifications.",
                            }),
                          ],
                        }),
                      ],
                    }),
                    c.jsx(ne, {
                      label: "Email",
                      type: "email",
                      name: "email",
                      placeholder: "Your email",
                      value: e.email,
                      onChange: f,
                      error: a.email,
                      required: !0,
                    }),
                    c.jsx(Jh, {
                      name: "phoneNumber",
                      value: e.phoneNumber,
                      onChange: f,
                      error: a.phoneNumber,
                      required: !0,
                    }),
                    c.jsx(ne, {
                      label: "Address",
                      type: "text",
                      name: "address",
                      placeholder: "City, State / Country",
                      value: e.address,
                      onChange: f,
                      error: a.address,
                      required: !0,
                    }),
                  ],
                }),
                c.jsxs("section", {
                  className: Le.section,
                  children: [
                    c.jsxs("header", {
                      className: Le.sectionHead,
                      children: [
                        c.jsx(Rh, { "aria-hidden": !0 }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("h3", { children: "Account & access" }),
                            c.jsx("p", {
                              children:
                                "Pick a username and a secure password.",
                            }),
                          ],
                        }),
                      ],
                    }),
                    c.jsx(ne, {
                      label: "Username",
                      type: "text",
                      name: "username",
                      placeholder: "Username",
                      value: e.username,
                      onChange: f,
                      error: a.username,
                      required: !0,
                    }),
                    c.jsxs("div", {
                      className: Le.grid,
                      children: [
                        c.jsx(ne, {
                          label: "Password",
                          type: "password",
                          name: "password",
                          placeholder: "At least 8 characters",
                          value: e.password,
                          onChange: f,
                          error: a.password,
                          autoComplete: "new-password",
                          required: !0,
                        }),
                        c.jsx(ne, {
                          label: "Confirm password",
                          type: "password",
                          name: "confirmPassword",
                          placeholder: "Confirm password",
                          value: e.confirmPassword,
                          onChange: f,
                          error: a.confirmPassword,
                          autoComplete: "new-password",
                          required: !0,
                        }),
                      ],
                    }),
                  ],
                }),
                n && c.jsx("div", { className: Le.submitError, children: n }),
                c.jsx(il, {
                  type: "submit",
                  disabled: u,
                  children: u ? "Creating account…" : "Create account",
                }),
              ],
            }),
            c.jsx(Fl, {}),
          ],
        }),
      });
}
const ob = "_page_hiq1z_1",
  fb = "_card_hiq1z_13",
  db = "_header_hiq1z_24",
  hb = "_title_hiq1z_31",
  mb = "_subtitle_hiq1z_38",
  pb = "_notice_hiq1z_45",
  vb = "_form_hiq1z_64",
  gb = "_channelGroup_hiq1z_70",
  yb = "_channelOption_hiq1z_86",
  _b = "_channelActive_hiq1z_112",
  bb = "_error_hiq1z_118",
  Sb = "_modeTabs_hiq1z_127",
  xb = "_modeTab_hiq1z_127",
  Nb = "_modeTabActive_hiq1z_154",
  Eb = "_successBox_hiq1z_160",
  jb = "_usernameChip_hiq1z_178",
  Ab = "_warningBox_hiq1z_191",
  wb = "_success_hiq1z_160",
  Cb = "_actions_hiq1z_224",
  zb = "_backLink_hiq1z_233",
  Tb = "_haveCodeLink_hiq1z_234",
  D = {
    page: ob,
    card: fb,
    header: db,
    title: hb,
    subtitle: mb,
    notice: pb,
    form: vb,
    channelGroup: gb,
    channelOption: yb,
    channelActive: _b,
    error: bb,
    modeTabs: Sb,
    modeTab: xb,
    modeTabActive: Nb,
    successBox: Eb,
    usernameChip: jb,
    warningBox: Ab,
    success: wb,
    actions: Cb,
    backLink: zb,
    haveCodeLink: Tb,
  },
  Xa = "password",
  qi = "username";
function Mb() {
  const e = oa(),
    [t, a] = g.useState(Xa),
    [l, n] = g.useState(""),
    [i, u] = g.useState("EMAIL"),
    [s, r] = g.useState(!1),
    [o, f] = g.useState(null),
    [p, h] = g.useState(""),
    [v, S] = g.useState(null),
    [b, x] = g.useState(null),
    [d, m] = g.useState(!1);
  async function y(E) {
    if ((E.preventDefault(), f(null), !l.trim())) {
      f("Tell us your username or email so we can find your account.");
      return;
    }
    r(!0);
    try {
      (await V8(l.trim(), i),
        e("/reset-password", { state: { identifier: l.trim(), channel: i } }));
    } catch (C) {
      f(C.message || "Could not request a code. Try again in a moment.");
    } finally {
      r(!1);
    }
  }
  async function _(E) {
    if (
      (E.preventDefault(), x(null), S(null), !/^\S+@\S+\.\S+$/.test(p.trim()))
    ) {
      x("Please type a valid email.");
      return;
    }
    m(!0);
    try {
      const C = await X8(p.trim());
      S(C);
    } catch (C) {
      x(C.message || "Could not recover your username right now.");
    } finally {
      m(!1);
    }
  }
  return c.jsx("section", {
    className: D.page,
    children: c.jsxs("div", {
      className: D.card,
      children: [
        c.jsxs("header", {
          className: D.header,
          children: [
            c.jsx(Ba, { size: 40, variant: "wordmark" }),
            c.jsx("h1", {
              className: D.title,
              children:
                t === Xa ? "Forgot your password?" : "Forgot your username?",
            }),
            c.jsx("p", {
              className: D.subtitle,
              children:
                t === Xa
                  ? "Tell us how to find you and we'll send a 6-digit code so you can create a new one."
                  : "Type the email you used to register and we'll show you the username linked to it.",
            }),
          ],
        }),
        c.jsxs("div", {
          className: D.modeTabs,
          role: "tablist",
          children: [
            c.jsx("button", {
              type: "button",
              role: "tab",
              "aria-selected": t === Xa,
              className: `${D.modeTab} ${t === Xa ? D.modeTabActive : ""}`,
              onClick: () => a(Xa),
              children: "Reset password",
            }),
            c.jsx("button", {
              type: "button",
              role: "tab",
              "aria-selected": t === qi,
              className: `${D.modeTab} ${t === qi ? D.modeTabActive : ""}`,
              onClick: () => a(qi),
              children: "Forgot username",
            }),
          ],
        }),
        t === Xa &&
          c.jsxs("form", {
            onSubmit: y,
            className: D.form,
            noValidate: !0,
            children: [
              c.jsx(ne, {
                label: "Username or email",
                type: "text",
                name: "identifier",
                placeholder: "Your username or email",
                value: l,
                onChange: (E) => n(E.target.value),
                required: !0,
              }),
              c.jsxs("fieldset", {
                className: D.channelGroup,
                children: [
                  c.jsx("legend", { children: "Send the code via" }),
                  c.jsxs("label", {
                    className: `${D.channelOption} ${i === "EMAIL" ? D.channelActive : ""}`,
                    children: [
                      c.jsx("input", {
                        type: "radio",
                        name: "channel",
                        value: "EMAIL",
                        checked: i === "EMAIL",
                        onChange: (E) => u(E.target.value),
                      }),
                      c.jsx(Lh, {}),
                      c.jsx("span", { children: "Email" }),
                    ],
                  }),
                  c.jsxs("label", {
                    className: `${D.channelOption} ${i === "SMS" ? D.channelActive : ""}`,
                    children: [
                      c.jsx("input", {
                        type: "radio",
                        name: "channel",
                        value: "SMS",
                        checked: i === "SMS",
                        onChange: (E) => u(E.target.value),
                      }),
                      c.jsx(X6, {}),
                      c.jsx("span", { children: "SMS" }),
                    ],
                  }),
                ],
              }),
              o && c.jsx("div", { className: D.error, children: o }),
              c.jsx(il, {
                type: "submit",
                disabled: s,
                children: s ? "Sending…" : "Send code",
              }),
              c.jsxs("p", {
                className: D.actions,
                children: [
                  c.jsx(Ge, {
                    to: "/login",
                    className: D.backLink,
                    children: "← Back to sign in",
                  }),
                  c.jsxs(Ge, {
                    to: "/reset-password",
                    className: D.haveCodeLink,
                    children: ["I already have a code ", c.jsx(Hh, {})],
                  }),
                ],
              }),
            ],
          }),
        t === qi &&
          c.jsxs("form", {
            onSubmit: _,
            className: D.form,
            noValidate: !0,
            children: [
              c.jsx(ne, {
                label: "Registered email",
                type: "email",
                name: "email",
                placeholder: "Your email",
                value: p,
                onChange: (E) => h(E.target.value),
                required: !0,
              }),
              b && c.jsx("div", { className: D.error, children: b }),
              (v == null ? void 0 : v.found) &&
                c.jsxs("div", {
                  className: D.successBox,
                  children: [
                    c.jsx(ep, { "aria-hidden": !0 }),
                    c.jsxs("div", {
                      children: [
                        c.jsx("strong", { children: "Found it!" }),
                        " Your username is",
                        " ",
                        c.jsxs("code", {
                          className: D.usernameChip,
                          children: [
                            c.jsx(Y6, { "aria-hidden": !0 }),
                            " ",
                            v.username,
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              v &&
                !v.found &&
                c.jsxs("div", {
                  className: D.warningBox,
                  children: [
                    c.jsx(P6, { "aria-hidden": !0 }),
                    c.jsxs("span", {
                      children: [
                        "We couldn't find any account registered with this email.",
                        " ",
                        c.jsx(Ge, { to: "/signup", children: "Create one" }),
                        "?",
                      ],
                    }),
                  ],
                }),
              c.jsx(il, {
                type: "submit",
                disabled: d,
                children: d ? "Looking up…" : "Find my username",
              }),
              c.jsx("p", {
                className: D.actions,
                children: c.jsx(Ge, {
                  to: "/login",
                  className: D.backLink,
                  children: "← Back to sign in",
                }),
              }),
            ],
          }),
        c.jsx(Fl, {}),
      ],
    }),
  });
}
function Rb() {
  var d;
  const e = oa(),
    t = at(),
    [a, l] = g.useState(((d = t.state) == null ? void 0 : d.identifier) || ""),
    [n, i] = g.useState(""),
    [u, s] = g.useState(""),
    [r, o] = g.useState(""),
    [f, p] = g.useState(!1),
    [h, v] = g.useState(null),
    [S, b] = g.useState(!1);
  async function x(m) {
    if ((m.preventDefault(), v(null), !a.trim() || !n.trim())) {
      v("Identifier and code are required.");
      return;
    }
    const y = _i(u);
    if (y) {
      v(y);
      return;
    }
    if (u !== r) {
      v("Passwords don't match.");
      return;
    }
    p(!0);
    try {
      (await $8({ identifier: a.trim(), code: n.trim(), newPassword: u }),
        b(!0));
    } catch (_) {
      v(_.message || "Could not reset your password.");
    } finally {
      p(!1);
    }
  }
  return S
    ? c.jsx("section", {
        className: D.page,
        children: c.jsxs("div", {
          className: D.card,
          children: [
            c.jsxs("header", {
              className: D.header,
              children: [
                c.jsx(Ba, { size: 40, variant: "wordmark" }),
                c.jsx("h1", {
                  className: D.title,
                  children: "Password updated",
                }),
                c.jsx("p", {
                  className: D.subtitle,
                  children: "Your new password is ready. Sign in to continue.",
                }),
              ],
            }),
            c.jsx(il, {
              onClick: () => e("/login"),
              children: "Go to sign in",
            }),
            c.jsx(Fl, {}),
          ],
        }),
      })
    : c.jsx("section", {
        className: D.page,
        children: c.jsxs("div", {
          className: D.card,
          children: [
            c.jsxs("header", {
              className: D.header,
              children: [
                c.jsx(Ba, { size: 40, variant: "wordmark" }),
                c.jsx("h1", {
                  className: D.title,
                  children: "Reset your password",
                }),
                c.jsx("p", {
                  className: D.subtitle,
                  children:
                    "Type the 6-digit code we sent and pick a strong new password.",
                }),
              ],
            }),
            c.jsxs("form", {
              onSubmit: x,
              className: D.form,
              noValidate: !0,
              children: [
                c.jsx(ne, {
                  label: "Username or email",
                  type: "text",
                  name: "identifier",
                  value: a,
                  onChange: (m) => l(m.target.value),
                  required: !0,
                }),
                c.jsx(ne, {
                  label: "6-digit code",
                  type: "text",
                  name: "code",
                  inputMode: "numeric",
                  placeholder: "123456",
                  maxLength: 6,
                  value: n,
                  onChange: (m) => i(m.target.value.replace(/\D/g, "")),
                  required: !0,
                }),
                c.jsx(ne, {
                  label: "New password",
                  type: "password",
                  name: "newPassword",
                  value: u,
                  onChange: (m) => s(m.target.value),
                  autoComplete: "new-password",
                  required: !0,
                }),
                c.jsx(co, { value: u }),
                c.jsx(ne, {
                  label: "Confirm new password",
                  type: "password",
                  name: "confirmPassword",
                  value: r,
                  onChange: (m) => o(m.target.value),
                  autoComplete: "new-password",
                  required: !0,
                }),
                h && c.jsx("div", { className: D.error, children: h }),
                c.jsx(il, {
                  type: "submit",
                  disabled: f,
                  children: f ? "Saving…" : "Reset password",
                }),
                c.jsx("p", {
                  className: D.actions,
                  children: c.jsx(Ge, {
                    to: "/forgot-password",
                    className: D.backLink,
                    children: "← Request a new code",
                  }),
                }),
              ],
            }),
            c.jsx(Fl, {}),
          ],
        }),
      });
}
function Ob() {
  const e = oa(),
    t = Va(),
    a = !!(t != null && t.passwordChangeRequired),
    [l, n] = g.useState(""),
    [i, u] = g.useState(""),
    [s, r] = g.useState(""),
    [o, f] = g.useState(!1),
    [p, h] = g.useState(null),
    [v, S] = g.useState(!1);
  async function b(x) {
    if ((x.preventDefault(), h(null), !l)) {
      h("Please confirm your current password.");
      return;
    }
    const d = _i(i);
    if (d) {
      h(d);
      return;
    }
    if (i === l) {
      h("New password must be different from the current one.");
      return;
    }
    if (i !== s) {
      h("Passwords don't match.");
      return;
    }
    f(!0);
    try {
      (await G8({ currentPassword: l, newPassword: i }),
        S(!0),
        Gn(),
        setTimeout(() => e("/login", { replace: !0 }), 1200));
    } catch (m) {
      h(m.message || "Could not change your password.");
    } finally {
      f(!1);
    }
  }
  return c.jsx("section", {
    className: D.page,
    children: c.jsxs("div", {
      className: D.card,
      children: [
        c.jsxs("header", {
          className: D.header,
          children: [
            c.jsx(Ba, { size: 40, variant: "wordmark" }),
            c.jsx("h1", {
              className: D.title,
              children: a ? "Set a new password" : "Change your password",
            }),
            c.jsx("p", {
              className: D.subtitle,
              children: a
                ? "Your administrator reset your password. Please pick a new one to continue."
                : "Pick a new password. You'll be signed out so the change takes effect.",
            }),
          ],
        }),
        a &&
          c.jsxs("div", {
            className: D.notice,
            role: "note",
            children: [
              c.jsx(Dh, { "aria-hidden": !0 }),
              c.jsx("span", {
                children:
                  "Your previous password was set by an administrator. For your security, you must replace it before continuing.",
              }),
            ],
          }),
        c.jsxs("form", {
          onSubmit: b,
          className: D.form,
          noValidate: !0,
          children: [
            c.jsx(ne, {
              label: a ? "Temporary password" : "Current password",
              type: "password",
              name: "currentPassword",
              value: l,
              onChange: (x) => n(x.target.value),
              autoComplete: "current-password",
              required: !0,
            }),
            c.jsx(ne, {
              label: "New password",
              type: "password",
              name: "newPassword",
              value: i,
              onChange: (x) => u(x.target.value),
              autoComplete: "new-password",
              required: !0,
            }),
            c.jsx(co, { value: i }),
            c.jsx(ne, {
              label: "Confirm new password",
              type: "password",
              name: "confirmPassword",
              value: s,
              onChange: (x) => r(x.target.value),
              autoComplete: "new-password",
              required: !0,
            }),
            p && c.jsx("div", { className: D.error, children: p }),
            v &&
              c.jsx("div", {
                className: D.success,
                children: "Password updated. Redirecting to sign in…",
              }),
            c.jsx(il, {
              type: "submit",
              disabled: o || v,
              children: o ? "Saving…" : "Update password",
            }),
          ],
        }),
        c.jsx(Fl, {}),
      ],
    }),
  });
}
const Db = () => {
    const [e, t] = g.useState("loading"),
      a = at();
    if (
      (g.useEffect(() => {
        let n = !0;
        return (
          (async () => {
            try {
              if (!Zh()) {
                n && t("unauthenticated");
                return;
              }
              if (Vp()) {
                (Gn(), n && t("unauthenticated"));
                return;
              }
              const s = await Ev();
              if (!n) return;
              s ? t("authenticated") : (Gn(), t("unauthenticated"));
            } catch (u) {
              (console.error("Auth validation error:", u),
                Gn(),
                n && t("unauthenticated"));
            }
          })(),
          () => {
            n = !1;
          }
        );
      }, []),
      e === "loading")
    )
      return c.jsxs("div", {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 20px",
          gap: 12,
          color: "var(--color-text-muted)",
          fontSize: 14,
        },
        children: [
          c.jsx(Kl, { size: "lg" }),
          c.jsx("span", { children: "Checking your session…" }),
        ],
      });
    if (e === "unauthenticated")
      return c.jsx(Ks, { to: "/login", replace: !0 });
    const l = Va();
    return l != null &&
      l.passwordChangeRequired &&
      a.pathname !== "/change-password"
      ? c.jsx(Ks, { to: "/change-password", replace: !0 })
      : c.jsx(Z3, {});
  },
  Lb = "_app_qb4s4_1",
  Ub = "_main_qb4s4_7",
  id = { app: Lb, main: Ub },
  Bb = ["/login", "/signup", "/forgot-password", "/reset-password"];
function Hb() {
  const e = at(),
    a = Bb.includes(e.pathname) || e.pathname === "/change-password";
  return c.jsxs("div", {
    className: id.app,
    children: [
      !a && c.jsx(Yv, {}),
      c.jsx("main", {
        className: id.main,
        children: c.jsxs(K3, {
          children: [
            c.jsx(wt, { path: "/login", element: c.jsx(Q_, {}) }),
            c.jsx(wt, { path: "/signup", element: c.jsx(rb, {}) }),
            c.jsx(wt, { path: "/forgot-password", element: c.jsx(Mb, {}) }),
            c.jsx(wt, { path: "/reset-password", element: c.jsx(Rb, {}) }),
            c.jsxs(wt, {
              element: c.jsx(Db, {}),
              children: [
                c.jsx(wt, { path: "/change-password", element: c.jsx(Ob, {}) }),
                c.jsx(wt, { path: "/", element: c.jsx(Sv, {}) }),
                c.jsx(wt, { path: "/services", element: c.jsx(pg, {}) }),
                c.jsx(wt, { path: "/appointments", element: c.jsx(Ky, {}) }),
                c.jsx(wt, { path: "/users", element: c.jsx(p_, {}) }),
              ],
            }),
          ],
        }),
      }),
      !a && c.jsx(Kv, {}),
    ],
  });
}
function qb() {
  return c.jsx(y6, { children: c.jsx(Hb, {}) });
}
K4.createRoot(document.getElementById("root")).render(
  c.jsx(Na.StrictMode, { children: c.jsx(qb, {}) }),
);
