/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, TextInput,View,StyleSheet,Alert,Image } from 'react-native';

var TouchableWithoutFeedback = require('TouchableWithoutFeedback');

export default class ShowLieu extends React.Component {

  constructor(props) {
   super(props);

   // récupération d'un endroit à afficher, ShowLieu est appelé à chaque résultat trouvés dans la recherche à voir dans DisplayResult le map
   // on récupéres les différentes proprités propres au lieu
   this.listing = this.props.listing;
   this.pricing_quote = this.props.pricing_quote;
   // binding de la fonction qui permet d'afficher les détails d'un lieu et de pouvoir l'ajouter ua calendrier ou partager
   this.goToDetails = this.goToDetails.bind(this);
 }

 // changement de vue vers DetailLieu en passant un paramétre endroit
  goToDetails(){
    var endroit = {
      listing : this.props.listing,
      pricing_quote : this.props.pricing_quote
    }
     this.props.navigator.push({"id" : "DetailLieu", 'endroit' : endroit });
  }

  render() {
    return (

      <TouchableWithoutFeedback onPress={this.goToDetails}>
          <View style={styles.head} >
                  <Image source={{uri: this.listing.picture_url}} style={{width: 200, height: 125}} />
                  <Text style={styles.titleView}>
                    {this.listing.name.toUpperCase()}
                  </Text>

                  <View >
                    <Text>
                      Prix : {this.pricing_quote.rate.amount} {this.pricing_quote.rate.currency}
                    </Text>
                  </View>
            </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  head: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection : 'row',
      marginBottom  : 10
  },
  titleView : {
    fontSize: 13,
    fontWeight: 'bold',
    flexDirection : 'row',
    width : 400,
    flex: .15,
    textAlign :'center'
  }
});
