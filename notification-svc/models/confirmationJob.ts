import cron from 'node-cron'
import { PrismaClient } from '@prisma/client';
import sendEmail from './sendEmail'
import { IAppointmentProps } from '../types/appointment.interface';

const prisma = new PrismaClient();

cron.schedule('0 12 * * *', async () => {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);

    const threeDaysFromNow = new Date(twoDaysFromNow);
    threeDaysFromNow.setDate(twoDaysFromNow.getDate() + 1);

    const appointmentsToConfirm = await prisma.appointment.findMany({
        where: {
            AND: [
                { status: "BOOKED" },
                {
                    appointmentDate: {
                        gte: twoDaysFromNow,
                        lt: threeDaysFromNow,
                    },
                },
            ]
        },
    });
    const emailType = 'confimation'
    appointmentsToConfirm.forEach((appointment: IAppointmentProps) => { sendEmail(emailType, appointment) })
    const idsToConfirm = appointmentsToConfirm.map((appointment: IAppointmentProps) => appointment.id)
    setTimeout(async () => {
        const ignoredAppointments = await prisma.appointmsnt.findMany({
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
});
