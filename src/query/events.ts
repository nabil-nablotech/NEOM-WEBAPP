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
  $limit: Int
  $skip: Int
$startDate: Date
$endDate: Date
) {
  visits(
    pagination: { limit: $limit, start: $skip }
    filters: {
      or: [
        # {	siteType: {containsi: $search_one }}
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
        { keywords: { contains: $text } }
      ]
      and:[
        {	stateOfConservation: {containsi: $stateOfConservation}}
        {	period: { containsi: $period}}
        {	researchValue: {containsi: $researchValue}}
        {	tourismValue: {containsi: $tourismValue}}
        {	recommendation: {containsi: $recommendation}}
        {	risk: {containsi: $risk}}
        {	artifacts: {containsi: $artifacts}}
        { assessmentType: {containsi: $assessmentType}}
        {	latitude: { gte: $latitude }}
        {	longitude: { lte: $longitude }}
        {visitDate: {gte: $startDate}}
        {visitDate: {lte: $endDate}}
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