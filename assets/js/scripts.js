//Tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

//Popover
$(function () {
  $('[data-toggle="popover"]').popover();
});

//Carousel
$(".carousel").carousel({
  interval: 1500,
});

/* $("#contacto").on("show.bs.modal", function (e) {
  console.log("El modal contacto se esta mostrando.");
  $("#contactoBtn").removeClass("btn-outline-success");
  $("#contactoBtn").addClass("btn-primary");
  $("#contactoBtn").prop("disabled", true);
});

$("#contacto").on("shown.bs.modal", function (e) {
  console.log("El modal contacto se mostro.");
});

$("#contacto").on("hide.bs.modal", function (e) {
  console.log("El modal contacto se oculta.");
});

$("#contacto").on("hidden.bs.modal", function (e) {
  console.log("El modal contacto se oculto.");
  $("#contactoBtn").prop("disabled", false);
  $("#contactoBtn").removeClass("btn-primary");
  $("#contactoBtn").addClass("btn-outline-success");
}); */
