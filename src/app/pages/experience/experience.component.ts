import { Component, computed, signal } from '@angular/core';

interface TimelineItem {
  period: string;
  title: string;
  org: string;
  type: 'Work' | 'Education' | 'Freelance';
  points: string[];
  current?: boolean;
}

type CertCategory = 'Specializations' | 'University' | 'Internship';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  category: CertCategory;
  badgeLabel: string;
  tags: string[];
  desc: string;
  image: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  readonly timeline: TimelineItem[] = [
    {
      period: '2025 — Present',
      title: 'Freelance Full-Stack Developer',
      org: 'Self-employed · Remote',
      type: 'Freelance',
      points: [
        'Built and shipped client web apps end-to-end using Angular, Laravel, and MySQL.',
        'Managed client communication, scoping, and deployment independently.',
      ],
      current: true,
    },
    {
      period: '2024 — Present',
      title: 'Bachelor of IT Engineering',
      org: 'Royal University of Phnom Penh (RUPP)',
      type: 'Education',
      points: [
        'Core coursework in data structures, databases, software engineering, and networks.',
        'Active contributor to student-led coding workshops and hackathons.',
      ],
    },
    {
      period: '2024',
      title: 'Full-Stack Web Development Certificate',
      org: 'Independent / Online Cohort',
      type: 'Education',
      points: [
        'Completed an intensive program covering React/Angular, REST API design, and SQL.',
        'Delivered three capstone projects reviewed by industry mentors.',
      ],
    },
    {
      period: '2023 — 2024',
      title: 'Junior Web Developer (Internship)',
      org: 'Local Tech Startup, Phnom Penh',
      type: 'Work',
      points: [
        'Assisted in building internal admin dashboards with PHP and vanilla JS.',
        'Fixed bugs, wrote documentation, and learned production Git workflows.',
      ],
    },
  ];

  readonly certifications: Certification[] = [
    {
      title: 'Frontend Development Specialization',
      issuer: 'MIS',
      date: 'Jan 2026',
      category: 'Specializations',
      badgeLabel: 'Professional Certificate',
      tags: ['React 19', 'JavaScript ES6+', 'Tailwind CSS', 'HTML5 & CSS3'],
      desc: 'Certified mastery in responsive web architecture, semantic HTML5, CSS3, modern JavaScript ES6+, React.js, and accessible UI practices.',
      image: 'assets/certs/placeholder.svg',
    },
    {
      title: 'Backend Development Specialization',
      issuer: 'MIS',
      date: 'Jun 2026',
      category: 'Specializations',
      badgeLabel: 'Professional Certificate',
      tags: ['PHP 8', 'Laravel 12', 'MySQL', 'REST APIs', 'Sanctum Auth'],
      desc: 'Certified expertise in PHP 8, Object-Oriented Programming, MySQL relational database architecture, Laravel framework, and secure REST API design.',
      image: 'assets/certs/placeholder.svg',
    },
    {
      title: 'Frontend Software Engineering Internship',
      issuer: 'MIS',
      date: 'Jul 2026',
      category: 'Internship',
      badgeLabel: 'Internship Certificate',
      tags: ['React.js', 'Team Practicum', 'API Integration', 'UI/UX'],
      desc: 'Successfully completed an intensive frontend software engineering internship, demonstrating team collaboration, real API integration, and UI/UX craftsmanship.',
      image: 'assets/certs/placeholder.svg',
    },
    // {
    //   title: 'IT Engineering — Academic Transcript',
    //   issuer: 'MIS',
    //   date: '2024 — 2028',
    //   category: 'University',
    //   badgeLabel: 'University Document',
    //   tags: ['Data Structures', 'Databases', 'Software Engineering'],
    //   desc: 'Official academic transcript covering core Information Technology Engineering coursework at RUPP, verified by the university registrar.',
    //   image: 'assets/certs/placeholder.svg',
    // },
    // {
    //   title: "Dean's List — Academic Excellence",
    //   issuer: 'Royal University of Phnom Penh',
    //   date: '2025',
    //   category: 'University',
    //   badgeLabel: 'Academic Honor',
    //   tags: ['Top 10%', 'Academic Excellence', 'IT Engineering'],
    //   desc: "Recognized on the Dean's List for outstanding academic performance among IT Engineering cohort peers.",
    //   image: 'assets/certs/placeholder.svg',
    // },
  ];

  readonly certCategories: { label: 'All' | CertCategory; count: number }[] = [
    { label: 'All', count: this.certifications.length },
    {
      label: 'Specializations',
      count: this.certifications.filter((c) => c.category === 'Specializations').length,
    },
    {
      label: 'University',
      count: this.certifications.filter((c) => c.category === 'University').length,
    },
    {
      label: 'Internship',
      count: this.certifications.filter((c) => c.category === 'Internship').length,
    },
  ];

  activeCertCategory = signal<'All' | CertCategory>('All');

  filteredCertifications = computed(() => {
    const cat = this.activeCertCategory();
    return cat === 'All'
      ? this.certifications
      : this.certifications.filter((c) => c.category === cat);
  });
}
