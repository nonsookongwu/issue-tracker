import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const NavLinks = () => {

    const currentPath = usePathname();

    const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues", href: "/issues/list" },
    ];
  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "text-zinc-900": currentPath === link.href,
              "text-zinc-400": currentPath !== link.href,
              "hover:text-zinc-700 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks