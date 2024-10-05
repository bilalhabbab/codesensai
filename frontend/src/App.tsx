import * as React from "react"
import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Dashboard} from "./Pages/Dashboard/Dashboard";
import {NotFound} from "./Pages/Other/NotFound";
import { LoginPage } from "./Pages/Login/LoginPage";
import AdminPage from "./Pages/Admin/AdminPage";
import Home from "./Pages/Home/Home";

const theme = extendTheme({
  initialColorMode: 'light',
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

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Dashboard/>}>
            <Route path="/home" element={<Home />}/>
            <Route path="/admin" element={<AdminPage/>}/>
          </Route>

          <Route path="*" element={<NotFound/>}/>
          <Route path="/login" element={<LoginPage/>}/>

        </Routes>
      </BrowserRouter>
    </ChakraProvider>
)}
