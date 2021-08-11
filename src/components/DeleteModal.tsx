import React from 'react';
import ReactDOM from 'react-dom';


interface IProps {
    id: number
    deleteItem(id: number): Function
    showModal(modal: number): any
}


const DeleteModal = (props: IProps) => {

    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active modalWindow" onClick={() => props.showModal(0)}>
            <div onClick={(e) => e.stopPropagation()} className="ui basic active modal">
                <div className="ui icon header">
                    <i className="ban icon"></i>
                    Delete Item?
                </div>
                <div className="content">
                    <p>Do you really want to delete item?</p>
                </div>
                <div className="actions">
                    <div onClick={() => props.showModal(0)}  className="ui red basic cancel inverted button">
                        <i className="remove icon"/>
                        Cancel
                    </div>
                    <div className="ui green ok inverted button" onClick={() => {props.deleteItem(props.id);}}>
                        <i className="checkmark icon"/>
                        Delete
                    </div>
                </div>
            </div>
        </div>
    , document.querySelector("#modal") as HTMLElement)
};

export default DeleteModal;