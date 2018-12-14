const React = require('React');

class Game extends React.Component {
  constructor(props) {
    super(props);
    props.store.subscribe(() => this.setState({...this.props.store.getState()}));
    this.state = {...this.props.store.getState()};
  }

  onClick() {
    console.log("on click");
  };

  render() {
    const {dispatch} = this.props.store;

    return (
      <div className="sidebar">
        <button onClick={() => this.onClick()}>
          Click
        </button>
      </div>
    );
  }
}

module.exports = Game;
