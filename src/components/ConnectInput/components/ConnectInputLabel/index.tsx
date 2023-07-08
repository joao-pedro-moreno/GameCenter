import { LabelHTMLAttributes } from 'react'

interface ConnectInputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string
}

export function ConnectInputLabel({ label, ...rest }: ConnectInputLabelProps) {
  return <label {...rest}>{label}</label>
}
