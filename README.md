# Medcal - Microservice-driven Appointment Management System (Backend)

[![Demo Video](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID)

Medcal is a microservice-driven web application designed to help clinics efficiently manage appointments, reduce cancellations, and improve scheduling. It consists of separate [frontend](https://github.com/hackademic-io/medcal-frontend) and backend repositories.

# Overview

The goal of Medcal is to automate appointment management, reduce financial losses from cancellations, and improve patient satisfaction. The backend is built with Node.js, TypeScript, Express.js, PostgreSQL, Docker, RabbitMQ, while the frontend uses React (Next.js), Tailwind CSS, and TypeScript.

# Features

## Backend Services

### Appointment Service

- Handles creating, updating, and canceling appointments.

### Confirmation Cron Job

Executes on a specific schedule (e.g., daily) to:

- Send emails in advance to patients with upcoming appointments.

### Rescheduling Cron Job

Executes on a specific schedule (e.g., daily) to:

- Fetch all canceled appointments from the upcoming days.

### Rescheduling Service

- Receives canceled appointments through RabbitMQ.
- Matches canceled appointments with patients who are open to earlier dates.

### Notification Service

- Sends emails to patients with offers for earlier appointments.
- Patients have 2 hours to respond.
  - If a patient accepts, their appointment is rescheduled to another date.
  - If a patient does not respond or rejects the offer, the appointment is put back into the queue for rescheduling.

## Frontend

The frontend is an admin dashboard where the admin staff can:

- Create new users or sign in to system through Auth0
- See all appointments
- Cancel appointments
- Make new appointments using an interactive calendar with specific time slots
- Mark that they are open to receiving offers for earlier dates when making appointments for patients

## Workflow

### Admin Creates Appointment

- Admin staff creates a new appointment for a patient.
- Admin can indicate if the patient is open to receiving offers for earlier dates.

### Cron Job Sends Emails

- The Confirmation Cron job executes on a specific schedule (e.g., daily) and performs the following task:
  - Sends reminder emails to patients with upcoming appointments.

### Patient Actions

- Patients can confirm or cancel their appointment.

### Cancellation

- If a patient cancels, the appointment status is changed to canceled in the Appointment Service.

### Rescheduling

- The Rescheduling Cron job fetches all canceled appointments.
- Rescheduling Service matches canceled appointments with patients open to earlier dates and sends this pair to Notification Service.
- Notification Service sends offers for earlier appointments to patients via email.

### Patient Response

- Patients have 2 hours to respond to the offer.
- If accepted, the appointment is rescheduled.
- If no response or rejection, the appointment is put back into the queue for rescheduling.

## Technologies Used

### Frontend

- React (Next.js)
- Tailwind CSS
- TypeScript

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- RabbitMQ

### Authentication

- Auth0

### Form Handling

- React Hook Form

### DevOps

- Docker
- Kubernetes

<!-- ## Testing

- End-to-End (E2E) Tests: Core functionality covered with Cypress.
- Unit Tests: React components covered with Jest. -->

## [Link to frontend repo](https://github.com/hackademic-io/medcal-frontend)

## Developers

Vladislav Lychak | [@Github](https://github.com/LychakVlad) <br />
Mykhailo (Misha) Fomenko | [@Github](https://github.com/MishaFomenko) <br />
Deepu Premrajan | [@Github](https://github.com/deepu-premrajan) <br />

<p align="right">(<a href="#readme-top">back to top</a>)</p>
