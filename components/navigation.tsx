'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cn from 'classnames'
import { NavLink } from '@/types'

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Map', href: '/map' }
]

const Navigation = () => {
  const pathname = usePathname()

  const isActive = (href: string) => href === pathname

  return (
    <nav>
      <ul className="flex gap-x-2">
        {navLinks.map((link) => (
          <li key={link.name + link.href}>
            <Link
              className={cn(
                'text-primary-light border-t-2 border-b-2 border-secondary-transparent py-1',
                {
                  'border-primary-light': isActive(link.href)
                }
              )}
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
