import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { graphQLClient } from '../../services/contentful';
import POST_QUERY from '../../graphql/Queries/post.graphql'

type PostProps = {
  post: {
    publishedAt: Date
    title: string
    slug: string
    content: string
  }
}

export default function Post({ post }: PostProps) {
  return (
    <div>Post</div>
  );
}

type Params = {
  slug: string
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })
  const { slug } = params as Params;

  const { postCollection: {
    items
  } } = await graphQLClient.request(POST_QUERY, { slug })

  const formatedPosts = items.map((item: any) => {
    return {
      publishedAt: new Date(item.sys.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      title: item.title,
      slug: item.slug,
      content: item.content.json
    }
  })[0]

  // if(!session) {

  // }

  return {
    props: { post: formatedPosts }
  }
}