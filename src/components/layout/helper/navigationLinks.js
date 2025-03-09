const navigationLinks = [
  {
    path: "/collection", label: "Medical Devices",
    roles: ["GUEST", "USER", "STAFF", "ADMIN"],
    dropdown: [
      { path: "/collection/lab-equipments", label: "Lab Equipments" },
      { path: "/collection/dental-equipments", label: "Dental Equipments" },
      { path: "/collection/x-ray", label: "X-Ray" },
      { path: "/collection/ultrasound-machines", label: "Ultrasound Machines" },
    ]
  },
  {
    path: "/collection/tools", label: "Tools",
    roles: ["GUEST", "USER", "STAFF", "ADMIN"],
    dropdown: [
      { path: "/collection/orthopedic-power-tools", label: "Orthopedic Power Tools" },
      { path: "/collection/surgical-instrument-sets", label: "Surgical Instrument Sets" },
      { path: "/collection/sports-medicine", label: "Sports Medicine" },
    ]
  },
  { path: "/collection/trolley-mounting", label: "Trolley & Mounting", roles: ["GUEST", "USER", "STAFF", "ADMIN"] },
  // {
  //   path: "/staff", label: "Staff", roles: ["STAFF", "ADMIN"],
  //   dropdown: [
  //     { path: "/staff", label: "Update Details" },
  //     { path: "/", label: "My Pending Request" },
  //     { path: "/", label: "Closed Request" },
  //   ]
  // },
  {
    path: "/admin", label: "Admin",
    roles: ["ADMIN"],
    dropdown: [
      { path: "/admin", label: "Add/Update Details" },
      { path: "/my-orders", label: "All Service Request" },
    ]
  },
  {
    path: "/collection", label: "Sales & Services",
    roles: ["GUEST", "USER", "STAFF", "ADMIN"],
  },
];

export default navigationLinks;
