const TYPE_RESPONSE = {
    'ONE' : 'one',
    'LIST' : 'list'
}

const buildResponse = ({...params}) => {
    const {type} = params

    switch (type) {
        case TYPE_RESPONSE.ONE:
            const product = params.data
            return {
                id: product.id,
                name: product.name.en,
                price: `£${product.price.gross / product.price.divisor}`,
                designer: product.brand.name.en,
                onSale : product.onSale,
                sizes: product.saleableStandardSizes,
                badges: product.badges,
                images: {
                    outfit: `//cache.net-a-porter.com/images/products/${product.id}/${product.id}_ou_sl.jpg`,
                    small: `//cache.net-a-porter.com/images/products/${product.id}/${product.id}_in_sl.jpg`,
                    large: `//cache.net-a-porter.com/images/products/${product.id}/${product.id}'_in_pp.jpg`
                }
            }

        case TYPE_RESPONSE.LIST:
            const {data, offset, limit, total} = params
            return {
                offset: offset,
                limit: limit,
                total: total,
                schemes: data.metadata.schemes,
                filters: [
                    {
                        title: 'Sizes',
                        data: data.metadata.saleableStandardSizeFacets
                    }
                ],
                data: data.data.slice(offset, offset+limit).map(function(product) {
                    // Simplify payload - more data available in fixture
                    return {
                        id: product.id,
                        name: product.name.en,
                        price: `£${product.price.gross / product.price.divisor}`,
                        designer: product.brand.name.en,
                        onSale : product.onSale,
                        sizes: product.saleableStandardSizes,
                        badges: product.badges,
                        images: {
                            outfit: `//cache.net-a-porter.com/images/products/${product.id}/${product.id}_ou_sl.jpg`,
                            small: `//cache.net-a-porter.com/images/products/${product.id}/${product.id}_in_sl.jpg`,
                            large: `//cache.net-a-porter.com/images/products/${product.id}/${product.id}'_in_pp.jpg`
                        }
                    }
                })
            }

        default:
            const hasData = params.data
            if(data instanceof Object) {
                buildResponse( Object.assign({params}, {type: TYPE_RESPONSE.ONE}) )
            } else if (data instanceof Array) {
                buildResponse( Object.assign({params}, {type: TYPE_RESPONSE.LIST}) )
            } else {
                return false; 
            }

    }
}

module.exports = {
    build: buildResponse,
    type: TYPE_RESPONSE
}