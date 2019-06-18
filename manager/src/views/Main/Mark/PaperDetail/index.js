import React from "react";
import { connect } from "dva/router";
function PaperDetail() {}
const mapState = state => state;
const mapDispatch = dispatch => ({});
return connect(
  mapState,
  mapDispatch
)(PaperDetail);
