import React from 'react'
import { GetStaticProps } from 'next'

import { GraphQLClient, gql } from 'graphql-request'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import Head from 'next/head'
import Link from 'next/link'
import { graphQLClient } from '../../services/contentful'

import POSTS_QUERY from '../../graphql/Queries/posts.graphql'

type Post = {
  publishedAt: Date
  title: string
  slug: string
  content: string
  excerpt: string
}

interface PostsProps {
  posts: Post[]
}

const RICH_TEXT_OPTIONS: any = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
      return <p>{children}</p>
    }
  }
}

function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <div className="max-w-screen-md mx-auto mt-10 px-5">
        {posts.map((post: Post) => <Link href={`/posts/${post.slug}`} key={post.title}>
          <a className="block mb-10 border-b-[1px] border-[#323238] pb-5 hover:text-yellow transition-colors" >
            <time className='block mb-3 text-[#A8A8B3]'>{post.publishedAt}</time>
            <h3 className='mb-2'>
              <strong>{post.title}</strong>
            </h3>
            <p className='text-[#A8A8B3]'>{post.excerpt}</p>
            {/* <div>{documentToReactComponents(post.content.json, RICH_TEXT_OPTIONS)}</div> */}
          </a>
        </Link>)}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { postCollection: {
    items
  } } = await graphQLClient.request(POSTS_QUERY)

  const formatedPosts = items.map((item: any) => {
    return {
      publishedAt: new Date(item.sys.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      title: item.title,
      slug: item.slug,
      content: item.content.json,
      excerpt: item.content.json.content.find((item: any) => item.nodeType === 'paragraph')?.content[0].value ?? ''
    }
  })

  return {
    props: {
      posts: formatedPosts
    }
  }
}
export default Posts