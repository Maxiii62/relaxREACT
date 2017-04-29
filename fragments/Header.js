'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


export default class Header extends Component {

  constructor(props) {
      super(props);
      this.state = {
        titleView: 'Application de recherche vacances en React Native',
        author : 'Maxime ROUSSEL'
      };
  };

  render() {
     return (
             <View style={styles.head}>
               <Image source={require('./epsi.png')} style={{width: 200, height: 125}} />
               <Text style={styles.titleView}>
                 {this.state.titleView}{'\n'}{'\n'}
                     Par {this.state.author}
               </Text>
             </View>
     )
 }
}

var styles = StyleSheet.create({
    head: {
        flex: .15,
        backgroundColor: 'white',
        flexDirection : 'row'
    },
    titleView : {
      fontSize: 20,
      fontWeight: 'bold',
      width : 310,
      textAlign : 'right'
    }
});
