import React from "react"

export const AppContextValue = {
    location: "Vincennes",
    viewMode: "home",
    updateCurrentLocation: () => {}
  }

export const AppContext = React.createContext(AppContextValue)