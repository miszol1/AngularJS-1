angular
.module('classroomDetailsModule')
.component('classroomDetails', {
    templateUrl: 'javascript/classroom-details-component/classroom-details.template.html',
    controller: [ '$routeParams', '$http',
    function ClassroomDetailsController($routeParams, $http) {
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
	    self.classroom={};
		self.classroom.id=$routeParams.classroomId;
        self.add = function(){
            self.newPlan.id=self.classroom.id;
            for(let i = 0; i < self.days.length; i++){
                if(self.days[i].day == self.newPlan.day){
                    for(let j = 0; j < self.days[i].hours.length;j++){
                        if(self.days[i].hours[j].hour == self.newPlan.hour){
                            for(let k = 0; k < self.days[i].hours[j].classrooms.length;k++) {
                                if(self.days[i].hours[j].classrooms[k]==self.newPlan.id){
                                    return;
                                }
                            }
                        }
                    }
                }
            }
            console.log(self.newPlan);
            $http.post('http://localhost:3000/addPlan', self.newPlan).then(function (response) {
            self.days = response.data;
            self.newPlan = null;
        }, function (error) {
            console.log(error);
            self.newPlan = null;
        });

        };
        self.delete = function(){

            self.planToDelete.id=self.classroom.id;
            $http.post('http://localhost:3000/deletePlan', self.planToDelete).then(function (response) {
            self.days = response.data;
            self.planToDelete = null;
        }, function (error) {
            console.log(error);
            self.planToDelete = null;
        });

        };
    	}
    ]
});