import JSZip from "jszip";
import { Relation } from "../../types/RelationType";
import client from "../services/axiosClient";
import { baseUrl } from "../services/helpers";
import { onImportReaderLoad } from "./on-import-reader-load";

export const importCsvImagesZip = (file: any, slug: string, jsonTypes: string[] = [],
  toBeRemovedColumns: string[] = [],relations:Relation[] = []) => {
  JSZip.loadAsync(file)
    .then(function (zip) {
      zip.forEach(function (relativePath, zipEntry) {
        if (
          zipEntry.name?.substring(zipEntry.name.lastIndexOf(".") + 1) === "csv"
        ) {
          zipEntry
            .async("blob")
            .then((data) => {
              var reader = new FileReader();
              reader.onload = (loadEvent) => {
                onImportReaderLoad(loadEvent, "csv", slug, jsonTypes, toBeRemovedColumns,relations);
              };
              reader.readAsText(data);
            })
            .catch((error) => console.log(error));
        } else if (zipEntry.dir === false) {
          zipEntry
            .async("blob")
            .then(async (data) => {
              const fileExtension = zipEntry.name?.substring(
                zipEntry.name.lastIndexOf(".") + 1
              );
              let binaryToData = data;
              if (fileExtension === "jpeg" || fileExtension === "jpg") {
                binaryToData = data.slice(0, data.size, "image/jpeg");
              } else if (fileExtension === "png") {
                binaryToData = data.slice(0, data.size, "image/png");
              } else if (fileExtension === "gif") {
                binaryToData = data.slice(0, data.size, "image/gif");
              }
              const formData = new FormData();
              formData.append(
                "files",
                binaryToData,
                zipEntry.name?.substring(zipEntry.name.lastIndexOf("/") + 1)
              );
              await client.post(baseUrl + "/api/upload", formData);
            })
            .catch((error) => console.log(error));
        }
      });
    })
    .catch((error) => console.log(error));
};
