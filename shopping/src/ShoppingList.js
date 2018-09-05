import React from 'react';
import {Item} from './Item';
import ItemList from './ItemList';
import './bootstrap.min.css';
import DeleteModal from './DeleteModal';
import NewModal from './NewModal';
import EditModal from './EditModal';

function ShoppingList ({id, name, color, items, onDelete, onEdit, onItemsChanged, onPropChange}) {

    return (
        <div className="shopping-list" style={{backgroundColor: color}}>
            <div className="shopping-list-name">{name}</div>

            <ItemList items={items} onItemsChanged={onItemsChanged} isReadOnly={true}>
            </ItemList>

            <div>
                <NewModal onModalDelete={ () => {onDelete(id)}  }></NewModal>
                
                <EditModal 
                    shoppingList=
                        { 
                            {
                            "id": id,
                            "name": name,
                            "color": color
                            }
                        }
                    onChangeSL={ (newSL) => {onPropChange(newSL)}  }

                    items={items}

                    onItemsChanged={onItemsChanged}

                    
                >
                </EditModal>

            </div>

            
        </div>
    );

}

export default ShoppingList;