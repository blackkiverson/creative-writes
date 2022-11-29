import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
 
export default function Post() {
    const [post, setPost] = useState({ description: "" });
    return (
      <div className="my-20 p-12 shadow-lg rounded-lg max-w-md ">
        <form>
          <h1 className="text-2xl font-bold">Create a new post</h1>
          <div className='py-2'>
            <h3 className='text-lg font-medium py-2'>Description</h3>
            <textarea 
            value={post.description} 
            onChange={(e) => setPost(e.target.value)}
            className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm'></textarea>
            <p>0/300</p>
          </div>
          <button className='w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm'>Submit</button>
        </form>
      </div>
    );
}