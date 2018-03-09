import { Template } from 'meteor/templating';
import { Coins } from '../imports/api.js'
import './main.html';

Template.body.helpers({
  coins() {
    return Coins.find();
  },
});