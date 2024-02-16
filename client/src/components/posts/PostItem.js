import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className='post bg-gradient-to-r from-orange-700/5 to-slate-950/95 hover:shadow-lg hover:shadow-black rounded-xl p-1 my-1 text-light'>
      <div>
        <a href='profile.html'>
          <img
            className='round-img shadow-lg shadow-black mb-2'
            src={avatar}
            alt=''
          />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button type='button' className='btn btn-sm bg-light hover:bg-gray-300'>
          <i className='fas fa-thumbs-up'></i>
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button type='button' className='btn btn-sm bg-light hover:bg-gray-300'>
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link
          to={`/post/${_id}`}
          className='btn btn-sm bg-primary hover:bg-orange-600'
        >
          Discussion{' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            type='button'
            className='btn btn-sm bg-danger hover:bg-red-600'
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;