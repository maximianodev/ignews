import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, cloneElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  activeClassName: string
}

function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter()

  const defaultClassName = 'py-7 border-b-2 border-b-transparent hover:border-yellow hover:text-yellow active:text-yellow hover:font-bold active::font-bold transition-colors'
  const className = asPath === rest.href ? `${defaultClassName} ${activeClassName}` : defaultClassName

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className
      })}
    </Link>
  )
}

export default ActiveLink