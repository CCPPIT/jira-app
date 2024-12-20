import { getCurrent } from '@/features/auth/queries'
import SignUpCard from '@/features/auth/compnonets/sign-up-card'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const SignUpPage = async(props: Props) => {

  const user= await getCurrent()
  if(user) redirect("/")
  return (
   <SignUpCard/>
  )
}

export default SignUpPage