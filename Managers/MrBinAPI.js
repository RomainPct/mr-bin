export default class MrBinAPI {

    static url = 'https://mrbin.julienwagentrutz.com'

    static isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
          someDate.getMonth() == today.getMonth() &&
          someDate.getFullYear() == today.getFullYear()
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