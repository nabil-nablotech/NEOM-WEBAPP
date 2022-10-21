import { gql } from "@apollo/client";

export const events = gql`
  query SearchTitle(
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
          {
            visit_associate: {
              placeUniqueId: { placeNameEnglish: { contains: $search_one } }
            }
          }
          {
            visit_associate: {
              placeUniqueId: { placeNameEnglish: { contains: $search_two } }
            }
          }
          {
            visit_associate: {
              placeUniqueId: { placeNameEnglish: { contains: $search_three } }
            }
          }
          {
            visit_associate: {
              placeUniqueId: { placeNameArabic: { contains: $search_one } }
            }
          }
          {
            visit_associate: {
              placeUniqueId: { placeNameArabic: { contains: $search_two } }
            }
          }
          {
            visit_associate: {
              placeUniqueId: { placeNameArabic: { contains: $search_three } }
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
          recordingTeam
          siteDescription
          updatedAt
          createdAt
          keywords
          visitNumber
          latitude
          longitude
          uniqueId
          type
          period {
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
          media_associates {
            data {
              attributes {
                mediaUniqueId {
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
                placeUniqueId {
                  data {
                    attributes {
                      placeNumber
                      placeNameEnglish
                      placeNameArabic
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
