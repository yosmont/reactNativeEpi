import React from 'react';
import { Wrapper, Card, LargeText } from "./styles";
import CustomTextInput from "@components/CustomTextInput";
import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";
import CustomPicker from "@components/CustomPicker";
import CustomRecylerView from "@components/CustomRecylerView"
import {ScrollView} from "react-native";


const SearchRepo = (props) => {
	const [research, setresearch] = React.useState("");
	const [researchlanguage, setresearchlanguage] = React.useState("");
	const [selectedValue, setSelectedValue] = React.useState("stars");
	const [recylerViewUpdate, setRecylerViewUpdate] = React.useState(<CustomRecylerView onPress={(route) => {}} Items={[]} />);
	const [page, setPage] = React.useState(0);
	const scrollRef = React.useRef();

	function octokitSearchRequest() {
		if (research != "") {
			console.log("page -> ", page);
			props.route.params.octokit.rest.search.repos({
				q: research,
				language: researchlanguage,
				sort: selectedValue,
				order: 'desc',
				per_page: 25,
				page: page,
			}).then((result) => {
				let Items = [];
				result.data.items.forEach(item => {
					Items.push({
						full_name: item.full_name,
						clone_url: item.clone_url,
						avatar_url: item.owner.avatar_url
					});
				});
				setRecylerViewUpdate(<CustomRecylerView onPress={(route) => { console.log('test', route); }} text={`page : ${page}`} Items={Items} />);
			});
		}
	}

	return (
		<Wrapper>
			<ScrollView>
				<Card
					onScroll={ ({nativeEvent}) =>  {
						if (nativeEvent.contentOffset.y > 60) {
							if (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height) {
								scrollRef.current?.scrollTo({y: 0, animated: true});
								setPage(page + 1);
								octokitSearchRequest();
							}
						}
					}}
					ref={scrollRef}
				>
					<LargeText>GitHub Search</LargeText>
					<CustomTextInput text='Search' placeholder='Search' onValueChange={setresearch}/>
					<CustomTextInput text='Language' placeholder='language' onValueChange={setresearchlanguage}/>
					<CustomPicker text='Sort' Items={["stars", "forks", "help-wanted-issues", "updated"]} selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue) }/>
					<LimitedWidthCustomButton onPress={ () => { setPage(0); octokitSearchRequest(); }} Text="Search" />
					{recylerViewUpdate}
				</Card>
			</ScrollView>
		</Wrapper>
	)
};

export default SearchRepo;



