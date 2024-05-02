<script>
export default{
  name: 'help-content',
}
</script>

<template >
  <div class="help-container" style="background-color: #F8F7F4">
    <br>
    <br>
    <br>
    <div class="help-title">
      <h1 class="yellow-text">Ayuda</h1>
      <h2>¡Aprende a cómo utilizar CambiaZo!</h2>
    </div>
    <div class="help-sub-text">
      <p>
        ¡Bienvenido a CambiaZo! Aquí encontrarás una guía diseñada para ayudarte a sacar el máximo provecho
        de nuestra plataforma. Sobre cómo publicar un anuncio efectivo, estamos aquí para guiarte en cada
        paso del camino. ¡Comienza tu viaje con CambiaZo hoy mismo y descubre cómo hacer trueques de manera
        fácil y exitosa!
      </p>
    </div>
    <div class="help-main-text">
      <h2 class="yellow-text">¿Cuál es el significado de un intercambio?</h2>
      <p>
        Un intercambio supone el otorgamiento de bienes o servicios a otros bienes o servicios, sin la implicación de dinero como medio de valor en la transacción, a diferencia de una compra o venta habitual.
        A continuación, le brindamos los consejos más relevantes para informar sobre un intercambio.
      </p>
      <ol>
        <li>
          Haga clic en <b>"Publicar"</b>.
        </li>
        <li>
          El título de tu intercambio es fundamental, ya que deberá tener en cuenta términos relevantes
          que los usuarios buscarían para localizar lo que ofreces. Asimismo, el título debe ser atractivo
          para despertar la interés y motivar a los usuarios a explorar más acerca de tu oferta.
        </li>
        <li>
          La explicación del intercambio debe enfocar diversos aspectos relacionados con lo que se ofrece.
          Se recomienda señalar <b>Qué se espera a cambio</b> y proporcionar un <b>Valor Aproximado</b> al publicar el
          intercambio, de modo que ambas partes queden satisfechas. También es posible tener en cuenta la
          posibilidad de aceptar una parte del intercambio en efectivo. Cuanto más palabras clave incluyas,
          será más sencillo encontrar tu anuncio a través de diversas combinaciones de términos, tanto en
          el buscador de Cambiazo como en los motores de búsqueda como Google.
        </li>
        <li>
          Para obtener imágenes, seleccione la sección "Añadir Imágenes". Es fundamental contar con
          imágenes, ya que estas brindan información visual relevante para los usuarios. Por ejemplo,
          puedes describir un artículo como "en perfecto estado", pero si no se muestra en imágenes,
          los usuarios pueden inquietarse por su situación.
        </li>
        <li>
          Para fomentar la presencia de tu intercambio y atraer a más usuarios, puedes compartirlo en foros,
          blogueros, redes sociales como Facebook, Twitter, Instagram, entre otros. No solo aumentarás tu
          audiencia, sino que también incrementará el posicionamiento de tus anuncios en Google si están
          enlazados desde otras páginas web.
        </li>
        <li>
          Es fundamental evitar la duplicación del texto en un anuncio debido a diversas causas: Google
          respalda el contenido duplicado, lo cual podría tener un impacto en la visibilidad de tus
          anuncios en las búsquedas de los usuarios. Asimismo, en Cambiazo no se permite la repetición
          del mismo anuncio; si se detecta, será eliminado por nuestro equipo y se bloqueará la cuenta
          del usuario. Asimismo, los usuarios tienden a confiar en los intercambios duplicados, debido
          a que esto puede estar relacionado con actividades ilegales. En resumen, considere la calidad
          sobre la cantidad al publicar tus anuncios.
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>

.help-title{
  text-align: center;
  padding: 6rem 3rem 3rem 3rem;
  font-size: 50px;
  font-weight: 900;
}

.help-title h1{
  font-size: 60px;
  padding-bottom: 1rem;
}

.yellow-text{
  color: #FFD146;
}

.help-sub-text{
  margin: 0rem 15rem 0rem 15rem;
  padding: 2rem;
  text-align: center;
}

.help-main-text{
  margin: 0rem 12rem 0rem 12rem;
  padding-bottom: 6rem;
}

.help-main-text h2{
  font-size: 30px;
  font-weight: 900;
  padding-top: 3rem;
  padding-bottom: 2rem;
}

.help-main-text p{
  text-align: justify;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.help-main-text ol{
  text-align: justify;
  list-style: decimal;
  padding: 1.5rem;
}

.help-main-text ol li{
  margin: 1rem 0rem 1rem 0rem;
}

@media screen and (max-width: 880px) {
  .help-title h1{
    font-size: 45px;
  }
  .help-title h2{
    font-size: 40px;
  }
  .help-sub-text,
  .help-main-text{
    margin: 0rem;
    padding: 3rem;
  }

  .help-main-text h2{
    padding-top: 1rem
  }

}

</style>