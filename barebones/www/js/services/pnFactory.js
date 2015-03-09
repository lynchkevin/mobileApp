'use strict';

/**
* A factory to wrap pubnub   
*/
angular.module('barebonesApp')
    .factory('pnFactory', function () {
        var pnFactory = {};
    
        pnFactory.init = function(uuid) {
            uuid = uuid || "anonymous";

            pnFactory.pubnub = PUBNUB.init({
                keepalive : 30,
                publish_key: 'pub-c-19a2e5ee-5b70-435d-9099-65ae53e5b149',
                subscribe_key: 'sub-c-0f2a418a-b9f1-11e4-80fe-02ee2ddab7fe',
                uuid:uuid,
            });
        };
            
        var publish = function(message) {
            if(arguments.length == 1){
                pnFactory.pubnub.publish({
                    channel : this.name,
                    message : message
                });
            };
        };    
    
        var subscribe = function(mCallback, pCallback){
            var noop = function(){};
            var mcb = mCallback || noop;
            var pcb = pCallback || noop;
            pnFactory.pubnub.subscribe({
                channel : this.name,
                presence : pcb,
                message : mcb
            });
        };
        
        var unsubscribe = function(){
            pnFactory.pubnub.unsubscribe({
                channel : this.name,
            });
        };
        
        var hereNow = function(hnCallback){
            var noop = function(){};
            var hncb = hnCallback || noop;
            pnFactory.pubnub.here_now({
                channel : this.name,
                callback : hncb
            });
        };
    
        pnFactory.newChannel = function(channelName){
          var channel = {
              name : channelName,
              publish : publish,
              subscribe : subscribe,
              unsubscribe : unsubscribe,
              hereNow : hereNow,
          };
          return channel;
        };
    
        return pnFactory;
});
              
