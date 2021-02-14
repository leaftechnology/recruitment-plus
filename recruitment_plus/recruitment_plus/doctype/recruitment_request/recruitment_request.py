# -*- coding: utf-8 -*-
# Copyright (c) 2021, Jan and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class RecruitmentRequest(Document):
	def change_status(self, status):

		frappe.db.sql(""" UPDATE `tabRecruitment Request` SET status=%s, previous_status=%s WHERE name=%s """, (status, self.status, self.name))
		frappe.db.commit()

	def on_submit(self):
		customer = frappe.get_doc("Customer", self.customer)

		if not customer.mobile_no:
			frappe.db.sql(""" UPDATE `tabCustomer` SET mobile_no=%s WHERE name=%s""",
						  (self.telephone, self.customer))
			frappe.db.commit()

		if not customer.email_id:
			frappe.db.sql(""" UPDATE `tabCustomer` SET email_id=%s WHERE name=%s""",
						  (self.email, self.customer))
			frappe.db.commit()