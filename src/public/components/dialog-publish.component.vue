<script>
export default {
  name: "dialog-publish",
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('close');
      document.body.classList.remove('no-scroll');
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    scrollToTopAndHandle(){
      this.scrollToTop();
      this.handleClick();
    }
  }
}
</script>

<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog">
      <div class="dialog-container">
        <h1>¡Publicación exitosa!</h1>
        <p>
          Muchas gracias por publicar tu nuevo interCambio, recibirás un correo electrónico con los detalles de tu publicación.
        </p>
        <div style="display: grid;">
          <router-link to="/home" @click.native="scrollToTopAndHandle" >
            <pv-button class="b-login-dialog"><b>Confirmar</b></pv-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

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

.dialog-container {
  padding: 1rem;
  text-align: center;
}

.dialog-container h1 {
  font-size: 30px;
  font-weight: bolder;
  padding-bottom: 1rem;
}

.dialog-container p {
  font-size: 20px;
  padding-bottom: 2rem;
}

.b-login-dialog {
  background-color: #FFD146;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  width: 200px;
  color: #000;
  transition: 0.43s;
  justify-content: center;
  margin-bottom: 1rem;
}

.b-login-dialog:hover {
  background-color: #000;
  color: #FFD146;
}

.b-register-dialog {
  background-color: #fff;
  border: 4px solid #FFD146;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  width: 200px;
  color: #000;
  transition: 0.43s;
  justify-content: center;
}

.b-register-dialog:hover {
  color: #FFD146;
}
</style>