import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'

interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    if (session.activeSubscription) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data
      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <button
      type="button"
      className="w-[260px] h-16 rounded-full bg-yellow-500 hover:bg-yellow-700 text-gray-900 text-xl font-bold border-0 flex items-center justify-center mt-8"
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  )
}
