# rabin-native

Native bindings for [rabin-cdc](https://github.com/fd0/rabin-cdc)

```
npm install rabin-native
```

## Usage

``` js
const Rabin = require('rabin-native')

const r = new Rabin()

const chunks = r.push(Buffer.from('some chunk of data'))

for (let i = 0; i < chunks; i++) {
  console.log('chunk length: ' + r.chunks[i])
}
```

## API

#### `rabin = new Rabin()`

Makes a new rabin instance

#### `chunkCount = rabin.push(buffer)`

Push data to the chunker. Returns the amount of chunks found.

#### `rabin.chunks`

A Uint32Array containing the length of the chunks found.

#### `chunks = rabin.finalise()`

Finalises the chunker. Call this when your input stream is done.
Returns the remaining chunk count.

## License

MIT
