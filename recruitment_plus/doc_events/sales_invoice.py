import frappe

def submit_si(doc, method):

    for i in doc.rental:
        frappe.db.sql(""" UPDATE `tabRental` SET status='To Pick Up' WHERE name=%s""", i.visa_reference)
        frappe.db.commit()

def cancel_si(doc, method):
    pass
    # for i in doc.rental:
    #     rental = frappe.db.sql(""" SELECT * FROM `tabRental Pick Up` WHERE cv=%s  """, i.visa_reference, as_dict=1)
    #     if len(rental) > 0:
    #         if rental
    #     frappe.db.sql(""" UPDATE `tabRental` SET status='To Pick Up' WHERE name=%s""", i.visa_reference)
    #     frappe.db.commit()