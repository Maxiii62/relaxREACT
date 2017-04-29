/**
 * Composent auto complete places
 * used : react-native-google-places-autocomplete
 * @flow
 */

 import React, { Component } from 'react';
 import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
 import CacheStore from 'react-native-cache-store';

 export default class AutoCompleteGooglePlaces extends Component {
   constructor(props) {
     super(props);
     this.state = { text: '' };
     this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data,details) {
    // 'details' est récupéré quand fetchDetails = true
    //    data retourne les infos que tu as saisis
    //    details retourne des infos sur la ville comme sa région, photo de la ville , long & lat etc..
    //
    CacheStore.set("formattedAddress", details.formatted_address);
    this.setState({text: details.vicinity});
    this.props.onChange(details.vicinity);
 }

   render() {
     return (
        <GooglePlacesAutocomplete
              placeholder='Veuillez indiquer une ville où vous souhaitez partir'
              minLength={2} // il faut au minimum saisir 2 caractéres pour commencer une recherche
              autoFocus={false}
              listViewDisplayed='auto'    // true/false/undefined -> s'affiche directement aprés saisie -> propre au plugin
              fetchDetails={true}
              renderDescription={(row) => row.description} // on affiche la description des lieux trouvés pour chaque villes trouvées
              onPress={this.handleChange}

              getDefaultValue={(value) => {
                return ''; // text input default value
              }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyBgaxtdS0y_Mwk-ennUmyB9mHlpQbBGHLg',
                language: 'fr', // language of the results
                types: '(cities)' // default: 'geocode'
              }}
              styles={{
                description: {
                  fontWeight: 'bold'
                }
              }}
            />
     );
   }
 }
