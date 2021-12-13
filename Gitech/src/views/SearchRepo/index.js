import React from 'react';
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Wrapper, ScrollCard, Card, LargeText } from "./styles";
import CustomTextInput from "@components/CustomTextInput";
import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";
import CustomPicker from "@components/CustomPicker";
import CustomRecylerView from "@components/CustomRecylerView"

// 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

const presetStyles = StyleSheet.create({
  safeAreaStyle: {
    padding: 10,
    marginTop: 0,
    width: '48%',
  },
  textStyle: {
    marginBottom: 5,
    color: 'white'
  }
});

const SearchRepo = (props) => {
	const [research, setresearch] = React.useState("");
	const [researchlanguage, setresearchlanguage] = React.useState("");
	const [selectedValue, setSelectedValue] = React.useState("stars");
	const [repoRecylerViewUpdate, setRepoRecylerViewUpdate] = React.useState(undefined);
	const [userRecylerViewUpdate, setUserRecylerViewUpdate] = React.useState(undefined);
	const [page, setPage] = React.useState(0);
	const RepoScrollRef = React.useRef();
	const UserScrollRef = React.useRef();

	function octokitSearchRepoRequest() {
		if (research != "") {
      setRepoRecylerViewUpdate(undefined);
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
						full_name: item.name,
						clone_url: item.clone_url,
						avatar_url: item.owner.avatar_url
					});
				});
          setRepoRecylerViewUpdate(<CustomRecylerView onPress={(usf) => {
            // console.log('test', route);
          }
				} text={`page : ${page}`} usfull={props.octokit, props.navigation} Items={Items} />);
			});
		}
	}

  function octokitSearchUsersRequest() {
		if (research != "") {
      setUserRecylerViewUpdate(undefined);
			props.route.params.octokit.rest.search.users({
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
						full_name: item.name,
						clone_url: item.clone_url,
						avatar_url: item.owner.avatar_url
					});
				});
          setRepoRecylerViewUpdate(<CustomRecylerView onPress={(usf) => {
            // console.log('test', route);
          }
				} text={`page : ${page}`} usfull={props.octokit, props.navigation} Items={Items} />);
			});
		}
	}


	return (
		<Wrapper>
			<Card>
		 		<LargeText>GitHub Search</LargeText>
				<View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
				<CustomTextInput styles={presetStyles} text='Search' placeholder='Search' onValueChange={setresearch}/>
				<CustomTextInput styles={presetStyles} text='Language' placeholder='language' onValueChange={setresearchlanguage}/>
				</View>
		 		<CustomPicker text='Sort' Items={["stars", "forks", "help-wanted-issues", "updated"]} selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue) }/>
		 		<LimitedWidthCustomButton width={300} onPress={ () => { setPage(0); octokitSearchRepoRequest(); }} Text="Search" />
			</Card>

			<ScrollCard
				ref={RepoScrollRef}
			>
				{
					(repoRecylerViewUpdate !== undefined) ?
            repoRecylerViewUpdate
					:
          <ActivityIndicator size='large' color='#457cb7' />
				}
		 		<LimitedWidthCustomButton width={300} onPress={ () => {
          RepoScrollRef.current?.scrollTo({y: 0, animated: true});
          setPage(page + 1);
          octokitSearchRepoRequest();
        }} Text="Next Page" />

			</ScrollCard>
		</Wrapper>
	)
};

export default SearchRepo;



