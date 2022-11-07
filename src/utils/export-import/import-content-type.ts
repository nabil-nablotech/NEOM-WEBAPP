import { onImportReaderLoad } from "./on-import-reader-load";

export const importContentType = (file: any, slug: string) => {
  var reader = new FileReader();
  const fileName = file?.name;
  reader.onload = (loadEvent) => {
    onImportReaderLoad(
      loadEvent,
      fileName?.substring(fileName.lastIndexOf(".") + 1),
      slug
    );
  };
  reader.readAsText(file);
};
