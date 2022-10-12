import { useQuery, gql } from "@apollo/client";

export const places = gql`
query SearchTitle($search_one: String!, $search_two: String!){
  places(filters: { or:[{title: {contains:$search_one}},{title: {contains:$search_two}}] }) {
    data {
      id
      attributes{
        title
        description
      }
    }
  }
}
`;

export const events = gql`
query SearchTitle($search_one: String!, $search_two: String!){
  events(filters: { or:[{title: {contains:$search_one}},{title: {contains:$search_two}}] }) {
    data {
      id
      attributes{
        title
        description
      }
    }
  }
}
`;