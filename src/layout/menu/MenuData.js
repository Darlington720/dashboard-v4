const menu = [
  {
    icon: "dashlite",
    text: "Dashboard",
    link: "/",
    access: [
      "Vice Chancellor",
      "lecturer",
      "Administrative Assistant",
      "SENIOR ASSISTANT ACADEMIC REGISTRAR",
    ],
  },

  // {
  //   icon: "dashlite",
  //   text: "Constraints",
  //   link: "/constraints",
  // },
  {
    icon: "tile-thumb",
    text: "Constraints",
    active: false,
    access: [
      "Vice Chancellor",
      "Academic Registrar",
      "SENIOR ASSISTANT ACADEMIC REGISTRAR",
    ],
    subMenu: [
      {
        text: "Set Constraint",
        // link: "/project-card",
        link: "/constraints",
      },
      {
        text: "Constraint List",
        // link: "/project-card",
        link: "/constraintsList",
      },
      // {
      //   text: "Project List",
      //   link: "/project-list",
      // },
    ],
  },

  // {
  //   icon: "bitcoin-cash",
  //   text: "Crypto Dashboard",
  //   link: "/crypto",
  // },
  // {
  //   icon: "growth",
  //   text: "Analytics Dashboard",
  //   link: "/analytics",
  // },
  // {
  //   icon: "coins",
  //   text: "Invest Dashboard",
  //   link: "/invest",
  // },
  // {
  //   heading: "Pre-built Pages",
  // },
  {
    icon: "tile-thumb",
    text: "Students",
    access: ["Vice Chancellor"],
    active: false,
    subMenu: [
      {
        text: "Today's Students",
        // link: "/project-card",
        link: "/studentsToday",
      },
      // {
      //   text: "Project List",
      //   link: "/project-list",
      // },
    ],
  },
  {
    icon: "users",
    text: "Visitors",
    active: false,
    access: ["Vice Chancellor"],
    subMenu: [
      {
        text: "Visitors Today",
        link: "/visitorsToday",
      },
      // {
      //   text: "User List - Compact",
      //   link: "/user-list-compact",
      // },
      // {
      //   text: "User Details - Regular",
      //   link: "/user-details-regular/1",
      // },
      // {
      //   text: "User Profile - Regular",
      //   link: "/user-profile-regular",
      // },
      // {
      //   text: "User Contact - Card",
      //   link: "/user-contact-card",
      // },
    ],
  },
  {
    icon: "file-docs",
    text: "Teaching Staff",
    active: false,
    access: ["Vice Chancellor"],
    subMenu: [
      {
        text: "Staff Today",
        link: "/staffToday",
      },
      // {
      //   text: "KYC List - Regular",
      //   link: "/kyc-list-regular",
      // },
      // {
      //   text: "KYC Details - Regular",
      //   link: "/kyc-details-regular/UD01544",
      // },
    ],
  },

  // {
  //   icon: "tranx",
  //   text: "Non Teaching Staff",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "N T S today",
  //       link: "/ntsToday",
  //     },
  //     // {
  //     //   text: "Trans List - Basic",
  //     //   link: "/transaction-basic",
  //     // },
  //     // {
  //     //   text: "Trans List - Crypto",
  //     //   link: "/transaction-crypto",
  //     // },
  //   ],
  // },
  // {
  //   icon: "grid-alt",
  //   text: "Reports",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Messages",
  //       link: "/app-messages",
  //     },
  //     {
  //       text: "Chats / Messenger",
  //       link: "/app-chat",
  //     },
  //     {
  //       text: "Inbox / Mail",
  //       link: "/app-inbox",
  //     },
  //     {
  //       text: "Calendar",
  //       link: "/app-calender",
  //     },
  //     {
  //       text: "File Manager",
  //       link: "/app-file-manager",
  //       badge: "new",
  //     },
  //     {
  //       text: "Kanban Board",
  //       link: "/app-kanban",
  //     },
  //   ],
  // },
  // {
  //   icon: "card-view",
  //   text: "Products",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Product List",
  //       link: "/product-list",
  //     },
  //     {
  //       text: "Product Card",
  //       link: "/product-card",
  //     },
  //     {
  //       text: "Product Details",
  //       link: "/product-details/0",
  //     },
  //   ],
  // },
  {
    icon: "file-docs",
    text: "Lectures",
    active: false,
    access: ["Vice Chancellor"],
    subMenu: [
      {
        text: "Lectures Today",
        link: "/invoice-list",
      },
      // {
      //   text: "Invoice List",
      //   link: "/invoice-list",
      // },
      // {
      //   text: "Invoice Details",
      //   link: "/invoice-details/1",
      // },
    ],
  },
  {
    icon: "tile-thumb",
    text: "Voting",
    active: false,
    access: ["Vice Chancellor"],
    subMenu: [
      {
        text: "Voters List - Main",
        // link: "/project-card",
        link: "/voters-list",
      },
      {
        text: "Voters List - Kampala",
        // link: "/project-card",
        link: "/voters-list-kmp",
      },
      // {
      //   text: "Constraint List",
      //   // link: "/project-card",
      //   link: "/constraintsList",
      // },
      // {
      //   text: "Project List",
      //   link: "/project-list",
      // },
    ],
  },
  {
    icon: "tile-thumb",
    text: "Examinations",
    access: [
      "Vice Chancellor",
      "lecturer",
      "Administrative Assistant",
      "Academic Registrar",
      "SENIOR ASSISTANT ACADEMIC REGISTRAR",
    ],
    active: false,
    subMenu: [
      {
        text: "Assign Invigilator",
        // link: "/project-card",
        link: "/assign-inv",
      },
      {
        text: "Examination Reports",
        // link: "/project-card",
        link: "/exam-reports",
      },
      // {
      //   text: "Voters List - Kampala",
      //   // link: "/project-card",
      //   link: "/voters-list-kmp",
      // },
      {
        text: "Rooms",
        // link: "/project-card",
        link: "/rooms",
      },
      // {
      //   text: "Constraint List",
      //   // link: "/project-card",
      //   link: "/constraintsList",
      // },
      // {
      //   text: "Project List",
      //   link: "/project-list",
      // },
    ],
  },
  {
    icon: "tile-thumb",
    text: "Timetable",
    access: [
      "Vice Chancellor",
      "Academic Registrar",
      "SENIOR ASSISTANT ACADEMIC REGISTRAR",
    ],
    active: false,
    subMenu: [
      {
        text: "Exam Timetables",
        // link: "/project-card",
        link: "/exam-tt",
      },
      {
        text: "Class Timetables",
        // link: "/project-card",
        link: "/class-tt",
      },
      // {
      //   text: "Voters List - Kampala",
      //   // link: "/project-card",
      //   link: "/voters-list-kmp",
      // },
      {
        text: "Add Exam Timetable",
        // link: "/project-card",
        link: "/add-exam-tt",
      },
      {
        text: "Add Class Timetable",
        // link: "/project-card",
        link: "/add-class-tt",
      },
      // {
      //   text: "Constraint List",
      //   // link: "/project-card",
      //   link: "/constraintsList",
      // },
      // {
      //   text: "Project List",
      //   link: "/project-list",
      // },
    ],
  },
  {
    icon: "tile-thumb",
    text: "Exemptions",
    access: [
      "Vice Chancellor",
      "Academic Registrar",
      "SENIOR ASSISTANT ACADEMIC REGISTRAR",
    ],
    active: false,
    subMenu: [
      {
        text: "Exam Exemptions",
        // link: "/project-card",
        link: "/exam-exemptions",
      },
      // {
      //   text: "Class Timetables",
      //   // link: "/project-card",
      //   link: "/exam-tt",
      // },
      // // {
      // //   text: "Voters List - Kampala",
      // //   // link: "/project-card",
      // //   link: "/voters-list-kmp",
      // // },
      // {
      //   text: "Add Exam Timetable",
      //   // link: "/project-card",
      //   link: "/add-exam-tt",
      // },
      // {
      //   text: "Add Class Timetable",
      //   // link: "/project-card",
      //   link: "/add-class-tt",
      // },
      // {
      //   text: "Constraint List",
      //   // link: "/project-card",
      //   link: "/constraintsList",
      // },
      // {
      //   text: "Project List",
      //   link: "/project-list",
      // },
    ],
  },
  // {
  //   icon: "view-col",
  //   text: "Pricing Table",
  //   link: "/pricing-table",
  // },
  // {
  //   icon: "img",
  //   text: "Image Gallery",
  //   link: "/image-gallery",
  // },
  // {
  //   heading: "Misc Pages",
  // },
  // {
  //   icon: "signin",
  //   text: "Auth Pages",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Login / Signin",
  //       link: "/auth-login",
  //       newTab: true,
  //     },
  //     {
  //       text: "Register / Signup",
  //       link: "/auth-register",
  //       newTab: true,
  //     },
  //     {
  //       text: "Forgot Password",
  //       link: "/auth-reset",
  //       newTab: true,
  //     },
  //     {
  //       text: "Success / Confirm",
  //       link: "/auth-success",
  //       newTab: true,
  //     },
  //   ],
  // },
  // {
  //   icon: "files",
  //   text: "Error Pages",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "404 Classic",
  //       link: "/errors/404-classic",
  //       newTab: true,
  //     },
  //     {
  //       text: "504 Classic",
  //       link: "/errors/504-classic",
  //       newTab: true,
  //     },
  //     {
  //       text: "404 Modern",
  //       link: "/errors/404-modern",
  //       newTab: true,
  //     },
  //     {
  //       text: "504 Modern",
  //       link: "/errors/504-modern",
  //       newTab: true,
  //     },
  //   ],
  // },
  // {
  //   icon: "files",
  //   text: "Other Pages",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Blank / Startup",
  //       link: "/_blank",
  //     },
  //     {
  //       text: "Faqs / Help",
  //       link: "/pages/faq",
  //     },
  //     {
  //       text: "Terms / Policy",
  //       link: "/pages/terms-policy",
  //     },
  //     {
  //       text: "Regular Page - v1",
  //       link: "/pages/regular-v1",
  //     },
  //     {
  //       text: "Regular Page - v2",
  //       link: "/pages/regular-v2",
  //     },
  //   ],
  // },
  // {
  //   heading: "Components",
  // },
  // {
  //   icon: "layers",
  //   text: "Ui Elements",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Alerts",
  //       link: "/components/alerts",
  //     },
  //     {
  //       text: "Accordions",
  //       link: "/components/accordions",
  //     },
  //     {
  //       text: "Avatar",
  //       link: "/components/avatar",
  //     },
  //     {
  //       text: "Badges",
  //       link: "/components/badges",
  //     },
  //     {
  //       text: "Buttons",
  //       link: "/components/buttons",
  //     },
  //     {
  //       text: "Button Group",
  //       link: "/components/button-group",
  //     },
  //     {
  //       text: "Breadcrumbs",
  //       link: "/components/breadcrumbs",
  //     },
  //     {
  //       text: "Cards",
  //       link: "/components/cards",
  //     },
  //     {
  //       text: "Carousel",
  //       link: "/components/carousel",
  //     },
  //     {
  //       text: "Dropdowns",
  //       link: "/components/dropdowns",
  //     },
  //     {
  //       text: "Modals",
  //       link: "/components/modals",
  //     },
  //     {
  //       text: "Pagination",
  //       link: "/components/pagination",
  //     },
  //     {
  //       text: "Popovers",
  //       link: "/components/popovers",
  //     },
  //     {
  //       text: "Progress",
  //       link: "/components/progress",
  //     },
  //     {
  //       text: "Spinner",
  //       link: "/components/spinner",
  //     },
  //     {
  //       text: "Tabs",
  //       link: "/components/tabs",
  //     },
  //     {
  //       text: "Toast",
  //       link: "/components/toast",
  //     },
  //     {
  //       text: "Typography",
  //       link: "/components/typography",
  //     },
  //     {
  //       text: "Tooltips",
  //       link: "/components/tooltips",
  //     },
  //     {
  //       text: "Utilities",
  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Borders",
  //           link: "/components/util-border",
  //         },
  //         {
  //           text: "Colors",
  //           link: "/components/util-colors",
  //         },
  //         {
  //           text: "Display",
  //           link: "/components/util-display",
  //         },
  //         {
  //           text: "Embeded",
  //           link: "/components/util-embeded",
  //         },
  //         {
  //           text: "Flex",
  //           link: "/components/util-flex",
  //         },
  //         {
  //           text: "Text",
  //           link: "/components/util-text",
  //         },
  //         {
  //           text: "Sizing",
  //           link: "/components/util-sizing",
  //         },
  //         {
  //           text: "Spacing",
  //           link: "/components/util-spacing",
  //         },
  //         {
  //           text: "Others",
  //           link: "/components/util-others",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   icon: "dot-box",
  //   text: "Crafted Icons",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "SVG Icon-Exclusive",
  //       link: "/svg-icons",
  //     },
  //     {
  //       text: "Nioicon - HandCrafted",
  //       link: "/nioicon",
  //     },
  //   ],
  // },
  // {
  //   icon: "table-view",
  //   text: "Tables",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Basic Tables",
  //       link: "/table-basic",
  //     },
  //     {
  //       text: "Special Tables",
  //       link: "/table-special",
  //     },
  //     {
  //       text: "DataTables",
  //       link: "/table-datatable",
  //     },
  //   ],
  // },
  // {
  //   icon: "card-view",
  //   text: "Forms",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Form Elements",
  //       link: "/components/form-elements",
  //     },
  //     {
  //       text: "Checkbox Radio",
  //       link: "/components/checkbox-radio",
  //     },
  //     {
  //       text: "Advanced Controls",
  //       link: "/components/advanced-control",
  //     },
  //     {
  //       text: "Input Group",
  //       link: "/components/input-group",
  //     },
  //     {
  //       text: "Form Upload",
  //       link: "/components/form-upload",
  //     },
  //     {
  //       text: "Date Time Picker",
  //       link: "/components/datetime-picker",
  //     },
  //     {
  //       text: "Number Spinner",
  //       link: "/components/number-spinner",
  //     },
  //     {
  //       text: "noUiSlider",
  //       link: "/components/nouislider",
  //     },
  //     {
  //       text: "Form Layouts",
  //       link: "/components/form-layouts",
  //     },
  //     {
  //       text: "Form Validation",
  //       link: "/components/form-validation",
  //     },
  //     {
  //       text: "Wizard Basic",
  //       link: "/components/wizard-basic",
  //     },
  //     {
  //       text: "Rich Editor",
  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Quill",
  //           link: "/components/quill",
  //         },
  //         {
  //           text: "Tinymce",
  //           link: "/components/tinymce",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   icon: "pie",
  //   text: "Charts",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Chart Js",
  //       link: "/charts/chartjs",
  //     },
  //     {
  //       text: "Knobs",
  //       link: "/charts/knobs",
  //     },
  //   ],
  // },
  // {
  //   icon: "puzzle",
  //   text: "Widgets",
  //   subMenu: [
  //     {
  //       text: "Card Widgets",
  //       link: "/components/widgets/cards",
  //     },
  //     {
  //       text: "Chart Widgets",
  //       link: "/components/widgets/charts",
  //     },
  //     {
  //       text: "Rating Widgets",
  //       link: "/components/widgets/rating",
  //     },
  //   ],
  // },
  // {
  //   icon: "block-over",
  //   text: "Miscellaneous",
  //   subMenu: [
  //     {
  //       text: "Slick Sliders",
  //       link: "/components/misc/slick-slider",
  //     },
  //     {
  //       text: "JsTree",
  //       link: "/components/misc/jsTree",
  //     },
  //     {
  //       text: "React Toastify",
  //       link: "/components/misc/toastify",
  //     },
  //     {
  //       text: "Sweet Alert",
  //       link: "/components/misc/sweet-alert",
  //     },
  //     {
  //       text: "React DualListBox",
  //       link: "/components/misc/dual-list",
  //     },
  //     {
  //       text: "React Beautiful Dnd",
  //       link: "/components/misc/beautiful-dnd",
  //     },
  //     {
  //       text: "Google Map",
  //       link: "/components/misc/map",
  //     },
  //   ],
  // },
  // {
  //   icon: "text-rich",
  //   text: "Email Template",
  //   link: "/email-template",
  //   active: "false",
  // },
];
export default menu;
