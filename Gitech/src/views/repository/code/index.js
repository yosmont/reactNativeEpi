import React, {useEffect, useState} from "react";
import {styles, Card, Wrapper, BranchCard, FlexRow, PickerWrapper} from "./styles";
import RepoContentRow from "@src/components/RepoContentRow";
import {ActivityIndicator, Picker, ScrollView, View} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const RepositoryCode = (props) => {
  const repo = props.route.params.repo;
  const [branches, setBranches] = React.useState(undefined);
  const [path, setPath] = useState(props.route.params.path);
  const [branch, setBranch] = useState(repo.default_branch);
  const [code, setCode] = React.useState(undefined);

  useEffect(() => {
      props.route.params.octokit.rest.repos.getContent({
        owner: repo.owner.login,
        repo: repo.name,
        path: path,
        ref: branch
      })
        .then((value) => {
          console.log(value.data);
          setCode(value.data.sort(sortContent));
        });
    props.route.params.octokit.rest.repos.listBranches({owner: repo.owner.login, repo: repo.name})
      .then((value) => {
        setBranches(value.data);
      });
  }, [path, branch])

  const onPressContent = (item) => {
    if (item.type === 'dir')
      setPath(path === undefined ? item.name : path + '/' + item.name);
    else
      props.route.params.navigation.push('FileView', { octokit: props.route.params.octokit, repo: repo, path : path === undefined ? item.name : path + '/' + item.name, ref: branch });
  }

  const goBack = () => {
    setPath(path.slice(0, path.lastIndexOf('/')));
  }

  return (
    <Wrapper>
      <ScrollView>
        {
          code ?
            <View>
              <BranchCard>
                <FlexRow>
                  <Ionicons style={{ flex: 0.2 }} name="ios-git-branch-outline" size={24} color="grey" />
                  <PickerWrapper>
                    <Picker
                      selectedValue={branch}
                      style={styles.picker}
                      onValueChange={(value) => setBranch(value)}
                    >
                      {
                        branches ?
                          branches.map((branch) => (
                            <Picker.Item label={branch.name} value={branch.name} />
                          ))
                          :
                          <Picker.Item label="main" value="main" />
                      }
                    </Picker>
                  </PickerWrapper>
                </FlexRow>
              </BranchCard>
              <Card>
                {path !== '' && <RepoContentRow
                  item={'back'}
                  onPress={() => goBack()}
                />}
                {
                  code.map((item) => (
                    <RepoContentRow
                      item={item}
                      onPress={() => onPressContent(item)} />
                  ))
                }
              </Card>
            </View>
            :
            <ActivityIndicator size='large' color='#457cb7' />
        }
      </ScrollView>
    </Wrapper>
  );
}

const sortContent = (a, b) => {
  if (a.type === 'dir') {
    return b.type !== 'dir' ? -1 : 0;
  } else if (b.type === 'dir') {
    return a.type !== 'dir' ? 1 : 0;
  }
  return 0;
}

export default RepositoryCode;
