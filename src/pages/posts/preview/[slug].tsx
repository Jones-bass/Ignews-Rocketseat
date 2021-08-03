import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next";
import { useSession } from "next-auth/client";
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IPostsProps } from '..';
import { getPostPreview } from "../../../services/prismic";
import styles from '../post.module.scss';

export default function PostPreview({ post }: IPostsProps) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session?.activeSubscription){
      router.push(`/posts/${post.slug}`);
      return;
    }

  }, [post.slug, router, session])

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={`${styles.postContent} ${styles.previewContent}`} dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a href="">Subscribe now 😁</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }): Promise<GetStaticPropsResult<IPostsProps>> => {
  const { slug } = params;

  const post = await getPostPreview(String(slug));

  return {
    props: {
      post
    },
    revalidate:60*30 // 30 min
  }
}
