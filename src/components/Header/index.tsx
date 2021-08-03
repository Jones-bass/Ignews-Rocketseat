import imgLogo from '/public/images/logo.svg';
import Image from 'next/image';
import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton/index';
import styles from './styles.module.scss';

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={imgLogo} alt={"ig.news"} />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a className={styles.active}>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}