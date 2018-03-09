import { Template } from 'meteor/templating';
import { Coins } from '../imports/api.js'
import './main.html';

Template.body.onCreated(function helloOnCreated() {
  // counter starts at 0
  //subscribe here?
  //this.counter = new ReactiveVar(0);
});

Template.body.helpers({
  results() {
    return Coins.find();
  },
});