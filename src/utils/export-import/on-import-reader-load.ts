import { ImportRequestDataType } from "../../types/ImportRequestDataType";
import client from "../services/axiosClient";
import { baseUrl } from "../services/helpers";

export const onImportReaderLoad = async (
  event: any,
  format: "json" | "csv",
  slug: string
) => {
  let data =
    format === "csv"
      ? event?.target?.result
      : JSON.parse(event?.target?.result);
  const requestData: ImportRequestDataType = {
    slug: slug,
    format: format,
    data: data,
  };
  try {
    const response = await client.post(
      `${baseUrl}/api/import-export-entries/content/import`,
      {...requestData}
    );
  } catch (err) {
    console.log(err);
  }
};
