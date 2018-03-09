import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'; 
export const Coins = new Mongo.Collection('coins');

if (Meteor.isServer) {   
	function pollTicker(){
		var ticker = HTTP.get('https://api.coinmarketcap.com/v1/ticker/?limit=10').data;
		for (var i = 0; i < ticker.length; i++) {
			Coins.upsert(ticker[i].id,
				{
				 $set: {
					name: ticker[i].name,
					price_usd: ticker[i].price_usd
				}
			});
		}
	}
	pollTicker();
	Meteor.setInterval(pollTicker, 10000);
}