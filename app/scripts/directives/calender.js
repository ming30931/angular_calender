angular.module('jsCalenderApp').directive("calender", function () {
  Date.prototype.last_day_of_month = function() {
    var d = new Date(
      this.getYear(),
      this.getMonth(),
      this.getDate()
    );
    d.setMonth(d.getMonth() + 1);
    d.setDate(1);
    d.setTime(d.getTime() - 1);
    return d.getDate();
  }

  function generate (month) {
    var current_year = parseInt((new Date()).getFullYear());
    if (month) {
      var today = new Date(current_year, month - 1, 1)
    } else {
      var today = new Date();
    }

    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    var w = ["日", "月", "火", "水", "木", "金", "土"];
    var first_w_index = today.getDay();

    var last_day = today.last_day_of_month();

    var template = "<tr>";
    var w_count = 0;
    var id_count = 1;

    while (first_w_index--) {
      w_count++;

      template += "<td></td>";
    }

    for (var i = 1; i <= last_day; i++) {
      if(w_count % 7 == 0){
        template += "</tr><tr>";
        w_count = 0;
      }

      switch (w_count) {
        case 0:
          template += "<td class='day'><a href='#' id='' class='sun'>" + i + "</a></td>";
          break;
        case 6:
          template += "<td class='day'><a href='#' id='' class='sat'>" + i + "</a></td>";
          break;
        default:
          template += "<td class='day'><a href='#' id=''>" + i + "</a></td>";
          break;
      }

      w_count++;
      id_count++;
    }

    var r = 7 - w_count;
    while (r--) {
      template += "<td></td>";
    }

    template += "</tr>";

    return template
  }

  return {
    restrict: "A",
    link: function (scope, element) {
      element.append(generate(scope.month));
    },
    controller: function ($scope, $compile, $location) {
      $scope.calender_init = function () {
        var month = parseInt($location.path().split("/").pop());
        if (month) {
          $scope.month = month;
        }
        else {
          var today = new Date();
          $scope.month = today.getMonth() + 1;
        }
      }

      $scope.compile = function (template) {
        return $compile(template)(scope);
      }
    }
  }
})