$(document).ready(function () {
  $.foundation.customForms.appendCustomMarkup();

  $('#cancelVideoEdit').click(function () {
    document.location = "/admin/videos";
  });

  $('.icon-minus-alt').click(function () {
    var ele = $(this);
    var id = this.id;
    var url = "/admin/" + ele.attr("data-element") + "/" + id;
    var title = ele.parent().siblings()[0].innerHTML;

    var ok = confirm('You sure want to delete: ' + title + ' ?');
    if (ok) {
      $.ajax({
        url: url,
        method: 'DELETE',
        success: function (data) {
          ele.parent().parent().remove();
        },
        error: function (err) {
          console.log(err);
        }
      });
    }
  });
});
