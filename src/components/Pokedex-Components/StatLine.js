import React from 'react';

const padStats = (stat, value, separation, len) => {
  // eslint-disable-next-line no-param-reassign
  value = value || 'xx';
  return `${stat.toString()}${separation.repeat(len - (value.toString().length + stat.toString().length))}${value.toString()}`;
};

class StatLine extends React.Component {
  render() {
    return (<div className="stat-line">
      {padStats(this.props.name, this.props.values, '.', 20)}
    </div>);
  }
}
export default StatLine;
