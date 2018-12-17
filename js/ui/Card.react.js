const React = require('React');

/**
 *
 * prop types:
 * title: the title of the card
 * content: an array of body lines for the card
 * action: optional, will create a button
 *    name: name on the button
 *    func: callback when the button is clicked
 *
 */

class Card extends React.Component {
  render() {
    let button = null;
    if (this.props.action != null) {
      button = (
        <button onClick={this.props.action.func}>
          {this.props.action.name}
        </button>
      );
    }
    return (
      <div className="card">
        <div className="cardTitle">
          <b>{this.props.title}</b>
        </div>
          {this.props.content.map(line => <p>{line}</p>)}
          {button}
      </div>
    );
  }
}

module.exports = Card
