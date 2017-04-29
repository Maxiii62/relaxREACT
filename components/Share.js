'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Share,
  Button
} = ReactNative;

export default class ShareMessageExample extends React.Component {

  constructor(props) {
    super(props);
    // récupération du lieu à partager
    this.endroit = this.props.endroit;

    // binding des fonctions
    this._shareMessage = this._shareMessage.bind(this);
    this._shareText = this._shareText.bind(this);
    this._showResult = this._showResult.bind(this);

    this.state = {
      result: ''
    };
  }

  render() {
    return (
      <View>
          <Button title="Partagez cette offre" onPress={this._shareText} />
      </View>
    );
  }

  _shareMessage() {
    Share.share({
      message: 'Votre réservation ' + this.props.endroit.listing.name + ' à ' + this.props.endroit.listing.localized_city
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }
  // fonction qui Share avec un text prédéfini
  _shareText() {
    Share.share({
      message: 'Regardez cette sublime réservation ' + this.props.endroit.listing.name + ' à ' + this.props.endroit.listing.localized_city +
      ' pour ' + this.props.endroit.pricing_quote.guests + ' voyageur(s) du ' + this.props.endroit.pricing_quote.check_in + ' au ' + this.props.endroit.pricing_quote.check_out +
      ' une photo est disponible à l\'adresse suivante : ' + this.props.endroit.listing.picture_url,
      url: this.props.endroit.listing.picture_url,
      title: 'RESERVATION AIR BNB ' + this.props.endroit.listing.name + ' à ' + this.props.endroit.listing.localized_city ,
    }, {
      dialogTitle: 'Allez-y partagez cette sublime occasion pour vos proches :)',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

  _showResult(result) {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({result: 'shared with an activityType: ' + result.activityType});
      } else {
        this.setState({result: 'shared'});
      }
    } else if (result.action === Share.dismissedAction) {
      this.setState({result: 'dismissed'});
    }
  }

}

var styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
});
