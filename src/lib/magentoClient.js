import log from 'llog'
import MagentoAPI from 'magento'
import config from 'src/config'

var async = require('async')

// Rejecting check on self signed certificate (SSL) and allowing any certificate
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const magento = new MagentoAPI({
  host: config.magento.host,
  port: config.magento.port,
  path: config.magento.path,
  login: config.magento.username,
  pass: config.magento.pass,
  secure: config.magento.secure,
  parallelLimit: config.magento.parallelLimit
})

// used as callback to magento.login
export const updateProductAttributeValues = (prod_id, attr_val) => {
    return (err, sessId) => {
        if (err) {
            // deal with error
            log.info(err)
        return
        }
        
        // Login success
        log.info('Login SessionId: ' + sessId)

        // Array to hold attribute's integer values
        var attributeValue = []

        // Get array list of attribute's integer value using string label
        magento.catalogProductAttribute.options({
            attributeId: 'attributeName'
        }, function(err, res) {
            if (err) {
                log.info(err)
            } else {
                res.reduce(function (cur, val, ind, arr) {
                    var label = val.label
                    var value = val.value
                    if (attr_val.find((attribute) => attribute === label)) {
                        attributeValue.push(value)
                    }
                }, 0)
                if (attributeValue.length > 0) {
                    updateAttribute(attributeValue, function(err, data) {
                        if (err) {
                            log.info(err)
                        } else {
                            log.info('Product Attribute Updated !!')
                        }
                    })
                } else {
                    log.info('The given attribute\'s value does not exist.')
                }
            } // end else
        })

        // Update attribute
        function updateAttribute(values, cb) {
            // convert array to comma separated
            var val = values.join(',')
            magento.catalogProduct.update({
                id: prod_id,
                data: {attributeNameHere: val}
                // storeView: val // optional
            }, function(err, res) { // res will always true if no error
                if (err) {
                    log.info(err)
                } else {
                    log.info('updated product attribute.')
                }
            })
        }
    }
}

export const deleteProductAttributeValues = (prod_id, attr_val) => {
    return (err, sessId) => {
        if (err) {
            // deal with error
            log.info(err)
        return
        }
    
        // use magento
        magento.catalogProductAttribute.options({
            attributeId: 'attributeName'
        }, function(err, res) {
            if (err) {
                log.info(err)
            } else {
                res.reduce(function (cur, val, ind, arr) {
                    if (attr_val.find((attribute) => attribute === val.label)) {
                        removeAttributeValue(val.value)
                    }
                }, 0)
            }
        })
    
        function removeAttributeValue(val) {
            magento.catalogProductAttribute.removeOption({
                attribute: 'attributeName',
                optionId: val
            }, function(err, res) { // res will always true if no error
                if (err) {
                    log.info(err)
                } else {
                    log.info('Attribute value deleted.')
                }
            })
        }
    }
}

export default magento
