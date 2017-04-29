/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, TextInput,View,StyleSheet,Alert,Image,Button } from 'react-native';

import CarouselBNB from './Carousel';
import CacheStore from 'react-native-cache-store';
import AndroidCalendarEvents from 'react-native-calendarevents-android';

import ShareMessageExample from './Share';

// ce fichier affiche la fiche compléte d'un lieu permettant de partager le lieu ou de l'ajouter à son calendrier
export default class DetailLieu extends React.Component {

  constructor(props) {
   super(props);
   // a l'affichage on propose à l'utilisateur de lui indiquer si le lieu est actuellement disponible
   this.disponible = this.props.endroit.pricing_quote.available ? 'oui' : 'non';
   // bind le bouton à une fonction retour pour réafficher les résultats de la précédente recherche
   this.retour = this.retour.bind(this);
   // bind ajouter calendrier
   this.ajouterCalendrier = this.ajouterCalendrier.bind(this);
   // récupére le nom de la ville ainsi que son pays dans le cache pour que le lieu soit bien formatté pour le lieu de l'évenement dans le calendrier
   this.nomVillePays = CacheStore.get('formattedAddress').then((formattedAddress) => {
                         return formattedAddress;
                       });
  // bind fonction share
    this.share = this.share.bind(this);
  }

  share(){
    debugger;
  }
// fonction permettant de récupérér les infos du lieu (nom,ville) pour l'ajouter dans le calendrier
  ajouterCalendrier(){
      AndroidCalendarEvents.addEvent(
        {
            title: 'RESERVATION AIR BNB ' + this.props.endroit.listing.name + ' à ' + this.props.endroit.listing.localized_city ,
            startDate: new Date(this.props.endroit.pricing_quote.check_in).getTime(),
            endDate: new Date(this.props.endroit.pricing_quote.check_out).getTime(),
            description: 'On a ajouté un rdv avec l\' application développée en React Native ;)',
            location: this.nomVillePays._65
        },
        (success) => Alert.alert("Votre voyage s'est ajouté au calendrier"),
        (error) => console.log(error)
      );
    }
// retour à la vue précédente resultSearch qui affiche les résultats découlants de la recherche initiale
  retour(){
        CacheStore.get('resultSearch').then((value) => {
          this.props.navigator.push({
                id : 'DisplayResult',
                lieux : JSON.parse(value)
          });
        });
  }

  render() {
    return (
      <View style={styles.container}>

            <Text style={styles.titleView}>
              {this.props.endroit.listing.name.toUpperCase()}
            </Text>


            <Text>
                   DISPONIBLE ? {this.disponible.toUpperCase()}
                 </Text>

                 <Text>
                   Votre voyage du {this.props.endroit.pricing_quote.check_in} au {this.props.endroit.pricing_quote.check_out} pour {this.props.endroit.pricing_quote.guests} voyageur(s)
                 </Text>

                 <Text>
                   Prix : {this.props.endroit.pricing_quote.rate.amount} {this.props.endroit.pricing_quote.rate.currency}
                 </Text>

                 <Button title="Retour" onPress={this.retour} />


            <CarouselBNB style={styles.carousel} endroit={this.props.endroit}/>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width : 400}}>
                <Button title="Ajouter à mon agenda"  style={styles.gauche} onPress={this.ajouterCalendrier} />
                <ShareMessageExample style={styles.droite} endroit={this.props.endroit}/>
            </View>

      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  titleView : {
    fontSize: 30,
    fontWeight: 'bold',
    flexDirection : 'row',
    flex: .15,
    textAlign :'center'
  },
  action : {
    marginTop : 400,
    justifyContent: 'center',
    justifyContent: 'space-between'
  },
  btnActions : {
    flexDirection : 'row',
    marginBottom : 30
  },
  carousel : {
    marginBottom : 500
  }
});
