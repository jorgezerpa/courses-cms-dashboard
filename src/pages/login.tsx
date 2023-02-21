import { useUser } from '@auth0/nextjs-auth0/client';

export default function Login() {
  const { user, isLoading, error,  } = useUser()
  console.log(user)

  return (
    <>
    <div>
      <a href="/api/auth/login">Login</a>
    </div>
    <div>
      <a href="/api/auth/logout">Logout</a>
    </div>

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
