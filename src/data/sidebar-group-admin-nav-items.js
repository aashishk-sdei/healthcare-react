
export default () => {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlAfter: ""
    },
    {
      title: "Masters",
      htmlAfter: '<i class="material-icons">keyboard_arrow_right</i>',
      to: "/group-type-list"
    },
    {
      title: "Enrollments",
      htmlAfter: '<i class="material-icons">keyboard_arrow_right</i>',
      to: "/group-list",
    },
    {
      title: "Care Pathway",
      htmlAfter: '<i class="material-icons">keyboard_arrow_right</i>',
      to: "/care-path-list"
    },
    {
      title: "Content",
      htmlAfter: '<i class="material-icons">keyboard_arrow_right</i>',
      to: "/questionnaire-list",
    }
  ];
}
