import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions = true,
}) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  return (
    <div className='post rounded-lg p-1 my-1 text-light'>
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className='round-img shadow-lg shadow-black mb-2'
            src={avatar}
            alt=''
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showActions && (
          <>
            <button
              onClick={(e) => dispatch(addLike(_id))}
              type='button'
              className='btn btn-sm bg-light hover:bg-gray-300'
            >
              <i className='fas fa-thumbs-up'></i>
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={(e) => dispatch(removeLike(_id))}
              type='button'
              className='btn btn-sm bg-light hover:bg-gray-300'
            >
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
                onClick={(e) => dispatch(deletePost(_id))}
                type='button'
                className='btn btn-sm bg-danger hover:bg-red-600'
              >
                <i className='fas fa-times'></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostItem;
