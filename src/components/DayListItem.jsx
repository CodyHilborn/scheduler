import React from 'react';

const DayListItem = (props) => {
  const { name, setDay, spots } = props;

  return (
    <li onClick={() => setDay(name)}>
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>{spots} spots remaining</h3>
    </li>
  );
};

export default DayListItem;