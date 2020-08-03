import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    CheckBox,
    Alert,
    AsyncStorage,
    ToastAndroid,
} from 'react-native';

import Logo from '../assets/logo.png';

import initDB from '../database/initDB';

const Home = () => {

    const navigation = useNavigation();    

    const [termsChecked, setTermsChecked] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function getTerms() {
            var terms = await AsyncStorage.getItem('terms');
            
            if(terms === 'accepted') {
                navigation.navigate('List');
            }
        }

        getTerms();
        initDB();
        
      
    }, [])

    async function nextScreen() {

        try {
            await AsyncStorage.setItem('terms', 'accepted');

            if(termsChecked) {
                navigation.navigate('List');
            } else {
                ToastAndroid.showWithGravity(
                    'Você deve aceitar os termos de uso.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                )
            }
        } catch (error) {
            setError('Houve um erro. Tente reiniciar ou aceitar os termos novamente.');
        }
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image style={styles.image} source={Logo} />
                <Text style={styles.text}>Adicione suas receitas e tenha tudo na palma da sua mão</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.buttonNext} onPress={() => nextScreen()}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>

                <View style={styles.terms}>
                    <CheckBox tintColors={{ true: '#FFA149', false: '#FFA149' }} value={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />
                    <Text>Aceito os termos de uso.</Text>
                </View>
            </View>

            <Text>{error}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    image: {
        alignSelf: 'center',
        width: 210,
        height: 250,
    },

    text: {
        color: '#494949',
        fontSize: 22,
        textAlign: 'center'
    },

    buttonNext: {
        width: 180,
        height: 50,
        backgroundColor: '#FFA149',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },

    buttonText: {
        color: '#494949',
        fontSize: 22,
    },

    terms: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default Home;