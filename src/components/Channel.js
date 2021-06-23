import React, { useEffect, useState } from 'react'
import firebase from "firebase/app";

const Channel = ({ user = null, db = null }) => {
    const [messsges,setmessages] = useState([]);
    const [newMessage, setNewmessages] = useState("");

    const { uid, displayName, photoURL } = user;

    useEffect(() => {
        if (db) {
            const unsubscribe = db.collection('chat').orderBy('date').limit(100).onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setmessages(data);
            })
            return unsubscribe;
        }
    }, [db]);
    const handleonChange = (e) => {
        setNewmessages(e.target.value);
    };

    const handleonSubmit = (e) => {
        e.preventDefault();

        if (db) {
            db.collection("chat").add({
                text: newMessage,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
        setNewmessages("");
    }


    return (
        <div className="position-absolute top-50 start-50 translate-middle mt-3" style={{ height: "80%" }}>
            <ul style={{ listStyleType: "none", marginTop: "20px" }}>
                {messsges.map(message => (
                    <div className="d-flex">
                        <img style={{ width: "30px", height: "30px", borderRadius: "50px", margin: "5px" }} src={photoURL} alt={displayName} />
                        <li className="text-break" key={message.id}>{message.text}</li>
                    </div>
                ))}
            </ul>
            <form onSubmit={handleonSubmit}>
                <input
                    className="form-control"
                    type="text"
                    value={newMessage}
                    onChange={handleonChange}
                    placeholder="Type New Message Her ..."
                />
                <button className="btn btn-primary" type="submit" >Send good</button>
            </form>
        </div>
    );
}


export default Channel
