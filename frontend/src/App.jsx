import { useColorModeValue } from "@/components/ui/color-mode";
import { Box } from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import Navbar from "./components2/Navbar"
import { Toaster } from "@/components/ui/toaster";


function App() {
  
  
  return (
    <>
    <Toaster/>
      <Box minH={"100vh"} bg = {useColorModeValue("gray.100", "rgba(21, 21, 44, 1)")}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/create" element={<CreatePage/> } />
        </Routes>
      </Box>
    </>
  )
}

export default App
