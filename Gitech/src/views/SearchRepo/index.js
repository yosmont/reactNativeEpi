import React from 'react';
import { Wrapper, Card, LargeText } from "./styles";
import CustomTextInput from "@components/CustomTextInput";
import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";

// 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

const SearchRepo = (props) => {
    const [research, setresearch] = React.useState("");
    const [researchlanguage, setresearchlanguage] = React.useState("");

    React.useEffect(()=> {

    }, [research]);

    return (
        <Wrapper>
          <Card>
            <LargeText>GitHub Search</LargeText>

            <CustomTextInput text='Search' placeholder='Search' onValueChange={ setresearch }/>
            <CustomTextInput text='language' placeholder='language' onValueChange={ setresearchlanguage }/>

            <LimitedWidthCustomButton onPress={() => {
                if (research != "") {
                    props.route.params.octokit.rest.search.repos({

                        q: research,
                        language: researchlanguage,
                        sort: 'stars',
                        order: 'desc',

                    }).then((result) => {
                        console.log(result);
                    });
                }
            }} Text="Search" />

          </Card>
        </Wrapper>
    )
};

export default SearchRepo;
