// data/galleryData.js

function importAll(r) {
  return r.keys().map(r);
}

export const galleryData = {
  Fijas: importAll(
    require.context("../src/images/Fijas", false, /\.(png|jpe?g|svg)$/)
  ),
  Backstage: importAll(
    require.context("../src/images/Backstage", false, /\.(png|jpe?g|svg)$/)
  ),
  Retratos: importAll(
    require.context("../src/images/Retratos", false, /\.(png|jpe?g|svg)$/)
  ),
  "Más fotos": importAll(
    require.context("../src/images/Fotos", false, /\.(png|jpe?g|svg)$/) 
  ),
};
