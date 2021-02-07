// Copyright (c) 2021, Jan and contributors
// For license information, please see license.txt


cur_frm.cscript.from_date = function () {

    compute_days(cur_frm)
}
cur_frm.cscript.to_date = function () {
    compute_days(cur_frm)
}

function compute_days(cur_frm) {
    if(cur_frm.doc.from_date && cur_frm.doc.to_date){
        console.log("CALCULATE")
        var date1 = new Date(cur_frm.doc.from_date);
        var date2 = new Date(cur_frm.doc.to_date)
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        console.log(Difference_In_Days)
        cur_frm.doc.number_of_days = Difference_In_Days
        cur_frm.refresh_field("number_of_days")
    }

}
frappe.ui.form.on('Rental', {
    on_submit: function () {
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
	refresh: function(frm) {
	    if(!cur_frm.is_new()) {
            document.querySelectorAll("[data-doctype='Rental Pick Up']")[1].style.display = "none";
            document.querySelectorAll("[data-doctype='Rental Return']")[1].style.display = "none";
        }
        if(cur_frm.doc.status === "To Pick Up"){

        } else if(cur_frm.doc.status === "To Return"){
            cur_frm.add_custom_button(__("Rental Return"), () => {
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

