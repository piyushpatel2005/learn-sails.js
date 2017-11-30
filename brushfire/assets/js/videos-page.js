(function () {
    angular.module('brushfire_videosPage', [])
    .config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self', '*://www.youtube.com/**'
        ]);
    });

    angular.module('brushfire_videosPage')
    .controller('PageCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.videosLoading = true;

        $scope.submitVideosError = false;

        $http.get('/video')
        .then(function onSuccess(response) {
            $scope.videos = response.data;
        })
        .catch(function onError(response) {
            if(response.data.status === '404') {
                return;
            }
            console.log('An unexpected error occurred: ' + response.data.statusText);
        })
        .finally (function completed() {
            $scope.videosLoading = false;
        });


        $scope.submitNewVideo = function () {
            if($scope.busySubmittingVideo) {
                return;
            }

            var _newVideo = {
                title: $scope.newVideoTitle,
                src: $scope.newVideoSrc
            };

            var parser = document.createElement('a');

            parser.href = _newVideo.src;

            var youtubeID = parser.search.substring(parser.search.indexOf("=") + 1, parser.search.length);
            _newVideo.src = 'https://www.youtube.com/embed/' + youtubeID;

            $scope.busySubmittingVideo = true;

            $http.post('/video', {
                title: _newVideo.title,
                src: _newVideo.src
            })
            .then(function onSuccess(response){
                $scope.videos.unshift(_newVideo);
            })
            .catch(function onError(response) {
                console.log('An unexpected error occcured. ' + response.data.statusText);
            })
            .finally(function onCompletion() {
                $scope.busySubmittingVideo = false;
                $scope.newVideoSrc = '';
                $scope.newVideoTitle = '';
            });
        };
    }]);
})();