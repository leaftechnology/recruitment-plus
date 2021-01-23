// Copyright (c) 2021, Jan and contributors
// For license information, please see license.txt

frappe.ui.form.on('Rental', {
	refresh: function(frm) {
	    if(!cur_frm.is_new()) {
            document.querySelectorAll("[data-doctype='Rental Pick Up']")[1].style.display = "none";
            document.querySelectorAll("[data-doctype='Rental Return']")[1].style.display = "none";
        }
        if(cur_frm.doc.status === "To Pick Up"){
            cur_frm.add_custom_button(__("Generate Rental Pick Up"), () => {
                    cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'generate_rental_pickup',
                        args: {},
                        freeze: true,
                        freeze_message: "Generating Rental Pickup...",
                        callback: (rr) => {
                                    frappe.set_route("Form", "Rental Pick Up", rr.message);

                        }
                    })
            })
        } else if(cur_frm.doc.status === "To Return"){
            cur_frm.add_custom_button(__("Generate Rental Return"), () => {
                    cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'generate_rental_return',
                        args: {},
                        freeze: true,
                        freeze_message: "Generating Rental Return...",
                        callback: (rr) => {
                                    frappe.set_route("Form", "Rental Return", rr.message);

                        }
                    })
            })
        }
	}
});
