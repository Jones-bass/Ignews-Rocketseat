import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'next-auth/jwt';
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string
  },
  data: {
    stripe_customer_id: string
  }
}

const checkoutSession = async (request: NextApiRequest, response: NextApiResponse) => {

  const jwt_secret = process.env.JWT_SECRET;
  const secureCookieName = '__Secure-next-auth.session-token';
  const insecureCookieName = 'next-auth.session-token';
  const encryptedToken = request.cookies[secureCookieName] || request.cookies[insecureCookieName]
  const infoUser = await jwt.getToken({ req: request, secret: jwt_secret })

  if (!encryptedToken) {
    return response.status(401).end('Usuário não está logado');
  }

  if (request.method === 'POST' && infoUser) {

    //buscar usuário cadastrado no faunadb
    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(infoUser.email)
        )
      )
    );

    let customerId = user.data.stripe_customer_id;

    if (!customerId) {

      // criar o usuário no stripe
      const stripeCustomer = await stripe.customers.create({
        email: infoUser.email
      });

      // salvar a referência do fauna, vinculado ao usuário no faunadb
      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id,
            }
          }
        )
      )
      customerId = stripeCustomer.id;
    }

    const checkoutStripeSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1JGBPOKQjMKvEOhEe8vtm1u3', quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    });

    return response.status(200).json({ sessionId: checkoutStripeSession.id });
  } else {
    response.setHeader('Allow', 'POST');
    return response.status(405).end('Allowed POST');
  }
}

export default checkoutSession;
