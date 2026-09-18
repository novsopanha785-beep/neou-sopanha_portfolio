import { Component, signal } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ContactComponent } from '../contact/contact.component';

interface TechItem {
  label: string;
  sub: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent, SkillsComponent, ProjectsComponent, ExperienceComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  activeTab = signal<'config' | 'architecture' | 'test'>('config');

  readonly stack: TechItem[] = [
    { label: 'JavaScript', sub: 'LANGUAGE', icon: 'assets/icon/javascript.png' },
    { label: 'TypeScript', sub: 'LANGUAGE', icon: 'assets/icon/typescript.png' },
    { label: 'Angular', sub: 'FRAMEWORK', icon: 'assets/icon/angular.png' },
    { label: 'CSS', sub: 'STYLING', icon: 'assets/icon/css.png' },
    { label: 'Html', sub: 'STYLING', icon: 'assets/icon/html.png' },
    // { label: 'Laravel', sub: 'BACKEND', icon: 'assets/icon/.png' },
    // { label: 'PHP', sub: 'BACKEND', icon: 'assets/icon/2.png' },
    { label: 'Java', sub: 'BACKEND', icon: 'assets/icon/java.png' },
    // { label: 'Spring Boot', sub: 'ENTERPRISE', icon: 'assets/icon/.png' },
    { label: 'Node.js', sub: 'RUNTIME', icon: 'assets/icon/nodejs.png' },
    // { label: 'Express.js', sub: 'REST API', icon: 'assets/icon/mysql2.png' },
    { label: 'MySQL', sub: 'DATABASE', icon: 'assets/icon/mysql.png' },
  ];

  copyEmail(): void {
    navigator.clipboard?.writeText('novsopanha785@gmail.com');
  }
}
