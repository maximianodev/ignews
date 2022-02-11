import React from 'react'

interface SubscribeButtonProps {
  priceId: string
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
console.log("🚀 ~ file: index.tsx ~ line 8 ~ SubscribeButton ~ priceId", priceId)
  return <button
    type='button'
    className='rounded-full px-12 py-4 bg-yellow text-black font-bold hover:opacity-75 transition-all'
  >
    Subscribe now
  </button>
}
