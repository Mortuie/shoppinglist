import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import styled from 'styled-components/native';
import { AsyncStorage } from 'react-native';



export default class App extends React.Component {

  state = {
    currentItem: '',
    itemList: [],
    items: []
  };

  addItem = async () => { 
    console.log("Trying to add (local): ", this.state.currentItem);


    if (this.state.currentItem) {
      let changeableList = this.state.itemList;

      changeableList.push(this.state.currentItem);

      this.setState({itemList: changeableList, currentItem: '' });
  
    }
  }

  addItemStorage = async () => {
    console.log("Trying to add (phone): ", this.state.currentItem);

    try {
      
      const res = await this.getItems()
      
      console.log("RESULTS!!", res);

      if (this.state.currentItem) { // non falsy item...
        const newList = res.push(this.state.currentItem);

        await AsyncStorage.setItem('list', JSON.stringify(newList));

        console.log("NEW LIST: ", newList);

      } else {
        console.log("You're trying to add an empty/falsy item...");
      }
    } catch (err) {
      console.log(err);
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
        return JSON.parse(res);
      }
    } catch (err) {
      console.log("Error 2: ", err);
    } 
  
  }

  changeItem = item => {
    console.log(item.nativeEvent.text);
    this.setState({ currentItem: item.nativeEvent.text });
  }

  componentDidMount = async () => {
    //await this.removeItemValue('list');
    const items = await this.getItems();
    this.setState({ items })
  }
  
  async removeItemValue(key) {
    try {
            await AsyncStorage.removeItem(key);
            return true;
    }
    catch(exception) {
            return false;
    }
  }

  render() { 
    console.log("ITEMS: ", this.state.items);
    return (
      <Container>
        {this.state.itemList.map((i, ind) => <Text key={ind}>{i}</Text>)}
        <TextInput value={this.state.currentItem} placeholder="Another Item" onChange={this.changeItem} />
        <Button title="XDDDD" onPress={this.addItemStorage}/>
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

