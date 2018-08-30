import React from 'react';
import {Item} from './Item';

function remove(itemsParam, idParam) {
  
    itemsParam = itemsParam.filter(el => el.id !== idParam);
  
    return itemsParam;
}

function checkChanged(items, item) {

    const result = items.concat(item);

    
}

function changeItemInArray(itemsPar, itemParam) {

    const result = itemsPar.map( (item) => item.id === itemParam.id ? itemParam : item);
    console.log('Changed items', result);
    return result.sort((item1, item2) => item1.isChecked && !item2.isChecked ? 1 :
                !item1.isChecked && item2.isChecked ? -1 : 0);
}

function ItemList ({items, onItemsChanged, isReadOnly}) {

    

    return (
        <div className="item-list">
            {
                items.map( (arrayItem) => 
                <Item   key={arrayItem.id}
                        item={arrayItem}
                        onDelete={ (id) => onItemsChanged(remove(items, id), {operation: 'delete', id: id}) }
                        onItemChanged={ (item) => onItemsChanged(changeItemInArray(items, item), {operation: 'changed', id: item.id}) }
                        isReadOnly={isReadOnly}>  
                </Item>  )
            }

            {
                isReadOnly ? '' : 
            
                <button onClick={() => {
                            const newId = Math.random();
                            onItemsChanged(items.concat({id: newId, text: "", isChecked: false}), {operation: 'add', id: newId})
                        }}>
                        +
                </button>
            }

            
        </div>


    );
}

export default ItemList;