import { gql } from "@apollo/client";

export const media = gql`
query SearchMedia(
  $search_one: String
  $search_two: String
  $search_three: String
  $limit: Int
  $skip: Int
) {
  medias(
    pagination: { limit: $limit, start: $skip }
    filters: {
      and: [
        
        {
          or: [
            { description: { contains: $search_one } }
            { title: { contains: $search_one } }
            { fileName: { contains: $search_one } }
            { citation: { contains: $search_one } }
            # { keywords: { contains: $search_one } }
            { description: { contains: $search_two } }
            { title: { contains: $search_two } }
            { fileName: { contains: $search_two } }
            { citation: { contains: $search_two } }
            # { keywords: { contains: $search_two } }
            { description: { contains: $search_three } }
            { title: { contains: $search_three } }
            { fileName: { contains: $search_three } }
            { citation: { contains: $search_three } }
            # { keywords: { contains: $search_three } }
          ]
        }
        {
          media_type: {
            categoryCode: {
              containsi: "MEDIA"
            }
          }
        }
      ]
    }
  ) {
    meta {
      pagination {
        total
        pageCount
        pageSize
        page
      }
    }
    data {
      id
      attributes {
        keywords
        description
        title
        fileName
        citation
        referenceURL
        uniqueId
        updatedAt
        bearing
        actionType

        featuredImage
        media_type {
          data {
            attributes {
              typeCode
            }
          }
        }
        imageMetadata {
          fileSize
        }
        object {
          data {
            id
            attributes {
              url
            }
          }
        }
        media_associate {
          data {
            attributes {
              place_unique_id{
                data {
                  attributes {
                    placeNameArabic
                    placeNameEnglish
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const refineMedia = gql`
query RefinedMediaSearch(
  $search_one: String
  $search_two: String
  $search_three: String
  $latitude: Float
  $longitude: Float
  $featuredImage: Boolean
  $limit: Int
  $skip: Int
) {
  medias(
    pagination: { limit: $limit, start: $skip }
    filters: {
      or: [
        { description: { contains: $search_one } }
        { title: { contains: $search_one } }
        { fileName: { contains: $search_one } }
        { citation: { contains: $search_one } }
        # { keywords: { contains: $search_one } }
        { description: { contains: $search_two } }
        { title: { contains: $search_two } }
        { fileName: { contains: $search_two } }
        { citation: { contains: $search_two } }
        # { keywords: { contains: $search_two } }
        { description: { contains: $search_three } }
        { title: { contains: $search_three } }
        { fileName: { contains: $search_three } }
        { citation: { contains: $search_three } }
        # { keywords: { contains: $search_three } }
      ]
      and: [
        {	latitude: { gte: $latitude }}
        {	longitude: { lte: $longitude }}
        { featuredImage:{eq: $featuredImage}}
        {
          media_type: {
            categoryCode: {
              containsi: "MEDIA"
            }
          }
        }
      ]
    }
  ) {
    meta {
      pagination {
        total
        pageCount
        pageSize
        page
      }
    }
    data {
      id
      attributes {
        keywords
        description
        title
        fileName
        citation
        referenceURL
        uniqueId
        updatedAt
        bearing
        actionType

        featuredImage
        media_type {
          data {
            attributes {
              typeCode
            }
          }
        }
        imageMetadata {
          fileSize
        }
        object {
          data {
            id
            attributes {
              url
            }
          }
        }
        media_associate {
          data {
            attributes {
              place_unique_id{
                data {
                  attributes {
                    placeNameArabic
                    placeNameEnglish
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
