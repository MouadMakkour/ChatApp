import React, { useState } from 'react';
import './JoinRoom.css';

const JoinRoom = (props) => {
    

  return (
    <div>
      <form onSubmit={props.sendData} className="join-form">
          <input
            type="text"
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="text"
            value={props.room}
            onChange={(e) => props.setRoom(e.target.value)}
            placeholder="Room"
          />
          <button type="submit">Send</button>
        </form>
    </div>
  )
}

export default JoinRoom
