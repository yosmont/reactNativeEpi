import React from "react";
import { SafeAreaView } from "react-native";
import { Wrapper, Text, Image, Pressable } from "./styles";

class CustomRecylerView extends React.Component {
	render() {

		return (
			<Wrapper>
				<Text>{this.props.text}</Text>
				{this.props.Items.map(item =>
					<Pressable key={item.full_name} onPress={this.props.onPress}>
						<Image source={{ uri: item.avatar_url }} />
						<SafeAreaView>
							<Text>{item.full_name}</Text>
						</SafeAreaView>
					</Pressable>
				)}
			</Wrapper>
		);
	}
}

export default CustomRecylerView;
