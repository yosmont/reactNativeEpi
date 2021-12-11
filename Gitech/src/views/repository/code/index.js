import React, {useEffect, useState} from "react";
import {styles, Card, Wrapper, Flex, BranchCard, FlexRow, PickerWrapper} from "./styles";
import RepoContentRow from "@src/components/RepoContentRow";
import {ActivityIndicator, Picker, View} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const RepositoryCode = (props) => {
  const repo = props.route.params.repo;
  const branches = props.route.params.branches;
  const [path, setPath] = useState(props.route.params.path);
  const [branch, setBranch] = useState(branches[0].name);
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
  }, [path, branch])

  const onPressContent = (item) => {
    setPath(path === undefined ? item.name : path + '/' + item.name);
  }

  const goBack = () => {
    setPath(path.slice(0, path.lastIndexOf('/')));
  }

  return (
    <Wrapper>
      {code ?
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
