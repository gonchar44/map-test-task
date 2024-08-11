import Image from 'next/image'
import { ButtonLink } from '@/components'

const NotFound = () => (
  <main className="min-h-full flex flex-col items-center my-20 gap-y-5">
    {/*Text info block*/}
    <div className="flex flex-col items-center">
      <Image
        priority
        src="/icons/not-found.svg"
        width={150}
        height={150}
        alt="404"
      />
      <h2 className="text-h2 font-bold text-secondary-error">Not Found</h2>
      <p>Could not find requested resource</p>
    </div>

    <ButtonLink href="/" text="Return Home" />
  </main>
)

export default NotFound
