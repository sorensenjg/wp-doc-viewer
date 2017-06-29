(function($) {
  "use strict";

  // comment for commit

  $(window).load(function() {

    fitWindow('.docViewer', '', false);
    fitWindow('#docViewer-body', '#docViewer-controls', true);

    var zoomValue = 1;

    $('#docViewer-controls #zoomOut').on('click', function() {

      if (zoomValue >= 0.2) {
        zoomValue -= 0.1;
      }

      var img = $('#docViewer-body img');
      var refH = img.parent().outerHeight(true);
      var refW = img.parent().outerWidth(true);
      var refRatio = refW / refH;
      var storeImage = new Image();
      storeImage.src = img.attr("src");
      var actualWidth = storeImage.width;
      var actualHeight = storeImage.height;
      var newWidth = actualWidth * zoomValue;
      var newHeight = actualHeight * zoomValue;

      if (zoomValue >= 1 && (actualWidth / actualHeight) > refRatio) {
        img.css({
          'position': 'relative',
          'top': 'auto',
          'left': 'auto',
          'transform': 'translateX(0)translateY(0)',
          'width': newWidth + 'px',
          'height': newHeight + 'px'
        });
        img.parent().scrollTop((newHeight - img.parent().height()) / 2).scrollLeft((newWidth - img.parent().width()) / 2);
      } else {
        img.css({
          'position': 'absolute',
          'top': '50%',
          'left': '50%',
          'transform': 'translateX(-50%)translateY(-50%)',
          'width': newWidth + 'px',
          'height': newHeight + 'px'
        });
        img.parent().scrollTop(0).scrollLeft(0);
      }
      $('#docViewer-controls #zoomVal').val(Math.round(zoomValue * 100) + '%');
    });

    $('#docViewer-controls #zoomIn').on('click', function() {
      zoomValue += 0.1;

      var img = $('#docViewer-body img');
      var refH = img.parent().outerHeight(true);
      var refW = img.parent().outerWidth(true);
      var refRatio = refW / refH;
      var storeImage = new Image();
      storeImage.src = img.attr("src");
      var actualWidth = storeImage.width;
      var actualHeight = storeImage.height;
      var newWidth = actualWidth * zoomValue;
      var newHeight = actualHeight * zoomValue;

      if (zoomValue >= 1 && (actualWidth / actualHeight) > refRatio) {
        img.css({
          'position': 'relative',
          'top': 'auto',
          'left': 'auto',
          'transform': 'translateX(0)translateY(0)',
          'width': newWidth + 'px',
          'height': newHeight + 'px'
        });
        img.parent().scrollTop((newHeight - img.parent().height()) / 2).scrollLeft((newWidth - img.parent().width()) / 2);
      } else {
        img.css({
          'position': 'absolute',
          'top': '50%',
          'left': '50%',
          'transform': 'translateX(-50%)translateY(-50%)',
          'width': newWidth + 'px',
          'height': newHeight + 'px'
        });
        img.parent().scrollTop(0).scrollLeft(0);
      }
      $('#docViewer-controls #zoomVal').val(Math.round(zoomValue * 100) + '%');
    });

    $('#docViewer-controls #actualSize').on('click', function() {
      zoomValue = 1;

      var img = $('#docViewer-body img');
      var refH = img.parent().outerHeight(true);
      var refW = img.parent().outerWidth(true);
      var refRatio = refW / refH;
      var storeImage = new Image();
      storeImage.src = img.attr("src");
      var actualWidth = storeImage.width;
      var actualHeight = storeImage.height;
      var newWidth = actualWidth * zoomValue;
      var newHeight = actualHeight * zoomValue;

      if (zoomValue >= 1 && (actualWidth / actualHeight) > refRatio) {
        img.css({
          'position': 'relative',
          'top': 'auto',
          'left': 'auto',
          'transform': 'translateX(0)translateY(0)',
          'width': newWidth + 'px',
          'height': newHeight + 'px'
        });
        img.parent().scrollTop((newHeight - img.parent().height()) / 2).scrollLeft((newWidth - img.parent().width()) / 2);
      } else {
        img.css({
          'position': 'absolute',
          'top': '50%',
          'left': '50%',
          'transform': 'translateX(-50%)translateY(-50%)',
          'width': newWidth + 'px',
          'height': newHeight + 'px'
        });
        img.parent().scrollTop(0).scrollLeft(0);
      }
      $('#docViewer-controls #zoomVal').val(Math.round(zoomValue * 100) + '%');
    });

    $('#docViewer-controls #fitContainer').on('click', function() {

      var img = $('#docViewer-body img');
      var refH = img.parent().outerHeight(true);
      var refW = img.parent().outerWidth(true);
      var refRatio = refW / refH;
      var storeImage = new Image();
      storeImage.src = img.attr("src");
      var actualWidth = storeImage.width;
      var actualHeight = storeImage.height;

      if ((actualWidth / actualHeight) < refRatio) {
        img.css({
          'width': 'auto',
          'height': '100%'
        });
      } else {
        img.css({
          'width': '100%',
          'height': 'auto'
        });
      }

      zoomValue = (Math.ceil((((img.width() / actualWidth) * 100) / 10)) * 10) / 100;

      $('#docViewer-controls #zoomVal').val(Math.round((img.width() / actualWidth) * 100) + '%');
    });

    $('#docViewer-controls #docViewer-print').on('click', function() {
      printElem($('#docViewer-body img').attr('src'));
    });

    $(document).on('click', '.docViewer-open', function(e) {
      e.preventDefault();
      var modal_link = $(this).attr('href');
      $.magnificPopup.open({
        items: {
          src: modal_link,
          type: 'inline'
        },
        mainClass: 'mfp-docViewer',
        showCloseBtn: false,
        closeOnBgClick: false
      });
      fitWindow('.docViewer', '', false);
      fitWindow('#docViewer-body', '#docViewer-header', true);
    });

    $(document).on('click', '#docViewer-close', function() {
      $.magnificPopup.close();
    });

  });

  function fitWindow(target, header, container = false) {

    if (target === undefined || target === null) {
      console.log('fitWindow needs a target selector to work! -- fitWindow( target, header )');
      return false;
    }

    if (container) {
      var containerH = jQuery(target).parent().outerHeight(true);
    } else {
      var containerH = jQuery(window).innerHeight();
    }

    if (header) {
      var headerH = jQuery(header).outerHeight(true);
      var elementH = containerH - headerH;
      jQuery(target).css({
        'top': headerH + 'px',
        'height': elementH + 'px'
      });
    } else {
      var elementH = containerH;
      jQuery(target).css({
        'height': elementH + 'px'
      });
    }

    // console.log(target + ' now has a height of: ' + elementH + 'px');
  }

  function printElem(src) {
    var printwindow = window.open('', 'PRINT', 'height=400,width=600');

    printwindow.document.write('<html><head><title>' + document.title + '</title>');
    printwindow.document.write('</head><body>');
    printwindow.document.write('<h1>' + document.title + '</h1>');
    // printwindow.document.write(document.getElementById(elem));
    printwindow.document.write('<img src="' + src + '" />');
    printwindow.document.write('</body></html>');

    printwindow.document.close(); // necessary for IE >= 10
    printwindow.focus(); // necessary for IE >= 10*/

    printwindow.print();
    printwindow.close();

    return true;
  }

})(jQuery);
