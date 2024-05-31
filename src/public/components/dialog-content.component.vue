<script>
export default {
  name: 'dialog-content',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
    handleClick() {
      this.$emit('close');
      document.body.classList.remove('no-scroll');
    }
  }
};
</script>

<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog">
      <div style="display: flex; justify-content: flex-end;">
        <pv-button @click="closeDialog">
          <img src="../../../public/toolbar/close-icon.png" height="30" width="30"/>
        </pv-button>
      </div>
      <div class="dialog-container">
        <h1>Inicia Sesión o Regístrate</h1>
        <p>
          ¡Para ofertar, publir un anuncio o adquirir una suscripción, necesitas haber iniciado sesión primero!
          Regístrate en solo 5 segundos y accede a un control total sobre tus anuncios, así como la posibilidad de ofertar.
        </p>
        <div style="display: grid;">
          <router-link to="/log-in" @click.native="handleClick">
            <pv-button class="b-login-dialog"><b>Iniciar sesión</b></pv-button>
          </router-link>
          <router-link to="/register" @click.native="handleClick">
            <pv-button class="b-register-dialog"><b>Registrate</b></pv-button>
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
