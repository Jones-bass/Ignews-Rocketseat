import { FiX } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import { signIn, signOut, useSession } from 'next-auth/client'

export function SignInButton() {
  const [session] = useSession()

  return session ? (
    <button
      type="button"
      className="h-12 rounded-full bg-gray-850 border-0 px-6 flex items-center justify-center text-white font-bold transition duration-200 hover:filter hover:brightness-80"
      onClick={() => signOut()}
    >
      <FaGithub className="w-5 h-5 mr-4" color="#04d361" />
      {session.user.name}
      <FiX className="ml-4" color="#737380" />
    </button>
  ) : (
    <button
      type="button"
      className="h-12 rounded-full bg-gray-850 border-0 px-6 flex items-center justify-center text-white font-bold transition duration-200 hover:filter hover:brightness-80"
      onClick={() => signIn('github')}
    >
      <FaGithub className="w-5 h-5 mr-4" color="#eba417" />
      Sign in with github
    </button>
  )
}
