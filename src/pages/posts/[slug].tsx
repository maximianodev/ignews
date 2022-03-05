import React from 'react';
import type { GetServerSideProps } from 'next';

import { getSession } from 'next-auth/react';

// Queries
import { graphQLClient } from '../../services/contentful';
import POST_QUERY from '../../graphql/Queries/post.graphql'
import { RichTextRender } from 'src/components/RichTextRender';

// Contentful
import type { Document } from '@contentful/rich-text-types'
import Head from 'next/head';

type PostProps = {
  post: {
    publishedAt: Date
    title: string
    slug: string
    content: Document
  }
}

export default function Post({ post }: PostProps) {
  return (
    <div className="max-w-screen-md mx-auto mt-10 px-5">
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <h1 className='text-5xl font-bold'>{post.title}</h1>
      <div className="my-10">
        <time className='block mb-3 text-[#A8A8B3]'>{post.publishedAt}</time>
      </div>
      <RichTextRender postContent={post.content} />
    </div>
  );
}

type Params = {
  slug: string
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })

  if(!session?.activeSubscription) {
    return {
      redirect: { 
        destination: `/posts/preview/${params?.slug}`,
        permanent: false
      }
    }
  }

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

  return {
    props: { post: formatedPosts }
  }
}