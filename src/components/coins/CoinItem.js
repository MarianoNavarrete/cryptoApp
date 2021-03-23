import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Colors from '../../res/colors';

const CoinItem = (props) => {
    
    const { item, onPress } = props;
    
    const getImage = (price) => {
        price = parseFloat(price);
        if( price > 0.0){
            
            return require('../../assets/au.png');
        } else {
            return require('../../assets/ad.png');
        }
    }

    return(
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.symbolText}>
                    {item.symbol}
                </Text>                    
                <Text style={styles.nameText}>
                    {item.name}
                </Text>      
                <Text style={styles.priceText}>
                    {`$ ${item.price_usd}`}
                </Text>          
            </View>

            <View style={styles.row}>
                <Text style={styles.percentText}>
                    {item.percent_change_1h}
                </Text>
                
                <Image
                    style={styles.changeImage}
                    source={getImage(item.percent_change_1h)}
                />
            </View>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16 ,
        justifyContent: 'space-between',
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 2
    },
    row: {
        flexDirection: 'row'
    }, 
    symbolText: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 12
    },
    nameText: {
        color: '#fff', 
        fontSize: 14,
    },
    priceText: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 14
    },  
    percentText: {
        fontSize: 12,
        color: '#fff'
    },
    changeImage: {
        marginLeft: 10,
        width: 20,
        height: 20
    }
});

export default CoinItem;