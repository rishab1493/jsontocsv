import { Routes, HashRouter, Route } from "react-router-dom"
import JsonGenerator from "./file/Json"
import IfElse from "./file/IfElse"
import CustomerNumber from "./file/CustomerNumber"

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/json-generator" element={<JsonGenerator />} />
          <Route path="/if-else" element={<IfElse />} />
          <Route path="/" element={<CustomerNumber />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
