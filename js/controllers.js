workoutApp.controller('SelectListController', function ($scope) {
    $scope.workOutList = availableWorkouts;
    $scope.chosenWorkouts = chosenWorkouts;
    $scope.defaultOption = document.getElementById('default-option');

    $scope.addWorkout = function(selectedWorkout){
        //adds selected car to wishlist
        selectedWorkout = $scope.optionSelected;
        workoutIndex = $scope.workOutList.indexOf(selectedWorkout);

        if (selectedWorkout === undefined ) {
            return false;
         } else {
            //adds this workout to to-do list
            $scope.chosenWorkouts.push(selectedWorkout);

            //remove this car from selectable options
            $scope.workOutList.splice(workoutIndex, 1); 
            $scope.optionSelected = $scope.workOutList[workoutIndex+1];
         }
      };
});

workoutApp.controller('SelectedListController', function($scope){
  $scope.selectedWorkouts = chosenWorkouts;
  $scope.workOutList = availableWorkouts;

  //removes workout from to-do and makes it visible again in the select options

  $scope.removeItem = function(workout){
    index = $scope.selectedWorkouts.indexOf(workout);
    $scope.selectedWorkouts.splice(index, 1);
    $scope.workOutList.push(workout);
    $scope.optionSelected = document.getElementById('default-option');
  };

  // Sort by specification Difficulty and Length
  $scope.predicate = 'difficulty';
  $scope.predicate = 'length';

  //Changing Background color of the filter button
  this.tab = 0;

  this.selectTab = function(setTab) {
    this.tab = setTab;
  };

  this.isSelected = function(checkTab){
    return this.tab === checkTab;
  };
});
