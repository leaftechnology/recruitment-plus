

cur_frm.cscript.external_office = function () {
    if(cur_frm.doc.external_office){
        cur_frm.set_df_property("customer", "read_only", 1)
    } else {
        cur_frm.set_df_property("customer", "read_only", 0)
    }
}
var submitted_visa = false
var existing_visa = false
var existing_ = false
cur_frm.cscript.setup = function () {
    frappe.call({
        method: "recruitment_plus.recruitment_plus.doctype.cv.cv.get_submitted_visa",
        args: {
            name: cur_frm.doc.name
        },
        async: false,
        callback: function (r) {
            submitted_visa = r.message[0]
            existing_visa = r.message[1]
        }
    })
}
cur_frm.cscript.refresh = function () {

    if(cur_frm.doc.external_office){
        cur_frm.set_df_property("customer", "read_only", 1)
    } else {
        cur_frm.set_df_property("customer", "read_only", 0)
    }
    if(cur_frm.doc.customer){
        cur_frm.set_df_property("external_office", "read_only", 0)
    } else {
                cur_frm.set_df_property("external_office", "read_only", 1)

    }
    if(cur_frm.doc.status === "In Progress" && !existing_visa){
       cur_frm.add_custom_button(__("Generate Visa"), () => {
                    cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'generate_visa',
                        args: {},
                        freeze: true,
                        freeze_message: "Generating Visa...",
                        callback: () => {}
                    })
            })
    }
    if(cur_frm.doc.status === "In Progress" && cur_frm.doc.own_recruitment){
       cur_frm.add_custom_button(__("Generate Rental"), () => {
                    cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'generate_rental',
                        args: {},
                        freeze: true,
                        freeze_message: "Generating Rental...",
                        callback: () => {}
                    })
            })
    }
     if(submitted_visa){
       cur_frm.add_custom_button(__("Generate Sales Invoice"), () => {
                    cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'generate_si',
                        args: {},
                        freeze: true,
                        freeze_message: "Generating Visa...",
                        callback: () => {}
                    })
            })
    }
    if(cur_frm.doc.external_office && cur_frm.doc.status === "Sent to Outside"){
       cur_frm.add_custom_button(__("Generate Purchase Invoice"), () => {
                    cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'generate_pi',
                        args: {},
                        freeze: true,
                        freeze_message: "Generating Purchase Invoice...",
                        callback: () => {}
                    })
            })
    }
    if(cur_frm.doc.status === "Sent to Outside"){
       cur_frm.add_custom_button(__("Ticket"), () => {
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
            })
    }
    if(cur_frm.doc.status === "Ticket"){
       cur_frm.add_custom_button(__("Arravel"), () => {
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
            })
    }
    if(cur_frm.doc.status === "Arravel"){
       cur_frm.add_custom_button(__("Completed"), () => {
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
            })
    }
    if(['Ticket', 'Arravel', 'Completed'].includes(cur_frm.doc.status)){
        cur_frm.set_df_property("external_office", "read_only", 1)
    }
}