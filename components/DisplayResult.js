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
  Image,
  Button,
  Alert,
  TextInput,
  ScrollView
} from 'react-native';

import ShowLieu from './ShowLieu';

// cette classe représente la vue qui offre tous les résultats de la recherche
class DisplayResult extends Component {

  constructor(props) {
      super(props);
      this.state = {};
      //bind le bouton pour offrir un reotur au form de recherche
      this.retourRecherche = this.retourRecherche.bind(this);
  }
  // retour au formulaire de recherche
  retourRecherche(endroit){
      this.props.navigator.push({'id' : 'FormSearch'});
  }

  render() {
    return (

      <View style={styles.container}>

            <View style={styles.newSearch}>
                <Text style={styles.titleText}> Nombre de lieu(x) trouvé(s) : {this.props.lieux.length}  </Text>
                <Button title="Démarrer une nouvelle recherche !"  onPress={this.retourRecherche} />
            </View>

            <ScrollView style={styles.container}>
                      {this.props.lieux.map((endroit) =>
                          <View>
                                <ShowLieu key={endroit.listing.id} navigator={this.props.navigator} listing={endroit.listing} pricing_quote={endroit.pricing_quote} />
                          </View>
                      )}
            </ScrollView>
      </View>
  )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleText: {
   fontSize: 20,
   fontWeight: 'bold'
 },
 newSearch : {
   marginBottom : 20,
   flexDirection : 'row'
 }
});

module.exports = DisplayResult;
