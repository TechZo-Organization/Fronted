<script>
export default{
  name: 'privacy-policies-content',
}
</script>

<template>
  <div class="privacy-container" style="background-color: #F8F7F4">
    <br>
    <br>
    <br>
    <div class="privacy-title">
      <h1 class="yellow-text">Política de Privacidad</h1>
      <h2>Tu Seguridad, Nuestra Prioridad</h2>
    </div>
    <div class="privacy-sub-text">
      <p>
        Esta Política de Privacidad describe cómo TechZo recopila, utiliza y protege
        la información personal de los usuarios de nuestra plataforma, de acuerdo con las
        leyes de protección de datos de la República del Perú.
      </p>
    </div>
    <div class="privacy-main-text">
      <h2 class="yellow-text">Información Personal Recopilada</h2>
      <p>
        Podemos recopilar información personal identificable, como su nombre, dirección
        de correo electrónico, dirección postal, número de teléfono, información de pago
        y cualquier otra información que usted nos proporcione voluntariamente al registrarse
        en nuestra plataforma o realizar transacciones en ella.
      </p>
      <h2 class="yellow-text">Uso de la Información</h2>
      <p>
        Utilizamos la información personal recopilada para los siguientes fines:
      </p>
      <ul class="list-text">
        <li>Procesar transacciones y brindar los servicios solicitados.</li>
        <li>Comunicarnos con usted con respecto a su cuenta y brindarle soporte al cliente.</li>
        <li>Personalizar su experiencia y brindarle contenido y ofertas específicas.</li>
        <li>Mejorar nuestra plataforma y desarrollar nuevos productos y servicios.</li>
        <li>Cumplir con nuestras obligaciones legales y proteger nuestros derechos legales.</li>
      </ul>
      <br>
      <h2 class="yellow-text">Compartir Información Personal</h2>
      <p>
        No compartimos, vendemos ni alquilamos su información personal a terceros, excepto
        en las siguientes circunstancias:
      </p>
      <ul class="list-text">
        <li>Con su consentimiento explícito.</li>
        <li>Con proveedores de servicios de confianza que nos ayudan a operar nuestra plataforma y brindar servicios.</li>
        <li>Cuando sea necesario para cumplir con las leyes y regulaciones aplicables, responder a solicitudes legales o proteger nuestros derechos legales.</li>
      </ul>
      <br>
      <h2 class="yellow-text">Protección de la Información Personal</h2>
      <p>
        Implementamos medidas de seguridad físicas, técnicas y administrativas para proteger
        su información personal contra accesos no autorizados, uso indebido, divulgación,
        alteración o destrucción.
      </p>
      <h2 class="yellow-text">Derechos de los Usuarios</h2>
      <p>
        Usted tiene derecho a acceder, corregir, actualizar o eliminar su información personal
        en cualquier momento. Puede ejercer estos derechos poniéndose en contacto con nosotros
        a través de los medios proporcionados en nuestra plataforma.
      </p>
      <h2 class="yellow-text">Cambios en la Política de Privacidad</h2>
      <p>
        Nos reservamos el derecho de actualizar o modificar esta Política de Privacidad en
        cualquier momento. Le notificaremos sobre cualquier cambio significativo mediante una
        notificación en nuestra plataforma o por otros medios que consideremos apropiados.
      </p>
      <h2 class="yellow-text">Contacto</h2>
      <p>
        Si tiene alguna pregunta o inquietud sobre esta Política de Privacidad, comuníquese con
        nosotros a través de los medios proporcionados en nuestra plataforma. Al utilizar nuestra
        plataforma, usted acepta y consiente el procesamiento de su información personal de acuerdo
        con esta Política de Privacidad y las leyes de protección de datos de la República del Perú.
      </p>
      <br>
    </div>
  </div>
</template>

<style scoped>

.privacy-title{
  text-align: center;
  padding: 6rem 3rem 3rem 3rem;
  font-size: 50px;
  font-weight: 900;
}

.privacy-title h1{
  font-size: 60px;
  padding-bottom: 1rem;
}

.yellow-text{
  color: #FFD146;
}

.privacy-sub-text{
  margin: 0rem 15rem 0rem 15rem;
  padding: 2rem;
  text-align: center;
}

.privacy-main-text{
  margin: 0rem 18rem 0rem 18rem;
  padding-bottom: 6rem;
}

.privacy-main-text h2{
  font-size: 30px;
  font-weight: 900;
  padding-top: 3rem;
  padding-bottom: 1rem;
}

.privacy-main-text p{
  text-align: justify;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
}

.list-text{
  text-align: justify;
  list-style: circle;
  margin-left: 1rem;
}

@media screen and (max-width: 880px) {
  .privacy-title h1{
    font-size: 45px;
  }
  .privacy-title h2{
    font-size: 40px;
  }
  .privacy-sub-text{
    margin: 0rem;
    padding: 3rem;
  }

  .privacy-main-text{
    margin: 0rem;
    padding: 1rem 3rem 3rem 3rem;
  }

  .privacy-main-text h2{
    padding-top: 1rem
  }

}

</style>