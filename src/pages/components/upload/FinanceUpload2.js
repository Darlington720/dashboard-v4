import React, { useState } from "react";
import * as XLSX from "xlsx";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  ReactDataTable,
} from "../../../components/Component";

function ExcelRenderer() {
  const [data, setData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // create a FileReader to read the Excel file
    const reader = new FileReader();

    // when the file is loaded, parse it with SheetJS
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const sheetData = XLSX.utils.sheet_to_json(worksheet);
      console.log("Results from excel", sheetData);
      setData(sheetData);
    };

    // read the file as a binary string
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <Head title="Constraint List" />
      <Content>
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Upload File</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <input type="file" onChange={handleFileChange} accept=".xls, .xlsx" />
          {data && (
            <div>
              <h2>Excel Data</h2>
              <table>
                <thead>
                  <tr>
                    {/* render the table headers */}
                    {Object.keys(data[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* render the table rows */}
                  {data.map((row) => (
                    <tr key={row.id}>
                      {Object.values(row).map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Block>
      </Content>
    </div>
  );
}

export default ExcelRenderer;
