import React from 'react';
import { AppRegistry, StyleSheet, FlatList, ActivityIndicator, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 24,
  },
  gray: {
    color: 'gray',
  },
});

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://airbnb-api.now.sh/api/room?city=paris')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.rooms,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:64}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 
          <View>
            <Text style={styles.bigblue}>{item.title}</Text>
            <Text style={styles.gray}>{item.description}</Text>
            <Image source={ { uri: item.photos[0] }} style={{flex: 1, height: 110}}/>
          </View>
          }
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}
