import React, { useEffect, useState, useRef } from "react"
import { FlatList } from "react-native"
import MrBinAPI from "../../Managers/MrBinAPI"
import EmptyResultCell from "../Cells/EmptyResultCell"
import SearchResultCell from "../Cells/SearchResultCell"

export default function SearchResults({ query, detailAction }) {

    const [results, setResults] = useState([])
    const lastSearchChange = useRef(null)

    useEffect(_ => {
        const now = Date.now()
        lastSearchChange.current = now
        setTimeout(() => {
            if (now != lastSearchChange.current) { return }
            MrBinAPI.search(query)
                .then(data => setResults(data))
                .catch(e => console.log(e))
        }, 400);
    }, [query])

    if (query.length > 0 && (results.length == undefined || results.length <= 0)) {
        return <EmptyResultCell />
    }

    return (
        <FlatList
            data={results}
            renderItem={({item}) =>
                <SearchResultCell
                    keyboardShouldPersistTaps="handled"
                    onPress={_ => detailAction({data: item.codeBarre})}
                    key={item.codeBarre}
                    item={item}
                    />
                }
            keyExtractor={data => data.codeBarre}
            />
    )

}