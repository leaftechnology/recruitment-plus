# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "recruitment_plus"
app_title = "Recruitment Plus"
app_publisher = "Jan"
app_description = "Recruitment Plus"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "janlloydangeles@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/recruitment_plus/css/recruitment_plus.css"
# app_include_js = "/assets/recruitment_plus/js/recruitment_plus.js"

# include js, css files in header of web template
# web_include_css = "/assets/recruitment_plus/css/recruitment_plus.css"
# web_include_js = "/assets/recruitment_plus/js/recruitment_plus.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "recruitment_plus/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "recruitment_plus.install.before_install"
# after_install = "recruitment_plus.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "recruitment_plus.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	"Sales Invoice": {
		"on_submit": "recruitment_plus.doc_events.sales_invoice.submit_si",
		"on_cancel": "recruitment_plus.doc_events.sales_invoice.cancel_si",
	}
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"recruitment_plus.tasks.all"
# 	],
# 	"daily": [
# 		"recruitment_plus.tasks.daily"
# 	],
# 	"hourly": [
# 		"recruitment_plus.tasks.hourly"
# 	],
# 	"weekly": [
# 		"recruitment_plus.tasks.weekly"
# 	]
# 	"monthly": [
# 		"recruitment_plus.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "recruitment_plus.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "recruitment_plus.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "recruitment_plus.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

fixtures = [
    {
        "doctype": "Custom Field",
        "filters": [
            [
                "name",
                "in",
                [
                    "Purchase Invoice-reference",
                    "Sales Invoice-reference",
                    "Sales Invoice-rental",
                    "Customer-national_id",
                    "Journal Entry-rental",
                    "Additional Salary-rental",
                ]
            ]
        ]
    }
]