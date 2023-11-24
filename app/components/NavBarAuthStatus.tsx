import { Box, DropdownMenu, Avatar, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { FaUser } from 'react-icons/fa';

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === 'loading') return null
  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback={<FaUser />}
              size={"2"}
              radius="full"
              className="cursor-pointer"
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
        <Link
          className="text-zinc-400 hover:text-zinc-700"
          href={"/api/auth/signin"}
        >
          Login
        </Link>
      )}
    </Box>
  );
}

export default AuthStatus