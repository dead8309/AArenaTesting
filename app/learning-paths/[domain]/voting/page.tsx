import { DomainPageParams, PageParams } from '@/types/url-params'
import React from 'react'


const VotingPage = ({ params }:DomainPageParams) => {
    
  return (
    <div>A Single VotingPage of {params.domain}</div>
  )
}

export default VotingPage