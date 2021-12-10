import React, {Component} from 'react';
import {Pressable, Text} from './styles';

class ButtonWithIcon extends Component {
  render() {
    return (
      <Pressable onPress={this.props.onPress}>
        <Text>{this.props.Text}</Text>
        {this.props.children}
      </Pressable>
    );
  }
}

export default ButtonWithIcon;
