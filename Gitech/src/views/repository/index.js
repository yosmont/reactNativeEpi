import React, {useEffect} from "react";
import {ActivityIndicator} from 'react-native'
import {Wrapper, RepoWrapper, RepoHeader, Text, Flex, Image} from "./styles";
import TextLink from "@src/components/TextLink";
import ButtonWithIcon from "@src/components/ButtonWithArrow";

export const repoRights = {
  Owner: 'Owner',
  Collaborator: 'Collaborator',
  Tourist: 'Tourist'
}

const Repository = (props) => {
  const [repo, setRepo] = React.useState(undefined);
  const [rights, setRights] = React.useState(undefined);

  useEffect(() => {
    props.route.params.octokit.rest.repos.listForAuthenticatedUser()
      .then((value) => {
        console.log(value.data[15]);
        setRepo(value.data.count !== 0 ? value.data[15] : undefined);
      });
  }, [])

  useEffect(() => {
    if (repo) {
      setRights(repo.owner.login === props.route.params.user.login ? repoRights.Owner : repoRights.Tourist)
    }
  }, [repo])

  return (
    <Wrapper>
      {repo ?
          <RepoWrapper>
            <Flex>
              <Image source={{ uri: repo.owner.avatar_url }} />
              <RepoHeader>
                <Text>Name : {repo.name}</Text>
                <Flex>
                  <Text>Owner : </Text>
                  <TextLink text={repo.owner.login} onPress={() => redirectToUser(props.route.params.navigation, props.route.params.octokit, repo.owner.login)} />
                </Flex>
              </RepoHeader>
            </Flex>
            <Text>{repo.description}</Text>
            <ButtonWithIcon Text={'Code'} onPress={() => getCode(props.route.params.navigation, props.route.params.octokit, repo)} />
          </RepoWrapper>
        :
        <ActivityIndicator size='large' color='#457cb7' />
      }
    </Wrapper>
  );
}

const redirectToUser = (navigation, octokit, user) => {
  navigation.push('UserView', { navigation: navigation, octokit: octokit, username: user })
}

const getCode = (navigation, octokit, repo) => {
  navigation.push('RepositoryCode', { navigation: navigation, octokit: octokit, repo: repo })
}

export default Repository;
