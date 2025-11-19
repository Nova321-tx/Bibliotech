document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu li");
  const frame = document.getElementById("content-frame");

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      const page = item.getAttribute("data-page");
      frame.src = "views/" + page;
    });
  });
});
