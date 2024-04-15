import React from 'react';
import { useState } from 'react';

const MessageForm = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <form>
        <textarea
          style={{
            width: '100%',
            height: 90,
            border: '0.2rem solid rgb(235,236,236)',
            borderRadius: 4,
          }}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flexGrow: 1 }}>
            <button
              type='submit'
              className='message-form-button'
              style={{ width: '100%', fontSize: 20, fontWeight: 'bold' }}
              disabled={loading}
            >
              보내기
            </button>
          </div>

          <div style={{ flexGrow: 1 }}>
            <button
              type='submit'
              className='message-form-button'
              style={{ width: '100%', fontSize: 20, fontWeight: 'bold' }}
              disabled={loading}
            >
              이미지
            </button>
          </div>
        </div>
      </form>

      <input type='file' accept='image/jpeg, image/png' style={{ display: 'none' }} />
    </div>
  );
};

export default MessageForm;
