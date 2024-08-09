'use client'

import { FC } from 'react'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

const GlobalError: FC<Props> = ({ error, reset }) => {
  console.error(error)

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}

export default GlobalError
