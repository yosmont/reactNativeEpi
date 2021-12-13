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

function GoToRepo(navigation, octokit, reposName) {
	reposName = reposName.split('/');
	octokit.rest.repos.get({
		owner: reposName[0],
		repo: reposName[1],
	}).then((value) => {
		navigation.navigate('Repository', { navigation: navigation, octokit: octokit, repo: value.data });
	});
}

const ReposList = (props) => {
	const perPage = 25
	const octokit = props.route.params.octokit;
	const type = props.route.params.type;
	const username = props.route.params.username;
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
			tmp = {
				full_name: item.full_name,
				clone_url: item.clone_url,
				avatar_url: item.owner.avatar_url
			}
			if (Items.find(elem => elem.full_name == tmp.full_name) === undefined)
				Items.push(tmp);
		});
		setItems(Items);
		setRecylerViewUpdate(<CustomRecylerView onPressStart={(usf, item) => {
			GoToRepo(props.navigation, octokit, item.full_name);
		}
		} text={`page : ${page}`} usfull={props.octokit, props.navigation} Items={Items} />);
	}

	function updateListMyRepos() {
		octokit.rest.repos.listForAuthenticatedUser({
			per_page: perPage,
			page: page,
		}).then((result) => {
			updateList(result);
		});
	}

	function updateListMyStar() {
		octokit.rest.activity.listReposStarredByAuthenticatedUser({
			per_page: perPage,
			page: page,
		}).then((result) => {
			updateList(result);
		});
	}

	function updateListMyWatch() {
		octokit.rest.activity.listWatchedReposForAuthenticatedUser({
			per_page: perPage,
			page: page,
		}).then((result) => {
			updateList(result);
		});
	}

	function updateListRepos() {
		octokit.rest.repos.listForUser({
			per_page: perPage,
			page: page,
			username: username,
		}).then((result) => {
			updateList(result);
		});
	}

	function updateListStar() {
		octokit.rest.activity.listReposStarredByUser({
			per_page: perPage,
			page: page,
			username: username,
		}).then((result) => {
			updateList(result);
		});
	}

	function updateListWatch() {
		octokit.rest.activity.listReposWatchedByUser({
			per_page: perPage,
			page: page,
			username: username,
		}).then((result) => {
			updateList(result);
		});
	}

	useEffect(() => {
		switch (type) {
			case "MyRepos":
				updateListMyRepos();
				break;
			case "MyStar":
				updateListMyStar();
				break;
			case "MyWatch":
				updateListMyWatch();
				break;
			case "Repos":
				updateListRepos();
				break;
			case "Star":
				updateListStar();
				break;
			case "Watch":
				updateListWatch();
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
									case "MyRepos":
										updateListMyRepos();
										break;
									case "MyStar":
										updateListMyStar();
										break;
									case "MyWatch":
										updateListMyWatch();
										break;
									case "Repos":
										updateListRepos();
										break;
									case "Star":
										updateListStar();
										break;
									case "Watch":
										updateListWatch();
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

export default ReposList;