import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <section className='flex h-[50vh] items-center justify-center'>
        <Loader2 className='size-8 animate-spin'/>
    </section>
  )
}

export default Loading