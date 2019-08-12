import React from "react";
import MenuLink from "../buttons/MenuLink";
import { connect } from "react-redux";

const WonDisplay = ({ user }) => {
  const renderContent = user.token ? (
    <div>User content</div>
  ) : (
    <div>No user content</div>
  );
  return renderContent;
};

const mapStateToProps = state => ({ user: state.user });

export default connect(
  mapStateToProps,
  {}
)(WonDisplay);
