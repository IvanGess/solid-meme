<template>
  <section class="content-wrapper" aria-labelledby="main-heading">
    <div class="text-content">
      <h1 id="main-heading" class="main-heading">Мои<br />заметки</h1>
      <p class="subheading">Не забывай о важном, храни его в облаке.</p>
    </div>
    <figure class="image-wrapper">
      <img
        src="@/assets/hero-image.svg"
        alt="Иллюстрация заметок в облаке"
        class="hero-image"
        loading="lazy"
      />
      <figcaption class="visually-hidden">
        Иллюстрация, показывающая заметки, хранящиеся в облаке.
      </figcaption>
    </figure>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/core/colors' as colors;
@use '@/styles/core/breakpoints' as breakpoints;

.content-wrapper {
  display: flex;
  align-items: center;
  gap: 60px;

  .text-content {
    max-width: 642px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: -48px;

    .subheading {
      font-weight: 400;
      font-size: 32px;
      line-height: 150%;
      color: colors.$gray;
      max-width: 394px;
    }
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media ((min-width: breakpoints.$breakpoint-lg-min) and (max-width: breakpoints.$breakpoint-lg-max)) {
  .content-wrapper {
    gap: 40px;
  }
}
@media ((min-width: breakpoints.$breakpoint-sm-max) and (max-width: breakpoints.$breakpoint-md-max)) {
  .content-wrapper {
    flex-direction: column;
    gap: 0;
    .text-content {
      margin-top: 38px;
      align-items: center;
      text-align: center;
      gap: 22px;
      .subheading {
        max-width: 100%;
        text-wrap: auto;
      }
    }
  }
  .image-wrapper {
    padding: 0px 64px;
  }
}
@media (max-width: breakpoints.$breakpoint-sm-max) {
  .content-wrapper {
    flex-direction: column;
    gap: 12px;
    .text-content {
      margin-top: 22px;
      align-items: center;
      text-align: center;
      gap: 20px;

      .main-heading {
        font-weight: 900;
        font-size: 60px;
        line-height: 107%;
      }

      .subheading {
        font-weight: 400;
        font-size: 24px;
        line-height: 150%;
      }
    }
  }
  .image-wrapper {
    padding: 0 10px;
  }
}
</style>
