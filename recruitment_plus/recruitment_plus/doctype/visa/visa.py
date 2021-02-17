# -*- coding: utf-8 -*-
# Copyright (c) 2021, Jan and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Visa(Document):
	def on_submit(self):
		cv = frappe.db.sql(""" SELECT * FROM `tabCV`  WHERE name=%s""", self.cv, as_dict=1)
		if len(cv) > 0:
			if cv[0].own_recruitment:
				frappe.db.sql(""" UPDATE `tabCV` SET status=%s WHERE name=%s """, ("In Progress", self.cv))
				frappe.db.commit()
