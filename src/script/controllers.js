angular.module('starter.controllers', [])
//http://www.htmlxprs.com/post/12/tutorial-on-using-parse-rest-api-and-ionic-framework-together
.controller('TabHomeCtrl', ['$scope','$stateParams','$http','$timeout',function($scope,$stateParams,$http,$timeout) {
    $scope.pageData={
        recommend:[
          {title:'川王小吃老鸭汤2人餐',pic:'./img/ad1.png'}
        ],
        test:[
          {title:'香煎豆腐萝卜泥'},
          {title:'清蒸大闸蟹'},
          {title:'川王咕噜咕噜肉'}
        ],
        share:[
          {title:'回忆中的味道，相见恨晚'},
          {title:'想跟你一起吃晚餐！约吗？'}
        ],
        news:[
          {title:'邯郸美食节12月13日南城酒店举行'},
          {title:'邯郸吃货都在这里，你造吗？'}
        ]
    };
   $scope.doRefresh=function(){
      $timeout(function(){
        	$scope.$broadcast('scroll.refreshComplete');
      },500);
   };
   $http.get('http://119.10.30.52:8080/qdkyService/service/getInterestByUid?uId=1',{}).success(function(data){

    }).error(function(){

    });

}])



.controller('TabShareCtrl', ['$scope','$stateParams','$http','$timeout',function($scope,$stateParams,$http,$timeout) {
    $scope.classify=[
      {ico:'./img/new_bg.png',title:'每日优惠',label:'超低优惠，天天折800。一起加入吧!'},
      {ico:'./img/new_bg.png',title:'厨神这样炼成',label:'每日一菜单,练就神级厨艺'},
      {ico:'./img/new_bg.png',title:'营养搭配,好吃不贵',label:'吃饭讲究营养搭配,这样才健康！'}
    ];
    $scope.attention=[
      {ico:'./img/new_bg.png',title:'吃饭规矩心得',label:'请客吃饭规矩,为大家分享心得。'},
      {ico:'./img/new_bg.png',title:'食材采购经验',label:'分享食材知识、经验和见解。'},
      {ico:'./img/new_bg.png',title:'双11优惠活动',label:'双11,马总来送礼了,优惠多多'}
    ];
    $scope.doRefresh=function(){
       $timeout(function(){
           $scope.$broadcast('scroll.refreshComplete');
       },500);
    };
}])
.controller('TabCarteCtrl', ['$scope','$stateParams','$http','$timeout',function($scope,$stateParams,$http,$timeout) {

    $scope.doRefresh=function(){
       $timeout(function(){
           $scope.$broadcast('scroll.refreshComplete');
       },500);
    };
}])


.controller('TabContactCtrl', ['$scope','$stateParams','$http','$timeout',function($scope,$stateParams,$http,$timeout) {

    $scope.doRefresh=function(){
       $timeout(function(){
           $scope.$broadcast('scroll.refreshComplete');
       },500);
    };
}])
.controller('TabUserCtrl', ['$scope','$stateParams','$http','$timeout',function($scope,$stateParams,$http,$timeout) {

}])

.controller('ShareListCtrl', ['$scope','$stateParams','$http','$timeout','$arrayHelper',function($scope,$stateParams,$http,$timeout,$arrayHelper) {
  $scope.items=[
    {pic:'./img/tmp05.png',title:'巧克力毛巾卷',label:'巧克力椰香抹茶毛巾卷的做法,详细图解巧克力椰香抹茶毛巾卷家常做法所需时间',
    time:new Date(),love:225,reply:200,loves:$arrayHelper.group([
      {id:1,fname:'刘研研'},  {id:2,fname:'张力'}
    ],3,true)},
    {pic:'./img/tmp06.png',title:'牛奶粥',label:'色泽乳白，粘稠软糯，奶香浓郁。 此粥含钙丰富，是孕妇补充钙质的良好来源。',
    time:new Date(),love:225,reply:200,loves:$arrayHelper.group([
      {id:1,fname:'刘研研'}
    ],3,true)},
    {pic:'./img/tmp07.png',title:'红烧羊蹄',label:'红烧羊蹄怎么做好吃?红烧羊蹄的家常菜做法有哪些?好豆网为您提供了红烧羊蹄的做法大全',
    time:new Date(),love:225,reply:200,loves:$arrayHelper.group([
      {id:1,fname:'刘研研'},  {id:2,fname:'张力'},  {id:3,fname:'黄明'},
      {id:4,fname:'主明明'}
    ],3,true)},
  ];
}])


.controller('SettingHomeCtrl', ['$scope','$stateParams','$http','$timeout',function($scope,$stateParams,$http,$timeout) {

}])
.controller('SettingPersonalCtrl', ['$scope','$stateParams','$http','$timeout',function($scope,$stateParams,$http,$timeout) {

}])






;
