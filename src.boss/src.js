!function(a, b) {
    "function" == typeof define && define["amd"] ? define([], function() {
        (a["dcodeIO"] = a["dcodeIO"] || {})["Long"] = b()
    }) : "function" == typeof require && "object" == typeof module && module && module["exports"] ? module["exports"] = b() : (a["dcodeIO"] = a["dcodeIO"] || {})["Long"] = b()
}(this, function() {
    "use strict";
    function a(a, b, c) {
        this.low = 0 | a,
        this.high = 0 | b,
        this.unsigned = !!c
    }
    function b(a) {
        return (a && a["__isLong__"]) === !0
    }
    function e(a, b) {
        var e, f, h;
        return b ? (a >>>= 0,
        (h = a >= 0 && 256 > a) && (f = d[a]) ? f : (e = g(a, 0 > (0 | a) ? -1 : 0, !0),
        h && (d[a] = e),
        e)) : (a |= 0,
        (h = a >= -128 && 128 > a) && (f = c[a]) ? f : (e = g(a, 0 > a ? -1 : 0, !1),
        h && (c[a] = e),
        e))
    }
    function f(a, b) {
        if (isNaN(a) || !isFinite(a))
            return b ? r : q;
        if (b) {
            if (0 > a)
                return r;
            if (a >= n)
                return w
        } else {
            if (-o >= a)
                return x;
            if (a + 1 >= o)
                return v
        }
        return 0 > a ? f(-a, b).neg() : g(0 | a % m, 0 | a / m, b)
    }
    function g(b, c, d) {
        return new a(b,c,d)
    }
    function i(a, b, c) {
        var d, e, g, j, k, l, m;
        if (0 === a.length)
            throw Error("empty string");
        if ("NaN" === a || "Infinity" === a || "+Infinity" === a || "-Infinity" === a)
            return q;
        if ("number" == typeof b ? (c = b,
        b = !1) : b = !!b,
        c = c || 10,
        2 > c || c > 36)
            throw RangeError("radix");
        if ((d = a.indexOf("-")) > 0)
            throw Error("interior hyphen");
        if (0 === d)
            return i(a.substring(1), b, c).neg();
        for (e = f(h(c, 8)),
        g = q,
        j = 0; j < a.length; j += 8)
            k = Math.min(8, a.length - j),
            l = parseInt(a.substring(j, j + k), c),
            8 > k ? (m = f(h(c, k)),
            g = g.mul(m).add(f(l))) : (g = g.mul(e),
            g = g.add(f(l)));
        return g.unsigned = b,
        g
    }
    function j(b) {
        return b instanceof a ? b : "number" == typeof b ? f(b) : "string" == typeof b ? i(b) : g(b.low, b.high, b.unsigned)
    }
    var c, d, h, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y;
    return a.prototype.__isLong__,
    Object.defineProperty(a.prototype, "__isLong__", {
        value: !0,
        enumerable: !1,
        configurable: !1
    }),
    a.isLong = b,
    c = {},
    d = {},
    a.fromInt = e,
    a.fromNumber = f,
    a.fromBits = g,
    h = Math.pow,
    a.fromString = i,
    a.fromValue = j,
    k = 65536,
    l = 1 << 24,
    m = k * k,
    n = m * m,
    o = n / 2,
    p = e(l),
    q = e(0),
    a.ZERO = q,
    r = e(0, !0),
    a.UZERO = r,
    s = e(1),
    a.ONE = s,
    t = e(1, !0),
    a.UONE = t,
    u = e(-1),
    a.NEG_ONE = u,
    v = g(-1, 2147483647, !1),
    a.MAX_VALUE = v,
    w = g(-1, -1, !0),
    a.MAX_UNSIGNED_VALUE = w,
    x = g(0, -2147483648, !1),
    a.MIN_VALUE = x,
    y = a.prototype,
    y.toInt = function() {
        return this.unsigned ? this.low >>> 0 : this.low
    }
    ,
    y.toNumber = function() {
        return this.unsigned ? (this.high >>> 0) * m + (this.low >>> 0) : this.high * m + (this.low >>> 0)
    }
    ,
    y.toString = function(a) {
        var b, c, d, e, g, i, j, k, l;
        if (a = a || 10,
        2 > a || a > 36)
            throw RangeError("radix");
        if (this.isZero())
            return "0";
        if (this.isNegative())
            return this.eq(x) ? (b = f(a),
            c = this.div(b),
            d = c.mul(b).sub(this),
            c.toString(a) + d.toInt().toString(a)) : "-" + this.neg().toString(a);
        for (e = f(h(a, 6), this.unsigned),
        g = this,
        i = ""; ; ) {
            if (j = g.div(e),
            k = g.sub(j.mul(e)).toInt() >>> 0,
            l = k.toString(a),
            g = j,
            g.isZero())
                return l + i;
            for (; l.length < 6; )
                l = "0" + l;
            i = "" + l + i
        }
    }
    ,
    y.getHighBits = function() {
        return this.high
    }
    ,
    y.getHighBitsUnsigned = function() {
        return this.high >>> 0
    }
    ,
    y.getLowBits = function() {
        return this.low
    }
    ,
    y.getLowBitsUnsigned = function() {
        return this.low >>> 0
    }
    ,
    y.getNumBitsAbs = function() {
        var a, b;
        if (this.isNegative())
            return this.eq(x) ? 64 : this.neg().getNumBitsAbs();
        for (a = 0 != this.high ? this.high : this.low,
        b = 31; b > 0 && 0 == (a & 1 << b); b--)
            ;
        return 0 != this.high ? b + 33 : b + 1
    }
    ,
    y.isZero = function() {
        return 0 === this.high && 0 === this.low
    }
    ,
    y.isNegative = function() {
        return !this.unsigned && this.high < 0
    }
    ,
    y.isPositive = function() {
        return this.unsigned || this.high >= 0
    }
    ,
    y.isOdd = function() {
        return 1 === (1 & this.low)
    }
    ,
    y.isEven = function() {
        return 0 === (1 & this.low)
    }
    ,
    y.equals = function(a) {
        return b(a) || (a = j(a)),
        this.unsigned !== a.unsigned && 1 === this.high >>> 31 && 1 === a.high >>> 31 ? !1 : this.high === a.high && this.low === a.low
    }
    ,
    y.eq = y.equals,
    y.notEquals = function(a) {
        return !this.eq(a)
    }
    ,
    y.neq = y.notEquals,
    y.lessThan = function(a) {
        return this.comp(a) < 0
    }
    ,
    y.lt = y.lessThan,
    y.lessThanOrEqual = function(a) {
        return this.comp(a) <= 0
    }
    ,
    y.lte = y.lessThanOrEqual,
    y.greaterThan = function(a) {
        return this.comp(a) > 0
    }
    ,
    y.gt = y.greaterThan,
    y.greaterThanOrEqual = function(a) {
        return this.comp(a) >= 0
    }
    ,
    y.gte = y.greaterThanOrEqual,
    y.compare = function(a) {
        if (b(a) || (a = j(a)),
        this.eq(a))
            return 0;
        var c = this.isNegative()
          , d = a.isNegative();
        return c && !d ? -1 : !c && d ? 1 : this.unsigned ? a.high >>> 0 > this.high >>> 0 || a.high === this.high && a.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(a).isNegative() ? -1 : 1
    }
    ,
    y.comp = y.compare,
    y.negate = function() {
        return !this.unsigned && this.eq(x) ? x : this.not().add(s)
    }
    ,
    y.neg = y.negate,
    y.add = function(a) {
        var c, d, e, f, h, i, k, l, m, n, o, p;
        return b(a) || (a = j(a)),
        c = this.high >>> 16,
        d = 65535 & this.high,
        e = this.low >>> 16,
        f = 65535 & this.low,
        h = a.high >>> 16,
        i = 65535 & a.high,
        k = a.low >>> 16,
        l = 65535 & a.low,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        p += f + l,
        o += p >>> 16,
        p &= 65535,
        o += e + k,
        n += o >>> 16,
        o &= 65535,
        n += d + i,
        m += n >>> 16,
        n &= 65535,
        m += c + h,
        m &= 65535,
        g(o << 16 | p, m << 16 | n, this.unsigned)
    }
    ,
    y.subtract = function(a) {
        return b(a) || (a = j(a)),
        this.add(a.neg())
    }
    ,
    y.sub = y.subtract,
    y.multiply = function(a) {
        var c, d, e, h, i, k, l, m, n, o, r, s;
        return this.isZero() ? q : (b(a) || (a = j(a)),
        a.isZero() ? q : this.eq(x) ? a.isOdd() ? x : q : a.eq(x) ? this.isOdd() ? x : q : this.isNegative() ? a.isNegative() ? this.neg().mul(a.neg()) : this.neg().mul(a).neg() : a.isNegative() ? this.mul(a.neg()).neg() : this.lt(p) && a.lt(p) ? f(this.toNumber() * a.toNumber(), this.unsigned) : (c = this.high >>> 16,
        d = 65535 & this.high,
        e = this.low >>> 16,
        h = 65535 & this.low,
        i = a.high >>> 16,
        k = 65535 & a.high,
        l = a.low >>> 16,
        m = 65535 & a.low,
        n = 0,
        o = 0,
        r = 0,
        s = 0,
        s += h * m,
        r += s >>> 16,
        s &= 65535,
        r += e * m,
        o += r >>> 16,
        r &= 65535,
        r += h * l,
        o += r >>> 16,
        r &= 65535,
        o += d * m,
        n += o >>> 16,
        o &= 65535,
        o += e * l,
        n += o >>> 16,
        o &= 65535,
        o += h * k,
        n += o >>> 16,
        o &= 65535,
        n += c * m + d * l + e * k + h * i,
        n &= 65535,
        g(r << 16 | s, n << 16 | o, this.unsigned)))
    }
    ,
    y.mul = y.multiply,
    y.divide = function(a) {
        var c, d, e, g, i, k, l, m;
        if (b(a) || (a = j(a)),
        a.isZero())
            throw Error("division by zero");
        if (this.isZero())
            return this.unsigned ? r : q;
        if (this.unsigned) {
            if (a.unsigned || (a = a.toUnsigned()),
            a.gt(this))
                return r;
            if (a.gt(this.shru(1)))
                return t;
            e = r
        } else {
            if (this.eq(x))
                return a.eq(s) || a.eq(u) ? x : a.eq(x) ? s : (g = this.shr(1),
                c = g.div(a).shl(1),
                c.eq(q) ? a.isNegative() ? s : u : (d = this.sub(a.mul(c)),
                e = c.add(d.div(a))));
            if (a.eq(x))
                return this.unsigned ? r : q;
            if (this.isNegative())
                return a.isNegative() ? this.neg().div(a.neg()) : this.neg().div(a).neg();
            if (a.isNegative())
                return this.div(a.neg()).neg();
            e = q
        }
        for (d = this; d.gte(a); ) {
            for (c = Math.max(1, Math.floor(d.toNumber() / a.toNumber())),
            i = Math.ceil(Math.log(c) / Math.LN2),
            k = 48 >= i ? 1 : h(2, i - 48),
            l = f(c),
            m = l.mul(a); m.isNegative() || m.gt(d); )
                c -= k,
                l = f(c, this.unsigned),
                m = l.mul(a);
            l.isZero() && (l = s),
            e = e.add(l),
            d = d.sub(m)
        }
        return e
    }
    ,
    y.div = y.divide,
    y.modulo = function(a) {
        return b(a) || (a = j(a)),
        this.sub(this.div(a).mul(a))
    }
    ,
    y.mod = y.modulo,
    y.not = function() {
        return g(~this.low, ~this.high, this.unsigned)
    }
    ,
    y.and = function(a) {
        return b(a) || (a = j(a)),
        g(this.low & a.low, this.high & a.high, this.unsigned)
    }
    ,
    y.or = function(a) {
        return b(a) || (a = j(a)),
        g(this.low | a.low, this.high | a.high, this.unsigned)
    }
    ,
    y.xor = function(a) {
        return b(a) || (a = j(a)),
        g(this.low ^ a.low, this.high ^ a.high, this.unsigned)
    }
    ,
    y.shiftLeft = function(a) {
        return b(a) && (a = a.toInt()),
        0 === (a &= 63) ? this : 32 > a ? g(this.low << a, this.high << a | this.low >>> 32 - a, this.unsigned) : g(0, this.low << a - 32, this.unsigned)
    }
    ,
    y.shl = y.shiftLeft,
    y.shiftRight = function(a) {
        return b(a) && (a = a.toInt()),
        0 === (a &= 63) ? this : 32 > a ? g(this.low >>> a | this.high << 32 - a, this.high >> a, this.unsigned) : g(this.high >> a - 32, this.high >= 0 ? 0 : -1, this.unsigned)
    }
    ,
    y.shr = y.shiftRight,
    y.shiftRightUnsigned = function(a) {
        var c, d;
        return b(a) && (a = a.toInt()),
        a &= 63,
        0 === a ? this : (c = this.high,
        32 > a ? (d = this.low,
        g(d >>> a | c << 32 - a, c >>> a, this.unsigned)) : 32 === a ? g(c, 0, this.unsigned) : g(c >>> a - 32, 0, this.unsigned))
    }
    ,
    y.shru = y.shiftRightUnsigned,
    y.toSigned = function() {
        return this.unsigned ? g(this.low, this.high, !1) : this
    }
    ,
    y.toUnsigned = function() {
        return this.unsigned ? this : g(this.low, this.high, !0)
    }
    ,
    y.toBytes = function(a) {
        return a ? this.toBytesLE() : this.toBytesBE()
    }
    ,
    y.toBytesLE = function() {
        var a = this.high
          , b = this.low;
        return [255 & b, 255 & b >>> 8, 255 & b >>> 16, 255 & b >>> 24, 255 & a, 255 & a >>> 8, 255 & a >>> 16, 255 & a >>> 24]
    }
    ,
    y.toBytesBE = function() {
        var a = this.high
          , b = this.low;
        return [255 & a >>> 24, 255 & a >>> 16, 255 & a >>> 8, 255 & a, 255 & b >>> 24, 255 & b >>> 16, 255 & b >>> 8, 255 & b]
    }
    ,
    a
}),
"undefined" == typeof Paho && (Paho = {}),
Paho.MQTT = function(a) {
    function m(a, b) {
        var h, i, j, k, m, n, o, q, r, s, c = b, e = a[b], f = e >> 4, g = e &= 15;
        b += 1,
        i = 0,
        j = 1;
        do {
            if (b == a.length)
                return [null, c];
            h = a[b++],
            i += (127 & h) * j,
            j *= 128
        } while (0 != (128 & h));if (k = b + i,
        k > a.length)
            return [null, c];
        switch (m = new l(f),
        f) {
        case d.CONNACK:
            n = a[b++],
            1 & n && (m.sessionPresent = !0),
            m.returnCode = a[b++];
            break;
        case d.PUBLISH:
            o = 3 & g >> 1,
            q = p(a, b),
            b += 2,
            r = t(a, b, q),
            b += q,
            o > 0 && (m.messageIdentifier = p(a, b),
            b += 2),
            s = new Paho.MQTT.Message(a.subarray(b, k)),
            1 == (1 & g) && (s.retained = !0),
            8 == (8 & g) && (s.duplicate = !0),
            s.qos = o,
            s.destinationName = r,
            m.payloadMessage = s;
            break;
        case d.PUBACK:
        case d.PUBREC:
        case d.PUBREL:
        case d.PUBCOMP:
        case d.UNSUBACK:
            m.messageIdentifier = p(a, b);
            break;
        case d.SUBACK:
            m.messageIdentifier = p(a, b),
            b += 2,
            m.returnCode = a.subarray(b, k)
        }
        return [m, k]
    }
    function n(a, b, c) {
        return b[c++] = a >> 8,
        b[c++] = a % 256,
        c
    }
    function o(a, b, c, d) {
        return d = n(b, c, d),
        s(a, c, d),
        d + b
    }
    function p(a, b) {
        return 256 * a[b] + a[b + 1]
    }
    function q(a) {
        var d, b = new Array(1), c = 0;
        do
            d = a % 128,
            a >>= 7,
            a > 0 && (d |= 128),
            b[c++] = d;
        while (a > 0 && 4 > c);return b
    }
    function r(a) {
        var c, d, b = 0;
        for (c = 0; c < a.length; c++)
            d = a.charCodeAt(c),
            d > 2047 ? (d >= 55296 && 56319 >= d && (c++,
            b++),
            b += 3) : d > 127 ? b += 2 : b++;
        return b
    }
    function s(a, b, c) {
        var e, f, h, d = c;
        for (e = 0; e < a.length; e++) {
            if (f = a.charCodeAt(e),
            f >= 55296 && 56319 >= f) {
                if (h = a.charCodeAt(++e),
                isNaN(h))
                    throw new Error(i(g.MALFORMED_UNICODE, [f, h]));
                f = (f - 55296 << 10) + (h - 56320) + 65536
            }
            127 >= f ? b[d++] = f : 2047 >= f ? (b[d++] = 192 | 31 & f >> 6,
            b[d++] = 128 | 63 & f) : 65535 >= f ? (b[d++] = 224 | 15 & f >> 12,
            b[d++] = 128 | 63 & f >> 6,
            b[d++] = 128 | 63 & f) : (b[d++] = 240 | 7 & f >> 18,
            b[d++] = 128 | 63 & f >> 12,
            b[d++] = 128 | 63 & f >> 6,
            b[d++] = 128 | 63 & f)
        }
        return b
    }
    function t(a, b, c) {
        for (var e, h, j, k, l, d = "", f = b; b + c > f; ) {
            if (h = a[f++],
            128 > h)
                e = h;
            else {
                if (j = a[f++] - 128,
                0 > j)
                    throw new Error(i(g.MALFORMED_UTF, [h.toString(16), j.toString(16), ""]));
                if (224 > h)
                    e = 64 * (h - 192) + j;
                else {
                    if (k = a[f++] - 128,
                    0 > k)
                        throw new Error(i(g.MALFORMED_UTF, [h.toString(16), j.toString(16), k.toString(16)]));
                    if (240 > h)
                        e = 4096 * (h - 224) + 64 * j + k;
                    else {
                        if (l = a[f++] - 128,
                        0 > l)
                            throw new Error(i(g.MALFORMED_UTF, [h.toString(16), j.toString(16), k.toString(16), l.toString(16)]));
                        if (!(248 > h))
                            throw new Error(i(g.MALFORMED_UTF, [h.toString(16), j.toString(16), k.toString(16), l.toString(16)]));
                        e = 262144 * (h - 240) + 4096 * j + 64 * k + l
                    }
                }
            }
            e > 65535 && (e -= 65536,
            d += String.fromCharCode(55296 + (e >> 10)),
            e = 56320 + (1023 & e)),
            d += String.fromCharCode(e)
        }
        return d
    }
    var u, v, w, x, y, b = "@VERSION@", d = {
        CONNECT: 1,
        CONNACK: 2,
        PUBLISH: 3,
        PUBACK: 4,
        PUBREC: 5,
        PUBREL: 6,
        PUBCOMP: 7,
        SUBSCRIBE: 8,
        SUBACK: 9,
        UNSUBSCRIBE: 10,
        UNSUBACK: 11,
        PINGREQ: 12,
        PINGRESP: 13,
        DISCONNECT: 14
    }, e = function(a, b) {
        var c, d;
        for (c in a)
            if (a.hasOwnProperty(c)) {
                if (!b.hasOwnProperty(c)) {
                    d = "Unknown property, " + c + ". Valid properties are:";
                    for (c in b)
                        b.hasOwnProperty(c) && (d = d + " " + c);
                    throw new Error(d)
                }
                if (typeof a[c] !== b[c])
                    throw new Error(i(g.INVALID_TYPE, [typeof a[c], c]))
            }
    }, f = function(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    }, g = {
        OK: {
            code: 0,
            text: "AMQJSC0000I OK."
        },
        CONNECT_TIMEOUT: {
            code: 1,
            text: "AMQJSC0001E Connect timed out."
        },
        SUBSCRIBE_TIMEOUT: {
            code: 2,
            text: "AMQJS0002E Subscribe timed out."
        },
        UNSUBSCRIBE_TIMEOUT: {
            code: 3,
            text: "AMQJS0003E Unsubscribe timed out."
        },
        PING_TIMEOUT: {
            code: 4,
            text: "AMQJS0004E Ping timed out."
        },
        INTERNAL_ERROR: {
            code: 5,
            text: "AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"
        },
        CONNACK_RETURNCODE: {
            code: 6,
            text: "AMQJS0006E Bad Connack return code:{0} {1}."
        },
        SOCKET_ERROR: {
            code: 7,
            text: "AMQJS0007E Socket error:{0}."
        },
        SOCKET_CLOSE: {
            code: 8,
            text: "AMQJS0008I Socket closed."
        },
        MALFORMED_UTF: {
            code: 9,
            text: "AMQJS0009E Malformed UTF data:{0} {1} {2}."
        },
        UNSUPPORTED: {
            code: 10,
            text: "AMQJS0010E {0} is not supported by this browser."
        },
        INVALID_STATE: {
            code: 11,
            text: "AMQJS0011E Invalid state {0}."
        },
        INVALID_TYPE: {
            code: 12,
            text: "AMQJS0012E Invalid type {0} for {1}."
        },
        INVALID_ARGUMENT: {
            code: 13,
            text: "AMQJS0013E Invalid argument {0} for {1}."
        },
        UNSUPPORTED_OPERATION: {
            code: 14,
            text: "AMQJS0014E Unsupported operation."
        },
        INVALID_STORED_DATA: {
            code: 15,
            text: "AMQJS0015E Invalid data in local storage key={0} value={1}."
        },
        INVALID_MQTT_MESSAGE_TYPE: {
            code: 16,
            text: "AMQJS0016E Invalid MQTT message type {0}."
        },
        MALFORMED_UNICODE: {
            code: 17,
            text: "AMQJS0017E Malformed Unicode string:{0} {1}."
        }
    }, h = {
        0: "Connection Accepted",
        1: "Connection Refused: unacceptable protocol version",
        2: "Connection Refused: identifier rejected",
        3: "Connection Refused: server unavailable",
        4: "Connection Refused: bad user name or password",
        5: "Connection Refused: not authorized"
    }, i = function(a, b) {
        var d, e, f, g, h, c = a.text;
        if (b)
            for (f = 0; f < b.length; f++)
                d = "{" + f + "}",
                e = c.indexOf(d),
                e > 0 && (g = c.substring(0, e),
                h = c.substring(e + d.length),
                c = g + b[f] + h);
        return c
    }, j = [0, 6, 77, 81, 73, 115, 100, 112, 3], k = [0, 4, 77, 81, 84, 84, 4], l = function(a, b) {
        this.type = a;
        for (var c in b)
            b.hasOwnProperty(c) && (this[c] = b[c])
    };
    return l.prototype.encode = function() {
        var f, g, h, i, l, m, p, s, a = (15 & this.type) << 4, b = 0, c = new Array, e = 0;
        switch (void 0 != this.messageIdentifier && (b += 2),
        this.type) {
        case d.CONNECT:
            switch (this.mqttVersion) {
            case 3:
                b += j.length + 3;
                break;
            case 4:
                b += k.length + 3
            }
            b += r(this.clientId) + 2,
            void 0 != this.willMessage && (b += r(this.willMessage.destinationName) + 2,
            f = this.willMessage.payloadBytes,
            f instanceof Uint8Array || (f = new Uint8Array(h)),
            b += f.byteLength + 2),
            void 0 != this.userName && (b += r(this.userName) + 2),
            void 0 != this.password && (b += r(this.password) + 2);
            break;
        case d.SUBSCRIBE:
            for (a |= 2,
            g = 0; g < this.topics.length; g++)
                c[g] = r(this.topics[g]),
                b += c[g] + 2;
            b += this.requestedQos.length;
            break;
        case d.UNSUBSCRIBE:
            for (a |= 2,
            g = 0; g < this.topics.length; g++)
                c[g] = r(this.topics[g]),
                b += c[g] + 2;
            break;
        case d.PUBREL:
            a |= 2;
            break;
        case d.PUBLISH:
            this.payloadMessage.duplicate && (a |= 8),
            a = a |= this.payloadMessage.qos << 1,
            this.payloadMessage.retained && (a |= 1),
            e = r(this.payloadMessage.destinationName),
            b += e + 2,
            h = this.payloadMessage.payloadBytes,
            b += h.byteLength,
            h instanceof ArrayBuffer ? h = new Uint8Array(h) : h instanceof Uint8Array || (h = new Uint8Array(h.buffer));
            break;
        case d.DISCONNECT:
        }
        if (i = q(b),
        l = i.length + 1,
        m = new ArrayBuffer(b + l),
        p = new Uint8Array(m),
        p[0] = a,
        p.set(i, 1),
        this.type == d.PUBLISH)
            l = o(this.payloadMessage.destinationName, e, p, l);
        else if (this.type == d.CONNECT) {
            switch (this.mqttVersion) {
            case 3:
                p.set(j, l),
                l += j.length;
                break;
            case 4:
                p.set(k, l),
                l += k.length
            }
            s = 0,
            this.cleanSession && (s = 2),
            void 0 != this.willMessage && (s |= 4,
            s |= this.willMessage.qos << 3,
            this.willMessage.retained && (s |= 32)),
            void 0 != this.userName && (s |= 128),
            void 0 != this.password && (s |= 64),
            p[l++] = s,
            l = n(this.keepAliveInterval, p, l)
        }
        switch (void 0 != this.messageIdentifier && (l = n(this.messageIdentifier, p, l)),
        this.type) {
        case d.CONNECT:
            l = o(this.clientId, r(this.clientId), p, l),
            void 0 != this.willMessage && (l = o(this.willMessage.destinationName, r(this.willMessage.destinationName), p, l),
            l = n(f.byteLength, p, l),
            p.set(f, l),
            l += f.byteLength),
            void 0 != this.userName && (l = o(this.userName, r(this.userName), p, l)),
            void 0 != this.password && (l = o(this.password, r(this.password), p, l));
            break;
        case d.PUBLISH:
            p.set(h, l);
            break;
        case d.SUBSCRIBE:
            for (g = 0; g < this.topics.length; g++)
                l = o(this.topics[g], c[g], p, l),
                p[l++] = this.requestedQos[g];
            break;
        case d.UNSUBSCRIBE:
            for (g = 0; g < this.topics.length; g++)
                l = o(this.topics[g], c[g], p, l)
        }
        return m
    }
    ,
    u = function(a, b, c) {
        var e, f, h;
        this._client = a,
        this._window = b,
        this._keepAliveInterval = 1e3 * c,
        this.isReset = !1,
        e = new l(d.PINGREQ).encode(),
        f = function(a) {
            return function() {
                return h.apply(a)
            }
        }
        ,
        h = function() {
            this.isReset ? (this.isReset = !1,
            this._client._trace("Pinger.doPing", "send PINGREQ"),
            this._client.socket.send(e),
            this.timeout = this._window.setTimeout(f(this), this._keepAliveInterval)) : (this._client._trace("Pinger.doPing", "Timed out"),
            this._client._disconnected(g.PING_TIMEOUT.code, i(g.PING_TIMEOUT)))
        }
        ,
        this.reset = function() {
            this.isReset = !0,
            this._window.clearTimeout(this.timeout),
            this._keepAliveInterval > 0 && (this.timeout = setTimeout(f(this), this._keepAliveInterval))
        }
        ,
        this.cancel = function() {
            this._window.clearTimeout(this.timeout)
        }
    }
    ,
    v = function(a, b, c, d, e) {
        this._window = b,
        c || (c = 30);
        var f = function(a, b, c) {
            return function() {
                return a.apply(b, c)
            }
        };
        this.timeout = setTimeout(f(d, a, e), 1e3 * c),
        this.cancel = function() {
            this._window.clearTimeout(this.timeout)
        }
    }
    ,
    w = function(b, c, d, e, f) {
        if (!("WebSocket"in a && null !== a["WebSocket"]))
            throw new Error(i(g.UNSUPPORTED, ["WebSocket"]));
        if (!("localStorage"in a && null !== a["localStorage"]))
            throw new Error(i(g.UNSUPPORTED, ["localStorage"]));
        if (!("ArrayBuffer"in a && null !== a["ArrayBuffer"]))
            throw new Error(i(g.UNSUPPORTED, ["ArrayBuffer"]));
        this._trace("Paho.MQTT.Client", b, c, d, e, f),
        this.host = c,
        this.port = d,
        this.path = e,
        this.uri = b,
        this.clientId = f,
        this._localKey = c + ":" + d + ("/mqtt" != e ? ":" + e : "") + ":" + f + ":",
        this._msg_queue = [],
        this._sentMessages = {},
        this._receivedMessages = {},
        this._notify_msg_sent = {},
        this._message_identifier = 1,
        this._sequence = 0;
        for (var h in localStorage)
            (0 == h.indexOf("Sent:" + this._localKey) || 0 == h.indexOf("Received:" + this._localKey)) && this.restore(h)
    }
    ,
    w.prototype.host,
    w.prototype.port,
    w.prototype.path,
    w.prototype.uri,
    w.prototype.clientId,
    w.prototype.socket,
    w.prototype.connected = !1,
    w.prototype.maxMessageIdentifier = 65536,
    w.prototype.connectOptions,
    w.prototype.hostIndex,
    w.prototype.onConnectionLost,
    w.prototype.onMessageDelivered,
    w.prototype.onMessageArrived,
    w.prototype.traceFunction,
    w.prototype._msg_queue = null,
    w.prototype._connectTimeout,
    w.prototype.sendPinger = null,
    w.prototype.receivePinger = null,
    w.prototype.receiveBuffer = null,
    w.prototype._traceBuffer = null,
    w.prototype._MAX_TRACE_ENTRIES = 100,
    w.prototype.connect = function(a) {
        var b = this._traceMask(a, "password");
        this._trace("Client.connect", b, this.socket, this.connected),
        this.connectOptions = a,
        a.uris ? (this.hostIndex = 0,
        this._doConnect(a.uris[0])) : this._doConnect(this.uri)
    }
    ,
    w.prototype.subscribe = function(a, b) {
        if (this._trace("Client.subscribe", a, b),
        !this.connected)
            throw new Error(i(g.INVALID_STATE, ["not connected"]));
        var c = new l(d.SUBSCRIBE);
        c.topics = [a],
        c.requestedQos = void 0 != b.qos ? [b.qos] : [0],
        b.onSuccess && (c.onSuccess = function(a) {
            b.onSuccess({
                invocationContext: b.invocationContext,
                grantedQos: a
            })
        }
        ),
        b.onFailure && (c.onFailure = function(a) {
            b.onFailure({
                invocationContext: b.invocationContext,
                errorCode: a
            })
        }
        ),
        b.timeout && (c.timeOut = new v(this,window,b.timeout,b.onFailure,[{
            invocationContext: b.invocationContext,
            errorCode: g.SUBSCRIBE_TIMEOUT.code,
            errorMessage: i(g.SUBSCRIBE_TIMEOUT)
        }])),
        this._requires_ack(c),
        this._schedule_message(c)
    }
    ,
    w.prototype.unsubscribe = function(a, b) {
        if (this._trace("Client.unsubscribe", a, b),
        !this.connected)
            throw new Error(i(g.INVALID_STATE, ["not connected"]));
        var c = new l(d.UNSUBSCRIBE);
        c.topics = [a],
        b.onSuccess && (c.callback = function() {
            b.onSuccess({
                invocationContext: b.invocationContext
            })
        }
        ),
        b.timeout && (c.timeOut = new v(this,window,b.timeout,b.onFailure,[{
            invocationContext: b.invocationContext,
            errorCode: g.UNSUBSCRIBE_TIMEOUT.code,
            errorMessage: i(g.UNSUBSCRIBE_TIMEOUT)
        }])),
        this._requires_ack(c),
        this._schedule_message(c)
    }
    ,
    w.prototype.send = function(a) {
        if (this._trace("Client.send", a),
        !this.connected)
            throw new Error(i(g.INVALID_STATE, ["not connected"]));
        wireMessage = new l(d.PUBLISH),
        wireMessage.payloadMessage = a,
        a.qos > 0 ? this._requires_ack(wireMessage) : this.onMessageDelivered && (this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage)),
        this._schedule_message(wireMessage)
    }
    ,
    w.prototype.disconnect = function() {
        if (this._trace("Client.disconnect"),
        !this.socket)
            throw new Error(i(g.INVALID_STATE, ["not connecting or connected"]));
        wireMessage = new l(d.DISCONNECT),
        this._notify_msg_sent[wireMessage] = f(this._disconnected, this),
        this._schedule_message(wireMessage)
    }
    ,
    w.prototype.getTraceLog = function() {
        var a;
        if (null !== this._traceBuffer) {
            this._trace("Client.getTraceLog", new Date),
            this._trace("Client.getTraceLog in flight messages", this._sentMessages.length);
            for (a in this._sentMessages)
                this._trace("_sentMessages ", a, this._sentMessages[a]);
            for (a in this._receivedMessages)
                this._trace("_receivedMessages ", a, this._receivedMessages[a]);
            return this._traceBuffer
        }
    }
    ,
    w.prototype.startTrace = function() {
        null === this._traceBuffer && (this._traceBuffer = []),
        this._trace("Client.startTrace", new Date, b)
    }
    ,
    w.prototype.stopTrace = function() {
        delete this._traceBuffer
    }
    ,
    w.prototype._doConnect = function(a) {
        if (this.connectOptions.useSSL) {
            var b = a.split(":");
            b[0] = "wss",
            a = b.join(":")
        }
        this.connected = !1,
        this.socket = this.connectOptions.mqttVersion < 4 ? new WebSocket(a) : new WebSocket(a),
        this.socket.binaryType = "arraybuffer",
        this.socket.onopen = f(this._on_socket_open, this),
        this.socket.onmessage = f(this._on_socket_message, this),
        this.socket.onerror = f(this._on_socket_error, this),
        this.socket.onclose = f(this._on_socket_close, this),
        this.sendPinger = new u(this,window,this.connectOptions.keepAliveInterval),
        this.receivePinger = new u(this,window,this.connectOptions.keepAliveInterval),
        this._connectTimeout = new v(this,window,this.connectOptions.timeout,this._disconnected,[g.CONNECT_TIMEOUT.code, i(g.CONNECT_TIMEOUT)])
    }
    ,
    w.prototype._schedule_message = function(a) {
        this._msg_queue.push(a),
        this.connected && this._process_queue()
    }
    ,
    w.prototype.store = function(a, b) {
        var e, f, h, c = {
            type: b.type,
            messageIdentifier: b.messageIdentifier,
            version: 1
        };
        switch (b.type) {
        case d.PUBLISH:
            for (b.pubRecReceived && (c.pubRecReceived = !0),
            c.payloadMessage = {},
            e = "",
            f = b.payloadMessage.payloadBytes,
            h = 0; h < f.length; h++)
                f[h] <= 15 ? e = e + "0" + f[h].toString(16) : e += f[h].toString(16);
            c.payloadMessage.payloadHex = e,
            c.payloadMessage.qos = b.payloadMessage.qos,
            c.payloadMessage.destinationName = b.payloadMessage.destinationName,
            b.payloadMessage.duplicate && (c.payloadMessage.duplicate = !0),
            b.payloadMessage.retained && (c.payloadMessage.retained = !0),
            0 == a.indexOf("Sent:") && (void 0 === b.sequence && (b.sequence = ++this._sequence),
            c.sequence = b.sequence);
            break;
        default:
            throw Error(i(g.INVALID_STORED_DATA, [key, c]))
        }
        localStorage.setItem(a + this._localKey + b.messageIdentifier, JSON.stringify(c))
    }
    ,
    w.prototype.restore = function(a) {
        var f, h, j, k, m, n, b = localStorage.getItem(a), c = JSON.parse(b), e = new l(c.type,c);
        switch (c.type) {
        case d.PUBLISH:
            for (f = c.payloadMessage.payloadHex,
            h = new ArrayBuffer(f.length / 2),
            j = new Uint8Array(h),
            k = 0; f.length >= 2; )
                m = parseInt(f.substring(0, 2), 16),
                f = f.substring(2, f.length),
                j[k++] = m;
            n = new Paho.MQTT.Message(j),
            n.qos = c.payloadMessage.qos,
            n.destinationName = c.payloadMessage.destinationName,
            c.payloadMessage.duplicate && (n.duplicate = !0),
            c.payloadMessage.retained && (n.retained = !0),
            e.payloadMessage = n;
            break;
        default:
            throw Error(i(g.INVALID_STORED_DATA, [a, b]))
        }
        0 == a.indexOf("Sent:" + this._localKey) ? (e.payloadMessage.duplicate = !0,
        this._sentMessages[e.messageIdentifier] = e) : 0 == a.indexOf("Received:" + this._localKey) && (this._receivedMessages[e.messageIdentifier] = e)
    }
    ,
    w.prototype._process_queue = function() {
        for (var a = null, b = this._msg_queue.reverse(); a = b.pop(); )
            this._socket_send(a),
            this._notify_msg_sent[a] && (this._notify_msg_sent[a](),
            delete this._notify_msg_sent[a])
    }
    ,
    w.prototype._requires_ack = function(a) {
        var b = Object.keys(this._sentMessages).length;
        if (b > this.maxMessageIdentifier)
            throw Error("Too many messages:" + b);
        for (; void 0 !== this._sentMessages[this._message_identifier]; )
            this._message_identifier++;
        a.messageIdentifier = this._message_identifier,
        this._sentMessages[a.messageIdentifier] = a,
        a.type === d.PUBLISH && this.store("Sent:", a),
        this._message_identifier === this.maxMessageIdentifier && (this._message_identifier = 1)
    }
    ,
    w.prototype._on_socket_open = function() {
        var a = new l(d.CONNECT,this.connectOptions);
        a.clientId = this.clientId,
        this._socket_send(a)
    }
    ,
    w.prototype._on_socket_message = function(a) {
        var b, c;
        for (this._trace("Client._on_socket_message", a.data),
        this.receivePinger.reset(),
        b = this._deframeMessages(a.data),
        c = 0; c < b.length; c += 1)
            this._handleMessage(b[c])
    }
    ,
    w.prototype._deframeMessages = function(a) {
        var c, d, e, f, h, b = new Uint8Array(a);
        this.receiveBuffer && (c = new Uint8Array(this.receiveBuffer.length + b.length),
        c.set(this.receiveBuffer),
        c.set(b, this.receiveBuffer.length),
        b = c,
        delete this.receiveBuffer);
        try {
            for (d = 0,
            e = []; d < b.length && (f = m(b, d),
            h = f[0],
            d = f[1],
            null !== h); )
                e.push(h);
            d < b.length && (this.receiveBuffer = b.subarray(d))
        } catch (j) {
            return this._disconnected(g.INTERNAL_ERROR.code, i(g.INTERNAL_ERROR, [j.message, j.stack.toString()])),
            void 0
        }
        return e
    }
    ,
    w.prototype._handleMessage = function(a) {
        console.log('handleMessage', a)
        var b, c, e, f, j, k, m, n, o;
        this._trace("Client._handleMessage", a);
        try {
            switch (a.type) {
            case d.CONNACK:
                if (this._connectTimeout.cancel(),
                this.connectOptions.cleanSession) {
                    for (b in this._sentMessages)
                        c = this._sentMessages[b],
                        localStorage.removeItem("Sent:" + this._localKey + c.messageIdentifier);
                    this._sentMessages = {};
                    for (b in this._receivedMessages)
                        e = this._receivedMessages[b],
                        localStorage.removeItem("Received:" + this._localKey + e.messageIdentifier);
                    this._receivedMessages = {}
                }
                if (0 !== a.returnCode) {
                    this._disconnected(g.CONNACK_RETURNCODE.code, i(g.CONNACK_RETURNCODE, [a.returnCode, h[a.returnCode]]));
                    break
                }
                this.connected = !0,
                this.connectOptions.uris && (this.hostIndex = this.connectOptions.uris.length),
                f = new Array;
                for (j in this._sentMessages)
                    this._sentMessages.hasOwnProperty(j) && f.push(this._sentMessages[j]);
                for (f = f.sort(function(a, b) {
                    return a.sequence - b.sequence
                }),
                k = 0,
                m = f.length; m > k; k++)
                    c = f[k],
                    c.type == d.PUBLISH && c.pubRecReceived ? (n = new l(d.PUBREL,{
                        messageIdentifier: c.messageIdentifier
                    }),
                    this._schedule_message(n)) : this._schedule_message(c);
                this.connectOptions.onSuccess && this.connectOptions.onSuccess({
                    invocationContext: this.connectOptions.invocationContext
                }),
                this._process_queue();
                break;
            case d.PUBLISH:
                this._receivePublish(a);
                break;
            case d.PUBACK:
                c = this._sentMessages[a.messageIdentifier],
                c && (delete this._sentMessages[a.messageIdentifier],
                localStorage.removeItem("Sent:" + this._localKey + a.messageIdentifier),
                this.onMessageDelivered && this.onMessageDelivered(c.payloadMessage));
                break;
            case d.PUBREC:
                c = this._sentMessages[a.messageIdentifier],
                c && (c.pubRecReceived = !0,
                n = new l(d.PUBREL,{
                    messageIdentifier: a.messageIdentifier
                }),
                this.store("Sent:", c),
                this._schedule_message(n));
                break;
            case d.PUBREL:
                e = this._receivedMessages[a.messageIdentifier],
                localStorage.removeItem("Received:" + this._localKey + a.messageIdentifier),
                e && (this._receiveMessage(e),
                delete this._receivedMessages[a.messageIdentifier]),
                o = new l(d.PUBCOMP,{
                    messageIdentifier: a.messageIdentifier
                }),
                this._schedule_message(o);
                break;
            case d.PUBCOMP:
                c = this._sentMessages[a.messageIdentifier],
                delete this._sentMessages[a.messageIdentifier],
                localStorage.removeItem("Sent:" + this._localKey + a.messageIdentifier),
                this.onMessageDelivered && this.onMessageDelivered(c.payloadMessage);
                break;
            case d.SUBACK:
                c = this._sentMessages[a.messageIdentifier],
                c && (c.timeOut && c.timeOut.cancel(),
                128 === a.returnCode[0] ? c.onFailure && c.onFailure(a.returnCode) : c.onSuccess && c.onSuccess(a.returnCode),
                delete this._sentMessages[a.messageIdentifier]);
                break;
            case d.UNSUBACK:
                c = this._sentMessages[a.messageIdentifier],
                c && (c.timeOut && c.timeOut.cancel(),
                c.callback && c.callback(),
                delete this._sentMessages[a.messageIdentifier]);
                break;
            case d.PINGRESP:
                this.sendPinger.reset();
                break;
            case d.DISCONNECT:
                this._disconnected(g.INVALID_MQTT_MESSAGE_TYPE.code, i(g.INVALID_MQTT_MESSAGE_TYPE, [a.type]));
                break;
            default:
                this._disconnected(g.INVALID_MQTT_MESSAGE_TYPE.code, i(g.INVALID_MQTT_MESSAGE_TYPE, [a.type]))
            }
        } catch (p) {
            return this._disconnected(g.INTERNAL_ERROR.code, i(g.INTERNAL_ERROR, [p.message, p.stack.toString()])),
            void 0
        }
    }
    ,
    w.prototype._on_socket_error = function(a) {
        this._disconnected(g.SOCKET_ERROR.code, i(g.SOCKET_ERROR, [a.data]))
    }
    ,
    w.prototype._on_socket_close = function() {
        this._disconnected(g.SOCKET_CLOSE.code, i(g.SOCKET_CLOSE))
    }
    ,
    w.prototype._socket_send = function(a) {
        if (1 == a.type) {
            var b = this._traceMask(a, "password");
            this._trace("Client._socket_send", b)
        } else
            this._trace("Client._socket_send", a);
        this.socket.send(a.encode()),
        this.sendPinger.reset()
    }
    ,
    w.prototype._receivePublish = function(a) {
        var b, c;
        switch (a.payloadMessage.qos) {
        case "undefined":
        case 0:
            this._receiveMessage(a);
            break;
        case 1:
            b = new l(d.PUBACK,{
                messageIdentifier: a.messageIdentifier
            }),
            this._schedule_message(b),
            this._receiveMessage(a);
            break;
        case 2:
            this._receivedMessages[a.messageIdentifier] = a,
            this.store("Received:", a),
            c = new l(d.PUBREC,{
                messageIdentifier: a.messageIdentifier
            }),
            this._schedule_message(c);
            break;
        default:
            throw Error("Invaild qos=" + wireMmessage.payloadMessage.qos)
        }
    }
    ,
    w.prototype._receiveMessage = function(a) {
        this.onMessageArrived && this.onMessageArrived(a.payloadMessage)
    }
    ,
    w.prototype._disconnected = function(a, b) {
        this._trace("Client._disconnected", a, b),
        this.sendPinger.cancel(),
        this.receivePinger.cancel(),
        this._connectTimeout && this._connectTimeout.cancel(),
        this._msg_queue = [],
        this._notify_msg_sent = {},
        this.socket && (this.socket.onopen = null,
        this.socket.onmessage = null,
        this.socket.onerror = null,
        this.socket.onclose = null,
        1 === this.socket.readyState && this.socket.close(),
        delete this.socket),
        this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length - 1 ? (this.hostIndex++,
        this._doConnect(this.connectOptions.uris[this.hostIndex])) : (void 0 === a && (a = g.OK.code,
        b = i(g.OK)),
        this.connected ? (this.connected = !1,
        this.onConnectionLost && this.onConnectionLost({
            errorCode: a,
            errorMessage: b
        })) : 4 === this.connectOptions.mqttVersion && this.connectOptions.mqttVersionExplicit === !1 ? (this._trace("Failed to connect V4, dropping back to V3"),
        this.connectOptions.mqttVersion = 3,
        this.connectOptions.uris ? (this.hostIndex = 0,
        this._doConnect(this.connectOptions.uris[0])) : this._doConnect(this.uri)) : this.connectOptions.onFailure && this.connectOptions.onFailure({
            invocationContext: this.connectOptions.invocationContext,
            errorCode: a,
            errorMessage: b
        }))
    }
    ,
    w.prototype._trace = function() {
        var a, b, c;
        if (this.traceFunction) {
            for (a in arguments)
                "undefined" != typeof arguments[a] && (arguments[a] = JSON.stringify(arguments[a]));
            b = Array.prototype.slice.call(arguments).join(""),
            this.traceFunction({
                severity: "Debug",
                message: b
            })
        }
        if (null !== this._traceBuffer)
            for (a = 0,
            c = arguments.length; c > a; a++)
                this._traceBuffer.length == this._MAX_TRACE_ENTRIES && this._traceBuffer.shift(),
                0 === a ? this._traceBuffer.push(arguments[a]) : "undefined" == typeof arguments[a] ? this._traceBuffer.push(arguments[a]) : this._traceBuffer.push("  " + JSON.stringify(arguments[a]))
    }
    ,
    w.prototype._traceMask = function(a, b) {
        var d, c = {};
        for (d in a)
            a.hasOwnProperty(d) && (c[d] = d == b ? "******" : a[d]);
        return c
    }
    ,
    x = function(a, b, c, d) {
        var f, h, j, k, l, m, n;
        if ("string" != typeof a)
            throw new Error(i(g.INVALID_TYPE, [typeof a, "host"]));
        if (2 == arguments.length) {
            if (d = b,
            f = a,
            h = f.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/),
            !h)
                throw new Error(i(g.INVALID_ARGUMENT, [a, "host"]));
            a = h[4] || h[2],
            b = parseInt(h[7]),
            c = h[8]
        } else {
            if (3 == arguments.length && (d = c,
            c = "/mqtt"),
            "number" != typeof b || 0 > b)
                throw new Error(i(g.INVALID_TYPE, [typeof b, "port"]));
            if ("string" != typeof c)
                throw new Error(i(g.INVALID_TYPE, [typeof c, "path"]));
            j = -1 != a.indexOf(":") && "[" != a.slice(0, 1) && "]" != a.slice(-1),
            f = "ws://" + (j ? "[" + a + "]" : a) + ":" + b + c
        }
        for (k = 0,
        l = 0; l < d.length; l++)
            m = d.charCodeAt(l),
            m >= 55296 && 56319 >= m && l++,
            k++;
        if ("string" != typeof d || k > 65535)
            throw new Error(i(g.INVALID_ARGUMENT, [d, "clientId"]));
        n = new w(f,a,b,c,d),
        this._getHost = function() {
            return a
        }
        ,
        this._setHost = function() {
            throw new Error(i(g.UNSUPPORTED_OPERATION))
        }
        ,
        this._getPort = function() {
            return b
        }
        ,
        this._setPort = function() {
            throw new Error(i(g.UNSUPPORTED_OPERATION))
        }
        ,
        this._getPath = function() {
            return c
        }
        ,
        this._setPath = function() {
            throw new Error(i(g.UNSUPPORTED_OPERATION))
        }
        ,
        this._getURI = function() {
            return f
        }
        ,
        this._setURI = function() {
            throw new Error(i(g.UNSUPPORTED_OPERATION))
        }
        ,
        this._getClientId = function() {
            return n.clientId
        }
        ,
        this._setClientId = function() {
            throw new Error(i(g.UNSUPPORTED_OPERATION))
        }
        ,
        this._getOnConnectionLost = function() {
            return n.onConnectionLost
        }
        ,
        this._setOnConnectionLost = function(a) {
            if ("function" != typeof a)
                throw new Error(i(g.INVALID_TYPE, [typeof a, "onConnectionLost"]));
            n.onConnectionLost = a
        }
        ,
        this._getOnMessageDelivered = function() {
            return n.onMessageDelivered
        }
        ,
        this._setOnMessageDelivered = function(a) {
            if ("function" != typeof a)
                throw new Error(i(g.INVALID_TYPE, [typeof a, "onMessageDelivered"]));
            n.onMessageDelivered = a
        }
        ,
        this._getOnMessageArrived = function() {
            return n.onMessageArrived
        }
        ,
        this._setOnMessageArrived = function(a) {
            if ("function" != typeof a)
                throw new Error(i(g.INVALID_TYPE, [typeof a, "onMessageArrived"]));
            n.onMessageArrived = a
        }
        ,
        this._getTrace = function() {
            return n.traceFunction
        }
        ,
        this._setTrace = function(a) {
            if ("function" != typeof a)
                throw new Error(i(g.INVALID_TYPE, [typeof a, "onTrace"]));
            n.traceFunction = a
        }
        ,
        this.connect = function(a) {
            var b, d, h, j, k;
            if (a = a || {},
            e(a, {
                timeout: "number",
                userName: "string",
                password: "string",
                willMessage: "object",
                keepAliveInterval: "number",
                cleanSession: "boolean",
                useSSL: "boolean",
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                hosts: "object",
                ports: "object",
                mqttVersion: "number"
            }),
            void 0 === a.keepAliveInterval && (a.keepAliveInterval = 60),
            a.mqttVersion > 4 || a.mqttVersion < 3)
                throw new Error(i(g.INVALID_ARGUMENT, [a.mqttVersion, "connectOptions.mqttVersion"]));
            if (void 0 === a.mqttVersion ? (a.mqttVersionExplicit = !1,
            a.mqttVersion = 4) : a.mqttVersionExplicit = !0,
            void 0 === a.password && void 0 !== a.userName)
                throw new Error(i(g.INVALID_ARGUMENT, [a.password, "connectOptions.password"]));
            if (a.willMessage) {
                if (!(a.willMessage instanceof y))
                    throw new Error(i(g.INVALID_TYPE, [a.willMessage, "connectOptions.willMessage"]));
                if (a.willMessage.stringPayload,
                "undefined" == typeof a.willMessage.destinationName)
                    throw new Error(i(g.INVALID_TYPE, [typeof a.willMessage.destinationName, "connectOptions.willMessage.destinationName"]))
            }
            if ("undefined" == typeof a.cleanSession && (a.cleanSession = !0),
            a.hosts) {
                if (!(a.hosts instanceof Array))
                    throw new Error(i(g.INVALID_ARGUMENT, [a.hosts, "connectOptions.hosts"]));
                if (a.hosts.length < 1)
                    throw new Error(i(g.INVALID_ARGUMENT, [a.hosts, "connectOptions.hosts"]));
                for (b = !1,
                d = 0; d < a.hosts.length; d++) {
                    if ("string" != typeof a.hosts[d])
                        throw new Error(i(g.INVALID_TYPE, [typeof a.hosts[d], "connectOptions.hosts[" + d + "]"]));
                    if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(a.hosts[d])) {
                        if (0 == d)
                            b = !0;
                        else if (!b)
                            throw new Error(i(g.INVALID_ARGUMENT, [a.hosts[d], "connectOptions.hosts[" + d + "]"]))
                    } else if (b)
                        throw new Error(i(g.INVALID_ARGUMENT, [a.hosts[d], "connectOptions.hosts[" + d + "]"]))
                }
                if (b)
                    a.uris = a.hosts;
                else {
                    if (!a.ports)
                        throw new Error(i(g.INVALID_ARGUMENT, [a.ports, "connectOptions.ports"]));
                    if (!(a.ports instanceof Array))
                        throw new Error(i(g.INVALID_ARGUMENT, [a.ports, "connectOptions.ports"]));
                    if (a.hosts.length != a.ports.length)
                        throw new Error(i(g.INVALID_ARGUMENT, [a.ports, "connectOptions.ports"]));
                    for (a.uris = [],
                    d = 0; d < a.hosts.length; d++) {
                        if ("number" != typeof a.ports[d] || a.ports[d] < 0)
                            throw new Error(i(g.INVALID_TYPE, [typeof a.ports[d], "connectOptions.ports[" + d + "]"]));
                        h = a.hosts[d],
                        j = a.ports[d],
                        k = -1 != h.indexOf(":"),
                        f = "ws://" + (k ? "[" + h + "]" : h) + ":" + j + c,
                        a.uris.push(f)
                    }
                }
            }
            n.connect(a)
        }
        ,
        this.subscribe = function(a, b) {
            if ("string" != typeof a)
                throw new Error("Invalid argument:" + a);
            if (b = b || {},
            e(b, {
                qos: "number",
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                timeout: "number"
            }),
            b.timeout && !b.onFailure)
                throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
            if ("undefined" != typeof b.qos && 0 !== b.qos && 1 !== b.qos && 2 !== b.qos)
                throw new Error(i(g.INVALID_ARGUMENT, [b.qos, "subscribeOptions.qos"]));
            n.subscribe(a, b)
        }
        ,
        this.unsubscribe = function(a, b) {
            if ("string" != typeof a)
                throw new Error("Invalid argument:" + a);
            if (b = b || {},
            e(b, {
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                timeout: "number"
            }),
            b.timeout && !b.onFailure)
                throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
            n.unsubscribe(a, b)
        }
        ,
        this.send = function(a, b, c, d) {
            var e;
            if (0 == arguments.length)
                throw new Error("Invalid argument.length");
            if (1 == arguments.length) {
                if (!(a instanceof y) && "string" != typeof a)
                    throw new Error("Invalid argument:" + typeof a);
                if (e = a,
                "undefined" == typeof e.destinationName)
                    throw new Error(i(g.INVALID_ARGUMENT, [e.destinationName, "Message.destinationName"]));
                n.send(e)
            } else
                e = new y(b),
                e.destinationName = a,
                arguments.length >= 3 && (e.qos = c),
                arguments.length >= 4 && (e.retained = d),
                n.send(e)
        }
        ,
        this.disconnect = function() {
            n.disconnect()
        }
        ,
        this.getTraceLog = function() {
            return n.getTraceLog()
        }
        ,
        this.startTrace = function() {
            n.startTrace()
        }
        ,
        this.stopTrace = function() {
            n.stopTrace()
        }
        ,
        this.isConnected = function() {
            return n.connected
        }
    }
    ,
    x.prototype = {
        get host() {
            return this._getHost()
        },
        set host(a) {
            this._setHost(a)
        },
        get port() {
            return this._getPort()
        },
        set port(a) {
            this._setPort(a)
        },
        get path() {
            return this._getPath()
        },
        set path(a) {
            this._setPath(a)
        },
        get clientId() {
            return this._getClientId()
        },
        set clientId(a) {
            this._setClientId(a)
        },
        get onConnectionLost() {
            return this._getOnConnectionLost()
        },
        set onConnectionLost(a) {
            this._setOnConnectionLost(a)
        },
        get onMessageDelivered() {
            return this._getOnMessageDelivered()
        },
        set onMessageDelivered(a) {
            this._setOnMessageDelivered(a)
        },
        get onMessageArrived() {
            return this._getOnMessageArrived()
        },
        set onMessageArrived(a) {
            this._setOnMessageArrived(a)
        },
        get trace() {
            return this._getTrace()
        },
        set trace(a) {
            this._setTrace(a)
        }
    },
    y = function(a) {
        var b, c, d, e, f;
        if (!("string" == typeof a || a instanceof ArrayBuffer || a instanceof Int8Array || a instanceof Uint8Array || a instanceof Int16Array || a instanceof Uint16Array || a instanceof Int32Array || a instanceof Uint32Array || a instanceof Float32Array || a instanceof Float64Array))
            throw i(g.INVALID_ARGUMENT, [a, "newPayload"]);
        b = a,
        this._getPayloadString = function() {
            return "string" == typeof b ? b : t(b, 0, b.length)
        }
        ,
        this._getPayloadBytes = function() {
            var a, c;
            return "string" == typeof b ? (a = new ArrayBuffer(r(b)),
            c = new Uint8Array(a),
            s(b, c, 0),
            c) : b
        }
        ,
        c = void 0,
        this._getDestinationName = function() {
            return c
        }
        ,
        this._setDestinationName = function(a) {
            if ("string" != typeof a)
                throw new Error(i(g.INVALID_ARGUMENT, [a, "newDestinationName"]));
            c = a
        }
        ,
        d = 0,
        this._getQos = function() {
            return d
        }
        ,
        this._setQos = function(a) {
            if (0 !== a && 1 !== a && 2 !== a)
                throw new Error("Invalid argument:" + a);
            d = a
        }
        ,
        e = !1,
        this._getRetained = function() {
            return e
        }
        ,
        this._setRetained = function(a) {
            if ("boolean" != typeof a)
                throw new Error(i(g.INVALID_ARGUMENT, [a, "newRetained"]));
            e = a
        }
        ,
        f = !1,
        this._getDuplicate = function() {
            return f
        }
        ,
        this._setDuplicate = function(a) {
            f = a
        }
    }
    ,
    y.prototype = {
        get payloadString() {
            return this._getPayloadString()
        },
        get payloadBytes() {
            return this._getPayloadBytes()
        },
        get destinationName() {
            return this._getDestinationName()
        },
        set destinationName(a) {
            this._setDestinationName(a)
        },
        get qos() {
            return this._getQos()
        },
        set qos(a) {
            this._setQos(a)
        },
        get retained() {
            return this._getRetained()
        },
        set retained(a) {
            this._setRetained(a)
        },
        get duplicate() {
            return this._getDuplicate()
        },
        set duplicate(a) {
            this._setDuplicate(a)
        }
    },
    {
        Client: x,
        Message: y
    }
}(window),
function(a, b) {
    "function" == typeof define && define["amd"] ? define(["/v2/web/boss/js/module/chat-long.js"], function() {
        (a["dcodeIO"] = a["dcodeIO"] || {})["ByteBuffer"] = b(a["dcodeIO"]["Long"])
    }) : "function" == typeof require && "object" == typeof module && module && module["exports"] ? module["exports"] = function() {
        var a;
        try {
            a = require("long")
        } catch (c) {}
        return b(a)
    }() : (a["dcodeIO"] = a["dcodeIO"] || {})["ByteBuffer"] = b(a["dcodeIO"]["Long"])
}(this, function(a) {
    "use strict";
    function f(a) {
        var b = 0;
        return function() {
            return b < a.length ? a.charCodeAt(b++) : null
        }
    }
    function g() {
        var a = []
          , b = [];
        return function() {
            return 0 === arguments.length ? b.join("") + e.apply(String, a) : (a.length + arguments.length > 1024 && (b.push(e.apply(String, a)),
            a.length = 0),
            Array.prototype.push.apply(a, arguments),
            void 0)
        }
    }
    function h(a, b, c, d, e) {
        var f, g, h = 8 * e - d - 1, i = (1 << h) - 1, j = i >> 1, k = -7, l = c ? e - 1 : 0, m = c ? -1 : 1, n = a[b + l];
        for (l += m,
        f = n & (1 << -k) - 1,
        n >>= -k,
        k += h; k > 0; f = 256 * f + a[b + l],
        l += m,
        k -= 8)
            ;
        for (g = f & (1 << -k) - 1,
        f >>= -k,
        k += d; k > 0; g = 256 * g + a[b + l],
        l += m,
        k -= 8)
            ;
        if (0 === f)
            f = 1 - j;
        else {
            if (f === i)
                return g ? 0 / 0 : 1 / 0 * (n ? -1 : 1);
            g += Math.pow(2, d),
            f -= j
        }
        return (n ? -1 : 1) * g * Math.pow(2, f - d)
    }
    function i(a, b, c, d, e, f) {
        var g, h, i, j = 8 * f - e - 1, k = (1 << j) - 1, l = k >> 1, m = 23 === e ? Math.pow(2, -24) - Math.pow(2, -77) : 0, n = d ? 0 : f - 1, o = d ? 1 : -1, p = 0 > b || 0 === b && 0 > 1 / b ? 1 : 0;
        for (b = Math.abs(b),
        isNaN(b) || 1 / 0 === b ? (h = isNaN(b) ? 1 : 0,
        g = k) : (g = Math.floor(Math.log(b) / Math.LN2),
        b * (i = Math.pow(2, -g)) < 1 && (g--,
        i *= 2),
        b += g + l >= 1 ? m / i : m * Math.pow(2, 1 - l),
        b * i >= 2 && (g++,
        i /= 2),
        g + l >= k ? (h = 0,
        g = k) : g + l >= 1 ? (h = (b * i - 1) * Math.pow(2, e),
        g += l) : (h = b * Math.pow(2, l - 1) * Math.pow(2, e),
        g = 0)); e >= 8; a[c + n] = 255 & h,
        n += o,
        h /= 256,
        e -= 8)
            ;
        for (g = g << e | h,
        j += e; j > 0; a[c + n] = 255 & g,
        n += o,
        g /= 256,
        j -= 8)
            ;
        a[c + n - o] |= 128 * p
    }
    var c, d, e, j, k, b = function(a, c, e) {
        if ("undefined" == typeof a && (a = b.DEFAULT_CAPACITY),
        "undefined" == typeof c && (c = b.DEFAULT_ENDIAN),
        "undefined" == typeof e && (e = b.DEFAULT_NOASSERT),
        !e) {
            if (a = 0 | a,
            0 > a)
                throw RangeError("Illegal capacity");
            c = !!c,
            e = !!e
        }
        this.buffer = 0 === a ? d : new ArrayBuffer(a),
        this.view = 0 === a ? null : new Uint8Array(this.buffer),
        this.offset = 0,
        this.markedOffset = -1,
        this.limit = a,
        this.littleEndian = c,
        this.noAssert = e
    };
    return b.VERSION = "5.0.1",
    b.LITTLE_ENDIAN = !0,
    b.BIG_ENDIAN = !1,
    b.DEFAULT_CAPACITY = 16,
    b.DEFAULT_ENDIAN = b.BIG_ENDIAN,
    b.DEFAULT_NOASSERT = !1,
    b.Long = a || null,
    c = b.prototype,
    c.__isByteBuffer__,
    Object.defineProperty(c, "__isByteBuffer__", {
        value: !0,
        enumerable: !1,
        configurable: !1
    }),
    d = new ArrayBuffer(0),
    e = String.fromCharCode,
    b.accessor = function() {
        return Uint8Array
    }
    ,
    b.allocate = function(a, c, d) {
        return new b(a,c,d)
    }
    ,
    b.concat = function(a, c, d, e) {
        var f, i, g, h, k, j;
        for (("boolean" == typeof c || "string" != typeof c) && (e = d,
        d = c,
        c = void 0),
        f = 0,
        g = 0,
        h = a.length; h > g; ++g)
            b.isByteBuffer(a[g]) || (a[g] = b.wrap(a[g], c)),
            i = a[g].limit - a[g].offset,
            i > 0 && (f += i);
        if (0 === f)
            return new b(0,d,e);
        for (j = new b(f,d,e),
        g = 0; h > g; )
            k = a[g++],
            i = k.limit - k.offset,
            0 >= i || (j.view.set(k.view.subarray(k.offset, k.limit), j.offset),
            j.offset += i);
        return j.limit = j.offset,
        j.offset = 0,
        j
    }
    ,
    b.isByteBuffer = function(a) {
        return (a && a["__isByteBuffer__"]) === !0
    }
    ,
    b.type = function() {
        return ArrayBuffer
    }
    ,
    b.wrap = function(a, d, e, f) {
        var g, h;
        if ("string" != typeof d && (f = e,
        e = d,
        d = void 0),
        "string" == typeof a)
            switch ("undefined" == typeof d && (d = "utf8"),
            d) {
            case "base64":
                return b.fromBase64(a, e);
            case "hex":
                return b.fromHex(a, e);
            case "binary":
                return b.fromBinary(a, e);
            case "utf8":
                return b.fromUTF8(a, e);
            case "debug":
                return b.fromDebug(a, e);
            default:
                throw Error("Unsupported encoding: " + d)
            }
        if (null === a || "object" != typeof a)
            throw TypeError("Illegal buffer");
        if (b.isByteBuffer(a))
            return g = c.clone.call(a),
            g.markedOffset = -1,
            g;
        if (a instanceof Uint8Array)
            g = new b(0,e,f),
            a.length > 0 && (g.buffer = a.buffer,
            g.offset = a.byteOffset,
            g.limit = a.byteOffset + a.byteLength,
            g.view = new Uint8Array(a.buffer));
        else if (a instanceof ArrayBuffer)
            g = new b(0,e,f),
            a.byteLength > 0 && (g.buffer = a,
            g.offset = 0,
            g.limit = a.byteLength,
            g.view = a.byteLength > 0 ? new Uint8Array(a) : null);
        else {
            if ("[object Array]" !== Object.prototype.toString.call(a))
                throw TypeError("Illegal buffer");
            for (g = new b(a.length,e,f),
            g.limit = a.length,
            h = 0; h < a.length; ++h)
                g.view[h] = a[h]
        }
        return g
    }
    ,
    c.writeBitSet = function(a, b) {
        var h, d, e, f, g, i, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if (!(a instanceof Array))
                throw TypeError("Illegal BitSet: Not an array");
            if ("number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        for (d = b,
        e = a.length,
        f = e >> 3,
        g = 0,
        b += this.writeVarint32(e, b); f--; )
            h = 1 & !!a[g++] | (1 & !!a[g++]) << 1 | (1 & !!a[g++]) << 2 | (1 & !!a[g++]) << 3 | (1 & !!a[g++]) << 4 | (1 & !!a[g++]) << 5 | (1 & !!a[g++]) << 6 | (1 & !!a[g++]) << 7,
            this.writeByte(h, b++);
        if (e > g) {
            for (i = 0,
            h = 0; e > g; )
                h |= (1 & !!a[g++]) << i++;
            this.writeByte(h, b++)
        }
        return c ? (this.offset = b,
        this) : b - d
    }
    ,
    c.readBitSet = function(a) {
        var h, c, d, e, f, g, i, b = "undefined" == typeof a;
        for (b && (a = this.offset),
        c = this.readVarint32(a),
        d = c.value,
        e = d >> 3,
        f = 0,
        g = [],
        a += c.length; e--; )
            h = this.readByte(a++),
            g[f++] = !!(1 & h),
            g[f++] = !!(2 & h),
            g[f++] = !!(4 & h),
            g[f++] = !!(8 & h),
            g[f++] = !!(16 & h),
            g[f++] = !!(32 & h),
            g[f++] = !!(64 & h),
            g[f++] = !!(128 & h);
        if (d > f)
            for (i = 0,
            h = this.readByte(a++); d > f; )
                g[f++] = !!(1 & h >> i++);
        return b && (this.offset = a),
        g
    }
    ,
    c.readBytes = function(a, b) {
        var d, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + a > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + a + ") <= " + this.buffer.byteLength)
        }
        return d = this.slice(b, b + a),
        c && (this.offset += a),
        d
    }
    ,
    c.writeBytes = c.append,
    c.writeInt8 = function(a, b) {
        var d, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            if (a |= 0,
            "number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return b += 1,
        d = this.buffer.byteLength,
        b > d && this.resize((d *= 2) > b ? d : b),
        b -= 1,
        this.view[b] = a,
        c && (this.offset += 1),
        this
    }
    ,
    c.writeByte = c.writeInt8,
    c.readInt8 = function(a) {
        var c, b = "undefined" == typeof a;
        if (b && (a = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 1 + ") <= " + this.buffer.byteLength)
        }
        return c = this.view[a],
        128 === (128 & c) && (c = -(255 - c + 1)),
        b && (this.offset += 1),
        c
    }
    ,
    c.readByte = c.readInt8,
    c.writeUint8 = function(a, b) {
        var d, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            if (a >>>= 0,
            "number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return b += 1,
        d = this.buffer.byteLength,
        b > d && this.resize((d *= 2) > b ? d : b),
        b -= 1,
        this.view[b] = a,
        c && (this.offset += 1),
        this
    }
    ,
    c.writeUInt8 = c.writeUint8,
    c.readUint8 = function(a) {
        var c, b = "undefined" == typeof a;
        if (b && (a = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 1 + ") <= " + this.buffer.byteLength)
        }
        return c = this.view[a],
        b && (this.offset += 1),
        c
    }
    ,
    c.readUInt8 = c.readUint8,
    c.writeInt16 = function(a, b) {
        var d, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            if (a |= 0,
            "number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return b += 2,
        d = this.buffer.byteLength,
        b > d && this.resize((d *= 2) > b ? d : b),
        b -= 2,
        this.littleEndian ? (this.view[b + 1] = (65280 & a) >>> 8,
        this.view[b] = 255 & a) : (this.view[b] = (65280 & a) >>> 8,
        this.view[b + 1] = 255 & a),
        c && (this.offset += 2),
        this
    }
    ,
    c.writeShort = c.writeInt16,
    c.readInt16 = function(a) {
        var c, b = "undefined" == typeof a;
        if (b && (a = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 2 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 2 + ") <= " + this.buffer.byteLength)
        }
        return c = 0,
        this.littleEndian ? (c = this.view[a],
        c |= this.view[a + 1] << 8) : (c = this.view[a] << 8,
        c |= this.view[a + 1]),
        32768 === (32768 & c) && (c = -(65535 - c + 1)),
        b && (this.offset += 2),
        c
    }
    ,
    c.readShort = c.readInt16,
    c.writeUint16 = function(a, b) {
        var d, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            if (a >>>= 0,
            "number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return b += 2,
        d = this.buffer.byteLength,
        b > d && this.resize((d *= 2) > b ? d : b),
        b -= 2,
        this.littleEndian ? (this.view[b + 1] = (65280 & a) >>> 8,
        this.view[b] = 255 & a) : (this.view[b] = (65280 & a) >>> 8,
        this.view[b + 1] = 255 & a),
        c && (this.offset += 2),
        this
    }
    ,
    c.writeUInt16 = c.writeUint16,
    c.readUint16 = function(a) {
        var c, b = "undefined" == typeof a;
        if (b && (a = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 2 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 2 + ") <= " + this.buffer.byteLength)
        }
        return c = 0,
        this.littleEndian ? (c = this.view[a],
        c |= this.view[a + 1] << 8) : (c = this.view[a] << 8,
        c |= this.view[a + 1]),
        b && (this.offset += 2),
        c
    }
    ,
    c.readUInt16 = c.readUint16,
    c.writeInt32 = function(a, b) {
        var d, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            if (a |= 0,
            "number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return b += 4,
        d = this.buffer.byteLength,
        b > d && this.resize((d *= 2) > b ? d : b),
        b -= 4,
        this.littleEndian ? (this.view[b + 3] = 255 & a >>> 24,
        this.view[b + 2] = 255 & a >>> 16,
        this.view[b + 1] = 255 & a >>> 8,
        this.view[b] = 255 & a) : (this.view[b] = 255 & a >>> 24,
        this.view[b + 1] = 255 & a >>> 16,
        this.view[b + 2] = 255 & a >>> 8,
        this.view[b + 3] = 255 & a),
        c && (this.offset += 4),
        this
    }
    ,
    c.writeInt = c.writeInt32,
    c.readInt32 = function(a) {
        var c, b = "undefined" == typeof a;
        if (b && (a = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 4 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 4 + ") <= " + this.buffer.byteLength)
        }
        return c = 0,
        this.littleEndian ? (c = this.view[a + 2] << 16,
        c |= this.view[a + 1] << 8,
        c |= this.view[a],
        c += this.view[a + 3] << 24 >>> 0) : (c = this.view[a + 1] << 16,
        c |= this.view[a + 2] << 8,
        c |= this.view[a + 3],
        c += this.view[a] << 24 >>> 0),
        c |= 0,
        b && (this.offset += 4),
        c
    }
    ,
    c.readInt = c.readInt32,
    c.writeUint32 = function(a, b) {
        var d, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            if (a >>>= 0,
            "number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return b += 4,
        d = this.buffer.byteLength,
        b > d && this.resize((d *= 2) > b ? d : b),
        b -= 4,
        this.littleEndian ? (this.view[b + 3] = 255 & a >>> 24,
        this.view[b + 2] = 255 & a >>> 16,
        this.view[b + 1] = 255 & a >>> 8,
        this.view[b] = 255 & a) : (this.view[b] = 255 & a >>> 24,
        this.view[b + 1] = 255 & a >>> 16,
        this.view[b + 2] = 255 & a >>> 8,
        this.view[b + 3] = 255 & a),
        c && (this.offset += 4),
        this
    }
    ,
    c.writeUInt32 = c.writeUint32,
    c.readUint32 = function(a) {
        var c, b = "undefined" == typeof a;
        if (b && (a = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 4 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 4 + ") <= " + this.buffer.byteLength)
        }
        return c = 0,
        this.littleEndian ? (c = this.view[a + 2] << 16,
        c |= this.view[a + 1] << 8,
        c |= this.view[a],
        c += this.view[a + 3] << 24 >>> 0) : (c = this.view[a + 1] << 16,
        c |= this.view[a + 2] << 8,
        c |= this.view[a + 3],
        c += this.view[a] << 24 >>> 0),
        b && (this.offset += 4),
        c
    }
    ,
    c.readUInt32 = c.readUint32,
    a && (c.writeInt64 = function(b, c) {
        var e, f, g, d = "undefined" == typeof c;
        if (d && (c = this.offset),
        !this.noAssert) {
            if ("number" == typeof b)
                b = a.fromNumber(b);
            else if ("string" == typeof b)
                b = a.fromString(b);
            else if (!(b && b instanceof a))
                throw TypeError("Illegal value: " + b + " (not an integer or Long)");
            if ("number" != typeof c || 0 !== c % 1)
                throw TypeError("Illegal offset: " + c + " (not an integer)");
            if (c >>>= 0,
            0 > c || c + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + c + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return "number" == typeof b ? b = a.fromNumber(b) : "string" == typeof b && (b = a.fromString(b)),
        c += 8,
        e = this.buffer.byteLength,
        c > e && this.resize((e *= 2) > c ? e : c),
        c -= 8,
        f = b.low,
        g = b.high,
        this.littleEndian ? (this.view[c + 3] = 255 & f >>> 24,
        this.view[c + 2] = 255 & f >>> 16,
        this.view[c + 1] = 255 & f >>> 8,
        this.view[c] = 255 & f,
        c += 4,
        this.view[c + 3] = 255 & g >>> 24,
        this.view[c + 2] = 255 & g >>> 16,
        this.view[c + 1] = 255 & g >>> 8,
        this.view[c] = 255 & g) : (this.view[c] = 255 & g >>> 24,
        this.view[c + 1] = 255 & g >>> 16,
        this.view[c + 2] = 255 & g >>> 8,
        this.view[c + 3] = 255 & g,
        c += 4,
        this.view[c] = 255 & f >>> 24,
        this.view[c + 1] = 255 & f >>> 16,
        this.view[c + 2] = 255 & f >>> 8,
        this.view[c + 3] = 255 & f),
        d && (this.offset += 8),
        this
    }
    ,
    c.writeLong = c.writeInt64,
    c.readInt64 = function(b) {
        var d, e, f, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 8 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 8 + ") <= " + this.buffer.byteLength)
        }
        return d = 0,
        e = 0,
        this.littleEndian ? (d = this.view[b + 2] << 16,
        d |= this.view[b + 1] << 8,
        d |= this.view[b],
        d += this.view[b + 3] << 24 >>> 0,
        b += 4,
        e = this.view[b + 2] << 16,
        e |= this.view[b + 1] << 8,
        e |= this.view[b],
        e += this.view[b + 3] << 24 >>> 0) : (e = this.view[b + 1] << 16,
        e |= this.view[b + 2] << 8,
        e |= this.view[b + 3],
        e += this.view[b] << 24 >>> 0,
        b += 4,
        d = this.view[b + 1] << 16,
        d |= this.view[b + 2] << 8,
        d |= this.view[b + 3],
        d += this.view[b] << 24 >>> 0),
        f = new a(d,e,!1),
        c && (this.offset += 8),
        f
    }
    ,
    c.readLong = c.readInt64,
    c.writeUint64 = function(b, c) {
        var e, f, g, d = "undefined" == typeof c;
        if (d && (c = this.offset),
        !this.noAssert) {
            if ("number" == typeof b)
                b = a.fromNumber(b);
            else if ("string" == typeof b)
                b = a.fromString(b);
            else if (!(b && b instanceof a))
                throw TypeError("Illegal value: " + b + " (not an integer or Long)");
            if ("number" != typeof c || 0 !== c % 1)
                throw TypeError("Illegal offset: " + c + " (not an integer)");
            if (c >>>= 0,
            0 > c || c + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + c + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return "number" == typeof b ? b = a.fromNumber(b) : "string" == typeof b && (b = a.fromString(b)),
        c += 8,
        e = this.buffer.byteLength,
        c > e && this.resize((e *= 2) > c ? e : c),
        c -= 8,
        f = b.low,
        g = b.high,
        this.littleEndian ? (this.view[c + 3] = 255 & f >>> 24,
        this.view[c + 2] = 255 & f >>> 16,
        this.view[c + 1] = 255 & f >>> 8,
        this.view[c] = 255 & f,
        c += 4,
        this.view[c + 3] = 255 & g >>> 24,
        this.view[c + 2] = 255 & g >>> 16,
        this.view[c + 1] = 255 & g >>> 8,
        this.view[c] = 255 & g) : (this.view[c] = 255 & g >>> 24,
        this.view[c + 1] = 255 & g >>> 16,
        this.view[c + 2] = 255 & g >>> 8,
        this.view[c + 3] = 255 & g,
        c += 4,
        this.view[c] = 255 & f >>> 24,
        this.view[c + 1] = 255 & f >>> 16,
        this.view[c + 2] = 255 & f >>> 8,
        this.view[c + 3] = 255 & f),
        d && (this.offset += 8),
        this
    }
    ,
    c.writeUInt64 = c.writeUint64,
    c.readUint64 = function(b) {
        var d, e, f, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 8 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 8 + ") <= " + this.buffer.byteLength)
        }
        return d = 0,
        e = 0,
        this.littleEndian ? (d = this.view[b + 2] << 16,
        d |= this.view[b + 1] << 8,
        d |= this.view[b],
        d += this.view[b + 3] << 24 >>> 0,
        b += 4,
        e = this.view[b + 2] << 16,
        e |= this.view[b + 1] << 8,
        e |= this.view[b],
        e += this.view[b + 3] << 24 >>> 0) : (e = this.view[b + 1] << 16,
        e |= this.view[b + 2] << 8,
        e |= this.view[b + 3],
        e += this.view[b] << 24 >>> 0,
        b += 4,
        d = this.view[b + 1] << 16,
        d |= this.view[b + 2] << 8,
        d |= this.view[b + 3],
        d += this.view[b] << 24 >>> 0),
        f = new a(d,e,!0),
        c && (this.offset += 8),
        f
    }
    ,
    c.readUInt64 = c.readUint64),
    c.writeFloat32 = function(a, b) {
        var d, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof a)
                throw TypeError("Illegal value: " + a + " (not a number)");
            if ("number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return b += 4,
        d = this.buffer.byteLength,
        b > d && this.resize((d *= 2) > b ? d : b),
        b -= 4,
        i(this.view, a, b, this.littleEndian, 23, 4),
        c && (this.offset += 4),
        this
    }
    ,
    c.writeFloat = c.writeFloat32,
    c.readFloat32 = function(a) {
        var c, b = "undefined" == typeof a;
        if (b && (a = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 4 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 4 + ") <= " + this.buffer.byteLength)
        }
        return c = h(this.view, a, this.littleEndian, 23, 4),
        b && (this.offset += 4),
        c
    }
    ,
    c.readFloat = c.readFloat32,
    c.writeFloat64 = function(a, b) {
        var d, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof a)
                throw TypeError("Illegal value: " + a + " (not a number)");
            if ("number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return b += 8,
        d = this.buffer.byteLength,
        b > d && this.resize((d *= 2) > b ? d : b),
        b -= 8,
        i(this.view, a, b, this.littleEndian, 52, 8),
        c && (this.offset += 8),
        this
    }
    ,
    c.writeDouble = c.writeFloat64,
    c.readFloat64 = function(a) {
        var c, b = "undefined" == typeof a;
        if (b && (a = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 8 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 8 + ") <= " + this.buffer.byteLength)
        }
        return c = h(this.view, a, this.littleEndian, 52, 8),
        b && (this.offset += 8),
        c
    }
    ,
    c.readDouble = c.readFloat64,
    b.MAX_VARINT32_BYTES = 5,
    b.calculateVarint32 = function(a) {
        return a >>>= 0,
        128 > a ? 1 : 16384 > a ? 2 : 1 << 21 > a ? 3 : 1 << 28 > a ? 4 : 5
    }
    ,
    b.zigZagEncode32 = function(a) {
        return ((a |= 0) << 1 ^ a >> 31) >>> 0
    }
    ,
    b.zigZagDecode32 = function(a) {
        return 0 | a >>> 1 ^ -(1 & a)
    }
    ,
    c.writeVarint32 = function(a, c) {
        var f, e, g, d = "undefined" == typeof c;
        if (d && (c = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            if (a |= 0,
            "number" != typeof c || 0 !== c % 1)
                throw TypeError("Illegal offset: " + c + " (not an integer)");
            if (c >>>= 0,
            0 > c || c + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + c + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        for (e = b.calculateVarint32(a),
        c += e,
        g = this.buffer.byteLength,
        c > g && this.resize((g *= 2) > c ? g : c),
        c -= e,
        a >>>= 0; a >= 128; )
            f = 128 | 127 & a,
            this.view[c++] = f,
            a >>>= 7;
        return this.view[c++] = a,
        d ? (this.offset = c,
        this) : e
    }
    ,
    c.writeVarint32ZigZag = function(a, c) {
        return this.writeVarint32(b.zigZagEncode32(a), c)
    }
    ,
    c.readVarint32 = function(a) {
        var e, c, d, f, b = "undefined" == typeof a;
        if (b && (a = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 1 + ") <= " + this.buffer.byteLength)
        }
        c = 0,
        d = 0;
        do {
            if (!this.noAssert && a > this.limit)
                throw f = Error("Truncated"),
                f["truncated"] = !0,
                f;
            e = this.view[a++],
            5 > c && (d |= (127 & e) << 7 * c),
            ++c
        } while (0 !== (128 & e));return d |= 0,
        b ? (this.offset = a,
        d) : {
            value: d,
            length: c
        }
    }
    ,
    c.readVarint32ZigZag = function(a) {
        var c = this.readVarint32(a);
        return "object" == typeof c ? c["value"] = b.zigZagDecode32(c["value"]) : c = b.zigZagDecode32(c),
        c
    }
    ,
    a && (b.MAX_VARINT64_BYTES = 10,
    b.calculateVarint64 = function(b) {
        "number" == typeof b ? b = a.fromNumber(b) : "string" == typeof b && (b = a.fromString(b));
        var c = b.toInt() >>> 0
          , d = b.shiftRightUnsigned(28).toInt() >>> 0
          , e = b.shiftRightUnsigned(56).toInt() >>> 0;
        return 0 == e ? 0 == d ? 16384 > c ? 128 > c ? 1 : 2 : 1 << 21 > c ? 3 : 4 : 16384 > d ? 128 > d ? 5 : 6 : 1 << 21 > d ? 7 : 8 : 128 > e ? 9 : 10
    }
    ,
    b.zigZagEncode64 = function(b) {
        return "number" == typeof b ? b = a.fromNumber(b, !1) : "string" == typeof b ? b = a.fromString(b, !1) : b.unsigned !== !1 && (b = b.toSigned()),
        b.shiftLeft(1).xor(b.shiftRight(63)).toUnsigned()
    }
    ,
    b.zigZagDecode64 = function(b) {
        return "number" == typeof b ? b = a.fromNumber(b, !1) : "string" == typeof b ? b = a.fromString(b, !1) : b.unsigned !== !1 && (b = b.toSigned()),
        b.shiftRightUnsigned(1).xor(b.and(a.ONE).toSigned().negate()).toSigned()
    }
    ,
    c.writeVarint64 = function(c, d) {
        var f, g, h, i, j, e = "undefined" == typeof d;
        if (e && (d = this.offset),
        !this.noAssert) {
            if ("number" == typeof c)
                c = a.fromNumber(c);
            else if ("string" == typeof c)
                c = a.fromString(c);
            else if (!(c && c instanceof a))
                throw TypeError("Illegal value: " + c + " (not an integer or Long)");
            if ("number" != typeof d || 0 !== d % 1)
                throw TypeError("Illegal offset: " + d + " (not an integer)");
            if (d >>>= 0,
            0 > d || d + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + d + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        switch ("number" == typeof c ? c = a.fromNumber(c, !1) : "string" == typeof c ? c = a.fromString(c, !1) : c.unsigned !== !1 && (c = c.toSigned()),
        f = b.calculateVarint64(c),
        g = c.toInt() >>> 0,
        h = c.shiftRightUnsigned(28).toInt() >>> 0,
        i = c.shiftRightUnsigned(56).toInt() >>> 0,
        d += f,
        j = this.buffer.byteLength,
        d > j && this.resize((j *= 2) > d ? j : d),
        d -= f,
        f) {
        case 10:
            this.view[d + 9] = 1 & i >>> 7;
        case 9:
            this.view[d + 8] = 9 !== f ? 128 | i : 127 & i;
        case 8:
            this.view[d + 7] = 8 !== f ? 128 | h >>> 21 : 127 & h >>> 21;
        case 7:
            this.view[d + 6] = 7 !== f ? 128 | h >>> 14 : 127 & h >>> 14;
        case 6:
            this.view[d + 5] = 6 !== f ? 128 | h >>> 7 : 127 & h >>> 7;
        case 5:
            this.view[d + 4] = 5 !== f ? 128 | h : 127 & h;
        case 4:
            this.view[d + 3] = 4 !== f ? 128 | g >>> 21 : 127 & g >>> 21;
        case 3:
            this.view[d + 2] = 3 !== f ? 128 | g >>> 14 : 127 & g >>> 14;
        case 2:
            this.view[d + 1] = 2 !== f ? 128 | g >>> 7 : 127 & g >>> 7;
        case 1:
            this.view[d] = 1 !== f ? 128 | g : 127 & g
        }
        return e ? (this.offset += f,
        this) : f
    }
    ,
    c.writeVarint64ZigZag = function(a, c) {
        return this.writeVarint64(b.zigZagEncode64(a), c)
    }
    ,
    c.readVarint64 = function(b) {
        var d, e, f, g, h, i, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 1 + ") <= " + this.buffer.byteLength)
        }
        if (d = b,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        h = this.view[b++],
        e = 127 & h,
        128 & h && (h = this.view[b++],
        e |= (127 & h) << 7,
        (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++],
        e |= (127 & h) << 14,
        (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++],
        e |= (127 & h) << 21,
        (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++],
        f = 127 & h,
        (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++],
        f |= (127 & h) << 7,
        (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++],
        f |= (127 & h) << 14,
        (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++],
        f |= (127 & h) << 21,
        (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++],
        g = 127 & h,
        (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++],
        g |= (127 & h) << 7,
        128 & h || this.noAssert && "undefined" == typeof h))))))))))
            throw Error("Buffer overrun");
        return i = a.fromBits(e | f << 28, f >>> 4 | g << 24, !1),
        c ? (this.offset = b,
        i) : {
            value: i,
            length: b - d
        }
    }
    ,
    c.readVarint64ZigZag = function(c) {
        var d = this.readVarint64(c);
        return d && d["value"]instanceof a ? d["value"] = b.zigZagDecode64(d["value"]) : d = b.zigZagDecode64(d),
        d
    }
    ),
    c.writeCString = function(a, b) {
        var d, e, g, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        e = a.length,
        !this.noAssert) {
            if ("string" != typeof a)
                throw TypeError("Illegal str: Not a string");
            for (d = 0; e > d; ++d)
                if (0 === a.charCodeAt(d))
                    throw RangeError("Illegal str: Contains NULL-characters");
            if ("number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return e = k.calculateUTF16asUTF8(f(a))[1],
        b += e + 1,
        g = this.buffer.byteLength,
        b > g && this.resize((g *= 2) > b ? g : b),
        b -= e + 1,
        k.encodeUTF16toUTF8(f(a), function(a) {
            this.view[b++] = a
        }
        .bind(this)),
        this.view[b++] = 0,
        c ? (this.offset = b,
        this) : e
    }
    ,
    c.readCString = function(a) {
        var c, e, f, b = "undefined" == typeof a;
        if (b && (a = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 1 + ") <= " + this.buffer.byteLength)
        }
        return c = a,
        f = -1,
        k.decodeUTF8toUTF16(function() {
            if (0 === f)
                return null;
            if (a >= this.limit)
                throw RangeError("Illegal range: Truncated data, " + a + " < " + this.limit);
            return f = this.view[a++],
            0 === f ? null : f
        }
        .bind(this), e = g(), !0),
        b ? (this.offset = a,
        e()) : {
            string: e(),
            length: a - c
        }
    }
    ,
    c.writeIString = function(a, b) {
        var e, d, g, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("string" != typeof a)
                throw TypeError("Illegal str: Not a string");
            if ("number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        if (d = b,
        e = k.calculateUTF16asUTF8(f(a), this.noAssert)[1],
        b += 4 + e,
        g = this.buffer.byteLength,
        b > g && this.resize((g *= 2) > b ? g : b),
        b -= 4 + e,
        this.littleEndian ? (this.view[b + 3] = 255 & e >>> 24,
        this.view[b + 2] = 255 & e >>> 16,
        this.view[b + 1] = 255 & e >>> 8,
        this.view[b] = 255 & e) : (this.view[b] = 255 & e >>> 24,
        this.view[b + 1] = 255 & e >>> 16,
        this.view[b + 2] = 255 & e >>> 8,
        this.view[b + 3] = 255 & e),
        b += 4,
        k.encodeUTF16toUTF8(f(a), function(a) {
            this.view[b++] = a
        }
        .bind(this)),
        b !== d + 4 + e)
            throw RangeError("Illegal range: Truncated data, " + b + " == " + (b + 4 + e));
        return c ? (this.offset = b,
        this) : b - d
    }
    ,
    c.readIString = function(a) {
        var d, e, f, c = "undefined" == typeof a;
        if (c && (a = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 4 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 4 + ") <= " + this.buffer.byteLength)
        }
        return d = a,
        e = this.readUint32(a),
        f = this.readUTF8String(e, b.METRICS_BYTES, a += 4),
        a += f["length"],
        c ? (this.offset = a,
        f["string"]) : {
            string: f["string"],
            length: a - d
        }
    }
    ,
    b.METRICS_CHARS = "c",
    b.METRICS_BYTES = "b",
    c.writeUTF8String = function(a, b) {
        var d, e, g, c = "undefined" == typeof b;
        if (c && (b = this.offset),
        !this.noAssert) {
            if ("number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: " + b + " (not an integer)");
            if (b >>>= 0,
            0 > b || b + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + b + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return e = b,
        d = k.calculateUTF16asUTF8(f(a))[1],
        b += d,
        g = this.buffer.byteLength,
        b > g && this.resize((g *= 2) > b ? g : b),
        b -= d,
        k.encodeUTF16toUTF8(f(a), function(a) {
            this.view[b++] = a
        }
        .bind(this)),
        c ? (this.offset = b,
        this) : b - e
    }
    ,
    c.writeString = c.writeUTF8String,
    b.calculateUTF8Chars = function(a) {
        return k.calculateUTF16asUTF8(f(a))[0]
    }
    ,
    b.calculateUTF8Bytes = function(a) {
        return k.calculateUTF16asUTF8(f(a))[1]
    }
    ,
    b.calculateString = b.calculateUTF8Bytes,
    c.readUTF8String = function(a, c, d) {
        var e, i, f, h, j;
        if ("number" == typeof c && (d = c,
        c = void 0),
        e = "undefined" == typeof d,
        e && (d = this.offset),
        "undefined" == typeof c && (c = b.METRICS_CHARS),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal length: " + a + " (not an integer)");
            if (a |= 0,
            "number" != typeof d || 0 !== d % 1)
                throw TypeError("Illegal offset: " + d + " (not an integer)");
            if (d >>>= 0,
            0 > d || d + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + d + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        if (f = 0,
        h = d,
        c === b.METRICS_CHARS) {
            if (i = g(),
            k.decodeUTF8(function() {
                return a > f && d < this.limit ? this.view[d++] : null
            }
            .bind(this), function(a) {
                ++f,
                k.UTF8toUTF16(a, i)
            }),
            f !== a)
                throw RangeError("Illegal range: Truncated data, " + f + " == " + a);
            return e ? (this.offset = d,
            i()) : {
                string: i(),
                length: d - h
            }
        }
        if (c === b.METRICS_BYTES) {
            if (!this.noAssert) {
                if ("number" != typeof d || 0 !== d % 1)
                    throw TypeError("Illegal offset: " + d + " (not an integer)");
                if (d >>>= 0,
                0 > d || d + a > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= " + d + " (+" + a + ") <= " + this.buffer.byteLength)
            }
            if (j = d + a,
            k.decodeUTF8toUTF16(function() {
                return j > d ? this.view[d++] : null
            }
            .bind(this), i = g(), this.noAssert),
            d !== j)
                throw RangeError("Illegal range: Truncated data, " + d + " == " + j);
            return e ? (this.offset = d,
            i()) : {
                string: i(),
                length: d - h
            }
        }
        throw TypeError("Unsupported metrics: " + c)
    }
    ,
    c.readString = c.readUTF8String,
    c.writeVString = function(a, c) {
        var g, h, e, i, d = "undefined" == typeof c;
        if (d && (c = this.offset),
        !this.noAssert) {
            if ("string" != typeof a)
                throw TypeError("Illegal str: Not a string");
            if ("number" != typeof c || 0 !== c % 1)
                throw TypeError("Illegal offset: " + c + " (not an integer)");
            if (c >>>= 0,
            0 > c || c + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + c + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        if (e = c,
        g = k.calculateUTF16asUTF8(f(a), this.noAssert)[1],
        h = b.calculateVarint32(g),
        c += h + g,
        i = this.buffer.byteLength,
        c > i && this.resize((i *= 2) > c ? i : c),
        c -= h + g,
        c += this.writeVarint32(g, c),
        k.encodeUTF16toUTF8(f(a), function(a) {
            this.view[c++] = a
        }
        .bind(this)),
        c !== e + g + h)
            throw RangeError("Illegal range: Truncated data, " + c + " == " + (c + g + h));
        return d ? (this.offset = c,
        this) : c - e
    }
    ,
    c.readVString = function(a) {
        var d, e, f, c = "undefined" == typeof a;
        if (c && (a = this.offset),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 1 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 1 + ") <= " + this.buffer.byteLength)
        }
        return d = a,
        e = this.readVarint32(a),
        f = this.readUTF8String(e["value"], b.METRICS_BYTES, a += e["length"]),
        a += f["length"],
        c ? (this.offset = a,
        f["string"]) : {
            string: f["string"],
            length: a - d
        }
    }
    ,
    c.append = function(a, c, d) {
        var e, f, g;
        if (("number" == typeof c || "string" != typeof c) && (d = c,
        c = void 0),
        e = "undefined" == typeof d,
        e && (d = this.offset),
        !this.noAssert) {
            if ("number" != typeof d || 0 !== d % 1)
                throw TypeError("Illegal offset: " + d + " (not an integer)");
            if (d >>>= 0,
            0 > d || d + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + d + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return a instanceof b || (a = b.wrap(a, c)),
        f = a.limit - a.offset,
        0 >= f ? this : (d += f,
        g = this.buffer.byteLength,
        d > g && this.resize((g *= 2) > d ? g : d),
        d -= f,
        this.view.set(a.view.subarray(a.offset, a.limit), d),
        a.offset += f,
        e && (this.offset += f),
        this)
    }
    ,
    c.appendTo = function(a, b) {
        return a.append(this, b),
        this
    }
    ,
    c.assert = function(a) {
        return this.noAssert = !a,
        this
    }
    ,
    c.capacity = function() {
        return this.buffer.byteLength
    }
    ,
    c.clear = function() {
        return this.offset = 0,
        this.limit = this.buffer.byteLength,
        this.markedOffset = -1,
        this
    }
    ,
    c.clone = function(a) {
        var c = new b(0,this.littleEndian,this.noAssert);
        return a ? (c.buffer = new ArrayBuffer(this.buffer.byteLength),
        c.view = new Uint8Array(c.buffer)) : (c.buffer = this.buffer,
        c.view = this.view),
        c.offset = this.offset,
        c.markedOffset = this.markedOffset,
        c.limit = this.limit,
        c
    }
    ,
    c.compact = function(a, b) {
        var c, e, f;
        if ("undefined" == typeof a && (a = this.offset),
        "undefined" == typeof b && (b = this.limit),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            if (a >>>= 0,
            "number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal end: Not an integer");
            if (b >>>= 0,
            0 > a || a > b || b > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength)
        }
        return 0 === a && b === this.buffer.byteLength ? this : (c = b - a,
        0 === c ? (this.buffer = d,
        this.view = null,
        this.markedOffset >= 0 && (this.markedOffset -= a),
        this.offset = 0,
        this.limit = 0,
        this) : (e = new ArrayBuffer(c),
        f = new Uint8Array(e),
        f.set(this.view.subarray(a, b)),
        this.buffer = e,
        this.view = f,
        this.markedOffset >= 0 && (this.markedOffset -= a),
        this.offset = 0,
        this.limit = c,
        this))
    }
    ,
    c.copy = function(a, c) {
        if ("undefined" == typeof a && (a = this.offset),
        "undefined" == typeof c && (c = this.limit),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            if (a >>>= 0,
            "number" != typeof c || 0 !== c % 1)
                throw TypeError("Illegal end: Not an integer");
            if (c >>>= 0,
            0 > a || a > c || c > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + c + " <= " + this.buffer.byteLength)
        }
        if (a === c)
            return new b(0,this.littleEndian,this.noAssert);
        var d = c - a
          , e = new b(d,this.littleEndian,this.noAssert);
        return e.offset = 0,
        e.limit = d,
        e.markedOffset >= 0 && (e.markedOffset -= a),
        this.copyTo(e, 0, a, c),
        e
    }
    ,
    c.copyTo = function(a, c, d, e) {
        var f, g, h;
        if (!this.noAssert && !b.isByteBuffer(a))
            throw TypeError("Illegal target: Not a ByteBuffer");
        if (c = (g = "undefined" == typeof c) ? a.offset : 0 | c,
        d = (f = "undefined" == typeof d) ? this.offset : 0 | d,
        e = "undefined" == typeof e ? this.limit : 0 | e,
        0 > c || c > a.buffer.byteLength)
            throw RangeError("Illegal target range: 0 <= " + c + " <= " + a.buffer.byteLength);
        if (0 > d || e > this.buffer.byteLength)
            throw RangeError("Illegal source range: 0 <= " + d + " <= " + this.buffer.byteLength);
        return h = e - d,
        0 === h ? a : (a.ensureCapacity(c + h),
        a.view.set(this.view.subarray(d, e), c),
        f && (this.offset += h),
        g && (a.offset += h),
        this)
    }
    ,
    c.ensureCapacity = function(a) {
        var b = this.buffer.byteLength;
        return a > b ? this.resize((b *= 2) > a ? b : a) : this
    }
    ,
    c.fill = function(a, b, c) {
        var d = "undefined" == typeof b;
        if (d && (b = this.offset),
        "string" == typeof a && a.length > 0 && (a = a.charCodeAt(0)),
        "undefined" == typeof b && (b = this.offset),
        "undefined" == typeof c && (c = this.limit),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal value: " + a + " (not an integer)");
            if (a |= 0,
            "number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal begin: Not an integer");
            if (b >>>= 0,
            "number" != typeof c || 0 !== c % 1)
                throw TypeError("Illegal end: Not an integer");
            if (c >>>= 0,
            0 > b || b > c || c > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + b + " <= " + c + " <= " + this.buffer.byteLength)
        }
        if (b >= c)
            return this;
        for (; c > b; )
            this.view[b++] = a;
        return d && (this.offset = b),
        this
    }
    ,
    c.flip = function() {
        return this.limit = this.offset,
        this.offset = 0,
        this
    }
    ,
    c.mark = function(a) {
        if (a = "undefined" == typeof a ? this.offset : a,
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal offset: " + a + " (not an integer)");
            if (a >>>= 0,
            0 > a || a + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + a + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return this.markedOffset = a,
        this
    }
    ,
    c.order = function(a) {
        if (!this.noAssert && "boolean" != typeof a)
            throw TypeError("Illegal littleEndian: Not a boolean");
        return this.littleEndian = !!a,
        this
    }
    ,
    c.LE = function(a) {
        return this.littleEndian = "undefined" != typeof a ? !!a : !0,
        this
    }
    ,
    c.BE = function(a) {
        return this.littleEndian = "undefined" != typeof a ? !a : !1,
        this
    }
    ,
    c.prepend = function(a, c, d) {
        var e, f, g, h, i;
        if (("number" == typeof c || "string" != typeof c) && (d = c,
        c = void 0),
        e = "undefined" == typeof d,
        e && (d = this.offset),
        !this.noAssert) {
            if ("number" != typeof d || 0 !== d % 1)
                throw TypeError("Illegal offset: " + d + " (not an integer)");
            if (d >>>= 0,
            0 > d || d + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= " + d + " (+" + 0 + ") <= " + this.buffer.byteLength)
        }
        return a instanceof b || (a = b.wrap(a, c)),
        f = a.limit - a.offset,
        0 >= f ? this : (g = f - d,
        g > 0 ? (h = new ArrayBuffer(this.buffer.byteLength + g),
        i = new Uint8Array(h),
        i.set(this.view.subarray(d, this.buffer.byteLength), f),
        this.buffer = h,
        this.view = i,
        this.offset += g,
        this.markedOffset >= 0 && (this.markedOffset += g),
        this.limit += g,
        d += g) : new Uint8Array(this.buffer),
        this.view.set(a.view.subarray(a.offset, a.limit), d - f),
        a.offset = a.limit,
        e && (this.offset -= f),
        this)
    }
    ,
    c.prependTo = function(a, b) {
        return a.prepend(this, b),
        this
    }
    ,
    c.printDebug = function(a) {
        "function" != typeof a && (a = console.log.bind(console)),
        a(this.toString() + "\n" + "-------------------------------------------------------------------\n" + this.toDebug(!0))
    }
    ,
    c.remaining = function() {
        return this.limit - this.offset
    }
    ,
    c.reset = function() {
        return this.markedOffset >= 0 ? (this.offset = this.markedOffset,
        this.markedOffset = -1) : this.offset = 0,
        this
    }
    ,
    c.resize = function(a) {
        var b, c;
        if (!this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal capacity: " + a + " (not an integer)");
            if (a |= 0,
            0 > a)
                throw RangeError("Illegal capacity: 0 <= " + a)
        }
        return this.buffer.byteLength < a && (b = new ArrayBuffer(a),
        c = new Uint8Array(b),
        c.set(this.view),
        this.buffer = b,
        this.view = c),
        this
    }
    ,
    c.reverse = function(a, b) {
        if ("undefined" == typeof a && (a = this.offset),
        "undefined" == typeof b && (b = this.limit),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            if (a >>>= 0,
            "number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal end: Not an integer");
            if (b >>>= 0,
            0 > a || a > b || b > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength)
        }
        return a === b ? this : (Array.prototype.reverse.call(this.view.subarray(a, b)),
        this)
    }
    ,
    c.skip = function(a) {
        if (!this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal length: " + a + " (not an integer)");
            a |= 0
        }
        var b = this.offset + a;
        if (!this.noAssert && (0 > b || b > this.buffer.byteLength))
            throw RangeError("Illegal length: 0 <= " + this.offset + " + " + a + " <= " + this.buffer.byteLength);
        return this.offset = b,
        this
    }
    ,
    c.slice = function(a, b) {
        if ("undefined" == typeof a && (a = this.offset),
        "undefined" == typeof b && (b = this.limit),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            if (a >>>= 0,
            "number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal end: Not an integer");
            if (b >>>= 0,
            0 > a || a > b || b > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength)
        }
        var c = this.clone();
        return c.offset = a,
        c.limit = b,
        c
    }
    ,
    c.toBuffer = function(a) {
        var e, b = this.offset, c = this.limit;
        if (!this.noAssert) {
            if ("number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal offset: Not an integer");
            if (b >>>= 0,
            "number" != typeof c || 0 !== c % 1)
                throw TypeError("Illegal limit: Not an integer");
            if (c >>>= 0,
            0 > b || b > c || c > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + b + " <= " + c + " <= " + this.buffer.byteLength)
        }
        return a || 0 !== b || c !== this.buffer.byteLength ? b === c ? d : (e = new ArrayBuffer(c - b),
        new Uint8Array(e).set(new Uint8Array(this.buffer).subarray(b, c), 0),
        e) : this.buffer
    }
    ,
    c.toArrayBuffer = c.toBuffer,
    c.toString = function(a, b, c) {
        if ("undefined" == typeof a)
            return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
        switch ("number" == typeof a && (a = "utf8",
        b = a,
        c = b),
        a) {
        case "utf8":
            return this.toUTF8(b, c);
        case "base64":
            return this.toBase64(b, c);
        case "hex":
            return this.toHex(b, c);
        case "binary":
            return this.toBinary(b, c);
        case "debug":
            return this.toDebug();
        case "columns":
            return this.toColumns();
        default:
            throw Error("Unsupported encoding: " + a)
        }
    }
    ,
    j = function() {
        var d, e, a = {}, b = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47], c = [];
        for (d = 0,
        e = b.length; e > d; ++d)
            c[b[d]] = d;
        return a.encode = function(a, c) {
            for (var d, e; null !== (d = a()); )
                c(b[63 & d >> 2]),
                e = (3 & d) << 4,
                null !== (d = a()) ? (e |= 15 & d >> 4,
                c(b[63 & (e | 15 & d >> 4)]),
                e = (15 & d) << 2,
                null !== (d = a()) ? (c(b[63 & (e | 3 & d >> 6)]),
                c(b[63 & d])) : (c(b[63 & e]),
                c(61))) : (c(b[63 & e]),
                c(61),
                c(61))
        }
        ,
        a.decode = function(a, b) {
            function g(a) {
                throw Error("Illegal character code: " + a)
            }
            for (var d, e, f; null !== (d = a()); )
                if (e = c[d],
                "undefined" == typeof e && g(d),
                null !== (d = a()) && (f = c[d],
                "undefined" == typeof f && g(d),
                b(e << 2 >>> 0 | (48 & f) >> 4),
                null !== (d = a()))) {
                    if (e = c[d],
                    "undefined" == typeof e) {
                        if (61 === d)
                            break;
                        g(d)
                    }
                    if (b((15 & f) << 4 >>> 0 | (60 & e) >> 2),
                    null !== (d = a())) {
                        if (f = c[d],
                        "undefined" == typeof f) {
                            if (61 === d)
                                break;
                            g(d)
                        }
                        b((3 & e) << 6 >>> 0 | f)
                    }
                }
        }
        ,
        a.test = function(a) {
            return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(a)
        }
        ,
        a
    }(),
    c.toBase64 = function(a, b) {
        if ("undefined" == typeof a && (a = this.offset),
        "undefined" == typeof b && (b = this.limit),
        a = 0 | a,
        b = 0 | b,
        0 > a || b > this.capacity || a > b)
            throw RangeError("begin, end");
        var c;
        return j.encode(function() {
            return b > a ? this.view[a++] : null
        }
        .bind(this), c = g()),
        c()
    }
    ,
    b.fromBase64 = function(a, c) {
        if ("string" != typeof a)
            throw TypeError("str");
        var d = new b(3 * (a.length / 4),c)
          , e = 0;
        return j.decode(f(a), function(a) {
            d.view[e++] = a
        }),
        d.limit = e,
        d
    }
    ,
    b.btoa = function(a) {
        return b.fromBinary(a).toBase64()
    }
    ,
    b.atob = function(a) {
        return b.fromBase64(a).toBinary()
    }
    ,
    c.toBinary = function(a, b) {
        if ("undefined" == typeof a && (a = this.offset),
        "undefined" == typeof b && (b = this.limit),
        a |= 0,
        b |= 0,
        0 > a || b > this.capacity() || a > b)
            throw RangeError("begin, end");
        if (a === b)
            return "";
        for (var c = [], d = []; b > a; )
            c.push(this.view[a++]),
            c.length >= 1024 && (d.push(String.fromCharCode.apply(String, c)),
            c = []);
        return d.join("") + String.fromCharCode.apply(String, c)
    }
    ,
    b.fromBinary = function(a, c) {
        if ("string" != typeof a)
            throw TypeError("str");
        for (var f, d = 0, e = a.length, g = new b(e,c); e > d; ) {
            if (f = a.charCodeAt(d),
            f > 255)
                throw RangeError("illegal char code: " + f);
            g.view[d++] = f
        }
        return g.limit = e,
        g
    }
    ,
    c.toDebug = function(a) {
        for (var d, b = -1, c = this.buffer.byteLength, e = "", f = "", g = ""; c > b; ) {
            if (-1 !== b && (d = this.view[b],
            e += 16 > d ? "0" + d.toString(16).toUpperCase() : d.toString(16).toUpperCase(),
            a && (f += d > 32 && 127 > d ? String.fromCharCode(d) : ".")),
            ++b,
            a && b > 0 && 0 === b % 16 && b !== c) {
                for (; e.length < 51; )
                    e += " ";
                g += e + f + "\n",
                e = f = ""
            }
            e += b === this.offset && b === this.limit ? b === this.markedOffset ? "!" : "|" : b === this.offset ? b === this.markedOffset ? "[" : "<" : b === this.limit ? b === this.markedOffset ? "]" : ">" : b === this.markedOffset ? "'" : a || 0 !== b && b !== c ? " " : ""
        }
        if (a && " " !== e) {
            for (; e.length < 51; )
                e += " ";
            g += e + f + "\n"
        }
        return a ? g : e
    }
    ,
    b.fromDebug = function(a, c, d) {
        for (var i, j, e = a.length, f = new b(0 | (e + 1) / 3,c,d), g = 0, h = 0, k = !1, l = !1, m = !1, n = !1, o = !1; e > g; ) {
            switch (i = a.charAt(g++)) {
            case "!":
                if (!d) {
                    if (l || m || n) {
                        o = !0;
                        break
                    }
                    l = m = n = !0
                }
                f.offset = f.markedOffset = f.limit = h,
                k = !1;
                break;
            case "|":
                if (!d) {
                    if (l || n) {
                        o = !0;
                        break
                    }
                    l = n = !0
                }
                f.offset = f.limit = h,
                k = !1;
                break;
            case "[":
                if (!d) {
                    if (l || m) {
                        o = !0;
                        break
                    }
                    l = m = !0
                }
                f.offset = f.markedOffset = h,
                k = !1;
                break;
            case "<":
                if (!d) {
                    if (l) {
                        o = !0;
                        break
                    }
                    l = !0
                }
                f.offset = h,
                k = !1;
                break;
            case "]":
                if (!d) {
                    if (n || m) {
                        o = !0;
                        break
                    }
                    n = m = !0
                }
                f.limit = f.markedOffset = h,
                k = !1;
                break;
            case ">":
                if (!d) {
                    if (n) {
                        o = !0;
                        break
                    }
                    n = !0
                }
                f.limit = h,
                k = !1;
                break;
            case "'":
                if (!d) {
                    if (m) {
                        o = !0;
                        break
                    }
                    m = !0
                }
                f.markedOffset = h,
                k = !1;
                break;
            case " ":
                k = !1;
                break;
            default:
                if (!d && k) {
                    o = !0;
                    break
                }
                if (j = parseInt(i + a.charAt(g++), 16),
                !d && (isNaN(j) || 0 > j || j > 255))
                    throw TypeError("Illegal str: Not a debug encoded string");
                f.view[h++] = j,
                k = !0
            }
            if (o)
                throw TypeError("Illegal str: Invalid symbol at " + g)
        }
        if (!d) {
            if (!l || !n)
                throw TypeError("Illegal str: Missing offset or limit");
            if (h < f.buffer.byteLength)
                throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + h + " < " + e)
        }
        return f
    }
    ,
    c.toHex = function(a, b) {
        if (a = "undefined" == typeof a ? this.offset : a,
        b = "undefined" == typeof b ? this.limit : b,
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            if (a >>>= 0,
            "number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal end: Not an integer");
            if (b >>>= 0,
            0 > a || a > b || b > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength)
        }
        for (var d, c = new Array(b - a); b > a; )
            d = this.view[a++],
            16 > d ? c.push("0", d.toString(16)) : c.push(d.toString(16));
        return c.join("")
    }
    ,
    b.fromHex = function(a, c, d) {
        var g, e, f, h, i;
        if (!d) {
            if ("string" != typeof a)
                throw TypeError("Illegal str: Not a string");
            if (0 !== a.length % 2)
                throw TypeError("Illegal str: Length not a multiple of 2")
        }
        for (e = a.length,
        f = new b(0 | e / 2,c),
        h = 0,
        i = 0; e > h; h += 2) {
            if (g = parseInt(a.substring(h, h + 2), 16),
            !d && (!isFinite(g) || 0 > g || g > 255))
                throw TypeError("Illegal str: Contains non-hex characters");
            f.view[i++] = g
        }
        return f.limit = i,
        f
    }
    ,
    k = function() {
        var a = {};
        return a.MAX_CODEPOINT = 1114111,
        a.encodeUTF8 = function(a, b) {
            var c = null;
            for ("number" == typeof a && (c = a,
            a = function() {
                return null
            }
            ); null !== c || null !== (c = a()); )
                128 > c ? b(127 & c) : 2048 > c ? (b(192 | 31 & c >> 6),
                b(128 | 63 & c)) : 65536 > c ? (b(224 | 15 & c >> 12),
                b(128 | 63 & c >> 6),
                b(128 | 63 & c)) : (b(240 | 7 & c >> 18),
                b(128 | 63 & c >> 12),
                b(128 | 63 & c >> 6),
                b(128 | 63 & c)),
                c = null
        }
        ,
        a.decodeUTF8 = function(a, b) {
            for (var c, d, e, f, g = function(a) {
                a = a.slice(0, a.indexOf(null));
                var b = Error(a.toString());
                throw b.name = "TruncatedError",
                b["bytes"] = a,
                b
            }; null !== (c = a()); )
                if (0 === (128 & c))
                    b(c);
                else if (192 === (224 & c))
                    null === (d = a()) && g([c, d]),
                    b((31 & c) << 6 | 63 & d);
                else if (224 === (240 & c))
                    (null === (d = a()) || null === (e = a())) && g([c, d, e]),
                    b((15 & c) << 12 | (63 & d) << 6 | 63 & e);
                else {
                    if (240 !== (248 & c))
                        throw RangeError("Illegal starting byte: " + c);
                    (null === (d = a()) || null === (e = a()) || null === (f = a())) && g([c, d, e, f]),
                    b((7 & c) << 18 | (63 & d) << 12 | (63 & e) << 6 | 63 & f)
                }
        }
        ,
        a.UTF16toUTF8 = function(a, b) {
            for (var c, d = null; ; ) {
                if (null === (c = null !== d ? d : a()))
                    break;
                c >= 55296 && 57343 >= c && null !== (d = a()) && d >= 56320 && 57343 >= d ? (b(1024 * (c - 55296) + d - 56320 + 65536),
                d = null) : b(c)
            }
            null !== d && b(d)
        }
        ,
        a.UTF8toUTF16 = function(a, b) {
            var c = null;
            for ("number" == typeof a && (c = a,
            a = function() {
                return null
            }
            ); null !== c || null !== (c = a()); )
                65535 >= c ? b(c) : (c -= 65536,
                b((c >> 10) + 55296),
                b(c % 1024 + 56320)),
                c = null
        }
        ,
        a.encodeUTF16toUTF8 = function(b, c) {
            a.UTF16toUTF8(b, function(b) {
                a.encodeUTF8(b, c)
            })
        }
        ,
        a.decodeUTF8toUTF16 = function(b, c) {
            a.decodeUTF8(b, function(b) {
                a.UTF8toUTF16(b, c)
            })
        }
        ,
        a.calculateCodePoint = function(a) {
            return 128 > a ? 1 : 2048 > a ? 2 : 65536 > a ? 3 : 4
        }
        ,
        a.calculateUTF8 = function(a) {
            for (var b, c = 0; null !== (b = a()); )
                c += 128 > b ? 1 : 2048 > b ? 2 : 65536 > b ? 3 : 4;
            return c
        }
        ,
        a.calculateUTF16asUTF8 = function(b) {
            var c = 0
              , d = 0;
            return a.UTF16toUTF8(b, function(a) {
                ++c,
                d += 128 > a ? 1 : 2048 > a ? 2 : 65536 > a ? 3 : 4
            }),
            [c, d]
        }
        ,
        a
    }(),
    c.toUTF8 = function(a, b) {
        if ("undefined" == typeof a && (a = this.offset),
        "undefined" == typeof b && (b = this.limit),
        !this.noAssert) {
            if ("number" != typeof a || 0 !== a % 1)
                throw TypeError("Illegal begin: Not an integer");
            if (a >>>= 0,
            "number" != typeof b || 0 !== b % 1)
                throw TypeError("Illegal end: Not an integer");
            if (b >>>= 0,
            0 > a || a > b || b > this.buffer.byteLength)
                throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength)
        }
        var c;
        try {
            k.decodeUTF8toUTF16(function() {
                return b > a ? this.view[a++] : null
            }
            .bind(this), c = g())
        } catch (d) {
            if (a !== b)
                throw RangeError("Illegal range: Truncated data, " + a + " != " + b)
        }
        return c()
    }
    ,
    b.fromUTF8 = function(a, c, d) {
        if (!d && "string" != typeof a)
            throw TypeError("Illegal str: Not a string");
        var e = new b(k.calculateUTF16asUTF8(f(a), !0)[1],c,d)
          , g = 0;
        return k.encodeUTF16toUTF8(f(a), function(a) {
            e.view[g++] = a
        }),
        e.limit = g,
        e
    }
    ,
    b
}),
function(a, b) {
    "function" == typeof define && define["amd"] ? define(["/v2/web/boss/js/module/chat-bytebuffer.js"], function() {
        (a["dcodeIO"] = a["dcodeIO"] || {})["ProtoBuf"] = b(a["dcodeIO"]["ByteBuffer"])
    }) : "function" == typeof require && "object" == typeof module && module && module["exports"] ? module["exports"] = b(require("bytebuffer"), !0) : (a["dcodeIO"] = a["dcodeIO"] || {})["ProtoBuf"] = b(a["dcodeIO"]["ByteBuffer"])
}(this, function(a) {
    "use strict";
    var c = {};
    return c.ByteBuffer = a,
    c.Long = a.Long || null,
    c.VERSION = "5.0.1",
    c.WIRE_TYPES = {},
    c.WIRE_TYPES.VARINT = 0,
    c.WIRE_TYPES.BITS64 = 1,
    c.WIRE_TYPES.LDELIM = 2,
    c.WIRE_TYPES.STARTGROUP = 3,
    c.WIRE_TYPES.ENDGROUP = 4,
    c.WIRE_TYPES.BITS32 = 5,
    c.PACKABLE_WIRE_TYPES = [c.WIRE_TYPES.VARINT, c.WIRE_TYPES.BITS64, c.WIRE_TYPES.BITS32],
    c.TYPES = {
        int32: {
            name: "int32",
            wireType: c.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        uint32: {
            name: "uint32",
            wireType: c.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        sint32: {
            name: "sint32",
            wireType: c.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        int64: {
            name: "int64",
            wireType: c.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        uint64: {
            name: "uint64",
            wireType: c.WIRE_TYPES.VARINT,
            defaultValue: c.Long ? c.Long.UZERO : void 0
        },
        sint64: {
            name: "sint64",
            wireType: c.WIRE_TYPES.VARINT,
            defaultValue: c.Long ? c.Long.ZERO : void 0
        },
        bool: {
            name: "bool",
            wireType: c.WIRE_TYPES.VARINT,
            defaultValue: !1
        },
        "double": {
            name: "double",
            wireType: c.WIRE_TYPES.BITS64,
            defaultValue: 0
        },
        string: {
            name: "string",
            wireType: c.WIRE_TYPES.LDELIM,
            defaultValue: ""
        },
        bytes: {
            name: "bytes",
            wireType: c.WIRE_TYPES.LDELIM,
            defaultValue: null
        },
        fixed32: {
            name: "fixed32",
            wireType: c.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        sfixed32: {
            name: "sfixed32",
            wireType: c.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        fixed64: {
            name: "fixed64",
            wireType: c.WIRE_TYPES.BITS64,
            defaultValue: c.Long ? c.Long.UZERO : void 0
        },
        sfixed64: {
            name: "sfixed64",
            wireType: c.WIRE_TYPES.BITS64,
            defaultValue: c.Long ? c.Long.ZERO : void 0
        },
        "float": {
            name: "float",
            wireType: c.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        "enum": {
            name: "enum",
            wireType: c.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        message: {
            name: "message",
            wireType: c.WIRE_TYPES.LDELIM,
            defaultValue: null
        },
        group: {
            name: "group",
            wireType: c.WIRE_TYPES.STARTGROUP,
            defaultValue: null
        }
    },
    c.MAP_KEY_TYPES = [c.TYPES["int32"], c.TYPES["sint32"], c.TYPES["sfixed32"], c.TYPES["uint32"], c.TYPES["fixed32"], c.TYPES["int64"], c.TYPES["sint64"], c.TYPES["sfixed64"], c.TYPES["uint64"], c.TYPES["fixed64"], c.TYPES["bool"], c.TYPES["string"], c.TYPES["bytes"]],
    c.ID_MIN = 1,
    c.ID_MAX = 536870911,
    c.convertFieldsToCamelCase = !1,
    c.populateAccessors = !0,
    c.populateDefaults = !0,
    c.Util = function() {
        var a = {};
        return a.IS_NODE = !("object" != typeof process || "[object process]" != process + "" || process["browser"]),
        a.XHR = function() {
            var c, a = [function() {
                return new XMLHttpRequest
            }
            , function() {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }
            , function() {
                return new ActiveXObject("Msxml3.XMLHTTP")
            }
            , function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }
            ], b = null;
            for (c = 0; c < a.length; c++) {
                try {
                    b = a[c]()
                } catch (d) {
                    continue
                }
                break
            }
            if (!b)
                throw Error("XMLHttpRequest is not supported");
            return b
        }
        ,
        a.fetch = function(b, c) {
            var d, f;
            if (c && "function" != typeof c && (c = null),
            a.IS_NODE)
                if (d = require("fs"),
                c)
                    d.readFile(b, function(a, b) {
                        a ? c(null) : c("" + b)
                    });
                else
                    try {
                        return d.readFileSync(b)
                    } catch (e) {
                        return null
                    }
            else {
                if (f = a.XHR(),
                f.open("GET", b, c ? !0 : !1),
                f.setRequestHeader("Accept", "text/plain"),
                "function" == typeof f.overrideMimeType && f.overrideMimeType("text/plain"),
                !c)
                    return f.send(null),
                    200 == f.status || 0 == f.status && "string" == typeof f.responseText ? f.responseText : null;
                if (f.onreadystatechange = function() {
                    4 == f.readyState && (200 == f.status || 0 == f.status && "string" == typeof f.responseText ? c(f.responseText) : c(null))
                }
                ,
                4 == f.readyState)
                    return;
                f.send(null)
            }
        }
        ,
        a.toCamelCase = function(a) {
            return a.replace(/_([a-zA-Z])/g, function(a, b) {
                return b.toUpperCase()
            })
        }
        ,
        a
    }(),
    c.Lang = {
        DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
        RULE: /^(?:required|optional|repeated|map)$/,
        TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
        NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
        TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
        TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
        FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
        NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
        NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
        NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
        NUMBER_OCT: /^0[0-7]+$/,
        NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
        BOOL: /^(?:true|false)$/i,
        ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
        NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
        WHITESPACE: /\s/,
        STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
        STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
        STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
    },
    c.DotProto = function(a, b) {
        function h(a, c) {
            var d = -1
              , e = 1;
            if ("-" == a.charAt(0) && (e = -1,
            a = a.substring(1)),
            b.NUMBER_DEC.test(a))
                d = parseInt(a);
            else if (b.NUMBER_HEX.test(a))
                d = parseInt(a.substring(2), 16);
            else {
                if (!b.NUMBER_OCT.test(a))
                    throw Error("illegal id value: " + (0 > e ? "-" : "") + a);
                d = parseInt(a.substring(1), 8)
            }
            if (d = 0 | e * d,
            !c && 0 > d)
                throw Error("illegal id value: " + (0 > e ? "-" : "") + a);
            return d
        }
        function i(a) {
            var c = 1;
            if ("-" == a.charAt(0) && (c = -1,
            a = a.substring(1)),
            b.NUMBER_DEC.test(a))
                return c * parseInt(a, 10);
            if (b.NUMBER_HEX.test(a))
                return c * parseInt(a.substring(2), 16);
            if (b.NUMBER_OCT.test(a))
                return c * parseInt(a.substring(1), 8);
            if ("inf" === a)
                return 1 / 0 * c;
            if ("nan" === a)
                return 0 / 0;
            if (b.NUMBER_FLT.test(a))
                return c * parseFloat(a);
            throw Error("illegal number value: " + (0 > c ? "-" : "") + a)
        }
        function j(a, b, c) {
            "undefined" == typeof a[b] ? a[b] = c : (Array.isArray(a[b]) || (a[b] = [a[b]]),
            a[b].push(c))
        }
        var f, g, c = {}, d = function(a) {
            this.source = a + "",
            this.index = 0,
            this.line = 1,
            this.stack = [],
            this._stringOpen = null
        }, e = d.prototype;
        return e._readString = function() {
            var c, a = '"' === this._stringOpen ? b.STRING_DQ : b.STRING_SQ;
            if (a.lastIndex = this.index - 1,
            c = a.exec(this.source),
            !c)
                throw Error("unterminated string");
            return this.index = a.lastIndex,
            this.stack.push(this._stringOpen),
            this._stringOpen = null,
            c[1]
        }
        ,
        e.next = function() {
            var a, c, d, e, f, g;
            if (this.stack.length > 0)
                return this.stack.shift();
            if (this.index >= this.source.length)
                return null;
            if (null !== this._stringOpen)
                return this._readString();
            do {
                for (a = !1; b.WHITESPACE.test(d = this.source.charAt(this.index)); )
                    if ("\n" === d && ++this.line,
                    ++this.index === this.source.length)
                        return null;
                if ("/" === this.source.charAt(this.index))
                    if (++this.index,
                    "/" === this.source.charAt(this.index)) {
                        for (; "\n" !== this.source.charAt(++this.index); )
                            if (this.index == this.source.length)
                                return null;
                        ++this.index,
                        ++this.line,
                        a = !0
                    } else {
                        if ("*" !== (d = this.source.charAt(this.index)))
                            return "/";
                        do {
                            if ("\n" === d && ++this.line,
                            ++this.index === this.source.length)
                                return null;
                            c = d,
                            d = this.source.charAt(this.index)
                        } while ("*" !== c || "/" !== d);++this.index,
                        a = !0
                    }
            } while (a);if (this.index === this.source.length)
                return null;
            if (e = this.index,
            b.DELIM.lastIndex = 0,
            f = b.DELIM.test(this.source.charAt(e++)),
            !f)
                for (; e < this.source.length && !b.DELIM.test(this.source.charAt(e)); )
                    ++e;
            return g = this.source.substring(this.index, this.index = e),
            ('"' === g || "'" === g) && (this._stringOpen = g),
            g
        }
        ,
        e.peek = function() {
            if (0 === this.stack.length) {
                var a = this.next();
                if (null === a)
                    return null;
                this.stack.push(a)
            }
            return this.stack[0]
        }
        ,
        e.skip = function(a) {
            var b = this.next();
            if (b !== a)
                throw Error("illegal '" + b + "', '" + a + "' expected")
        }
        ,
        e.omit = function(a) {
            return this.peek() === a ? (this.next(),
            !0) : !1
        }
        ,
        e.toString = function() {
            return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")"
        }
        ,
        c.Tokenizer = d,
        f = function(a) {
            this.tn = new d(a),
            this.proto3 = !1
        }
        ,
        g = f.prototype,
        g.parse = function() {
            var c, e, a = {
                name: "[ROOT]",
                "package": null,
                messages: [],
                enums: [],
                imports: [],
                options: {},
                services: []
            }, d = !0;
            try {
                for (; c = this.tn.next(); )
                    switch (c) {
                    case "package":
                        if (!d || null !== a["package"])
                            throw Error("unexpected 'package'");
                        if (c = this.tn.next(),
                        !b.TYPEREF.test(c))
                            throw Error("illegal package name: " + c);
                        this.tn.skip(";"),
                        a["package"] = c;
                        break;
                    case "import":
                        if (!d)
                            throw Error("unexpected 'import'");
                        c = this.tn.peek(),
                        ("public" === c || (e = "weak" === c)) && this.tn.next(),
                        c = this._readString(),
                        this.tn.skip(";"),
                        e || a["imports"].push(c);
                        break;
                    case "syntax":
                        if (!d)
                            throw Error("unexpected 'syntax'");
                        this.tn.skip("="),
                        "proto3" === (a["syntax"] = this._readString()) && (this.proto3 = !0),
                        this.tn.skip(";");
                        break;
                    case "message":
                        this._parseMessage(a, null),
                        d = !1;
                        break;
                    case "enum":
                        this._parseEnum(a),
                        d = !1;
                        break;
                    case "option":
                        this._parseOption(a);
                        break;
                    case "service":
                        this._parseService(a);
                        break;
                    case "extend":
                        this._parseExtend(a);
                        break;
                    default:
                        throw Error("unexpected '" + c + "'")
                    }
            } catch (f) {
                throw f.message = "Parse error at line " + this.tn.line + ": " + f.message,
                f
            }
            return delete a["name"],
            a
        }
        ,
        f.parse = function(a) {
            return new f(a).parse()
        }
        ,
        g._readString = function() {
            var b, c, a = "";
            do {
                if (c = this.tn.next(),
                "'" !== c && '"' !== c)
                    throw Error("illegal string delimiter: " + c);
                a += this.tn.next(),
                this.tn.skip(c),
                b = this.tn.peek()
            } while ('"' === b || '"' === b);return a
        }
        ,
        g._readValue = function(a) {
            var c = this.tn.peek();
            if ('"' === c || "'" === c)
                return this._readString();
            if (this.tn.next(),
            b.NUMBER.test(c))
                return i(c);
            if (b.BOOL.test(c))
                return "true" === c.toLowerCase();
            if (a && b.TYPEREF.test(c))
                return c;
            throw Error("illegal value: " + c)
        }
        ,
        g._parseOption = function(a, c) {
            var f, d = this.tn.next(), e = !1;
            if ("(" === d && (e = !0,
            d = this.tn.next()),
            !b.TYPEREF.test(d))
                throw Error("illegal option name: " + d);
            f = d,
            e && (this.tn.skip(")"),
            f = "(" + f + ")",
            d = this.tn.peek(),
            b.FQTYPEREF.test(d) && (f += d,
            this.tn.next())),
            this.tn.skip("="),
            this._parseOptionValue(a, f),
            c || this.tn.skip(";")
        }
        ,
        g._parseOptionValue = function(a, c) {
            var d = this.tn.peek();
            if ("{" !== d)
                j(a["options"], c, this._readValue(!0));
            else
                for (this.tn.skip("{"); "}" !== (d = this.tn.next()); ) {
                    if (!b.NAME.test(d))
                        throw Error("illegal option name: " + c + "." + d);
                    this.tn.omit(":") ? j(a["options"], c + "." + d, this._readValue(!0)) : this._parseOptionValue(a, c + "." + d)
                }
        }
        ,
        g._parseService = function(a) {
            var d, e, c = this.tn.next();
            if (!b.NAME.test(c))
                throw Error("illegal service name at line " + this.tn.line + ": " + c);
            for (d = c,
            e = {
                name: d,
                rpc: {},
                options: {}
            },
            this.tn.skip("{"); "}" !== (c = this.tn.next()); )
                if ("option" === c)
                    this._parseOption(e);
                else {
                    if ("rpc" !== c)
                        throw Error("illegal service token: " + c);
                    this._parseServiceRPC(e)
                }
            this.tn.omit(";"),
            a["services"].push(e)
        }
        ,
        g._parseServiceRPC = function(a) {
            var e, f, c = "rpc", d = this.tn.next();
            if (!b.NAME.test(d))
                throw Error("illegal rpc service method name: " + d);
            if (e = d,
            f = {
                request: null,
                response: null,
                request_stream: !1,
                response_stream: !1,
                options: {}
            },
            this.tn.skip("("),
            d = this.tn.next(),
            "stream" === d.toLowerCase() && (f["request_stream"] = !0,
            d = this.tn.next()),
            !b.TYPEREF.test(d))
                throw Error("illegal rpc service request type: " + d);
            if (f["request"] = d,
            this.tn.skip(")"),
            d = this.tn.next(),
            "returns" !== d.toLowerCase())
                throw Error("illegal rpc service request type delimiter: " + d);
            if (this.tn.skip("("),
            d = this.tn.next(),
            "stream" === d.toLowerCase() && (f["response_stream"] = !0,
            d = this.tn.next()),
            f["response"] = d,
            this.tn.skip(")"),
            d = this.tn.peek(),
            "{" === d) {
                for (this.tn.next(); "}" !== (d = this.tn.next()); ) {
                    if ("option" !== d)
                        throw Error("illegal rpc service token: " + d);
                    this._parseOption(f)
                }
                this.tn.omit(";")
            } else
                this.tn.skip(";");
            "undefined" == typeof a[c] && (a[c] = {}),
            a[c][e] = f
        }
        ,
        g._parseMessage = function(a, c) {
            var d = !!c
              , e = this.tn.next()
              , f = {
                name: "",
                fields: [],
                enums: [],
                messages: [],
                options: {},
                services: [],
                oneofs: {}
            };
            if (!b.NAME.test(e))
                throw Error("illegal " + (d ? "group" : "message") + " name: " + e);
            for (f["name"] = e,
            d && (this.tn.skip("="),
            c["id"] = h(this.tn.next()),
            f["isGroup"] = !0),
            e = this.tn.peek(),
            "[" === e && c && this._parseFieldOptions(c),
            this.tn.skip("{"); "}" !== (e = this.tn.next()); )
                if (b.RULE.test(e))
                    this._parseMessageField(f, e);
                else if ("oneof" === e)
                    this._parseMessageOneOf(f);
                else if ("enum" === e)
                    this._parseEnum(f);
                else if ("message" === e)
                    this._parseMessage(f);
                else if ("option" === e)
                    this._parseOption(f);
                else if ("service" === e)
                    this._parseService(f);
                else if ("extensions" === e)
                    f["extensions"] = f.hasOwnProperty("extensions") ? f["extensions"].concat(this._parseExtensionRanges()) : this._parseExtensionRanges();
                else if ("reserved" === e)
                    this._parseIgnored();
                else if ("extend" === e)
                    this._parseExtend(f);
                else {
                    if (!b.TYPEREF.test(e))
                        throw Error("illegal message token: " + e);
                    if (!this.proto3)
                        throw Error("illegal field rule: " + e);
                    this._parseMessageField(f, "optional", e)
                }
            return this.tn.omit(";"),
            a["messages"].push(f),
            f
        }
        ,
        g._parseIgnored = function() {
            for (; ";" !== this.tn.peek(); )
                this.tn.next();
            this.tn.skip(";")
        }
        ,
        g._parseMessageField = function(a, c, d) {
            var e, f, g;
            if (!b.RULE.test(c))
                throw Error("illegal message field rule: " + c);
            if (e = {
                rule: c,
                type: "",
                name: "",
                options: {},
                id: 0
            },
            "map" === c) {
                if (d)
                    throw Error("illegal type: " + d);
                if (this.tn.skip("<"),
                f = this.tn.next(),
                !b.TYPE.test(f) && !b.TYPEREF.test(f))
                    throw Error("illegal message field type: " + f);
                if (e["keytype"] = f,
                this.tn.skip(","),
                f = this.tn.next(),
                !b.TYPE.test(f) && !b.TYPEREF.test(f))
                    throw Error("illegal message field: " + f);
                if (e["type"] = f,
                this.tn.skip(">"),
                f = this.tn.next(),
                !b.NAME.test(f))
                    throw Error("illegal message field name: " + f);
                e["name"] = f,
                this.tn.skip("="),
                e["id"] = h(this.tn.next()),
                f = this.tn.peek(),
                "[" === f && this._parseFieldOptions(e),
                this.tn.skip(";")
            } else if (d = "undefined" != typeof d ? d : this.tn.next(),
            "group" === d) {
                if (g = this._parseMessage(a, e),
                !/^[A-Z]/.test(g["name"]))
                    throw Error("illegal group name: " + g["name"]);
                e["type"] = g["name"],
                e["name"] = g["name"].toLowerCase(),
                this.tn.omit(";")
            } else {
                if (!b.TYPE.test(d) && !b.TYPEREF.test(d))
                    throw Error("illegal message field type: " + d);
                if (e["type"] = d,
                f = this.tn.next(),
                !b.NAME.test(f))
                    throw Error("illegal message field name: " + f);
                e["name"] = f,
                this.tn.skip("="),
                e["id"] = h(this.tn.next()),
                f = this.tn.peek(),
                "[" === f && this._parseFieldOptions(e),
                this.tn.skip(";")
            }
            return a["fields"].push(e),
            e
        }
        ,
        g._parseMessageOneOf = function(a) {
            var e, d, f, c = this.tn.next();
            if (!b.NAME.test(c))
                throw Error("illegal oneof name: " + c);
            for (d = c,
            f = [],
            this.tn.skip("{"); "}" !== (c = this.tn.next()); )
                e = this._parseMessageField(a, "optional", c),
                e["oneof"] = d,
                f.push(e["id"]);
            this.tn.omit(";"),
            a["oneofs"][d] = f
        }
        ,
        g._parseFieldOptions = function(a) {
            this.tn.skip("[");
            for (var b, c = !0; "]" !== (b = this.tn.peek()); )
                c || this.tn.skip(","),
                this._parseOption(a, !0),
                c = !1;
            this.tn.next()
        }
        ,
        g._parseEnum = function(a) {
            var e, c = {
                name: "",
                values: [],
                options: {}
            }, d = this.tn.next();
            if (!b.NAME.test(d))
                throw Error("illegal name: " + d);
            for (c["name"] = d,
            this.tn.skip("{"); "}" !== (d = this.tn.next()); )
                if ("option" === d)
                    this._parseOption(c);
                else {
                    if (!b.NAME.test(d))
                        throw Error("illegal name: " + d);
                    this.tn.skip("="),
                    e = {
                        name: d,
                        id: h(this.tn.next(), !0)
                    },
                    d = this.tn.peek(),
                    "[" === d && this._parseFieldOptions({
                        options: {}
                    }),
                    this.tn.skip(";"),
                    c["values"].push(e)
                }
            this.tn.omit(";"),
            a["enums"].push(c)
        }
        ,
        g._parseExtensionRanges = function() {
            var c, d, e, b = [];
            do {
                for (d = []; ; ) {
                    switch (c = this.tn.next()) {
                    case "min":
                        e = a.ID_MIN;
                        break;
                    case "max":
                        e = a.ID_MAX;
                        break;
                    default:
                        e = i(c)
                    }
                    if (d.push(e),
                    2 === d.length)
                        break;
                    if ("to" !== this.tn.peek()) {
                        d.push(e);
                        break
                    }
                    this.tn.next()
                }
                b.push(d)
            } while (this.tn.omit(","));return this.tn.skip(";"),
            b
        }
        ,
        g._parseExtend = function(a) {
            var d, c = this.tn.next();
            if (!b.TYPEREF.test(c))
                throw Error("illegal extend reference: " + c);
            for (d = {
                ref: c,
                fields: []
            },
            this.tn.skip("{"); "}" !== (c = this.tn.next()); )
                if (b.RULE.test(c))
                    this._parseMessageField(d, c);
                else {
                    if (!b.TYPEREF.test(c))
                        throw Error("illegal extend token: " + c);
                    if (!this.proto3)
                        throw Error("illegal field rule: " + c);
                    this._parseMessageField(d, "optional", c)
                }
            return this.tn.omit(";"),
            a["messages"].push(d),
            d
        }
        ,
        g.toString = function() {
            return "Parser at line " + this.tn.line
        }
        ,
        c.Parser = f,
        c
    }(c, c.Lang),
    c.Reflect = function(b) {
        function j(c) {
            if ("string" == typeof c && (c = b.TYPES[c]),
            "undefined" == typeof c.defaultValue)
                throw Error("default value for type " + c.name + " is not supported");
            return c == b.TYPES["bytes"] ? new a(0) : c.defaultValue
        }
        function k(a, c) {
            if (a && "number" == typeof a.low && "number" == typeof a.high && "boolean" == typeof a.unsigned && a.low === a.low && a.high === a.high)
                return new b.Long(a.low,a.high,"undefined" == typeof c ? a.unsigned : c);
            if ("string" == typeof a)
                return b.Long.fromString(a, c || !1, 10);
            if ("number" == typeof a)
                return b.Long.fromNumber(a, c || !1);
            throw Error("not convertible to Long")
        }
        function n(a, c) {
            var d = c.readVarint32()
              , e = 7 & d
              , f = d >>> 3;
            switch (e) {
            case b.WIRE_TYPES.VARINT:
                do
                    d = c.readUint8();
                while (128 === (128 & d));break;
            case b.WIRE_TYPES.BITS64:
                c.offset += 8;
                break;
            case b.WIRE_TYPES.LDELIM:
                d = c.readVarint32(),
                c.offset += d;
                break;
            case b.WIRE_TYPES.STARTGROUP:
                n(f, c);
                break;
            case b.WIRE_TYPES.ENDGROUP:
                if (f === a)
                    return !1;
                throw Error("Illegal GROUPEND after unknown group: " + f + " (" + a + " expected)");
            case b.WIRE_TYPES.BITS32:
                c.offset += 4;
                break;
            default:
                throw Error("Illegal wire type in unknown group " + a + ": " + e)
            }
            return !0
        }
        var f, g, h, i, l, m, o, p, q, r, s, t, u, v, w, x, y, z, A, c = {}, d = function(a, b, c) {
            this.builder = a,
            this.parent = b,
            this.name = c,
            this.className
        }, e = d.prototype;
        return e.fqn = function() {
            for (var a = this.name, b = this; ; ) {
                if (b = b.parent,
                null == b)
                    break;
                a = b.name + "." + a
            }
            return a
        }
        ,
        e.toString = function(a) {
            return (a ? this.className + " " : "") + this.fqn()
        }
        ,
        e.build = function() {
            throw Error(this.toString(!0) + " cannot be built directly")
        }
        ,
        c.T = d,
        f = function(a, b, c, e, f) {
            d.call(this, a, b, c),
            this.className = "Namespace",
            this.children = [],
            this.options = e || {},
            this.syntax = f || "proto2"
        }
        ,
        g = f.prototype = Object.create(d.prototype),
        g.getChildren = function(a) {
            var b, c, d;
            if (a = a || null,
            null == a)
                return this.children.slice();
            for (b = [],
            c = 0,
            d = this.children.length; d > c; ++c)
                this.children[c]instanceof a && b.push(this.children[c]);
            return b
        }
        ,
        g.addChild = function(a) {
            var b;
            if (b = this.getChild(a.name))
                if (b instanceof l.Field && b.name !== b.originalName && null === this.getChild(b.originalName))
                    b.name = b.originalName;
                else {
                    if (!(a instanceof l.Field && a.name !== a.originalName && null === this.getChild(a.originalName)))
                        throw Error("Duplicate name in namespace " + this.toString(!0) + ": " + a.name);
                    a.name = a.originalName
                }
            this.children.push(a)
        }
        ,
        g.getChild = function(a) {
            var c, d, b = "number" == typeof a ? "id" : "name";
            for (c = 0,
            d = this.children.length; d > c; ++c)
                if (this.children[c][b] === a)
                    return this.children[c];
            return null
        }
        ,
        g.resolve = function(a, b) {
            var g, d = "string" == typeof a ? a.split(".") : a, e = this, f = 0;
            if ("" === d[f]) {
                for (; null !== e.parent; )
                    e = e.parent;
                f++
            }
            do {
                do {
                    if (!(e instanceof c.Namespace)) {
                        e = null;
                        break
                    }
                    if (g = e.getChild(d[f]),
                    !(g && g instanceof c.T && (!b || g instanceof c.Namespace))) {
                        e = null;
                        break
                    }
                    e = g,
                    f++
                } while (f < d.length);if (null != e)
                    break;
                if (null !== this.parent)
                    return this.parent.resolve(a, b)
            } while (null != e);return e
        }
        ,
        g.qn = function(a) {
            var e, f, b = [], d = a;
            do
                b.unshift(d.name),
                d = d.parent;
            while (null !== d);for (e = 1; e <= b.length; e++)
                if (f = b.slice(b.length - e),
                a === this.resolve(f, a instanceof c.Namespace))
                    return f.join(".");
            return a.fqn()
        }
        ,
        g.build = function() {
            var e, c, d, a = {}, b = this.children;
            for (c = 0,
            d = b.length; d > c; ++c)
                e = b[c],
                e instanceof f && (a[e.name] = e.build());
            return Object.defineProperty && Object.defineProperty(a, "$options", {
                value: this.buildOpt()
            }),
            a
        }
        ,
        g.buildOpt = function() {
            var c, d, e, f, a = {}, b = Object.keys(this.options);
            for (c = 0,
            d = b.length; d > c; ++c)
                e = b[c],
                f = this.options[b[c]],
                a[e] = f;
            return a
        }
        ,
        g.getOption = function(a) {
            return "undefined" == typeof a ? this.options : "undefined" != typeof this.options[a] ? this.options[a] : null
        }
        ,
        c.Namespace = f,
        h = function(a, c, d, e, f) {
            if (this.type = a,
            this.resolvedType = c,
            this.isMapKey = d,
            this.syntax = e,
            this.name = f,
            d && b.MAP_KEY_TYPES.indexOf(a) < 0)
                throw Error("Invalid map key type: " + a.name)
        }
        ,
        i = h.prototype,
        h.defaultFieldValue = j,
        i.toString = function() {
            return (this.name || "") + (this.isMapKey ? "map" : "value") + " element"
        }
        ,
        i.verifyValue = function(c) {
            function e(a, b) {
                throw Error("Illegal value for " + d.toString(!0) + " of type " + d.type.name + ": " + a + " (" + b + ")")
            }
            var g, h, i, d = this;
            switch (this.type) {
            case b.TYPES["int32"]:
            case b.TYPES["sint32"]:
            case b.TYPES["sfixed32"]:
                return ("number" != typeof c || c === c && 0 !== c % 1) && e(typeof c, "not an integer"),
                c > 4294967295 ? 0 | c : c;
            case b.TYPES["uint32"]:
            case b.TYPES["fixed32"]:
                return ("number" != typeof c || c === c && 0 !== c % 1) && e(typeof c, "not an integer"),
                0 > c ? c >>> 0 : c;
            case b.TYPES["int64"]:
            case b.TYPES["sint64"]:
            case b.TYPES["sfixed64"]:
                if (b.Long)
                    try {
                        return k(c, !1)
                    } catch (f) {
                        e(typeof c, f.message)
                    }
                else
                    e(typeof c, "requires Long.js");
            case b.TYPES["uint64"]:
            case b.TYPES["fixed64"]:
                if (b.Long)
                    try {
                        return k(c, !0)
                    } catch (f) {
                        e(typeof c, f.message)
                    }
                else
                    e(typeof c, "requires Long.js");
            case b.TYPES["bool"]:
                return "boolean" != typeof c && e(typeof c, "not a boolean"),
                c;
            case b.TYPES["float"]:
            case b.TYPES["double"]:
                return "number" != typeof c && e(typeof c, "not a number"),
                c;
            case b.TYPES["string"]:
                return "string" == typeof c || c && c instanceof String || e(typeof c, "not a string"),
                "" + c;
            case b.TYPES["bytes"]:
                return a.isByteBuffer(c) ? c : a.wrap(c, "base64");
            case b.TYPES["enum"]:
                for (g = this.resolvedType.getChildren(b.Reflect.Enum.Value),
                i = 0; i < g.length; i++) {
                    if (g[i].name == c)
                        return g[i].id;
                    if (g[i].id == c)
                        return g[i].id
                }
                if ("proto3" === this.syntax)
                    return ("number" != typeof c || c === c && 0 !== c % 1) && e(typeof c, "not an integer"),
                    (c > 4294967295 || 0 > c) && e(typeof c, "not in range for uint32"),
                    c;
                e(c, "not a valid enum value");
            case b.TYPES["group"]:
            case b.TYPES["message"]:
                if (c && "object" == typeof c || e(typeof c, "object expected"),
                c instanceof this.resolvedType.clazz)
                    return c;
                if (c instanceof b.Builder.Message) {
                    h = {};
                    for (i in c)
                        c.hasOwnProperty(i) && (h[i] = c[i]);
                    c = h
                }
                return new this.resolvedType.clazz(c)
            }
            throw Error("[INTERNAL] Illegal value for " + this.toString(!0) + ": " + c + " (undefined type " + this.type + ")")
        }
        ,
        i.calculateLength = function(c, d) {
            if (null === d)
                return 0;
            var e;
            switch (this.type) {
            case b.TYPES["int32"]:
                return 0 > d ? a.calculateVarint64(d) : a.calculateVarint32(d);
            case b.TYPES["uint32"]:
                return a.calculateVarint32(d);
            case b.TYPES["sint32"]:
                return a.calculateVarint32(a.zigZagEncode32(d));
            case b.TYPES["fixed32"]:
            case b.TYPES["sfixed32"]:
            case b.TYPES["float"]:
                return 4;
            case b.TYPES["int64"]:
            case b.TYPES["uint64"]:
                return a.calculateVarint64(d);
            case b.TYPES["sint64"]:
                return a.calculateVarint64(a.zigZagEncode64(d));
            case b.TYPES["fixed64"]:
            case b.TYPES["sfixed64"]:
                return 8;
            case b.TYPES["bool"]:
                return 1;
            case b.TYPES["enum"]:
                return a.calculateVarint32(d);
            case b.TYPES["double"]:
                return 8;
            case b.TYPES["string"]:
                return e = a.calculateUTF8Bytes(d),
                a.calculateVarint32(e) + e;
            case b.TYPES["bytes"]:
                if (d.remaining() < 0)
                    throw Error("Illegal value for " + this.toString(!0) + ": " + d.remaining() + " bytes remaining");
                return a.calculateVarint32(d.remaining()) + d.remaining();
            case b.TYPES["message"]:
                return e = this.resolvedType.calculate(d),
                a.calculateVarint32(e) + e;
            case b.TYPES["group"]:
                return e = this.resolvedType.calculate(d),
                e + a.calculateVarint32(c << 3 | b.WIRE_TYPES.ENDGROUP)
            }
            throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + d + " (unknown type)")
        }
        ,
        i.encodeValue = function(c, d, e) {
            var f, g;
            if (null === d)
                return e;
            switch (this.type) {
            case b.TYPES["int32"]:
                0 > d ? e.writeVarint64(d) : e.writeVarint32(d);
                break;
            case b.TYPES["uint32"]:
                e.writeVarint32(d);
                break;
            case b.TYPES["sint32"]:
                e.writeVarint32ZigZag(d);
                break;
            case b.TYPES["fixed32"]:
                e.writeUint32(d);
                break;
            case b.TYPES["sfixed32"]:
                e.writeInt32(d);
                break;
            case b.TYPES["int64"]:
            case b.TYPES["uint64"]:
                e.writeVarint64(d);
                break;
            case b.TYPES["sint64"]:
                e.writeVarint64ZigZag(d);
                break;
            case b.TYPES["fixed64"]:
                e.writeUint64(d);
                break;
            case b.TYPES["sfixed64"]:
                e.writeInt64(d);
                break;
            case b.TYPES["bool"]:
                "string" == typeof d ? e.writeVarint32("false" === d.toLowerCase() ? 0 : !!d) : e.writeVarint32(d ? 1 : 0);
                break;
            case b.TYPES["enum"]:
                e.writeVarint32(d);
                break;
            case b.TYPES["float"]:
                e.writeFloat32(d);
                break;
            case b.TYPES["double"]:
                e.writeFloat64(d);
                break;
            case b.TYPES["string"]:
                e.writeVString(d);
                break;
            case b.TYPES["bytes"]:
                if (d.remaining() < 0)
                    throw Error("Illegal value for " + this.toString(!0) + ": " + d.remaining() + " bytes remaining");
                f = d.offset,
                e.writeVarint32(d.remaining()),
                e.append(d),
                d.offset = f;
                break;
            case b.TYPES["message"]:
                g = (new a).LE(),
                this.resolvedType.encode(d, g),
                e.writeVarint32(g.offset),
                e.append(g.flip());
                break;
            case b.TYPES["group"]:
                this.resolvedType.encode(d, e),
                e.writeVarint32(c << 3 | b.WIRE_TYPES.ENDGROUP);
                break;
            default:
                throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + d + " (unknown type)")
            }
            return e
        }
        ,
        i.decode = function(a, c, d) {
            if (c != this.type.wireType)
                throw Error("Unexpected wire type for element");
            var e, f;
            switch (this.type) {
            case b.TYPES["int32"]:
                return 0 | a.readVarint32();
            case b.TYPES["uint32"]:
                return a.readVarint32() >>> 0;
            case b.TYPES["sint32"]:
                return 0 | a.readVarint32ZigZag();
            case b.TYPES["fixed32"]:
                return a.readUint32() >>> 0;
            case b.TYPES["sfixed32"]:
                return 0 | a.readInt32();
            case b.TYPES["int64"]:
                return a.readVarint64();
            case b.TYPES["uint64"]:
                return a.readVarint64().toUnsigned();
            case b.TYPES["sint64"]:
                return a.readVarint64ZigZag();
            case b.TYPES["fixed64"]:
                return a.readUint64();
            case b.TYPES["sfixed64"]:
                return a.readInt64();
            case b.TYPES["bool"]:
                return !!a.readVarint32();
            case b.TYPES["enum"]:
                return a.readVarint32();
            case b.TYPES["float"]:
                return a.readFloat();
            case b.TYPES["double"]:
                return a.readDouble();
            case b.TYPES["string"]:
                return a.readVString();
            case b.TYPES["bytes"]:
                if (f = a.readVarint32(),
                a.remaining() < f)
                    throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + f + " required but got only " + a.remaining());
                return e = a.clone(),
                e.limit = e.offset + f,
                a.offset += f,
                e;
            case b.TYPES["message"]:
                return f = a.readVarint32(),
                this.resolvedType.decode(a, f);
            case b.TYPES["group"]:
                return this.resolvedType.decode(a, -1, d)
            }
            throw Error("[INTERNAL] Illegal decode type")
        }
        ,
        i.valueFromString = function(c) {
            if (!this.isMapKey)
                throw Error("valueFromString() called on non-map-key element");
            switch (this.type) {
            case b.TYPES["int32"]:
            case b.TYPES["sint32"]:
            case b.TYPES["sfixed32"]:
            case b.TYPES["uint32"]:
            case b.TYPES["fixed32"]:
                return this.verifyValue(parseInt(c));
            case b.TYPES["int64"]:
            case b.TYPES["sint64"]:
            case b.TYPES["sfixed64"]:
            case b.TYPES["uint64"]:
            case b.TYPES["fixed64"]:
                return this.verifyValue(c);
            case b.TYPES["bool"]:
                return "true" === c;
            case b.TYPES["string"]:
                return this.verifyValue(c);
            case b.TYPES["bytes"]:
                return a.fromBinary(c)
            }
        }
        ,
        i.valueToString = function(a) {
            if (!this.isMapKey)
                throw Error("valueToString() called on non-map-key element");
            return this.type === b.TYPES["bytes"] ? a.toString("binary") : a.toString()
        }
        ,
        c.Element = h,
        l = function(a, b, c, d, e, g) {
            f.call(this, a, b, c, d, g),
            this.className = "Message",
            this.extensions = void 0,
            this.clazz = null,
            this.isGroup = !!e,
            this._fields = null,
            this._fieldsById = null,
            this._fieldsByName = null
        }
        ,
        m = l.prototype = Object.create(f.prototype),
        m.build = function(c) {
            var d, g, e, f;
            if (this.clazz && !c)
                return this.clazz;
            for (d = function(b, c) {
                function j(c, d, e, f) {
                    var g, h, i, k, l, m, n;
                    if (null === c || "object" != typeof c)
                        return f && f instanceof b.Reflect.Enum && (g = b.Reflect.Enum.getName(f.object, c),
                        null !== g) ? g : c;
                    if (a.isByteBuffer(c))
                        return d ? c.toBase64() : c.toBuffer();
                    if (b.Long.isLong(c))
                        return e ? c.toString() : b.Long.fromValue(c);
                    if (Array.isArray(c))
                        return h = [],
                        c.forEach(function(a, b) {
                            h[b] = j(a, d, e, f)
                        }),
                        h;
                    if (h = {},
                    c instanceof b.Map) {
                        for (i = c.entries(),
                        k = i.next(); !k.done; k = i.next())
                            h[c.keyElem.valueToString(k.value[0])] = j(k.value[1], d, e, c.valueElem.resolvedType);
                        return h
                    }
                    l = c.$type,
                    m = void 0;
                    for (n in c)
                        c.hasOwnProperty(n) && (h[n] = l && (m = l.getChild(n)) ? j(c[n], d, e, m.resolvedType) : j(c[n], d, e));
                    return h
                }
                var h, i, d = c.getChildren(b.Reflect.Message.Field), e = c.getChildren(b.Reflect.Message.OneOf), f = function(g) {
                    var i, j, k, l;
                    for (b.Builder.Message.call(this),
                    i = 0,
                    j = e.length; j > i; ++i)
                        this[e[i].name] = null;
                    for (i = 0,
                    j = d.length; j > i; ++i)
                        k = d[i],
                        this[k.name] = k.repeated ? [] : k.map ? new b.Map(k) : null,
                        !k.required && "proto3" !== c.syntax || null === k.defaultValue || (this[k.name] = k.defaultValue);
                    if (arguments.length > 0)
                        if (1 !== arguments.length || null === g || "object" != typeof g || !("function" != typeof g.encode || g instanceof f) || Array.isArray(g) || g instanceof b.Map || a.isByteBuffer(g) || g instanceof ArrayBuffer || b.Long && g instanceof b.Long)
                            for (i = 0,
                            j = arguments.length; j > i; ++i)
                                "undefined" != typeof (l = arguments[i]) && this.$set(d[i].name, l);
                        else
                            this.$set(g)
                }, g = f.prototype = Object.create(b.Builder.Message.prototype);
                for (g.add = function(a, d, e) {
                    var f = c._fieldsByName[a];
                    if (!e) {
                        if (!f)
                            throw Error(this + "#" + a + " is undefined");
                        if (!(f instanceof b.Reflect.Message.Field))
                            throw Error(this + "#" + a + " is not a field: " + f.toString(!0));
                        if (!f.repeated)
                            throw Error(this + "#" + a + " is not a repeated field");
                        d = f.verifyValue(d, !0)
                    }
                    return null === this[a] && (this[a] = []),
                    this[a].push(d),
                    this
                }
                ,
                g.$add = g.add,
                g.set = function(a, d, e) {
                    var f, g, h;
                    if (a && "object" == typeof a) {
                        e = d;
                        for (f in a)
                            a.hasOwnProperty(f) && "undefined" != typeof (d = a[f]) && this.$set(f, d, e);
                        return this
                    }
                    if (g = c._fieldsByName[a],
                    e)
                        this[a] = d;
                    else {
                        if (!g)
                            throw Error(this + "#" + a + " is not a field: undefined");
                        if (!(g instanceof b.Reflect.Message.Field))
                            throw Error(this + "#" + a + " is not a field: " + g.toString(!0));
                        this[g.name] = d = g.verifyValue(d)
                    }
                    return g && g.oneof && (h = this[g.oneof.name],
                    null !== d ? (null !== h && h !== g.name && (this[h] = null),
                    this[g.oneof.name] = g.name) : h === a && (this[g.oneof.name] = null)),
                    this
                }
                ,
                g.$set = g.set,
                g.get = function(a, d) {
                    if (d)
                        return this[a];
                    var e = c._fieldsByName[a];
                    if (!(e && e instanceof b.Reflect.Message.Field))
                        throw Error(this + "#" + a + " is not a field: undefined");
                    if (!(e instanceof b.Reflect.Message.Field))
                        throw Error(this + "#" + a + " is not a field: " + e.toString(!0));
                    return this[e.name]
                }
                ,
                g.$get = g.get,
                h = 0; h < d.length; h++)
                    i = d[h],
                    i instanceof b.Reflect.Message.ExtensionField || c.builder.options["populateAccessors"] && function(a) {
                        var d, e, f, b = a.originalName.replace(/(_[a-zA-Z])/g, function(a) {
                            return a.toUpperCase().replace("_", "")
                        });
                        b = b.substring(0, 1).toUpperCase() + b.substring(1),
                        d = a.originalName.replace(/([A-Z])/g, function(a) {
                            return "_" + a
                        }),
                        e = function(b, c) {
                            return this[a.name] = c ? b : a.verifyValue(b),
                            this
                        }
                        ,
                        f = function() {
                            return this[a.name]
                        }
                        ,
                        null === c.getChild("set" + b) && (g["set" + b] = e),
                        null === c.getChild("set_" + d) && (g["set_" + d] = e),
                        null === c.getChild("get" + b) && (g["get" + b] = f),
                        null === c.getChild("get_" + d) && (g["get_" + d] = f)
                    }(i);
                return g.encode = function(b, d) {
                    var e, f;
                    "boolean" == typeof b && (d = b,
                    b = void 0),
                    e = !1,
                    b || (b = new a,
                    e = !0),
                    f = b.littleEndian;
                    try {
                        return c.encode(this, b.LE(), d),
                        (e ? b.flip() : b).LE(f)
                    } catch (g) {
                        throw b.LE(f),
                        g
                    }
                }
                ,
                f.encode = function(a, b, c) {
                    return new f(a).encode(b, c)
                }
                ,
                g.calculate = function() {
                    return c.calculate(this)
                }
                ,
                g.encodeDelimited = function(b, d) {
                    var f, e = !1;
                    return b || (b = new a,
                    e = !0),
                    f = (new a).LE(),
                    c.encode(this, f, d).flip(),
                    b.writeVarint32(f.remaining()),
                    b.append(f),
                    e ? b.flip() : b
                }
                ,
                g.encodeAB = function() {
                    try {
                        return this.encode().toArrayBuffer()
                    } catch (a) {
                        throw a["encoded"] && (a["encoded"] = a["encoded"].toArrayBuffer()),
                        a
                    }
                }
                ,
                g.toArrayBuffer = g.encodeAB,
                g.encodeNB = function() {
                    try {
                        return this.encode().toBuffer()
                    } catch (a) {
                        throw a["encoded"] && (a["encoded"] = a["encoded"].toBuffer()),
                        a
                    }
                }
                ,
                g.toBuffer = g.encodeNB,
                g.encode64 = function() {
                    try {
                        return this.encode().toBase64()
                    } catch (a) {
                        throw a["encoded"] && (a["encoded"] = a["encoded"].toBase64()),
                        a
                    }
                }
                ,
                g.toBase64 = g.encode64,
                g.encodeHex = function() {
                    try {
                        return this.encode().toHex()
                    } catch (a) {
                        throw a["encoded"] && (a["encoded"] = a["encoded"].toHex()),
                        a
                    }
                }
                ,
                g.toHex = g.encodeHex,
                g.toRaw = function(a, b) {
                    return j(this, !!a, !!b, this.$type)
                }
                ,
                g.encodeJSON = function() {
                    return JSON.stringify(j(this, !0, !0, this.$type))
                }
                ,
                f.decode = function(b, d, e) {
                    var f, g;
                    "string" == typeof d && (e = d,
                    d = -1),
                    "string" == typeof b ? b = a.wrap(b, e ? e : "base64") : a.isByteBuffer(b) || (b = a.wrap(b)),
                    f = b.littleEndian;
                    try {
                        return g = c.decode(b.LE(), d),
                        b.LE(f),
                        g
                    } catch (h) {
                        throw b.LE(f),
                        h
                    }
                }
                ,
                f.decodeDelimited = function(b, d) {
                    var e, f, g;
                    if ("string" == typeof b ? b = a.wrap(b, d ? d : "base64") : a.isByteBuffer(b) || (b = a.wrap(b)),
                    b.remaining() < 1)
                        return null;
                    if (e = b.offset,
                    f = b.readVarint32(),
                    b.remaining() < f)
                        return b.offset = e,
                        null;
                    try {
                        return g = c.decode(b.slice(b.offset, b.offset + f).LE()),
                        b.offset += f,
                        g
                    } catch (h) {
                        throw b.offset += f,
                        h
                    }
                }
                ,
                f.decode64 = function(a) {
                    return f.decode(a, "base64")
                }
                ,
                f.decodeHex = function(a) {
                    return f.decode(a, "hex")
                }
                ,
                f.decodeJSON = function(a) {
                    return new f(JSON.parse(a))
                }
                ,
                g.toString = function() {
                    return c.toString()
                }
                ,
                Object.defineProperty && (Object.defineProperty(f, "$options", {
                    value: c.buildOpt()
                }),
                Object.defineProperty(g, "$options", {
                    value: f["$options"]
                }),
                Object.defineProperty(f, "$type", {
                    value: c
                }),
                Object.defineProperty(g, "$type", {
                    value: c
                })),
                f
            }(b, this),
            this._fields = [],
            this._fieldsById = {},
            this._fieldsByName = {},
            e = 0,
            f = this.children.length; f > e; e++)
                if (g = this.children[e],
                g instanceof s || g instanceof l || g instanceof w) {
                    if (d.hasOwnProperty(g.name))
                        throw Error("Illegal reflect child of " + this.toString(!0) + ": " + g.toString(!0) + " cannot override static property '" + g.name + "'");
                    d[g.name] = g.build()
                } else if (g instanceof l.Field)
                    g.build(),
                    this._fields.push(g),
                    this._fieldsById[g.id] = g,
                    this._fieldsByName[g.name] = g;
                else if (!(g instanceof l.OneOf || g instanceof v))
                    throw Error("Illegal reflect child of " + this.toString(!0) + ": " + this.children[e].toString(!0));
            return this.clazz = d
        }
        ,
        m.encode = function(a, b, c) {
            var e, h, f, g, i, d = null;
            for (f = 0,
            g = this._fields.length; g > f; ++f)
                e = this._fields[f],
                h = a[e.name],
                e.required && null === h ? null === d && (d = e) : e.encode(c ? h : e.verifyValue(h), b, a);
            if (null !== d)
                throw i = Error("Missing at least one required field for " + this.toString(!0) + ": " + d),
                i["encoded"] = b,
                i;
            return b
        }
        ,
        m.calculate = function(a) {
            for (var e, f, b = 0, c = 0, d = this._fields.length; d > c; ++c) {
                if (e = this._fields[c],
                f = a[e.name],
                e.required && null === f)
                    throw Error("Missing at least one required field for " + this.toString(!0) + ": " + e);
                b += e.calculate(f, a)
            }
            return b
        }
        ,
        m.decode = function(a, c, d) {
            var g, h, i, j, e, f, k, l, m, o, p, q;
            for ("number" != typeof c && (c = -1),
            e = a.offset,
            f = new this.clazz; a.offset < e + c || -1 === c && a.remaining() > 0; ) {
                if (g = a.readVarint32(),
                h = 7 & g,
                i = g >>> 3,
                h === b.WIRE_TYPES.ENDGROUP) {
                    if (i !== d)
                        throw Error("Illegal group end indicator for " + this.toString(!0) + ": " + i + " (" + (d ? d + " expected" : "not a group") + ")");
                    break
                }
                if (j = this._fieldsById[i])
                    j.repeated && !j.options["packed"] ? f[j.name].push(j.decode(h, a)) : j.map ? (l = j.decode(h, a),
                    f[j.name].set(l[0], l[1])) : (f[j.name] = j.decode(h, a),
                    j.oneof && (m = f[j.oneof.name],
                    null !== m && m !== j.name && (f[m] = null),
                    f[j.oneof.name] = j.name));
                else
                    switch (h) {
                    case b.WIRE_TYPES.VARINT:
                        a.readVarint32();
                        break;
                    case b.WIRE_TYPES.BITS32:
                        a.offset += 4;
                        break;
                    case b.WIRE_TYPES.BITS64:
                        a.offset += 8;
                        break;
                    case b.WIRE_TYPES.LDELIM:
                        k = a.readVarint32(),
                        a.offset += k;
                        break;
                    case b.WIRE_TYPES.STARTGROUP:
                        for (; n(i, a); )
                            ;
                        break;
                    default:
                        throw Error("Illegal wire type for unknown field " + i + " in " + this.toString(!0) + "#decode: " + h)
                    }
            }
            for (o = 0,
            p = this._fields.length; p > o; ++o)
                if (j = this._fields[o],
                null === f[j.name])
                    if ("proto3" === this.syntax)
                        f[j.name] = j.defaultValue;
                    else {
                        if (j.required)
                            throw q = Error("Missing at least one required field for " + this.toString(!0) + ": " + j.name),
                            q["decoded"] = f,
                            q;
                        b.populateDefaults && null !== j.defaultValue && (f[j.name] = j.defaultValue)
                    }
            return f
        }
        ,
        c.Message = l,
        o = function(a, c, e, f, g, h, i, j, k, m) {
            d.call(this, a, c, h),
            this.className = "Message.Field",
            this.required = "required" === e,
            this.repeated = "repeated" === e,
            this.map = "map" === e,
            this.keyType = f || null,
            this.type = g,
            this.resolvedType = null,
            this.id = i,
            this.options = j || {},
            this.defaultValue = null,
            this.oneof = k || null,
            this.syntax = m || "proto2",
            this.originalName = this.name,
            this.element = null,
            this.keyElement = null,
            !this.builder.options["convertFieldsToCamelCase"] || this instanceof l.ExtensionField || (this.name = b.Util.toCamelCase(this.name))
        }
        ,
        p = o.prototype = Object.create(d.prototype),
        p.build = function() {
            this.element = new h(this.type,this.resolvedType,!1,this.syntax,this.name),
            this.map && (this.keyElement = new h(this.keyType,void 0,!0,this.syntax,this.name)),
            "proto3" !== this.syntax || this.repeated || this.map ? "undefined" != typeof this.options["default"] && (this.defaultValue = this.verifyValue(this.options["default"])) : this.defaultValue = h.defaultFieldValue(this.type)
        }
        ,
        p.verifyValue = function(a, c) {
            function e(a, b) {
                throw Error("Illegal value for " + d.toString(!0) + " of type " + d.type.name + ": " + a + " (" + b + ")")
            }
            var d, f, g;
            if (c = c || !1,
            d = this,
            null === a)
                return this.required && e(typeof a, "required"),
                "proto3" === this.syntax && this.type !== b.TYPES["message"] && e(typeof a, "proto3 field without field presence cannot be null"),
                null;
            if (this.repeated && !c) {
                for (Array.isArray(a) || (a = [a]),
                g = [],
                f = 0; f < a.length; f++)
                    g.push(this.element.verifyValue(a[f]));
                return g
            }
            return this.map && !c ? a instanceof b.Map ? a : (a instanceof Object || e(typeof a, "expected ProtoBuf.Map or raw object for map field"),
            new b.Map(this,a)) : (!this.repeated && Array.isArray(a) && e(typeof a, "no array expected"),
            this.element.verifyValue(a))
        }
        ,
        p.hasWirePresence = function(a, c) {
            if ("proto3" !== this.syntax)
                return null !== a;
            if (this.oneof && c[this.oneof.name] === this.name)
                return !0;
            switch (this.type) {
            case b.TYPES["int32"]:
            case b.TYPES["sint32"]:
            case b.TYPES["sfixed32"]:
            case b.TYPES["uint32"]:
            case b.TYPES["fixed32"]:
                return 0 !== a;
            case b.TYPES["int64"]:
            case b.TYPES["sint64"]:
            case b.TYPES["sfixed64"]:
            case b.TYPES["uint64"]:
            case b.TYPES["fixed64"]:
                return 0 !== a.low || 0 !== a.high;
            case b.TYPES["bool"]:
                return a;
            case b.TYPES["float"]:
            case b.TYPES["double"]:
                return 0 !== a;
            case b.TYPES["string"]:
                return a.length > 0;
            case b.TYPES["bytes"]:
                return a.remaining() > 0;
            case b.TYPES["enum"]:
                return 0 !== a;
            case b.TYPES["message"]:
                return null !== a;
            default:
                return !0
            }
        }
        ,
        p.encode = function(c, d, e) {
            var f, g, h, i, j;
            if (null === this.type || "object" != typeof this.type)
                throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
            if (null === c || this.repeated && 0 == c.length)
                return d;
            try {
                if (this.repeated)
                    if (this.options["packed"] && b.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                        for (d.writeVarint32(this.id << 3 | b.WIRE_TYPES.LDELIM),
                        d.ensureCapacity(d.offset += 1),
                        g = d.offset,
                        f = 0; f < c.length; f++)
                            this.element.encodeValue(this.id, c[f], d);
                        h = d.offset - g,
                        i = a.calculateVarint32(h),
                        i > 1 && (j = d.slice(g, d.offset),
                        g += i - 1,
                        d.offset = g,
                        d.append(j)),
                        d.writeVarint32(h, g - i)
                    } else
                        for (f = 0; f < c.length; f++)
                            d.writeVarint32(this.id << 3 | this.type.wireType),
                            this.element.encodeValue(this.id, c[f], d);
                else
                    this.map ? c.forEach(function(c, e) {
                        var g = a.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, e) + a.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, c);
                        d.writeVarint32(this.id << 3 | b.WIRE_TYPES.LDELIM),
                        d.writeVarint32(g),
                        d.writeVarint32(8 | this.keyType.wireType),
                        this.keyElement.encodeValue(1, e, d),
                        d.writeVarint32(16 | this.type.wireType),
                        this.element.encodeValue(2, c, d)
                    }, this) : this.hasWirePresence(c, e) && (d.writeVarint32(this.id << 3 | this.type.wireType),
                    this.element.encodeValue(this.id, c, d))
            } catch (k) {
                throw Error("Illegal value for " + this.toString(!0) + ": " + c + " (" + k + ")")
            }
            return d
        }
        ,
        p.calculate = function(c, d) {
            var e, f, g;
            if (c = this.verifyValue(c),
            null === this.type || "object" != typeof this.type)
                throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
            if (null === c || this.repeated && 0 == c.length)
                return 0;
            e = 0;
            try {
                if (this.repeated)
                    if (this.options["packed"] && b.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                        for (e += a.calculateVarint32(this.id << 3 | b.WIRE_TYPES.LDELIM),
                        g = 0,
                        f = 0; f < c.length; f++)
                            g += this.element.calculateLength(this.id, c[f]);
                        e += a.calculateVarint32(g),
                        e += g
                    } else
                        for (f = 0; f < c.length; f++)
                            e += a.calculateVarint32(this.id << 3 | this.type.wireType),
                            e += this.element.calculateLength(this.id, c[f]);
                else
                    this.map ? c.forEach(function(c, d) {
                        var g = a.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, d) + a.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, c);
                        e += a.calculateVarint32(this.id << 3 | b.WIRE_TYPES.LDELIM),
                        e += a.calculateVarint32(g),
                        e += g
                    }, this) : this.hasWirePresence(c, d) && (e += a.calculateVarint32(this.id << 3 | this.type.wireType),
                    e += this.element.calculateLength(this.id, c))
            } catch (h) {
                throw Error("Illegal value for " + this.toString(!0) + ": " + c + " (" + h + ")")
            }
            return e
        }
        ,
        p.decode = function(a, c, d) {
            var e, f, i, j, k, l, m, g = !this.map && a == this.type.wireType || !d && this.repeated && this.options["packed"] && a == b.WIRE_TYPES.LDELIM || this.map && a == b.WIRE_TYPES.LDELIM;
            if (!g)
                throw Error("Illegal wire type for field " + this.toString(!0) + ": " + a + " (" + this.type.wireType + " expected)");
            if (a == b.WIRE_TYPES.LDELIM && this.repeated && this.options["packed"] && b.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0 && !d) {
                for (f = c.readVarint32(),
                f = c.offset + f,
                i = []; c.offset < f; )
                    i.push(this.decode(this.type.wireType, c, !0));
                return i
            }
            if (this.map) {
                if (j = h.defaultFieldValue(this.keyType),
                e = h.defaultFieldValue(this.type),
                f = c.readVarint32(),
                c.remaining() < f)
                    throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + f + " required but got only " + c.remaining());
                for (k = c.clone(),
                k.limit = k.offset + f,
                c.offset += f; k.remaining() > 0; )
                    if (l = k.readVarint32(),
                    a = 7 & l,
                    m = l >>> 3,
                    1 === m)
                        j = this.keyElement.decode(k, a, m);
                    else {
                        if (2 !== m)
                            throw Error("Unexpected tag in map field key/value submessage");
                        e = this.element.decode(k, a, m)
                    }
                return [j, e]
            }
            return this.element.decode(c, a, this.id)
        }
        ,
        c.Message.Field = o,
        q = function(a, b, c, d, e, f, g) {
            o.call(this, a, b, c, null, d, e, f, g),
            this.extension
        }
        ,
        q.prototype = Object.create(o.prototype),
        c.Message.ExtensionField = q,
        r = function(a, b, c) {
            d.call(this, a, b, c),
            this.fields = []
        }
        ,
        c.Message.OneOf = r,
        s = function(a, b, c, d, e) {
            f.call(this, a, b, c, d, e),
            this.className = "Enum",
            this.object = null
        }
        ,
        s.getName = function(a, b) {
            var e, d, c = Object.keys(a);
            for (d = 0; d < c.length; ++d)
                if (a[e = c[d]] === b)
                    return e;
            return null
        }
        ,
        t = s.prototype = Object.create(f.prototype),
        t.build = function(a) {
            var c, d, e, f;
            if (this.object && !a)
                return this.object;
            for (c = new b.Builder.Enum,
            d = this.getChildren(s.Value),
            e = 0,
            f = d.length; f > e; ++e)
                c[d[e]["name"]] = d[e]["id"];
            return Object.defineProperty && Object.defineProperty(c, "$options", {
                value: this.buildOpt(),
                enumerable: !1
            }),
            this.object = c
        }
        ,
        c.Enum = s,
        u = function(a, b, c, e) {
            d.call(this, a, b, c),
            this.className = "Enum.Value",
            this.id = e
        }
        ,
        u.prototype = Object.create(d.prototype),
        c.Enum.Value = u,
        v = function(a, b, c, e) {
            d.call(this, a, b, c),
            this.field = e
        }
        ,
        v.prototype = Object.create(d.prototype),
        c.Extension = v,
        w = function(a, b, c, d) {
            f.call(this, a, b, c, d),
            this.className = "Service",
            this.clazz = null
        }
        ,
        x = w.prototype = Object.create(f.prototype),
        x.build = function(c) {
            return this.clazz && !c ? this.clazz : this.clazz = function(b, c) {
                var g, d = function(a) {
                    b.Builder.Service.call(this),
                    this.rpcImpl = a || function(a, b, c) {
                        setTimeout(c.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0)
                    }
                }, e = d.prototype = Object.create(b.Builder.Service.prototype), f = c.getChildren(b.Reflect.Service.RPCMethod);
                for (g = 0; g < f.length; g++)
                    !function(b) {
                        e[b.name] = function(d, e) {
                            try {
                                try {
                                    d = b.resolvedRequestType.clazz.decode(a.wrap(d))
                                } catch (f) {
                                    if (!(f instanceof TypeError))
                                        throw f
                                }
                                if (null === d || "object" != typeof d)
                                    throw Error("Illegal arguments");
                                d instanceof b.resolvedRequestType.clazz || (d = new b.resolvedRequestType.clazz(d)),
                                this.rpcImpl(b.fqn(), d, function(a, d) {
                                    if (a)
                                        return e(a),
                                        void 0;
                                    null === d && (d = "");
                                    try {
                                        d = b.resolvedResponseType.clazz.decode(d)
                                    } catch (f) {}
                                    return d && d instanceof b.resolvedResponseType.clazz ? (e(null, d),
                                    void 0) : (e(Error("Illegal response type received in service method " + c.name + "#" + b.name)),
                                    void 0)
                                })
                            } catch (f) {
                                setTimeout(e.bind(this, f), 0)
                            }
                        }
                        ,
                        d[b.name] = function(a, c, e) {
                            new d(a)[b.name](c, e)
                        }
                        ,
                        Object.defineProperty && (Object.defineProperty(d[b.name], "$options", {
                            value: b.buildOpt()
                        }),
                        Object.defineProperty(e[b.name], "$options", {
                            value: d[b.name]["$options"]
                        }))
                    }(f[g]);
                return Object.defineProperty && (Object.defineProperty(d, "$options", {
                    value: c.buildOpt()
                }),
                Object.defineProperty(e, "$options", {
                    value: d["$options"]
                }),
                Object.defineProperty(d, "$type", {
                    value: c
                }),
                Object.defineProperty(e, "$type", {
                    value: c
                })),
                d
            }(b, this)
        }
        ,
        c.Service = w,
        y = function(a, b, c, e) {
            d.call(this, a, b, c),
            this.className = "Service.Method",
            this.options = e || {}
        }
        ,
        z = y.prototype = Object.create(d.prototype),
        z.buildOpt = g.buildOpt,
        c.Service.Method = y,
        A = function(a, b, c, d, e, f, g, h) {
            y.call(this, a, b, c, h),
            this.className = "Service.RPCMethod",
            this.requestName = d,
            this.responseName = e,
            this.requestStream = f,
            this.responseStream = g,
            this.resolvedRequestType = null,
            this.resolvedResponseType = null
        }
        ,
        A.prototype = Object.create(y.prototype),
        c.Service.RPCMethod = A,
        c
    }(c),
    c.Builder = function(a, b, c) {
        function f(a) {
            a["messages"] && a["messages"].forEach(function(b) {
                b["syntax"] = a["syntax"],
                f(b)
            }),
            a["enums"] && a["enums"].forEach(function(b) {
                b["syntax"] = a["syntax"]
            })
        }
        var d = function(a) {
            this.ns = new c.Namespace(this,null,""),
            this.ptr = this.ns,
            this.resolved = !1,
            this.result = null,
            this.files = {},
            this.importRoot = null,
            this.options = a || {}
        }
          , e = d.prototype;
        return d.isMessage = function(a) {
            return "string" != typeof a["name"] ? !1 : "undefined" != typeof a["values"] || "undefined" != typeof a["rpc"] ? !1 : !0
        }
        ,
        d.isMessageField = function(a) {
            return "string" != typeof a["rule"] || "string" != typeof a["name"] || "string" != typeof a["type"] || "undefined" == typeof a["id"] ? !1 : !0
        }
        ,
        d.isEnum = function(a) {
            return "string" != typeof a["name"] ? !1 : "undefined" != typeof a["values"] && Array.isArray(a["values"]) && 0 !== a["values"].length ? !0 : !1
        }
        ,
        d.isService = function(a) {
            return "string" == typeof a["name"] && "object" == typeof a["rpc"] && a["rpc"] ? !0 : !1
        }
        ,
        d.isExtend = function(a) {
            return "string" != typeof a["ref"] ? !1 : !0
        }
        ,
        e.reset = function() {
            return this.ptr = this.ns,
            this
        }
        ,
        e.define = function(a) {
            if ("string" != typeof a || !b.TYPEREF.test(a))
                throw Error("illegal namespace: " + a);
            return a.split(".").forEach(function(a) {
                var b = this.ptr.getChild(a);
                null === b && this.ptr.addChild(b = new c.Namespace(this,this.ptr,a)),
                this.ptr = b
            }, this),
            this
        }
        ,
        e.create = function(b) {
            var e, f, g, h, i;
            if (!b)
                return this;
            if (Array.isArray(b)) {
                if (0 === b.length)
                    return this;
                b = b.slice()
            } else
                b = [b];
            for (e = [b]; e.length > 0; ) {
                if (b = e.pop(),
                !Array.isArray(b))
                    throw Error("not a valid namespace: " + JSON.stringify(b));
                for (; b.length > 0; ) {
                    if (f = b.shift(),
                    d.isMessage(f)) {
                        if (g = new c.Message(this,this.ptr,f["name"],f["options"],f["isGroup"],f["syntax"]),
                        h = {},
                        f["oneofs"] && Object.keys(f["oneofs"]).forEach(function(a) {
                            g.addChild(h[a] = new c.Message.OneOf(this,g,a))
                        }, this),
                        f["fields"] && f["fields"].forEach(function(a) {
                            if (null !== g.getChild(0 | a["id"]))
                                throw Error("duplicate or invalid field id in " + g.name + ": " + a["id"]);
                            if (a["options"] && "object" != typeof a["options"])
                                throw Error("illegal field options in " + g.name + "#" + a["name"]);
                            var b = null;
                            if ("string" == typeof a["oneof"] && !(b = h[a["oneof"]]))
                                throw Error("illegal oneof in " + g.name + "#" + a["name"] + ": " + a["oneof"]);
                            a = new c.Message.Field(this,g,a["rule"],a["keytype"],a["type"],a["name"],a["id"],a["options"],b,f["syntax"]),
                            b && b.fields.push(a),
                            g.addChild(a)
                        }, this),
                        i = [],
                        f["enums"] && f["enums"].forEach(function(a) {
                            i.push(a)
                        }),
                        f["messages"] && f["messages"].forEach(function(a) {
                            i.push(a)
                        }),
                        f["services"] && f["services"].forEach(function(a) {
                            i.push(a)
                        }),
                        f["extensions"] && (g.extensions = "number" == typeof f["extensions"][0] ? [f["extensions"]] : f["extensions"]),
                        this.ptr.addChild(g),
                        i.length > 0) {
                            e.push(b),
                            b = i,
                            i = null,
                            this.ptr = g,
                            g = null;
                            continue
                        }
                        i = null
                    } else if (d.isEnum(f))
                        g = new c.Enum(this,this.ptr,f["name"],f["options"],f["syntax"]),
                        f["values"].forEach(function(a) {
                            g.addChild(new c.Enum.Value(this,g,a["name"],a["id"]))
                        }, this),
                        this.ptr.addChild(g);
                    else if (d.isService(f))
                        g = new c.Service(this,this.ptr,f["name"],f["options"]),
                        Object.keys(f["rpc"]).forEach(function(a) {
                            var b = f["rpc"][a];
                            g.addChild(new c.Service.RPCMethod(this,g,a,b["request"],b["response"],!!b["request_stream"],!!b["response_stream"],b["options"]))
                        }, this),
                        this.ptr.addChild(g);
                    else {
                        if (!d.isExtend(f))
                            throw Error("not a valid definition: " + JSON.stringify(f));
                        if (g = this.ptr.resolve(f["ref"], !0))
                            f["fields"].forEach(function(b) {
                                var d, e, f, h;
                                if (null !== g.getChild(0 | b["id"]))
                                    throw Error("duplicate extended field id in " + g.name + ": " + b["id"]);
                                if (g.extensions && (d = !1,
                                g.extensions.forEach(function(a) {
                                    b["id"] >= a[0] && b["id"] <= a[1] && (d = !0)
                                }),
                                !d))
                                    throw Error("illegal extended field id in " + g.name + ": " + b["id"] + " (not within valid ranges)");
                                e = b["name"],
                                this.options["convertFieldsToCamelCase"] && (e = a.Util.toCamelCase(e)),
                                f = new c.Message.ExtensionField(this,g,b["rule"],b["type"],this.ptr.fqn() + "." + e,b["id"],b["options"]),
                                h = new c.Extension(this,this.ptr,b["name"],f),
                                f.extension = h,
                                this.ptr.addChild(h),
                                g.addChild(f)
                            }, this);
                        else if (!/\.?google\.protobuf\./.test(f["ref"]))
                            throw Error("extended message " + f["ref"] + " is not defined")
                    }
                    f = null,
                    g = null
                }
                b = null,
                this.ptr = this.ptr.parent
            }
            return this.resolved = !1,
            this.result = null,
            this
        }
        ,
        e["import"] = function(b, c) {
            var e, g, h, i, j, k, l, m, d = "/";
            if ("string" == typeof c) {
                if (a.Util.IS_NODE && (c = require("path")["resolve"](c)),
                this.files[c] === !0)
                    return this.reset();
                this.files[c] = !0
            } else if ("object" == typeof c) {
                if (e = c.root,
                a.Util.IS_NODE && (e = require("path")["resolve"](e)),
                (e.indexOf("\\") >= 0 || c.file.indexOf("\\") >= 0) && (d = "\\"),
                g = e + d + c.file,
                this.files[g] === !0)
                    return this.reset();
                this.files[g] = !0
            }
            if (b["imports"] && b["imports"].length > 0) {
                for (i = !1,
                "object" == typeof c ? (this.importRoot = c["root"],
                i = !0,
                h = this.importRoot,
                c = c["file"],
                (h.indexOf("\\") >= 0 || c.indexOf("\\") >= 0) && (d = "\\")) : "string" == typeof c ? this.importRoot ? h = this.importRoot : c.indexOf("/") >= 0 ? (h = c.replace(/\/[^\/]*$/, ""),
                "" === h && (h = "/")) : c.indexOf("\\") >= 0 ? (h = c.replace(/\\[^\\]*$/, ""),
                d = "\\") : h = "." : h = null,
                j = 0; j < b["imports"].length; j++)
                    if ("string" == typeof b["imports"][j]) {
                        if (!h)
                            throw Error("cannot determine import root");
                        if (k = b["imports"][j],
                        "google/protobuf/descriptor.proto" === k)
                            continue;
                        if (k = h + d + k,
                        this.files[k] === !0)
                            continue;
                        if (/\.proto$/i.test(k) && !a.DotProto && (k = k.replace(/\.proto$/, ".json")),
                        l = a.Util.fetch(k),
                        null === l)
                            throw Error("failed to import '" + k + "' in '" + c + "': file not found");
                        /\.json$/i.test(k) ? this["import"](JSON.parse(l + ""), k) : this["import"](a.DotProto.Parser.parse(l), k)
                    } else
                        c ? /\.(\w+)$/.test(c) ? this["import"](b["imports"][j], c.replace(/^(.+)\.(\w+)$/, function(a, b, c) {
                            return b + "_import" + j + "." + c
                        })) : this["import"](b["imports"][j], c + "_import" + j) : this["import"](b["imports"][j]);
                i && (this.importRoot = null)
            }
            return b["package"] && this.define(b["package"]),
            b["syntax"] && f(b),
            m = this.ptr,
            b["options"] && Object.keys(b["options"]).forEach(function(a) {
                m.options[a] = b["options"][a]
            }),
            b["messages"] && (this.create(b["messages"]),
            this.ptr = m),
            b["enums"] && (this.create(b["enums"]),
            this.ptr = m),
            b["services"] && (this.create(b["services"]),
            this.ptr = m),
            b["extends"] && this.create(b["extends"]),
            this.reset()
        }
        ,
        e.resolveAll = function() {
            var d;
            if (null == this.ptr || "object" == typeof this.ptr.type)
                return this;
            if (this.ptr instanceof c.Namespace)
                this.ptr.children.forEach(function(a) {
                    this.ptr = a,
                    this.resolveAll()
                }, this);
            else if (this.ptr instanceof c.Message.Field) {
                if (b.TYPE.test(this.ptr.type))
                    this.ptr.type = a.TYPES[this.ptr.type];
                else {
                    if (!b.TYPEREF.test(this.ptr.type))
                        throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                    if (d = (this.ptr instanceof c.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, !0),
                    !d)
                        throw Error("unresolvable type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                    if (this.ptr.resolvedType = d,
                    d instanceof c.Enum) {
                        if (this.ptr.type = a.TYPES["enum"],
                        "proto3" === this.ptr.syntax && "proto3" !== d.syntax)
                            throw Error("proto3 message cannot reference proto2 enum")
                    } else {
                        if (!(d instanceof c.Message))
                            throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                        this.ptr.type = d.isGroup ? a.TYPES["group"] : a.TYPES["message"]
                    }
                }
                if (this.ptr.map) {
                    if (!b.TYPE.test(this.ptr.keyType))
                        throw Error("illegal key type for map field in " + this.ptr.toString(!0) + ": " + this.ptr.keyType);
                    this.ptr.keyType = a.TYPES[this.ptr.keyType]
                }
            } else if (this.ptr instanceof a.Reflect.Service.Method) {
                if (!(this.ptr instanceof a.Reflect.Service.RPCMethod))
                    throw Error("illegal service type in " + this.ptr.toString(!0));
                if (d = this.ptr.parent.resolve(this.ptr.requestName, !0),
                !(d && d instanceof a.Reflect.Message))
                    throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.requestName);
                if (this.ptr.resolvedRequestType = d,
                d = this.ptr.parent.resolve(this.ptr.responseName, !0),
                !(d && d instanceof a.Reflect.Message))
                    throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.responseName);
                this.ptr.resolvedResponseType = d
            } else if (!(this.ptr instanceof a.Reflect.Message.OneOf || this.ptr instanceof a.Reflect.Extension || this.ptr instanceof a.Reflect.Enum.Value))
                throw Error("illegal object in namespace: " + typeof this.ptr + ": " + this.ptr);
            return this.reset()
        }
        ,
        e.build = function(a) {
            var b, c, d;
            if (this.reset(),
            this.resolved || (this.resolveAll(),
            this.resolved = !0,
            this.result = null),
            null === this.result && (this.result = this.ns.build()),
            !a)
                return this.result;
            for (b = "string" == typeof a ? a.split(".") : a,
            c = this.result,
            d = 0; d < b.length; d++) {
                if (!c[b[d]]) {
                    c = null;
                    break
                }
                c = c[b[d]]
            }
            return c
        }
        ,
        e.lookup = function(a, b) {
            return a ? this.ns.resolve(a, b) : this.ns
        }
        ,
        e.toString = function() {
            return "Builder"
        }
        ,
        d.Message = function() {}
        ,
        d.Enum = function() {}
        ,
        d.Service = function() {}
        ,
        d
    }(c, c.Lang, c.Reflect),
    c.Map = function(a, b) {
        function e(a) {
            var b = 0;
            return {
                next: function() {
                    return b < a.length ? {
                        done: !1,
                        value: a[b++]
                    } : {
                        done: !0
                    }
                }
            }
        }
        var c = function(a, c) {
            var d, e, f, g;
            if (!a.map)
                throw Error("field is not a map");
            if (this.field = a,
            this.keyElem = new b.Element(a.keyType,null,!0,a.syntax),
            this.valueElem = new b.Element(a.type,a.resolvedType,!1,a.syntax),
            this.map = {},
            Object.defineProperty(this, "size", {
                get: function() {
                    return Object.keys(this.map).length
                }
            }),
            c)
                for (d = Object.keys(c),
                e = 0; e < d.length; e++)
                    f = this.keyElem.valueFromString(d[e]),
                    g = this.valueElem.verifyValue(c[d[e]]),
                    this.map[this.keyElem.valueToString(f)] = {
                        key: f,
                        value: g
                    }
        }
          , d = c.prototype;
        return d.clear = function() {
            this.map = {}
        }
        ,
        d["delete"] = function(a) {
            var b = this.keyElem.valueToString(this.keyElem.verifyValue(a))
              , c = b in this.map;
            return delete this.map[b],
            c
        }
        ,
        d.entries = function() {
            var d, c, a = [], b = Object.keys(this.map);
            for (c = 0; c < b.length; c++)
                a.push([(d = this.map[b[c]]).key, d.value]);
            return e(a)
        }
        ,
        d.keys = function() {
            var c, a = [], b = Object.keys(this.map);
            for (c = 0; c < b.length; c++)
                a.push(this.map[b[c]].key);
            return e(a)
        }
        ,
        d.values = function() {
            var c, a = [], b = Object.keys(this.map);
            for (c = 0; c < b.length; c++)
                a.push(this.map[b[c]].value);
            return e(a)
        }
        ,
        d.forEach = function(a, b) {
            var e, d, c = Object.keys(this.map);
            for (d = 0; d < c.length; d++)
                a.call(b, (e = this.map[c[d]]).value, e.key, this)
        }
        ,
        d.set = function(a, b) {
            var c = this.keyElem.verifyValue(a)
              , d = this.valueElem.verifyValue(b);
            return this.map[this.keyElem.valueToString(c)] = {
                key: c,
                value: d
            },
            this
        }
        ,
        d.get = function(a) {
            var b = this.keyElem.valueToString(this.keyElem.verifyValue(a));
            return b in this.map ? this.map[b].value : void 0
        }
        ,
        d.has = function(a) {
            var b = this.keyElem.valueToString(this.keyElem.verifyValue(a));
            return b in this.map
        }
        ,
        c
    }(c, c.Reflect),
    c.loadProto = function(a, b, d) {
        return ("string" == typeof b || b && "string" == typeof b["file"] && "string" == typeof b["root"]) && (d = b,
        b = void 0),
        c.loadJson(c.DotProto.Parser.parse(a), b, d)
    }
    ,
    c.protoFromString = c.loadProto,
    c.loadProtoFile = function(a, b, d) {
        if (b && "object" == typeof b ? (d = b,
        b = null) : b && "function" == typeof b || (b = null),
        b)
            return c.Util.fetch("string" == typeof a ? a : a["root"] + "/" + a["file"], function(e) {
                if (null === e)
                    return b(Error("Failed to fetch file")),
                    void 0;
                try {
                    b(null, c.loadProto(e, d, a))
                } catch (f) {
                    b(f)
                }
            });
        var e = c.Util.fetch("object" == typeof a ? a["root"] + "/" + a["file"] : a);
        return null === e ? null : c.loadProto(e, d, a)
    }
    ,
    c.protoFromFile = c.loadProtoFile,
    c.newBuilder = function(a) {
        return a = a || {},
        "undefined" == typeof a["convertFieldsToCamelCase"] && (a["convertFieldsToCamelCase"] = c.convertFieldsToCamelCase),
        "undefined" == typeof a["populateAccessors"] && (a["populateAccessors"] = c.populateAccessors),
        new c.Builder(a)
    }
    ,
    c.loadJson = function(a, b, d) {
        return ("string" == typeof b || b && "string" == typeof b["file"] && "string" == typeof b["root"]) && (d = b,
        b = null),
        b && "object" == typeof b || (b = c.newBuilder()),
        "string" == typeof a && (a = JSON.parse(a)),
        b["import"](a, d),
        b.resolveAll(),
        b
    }
    ,
    c.loadJsonFile = function(a, b, d) {
        if (b && "object" == typeof b ? (d = b,
        b = null) : b && "function" == typeof b || (b = null),
        b)
            return c.Util.fetch("string" == typeof a ? a : a["root"] + "/" + a["file"], function(e) {
                if (null === e)
                    return b(Error("Failed to fetch file")),
                    void 0;
                try {
                    b(null, c.loadJson(JSON.parse(e), d, a))
                } catch (f) {
                    b(f)
                }
            });
        var e = c.Util.fetch("object" == typeof a ? a["root"] + "/" + a["file"] : a);
        return null === e ? null : c.loadJson(JSON.parse(e), d, a)
    }
    ,
    c
});
