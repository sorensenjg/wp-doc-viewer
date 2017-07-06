<?php

 /**
  * Plugin Name: docViewer
  * Plugin URI: https://sorensenjg.com/docViewer
  * Description: A document viewer for wordpress that handles jpg, png, gif, pdf, doc, xls and ppt files
  * Version: 1.0.0
  * Author: Justin Sorensen
  * Author URI: https://sorensenjg.com
  * License: GPL2
  */

  add_action('wp_enqueue_scripts', 'docViewer_enqueue_scripts');
  function docViewer_enqueue_scripts() {
      if (!wp_script_is( 'jquery.magnific-popup.min.js', 'enqueued' )) {
        wp_enqueue_style( 'magnific-popup', plugins_url( '/css/vendor/magnific-popup.css', __FILE__ ) );
        wp_enqueue_script( 'magnific-popup', plugins_url( '/js/vendor/jquery.magnific-popup.min.js', __FILE__ ), array('jquery'), '20170329', true );
        wp_enqueue_style( 'docViewer', plugins_url( '/css/docViewer.css', __FILE__ ) );
        wp_enqueue_script( 'docViewer', plugins_url( '/js/docViewer.js', __FILE__ ), array('jquery'), '20170329', true );
      } else {
        wp_enqueue_style( 'docViewer', plugins_url( '/css/docViewer.css', __FILE__ ) );
        wp_enqueue_script( 'docViewer', plugins_url( '/js/docViewer.js', __FILE__ ), array('jquery'), '20170329', true );
      }
  }

  // Display docViewer component
  function docViewer( $url, $name ) {

    ob_start();

    $url = $url;
    $name = $name;

    $file = basename($url);
    $filename = preg_replace('/\\.[^.\\s]{3,4}$/', '', $file);

    $file_info = new SplFileInfo($file);
    $file_type = $file_info->getExtension();

    if( $file_type == 'jpg' || $file_type == 'png' || $file_type == 'gif' ) {
      $content = '<img src="'. $url .'" />';
    } else {
      $content = '<iframe src="//drive.google.com/viewer?url='. $url .'&embedded=true"></iframe>';
    }

    $random_int = rand();

    if( $name ) {
      $name = $name;
    } else {
      $name = $filename;
    }

    ?>

      <a href="#<?php echo $filename; ?>-modal-<?php echo $random_int; ?>" class="docViewer-open"><?php echo $name; ?></a>

      <div id="<?php echo $filename; ?>-modal-<?php echo $random_int; ?>" class="docViewer mfp-hide">
        <div class="docViewer-inner">

          <div id="docViewer-header">
            <div class="docViewer-header-inner left">
              <label><?php echo $name; ?></label>
            </div>
            <div class="docViewer-header-inner right">
              <a href="<?php echo $url; ?>" download><i class="fa fa-download" aria-hidden="true"></i></a>
              <a href="javascript:void(0)" id="docViewer-close"><i class="fa fa-times" aria-hidden="true"></i></a>
            </div>
          </div>

          <div id="docViewer-body">
            <?php echo $content; ?>
            <div id="docViewer-controls" class="<?php echo $file_type; ?>">
              <div class="docViewer-controls-inner center">
                <input type="text" id="zoomVal" name="zoomVal" value="100%" />
                <div id="zoomOut"><i class="fa fa-search-minus" aria-hidden="true"></i></div>
                <div id="zoomIn"><i class="fa fa-search-plus" aria-hidden="true"></i></div>
                <div id="actualSize">Original Size</div>
                <div id="fitContainer">Fit on Screen</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    <?php

    return ob_get_clean();

    exit;


  }

  // Display docViewer component via shortcode
  function shortcode_docViewer( $atts ) {

    ob_start();

    $url = $atts['url'];
    $name = $atts['name'];

    $file = basename($url);
    $filename = preg_replace('/\\.[^.\\s]{3,4}$/', '', $file);

    $file_info = new SplFileInfo($file);
    $file_type = $file_info->getExtension();

    if( $file_type == 'jpg' || $file_type == 'png' || $file_type == 'gif' ) {
      $content = '<img src="'. $url .'" />';
    } else {
      $content = '<iframe src="//drive.google.com/viewer?url='. $url .'&embedded=true"></iframe>';
    }

    $random_int = rand();

    if( $name ) {
      $name = $name;
    } else {
      $name = $filename;
    }

    ?>

      <a href="#<?php echo $filename; ?>-modal-<?php echo $random_int; ?>" class="docViewer-open"><?php echo $name; ?></a>

      <div id="<?php echo $filename; ?>-modal-<?php echo $random_int; ?>" class="docViewer mfp-hide">
        <div class="docViewer-inner">

          <div id="docViewer-header">
            <div class="docViewer-header-inner left">
              <label><?php echo $name; ?></label>
            </div>
            <div class="docViewer-header-inner right">
              <a href="<?php echo $url; ?>" download><i class="fa fa-download" aria-hidden="true"></i></a>
              <a href="javascript:void(0)" id="docViewer-close"><i class="fa fa-times" aria-hidden="true"></i></a>
            </div>
          </div>

          <div id="docViewer-body">
            <?php echo $content; ?>
            <div id="docViewer-controls" class="<?php echo $file_type; ?>">
              <div class="docViewer-controls-inner center">
                <input type="text" id="zoomVal" name="zoomVal" value="100%" />
                <div id="zoomOut"><i class="fa fa-search-minus" aria-hidden="true"></i></div>
                <div id="zoomIn"><i class="fa fa-search-plus" aria-hidden="true"></i></div>
                <div id="actualSize">Original Size</div>
                <div id="fitContainer">Fit on Screen</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    <?php

    return ob_get_clean();

    exit;

  }

  // Expose shortcode
  add_shortcode( 'docViewer', 'shortcode_docViewer');
