import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ItemProps} from "../screens/SearchScreen";
import {ProfileScreenNavigationProp} from "../utils/props";
import {numberWithCommas} from "../utils/utils";

type Props = {
    item: ItemProps;
    navigation: ProfileScreenNavigationProp
}

const ListRenderItem = ({item, navigation}: Props) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate("SearchResultScreen", {country: item.countryInfo.iso3})}>
                <View style={styles.renderContainer}>
                    <View style={{flex: 1}}>
                        <Text style={styles.renderContainerTitle}>{item.country}</Text>
                        <Text style={styles.renderContainerText}>Cases: {numberWithCommas(item.cases)}</Text>
                    </View>
                    <Image style={{width: 100, height: 100, flex: 1}} source={{uri: item.countryInfo.flag.toString()}}/>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    renderContainer: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        shadowColor: "#000",
        backgroundColor: "#FAF9F6",
    },
    renderContainerTitle: {
        fontSize: 20,
        fontFamily: 'Lato_700Bold'
    },
    renderContainerText: {
        fontSize: 16,
        fontFamily: 'Lato_400Regular'
    },
});

export default ListRenderItem;
