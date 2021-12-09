import React, { Component } from 'react';
import {SafeAreaView0, SafeAreaView1, Picker, Text} from "./styles";

class CustomPicker extends Component {
  render () {
		return (
			<SafeAreaView0>
        <Text>{this.props.text}</Text>
				<SafeAreaView1>
					<Picker
						selectedValue={this.props.selectedValue}
						onValueChange={this.props.onValueChange}
					>
						{this.props.Items.map(item =>
							<Picker.Item key={item} label={item} value={item}/>
						)}
					</Picker>
				</SafeAreaView1>
      </SafeAreaView0>
    );
  }
}

export default CustomPicker;
