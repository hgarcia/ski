$(document).ready(function () {
  $('.icon-minus-alt').click(function () {
    var ele = $(this);
    var id = this.id;
    var title = ele.parent().siblings()[0].innerHTML;

    var ok = confirm('You sure want to delete: ' + title + ' ?');
    if (ok) {
      $.ajax({
        url: '/admin/videos/' + id,
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
