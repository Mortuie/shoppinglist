import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import styled from 'styled-components/native';
import { AsyncStorage } from 'react-native';



export default class App extends React.Component {

  state = {
    currentItem: '',
    itemList: [],
  };

  addItem = async () => { 
    console.log("Trying to add: ", this.state.currentItem);


    if (this.state.currentItem) {
      let changeableList = this.state.itemList;

      changeableList.push(this.state.currentItem);

      this.setState({itemList: changeableList, currentItem: '' });
  
    }
  }


  getItem = async (item) => { 
    try {
      const res = await AsyncStorage.getItem('list');

      console.log("response: ", res);


    } catch (err) {
      console.log("Error: ", err);
    } 
  
  }

  changeItem = item => {
    console.log(item.nativeEvent.text);
    this.setState({ currentItem: item.nativeEvent.text });
  }

  
  render() {

    console.log(this.state);
    return (
      <Container>
      {this.state.itemList.map(i => <Text>{i}</Text>)}
        <TextInput value={this.state.currentItem} placeholder="Another Item" onChange={this.changeItem} />
        <Button title="XDDDD" onPress={this.addItem}/>
      </Container> 
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

