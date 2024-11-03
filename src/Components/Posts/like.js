import React, { useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

function Like({ initialLikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        icon={liked ? <FaHeart /> : <FaRegHeart />}
        aria-label="Like post"
        onClick={handleLike}
        variant="ghost"
      />
      <span style={{ marginLeft: '8px' }}>{likes}</span>
    </div>
  );
}

export default Like;