import React, { useEffect } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';

// Queries
import { graphQLClient } from '../../../services/contentful';
import POST_QUERY from '../../../graphql/Queries/post.graphql'
import { RichTextRender } from '../../../components/RichTextRender';

// Contentful
import type { Document } from '@contentful/rich-text-types'
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type PostPreviewProps = {
  post: {
    publishedAt: Date
    title: string
    slug: string
    content: Document
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <div className="max-w-screen-md mx-auto mt-10 px-5">
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <h1 className='text-5xl font-bold'>{post.title}</h1>
      <div className="my-10">
        <time className='block mb-3 text-[#A8A8B3]'>
          {post.publishedAt}
        </time>
      </div>
      <div className="relative">
        <RichTextRender postContent={post.content} />
        <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
      <Link href="/">
        <a className="group block mx-auto max-w-max px-20 py-5 bg-[#1F2729] rounded-full font-bold">
          Wanna continue reading? <span className="text-yellow group-hover:underline">Subscribe now 🤗</span>
        </a>
      </Link>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

type Params = {
  slug: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
      content: {
        data: {},
        content: item.content.json.content.splice(0, 3),
        nodeType: 'document'
      }
    }
  })[0]

  return {
    props: { post: formatedPosts },
    redirect: 60 * 30 // 30 minutes
  }
}