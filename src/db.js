let db = {
  hubname: "untitled hub",
  bootTime: new Date().toString(),
  accessories: [
    {
      id: 1,
      _type: "Light",
      name: "Hall Light",
      brightnessLevel: 100,
      manufacturer: "Philips"
    },
    {
      id: 2,
      _type: "Door",
      name: "Front Door",
      isClosed: true,
      isLocked: true
    },
    {
      id: 3,
      _type: "Thermostat",
      name: "Living Room Thermostat",
      temperature: 72
    },
    { id: 4, _type: "Outlet", name: "Kitchen Outlet 1", isOn: true }
  ],
  rooms: []
};

module.exports = db;
