import React from "react"

export const ViewMode = {
  HOME: "home",
  SCAN: "scan"
}

export const AppContextValue = {
    location: "Vincennes",
    viewMode: ViewMode.HOME,
    updateCurrentLocation: () => {}
  }

export const AppContext = React.createContext(AppContextValue)