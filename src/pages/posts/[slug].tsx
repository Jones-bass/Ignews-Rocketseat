import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getSession } from 'next-auth/client'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../../services/prismic'

interface PostProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className="max-w-[1120px] mx-auto px-2">
        <article className="max-w-[720px] my-auto mt-5">
          <h1 className="text-3xl font-black">{post.title}</h1>
          <time className="block text-base text-gray-300 mt-6">
            {post.updatedAt}
          </time>
          <div
            className="mt-8 leading-8 text-lg text-gray-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req })
  const { slug } = params

  console.log(session)

  const prismic = getPrismicClient(req)

  const response = await prismic.getByUID('ignews', String(slug), {})

  const post = {
    slug,
    title: response.data.title,
    content: RichText.asHtml(response.data.content),
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
  }
}
