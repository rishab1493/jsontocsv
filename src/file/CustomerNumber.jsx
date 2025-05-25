import Papa from "papaparse"

import { useState } from "react"

function ExportCustomerNumbers({ data }) {
  const [jsonInput, setJsonInput] = useState("")
  const [number, setNumber] = useState(0)
  const handleExport = () => {
    let parsed
    try {
      parsed = JSON.parse(jsonInput)
    } catch {
      try {
        // Attempt to parse JS object notation with eval (⚠️ risky in general — only safe locally)
        parsed = eval("(" + jsonInput + ")")
      } catch {
        alert("❌ Invalid JSON or JavaScript-style object array.")
        return
      }
    }

    if (!Array.isArray(parsed)) {
      alert("Input must be a JSON array.")
      return
    }

    // Extract customer numbers with +91 prefix and wrap in quotes
    const extracted = parsed.map((item) => ({
      customerNumber: `+91${item.customer_mobile}`,
    }))

    setNumber(extracted.length)

    const csv = Papa.unparse(extracted)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "customer_numbers.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <h3>Total Numbers: {number}</h3>

      <textarea
        placeholder="Paste your JSON array here..."
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows={20}
        style={{ width: "100%", fontSize: "14px", fontFamily: "monospace" }}
      />

      <button onClick={handleExport} style={{ marginTop: "10px" }}>
        Export Customer Numbers
      </button>
    </div>
  )
}

export default ExportCustomerNumbers
