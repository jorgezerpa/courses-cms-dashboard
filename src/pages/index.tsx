import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, isLoading, error } = useUser()

  return (

    <>
      <h1 className="text-3xl font-bold underline text-purple-600">
        Hello world!
      </h1>
      <h2>this is an auth 0 authentication test :)</h2>
      {/* <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a> */}

      { (!isLoading && !error) && (
        <div>
          <p>{ user?.name }</p>
          <p>{ user?.email }</p>
          <p>{ user?.nickname }</p>
        </div>
      )}
    </>
  )
}
