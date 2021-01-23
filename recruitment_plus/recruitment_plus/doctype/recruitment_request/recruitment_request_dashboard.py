from __future__ import unicode_literals
from frappe import _

def get_data():
	return {
		'fieldname': 'recruitment_request',
		'transactions': [
			{
				'label': _('Linked Forms'),
				'items': ["CV"]
			}
		]
	}