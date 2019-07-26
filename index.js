const binding = require('node-gyp-build')(__dirname)

module.exports = class Rabin {
  constructor () {
    this._handle = Buffer.alloc(binding.sizeof_rabin_native_t)
    this.chunks = new Uint32Array(this._handle.buffer, this._handle.byteOffset, 1024)

    binding.rabin_native_init(this._handle)
  }

  push (data) {
    return binding.rabin_native_next_chunk(this._handle, data)
  }

  finalise () {
    return binding.rabin_native_finalize(this._handle)
  }
}
