import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'; 
export const Coins = new Mongo.Collection('coins');

if (Meteor.isServer) {   
	//TODO: figure out a more elegant, idiomatic way to do this
	function pollTicker(){
		var ticker = HTTP.get('https://api.coinmarketcap.com/v1/ticker/?limit=10').data;
		for (var i = 0; i < ticker.length; i++) {
			console.log(ticker[i].id);
			console.log(ticker[i].price_usd);
			Coins.upsert(ticker[i].id,
				{
				// Modifier
				 $set: {
					name: ticker[i].name,
					price_usd: ticker[i].price_usd
				}
			});
		}
	}
	pollTicker();
	Meteor.setInterval(pollTicker, 300000);
}