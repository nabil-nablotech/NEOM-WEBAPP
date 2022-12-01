import FileSaver from "file-saver";
import JSZip from "jszip";
import { Relation } from "../../types/RelationType";
import client from "../services/axiosClient";
import { baseUrl } from "../services/helpers";
import { onImportReaderLoad } from "./on-import-reader-load";
import Resumable from "resumablejs";
const saveAs = require("file-saver");


export const importCsvImagesZip = (file: any, slug: string, jsonTypes: string[] = [],
  toBeRemovedColumns: string[] = [], relations: Relation[] = [], media: boolean = false) => {

  // const importCsv = async () => {
  //   try {
  //     const csvZip = await JSZip.loadAsync(file);
  //     csvZip.forEach(async (relativePath, zipEntry) => {
  //       const extension = zipEntry.name?.substring(zipEntry.name.lastIndexOf(".") + 1).toLowerCase();
  //       if (extension === "csv" || extension === "xlsx") {
  //         const data = await zipEntry.async("blob");
  //         var reader = new FileReader();
  //         reader.onload = (loadEvent) => {
  //           onImportReaderLoad(loadEvent, extension, slug, jsonTypes, toBeRemovedColumns, relations, file);
  //         };
  //         reader.readAsText(data);
  //       }
  //     })
  //   } catch (error) { console.log(error) }
  // }

  // /* First upload all files */
  // importCsv();
  // let CHUNK_SIZE = 5024 * 1024;
  // let offset = 0;
  // let reader: any = new FileReader();
  // let fileArray = new Uint8Array();

  // reader.onload = function () {

  //   const view = new Uint8Array(reader.result);
  //   let tmp = new Uint8Array(fileArray.byteLength + view.byteLength);
  //   tmp.set(new Uint8Array(fileArray), 0);
  //   tmp.set(new Uint8Array(view), fileArray.byteLength);
  //   fileArray = tmp;
  //   console.log(offset);
  //   console.log(file.size);
  //   if (offset >= file.size) {
  //     saveAs(new Blob([fileArray],{type:"application/zip"}));
  //     JSZip.loadAsync(fileArray).then(function (zip) {
  //       // TODO Your code goes here. This is just an example.
  //       console.log(zip)
  //     }).catch(function (err) {
  //       console.error("Failed to open", file.name, " as ZIP file:", err);
  //     })
  //     return;
  //   }
  //   // \r or \n not found, continue seeking.
  //   offset += CHUNK_SIZE;
  //   seek();
  // };

  // reader.onerror = function (err: any) {
  //   console.error("Failed to read file", err);
  // }

  // const seek = () => {
  //   let slice = file.slice(offset, offset + CHUNK_SIZE);
  //   reader.readAsArrayBuffer(slice);
  // }

  // seek();

  var r = new Resumable({
    target: `${baseUrl}/blah-custom/upload`,
    testChunks: false,
    chunkSize: 4194304,
    simultaneousUploads: 3,
    query: { upload_token: file?.name },
  });
  r.addFile(file);
  r.on("fileAdded", function (file, event) {
    r.upload();
  });
  r.on("fileSuccess", function (file: any, message: any) {
    console.log("sucessfully file uploaded");
  });
  r.on("fileError", function (file, message) {
    console.log("error Uploading the file");
  });
  r.on("fileProgress", function (file: any, message: any) {
    r.progress();
  });

};
