'use strict';

angular.module('bd.hprose', [])
  .value('HproseHttpClient', window.hprose.HttpClient)
  .provider('hproseFactory', function () {

    // expose to provider
    this.$get = function (HproseHttpClient, $timeout,$ionicLoading) {

      var asyncAngularify = function (obj,args,callback) {
        return callback ? function () {
          $timeout(function () {
            callback.apply(obj, args);
          }, 0);
        } : angular.noop;
      };

      return function hproseFactory (options) {
        options = options || {};
        var apis = options.apis || {};
	
        var md = {
		  apis:apis,
		  runing:{},
          call: function (m,args,callback,scope,loading) {
	          var _then=this;
	          var i=m.lastIndexOf('.');
	          var p=m.substring(0,i);
 			  var method=m.substring(i+1,m.length);

			  var client=null;
			  if(_then.runing[p]){
				  client=_then.runing[p];
			  }else{
			    console.debug('register service:'+_then.apis[p]);
				if(!_then.apis[p]){
				   console.error('api not find.');
			    }
				client=new HproseHttpClient(_then.apis[p]);  
				_then.runing[p]=client;
			  }
			  var successFun=function(result) {//success
				    if(loading)$ionicLoading.hide();
				   asyncAngularify(scope?scope:_then,[result],callback)();
			  };
			  var errorFun=function(name, err) {
				    if(loading)$ionicLoading.hide();
				    console.error('call '+name+' method error - ');
				    console.error(err);
			  };
			  if(loading){
				  $ionicLoading.show({ template: '<ion-spinner icon="android"></ion-spinner>',noBackdrop:true});
			  }
			  console.debug('call method -'+method+':\n'+JSON.stringify(args));
			  client.invoke(method,args).then(successFun).catchError(errorFun);
              return this;
          }
        };

        return md;
      };
    };

    this.$get.$inject = ['HproseHttpClient', '$timeout','$ionicLoading'];

  });
