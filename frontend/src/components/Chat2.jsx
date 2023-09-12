// import React from 'react';
// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { Avatar, Image } from 'antd';
// import '../styles/chatbox.scss';
// import axios from 'axios';

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080';
// const socket = io(URL);

// export default function Chat2({ avatar, user, message, email, tripID, messages, handleSetMessages }) {
//   const [name, setName] = useState('');





//   useEffect(() => {


//     socket.on("receive-message", messageFromServer => {
//       console.log(messageFromServer);
//       // handleSetMessages(messageFromServer);
//     });

//     return () => {
//       socket.off('receive-message', messageFromServer);
//     };

//   }, []);





//   const onSubmit = async (evt) => {
//     evt.preventDefault();
//     const msg = evt.target.msg.value;
//     socket.emit("send-message", msg, tripID);
//     evt.target.msg.value = '';

//     const messageData = {
//       tripID: tripID,
//       message: msg,
//       email: email,
//     };

//     try {
//       //adds the new message in the db
//       const response = await axios.post("http://localhost:8080/api/messages/create-new-message", messageData);
//     } catch (error) {
//       console.error(`error creating message : `, error);
//     }
//   };

//   return (
//     <div className='pt-5'>

//       {/* <h1>__________________________________</h1> */}

//       {/* {messages.map(message => <div key={email} className={message.name === email ? 'chatbox_sender' : 'chatbox_reciver'}>
//         <Avatar
//           size={50}
//           src={<Image
//             src={avatar}
//             className='avatar'
//             preview={false}
//           />}
//         />
//         <p>
//           <strong>
//           {message.name}
//           </strong> <br></br>
//           {message.msg}
//         </p>
//       </div>)} */}

//       <form onSubmit={onSubmit} className='flex gap-1 items-start w-full'>
//         <input name="msg" rows={6} placeholder='Enter your message' className='rounded-xl block px-4 py-2.5 w-full text-sm text-gray-900 bg-gray-50 border-none outline-none focus:bg-white ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 ' >
//         </input>
//         <button className="self-end inline-flex justify-center rounded-xl border border-transparent bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus:outline-none gap-2 items-center" >
//           Send
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" className="group-hover:stroke-amber-800 group-hover:stroke-2" />
//           </svg>
//         </button>
//       </form>

//     </div>
//   );
// }
