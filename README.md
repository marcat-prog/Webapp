# **Staff Reception Management Dashboard**  

## **Project Overview**  
The **Staff Reception Management Dashboard** is a web application designed for:  
✅ **Staff clock-in/out tracking**  
✅ **Absence monitoring**  
✅ **Toast notifications for late staff**  
✅ **Delivery scheduling and tracking**  

The project follows **OOP principles** and is built using **JavaScript, jQuery, Bootstrap, HTML, and CSS**.  

---

## **Technologies Used**  
✅ **HTML, CSS, Bootstrap** → UI structure & styling  
✅ **JavaScript & jQuery** → Interactivity & logic handling  
✅ **OOP Concepts** → Modular and maintainable code  
✅ **External Libraries/Plugins** (detailed below)  
❌ **Node.js is NOT used** (per IT department request)  

---

## **Project Folder Structure**  
```
/project-root
│── index.html             # Main dashboard page
│── assets/
│   │── css/
│   │   ├── styles.css     # Custom styling
│   │── js/
│   │   ├── wdt_app.js     # All JavaScript functionality
│   │── img/               # Image assets
│── docs/
│   ├── Jira.pdf           # Reflection report
│── README.md              # Project documentation
```

---

## **Setup Instructions**  
1️⃣ **Clone the repository**:  
   ```sh
   git clone https://github.com/your-repo-url.git
   cd project-root
   ```  
2️⃣ **Open `index.html` in a browser.**  
3️⃣ **Ensure all files follow the correct folder structure.**  

---

## **External Libraries & Plugins Used**  
Here are the **CDN links and setup instructions** for external libraries:  

### **1️⃣ Bootstrap (for UI & Styling)**  
Bootstrap is used for **responsive design, grid layouts, modals, and toast notifications**.  

- **Include in `index.html`**:  
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  ```
- **Usage Example (Toast Notification in `wdt_app.js`)**:  
  ```js
  function showToast(message) {
      $('.toast-body').text(message);
      $('.toast').toast('show');
  }
  ```

---

### **2️⃣ jQuery (for JavaScript Interactivity)**  
jQuery simplifies **DOM manipulation, event handling, and animations**.  

- **Include in `index.html`**:  
  ```html
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  ```
- **Usage Example (Button Click Event in `wdt_app.js`)**:  
  ```js
  $(document).ready(function() {
      $('#clock-in-btn').click(function() {
          alert('Clock-in recorded!');
      });
  });
  ```

---

### **3️⃣ jQuery UI (for Interactive Elements like Date Picker)**  
Used for **date selection in the delivery scheduling module**.  

- **Include in `index.html`**:  
  ```html
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  ```
- **Usage Example (Date Picker in `wdt_app.js`)**:  
  ```js
  $(document).ready(function() {
      $("#delivery-date").datepicker();
  });
  ```

---

## **Dashboard Features**  

### **1️⃣ Staff Management**  
- Employees **clock in and out** using the dashboard.  
- **Absences are automatically tracked**.  
- **Toast notifications alert** when staff arrive late.  

### **2️⃣ Delivery Management**  
- Receptionists can **schedule deliveries**.  
- **Deliveries are logged and tracked in real time**.  

### **3️⃣ User Experience Enhancements**  
- **Hover animations on dashboard buttons**.  
- **Mobile-friendly layout** (Bootstrap).  

---

## **Hover Animation Implementation**  
To **enhance user experience**, dashboard buttons have **hover animations** via **CSS and jQuery**.  

- **CSS Approach** (`styles.css`):  
  ```css
  .btn-dashboard:hover {
      transform: scale(1.1);
      transition: all 0.3s ease-in-out;
  }
  ```
- **jQuery Approach (`wdt_app.js`)**:  
  ```js
  $('.btn-dashboard').hover(function() {
      $(this).css('transform', 'scale(1.1)');
  }, function() {
      $(this).css('transform', 'scale(1)');
  });
  ```

---

## **How to Contribute**  
1️⃣ **Fork the repository**  
2️⃣ **Create a new branch**  
3️⃣ **Submit a pull request**  

---

---

