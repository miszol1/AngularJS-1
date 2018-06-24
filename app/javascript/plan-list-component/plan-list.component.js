angular
.module('planListModule')
	.component('planList', {
    templateUrl: 'javascript/plan-list-component/plan-list.template.html',
    controller: ['$http',
      function PlanListController($http) {
        var self = this;
		self.days = [];
		 this.getDays = function () {
        	$http.get('http://localhost:3000/plan').then(function (response) {
           		self.days = response.data;
       			}, function (error) {
            	console.log(error);
       		 });
   		  };
   		self.getDays();

      }
    ]
});