import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import styles from './styles.module.scss';
import { getPrismicClient } from '../../services/prismic';


export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#"></a>
          <time>15 de abril de 2022</time>
          <strong>Jones Bass Testando</strong>
          <p>Hum vamos ao conteudo</p>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'publication')
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  });

  console.log(response)

  return {
    props: {
    }
  }
}