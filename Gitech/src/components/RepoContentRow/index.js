import React from 'react';
import {TouchableHighlight} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { colors } from "@src/styles";
import {FlexRow, Text, TextLink, styles} from './styles';

const contentIcons = {
  dir: <FontAwesome name="folder" size={15} color="grey" />,
  file: <FontAwesome name="file-o" size={15} color="grey" />
}

const RepoContentRow = (props) => {
  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor={colors.button}
      onPress={props.onPress}>
      {props.item === 'back' ?
        <TextLink>..</TextLink>
      :
        <FlexRow>
          {contentIcons[props.item.type]}
          <Text>  {props.item.name}</Text>
        </FlexRow>
      }
    </TouchableHighlight>
  );
}

export default RepoContentRow;
