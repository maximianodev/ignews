import React from 'react'
import { GetStaticProps } from 'next'

import { GraphQLClient, gql } from 'graphql-request'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'

const RICH_TEXT_OPTIONS: any = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
      return <p>{children}</p>
    }
  }
} 

function Posts({ posts }: any) {
  return (
    <div>
      {posts.map((post: any) => <>
        <h3>{post.title}</h3>
        <div>{documentToReactComponents(post.content.json, RICH_TEXT_OPTIONS)}</div>
      </>)}
      </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}/environments/master`

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.CDA_TOKEN}`,
    },
  })

  const query = gql`
  query {
    postCollection {
      items {
        title
        content {
          json
        }
      }
    }
  }
  `

  const { postCollection: {
    items
  } } = await graphQLClient.request(query)

  return {
    props: {
      posts: items
    }
  }
}
export default Posts