import React from 'react'

// Contentful
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Document } from '@contentful/rich-text-types'

type RichTextRenderProps = {
  postContent: Document
}

const RICH_TEXT_OPTIONS: object = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Document, children: string) => {
      if (children.length === 1) {
        if (children[0] === '') {
          return null
        }
      }

      return <p className='my-3 leading-6'>{children}</p>
    },
    [BLOCKS.HEADING_2]: (node: Document, children: string) => {
      return <h2 className='text-3xl text-bold mb-2 mt-6'>{children}</h2>
    },
    [BLOCKS.HEADING_3]: (node: Document, children: string) => {
      return <h3 className='text-2xl text-bold mb-2 mt-6'>{children}</h3>
    }
  }
}

export const RichTextRender = ({ postContent }: RichTextRenderProps) => {
  return (
    <>
      {documentToReactComponents(postContent, RICH_TEXT_OPTIONS)}
    </>
  )
}