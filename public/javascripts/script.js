$(function() {
  // masked input for phones
  $('#phone').mask('(999)999-99-99');
  // deleting phones
  $('.delete').on('click', function() {
    var id = $(this).data('id');
    if (confirm('Do you really want to delete this phone?')) {
      $.post(
        '/admin/delete',
        {id: id},
        function(data) {
          if (data.response === 'OK') {
            $("#phone" + id).replaceWith('');
          } else {
            alert('Ooop!');
          }
        },
        'json'
      ).fail(function() {
        alert('Ooop!');
      });
    }
  });
});