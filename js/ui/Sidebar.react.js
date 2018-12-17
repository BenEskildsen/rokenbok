const React = require('React');
const Card = require('./Card.react');
const {
  TRUCK_COST, MINER_COST, BASE_COST, AUTOMATION_COST,
} = require('../settings');

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    props.store.subscribe(() => this.setState({...this.props.store.getState()}));
    this.state = {...this.props.store.getState()};
  }

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

    cards.push(makeBuyCard('miner', MINER_COST, dispatch));
    cards.push(makeBuyCard('truck', TRUCK_COST, dispatch));
    cards.push(makeBuyCard('base', BASE_COST, dispatch));
    cards.push(makeBuyCard('automate trucks', AUTOMATION_COST, dispatch));
    return (
      <div className="sidebar">
        {cards}
      </div>
    );
  }
}

const makeBuyCard = (entityType, entityCost, dispatch) => {
  const content = ['Cost: ' + entityCost + ' bok'];
  if (entityType == 'miner') {
    content.push(
        'Once you click "Buy", right click in the range of the factory or a base to place'
    );
  }
  return (
    <Card
      key={"buy" + entityType + "Card"}
      title={'Buy ' + entityType}
      content={content}
      action={{
        name: 'Buy',
        func: () => {
          console.log(entityType);
          dispatch({type: 'BUY', entityType});
        }
      }} />
  );
};

module.exports = Sidebar;
