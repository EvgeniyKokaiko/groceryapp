import React, { ChangeEvent, useEffect, useState } from "react";
import { match } from "react-router-dom";
import { Location } from "history";
import { Item, ItemComment, MatchProps } from "../Interfaces";
import CommentImg from "./../assets/christian.jpg";
import { connect } from "react-redux";
import {
  AddComment,
  DeleteComment,
  FetchComments,
} from "../redux/actions/actions";
import { dateParser } from "../utils";

interface IProps {
  location: Location;
  FetchComments(id: string): Function;
  AddComment(
    name: string,
    text: string,
    date: string,
    productId: string
  ): Function;
  DeleteComment(id: number): Function;
  CommentsReducer: ItemComment[];
  match: match<MatchProps>;
}

const ItemDetail = (props: IProps): JSX.Element => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [flag, setFlag]: [boolean, Function] = useState(true);
  const { id } = props.match.params;
  const date = dateParser(new Date());
  const [data, setData]: [Item, Function] = useState({
    photo: "",
    name: "",
    description: "",
    quantity: 0,
    color: "",
    weight: "",
    id: 0,
    size: { width: 0, height: 0, depth: 0 },
    comments: [],
  });

  useEffect(() => {
    props.FetchComments(id);
    setData(props.location.state);
    //i've used eslint disabler comment, to prevent some bugs(if i'll add in deps props, i'll get infinity loop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.FetchComments, id, flag]);

  function onCommentAdd() {
    props.AddComment(name, text, date, id);
    setFlag((prev: boolean) => !prev);
  }

  function onCommentDelete(commentId: number) {
    props.DeleteComment(commentId);
    setFlag((prev: boolean) => !prev);
  }

  const RenderComments = () => {
    return props?.CommentsReducer?.map((el) => {
      return (
        <div className="comment">
          <span className="avatar">
            <img src={CommentImg} alt="comment_image" />
          </span>
          <div className="content">
            <span className="author">{el.name}</span>
            <div className="metadata">
              <span className="date">{el.date}</span>
            </div>
            <div className="text">{el.text}</div>
            <div className="actions">
              <button
                onClick={() => onCommentDelete(el.id)}
                className="ui red button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="item_block">
      <div className="item_container">
        <div className="ui segment">
          <div className="ui items">
            <div className="item large">
              <div className="image">
                <img className="item_photo" src={data.photo} alt="item_photo" />
              </div>
              <div className="content">
                <span className="header">{data.name}</span>
                <div className="meta">
                  <span>Description: {data.description}</span>
                </div>
                <div className="description">
                  <span>Color: {data.color}</span>
                  <br />
                  <span>Quantity: {data.quantity}</span>
                </div>
                <div className="description">
                  <p className="header">
                    Size: <br /> Width: {data.size.width}
                    <br />
                    Height: {data.size.height} <br />
                    Depth: {data.size.depth}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui segment">
          <div className="ui fluid icon input">
            <input
              type="text"
              placeholder="Your name..."
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </div>
          <br />
          <div className="ui fluid icon input">
            <input
              type="text"
              placeholder="Text..."
              value={text}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
            />
          </div>
          <br />
          <button
            onClick={onCommentAdd}
            className="ui right floated green button"
          >
            Add Comment
          </button>
          <br />
          <br />
          <div style={{ width: "100vw" }} className="ui comments">
            <h3 className="ui dividing header">Comments</h3>
            {RenderComments()}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return state;
};

export default connect(mapStateToProps, {
  FetchComments,
  AddComment,
  DeleteComment,
})(ItemDetail);
