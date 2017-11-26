This repository uses the Magento SOAP API wrapper to connect with the magento app. By using this wrapper one is able to login into magento using their soap api and can update the particular product using their Id and put the values of their attribute (which should have multiselect fields).

By using
<blockquote>
    // Magento product id
    var productId = ''

    // Product attribute values
    var attributeValue = ['val1', 'val2', 'val3', 'val4']
</blockquote>