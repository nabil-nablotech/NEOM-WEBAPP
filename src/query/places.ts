import { gql } from "@apollo/client";

export const places = gql`
  query SearchTitle(
    $search_one: String
    $search_two: String
    $search_three: String
    $researchValue: String
    $tourismValue: String
    $stateOfConservation: String
    $recommendation: String
    $risk: String
    $period: String
    $latitude: Float
    $longitude: Float
    $language: String
    $limit: Int
    $skip: Int
  ) {
    places(
      pagination: { limit: $limit, start: $skip }
      filters: {
        and: [
          { latitude: { containsi: $latitude } }
          { longitude: { containsi: $longitude } }
          {
            period: {
              translation: {
                locale: {
                  or: [{ value: { containsi: $period } }]
                  languages: { name: { containsi: $language } }
                }
              }
            }
          }
          {
            risk: {
              translation: {
                locale: {
                  or: [{ value: { containsi: $risk } }]
                  languages: { name: { containsi: $language } }
                }
              }
            }
          }
          {
            recommendation: {
              translation: {
                locale: {
                  or: [{ value: { containsi: $recommendation } }]
                  languages: { name: { containsi: $language } }
                }
              }
            }
          }
          {
            researchValue: {
              translation: {
                locale: {
                  or: [{ value: { containsi: $researchValue } }]
                  languages: { name: { containsi: $language } }
                }
              }
            }
          }
          {
            stateOfConservation: {
              translation: {
                locale: {
                  or: [{ value: { containsi: $stateOfConservation } }]
                  languages: { name: { containsi: $language } }
                }
              }
            }
          }
          {
            tourismValue: {
              translation: {
                locale: {
                  or: [{ value: { contains: $tourismValue } }]
                  languages: { name: { containsi: $language } }
                }
              }
            }
          }
        ]
        or: [
          # {siteType: { containsi: $search_one }}
          { siteDescription: { containsi: $search_one } }
          # {period: { containsi: $search_one }}
          { previousNumber: { containsi: $search_one } }
          { placeNumber: { containsi: $search_one } }
          { placeNameEnglish: { containsi: $search_one } }
          { placeNameArabic: { containsi: $search_one } }
          { keywords: { containsi: $search_one } }
          # {siteType: { containsi: $search_two }}
          { siteDescription: { containsi: $search_two } }
          # {period: { containsi: $search_two }}
          { previousNumber: { containsi: $search_two } }
          { placeNumber: { containsi: $search_two } }
          { placeNameEnglish: { containsi: $search_two } }
          { placeNameArabic: { containsi: $search_two } }
          { keywords: { containsi: $search_two } }
          # {siteType: { containsi: $search_three }}
          { siteDescription: { containsi: $search_three } }
          # {period: { containsi: $search_three }}
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
          type
          siteDescription
          updatedAt
          keywords
          placeNumber
          latitude
          longitude
          uniqueId
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
        }
      }
    }
  }
`;
