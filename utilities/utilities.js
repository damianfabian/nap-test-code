
const sortby = (data, sorter) => {
    
    const temp = data.slice() // Immutable new array
    switch (sorter) {
        case 'lprice':
            // TODO: Depending on the structure and amount of data use other algorithm like quicksort
            temp.sort((a, b) => { return a.price.gross > b.price.gross ? 1 : -1 })
            break;
        case 'hprice':
            temp.sort((a, b) => { return b.price.gross > a.price.gross ? 1 : -1 })
            break;
        case 'name':
            temp.sort((a, b) => { 
                const ta = a.name.en
                const tb = b.name.en
                return ta.toLowerCase() > tb.toLowerCase() ? 1 : -1
            })
            break;
        case 'brand':
            temp.sort((a, b) => { 
                const ta = a.brand.name.en
                const tb = b.brand.name.en
                return ta.toLowerCase() > tb.toLowerCase() ? 1 : -1
            })
            break;
        default:
        break
    }

    return temp
}

module.exports = {
    sortby: sortby
}