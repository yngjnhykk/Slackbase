import React from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { IoIosChatboxes } from 'react-icons/io';
import { useSelector } from 'react-redux';

const UserPanel = () => {
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);
  return (
    <div>
      <h3 style={{ color: 'white' }}>
        <IoIosChatboxes /> Chat App
      </h3>

      <div>
        <Image src={currentUser.photoURL} roundedCircle style={{ width: 30, height: 30, marginTop: 3 }} />

        <Dropdown>
          <Dropdown.Toggle style={{ backgroundColor: 'transparent', border: 0 }}>{currentUser.diplayName}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default UserPanel;
