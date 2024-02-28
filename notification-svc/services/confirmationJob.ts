import cron from 'node-cron'
import { PrismaClient } from '@prisma/client';
import sendEmail from './sendEmail'
import { IAppointmentProps } from '../types/appointment.interface';

const prisma = new PrismaClient();
const confirmationJob = () => {
    cron.schedule('0 12 * * *', async () => {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const twoDaysFromNow = new Date(today);
        twoDaysFromNow.setDate(today.getDate() + 2);

        const threeDaysFromNow = new Date(twoDaysFromNow);
        threeDaysFromNow.setDate(twoDaysFromNow.getDate() + 1);

        const appointmentsToConfirm: IAppointmentProps[] = await fetch(`http://localhost:3000/appointment/booked?MaxDate=${threeDaysFromNow}&MinDate=${twoDaysFromNow}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

        const emailType = 'confimation'
        appointmentsToConfirm.forEach((appointment: IAppointmentProps) => { sendEmail(emailType, appointment) })
        const idsToConfirm = appointmentsToConfirm.map((appointment: IAppointmentProps) => appointment.id)
        setTimeout(async () => {
            const ignoredAppointments = await prisma.appointment.findMany({
                where: {
                    id: {
                        in: idsToConfirm
                    }
                }
            })
            ignoredAppointments.forEach((appointment: IAppointmentProps) => {
                fetch(`http://localhost:3000/appointment/${appointment.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: null
                })
            })
        }, 1000 * 60 * 60 * 2)
    })
}

export default confirmationJob
