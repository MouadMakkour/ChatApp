import { useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from './Components/Chat/Chat';
import JoinRoom from './Components/JoinRoom/JoinRoom';

const socket = io(process.env.REACT_APP_BACKEND_URL);

function App() {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [showChat,setShowChat] = useState(false);

    const sendData = (e) => {
        e.preventDefault();
        if (name.trim() && room.trim()) {
            socket.emit("join_room", room);
            setShowChat(true);
        }
      };
  return (
    <div className="App">
      {
        !showChat ? (
          <JoinRoom  name={name}
          setName={setName}
          room={room}
          setRoom={setRoom}
          showChat={showChat}
          setShowChat={setShowChat}
          sendData={sendData} />
        ):(
          <Chat socket = {socket}
                name={name} 
                room={room} />
        )
      }
      
    </div>
  );
}

export default App;
