import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Stars = ({ curStars, starRating }) => {
  const [stars, setStars] = useState(['dark', 'dark', 'dark', 'dark', 'dark']);
 
  useEffect(() => {
    let copy = stars.map((star, i) => i <= (curStars - 1) ? 'lit' : 'dark');
    setStars(copy);
  }, [])
 
  const handleStarClick = (pos) => {
    if (pos === null) {
			setStars(['dark', 'dark', 'dark', 'dark', 'dark']);
			return;
    }

    let copy = stars.map((star, i) => i <= pos ? 'lit' : 'dark');
    setStars(copy);
    starRating(pos + 1)
  };

  return (
    
    <div className="stars">
			{stars.map((star, index) => (
				<Star
					key={index}
					handleStarClick={handleStarClick}
					position={index}
					state={star}
				/>))}
		</div>
  );
};

const Star = (props) => {
  const { position, state, handleStarClick } =  props;

	return (
		<div className={state} onClick={() => handleStarClick(position)}>
			{/* <i className="fa fa-star" /> */}
      <FontAwesomeIcon className="FontAwesomeIcon" icon={faStar} size="xs"></FontAwesomeIcon>
		</div>
	)
};

Stars.defaultProps = {
  starRating: () => console.log('changeStarts not defined')
}

export default Stars;