import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class DatePickerVoyage extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // initialisation des dates pickers
    this.state = {
      // chosenDate et today sont les dates du jour
      chosenDate : this.getFormattedDate(new Date()),
      today : this.getFormattedDate(new Date()),
      // on ne peut pas réserver à plus d'un an à l'avance
      nextyear : this.getFormattedDate(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))
    };
  }

  handleChange(date) {
    // quand la date est changée on la met dans le state
    this.setState({chosenDate: date});
    this.props.onDateChange(date);
 }
// fonction permettant de bien formater une date en yyyy/mm/dd avec le mois sur 2 caractéres
  getFormattedDate(date){

    var month = date.getUTCMonth() + 1;

    if (month < 10){

      var month = month.toString();
      // force à avoir un numéro de mois à 2 caractéres ex : 02
      while (month.length < 2){
          month = '0' + month;
      }
    }

    return  date.getFullYear() + '-' + month + '-' + date.getDate();
  }

  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.chosenDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={this.state.today}
        maxDate={this.state.nextyear}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={this.handleChange}
      />
    )
  }
}
