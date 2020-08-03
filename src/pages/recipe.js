import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

import { Feather, FontAwesome } from '@expo/vector-icons';

import RecipeServices from '../services/RecipeService';
import IngredientServices from '../services/IngredientsService';
import StepServices from '../services/StepsService';
import ObservationServices from '../services/ObsServices';

const AddRecipe = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [id, setId] = useState(null);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [observations, setObservations] = useState([]);
    const [enable, setEnable] = useState(false);
    const [error, setError] = useState('');
    

    const routeParam = route.params;

    async function getPermissions() {
        if(Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if(status !== 'granted') {
                alert('Precisamos da permissão da camera');
            }
        }
    }

    useEffect(() => {
        getPermissions();

        setEnable(routeParam.state);

        if(!routeParam.state) {
            setId(routeParam.recipe.recipe_id);
            setTitle(routeParam.recipe.title);
            setDescription(routeParam.recipe.description);
            setImage(routeParam.recipe.photo);
        
            async function getRecipeInfo() {
                await IngredientServices.getIngredient(routeParam.recipe.recipe_id).then((response) => {
                    setIngredients(response._array);
                });
    
                await StepServices.getStep(routeParam.recipe.recipe_id).then((response) => {
                    setSteps(response._array);
                });
    
                await ObservationServices.getObservation(routeParam.recipe.recipe_id).then((response) => {
                    setObservations(response._array);
                });
            }
    
            getRecipeInfo();
        }
    }, []);

    async function imagePicked() {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if(!result.cancelled) {
                setImage(result.uri);
            }
        } catch(error) {
            setError('Erro ao carregar a imagem, tente novamente.')
        }
    }

    async function onSave() {
        if(id === null || id === undefined) {
            createNewRecipe();
        } else {
            updateOldRecipe();
        }

        navigation.navigate('List');
    }

    async function onRemove() {
        await RecipeServices.removeRecipe(id);

        navigation.navigate('List');
    }

    async function createNewRecipe() {
        var idRecipe = 0;

        idRecipe = await RecipeServices.addRecipe(title, description, image);

        ingredients.map(async (ingredientObj) => {
            await IngredientServices.addIngredient(ingredientObj.ingredient, idRecipe);
        });

        steps.map(async (stepObj) => {
            await StepServices.addStep(stepObj.step, idRecipe);
        });

        observations.map(async (observationObj) => {
            await ObservationServices.addObservation(observationObj.observation, idRecipe);
        });
    }

    async function updateOldRecipe() {
        await RecipeServices.updateRecipe(id, title, description);

        ingredients.map(async (ingredientObj) => {
            if(ingredientObj.ingredient_id === undefined) {
                await IngredientServices.addIngredient(ingredientObj.ingredient, id);
            } else {
                await IngredientServices.updateIngedient(ingredientObj.ingredient_id, ingredientObj.ingredient);
            }
            
        })

        steps.map(async (stepObj) => {
            if(stepObj.step_id === undefined) {
                await StepServices.addStep(stepObj.step, id);
            } else {
                await StepServices.updateStep(stepObj.step_id, stepObj.step)
            }
            
        })

        observations.map(async (observationObj) => {
            if(observationObj.obs_id === undefined) {
                await ObservationServices.addObservation(observationObj.observation, id);
            } else {
                await ObservationServices.updateObservation(observationObj.obs_id, observationObj.observation);
            }
        })
    }

    function changeIngredient(text, index) {
        let tempIngredients = [...ingredients];

        tempIngredients[index].ingredient = text;

        setIngredients(tempIngredients);
    }

    function changeStep(text, index) {
        let tempSteps = [...steps];

        tempSteps[index].step = text;

        setSteps(tempSteps);
    }

    function changeObservation(text, index) {
        let tempObservations = [...observations];

        tempObservations[index].observation = text;

        setObservations(tempObservations);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.header}>
                    <View style={styles.infoHeader}>
                        <Text style={styles.screenTitle}>Adicionar receita</Text>

                        <View style={styles.viewButtons}>
                            <TouchableOpacity onPress={onSave} style={{ marginHorizontal: 7 }} disabled={!enable}>
                                <Feather name="save" color="#FFA149" size={28} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setEnable(true)} style={{ marginHorizontal: 7 }} disabled={enable}>
                                <Feather name="edit" color="#FFA149" size={28} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onRemove} style={{ marginHorizontal: 7 }}>
                                <Feather name="trash" color="#FFA149" size={28} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.infoRecipe}>
                        <TextInput 
                            style={styles.inputRecipeName} 
                            placeholder="Nome da receita..." 
                            placeholderTextColor="#545454" 
                            value={title}
                            onChangeText={setTitle}
                            editable={enable}
                        />
                        <TouchableOpacity style={styles.imgView} onPress={imagePicked}>
                            {image === null || image === undefined ? (
                                <Feather name="plus" color="#515151" size={48} />
                            ):(
                                <Image style={styles.image} source={{ uri: image }} />
                            )}
                        </TouchableOpacity>
                        

                        <TextInput 
                            style={styles.inputRecipeDescription} 
                            placeholder="Descrição da receita..." 
                            placeholderTextColor="#545454" 
                            value={description}
                            onChangeText={setDescription}
                            multiline={true}
                            editable={enable}
                        />
                    </View>
                </View>
                
                
                <View style={styles.recipeSteps}>
                    <View style={styles.recipeIngredients}>  
                        <Text style={styles.viewTitle}>Ingredientes</Text>

                        {ingredients.length !== 0 ? ingredients.map((item, index) => (
                            <View style={styles.ingredient} key={index}>
                                
                                <FontAwesome name="circle" color="#FF7A00" size={16} />
                                <TextInput 
                                    style={styles.textInput} 
                                    placeholder="Digite o ingreditente..." 
                                    editable={enable}
                                    multiline={true}
                                    onChangeText={(text) => changeIngredient(text, index)}
                                    value={item.ingredient}
                                />
                            </View>
                        )) : <></>}
                        
                        {enable && (
                            <>
                                <TouchableOpacity style={styles.touchableAdd} onPress={() => setIngredients([...ingredients, { ingredient: "" }])}>
                                    <Feather name="plus" size={32} color="#515151" />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>

                    <View style={styles.recipePreparation}>
                        <Text style={styles.viewTitle}>Modo de preparo</Text>

                        {steps.length !== 0 ? steps.map((item, index) => (
                            <View style={styles.ingredient} key={index}>
                                <FontAwesome name="circle" color="#FF7A00" size={16} />
                                <TextInput 
                                    style={styles.textInput} 
                                    placeholder="Digite o passo de preparo..." 
                                    editable={enable} 
                                    multiline={true}
                                    onChangeText={(text) => changeStep(text, index)}
                                    value={item.step}
                                />
                            </View>
                        )) : <></>}

                        {enable && (
                            <TouchableOpacity style={styles.touchableAdd} onPress={() => setSteps([...steps,  { step: "" }])}>
                                <Feather name="plus" size={32} color="#515151" />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.recipeObservations}>
                        <Text style={styles.viewTitle}>Observações</Text>

                        {observations.length !== 0 ? observations.map((item, index) => (
                            <View style={styles.ingredient} key={index}>
                                <FontAwesome name="circle" color="#FF7A00" size={16} />
                                <TextInput 
                                    style={styles.textInput} 
                                    placeholder="Digite a observação..." 
                                    editable={enable} 
                                    multiline={true}
                                    onChangeText={(text) => changeObservation(text, index)}
                                    value={item.observation}
                                />
                            </View>
                        )) : <></>}
                        
                        {enable && (
                            <TouchableOpacity style={styles.touchableAdd} onPress={() => setObservations([...observations, { observation: "" }])}>
                                <Feather name="plus" size={32} color="#515151" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    scroll: {
        flex: 1,
        width: '100%',
    },

    viewButtons: {
        flexDirection: 'row',
    },

    header: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        marginBottom: 10,
    },  

    screenTitle: {
        color: '#545454',
        fontSize: 22,
    },

    infoRecipe: {
        width: '100%',
        alignItems: 'center',
    },

    inputRecipeName: {
        borderBottomColor: '#FFA149',
        borderBottomWidth: 1,
        height: 42,
        width: '70%',
        fontSize: 20,
        textAlign: 'center',
    },

    inputRecipeDescription: {
        borderBottomColor: '#FFA149',
        borderBottomWidth: 1,
        width: '70%',
        fontSize: 20,
        textAlign: 'center',
    },

    imgView: {
        width: 150,
        height: 150,
        backgroundColor: '#FFB076',
        marginTop: 5,
        borderRadius: 75,
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        width: '100%', 
        height: '100%', 
        borderRadius: 75,
    },

    recipeSteps: {
        width: '90%',
        alignSelf: 'center',
    },

    viewTitle: {
        fontSize: 26,
        color: '#FF7A00',
        alignSelf: 'center'
    },

    recipeIngredients: {
        justifyContent: 'center',
        marginBottom: 20,
    },

    ingredient: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    recipePreparation: {
        justifyContent: 'center',
        marginBottom: 20,
    },

    recipeObservations: {
        justifyContent: 'center',
        marginBottom: 20,
    },

    textInput: {
        marginLeft: 10,
        fontSize: 16,
        marginVertical: 10,
    },

    touchableAdd: {
        width: 200,
        height: 40,
        backgroundColor: '#FFA149',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    
})

export default AddRecipe;