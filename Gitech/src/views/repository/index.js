import React, {useEffect} from "react";
import {Text} from 'react-native'
import {Wrapper} from "./styles";

const Repository = (props) => {
  const [repo, setRepo] = React.useState("");

  useEffect(() => {
    props.route.params.octokit.rest.repos.listForAuthenticatedUser().then((value) => {
      setRepo(value.data.count !== 0 ? value.data[0] : undefined);
      console.log(value.data);
    });
  }, [])

  return (
    <Wrapper>
      <Text>{repo.name}</Text>
    </Wrapper>
  )
}

export default Repository;
