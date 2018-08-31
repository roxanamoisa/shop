import React from 'react';
import {Item} from './Item';
import ItemList from './ItemList';
import './bootstrap.min.css';
import DeleteModal from './DeleteModal';
import NewModal from './NewModal';

function ShoppingList ({id, name, color, items, onDelete, onEdit, onItemsChanged}) {

    return (
        <div className="shopping-list" style={{backgroundColor: color}}>
            <div className="shopping-list-name">{name}</div>

            <ItemList items={items} onItemsChanged={onItemsChanged} isReadOnly={false}>
            </ItemList>

            <div>
                <NewModal onModalDelete={ () => {onDelete(id)}  }></NewModal>
                
                <a className={'btn btn-sm btn-success'}>Edit</a>

            </div>
        </div>
    );

}

export default ShoppingList;