import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

const TOTAL_FRAMES = 240;

@Component({
  selector: 'app-video-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-background.component.html',
  styleUrls: ['./video-background.component.css']
})
export class VideoBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('frameCanvas') frameCanvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private images: HTMLImageElement[] = [];
  private currentFrame = 0;
  private scrollHandler!: () => void;
  private ticking = false;
  private resizeObs!: ResizeObserver;

  constructor(private zone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const canvas = this.frameCanvas.nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: false })!;
    this.resizeCanvas();

    this.zone.runOutsideAngular(() => {
      this.preloadFrames(() => {
        this.drawFrame(0);
        if (this.frameCanvas?.nativeElement) {
          this.frameCanvas.nativeElement.classList.add('is-playing');
        }

        this.scrollHandler = () => {
          if (!this.ticking) {
            requestAnimationFrame(() => { this.onScroll(); this.ticking = false; });
            this.ticking = true;
          }
        };
        window.addEventListener('scroll', this.scrollHandler, { passive: true });
        this.onScroll();
      });

      this.resizeObs = new ResizeObserver(() => this.resizeCanvas());
      this.resizeObs.observe(document.body);
    });
  }

  ngOnDestroy() {
    if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
    if (this.resizeObs) this.resizeObs.disconnect();
  }

  private resizeCanvas() {
    const canvas = this.frameCanvas?.nativeElement;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    if (this.images[this.currentFrame]?.complete) this.drawFrame(this.currentFrame);
  }

  private preloadFrames(done: () => void) {
    this.images = new Array(TOTAL_FRAMES);
    let loaded = 0;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i + 1).padStart(3, '0');
      img.src = `assets/images/frames/ezgif-frame-${num}.png`;
      img.onload = () => {
        loaded++;
        if (i === 0) this.drawFrame(0);
        if (loaded === TOTAL_FRAMES) done();
      };
      img.onerror = () => { loaded++; if (loaded === TOTAL_FRAMES) done(); };
      this.images[i] = img;
    }
  }

  private drawFrame(index: number) {
    const img = this.images[index];
    if (!img || !img.complete || !img.naturalWidth) return;
    const canvas = this.frameCanvas.nativeElement;
    const ctx = this.ctx;
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih) * 1.15; // 15% zoom to allow cropping
    const sw = iw * scale, sh = ih * scale;
    
    // Push towards the left (0.8) and align to the top (sy = 0)
    // By aligning to the top and zooming 15%, the bottom 15% of the image (containing the watermark) gets cropped out
    const sx = (cw - sw) * 0.8, sy = 0;

    ctx.drawImage(img, sx, sy, sw, sh);
    this.currentFrame = index;
  }

  private onScroll() {
    const scrollY = window.scrollY;
    // maxScroll represents the maximum pixel distance the window can scroll down
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const clamped = Math.max(0, Math.min(scrollY, maxScroll));
    
    // Map the current scroll position strictly from 0 to 239 frames
    const frameIndex = Math.min(
      Math.floor((clamped / maxScroll) * TOTAL_FRAMES),
      TOTAL_FRAMES - 1
    );

    if (frameIndex !== this.currentFrame) {
      this.drawFrame(frameIndex);
    }
  }
}
