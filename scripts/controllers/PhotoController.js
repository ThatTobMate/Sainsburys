app.controller('PhotoCtrl', function ($scope, $http, flickrPhotos, _) {

  if(!localStorage.getItem('favouritePhotos')){
    localStorage.setItem('favouritePhotos', "[]");
  }

  flickrPhotos.load({ tags: 'london'}).$promise.then(function(data) {
      $scope.photoList = data.items;
      checkForFavourites();
  });

  function checkForFavourites(){
    $scope.favouritePhotos = angular.fromJson(localStorage.getItem('favouritePhotos'));
    for(var i = 0; i < $scope.favouritePhotos.length; i++){
      var favouritePhoto = _.find($scope.photoList, function(photo) { return photo.media.m == $scope.favouritePhotos[i].media.m });
      if(favouritePhoto){
        favouritePhoto.favourite = true;
      }
    }
  };

  $scope.toggleFavourite = function(selectedPhoto){
    $scope.favouritePhotos = angular.fromJson(localStorage.getItem('favouritePhotos'));
    if(selectedPhoto.favourite){
      //repopulate the array of favouritePhotos but excluding the selected photo
      $scope.favouritePhotos = _.reject($scope.favouritePhotos, function(photo){ return photo.media.m == selectedPhoto.media.m });
      selectedPhoto.favourite = false;
    }else{
      selectedPhoto.favourite = true;
      $scope.favouritePhotos.push(selectedPhoto);
    }
    localStorage.setItem('favouritePhotos', angular.toJson($scope.favouritePhotos));
  };

  $scope.removeFavourite = function(selectedPhoto){
    var favouritePhoto = _.find($scope.photoList, function(photo) { return photo.media.m == selectedPhoto.media.m });

    if(favouritePhoto){
      favouritePhoto.favourite = false;
    }

    $scope.favouritePhotos = _.reject($scope.favouritePhotos, function(photo){ return photo.media.m == selectedPhoto.media.m });

    localStorage.setItem('favouritePhotos', angular.toJson($scope.favouritePhotos));
  };

});