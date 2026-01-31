'use client';

import { useState } from 'react';

interface ContactFormProps {
  artworkSlug?: string;
}

export default function ContactForm({ artworkSlug }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: artworkSlug ? `Consulta sobre obra: ${artworkSlug}` : '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      // Usar Formspree u otro servicio similar
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
      
      if (!formspreeId) {
        throw new Error('Formspree ID no configurado');
      }

      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o envía un email directamente a info@acuarelas.com');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-watercolor-500 focus:border-transparent transition-colors"
          placeholder="Tu nombre"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-watercolor-500 focus:border-transparent transition-colors"
          placeholder="tu@email.com"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Asunto *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-watercolor-500 focus:border-transparent transition-colors"
          placeholder="¿De qué quieres hablar?"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-watercolor-500 focus:border-transparent transition-colors resize-none"
          placeholder="Cuéntame más sobre tu consulta..."
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          ¡Mensaje enviado con éxito! Te responderé lo antes posible.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
      </button>

      <p className="text-sm text-gray-500 text-center">
        * Campos obligatorios
      </p>
    </form>
  );
}
