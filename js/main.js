/**
 * A K GROUP OF EDUCATION - MAIN UI INTERACTIONS
 * Handles iOS Drawer Navigation, Mobile Actions, FAQ Accordions, and Course Filters
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Mobile Menu Drawer
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');

  function openMobileMenu() {
    mobileNavDrawer?.classList.add('open');
    mobileNavOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileNavDrawer?.classList.remove('open');
    mobileNavOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggleBtn?.addEventListener('click', openMobileMenu);
  mobileDrawerClose?.addEventListener('click', closeMobileMenu);
  mobileNavOverlay?.addEventListener('click', closeMobileMenu);

  // Close mobile drawer when clicking any internal nav link
  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 2. FAQ Accordion (Supporting both .ios-faq-item and .faq-item)
  const faqItems = document.querySelectorAll('.ios-faq-item, .faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.ios-faq-btn, .faq-question');
    const answer = item.querySelector('.ios-faq-content, .faq-answer');

    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.ios-faq-content, .faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        if (answer) answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 20 + 'px';
      }
    });
  });

  // Ensure first FAQ is open on page load if available
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstAnswer = firstItem.querySelector('.ios-faq-content, .faq-answer');
    firstItem.classList.add('active');
    if (firstAnswer) firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 20 + 'px';
  }

  // 3. Segment Filter Tabs Switcher
  const segmentButtons = document.querySelectorAll('.ios-segment-btn, .filter-btn');
  segmentButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const container = this.closest('.ios-segment-bar') || this.parentElement;
      container?.querySelectorAll('.ios-segment-btn, .filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterVal = this.getAttribute('data-filter');
      const targetCards = document.querySelectorAll('#courseCardsGrid .ios-card, .course-card');

      targetCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Header Shadow on scroll
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 15) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }, { passive: true });
});
