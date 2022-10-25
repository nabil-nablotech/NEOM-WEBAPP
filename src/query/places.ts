import { gql } from "@apollo/client";

export const places = gql`
  query SearchTitle(
    $search_one: String
    $search_two: String
    $search_three: String
    $limit: Int
    $skip: Int
  ) {
    places(
      pagination: { limit: $limit, start: $skip }
      filters: {
            or: [
              # {	siteType: { name:{containsi: $search_one} }}
              { siteDescription: { containsi: $search_one } }
              # {	period: { name: {containsi: $search_one}}}
              { previousNumber: { containsi: $search_one } }
              { placeNumber: { containsi: $search_one } }
              { placeNameEnglish: { containsi: $search_one } }
              { placeNameArabic: { containsi: $search_one } }
              { keywords: { containsi: $search_one } }
              # {	siteType: { name:{containsi: $search_two} }}
              { siteDescription: { containsi: $search_two } }
              # {	period: { name: {containsi: $search_two}}}
              { previousNumber: { containsi: $search_two } }
              { placeNumber: { containsi: $search_two } }
              { placeNameEnglish: { containsi: $search_two } }
              { placeNameArabic: { containsi: $search_two } }
              { keywords: { containsi: $search_two } }
              # {	siteType: { name:{containsi: $search_three} }}
              { siteDescription: { containsi: $search_three } }
              # {	period: { name: {containsi: $search_three}}}
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

export const refinePlaces = gql`
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
  $artifacts: String
  $limit: Int
  $skip: Int
) {
  places(
    pagination: { limit: $limit, start: $skip }
    filters: {
          or: [
            {	stateOfConservation: { name: {containsi: $stateOfConservation}}}
            {	recommendation: { name: {containsi: $recommendation}}}
            {	risk: { name: {containsi: $risk}}}
            {	researchValue: { name: {containsi: $researchValue}}}
            {	tourismValue: { name: {containsi: $tourismValue}}}
            {	latitude: { containsi: $latitude }}
            {	longitude: { containsi: $longitude }}
            {	period: { name: {containsi: $period}}}
            {	artifacts: { name: {containsi: $artifacts}}}
            {	siteType: { name:{containsi: $search_one} }}
            { siteDescription: { containsi: $search_one } }
            {	period: { name: {containsi: $search_one}}}
            { previousNumber: { containsi: $search_one } }
            { placeNumber: { containsi: $search_one } }
            { placeNameEnglish: { containsi: $search_one } }
            { placeNameArabic: { containsi: $search_one } }
            { keywords: { containsi: $search_one } }
            {	siteType: { name:{containsi: $search_two} }}
            { siteDescription: { containsi: $search_two } }
            {	period: { name: {containsi: $search_two}}}
            { previousNumber: { containsi: $search_two } }
            { placeNumber: { containsi: $search_two } }
            { placeNameEnglish: { containsi: $search_two } }
            { placeNameArabic: { containsi: $search_two } }
            { keywords: { containsi: $search_two } }
            {	siteType: { name:{containsi: $search_three} }}
            { siteDescription: { containsi: $search_three } }
            {	period: { name: {containsi: $search_three}}}
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
