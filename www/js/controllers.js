angular.module('flickrApp.controllers',[])
.controller('MainCtrl', function($scope,$ionicLoading,$state,Flickr){
	$ionicLoading.show();

	// Getting Photosets Detail from Flickr Service
	Flickr.getPhotoSets().then(function(result){
		$scope.photoList = result.data.photosets.photoset;
		$ionicLoading.hide();
	});

	// Opening Album
	$scope.openAlbum = function(photoset_id) {
    	$state.go('album',{id: photoset_id });
    };

})
.controller('AlbumCtrl', function($scope,$ionicLoading,$stateParams,Flickr) {
	$ionicLoading.show();
		$scope.id = $stateParams.id;
		$scope.photoList = [];

		// Getting List of Photos from a Photoset
		Flickr.getPhotos($scope.id).then(function(result){
			$ionicLoading.hide();
			console.log(result);
			$scope.photos = result.data.photoset.photo;
			$scope.title = result.data.photoset.title;

			angular.forEach($scope.photos, function(photo,key) {
				var id = photo.id;
				var secret = photo.secret;
				Flickr.getInfo(id,secret).then(function(result) {
					$scope.photoList.push({sizes: result[0].data, info: result[1].data});
					console.log($scope.photoList);

				});
			});

		});
})