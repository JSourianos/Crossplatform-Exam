import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import {
    FlatList,
    SafeAreaView,
} from "react-native";
import {getAllCountries} from "../api/diseaseApi";
import {RootStackParamList} from "../navigation/SearchNavigation";

//Components
import OverlayView from "../components/OverlayView";
import SearchBar from "../components/SearchBar";
import ListRenderItem from "../components/ListRenderItem";

//TODO: REFACTOR PROPS
export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,
    'SearchScreen'>;

type Props = {
    item: ItemProps;
    navigation: ProfileScreenNavigationProp
}

export type ItemProps = {
    country: string;
    name: string;
    cases: number;
    continent: string;
    countryInfo: CountryInfo;
    deaths: string;
    population: string;
}

export type CountryInfo = {
    _id: number
    flag: string;
    iso2: string;
    iso3: string
}

const SearchScreen: React.FC<Props> = ({navigation}) => {
    const [allCountries, setAllCountries] = useState([]);
    const [text, setText] = useState("");
    const [toggleOverlay, setToggleOverlay] = useState<boolean>(false);
    const [flatListData, setFlatListData] = useState([]); //Having a unique one so we dont mutate the original array

    useEffect(() => {
        getAllCountries().then(data => {
            setAllCountries([]);

            const correctData = data.filter((item: ItemProps) => item.countryInfo._id !== null); //null checking the data, as some countries dont have the id property
            setAllCountries(correctData);
            setFlatListData(correctData);
        });
    }, []);

    //This only runs when the user inputs text
    useEffect(() => {
        if(text.length === 0) {
            setFlatListData(allCountries);
        } else {
            const newArray = allCountries.filter((item: ItemProps) => item.country.toLowerCase().includes(text.toLowerCase()));
            setFlatListData(newArray);
        }
    }, [text])

    return (
        <SafeAreaView>
            <SearchBar setText={setText} setToggleOverlay={setToggleOverlay} toggleOverlay={toggleOverlay}/>
            {toggleOverlay && <OverlayView setToggleOverlay={setToggleOverlay} toggleOverlay={toggleOverlay}/>}
            <FlatList
                //@ts-ignore
                data={flatListData}
                renderItem={({item}) => {
                    return <ListRenderItem item={item} navigation={navigation}/>
                }}
                keyExtractor={(item: ItemProps) => item.countryInfo._id.toString()}
            />
        </SafeAreaView>
    );
};

export default SearchScreen;
