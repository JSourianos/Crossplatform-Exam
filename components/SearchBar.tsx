import {Dimensions, StyleSheet, TextInput, View} from "react-native";
import ButtonWithIcon from "./ButtonWithIcon";
import React from "react";

type Props = {
    toggleOverlay: boolean;
    setToggleOverlay: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    setText: (value: string | ((prevVar: string) => string)) => void;
}

const SearchBar: React.FC<Props> = ({setText, toggleOverlay, setToggleOverlay}) => {
    return (
        <View style={styles.searchBar}>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                placeholder={"Enter country name"}
            />
            <ButtonWithIcon icon="filter" toggleOverlay={toggleOverlay} setToggleOverlay={setToggleOverlay}/>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 5
    },
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: "#111111",
        fontFamily: 'Lato_400Regular'
    },
});

export default SearchBar;
