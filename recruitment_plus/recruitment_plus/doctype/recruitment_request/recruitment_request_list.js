frappe.listview_settings['Recruitment Request'] = {
	add_fields: ["status"],
	get_indicator: function (doc) {
		if (["Open", "In Progress","Closed"].includes(doc.status)) {
			// Closed
			return [__(doc.status), "orange", "status,=," + doc.status];
		} else if (doc.status === "Completed") {
			// Closed
			return [__(doc.status), "green", "status,=," + doc.status];
		}

	},
};