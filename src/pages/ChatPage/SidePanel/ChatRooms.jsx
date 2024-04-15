import React from 'react';
import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { child, ref as dbRef, off, onChildAdded, push, update } from 'firebase/database';
import { FaPlus, FaRegSmileWink } from 'react-icons/fa';
import { db } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentChatRoom } from '../../../store/chatRoomSlice';

const ChatRooms = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const chatRoomRef = dbRef(db, 'chatRooms');

  const [chatRooms, setChatRooms] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [activeChatRoomId, setActiveChatRoomId] = useState('');

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(chatRooms);

  useEffect(() => {
    addChatRoomsListeners();
    return () => {
      off(chatRoomRef);
    };
  }, []);

  const isFormValid = (name, description) => {
    return name && description;
  };

  const handleSubmit = async () => {
    if (isFormValid(name, description)) {
      const key = push(chatRoomRef).key;

      const newChatRoom = {
        id: key,
        name: name,
        description: description,
        createdBy: {
          name: currentUser.displayName,
          image: currentUser.photoURL,
        },
      };

      try {
        await update(child(chatRoomRef, key), newChatRoom);
        setName('');
        setDescription('');
        setShow(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const addChatRoomsListeners = () => {
    let chatRoomsArray = [];

    onChildAdded(chatRoomRef, (DataSnapshot) => {
      chatRoomsArray.push(DataSnapshot.val());
      const newChatRooms = [...chatRoomsArray];
      setChatRooms(newChatRooms);
      setFirstChatRoom(newChatRooms);
    });
  };

  const setFirstChatRoom = (chatRooms) => {
    const firstChatRoom = chatRooms[0];
    if (firstLoad && chatRooms.length > 0) {
      dispatch(setCurrentChatRoom(firstChatRoom));
      setActiveChatRoomId(firstChatRoom.id);
    }
    setFirstLoad(false);
  };

  const changeChatRoom = (room) => {
    dispatch(setCurrentChatRoom(room));
    setActiveChatRoomId(room.id);
  };

  const renderedChatRooms = () => {
    return (
      chatRooms.length > 0 &&
      chatRooms.map((room) => (
        <li
          onClick={() => changeChatRoom(room)}
          style={{
            backgroundColor: room.id === activeChatRoomId ? '#ffffff45' : '',
            cursor: 'pointer',
          }}
          key={room.id}
        >
          {room.name}
        </li>
      ))
    );
  };

  console.log(renderedChatRooms());

  return (
    <div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FaRegSmileWink style={{ marginRight: 3 }} />
        CHAT ROOMS{' '}
        <FaPlus
          style={{ position: 'absolute', right: 0, cursor: 'pointer' }}
          onClick={() => {
            setShow(!show);
          }}
        />
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>{renderedChatRooms()}</ul>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>채팅방 생성하기</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>방 이름</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type='text'
                placeholder='채팅 방 입력하세요.'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>방 설명</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type='text'
                placeholder='채팅 방 설명을 입력하세요.'
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            취소
          </Button>
          <Button variant='primary' onClick={() => handleSubmit()}>
            생성
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChatRooms;
