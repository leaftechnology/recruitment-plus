// Copyright (c) 2021, Jan and contributors
// For license information, please see license.txt

frappe.ui.form.on('Recruitment Request', {
	refresh: function(frm) {
	    if(!cur_frm.is_new()) {
            document.querySelectorAll("[data-doctype='CV']")[1].style.display = "none";
        }
	    if(cur_frm.doc.docstatus && cur_frm.doc.status !== "Closed"){
	        cur_frm.add_custom_button(__("Close"), () => {
                    cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'change_status',
                        args: {
                            status: "Closed"
                        },
                        freeze: true,
                        freeze_message: "Changing Status...",
                        callback: () => {
                            cur_frm.reload_doc()
                }
                    })
            })
        } else {
	        if(cur_frm.doc.docstatus && cur_frm.doc.status === "Closed"){
	        cur_frm.add_custom_button(__("Open"), () => {
                    cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'change_status',
                        args: {
                            status: cur_frm.doc.previous_status
                        },
                        freeze: true,
                        freeze_message: "Changing Status...",
                        callback: () => {
                            cur_frm.reload_doc()
                }
                    })
            })
        }
        }

	}
});
