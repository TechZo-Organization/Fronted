<script>
export default{
  name: 'contact-us-content',
  data() {
    return {
      name: '',
      email: '',
      cellphone: '',
      comment: '',
      accept: false,
    };
  },
  methods:{
    showConfirmation() {
      alert("Gracias papu");
    }
  }
}
</script>

<template>
  <div class="contact-container" style="background-color: #F8F7F4">
    <br>
    <br>
    <br>
    <div class="contact-title">
      <h1 class="yellow-text">Comunícate con nosotros</h1>
      <h2>¿Como podemos Ayudarte?</h2>
    </div>
    <div class="contact-sub-text">
      <p>
        ¿Tienes alguna pregunta, sugerencia o comentario? ¡Nos encantaría escucharte!
        Completa el formulario a continuación y nos pondremos en contacto contigo lo antes
        posible. Tu opinión es importante para nosotros.
      </p>
    </div>
    <div class="contact-main-form">
      <form @submit.prevent="showConfirmation">
        <label for="name"><b>Nombre: </b></label><br>
        <pv-input required id="name" v-model="name" type="text" aria-describedby="username-help" class="input"/><br>

        <label for="email"><b>Correo Electronico: </b></label><br>
        <pv-input required id="email" v-model="email" type="email" aria-describedby="username-help" class="input"/><br>

        <label for="cellphone"><b>Teléfono: </b></label><br>
        <pv-input required id="cellphone" v-model="cellphone" type="text" aria-describedby="username-help" class="input"/><br>

        <label for="comment"><b>Comentario: </b></label><br>
        <pv-input id="comment" v-model="comment" type="text" aria-describedby="username-help" class="input comment" style="vertical-align: top;"/><br>

        <pv-checkbox required v-model="accept" :binary="true" class="check-b"/>
        <label for="accept"><b>Acepto la Politica de Privacidad y las Condiciones de Uso</b></label>
        <div style="text-align: center;">
          <pv-input type="submit" class="b-send">ENVIAR</pv-input>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

.contact-title{
  text-align: center;
  padding: 6rem 3rem 3rem 3rem;
  font-size: 50px;
  font-weight: 900;
}

.contact-title h1{
  font-size: 60px;
  padding-bottom: 1rem;
}

.yellow-text{
  color: #FFD146;
}

.contact-sub-text{
  margin: 0rem 15rem 0rem 15rem;
  padding: 2rem;
  text-align: center;
}

.contact-main-form {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0rem 8rem 0rem;
}

.contact-main-form form{
  border: 1px solid #d8d8d8;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 0px #a1a1a1;
  padding: 5rem;
  background-color: #fff;
  width: 60%;
}

.input{
  width: 100%;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin: 0rem 0rem 1rem 0rem;
  border: 1px solid #c6c6c6;
  border-radius: 5px;
}

.comment{
  padding-bottom: 5rem;
}

.input:focus {
  outline: none;
}

.check-b{
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid #c6c6c6;
  border-radius: 5px;
  color: #FFD146;
  margin-right: 0.5rem;
  font-size: 20px;
  font-weight: 900;
}

.b-send{
  background-color: #FFD146;
  padding: 1rem 5rem 1rem 5rem;
  margin-top: 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.43s;
}

.b-send:hover{
  background-color: #000;
  color: #FFD146;
}

@media screen and (max-width: 880px) {
  .contact-title h1{
    font-size: 45px;
  }
  .contact-title h2{
    font-size: 40px;
  }
  .contact-sub-text{
    margin: 0rem;
    padding: 3rem;
  }

  .contact-main-form form{
    padding: 3.5rem 2rem 3.5rem 2rem;
    width: 85%;
  }
}


</style>