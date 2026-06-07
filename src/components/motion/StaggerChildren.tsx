'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  containerDelay?: number
  /**
   * Animate immediately on mount instead of when scrolled into view.
   * Use for content that can remount in-place (e.g. a filtered grid), where
   * `whileInView` wouldn't re-fire because the element is already in view.
   */
  animateOnMount?: boolean
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  containerDelay = 0,
  animateOnMount = false,
}: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion()

  const animationProps = animateOnMount
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: { once: true, margin: '-60px' } }

  return (
    <motion.div
      className={className}
      initial="hidden"
      {...animationProps}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
            delayChildren: containerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
