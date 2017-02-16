function cleanParams (params) {
    const Form = new FormData()
    Object.keys(params).map((key) => {
        switch (typeof params[key]) {
            case "object" :
                Form.append(key, params[key].findIndex ? params[key].join(',') : JSON.stringify(params[key]) )
            break
            case "string":
            case "number":
            default:
                Form.append(key, params[key])
            break
        }
    })

    return Form
}

const API = {
    get: (url) => {
        return fetch(url).then((data) => {
            return data.json()
        })
    },

    post: (route, params) => {
        
        let Form = cleanParams(params)
        
        const init = { 
            method: route.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            'body': JSON.stringify(params) 
        }

        return fetch(route.endpoint, init).then((data) => {
            return data.json()
        })
    }
}

export default API