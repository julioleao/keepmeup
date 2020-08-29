import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../services/api';


export default class Main extends Component {
    state ={
        project: [],
    };  

    componentDidMount() {
        this.loadProjects();
    }

    loadProjects = async () => {
        const response = await api.get("/5f497973993a2e110d38996e");

        const { project } = response.data;

        this.setState({ 
            project
        });
    };

    renderItem = ({ item }) => (
        <View style={styles.projectContainer}>
            <Text style={styles.projectTitle}>{item.name}</Text>
            <Text style={styles.projectDescription}>{item.descprition}</Text>

            <TouchableOpacity style={styles.projectButton} onPress={() => {
                this.props.navigation.navigate("Project", { project: item });
            }}>
                <Text style={styles.projectButtonText}>Tarefas</Text>
            </TouchableOpacity>
        </View>
    );

    render() {
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },

    list: {
        padding: 20
    },

    projectContainer: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },

    projectTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },

    projectDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },

    projectButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#6f00ff",
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    projectButtonText: {
        fontSize: 16,
        color: "#212724",
        fontWeight: "bold"
    }
});