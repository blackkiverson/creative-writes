import Message from "../components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants";
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Details(){
    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState('');
    const [allMessage, setAllMessages] = useState([]);

    //Submit a comment
    const submitMessage = async () => {
        //Check if the user is logged in
        if(!auth.currentUser) return router.push('/auth/login');

        if(!message){
            toast.error("Don't leave comment empty 😅", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
            return;
        }
        const docRef = doc(db, 'posts', routeData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),
            }),
        });
        setMessage('');
    };
    
    //Get comments
    const getComment = async () => {
        const docRef = doc(db, 'posts', routeData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setAllMessages(snapshot.data().comments);
        });
        return unsubscribe;
    };

    useEffect(() => {
        if(!router.isReady) return;
        getComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    return (
      <div>
        <Message {...routeData}></Message>
        <div className="my-4">
          <div className="flex">
            <input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              value={message}
              placeholder="Make a comment 😃"
              className="bg-gray-800 w-full p-2 text-white text-sm"
            />
            <button
              onClick={submitMessage}
              className="bg-cyan-500 text-white py-2 px-4 text-sm"
            >
              Submit
            </button>
          </div>
          <div className="py-6">
            <h2 className="font-bold">Comments</h2>
            {allMessage?.map((message) => (
              // eslint-disable-next-line react/jsx-key
              <div className="bg-white p-4 my-4 border-2" key={message.time}>
                <div className="flex items-center gap-2 mb-4">
                  <picture>
                    <img className="w-8 rounded-full" src={message.avatar} alt="" />
                  </picture>
                  <h2>{message.userName}</h2>
                </div>
                <h2>{message.message}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}