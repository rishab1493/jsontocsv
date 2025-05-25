import { Routes, HashRouter, Route } from "react-router-dom"

import CustomerNumber from "./file/CustomerNumber"

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="*" element={<CustomerNumber />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
