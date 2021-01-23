frappe.listview_settings['Rental'] = {
	add_fields: ["status"],
	get_indicator: function (doc) {
		if (["Confirmed", "To Pick Up","To Return"].includes(doc.status)) {
			// Closed
			return [__(doc.status), "orange", "status,=," + doc.status];
		} else if (doc.status === "Completed") {
			// Closed
			return [__(doc.status), "green", "status,=," + doc.status];
		}

	},
};