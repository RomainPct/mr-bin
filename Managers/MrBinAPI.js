export default class MrBinAPI {

    static url = 'https://mrbin.julienwagentrutz.com'

    static isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
          someDate.getMonth() == today.getMonth() &&
          someDate.getFullYear() == today.getFullYear()
    }

    static searchForAnAddress(query) {
        // "https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&limit=15"
        console.log('query')
        return fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=3`)
                .then(resp => resp.json())
                .then(json => {
                    if (!json.features) { return [] }
                    return json.features.map(value => {
                        const context = value.properties.context.split(',')
                        context.shift()
                        return {
                            id: value.properties.id,
                            title: `${value.properties.name}, ${value.properties.city}`,
                            label: `${value.properties.postcode},${context.join(',')}`,
                            name: value.properties.name ?? "",
                            postalCode: value.properties.postcode ?? "",
                            city: value.properties.city ?? ""
                        }
                    })
                })
    }

    static getProductInfo(productId, postalCode) {
        return fetch(`${MrBinAPI.url}/produits/${postalCode}/${productId}`)
                .then(resp => resp.json())
    }

    static getPlanning(postalCode) {
        return fetch(`${MrBinAPI.url}/horaires/${postalCode}`)
            .then(resp => resp.json())
            .then(json => {
                const map = new Map()
                json.forEach((item) => {
                    item.passageDate = new Date(item.passage)
                    const key = new Date(item.passageDate)
                    key.setHours(12, 0, 0, 0)
                    const collection = map.get(key)
                    if (!collection) {
                        map.set(key, [item]);
                    } else {
                        collection.push(item);
                    }
                })
                const result = []
                map.forEach((bins, date) => {
                    result.push({
                        title: MrBinAPI.isToday(date) ? "Aujourd'hui" : date.toLocaleDateString('fr-fr', { weekday: 'long', month: 'long', day: 'numeric' }),
                        datetime: date,
                        data: bins
                    })
                })
                return result
            })
    }

}