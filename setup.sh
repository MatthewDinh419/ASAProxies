#!/bin/bash

echo 'Starting setup script...'
echo 'Installing front-end requirements'
cd frontend
npm install
echo 'Installed front-end requirements'
cd ..
cd backend
echo 'Installing back-end requirements'
python3 -m venv env
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install django-allauth
pip install django-rest-auth
echo 'Installed back-end requirements'
echo 'Setup finished'