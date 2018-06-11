function varIntEncode(a) {
  var d,
    b = new Array(1),
    c = 0
  do (d = a % 128), (a >>= 7), a > 0 && (d |= 128), (b[c++] = d)
  while (a > 0 && 4 > c)
  return b
}

/**
 *
 * @param {Buffer} buf
 * @param {Number} offset
 */
function varIntDecode(buf, offset = 0) {
  let result = 0
  let index = 1
  let byte
  do {
    byte = buf.readUInt8(offset)
    result += (127 & byte) * index
    index *= 128
    offset++
  } while ((byte & 128) != 0)
  return { result, offset }
}

function getUuid(t, e) {
  var i,
    n = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
    s = []
  if (((e = e || n.length), t)) for (i = 0; i < t; i++) s[i] = n[0 | (Math.random() * e)]
  else {
    var o
    for (s[8] = s[13] = s[18] = s[23] = '-', s[14] = '4', i = 0; i < 36; i++)
      s[i] || ((o = 0 | (16 * Math.random())), (s[i] = n[19 == i ? (3 & o) | 8 : o]))
  }
  return s.join('')
}

module.exports = {
  getUuid,
  varIntEncode,
  varIntDecode
}
