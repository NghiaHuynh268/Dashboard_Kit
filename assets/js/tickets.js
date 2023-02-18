import { allTickets } from "./data.js";

let $editForm = $(".edit-form");
let $addForm = $(".add-form");
let $blurBg = $(".blur-bg");
let $addImg = $(".add-img");
let $addTitle = $(".add-title");
let $addName = $(".add-name");
let $addDatePicker = $(".add-datepicker");
let $editImg = $(".edit-img");
let $editTitle = $(".edit-title");
let $editName = $(".edit-name");
let $editDatePicker = $(".edit-datepicker");
let $timeNow = $(".timenow");
let editIndex = 0;
let getAttrId = 0;

showCurrentPage();
rendertickets(allTickets);
showOption();

function showCurrentPage() {
  $(".page").hide();
  $(".page:nth-child(2)").show();
  $(".opt").click(function () {
    $(".opt").removeClass("active");
    $(this).addClass("active");
    $(".page").hide();
    let attrPage = $(this).attr("href");
    $(attrPage).show();
  });
}

function showOption() {
  $(".add-edit-remove").hide();
  $(".showoption").click(function () {
    getAttrId = $(this).attr("href");
    $(getAttrId).show();
    $blurBg.show();
  });
}
function rendertickets(allTickets) {
  $.each(allTickets, function () {
    $(document.createElement("div"))
      .addClass("item")
      .html(
        `<div class="item-details">
        <img src="${this.img}" />
        <div class="title-group">
          <p class="item-title">${this.title}</p>
          <p class="count-update">Updated 1 day ago</p>
        </div>
      </div>
      <div class="name-group">
        <p class="item-name">${this.name}</p>
        <p class="item-oldday">on 24.05.2019</p>
      </div>
      <div class="date-group">
        <p class="item-newday">${this.date}</p>
        <p class="item-time">${this.time}</p>
      </div>
      <p class="item-priority">${this.priority}</p>
      <a href="#${this.id}" class="showoption">
        <img src="./assets/images/edit.png" />
      </a>
      <div class="add-edit-remove" id="${this.id}">
        <button class="add-btn" onclick="addTicket()">Add</button>
        <button class="edit-btn" onclick="editTicket(${this.id})">Edit</button>
        <button class="remove-btn" onclick="removeTicket(${this.id})">
          Remove
        </button>
      </div>
    </div>`
      )
      .appendTo(".main-body");
  });
  $("p:contains(LOW)").css("background-color", "#fec400");
  $("p:contains(NORMAL)").css("background-color", "#29cc97");
}

$(function () {
  $(".add-datepicker").datepicker({
    dateFormat: "M dd, yy",
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Maj",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    currentText: "Today",
    closeText: "Close",
    minDate: new Date(),
  });
  $(".edit-datepicker").datepicker({
    dateFormat: "M dd, yy",
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Maj",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    currentText: "Today",
    closeText: "Close",
    minDate: new Date(),
  });
});

let newDay = new Date();
let h = newDay.getHours();
let m = newDay.getMinutes();
let nowTime = "";
if (h > 12 && m > 9) {
  nowTime = h - 12 + ":" + m + " PM";
} else if (h > 12 && h < 9) {
  nowTime = h - 12 + ":0" + m + " PM";
} else if (h < 12 && m > 9) {
  nowTime = h + ":" + m + " AM";
} else {
  nowTime = h + ":0" + m + " AM";
}

window.addTicket = function () {
  $(getAttrId).hide();
  $addForm.show();
  $blurBg.show();
  $addDatePicker.datepicker("setDate", new Date());
  $timeNow.val(nowTime);
};

window.saveAdd = function () {
  if (
    $addImg.val() == "" ||
    $addTitle.val() == "" ||
    $addName.val() == "" ||
    $addDatePicker.val() == ""
  ) {
    alert("Please fill in the blanks completely");
  } else {
    let item = {
      id: allTickets.length,
      img: $addImg.val(),
      title: $addTitle.val(),
      name: $addName.val(),
      date: $addDatePicker.val(),
      time: $timeNow.val(),
      priority: $(".add-select option:selected").text(),
    };
    allTickets.push(item);
    $(".main-body").html("");
    rendertickets(allTickets);
    hideBlurBg();
    $addImg.val("");
    $addTitle.val("");
    $addName.val("");
    showOption();
  }
};

window.editTicket = function (x) {
  $(getAttrId).hide();
  $editForm.show();
  $blurBg.show();
  $editImg.val(allTickets[x].img);
  $editTitle.val(allTickets[x].title);
  $editName.val(allTickets[x].name);
  $editDatePicker.val(allTickets[x].date);
  $timeNow.val(nowTime);
  $(".edit-select").val(allTickets[x].priority);
  editIndex = x;
};

window.saveEdit = function () {
  if (
    $editImg.val() == "" ||
    $editTitle.val() == "" ||
    $editName.val() == "" ||
    $editDatePicker.val() == ""
  ) {
    alert("Please fill in the blanks completely");
  } else {
    allTickets[editIndex].img = $editImg.val();
    allTickets[editIndex].title = $editTitle.val();
    allTickets[editIndex].name = $editName.val();
    allTickets[editIndex].date = $editDatePicker.val();
    allTickets[editIndex].time = $timeNow.val();
    allTickets[editIndex].priority = $(".edit-select option:selected").val();
    $(".main-body").html("");
    rendertickets(allTickets);
    hideBlurBg();
    showOption();
  }
};

window.removeTicket = function (x) {
  $(".showinput").prop("checked", false);
  for (let i = 0; i < allTickets.length; i++) {
    if (allTickets[i].id == x) {
      allTickets.splice(i, 1);
      console.log(i);
    }
  }
  $(".main-body").html("");
  rendertickets(allTickets);
  $blurBg.hide();
  showOption();
};

window.hideBlurBg = function () {
  $addForm.hide();
  $editForm.hide();
  $(getAttrId).hide();
  $blurBg.hide();
};

window.sortTickets = function () {
  let newAllTickets = allTickets.sort(function (a, b) {
    let a1 = a.name.split(" ").pop();
    let b1 = b.name.split(" ").pop();
    if (a1 == b1) {
      return 0;
    } else if (a1 < b1) {
      return -1;
    } else {
      return 1;
    }
  });
  $(".main-body").html("");
  rendertickets(newAllTickets);
  showOption();
};
