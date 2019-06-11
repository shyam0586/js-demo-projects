app.controller("shoppingItems", ["$scope", function($scope) {
    $scope.itemsInCart = [];
    $scope.totalPrice = 0;

    $scope.items = [{
        name: "Wunderband",
        price: "1000",
        availability: "AVAILABLE",
        image: "1.png"
    }, {
        name: "Hola Hijos",
        price: "1300",
        availability: "AVAILABLE",
        image: "2.png"
    }, {
        name: "American Pride",
        price: "2000",
        availability: "SOLD-OUT",
        image: "3.png"
    }, {
        name: "Eastern Wind",
        price: "1200",
        availability: "AVAILABLE",
        image: "4.png"
    }, {
        name: "MegaChargers",
        price: "3000",
        availability: "AVAILABLE",
        image: "5.png"
    }];

    //add items to cart
    $scope.addToCart = function(index) {
        var hasItem = false;
        for (var i = 0; i < $scope.itemsInCart.length; i++) {
            if (angular.equals($scope.itemsInCart[i], $scope.items[index])) {
                return true;
            }
        }
        if (!hasItem) {
            $scope.totalPrice = parseInt($scope.totalPrice) + parseInt($scope.items[index].price);
            $scope.itemsInCart.push($scope.items[index]);
        }
    }
    
    //remove items from cart
    $scope.removeFromCart = function(index) {
        $scope.totalPrice = parseInt($scope.totalPrice) - parseInt($scope.itemsInCart[index].price);
        $scope.itemsInCart.splice(index, 1);
    }
    
    //check if item is available and disable button
    $scope.checkAvailable = function(index) {

        if ($scope.items[index].availability === "AVAILABLE") {
            return false;
        } else if ($scope.items[index].availability === "SOLD-OUT") {
            return true;
        }
    }
}]);