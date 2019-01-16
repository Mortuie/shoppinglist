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

  addItemStorage = async item => {
    console.log("Trying to add: ", item);

    try {
      const res = await this.getItems();

      console.log("RESULTS!!", res);


      // continue here... 
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  // get all items from the storage...
  getItems = async () => { 
    try {
      const res = await AsyncStorage.getItem('list');
      console.log("Eyy oh, response: ", res);
      if (!res) { // the storage is empty....
        await AsyncStorage.setItem('list', JSON.stringify([]));
        return [];
      } else { // storage is not empty...
        return res;
      }
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
    this.addItemStorage("xd");
    return (
      <Container>
        {this.state.itemList.map((i, ind) => <Text key={ind}>{i}</Text>)}
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

