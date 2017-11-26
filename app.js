import log from 'llog'
import {callUpdateProductAttributeValues, callDeleteProductAttributeValues} from 'src/lib/call'

// Magento product id
var productId = ''

// Product attribute values
var attributeValue = ['val1', 'val2', 'val3', 'val4']

// Update product attribute values, Attribute should be Multiselect field
callUpdateProductAttributeValues({prod_id: productId, attr_val: dVal})