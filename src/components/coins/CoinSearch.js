import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import Colors from '../../res/colors';

const CoinSearch = ( props ) => {
    const [query, setQuery] = useState("");

    const handleText = (query) => {
        setQuery({query});
        if(props.onChange){
            props.onChange(query);
        }
    }

    return(
        <View>
            <TextInput 
                onChangeText={handleText}
                value={query}
                placeholder="Search Coin"
                placeholderTextColor='white'
                //estilos en diferentes plataformas
                style={
                    [
                        styles.textInput,
                        Platform.OS === 'ios' ?
                            styles.textInputIOS :
                            styles.textInputAndroid
                    ]
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: Colors.charade, 
        paddingLeft: 16,
        color: 'white'
    },
    textInputAndroid: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.zircon
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8
    }
});

export default CoinSearch;