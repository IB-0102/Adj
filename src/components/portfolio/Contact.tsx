import { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await axios.post('/api/contact', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-ivory relative">
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-lavender-light rounded-full blur-3xl opacity-60 transform translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-deeppurple mb-6">Let's Work Together</h2>
            <p className="text-lg text-olive mb-12">
              Ready to elevate your brand's visual identity? Get in touch with me today to discuss your next project.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lavender-light text-olive-dark rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-deeppurple mb-1">Email</h4>
                  <a href="mailto:adjim1990@gmail.com" className="text-olive hover:text-olive-dark transition-colors">adjim1990@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-deeppurple mb-1">WhatsApp</h4>
                  <a href="https://wa.me/2348064292639" target="_blank" rel="noopener noreferrer" className="text-olive hover:text-green-600 transition-colors">08064292639</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-deeppurple mb-1">Location</h4>
                  <p className="text-olive">Available worldwide (Remote)</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-ivory rounded-3xl p-8 shadow-2xl shadow-lavender/30 border border-lavender-light"
          >
            {submitStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-deeppurple mb-2">Message Sent!</h3>
                <p className="text-olive mb-8">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button onClick={() => setSubmitStatus('idle')} className="text-olive-dark font-medium hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-olive mb-2">Full Name</label>
                    <input
                      {...register("name")}
                      type="text"
                      id="name"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-lavender'} focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all bg-ivory-dark focus:bg-ivory`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-olive mb-2">Email</label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-lavender'} focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all bg-ivory-dark focus:bg-ivory`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-olive mb-2">Phone (Optional)</label>
                    <input
                      {...register("phone")}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-xl border border-lavender focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all bg-ivory-dark focus:bg-ivory"
                      placeholder="+1 (234) 567-890"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-olive mb-2">Subject</label>
                    <input
                      {...register("subject")}
                      type="text"
                      id="subject"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500' : 'border-lavender'} focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all bg-ivory-dark focus:bg-ivory`}
                      placeholder="Project Inquiry"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-olive mb-2">Message</label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-lavender'} focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all bg-ivory-dark focus:bg-ivory resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                </div>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                    Something went wrong. Please try again later.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-olive to-deeppurple hover:opacity-90 transition-opacity shadow-lg shadow-olive/25 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>Send Message <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
