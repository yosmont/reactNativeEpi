import React from 'react';
import { View, Text, Picker, ScrollView } from "react-native";
import { Wrapper, Card, LargeText } from "./styles";
import CustomTextInput from "@components/CustomTextInput";
import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";
import CustomPicker from "@components/CustomPicker";
import CustomRecylerView from "@components/CustomRecylerView"

// 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

const SearchRepo = (props) => {
	const [research, setresearch] = React.useState("");
	const [researchlanguage, setresearchlanguage] = React.useState("");
	const [selectedValue, setSelectedValue] = React.useState("stars");

	const [recylerViewUpdate, setRecylerViewUpdate] = React.useState(<CustomRecylerView onPress={(route) => {}} Items={[]} />);

	return (
		<Wrapper>
		 	<Card>
		 		<LargeText>GitHub Search</LargeText>
		 		<CustomTextInput text='Search' placeholder='Search' onValueChange={setresearch}/>
		 		<CustomTextInput text='Language' placeholder='language' onValueChange={setresearchlanguage}/>
		 		<CustomPicker 
		 			text='Sort'
		 			Items={["stars", "forks", "help-wanted-issues", "updated"]} selectedValue={selectedValue}
		 			onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)
		 		}/>

		 		<LimitedWidthCustomButton onPress={() => {
		 			if (research != "") {
		 				console.log(research);
		 				props.route.params.octokit.rest.search.repos({
		 					q: research,
		 					language: researchlanguage,
		 					sort: selectedValue,
		 					order: 'desc',
							per_page: 100
		 				}).then((result) => {
							 let Items = [];

							 result.data.items.forEach(item => {
								Items.push({
									full_name: item.full_name,
									clone_url: item.clone_url,
									avatar_url: item.owner.avatar_url
								});
		 					});
		 					setRecylerViewUpdate(<CustomRecylerView onPress={(route) => { console.log('test', route); }} text={"here"} Items={Items} />);
		 				});
		 			}
		 		}} Text="Search" />
				{recylerViewUpdate}
			</Card>
		</Wrapper>
	)
};

export default SearchRepo;



