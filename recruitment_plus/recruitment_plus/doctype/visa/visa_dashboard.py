from __future__ import unicode_literals
from frappe import _

def get_data():
	return {
		'fieldname': 'visa_reference',
		'non_standard_fieldnames': {
			'Sales Invoice': 'visa_reference',
		},
		'transactions': [
			{
				'label': _('Linked Forms'),
				'items': ['Sales Invoice']
			}
		]
	}