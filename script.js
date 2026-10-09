document.addEventListener("DOMContentLoaded", () => {

  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.15
    }
  );


  elements.forEach((element) => {
    observer.observe(element);
  });

});
document.addEventListener("DOMContentLoaded", () => {

  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          // Elemen masuk ke layar
          entry.target.classList.add("is-visible");

        } else {

          // Elemen meninggalkan layar
          entry.target.classList.remove("is-visible");

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });

});
document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll(".hero");

  let animationPending = false;

  function updateParallax() {

    const viewportHeight = window.innerHeight;

    sections.forEach((section) => {

      const rect = section.getBoundingClientRect();

      /*
       * Menghitung progres section saat bergerak
       * melewati area layar.
       */
      const progress =
        (viewportHeight - rect.top) /
        (viewportHeight + rect.height);

      /*
       * Membatasi nilai progres dari -1 hingga 1.
       */
      const centeredProgress = Math.max(
        -1,
        Math.min(1, (progress - 0.5) * 2)
      );

      /*
       * Background bergerak hingga 35px.
       * Tanda minus membuat arah gerakannya
       * berlawanan dengan progres scrolling.
       */
      const backgroundMovement =
        -centeredProgress * 35;

      /*
       * Teks bergerak lebih pelan.
       */
      const textMovement =
        centeredProgress * 14;

      section.style.setProperty(
        "--parallax-y",
        `${backgroundMovement}px`
      );

      section.style.setProperty(
        "--content-y",
        `${textMovement}px`
      );

    });

    animationPending = false;
  }


  function requestParallaxUpdate() {

    if (animationPending) return;

    animationPending = true;

    requestAnimationFrame(updateParallax);
  }


  /*
   * Berjalan ketika pengguna menggulir halaman.
   */
  window.addEventListener(
    "scroll",
    requestParallaxUpdate,
    { passive: true }
  );


  /*
   * Memperbarui posisi ketika ukuran layar berubah.
   */
  window.addEventListener(
    "resize",
    requestParallaxUpdate
  );


  /*
   * Mengatur posisi awal.
   */
  requestParallaxUpdate();

});