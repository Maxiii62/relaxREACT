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
  TextInput
} from 'react-native';

// importation des différents Components qui se trouvent dans le même dossier
import AutoCompleteGooglePlaces from './AutoCompleteGooglePlaces';
import DatePickerVoyage from './DatePickerVoyage';
import Header from '../fragments/Header';
import CacheStore from 'react-native-cache-store';

class FormSearch extends Component {

  constructor(props) {
      super(props);

      this.state = {};
      // bind des bouttons avec leurs fonctions
      this.setRecherche = this.setRecherche.bind(this);
      this.setNombreVoyageurs = this.setNombreVoyageurs.bind(this);
      this.setStartDate = this.setStartDate.bind(this);
      this.setEndDate = this.setEndDate.bind(this);
      this.searchMethod = this.searchMethod.bind(this);

      // initialisaiton des différentes propriétés du formulaires pour éviter que si l'utilisateur ne change pas les valeurs que les valeurs soient définies
      this.typedVille  = '';
      this.nbVoyageurs = 1;
      this.startDate = this.getFormattedDate(new Date());
      this.endDate = this.getFormattedDate(new Date());
  };

// fonction permettant de bien formater une date en yyyy/mm/dd avec le mois sur 2 caractéres
  getFormattedDate(date){

    var month = date.getUTCMonth() + 1;

    if (month < 10){

      var month = month.toString();

      while (month.length < 2){
          month = '0' + month;
      }
    }

    return  date.getFullYear() + '-' + month + '-' + date.getDate();
  }

  // setter qui change la propriété typedVille
   setRecherche(ville){
     this.typedVille = ville;
   }
// setter qui change la propriété nbVoyageurs
   setNombreVoyageurs(nombre){
     this.nbVoyageurs = nombre;
   }
// setter qui change la propriété startDate
   setStartDate(date){
     this.startDate = date;
   }
// setter qui change la propriété endDate
   setEndDate(date){
     this.endDate = date;
   }

  searchMethod(){

    // si l'utilisateur n' pas saisi de ville on ne lance pas de recherche avec le return
    if (!this.typedVille){
      Alert.alert("Vous n'avez pas saisi de destination");
      return;
    }

    // demande dans le cahier des charges si la date de début supérieur à la date de fin alors on ne lance pas de recherche (impossible)
    if (new Date(this.startDate) > new Date(this.endDate)){
      Alert.alert("La date de départ est supérieure à celle de retour !");
      return;
    }
    // on utilise encodeURI pour les villes diposant de (- ou ' ' ex : Le Touquet)
    var url = "https://www.airbnb.fr/search/search_results/?location=" + encodeURI(this.typedVille) + "&guests="+ this.nbVoyageurs + "&checkin=" + this.startDate + "&checkout=" + this.endDate;
    // appel à l'API AirBNB
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {

          if (responseJson.results_json.search_results.length > 0){
              // on met en cache les résulats pour permettre quand on est sur la fiche détaillé d'un lieu de retourner sur les résultas de la recherche
              CacheStore.set('resultSearch', JSON.stringify(responseJson.results_json.search_results));
              // changement de vue vers DisplayResult qui affiche les résultats retournés de l'API
              this.props.navigator.push({
                    id : 'DisplayResult',
                    lieux : responseJson.results_json.search_results
              });
          }else{
            // si pas de résulats on indique à l'utilisateur avec une simple alert
            Alert.alert("Votre recherche correpond à aucun résultat.")
          }

        })
        .catch((error) => {
          console.error(error);
        });
  }

  render() {
     return (
         <View style={styles.container}>
              <Header/>

             <View style={styles.body}>

                   <View style={styles.quarter}>
                       <Text style={styles.label}> Ville choisie </Text>
                       <AutoCompleteGooglePlaces onChange={this.setRecherche} style={styles.formcontrol}/>
                   </View>

                   <View style={styles.quarter}>

                      <Text style={styles.label}> Nombre de voyageurs </Text>
                                         <TextInput
                                         keyboardType = 'numeric'
                                         defaultValue="1"
                                              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                              onChangeText={(text) => this.setNombreVoyageurs(text)}
                              value={this.state.text}
                          />

                   </View>

                   <View style={styles.quarter}>
                       <View style={styles.datesAR}>
                            <Text style={styles.label}> Date de départ : </Text>
                               <DatePickerVoyage onDateChange={this.setStartDate} />

                           <Text style={styles.label}> Date de retour :  </Text>
                               <DatePickerVoyage minDate={this.startDate} onDateChange={this.setEndDate}/>
                       </View>
                  </View>

                    <Button title="Rechercher" onPress={this.searchMethod} />

             </View>
             <View style={styles.footer} />


         </View>
     )
 }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    head: {
        flex: .15,
        backgroundColor: 'white',
        flexDirection : 'row'
    },
    body: {
        flex: .65
    },
    footer: {
        flex: .25,
    },
    formcontrol : {
      width : 200,
      flex: 1,
      flexDirection :'row'
    },
    titleView : {
      fontSize: 20,
      fontWeight: 'bold',
      width : 310,
      textAlign : 'right'
    },
    quarter : {
      flex: 0.25
    },
    datesAR : {
      flexDirection : 'row'
    }
});

module.exports = FormSearch;
