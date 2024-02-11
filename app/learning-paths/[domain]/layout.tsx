import DomainNav from '@/components/domain/domain-nav'
import { domains } from '@/config/domains'
import React from 'react'


interface DomainLayoutProps {
    children: React.ReactNode,
    params: {
        domain: typeof domains[number]["id"]
    }
}

const DomainLayout = ({children, params}: DomainLayoutProps) => {
  return (
    <>
    <div className="container">
        <section>
          <DomainNav />
          <div className="overflow-hidden rounded-[0.5rem]">
            {children}
          </div>
        </section>
      </div>
    </>
  )
}

export default DomainLayout