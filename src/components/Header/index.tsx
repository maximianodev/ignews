import Link from 'next/link';
import React from 'react'
import ActiveLink from '../ActiveLink';
import { SignInButton } from '../SignInButton';

export const Header = () => {
  return <header className='border-b-2 border-[#29292E]'>
    <div className='flex items-center max-w-screen-xl my-0 mx-auto px-5'>
      <Link href='/'>
        <a>
          <img src="/images/logo.svg" alt="ig.news" />
        </a>
      </Link>
      <nav className='flex items-center pl-16 gap-5'>
        <ActiveLink href='/' activeClassName={'border-b-yellow text-yellow'}>
          <a>Home</a>
        </ActiveLink>
        <ActiveLink href='/posts' activeClassName={'border-b-yellow text-yellow'}>
          <a>Posts</a>
        </ActiveLink>
      </nav>
      <div className="ml-auto">
        <SignInButton />
      </div>
    </div>
  </header>;
};
