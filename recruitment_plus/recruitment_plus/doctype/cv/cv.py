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
		self.change_status("Sent to Outside" if self.external_office and self.customer else "In Progress" if self.customer and not self.external_office else "Available")

	def change_status(self, status):
		print(status)
		frappe.db.sql(""" UPDATE `tabCV` SET status=%s WHERE name=%s""",
					  (status, self.name))
		frappe.db.commit()
		self.reload()

	def generate_visa(self):
		obj = {
			"doctype": "Visa",
			"service_type": self.service_type,
			"religion": self.religion,
			"worked_before": self.worked_before,
			"external_office": self.external_office,
			"description": self.description,
			"from_age": self.age,
			"to_age": self.age,
			"cv": self.name,
		}
		frappe.get_doc(obj).insert()

	def generate_rental(self):
		obj = {
			"doctype": "Rental",
			"customer": self.customer,
			"cv": self.name,
		}
		frappe.get_doc(obj).insert()

	def generate_si(self):
		pass

@frappe.whitelist()
def get_submitted_visa(name):
	visa = frappe.db.sql(""" SELECT * FROM `tabVisa` WHERE cv=%s """, name, as_dict=1)
	return visa[0].docstatus if len(visa) > 0 and visa[0].docstatus < 2 else 0, len(visa) > 0