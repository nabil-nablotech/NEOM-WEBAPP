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

export const refineEvents = gql`
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
    $assessmentType: String
    $latitude: Float
    $longitude: Float
    $artifacts: String
    $limit: Int
    $skip: Int
  ) {
    visits(
      pagination: { limit: $limit, start: $skip }
      filters: {
        or: [
          {	stateOfConservation: { name: {containsi: $stateOfConservation}}}
          {	recommendation: { name: {containsi: $recommendation}}}
          {	risk: { name: {containsi: $risk}}}
          {	researchValue: { name: {containsi: $researchValue}}}
          {	tourismValue: { name: {containsi: $tourismValue}}}
          { assessmentType: {name: {containsi: $assessmentType}}}
          {	latitude: { containsi: $latitude }}
          {	longitude: { containsi: $longitude }}
          {	period: { name: {containsi: $period}}}
          {	artifacts: { name: {containsi: $artifacts}}}
          {	siteType: { name:{containsi: $search_one} }}
          { siteDescription: { containsi: $search_one } }
          {	period: { name: {containsi: $search_one}}}
          { recordingTeam: { containsi: $search_one } }
          { fieldNarrative: { containsi: $search_one } }
          { keywords: { containsi: $search_one } }
          {	siteType: { name:{containsi: $search_two} }}
          { siteDescription: { containsi: $search_two } }
          {	period: { name: {containsi: $search_two}}}
          { recordingTeam: { containsi: $search_two } }
          { fieldNarrative: { containsi: $search_two } }
          { keywords: { containsi: $search_two } }
          {	siteType: { name:{containsi: $search_three} }}
          { siteDescription: { containsi: $search_three } }
          {	period: { name: {containsi: $search_three}}}
          { recordingTeam: { containsi: $search_three } }
          { fieldNarrative: { containsi: $search_three } }
          { keywords: { containsi: $search_three } }
          {
            visit_associate: {
              placeUniqueId: { placeNameEnglish: { containsi: $search_one } }
            }
          }
          {
            visit_associate: {
              placeUniqueId: { placeNameEnglish: { containsi: $search_two } }
            }
          }
          {
            visit_associate: {
              placeUniqueId: { placeNameEnglish: { containsi: $search_three } }
            }
          }
          {
            visit_associate: {
              placeUniqueId: { placeNameArabic: { containsi: $search_one } }
            }
          }
          {
            visit_associate: {
              placeUniqueId: { placeNameArabic: { containsi: $search_two } }
            }
          }
          {
            visit_associate: {
              placeUniqueId: { placeNameArabic: { containsi: $search_three } }
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