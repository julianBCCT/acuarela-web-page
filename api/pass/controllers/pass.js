const path = require("path");
const fs = require("fs").promises;
const { PKPass } = require("passkit-generator");

async function getCertificates() {
  const [wwdr, signerCert, signerKey] = await Promise.all([
    fs.readFile(path.resolve("certs/wwdr.pem")),
    fs.readFile(path.resolve("certs/signerCert.pem")),
    fs.readFile(path.resolve("certs/signerKey.pem")),
  ]);

  return {
    wwdr,
    signerCert,
    signerKey,
    signerKeyPassphrase: "test", // Cambia según tu configuración
  };
}

module.exports = {
  async generate(ctx) {
    const { modelName } = ctx.params;

    const passName =
      modelName +
      "_" +
      new Date().toISOString().split("T")[0].replace(/-/gi, "");

    try {
      // Cargar certificados y recursos
      const certificates = await getCertificates();
      const [icon, logo, thumbnail, artwork] = await Promise.all([
        fs.readFile(path.resolve("model/custom.pass/icon.png")),
        fs.readFile(path.resolve("model/custom.pass/logo.png")),
        fs.readFile(path.resolve("model/custom.pass/thumbnail.png")),
        fs.readFile(path.resolve("model/custom.pass/background.png")),
      ]);

      // Crear el pase
      const pass = new PKPass(
        {},
        {
          wwdr: certificates.wwdr,
          signerCert: certificates.signerCert,
          signerKey: certificates.signerKey,
          signerKeyPassphrase: certificates.signerKeyPassphrase,
        },
        {
          formatVersion: 1,
          passTypeIdentifier: "pass.com.bcct.gca2024",
          serialNumber: "000000",
          webServiceURL: "https://example.com/passes/",
          authenticationToken: "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc",
          teamIdentifier: "D55SH94NUK",
          organizationName: "BCCT",
          description: "Golden Care Awards Gala Party Invitation",
          logoText: "BCCT",
          foregroundColor: "rgb(255, 223, 149)",
          backgroundColor: "#01040d",
        }
      );

      pass.addBuffer("icon.png", icon);
      pass.addBuffer("logo.png", logo);
      pass.addBuffer("thumbnail.png", thumbnail);
      pass.addBuffer("artwork.png", artwork);

      // Generar el pase
      const stream = pass.getAsStream();
      ctx.set({
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename=${passName}.pkpass`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
      });
      ctx.body = stream;
    } catch (err) {
      console.error("Error generando el pase:", err);
      ctx.status = 500;
      ctx.body = { message: `Error: ${err.message}` };
    }
  },
};
