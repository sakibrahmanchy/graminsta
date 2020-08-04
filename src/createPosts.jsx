import { gql } from 'apollo-boost';
import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { POSTS } from './Posts';
import { GET_LATEST_POST_QUERY } from './latestPost';
import './index.css';

export const CREATE_POST_MUTATION = gql`
mutation CreatePost($content: String) {
  createPost(content: $content) {
    content,
    date
  }
}`;

export default function CreatePosts() {
  const input = useRef();
  const [text, setContent] = useState('');
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    awaitRefetchQueries: true,
    refetchQueries: [{
      query: POSTS,
    }, {
      query: GET_LATEST_POST_QUERY,
    }],
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
    );
  }

  const typeAuto = (text, fieldId) => {
      const data = text.split('');
      const field = document.getElementById(fieldId);
      field.value = '';
      (function autoTypeMe() {
          var letter = data.shift();
          field.value += letter;

          if (data.length) {
              setTimeout(autoTypeMe, 20);
          }

      }());
  };

  const loginWithMockUser = () => {
      const username = 'mockuser@graminsta.com';
      const password = 'mockuser@graminsta';
      typeAuto(username, 'username');
      typeAuto(password, 'password');
  };

  const handleClickEvent = () => {
    const content = input.current.value;
    createPost({ variables: { content } });
  };

  return (
    <div>
      {/*<textarea*/}
      {/*  placeholder="Share whats on your mind."*/}
      {/*  id="text"*/}
      {/*  name="text"*/}
      {/*  rows="4"*/}
      {/*  ref={input}*/}
      {/*  style={{*/}
      {/*    height: '300px',*/}
      {/*    overflow: 'scroll',*/}
      {/*    resize: 'none',*/}
      {/*    wordWrap: 'break-word',*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<br />*/}
      <input id="button" type="button" onClick={handleClickEvent} value="Create" />
      <input id="button2" type="button" onClick={loginWithMockUser} value="Login with mock user" style={{ width: '500px', height: '50px', 'border-radius': '2px', border: 'solid black 1px'}}/>
    </div>
  );
}
