import { forwardRef, InputHTMLAttributes } from 'react'

const Field = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((_, ref) => (
  <input
    className="w-96 border-2 border-black rounded-2xl px-2 py-1 outline-0 text-black"
    type="text"
    ref={ref}
  />
))

Field.displayName = 'Field'

export default Field
