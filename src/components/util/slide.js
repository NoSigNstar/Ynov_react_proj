import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Icon} from 'semantic-ui-react';


class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
  }

  changeIndex(index) {
    let newIndex = this.state.index + index;
    if(newIndex < 0 || newIndex > this.props.pictures.length - 1) {
      return;
    }

    this.setState({index: newIndex});
  }

  render() {
    let { pictures } = this.props;
    if(!pictures) {
      pictures = ['https://image.freepik.com/free-vector/bright-background-with-dots_1055-3132.jpg', 'http://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero-00e10b1f.jpg'];
    }
    return (
      <div style={{height: '140px', position: 'relative'}}>
        <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: `url(${pictures[this.state.index]})`}} />
        { this.state.index === 0 ? '' : <Icon onClick={ () => this.changeIndex(-1)} name='left chevron' size="big" color="black" style={{position: 'absolute', top: '60px', cursor: 'pointer'}} />}
        { this.state.index === pictures.length - 1 ? '' : <Icon onClick={ () => this.changeIndex(1)} name='right chevron' size="big" color="black" style={{position: 'absolute', top: '60px', right: '0', cursor: 'pointer'}}/>}
      </div>
    );
  }
}

Slider.propTypes = {
  pictures: PropTypes.array
};

export default Slider;
