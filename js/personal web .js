(function () {
        var gallery = document.getElementById("janku-gallery");
        if (!gallery) return;
        var mainImage = gallery.querySelector(".gallery-main-image");
        var counter = gallery.querySelector(".gallery-counter");
        var items = Array.prototype.slice.call(gallery.querySelectorAll(".gallery-item img"));
        var current = 0;

        function show(index) {
          current = (index + items.length) % items.length;
          var src = items[current].getAttribute("src");
          mainImage.setAttribute("src", src);
          mainImage.setAttribute("alt", items[current].getAttribute("alt") || "");
          counter.textContent = (current + 1) + " / " + items.length;
          items.forEach(function (img, i) {
            var button = img.parentElement;
            button.classList.toggle("is-active", i === current);
            if (i === current) button.setAttribute("aria-current", "true");
            else button.removeAttribute("aria-current");
          });
        }

        items.forEach(function (img, i) {
          img.parentElement.addEventListener("click", function () {
            show(i);
          });
        });

        gallery.querySelector(".gallery-prev").addEventListener("click", function () {
          show(current - 1);
        });
        gallery.querySelector(".gallery-next").addEventListener("click", function () {
          show(current + 1);
        });

        gallery.addEventListener("keydown", function (e) {
          if (e.key === "ArrowLeft") show(current - 1);
          else if (e.key === "ArrowRight") show(current + 1);
        });
      })();
