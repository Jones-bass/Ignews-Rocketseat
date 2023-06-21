import { GetStaticPaths, GetStaticProps } from 'next'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { RichText } from 'prismic-dom'
import { useEffect } from 'react'
import { getPrismicClient } from '../../../services/prismic'

interface PostPreviewProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className='max-w-[1120px] p-0 m-0 bg-cyan'>
        <article className='max-w-[720px] m-0'>
          <h1 className='text-5xl font-black'>{post.title}</h1>
          <time className='text-base flex items-center text-gray-300'>{post.updatedAt}</time>
          <div
            className={`${'mt-8 leading-8 text-lg text-gray-100'} ${'bg-gradient-to-t from-gray-100 to-transparent text-transparent'}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className='p-8 text-center bg-gray-850 text-xl font-bold m-16'>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('ignews', String(slug), {})

  const post = {
    slug,
    title: response.data.title,
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  }

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  }
}
