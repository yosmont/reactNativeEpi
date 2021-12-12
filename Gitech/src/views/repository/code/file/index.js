import React, {useEffect} from "react";
import {Card, Wrapper, Text} from "./styles";
import {ActivityIndicator} from "react-native";
import {Base64} from 'js-base64';

const FileView = (props) => {
  const repo = props.route.params.repo;
  const [file, setFile] = React.useState(undefined);

  useEffect(() => {
    props.route.params.octokit.rest.repos.getContent({
      owner: repo.owner.login,
      repo: repo.name,
      path: props.route.params.path,
      ref: props.route.params.branch
    })
      .then((value) => {
        console.log('<\n' + value.data.content + '\n>');
        setFile(Base64.decode(value.data.content))
      });
  }, [])

  return (
    <Wrapper>
      {file ?
        <Card>
          <Text>{file}</Text>
        </Card>
        :
        <ActivityIndicator size='large' color='#457cb7' />
      }
    </Wrapper>
  );
}

export default FileView;
