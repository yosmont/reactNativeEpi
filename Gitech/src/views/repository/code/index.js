import React, {useEffect} from "react";
import {CodeWrapper, Flex, Wrapper} from "./styles";

const RepositoryCode = (props) => {
  const repo = props.route.params.repo;
  const [code, setCode] = React.useState(undefined);

  useEffect(() => {
    props.route.params.octokit.rest.repos.getContent({
      owner: repo.owner.login,
      repo: repo.name,
      path: ''
    })
      .then((value) => {
        console.log(value.data);
      });
  }, [])

  return (
    <Wrapper>
      <CodeWrapper>
        <Flex>

        </Flex>
      </CodeWrapper>
    </Wrapper>
  );
}

export default RepositoryCode;
