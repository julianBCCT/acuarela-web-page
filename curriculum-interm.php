<?php include 'includes/head.php' ?>
  <body class="curriculum">
   <?php 
   $dark = 1;
      include 'includes/header.php';
    ?>
    <div class="curriculum-banner">
      <div class="txt">
        <h1>
          Curriculum Semanal
          <span class="underlinetxt">intermedio</span>
        </h1>
        <p>
        Orientado a educadoras, proveedoras de cuidado y estudiantes de educación
        infantil, cuenta con una canción semanal, una librería con géneros literarios que se
        destacan en: cuentos, historietas, poesías,  versos, adivinanzas, lecturas interesantes
        y trabalenguas, pone a disposición veinte actividades cuatro para cada día.
        </p>
        <span class="price">$179.00/Anual</span>
        <a href="" class="btn btn-blue">OBTENER</a>
      </div>
      <div class="video">
        <video src="video/video.mp4" autobuffer preload="auto">
          <source type="video/mp4" src="video/video.mp4" />
        </video>
      </div>
    </div>
    <section class="suscribirse">
      <div class="txt">
        <h3>Mi Daycare debe suscribirse a este curriculum si...</h3>
        <ul>
          <li>
            <img src="img/asterisc.svg" alt="asterisc" /> Característica 1
          </li>
          <li>
            <img src="img/asterisc.svg" alt="asterisc" /> Característica 2
          </li>
          <li>
            <img src="img/asterisc.svg" alt="asterisc" /> Característica 3
          </li>
          <li>
            <img src="img/asterisc.svg" alt="asterisc" /> Característica 4
          </li>
        </ul>
        <a href="" class="btn btn-blue">SUSCRIBIRME</a>
      </div>
      <img src="img/ventajas.jpg" alt="ventajas" class="img-ventajas" />
    </section>
    <section>
      <ul class="curriculum-slide">
        <li>
          <img src="img/file.svg" alt="file" />
          <h4>AHORRA TIEMPO Y DINERO</h4>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
        </li>
        <li>
          <img src="img/filetext.svg" alt="filetext" />
          <h4>NO MÁS ESTRÉS</h4>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
        </li>
        <li>
          <img src="img/FloppyDisk.svg" alt="FloppyDisk" />
          <h4>CURRICULUMS BILINGUES</h4>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
        </li>
        <li>
          <img src="img/file.svg" alt="file" />
          <h4>OFRECE UN MEJOR SERVICIO A LOS PADRES</h4>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
        </li>
        <li>
          <img src="img/filetext.svg" alt="filetext" />
          <h4>DIGITAL Y DE FÁCIL ACCESO</h4>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
        </li>
        <li>
          <img src="img/filetext.svg" alt="filetext" />
          <h4>DIGITAL Y DE FÁCIL ACCESO</h4>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
        </li>
      </ul>
    </section>
    <section class="tabs-container">
      <img src="img/valor.png" alt="valor" />
      <div class="tab ">
        
        <button class="tablinks active" onclick="openCity(event, 'SUSCRIBIRTE')">
        SUSCRÍBETE
        </button>
        <button class="tablinks" onclick="openCity(event, 'DUDAS')">
        ¿TIENES DUDAS?
        </button>
      </div>

      <div id="SUSCRIBIRTE" class="tabcontent active">
        <h4 class="price">$179.00/Anual</h4>

        <a href="" class="btn btn-blue">PAGAR
</a>
      </div>
      </div>
      <div id="DUDAS" class="tabcontent">
        <?php 
        $title=0;
        include 'includes/form-llamada.php' ?>
       
      </div>
    </section>
  <?php include 'includes/footer.php' ?>