import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import FavoriteEmptyState from './FavoriteEmptyState';
import Colors from '../../res/colors';
import Storage from '../../libs/storage';
import CoinItem from '../coins/CoinItem';

const FavoriTesScreen = (props) => {

    const { navigation } = props;
    
    const [userFavorites, setUserFavorites] = useState([]);

    const getFavorites = async() => {
        try{
            const allKeys = await Storage.instance.getAllKeys();
            //se filtra la llave segun la regla para tener solo las llaves que son necesarias
            const keys = allKeys.filter((key) => key.includes("favorite-"));
            //retornando todos los valores
            const favs = await Storage.instance.multiGet(keys);
            
            const favorites = favs.map((fav) => JSON.parse(fav[1]));
            setUserFavorites(favorites);
        } catch(err){
            console.log('get favorites err ', err);
        }
    }
    console.log('se monto');
    const handlePress = (item) => {
        navigation.navigate('Coin Detail', {coin: item});
    }
    //para escuchar siempre un cambio se utiliza el prop focus
    useEffect(()=>{
        getFavorites()
    },[userFavorites.length]);

    return(
        <View style={styles.container}>
            {
                userFavorites.length > 0 ? 
                <FlatList 
                    data={userFavorites}
                    renderItem={({item}) => <CoinItem item={item} onPress={() => handlePress(item)}/>}
                /> : 
                <FavoriteEmptyState />
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default FavoriTesScreen;