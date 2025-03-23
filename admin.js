document.addEventListener('DOMContentLoaded', function() {
  const tabItems = document.querySelectorAll('.sidebar-menu li');
  const tabContents = document.querySelectorAll('.tab-content');

  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      tabItems.forEach(tab => tab.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');

  mobileMenuBtn.addEventListener('click', function() {
    nav.classList.toggle('active');
  });

  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  const savedTheme = localStorage.getItem('admin-theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.querySelector('.toggle-icon').textContent = '🌞';
  }

  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-theme');
    const icon = this.querySelector('.toggle-icon');
    if (body.classList.contains('dark-theme')) {
      icon.textContent = '🌞';
      localStorage.setItem('admin-theme', 'dark');
    } else {
      icon.textContent = '🌓';
      localStorage.setItem('admin-theme', 'light');
    }
  });

  const personalInfoForm = document.getElementById('personal-info-form');
  const passwordForm = document.getElementById('password-form');

  if (personalInfoForm) {
    personalInfoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('admin-name').value;
      const email = document.getElementById('admin-email').value;
      const phone = document.getElementById('admin-phone').value;
      if (!name || !email) {
        alert('Please fill in all required fields');
        return;
      }
      setTimeout(() => {
        alert('Personal information updated successfully!');
      }, 500);
    });
  }

  if (passwordForm) {
    passwordForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }
      if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
      }
      setTimeout(() => {
        alert('Password updated successfully!');
        this.reset();
      }, 500);
    });
  }

  const addCourseBtn = document.getElementById('add-course-btn');
  if (addCourseBtn) {
    addCourseBtn.addEventListener('click', function() {
      const courseName = prompt('Enter course name:');
      if (courseName) {
        const coursesTable = document.querySelector('#courses .data-table tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${courseName}</td>
          <td>New Instructor</td>
          <td>0</td>
          <td>₹999</td>
          <td><span class="status draft">Draft</span></td>
          <td class="actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </td>
        `;
        coursesTable.insertBefore(newRow, coursesTable.firstChild);
        setupActionButtons(newRow);
      }
    });
  }

  function setupActionButtons(container) {
    const editButtons = container.querySelectorAll('.edit-btn');
    const deleteButtons = container.querySelectorAll('.delete-btn');
    const viewButtons = container.querySelectorAll('.view-btn');
    
    editButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const row = this.closest('tr');
        const name = row.cells[0].textContent;
        const newName = prompt('Edit name:', name);
        if (newName) {
          row.cells[0].textContent = newName;
        }
      });
    });
    
    deleteButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const row = this.closest('tr');
        const name = row.cells[0].textContent;
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
          row.remove();
        }
      });
    });
    
    viewButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const row = this.closest('tr');
        const name = row.cells[0].textContent;
        alert(`Viewing details for: ${name}`);
      });
    });
  }

  setupActionButtons(document);

  const searchInputs = document.querySelectorAll('.search-bar input');
  
  searchInputs.forEach(input => {
    input.addEventListener('keyup', function() {
      const searchTerm = this.value.toLowerCase();
      const tableBody = this.closest('.tab-content').querySelector('tbody');
      const rows = tableBody.querySelectorAll('tr');
      
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  const toggleNotifications = document.querySelectorAll('.switch input');
  
  toggleNotifications.forEach(toggle => {
    toggle.addEventListener('change', function() {
      const settingName = this.closest('.notification-setting').querySelector('h4').textContent;
      const status = this.checked ? 'enabled' : 'disabled';
      console.log(`${settingName} ${status}`);
    });
  });

  const logoutBtn = document.getElementById('logout-btn');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
      }
    });
  }
});