import Stripe from 'stripe'

const STRIPE_API_KEY: string = process.env.STRIPE_API_KEY ?? ''

export const stripe = new Stripe(
  STRIPE_API_KEY,
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'Ignews',
      version: '0.01'
    }
  }
)