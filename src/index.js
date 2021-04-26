import * as $ from "jquery";
import Post from "./Post";
import "./babel-check";
import "./styles/styles.css";
import "./styles/theme.scss";
import "./assets/json";
import "./react-app";
import postImage from "./assets/images/post-image.jpeg";

import("lodash").then(_ => {
  console.log("Lodash", _.default.random(0, 42, true));
});

const post = new Post("Title", postImage);
$(".json").addClass("code").html(post.toString());

if (module.hot) {
  module.hot.accept();
}
