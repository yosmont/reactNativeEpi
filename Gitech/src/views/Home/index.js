import React, { useEffect } from 'react';
import { Wrapper, UserWrapper, Image, Text } from './styles';

function GetNbOfPage(linkStr) {

    if (linkStr == null) {
        return (0);
    }
    return parseInt(linkStr.slice(linkStr.lastIndexOf("&page=") + 6, -13));
}

const Home = (props) => {
}

export default Home;