import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

const ProjectList = props => {
    const {project, onPressItem} = props;

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list}
                data={this.state.project}
                keyExtractor={item => item.id}
                renderItem={this.renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },

    list: {
        padding: 20
    },
});

export default ProjectList;