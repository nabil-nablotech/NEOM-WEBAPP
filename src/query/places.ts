import Graphql, { gql } from "@apollo/client";

export const places = gql`
query SearchPlace(
  $search_one: String
  $search_two: String
  $search_three: String
  $text: JSON
  $limit: Int
  $skip: Int
) {
  places(
    pagination: { limit: $limit, start: $skip }
    filters: {
      or: [
        { siteType: { containsi: $text} }
        { siteDescription: { containsi: $search_one } }
        { period: { containsi: $text } }
        { previousNumber: { containsi: $search_one } }
        { placeNumber: { containsi: $search_one } }
        { placeNameEnglish: { containsi: $search_one } }
        { placeNameArabic: { containsi: $search_one } }
        { keywords: { containsi: $search_one } }
        # { siteType: { containsi: [$search_two] } }
        { siteDescription: { containsi: $search_two } }
        # { period: { containsi: [$search_two] } }
        { previousNumber: { containsi: $search_two } }
        { placeNumber: { containsi: $search_two } }
        { placeNameEnglish: { containsi: $search_two } }
        { placeNameArabic: { containsi: $search_two } }
        { keywords: { containsi: $search_two } }
        # { siteType: { containsi: [$search_three] } }
        { siteDescription: { containsi: $search_three } }
        # { period: { containsi: [$search_three] } }
        { previousNumber: { containsi: $search_three } }
        { placeNumber: { containsi: $search_three } }
        { placeNameEnglish: { containsi: $search_three } }
        { placeNameArabic: { containsi: $search_three } }
        { keywords: { containsi: $search_three } }
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
        placeNameEnglish
        placeNameArabic
        siteDescription
        updatedAt
        keywords
        placeNumber
        latitude
        longitude
        uniqueId
        period
        researchValue

        siteType
        tourismValue
        stateOfConservation
        recommendation
        risk
        media_associates {
          data {
            attributes {
              media_unique_id {
                data {
                  attributes {
                    object {
                      data {
                        attributes {
                          url
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
    }
  }
}
`;

export const refinePlaces = gql`
query refinedSearch(
  $text: JSON
  $search_one: String
  $search_two: String
  $search_three: String
  $researchValue: JSON
  $tourismValue: JSON
  $stateOfConservation: JSON
  $recommendation: JSON
  $risk: JSON
  $period: JSON
  $latitude: Float
  $longitude: Float
  $artifacts: JSON
  $limit: Int
  $skip: Int
) {
  places(
    pagination: { limit: $limit, start: $skip }

    filters: {
      or: [
        { placeNameEnglish: { containsi: $search_one } }
        { placeNameEnglish: { containsi: $search_two } }
        { placeNameEnglish: { containsi: $search_three } }
        { placeNameArabic: { containsi: $search_one } }
        { placeNameArabic: { containsi: $search_two } }
        { placeNameArabic: { containsi: $search_three } }
        { siteDescription: { containsi: $search_one } }
        { siteDescription: { containsi: $search_two } }
        { siteDescription: { containsi: $search_three } }
        { placeNumber: { containsi: $search_one } }
        { placeNumber: { containsi: $search_two } }
        { placeNumber: { containsi: $search_three } }
        { keywords: { containsi: $text } }
        { siteType: { containsi: $text} }
      ]
      and: [
        { researchValue: {containsi: $researchValue } } 
        { tourismValue: { containsi: $tourismValue } }
        { stateOfConservation: { containsi: $stateOfConservation } }
        { recommendation: { containsi: $recommendation } }
        { risk: { containsi: $risk } }
        { artifacts: { containsi: $artifacts } }
        { period: { containsi: $period } }
        { latitude: { gte: $latitude } }
        { longitude: { lte: $longitude } }
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
        placeNameEnglish
        placeNameArabic
        siteDescription
        updatedAt
        keywords
        placeNumber
        latitude
        longitude
        uniqueId
        period
        researchValue
        siteType
        tourismValue
        stateOfConservation
        recommendation
        risk
        
        media_associates {
          data {
            attributes {
              media_unique_id {
                data {
                  attributes {
                    object {
                      data {
                        attributes {
                          url
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
    }
  }
}
`;

