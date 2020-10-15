import React, {Component} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Image,
  PermissionsAndroid,
} from 'react-native';
import Styles from '../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import {RNCamera} from 'react-native-camera';
import CameraRollPicker from 'react-native-camera-roll-picker';
import ImgToBase64 from 'react-native-image-base64';
import {setField, saveTeam, setAllFieldsTeam, resetForm} from '../actions';

class NewTeam extends Component {
  state = {
    date: new Date(),
    showDatePicker: false,
    title: '',
    isLoading: false,
    isCamera: false,
    isCameraRoll: false,
  };

  componentDidMount() {
    const {navigation, setAllFieldsTeam, resetForm} = this.props;
    const {params} = navigation.state;
    if (params.teamToEdit && params) {
      setAllFieldsTeam(params.teamToEdit);
      this.setState({title: 'Editar'});
    } else {
      this.setState({title: 'Criar Novo'});
      resetForm();
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
      };
      const data = await this.camera.takePictureAsync(options);

      if (data) {
        this.props.setField('pic', data.base64);
        this.setState({
          isCamera: false,
        });
      }
    }
  };

  viewGallery() {
    this.requestExternalStorageAccess();

    return (
      <CameraRollPicker
        maximum={1}
        callback={(item) => {
          if (item.length > 0) {
            ImgToBase64.getBase64String(item[0].uri)
              .then((convertedString) => {
                this.props.setField('pic', convertedString);
              })
              .catch((err) => {
                console.log(err);
              });
          }

          this.setState({
            isCameraRoll: false,
          });
        }}
      />
    );
  }

  async requestExternalStorageAccess() {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permissão negada!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  viewCamera() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'Precisamos de sua permissão para usar a câmera.',
            buttonPositive: 'Aceito',
            buttonNegative: 'Cancelar',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to record audio',
            message: 'Precisamos de sua permissão para gravar áudio.',
            buttonPositive: 'Aceito',
            buttonNegative: 'Cancelar',
          }}
        />
        <View>
          <TouchableOpacity
            style={styles.capture}
            onPress={this.takePicture.bind(this)}>
            <Icon name="camera" size={45} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  viewForm() {
    const {teamForm, setField, saveTeam, navigation} = this.props;

    return (
      <View style={Styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={Styles.titleContainer}>
            <Text style={Styles.projectTitle}>
              {this.state.title} Integrante
            </Text>
          </View>
          <View style={Styles.reqContainer}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {teamForm.pic ? (
                <Image
                  style={Styles.pic}
                  source={{uri: `data:image/jpeg;base64,${teamForm.pic}`}}
                />
              ) : null}
              <TouchableWithoutFeedback
                onPress={() => {
                  Alert.alert(
                    'Captura de imagem',
                    'Escolha a fonte de sua imagem:',
                    [
                      {
                        text: 'Camera',
                        onPress: () => {
                          this.setState({isCamera: true});
                        },
                      },
                      {
                        text: 'Galeria',
                        onPress: () => {
                          this.setState({isCameraRoll: true});
                        },
                      },
                    ],
                    {cancelable: true},
                  );
                }}>
                <Icon
                  style={{paddingTop: 15}}
                  name="camera"
                  size={25}
                  color="gray"
                />
              </TouchableWithoutFeedback>
            </View>
            <Text style={Styles.fontBold}>Nome</Text>

            <TextInput
              value={teamForm.name}
              onChangeText={(value) => setField('name', value)}
              style={styles.input}
              autoFocus={true}
              placeholder="Dê um nome"></TextInput>

            <Text style={Styles.fontBold}>Email</Text>
            <TextInput
              value={teamForm.email}
              onChangeText={(value) => setField('email', value)}
              style={styles.input}
              multiline
              placeholder="Informe um email válido"></TextInput>

            <Text style={Styles.fontBold}>Função</Text>
            <TextInput
              value={teamForm.role}
              onChangeText={(value) => setField('role', value)}
              style={styles.input}
              multiline
              placeholder="Informe a função"></TextInput>

            {/* Componente de foto ficará aqui */}

            {this.state.isLoading ? (
              <ActivityIndicator color="#6f00ff" />
            ) : (
              <Button
                title="Salvar"
                onPress={async () => {
                  this.setState({isLoading: true});

                  try {
                    await saveTeam(teamForm);
                    navigation.goBack();
                  } catch (error) {
                    Alert.alert('Erro!', error.message);
                  } finally {
                    this.setState({isLoading: false});
                  }
                }}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    if (this.state.isCameraRoll) {
      return this.viewGallery();
    }

    if (this.state.isCamera) {
      return this.viewCamera();
    }
    return this.viewForm();
  }
}

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#DDD',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  date: {
    marginTop: 10,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
    margin: 20,
  },
});
const mapStateToProps = (state) => {
  return {
    teamForm: state.teamForm,
  };
};

const mapDispatchToProps = {
  setField,
  saveTeam,
  setAllFieldsTeam,
  resetForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTeam);
