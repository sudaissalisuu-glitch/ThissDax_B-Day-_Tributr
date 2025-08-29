'use server';

import { z } from 'zod';

const sendBirthdayMessageSchema = z.object({
  from_name: z.string().min(1, { message: 'Name is required.' }),
  reply_to: z.string().email({ message: 'Invalid email address.' }),
  message: z.string().min(1, { message: 'Message is required.' }),
});

export async function sendBirthdayMessage(
  prevState: {
    message: string;
    errors?: Record<string, string[] | undefined> | string;
    success: boolean;
  },
  formData: FormData
) {
  const validatedFields = sendBirthdayMessageSchema.safeParse({
    from_name: formData.get('from_name'),
    reply_to: formData.get('reply_to'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    console.log('--- Sending Birthday Message ---');
    console.log('From:', validatedFields.data.from_name);
    console.log('Email:', validatedFields.data.reply_to);
    console.log('Message:', validatedFields.data.message);
    console.log('-----------------------------');

    // This is a demo, so we'll just simulate a delay.
    // In a real app, you would integrate an email service like EmailJS, Resend, etc.
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: 'Message sent successfully!',
      success: true,
    };
  } catch (error) {
    return {
      message: 'Failed to send message.',
      errors: 'An unexpected error occurred.',
      success: false,
    };
  }
}
