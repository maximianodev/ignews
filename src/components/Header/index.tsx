import React from 'react'
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export const Header = () => {
  return <header className='border-b-2 border-gray-700'>
    <div className='flex items-center max-w-screen-xl my-0 mx-auto'>
      <div>
        <img src="images/logo.svg" alt="ig.news" />
      </div>
      <nav className='flex items-center pl-16 gap-5'>
        <a href="#" className='py-7'>Home</a>
        <a href="#" className='py-7'>Posts</a>
      </nav>
      <div className="ml-auto">
        <SignInButton />
      </div>
    </div>
  </header>;
};
