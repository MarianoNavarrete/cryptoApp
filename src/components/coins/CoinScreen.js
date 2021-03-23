import React, {useEffect} from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useState } from 'react/cjs/react.development';
import Http from '../../libs/http';
import CoinItem from './CoinItem';
import Colors from '../../res/colors';
import CoinSearch from './CoinSearch';

const CoinScreen = (props) => {
    const {navigation} = props;
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);   
    const [allCoins, setAllCoins] = useState([]);

    const handlePress = (coinItem) => {
        navigation.navigate('Coin Detail', {coin: coinItem});
    }
    //funcion buscador
    const handleSearch = ( query ) => {
        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(query.toLowerCase());
        });
        
        setCoins(coinsFiltered);
    }

    const getCoins = async() => {
        setIsLoading(true);
        //colocar un activity indicator en el mismo useEffect, porque coinsFetch espera a que se cumpla o no
        const coinsFetch = await Http.instance.get('https://api.coinlore.net/api/tickers/');
        setCoins(coinsFetch.data);  
        setIsLoading(false);   
        setAllCoins(coinsFetch.data); 
    }

    useEffect(async()=>{
          getCoins();
    }, []);

    return(
        <View style={styles.container}>
            <CoinSearch onChange={handleSearch}/>
            {
                isLoading ? 
                    <ActivityIndicator color="#00ff00" style={styles.activity}/> 
                    :
                    coins.length === 0 ? 
                        <Text style={styles.emptyText}>Not Found</Text>
                            : 
                        <FlatList 
                            data={coins}
                            renderItem={({ item }) => <CoinItem item={item} onPress={() => handlePress(item)}/>}
                        />        
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,        
    },
    title:{
        fontSize: 20, 
        color: 'white', 
        textAlign:'center'
    },  
    button: {
        padding: 8,
        backgroundColor: 'blue', 
        borderRadius: 8,
        marginTop: 10        
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }, 
    activity: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }, 
    emptyText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    }
});

export default CoinScreen;