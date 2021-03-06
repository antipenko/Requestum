<?php
    require __DIR__ . "/model.php";
?>

<!doctype html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Requestum Shop</title>
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<link rel="stylesheet" href="css/fonts.css">
	<link rel="stylesheet" href="css/app.css">
	<link rel="icon" href="favicon.png">
	<link rel="apple-touch-icon-precomposed" href="apple-touch-icon.png">
</head>

	<main>
		<div class="row clearfix">
			<ul class="products clearfix" id="products">
                <?php foreach (getItems(1, 4) as $item): ?>
                <li class="product-wrapper " >
                    <div class="product">
                        <a href="#" class="product_link">
                            <img src="<?php echo $item['img']; ?>" alt="<?php echo $item['title']; ?>" class="product_img">
                            <h2 class="product_title"><?php echo $item['title']; ?></h2>
                        </a>
                        <p class="product_description"><?php echo $item['description']; ?></p>
                        <div class="product-price">
                                <?php
                                    if ($item['discountCost'] !== null){
                                        echo "<span class='product-price__main'>$" . $item['discountCost'] . "</span>";
                                        echo "<del class='product-price__old'>$" . $item['cost'] ." </del>";
                                    } else{
                                        echo "<span class='product-price__main'> $" . $item['cost'] ." </span>";
                                    }
                                ?>
                        </div>
                        <p class="product-buttons">
                            <button class="button button-add">add to cart</button>
                            <button class="button button-view">view</button>
                        </p>
                        <?php if ($item['discountCost'] !== null): ?>
                           <span class="product-label product-label_sale">
                               Sale
                           </span>
                        <?php endif; ?>
                        <?php if ($item['new']): ?>
                            <span class="product-label product-label_new">
                               New
                           </span>
                        <?php endif; ?>
                    </div>
                </li>
                <?php endforeach; ?>
    </ul>

            <div class="text-center">
                <div class="loader" id="preloader" >
                    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 40 40 40" xml:space="preserve">
  <path opacity="0.4" fill="#ed1111" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                        <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
                            <animateTransform attributeType="xml"
                                              attributeName="transform"
                                              type="rotate"
                                              from="0 20 20"
                                              to="360 20 20"
                                              dur="0.5s"
                                              repeatCount="indefinite"/>
                        </path>
  </svg>
                </div>

                <button class="button button-load" id="loadProducts" >Load more</button>
            </div>
		</div>
	</main>

    <footer class="footer row">
            <aside class="sidebar offer">
            <h2 class="sidebar-title">hot offers</h2>
            <p class="sidebar-text">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
                Suspendisse sollicitudin velit sed leo.
                Ut pharetra augue nec augue. Nam elit magna, hend.
            </p>
            <ul class="offer-list">
                <li class="offer-list__item">
                    Vestibulum ante ipsum primis in faucibus orci luctus
                </li>
                <li class="offer-list__item">
                    Nam elit magna hendrerit sit amet tincidunt ac
                </li>
                <li class="offer-list__item">
                    Quisque diam lorem interdum vitae dapibus ac scele
                </li>
                <li class="offer-list__item">Donec eget tellus non erat lacinia fermentum</li>
                <li class="offer-list__item">
                    Donec in velit vel ipsum auctor pulvin
                </li>
            </ul>
        </aside>

            <aside class="sidebar offer">
            <h2 class="sidebar-title">hot offers</h2>
            <p class="sidebar-text">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
                Suspendisse sollicitudin velit sed leo.
                Ut pharetra augue nec augue. Nam elit magna, hend.
            </p>
            <ul class="offer-list">
                <li class="offer-list__item">
                    Vestibulum ante ipsum primis in faucibus orci luctus
                </li>
                <li class="offer-list__item">
                    Nam elit magna hendrerit sit amet tincidunt ac
                </li>
                <li class="offer-list__item">
                    Quisque diam lorem interdum vitae dapibus ac scele
                </li>
                <li class="offer-list__item">Donec eget tellus non erat lacinia fermentum</li>
                <li class="offer-list__item">
                    Donec in velit vel ipsum auctor pulvin
                </li>
            </ul>
</aside>

            <aside class="sidebar contact">
            <h2 class="sidebar-title">Store information</h2>

            <ul class="contact-list">
                <li class="contact-list__item clearfix">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    <span>Company Inc., 8901 Marmora Road, Glasgow, D04 89GR </span>
                </li>
                <li class="contact-list__item clearfix">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    <span>Call us now toll free: (800) 2345-6789</span>
                </li>
                <li class="contact-list__item clearfix">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    <span>
                        Customer support: support@example.com
                        Press: pressroom@example.com
                    </span>
                </li>
                <li class="contact-list__item clearfix">
                    <i class="fa fa-skype" aria-hidden="true"></i>
                    <span>Skype: sample-username </span>
                </li>
            </ul>
</aside>

    </footer>

	<script src="js/jquery.min.js"></script>
	<script src="js/app.js"></script>
<!--	<script src="js/all.min.js"></script>-->
</body>
</html>
