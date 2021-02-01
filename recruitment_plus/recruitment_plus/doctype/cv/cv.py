# -*- coding: utf-8 -*-
# Copyright (c) 2021, Jan and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class CV(Document):
	def on_update_after_submit(self):
		print("NAA MAN")
		# self.change_status("In Progress" if self.customer else "Available")
		self.change_status("Sent to Outside" if self.external_office and (self.customer or self.cv_for_recruitment_request) else "In Progress" if (self.customer or self.cv_for_recruitment_request) and not self.external_office else "Available")
		if self.cv_for_recruitment_request and self.recruitment_request:
			frappe.db.sql(""" UPDATE `tabRecruitment Request` SET cv=%s, status='In Progress' WHERE name=%s""", (self.name, self.recruitment_request))
			frappe.db.commit()

		elif not self.cv_for_recruitment_request and not self.recruitment_request:
			frappe.db.sql(""" UPDATE `tabRecruitment Request` SET cv=%s, status='Open' WHERE cv=%s""",
						  ("", self.name))
			frappe.db.commit()
	def change_status(self, status):
		print(status)
		if status == "Completed":
			rr = frappe.db.sql(""" SELECT * FROM `tabRecruitment Request` WHERE name=%s""", self.recruitment_request,as_dict=1)
			if len(rr) > 0 and rr[0].status != "Closed":
				frappe.db.sql(""" UPDATE `tabRecruitment Request` SET status='Completed' WHERE name=%s""",
							  (self.recruitment_request))
				frappe.db.commit()
		frappe.db.sql(""" UPDATE `tabCV` SET status=%s WHERE name=%s""",
					  (status, self.name))
		frappe.db.commit()
		self.reload()

	def generate_visa(self):
		obj = {
			"doctype": "Visa",
			"service_type": self.service_type,
			"religion": self.religion,
			"nationality": self.nationality,
			"worked_before": self.worked_before,
			"external_office": self.external_office,
			"from_age": self.age,
			"to_age": self.age,
			"cv": self.name,
		}
		visa = frappe.get_doc(obj).insert()
		return visa.name
	def generate_rental(self):
		obj = {
			"doctype": "Rental",
			"customer": frappe.db.get_value("Recruitment Request", self.recruitment_request, "customer") if self.cv_for_recruitment_request else self.customer,
			"customer_name": frappe.db.get_value("Recruitment Request", self.cv_for_recruitment_request, "customer_name") if self.cv_for_recruitment_request else self.customer,
			"cv": self.name,
		}
		rental = frappe.get_doc(obj).insert()
		return rental.name
	def generate_si(self):
		obj = {
			"doctype": "Sales Invoice",
			"customer": self.customer,
			"items": self.get_items("Sales"),
			"reference": self.get_visa_reference()
		}
		si = frappe.get_doc(obj).insert()
		frappe.db.sql(""" UPDATE `tabVisa` SET sales_invoice=%s WHERE cv=%s """, (si.name, self.name))
		frappe.db.commit()
		return si.name

	def generate_pi(self):
		obj = {
			"doctype": "Purchase Invoice",
			"supplier": self.external_office,
			"items": self.get_items("Purchase"),
			"reference": self.get_visa_reference()
		}
		pi = frappe.get_doc(obj).insert()

		frappe.db.sql(""" UPDATE `tabVisa` SET purchase_invoice=%s WHERE cv=%s """, (pi.name, self.name))
		frappe.db.commit()
		return pi.name
	def get_visa_reference(self):
		visa = frappe.db.sql(""" SELECT * FROM `tabVisa` WHERE cv=%s""", self.name, as_dict=1)
		if len(visa) > 0:
			return [{
				"visa_reference": visa[0].name,
				"date": visa[0].visa_date,
				"amount": visa[0].visa_price,
			}]
		return []
	def get_items(self, doctype):
		return [{
			"item_code": self.service_type,
			"item_name": frappe.db.get_value("Item", self.service_type, "item_name"),
			"description": frappe.db.get_value("Item", self.service_type, "description"),
			"uom": frappe.db.get_value("Item", self.service_type, "stock_uom"),
			"rate": self.get_rate(doctype),
			"qty": 1,
		}]
	def get_rate(self, doctype):
		condition = " and selling=1 " if doctype == "Sales" else " and buying=1 "
		query = """ SELECT * FROM `tabItem Price` WHERE item_code='{0}' {1} ORDER BY valid_from DESC LIMIT 1""".format(self.service_type,condition)
		item_price = frappe.db.sql(query, as_dict=1)
		if len(item_price) > 0:
			return item_price[0].price_list_rate
		else:
			frappe.throw("Please set " + "selling" if doctype == "Sales" else "buying" + " rate for item " + str(self.service_type))
@frappe.whitelist()
def get_submitted_visa(name):
	visa = frappe.db.sql(""" SELECT * FROM `tabVisa` WHERE cv=%s """, name, as_dict=1)
	rental = frappe.db.sql(""" SELECT * FROM `tabRental` WHERE cv=%s""", name, as_dict=1)
	return visa[0].docstatus if len(visa) > 0 and visa[0].docstatus < 2 else 0, len(visa) > 0, True if len(visa) > 0 and visa[0].sales_invoice else False, True if len(visa) > 0 and visa[0].purchase_invoice else False, True if len(rental) > 0 else False