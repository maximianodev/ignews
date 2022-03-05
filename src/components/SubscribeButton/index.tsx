import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'

interface SubscribeButtonProps {
  priceId: string
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return;
    }

    if(session.activeSubscription) {
      router.push('/posts')
      return;
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      const stripe = await getStripeJs()

      await stripe?.redirectToCheckout({sessionId})
    } catch (err) {
      alert(err)
    }
  }

  return <button
    type='button'
    className='rounded-full px-12 py-4 bg-yellow text-black font-bold hover:opacity-75 transition-all'
    onClick={handleSubscribe}
  >
    Subscribe now
  </button>
}
