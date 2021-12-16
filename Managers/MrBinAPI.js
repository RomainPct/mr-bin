export default class MrBinAPI {

    static url = 'https://mrbin.julienwagentrutz.com'

    static isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
          someDate.getMonth() == today.getMonth() &&
          someDate.getFullYear() == today.getFullYear()
    }

    static sendNotificationSettings(settings) {
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        }
        return fetch(`${MrBinAPI.url}/notifications/settings`, options)
                    .then(resp => resp.json())
    }

    static searchForAnAddress(query) {
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

    static search(query) {
        return fetch(`${MrBinAPI.url}/produits/recherche/${query}`)
                .then(resp => resp.json())
    }

    static getProductInfo(productId, postalCode) {
        return fetch(`${MrBinAPI.url}/produits/${postalCode}/${productId}`)
                .then(resp => resp.json())
    }

    static getPlanning(postalCode) {
        return fetch(`${MrBinAPI.url}/horaires/${postalCode}`)
            .then(resp => resp.json())
            .then(json => {
                const result = []
                json.forEach(item => {
                    item.passageDate = new Date(item.passage)
                    const keyDate = new Date(item.passageDate)
                    keyDate.setHours(12, 0, 0, 0)
                    if (result.length > 0 && result[result.length - 1].datetime == keyDate.getTime()) {
                        result[result.length - 1].data.push(item)
                    } else {
                        result.push({
                            title: MrBinAPI.isToday(keyDate) ? "Aujourd'hui" : keyDate.toLocaleDateString('fr-fr', { weekday: 'long', month: 'long', day: 'numeric' }),
                            datetime: keyDate.getTime(),
                            data: [ item ]
                        })
                    }
                })
                return result
            })
    }

}