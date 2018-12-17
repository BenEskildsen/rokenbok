const React = require('React');
const Card = require('./Card.react');

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    props.store.subscribe(() => this.setState({...this.props.store.getState()}));
    this.state = {...this.props.store.getState()};
  }

  onClick() {
  };

  render() {
    const {dispatch} = this.props.store;
    const cards = [];
    const factory = this.state.entities.filter(e => e.type == 'factory')[0];
    cards.push(<Card
      key="titleCard"
      title={'Rokenbok Factory'}
      content={[
        'Total Bok Collected: ' + factory.totalCollected,
        'Current Bok: ' + factory.collected,
      ]} />
    );

    return (
      <div className="sidebar">
        {cards}
      </div>
    );
  }
}

module.exports = Sidebar;
