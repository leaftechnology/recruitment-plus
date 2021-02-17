frappe.listview_settings['Visa'] = {
	add_fields: ["status"],
	get_indicator: function (doc) {
		if (["Available"].includes(doc.status)) {
			// Closed
			return [__(doc.status), "orange", "status,=," + doc.status];
		} else if (["Used"].includes(doc.status)) {
			// Closed
			return [__(doc.status), "green", "status,=," + doc.status];
		} else if (["Not Available"].includes(doc.status)) {
			// Closed
			return [__(doc.status), "red", "status,=," + doc.status];
		}

	},
};