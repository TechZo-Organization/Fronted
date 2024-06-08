<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog">
      <div style="display: flex; justify-content: flex-end;">
        <button @click="closeDialog">
          <img src="../../../public/toolbar/close-icon.png" height="30" width="30"/>
        </button>
      </div>
      <div class="dialog-container-offer">
        <h1>¡FELICIDADES!</h1>
        <div class="user-info-offer">
          <p>Estamos muy contentos de que hayas completado de manera exitosa este CambiaZo. Le haremos saber a {{ data.name }} que aceptaste la oferta recibida.</p>
          <div class="contact-info-offer">
            <div class="user-image">
              <img :src="data.img" alt="User Image" class="user-image"/>
            </div>
            <div class="contact-info-offer-detail">
              <h2>Información de Contacto de {{data.name}}:</h2>

              <button @click="sendWhatsapp"  class="button-whatsapp">WhatsApp</button>

              <button @click="sendEmail" class="button-email">Correo Electrónico</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dialog-accepted-offer',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    data: { // Nueva prop para los datos del usuario
      type: Object,
      required: true
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },

    sendWhatsapp(){
      const phone = this.data.phone;
      const message = encodeURIComponent("Hola, soy el usuario de CambiaZo con el que hiciste el intercambio. ¿Cuándo podríamos hacer la entrega?");
      const whatsappLink = `https://wa.me/${phone}?text=${message}`;
      window.open(whatsappLink, "_blank");

    },

    sendEmail(){
      const email = this.data.email;
      const subject = "Intercambio en CambiaZo";
      const body = encodeURIComponent("Hola, soy el usuario de CambiaZo con el que hiciste el intercambio. ¿Cuándo podríamos hacer la entrega?");
      const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
    }
  }
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.dialog {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;
  margin: 1rem;
}

.dialog-container-offer {
  padding: 1rem;
  text-align: center;
}

.dialog-container-offer h1 {
  font-size: 30px;
  font-weight: bolder;
  padding-bottom: 1rem;
}

.dialog-container-offer p {
  font-size: 20px;
  padding-bottom: 2rem;
}


.more-info-detail h3{
  font-family: 'Montserrat', sans-serif;
  text-align: left;
  font-size: 2.5vh;
  line-height: 2.5vh;
}

.dialog-title h1{
  font-family: inherit;
  font-weight: bolder;
  font-size: 8vh;
  line-height: 8vh;
}

.dialog-actions button, .dialog-actions a{
  width: 100%;
  margin: 0.2rem;
  font-weight: bolder;
  font-family: inherit;
  transition: 1s;
}

.button-whatsapp{
  color: #00d540;
  background-color: transparent;
  border:solid 3px #00d540;
  padding:5px;
  font-weight: bold;
  width: 70%;
  transition: 1s;
}
.button-whatsapp:hover{
  color: #ffffff;
  background-color: #00d540;
  border:solid 3px #00d540;
  transform: scale(1.02);
}
.button-email{
  color: #61b4e3;
  font-weight: bold;
  background-color: transparent;
  border:solid 3px #61b4e3;
  width: 70%;
  transition: 1s;
  padding:5px;
}
.button-email:hover{
  color: #ffffff;
  background-color: #61b4e3;
  border:solid 3px #61b4e3;
  transform: scale(1.02);
}
.contact-info-offer{
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.contact-info-offer-detail{
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  text-align: center;
  max-width: 450px;
  width: 100%;
  gap:15px;
}
.contact-info-offer-detail h2{
  font-size: 18px;
  font-weight:bold;
}
.user-image img{
  width:100%;
  height: 100%;
  border-radius: 50%;
  object-position: center;
  object-fit: cover;
}

.user-image {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
}

@media(max-width:850px){
  .dialog-title h1{
    font-size: 4vh;
    line-height: 4vh;
  }
  .dialog-content{
    font-size: 2vh;
    line-height: 2vh;
  }
  .more-info-detail h3{
    font-size: 2vh;
    line-height: 2vh;
  }

  .button-email, .button-whatsapp{
    width: 75%;
  }

  .contact-info-offer{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .user-image {
    align-self: center;
    align-items: center;
    text-align: center;
    width: 80px;
    height: 80px;
  }
}


</style>
