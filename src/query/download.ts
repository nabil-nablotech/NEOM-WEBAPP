import { gql } from "@apollo/client";

export const download = gql`
query searchDownloads($token: String) {
  downloads(
    filters: { token: { eq: $token } }
  ) {
    data {
      id
      attributes {
        title,
        filePath,
        dataCount,
        fileCount,
        libraryCount,
        visitCount,
        token
      }
    }
  }
}
`;