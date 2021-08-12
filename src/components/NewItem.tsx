import React, { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, match } from "react-router-dom";
import { AddNewItem, ChangeItem } from "../redux/actions/actions";
import { Item, MatchProps } from "../Interfaces";
import { Location } from "history";

interface IProps {
  AddNewItem(
    photo: string,
    name: string,
    description: string,
    quantity: number,
    color: string,
    weight: string,
    width: number,
    height: number,
    depth: number,
    id: number
  ): Function;
  ChangeItem(
    photo: string,
    name: string,
    description: string,
    quantity: number,
    color: string,
    weight: string,
    width: number,
    height: number,
    depth: number,
    id: string
  ): Function;
  DataReducer: Item[];
  match: match<MatchProps>;
  location: Location<Item>;
}

const New = (props: IProps): JSX.Element => {
  const { id } = props.match.params;
  const state = props.location.state;
  const [name, setName]: [string, Function] = useState("");
  const [photo, setPhoto]: [string, Function] = useState("");
  const [description, setDescription]: [string, Function] = useState("");
  const [quantity, setQuantity]: [number, Function] = useState(0);
  const [color, setColor]: [string, Function] = useState("");
  const [weight, setWeight]: [string, Function] = useState("");
  const [isAdded, setAdded]: [number, Function] = useState(0);
  const [isGood, setGood]: [number, Function] = useState(1);
  const [width, setWidth]: [number, Function] = useState(0);
  const [height, setHeight]: [number, Function] = useState(0);
  const [depth, setDepth]: [number, Function] = useState(0);

  const AddPostHandler = () => {
    if (
      name === "" ||
      photo === "" ||
      description === "" ||
      quantity < 0 ||
      color === "" ||
      weight === ""
    ) {
      setGood(0);
      setAdded(0);
    } else if (isGood === 1 && isAdded === 0) {
      props.AddNewItem(
        photo,
        name,
        description,
        quantity,
        color,
        weight,
        width,
        height,
        depth,
        props.DataReducer.length
      );
      setAdded(1);
    } else {
      setGood(1);
    }
  };
  useEffect(() => {
    if (state !== undefined) {
      setName(state.name);
      setPhoto(state.photo);
      setDescription(state.description);
      setQuantity(state.quantity);
      setColor(state.color);
      setWeight(state.weight);
      setWidth(state.size.width);
      setHeight(state.size.height);
      setDepth(state.size.depth);
    }
  }, [state]);

  const ChangePostHandler = () => {
    if (
      name === "" ||
      photo === "" ||
      description === "" ||
      quantity < 0 ||
      color === "" ||
      weight === ""
    ) {
      setGood(0);
      setAdded(0);
    } else if (isGood === 1 && isAdded === 0) {
      props.ChangeItem(
        photo,
        name,
        description,
        quantity,
        color,
        weight,
        width,
        height,
        depth,
        id
      );
      setAdded(1);
    } else {
      setGood(1);
    }
  };

  return (
    <div className="ui dimmer modals visible active modalWindow">
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active modal_body"
      >
        <>
          <div className="header">
            {state === undefined ? "Add New Item" : "Change Item"}
          </div>
          <div className="content">
            <form className="ui form">
              <div className="field">
                <label>Enter Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </div>
              <div className="field">
                <label>Enter Photo URL:</label>
                <input
                  type="text"
                  value={photo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPhoto(e.target.value)
                  }
                />
              </div>
              <br />
              <div className="field">
                <label>Enter Description:</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDescription(e.target.value)
                  }
                />
              </div>
              <div className="field">
                <label>Enter Quantity:</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setQuantity(e.target.value)
                  }
                />
              </div>
              <div className="field">
                <label>Enter Color:</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setColor(e.target.value)
                  }
                />
              </div>
              <div className="field">
                <label>Enter Weight:</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setWeight(e.target.value)
                  }
                />
              </div>
              <div className="field">
                <label>(Not required)Enter Width:</label>
                <input
                  type="text"
                  value={width}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setWidth(e.target.value)
                  }
                />
              </div>
              <div className="field">
                <label>(Not required)Enter Height:</label>
                <input
                  type="text"
                  value={height}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setHeight(e.target.value)
                  }
                />
              </div>
              <div className="field">
                <label>(Not required)Enter Depth:</label>
                <input
                  type="text"
                  value={depth}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDepth(e.target.value)
                  }
                />
              </div>
            </form>
            {isGood === 0 && isAdded === 0 ? (
              <div className="ui negative message">
                <div className="header">Sorry! Something went wrong :(</div>
                <p>Fix it or refresh page</p>
              </div>
            ) : isGood === 1 && isAdded === 1 ? (
              <div className="ui success message">
                <div className="header">
                  {state === undefined
                    ? "Your post was successfully added!"
                    : "Your post was successfully changed!"}
                </div>
                <p>Now you can return to Home page</p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="actions">
            {state === undefined ? (
              <button onClick={AddPostHandler} className="positive ui button">
                Add Item
              </button>
            ) : (
              <button
                onClick={ChangePostHandler}
                className="positive ui button"
              >
                Change Item
              </button>
            )}
            <Link to="/" className="negative ui button">
              Cancel
            </Link>
          </div>
        </>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return state;
};

export default connect(mapStateToProps, { AddNewItem, ChangeItem })(New);
