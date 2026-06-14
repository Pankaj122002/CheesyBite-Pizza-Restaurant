import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ElementRef, ViewChild, NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

const TOTAL_SECTIONS = 6;
const SECTION_HEIGHT_VH = 1; // each section = 1 viewport height

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('videoWrapper') videoWrapper!: ElementRef<HTMLElement>;
  @ViewChild('frameStage')  frameStage!:  ElementRef<HTMLElement>;
  @ViewChild('vprogress')   vprogress!:   ElementRef<HTMLElement>;
  @ViewChild('vhint')       vhint!:       ElementRef<HTMLElement>;

  sections = Array(TOTAL_SECTIONS).fill(0); // for *ngFor spacers

  private currentSection = 0;
  private scrollHandler!: () => void;
  private ticking = false;
  private vsections: HTMLElement[] = [];
  private vdots: HTMLElement[] = [];
  private resizeObs!: ResizeObserver;

  constructor(private zone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // DOM refs
    this.vsections = Array.from(document.querySelectorAll<HTMLElement>('.vsection'));
    this.vdots     = Array.from(document.querySelectorAll<HTMLElement>('.vdot'));

    // Activate first section immediately
    this.activateSection(0);

    // Dot nav clicks
    this.vdots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.jumpToSection(i));
    });

    this.zone.runOutsideAngular(() => {
      this.scrollHandler = () => {
        if (!this.ticking) {
          requestAnimationFrame(() => { this.onScroll(); this.ticking = false; });
          this.ticking = true;
        }
      };
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
      this.onScroll();
    });
  }

  ngOnDestroy() {
    if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
  }

  // ── Scroll handler ──
  private onScroll() {
    const wrapper = this.videoWrapper?.nativeElement;
    if (!wrapper) return;

    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const scrolled = Math.max(0, window.scrollY - wrapperTop);
    const totalHeight = window.innerHeight * TOTAL_SECTIONS;
    const clamped = Math.min(scrolled, totalHeight - 1);

    // Section index
    let sectionIndex = -1;
    if (scrolled < totalHeight) {
      sectionIndex = Math.min(
        Math.floor(clamped / window.innerHeight),
        TOTAL_SECTIONS - 1
      );
    }
    
    if (sectionIndex !== this.currentSection) {
      this.activateSection(sectionIndex);
      this.currentSection = sectionIndex;
    }

    // Progress bar
    const pct = (clamped / (totalHeight - window.innerHeight)) * 100;
    if (this.vprogress?.nativeElement) {
      this.vprogress.nativeElement.style.width = Math.min(pct, 100) + '%';
    }

    // Scroll hint
    if (this.vhint?.nativeElement) {
      this.vhint.nativeElement.classList.toggle('hidden', scrolled > window.innerHeight * 0.4);
    }

    if (this.vsections[0]) {
      this.vsections[0].classList.toggle('is-scrolled', scrolled > 150);
    }
  }

  // ── Activate section ──
  private activateSection(index: number) {
    this.vsections.forEach((s, i) => s.classList.toggle('active', i === index));
    this.vdots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  // ── Jump to section on dot click ──
  jumpToSection(index: number) {
    const wrapper = this.videoWrapper?.nativeElement;
    if (!wrapper) return;
    const top = wrapper.getBoundingClientRect().top + window.scrollY + index * window.innerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
