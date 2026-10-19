"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PROJECTS, type ProjectConfig } from "@/config/projects";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useT } from "@/i18n";
import { trackEvent } from "@/lib/analytics";

interface FormData {
  name: string;
  phone: string;
  email?: string;
  project: string;
  budget?: string;
  visitDate?: string;
  notes?: string;
  consent: boolean;
  honeypot: string;
  renderedAt: number;
}

export function EnquiryForm({ initialProject }: { initialProject?: string }) {
  const { t } = useT();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      project: initialProject || (PROJECTS[0]?.slug ?? "the-garden-city"),
      budget: "Under 50 Lakhs",
      visitDate: "",
      notes: "",
      consent: false,
      honeypot: "",
      renderedAt: Date.now(),
    },
  });

  useEffect(() => {
    setValue("renderedAt", Date.now());
  }, [setValue]);

  const goToNextStep = async () => {
    const valid = await trigger(["name", "phone", "email"]);
    if (valid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to submit enquiry");
      }

      setIsSuccess(true);
      setSubmittedData(data);
      trackEvent("generate_lead", { project: data.project, budget: data.budget });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission error. Please try again or WhatsApp us.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && submittedData) {
    const waUrl = getWhatsAppUrl(
      `Hi V.V Properties, I just submitted an enquiry for ${submittedData.project}. My name is ${submittedData.name}.`
    );

    return (
      <div className="bg-paper p-8 rounded-3xl border border-stone/40 text-center space-y-5 animate-fade-in">
        <div className="w-14 h-14 bg-accent/15 text-accent rounded-full flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="font-serif text-2xl text-ink font-light">Enquiry Received</h3>
          <p className="text-muted text-sm mt-2 max-w-md mx-auto">
            Thank you, {submittedData.name}. An advisor will reach out to you within one business day regarding{" "}
            <span className="font-medium text-ink">
              {PROJECTS.find((p: ProjectConfig) => p.slug === submittedData.project)?.title ?? submittedData.project}
            </span>
            .
          </p>
        </div>

        {waUrl && (
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-800 text-ivory hover:bg-emerald-900 transition-colors text-sm font-medium shadow-sm"
            >
              <span>Instant Confirmation on WhatsApp</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.8.814 3.182 0 5.768-2.587 5.768-5.766 0-3.181-2.586-5.766-5.772-5.766zm8.472 5.766c0 4.686-3.813 8.498-8.472 8.498-1.455 0-2.825-.373-4.025-1.026l-4.506 1.182 1.206-4.394c-.754-1.272-1.187-2.766-1.187-4.26 0-4.686 3.813-8.498 8.472-8.498 4.686 0 8.512 3.812 8.512 8.498z" />
              </svg>
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-paper p-6 md:p-8 rounded-3xl border border-stone/40 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-stone/30 mb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted">Direct Enquiry</span>
          <h3 className="font-serif text-xl md:text-2xl text-ink font-light mt-0.5">
            {step === 1 ? "Your Contact Details" : "Project & Preferences"}
          </h3>
        </div>
        <div className="text-xs font-mono text-muted">Step {step} of 2</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Honeypot field (hidden from real users) */}
        <input
          type="text"
          {...register("honeypot")}
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
          aria-hidden="true"
        />

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="lead-name" className="block text-xs font-medium text-ink uppercase tracking-wider mb-1.5">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                id="lead-name"
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="e.g. S. Karthik"
                className="w-full px-4 py-3 rounded-xl border border-stone/60 bg-ivory/50 text-ink text-sm focus:border-accent focus:bg-white focus:outline-none transition-colors"
              />
              {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="lead-phone" className="block text-xs font-medium text-ink uppercase tracking-wider mb-1.5">
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                id="lead-phone"
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+() -]{10,15}$/,
                    message: "Please enter a valid 10-digit number",
                  },
                })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl border border-stone/60 bg-ivory/50 text-ink text-sm focus:border-accent focus:bg-white focus:outline-none transition-colors"
              />
              {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="lead-email" className="block text-xs font-medium text-ink uppercase tracking-wider mb-1.5">
                Email Address <span className="text-muted font-normal">(Optional)</span>
              </label>
              <input
                id="lead-email"
                type="email"
                {...register("email")}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl border border-stone/60 bg-ivory/50 text-ink text-sm focus:border-accent focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={goToNextStep}
                className="w-full py-3.5 px-6 rounded-full bg-ink text-ivory hover:bg-ink/90 font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Continue to Project Details</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="lead-project" className="block text-xs font-medium text-ink uppercase tracking-wider mb-1.5">
                Interested Project <span className="text-danger">*</span>
              </label>
              <select
                id="lead-project"
                {...register("project", { required: true })}
                className="w-full px-4 py-3 rounded-xl border border-stone/60 bg-ivory/50 text-ink text-sm focus:border-accent focus:bg-white focus:outline-none transition-colors"
              >
                {PROJECTS.map((proj: ProjectConfig) => (
                  <option key={proj.slug} value={proj.slug}>
                    {proj.title} ({proj.location.taluk})
                  </option>
                ))}
                <option value="general">General Consultation / Future Locations</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lead-budget" className="block text-xs font-medium text-ink uppercase tracking-wider mb-1.5">
                  Target Budget
                </label>
                <select
                  id="lead-budget"
                  {...register("budget")}
                  className="w-full px-4 py-3 rounded-xl border border-stone/60 bg-ivory/50 text-ink text-sm focus:border-accent focus:bg-white focus:outline-none transition-colors"
                >
                  <option value="Under 35 Lakhs">Under ₹35 Lakhs</option>
                  <option value="35 to 60 Lakhs">₹35 – 60 Lakhs</option>
                  <option value="60 to 1 Crore">₹60 Lakhs – ₹1 Crore</option>
                  <option value="Above 1 Crore">Above ₹1 Crore</option>
                </select>
              </div>

              <div>
                <label htmlFor="lead-visitDate" className="block text-xs font-medium text-ink uppercase tracking-wider mb-1.5">
                  Preferred Visit Date
                </label>
                <input
                  id="lead-visitDate"
                  type="date"
                  {...register("visitDate")}
                  className="w-full px-4 py-3 rounded-xl border border-stone/60 bg-ivory/50 text-ink text-sm focus:border-accent focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lead-notes" className="block text-xs font-medium text-ink uppercase tracking-wider mb-1.5">
                Specific Plot or Requirement Notes
              </label>
              <textarea
                id="lead-notes"
                rows={2}
                {...register("notes")}
                placeholder="Preferred facing (East/North), corner plot preference, or immediate registration timeline..."
                className="w-full px-4 py-3 rounded-xl border border-stone/60 bg-ivory/50 text-ink text-sm focus:border-accent focus:bg-white focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 text-xs text-muted leading-relaxed cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register("consent", { required: "Consent is required to submit enquiry" })}
                  className="mt-0.5 rounded border-stone/60 text-ink focus:ring-accent"
                />
                <span>
                  I consent to V.V Properties contacting me regarding this enquiry via phone, WhatsApp, or email. We respect your privacy.
                </span>
              </label>
              {errors.consent && <p className="text-xs text-danger mt-1">{errors.consent.message}</p>}
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 text-danger text-xs rounded-xl border border-red-100">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-5 rounded-full border border-stone/50 text-ink text-sm hover:bg-stone/20 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 rounded-full bg-accent text-ink font-medium text-sm hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
