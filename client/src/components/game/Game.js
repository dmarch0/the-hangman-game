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
    if (user.status === "logged") {
      fetchWord(4, 6, user.token);
    } else {
      fetchWord(4, 6);
    }
  }, []);
  const renderContent = game.loading ? (
    <div>
      <Spinner />
    </div>
  ) : game.status === "in progress" ? (
    <div>
      <HangmanImage />
      <WordDisplay data={game.data} />
      <Keyboard data={game.data} token={user.token} status={user.status} />
    </div>
  ) : game.status === "won" ? (
    <div>
      <HangmanImage />
      <WordDisplay data={game.data} />
      <WonDisplay />
    </div>
  ) : (
    <div>
      <HangmanImage />
      <WordDisplay data={game.data} />
      <LostDisplay />
    </div>
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
