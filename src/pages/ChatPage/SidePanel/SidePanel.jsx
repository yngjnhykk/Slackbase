import React from 'react';
import UserPanel from './UserPanel';
import Favorite from './Favorite';
import ChatRooms from './ChatRooms';
import DirectMessages from './DirectMessages';

const SidePanel = () => {
  return (
    <div
      style={{
        background: '#85A0F2',
        padding: '2rem',
        minHeight: '100vh',
        color: 'white',
        minWidth: 275,
      }}
    >
      <UserPanel />
      <Favorite />
      <ChatRooms />
      <DirectMessages />
    </div>
  );
};

export default SidePanel;
