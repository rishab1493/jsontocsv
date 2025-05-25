import { useState } from "react"
import Papa from "papaparse"

function IfElse() {
  const [data2, setData2] = useState([])
  const [generatedChunks, setGeneratedChunks] = useState([])
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0)
  const [selectedStore, setSelectedStore] = useState("")
  const [storeOptions, setStoreOptions] = useState([])

  // Handle file upload and parse CSV
  const handleFileUpload2 = (event) => {
    const file = event.target.files[0]
    if (!file) {
      console.log("No file found")
      return
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const jsonData = result.data.map((row) => {
          Object.keys(row).forEach((key) => {
            if (row[key] === "") {
              delete row[key]
            }
          })
          return row
        })
        setData2(jsonData)

        // Extract unique trimmed store names
        const storeNames = [
          ...new Set(
            jsonData.map((row) => row["Store Name"]?.trim()).filter(Boolean)
          ),
        ]
        setStoreOptions(storeNames)
      },
    })
  }

  const generateCode = () => {
    if (!data2.length || !selectedStore) {
      console.log("Missing data or store not selected")
      return
    }

    const filteredRows = data2.filter(
      (row) => row["Store Name"]?.trim() === selectedStore.trim()
    )

    console.log("Selected Store:", selectedStore)
    console.log("Filtered Rows:", filteredRows)

    if (!filteredRows.length) {
      console.log("No matching rows for selected store")
      return
    }

    let code = ""

    filteredRows.forEach((row, index) => {
      const medium = row["Medium"]
      const storeCode = row["Store Code"]
      const storeName = row["Store Name"]
      const defaultPincode = row["Pincodes"]
      const extraPincode = row[""]
      const pincodes = []

      if (defaultPincode) pincodes.push(defaultPincode)
      if (extraPincode) pincodes.push(extraPincode)

      for (let i = 1; i <= 25; i++) {
        const key = `_${i}`
        if (row[key]) {
          pincodes.push(row[key])
        }
      }

      if (!storeName || pincodes.length === 0) return

      const condition =
        (index === 0 ? "if" : "else if") +
        `('{{data.variables.campaign_medium}}'=== '${medium}' && '{{data.variables.Store_Code}}' === '${storeCode}'){volatile.Store = '${storeName}'; volatile.Pincode = [${pincodes.join(
          ","
        )}].slice({{data.variables.SliceArray}});}`

      code += condition
    })

    setGeneratedChunks([code])
    setCurrentChunkIndex(0)
    console.log("Generated Code:", code)
  }

  const handleNext = () => {
    setCurrentChunkIndex((prev) =>
      Math.min(prev + 1, generatedChunks.length - 1)
    )
  }

  const handlePrev = () => {
    setCurrentChunkIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(generatedChunks[currentChunkIndex] || "")
      .then(() => {
        alert("Copied to clipboard!")
      })
      .catch(() => {
        alert("Failed to copy")
      })
  }

  return (
    <>
      <input type="file" accept=".csv" onChange={handleFileUpload2} />

      {storeOptions.length > 0 && (
        <select
          className="mt-4 ml-4 border px-4 py-2 rounded"
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          <option value="">Select a store</option>
          {storeOptions.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>
      )}

      <button
        onClick={generateCode}
        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate If-Else Code
      </button>

      {generatedChunks.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <button
              onClick={handlePrev}
              disabled={currentChunkIndex === 0}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Prev
            </button>
            <span>
              Showing chunk {currentChunkIndex + 1} of {generatedChunks.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentChunkIndex === generatedChunks.length - 1}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Next
            </button>
          </div>
          <button
            onClick={handleCopy}
            className="bg-green-600 text-white px-3 py-1 rounded mb-2 hover:bg-green-700"
          >
            Copy to Clipboard
          </button>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded max-h-[600px] overflow-auto">
            {generatedChunks[currentChunkIndex]}
          </pre>
        </div>
      )}
    </>
  )
}

export default IfElse
