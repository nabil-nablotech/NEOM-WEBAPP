import { onImportReaderLoad } from "./on-import-reader-load";

export const importContentType = (file: any, slug: string, jsonTypes: string[] = [],
  toBeRemovedColumns: string[] = []) => {
  var reader = new FileReader();
  const fileName = file?.name;
  reader.onload = (loadEvent) => {
    onImportReaderLoad(
      loadEvent,
      fileName?.substring(fileName.lastIndexOf(".") + 1),
      slug,
      jsonTypes,
      toBeRemovedColumns
    );
  };

  if (fileName?.substring(fileName.lastIndexOf(".") + 1) === "xlsx") {
    reader.readAsArrayBuffer(file);
  } else {
    reader.readAsText(file);
  }

};
