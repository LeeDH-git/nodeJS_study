(function () {
  function getTodigits(num) {
    return ("0" + num).slice(-2);
  }

  function getDate(dateObj) {
    if (dateObj instanceof Date)
      return (
        dateObj.getFullYear() +
        "-" +
        getTodigits(dateObj.getMonth() + 1) +
        "-" +
        getTodigits(dateObj.getDate())
      );
  }

  function getTime(dateObj) {
    if (dateObj instanceof Date) {
      return (
        getTodigits(dateObj.getHours()) +
        ":" +
        getTodigits(dateObj.getMinutes()) +
        ":" +
        getTodigits(dateObj.getSeconds())
      );
    }
  }

  function convertDate() {
    $("[data-date]").each(function (index, element) {
      var dateString = $(element).data("date");
      if (dateString) {
        var date = new Date(dateString);
        $(element).html(getDate(date));
      }
    });
  }

  function convertDateTime() {
    $("[data-date-time]").each(function (index, element) {
      var dateString = $(element).data("date-time");
      if (dateString) {
        var date = new Date(dateString);
        $(element).html(getDate(date) + " " + getTime(date));
      }
    });
  }

  convertDate();
  convertDateTime();
});
