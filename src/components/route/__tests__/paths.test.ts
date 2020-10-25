import paths from "../paths";

describe("Paths", () => {
  [
    [paths.shipper.path, "/shipper"],
    [paths.shipper.url({}), "/shipper"],
    [paths.shipperSite.path, "/shipper/:siteName"],
    [
      paths.shipperSite.url({ siteName: "site/x/9q8nrq" }),
      "/shipper/site%2Fx%2F9q8nrq"
    ],
    [paths.shipperShipment.path, "/shipper/:siteName/shipment/:shipmentName"],
    [
      paths.shipperShipment.url({ siteName: "foo", shipmentName: "bar" }),
      "/shipper/foo/shipment/bar"
    ],
    [paths.shipperSettings.path, "/shipper/:siteName/settings"],
    [paths.shipperSettings.url({ siteName: "foo" }), "/shipper/foo/settings"],
    [
      paths.shipperSettingsSiteSelect.path,
      "/shipper/:siteName/settings/site-select"
    ],
    [
      paths.shipperSettingsSiteSelect.url({ siteName: "foo" }),
      "/shipper/foo/settings/site-select"
    ]
  ].forEach(([created, expected]) => {
    it(`makes ${expected}`, () => {
      expect(created).toEqual(expected);
    });
  });
});
