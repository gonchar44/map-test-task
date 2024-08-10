import { FC } from 'react'
import Link from 'next/link'

interface Props {
  href: string
  text: string
}

export const ButtonLink: FC<Props> = ({ href, text }) => (
  <Link
    className="bg-primary-muted rounded-3xl font-bold text-primary-light px-3 py-2"
    href={href}
  >
    {text}
  </Link>
)
