var React = require('react');
var ReactDOM = require('react-dom');
var jquery = require('jquery');

jquery(function($){
  ReactDOM.render(
  <h1>Hello, 0!</h1>,
    $('footer').get(0)
  );

  console.log(jquery);
});