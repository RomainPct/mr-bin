const Colors = {
    white: "#ffffff",
    mainGreen: "#2F4222",
    middleGreen: "#A4B995",
    lowGreen: "#E2EEDB",
    grey: "#FCFCFC",
    black: "#000000",
    Bin: {
        yellow: "#FFD363",
        green: "#93D076",
        blue: "#71AAFF",
        red: "#EB6161"
    },
    translateColor: (color) => {
        switch (color.class) {
            case 'yellow': return Colors.Bin.yellow
            case 'blue': return Colors.Bin.blue
            case 'green': return Colors.Bin.green
            case 'red': return Colors.Bin.red
            default: return Colors.mainGreen
        }
    }
}

export default Colors