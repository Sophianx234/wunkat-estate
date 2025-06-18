'use client'

import { ReactNode, useEffect, useState } from "react"

type clientOnlyProps = {
  children: ReactNode
}
export function ClientOnly({children}:clientOnlyProps) {
const [hasMounted,setHasMounted]= useState<boolean>(false)
useEffect(()=>{
  setHasMounted(true)
},[])

if(!hasMounted) return null
return <>{children}</>
}

export default ClientOnly
