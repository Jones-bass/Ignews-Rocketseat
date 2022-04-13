/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton_";
import styles from "../pages/home.module.scss";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
} 

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            {" "}
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>{product.amount} month</span>
          </p>
          <SubscribeButton/>
        </section>

        <img src="/images/avatar.svg" alt="girl coding." />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1JGBPOKQjMKvEOhEe8vtm1u3', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  } ;

  return {
    props: {
      product,
    }
  }
}
