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
