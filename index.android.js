/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  Navigator
} from 'react-native';

import FormSearch from './components/FormSearch';
import DisplayResult from './components/DisplayResult';
import DetailLieu from './components/DetailLieu';

export default class relaxREACT extends Component {

  /**
  définition du navigator avec en vue initiale FormSearch et la renderScene qui est une fonction qui sert de controller
  qui ne somme navigatorRenderScene
  */
  render() {
    return (
      <Navigator initialRoute = {{
        id :'FormSearch'
      }}
      renderScene = {
        this.navigatorRenderScene
      } />
    );
  }

  /**
  navigatorRenderScene sert de controller avec des parametres attendues selon les différentes vues
  */

  navigatorRenderScene(route,navigator){
    _navigator = navigator;
    switch (route.id) {
      case 'FormSearch':
              return (<FormSearch navigator={navigator}/>);
      case 'DisplayResult':
              return (<DisplayResult navigator={navigator} title="DisplayResult" lieux={route.lieux} />);
      case 'DetailLieu':
              return (<DetailLieu navigator={navigator} title="DetailLieu" endroit={route.endroit} />);
    }
  }
}

// point d'entrée de l'application
AppRegistry.registerComponent('relaxREACT', () => relaxREACT);
