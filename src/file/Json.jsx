import { useState } from "react"
import Papa from "papaparse"

function JsonGenerator() {
  const [data, setData] = useState([])
  const [selectedStore, setSelectedStore] = useState("")

  // Handle file upload and parse CSV
  const handleFileUpload = (event) => {
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
        setData(jsonData)
      },
    })
  }
  const copyToClipboard = (jsonData) => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))
    alert("Copied to clipboard!")
  }
  // Extract unique store names from data
  const storeNames = [...new Set(data.map((item) => item["Store Name"]))]

  // Handle dropdown selection
  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value)
  }

  // Generate JSON structures
  const generateJSON1 = () => {
    if (!selectedStore) return null

    const selectedData = data.find(
      (item) => item["Store Name"] === selectedStore
    )
    if (!selectedData) return null

    const { "Store Code": storeCode, Keyword, Medium } = selectedData

    return {
      ifStatements: [
        {
          variable: {
            name: "User_text_response",
            type: "user",
            description: "",
            macro: "{{data.variables.User_text_response}}",
            createdBy: {
              id: "644184b54cf90554645b36fb",
              name: "Krishna Mishra",
              email: "nand@amplify.ai",
            },
          },
          value: Keyword,
          condition: "equal",
        },
        {
          variable: {
            name: "User_text_response",
            type: "user",
            description: "",
            macro: "{{data.variables.User_text_response}}",
            createdBy: {
              id: "644184b54cf90554645b36fb",
              name: "Krishna Mishra",
              email: "nand@amplify.ai",
            },
          },
          value: Keyword,
          condition: "equal",
        },
      ],
      logicalOperator: "or",
      onMatchPlugins: [
        {
          name: "variable",
          method: "setSessionVariable",
          params: {
            name: "Store_Code",
            value: storeCode,
            variable: {
              name: "Store_Code",
              type: "user",
              description: "",
              macro: "{{data.variables.Store_Code}}",
              createdBy: {
                id: "644184b54cf90554645b36fb",
                name: "Krishna Mishra",
                email: "nand@amplify.ai",
              },
            },
          },
        },
        {
          name: "variable",
          method: "setSessionVariable",
          params: {
            name: "campaign_medium",
            value: Medium,
            variable: {
              name: "campaign_medium",
              type: "user",
              description: "",
              macro: "{{data.variables.campaign_medium}}",
              createdBy: {
                id: "644184b54cf90554645b36fb",
                name: "Krishna Mishra",
                email: "nand@amplify.ai",
              },
            },
          },
        },
        {
          name: "variable",
          method: "setSessionVariable",
          params: {
            name: "CR-Set-5",
            value: "true",
            variable: {
              name: "CR-Set-5",
              type: "user",
              description: "",
              macro: "{{data.variables.CR-Set-5}}",
              createdBy: {
                id: "67a1c556288015a87f5bc332",
                name: "Rishab ",
                email: "rishab@amplify.ai",
              },
            },
          },
        },
      ],
    }
  }
  console.log(data)
  const generateJSON2 = () => {
    if (!selectedStore) return null

    const selectedData = data.find(
      (item) => item["Store Name"] === selectedStore
    )
    if (!selectedData) return null

    const { "Store Code": storeCode, Keyword, Medium } = selectedData

    return {
      ifStatements: [
        {
          variable: {
            name: "campaign_medium",
            type: "user",
            description: "",
            macro: "{{data.variables.campaign_medium}}",
            createdBy: {
              id: "644184b54cf90554645b36fb",
              name: "Krishna Mishra",
              email: "nand@amplify.ai",
            },
          },
          value: Medium,
          condition: "equal",
        },
      ],
      logicalOperator: "and",
      nextNodes: [""],
    }
  }

  const json1 = generateJSON1()
  const json2 = generateJSON2()

  return (
    <>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <select onChange={handleStoreChange} value={selectedStore}>
        <option value="">Select a Store</option>
        {storeNames.map((store, index) => (
          <option key={index} value={store}>
            {store}
          </option>
        ))}
      </select>
      {json1 && (
        <>
          <h3>JSON 1</h3>
          <pre>{JSON.stringify(json1, null, 2)}</pre>
          <button onClick={() => copyToClipboard(json1)}>Copy JSON 1</button>
        </>
      )}
      {json2 && (
        <>
          <h3>JSON 2</h3>
          <pre>{JSON.stringify(json2, null, 2)}</pre>
          <button onClick={() => copyToClipboard(json2)}>Copy JSON 2</button>
        </>
      )}

      <h3>Variable</h3>
      <p>{`${selectedStore} Pincode- Asked`}</p>
    </>
  )
}

export default JsonGenerator
