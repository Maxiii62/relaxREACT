import React from 'react';
import CarouselBNB from 'react-native-carousel-control';

import { Text, TextInput,View,StyleSheet,Alert,Image } from 'react-native';

// Création d'un caroussel avec les urls des images passés en paramétres depuis l'API AirBNB
export default class Carousel extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     images : []
   }
   // pour chaque url on l'ajoute dans un tableau qui sera affiché comme iamge dans le render()
   this.props.endroit.listing.picture_urls.map(src => this.state.images.push({'src' : src}));
  }

  render() {
    return (
      <CarouselBNB>
        {this.props.endroit.listing.picture_urls.map((src) =>
            <Image source={{uri: src}} style={{width:600, height: 405}} />
        )}
      </CarouselBNB>
    )
  }
}
