# -*- coding: utf-8 -*-
# Copyright (c) 2021, Jan and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Rental(Document):
	def generate_additional_salary(self):
		recruitment_defaults = frappe.get_single("Recruitment Settings").__dict__
		print("REEEEEEEEEEEEEEEEe")
		print(recruitment_defaults)
		if not recruitment_defaults['default_salary_component']:
			frappe.throw("Please set Default Salary Component in Recruitment Settings")

		obj = {
			"doctype": "Additional Salary",
			"employee": self.employee,
			"payroll_date": self.from_date,
			"rental": self.name,
			"salary_component": recruitment_defaults['default_salary_component'],
			"amount": self.amount_for_employee,
		}
		additiona_salary = frappe.get_doc(obj)
		additiona_salary.insert(ignore_permissions=1)
		frappe.db.sql(""" UPDATE `tabRental` SET additional_salary=%s WHERE name=%s""", (additiona_salary.name, self.name))
		frappe.db.commit()
		return additiona_salary.name
	def generate_rental_jv(self):
		doc_jv = {
			"doctype": "Journal Entry",
			"voucher_type": "Journal Entry",
			"posting_date": self.from_date,
			"rental": self.name,
			"accounts": self.jv_accounts_paid(),
		}

		jv = frappe.get_doc(doc_jv)
		jv.insert(ignore_permissions=1)
		# jv.submit()
		frappe.db.sql(""" UPDATE `tabRental` SET journal_entry=%s WHERE name=%s""", (jv.name, self.name))
		frappe.db.commit()

		return jv.name

	def jv_accounts_paid(self):
		accounts = []
		recruitment_defaults = frappe.get_single("Recruitment Settings").__dict__
		if not recruitment_defaults['default_expense_account']:
			frappe.throw("Please set Default Expense Account in Recruitment Settings")

		accounts.append({
			'account': recruitment_defaults['default_expense_account'],
			'debit_in_account_currency': self.unit_price,
			'credit_in_account_currency': 0,
		})
		mop = frappe.db.sql(""" SELECT * FROM `tabMode of Payment Account` WHERE parent=%s """,
								 (recruitment_defaults['mode_of_payment']), as_dict=1)
		if len(mop) > 0:
			accounts.append({
				'account': mop[0].default_account,
				'debit_in_account_currency': 0,
				'credit_in_account_currency': self.unit_price
			})
		return accounts
	def generate_rental_pickup(self):
		obj = {
			"doctype": "Rental Pick Up",
			"customer": self.customer,
			"rental": self.name,
		}
		rental_pickup = frappe.get_doc(obj).insert()
		return rental_pickup.name

	def generate_rental_return(self):
		obj = {
			"doctype": "Rental Return",
			"customer": self.customer,
			"rental": self.name,
		}
		rental_return = frappe.get_doc(obj).insert()
		return rental_return.name

	def generate_si(self):
		obj = {
			"doctype": "Sales Invoice",
			"customer": self.customer,
			"items": self.get_items(),
			"rental": self.get_rental_reference()
		}
		si = frappe.get_doc(obj).insert()
		frappe.db.sql(""" UPDATE `tabRental` SET sales_invoice=%s WHERE name=%s """, (si.name, self.name))
		frappe.db.commit()
		return si.name
	def get_rental_reference(self):
		return [{
			"rental_reference": self.name,
			"from_date": self.from_date,
			"to_date": self.to_date,
			"qty": 1,
			"amount": self.unit_price,
		}]

	def get_items(self):
		cv = frappe.db.sql(""" SELECT * FROM `tabCV` WHERE name=%s """, self.cv, as_dict=1)
		if len(cv) > 0:
			return [{
				"item_code": cv[0].service_type,
				"item_name": frappe.db.get_value("Item", cv[0].service_type, "item_name"),
				"description": frappe.db.get_value("Item", cv[0].service_type, "description"),
				"uom": frappe.db.get_value("Item", cv[0].service_type, "stock_uom"),
				"rate": self.get_rate(cv[0].service_type),
				"qty": 1,
			}]

	def get_rate(self, item_code):
		condition = " and selling=1 "
		query = """ SELECT * FROM `tabItem Price` WHERE item_code='{0}' {1} ORDER BY valid_from DESC LIMIT 1""".format(item_code,condition)
		item_price = frappe.db.sql(query, as_dict=1)
		if len(item_price) > 0:
			return item_price[0].price_list_rate
		else:
			frappe.throw("Please set selling rate for item " + str(item_code))