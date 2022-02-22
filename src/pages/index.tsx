import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from 'src/components/SubscribeButton'
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
   priceId: string
   amount: number
  }
}

export default function Home({ product }: HomeProps) {

  return (
    <div className="home">
      <Head>
        <title>
          Home | ig.news
        </title>
      </Head>

      <main className='flex items-center justify-between max-w-screen-xl my-0 mx-auto h-[calc(100vh-5rem)]'>
        <section>
          <p>
            <strong>
              Hey, welcome
            </strong>
          </p>
          <h1 className='text-7xl my-6'><strong>News about <br /> the <span className="text-sky-300 inline-block">React</span> world </strong></h1>
          <p>
            Get acess to all the publications <br />
            <span className="text-sky-300">
              <strong>
                for {product.amount} month
              </strong>
            </span>
          </p>
          <div className="mt-5">
            <SubscribeButton priceId={product.priceId} />
          </div>
        </section>
        <img src="images/avatar.svg" alt="" />
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KRF0uH1h0t9GaOU1F6v02Hy')

  const product = {
    priceId: price.id,
    amount: price.unit_amount && new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 horas
  }
}