<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog">
      <div style="display: flex; justify-content: flex-end;">
        <pv-button @click="closeDialog">
          <img src="../../../public/toolbar/close-icon.png" height="30" width="30"/>
        </pv-button>
      </div>
      <div class="dialog-container">
        <h1>Código de Verificación</h1>
        <p>Ingresa el código enviado a su correo electrónico</p>
        <pv-input placeholder="- - - -" class="verify-code" v-model="code" maxlength="4"/>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <p style="padding-top:25px;">Ingrese el código de 4 dígitos</p>
          <pv-button @click="validateCode" class="b-login-dialog"><b>Verificar</b></pv-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogValidateCode',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      code: ''
    };
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
    validateCode() {
      if (this.code.length !== 4) {
        this.$emit('error', 'Código incorrecto');
      } else {
        this.$emit('validate', this.code);
        this.code = '';
      }
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

.verify-code{
  border: 1px solid #C2C2C2;
  width: 40%;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
  align-items: center;
  text-align: center;
  font-size: 30px;
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

.error-message {
  color: red;
  text-align: center;
  margin-top: 5px;
}
</style>