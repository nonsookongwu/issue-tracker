'use client'
import { link } from 'fs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from "react-icons/ai"
 import classnames from 'classnames'

const NavBar = () => {
    const currentPath = usePathname()

    const links = [
        {label:'Dashboard', href: "/"},
        {label:'Issues', href: "/issues/list"},
    ]
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "text-zinc-900": currentPath === link.href,
                  "text-zinc-400": currentPath !== link.href,
                'hover:text-zinc-700 transition-colors': true
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar