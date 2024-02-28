# Auth0 Installation Guide

Follow these steps to set up Auth0 authentication in your Express.js application.

## 1. Set Up Frontend Part of Auth0

Visit [Medcal-frontend](https://github.com/hackademic-io/medcal-frontend) and follow the instructions in the README file.

## 2. Create a New Application

- Navigate to Applications => APIs.
- Click 'Create API'.
- Enter the name of the API; the identifier should be 'http://localhost:3001', and the algorithm should be RS256.

## 3. Install Dependencies

Ensure you have all necessary dependencies installed by running:

```bash
npm i
```

## 4. Configure Environment Variables

Create a `.env` file in the root directory of your project and add the following properties:

```plaintext
ISSUER_URL='https://[Copy link from the dashboard page's 'Settings' property Domain (From Frontend Application)]'
AUTH0_AUDIENCE='http://localhost:3001'
AUTH0_BASE_URL='http://localhost:3000'
```

## 5. Start and Test

To begin, open the development server and test the API route by sending a GET request to `/appointment` from POSTMAN:

```bash
npm run dev
```

Expect to receive an unauthorized error at this stage. Next, navigate to the frontend part of the application and also run `npm run dev` there. Attempt to schedule an appointment. Finally, visit the `/dashboard` page, where you should be able to view your appointment.
