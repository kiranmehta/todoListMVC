var FILTER_TYPES = ['ALL',
                    'SCHEDULE',
                    'ACTIVE', 
                    'DONE',
                    'DELETED'
                   ].map( function( filter ) {
  return {
    key : filter,
    name: filter.toLowerCase()
  };
});
                                                 
var model = {
  newValue:'',
  todoList: [],
  selectedFilter : FILTER_TYPES[0]
};


var controller = function() {
  return {
    init : function() {
      var that = this,
      myApp = angular.module('todo', []);
      
      myApp.controller("todo-controller", 
                      function ($scope, $document){
       
        $scope.model= model;
        $scope.FILTER_TYPES = FILTER_TYPES;
        $scope.onEnter = that.onEnter.bind( $scope );
        $scope.getTodoList = that.getTodoList.bind( $scope );
        $scope.onListClick = that.onListClick;
        $scope.onFilterClick = that.onFilterClick.bind( $scope );     
      });
      
    },
    
    onEnter: function() {
          var $scope = this,
          newValue = $scope.model.newValue;
      
          $scope.model.newValue = '';
       
          $scope.model.todoList.push( {
           name: newValue,
           filterType: 1
         });  
    },
    
    getTodoList: function() {
       var model = this.model,
           currentFilterKey = model.selectedFilter.key;
      
      return currentFilterKey === 'ALL' ? model.todoList 
      : model.todoList.filter( function( todo ) {
       return FILTER_TYPES[todo.filterType].key === currentFilterKey;
      } );
    },
    
    onListClick: function( todo ) {
      todo.filterType = todo.filterType + 1 === FILTER_TYPES.length ? 
        todo.filterType : todo.filterType + 1;
    },
    
    onFilterClick: function( filterType ) {
      var $scope = this;
      $scope.model.selectedFilter = filterType;
    }
  };
};


var c  = new controller();
c.init();