import { gql } from "@apollo/client";

export const places = gql`
  query SearchTitle($search_one: String!) {
    places(
      filters: {
        or: [
          { placeNameEnglish: { contains: $search_one } }
          { siteDescription: { contains: $search_one } }
          { period: { contains: $search_one } }
          { keywords: { contains: $search_one } }
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
          period
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
          recommendations {
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
  query SearchTitle($search_one: String!) {
    visits(
      filters: {
        or: [
          { recordingTeam: { contains: $search_one } }
          { siteDescription: { contains: $search_one } }
          { period: { contains: $search_one } }
          { keywords: { contains: $search_one } }
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
          period
          type
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
          recommendations {
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
query SearchTitle($search_one: String!) {
  medias(
    filters: {
      and: [
        {
          or: [
            { keywords: { contains: $search_one } }
            { description: { contains: $search_one } }
            { title: { contains: $search_one } }
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
        uniqueId
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
  query SearchTitle($search_one: String!, $search_two: String!) {
    medias(
      filters: {
        and: [
          {
            or: [
              { keywords: { contains: $search_one } }
              { keywords: { contains: $search_two } }
              { description: { contains: $search_one } }
              { description: { contains: $search_two } }
              { title: { contains: $search_one } }
              { title: { contains: $search_two } }
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
          uniqueId
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
