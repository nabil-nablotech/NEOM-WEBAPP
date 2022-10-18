import { gql } from "@apollo/client";

export const places = gql`
  query SearchTitle($search_one: String, $search_two: String, $search_three: String, $limit: Int, $skip: Int) {
    places(
      pagination: {
        limit: $limit
        start: $skip
      }
      filters: {
        or: [
          # {siteType: { containsi: $search_one }}
          {siteDescription:{containsi:$search_one }}
          # {period: { containsi: $search_one }}
          {previousNumber:{containsi:$search_one }}
          {placeNumber:{containsi:$search_one }}
          {placeNameEnglish: { containsi: $search_one }}
          {placeNameArabic:{containsi:$search_one}}
          {keywords:{containsi:$search_one}}
          
                    # {siteType: { containsi: $search_two }}
          {siteDescription:{containsi:$search_two }}
          # {period: { containsi: $search_two }}
          {previousNumber:{containsi:$search_two }}
          {placeNumber:{containsi:$search_two }}
          {placeNameEnglish: { containsi: $search_two }}
          {placeNameArabic:{containsi:$search_two}}
          {keywords:{containsi:$search_two}}

          
                    # {siteType: { containsi: $search_three }}
          {siteDescription:{containsi:$search_three }}
          # {period: { containsi: $search_three }}
          {previousNumber:{containsi:$search_three }}
          {placeNumber:{containsi:$search_three }}
          {placeNameEnglish: { containsi: $search_three }}
          {placeNameArabic:{containsi:$search_three}}
          {keywords:{containsi:$search_three}}
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
          type
          siteDescription
          updatedAt
          keywords
          placeNumber
          latitude
          longitude
          uniqueId
          period{
            data{
              id
              attributes{
                name
              }
            }
          }
          researchValue {
            data {
              id
              attributes {
                name
                translation {
                  data {
                    id
                    attributes {
                      code
                      locale {
                        value
                        languages {
                          data {
                            attributes {
                              name
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

          tourismValue {
            data {
              id
              attributes {
                name
                translation {
                  data {
                    id
                    attributes {
                      code
                      locale {
                        value
                        languages {
                          data {
                            attributes {
                              name
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
          stateOfConservation {
            data {
              id
              attributes {
                name
                translation {
                  data {
                    id
                    attributes {
                      code
                      locale {
                        value
                        languages {
                          data {
                            attributes {
                              name
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
          recommendation {
            data {
              id
              attributes {
                name
                translation {
                  data {
                    id
                    attributes {
                      code
                      locale {
                        value
                        languages {
                          data {
                            attributes {
                              name
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
          risk {
            data {
              id
              attributes {
                name
                translation {
                  data {
                    id
                    attributes {
                      code
                      locale {
                        value
                        languages {
                          data {
                            attributes {
                              name
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
  }
`;

export const events = gql`
  query SearchTitle($search_one: String,$search_two: String, $search_three: String, $limit: Int, $skip: Int) {
    visits(
      pagination: {
        limit: $limit
        start: $skip
      }
      filters: {
        or: [
          # { siteType: { contains: $search_one } }
          { siteDescription: { contains: $search_one } }
          # { period: { contains: $search_one } }
          { recordingTeam: { contains: $search_one } }
          { fieldNarrative: { contains: $search_one } }
          { keywords: { contains: $search_one } }
          
                    # { siteType: { contains: $search_two } }
          { siteDescription: { contains: $search_two } }
          # { period: { contains: $searcht_two } }
          { recordingTeam: { contains: $search_two } }
          { fieldNarrative: { contains: $search_two } }
          { keywords: { contains: $search_one } }
          
                    # { siteType: { contains: $search_three } }
          { siteDescription: { contains: $search_three } }
          # { period: { contains: $search_three } }
          { recordingTeam: { contains: $search_three } }
          { fieldNarrative: { contains: $search_three } }
          { keywords: { contains: $search_three } }
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
          keywords
          visitNumber
          latitude
          longitude
          uniqueId
          type
          period{
            data{
              id
              attributes{
                name
              }
            }
          }
          researchValue {
            data {
              id
              attributes {
                name
                translation {
                  data {
                    id
                    attributes {
                      code
                      locale {
                        value
                        languages {
                          data {
                            attributes {
                              name
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
          tourismValue {
            data {
              id
              attributes {
                name
                translation {
                  data {
                    id
                    attributes {
                      code
                      locale {
                        value
                        languages {
                          data {
                            attributes {
                              name
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
          stateOfConservation {
            data {
              id
              attributes {
                name
                translation {
                  data {
                    id
                    attributes {
                      code
                      locale {
                        value
                        languages {
                          data {
                            attributes {
                              name
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
          recommendation {
            data {
              id
              attributes {
                name
                translation {
                  data {
                    id
                    attributes {
                      code
                      locale {
                        value
                        languages {
                          data {
                            attributes {
                              name
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
          risk {
            data {
              id
              attributes {
                name
                translation {
                  data {
                    id
                    attributes {
                      code
                      locale {
                        value
                        languages {
                          data {
                            attributes {
                              name
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
  }
`;

export const library = gql`
query SearchTitle($search_one: String, $search_two: String, $search_three: String, $limit: Int, $skip: Int) {
  medias(
    pagination: {
      limit: $limit
      start: $skip
    }
    filters: {
      and: [
        {
          or: [
            { description: { contains: $search_one } }
            { title: { contains: $search_one } }
            { fileName: { contains: $search_one } }
            { citation: { contains: $search_one } }
            { keywords: { contains: $search_one } }
            
            { description: { contains: $search_two } }
            { title: { contains: $search_two } }
            { fileName: { contains: $search_two } }
            { citation: { contains: $search_two } }
            { keywords: { contains: $search_two } }
            
            { description: { contains: $search_three } }
            { title: { contains: $search_three } }
            { fileName: { contains: $search_three } }
            { citation: { contains: $search_three } }
            { keywords: { contains: $search_three } }
          ]
        }
        {
          mediaType: {
            or: [
              { categoryCode: { eq: "DOCUMENT" } }
              { categoryCode: { eq: "REFERENCEURL" } }
              { categoryCode: { eq: "INLINE" } }
            ]
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
        mediaType {
          data {
            attributes {
              categoryCode
            }
          }
        }
      }
    }
  }
}
`;

export const media = gql`
  query SearchTitle($search_one: String, $search_two: String, $search_three: String, $limit: Int, $skip: Int) {
    medias(
      pagination: {
        limit: $limit
        start: $skip
      }
      filters: {
        and: [
          {
            or: [
              { description: { contains: $search_one } }
              { title: { contains: $search_one } }
              { fileName: { contains: $search_one } }
              { citation: { contains: $search_one } }
              { keywords: { contains: $search_one } }
              
              { description: { contains: $search_two } }
              { title: { contains: $search_two } }
              { fileName: { contains: $search_two } }
              { citation: { contains: $search_two } }
              { keywords: { contains: $search_two } }
              
              { description: { contains: $search_three } }
              { title: { contains: $search_three } }
              { fileName: { contains: $search_three } }
              { citation: { contains: $search_three } }
              { keywords: { contains: $search_three } }
            ]
          }
          {
            mediaType: {
              or: [
                { categoryCode: { eq: "IMAGE" } }
                { categoryCode: { eq: "VIDEO" } }
                { categoryCode: { eq: "3DMODEL" } }
              ]
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
          mediaType {
            data {
              attributes {
                categoryCode
              }
            }
          }
        }
      }
    }
  }
`;
