#!/bin/bash
cd "$(dirname "$0")"
xdg-open http://localhost:8000 >/dev/null 2>&1 &
python3 -m http.server 8000