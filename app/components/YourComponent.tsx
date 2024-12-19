'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function YourComponent() {
  const searchParams = useSearchParams()
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div>Loading...</div>
  }
  
  const params = searchParams.toString()
  
  return (
    <div>
      {params ? (
        <p>Search params: {params}</p>
      ) : (
        <p>No search parameters in URL</p>
      )}
    </div>
  )
} 