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
          { media_type: { categoryCode: { containsi: "MEDIA" } } }
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
          categoryType

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
                place_unique_id {
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
    $text: JSON
    $search_one: String
    $search_two: String
    $search_three: String
    $latitude: Float
    $longitude: Float
    $featuredImage: Boolean
    $categoryType: JSON
    $keywords: JSON
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
          { description: { contains: $search_two } }
          { title: { contains: $search_two } }
          { fileName: { contains: $search_two } }
          { citation: { contains: $search_two } }
          { description: { contains: $search_three } }
          { title: { contains: $search_three } }
          { fileName: { contains: $search_three } }
          { citation: { contains: $search_three } }
          { keywords: { contains: $text } }
        ]
        and: [
          { latitude: { gte: $latitude } }
          { longitude: { lte: $longitude } }
          { featuredImage: { eq: $featuredImage } }
          { categoryType: { containsi: $categoryType } }
          { media_type: { categoryCode: { containsi: "MEDIA" } } }
          { keywords: { containsi: $keywords } }
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
          categoryType
          latitude
          longitude
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
                place_unique_id {
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

export const addMedia = gql`
mutation createMedia(
  $uniqueId: String
  $title: String
  $bearing: String
  $Author: String
  $object: ID
  $description: String
  $categoryType: JSON
  $featuredImage: Boolean
  $objectURL: String
  $referenceURL: String
  $citation: String
  $keywords: JSON
  $mediaUIPath: String
  $deleted: Boolean
  $media_type: [ID]
    $fileName: String
    $longitude: Float
    $latitude: Float
    $fileSize: String
    $storage: String
    $make: String
    $model: String
    $depth: String
    $dimension: String
    $created: Date
    $modified: DateTime
) {
  createMedia(
    data: {
      uniqueId: $uniqueId
      title: $title
      bearing: $bearing
      object: $object
      Author: $Author
      description: $description
      categoryType: $categoryType
      fileName: $fileName
      longitude: $longitude
      latitude: $latitude
      featuredImage: $featuredImage
      objectURL: $objectURL
      referenceURL: $referenceURL
      citation: $citation
      keywords: $keywords
      mediaUIPath: $mediaUIPath
      deleted: $deleted
      imageMetadata: {
        fileName: $fileName
        longitude: $longitude
        latitude: $latitude
        fileSize: $fileSize
        storage: $storage
        make: $make
        model: $model
        depth: $depth
        dimension: $dimension
        created: $created
        modified: $modified
      }
      media_type: $media_type
    }
  ) {
    data {
      id
    }
  }
}
`;

export const updateMedia = gql`
mutation UpdateMedia(
  $id: ID!
  $uniqueId: String
  $title: String
  $bearing: String
  $Author: String
  $object: ID
  $description: String
  $categoryType: JSON
  $featuredImage: Boolean
  $objectURL: String
  $referenceURL: String
  $citation: String
  $keywords: JSON
  $mediaUIPath: String
  $deleted: Boolean
  $media_type: [ID]
    $fileName: String
    $longitude: Float
    $latitude: Float
    $fileSize: String
    $storage: String
    $make: String
    $model: String
    $depth: String
    $dimension: String
    $created: Date
    $modified: DateTime
) {
  updateMedia(
    id: $id
    data: {
      uniqueId: $uniqueId
      title: $title
      bearing: $bearing
      object: $object
      Author: $Author
      description: $description
      categoryType: $categoryType
      fileName: $fileName
      longitude: $longitude
      latitude: $latitude
      featuredImage: $featuredImage
      objectURL: $objectURL
      referenceURL: $referenceURL
      citation: $citation
      keywords: $keywords
      mediaUIPath: $mediaUIPath
      deleted: $deleted
      imageMetadata: {
        fileName: $fileName
        longitude: $longitude
        latitude: $latitude
        fileSize: $fileSize
        storage: $storage
        make: $make
        model: $model
        depth: $depth
        dimension: $dimension
        created: $created
        modified: $modified
      }
      media_type: $media_type
    }
  ) {
    data {
      id
      attributes {
        uniqueId
        media_type {
          data {
            id
            attributes {
              categoryCode
              typeCode
            }
          }
        }
      }
    }
  }
}
`;

export const mediaKeyWords = gql`
  query MediaKeyWordsSearch(
    $text: JSON
  ) {
    medias(
      filters: {
        or: [
          { keywords: { contains: $text } }
        ]
      }
    ) {
      data {
        id
        attributes {
          keywords
        }
      }
    }
  }
`;
