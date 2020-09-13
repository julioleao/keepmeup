import React from 'react';
import {StyleSheet, View} from 'react-native';

const FormRow = (props) => {
    const { children } = props;
    return(
        <View style={styles.container}>
            {children}
        </View>
    )    
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
    },
});

export default FormRow;