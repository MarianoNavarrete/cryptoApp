import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../res/colors';

const CoinMarketDetail = (props) => {
    const {market} = props;
    
    return(
        <View style={styles.container}>
            <Text style={styles.nameText}>
                {market.name} 
            </Text>
            <Text style={styles.priceText}>
                {market.price_usd}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: Colors.zircon,
        borderWidth: 1,
        padding: 6,
        marginRight: 8,
        alignItems: 'center'
    },
    nameText: {
        color: 'white',
        fontWeight: 'bold'
    },
    priceText: {
        color: 'white'
    }
});

export default CoinMarketDetail;