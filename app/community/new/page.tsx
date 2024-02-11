import NewPostForm from '@/components/community/new/new-post-form'
import React from 'react'

const NewPostPage = () => {
  return (
    <div className='container'>
        <h1 className='text-3xl font-bold'>New Post</h1>
        <NewPostForm />
    </div>
  )
}

export default NewPostPage