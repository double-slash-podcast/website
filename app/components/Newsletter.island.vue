<script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://sibforms.com/forms/end-form/build/sib-styles.css',
    },
  ],
  script: [
    {
      src: 'https://sibforms.com/forms/end-form/build/main.js',
      defer: true,
    },
  ],
});

onMounted(() => {
  window.LOCALE = 'fr';
  console.log(window);
  window.REQUIRED_CODE_ERROR_MESSAGE = 'Veuillez choisir un code pays';
  window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
    'Les informations que vous avez fournies ne sont pas valides. Veuillez vérifier le format du champ et réessayer.';

  window.REQUIRED_ERROR_MESSAGE = 'Vous devez renseigner ce champ. ';

  window.GENERIC_INVALID_MESSAGE =
    'Les informations que vous avez fournies ne sont pas valides. Veuillez vérifier le format du champ et réessayer.';

  window.translation = {
    common: {
      selectedList: '{quantity} liste sélectionnée',
      selectedLists: '{quantity} listes sélectionnées',
    },
  };
});

// var AUTOHIDE = Boolean(0);
</script>

<template>
  <div
    class="sib-form"
    style="text-align: center; background-color: transparent"
  >
    <div id="sib-form-container" class="sib-form-container">
      <div
        id="error-message"
        class="sib-form-message-panel"
        style="
          font-size: 16px;
          text-align: left;
          font-family: Inter, Arial, sans-serif;
          color: #661d1d;
          background-color: #ffeded;
          border-radius: 3px;
          border-color: #ff4949;
          max-width: 540px;
        "
      >
        <div
          class="sib-form-message-panel__text sib-form-message-panel__text--center"
        >
          <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
            <path
              d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"
            />
          </svg>
          <span class="sib-form-message-panel__inner-text">
            Nous n&#039;avons pas pu confirmer votre inscription.
          </span>
        </div>
      </div>
      <div />
      <div
        id="success-message"
        class="sib-form-message-panel"
        style="
          font-size: 16px;
          text-align: left;
          font-family: Inter, Arial, sans-serif;
          color: #085229;
          background-color: #e7faf0;
          border-radius: 3px;
          border-color: #13ce66;
          max-width: 540px;
        "
      >
        <div
          class="sib-form-message-panel__text sib-form-message-panel__text--center"
        >
          <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
            <path
              d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"
            />
          </svg>
          <span class="sib-form-message-panel__inner-text">
            Votre inscription est confirmée.
          </span>
        </div>
      </div>
      <div />
      <div
        id="sib-container"
        class="sib-container--large sib-container--vertical"
        style="
          text-align: center;
          background-color: rgba(0, 0, 0, 1);
          max-width: 540px;
          border-width: 0px;
          border-color: #c0ccd9;
          border-style: solid;
          direction: ltr;
        "
      >
        <form
          id="sib-form"
          method="POST"
          action="https://1762df9f.sibforms.com/serve/MUIFAC6hboARa2I-ABlyU2RhNZ0RqBClj_Pz5RJr2qxBDfNgf6Rb-axWTyZKsjvk9-gByn1ab9QZ_jXKnOpZudyR80YUuhUIJG6JifQai6uhQwscHDDMisHeynwN928Yu-0uA9lkYmifhZTQNTXXXOf3G0S2wUSac6twi02fMVvJYoZ0H4XriNX_Fy-CR7u-3AHqEqAQFTuF6ptc"
          data-type="subscription"
        >
          <div style="padding: 16px 0">
            <div class="sib-input sib-form-block">
              <div class="form__entry entry_block">
                <div class="form__label-row">
                  <label
                    class="entry__label"
                    style="
                      font-weight: 700;
                      text-align: left;
                      font-size: 16px;
                      text-align: left;
                      font-weight: 700;
                      font-family: Inter, Arial, sans-serif;
                      color: #ffffff;
                    "
                    for="NOM"
                    data-required="*"
                    >Entrez votre NOM</label
                  >

                  <div class="entry__field">
                    <input
                      id="NOM"
                      class="input"
                      maxlength="200"
                      type="text"
                      name="NOM"
                      autocomplete="off"
                      placeholder="NOM"
                      data-required="true"
                      required
                    >
                  </div>
                </div>

                <label
                  class="entry__error entry__error--primary"
                  style="
                    font-size: 16px;
                    text-align: left;
                    font-family: Inter, Arial, sans-serif;
                    color: #661d1d;
                    background-color: #ffeded;
                    border-radius: 3px;
                    border-color: #ff4949;
                  "
                />
              </div>
            </div>
          </div>
          <div style="padding: 16px 0">
            <div class="sib-input sib-form-block">
              <div class="form__entry entry_block">
                <div class="form__label-row">
                  <label
                    class="entry__label"
                    style="
                      font-weight: 700;
                      text-align: left;
                      font-size: 16px;
                      text-align: left;
                      font-weight: 700;
                      font-family: Inter, Arial, sans-serif;
                      color: #ffffff;
                    "
                    for="PRENOM"
                    data-required="*"
                    >Entrez votre PRENOM</label
                  >

                  <div class="entry__field">
                    <input
                      id="PRENOM"
                      class="input"
                      maxlength="200"
                      type="text"
                      name="PRENOM"
                      autocomplete="off"
                      placeholder="PRENOM"
                      data-required="true"
                      required
                    >
                  </div>
                </div>

                <label
                  class="entry__error entry__error--primary"
                  style="
                    font-size: 16px;
                    text-align: left;
                    font-family: Inter, Arial, sans-serif;
                    color: #661d1d;
                    background-color: #ffeded;
                    border-radius: 3px;
                    border-color: #ff4949;
                  "
                />
              </div>
            </div>
          </div>
          <div style="padding: 16px 0">
            <div class="sib-input sib-form-block">
              <div class="form__entry entry_block">
                <div class="form__label-row">
                  <label
                    class="entry__label"
                    style="
                      font-weight: 700;
                      text-align: left;
                      font-size: 16px;
                      text-align: left;
                      font-weight: 700;
                      font-family: Inter, Arial, sans-serif;
                      color: #ffffff;
                    "
                    for="EMAIL"
                    data-required="*"
                    >Veuillez renseigner votre adresse email pour vous
                    inscrire</label
                  >

                  <div class="entry__field">
                    <input
                      id="EMAIL"
                      class="input"
                      type="text"
                      name="EMAIL"
                      autocomplete="off"
                      placeholder="EMAIL"
                      data-required="true"
                      required
                    >
                  </div>
                </div>

                <label
                  class="entry__error entry__error--primary"
                  style="
                    font-size: 16px;
                    text-align: left;
                    font-family: Inter, Arial, sans-serif;
                    color: #661d1d;
                    background-color: #ffeded;
                    border-radius: 3px;
                    border-color: #ff4949;
                  "
                />
              </div>
            </div>
          </div>
          <div style="padding: 16px 0">
            <div class="sib-form-block" style="text-align: left">
              <button
                class="sib-form-block__button sib-form-block__button-with-loader"
                style="
                  font-size: 16px;
                  text-align: left;
                  font-weight: 700;
                  font-family: Inter, Arial, sans-serif;
                  color: #9123cb;
                  background-color: #ffe40f;
                  border-radius: 20px;
                  border-width: 0px;
                "
                form="sib-form"
                type="submit"
              >
                <svg
                  class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"
                  />
                </svg>
                S&#039;INSCRIRE
              </button>
            </div>
          </div>

          <input
            type="text"
            name="email_address_check"
            value=""
            class="input--hidden"
          >
          <input type="hidden" name="locale" value="fr" >
        </form>
      </div>
    </div>
  </div>
</template>

<style>
#sib-container input:-ms-input-placeholder {
  text-align: left;
  font-family: Inter, Arial, sans-serif;
  color: #b4baba;
}

#sib-container input::placeholder {
  text-align: left;
  font-family: Inter, Arial, sans-serif;
  color: #b4baba;
}

#sib-container textarea::placeholder {
  text-align: left;
  font-family: Inter, Arial, sans-serif;
  color: #b4baba;
}

#sib-container a {
  text-decoration: underline;
  color: #2bb2fc;
}

.sib-form,
.entry__choice,
.pika-single {
  font-family: Inter, Arial, sans-serif;
}
</style>
