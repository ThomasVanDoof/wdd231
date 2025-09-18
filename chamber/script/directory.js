    document.getElementById("year").textContent = new Date().getFullYear();

    document.getElementById("lastModified").textContent = document.lastModified;

    function setView(view) {
      const directory = document.getElementById("directory");
      directory.className = "directory " + view;
    }