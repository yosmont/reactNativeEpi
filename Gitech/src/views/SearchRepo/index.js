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
	const [Research, setResearch] = React.useState("");
	const [researchlanguage, setresearchlanguage] = React.useState("");
	const [selectedValue, setSelectedValue] = React.useState("stars");
	const [repoRecylerViewUpdate, setRepoRecylerViewUpdate] = React.useState(undefined);
	const [userRecylerViewUpdate, setUserRecylerViewUpdate] = React.useState(undefined);
	const [repopage, setRepoPage] = React.useState(0);
	const [userpage, setUserPage] = React.useState(0);
	const RepoScrollRef = React.useRef();
	const UserScrollRef = React.useRef();

  React.useEffect(() => {
    octokitSearchRepoRequest();
  }, [repopage]);

  React.useEffect(() => {
    octokitSearchUserRequest();
  }, [userpage]);


	function octokitSearchRepoRequest() {
		if (Research != "") {
      setRepoRecylerViewUpdate(undefined);
			props.route.params.octokit.rest.search.repos({
				q: Research,
				language: researchlanguage,
				sort: selectedValue,
				order: 'desc',
				per_page: 25,
				page: repopage,
			}).then((result) => {
				let Items = [];
				result.data.items.forEach(item => {
					Items.push({
						full_name: item.name,
						clone_url: item.clone_url,
						avatar_url: item.owner.avatar_url
					});
				});
        setRepoRecylerViewUpdate(<CustomRecylerView onPressStart={(usf, item) => {
          
        }} text={`page : ${userpage}`} usfull={{octokit: props.route.params.octokit, navigation: props.navigation}} Items={Items} />);
			});
		}
	}

  function octokitSearchUserRequest() {
		if (Research != "") {
      setUserRecylerViewUpdate(undefined);
			props.route.params.octokit.rest.search.users({
				q: Research,
				sort: selectedValue,
				order: 'desc',
				per_page: 25,
				page: userpage,
			}).then((result) => {
				let Items = [];
				result.data.items.forEach(item => {
					Items.push({
						full_name: item.login,
						avatar_url: item.avatar_url
					});
				});
        setUserRecylerViewUpdate(<CustomRecylerView onPressStart={(usf, item) => {
          usf.navigation.navigate('UserView', { navigation: usf.navigation, octokit: usf.octokit, username: item.full_name });
        }} text={`page : ${userpage}`} usfull={{octokit: props.route.params.octokit, navigation: props.navigation}} Items={Items} />);
			});
		}
	}


	return (
		<Wrapper>
			<Card>
		 		<LargeText>GitHub Search</LargeText>
				<View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
				<CustomTextInput styles={presetStyles} text='Search' placeholder='Search' onValueChange={setResearch}/>
				<CustomTextInput styles={presetStyles} text='Language' placeholder='language' onValueChange={setresearchlanguage}/>
				</View>
		 		<CustomPicker text='Sort' Items={["stars", "forks", "help-wanted-issues", "updated"]} selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue) }/>
		 		<LimitedWidthCustomButton width={300} onPress={ () => {
          setRepoPage(0);
          octokitSearchRepoRequest();
          setUserPage(0);
          octokitSearchUserRequest();
        }} Text="Search" />
			</Card>

			<ScrollCard ref={RepoScrollRef} >
				{
					(repoRecylerViewUpdate !== undefined) ? repoRecylerViewUpdate :
          <ActivityIndicator size='large' color='#457cb7' />
				}
		 		<LimitedWidthCustomButton width={300} onPress={ () => {
          RepoScrollRef.current?.scrollTo({y: 0, animated: true});
          setRepoPage(repopage + 1);
        }} Text="Next Page" />
			</ScrollCard>

			<ScrollCard ref={UserScrollRef} >
				{
					(userRecylerViewUpdate !== undefined) ? userRecylerViewUpdate :
          <ActivityIndicator size='large' color='#457cb7' />
				}
		 		<LimitedWidthCustomButton width={300} onPress={ () => {
          UserScrollRef.current?.scrollTo({y: 0, animated: true});
          setUserPage(userpage + 1);
        }} Text="Next Page" />
			</ScrollCard>

		</Wrapper>
	)
};

export default SearchRepo;



