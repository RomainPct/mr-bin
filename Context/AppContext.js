import React from "react"

export const AppContextValue = {
    location: "Vincennes",
    updateCurrentLocation: () => {}
  }

export const AppContext = React.createContext(AppContextValue)