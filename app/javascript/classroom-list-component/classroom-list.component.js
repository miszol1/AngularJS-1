angular
.module('classroomListModule')
	.component('classroomList', {
    templateUrl: 'javascript/classroom-list-component/classroom-list.template.html',
    controller: ['$http',
      function ClassroomListController($http) {
      	var self = this;
		self.classrooms = [];
		this.getClassrooms = function () {
        			$http.get('http://localhost:3000/classrooms').then(function (response) {
           			 self.classrooms = response.data;
       			 }, function (error) {
            console.log(error);
       		 });
   		 };
      self.filterByFloor='';
      self.filterById='';
   		self.getClassrooms();
        //this.classrooms = Classroom.query();
      self.add = function () {
        if(self.newClassroom.id.length!=3 || self.newClassroom.id[0]>'3' || self.newClassroom.id[0]<'1'){
          return;
        }
        for(let i = 0;i<self.classrooms.length;++i){
          if(self.newClassroom.id==self.classrooms[i].id){
            return;
          }
        }
        $http.post('http://localhost:3000/addClassroom', self.newClassroom).then(function (response) {
            self.classrooms = response.data;
            self.newClassroom = null;
        }, function (error) {
            console.log(error);
            self.newClassroom = null;
        });
      //console.log(self.classrooms);
      };
      self.delete = function(){
        $http.post('http://localhost:3000/deleteClassroom', self.classroomToDelete).then(function (response) {
            self.classrooms = response.data;
            self.classroomToDelete = null;
        }, function (error) {
            console.log(error);
            self.classroomToDelete = null;
        });

      };
    }
    ]
});