// function to calculate subtotal
var calculateSub = function (ele) { 
  var unitPrice = parseFloat($(ele).find('.price input').val());
  var unitQty = parseFloat($(ele).find('.qty input').val());

  var subT = unitPrice * unitQty;
  $(ele).children('.subT').html(subT);

  return subT;
}
//function for sum
var sum = function (acc, x) { return acc + x; };

//function for total price
var updateTotalPrice = function () { 
  var subTotal = [];

  $('tbody tr').each(function (i, ele) {
    var subT = calculateSub(ele); 
    subTotal.push(subT);
  });

  var overallTotalValue = subTotal.reduce(sum);
  $('#totalValue').html(overallTotalValue);
}

$(document).ready(function () {
  updateTotalPrice();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updateTotalPrice();
  });

  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotalPrice();
    }, 1000);
  });

  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    var name = $(this).children('[name=name]').val();
    var price = $(this).children('[name=price]').val();
    var qty = $(this).children('[name=qty]').val();
    
    $('tbody').append('<tr>' +
      '<td class="name">' + name + '</td>' +
      '<td class="price"><input type="number" value="' + price + '" /></td>' +
      '<td class="qty"><input type="number" value="' + qty + '" /></td>' +
      '<td class="subT"></td>' +
      '<td><button class="btn btn-danger btn-sm remove">remove</button></td>' +
    '</tr>');

    updateTotalPrice();
    $(this).children('[name=name]').val('');
    $(this).children('[name=price]').val('');
    $(this).children('[name=qty]').val('');
  });
});
