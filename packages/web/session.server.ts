import { createCookieSessionStorage } from 'react-router'

type SessionData = {
  userId: string
}

type SessionFlashData = {
  error: string
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session',
    },
  })

  export { getSession, commitSession, destroySession }