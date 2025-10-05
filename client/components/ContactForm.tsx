import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? target.checked : value,
    });
  };

  const validate = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return "Valid email is required";
    if (!/^\d{10}$/.test(formData.phone)) return "Phone must be 10 digits";
    if (!formData.message.trim()) return "Message is required";
    if (!formData.consent) return "You must accept the consent";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }
    setError("");
    setSuccess("Thank you! Your message has been submitted.");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="relative">
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      {success && <p className="mb-3 text-sm text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone (10 digits)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          maxLength={10}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl border border-primary/20 bg-secondary/40 p-3 text-sm text-primary shadow-inner shadow-primary/5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <label className="flex items-center gap-2 text-sm text-primary">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="h-4 w-4 rounded border-primary/20"
          />
          I consent to the terms and conditions
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}




