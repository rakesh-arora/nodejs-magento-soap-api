import magento, { updateProductAttributeValues } from 'src/lib/magentoClient'

export const callUpdateProductAttributeValues = async ({prod_id, attr_val}) => {
    magento.login(updateProductAttributeValues(prod_id, attr_val))
}