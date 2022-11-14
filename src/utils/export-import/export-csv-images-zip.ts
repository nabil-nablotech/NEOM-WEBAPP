import { Parser } from "json2csv";
import JSZip from "jszip";
const saveAs = require("file-saver");

export const exportCsvImagesZip = async (
  files: { fileName: string; fileUrl: string }[],
  data: any
) => {
  if (data?.length > 0) {
    const fields = Object.keys(data[0])?.filter((item: any) => !(item === "createdBy" || item === "updatedBy"));
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(data.map((item: any, index: number) => {
      /* Object.keys(item)?.map((key)=>{
        if(typeof item[key]==="object"  && item[key]?.id){
          data[index][key]= item[key]?.id;
        }
        
      }); */
      if (item?.updatedBy) {
        delete item["updatedBy"];
      }
      if (item?.createdBy) {
        delete item["createdBy"];
      }
      return item;
    }));

    const csvBlob = new Blob([csv], { type: "text/csv" });
    const zip = new JSZip();

    zip.file("CSV export.csv", csvBlob);

    const img = zip.folder("assets");
    for (let i = 0; i < files.length; i++) {
      await fetch(files[i].fileUrl)
        .then(function (response) {
          return response.blob();
        })
        .then(function (blob) {
          img?.file(files[i].fileName, blob);
        }).catch((err) => console.log(err));
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "neom.zip");
    });
  }
};
