import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'
import Prismic from '@prismicio/client'
import Link from 'next/link'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'ignews')],
    {
      fetch: ['ignews.title', 'ignews.content'],
      pageSize: 100,
    },
  )

  const posts = response.results.map((post) => {
    const data = post.data as {
      title: string;
      content: { type: string; text?: string }[];
    };

    const lastPublicationDate = post.last_publication_date
    ? new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '';

    return {
      slug: post.uid,
      title: data.title,
      excerpt:
        data.content.find((content) => content.type === 'paragraph')?.text ?? '',
      updatedAt: lastPublicationDate,
    }
  })

  return {
    props: { posts },
  }
}



