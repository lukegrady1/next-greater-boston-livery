'use client'

import { useState, useEffect } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { CustomCursor } from '@/components/ui/CustomCursor'

function useHasFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(false)
  useEffect(() => {
    setHasFinePointer(window.matchMedia('(pointer: fine)').matches)
  }, [])
  return hasFinePointer
}

export function ClientProviders() {
  const hasFinePointer = useHasFinePointer()
  useLenis()

  return hasFinePointer ? <CustomCursor /> : null
}
