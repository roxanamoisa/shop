import React from 'react';
import {Item} from './Item';
import ItemList from './ItemList';
import './bootstrap.min.css';
import DeleteModal from './DeleteModal';

function ShoppingList ({id, name, color, items, onDelete, onEdit, onItemsChanged}) {

    return (
        <div className="shopping-list" style={{backgroundColor: color}}>
            <div className="shopping-list-name">{name}</div>

            <ItemList items={items} onItemsChanged={onItemsChanged} isReadOnly={false}>
            </ItemList>

            <div>
                <button type="button" className="btn btn-sm btn-danger" data-toggle="modal" data-target="#exampleModal">
                    Delete
                </button>

                <DeleteModal modalId="exampleModal" onOK={() => onDelete(id)}></DeleteModal>
                
                <a className={'btn btn-sm btn-success'}>Edit</a>

            </div>
        </div>
    );

}

export default ShoppingList;