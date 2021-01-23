from __future__ import unicode_literals
from frappe import _

def get_data():
	return {
		'fieldname': 'rental',
		'transactions': [
			{
				'label': _('Linked Forms'),
				'items': ["Rental Pick Up","Rental Return"]
			}
		]
	}