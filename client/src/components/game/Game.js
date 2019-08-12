import React, { useEffect } from "react";
import { connect } from "react-redux";

import WordDisplay from "./WordDisplay";
import Keyboard from "./Keyboard";
import HangmanImage from "../HangmanImage";
import Spinner from "../Spinner";
import LostDisplay from "./LostDisplay";
import WonDisplay from "./WonDisplay";
import { fetchWord } from "../../actions/gameActions";

const Game = ({ fetchWord, game, user }) => {
  useEffect(() => {
    fetchWord(4, 6);
  }, []);
  const renderContent = game.loading ? (
    <div>
      <Spinner />
    </div>
  ) : game.status === "in progress" ? (
    <div>
      <HangmanImage />
      <WordDisplay data={game.data} />
      <Keyboard data={game.data} token={user.token} />
    </div>
  ) : game.status === "won" ? (
    <WonDisplay />
  ) : (
    <LostDisplay />
  );
  return renderContent;
};

const mapStateToProps = state => ({
  game: state.game,
  user: state.user
});

export default connect(
  mapStateToProps,
  { fetchWord }
)(Game);
