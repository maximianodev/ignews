import React from 'react';
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export const SignInButton = () => {
  let isUseLoggedIn = true

  return isUseLoggedIn ? (
    <button className='flex items-center gap-3 bg-gray-700 py-3 px-6 rounded-full hover:brightness-[.8] transition-all'>
      <FaGithub color='#04d361' size={24} />
      Max
      <FiX color='#737380' size={14} />
    </button>
  ) : (
    <button className='flex items-center gap-3 bg-gray-700 py-3 px-6 rounded-full hover:brightness-[.8] transition-all'>
      <FaGithub color='#eba417' size={24} />
      Sign in with Github
    </button>
  )
};
