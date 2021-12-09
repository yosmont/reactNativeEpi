import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import CustomInlineTextInput from '@components/CustomInlineTextInput';
import CustomSwitchInput from '@components/CustomSwitchInput';
import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";
import { Wrapper, Text } from './styles';
// import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const { Octokit } = require("@octokit/rest");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    large_Text: {
        fontSize: 30,
        color: '#fff',
        marginBottom: 20
    },
    subTitleText: {
        alignItems: 'flex-start',
        width: 300,
        height: 30,
        marginTop: 20,
        marginBottom: 5,
        paddingTop: 20,
        paddingBottom: 5,
        color: '#fff'
    }
});

class CreateReposData {
    name = null;
    description = null;
    homepage = null;
    private = false;
    has_issues = true;
    has_projects = true;
    has_wiki = true;
    auto_init = false;
    gitignore_template = null;
    license_template = null;
    allow_squash_merge = true;
    allow_merge_commit = true;
    allow_rebase_merge = true;
    allow_auto_merge = true;
}

function CreateReposWithData(data, octokit) {
    if (typeof data.name === 'undefined') {
        alert("one Required input is empty")
    } else {
        octokit.rest.repos.createForAuthenticatedUser(data).then((value) => {
            console.log(value.data);
            alert("the new repository has been created");
        }).catch((err) => {
            alert(err);
        });
    }
}

const CreateRepos = (props) => {
    const octokit = new Octokit({
        auth: props.route.params.octokitAuth
    });
    let data = {};
    return (
        <Wrapper>
            <ScrollView>
                <Text style={styles.large_Text} >Create a GitHub Repos</Text>
                <Text style={styles.subTitleText}>Required:</Text>
                <CustomInlineTextInput text='Name' onValueChange={(value) => data.name = value} />
                <LimitedWidthCustomButton onPress={() => CreateReposWithData(data, octokit)} Text="Create a new repos" />
                <Text style={styles.subTitleText}>Not required:</Text>
                <CustomInlineTextInput text='Description' onValueChange={(value) => data.description = value} />
                <CustomInlineTextInput text='Homepage URL' onValueChange={(value) => data.homepage = value} />
                <CustomSwitchInput text='Private repos' onValueChange={(value) => data.private = value} />
                <CustomSwitchInput text='Enable issues' value='true' onValueChange={(value) => data.has_issues = value} />
                <CustomSwitchInput text='Enable projects' value='true' onValueChange={(value) => data.has_projects = value} />
                <CustomSwitchInput text='Enable wiki' value='true' onValueChange={(value) => data.has_wiki = value} />
                <CustomSwitchInput text='Initialize with a README.md' onValueChange={(value) => data.auto_init = value} />
                <CustomInlineTextInput text='Gitignore Template' onValueChange={(value) => data.gitignore_template = value} />
                <CustomInlineTextInput text='License Template' onValueChange={(value) => data.license_template = value} />
                <CustomSwitchInput text='Allow Squash Merge' value='true' onValueChange={(value) => data.allow_squash_merge = value} />
                <CustomSwitchInput text='Allow Merge Commit' value='true' onValueChange={(value) => data.allow_merge_commit = value} />
                <CustomSwitchInput text='Allow Rebase Merge' value='true' onValueChange={(value) => data.allow_rebase_merge = value} />
                <CustomSwitchInput text='Allow Auto Merge' value='true' onValueChange={(value) => data.allow_auto_merge = value} />
                <CustomSwitchInput text='Allow Delete Branch on Merge' value='true' onValueChange={(value) => data.delete_branch_on_merge = value} />
                <CustomSwitchInput text='Enable download' value='true' onValueChange={(value) => data.has_downloads = value} />
                <CustomSwitchInput text='Is a template' onValueChange={(value) => data.is_template = value} />
                <LimitedWidthCustomButton onPress={() => CreateReposWithData(data, octokit)} Text="Create a new repos" />
            </ScrollView>
        </Wrapper>
    );
}

export default CreateRepos;