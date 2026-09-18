import { Component, computed, signal } from '@angular/core';

type Category = 'Frontend' | 'Backend' | 'Database' | 'Tools';

interface Skill {
  name: string;
  category: Category;
  icon: string;
  desc: string;
  level: string;
  percent: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly skills: Skill[] = [
    { name: 'Angular', category: 'Frontend', icon: 'assets/icon/angular.png', desc: 'Standalone Components, Signals, RxJS, Router, SSR', level: 'Advanced / Daily', percent: 95 },
    { name: 'TypeScript', category: 'Frontend', icon: 'assets/icon/typescript.png', desc: 'Strong Typing, Generics, Interfaces, Union Types', level: 'Production Ready', percent: 92 },
    { name: 'JavaScript', category: 'Frontend', icon: 'assets/icon/javascript.png', desc: 'ES6+, Async/Await, Event Loop, Closures, DOM', level: 'Core Specialty', percent: 95 },
    { name: 'HTML5', category: 'Frontend', icon: 'assets/icon/html.png', desc: 'Semantic Markup, Accessible Landmarks (ARIA), SEO', level: 'Mastered', percent: 98 },
    { name: 'CSS3', category: 'Frontend', icon: 'assets/icon/css.png', desc: 'Flexbox, CSS Grid, Keyframe Animations, Responsive', level: 'Mastered', percent: 95 },
    // { name: 'Tailwind CSS', category: 'Frontend', icon: 'assets/icon/.png', desc: 'Utility-first design systems, modern v4, theming', level: 'Design Engine', percent: 93 },
    // { name: 'Laravel', category: 'Backend', icon: 'assets/icon/.png', desc: 'Eloquent ORM, Middleware, Sanctum Auth, Migrations', level: 'Core Specialty', percent: 92 },
    // { name: 'PHP', category: 'Backend', icon: 'assets/icon/.png', desc: 'Modern PHP 8+, OOP Principles, Server Lifecycle', level: 'Advanced', percent: 90 },
    { name: 'Java', category: 'Backend', icon: 'assets/icon/java.png', desc: 'OOP, Collections, Streams, Multithreading basics', level: 'Advanced', percent: 85 },
    // { name: 'Spring Boot', category: 'Backend', icon: 'assets/icon/.png', desc: 'REST APIs, Spring Data JPA, Dependency Injection', level: 'Proficient', percent: 82 },
    { name: 'Node.js', category: 'Backend', icon: 'assets/icon/nodejs.png', desc: 'Event-driven runtime, npm ecosystem, async I/O', level: 'Proficient', percent: 85 },
    // { name: 'Express.js', category: 'Backend', icon: 'assets/icon/.png', desc: 'Routing, middleware chains, REST API design', level: 'Proficient', percent: 85 },
    { name: 'MySQL', category: 'Database', icon: 'assets/icon/mysql.png', desc: 'Schema design, indexing, joins, query optimization', level: 'Advanced', percent: 90 },
    // { name: 'PostgreSQL', category: 'Database', icon: 'assets/icon/.png', desc: 'Relational modeling, constraints, transactions', level: 'Proficient', percent: 78 },
    { name: 'Git & GitHub', category: 'Tools', icon: 'assets/icon/github.png', desc: 'Branching strategies, PR review, CI-friendly commits', level: 'Daily Driver', percent: 95 },
    // { name: 'Docker', category: 'Tools', icon: 'assets/icon/.png', desc: 'Containerizing apps, multi-stage builds, compose', level: 'Proficient', percent: 75 },
    { name: 'Postman', category: 'Tools', icon: 'assets/icon/postman.png', desc: 'API testing, environments, automated collections', level: 'Advanced', percent: 90 },
    { name: 'VS Code', category: 'Tools', icon: 'assets/icon/vscode.png', desc: 'Extensions, debugging, workspace configuration', level: 'Daily Driver', percent: 97 },
    { name: 'Figma', category: 'Tools', icon: 'assets/icon/figma.png', desc: 'Reading handoffs, prototyping quick UI concepts', level: 'Proficient', percent: 72 },
  ];

  readonly categories: { label: 'All' | Category; count: number }[] = [
    { label: 'All', count: this.skills.length },
    { label: 'Frontend', count: this.skills.filter((s) => s.category === 'Frontend').length },
    { label: 'Backend', count: this.skills.filter((s) => s.category === 'Backend').length },
    { label: 'Database', count: this.skills.filter((s) => s.category === 'Database').length },
    { label: 'Tools', count: this.skills.filter((s) => s.category === 'Tools').length },
  ];

  activeCategory = signal<'All' | Category>('All');

  filteredSkills = computed(() => {
    const cat = this.activeCategory();
    return cat === 'All' ? this.skills : this.skills.filter((s) => s.category === cat);
  });
}
