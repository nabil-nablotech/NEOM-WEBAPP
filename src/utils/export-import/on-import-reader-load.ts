import { ImportRequestDataType } from "../../types/ImportRequestDataType";
import client from "../services/axiosClient";
import { baseUrl } from "../services/helpers";
import csvToJson from 'csvtojson';
import { Parser } from "json2csv";
import * as XLSX from 'xlsx';
import { Relation } from '../../types/RelationType';

export const onImportReaderLoad = async (
  event: any,
  format: "json" | "csv" | "xlsx",
  slug: string,
  jsonTypes: string[] = [],
  toBeRemovedColumns: string[] = [],
  relations: Relation[]
) => {
  // Convert xlsx file to csv
  let data;
  if (format === "xlsx") {
    const encodedData = new Uint8Array(event.target.result);
    const workbook = XLSX.read(encodedData, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    data = XLSX.utils.sheet_to_csv(worksheet);
  }
  // assign the csv file 

  else if (format === "csv") {
    data = event?.target?.result;
  }
  // assign the json parsed object
  else {
    data = JSON.parse(event?.target?.result);
  }


  // the request data for the import api
  const requestData: ImportRequestDataType = {
    slug: slug,
    format: format === "xlsx" ? "csv" : format,
    data: data,
  };
  try {

    const originalJsonObject = await csvToJson().fromString(requestData.data);
    const jsonObject = [...originalJsonObject];

    for (let i = 0; i < jsonObject.length; i++) {

      /* Convert csv to json */
      for (let j = 0; j < jsonTypes?.length; j++) {
        jsonObject[i][jsonTypes[j]] = jsonObject[i][jsonTypes[j]] ? [jsonObject[i][jsonTypes[j]]] : [];
      }

      /* Remove unnecessary columns */
      for (let k = 0; k < toBeRemovedColumns.length; k++) {
        if (Object.keys(jsonObject[i]).includes(toBeRemovedColumns[k])) {
          delete jsonObject[i][toBeRemovedColumns[k]];
        }
      }

    }

    /* Converts back the json after it is cleared to csv */
    if (jsonObject?.length > 0) {
      const fields = Object.keys(jsonObject[0]);
      const opts = { fields };
      const parser = new Parser(opts);
      const csv = parser.parse(jsonObject);
      requestData.data = csv;
    }

    /* finally send request to the import api */
    const response = await client.post(
      `${baseUrl}/api/import-export-entries/content/import`,
      { ...requestData }
    );

    /* Establish relationship if any relation exist. */
    for (let i = 0; i < originalJsonObject.length; i++) {
      for (let j = 0; j < relations?.length; j++) {
        if (originalJsonObject[i]?.[relations[j]?.keyColumn] && originalJsonObject[i]?.[relations[j]?.parentColumn]) {
          const requestBody: any = {};
          
          const keyData = await client.get(
            `${baseUrl}/api/${relations[j].keyContentType}?filters[$and][0][uniqueId][$eq]=${originalJsonObject[i][relations[j]?.keyColumn]}`
          );
          const parentData = await client.get(
            `${baseUrl}/api/${relations[j].parentContentType}?filters[$and][0][uniqueId][$eq]=${originalJsonObject[i][relations[j]?.parentColumn]}`,
          );
          requestBody[relations[j]?.key] = keyData?.data?.data[0]?.id;
          requestBody[relations[j]?.parent] = parentData?.data?.data[0]?.id;;
          if (typeof relations[j]?.extra === "object") {
            const extraKeys = Object.keys(relations[j]?.extra);
            for (let k = 0; k < extraKeys.length; k++) {
              requestBody[extraKeys[k]] = relations[j]?.extra[extraKeys[k]];
            }
          }
          const response = await client.post(
            `${baseUrl}/api/${relations[j].bindingContentType}`,
            { data: { ...requestBody } }
          );
        }

      }
    }
  } catch (err) {
    console.log(err);
  }
};
