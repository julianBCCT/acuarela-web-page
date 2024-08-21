<?php include 'head.php'; ?>
<header class="header container">
      <a href="/">
        <img class="header__logo" src="img/logo.svg" alt="Acuarela" />
      </a>
      <img
        class="header__toggle"
        src="img/menu.svg"
        alt="Acuarela"
        onclick="toggleTarget('mobile-menu')"
      />
      <nav class="header__menu">
        <a class="header__menu-item" href="sobre-nosotros">Nosotros</a>
        <a class="header__menu-item" href="planes-precios">Planes y Precios</a>
        <a class="header__menu-item" href="preguntas-frecuentes">Preguntas Frecuentes</a>
        <a class="header__menu-item invitation" href="https://bilingualchildcaretraining.com/miembros/crear-cuenta">Crea tu cuenta gratis</a>
      </nav>
      <!--<div class="header__actions">
                <div class="lang-selector">
                    <label for="lang-select">
                        <img
                            class="lang-selector__flag"
                            src="img/flag_es.svg"
                        />
                    </label>
                    <select
                        name="lang-select"
                        id="lang-select"
                        class="lang-selector__select"
                    >
                        <option value="ES">ES</option>
                        <option value="EN">EN</option>
                    </select>
                    <label for="lang-select">
                        <i class="icon-arrow-down"></i>
                    </label>
                </div>
                <button
                    class="btn btn--transparent btn--transparent-border btn--sm"
                >
                    <span class="btn__text">Inicia Sesión</span>
                </button>
                <button class="btn btn--primary btn--sm">
                    <span class="btn__text">Regístrate</span>
                </button>
            </div>!-->
    </header>
    <div class="mobile-menu" data-toggle="mobile-menu">
      <div class="mobile-menu__header">
        <img class="header__logo" src="img/logo.svg" alt="Acuarela" />
        <i
          class="header__toggle icon-cross"
          onclick="toggleTarget('mobile-menu')"
        ></i>
      </div>
      <div class="mobile-menu__body">
        <nav class="mobile-menu__menu">
          <a class="mobile-menu__menu-item" href="sobre-nosotros">Nosotros</a>
          <a class="mobile-menu__menu-item" href="planes-precios">Planes y Precios</a>
          <a class="mobile-menu__menu-item" href="preguntas-frecuentes">Preguntas Frecuentes</a>
          <a class="mobile-menu__menu-item invitation" href="https://bilingualchildcaretraining.com/miembros/crear-cuenta">Crea tu cuenta gratis</a>
        </nav>
        <!--<div class="mobile-menu__actions">
          <div class="lang-selector">
            <label for="lang-select">
              <img class="lang-selector__flag" src="img/flag_es.svg" />
            </label>
            <select
              name="lang-select"
              id="lang-select"
              class="lang-selector__select"
            >
              <option value="ES">ESPAÑOL</option>
              <option value="EN">ENGLISH</option>
            </select>
            <label for="lang-select">
              <i class="icon-arrow-down"></i>
            </label>
          </div>
          <button class="btn btn--transparent btn--transparent-border btn--sm">
            <span class="btn__text">Inicia Sesión</span>
          </button>
          <button class="btn btn--primary btn--sm">
            <span class="btn__text">Regístrate</span>
          </button>
        </div>!-->
      </div>
    </div>