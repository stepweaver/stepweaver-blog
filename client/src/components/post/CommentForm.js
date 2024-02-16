import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p rounded-lg'>
        <h3>Leave a Comment</h3>
      </div>
      <form
        className='form my-1 ro'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addComment(postId, { text }));
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input
          type='submit'
          className='btn bg-primary hover:bg-orange-600 my-1'
          value='Submit'
        />
      </form>
    </div>
  );
};

export default CommentForm;
