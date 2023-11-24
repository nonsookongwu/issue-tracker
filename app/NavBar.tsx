'use client'
import { link } from 'fs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from "react-icons/ai"
 import classnames from 'classnames'
import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import { FaUser } from "react-icons/fa";

const NavBar = () => {

  const {status, data:session } = useSession()
    const currentPath = usePathname()

    const links = [
        {label:'Dashboard', href: "/"},
        {label:'Issues', href: "/issues/list"},
    ]
  return (
    <nav className=" border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align={"center"} gap={"5"}>
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
                      "hover:text-zinc-700 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback={<FaUser />}
                    size={"2"}
                    radius="full"
                    className='cursor-pointer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size={"2"}>{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href={"/api/auth/signout"}>LogOut</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>

              
            )}
            {status === "unauthenticated" && (
              <Link href={"/api/auth/signin"}>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar