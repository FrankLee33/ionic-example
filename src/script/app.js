// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova', 'starter.controllers', 'starter.services'])

.run(['$ionicPlatform',function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
}])

.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
	$ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    //首页
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs-layout.html'
  })



  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'TabHomeCtrl'
      }
    }
  })


  .state('tab.carte', {
      url: '/carte',
      views: {
        'tab-carte': {
          templateUrl: 'templates/tab-carte.html',
          controller: 'TabCarteCtrl'
        }
      }
    })

  .state('tab.share', {
    url: '/share',
    views: {
      'tab-share': {
        templateUrl: 'templates/tab-share.html',
        controller: 'TabShareCtrl'
      }
    }
  })
  .state('tab.contact', {
    url: '/contact',
    views: {
      'tab-contact': {
        templateUrl: 'templates/tab-contact.html',
        controller: 'TabContactCtrl'
      }
    }
  })
  .state('tab.user', {
    url: '/user',
    views: {
      'tab-user': {
        templateUrl: 'templates/tab-user.html',
        controller: 'TabUserCtrl'
      }
    }
  })


  /*设置*/
  .state('setting', {
    url: '/setting',
    abstract: true,
    templateUrl: 'templates/setting-layout.html'
  })
  .state('setting.home', {
    url: '/home',
    views: {
      'main': {
        templateUrl: 'templates/setting-home.html',
        controller: 'SettingHomeCtrl'
      }
    }
  })
  .state('setting.personal', {
    url: '/personal',
    views: {
      'main': {
        templateUrl: 'templates/setting-personal.html',
        controller: 'SettingPersonalCtrl'
      }
    }
  })
  /*分享*/
  .state('share', {
    url: '/share',
    abstract: true,
    templateUrl: 'templates/share-layout.html'
  })
  .state('share.list', {
    url: '/list',
    views: {
      'main': {
        templateUrl: 'templates/share-list.html',
        controller: 'ShareListCtrl'
      }
    }
  })

  ;


  $urlRouterProvider.otherwise('/tab/home');

}])

.filter('chat_msg', ['$sce',function($sce) {
   return function(input) {
     input=input.replace(/\{p:([^\}]+)+\}/igm,'<img src="$1">');
     input=input.replace(/\{e:([^\}]+)+\}/igm,'<img src="./img/exn/$1.gif">');
     return $sce.trustAsHtml(input);
   };
 }])

 .factory('$arrayHelper',[function () {
 	return {
 		group:function(arr,c,fill){
 			if(!(arr instanceof Array))
 				return [];
 			var narr=[],j=0;
 			for(var i=0,k=0;i<arr.length;i++){
 				if(narr[j]==undefined)
 					narr[j]=[];
 				k++;
 				narr[j][narr[j].length]=arr[i];
 				if(k>=c){
 					k=0;
 					j++;
 				}
 			}
      if(fill&&narr[j]&&narr[j].length<c){
        for(var i=narr[j].length;i<c;i++){
          narr[j][i]={};
        }
      }
 			return narr;
 		}
 	};
}]);
