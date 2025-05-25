import { Routes, BrowserRouter, Route } from "react-router-dom"

import CustomerNumber from "./file/CustomerNumber"

function App() {
  return (
    <>
      <BrowserRouter>
        <CustomerNumber />
      </BrowserRouter>
    </>
  )
}

export default App
