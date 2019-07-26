#include <node_api.h>
#include <napi-macros.h>
#include "deps/rabin-cdc/rabin.h"

typedef struct {
  uint32_t chunk_lengths[1024];
  struct rabin_t hash;
} rabin_native_t;

NAPI_METHOD(rabin_native_init) {
  NAPI_ARGV(1)
  NAPI_ARGV_BUFFER_CAST(rabin_native_t *, self, 0)

  rabin_init(&(self->hash));

  return NULL;
}

NAPI_METHOD(rabin_native_next_chunk) {
  NAPI_ARGV(2)
  NAPI_ARGV_BUFFER_CAST(rabin_native_t *, self, 0)
  NAPI_ARGV_BUFFER(buf, 1)

  struct rabin_t *h = &(self->hash);
  uint32_t start = 0;

  while (1) {
    int remaining = rabin_next_chunk(h, (uint8_t *) buf, buf_len);

    if (remaining < 0) {
      self->chunk_lengths[start] = 0;
      break;
    }

    buf_len -= remaining;
    buf += remaining;

    self->chunk_lengths[start++] = last_chunk.length;
  }

  NAPI_RETURN_UINT32(start)
}

NAPI_METHOD(rabin_native_finalize) {
  NAPI_ARGV(1)
  NAPI_ARGV_BUFFER_CAST(rabin_native_t *, self, 0)

  uint32_t start = 0;

  if (rabin_finalize(&(self->hash)) != NULL) {
    self->chunk_lengths[start++] = last_chunk.length;
  }

  NAPI_RETURN_UINT32(start)
}

NAPI_INIT() {
  NAPI_EXPORT_SIZEOF(rabin_native_t)
  NAPI_EXPORT_FUNCTION(rabin_native_init)
  NAPI_EXPORT_FUNCTION(rabin_native_next_chunk)
}
