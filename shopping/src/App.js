import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Item} from './Item';
import './bootstrap.min.css';
import ItemList from './ItemList';
import ShoppingList from './ShoppingList';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  state = {
    shoppingLists: [{
      id: 1,
      name: 'XMAS',
      color: 'green',
      items: []
    }]
   };

  componentDidMount() {
    this.getShoppingListsFromServer();    
  }

  /**
   * gets all the shopping lists from the server
   */
  getShoppingListsFromServer() {
    axios.get(`http://localhost:3000/lists`)
    .then((response) => {
      this.setState({
        shoppingLists: response.data
      });
      response.data.forEach(shoppingList => {
        this.getItemsFromServer(shoppingList.id);
      });
    })
  }

  getOneListFromServer(listId) {

    axios.get(`http://localhost:3000/lists/${listId}`)
    .then( (response) => {

      this.setState( (oldState) => {

        return {
          shoppingLists: oldState.shoppingLists
          .map(shoppingList => {
            if (shoppingList.id === listId) {
              return Object.assign({}, shoppingList, response.data);
            }
            else {
              return shoppingList;
            }
          })
        };
      });
    })
  }

   getItemsFromServer(listId) {
    axios.get(`http://localhost:3000/lists/${listId}/items`)
      .then((response) => {
        this.setState((oldState) => {
          return {
            shoppingLists: oldState.shoppingLists
              .map(shoppingList => {
                if (shoppingList.id === listId) {
                  return Object.assign({}, shoppingList, {
                    items: this.sortChecked(response.data)
                  })
                } else {
                  return shoppingList;
                }
              })
          };
        }); 
      });
  }

  deleteItemFromServer(listId, itemId) {
    axios.delete(`http://localhost:3000/items/${itemId}`)
      .then(() => this.getItemsFromServer(listId));
  }

  addItemToServer(listId) {
    axios.post('http://localhost:3000/items/', {
      text: '', 
      isChecked: false, 
      listId: listId
    })
    .then(() => this.getItemsFromServer(listId));
  }

  updateItemOnServer(listId, item) {
    axios.patch(`http://localhost:3000/items/${item.id}`, item)
    .then(() => this.getItemsFromServer(listId));
  }

  sortChecked(items) {
    return items.sort( (item1, item2) => {
      return item1.isChecked - item2.isChecked;
    } );
  }

  removeAllItems(shoppingListId) {

    var foundShoppingList = this.state.shoppingLists
      .find( (shoppingList) => (shoppingListId === shoppingList.id) );

    foundShoppingList.items.forEach( (elem) => this.deleteItemFromServer(shoppingListId, elem.id) );
      
  }

  removeShoppingList(shoppingListId) {

    axios.delete(`http://localhost:3000/lists/${shoppingListId}`)
      .then(this.setState( (oldState) => {
        return {
          shoppingLists: oldState.shoppingLists.filter( (shoppingList) => {
            return (shoppingList.id !== shoppingListId);
          })
        }
      } ));
  }

  changeColorToShoppingList(newSL) {

    axios.patch(`http://localhost:3000/lists/${newSL.id}`, newSL)
    .then(() => this.getOneListFromServer(newSL.id));
  }

  renderPopUp(shoppingListId) {
    return (
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    );
  }

  render() {

    return (
      <div className="App">

        {this.state.shoppingLists.map( (shoppingList) => {
          return <ShoppingList
          key={shoppingList.id}
          id={shoppingList.id}
          name={shoppingList.name}
          color={shoppingList.color}
          items={shoppingList.items || []}
          onDelete={ (shoppingListId) => {
            this.removeAllItems(shoppingListId);
            this.removeShoppingList(shoppingListId);
          }}
          onEdit={ () => {} }
          onItemsChanged={(newItems, hint) => {
            switch (hint.operation) {
              case 'delete':
                this.deleteItemFromServer(shoppingList.id, hint.id);
                break;
              case 'add':
                this.addItemToServer(shoppingList.id);
                break;
              case 'changed':
                this.updateItemOnServer(shoppingList.id, newItems.find( (elem) => hint.id === elem.id));
                break;

            }
          }}
          onColorChange={ (newSL) => 
            {
              this.changeColorToShoppingList(newSL); 
            }
          }
        
        >
        </ShoppingList>

        } )}

        

      </div>
    );
  }
}

export default App;
