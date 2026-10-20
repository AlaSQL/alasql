#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

rm -fr build/
mkdir build/


bun build myCode.js   --target node  --outfile build/myCode.bundle.js --external "react-native-*"

bun build myCodeIsolate.js  --target node  --outfile build/myCodeIsolate.bundle.js

echo "Built precompileJS examples into ./build:" >&2
ls -1 build >&2
