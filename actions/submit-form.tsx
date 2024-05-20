'use server'

import * as z from 'zod'

import { db } from "@/lib/db";
import { Events, formSchemaData } from "@/lib/schema";
import { getDataById } from '@/data-query/appointment';

export const submitForm = async (
    values: z.infer<typeof formSchemaData>
) => {
    const validatedFields = formSchemaData.safeParse(values)

    if(!validatedFields.success){
        return {error: "Form not submitted successfully!"}
    }

    const {
        title,
        email,
        fullName,
        contactPerson,
        department,
        dateOfEvent,
        purpose,
        startingTime,
        endingTime,
        doesHaveDryRun,
        dryRunDate,
        dryRunStart,
        dryRunEnd,
        doesHaveTCETAssitance,
        tcetOtherAssitance,
        meetingTypeOption,
        meetingTypeServices,
        meetingTypeServiceLink,
        cameraSetup

    } = validatedFields.data

    const doesHaveTCETAssitanceToString = doesHaveTCETAssitance.join()
    const meetingTypeServicesToString = meetingTypeServices.join()

    try {
        await db.appoinmentSchedule.create({
            data: {
                title,
                email,
                fullName,
                contactPerson,
                department,
                dateOfEvent,
                purpose,
                startingTime,
                endingTime,
                doesHaveDryRun,
                dryRunDate,
                dryRunStart,
                dryRunEnd,
                doesHaveTCETAssitance: doesHaveTCETAssitanceToString,
                tcetOtherAssitance,
                meetingTypeOption,
                meetingTypeServices: meetingTypeServicesToString,
                meetingTypeServiceLink,
                cameraSetup
            }
        })

        return {success: "Appointment has been successfully submitted!"}
    } catch (error) {
        return {error: "Something went wrong"}
    }
 }


 export const updateForm = async (
    { values, id }: { values: Events, id: string }
) => {
    const validatedFields = formSchemaData.safeParse(values)

    if(!validatedFields.success){
        return {error: "Form not submitted successfully!"}
    }

    const isExisting = await getDataById(id)

    if(!isExisting) return {error: "Data not existing"}

    const {
        title,
        email,
        fullName,
        contactPerson,
        department,
        dateOfEvent,
        purpose,
        startingTime,
        endingTime,
        doesHaveDryRun,
        dryRunDate,
        dryRunStart,
        dryRunEnd,
        doesHaveTCETAssitance,
        tcetOtherAssitance,
        meetingTypeOption,
        meetingTypeServices,
        meetingTypeServiceLink,
        cameraSetup

    } = validatedFields.data

    const doesHaveTCETAssitanceToString = doesHaveTCETAssitance.join()
    const meetingTypeServicesToString = meetingTypeServices.join()

    try {
        await db.appoinmentSchedule.update({
            where: {
                id: id
            },
            data: {
                title,
                email,
                fullName,
                contactPerson,
                department,
                dateOfEvent,
                purpose,
                startingTime,
                endingTime,
                doesHaveDryRun,
                dryRunDate,
                dryRunStart,
                dryRunEnd,
                doesHaveTCETAssitance: doesHaveTCETAssitanceToString,
                tcetOtherAssitance,
                meetingTypeOption,
                meetingTypeServices: meetingTypeServicesToString,
                meetingTypeServiceLink,
                cameraSetup
            }
        })

        return {success: "Appointment has been successfully updated!"}
    } catch (error) {
        return {error: "Something went wrong"}
    }
 }