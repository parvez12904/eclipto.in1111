export interface ContactConfig {
  businessName: string;
  tagline: string;
  founder: string;
  phone: {
    raw: string; // e.g., '+917720835581'
    display: string; // e.g., '+91 77208 35581'
    telLink: string; // 'tel:+917720835581'
  };
  email: {
    address: string; // 'eclipto.in@gmail.com'
    subject: string;
    bodyTemplate: string;
    mailtoLink: string;
  };
  whatsapp: {
    number: string; // '917720835581'
    display: string;
    defaultMessage: string;
    chatLink: string;
  };
}

const EMAIL_ADDRESS = 'eclipto.in@gmail.com';
const PHONE_RAW = '+917720835581';
const PHONE_DISPLAY = '+91 77208 35581';
const WHATSAPP_NUMBER = '917720835581';

const DEFAULT_EMAIL_SUBJECT = 'New Project Enquiry — Eclipto';
const DEFAULT_EMAIL_BODY = `Hi Parvez,

I visited the Eclipto website and would like to discuss a project.

Project Enquiry Details:
• Name: 
• Business / Company: 
• Required Service (Website / Software / AI Automation / Digital Marketing): 
• Estimated Budget: 
• Project Requirements & Timeline: 

Looking forward to hearing from you.`;

const DEFAULT_WHATSAPP_MESSAGE =
  'Hi Parvez, I visited the Eclipto website and would like to discuss a project. Please share more details about your services.';

export const CONTACT_CONFIG: ContactConfig = {
  businessName: 'ECLIPTO',
  tagline: 'Digital Experiences. Intelligent Solutions.',
  founder: 'Parvez Khan',
  phone: {
    raw: PHONE_RAW,
    display: PHONE_DISPLAY,
    telLink: `tel:${PHONE_RAW}`,
  },
  email: {
    address: EMAIL_ADDRESS,
    subject: DEFAULT_EMAIL_SUBJECT,
    bodyTemplate: DEFAULT_EMAIL_BODY,
    mailtoLink: `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
      DEFAULT_EMAIL_SUBJECT
    )}&body=${encodeURIComponent(DEFAULT_EMAIL_BODY)}`,
  },
  whatsapp: {
    number: WHATSAPP_NUMBER,
    display: PHONE_DISPLAY,
    defaultMessage: DEFAULT_WHATSAPP_MESSAGE,
    chatLink: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      DEFAULT_WHATSAPP_MESSAGE
    )}`,
  },
};

/**
 * Helper to generate dynamic mailto links from form inputs
 */
export const buildCustomMailto = (params: {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
}): string => {
  const subject = `Project Enquiry from ${params.name || 'Website Visitor'} — Eclipto`;
  const body = `Hi Parvez,

Here are my project enquiry details:

• Client Name: ${params.name || 'Not specified'}
• Client Email: ${params.email || 'Not specified'}
• Company / Entity: ${params.company || 'Not specified'}
• Service Required: ${params.service || 'Not specified'}
• Estimated Budget: ${params.budget || 'Not specified'}

Project Overview:
${params.message || 'No additional details provided.'}

Sent via Eclipto Website`;

  return `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

/**
 * Helper to generate dynamic WhatsApp links from form inputs
 */
export const buildCustomWhatsAppLink = (params: {
  name?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
}): string => {
  const text = `Hi Parvez, my name is ${params.name || 'a visitor'}${
    params.company ? ` from ${params.company}` : ''
  }. I am interested in ${params.service || 'a project'} (Budget: ${
    params.budget || 'Flexible'
  }).

Details: ${params.message || 'Please share more information.'}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};
