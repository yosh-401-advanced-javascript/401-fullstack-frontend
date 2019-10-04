import React from 'react';


// eslint-disable-next-line react/prop-types
const StatsBox = ({ pokemon }) => {
  console.log(pokemon);
  const {
    // eslint-disable-next-line react/prop-types
    id, name, sprites, type,
  } = pokemon;
  return (
    <section className="details-wrapper">
      <img src={sprites} className="sprites" alt="sprite"/>
      <div className="stats-wrapper">
        <h1 className="stats-name">ID: {id} {name}</h1>
        <p className="stats">Type: {type} </p>
      </div>
    </section>
  );
};

// StatsBox.propTypes = {
//   id: PropTypes.obj,
//   name: PropTypes.obj,
//   sprite: PropTypes.obj,
//   type: PropTypes.obj,
// };


export default StatsBox;
