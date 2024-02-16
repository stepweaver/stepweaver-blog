import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date }
}) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  return (
    <div className='post p-1 my-1 text-light'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img shadow-lg shadow-black' src={auth.user.avatar} alt='' />
          <h4>{auth.user.name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={e => dispatch(deleteComment(postId, _id))}
            type='button'
            className='btn btn-sm bg-danger hover:bg-red-600'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
