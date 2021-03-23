import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    SectionList, 
    FlatList, 
    ActivityIndicator, 
    Pressable ,
    Alert
    }
    from 'react-native';
import Colors from '../../res/colors';
import Http from '../../libs/http';
import CoinMarketDetail from './CoinMarketDetail';
import Storage from '../../libs/storage';

const CoinDetailScreen = (props) => {

    const [markets, setMarkets] = useState([]);
    const [isMarketsLoading, setIsMarketsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    const { coin } = props.route.params;

    const getImage = (name) => {
        const lowerName = name.toLowerCase();
        return `https://c1.coinlore.com/img/25x25/${lowerName}.png`;
    }

    

    const getSections = (coinSection) => {
        const sections = [
            {
                title: 'Market Cup',
                data: [coinSection.market_cap_usd]
            },
            {
                title: 'Volume 24h',
                data: [coinSection.volume24]
            },
            {
                title: 'Change 24h',
                data: [coinSection.percent_change_24h]
            }
        ];
        return sections;
    }

    const getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
        const market = await Http.instance.get(url);
        setMarkets(market);
        setIsMarketsLoading(false);
    }

    const toogleFavorite = () => {
        if(isFavorite){
            removeFavorite();
        } else {
            addFavorite();
        }
    }

    const removeFavorite = async() => {
        const key = `favorite-${coin.id}`;
        Alert.alert('Remove Favorite!!!', 'Are you sure???', [
            {
                text: 'cancel',
                onPress: () => {},
                style: 'cancel'
            },
            {
                text: 'Remove',
                onPress: async() => {
                    
                    await Storage.instance.remove(key);
                    setIsFavorite(false);
                }
            }
        ]);
        
    }

    const addFavorite = async() => {
        const coinF = JSON.stringify(coin);
        const key = `favorite-${coin.id}`;

        const stored = await Storage.instance.store(key, coinF);
        if(stored){
            setIsFavorite(true);
        }
    }
    
    const getFavorite = async() => {
        const key = `favorite-${coin.id}`;
        try{
            const favStr = await Storage.instance.get(key);
            console.log('favoritos ', favStr);
            if(favStr != null){
                setIsFavorite(true);
            }
        }catch(err){
            console.log('get favorites err ',err);
        }
    }

    useEffect(() => {
        props.navigation.setOptions({ title: coin.symbol });
        getMarkets(coin.id);
        getFavorite();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <View style={styles.row}>
                    <Image source={{ uri: getImage(coin.name) }} style={styles.imageName} />
                    <Text style={styles.titleText}>
                        {coin.name}
                    </Text>
                </View>
                <Pressable 
                    onPress={toogleFavorite}
                    style={
                        [
                            styles.btnFavorite,
                            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd
                        ]
                    }
                >
                    <Text style={styles.btnFavoriteText}>
                        {
                            isFavorite ?
                                'Remove Favorite' :
                                'Add Favorite'
                        }
                    </Text>
                </Pressable>
            </View>

            <SectionList
                sections={getSections(coin)}
                style={styles.section}
                keyExtractor={(item) => item}
                renderItem={({ item }) =>
                    <View style={styles.sectionItem}>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                }
                renderSectionHeader={({ section }) =>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}>{section.title}</Text>
                    </View>
                }
            />

            <Text style={styles.marketTitle}>Markets</Text>
            {
                isMarketsLoading ? <ActivityIndicator size="large" color="#00ff00" />
                    :
                    <FlatList
                        style={styles.list}
                        data={markets}
                        keyExtractor={(item) => `${item.name}-${item.base}-${item.quote}`}
                        renderItem={({ item }) => <CoinMarketDetail market={item} />}
                        horizontal={true}
                    />
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },  
    subHeader: {
        backgroundColor: "rgba(0,0,0, 0.2)",
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageName: {
        width: 25,
        height: 25
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 8
    },
    sectionHeader: {
        backgroundColor: 'rgba(0,0,0, 0.2)',
        padding: 10
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: 'white',
        fontSize: 14
    },
    sectionText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    section: {
        maxHeight: 220
    },
    list: {
        maxHeight: 80,
        paddingLeft: 16
    },
    marketTitle: {
        color: 'white',
        fontSize: 16,
        marginBottom: 16,
        marginLeft: 16,
        fontWeight: 'bold'
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8
    },
    btnFavoriteAdd: {
        backgroundColor: Colors.picton
    },
    btnFavoriteRemove: {
        backgroundColor: Colors.carmine
    },
    btnFavoriteText:{
        color: Colors.white
    }
});

export default CoinDetailScreen;