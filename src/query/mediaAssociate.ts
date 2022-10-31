import { gql } from "@apollo/client";

export const createMediaAssociate = gql`
mutation CreateMediaAssociate(
  $place_unique_id: ID
  $visit_unique_id: ID
  $media_unique_id: ID
) {
  createMediaAssociate(
    data: {
      place_unique_id: $place_unique_id
      visit_unique_id: $visit_unique_id
      media_unique_id: $media_unique_id
    }
  ) {
    data {
      id
      attributes {
        place_unique_id {
          data {
            id
            attributes {
              uniqueId
            }
          }
        }
      }
    }
  }
}
`
