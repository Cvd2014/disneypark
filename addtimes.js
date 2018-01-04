require('dotenv').load();

var Cloudant = require('cloudant');
var request = require('request');
//var now=require("performance-now");
var Themeparks = require("themeparks");


var username='d383979e-3ca2-4500-9f61-935a384e768c-bluemix';
var password='399325a41501838f71da0a93fb7bff30c70a3a01051660d838aa0b9d1b99ed60';

var cloudant = Cloudant({account:username, password:password, plugin:'promises'});
var dbtimes = cloudant.db.use('times');


var filldelay = function(){
  setTimeout(function(){
      fillDB();
  }, 10000)  
} 

var fillDB=function(){
	var disneyMagicKingdom = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();

	disneyMagicKingdom.GetOpeningTimes().then(function(times) {
    // print opening times
    //console.log("Magic Kingdom is open at the following times")
    	for(var i=0, time; time=times[i++];) {
        	if (time.type == "Operating") {
            	//console.log("[" + time.date + "] Open from " + time.openingTime + " until " + time.closingTime);
            	data={
            		date:time.date,
            		open:time.openingTime,
            		close:time.closingTime
            	}
            	id=time.date
            	//console.log(data)
            	dbtimes.insert({_id:id, data}, function(err, body, header){
            		if (err){
            			return console.log(err.message);
            		}
            		console.log(id + " inserted.")
            	})
        	}
    	}
    }, console.error);
}


filldelay()
