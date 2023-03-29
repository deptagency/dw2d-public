import dynamic from 'next/dynamic'

import HeadTag from '@/components/HeadTag/HeadTag'

const Game = dynamic(() => import('@/components/Games/Office'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <HeadTag />
      <Game />
    </>
  )
}
