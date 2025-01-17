import React from 'react'
import Loader from '../Loader'

interface LoadingStateProp {
  children: React.ReactNode
  isLoading: boolean
}

export const LoadingState: React.FC<LoadingStateProp> = ({
  children,
  isLoading
}) => {
  if (!isLoading) return children
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40vh'
      }}
    >
      <Loader />
    </div>
  )
}
