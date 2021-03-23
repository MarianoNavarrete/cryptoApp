import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoriteEmptyState = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                You do not have any favorite yet
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {        
        alignContent: 'center',        
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center'

    }
});

export default FavoriteEmptyState;