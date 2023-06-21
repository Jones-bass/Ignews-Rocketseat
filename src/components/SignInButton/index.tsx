import { FiX } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import { signIn, signOut, useSession } from 'next-auth/client'

export function SignInButton() {
  const [session] = useSession()

  return session ? (
    <button
      type="button"
      className="h-12 rounded-lg bg-gray-850 border-0 p-6 flex items-center justify-center text-white font-bold"
      onClick={() => signOut()}
    >
      <FaGithub className="w-5 h-5 mr-4" color="#04d361" />
      {session.user.name}
      <FiX className="ml-4" color="#737380" />
    </button>
  ) : (
    <button
      type="button"
      className="h-12 rounded-xl bg-gray-850 border-0 p-6 flex items-center justify-center text-white font-bold"
      onClick={() => signIn('github')}
    >
      <FaGithub className="w-5 h-5 mr-4" color="#eba417" />
      Sign in with github
    </button>
  )
}
