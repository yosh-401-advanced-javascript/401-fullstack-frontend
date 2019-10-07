import React from 'react';

class NumInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ id: event.target.value });
  };

  handleClick = (event) => {
    event.preventDefault();
    this.props.func(this.state.id);
  };

  render() {
    return (
        <div>
          <input
              type="number"
              className="screen num-input"
              placeholder={this.props.no}
              onChange={this.handleChange}
          />
          <div className="submit" onClick={this.handleClick} />
        </div>
    );
  }
}

export default NumInput;
