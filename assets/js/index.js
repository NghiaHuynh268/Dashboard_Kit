let $emailInput = $(".email-input");
let $passInput = $(".password-input");
let $emailError = $(".email-error");
let $passError = $(".password-error");
let $hidePass = $();
let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let specialChars = `/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/`;
let arrChars = specialChars.split("");

let emailResult = false;
let passResult = false;
let passSpecialCheck = false;

window.checkEmail = function () {
  if ($emailInput.val().match(mailFormat)) {
    $emailError.text("Email khả dụng");
    $emailError.css("color", "green");
    emailResult = true;
  } else if ($emailInput.val() == "") {
    $emailError.text("Email không được để trống");
    $emailError.css("color", "red");
    emailResult = false;
  } else {
    $emailError.text("Email không đúng định dạng");
    $emailError.css("color", "red");
    emailResult = false;
  }
};

window.checkPass = function () {
  passSpecialCheck = false;
  arrChars.forEach((char) => {
    if ($passInput.val().includes(char)) {
      passSpecialCheck = true;
    }
  });
  console.log(passSpecialCheck);
  if ($passInput.val() == "") {
    $passError.text("Mật khẩu không được để trống");
    $passError.css("color", "red");
    passResult = false;
  } else if (passSpecialCheck == true) {
    $passError.text("Mật khẩu không được chứa kí tự đặc biệt");
    $passError.css("color", "red");
    passResult = false;
  } else {
    $passError.text("Mật khẩu khả dụng");
    $passError.css("color", "green");
    passResult = true;
  }
  let asas = $passInput.val();
  console.log(asas);
};

window.login = function () {
  if (emailResult == true && passResult == true) {
    $(".login-btn").attr("type", "submit");
    $(".form-login").attr("action", "./tickets.html");
  } else {
    alert("Kiểm tra lại thông tin đăng nhập");
  }
};

window.showPass = function () {
  $(".password-input").attr("type", "text");
  $(".close-eye").css("display", "none");
  $(".open-eye").css("display", "block");
};

window.hidePass = function () {
  $(".password-input").attr("type", "password");
  $(".close-eye").css("display", "block");
  $(".open-eye").css("display", "none");
};
