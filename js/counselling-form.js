/**
 * A K GROUP OF EDUCATION - COUNSELLING & WHATSAPP CONVERSION SYSTEM
 * Lead Counsellor: Ashutosh Kumar
 * Primary Helpline: +91 9205125001
 * Secondary Helpline: +91 8651296795
 * Lakhisarai, Bihar
 */

(function () {
  'use strict';

  const PRIMARY_WHATSAPP = '919205125001';
  const SECONDARY_WHATSAPP = '918651296795';

  /**
   * Helper: Open structured WhatsApp chat
   */
  window.openAkWhatsApp = function (customMessage, phone = PRIMARY_WHATSAPP) {
    const encoded = encodeURIComponent(customMessage.trim());
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  /**
   * Quick Course WhatsApp Trigger
   */
  window.triggerCourseWhatsApp = function (courseName) {
    const message = `Hello A K Group of Education, I am interested in ${courseName} admission counselling. Please share the admission details, eligibility, and fee structure.`;
    window.openAkWhatsApp(message);
  };

  /**
   * Dynamically inject clean iOS Lead Modal if missing from DOM
   */
  function createDynamicModal() {
    let backdrop = document.getElementById('iosLeadModalBackdrop');
    if (backdrop) return backdrop;

    backdrop = document.createElement('div');
    backdrop.className = 'ios-modal-backdrop';
    backdrop.id = 'iosLeadModalBackdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.innerHTML = `
      <div class="ios-modal">
        <button type="button" class="ios-modal-close" onclick="closeLeadModal()">&times;</button>
        <div style="margin-bottom: 1.5rem;">
          <span class="section-label" style="font-size: 0.72rem;">1-on-1 Mentorship</span>
          <h3 style="font-size: 1.4rem; color: var(--ios-navy); margin-top: 0.35rem;">
            Get Free Admission Counselling
          </h3>
          <p style="font-size: 0.88rem; color: var(--ios-text-secondary);">
            Direct consultation with Counsellor Ashutosh Kumar. All information remains 100% confidential.
          </p>
        </div>
        <form class="counselling-enquiry-form" id="dynamicModalLeadForm">
          <div class="form-group-ios">
            <label>Student Full Name <span style="color: #FF3B30;">*</span></label>
            <input type="text" name="student_name" class="form-control-ios" placeholder="Full name" required>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group-ios">
              <label>Mobile Number <span style="color: #FF3B30;">*</span></label>
              <input type="tel" name="mobile" class="form-control-ios" placeholder="10-digit mobile" required pattern="[0-9]{10}">
            </div>
            <div class="form-group-ios">
              <label>WhatsApp Number</label>
              <input type="tel" name="whatsapp" class="form-control-ios" placeholder="WhatsApp number">
            </div>
          </div>
          <div class="form-group-ios">
            <label>Select Course <span style="color: #FF3B30;">*</span></label>
            <select name="course" id="modalCourseSelect" class="form-control-ios" required>
              <option value="">-- Select Course Stream --</option>
              <option value="Medical (MBBS, BDS, BAMS, BHMS)">Medical (MBBS, BDS, BAMS, BHMS)</option>
              <option value="Para Medical (DMLT, BMLT, BPT, BHM)">Para Medical (DMLT, BMLT, BPT, BHM)</option>
              <option value="Engineering (Polytechnic, B.Tech, M.Tech)">Engineering (Polytechnic, B.Tech, M.Tech)</option>
              <option value="Hotel Management (BHM, BHMCT)">Hotel Management (BHM, BHMCT)</option>
              <option value="Fashion Designing (B.Sc Fashion Designing)">Fashion Designing (B.Sc Fashion Designing)</option>
              <option value="Pharmacy (D.Pharma, B.Pharma, M.Pharma)">Pharmacy (D.Pharma, B.Pharma, M.Pharma)</option>
              <option value="Agriculture (B.Tech Agri, B.Sc Agri, M.Sc Agri)">Agriculture (B.Tech Agri, B.Sc Agri, M.Sc Agri)</option>
              <option value="Computer & Software (BCA, MCA, B.Sc.IT, M.Sc IT)">Computer &amp; Software (BCA, MCA, B.Sc.IT, M.Sc IT)</option>
              <option value="Media & Communication (BJMC, MJMC)">Media &amp; Communication (BJMC, MJMC)</option>
              <option value="Architecture (B.Arch, M.Arch)">Architecture (B.Arch, M.Arch)</option>
              <option value="Nursing (ANM, GNM, B.Sc Nursing)">Nursing (ANM, GNM, B.Sc Nursing)</option>
              <option value="Education (D.El.Ed, D.Lib, B.Ed, B.Lib, M.Ed, M.Lib)">Education (D.El.Ed, D.Lib, B.Ed, B.Lib, M.Ed, M.Lib)</option>
              <option value="Management (BBA, MBA, PGDM, MIB)">Management (BBA, MBA, PGDM, MIB)</option>
              <option value="Law (BA.LL.B, LL.B, LL.M)">Law (BA.LL.B, LL.B, LL.M)</option>
              <option value="General Courses (B.A, MA, B.Sc, M.Sc, B.Com, M.Com, PhD)">General Courses (B.A, MA, B.Sc, M.Sc, B.Com, M.Com, PhD)</option>
              <option value="General Courses (10th, 12th, ITI)">General Courses (10th, 12th, ITI)</option>
            </select>
          </div>
          <div class="form-group-ios">
            <label>Exam Score or 12th %</label>
            <input type="text" name="score_rank" class="form-control-ios" placeholder="e.g. JEE 85%, NEET 430, or 12th 72%">
          </div>
          <div class="form-group-ios">
            <label>Preferred State or Notes</label>
            <input type="text" name="message" class="form-control-ios" placeholder="State or college preferences...">
          </div>
          <button type="submit" class="btn btn-primary btn-full btn-lg" style="margin-top: 0.5rem;">
            Connect with Counsellor on WhatsApp
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(backdrop);
    const form = backdrop.querySelector('form');
    if (form) form.addEventListener('submit', handleFormSubmit);
    backdrop.addEventListener('click', function(e) {
      if (e.target === backdrop) window.closeLeadModal();
    });

    return backdrop;
  }

  /**
   * Find Active Modal Backdrop on page
   */
  function getActiveModalBackdrop() {
    return document.getElementById('iosLeadModalBackdrop') || document.getElementById('counsellingModalBackdrop') || createDynamicModal();
  }

  /**
   * Open Counselling / Lead Modal with course pre-selected
   */
  window.openCounsellingModal = function (preselectedCourse) {
    const modalBackdrop = getActiveModalBackdrop();
    if (!modalBackdrop) return;

    if (preselectedCourse && preselectedCourse !== 'General') {
      const courseSelect = modalBackdrop.querySelector('select[name="course"]') || modalBackdrop.querySelector('#modalCourseSelect');
      if (courseSelect) {
        let matched = false;
        const target = preselectedCourse.toLowerCase();
        for (let i = 0; i < courseSelect.options.length; i++) {
          const optText = courseSelect.options[i].text.toLowerCase();
          const optVal = courseSelect.options[i].value.toLowerCase();
          if (optText.includes(target) || optVal.includes(target)) {
            courseSelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched && courseSelect.options.length > 0) {
          // If no specific match, leave default or select first
        }
      }
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Auto-focus first input
    const firstInput = modalBackdrop.querySelector('input[name="student_name"]');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 150);
    }
  };

  // Alias for lead modal
  window.openLeadModal = window.openCounsellingModal;

  /**
   * Close Counselling / Lead Modal
   */
  window.closeCounsellingModal = function () {
    const modalBackdrop = getActiveModalBackdrop();
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Alias
  window.closeLeadModal = window.closeCounsellingModal;

  /**
   * Process and validate counselling form submission
   */
  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const studentName = (form.querySelector('[name="student_name"]')?.value || '').trim();
    const parentName = (form.querySelector('[name="parent_name"]')?.value || '').trim();
    const mobile = (form.querySelector('[name="mobile"]')?.value || '').trim();
    const whatsapp = (form.querySelector('[name="whatsapp"]')?.value || '').trim() || mobile;
    const email = (form.querySelector('[name="email"]')?.value || '').trim();
    const course = (form.querySelector('[name="course"]')?.value || '').trim();
    const entranceExam = (form.querySelector('[name="entrance_exam"]')?.value || '').trim();
    const scoreRank = (form.querySelector('[name="score_rank"]')?.value || '').trim();
    const preferredLocation = (form.querySelector('[name="preferred_location"]')?.value || '').trim();
    const qualification = (form.querySelector('[name="qualification"]')?.value || '').trim();
    const message = (form.querySelector('[name="message"]')?.value || '').trim();

    // Validation
    if (!studentName) {
      alert('Please enter the Student Full Name.');
      form.querySelector('[name="student_name"]')?.focus();
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      form.querySelector('[name="mobile"]')?.focus();
      return;
    }

    if (!course) {
      alert('Please select the Course you are interested in.');
      form.querySelector('[name="course"]')?.focus();
      return;
    }

    // Build clean structured WhatsApp message
    let waMessage = `Hello A K Group of Education,\n\nI would like admission counselling.\n\n`;
    waMessage += `*Student Name:* ${studentName}\n`;
    if (parentName) waMessage += `*Parent/Guardian:* ${parentName}\n`;
    waMessage += `*Mobile Number:* ${mobile}\n`;
    if (whatsapp && whatsapp !== mobile) waMessage += `*WhatsApp:* ${whatsapp}\n`;
    if (email) waMessage += `*Email:* ${email}\n`;
    waMessage += `*Course Interested In:* ${course}\n`;
    if (entranceExam) waMessage += `*Entrance Exam:* ${entranceExam}\n`;
    if (scoreRank) waMessage += `*Score/Rank:* ${scoreRank}\n`;
    if (preferredLocation) waMessage += `*Preferred State/Country:* ${preferredLocation}\n`;
    if (qualification) waMessage += `*Academic Qualification:* ${qualification}\n`;
    if (message) waMessage += `*Query / Preferences:* ${message}\n`;
    waMessage += `\nPlease guide me on recognized colleges, cutoffs, and admission procedures.\nThank you.`;

    // Show in-page success feedback if banner exists
    const successBanner = form.parentElement.querySelector('.success-banner') || form.querySelector('.success-banner');
    if (successBanner) {
      successBanner.classList.add('active');
    }

    // Launch WhatsApp directly
    window.openAkWhatsApp(waMessage);

    // Reset form after short delay
    setTimeout(() => {
      form.reset();
      window.closeLeadModal();
    }, 1200);
  }

  /**
   * Interactive Profile / Eligibility Calculator Form Handler
   */
  function setupEligibilityWidget() {
    const widgetForm = document.getElementById('quickGuidanceForm');
    if (!widgetForm) return;

    widgetForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const course = document.getElementById('guideCourse')?.value;
      const stream = document.getElementById('guideStream')?.value;
      const score = document.getElementById('guideScore')?.value;
      const mobile = document.getElementById('guideMobile')?.value;

      if (!course) {
        alert('Please select your desired course.');
        return;
      }

      const cleanMobile = (mobile || '').replace(/\D/g, '');
      if (!cleanMobile || cleanMobile.length < 10) {
        alert('Please enter a valid 10-digit mobile number for counselling follow-up.');
        return;
      }

      const message = `Hello A K Group of Education,\n\nI submitted details on your Quick Course Finder:\n- *Desired Course:* ${course}\n- *12th / Grad Stream:* ${stream || 'Not specified'}\n- *Score / Marks:* ${score || 'Awaiting results'}\n- *Mobile:* ${mobile}\n\nPlease evaluate my profile for college eligibility and fee structure.`;

      window.openAkWhatsApp(message);
      widgetForm.reset();
    });
  }

  // Global Initializations
  document.addEventListener('DOMContentLoaded', function () {
    // Attach form submit listeners to all forms with class counselling-enquiry-form
    document.querySelectorAll('.counselling-enquiry-form').forEach((form) => {
      form.addEventListener('submit', handleFormSubmit);
    });

    // Close modal on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        window.closeLeadModal();
      }
    });

    // Close modal on backdrop click
    ['iosLeadModalBackdrop', 'counsellingModalBackdrop'].forEach(id => {
      const backdrop = document.getElementById(id);
      if (backdrop) {
        backdrop.addEventListener('click', function (e) {
          if (e.target === backdrop) {
            window.closeLeadModal();
          }
        });
      }
    });

    // Attach click events to buttons with data-open-modal
    document.querySelectorAll('[data-open-modal]').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const course = this.getAttribute('data-course') || 'General';
        window.openLeadModal(course);
      });
    });

    // Attach click events to buttons with data-course-whatsapp
    document.querySelectorAll('[data-course-whatsapp]').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const course = this.getAttribute('data-course-whatsapp') || 'Course';
        window.triggerCourseWhatsApp(course);
      });
    });

    // Initialize calculator widget
    setupEligibilityWidget();
  });
})();
