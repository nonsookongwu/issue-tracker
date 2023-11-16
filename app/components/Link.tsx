import React, { ReactNode } from 'react'
import NextLink from 'next/link'
import { Link } from '@radix-ui/themes'

interface Props{
    href: string;
    children: ReactNode
}

const CustomLink = ({href, children}:Props) => {
  return (
      <NextLink href={href} passHref legacyBehavior>
          <Link>{children}</Link>
    </NextLink>
  )
}

export default CustomLink