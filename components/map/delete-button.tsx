import Image from 'next/image'
import { FC } from 'react'

interface Props {
  onDelete: () => void
}

export const DeleteButton: FC<Props> = ({ onDelete }) => (
  <button className="w-4" onClick={onDelete}>
    <Image src="/icons/cross.svg" width={15} height={15} alt="delete" />
  </button>
)
