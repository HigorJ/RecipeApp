import React, { useState, useEffect } from 'react';

import {
    ScrollView,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import RecipeServices from '../services/RecipeService';

const List = () => {

    const navigation = useNavigation();

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {

        async function getInfo() {
            await RecipeServices.getAll().then((response) => {
                setRecipes(response._array);
            });
        }

        getInfo();

    }, [recipes]);

    function toAddRecipe() {
        let state = true;

        navigation.navigate('Recipe', { 
            state
        });
    }

    function toRecipe(recipe) {
        let state = false;

        navigation.navigate('Recipe', { 
            state,
            recipe
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.screenTitle}>Receitas</Text>
            <ScrollView style={styles.scroll}>
                <View>
                    {recipes.map((recipeItem) => (
                        <TouchableOpacity key={recipeItem.recipe_id} style={styles.recipeContainer} onPress={() => toRecipe(recipeItem)}>
                            <Text style={styles.recipeTitle}>{recipeItem.title}</Text>
                            <Text ellipsizeMode='tail' numberOfLines={2} style={styles.recipeText}>{recipeItem.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.btnAddRecipe} onPress={toAddRecipe}>
                <Feather name="plus" size={32} color="#515151" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        justifyContent: 'center',
    },

    screenTitle: {
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginBottom: 10,
        color: '#545454',
        fontSize: 22,
    },

    scroll: {
        flex: 1,
        width: '100%',
    },

    recipeContainer: {
        alignSelf: 'center',
        marginBottom: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderColor: '#BFB6B6',
        borderRadius: 25,
        borderWidth: 1,
        width: '90%',
    },

    recipeTitle: {
        color: '#FF7A00',
        fontSize: 18,
    },

    recipeText: {
        fontSize: 14,
        color: '#525252',
    },

    btnAddRecipe: {
        backgroundColor: '#FFA149',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        position: 'absolute',
        top: '90%',
        right: '5%',
    }
})

export default List;