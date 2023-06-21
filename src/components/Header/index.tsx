import imgLogo from '/public/images/logo.svg';
import Image from 'next/image';
import { SignInButton } from '../SignInButton';
import { ActiveLink } from '../ActiveLink';

export function Header() {

  return (
    <header className="h-20 border text-gray-800">
      <div className="px-8 flex items-center text-center justify-between">

        <nav className='ml-10 h-20 gap-6 mx-0 flex items-center'>

        <Image  src={imgLogo} alt={"ig.news"} />

          <ActiveLink activeClassName="styles" href="/">
            <a className='inline-block relative p-0 h-20 leading-10 text-gray-300'>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName="styles" href="/posts">
            <a className='inline-block relative p-0 h-20 leading-10 text-cyan'>Posts</a>
          </ActiveLink>
        </nav>
           <SignInButton />
      </div>
    </header>
  )
}