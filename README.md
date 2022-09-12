# ASAProxies
A now deprecated software as a service providing residential proxies to end users. Software creates and tracks residential user data through a residential proxies provider called Oxylabs. Software features a React front-end with beautiful UI elements using the Material-UI library and custom branded logos. The front-end UI was created using Figma. The backend uses a python-based web framework (Django) and a mangoDB database to manage user accounts and handle data tracking. 

### Tech Stack Features
- Secure User Authentication
  * Email confirmation
  * Token-based authentication
  * Password reset
- Full Stripe and Oxylabs API integration
  * Data tracking
  * Payment history
- Endpoint Unit Tests

### Website Layout
- https://www.figma.com/file/PYp4g6Nz1RI0YjOtajRLEb/Asaproxies?node-id=0%3A1

### Front-end Requirements:

- npm

### Back-end Requirements:

- python3
- pip

### Automated Setup:

- ./setup.sh

### Starting the website:

- Front-End 
  * cd frontend
  * npm start
- Back-end
  * cd backend
  * python manage.py runserver
