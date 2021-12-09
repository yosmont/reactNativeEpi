import React from "react";
import { View, Text, Dimensions, Image, Wrapper } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

const Card = props => {
    return (
      <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    );
};

export class RecycleTestComponent extends React.Component {
    constructor(args) {
        super(args);
        this.arr = args.items

        let { width } = Dimensions.get("window");
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });
        this._layoutProvider = new LayoutProvider(
            index => {
                return index
            },
            (type, dim) => {
                dim.width = width;
                dim.height = 200;
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);
        this.state = {
            dataProvider: dataProvider.cloneWithRows(this.arr)
        };
    }

    _rowRenderer(index, data) {
        return (
            <Card>
                <View style={styles.container}>
                    <Text>Repository: {data.name}</Text>
                </View>
                <Text>description: {data.description}</Text>
                <Text>Owner: {data.owner.login}</Text>
                <Text>language: {data.language}</Text>
            </Card>
        );
    }

    render() {
        return <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-around",
        alignItems: "center",
    },
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        margin: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    }
});