import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
 
export default function Post() {
    //Form state
    const [post, setPost] = useState({ description: "" });

    //Defining user
    const [user, loading] = useAuthState(auth);

    //Route user to home screen after post
    const route = useRouter();

    const routeData = route.query;
    
    //Submit post
    const submitPost = async (e) => {
      e.preventDefault();

      //Run checks for description
      if(!post.description){
        toast.error("Description Field empty! 🤣", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        return;
      }

      //Run check for description > 300 word length
      if (!post.description.length > 300) {
        toast.error("Description too long! 😅", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        return;
      }

      //Edit a post
      if(post?.hasOwnProperty("id")) {
        const docRef = doc(db, 'posts', post.id);
        const updatePost = {...post, timestamp: serverTimestamp()};
        await updateDoc(docRef, updatePost);
        return route.push('/')
      } else {
      //Make a new post
        const collectionRef = collection(db, 'posts');
        await addDoc(collectionRef, {
          ...post,
          timestamp: serverTimestamp(),
          user: user.uid,
          avatar: user.photoURL,
          username: user.displayName,
        });
        setPost({description: ""});
        toast.success("Post has been made 🚀", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        return route.push('/')
      }
  };

    //Check our user
    const checkUser = async () => {
      if(loading) return;
      if(!user) route.push("/auth/login");
      /* Checking if the route has an id, if it does it will set the post description to the route
      description and the id to the route id. */
      if(routeData.id){
        setPost({ description: routeData.description, id: routeData.id })
      }
    };

    useEffect(() => {
      checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

    return (
      <div className="my-20 p-12 shadow-lg rounded-lg max-w-md">
        <form onSubmit={submitPost}>
          <h1 className="text-2xl font-bold">
            {post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
          </h1>
          <div className='py-2'>
            <h3 className='text-lg font-medium py-2 text-gray-800'>Description</h3>
            <textarea 
            value={post.description} 
            onChange={(e) => setPost({...post, description: e.target.value})}
            className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm'></textarea>
            <p className={'text-cyan-600 font-medium text-sm ${post.description.length > 300 ? "text-red-600" : ""}'}>{post.description.length}/300</p>
          </div>
          <button type='submit' className='w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm'>Submit</button>
        </form>
      </div>
    );
}