function changeLanguage() {
  document.documentElement.setAttribute(
    "dir",
    document.documentElement.dir === "ltr" ? "rtl" : "ltr"
  );
}
