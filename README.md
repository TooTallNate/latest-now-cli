# latest-now-cli

[![github-src]][github-href]

Download **bleeding-edge** now-cli binary from CircleCI's artifacts service.

## Usage

- `/download?branch=now-dev&bin=now-alpine` Redirect to last successful built binary
- `/download/16226/now-linux` Download `now-linux` from build #16226

> `bin` could be: `now-alpine`, `now-linux`, `now-macos`, `now-win.exe`

## Gimme links!

- `canary` branch
  - [/download?branch=canary&bin=now-alpine](/download?branch=canary&bin=now-alpine)
  - [/download?branch=canary&bin=now-linux](/download?branch=canary&bin=now-linux)
  - [/download?branch=canary&bin=now-macos](/download?branch=canary&bin=now-macos)
  - [/download?branch=canary&bin=now-win.exe](/download?branch=canary&bin=now-win.exe)

- `now-dev` branch
  - [/download?branch=now-dev&bin=now-alpine](/download?branch=now-dev&bin=now-alpine)
  - [/download?branch=now-dev&bin=now-linux](/download?branch=now-dev&bin=now-linux)
  - [/download?branch=now-dev&bin=now-macos](/download?branch=now-dev&bin=now-macos)
  - [/download?branch=now-dev&bin=now-win.exe](/download?branch=now-dev&bin=now-win.exe)

## How to run

After download `now-macos` to `~/Downloads` directory:

```bash
chmod +x ~/Downloads/now-macos
~/Downloads/now-macos --help
```

[github-src]: https://badgen.net/badge//amio%2Flatest-now-cli/black?icon=github
[github-href]: https://github.com/amio/latest-now-cli
