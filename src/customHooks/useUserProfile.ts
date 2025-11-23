import { useOutletContext } from 'react-router-dom'
import { Dispatch, SetStateAction } from 'react'
import { UserProfile } from '../domain/userProfile'

export type ContextType = { 
  profile: UserProfile,
  setProfile: Dispatch<SetStateAction<UserProfile>>,
  profileOG: UserProfile,
  setProfileOG: Dispatch<SetStateAction<UserProfile>>,
  checkChanges: () => void
}

export function useUserProfile() {
  return useOutletContext<ContextType>()
}