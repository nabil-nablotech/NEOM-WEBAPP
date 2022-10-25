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
              {	siteType: { name:{in: [$search_one]} }}
              { siteDescription: { containsi: $search_one } }
              {	period: { name: {in: [$search_one]}}}
              { previousNumber: { containsi: $search_one } }
              { placeNumber: { containsi: $search_one } }
              { placeNameEnglish: { containsi: $search_one } }
              { placeNameArabic: { containsi: $search_one } }
              { keywords: { containsi: $search_one } }
              {	siteType: { name:{in: [$search_two]} }}
              { siteDescription: { containsi: $search_two } }
              {	period: { name: {in: [$search_two]}}}
              { previousNumber: { containsi: $search_two } }
              { placeNumber: { containsi: $search_two } }
              { placeNameEnglish: { containsi: $search_two } }
              { placeNameArabic: { containsi: $search_two } }
              { keywords: { containsi: $search_two } }
              {	siteType: { name:{in: [$search_three]} }}
              { siteDescription: { containsi: $search_three } }
              {	period: { name: {in: [$search_three]}}}
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
  $researchValue: Array
  $tourismValue: Array
  $stateOfConservation: Array
  $recommendation: Array
  $risk: Array
  $period: Array
  $latitude: Float
  $longitude: Float
  $artifacts: Array
  $limit: Int
  $skip: Int
) {
  places(
    pagination: { limit: $limit, start: $skip }
    filters: {
          or: [
            { siteDescription: { containsi: $search_one } }
            { previousNumber: { containsi: $search_one } }
            { placeNumber: { containsi: $search_one } }
            { placeNameEnglish: { containsi: $search_one } }
            { placeNameArabic: { containsi: $search_one } }
            { keywords: { containsi: $search_one } }
            { siteDescription: { containsi: $search_two } }
            { previousNumber: { containsi: $search_two } }
            { placeNumber: { containsi: $search_two } }
            { placeNameEnglish: { containsi: $search_two } }
            { placeNameArabic: { containsi: $search_two } }
            { keywords: { containsi: $search_two } }
            { siteDescription: { containsi: $search_three } }
            { previousNumber: { containsi: $search_three } }
            { placeNumber: { containsi: $search_three } }
            { placeNameEnglish: { containsi: $search_three } }
            { placeNameArabic: { containsi: $search_three } }
            { keywords: { containsi: $search_three } }
          ]
          and:[
            {	stateOfConservation: { name: {in: $stateOfConservation}}}
            {	period: { name: {in: $period}}}
            {	researchValue: { name: {in: $researchValue}}}
            {	tourismValue: { name: {in: $tourismValue}}}
            {	recommendation: { name: {in: $recommendation}}}
            {	risk: { name: {in: $risk}}}
            {	artifacts: { name: {in: $artifacts}}}
            {	latitude: { eq: $latitude }}
            {	longitude: { eq: $longitude }}
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
