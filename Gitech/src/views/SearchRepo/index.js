import React from 'react';
import { ActivityIndicator, ScrollView } from "react-native";
import { Wrapper, ScrollCard, Card, LargeText } from "./styles";
import CustomTextInput from "@components/CustomTextInput";
import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";
import CustomPicker from "@components/CustomPicker";
import CustomRecylerView from "@components/CustomRecylerView"

// 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

const SearchRepo = (props) => {
	const [research, setresearch] = React.useState("");
	const [researchlanguage, setresearchlanguage] = React.useState("");
	const [selectedValue, setSelectedValue] = React.useState("stars");
	const [recylerViewUpdate, setRecylerViewUpdate] = React.useState(undefined);
	const [page, setPage] = React.useState(0);
	const scrollRef = React.useRef();

	function octokitSearchRequest() {
		if (research != "") {
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
          setRecylerViewUpdate(<CustomRecylerView onPress={(usf) => {
            // console.log('test', route);
          }
				} text={`page : ${page}`} usfull={props.octokit, props.navigation} Items={Items} />);
			});
		}
	}

	return (
		<Wrapper>
			<ScrollView>
				<Card>
					<LargeText>GitHub Search</LargeText>
					<CustomTextInput text='Search' placeholder='Search' onValueChange={setresearch}/>
					<CustomTextInput text='Language' placeholder='language' onValueChange={setresearchlanguage}/>
					<CustomPicker text='Sort' Items={["stars", "forks", "help-wanted-issues", "updated"]} selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue) }/>
					<LimitedWidthCustomButton width={300} onPress={ () => { setPage(0); octokitSearchRequest(); }} Text="Search" />
				</Card>

				<ScrollCard
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
					{
						(recylerViewUpdate !== undefined) ?
							recylerViewUpdate
						:
						<ActivityIndicator size='large' color='#457cb7' />
					}
				</ScrollCard>
			</ScrollView>
		</Wrapper>
	)
};

export default SearchRepo;



