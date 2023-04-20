$(document).ready(function () {
  var saveButtonElement = $('.saveBtn');
  var clearButtonElement = $('.clearBtn');

  saveButtonElement.on('click', function() {
    localStorage.setItem($(this).parent().attr('id'), $(this).siblings().eq(1).val());
  })

  clearButtonElement.on('click', function() {
    localStorage.clear();
    setUserInputValuesInTextarea();
  })

  Init();

  function Init() {
    applyPastPresentFutureClassToEachTimeBlock()
    displayCurrentDateAndTime();
    setUserInputValuesInTextarea();
  }

  function applyPastPresentFutureClassToEachTimeBlock() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var timeDiv = $(this).attr('id');

      if (currentHour == timeDiv) {
        $(this).removeClass("future");
        $(this).removeClass("past");
        $(this).addClass("present");

      } else if (currentHour < timeDiv) {
        $(this).removeClass("present");
        $(this).removeClass("past");
        $(this).addClass("future");

      } else if (currentHour > timeDiv) {
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("past");
      }
    })
  }

  function setUserInputValuesInTextarea() { 
    $('.description').each(function() {
      $(this).val(localStorage.getItem($(this).parent().attr('id')));
    });
  }

  function displayCurrentDateAndTime() {
    var today = dayjs();
    $('#currentDay').text(today.format('dddd, MMMM D, YYYY'));
    $('#currentTime').text(today.format('h:m:s A'));
  }

  setInterval(displayCurrentDateAndTime, 1000);
});