import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoinScreen from './CoinScreen';
import CoinDetail from '../coinDetail/CoinDetailScreen';
import Colors from '../../res/colors';

const Stack = createStackNavigator();

const CoinStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl
                },
                headerTintColor: Colors.white
            }}
        >
            <Stack.Screen name="Coins" component={CoinScreen}/>
            <Stack.Screen name="Coin Detail" component={CoinDetail}/>
        </Stack.Navigator>
    );
}

export default CoinStack;