import React from 'react';
import { StyleSheet, View } from 'react-native';
import Line from '../components/Line';

export default class Product extends React.Component {
    render() {
        const { product } = this.props.navigation.state.params;
        return(
            <View style={styles.container}>
                <View style={styles.detailContainer}>
                    <Line label='Descrição:' content={product.description}/>
                    {/* <Line label='Profissão:' content={person.profissao}/> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    avatar: {
        aspectRatio: 1,
        borderRadius: 5
    },
    detailContainer: {
        backgroundColor: '#e2f9ff',
        marginTop: 20,
        elevation: 1
    }
})
