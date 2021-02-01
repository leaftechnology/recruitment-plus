// Copyright (c) 2021, Jan and contributors
// For license information, please see license.txt

frappe.ui.form.on('Visa', {
	refresh: function(frm) {
        $.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
          var placesAutocomplete = places({
            appId: 'plBBA3S4UJ7B',
            apiKey: '0862ae80a132be1181fac98cf20ecfac',
            container: cur_frm.fields_dict.destination.input
          });

          var $address = cur_frm.fields_dict.destination.input
          placesAutocomplete.on('change', function(e) {
            $address.textContent = e.suggestion.value
          });

          placesAutocomplete.on('clear', function() {
            $address.textContent = 'none';
          });
        })

        $.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
          var placesAutocomplete = places({
            appId: 'plBBA3S4UJ7B',
            apiKey: '0862ae80a132be1181fac98cf20ecfac',
            container: cur_frm.fields_dict.airport_arrival.input
          });

          var $address = cur_frm.fields_dict.airport_arrival.input
          placesAutocomplete.on('change', function(e) {
            $address.textContent = e.suggestion.value
          });

          placesAutocomplete.on('clear', function() {
            $address.textContent = 'none';
          });
        })
	},
    visa_price: function() {
        cur_frm.doc.visa_final = cur_frm.doc.visa_price - cur_frm.doc.discount + (cur_frm.doc.amount_included_vat ? cur_frm.doc.visa_price * 0.15 : 0)
        cur_frm.refresh_field("visa_final")
    },
    discount: function() {
        cur_frm.trigger("visa_price")
    },
    amount_included_vat: function() {
        cur_frm.trigger("visa_price")
    },
});
