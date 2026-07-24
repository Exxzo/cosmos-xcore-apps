const fs = require('fs')
const configFile = require('./config.json')

let servappsJSON = []

let repoURL = configFile.pageUrl
let servappsFolder = configFile.servappsFolder

// list all directories in the directory servapps and compile them in servapps.json

const servapps = fs.readdirSync(`./${servappsFolder}`).filter(file => fs.lstatSync(`./${servappsFolder}/${file}`).isDirectory())

function resolveIcon(appDir) {
  for (const name of ['icon.png', 'icon.jpg', 'icon.jpeg', 'icon.webp', 'icon.svg', 'icon.ico']) {
    if (fs.existsSync(`${appDir}/${name}`)) {
      return name
    }
  }
  return null
}

for (const file of servapps) {
  const appDir = `./${servappsFolder}/${file}`
  const servapp = require(`${appDir}/description.json`)
  servapp.id = file
  servapp.screenshots = []
  servapp.artefacts = {}

  // list all screenshots in the directory servapps/${file}/screenshots
  const screenshotsDir = `${appDir}/screenshots`
  if (fs.existsSync(screenshotsDir)) {
    const screenshots = fs.readdirSync(screenshotsDir)
    for (const screenshot of screenshots) {
      servapp.screenshots.push(`${repoURL}/${servappsFolder}/${file}/screenshots/${screenshot}`)
    }
  }

  if (fs.existsSync(`${appDir}/artefacts`)) {
    const artefacts = fs.readdirSync(`${appDir}/artefacts`)
    for (const artefact of artefacts) {
      servapp.artefacts[artefact] = (`${repoURL}/${servappsFolder}/${file}/artefacts/${artefact}`)
    }
  }

  let composeFileName = 'cosmos-compose.json'
  if (!fs.existsSync(`${appDir}/cosmos-compose.json`)) {
    composeFileName = 'docker-compose.yml'
  }
  if (!fs.existsSync(`${appDir}/${composeFileName}`)) {
    console.error(`No compose file found for ${file}`)
    continue
  }

  const iconName = resolveIcon(appDir)
  if (!iconName) {
    console.error(`No icon found for ${file}`)
    continue
  }

  servapp.icon = `${repoURL}/${servappsFolder}/${file}/${iconName}`
  servapp.compose = `${repoURL}/${servappsFolder}/${file}/${composeFileName}`

  servappsJSON.push(servapp)
}

// add showcase
const _sc = ['Jellyfin', 'Home Assistant', 'Nextcloud']
const showcases = servappsJSON.filter((app) => _sc.includes(app.name))

let apps = {
  'source': configFile.marketIndexUrl,
  'showcase': showcases,
  'all': servappsJSON
}

fs.writeFileSync('./servapps.json', JSON.stringify(servappsJSON, null, 2))
fs.writeFileSync('./index.json', JSON.stringify(apps, null, 2))
