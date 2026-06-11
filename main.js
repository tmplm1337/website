const t = {
  tagline:             'MSc Data-Driven IT Management',
  'nav.about':         'About',
  'nav.studies':       'Studies',
  'nav.experience':    'Experience',
  'nav.education':     'Education',
  'nav.contact':       'Contact',
  location:            'Gothenburg, Sweden',

  'about.title':       'About',
  'about.lead':        "Analytical and structured professional combining a Master's degree in Data-Driven IT Management with 15+ years of experience navigating complex enterprise organizations across the Nordics.",
  'about.p1':          'Skilled at translating business needs into clear, practical processes, identifying root causes behind quality issues, and driving change through communication and stakeholder alignment.',
  'about.p2':          'My background bridges business and IT: I understand how organizations actually work, how data flows between systems and teams, and how to build common ways of working that stick.',
  'about.skills':      'Skills',
  'about.languages':   'Languages',
  'lang.native':       'Native',
  'lang.fluent':       'Fluent',
  'lang.good':         'Very good',
  'lang.basic':        'Basic',

  'studies.title':     'Studies',
  'studies.msc.title': 'MSc Informatics: Data-Driven IT Management',
  'studies.msc.org':   'University of Borås',
  'studies.msc.desc1': "One-year Master's programme focused on IT governance, change management, process optimization and data-driven decision-making in organizations. Coursework includes data mining and analysis (KNIME) as well as business intelligence and visualization (Power BI), covering data quality, preparation and validation of large datasets.",
  'studies.msc.desc2': 'Thesis research applied Grounded Theory methodology to examine how Swedish higher education institutions select and implement digital meeting platforms; a structured qualitative study involving interviews with IT managers across 15 institutions, with publication planned during 2026.',
  'studies.bsc.title': 'BSc Business Administration: Enterprising & Business Development',
  'studies.bsc.org':   'Linnaeus University · Erasmus: INSEEC Grande École, Paris',
  'studies.bsc.desc':  "Bachelor's degree in Business Administration with a specialization in Entrepreneurship and Business Development. The programme combined strategic, organizational and leadership theory with hands-on application: including a consulting engagement with one of Växjö's most prominent companies, producing research and analysis that laid the foundation for real-world business development initiatives. Includes an Erasmus semester at INSEEC Grande École in Paris, specialising in International Management (2020).",

  'exp.title':             'Experience',
  'exp.lrqa.title':        'Strategic Account Manager',
  'exp.lrqa.desc':         'Worked at the intersection of governance, standards and risk across major Nordic enterprises. Portfolio covered ISO and NIST frameworks, compliance advisory and cybersecurity services, requiring deep understanding of how organizations align processes with standards, guidelines and regulatory requirements, and the ability to translate complex technical matters for stakeholders from operations to C-level.',
  'exp.orbi.title':        'Customer Success & Sales Manager',
  'exp.orbi.desc':         'Designed, documented and standardized end-to-end processes for onboarding, account management and the full customer lifecycle in a fast-growing SaaS company. Used data-driven root cause analysis to identify and resolve sources of churn and inefficiency, driving continuous improvement across teams. Results included +378% ARR YoY, +160% NRR and churn reduced to 10%. Recruited and led a new team, establishing common ways of working from the ground up.',
  'exp.digicert.title':    'Enterprise Account Manager, Nordics',
  'exp.digicert.desc':     'Managed complex stakeholder landscapes across private and public sector enterprises in the Nordics, with accounts up to USD 100 billion in revenue. SSL/TLS and PKI solutions requiring close collaboration with IT, security and business functions, and the ability to adapt communication to widely different audiences. #1 quota achievement worldwide in year one (382%).',
  'exp.oracle.title':      'Enterprise Account Manager, Sweden',
  'exp.oracle.desc':       'Worked with database, middleware, IaaS and PaaS solutions for telecom and public sector, building a strong understanding of data structures, system architectures and how information flows between systems in large organizations. Complex, tailored IT solutions developed in dialogue with C-level stakeholders.',
  'exp.mastervolt.title':  'Technical Sales Representative / Account Manager',
  'exp.mastervolt.desc':   'Field-based technical sales role (80%+ on the road) covering all of Sweden across maritime, mobile and industrial energy. CAN bus products in customer-specific system configurations. The role grew into a KAM position with an expanding budget and territory.',

  'edu.title':    'Education',
  'edu.gy.title': 'Upper Secondary: Technology / IT',
  'edu.gy.org':   'Sven Eriksonsgymnasiet, Borås',
  'edu.gy.desc':  'Upper secondary education with a focus on Technology and IT.',

  'contact.title':      'Contact',
  'contact.intro':      "Interested in collaborating or grabbing a coffee to discuss opportunities? Get in touch and I'll get back to you as soon as I can.",
  'contact.card.email': 'Email',
  'contact.card.phone': 'Phone',
  'form.name':          'Name',
  'form.name.ph':       'Your name',
  'form.email':         'Email',
  'form.email.ph':      'your@email.com',
  'form.subject':       'Subject',
  'form.subject.ph':    "What's this about?",
  'form.message':       'Message',
  'form.message.ph':    'Write your message here...',
  'form.submit':        'Send message',
  'form.success':       "Thank you! Your message has been sent. I'll be in touch shortly.",
  'form.error':         'Something went wrong. Please try again or email me directly at tim@tim-palm.com.',
};

document.documentElement.lang = 'en';

document.querySelectorAll('[data-i18n]').forEach((el) => {
  const key = el.dataset.i18n;
  if (t[key] !== undefined) el.textContent = t[key];
});

document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
  const key = el.dataset.i18nPh;
  if (t[key] !== undefined) el.placeholder = t[key];
});

// Active nav on scroll
const sections = document.querySelectorAll('.section');
const navLinks  = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((s) => observer.observe(s));

// Contact form
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const feedback = document.getElementById('form-feedback');
  const btn = form.querySelector('.btn-submit');

  btn.disabled = true;
  feedback.style.display = 'none';

  try {
    const res = await fetch('https://formsubmit.co/ajax/tim@tim-palm.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name:     document.getElementById('fname').value,
        email:    document.getElementById('femail').value,
        subject:  document.getElementById('fsubject').value,
        message:  document.getElementById('fmessage').value,
        _honey:   form.querySelector('[name="_honey"]').value,
        _captcha: false,
      }),
    });

    if (res.ok) {
      feedback.textContent = t['form.success'];
      feedback.className = 'form-feedback success';
      form.reset();
    } else {
      feedback.textContent = t['form.error'];
      feedback.className = 'form-feedback error';
    }
  } catch {
    feedback.textContent = t['form.error'];
    feedback.className = 'form-feedback error';
  }

  feedback.style.display = 'block';
  btn.disabled = false;
}
