import { gql } from "@apollo/client";

export const places = gql`
  query SearchTitle($search_one: String!, $search_two: String!) {
    places(
      filters: {
        or: [
          { placeNameEnglish: { contains: $search_one } }
          { placeNameEnglish: { contains: $search_two } }
          { siteDescription: { contains: $search_one } }
          { siteDescription: { contains: $search_two } }
          { period: { contains: $search_one } }
          { period: { contains: $search_two } }
          { keywords: { contains: $search_one } }
          { keywords: { contains: $search_two } }
        ]
      }
    
    ) {
      data {
        id
        attributes {
          placeNameEnglish
          placeNameArabic
          siteDescription
          updatedAt
          keywords
          placeNumber
          latitude
          longitude
        }
      }
    }
  }
`;

export const getAllPlaces = gql`
query {
  places {
    data {
      id
      attributes {
        placeNameEnglish
        placeNameArabic
        siteDescription
        updatedAt
        keywords
        placeNumber
        latitude
        longitude
      }
    }
  }
}`

export const events = gql`
  query SearchTitle($search_one: String!, $search_two: String!) {
    visit(
      filters: {
        or: [
          { placeNameEnglish: { contains: $search_one } }
          { placeNameEnglish: { contains: $search_two } }
          { siteDescription: { contains: $search_one } }
          { siteDescription: { contains: $search_two } }
          { period: { contains: $search_one } }
          { period: { contains: $search_two } }
          { keywords: { contains: $search_one } }
          { keywords: { contains: $search_two } }
        ]
      }
    ) {
      data {
        id
        attributes {
          placeNameEnglish
          siteDescription
          keywords
          perios
        }
      }
    }
  }
`;

export const library = gql`
  query SearchTitle($search_one: String!, $search_two: String!) {
    media(
      filters: {
        or: [
          { keywords: { contains: $search_one } }
          { keywords: { contains: $search_two } }
          { description: { contains: $search_one } }
          { description: { contains: $search_two } }
          { title: { contains: $search_one } }
          { title: { contains: $search_two } }
          { mediaType: Documents }
          { mediaType: References }
          { mediaType: InlineText }
        ]
      }
    ) {
      data {
        id
        attributes {
          keywords
          description
          title
          mediaType
        }
      }
    }
  }
`;

// export const media = gql`
//   query SearchTitle($search_one: String!, $search_two: String!) {
//     media(
//       filters: {
//         or: [
//           { keywords: { contains: $search_one } }
//           { keywords: { contains: $search_two } }
//           { description: { contains: $search_one } }
//           { description: { contains: $search_two } }
//           { title: { contains: $search_one } }
//           { title: { contains: $search_two } }
//           { mediaType: Images }
//           { mediaType: Videos }
//           { mediaType: 3Dmodel }
//         ]
//       }
//     ) {
//       data {
//         id
//         attributes {
//           keywords
//           description
//           title
//           mediaType
//         }
//       }
//     }
//   }
// `;
