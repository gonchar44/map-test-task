import Link from 'next/link'
import Navigation from '@/components/navigation'

const Header = () => (
  <header className="bg-primary-muted py-5 px-10 flex justify-between items-center sticky top-0 left-0 z-10">
    <div className="flex items-center gap-x-3">
      <h1 className="w-max border-2 text-primary-light font-bold py-1 px-2">
        <Link href="/">Map.</Link>
      </h1>

      <span className="text-primary-light italic">Just check your map</span>
    </div>

    <Navigation />
  </header>
)

export default Header
