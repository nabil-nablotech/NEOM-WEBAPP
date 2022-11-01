import { gql } from "@apollo/client";

export const events = gql`
  query SearchEvents(
    $search_one: String
    $search_two: String
    $search_three: String
    $limit: Int
    $skip: Int
  ) {
    visits(
      pagination: { limit: $limit, start: $skip }
      filters: {
        or: [
          # {	siteType: {containsi: $search_one} }
          { siteDescription: { contains: $search_one } }
          # {	period: {containsi: $search_one}}
          { recordingTeam: { contains: $search_one } }
          { fieldNarrative: { contains: $search_one } }
          # { keywords: { contains: $search_one } }
          # { siteType: {containsi:$search_two} }
          { siteDescription: { contains: $search_two } }
          # {	period: {containsi: $search_two}}
          { recordingTeam: { contains: $search_two } }
          { fieldNarrative: { contains: $search_two } }
          # { keywords: { contains: $search_one } }
          # {	siteType: {containsi: $search_three }}
          { siteDescription: { contains: $search_three } }
          # {	period: {containsi: $search_three}}
          { recordingTeam: { contains: $search_three } }
          { fieldNarrative: { contains: $search_three } }
          # { keywords: { contains: $search_three } }
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
          recordingTeam
          siteDescription
          updatedAt
          createdAt
          keywords
          visitNumber
          latitude
          longitude
          uniqueId
          period
          researchValue
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
          visit_associate {
            data {
              id
              attributes {
                place_unique_id {
                  data {
                    attributes {
                      placeNumber
                      placeNameEnglish
                      placeNameArabic
                      siteType
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

export const refineEvents = gql`
query RefineSearchEvent(
  $search_one: String
  $search_two: String
  $search_three: String
  $text: JSON
  $researchValue: JSON
  $tourismValue: JSON
  $stateOfConservation: JSON
  $recommendation: JSON
  $risk: JSON
  $period: JSON
  $assessmentType: JSON
  $latitude: Float
  $longitude: Float
  $artifacts: JSON
  $keywords: JSON
  $limit: Int
  $skip: Int
  $startDate: Date
  $endDate: Date
)
{
  visits(
    pagination: { limit: $limit, start: $skip }
    filters: {
      or: [
        { siteDescription: { contains: $search_one } }
        { recordingTeam: { contains: $search_one } }
        { fieldNarrative: { contains: $search_one } }
        { siteDescription: { contains: $search_two } }
        { recordingTeam: { contains: $search_two } }
        { fieldNarrative: { contains: $search_two } }
        { siteDescription: { contains: $search_three } }
        { recordingTeam: { contains: $search_three } }
        { fieldNarrative: { contains: $search_three } }
        { keywords: { contains: $text } }
        { siteType: { containsi: $text } }
      ]
      and: [
        { stateOfConservation: { containsi: $stateOfConservation } }
        { period: { containsi: $period } }
        { researchValue: { containsi: $researchValue } }
        { tourismValue: { containsi: $tourismValue } }
        { recommendation: { containsi: $recommendation } }
        { risk: { containsi: $risk } }
        { artifacts: { containsi: $artifacts } }
        { assessmentType: { containsi: $assessmentType } }
        { latitude: { gte: $latitude } }
        { longitude: { lte: $longitude } }
        { visitDate: { gte: $startDate }}
        { visitDate: { lte: $endDate }}
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
        visitDate
        recordingTeam
        siteDescription
        updatedAt
        createdAt
        keywords
        latitude
        longitude
        uniqueId
        period
        researchValue
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
        visit_associate {
          data {
            id
            attributes {
              place_unique_id {
                data {
                  attributes {
                    placeNumber
                    placeNameEnglish
                    placeNameArabic
                    siteType
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

export const addEvent = gql`
  mutation CreateEvent(
    $visitDate: Date
    $uniqueId: String
    $recordingTeam: String
    $fieldNarrative: String
    $visitUIPath: String
    $visitNumber: Int
    $asset_config_id: ID
    $siteDescription: String
    $siteType: JSON
    $researchValue: JSON
    $tourismValue: JSON
    $stateOfConservation: JSON
    $recommendation: JSON
    $risk: JSON
    $period: JSON
    $latitude: Float
    $longitude: Float
    $artifacts: JSON
    $keywords: JSON
    $assessmentType: JSON
  ) {
    createVisit(
      data: {
        uniqueId: $uniqueId
        visitNumber: $visitNumber
        visitDate: $visitDate
        recordingTeam: $recordingTeam
        fieldNarrative: $fieldNarrative
        siteDescription: $siteDescription
        latitude: $latitude
        longitude: $longitude
        deleted: false
        keywords: $keywords
        visitUIPath: $visitUIPath
        asset_config_id: $asset_config_id
        siteType: $siteType
        recommendation: $recommendation
        tourismValue: $tourismValue
        stateOfConservation: $stateOfConservation
        risk: $risk
        researchValue: $researchValue
        period: $period
        artifacts: $artifacts
        assessmentType: $assessmentType
      }
    ) {
      data {
        id
        attributes {
          uniqueId
          asset_config_id {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export const updateEvent = gql`
  mutation UpdateEvent(
    $id: ID!
    $visitDate: Date
    $recordingTeam: String
    $fieldNarrative: String
    $visitUIPath: String
    $visitNumber: Int
    $asset_config_id: ID
    $visit_associate: ID
    $media_associates: [ID]
    $siteDescription: String
    $siteType: JSON
    $researchValue: JSON
    $tourismValue: JSON
    $stateOfConservation: JSON
    $recommendation: JSON
    $risk: JSON
    $period: JSON
    $latitude: Float
    $longitude: Float
    $artifacts: JSON
    $keywords: JSON
    $assessmentType: JSON
    $deleted: Boolean
  ) {
    updateVisit(
      id: $id,
      data: {
        visitNumber: $visitNumber
        visitDate: $visitDate
        recordingTeam: $recordingTeam
        fieldNarrative: $fieldNarrative
        siteDescription: $siteDescription
        latitude: $latitude
        longitude: $longitude
        deleted: $deleted
        keywords: $keywords
        visitUIPath: $visitUIPath
        asset_config_id: $asset_config_id
        visit_associate: $visit_associate
        media_associates: $media_associates
        siteType: $siteType
        recommendation: $recommendation
        tourismValue: $tourismValue
        stateOfConservation: $stateOfConservation
        risk: $risk
        researchValue: $researchValue
        period: $period
        artifacts: $artifacts
        assessmentType: $assessmentType
      }
    ) {
      data {
        id
        attributes {
          uniqueId
          asset_config_id {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export const eventsKeyWords = gql`
query EventsKeyWordsSearch(
  $text: JSON
  ){
  visits(
    filters: {
      and: [
        { keywords: { containsi: $text } }
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
