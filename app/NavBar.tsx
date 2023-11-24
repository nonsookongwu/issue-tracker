'use client'
import { Container, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai"
import AuthStatus from './components/NavBarAuthStatus'
import NavLinks from './components/NavBarLinks'

const NavBar = () => {

  
    
  return (
    <nav className=" border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align={"center"} gap={"5"}>
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <NavLinks/>
          </Flex>
          <AuthStatus/>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar