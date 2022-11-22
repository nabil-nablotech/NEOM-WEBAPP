import { gql } from "@apollo/client";

export const download = gql`
query searchDownloads($token: String) {
  downloads(
    filters: { token: { eq: $token } }
    sort: "createdAt:desc"
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
        createdAt,
        token
      }
    }
  }
}
`;