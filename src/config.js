import log from 'llog'
import cconfig from 'cconfig'
import { name, version } from '../package.json'

log.debug('creating config')

const defaultConfig = {
    appName: name,
    appVersion: version,
    Port: 3030,

    development: {
        magento: {
            host: 'magento',
            port: 80,
            path: '/api/xmlrpc/',
            username: 'mandatory',
            pass: 'mandatory',
            secure: false,
            parallelLimit: Infinity
        }
    },

    test: {
        magento: {
            host: 'magento',
            port: 80,
            path: '/api/xmlrpc/',
            username: 'mandatory',
            pass: 'mandatory',
            secure: false,
            parallelLimit: Infinity
        }
    }
}

// Add env variables on top of defaultConfig and add env specific settings
let cascadedConfig = cconfig(defaultConfig)

// Anything which comes from command line is a string,
// Need a type then convert it here by the key name
const mainConfig = Object.keys(cascadedConfig).reduce((mainConfig, key) => {
    let value = cascadedConfig[key]

    switch (key) {
        case 'Port':
        value = parseInt(value, 10)
        break

        default:
        break
    }

    mainConfig[key] = value
    return mainConfig
}, {})

export default mainConfig
