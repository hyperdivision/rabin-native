const assert = require('nanoassert')
const binding = require('node-gyp-build')(__dirname)

module.exports = class Rabin {
  constructor (min = 512 * 1024, max = 8 * 1024 * 1024, bits = 20, chunksBufferSize = 1024) {
    assert(min >>> 0 === min, 'min must be uint 32')
    assert(min > 0, 'min must be greater than 0')
    assert(max >>> 0 === max, 'max must be uint 32')
    assert(max > 0, 'max must be greater than 0')
    assert(Number.isInteger(bits), 'bits must be integer')
    assert(bits > 0 && bits <= 53, 'bits must be in (0, 53]')

    this._handle = Buffer.alloc(binding.sizeof_rabin_native_t)
    this.chunks = new Uint32Array(chunksBufferSize)

    binding.rabin_native_init(this._handle, min, max, bits, Buffer.from(this.chunks.buffer, this.chunks.byteOffset, chunksBufferSize * 4))
  }

  push (data) {
    return binding.rabin_native_next_chunk(this._handle, data)
  }

  finalise () {
    return binding.rabin_native_finalize(this._handle)
  }
}
