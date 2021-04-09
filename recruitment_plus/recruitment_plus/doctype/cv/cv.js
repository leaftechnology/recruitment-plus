function add_location(cur_frm) {
     $.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
          var placesAutocomplete = places({
            appId: 'plBBA3S4UJ7B',
            apiKey: '0862ae80a132be1181fac98cf20ecfac',
            container: cur_frm.fields_dict.city.input
          });

          var $address = cur_frm.fields_dict.city.input
          placesAutocomplete.on('change', function(e) {
            $address.textContent = e.suggestion.value
          });

          placesAutocomplete.on('clear', function() {
            $address.textContent = 'none';
          });
        })

        $.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
          var placesAutocomplete = places({
            appId: 'plBBA3S4UJ7B',
            apiKey: '0862ae80a132be1181fac98cf20ecfac',
            container: cur_frm.fields_dict.place_of_birth.input
          });

          var $address = cur_frm.fields_dict.place_of_birth.input
          placesAutocomplete.on('change', function(e) {
            $address.textContent = e.suggestion.value
          });

          placesAutocomplete.on('clear', function() {
            $address.textContent = 'none';
          });
        })
        $.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
          var placesAutocomplete = places({
            appId: 'plBBA3S4UJ7B',
            apiKey: '0862ae80a132be1181fac98cf20ecfac',
            container: cur_frm.fields_dict.living_town.input
          });

          var $address = cur_frm.fields_dict.living_town.input
          placesAutocomplete.on('change', function(e) {
            $address.textContent = e.suggestion.value
          });

          placesAutocomplete.on('clear', function() {
            $address.textContent = 'none';
          });
        })
    $.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
          var placesAutocomplete = places({
            appId: 'plBBA3S4UJ7B',
            apiKey: '0862ae80a132be1181fac98cf20ecfac',
            container: cur_frm.fields_dict.work_location.input
          });

          var $address = cur_frm.fields_dict.work_location.input
          placesAutocomplete.on('change', function(e) {
            $address.textContent = e.suggestion.value
          });

          placesAutocomplete.on('clear', function() {
            $address.textContent = 'none';
          });
        })
    $.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
          var placesAutocomplete = places({
            appId: 'plBBA3S4UJ7B',
            apiKey: '0862ae80a132be1181fac98cf20ecfac',
            container: cur_frm.fields_dict.place_of_issue.input
          });

          var $address = cur_frm.fields_dict.place_of_issue.input
          placesAutocomplete.on('change', function(e) {
            $address.textContent = e.suggestion.value
          });

          placesAutocomplete.on('clear', function() {
            $address.textContent = 'none';
          });
        })

}

cur_frm.cscript.customer = function () {
    if(cur_frm.doc.customer){
        frappe.db.get_doc('Customer', cur_frm.doc.customer)
            .then(customer => {
                cur_frm.doc.customer_name = customer.customer_name
                cur_frm.refresh_field("customer_name")
            })

    } else {
        cur_frm.doc.customer_name = ""
        cur_frm.refresh_field("customer_name")
    }
}
cur_frm.cscript.recruitment_request = function () {
    if(cur_frm.doc.recruitment_request){
        frappe.db.get_doc('Recruitment Request', cur_frm.doc.recruitment_request)
            .then(customer => {
                cur_frm.doc.customer_name = customer.customer_name
                cur_frm.refresh_field("customer_name")
            })

    } else {
        cur_frm.doc.customer_name = ""
        cur_frm.refresh_field("customer_name")
    }
}

cur_frm.cscript.external_office = function () {
    if(cur_frm.doc.external_office){
        cur_frm.set_df_property("customer", "read_only", 1)
        cur_frm.set_df_property("recruitment_request", "read_only", 1)
        cur_frm.set_df_property("own_recruitment", "read_only", 1)
    } else {
        cur_frm.set_df_property("customer", "read_only", 0)
        cur_frm.set_df_property("recruitment_request", "read_only", 0)
        cur_frm.set_df_property("own_recruitment", "read_only", 0)
    }
}
var submitted_visa = false
var existing_visa = false
var existing_si = false
var existing_pi = false
var existing_rental = false

cur_frm.cscript.refresh = function () {
     $.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
          var placesAutocomplete = places({
            appId: 'plBBA3S4UJ7B',
            apiKey: '0862ae80a132be1181fac98cf20ecfac',
            container: cur_frm.fields_dict.destination_airport.input
          });

          var $address = cur_frm.fields_dict.destination_airport.input
          placesAutocomplete.on('change', function(e) {
            $address.textContent = e.suggestion.value
          });

          placesAutocomplete.on('clear', function() {
            $address.textContent = 'none';
          });
        })

        $.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
          var placesAutocomplete = places({
            appId: 'plBBA3S4UJ7B',
            apiKey: '0862ae80a132be1181fac98cf20ecfac',
            container: cur_frm.fields_dict.airport_arrival.input
          });

          var $address = cur_frm.fields_dict.airport_arrival.input
          placesAutocomplete.on('change', function(e) {
            $address.textContent = e.suggestion.value
          });

          placesAutocomplete.on('clear', function() {
            $address.textContent = 'none';
          });
        })
   add_location(cur_frm)
    // if(!cur_frm.is_new()) {
    //     document.querySelectorAll("[data-doctype='Visa']")[1].style.display = "none";
    //     document.querySelectorAll("[data-doctype='Rental']")[1].style.display = "none";
    //     document.querySelectorAll("[data-doctype='Recruitment Request']")[1].style.display = "none";
    // }
    frappe.call({
        method: "recruitment_plus.recruitment_plus.doctype.cv.cv.get_submitted_visa",
        args: {
            name: cur_frm.doc.name
        },
        async: false,
        callback: function (r) {
            submitted_visa = r.message[0]
            existing_visa = r.message[1]
            existing_si = r.message[2]
            existing_pi = r.message[3]
            existing_rental = r.message[4]
        }
    })
    cur_frm.set_query('recruitment_request', () => {
            return {
                filters: [
                        ["status", "=", "Open"],
                        ["docstatus", "=", 1],
                    ]
            }
        })
    if(cur_frm.doc.external_office){
        cur_frm.set_df_property("customer", "read_only", 1)
    } else {
        cur_frm.set_df_property("customer", "read_only", 0)
    }

    if(existing_rental){
        cur_frm.set_df_property("own_recruitment", "read_only", 1)
    } else {
        cur_frm.set_df_property("external_office", "read_only", 0)
    }
    if((cur_frm.doc.customer || cur_frm.doc.recruitment_request) && existing_si){
        cur_frm.set_df_property("external_office", "read_only", 0)
    }
    if((["In Progress", "Sent to Outside"].includes(cur_frm.doc.status) && !existing_visa) || (cur_frm.doc.own_recruitment && !existing_visa)){
       cur_frm.add_custom_button(__("Visa"), () => {
                    cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'generate_visa',
                        args: {},
                        freeze: true,
                        freeze_message: "Generating Visa...",
                        callback: (rr) => {
                            frappe.set_route("Form", "Visa", rr.message);
                        }
                    })
            }, "Create")
    }
    if((cur_frm.doc.own_recruitment && !existing_rental) || (cur_frm.doc.external_office && !existing_rental)){
       cur_frm.add_custom_button(__("Rental"), () => {
           frappe.confirm('Are you sure you want to proceed?',
                () => {
                   cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'generate_rental',
                        args: {},
                        freeze: true,
                        freeze_message: "Generating Rental...",
                        callback: (rr) => {
                                frappe.set_route("Form", "Rental", rr.message);
                             }
                    })
                },
                () => {})

            }, "Create")
    }
     if((submitted_visa && !existing_si && !cur_frm.doc.own_recruitment && !cur_frm.doc.external_office) || (cur_frm.doc.external_office && !existing_si && !cur_frm.doc.own_recruitment)){
       cur_frm.add_custom_button(__("Sales Invoice"), () => {
           frappe.confirm('Are you sure you want to proceed?',
                () => {
                  cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'generate_si',
                        args: {},
                        freeze: true,
                        freeze_message: "Generating Sales Invoice...",
                        callback: (rr) => {
                                    frappe.set_route("Form", "Sales Invoice", rr.message);

                        }
                    })
                },
                () => {})

            }, "Create")
    }

    if((existing_si && !existing_pi && cur_frm.doc.external_office) || (existing_rental && !existing_pi && cur_frm.doc.external_office)){

       cur_frm.add_custom_button(__("Purchase Invoice"), () => {
           frappe.confirm('Are you sure you want to proceed?',
                () => {
                  cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'generate_pi',
                        args: {},
                        freeze: true,
                        freeze_message: "Generating Purchase Invoice...",
                        callback: (rr) => {
                                    frappe.set_route("Form", "Purchase Invoice", rr.message);

                         }
                    })
                },
                () => {})

            }, "Create")
    }
    if(cur_frm.doc.status === "Sent to Outside"){
       cur_frm.add_custom_button(__("Ticket"), () => {
           frappe.confirm('Are you sure you want to proceed?',
                () => {
                  cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'change_status',
                        args: {
                            status: "Ticket"
                        },
                        freeze: true,
                        freeze_message: "Changing...",
                        callback: () => {
                            cur_frm.reload_doc()
                        }
                })
                },
                () => {})

            }, "Create")
    }
    if(cur_frm.doc.status === "Ticket"){
       cur_frm.add_custom_button(__("Arravel"), () => {
           frappe.confirm('Are you sure you want to proceed?',
                () => {
                  cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'change_status',
                        args: {
                            status: "Arravel"
                        },
                        freeze: true,
                        freeze_message: "Changing...",
                        callback: () => {
                                                        cur_frm.reload_doc()

                        }
                })
                },
                () => {})

            }, "Create")
    }
    if(cur_frm.doc.status === "Arravel"){
       cur_frm.add_custom_button(__("Completed"), () => {
           frappe.confirm('Are you sure you want to proceed?',
                () => {
                   cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'change_status',
                        args: {
                            status: "Completed"
                        },
                        freeze: true,
                        freeze_message: "Changing...",
                        callback: () => {
                                                        cur_frm.reload_doc()

                        }
                })
                },
                () => {})

            }, "Create")
    }
    if(['Ticket', 'Arravel', 'Completed'].includes(cur_frm.doc.status)){
        cur_frm.set_df_property("external_office", "read_only", 1)
    }
}