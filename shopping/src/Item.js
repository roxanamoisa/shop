import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

import {
    faCoffee,
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare
  } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

  library.add(
    fab,
    faCoffee,
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare
  )
  

// props will contain an item  with two fields: text and isChecked

function renderText(item, onItemChanged, isReadOnly) {
	if (isReadOnly) {
		//return <span className="item-text">{item.text}</span>
		if(item.isChecked)
			return <span className="item-text"><strike>{item.text}</strike></span>
		else
			return <span className="item-text">{item.text}</span>
	} else {
		return <input type="text" defaultValue={item.text} 
					onBlur={(event) => {onItemChanged({id: item.id, text: event.target.value, isChecked: item.isChecked}) }}/>	}
}

function renderChecked(item, onItemChanged, isReadOnly) {

	if (isReadOnly) {
		if (item.isChecked)
			return <span className="item-check">
                        <FontAwesomeIcon icon={faCheckSquare} size="1x" />
                    </span>
		else
			return <span className="item-check">
                        <FontAwesomeIcon icon={faSquare} size="1x" />
                    </span>
	} else {
		return <input type="checkbox" defaultChecked={item.isChecked}
					onChange={ (event) => onItemChanged({id: item.id, text: item.text, isChecked: event.target.checked})}  />
				
	}
}

export const Item = ({item, onDelete, onItemChanged, isReadOnly}) => {

	return (
		<div>
			<form>
				{renderText(item, onItemChanged, isReadOnly)}
				{renderChecked(item, onItemChanged, isReadOnly)}
				{isReadOnly ? '' : <a className={'btn btn-sm btn-outline-secondary'} onClick={(e) => {onDelete(item.id); }}>X</a>}
			</form>
		</div>	);
};