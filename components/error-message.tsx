import { FC } from 'react'

interface Props {
  text: string
}

export const ErrorMessage: FC<Props> = ({ text }) => (
  <span className="text-sm text-secondary-error">{text}</span>
)
