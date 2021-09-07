# Tiktak Watch E-commerce Website with Paypal Integration
Link Backend Hosting: https://tiktakwatch.herokuapp.com/  
Link Frontend Hosting: https://tiktakwatch.netlify.app/  
* Frontend: ReactJS, Redux (redux toolkits), Axios.
* Backend: Django, Django Rest API framework, JWT authentication
* Database: PostgreSQL  

## All pages
* Home, Search
* Product Detail
* Cart
* Checkout
* Order Detail
* User Profile
* Login
* Register

## Highlight Features
* Shopping cart features
* Review and rating product
* Product pagination
* Product search, auto search by word, debounced search for 300 ms (Maybe delay a little bit due to hosting network) 
* Change User profile
* Checkout process (shipping, payment method)
* PayPal and credit card Integration


## Download & Setup Instructions
* 1 - Clone project: git clone https://github.com/phqlong/tiktak.git
* 2 - cd tiktak

### ** Run backend **
#### If you want to run backend on local
* 3 - cd backend
* 4 - pip install -r requirements.txt

#### If you want to run postgres db on local
* 5 - Create postgres db
* 6 - Add config of db in settings.py
* 7 - python manage.py makemigrations
* 8 - python manage.py migrate

#### Or you can use my Heroku Postgres and run server
* 9 - python manage.py runserver API-PORT

### ** Run Frontend **
* 10 - cd frontend
#### If you want to use local backend server:
* 11 - Config axios Client baseURL in src/api/axiosClient.js with baseURL="localhost:API-PORT"

#### Or if you are so lazyyy, just wanna run quickly, Then use my default backend Heroku server and just run
* 12 - npm install
* 13 - npm start
