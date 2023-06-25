import imgLogo from '../../../public/images/logo.svg'
import Image from 'next/image'
import { SignInButton } from '../SignInButton'
import { ActiveLink } from '../ActiveLink'

export function Header() {
  return (
    <header className="h-20 border-b mx-auto text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center  justify-between">
        <nav className="ml-10 h-20 gap-2 space-x-8 flex items-center  justify-between">
          <Image src={imgLogo} alt={'ig.news'} />

          <ActiveLink
            activeClassName="text-white font-bold leading-[0.3rem] w-11 shadow-[0px_37px_0px_0px] rounded-t-md"
            href="/"
          >
            <a>Home</a>
          </ActiveLink>
          <ActiveLink
            activeClassName="text-white font-bold leading-[0.3rem] w-11 shadow-[0px_37px_0px_0px] rounded-t-md"
            href="/posts"
          >
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}
