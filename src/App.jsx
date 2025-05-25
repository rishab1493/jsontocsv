import { Routes, BrowserRouter, Route } from "react-router-dom"
import JsonGenerator from "./file/Json"
import IfElse from "./file/IfElse"
import CustomerNumber from "./file/CustomerNumber"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/json-generator" element={<JsonGenerator />} />
          <Route path="/if-else" element={<IfElse />} />
          <Route
            path="https://rishab1493.github.io/jsontocsv/"
            element={<CustomerNumber />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
