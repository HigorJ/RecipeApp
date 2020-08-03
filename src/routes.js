import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/home';
import List from './pages/list';
import Recipe from './pages/recipe';

const AppStack = createStackNavigator();

const Routes = () => {
    return (
            <NavigationContainer>
                <AppStack.Navigator headerMode="none">
                    <AppStack.Screen name="Home" component={Home} />
                    <AppStack.Screen name="List" component={List} />
                    <AppStack.Screen name="Recipe" component={Recipe} />
                </AppStack.Navigator>
            </NavigationContainer>
    )
}

export default Routes;
