import Image from 'next/image'
import { FC } from 'react'
import cn from 'classnames'

interface Props {
  isDisabled: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const DeletingConfirmation: FC<Props> = ({
  isDisabled,
  onConfirm,
  onCancel
}) => (
  <div
    className={cn('flex gap-x-1', {
      'opacity-40': isDisabled
    })}
  >
    <button
      className="w-4"
      title="Confirm"
      disabled={isDisabled}
      onClick={onConfirm}
    >
      <Image src="/icons/confirm.svg" width={15} height={15} alt="confirm" />
    </button>

    <button
      className="w-4"
      title="Cancel"
      disabled={isDisabled}
      onClick={onCancel}
    >
      <Image src="/icons/cross.svg" width={15} height={15} alt="cancel" />
    </button>
  </div>
)
