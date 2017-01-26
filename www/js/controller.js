
/**
 * Created by Reynald on 26/01/2017.
 */
angular.module('app.controller', [])
  .controller('navController',  function($scope , dataService) {
    dataService.autoLogin();
    $scope.currentUser = dataService.getCurrentUser();
  })
  .controller('AccueilController', function($scope , dataService) {

    $scope.like = function (id) {
      dataService.likePost(id).then(
        function (response) {
          $scope.doRefresh();
        },
        function (error) {
          console.log(error);
        }
      );
    };

    $scope.dislike = function (id) {
      dataService.unlikePost(id).then(
        function (response) {
          $scope.doRefresh();
        },
        function (error) {
          console.log(error);
        }
      );
    };

    dataService.getPosts().then(function (response) {
      $scope.posts = response;
    }, function (error) {
      console.log(error);
    });
    $scope.doRefresh = function() {
      dataService.getPosts().then(function (response) {
        $scope.posts = response;
        $scope.$broadcast('scroll.refreshComplete');
      }, function (error) {
        console.log(error);
        $scope.$broadcast('scroll.refreshComplete');
      })
    };
  })
  .controller('listeLikeController', function($scope,$stateParams, dataService) {
      dataService.getLikes($stateParams.idPicture).then(function (response) {
        $scope.likes = response;
      }, function (error) {
        console.log(error)
      });
      $scope.doRefresh = function() {
        dataService.getLikes($stateParams.idPicture).then(function (response) {
          $scope.likes = response;
          $scope.$broadcast('scroll.refreshComplete');
        }, function (error) {
          console.log(error);
          $scope.$broadcast('scroll.refreshComplete');
        })
      };
    }
  )
  .controller('listeCommentController', function($scope , $stateParams, dataService) {
    $scope.currentUser = dataService.getCurrentUser();
    $scope.messagePost = '';
    $scope.idPost = $stateParams.idPicture;
    dataService.getComments($stateParams.idPicture).then(function (response) {
      $scope.comments = response;
    }, function (error) {
      console.log(error)
    });
    $scope.doRefresh = function() {
      dataService.getComments($stateParams.idPicture).then(function (response) {
        $scope.comments = response;
        $scope.$broadcast('scroll.refreshComplete');
      }, function (error) {
        console.log(error);
        $scope.$broadcast('scroll.refreshComplete');
      })
    };

    $scope.deleteCom = function (idCom) {
      dataService.deleteComment(idCom).then(function (response) {
        $scope.doRefresh();
      }, function (error) {
        console.log(error);
      });
    };

    $scope.postCommentaire = function (idPost) {
      if ($scope.messagePost.length > 0) {
        dataService.sendComment($scope.messagePost, idPost).then(function (response) {
          $scope.messagePost='';
          $scope.doRefresh();
        }, function (error) {
          console.log(error);
        })
      }
    }
  })
  .controller('PostController', function($scope) {

  })
  .controller('AccountController', function($scope) {

  });
