import React, { useState } from "react";
import styled from "styled-components";
import cn from "classnames";
import { connect } from "react-redux";

import { createNewUser } from "../../actions/userActions";
import MainButton from "../buttons/MainButton";

const NewUserForm = ({ className, user, game, createNewUser }) => {
  const [name, setName] = useState("");
  const onInputChange = event => {
    setName(event.target.value);
  };
  const onFormSubmit = event => {
    event.preventDefault();

    const won = game.status === "won" ? 1 : 0;

    createNewUser(name, won);
  };
  return (
    <div className={className}>
      <h1>Want to record your stats in the highscores?</h1>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="name">Enter a username</label>
        <input type="text" name="name" onChange={onInputChange} value={name} />
        <MainButton>submit</MainButton>
        <div className="error-display">{user.error}</div>
      </form>
    </div>
  );
};

const StyledNewUserForm = styled(NewUserForm)`
  margin: 40px 0px;
  label {
    display: block;
    text-align: center;
    font-size: 2rem;
  }
  input {
    display: block;
    border: 1px solid white;
    border-radius: 5px;
    font-size: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    width: 400px;
    color: white;
    background-color: black;
    margin: 10px auto;
    padding: 10px;
    &:focus {
      outline: none;
    }
  }
`;

const mapStateToProps = state => ({
  user: state.user,
  game: state.game
});

export default connect(
  mapStateToProps,
  { createNewUser }
)(StyledNewUserForm);
