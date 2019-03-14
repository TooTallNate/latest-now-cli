const { join } = require('path')
const { send } = require('micro')
const { router, get } = require('micro-fork')
const serveMarked = require('serve-marked')

const API_PREFIX = 'https://circleci.com/api/v1.1/project/github/zeit/now-cli'

const readme = serveMarked(join(__dirname, 'README.md'), {
  title: 'latest-now-cli',
  inlineCSS: `
    .markdown-body h1 + p {
      text-align: center;
      margin: -2.6rem 0 4em 0;
    }
  `
})

const binNameFromUA = (ua) => {
  if (ua.includes('Macintosh')) return 'now-macos'
  if (ua.includes('Windows')) return 'now-win.exe'
  if (ua.includes('Linux')) return 'now-linux'
}

const downloadLatestBuild = async (req, res) => {
  const binName = req.query.bin || binNameFromUA(req.headers['user-agent'])

  if (!binName || !req.query.branch) {
    return send(res, 400)
  }

  const url = `${API_PREFIX}/tree/${req.query.branch}`
  const builds = await fetch(url).then(res => res.json())

  if (builds.length) {
    const buildNum = builds[0].previous_successful_build.build_num

    res.setHeader('Location', `/download/${buildNum}/${binName}`)
    return send(res, 302)
  }

  send(res, 404)
}

const downloadBuild = async (req, res) => {
  const { build_num, bin_name = 'now-linux' } = req.params

  res.setHeader('Cache-Control', 'public, s-maxage=604800')

  if (!build_num) {
    return send(res, 400)
  }

  const url = `${API_PREFIX}/${build_num}/artifacts`
  const artifacts = await fetch(url).then(res => res.json())

  if (artifacts instanceof Array) {
    const found = artifacts.find(file => file.path.endsWith(bin_name))
    if (found) {
      console.log(`[${build_num}/${bin_name}]`, found.url)

      res.setHeader('Location', found.url)
      send(res, 302)
    }
  }

  console.error(`[404] ${req.url}`);
  send(res, 404)
}

module.exports = router()(
  get('/', readme),
  get('/download', downloadLatestBuild),
  get('/download/:build_num/:bin_name', downloadBuild)
);
