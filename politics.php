<?php include 'includes/header.php'; ?>
    <main class="container">
      <h1 class="politics__title"><?=$a->politics->title->rendered?></h1>
      <div class="info_politics">
       <?=$a->politics->content->rendered?>
      </div>
    </main>
<?php include 'includes/footer.php'; ?>