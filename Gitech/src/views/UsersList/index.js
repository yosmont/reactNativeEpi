import React, { useEffect } from 'react';
import { ActivityIndicator } from "react-native";
import { Wrapper, UserWrapper, Image, Text, LargeText, Card, ScrollCard } from './styles';

import CustomRecylerView from "@components/CustomRecylerView";

function GetNbOfPage(linkStr) {

    if (linkStr == null) {
        return (0);
    }
    return parseInt(linkStr.slice(linkStr.lastIndexOf("&page=") + 6, -13));
}

function GoToUser(navigation, octokit, username) {
	navigation.push('UserView', { navigation: navigation, octokit: octokit, username: username, user: undefined });
}

const UsersList = (props) => {
	const perPage = 25
	const octokit = props.route.params.octokit;
	const type = props.route.params.type;
	const username = props.route.params.username;
	const repoName = props.route.params.repoName;
    const [recylerViewUpdate, setRecylerViewUpdate] = React.useState(undefined);
	const [page, setPage] = React.useState(0);
	const [maxPage, setMaxPage] = React.useState(-1);
	const [items, setItems] = React.useState([]);
	const scrollRef = React.useRef();

	function updateList(result) {
		if (maxPage == -1)
			setMaxPage(GetNbOfPage(result.headers.link));
		let Items = items;
		result.data.forEach(item => {
			let tmp = {
				full_name: item.login,
				avatar_url: item.avatar_url
			}
			if (Items.find(elem => elem.full_name == tmp.full_name) === undefined)
				Items.push(tmp);
		});
		setItems(Items);
		setRecylerViewUpdate(<CustomRecylerView onPressStart={(usf, item) => {
			GoToUser(props.navigation, octokit, item.full_name);
		}
		} text={`page : ${page}`} usfull={props.octokit, props.navigation} Items={Items} />);
	}

	function updateListMyFollowing() {
		octokit.rest.users.listFollowedByAuthenticatedUser({
			per_page: perPage,
			page: page,
		}).then((result) => {
			updateList(result);
		});
	}

	function updateListMyFollower() {
		octokit.rest.users.listFollowersForAuthenticatedUser({
			per_page: perPage,
			page: page,
		}).then((result) => {
			updateList(result);
		});
	}

	function updateListFollowing() {
		octokit.rest.users.listFollowingForUser({
			per_page: perPage,
			page: page,
			username: username,
		}).then((result) => {
			updateList(result);
		});
	}

	function updateListFollower() {
		octokit.rest.users.listFollowersForUser({
			per_page: perPage,
			page: page,
			username: username,
		}).then((result) => {
			updateList(result);
		});
	}

	function updateRepoWatch() {
		octokit.rest.activity.listStargazersForRepo({
			per_page: perPage,
			page: page,
			owner: username,
			repo: repoName,
		}).then((result) => {
			updateList(result);
		});
	}

	function updateRepoStar() {
		octokit.rest.activity.listWatchersForRepo({
			per_page: perPage,
			page: page,
			owner: username,
			repo: repoName,
		}).then((result) => {
			updateList(result);
		});
	}

	useEffect(() => {
		switch (type) {
			case "MyFollowing":
				updateListMyFollowing();
				break;
			case "MyFollower":
				updateListMyFollower();
				break;
			case "Following":
				updateListFollowing();
				break;
			case "Follower":
				updateListFollower();
				break;
			case "RepoWatch":
				updateRepoWatch();
				break;
			case "RepoStar":
				updateRepoStar();
				break;
		}
    }, [])

	return (
        <Wrapper>
			<ScrollCard
				onScroll={({ nativeEvent }) => {
					if (nativeEvent.contentOffset.y > 60) {
						if (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height) {
							//scrollRef.current?.scrollTo({ y: 0, animated: true });
							setPage(page + 1);
							if (maxPage == -1 || page <= maxPage) {
								switch (type) {
									case "MyFollowing":
										updateListMyFollowing();
										break;
									case "MyFollower":
										updateListMyFollower();
										break;
									case "Following":
										updateListFollowing();
										break;
									case "Follower":
										updateListFollower();
										break;
									case "RepoWatch":
										updateRepoWatch();
										break;
									case "RepoStar":
										updateRepoStar();
										break;
								}
							}
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
        </Wrapper>
    );
}

export default UsersList;
