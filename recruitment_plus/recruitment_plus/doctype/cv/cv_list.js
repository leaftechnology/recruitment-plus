frappe.listview_settings['CV'] = {
	add_fields: ["status"],
	get_indicator: function (doc) {
		if (["Available", "In Progress","Sent to Outside", "Ticket","Arravel"].includes(doc.status)) {
			// Closed
			return [__(doc.status), "orange", "status,=," + doc.status];
		} else if (doc.status === "Completed") {
			// Closed
			return [__(doc.status), "green", "status,=," + doc.status];
		}

	},
};