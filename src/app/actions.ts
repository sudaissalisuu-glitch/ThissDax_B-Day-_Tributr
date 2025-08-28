"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message: string;
  success: boolean;
};

export async function sendBirthdayMessage(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
      success: false,
    };
  }

  // Simulate sending an email
  console.log("--- New Birthday Message ---");
  console.log("Name:", validatedFields.data.name);
  console.log("Email:", validatedFields.data.email);
  console.log("Message:", validatedFields.data.message);
  console.log("----------------------------");

  return {
    message: "Thank you for your birthday message!",
    success: true,
  };
}
