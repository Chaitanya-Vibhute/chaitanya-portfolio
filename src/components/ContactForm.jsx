import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { cn } from "../utils/cn";
import MagneticButton from "./MagneticButton";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name (at least 2 characters)."),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z.string().trim().min(3, "Please add a subject (at least 3 characters)."),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(2000, "Message is too long (max 2000 characters)."),
});

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
];

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", subject: "", message: "" } });

  const onSubmit = async (values) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("The contact form isn't configured yet. Please email me directly instead.");
      return;
    }

    try {
      // Loaded on demand so EmailJS isn't part of the initial bundle.
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          reply_to: values.email,
          subject: values.subject,
          message: values.message,
        },
        { publicKey }
      );
      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong sending your message. Please try again or email me directly.");
    }
  };

  const inputCls = (hasError) =>
    cn(
      "peer w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-sm text-soft placeholder:text-muted/60 transition focus:border-violet focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-violet/30",
      hasError ? "border-red-400/70" : "border-white/10"
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass space-y-5 p-6 sm:p-8" aria-label="Contact form">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="mb-2 block text-sm font-medium text-soft">
            {f.label}
          </label>
          <input
            id={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            aria-invalid={!!errors[f.name]}
            aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
            className={inputCls(errors[f.name])}
            {...register(f.name)}
          />
          {errors[f.name] && (
            <p id={`${f.name}-error`} role="alert" className="mt-1.5 text-xs text-red-300">
              {errors[f.name].message}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-soft">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputCls(errors.message), "resize-y")}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-300">
            {errors.message.message}
          </p>
        )}
      </div>

      <MagneticButton type="submit" disabled={isSubmitting} cursorLabel="Send" className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Send Message <Send size={16} aria-hidden="true" />
          </>
        )}
      </MagneticButton>
    </form>
  );
}
