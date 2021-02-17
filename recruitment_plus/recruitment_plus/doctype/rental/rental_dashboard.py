from __future__ import unicode_literals
from frappe import _

def get_data():
	return {
		'fieldname': 'rental',
		'non_standard_fieldnames': {
			'Sales Invoice': 'rental_reference',
		},
		'transactions': [
			{
				'label': _('Linked Forms'),
				'items': ["Rental Pick Up","Rental Return", "Sales Invoice", "Journal Entry", "Additional Salary"]
			}
		]
	}