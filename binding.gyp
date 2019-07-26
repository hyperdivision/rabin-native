{
  "targets": [{
    "target_name": "rabin_native",
    "include_dirs": [
      "<!(node -e \"require('napi-macros')\")",
    ],
    "sources": [
      "binding.c",
      "deps/rabin-cdc/rabin.c",
    ]
  }]
}
