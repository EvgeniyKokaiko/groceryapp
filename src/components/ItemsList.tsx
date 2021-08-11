import React, {ChangeEvent, useEffect, useState} from 'react';
import {Item} from "../Interfaces";
import {connect} from "react-redux";
import {DeleteItem, FetchData} from "../redux/actions/actions";
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';

interface IProps {
    FetchData(): Function
    DataReducer: Item[]
    DeleteItem(id: number): Function
}

const ItemsList = (props: IProps): JSX.Element => {
    const [apiData, setData]: [Item[], Function] = useState([])
    const [filter, setFilter]: [Item[], Function] = useState([]);
    const [searched, setSearched]: [string, Function] = useState("");
    const [modal, showModal] = useState(0);
    const [id, setId] = useState(0)


    useEffect(() => {
        if (props.DataReducer.length !== 0) {
            return
        }
    props.FetchData();
    }, [modal, props])


    useEffect(() => {
        setFilter([]);
        if (apiData) {
            const Filter: Item[] = apiData.filter((el) => {
                return (
                    el.name.toLowerCase().includes(String(searched.toLowerCase())) ||
                    String(el.quantity).toLowerCase().includes(String(searched.toLowerCase()))
                );
            });
            setFilter(Filter);
        }
    }, [searched, apiData]);

    const renderCondition = () => {
        if (searched === "" || searched === " ") {
            return apiData;
        } else {
            return filter;
        }
    };

    function onItemDelete(ItemId: number) {
      showModal(1)
        setId(ItemId);
    }

    useEffect(() => {
        setData(props.DataReducer)
    }, [props.DataReducer])

    const RenderList = () => {
        return renderCondition().map(el => {
            return <React.Fragment>
                <div className="ui card">
                    <div className="image">
                        <img src={el?.photo} alt="card_image" />
                    </div>
                    <div className="content">
                        <span className="header">{el?.name}</span>
                        <div className="meta">
                            <span className="date">Quantity: {el?.quantity}</span>
                        </div>
                        <div className="description">{el?.description}</div>
                    </div>
                    <div className="extra content">
                        <Link to={{
                            pathname: `/items/${el?.id}`,
                            state: el
                        }}
                            style={{ width: "100%" }}
                            className="ui inverted green button">
                            Show Full Info
                        </Link>
                        <br/>
                        <br/>
                        <button style={{ width: "100%" }} onClick={() => onItemDelete(el.id)} className="ui inverted red button">Delete</button>
                    </div>
                </div>
            </React.Fragment>
        })
    }


    return (
        <div> {modal === 0 ?
            <>
            <div className="ui fluid input search_input">
                <input value={searched} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearched(e.target.value)} type="text" placeholder="Search" />
            </div>
        <div className="items_container">
            {RenderList()}
        </div>
            </>

        :
        <DeleteModal id={id} deleteItem={props.DeleteItem} showModal={showModal} />
        }
        </div>
    );
};


const mapStateToProps = (state: any) => {
    return state;
};

export default connect(mapStateToProps,{FetchData,DeleteItem})(ItemsList);