import React from 'react';
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, useSession, signOut } from 'next-auth/react'

export const SignInButton = () => {
  const { data: session } = useSession()

  return session ? (
    <button className='flex items-center gap-3 bg-gray-700 py-3 px-6 rounded-full hover:brightness-[.8] transition-all text-sm'
      onClick={() => signOut()}
    >
      <img
        src={session.user?.image ?? ''}
        alt={session.user?.name ?? ''}
        width="25px"
        className='rounded-full'
      />
      {session.user?.name}
      <FiX color='#737380' size={14} />
    </button>
  ) : (
    <button
      className='flex items-center gap-3 bg-gray-700 py-3 px-6 rounded-full hover:brightness-[.8] transition-all text-sm'
      onClick={() => signIn('github')}
    >
      <FaGithub color='#eba417' size={24} />
      Sign in with Github
    </button>
  )
};
