import React from "react"

export const ViewMode = {
  HOME: "home",
  SCAN: "scan"
}

export const AppContextValue = {
    location: null,
    viewMode: ViewMode.HOME,
    update: null
  }

export const AppContext = React.createContext(AppContextValue)