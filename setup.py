# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in recruitment_plus/__init__.py
from recruitment_plus import __version__ as version

setup(
	name='recruitment_plus',
	version=version,
	description='Recruitment Plus',
	author='Jan',
	author_email='janlloydangeles@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
