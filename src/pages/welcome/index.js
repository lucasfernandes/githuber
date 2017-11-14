import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import api from 'services/api';

import {
  AsyncStorage,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator } from 'react-native';

import styles from './styles';

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  }

  static navigationOptions = {
    header: null,
  };

  state = {
    username: '',
    error: false,
    loading: false,
  }

  checkAndSaveUser = async () => {
    const response = await api.get(`/users/${this.state.username}`);

    if (!response.ok) throw Error();

    await AsyncStorage.setItem('@Githuber:username', this.state.username);
  }

  navigateToUser = () => {
    if (this.state.username.length === 0) return;

    this.setState({ loading: true });
    this.checkAndSaveUser()
      .then(() => {
        const { dispatch } = this.props.navigation;
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'User' }),
          ],
        });
        dispatch(resetAction);
      })
      .catch(() => { this.setState({ error: true, loading: false }); });
  }

  render() {
    // console.tron.log(this.state.username);

    return (
      <View style={styles.container}>
        <Text style={styles.welcomeTitle}>Bem Vindo</Text>
        <Text style={styles.welcomeDescription}>
          Para continuar precisamos que informe seu usuário no Github
        </Text>

        { this.state.error && <Text style={styles.error}>Usuário não encontrado</Text> }

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          placeholder="Digite seu usuário"
          onChangeText={username => this.setState({ username })}
        />

        <TouchableOpacity style={styles.button} onPress={this.navigateToUser}>
          {
            this.state.loading
            ? <ActivityIndicator size="small" color="#FFF" />
            : <Text style={styles.buttonText}>Prosseguir</Text>
          }
        </TouchableOpacity>
      </View>
    );
  }
}
