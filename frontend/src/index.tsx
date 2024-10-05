import { ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import * as serviceWorker from "./serviceWorker"
import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools";

const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

const theme = extendTheme({
  initialColorMode: 'light',
  body: {bg: mode('white', 'gray.200')},
  colors: {
      brand: {
          100: "#2d4059",

          200: "#ea5455",

          300: "#f07b3f",
          310: "rgba(240,123,63,0.2)",

          400: "#ffd460",
      },
  },
})

root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ColorModeScript />
      <App />
    </React.StrictMode>
  </ChakraProvider>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

