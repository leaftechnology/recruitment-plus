from __future__ import unicode_literals
from frappe import _

def get_data():
	return {
		'fieldname': 'cv',
		'transactions': [
			{
				'label': _('Linked Forms'),
				'items': ["Visa","Rental", "Recruitment Request"]
			}
		]
	}