import imgLogo from '/public/images/logo.svg';
import Image from 'next/image';
import styles from './styles.module.scss';
import { SignInButton } from '../SignInButton';

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={imgLogo} alt={"ig.news"} />
        <nav>
            <a className={styles.active}>Home</a>
                <a>Posts</a>
           </nav>
           <SignInButton />
      </div>
    </header>
  )
}