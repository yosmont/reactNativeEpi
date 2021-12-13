import React from "react";
import { SafeAreaView, View } from "react-native";
import { Wrapper, Text, Image, Pressable, Button } from "./styles";

class CustomRecylerView extends React.Component {
	render() {

		function name(props) {
			let output = []
			props.Items.forEach(item => {
				output.push(
				<Pressable key={item.avatar_url} onPress={() => {props.onPressStart(props.usfull, item)}}>
					<View style={{width: '100%', zIndex: 0.5}} >
						{
							(item.avatar_url !== undefined) ? <Image source={{ uri: item.avatar_url }} /> : ''
							(item.usf !== undefined) ? <Text>{item.usf}</Text> : ''
						}
					<SafeAreaView>
						<Text>{item.full_name}</Text>
					</SafeAreaView>
					</View>
				</Pressable>)
			});
			return (output);
		}

		return (
			<Wrapper>
				<Text>{this.props.text}</Text>
				{/* {this.props.Items.map(item =>
					<Pressable key={item.avatar_url} onPress={this.props.onPressStart(this.props.usfull, item)}>
						<View style={{width: '100%', zIndex: 0.5}} >
							{
								(item.avatar_url !== undefined) ? <Image source={{ uri: item.avatar_url }} /> : ''
								(item.usf !== undefined) ? <Text>{item.usf}</Text> : ''
							}	
							<SafeAreaView>
								<Text>{item.full_name}</Text>
							</SafeAreaView>
						</View>
					</Pressable>
				)} */}
				{
					name(this.props)
				}
			</Wrapper>
		);
	}
}

export default CustomRecylerView;
