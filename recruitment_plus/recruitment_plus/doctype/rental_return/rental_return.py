# -*- coding: utf-8 -*-
# Copyright (c) 2021, Jan and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class RentalReturn(Document):
	def on_submit(self):

		frappe.db.sql(""" UPDATE `tabRental` SET status='Completed'  WHERE name=%s""", self.rental)
		frappe.db.commit()
