import { GraphQLClient } from "graphql-request"

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}/environments/master`

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.CDA_TOKEN}`,
  },
})