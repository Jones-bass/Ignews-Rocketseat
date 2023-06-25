import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className="max-w-screen-lg mx-auto px-8 h-[calc(100vh - 5rem)] flex items-center justify-between">
        <section className="max-w-[600px]">
          <span className="text-2xl font-bold">👏 Hey, welcome</span>
          <h1 className="text-6xl leading-12 font-black mt-10">
            News about the <span className="text-cyan">React</span> world.
          </h1>
          <p className="text-2xl leading-9 mt-6">
            Get access to all the publications <br />
            <span className="font-bold text-cyan">
              for {product.amount} month
            </span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="girl coding." />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JGBPOKQjMKvEOhEe8vtm1u3')

  const product = {
    priceId: price.id,
    amount: price.unit_amount
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price.unit_amount / 100)
      : null,
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
