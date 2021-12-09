import React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

const Card = props => {
    return (
      <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    );
};

export class RecycleTestComponent extends React.Component {
    constructor(args) {
        super(args);
        this.titles = args.titles
        this.images = args.images

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
                dim.height = 80;
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);
        this.state = {
            dataProvider: dataProvider.cloneWithRows(this.titles)
        };
    }

    _rowRenderer(index) {
        if (this.images === undefined) {
            return (
                <Card>
                    <Text style={styles.title}>{this.titles[index]}</Text>
                </Card>
            );
        } else {
            return (
                <Card>
                    <Image style={styles.image} source={{ uri: this.images[index] }} />
                    <Text style={styles.title}>{this.titles[index]}</Text>
                </Card>
            )
        }
    }

    ViewRenderer() {
        return <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />;
    }

    render() {
        return <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />;
    }
}

const styles = {
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginStart: 8,
        marginEnd: 8,
        alignItems: "center",
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        margin: 5,
    },
    image: {
        width: 20,
        height: 20,
        borderRadius: 50,
        alignItems: 'center',
        marginEnd: 5 ,
    }
};