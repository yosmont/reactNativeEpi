import React from 'react';
import { View, Text, Picker } from "react-native";
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

	// const [elemTitles, setElemTitles] = React.useState([]);
	// const [elemImages, setElemImages] = React.useState([]);
	// const [elemRoutes, setElemRoutes] = React.useState([]);

	const [recylerViewUpdate, setRecylerViewUpdate] = React.useState(<CustomRecylerView onPress={(route) => {}} titles={["1", "2", "3"]} images={["1", "2", "3"]} routes={["1", "2", "3"]} />);
	// const [recylerViewUpdate, setRecylerViewUpdate] = React.useState(0);

	// React.useEffect(()=> {
	// 	// setRecylerViewUpdate(<CustomRecylerView onPress={(route) => {}} titles={elemTitles} images={elemImages} routes={elemRoutes} />);
	// 	setRecylerViewUpdate(recylerViewUpdate + 1);
	// }, [elemTitles]);

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
						}).then((result) => {
							let Titles = []
							let Images = []
							let Routes = []
							result.data.items.forEach(item => {
								Titles.push(item.owner.avatar_url);
								Images.push(item.clone_url);
								Routes.push(item.full_name);
							});
							console.log(Titles);
							console.log(Images);
							console.log(Routes);
							setRecylerViewUpdate(<CustomRecylerView onPress={(route) => { console.log('test', route); }} titles={Titles} images={Images} routes={Routes} />);
							// setElemImages(Titles);
							// setElemRoutes(Images);
							// setElemTitles(Routes);
						});
					}
				}} Text="Search" />

        </Card>
        <Card>
					{recylerViewUpdate}
        </Card>
    </Wrapper>
  )
};

export default SearchRepo;