import React from 'react';


const StatsBox = ({ pokemon }) => {
  console.log(pokemon);
  const {
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


export default StatsBox;
