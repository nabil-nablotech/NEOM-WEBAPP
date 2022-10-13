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
        ]
      }
    ) {
      data {
        id
        attributes {
          placeNameEnglish
          siteDescription
          period
        }
      }
    }
  }
`;

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
        ]
      }
    ) {
      data {
        id
        attributes {
          title
          description
        }
      }
    }
  }
`;
